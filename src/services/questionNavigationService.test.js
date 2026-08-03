import assert from 'node:assert/strict';
import test from 'node:test';

import {
  buildProblemPath,
  getAdjacentQuestions,
  getQuestionsForNavigationScope,
  resolveQuestionNavigationScope
} from './questionNavigationService.js';

const questions = [
  { id: 'q1', title: 'Question 1', topicId: 'topic-a', category: 'cat-a' },
  { id: 'q2', title: 'Question 2', topicId: 'topic-a', category: 'cat-a' },
  { id: 'q3', title: 'Question 3', topicId: 'topic-a', category: 'cat-a' }
];

test('getAdjacentQuestions returns previous and next question for a middle item', () => {
  const result = getAdjacentQuestions(questions, 'q2');

  assert.equal(result.previousQuestion.id, 'q1');
  assert.equal(result.nextQuestion.id, 'q3');
  assert.equal(result.currentIndex, 1);
  assert.equal(result.total, 3);
});

test('getAdjacentQuestions hides previous on first item and next on last item', () => {
  const first = getAdjacentQuestions(questions, 'q1');
  const last = getAdjacentQuestions(questions, 'q3');

  assert.equal(first.previousQuestion, null);
  assert.equal(first.nextQuestion.id, 'q2');
  assert.equal(last.previousQuestion.id, 'q2');
  assert.equal(last.nextQuestion, null);
});

test('getAdjacentQuestions returns empty navigation for unknown question', () => {
  const result = getAdjacentQuestions(questions, 'missing');

  assert.equal(result.previousQuestion, null);
  assert.equal(result.nextQuestion, null);
  assert.equal(result.currentIndex, -1);
  assert.equal(result.total, 3);
});

test('resolveQuestionNavigationScope derives learning area metadata from the current question', () => {
  const question = {
    id: 'reading-q4',
    title: 'Reading question 4',
    topicId: 'english',
    category: 'grade-3',
    metadata: {
      manifestEntry: {
        kind: 'practice',
        learningAreaId: 'reading-comprehension'
      }
    }
  };
  const topic = {
    id: 'english',
    name: 'English',
    category: 'grade-3',
    learningAreas: [
      { id: 'reading-comprehension', title: 'Reading Comprehension' }
    ]
  };

  const scope = resolveQuestionNavigationScope({ question, topic, category: { id: 'grade-3', name: 'Grade 3' } });

  assert.deepEqual(scope, {
    categoryId: 'grade-3',
    categoryName: 'Grade 3',
    topicId: 'english',
    topicName: 'English',
    learningAreaId: 'reading-comprehension',
    learningAreaTitle: 'Reading Comprehension',
    contentKind: 'practice'
  });
});

test('getQuestionsForNavigationScope keeps navigation inside learning area and content kind', () => {
  const scopedQuestions = [
    {
      id: 'reading-lesson',
      title: 'Reading lesson',
      topicId: 'english',
      category: 'grade-3',
      type: 'learning',
      metadata: {
        manifestEntry: { kind: 'lesson', learningAreaId: 'reading-comprehension' }
      }
    },
    {
      id: 'reading-q1',
      title: 'Reading question 1',
      topicId: 'english',
      category: 'grade-3',
      type: 'mcq',
      metadata: {
        manifestEntry: { kind: 'practice', learningAreaId: 'reading-comprehension' }
      }
    },
    {
      id: 'reading-q2',
      title: 'Reading question 2',
      topicId: 'english',
      category: 'grade-3',
      type: 'mcq',
      metadata: {
        manifestEntry: { kind: 'practice', learningAreaId: 'reading-comprehension' }
      }
    },
    {
      id: 'spelling-q1',
      title: 'Spelling question 1',
      topicId: 'english',
      category: 'grade-3',
      type: 'mcq',
      metadata: {
        manifestEntry: { kind: 'practice', learningAreaId: 'spelling' }
      }
    },
    {
      id: 'numbers-q1',
      title: 'Numbers question 1',
      topicId: 'mathematics',
      category: 'grade-3',
      type: 'mcq',
      metadata: {
        manifestEntry: { kind: 'practice', learningAreaId: 'numbers' }
      }
    }
  ];
  const scope = resolveQuestionNavigationScope({
    question: scopedQuestions[1],
    topic: {
      id: 'english',
      name: 'English',
      category: 'grade-3',
      learningAreas: [{ id: 'reading-comprehension', title: 'Reading Comprehension' }]
    },
    category: { id: 'grade-3', name: 'Grade 3' }
  });

  const result = getQuestionsForNavigationScope(scopedQuestions, scope);

  assert.deepEqual(result.map((question) => question.id), ['reading-q1', 'reading-q2']);
});

test('getQuestionsForNavigationScope returns no navigation when scope cannot be inferred', () => {
  assert.deepEqual(getQuestionsForNavigationScope(questions, null), []);
});

test('buildProblemPath preserves learning area scope in the practice URL', () => {
  assert.equal(
    buildProblemPath('reading q1', { learningAreaId: 'reading-comprehension' }),
    '/practice/reading%20q1?scope=reading-comprehension'
  );
});
