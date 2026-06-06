import test from 'node:test';
import assert from 'node:assert/strict';

import {
  createVirtualBank,
  getVisibleCategoriesForActiveProfile,
  getVisibleTopicsForCategory,
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
  },
  {
    id: 'scalability',
    name: 'Scalability',
    category: 'system',
    description: 'A system design topic with metadata-driven legacy merges.',
    questionBank: {
      legacyMerges: [
        {
          path: '../academies/tech/_legacy/banks/system/complex-system-design.js',
          idPrefixFrom: 'complex-system-design-',
          idPrefixTo: 'scalability-',
          topicId: 'scalability',
          finalPattern: 'Scalability',
          tags: ['scalability']
        }
      ]
    }
  },
  {
    id: 'custom-merge-topic',
    name: 'Custom Merge Topic',
    category: 'system',
    description: 'A topic that proves legacy merges are config-driven.',
    questionBank: {
      legacyMerges: [
        {
          path: '../academies/tech/_legacy/banks/system/custom-complex.js',
          idPrefixFrom: 'complex-system-design-',
          idPrefixTo: 'custom-merge-topic-',
          topicId: 'custom-merge-topic',
          tags: ['custom-merge-topic']
        }
      ]
    }
  },
  {
    id: 'plain-system-topic',
    name: 'Plain System Topic',
    category: 'system',
    description: 'A system topic without legacy merge metadata.',
    questionBank: { mode: 'empty' }
  }
];

const discoveredVisibilityTopics = topics.filter((topic) => (
  topic.id === 'discovered-only' || topic.id === 'plain-system-topic'
));

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
      '../academies/tech/_legacy/banks/dsa/legacy-topic.js': moduleLoader(legacyBank)
    },
    getDiscoveredQuestions: async () => []
  });

  assert.equal(bank.id, legacyBank.id);
  assert.equal(bank.name, legacyBank.name);
  assert.equal(bank.category, legacyBank.category);
  assert.deepEqual(bank.questions, legacyBank.questions);
});

test('legacy system-design type normalizes to simple-system-design from registry metadata', async () => {
  const legacyBank = createVirtualBank(topics[4], [
    {
      id: 'scalability-legacy-system-design',
      type: 'system-design',
      topicId: 'scalability',
      title: 'Legacy system design question',
      tags: ['system-design']
    }
  ]);

  const bank = await loadTopicBankFromSources('scalability', {
    topics,
    modules: {
      '../academies/tech/_legacy/banks/system/scalability.js': moduleLoader(legacyBank)
    },
    getDiscoveredQuestions: async () => []
  });

  assert.equal(bank.questions[0].type, 'simple-system-design');
  assert.equal(bank.questions[0].difficulty, 'Easy');
  assert.deepEqual(bank.questions[0].tags, ['simple-system-design']);
});

test('legacy production-scenario type normalizes to simple-system-design from registry metadata', async () => {
  const legacyBank = createVirtualBank(topics[4], [
    {
      id: 'scalability-legacy-production-scenario',
      type: 'production-scenario',
      topicId: 'scalability',
      title: 'Legacy production scenario',
      tags: ['production-scenario', 'system']
    }
  ]);

  const bank = await loadTopicBankFromSources('scalability', {
    topics,
    modules: {
      '../academies/tech/_legacy/banks/system/scalability.js': moduleLoader(legacyBank)
    },
    getDiscoveredQuestions: async () => []
  });

  assert.equal(bank.questions[0].type, 'simple-system-design');
  assert.equal(bank.questions[0].difficulty, 'Easy');
  assert.deepEqual(bank.questions[0].tags, ['simple-system-design', 'system']);
});

test.skip('normal simple-system-design problems continue working', async () => {
  const simpleProblem = {
    id: 'scalability-simple-001',
    type: 'simple-system-design',
    topicId: 'scalability',
    title: 'Normal simple system design question',
    difficulty: 'Medium',
    tags: ['simple-system-design']
  };
  const legacyBank = createVirtualBank(topics[4], [simpleProblem]);

  const bank = await loadTopicBankFromSources('scalability', {
    topics,
    modules: {
      '../academies/tech/_legacy/banks/system/scalability.js': moduleLoader(legacyBank)
    },
    getDiscoveredQuestions: async () => []
  });

  assert.deepEqual(bank.questions[0], {
    ...simpleProblem,
    category: undefined,
    difficulty: 'Easy',
    tags: ['simple-system-design'],
    prompt: '',
    question: '',
    options: undefined,
    answer: undefined,
    correctAnswer: undefined,
    explanation: undefined,
    hints: undefined,
    starterThought: undefined,
    relatedConcepts: undefined,
    references: undefined,
    followUpQuestions: undefined,
    scoring: undefined,
    metadata: {}
  });
});

