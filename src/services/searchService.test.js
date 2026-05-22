import test from 'node:test';
import assert from 'node:assert/strict';

import { categoryManifest, topicManifest } from '../data/topicManifest.js';
import hashmapBehavior from '../data/problems/java/java-core/hashmap-behavior.js';
import checkedVsUncheckedExceptions from '../data/problems/java/java-core/checked-vs-unchecked-exceptions.js';
import equalsVsDoubleEquals from '../data/problems/java/java-core/equals-vs-double-equals.js';
import passByValueObjectReferences from '../data/problems/java/java-core/pass-by-value-object-references.js';
import { discoverProblems, getDiscoveredQuestionsForTopic } from '../problems/problemDiscovery.js';
import {
  filterCategoriesForActiveProfile,
  filterQuestionsForActiveProfile,
  filterTopicsForActiveProfile
} from '../config/contentProfile.js';
import { searchQuestionIndex } from './searchService.js';

const javaProblemModules = {
  '../data/problems/java/java-core/hashmap-behavior.js': { default: hashmapBehavior },
  '../data/problems/java/java-core/checked-vs-unchecked-exceptions.js': { default: checkedVsUncheckedExceptions },
  '../data/problems/java/java-core/equals-vs-double-equals.js': { default: equalsVsDoubleEquals },
  '../data/problems/java/java-core/pass-by-value-object-references.js': { default: passByValueObjectReferences }
};

function makeSearchIndex(questions, topicId = 'java-core') {
  const topic = topicManifest.find((item) => item.id === topicId);

  return questions.map((question) => ({
    id: question.id,
    topicId: topic.id,
    topicName: topic.name,
    topicDescription: topic.description,
    category: topic.category,
    difficulty: question.difficulty,
    type: question.type,
    tags: question.tags || [],
    snippet: question.prompt || question.question || question.explanation || '',
    question,
    searchText: [
      topic.id,
      topic.name,
      topic.description,
      topic.category,
      question.id,
      question.category,
      question.topicId,
      question.type,
      question.title,
      question.tags?.join(' '),
      question.prompt,
      question.question,
      question.finalPattern,
      question.explanation
    ].filter(Boolean).join(' ').toLowerCase()
  }));
}

function titlesFor(query, index, filters = {}) {
  return searchQuestionIndex(index, { query, ...filters }).map((entry) => entry.question.title);
}

test('production profile includes Java category search results', async () => {
  const questions = await discoverProblems({ modules: javaProblemModules, topics: topicManifest });
  const prodQuestions = filterQuestionsForActiveProfile(questions, { profile: 'prod' });
  const prodTopics = filterTopicsForActiveProfile(topicManifest, questions, { profile: 'prod' });
  const prodCategories = filterCategoriesForActiveProfile(
    categoryManifest,
    topicManifest,
    questions,
    { profile: 'prod' }
  );
  const searchIndex = makeSearchIndex(prodQuestions);

  assert.ok(prodTopics.some((topic) => topic.id === 'java-core'));
  assert.ok(prodCategories.some((category) => category.id === 'java'));
  assert.ok(titlesFor('HashMap', searchIndex, { category: 'java' }).includes('HashMap Behavior at a High Level'));
});

test('java-core questions are discoverable from src/data/problems/java/java-core', async () => {
  const questions = await getDiscoveredQuestionsForTopic('java-core', {
    modules: javaProblemModules,
    topics: topicManifest
  });

  assert.deepEqual(
    questions.map((question) => question.id).sort(),
    [
      'java-core-checked-vs-unchecked-exceptions-001',
      'java-core-equals-vs-double-equals-001',
      'java-core-hashmap-behavior-001',
      'java-core-pass-by-value-object-references-001'
    ]
  );
});

test('production Java search returns expected Java Core questions', async () => {
  const questions = await discoverProblems({ modules: javaProblemModules, topics: topicManifest });
  const prodQuestions = filterQuestionsForActiveProfile(questions, { profile: 'prod' });
  const index = makeSearchIndex(prodQuestions);

  assert.ok(titlesFor('HashMap', index).includes('HashMap Behavior at a High Level'));
  assert.ok(titlesFor('checked exception', index).includes('Checked vs Unchecked Exceptions'));
  assert.ok(titlesFor('equals', index).includes('equals() vs =='));
  assert.ok(titlesFor('pass-by-value', index).includes('Java Pass-by-Value and Object References'));
});

test('production Java search excludes unapproved or dev-only Java questions', async () => {
  const devOnlyQuestion = {
    ...hashmapBehavior,
    id: 'java-core-dev-only-001',
    title: 'Unreleased Sentinel Concept',
    prompt: 'This draft question covers unreleased-sentinel-concept.',
    metadata: {
      reviewStatus: 'draft',
      visibility: ['dev']
    }
  };

  const questions = await discoverProblems({
    modules: {
      ...javaProblemModules,
      '../data/problems/java/java-core/dev-only.js': { default: devOnlyQuestion }
    },
    topics: topicManifest
  });
  const prodQuestions = filterQuestionsForActiveProfile(questions, { profile: 'prod' });
  const index = makeSearchIndex(prodQuestions);

  assert.equal(titlesFor('unreleased-sentinel-concept', index).length, 0);
});

test('search regression keeps System Design and DSA results working', () => {
  const index = [
    ...makeSearchIndex([
      {
        id: 'scalability-cache-001',
        type: 'simple-system-design',
        category: 'system',
        topicId: 'scalability',
        title: 'Design a Cache',
        difficulty: 'Medium',
        prompt: 'Design a cache for read-heavy traffic.',
        tags: ['system', 'cache']
      }
    ], 'scalability'),
    ...makeSearchIndex([
      {
        id: 'sliding-window-longest-001',
        type: 'coding',
        category: 'dsa',
        topicId: 'sliding-window',
        title: 'Longest Window',
        difficulty: 'Medium',
        prompt: 'Find the longest valid sliding window.',
        tags: ['dsa', 'sliding-window']
      }
    ], 'sliding-window')
  ];

  assert.ok(titlesFor('cache', index, { category: 'system' }).includes('Design a Cache'));
  assert.ok(titlesFor('sliding window', index, { category: 'dsa' }).includes('Longest Window'));
});
