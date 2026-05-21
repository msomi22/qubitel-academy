import test from 'node:test';
import assert from 'node:assert/strict';

import { normalizeProblem } from './normalizeProblem.js';

test('legacy system-design problem normalizes to simple-system-design', () => {
  const normalized = normalizeProblem({
    id: 'scalability-legacy-001',
    type: 'system-design',
    title: 'Legacy system design',
    tags: ['system-design']
  });

  assert.equal(normalized.type, 'simple-system-design');
  assert.equal(normalized.difficulty, 'Easy');
  assert.deepEqual(normalized.tags, ['simple-system-design']);
});

test('legacy production-scenario problem normalizes to simple-system-design', () => {
  const normalized = normalizeProblem({
    id: 'scalability-legacy-002',
    type: 'production-scenario',
    title: 'Legacy production scenario',
    tags: ['production-scenario']
  });

  assert.equal(normalized.type, 'simple-system-design');
  assert.equal(normalized.difficulty, 'Easy');
  assert.deepEqual(normalized.tags, ['simple-system-design']);
});

test('normal simple-system-design problem keeps explicit metadata', () => {
  const normalized = normalizeProblem({
    id: 'scalability-simple-001',
    type: 'simple-system-design',
    title: 'Simple system design',
    difficulty: 'Medium',
    tags: ['simple-system-design']
  });

  assert.equal(normalized.type, 'simple-system-design');
  assert.equal(normalized.difficulty, 'Medium');
  assert.deepEqual(normalized.tags, ['simple-system-design']);
});