test('complex system-design questions still merge into scalability from manifest metadata', async () => {
  const scalabilityBank = createVirtualBank(topics[4], [
    { id: 'scalability-existing-001', type: 'simple-system-design', topicId: 'scalability', title: 'Existing simple question' }
  ]);
  const complexBank = createVirtualBank(
    { id: 'complex-system-design', name: 'Complex System Design', category: 'system' },
    [
      {
        id: 'complex-system-design-url-shortener-001',
        type: 'complex-system-design',
        topicId: 'complex-system-design',
        title: 'Design a URL Shortener',
        tags: ['complex-system-design']
      }
    ]
  );

  const bank = await loadTopicBankFromSources('scalability', {
    topics,
    modules: {
      '../academies/tech/_legacy/banks/system/scalability.js': moduleLoader(scalabilityBank),
      '../academies/tech/_legacy/banks/system/complex-system-design.js': moduleLoader(complexBank)
    },
    getDiscoveredQuestions: async () => []
  });

  const mergedQuestion = bank.questions.find((question) => question.id === 'scalability-url-shortener-001');
  assert.ok(mergedQuestion);
  assert.equal(mergedQuestion.topicId, 'scalability');
  assert.equal(mergedQuestion.finalPattern, 'Scalability');
  assert.deepEqual(mergedQuestion.tags, ['complex-system-design', 'scalability']);
});

test('question bank service does not merge complex system design without topic metadata', async () => {
  const plainBank = createVirtualBank(topics[6], []);
  const complexBank = createVirtualBank(
    { id: 'complex-system-design', name: 'Complex System Design', category: 'system' },
    [
      { id: 'complex-system-design-url-shortener-001', type: 'complex-system-design', topicId: 'complex-system-design', title: 'Design a URL Shortener' }
    ]
  );

  const bank = await loadTopicBankFromSources('plain-system-topic', {
    topics,
    modules: {
      '../academies/tech/_legacy/banks/system/plain-system-topic.js': moduleLoader(plainBank),
      '../academies/tech/_legacy/banks/system/complex-system-design.js': moduleLoader(complexBank)
    },
    getDiscoveredQuestions: async () => []
  });

  assert.deepEqual(bank.questions, []);
});

