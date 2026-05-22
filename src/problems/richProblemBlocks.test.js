import test from 'node:test';
import assert from 'node:assert/strict';

import { isQuestionApprovedForProfile } from '../config/contentProfile.js';
import { defineProblem } from './problemAuthoring.js';
import { normalizeProblem } from './normalizeProblem.js';
import { validateProblem } from './validateProblem.js';

const topics = [{ id: 'scalability', category: 'system' }];

function baseProblem(overrides = {}) {
  return {
    id: 'rich-problem-1',
    type: 'simple-system-design',
    category: 'system',
    topicId: 'scalability',
    title: 'Rich problem',
    difficulty: 'Medium',
    prompt: 'Design it.',
    ...overrides
  };
}

test('normalizeProblem preserves rich body block order and rendering metadata', () => {
  const normalized = normalizeProblem(baseProblem({
    body: [
      { type: 'callout', tone: 'info', title: 'Clarify first', content: 'Separate requirements.' },
      { type: 'table', title: 'Core requirements', columns: ['Area', 'Requirement'], rows: [['Create', 'Generate code']] },
      { type: 'flow', title: 'Redirect path', steps: ['Open URL', 'Resolve destination'] }
    ],
    rendering: { variant: 'architecture-case-study', density: 'detailed', accent: 'blue' }
  }));

  assert.deepEqual(normalized.body.map((block) => block.type), ['callout', 'table', 'flow']);
  assert.equal(normalized.rendering.variant, 'architecture-case-study');
});

test('validateProblem accepts required rich body block types', () => {
  const result = validateProblem(baseProblem({
    body: [
      { type: 'section', title: 'Scope', content: 'Focus on reads.' },
      { type: 'callout', tone: 'success', content: 'Cache aggressively.' },
      { type: 'table', columns: ['Area', 'Requirement'], rows: [['Read', 'Low latency']] },
      { type: 'image', src: '/images/url-shortener.png', caption: 'High-level sketch' },
      { type: 'diagram', content: 'client -> edge -> service -> database' },
      { type: 'flow', steps: ['Receive request', 'Redirect'] },
      { type: 'code', language: 'text', code: 'GET /:code' },
      { type: 'checklist', items: ['Requirements', { label: 'Discuss abuse controls', checked: true }] },
      { type: 'comparison', items: [{ label: 'SQL', content: 'Strong consistency' }, { label: 'KV', content: 'Fast lookups' }] },
      { type: 'architectureDecision', title: 'Use async analytics', decision: 'Emit events off the redirect path.' },
      { type: 'divider' }
    ]
  }), { topics });

  assert.equal(result.valid, true);
  assert.deepEqual(result.errors, []);
});

test('malformed rich body blocks produce useful validation errors', () => {
  const result = validateProblem(baseProblem({
    body: [
      { type: 'table', columns: [], rows: [] },
      { type: 'callout', tone: 'loud', content: 'Bad tone.' },
      { type: 'image', src: 'https://example.com/remote.png' },
      { type: 'unknownBlock', content: 'Not supported.' }
    ],
    rendering: { variant: 'custom-css-class' }
  }), { topics });

  assert.equal(result.valid, false);
  assert.ok(result.errors.some((item) => item.field === 'body[0].columns'));
  assert.ok(result.errors.some((item) => item.field === 'body[1].tone'));
  assert.ok(result.errors.some((item) => item.field === 'body[2].src'));
  assert.ok(result.errors.some((item) => item.message.includes('Unsupported rich body block type')));
  assert.ok(result.errors.some((item) => item.field === 'rendering.variant'));
});

test('defineProblem preserves rich body and rendering metadata through helper normalization', () => {
  const problem = defineProblem({
    id: 'rich-helper-1',
    type: 'simple-system-design',
    topicId: 'scalability',
    title: 'Helper rich problem',
    prompt: 'Design it.',
    body: [{ type: 'checklist', title: 'Answer checklist', items: ['Requirements', 'Trade-offs'] }],
    rendering: { variant: 'architecture-case-study', density: 'detailed', accent: 'blue' },
    metadata: { reviewStatus: 'approved', visibility: ['dev', 'prod'] }
  }, { topics });

  assert.equal(problem.body[0].type, 'checklist');
  assert.equal(problem.rendering.variant, 'architecture-case-study');
  assert.deepEqual(problem.metadata.visibility, ['dev', 'prod']);
});

test('prod visibility metadata still works with rich problems', () => {
  const problem = defineProblem({
    id: 'rich-prod-1',
    type: 'simple-system-design',
    topicId: 'scalability',
    title: 'Prod rich problem',
    prompt: 'Design it.',
    body: [{ type: 'callout', tone: 'info', content: 'Visible rich body.' }],
    metadata: { reviewStatus: 'approved', visibility: ['dev', 'prod'] }
  }, { topics });

  assert.equal(isQuestionApprovedForProfile(problem, { profile: 'prod' }), true);
});
