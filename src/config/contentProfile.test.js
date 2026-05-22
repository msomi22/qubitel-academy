import test from 'node:test';
import assert from 'node:assert/strict';

import {
  filterCategoriesForActiveProfile,
  filterQuestionsForActiveProfile,
  filterTopicsForActiveProfile,
  isQuestionApprovedForProfile,
  isTopicVisibleForActiveProfile
} from './contentProfile.js';

const prod = { profile: 'prod' };
const dev = { profile: 'dev' };

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
  const approved = {
    id: 'new-approved-question-001',
    topicId: 'new-approved-topic',
    metadata: {
      reviewStatus: 'approved',
      visibility: ['dev', 'prod'],
      authoringVersion: 2
    }
  };

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

test('migrated DSA IDs are no longer approved by the legacy allow-list alone', () => {
  const legacyOnlyQuestions = [
    { id: 'sliding-window-001', topicId: 'sliding-window' },
    { id: 'dynamic-programming-020', topicId: 'dynamic-programming' }
  ];

  assert.deepEqual(filterQuestionsForActiveProfile(legacyOnlyQuestions, prod), []);
});

test('keeps multi-hyphen legacy approved production topics visible', () => {
  assert.equal(isTopicVisibleForActiveProfile('api-design', [], prod), true);
  assert.equal(isTopicVisibleForActiveProfile('messaging-queues', [], prod), true);
});

test('filters arrays safely using discovered production metadata', () => {
  const questions = [
    {
      id: 'sliding-window-001',
      topicId: 'sliding-window',
      metadata: { reviewStatus: 'approved', visibility: ['dev', 'prod'], authoringVersion: 2 }
    },
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
    {
      id: 'approved-topic-001',
      topicId: 'approved-topic',
      metadata: { reviewStatus: 'approved', visibility: ['dev', 'prod'], authoringVersion: 2 }
    }
  ];

  const filtered = filterTopicsForActiveProfile(topics, questions, prod);

  assert.deepEqual(filtered.map((topic) => topic.id), ['approved-topic']);
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
    {
      id: 'approved-topic-001',
      topicId: 'approved-topic',
      metadata: { reviewStatus: 'approved', visibility: ['dev', 'prod'], authoringVersion: 2 }
    }
  ];

  const filtered = filterCategoriesForActiveProfile(categories, topics, questions, prod);

  assert.deepEqual(filtered.map((category) => category.id), ['system']);
});
