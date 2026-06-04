import test from 'node:test';
import assert from 'node:assert/strict';

import { isQuestionApprovedForProfile } from '../config/contentProfile.js';
import dynamicProgramming020 from '../academies/tech/dsa/dynamic-programming/practice/dynamic-programming-020.js';
import slidingWindow001 from '../academies/tech/dsa/sliding-window/practice/sliding-window-001.js';
import dynamicProgrammingLegacy from '../academies/tech/_legacy/banks/dsa/minimum-sideway-jumps.js';
import slidingWindowLegacyTopic from '../academies/tech/_legacy/banks/dsa/sliding-window.js';
import javaCoreProblem from '../academies/tech/java/java-core/lessons/hashmap-behavior.js';
import systemDesignProblem from '../academies/tech/system/scalability/practice/url-shortener-v2.js';
import { discoverProblems } from './problemDiscovery.js';
import {
  getVisibleCategoriesForActiveProfile,
  getVisibleTopicsForCategory,
  loadTopicBankFromSources
} from '../services/questionBankService.js';

function moduleLoader(defaultExport) {
  return async () => ({ default: defaultExport });
}

const dsaTopics = [
  {
    id: 'sliding-window',
    name: 'WIND — Sliding Window',
    category: 'dsa',
    description: 'Use moving contiguous windows for subarray and substring questions while maintaining a validity invariant.'
  },
  {
    id: 'dynamic-programming',
    name: 'STATE — Dynamic Programming',
    category: 'dsa',
    description: 'Define states, transitions, base cases, and computation order for overlapping subproblems.'
  }
];

test('Phase 2 production DSA problems expose approved prod metadata', () => {
  for (const problem of [slidingWindow001, dynamicProgramming020]) {
    assert.equal(problem.category, 'dsa');
    assert.equal(problem.metadata.reviewStatus, 'approved');
    assert.deepEqual(problem.metadata.visibility, ['dev', 'prod']);
    assert.equal(isQuestionApprovedForProfile(problem, { profile: 'prod' }), true);
  }
});

test('Phase 2 production DSA problems keep expected IDs and topics', () => {
  assert.equal(slidingWindow001.id, 'sliding-window-001');
  assert.equal(slidingWindow001.topicId, 'sliding-window');
  assert.equal(dynamicProgramming020.id, 'dynamic-programming-020');
  assert.equal(dynamicProgramming020.topicId, 'dynamic-programming');
});

test('dynamic-programming-020 preserves rich DSA learning assets from legacy source', () => {
  assert.equal(dynamicProgramming020.title, dynamicProgrammingLegacy.title);
  assert.deepEqual(dynamicProgramming020.examples, dynamicProgrammingLegacy.examples);
  assert.deepEqual(dynamicProgramming020.constraints, dynamicProgrammingLegacy.constraints);
  assert.deepEqual(dynamicProgramming020.hints, dynamicProgrammingLegacy.hints);
  assert.deepEqual(dynamicProgramming020.visualWalkthrough, dynamicProgrammingLegacy.visualWalkthrough);
  assert.deepEqual(dynamicProgramming020.solutionCode, dynamicProgrammingLegacy.solutionCode);
  assert.deepEqual(dynamicProgramming020.complexityAnalysis, dynamicProgrammingLegacy.complexityAnalysis);
  assert.deepEqual(dynamicProgramming020.relatedConcepts, dynamicProgrammingLegacy.relatedConcepts);
  assert.deepEqual(dynamicProgramming020.references, dynamicProgrammingLegacy.references);
});

test('sliding-window-001 preserves legacy DSA content and external visual walkthrough lookup ID', () => {
  const legacyProblem = slidingWindowLegacyTopic.questions.find((question) => question.id === 'sliding-window-001');

  assert.equal(slidingWindow001.title, legacyProblem.title);
  assert.equal(slidingWindow001.question, legacyProblem.question);
  assert.deepEqual(slidingWindow001.constraints, legacyProblem.constraints);
  assert.deepEqual(slidingWindow001.hints, legacyProblem.hints);
  assert.equal(slidingWindow001.visualExplanation, legacyProblem.visualExplanation);
  assert.equal(slidingWindow001.id, 'sliding-window-001');
});

