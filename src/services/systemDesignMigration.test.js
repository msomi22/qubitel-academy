import test from 'node:test';
import assert from 'node:assert/strict';

import {
  getVisibleCategoriesForActiveProfile,
  getVisibleTopicsForCategory,
  loadTopicBankFromSources
} from './questionBankService.js';
import { isLegacyQuestionApprovedForProduction } from '../config/contentProfile.js';

import apiRateLimiting from '../academies/tech/system/api-design/practice/api-design-rate-limiting-001.js';
import paymentIdempotency from '../academies/tech/system/api-design/practice/api-design-payment-idempotency-001.js';
import productDetailsCaching from '../academies/tech/system/caching/practice/caching-product-details-001.js';
import emailNotificationQueue from '../academies/tech/system/messaging-queues/practice/messaging-queues-email-notification-001.js';
import liveOrderStatusUpdates from '../academies/tech/system/scalability/practice/scalability-realtime-updates-001.js';
import multiRegionConsistency from '../academies/tech/system/databases/practice/databases-multi-region-consistency-001.js';
import urlShortener from '../academies/tech/system/scalability/practice/scalability-url-shortener-001.js';

const migratedSystemDesignProblems = [
  apiRateLimiting,
  productDetailsCaching,
  emailNotificationQueue,
  paymentIdempotency,
  liveOrderStatusUpdates,
  multiRegionConsistency,
  urlShortener
];

const productionSystemDesignIds = [
  'api-design-rate-limiting-001',
  'caching-product-details-001',
  'messaging-queues-email-notification-001',
  'api-design-payment-idempotency-001',
  'scalability-realtime-updates-001',
  'databases-multi-region-consistency-001',
  'scalability-url-shortener-001'
];

const systemTopics = [
  { id: 'api-design', name: 'API Design', category: 'system', description: 'API design topic.' },
  { id: 'caching', name: 'Caching', category: 'system', description: 'Caching topic.' },
  { id: 'messaging-queues', name: 'Messaging Queues', category: 'system', description: 'Messaging topic.' },
  { id: 'scalability', name: 'Scalability', category: 'system', description: 'Scalability topic.' },
  { id: 'databases', name: 'Databases', category: 'system', description: 'Databases topic.' }
];

function createBank(topicId, questions = []) {
  const topic = systemTopics.find((item) => item.id === topicId);

  return {
    id: topic.id,
    name: topic.name,
    category: topic.category,
    description: topic.description,
    questions
  };
}

function moduleLoader(defaultExport) {
  return async () => ({ default: defaultExport });
}

test('production profile shows approved discovered System Design problems', async () => {
  const bank = await loadTopicBankFromSources('api-design', {
    profile: 'prod',
    topics: systemTopics,
    modules: {
      '../academies/tech/_legacy/banks/system/api-design.js': moduleLoader(createBank('api-design', []))
    },
    getDiscoveredQuestions: async () => [apiRateLimiting, paymentIdempotency]
  });

  assert.deepEqual(bank.questions.map((question) => question.id), [
    'api-design-rate-limiting-001',
    'api-design-payment-idempotency-001'
  ]);
});

test('draft discovered System Design problems are hidden in prod', async () => {
  const bank = await loadTopicBankFromSources('caching', {
    profile: 'prod',
    topics: systemTopics,
    modules: {
      '../academies/tech/_legacy/banks/system/caching.js': moduleLoader(createBank('caching', []))
    },
    getDiscoveredQuestions: async () => [
      {
        ...productDetailsCaching,
        id: 'caching-draft-001',
        metadata: { reviewStatus: 'draft', visibility: ['dev'] }
      }
    ]
  });

  assert.deepEqual(bank.questions, []);
});

test('migrated discovered problems override legacy bank items with the same ID', async () => {
  const bank = await loadTopicBankFromSources('scalability', {
    topics: systemTopics,
    modules: {
      '../academies/tech/_legacy/banks/system/scalability.js': moduleLoader(createBank('scalability', [
        {
          id: 'scalability-realtime-updates-001',
          type: 'mcq',
          topicId: 'scalability',
          title: 'Legacy duplicate title'
        }
      ]))
    },
    getDiscoveredQuestions: async () => [liveOrderStatusUpdates]
  });

  assert.equal(bank.questions.length, 1);
  assert.equal(bank.questions[0].id, 'scalability-realtime-updates-001');
  assert.equal(bank.questions[0].title, 'Scaling Live Order Status Updates');
});

test('existing legacy bank support remains intact for non-production profiles', async () => {
  const legacyQuestion = {
    id: 'api-design-legacy-only-001',
    type: 'mcq',
    topicId: 'api-design',
    title: 'Legacy-only API design question',
    options: ['A', 'B'],
    correctAnswer: 0
  };

  const bank = await loadTopicBankFromSources('api-design', {
    profile: 'dev',
    topics: systemTopics,
    modules: {
      '../academies/tech/_legacy/banks/system/api-design.js': moduleLoader(createBank('api-design', [legacyQuestion]))
    },
    getDiscoveredQuestions: async () => [apiRateLimiting, paymentIdempotency]
  });

  assert.ok(bank.questions.some((question) => question.id === 'api-design-legacy-only-001'));
  assert.ok(bank.questions.some((question) => question.id === 'api-design-rate-limiting-001'));
  assert.ok(bank.questions.some((question) => question.id === 'api-design-payment-idempotency-001'));
});

test('topic and category visibility work for migrated System Design content', async () => {
  const visibleTopics = await getVisibleTopicsForCategory('system', {
    profile: 'prod',
    topics: systemTopics,
    questions: migratedSystemDesignProblems
  });

  assert.deepEqual(visibleTopics.map((topic) => topic.id), [
    'api-design',
    'caching',
    'messaging-queues',
    'scalability',
    'databases'
  ]);

  const visibleCategories = await getVisibleCategoriesForActiveProfile({
    profile: 'prod',
    categories: [
      { id: 'dsa', name: 'Data Structures & Algorithms' },
      { id: 'system', name: 'System Design' }
    ],
    topics: systemTopics,
    questions: migratedSystemDesignProblems
  });

  assert.deepEqual(visibleCategories.map((category) => category.id), ['system']);
});

test('production-visible System Design IDs still appear after migration', () => {
  assert.deepEqual(
    [...migratedSystemDesignProblems.map((problem) => problem.id)].sort(),
    [...productionSystemDesignIds].sort()
  );
});

test('obsolete System Design allow-list entries are no longer required for migrated questions', () => {
  assert.deepEqual(
    productionSystemDesignIds.filter((id) => isLegacyQuestionApprovedForProduction({ id })),
    []
  );
});

test('Scaling Live Order Status Updates is a discovered prod-visible problem', () => {
  assert.equal(liveOrderStatusUpdates.id, 'scalability-realtime-updates-001');
  assert.equal(liveOrderStatusUpdates.title, 'Scaling Live Order Status Updates');
  assert.equal(liveOrderStatusUpdates.topicId, 'scalability');
  assert.deepEqual(liveOrderStatusUpdates.metadata.reviewStatus, 'approved');
  assert.deepEqual(liveOrderStatusUpdates.metadata.visibility, ['dev', 'prod']);
});
