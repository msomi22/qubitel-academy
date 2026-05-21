import test from 'node:test';
import assert from 'node:assert/strict';

import {
  createVirtualBank,
  loadTopicBankFromSources,
  mergeQuestionsById,
  topicProgress
} from './questionBankService.js';

const topics = [
  {
    id: 'legacy-topic',
    name: 'Legacy Topic',
    category: 'dsa',
    description: 'A topic backed by a legacy bank.'
  },
  {
    id: 'discovered-only',
    name: 'Discovered Only',
    category: 'system',
    description: 'A topic backed only by discovered problems.',
    questionBank: { mode: 'discovered' }
  },
  {
    id: 'empty-topic',
    name: 'Empty Topic',
    category: 'dsa',
    description: 'A topic that intentionally has no questions yet.',
    questionBank: { mode: 'empty' }
  },
  {
    id: 'missing-bank-topic',
    name: 'Missing Bank Topic',
    category: 'dsa',
    description: 'A topic missing its legacy bank unexpectedly.'
  }
];

function moduleLoader(defaultExport) {
  return async () => ({ default: defaultExport });
}

test('legacy topic loads as before when a legacy bank exists', async () => {
  const legacyBank = {
    id: 'legacy-topic',
    name: 'Legacy Topic',
    category: 'dsa',
    description: 'A topic backed by a legacy bank.',
    questions: [
      { id: 'legacy-topic-001', type: 'coding', topicId: 'legacy-topic', title: 'Legacy question' }
    ]
  };

  const bank = await loadTopicBankFromSources('legacy-topic', {
    topics,
    modules: {
      '../data/banks/dsa/legacy-topic.js': moduleLoader(legacyBank)
    },
    getDiscoveredQuestions: async () => []
  });

  assert.equal(bank.id, legacyBank.id);
  assert.equal(bank.name, legacyBank.name);
  assert.equal(bank.category, legacyBank.category);
  assert.deepEqual(bank.questions, legacyBank.questions);
});

test('discovered-only topic loads without a legacy bank by creating a virtual bank', async () => {
  const discoveredQuestion = {
    id: 'discovered-only-001',
    type: 'production-scenario',
    topicId: 'discovered-only',
    title: 'Discovered question'
  };

  const bank = await loadTopicBankFromSources('discovered-only', {
    topics,
    modules: {},
    getDiscoveredQuestions: async () => [discoveredQuestion]
  });

  assert.equal(bank.id, 'discovered-only');
  assert.equal(bank.name, 'Discovered Only');
  assert.equal(bank.category, 'system');
  assert.deepEqual(bank.questions.map((question) => question.id), ['discovered-only-001']);
  assert.equal(bank.questions[0].title, 'Discovered question');
});

test('discovered question overrides duplicate legacy question by id', async () => {
  const legacyBank = createVirtualBank(topics[0], [
    { id: 'legacy-topic-001', type: 'coding', topicId: 'legacy-topic', title: 'Legacy version' },
    { id: 'legacy-topic-002', type: 'coding', topicId: 'legacy-topic', title: 'Legacy only' }
  ]);

  const bank = await loadTopicBankFromSources('legacy-topic', {
    topics,
    modules: {
      '../data/banks/dsa/legacy-topic.js': moduleLoader(legacyBank)
    },
    getDiscoveredQuestions: async () => [
      { id: 'legacy-topic-001', type: 'coding', topicId: 'legacy-topic', title: 'Discovered version' }
    ]
  });

  assert.deepEqual(bank.questions.map((question) => question.id), ['legacy-topic-001', 'legacy-topic-002']);
  assert.equal(bank.questions[0].title, 'Discovered version');
});

test('topic with no questions returns an empty bank safely after discovered lookup when explicitly opted in', async () => {
  let discoveredLookupCount = 0;

  const bank = await loadTopicBankFromSources('empty-topic', {
    topics,
    modules: {},
    getDiscoveredQuestions: async () => {
      discoveredLookupCount += 1;
      return [];
    }
  });

  assert.equal(discoveredLookupCount, 1);
  assert.equal(bank.id, 'empty-topic');
  assert.deepEqual(bank.questions, []);
});

test('missing legacy bank without discovered questions or explicit opt-in errors clearly', async () => {
  await assert.rejects(
    () => loadTopicBankFromSources('missing-bank-topic', {
      topics,
      modules: {},
      getDiscoveredQuestions: async () => []
    }),
    /Missing quiz bank file for missing-bank-topic/
  );
});

test('unknown topicId still errors clearly', async () => {
  await assert.rejects(
    () => loadTopicBankFromSources('missing-topic', {
      topics,
      modules: {},
      getDiscoveredQuestions: async () => []
    }),
    /Unknown topic bank: missing-topic/
  );
});

test('mergeQuestionsById prefers migrated problem files and avoids duplicate IDs', () => {
  const migratedProblems = [
    { id: 'scalability-001', title: 'Migrated A', category: 'system', topicId: 'scalability' },
    { id: 'scalability-002', title: 'Migrated B', category: 'system', topicId: 'scalability' }
  ];

  const legacyQuestions = [
    { id: 'scalability-001', title: 'Legacy A', category: 'system', topicId: 'scalability' },
    { id: 'scalability-003', title: 'Legacy C', category: 'system', topicId: 'scalability' }
  ];

  const merged = mergeQuestionsById(migratedProblems, legacyQuestions);

  assert.deepEqual(merged.map((question) => question.id), ['scalability-001', 'scalability-002', 'scalability-003']);
  assert.equal(merged.find((question) => question.id === 'scalability-001').title, 'Migrated A');
});

test('mergeQuestionsById keeps legacy questions visible when migrated discovery is empty', () => {
  const legacyQuestions = [
    { id: 'api-design-001', title: 'Legacy API item', category: 'system', topicId: 'api-design' }
  ];

  assert.deepEqual(mergeQuestionsById([], legacyQuestions), legacyQuestions);
});

test('mergeQuestionsById ignores malformed entries without IDs', () => {
  const merged = mergeQuestionsById(
    [{ title: 'Missing ID' }, null, { id: 'graphs-001', title: 'Graph BFS' }],
    [{ id: 'graphs-001', title: 'Legacy Graph BFS' }, { id: 'graphs-002', title: 'Graph DFS' }]
  );

  assert.deepEqual(merged.map((question) => question.id), ['graphs-001', 'graphs-002']);
});

test('topicProgress keeps existing ID-prefix completed status behavior', () => {
  const progress = topicProgress(
    { id: 'scalability', count: 3 },
    {
      'scalability-001': true,
      'scalability-002': false,
      'databases-001': true,
      'scalability-extra': true
    }
  );

  assert.deepEqual(progress, { done: 2, total: 3, percent: 67 });
});
