import test from 'node:test';
import assert from 'node:assert/strict';

import {
  filterCategoriesForActiveProfile,
  filterQuestionsForActiveProfile,
  filterTopicsForActiveProfile,
  isLegacyQuestionApprovedForProduction,
  isQuestionApprovedForProfile,
  isTopicVisibleForActiveProfile
} from './contentProfile.js';

const prod = { profile: 'prod' };
const dev = { profile: 'dev' };

function approvedProblem(id, topicId, extra = {}) {
  return {
    id,
    topicId,
    metadata: {
      reviewStatus: 'approved',
      visibility: ['dev', 'prod'],
      authoringVersion: 2
    },
    ...extra
  };
}

test('dev shows draft discovered problem by default', () => {
  const draft = {
    id: 'draft-question-001',
    topicId: 'draft-topic',
    metadata: {
      reviewStatus: 'draft',
      visibility: ['dev'],
      authoringVersion: 2
    }
  };

  assert.equal(isQuestionApprovedForProfile(draft, dev), true);
});

test('prod hides draft discovered problem', () => {
  const draft = {
    id: 'draft-question-001',
    topicId: 'draft-topic',
    metadata: {
      reviewStatus: 'draft',
      visibility: ['dev'],
      authoringVersion: 2
    }
  };

  assert.equal(isQuestionApprovedForProfile(draft, prod), false);
});

test('prod shows approved discovered problem with prod visibility', () => {
  const approved = approvedProblem('new-approved-question-001', 'new-approved-topic');

  assert.equal(isQuestionApprovedForProfile(approved, prod), true);
});

test('prod hides approved discovered problem without prod visibility', () => {
  const approvedWithoutProd = {
    id: 'new-approved-question-002',
    topicId: 'new-approved-topic',
    metadata: {
      reviewStatus: 'approved',
      visibility: ['dev'],
      authoringVersion: 2
    }
  };

  assert.equal(isQuestionApprovedForProfile(approvedWithoutProd, prod), false);
});

test('legacy-only questions are hidden in prod when they lack approved production metadata', () => {
  const legacyOnlyQuestions = [
    { id: 'legacy-demo-001', topicId: 'legacy-topic' },
    { id: 'sliding-window-001', topicId: 'sliding-window' },
    { id: 'dynamic-programming-020', topicId: 'dynamic-programming' }
  ];

  assert.deepEqual(filterQuestionsForActiveProfile(legacyOnlyQuestions, prod), []);
});

test('migrated production IDs are no longer approved by the legacy allow-list alone', () => {
  assert.equal(isLegacyQuestionApprovedForProduction({ id: 'sliding-window-001' }), false);
  assert.equal(isLegacyQuestionApprovedForProduction({ id: 'dynamic-programming-020' }), false);
  assert.equal(isLegacyQuestionApprovedForProduction({ id: 'scalability-url-shortener-v2' }), false);
  assert.equal(isLegacyQuestionApprovedForProduction({ id: 'api-design-001' }), false);
});

test('prod shows migrated DSA and System Design problems only through metadata', () => {
  const migratedProblems = [
    approvedProblem('sliding-window-001', 'sliding-window', { category: 'dsa' }),
    approvedProblem('dynamic-programming-020', 'dynamic-programming', { category: 'dsa' }),
    approvedProblem('scalability-url-shortener-v2', 'scalability', { category: 'system' }),
    approvedProblem('api-design-001', 'api-design', { category: 'system' })
  ];

  assert.deepEqual(
    filterQuestionsForActiveProfile(migratedProblems, prod).map((question) => question.id),
    [
      'sliding-window-001',
      'dynamic-programming-020',
      'scalability-url-shortener-v2',
      'api-design-001'
    ]
  );
});

test('keeps multi-hyphen fallback production topics visible when discovered questions are not supplied', () => {
  assert.equal(isTopicVisibleForActiveProfile('api-design', [], prod), true);
  assert.equal(isTopicVisibleForActiveProfile('messaging-queues', [], prod), true);
});

test('topic fallback does not approve legacy-only questions in prod', () => {
  const legacyOnlyQuestions = [
    { id: 'api-design-legacy-only-001', topicId: 'api-design' },
    { id: 'messaging-queues-legacy-only-001', topicId: 'messaging-queues' }
  ];

  assert.deepEqual(filterQuestionsForActiveProfile(legacyOnlyQuestions, prod), []);
});

