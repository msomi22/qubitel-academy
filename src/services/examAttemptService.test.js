import assert from 'node:assert/strict';
import test from 'node:test';

import {
  buildExamAttempt,
  buildExamDisplayMetadata,
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
  assert.equal(examEntry.estimatedTime, '1 min');
});

test('timed comprehension exam entries expose reading guide and strict question timing', () => {
  const entries = createExamEntries([
    {
      id: 'timed-reading-q001',
      type: 'mcq',
      title: 'Question 1',
      question: 'Choose.',
      options: ['a', 'b', 'c', 'd'],
      correctAnswer: 0,
      estimatedTimeSeconds: 60,
      explanation: 'a',
      category: 'grade-3',
      topicId: 'english',
      metadata: {
        assessmentType: 'exam',
        examId: 'timed-reading-001',
        examTitle: 'Timed Reading 1',
        examMode: 'timed-comprehension',
        timedComprehensionExam: {
          readingGuideSeconds: 600,
          questionTimeSeconds: 60
        },
        sequence: 10
      }
    }
  ]);

  const examEntry = entries.find((entry) => entry.id === 'timed-reading-001');

  assert.equal(examEntry.difficulty, 'Timed Exam');
  assert.equal(examEntry.estimatedTime, '11 min');
  assert.equal(examEntry.metadata.examMode, 'timed-comprehension');
  assert.equal(examEntry.metadata.readingGuideSeconds, 600);
  assert.equal(examEntry.metadata.questionTimeSeconds, 60);
});

test('CBC exam entries expose short card titles and fuller page titles', () => {
  const cbcQuestions = [
    {
      id: 'class-library-q001',
      type: 'mcq',
      title: 'Question 1',
      options: ['a', 'b', 'c', 'd'],
      correctAnswer: 0,
      estimatedTimeSeconds: 60,
      category: 'grade-3',
      topicId: 'english',
      tags: ['cbc', 'grade-3', 'english', 'reading-comprehension'],
      metadata: {
        assessmentType: 'exam',
        examId: 'reading-comprehension-class-library-exam-001',
        examTitle: 'Grade 3 English Timed Comprehension Exam 1',
        learningAreaId: 'reading-comprehension',
        examMode: 'timed-comprehension',
        timedComprehensionExam: {
          passageTitle: 'The New Class Library',
          readingGuideSeconds: 600,
          questionTimeSeconds: 60
        },
        sequence: 1000
      }
    },
    {
      id: 'faithful-collie-q001',
      type: 'mcq',
      title: 'Question 1',
      options: ['a', 'b', 'c', 'd'],
      correctAnswer: 0,
      estimatedTimeSeconds: 60,
      category: 'grade-3',
      topicId: 'english',
      tags: ['cbc', 'grade-3', 'english', 'reading-comprehension'],
      metadata: {
        assessmentType: 'exam',
        examId: 'grade-3-english-comprehension-faithful-collie-exam-011',
        examTitle: 'Grade 3 English Comprehension Exam 011: The Faithful Collie',
        learningAreaId: 'reading-comprehension',
        examMode: 'timed-comprehension',
        timedComprehensionExam: {
          passageTitle: 'The Faithful Collie',
          readingGuideSeconds: 600,
          questionTimeSeconds: 60
        },
        sequence: 1100
      }
    },
    {
      id: 'spelling-q001',
      type: 'mcq',
      title: 'Question 1',
      options: ['a', 'b', 'c', 'd'],
      correctAnswer: 0,
      estimatedTimeSeconds: 30,
      category: 'grade-3',
      topicId: 'english',
      tags: ['cbc', 'grade-3', 'english', 'spelling'],
      metadata: {
        assessmentType: 'exam',
        examId: 'grade-3-spelling-classroom-items-exam-007',
        examTitle: 'Spelling Exam 7: Classroom Items',
        learningAreaId: 'spelling',
        sequence: 150
      }
    }
  ];

  const entries = createExamEntries(cbcQuestions);
  const classLibrary = entries.find((entry) => entry.id === 'reading-comprehension-class-library-exam-001');
  const faithfulCollie = entries.find((entry) => entry.id === 'grade-3-english-comprehension-faithful-collie-exam-011');
  const spelling = entries.find((entry) => entry.id === 'grade-3-spelling-classroom-items-exam-007');

  assert.equal(classLibrary.title, 'Exam 1: Class Library');
  assert.equal(classLibrary.metadata.examPageTitle, 'Exam 1: Grade 3 - Class Library');
  assert.equal(classLibrary.estimatedTime, '11 min');
  assert.equal(faithfulCollie.title, 'Exam 2: The Faithful Collie');
  assert.equal(faithfulCollie.metadata.examPageTitle, 'Exam 2: Grade 3 - The Faithful Collie');
  assert.equal(spelling.title, 'Spelling 7: Classroom Items');
  assert.equal(spelling.metadata.examPageTitle, 'Spelling 7: Grade 3 - Classroom Items');

  assert.equal(
    buildExamDisplayMetadata(
      'grade-3-english-comprehension-faithful-collie-exam-011',
      [cbcQuestions[1]],
      cbcQuestions
    ).pageTitle,
    'Exam 2: Grade 3 - The Faithful Collie'
  );
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
  assert.deepEqual(attempt.answers['exam-001-q001'].options, ['wrong', 'right', 'other', 'last']);
  assert.equal(attempt.answers['exam-001-q001'].correctAnswerIndex, 1);
});
