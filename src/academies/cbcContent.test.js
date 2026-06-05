import assert from 'node:assert/strict';
import test from 'node:test';

import gradeOneFoundation from './cbc/grade-1/foundation-practice/practice/foundation-practice-001.js';
import gradeOneCountingExam from './cbc/grade-1/foundation-practice/assessments/counting-exam-001.js';
import gradeOneObjectMatchingExam from './cbc/grade-1/foundation-practice/assessments/object-matching-exam-001.js';
import lesson from './cbc/grade-3/english/lessons/spelling-lesson-001.js';
import practiceOne from './cbc/grade-3/english/practice/spelling-practice-001.js';
import practiceTwo from './cbc/grade-3/english/practice/spelling-practice-002.js';
import examOne from './cbc/grade-3/english/assessments/spelling-exam-001.js';
import examTwo from './cbc/grade-3/english/assessments/spelling-exam-002.js';
import { getAcademyCatalog } from './catalog.js';
import { validateProblemCollection } from '../problems/validateProblem.js';

const cbcTopics = getAcademyCatalog('cbc').topics;
const gradeOneFoundationExamQuestions = [...gradeOneCountingExam, ...gradeOneObjectMatchingExam];
const gradeOneQuestions = [...gradeOneFoundation, ...gradeOneFoundationExamQuestions];
const gradeThreeQuestions = [lesson, ...practiceOne, ...practiceTwo, ...examOne, ...examTwo];
const allQuestions = [...gradeOneQuestions, ...gradeThreeQuestions];

test('CBC Grade 1 foundation practice has two questions per pilot learning area', () => {
  const expectedSkills = [
    'recognition',
    'listening',
    'matching',
    'counting',
    'reading-simple-words',
    'choosing-clear-options'
  ];

  assert.equal(gradeOneFoundation.length, 12);
  assert.equal(new Set(gradeOneFoundation.map((question) => question.id)).size, 12);

  for (const skill of expectedSkills) {
    assert.equal(
      gradeOneFoundation.filter((question) => question.metadata.skill === skill).length,
      2,
      skill
    );
  }
});

test('CBC Grade 1 foundation practice is question-only read-aloud enabled, manual by default, and timed for 60 seconds', () => {
  for (const question of gradeOneFoundation) {
    assert.equal(question.category, 'grade-1', question.id);
    assert.equal(question.topicId, 'foundation-practice', question.id);
    assert.equal(question.estimatedTimeSeconds, 60, question.id);
    assert.equal(question.interactionType, 'visual-mcq', question.id);
    assert.equal(question.readAloud, true, question.id);
    assert.equal(question.autoReadAloud, false, question.id);
    assert.equal(question.readOptionsAloud, false, question.id);
    assert.equal(question.metadata.readOptionsAloud, false, question.id);
    assert.ok(question.readAloudText, question.id);
    assert.equal(question.options.length, 3, question.id);
    assert.equal(question.optionVisuals.length, question.options.length, question.id);
    assert.ok(question.promptVisual || question.optionVisuals.length, question.id);
    assert.ok(Number.isInteger(question.correctAnswer), question.id);
    assert.ok(question.body?.some((block) => block.type === 'section' && block.title === 'Objective'), question.id);
  }
});

test('CBC Grade 1 visual exams have 15 question-only read-aloud questions each and required metadata', () => {
  assert.equal(gradeOneCountingExam.length, 15);
  assert.equal(gradeOneObjectMatchingExam.length, 15);

  for (const question of gradeOneFoundationExamQuestions) {
    assert.equal(question.category, 'grade-1', question.id);
    assert.equal(question.topicId, 'foundation-practice', question.id);
    assert.equal(question.estimatedTimeSeconds, 60, question.id);
    assert.equal(question.interactionType, 'visual-mcq', question.id);
    assert.equal(question.metadata.assessmentType, 'exam', question.id);
    assert.ok(['counting-exam-001', 'object-matching-exam-001'].includes(question.metadata.examId), question.id);
    assert.ok(question.metadata.examTitle, question.id);
    assert.equal(question.metadata.points, 1, question.id);
    assert.equal(question.readAloud, true, question.id);
    assert.equal(question.autoReadAloud, false, question.id);
    assert.equal(question.readOptionsAloud, false, question.id);
    assert.equal(question.metadata.readOptionsAloud, false, question.id);
    assert.equal(question.options.length, 3, question.id);
    assert.equal(question.optionVisuals.length, question.options.length, question.id);
    assert.ok(question.promptVisual, question.id);
    assert.ok(Number.isInteger(question.correctAnswer), question.id);
  }
});

test('CBC Grade 1 only exposes Foundation Practice in the active catalog', () => {
  const gradeOneTopics = cbcTopics.filter((topic) => topic.category === 'grade-1').map((topic) => topic.id);

  assert.deepEqual(gradeOneTopics, ['foundation-practice']);
  assert.equal(cbcTopics.some((topic) => topic.id === 'phonics'), false);
});

test('CBC Grade 1 wording avoids unclear blank instructions', () => {
  for (const question of gradeOneQuestions) {
    assert.doesNotMatch(question.question, /blank/i, question.id);
    assert.doesNotMatch(question.readAloudText, /blank/i, question.id);
  }
});

test('CBC content is valid and includes unique ids', () => {
  const validation = validateProblemCollection(allQuestions, { topics: cbcTopics });

  assert.deepEqual(validation.errors, []);
  assert.equal(new Set(allQuestions.map((question) => question.id)).size, allQuestions.length);
});

test('CBC spelling collections have the required sizes and unique ids', () => {
  assert.equal(practiceOne.length, 10);
  assert.equal(practiceTwo.length, 10);
  assert.equal(examOne.length, 20);
  assert.equal(examTwo.length, 20);
  assert.equal(new Set(gradeThreeQuestions.map((question) => question.id)).size, gradeThreeQuestions.length);
});

test('CBC spelling content is valid and includes a learner-facing Objective', () => {
  const validation = validateProblemCollection(gradeThreeQuestions, { topics: cbcTopics });

  assert.deepEqual(validation.errors, []);
  assert.ok(gradeThreeQuestions.every((question) => (
    question.body?.some((block) => block.type === 'section' && block.title === 'Objective')
  )));
});

test('CBC spelling MCQs have exactly four options and one configured answer', () => {
  const mcqs = [...practiceOne, ...practiceTwo, ...examOne, ...examTwo];

  for (const question of mcqs) {
    assert.equal(question.options.length, 4, question.id);
    assert.equal(new Set(question.options).size, 4, question.id);
    assert.ok(Number.isInteger(question.correctAnswer), question.id);
    assert.ok(question.correctAnswer >= 0 && question.correctAnswer < 4, question.id);
    assert.ok(question.explanation, question.id);
  }
});

test('CBC spelling exam questions carry the required exam metadata and timing', () => {
  for (const question of [...examOne, ...examTwo]) {
    assert.equal(question.estimatedTimeSeconds, 30, question.id);
    assert.equal(question.metadata.assessmentType, 'exam', question.id);
    assert.ok(question.metadata.examId, question.id);
    assert.ok(question.metadata.examTitle, question.id);
    assert.equal(question.metadata.points, 1, question.id);
  }
});