test('filters arrays safely using discovered production metadata', () => {
  const questions = [
    approvedProblem('sliding-window-001', 'sliding-window'),
    { id: 'draft-question-001', topicId: 'draft-question' }
  ];

  const filtered = filterQuestionsForActiveProfile(questions, prod);

  assert.deepEqual(filtered.map((question) => question.id), ['sliding-window-001']);
});

test('topic visibility works based on approved discovered problems', () => {
  const topics = [
    { id: 'draft-topic', category: 'system' },
    { id: 'approved-topic', category: 'system' }
  ];
  const questions = [
    {
      id: 'draft-topic-001',
      topicId: 'draft-topic',
      metadata: { reviewStatus: 'draft', visibility: ['dev'], authoringVersion: 2 }
    },
    approvedProblem('approved-topic-001', 'approved-topic')
  ];

  const filtered = filterTopicsForActiveProfile(topics, questions, prod);

  assert.deepEqual(filtered.map((topic) => topic.id), ['approved-topic']);
});

test('prod System Design topic visibility works from migrated discovered metadata', () => {
  const topics = [
    { id: 'scalability', category: 'system' },
    { id: 'api-design', category: 'system' },
    { id: 'hidden-system-topic', category: 'system' }
  ];
  const questions = [
    approvedProblem('scalability-url-shortener-v2', 'scalability', { category: 'system' }),
    approvedProblem('api-design-001', 'api-design', { category: 'system' }),
    { id: 'hidden-system-topic-001', topicId: 'hidden-system-topic' }
  ];

  assert.deepEqual(
    filterTopicsForActiveProfile(topics, questions, prod).map((topic) => topic.id),
    ['scalability', 'api-design']
  );
});

test('prod DSA topic visibility works from migrated discovered metadata', () => {
  const topics = [
    { id: 'sliding-window', category: 'dsa' },
    { id: 'dynamic-programming', category: 'dsa' },
    { id: 'hidden-dsa-topic', category: 'dsa' }
  ];
  const questions = [
    approvedProblem('sliding-window-001', 'sliding-window', { category: 'dsa' }),
    approvedProblem('dynamic-programming-020', 'dynamic-programming', { category: 'dsa' }),
    { id: 'hidden-dsa-topic-001', topicId: 'hidden-dsa-topic' }
  ];

  assert.deepEqual(
    filterTopicsForActiveProfile(topics, questions, prod).map((topic) => topic.id),
    ['sliding-window', 'dynamic-programming']
  );
});

test('category visibility works based on approved discovered topics', () => {
  const categories = [
    { id: 'dsa', name: 'Data Structures & Algorithms' },
    { id: 'system', name: 'System Design' }
  ];
  const topics = [
    { id: 'draft-topic', category: 'dsa' },
    { id: 'approved-topic', category: 'system' }
  ];
  const questions = [
    {
      id: 'draft-topic-001',
      topicId: 'draft-topic',
      metadata: { reviewStatus: 'draft', visibility: ['dev'], authoringVersion: 2 }
    },
    approvedProblem('approved-topic-001', 'approved-topic')
  ];

  const filtered = filterCategoriesForActiveProfile(categories, topics, questions, prod);

  assert.deepEqual(filtered.map((category) => category.id), ['system']);
});

test('prod category visibility works for migrated DSA and System Design categories', () => {
  const categories = [
    { id: 'dsa', name: 'Data Structures & Algorithms' },
    { id: 'system', name: 'System Design' },
    { id: 'demo', name: 'Demo' }
  ];
  const topics = [
    { id: 'sliding-window', category: 'dsa' },
    { id: 'scalability', category: 'system' },
    { id: 'demo-topic', category: 'demo' }
  ];
  const questions = [
    approvedProblem('sliding-window-001', 'sliding-window', { category: 'dsa' }),
    approvedProblem('scalability-url-shortener-v2', 'scalability', { category: 'system' }),
    { id: 'demo-topic-001', topicId: 'demo-topic' }
  ];

  const filtered = filterCategoriesForActiveProfile(categories, topics, questions, prod);

  assert.deepEqual(filtered.map((category) => category.id), ['dsa', 'system']);
});
