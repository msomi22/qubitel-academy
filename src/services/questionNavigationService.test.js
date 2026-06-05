import assert from 'node:assert/strict';
import test from 'node:test';

import { getAdjacentQuestions } from './questionNavigationService.js';

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
