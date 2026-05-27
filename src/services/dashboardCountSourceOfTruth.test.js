import test from 'node:test';
import assert from 'node:assert/strict';

import {
  getAllTopicsWithCounts,
  getCategoriesWithCounts,
  getCategoryWithCounts,
  getTopicsWithCounts,
  loadTopicBank,
  progressSummary,
  topicProgress
} from './questionBankService.js';

const dashboardTopics = [
  {
    id: 'sliding-window',
    name: 'WIND — Sliding Window',
    category: 'dsa',
    description: 'Use moving contiguous windows.',
    questionBank: { mode: 'discovered' }
  },
  {
    id: 'binary-search',
    name: 'SEAR — Binary Search',
    category: 'dsa',
    description: 'Search monotonic spaces.',
    questionBank: { mode: 'discovered' }
  }
];

function createOptions(discoveredQuestions, extraOptions = {}) {
  return {
    topics: dashboardTopics,
    modules: {},
    questions: discoveredQuestions,
    getDiscoveredQuestions: async (topicId) => discoveredQuestions.filter((question) => question.topicId === topicId),
    ...extraOptions
  };
}

test('dashboard topic counts use the same loaded bank totals as topic pages', async () => {
  const discoveredQuestions = [
    { id: 'sliding-window-001', type: 'coding', topicId: 'sliding-window', title: 'Fixed window max sum' },
    { id: 'sliding-window-002', type: 'multiple-choice', topicId: 'sliding-window', title: 'Window state' },
    { id: 'sliding-window-003', type: 'coding', topicId: 'sliding-window', title: 'Minimum size subarray sum' },
    { id: 'binary-search-001', type: 'coding', topicId: 'binary-search', title: 'Classic binary search' }
  ];
  const options = createOptions(discoveredQuestions);

  const categoryPageBanks = await Promise.all(
    dashboardTopics.map(async (topic) => [topic.id, await loadTopicBank(topic.id, options)])
  );
  const topicPageCounts = Object.fromEntries(
    categoryPageBanks.map(([topicId, bank]) => [topicId, bank.questions.length])
  );

  const dashboardTopicsWithCounts = await getTopicsWithCounts('dsa', options);
  const allDashboardTopicsWithCounts = await getAllTopicsWithCounts(options);
  const categorySummary = await getCategoryWithCounts('dsa', {}, options);
  const categories = await getCategoriesWithCounts({}, options);
  const summary = await progressSummary({}, options);

  assert.deepEqual(
    Object.fromEntries(dashboardTopicsWithCounts.map((topic) => [topic.id, topic.count])),
    topicPageCounts
  );
  assert.equal(topicPageCounts['sliding-window'], 3);
  assert.equal(allDashboardTopicsWithCounts.reduce((sum, topic) => sum + topic.count, 0), 4);
  assert.equal(categorySummary.quizCount, 4);
  assert.equal(categories.find((category) => category.id === 'dsa').quizCount, 4);
  assert.equal(summary.total, 4);
});

test('dashboard counts preserve profile filtering and exclude hidden visible-bank questions', async () => {
  const discoveredQuestions = [
    {
      id: 'sliding-window-approved-001',
      type: 'coding',
      topicId: 'sliding-window',
      title: 'Approved Sliding Window question',
      metadata: { reviewStatus: 'approved', visibility: ['dev', 'prod'], authoringVersion: 2 }
    },
    {
      id: 'sliding-window-draft-001',
      type: 'coding',
      topicId: 'sliding-window',
      title: 'Draft Sliding Window question',
      metadata: { reviewStatus: 'draft', visibility: ['dev'], authoringVersion: 2 }
    },
    {
      id: 'binary-search-draft-001',
      type: 'coding',
      topicId: 'binary-search',
      title: 'Draft Binary Search question',
      metadata: { reviewStatus: 'draft', visibility: ['dev'], authoringVersion: 2 }
    }
  ];
  const options = createOptions(discoveredQuestions, { profile: 'prod' });

  const slidingWindowBank = await loadTopicBank('sliding-window', options);
  const binarySearchBank = await loadTopicBank('binary-search', options);
  const topicsWithCounts = await getAllTopicsWithCounts(options);
  const summary = await progressSummary({
    'sliding-window-approved-001': true,
    'sliding-window-draft-001': true,
    'binary-search-draft-001': true,
    'unrelated-visible-looking-id': true
  }, options);

  assert.deepEqual(slidingWindowBank.questions.map((question) => question.id), ['sliding-window-approved-001']);
  assert.deepEqual(binarySearchBank.questions, []);
  assert.equal(topicsWithCounts.find((topic) => topic.id === 'sliding-window').count, 1);
  assert.equal(topicsWithCounts.find((topic) => topic.id === 'binary-search').count, 0);
  assert.deepEqual(summary, { total: 1, done: 1, percent: 100 });
});

test('recommendation and weak-area progress calculations consume corrected topic totals', async () => {
  const discoveredQuestions = [
    { id: 'sliding-window-001', type: 'coding', topicId: 'sliding-window', title: 'Fixed window max sum' },
    { id: 'sliding-window-002', type: 'multiple-choice', topicId: 'sliding-window', title: 'Window state' },
    { id: 'sliding-window-003', type: 'coding', topicId: 'sliding-window', title: 'Minimum size subarray sum' }
  ];
  const options = createOptions(discoveredQuestions);

  const [slidingWindowTopic] = await getTopicsWithCounts('dsa', options);
  const progress = topicProgress(slidingWindowTopic, {
    'sliding-window-001': true,
    'sliding-window-002': false,
    'sliding-window-003': false
  });

  assert.equal(slidingWindowTopic.count, 3);
  assert.deepEqual(progress, { done: 1, total: 3, percent: 33 });
});
