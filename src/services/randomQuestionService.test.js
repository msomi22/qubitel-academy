import test from 'node:test';
import assert from 'node:assert/strict';

import {
  getRandomQuestion,
  normalizeRandomQuestionFilters
} from './questionBankService.js';

const randomTopics = [
  {
    id: 'arrays',
    name: 'Arrays',
    category: 'dsa',
    description: 'Array practice.',
    questionBank: { mode: 'discovered' }
  },
  {
    id: 'api-design',
    name: 'API Design',
    category: 'system',
    description: 'API design practice.',
    questionBank: { mode: 'discovered' }
  },
  {
    id: 'hidden-topic',
    name: 'Hidden Topic',
    category: 'system',
    description: 'Hidden practice.',
    questionBank: { mode: 'discovered' }
  }
];

const visibleQuestions = [
  {
    id: 'arrays-001',
    type: 'coding',
    topicId: 'arrays',
    title: 'Two Sum',
    metadata: { reviewStatus: 'approved', visibility: ['dev', 'prod'], authoringVersion: 2 }
  },
  {
    id: 'api-design-001',
    type: 'simple-system-design',
    topicId: 'api-design',
    title: 'Design an API',
    metadata: { reviewStatus: 'approved', visibility: ['dev', 'prod'], authoringVersion: 2 }
  },
  {
    id: 'hidden-topic-draft-001',
    type: 'simple-system-design',
    topicId: 'hidden-topic',
    title: 'Draft hidden question',
    metadata: { reviewStatus: 'draft', visibility: ['dev'], authoringVersion: 2 }
  }
];

function randomOptions(questions = visibleQuestions, extraOptions = {}) {
  return {
    profile: 'prod',
    topics: randomTopics,
    modules: {},
    questions,
    getDiscoveredQuestions: async (topicId) => questions.filter((question) => question.topicId === topicId),
    ...extraOptions
  };
}

test('random filter normalization treats All categories and Any subtopic as no filter', () => {
  assert.deepEqual(
    normalizeRandomQuestionFilters({ category: 'all', topicId: '' }),
    { category: null, topicId: null }
  );
  assert.deepEqual(normalizeRandomQuestionFilters({ category: 'all' }), { category: null, topicId: null });
  assert.deepEqual(normalizeRandomQuestionFilters({ topicId: '' }), { category: null, topicId: null });
  assert.deepEqual(normalizeRandomQuestionFilters({ category: 'dsa', topicId: 'arrays' }), {
    category: 'dsa',
    topicId: 'arrays'
  });
  assert.deepEqual(normalizeRandomQuestionFilters({ category: 'all', topicId: 'grade-3/mathematics' }), {
    category: 'grade-3',
    topicId: 'mathematics'
  });
});

test('getRandomQuestion supports All categories with Any subtopic', async () => {
  const question = await getRandomQuestion({ category: 'all', topicId: '' }, randomOptions());

  assert.ok(['arrays-001', 'api-design-001'].includes(question.id));
  assert.notEqual(question.id, 'hidden-topic-draft-001');
});

test('getRandomQuestion does not treat all as a literal category id', async () => {
  const question = await getRandomQuestion({ category: 'all' }, randomOptions());

  assert.ok(['arrays-001', 'api-design-001'].includes(question.id));
});

test('getRandomQuestion does not treat an empty topicId as a literal topic id', async () => {
  const question = await getRandomQuestion({ topicId: '' }, randomOptions());

  assert.ok(['arrays-001', 'api-design-001'].includes(question.id));
});

test('getRandomQuestion still works without filters when visible questions exist', async () => {
  const question = await getRandomQuestion({}, randomOptions());

  assert.ok(['arrays-001', 'api-design-001'].includes(question.id));
});

test('getRandomQuestion preserves category-specific selection', async () => {
  const question = await getRandomQuestion({ category: 'dsa', topicId: '' }, randomOptions());

  assert.equal(question.id, 'arrays-001');
  assert.equal(question.category, 'dsa');
});

test('getRandomQuestion preserves topic-specific selection', async () => {
  const question = await getRandomQuestion({ category: 'all', topicId: 'api-design' }, randomOptions());

  assert.equal(question.id, 'api-design-001');
  assert.equal(question.parentTopic, 'API Design');
});

test('getRandomQuestion supports scoped topic ids when subjects repeat across grades', async () => {
  const duplicateSubjectTopics = [
    {
      id: 'mathematics',
      name: 'Mathematics',
      category: 'grade-1',
      description: 'Grade 1 Mathematics.',
      questionBank: { mode: 'discovered' }
    },
    {
      id: 'mathematics',
      name: 'Mathematics',
      category: 'grade-3',
      description: 'Grade 3 Mathematics.',
      questionBank: { mode: 'discovered' }
    }
  ];
  const duplicateSubjectQuestions = [
    {
      id: 'grade-1-math-001',
      type: 'multiple-choice',
      category: 'grade-1',
      topicId: 'mathematics',
      title: 'Grade 1 count',
      metadata: { reviewStatus: 'approved', visibility: ['dev', 'prod'], authoringVersion: 2 }
    },
    {
      id: 'grade-3-math-001',
      type: 'multiple-choice',
      category: 'grade-3',
      topicId: 'mathematics',
      title: 'Grade 3 multiply',
      metadata: { reviewStatus: 'approved', visibility: ['dev', 'prod'], authoringVersion: 2 }
    }
  ];

  const question = await getRandomQuestion(
    { category: 'all', topicId: 'grade-3/mathematics' },
    randomOptions(duplicateSubjectQuestions, {
      topics: duplicateSubjectTopics,
      getDiscoveredQuestions: async (topicId, { categoryId } = {}) => duplicateSubjectQuestions.filter((item) => (
        item.topicId === topicId && item.category === categoryId
      ))
    })
  );

  assert.equal(question.id, 'grade-3-math-001');
  assert.equal(question.category, 'grade-3');
});

test('getRandomQuestion rejects clearly when no visible question matches', async () => {
  await assert.rejects(
    () => getRandomQuestion({ category: 'system', topicId: 'hidden-topic' }, randomOptions()),
    /No questions available for the selected filters/
  );
});

test('getRandomQuestion excludes hidden profile-filtered questions from random selection', async () => {
  await assert.rejects(
    () => getRandomQuestion({ category: 'system', topicId: 'hidden-topic' }, randomOptions()),
    /No questions available for the selected filters/
  );
});