test('production DSA migrated problems are discovered from problem files', async () => {
  const problems = await discoverProblems({
    modules: {
      '../academies/tech/dsa/sliding-window/practice/sliding-window-001.js': moduleLoader(slidingWindow001),
      '../academies/tech/dsa/dynamic-programming/practice/dynamic-programming-020.js': moduleLoader(dynamicProgramming020)
    },
    topics: dsaTopics
  });

  assert.deepEqual(problems.map((problem) => problem.id), [
    'sliding-window-001',
    'dynamic-programming-020'
  ]);
});

test('migrated DSA problems load under correct topics and override duplicate legacy IDs', async () => {
  const slidingBank = await loadTopicBankFromSources('sliding-window', {
    profile: 'prod',
    topics: dsaTopics,
    modules: {
      '../academies/tech/_legacy/banks/dsa/sliding-window.js': moduleLoader(slidingWindowLegacyTopic)
    },
    getDiscoveredQuestions: async () => [slidingWindow001]
  });

  const dynamicBank = await loadTopicBankFromSources('dynamic-programming', {
    profile: 'prod',
    topics: dsaTopics,
    modules: {
      '../academies/tech/_legacy/banks/dsa/dynamic-programming.js': moduleLoader({
        id: 'dynamic-programming',
        name: 'STATE — Dynamic Programming',
        category: 'dsa',
        questions: [dynamicProgrammingLegacy]
      })
    },
    getDiscoveredQuestions: async () => [dynamicProgramming020]
  });

  assert.deepEqual(slidingBank.questions.map((question) => question.id), ['sliding-window-001']);
  assert.deepEqual(dynamicBank.questions.map((question) => question.id), ['dynamic-programming-020']);
  assert.equal(slidingBank.questions[0].metadata.reviewStatus, 'approved');
  assert.equal(dynamicBank.questions[0].metadata.reviewStatus, 'approved');
});

test('dummy local-only legacy DSA questions remain available outside prod profile', async () => {
  const bank = await loadTopicBankFromSources('sliding-window', {
    profile: 'dev',
    topics: dsaTopics,
    modules: {
      '../academies/tech/_legacy/banks/dsa/sliding-window.js': moduleLoader(slidingWindowLegacyTopic)
    },
    getDiscoveredQuestions: async () => [slidingWindow001]
  });

  assert.ok(bank.questions.length > 1);
  assert.ok(bank.questions.some((question) => question.id === 'sliding-window-002'));
});

test('prod topic and category visibility includes DSA topics from migrated metadata', async () => {
  const topics = await getVisibleTopicsForCategory('dsa', {
    profile: 'prod',
    topics: dsaTopics,
    questions: [slidingWindow001, dynamicProgramming020]
  });

  const categories = await getVisibleCategoriesForActiveProfile({
    profile: 'prod',
    categories: [{ id: 'dsa', name: 'Data Structures & Algorithms' }],
    topics: dsaTopics,
    questions: [slidingWindow001, dynamicProgramming020]
  });

  assert.deepEqual(topics.map((topic) => topic.id), ['sliding-window', 'dynamic-programming']);
  assert.deepEqual(categories.map((category) => category.id), ['dsa']);
});

test('Phase 1 System Design and existing Java discovered problems still expose prod metadata', () => {
  assert.equal(systemDesignProblem.topicId, 'scalability');
  assert.equal(systemDesignProblem.metadata.reviewStatus, 'approved');
  assert.equal(isQuestionApprovedForProfile(systemDesignProblem, { profile: 'prod' }), true);

  assert.equal(javaCoreProblem.topicId, 'java-core');
  assert.equal(javaCoreProblem.metadata.reviewStatus, 'approved');
  assert.equal(isQuestionApprovedForProfile(javaCoreProblem, { profile: 'prod' }), true);
});
