import assert from 'node:assert/strict';
import test from 'node:test';

import {
  buildExamAttempt,
  createExamEntries,
  isExamQuestion
} from './examAttemptService.js';

const questions = [
  {
    id: 'practice-001',
    type: 'mcq',
    title: 'Practice',
    metadata: { sequence: 1 }
  },
  {
    id: 'exam-001-q001',
    type: 'mcq',
    title: 'Question 1',
    question: 'Choose.',
    options: ['wrong', 'right', 'other', 'last'],
    correctAnswer: 1,
    estimatedTimeSeconds: 30,
    explanation: 'right is correct.',
    metadata: {
      assessmentType: 'exam',
      examId: 'exam-001',
      examTitle: 'Exam 1',
      sequence: 10
    }
  },
  {
    id: 'exam-001-q002',
    type: 'mcq',
    title: 'Question 2',
    question: 'Choose.',
    options: ['yes', 'no', 'maybe', 'later'],
    correctAnswer: 0,
    estimatedTimeSeconds: 30,
    explanation: 'yes is correct.',
    metadata: {
      assessmentType: 'exam',
      examId: 'exam-001',
      examTitle: 'Exam 1',
      sequence: 11
    }
  }
];

test('groups exam questions into one learner-facing exam entry', () => {
  const entries = createExamEntries(questions);
  const examEntry = entries.find((entry) => entry.id === 'exam-001');

  assert.equal(entries.length, 2);
  assert.equal(isExamQuestion(questions[1]), true);
  assert.equal(examEntry.title, 'Exam 1');
  assert.equal(examEntry.examQuestions.length, 2);
  assert.equal(examEntry.estimatedTime, '2 questions | 30s each');
});

test('grades correct, incorrect, and timed-out answers separately', () => {
  const attempt = buildExamAttempt({
    examId: 'exam-001',
    examTitle: 'Exam 1',
    questions: questions.slice(1),
    answers: {
      'exam-001-q001': { selectedAnswer: 1, timedOut: false },
      'exam-001-q002': { selectedAnswer: null, timedOut: true }
    },
    attemptNumber: 2,
    status: 'completed',
    startedAt: '2026-06-04T10:00:00.000Z',
    completedAt: '2026-06-04T10:02:00.000Z'
  });

  assert.equal(attempt.correctCount, 1);
  assert.equal(attempt.incorrectCount, 0);
  assert.equal(attempt.unansweredCount, 1);
  assert.equal(attempt.percentage, 50);
  assert.equal(attempt.answers['exam-001-q002'].timedOut, true);
  assert.equal(attempt.answers['exam-001-q001'].selectedAnswer, 'right');
});
