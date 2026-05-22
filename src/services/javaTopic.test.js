import test from 'node:test';
import assert from 'node:assert/strict';

import { validateProblem } from '../problems/validateProblem.js';
import {
  getCategory,
  getOptionalBankPath,
  getTopicsForCategory,
  getVisibleTopicsForCategory,
  loadTopicBankFromSources
} from './questionBankService.js';

import passByValueProblem from '../data/problems/java/java-core/pass-by-value-object-references.js';
import equalsProblem from '../data/problems/java/java-core/equals-vs-double-equals.js';
import hashMapProblem from '../data/problems/java/java-core/hashmap-behavior.js';
import exceptionsProblem from '../data/problems/java/java-core/checked-vs-unchecked-exceptions.js';

const javaProblems = [
  passByValueProblem,
  equalsProblem,
  hashMapProblem,
  exceptionsProblem
];

function javaCoreTopic() {
  return getTopicsForCategory('java').find((topic) => topic.id === 'java-core');
}

test('getCategory("java") returns Java category metadata', () => {
  const category = getCategory('java');

  assert.equal(category.name, 'Java');
  assert.equal(category.shortName, 'Java');
  assert.equal(category.route, '/category/java');
  assert.equal(category.featured, true);
});

test('getTopicsForCategory("java") includes java-core discovered topic', () => {
  const topics = getTopicsForCategory('java');

  assert.ok(topics.some((topic) => topic.id === 'java-core'));
  assert.equal(javaCoreTopic().questionBank.mode, 'discovered');
});

test('visible Java category topics include java-core when discovered prod questions exist', async () => {
  const topics = await getVisibleTopicsForCategory('java', {
    profile: 'prod',
    questions: javaProblems
  });

  assert.deepEqual(topics.map((topic) => topic.id), ['java-core']);
});

test('java-core loads from discovered problems without a legacy bank', async () => {
  const topic = javaCoreTopic();

  assert.equal(getOptionalBankPath(topic, {}), null);

  const bank = await loadTopicBankFromSources('java-core', {
    modules: {},
    getDiscoveredQuestions: async () => javaProblems
  });

  assert.equal(bank.id, 'java-core');
  assert.equal(bank.category, 'java');
  assert.deepEqual(bank.questions.map((problem) => problem.id), javaProblems.map((problem) => problem.id));
});

test('Java MCQ correctAnswer values are normalized to option indexes', () => {
  assert.equal(passByValueProblem.correctAnswer, 1);
  assert.equal(passByValueProblem.answer, 1);
  assert.equal(equalsProblem.correctAnswer, 0);
  assert.equal(equalsProblem.answer, 0);
});

test('Java rich body exists and validates', () => {
  assert.ok(Array.isArray(hashMapProblem.body));
  assert.ok(hashMapProblem.body.some((block) => block.type === 'section'));
  assert.ok(hashMapProblem.body.some((block) => block.type === 'callout'));
  assert.ok(hashMapProblem.body.some((block) => block.type === 'table'));
  assert.ok(hashMapProblem.body.some((block) => block.type === 'checklist'));
  assert.ok(hashMapProblem.body.some((block) => block.type === 'comparison'));
  assert.ok(hashMapProblem.body.some((block) => block.type === 'code'));

  const validation = validateProblem(hashMapProblem);
  assert.equal(validation.valid, true, JSON.stringify(validation.errors));
});

test('Java prod visibility exposes all approved Java problems', async () => {
  const bank = await loadTopicBankFromSources('java-core', {
    profile: 'prod',
    modules: {},
    getDiscoveredQuestions: async () => javaProblems
  });

  assert.deepEqual(bank.questions.map((problem) => problem.id), javaProblems.map((problem) => problem.id));
});

test('existing legacy/discovered topic behavior still works alongside Java', async () => {
  const discoveredOnlyTopic = {
    id: 'discovered-only-regression',
    name: 'Discovered Regression',
    category: 'system',
    description: 'Regression topic for discovered-only loading.',
    questionBank: { mode: 'discovered' }
  };

  const bank = await loadTopicBankFromSources('discovered-only-regression', {
    topics: [discoveredOnlyTopic],
    modules: {},
    getDiscoveredQuestions: async () => [
      {
        id: 'discovered-only-regression-001',
        type: 'simple-system-design',
        category: 'system',
        topicId: 'discovered-only-regression',
        title: 'Regression discovered problem',
        difficulty: 'Easy',
        prompt: 'Explain why discovered-only topics still load.'
      }
    ]
  });

  assert.deepEqual(bank.questions.map((problem) => problem.id), ['discovered-only-regression-001']);
});