test('metadata-driven complex merge supports configurable source paths', async () => {
  const baseBank = createVirtualBank(topics[5], []);
  const customComplexBank = createVirtualBank(
    { id: 'complex-system-design', name: 'Complex System Design', category: 'system' },
    [
      { id: 'complex-system-design-custom-001', type: 'complex-system-design', topicId: 'complex-system-design', title: 'Custom complex prompt' }
    ]
  );

  const bank = await loadTopicBankFromSources('custom-merge-topic', {
    topics,
    modules: {
      '../academies/tech/_legacy/banks/system/custom-merge-topic.js': moduleLoader(baseBank),
      '../academies/tech/_legacy/banks/system/custom-complex.js': moduleLoader(customComplexBank)
    },
    getDiscoveredQuestions: async () => []
  });

  assert.deepEqual(bank.questions.map((question) => question.id), ['custom-merge-topic-custom-001']);
  assert.equal(bank.questions[0].topicId, 'custom-merge-topic');
  assert.deepEqual(bank.questions[0].tags, ['custom-merge-topic']);
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

test('prod hides draft discovered questions in topic bank', async () => {
  const bank = await loadTopicBankFromSources('discovered-only', {
    profile: 'prod',
    topics,
    modules: {},
    getDiscoveredQuestions: async () => [
      {
        id: 'discovered-only-draft-001',
        type: 'production-scenario',
        topicId: 'discovered-only',
        title: 'Draft discovered question',
        metadata: { reviewStatus: 'draft', visibility: ['dev'], authoringVersion: 2 }
      }
    ]
  });

  assert.deepEqual(bank.questions, []);
});

test('prod shows approved discovered questions with prod visibility in topic bank', async () => {
  const bank = await loadTopicBankFromSources('discovered-only', {
    profile: 'prod',
    topics,
    modules: {},
    getDiscoveredQuestions: async () => [
      {
        id: 'discovered-only-approved-001',
        type: 'production-scenario',
        topicId: 'discovered-only',
        title: 'Approved discovered question',
        metadata: { reviewStatus: 'approved', visibility: ['dev', 'prod'], authoringVersion: 2 }
      }
    ]
  });

  assert.deepEqual(bank.questions.map((question) => question.id), ['discovered-only-approved-001']);
});

test('service topic visibility uses approved discovered problems', async () => {
  const visibleTopics = await getVisibleTopicsForCategory('system', {
    profile: 'prod',
    topics: discoveredVisibilityTopics,
    questions: [
      {
        id: 'discovered-only-approved-001',
        topicId: 'discovered-only',
        metadata: { reviewStatus: 'approved', visibility: ['dev', 'prod'], authoringVersion: 2 }
      },
      {
        id: 'plain-system-topic-draft-001',
        topicId: 'plain-system-topic',
        metadata: { reviewStatus: 'draft', visibility: ['dev'], authoringVersion: 2 }
      }
    ]
  });

  assert.deepEqual(visibleTopics.map((topic) => topic.id), ['discovered-only']);
});

test('service category visibility uses approved discovered topics', async () => {
  const visibleCategories = await getVisibleCategoriesForActiveProfile({
    profile: 'prod',
    categories: [
      { id: 'dsa', name: 'Data Structures & Algorithms' },
      { id: 'system', name: 'System Design' }
    ],
    topics: discoveredVisibilityTopics,
    questions: [
      {
        id: 'discovered-only-approved-001',
        topicId: 'discovered-only',
        metadata: { reviewStatus: 'approved', visibility: ['dev', 'prod'], authoringVersion: 2 }
      }
    ]
  });

  assert.deepEqual(visibleCategories.map((category) => category.id), ['system']);
});

test('profile override loads discovered metadata when questions are not explicitly supplied', async () => {
  const visibleTopics = await getVisibleTopicsForCategory('system', {
    profile: 'prod',
    topics: discoveredVisibilityTopics,
    getAllDiscoveredQuestions: async () => [
      {
        id: 'discovered-only-approved-001',
        topicId: 'discovered-only',
        metadata: { reviewStatus: 'approved', visibility: ['dev', 'prod'], authoringVersion: 2 }
      }
    ]
  });

  assert.deepEqual(visibleTopics.map((topic) => topic.id), ['discovered-only']);
});

test('explicit empty questions option remains an intentional override', async () => {
  const visibleTopics = await getVisibleTopicsForCategory('system', {
    profile: 'prod',
    topics: discoveredVisibilityTopics,
    questions: []
  });

  assert.deepEqual(visibleTopics, []);
});

test('discovered question overrides duplicate legacy question by id', async () => {
  const legacyBank = createVirtualBank(topics[0], [
    { id: 'legacy-topic-001', type: 'coding', topicId: 'legacy-topic', title: 'Legacy version' },
    { id: 'legacy-topic-002', type: 'coding', topicId: 'legacy-topic', title: 'Legacy only' }
  ]);

  const bank = await loadTopicBankFromSources('legacy-topic', {
    topics,
    modules: {
      '../academies/tech/_legacy/banks/dsa/legacy-topic.js': moduleLoader(legacyBank)
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

test('category-scoped topic loading keeps duplicate subject ids isolated', async () => {
  const duplicateSubjectTopics = [
    {
      id: 'english',
      name: 'Grade 1 English',
      category: 'grade-1',
      academyId: 'cbc',
      questionBank: { mode: 'empty' }
    },
    {
      id: 'english',
      name: 'Grade 3 English',
      category: 'grade-3',
      academyId: 'cbc',
      questionBank: { mode: 'empty' }
    }
  ];
  const lookupCategories = [];
  const getDiscoveredQuestions = async (topicId, options = {}) => {
    lookupCategories.push(options.categoryId);
    if (topicId !== 'english' || options.categoryId !== 'grade-3') return [];
    return [{ id: 'spelling-practice-001', type: 'mcq', topicId: 'english', category: 'grade-3', title: 'Spelling' }];
  };

  const gradeOneBank = await loadTopicBankFromSources('english', {
    topics: duplicateSubjectTopics,
    modules: {},
    categoryId: 'grade-1',
    getDiscoveredQuestions
  });
  const gradeThreeBank = await loadTopicBankFromSources('english', {
    topics: duplicateSubjectTopics,
    modules: {},
    categoryId: 'grade-3',
    getDiscoveredQuestions
  });

  assert.equal(gradeOneBank.category, 'grade-1');
  assert.equal(gradeThreeBank.category, 'grade-3');
  assert.deepEqual(gradeOneBank.questions, []);
  assert.deepEqual(gradeThreeBank.questions.map((question) => question.id), ['spelling-practice-001']);
  assert.deepEqual(lookupCategories, ['grade-1', 'grade-3']);
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

test('topicProgress uses exact question ids when migrated content has old prefixes', () => {
  const progress = topicProgress(
    {
      id: 'mathematics',
      count: 2,
      questionIds: [
        'foundation-practice-counting-three-stars-007',
        'foundation-practice-counting-after-five-008'
      ]
    },
    {
      'foundation-practice-counting-three-stars-007': true,
      'foundation-practice-counting-after-five-008': false,
      'mathematics-unrelated-001': true
    }
  );

  assert.deepEqual(progress, { done: 1, total: 2, percent: 50 });
});
