import assert from 'node:assert/strict';
import test from 'node:test';

import gradeOneFoundation from './cbc/grade-1/foundation-practice/practice/foundation-practice-001.js';
import gradeOneCountingExam from './cbc/grade-1/foundation-practice/assessments/counting-exam-001.js';
import gradeOneObjectMatchingExam from './cbc/grade-1/foundation-practice/assessments/object-matching-exam-001.js';
import alphabetLesson from './cbc/grade-1/phonics/lessons/alphabet-sounds-lesson-001.js';
import vowelLesson from './cbc/grade-1/phonics/lessons/vowel-sounds-lesson-001.js';
import alphabetPractice from './cbc/grade-1/phonics/practice/alphabet-sounds-practice-001.js';
import vowelPractice from './cbc/grade-1/phonics/practice/vowel-sounds-practice-001.js';
import alphabetExam from './cbc/grade-1/phonics/assessments/alphabet-sounds-exam-001.js';
import vowelExam from './cbc/grade-1/phonics/assessments/vowel-sounds-exam-001.js';
import lesson from './cbc/grade-3/english/lessons/spelling-lesson-001.js';
import practiceOne from './cbc/grade-3/english/practice/spelling-practice-001.js';
import practiceTwo from './cbc/grade-3/english/practice/spelling-practice-002.js';
import examOne from './cbc/grade-3/english/assessments/spelling-exam-001.js';
import examTwo from './cbc/grade-3/english/assessments/spelling-exam-002.js';
import { getAcademyCatalog } from './catalog.js';
import { validateProblemCollection } from '../problems/validateProblem.js';

const cbcTopics = getAcademyCatalog('cbc').topics;
const gradeOneFoundationExamQuestions = [...gradeOneCountingExam, ...gradeOneObjectMatchingExam];
const gradeOnePhonicsPractice = [...alphabetPractice, ...vowelPractice];
const gradeOnePhonicsExams = [...alphabetExam, ...vowelExam];
const gradeOnePhonicsQuestions = [alphabetLesson, vowelLesson, ...gradeOnePhonicsPractice, ...gradeOnePhonicsExams];
const gradeOneQuestions = [...gradeOneFoundation, ...gradeOneFoundationExamQuestions, ...gradeOnePhonicsQuestions];
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

test('CBC Grade 1 foundation practice is read-aloud enabled, manual by default, and timed for 60 seconds', () => {
  for (const question of gradeOneFoundation) {
    assert.equal(question.category, 'grade-1', question.id);
    assert.equal(question.topicId, 'foundation-practice', question.id);
    assert.equal(question.estimatedTimeSeconds, 60, question.id);
    assert.equal(question.interactionType, 'visual-mcq', question.id);
    assert.equal(question.readAloud, true, question.id);
    assert.equal(question.autoReadAloud, false, question.id);
    assert.equal(question.readOptionsAloud, true, question.id);
    assert.ok(question.readAloudText, question.id);
    assert.equal(question.options.length, 4, question.id);
    assert.equal(new Set(question.options).size, 4, question.id);
    assert.equal(question.optionVisuals.length, question.options.length, question.id);
    assert.ok(question.promptVisual || question.optionVisuals.length, question.id);
    assert.ok(Number.isInteger(question.correctAnswer), question.id);
    assert.ok(question.body?.some((block) => block.type === 'section' && block.title === 'Objective'), question.id);
  }
});

test('CBC Grade 1 visual exams have 15 questions each and required metadata', () => {
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
    assert.equal(question.readOptionsAloud, true, question.id);
    assert.equal(question.options.length, 4, question.id);
    assert.equal(new Set(question.options).size, 4, question.id);
    assert.equal(question.optionVisuals.length, question.options.length, question.id);
    assert.ok(question.promptVisual, question.id);
    assert.ok(Number.isInteger(question.correctAnswer), question.id);
  }
});

test('CBC Grade 1 phonics lessons include alphabet and vowel sound metadata', () => {
  assert.equal(alphabetLesson.topicId, 'phonics');
  assert.equal(vowelLesson.topicId, 'phonics');
  assert.equal(alphabetLesson.readAloud, true);
  assert.equal(vowelLesson.readAloud, true);
  assert.equal(alphabetLesson.autoReadAloud, false);
  assert.equal(vowelLesson.autoReadAloud, false);
  assert.equal(alphabetLesson.metadata.alphabetSounds.length, 26);
  assert.equal(vowelLesson.metadata.vowelSounds.length, 5);
  assert.ok(alphabetLesson.metadata.alphabetSounds.every((item) => item.examples.length === 5));
  assert.ok(vowelLesson.metadata.vowelSounds.every((item) => item.examples.length === 5));
});

test('CBC Grade 1 phonics practice and exams have visual read-aloud questions', () => {
  assert.equal(alphabetPractice.length, 10);
  assert.equal(vowelPractice.length, 10);
  assert.equal(alphabetExam.length, 15);
  assert.equal(vowelExam.length, 15);

  for (const question of [...gradeOnePhonicsPractice, ...gradeOnePhonicsExams]) {
    assert.equal(question.category, 'grade-1', question.id);
    assert.equal(question.topicId, 'phonics', question.id);
    assert.equal(question.estimatedTimeSeconds, 60, question.id);
    assert.equal(question.interactionType, 'visual-mcq', question.id);
    assert.equal(question.readAloud, true, question.id);
    assert.equal(question.autoReadAloud, false, question.id);
    assert.equal(question.readOptionsAloud, true, question.id);
    assert.equal(question.options.length, 4, question.id);
    assert.equal(new Set(question.options).size, 4, question.id);
    assert.equal(question.optionVisuals.length, question.options.length, question.id);
    assert.ok(question.promptVisual, question.id);
    assert.ok(question.metadata.phonics?.sound, question.id);
    assert.ok(Number.isInteger(question.correctAnswer), question.id);
  }
});

test('CBC Grade 1 phonics exams carry assessment metadata', () => {
  for (const question of gradeOnePhonicsExams) {
    assert.equal(question.metadata.assessmentType, 'exam', question.id);
    assert.ok(['alphabet-sounds-exam-001', 'vowel-sounds-exam-001'].includes(question.metadata.examId), question.id);
    assert.ok(question.metadata.examTitle, question.id);
    assert.equal(question.metadata.points, 1, question.id);
  }
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
