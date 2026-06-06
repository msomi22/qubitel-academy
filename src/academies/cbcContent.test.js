import assert from 'node:assert/strict';
import test from 'node:test';

import gradeOneCreValuesPractice from './cbc/grade-1/cre/practice/christian-values-practice-001.js';
import gradeOneEnglishListeningPractice from './cbc/grade-1/english/practice/listening-speaking-practice-001.js';
import gradeOneEnglishReadingPractice from './cbc/grade-1/english/practice/reading-readiness-practice-001.js';
import gradeOneEnvironmentalHomePractice from './cbc/grade-1/environmental-activities/practice/home-and-school-practice-001.js';
import gradeOneMathCountingExam from './cbc/grade-1/mathematics/assessments/counting-exam-001.js';
import gradeOneMathNumbersPractice from './cbc/grade-1/mathematics/practice/numbers-practice-001.js';
import gradeOneMathShapesPractice from './cbc/grade-1/mathematics/practice/shapes-practice-001.js';
import gradeOneReadingExam from './cbc/grade-1/english/assessments/object-matching-exam-001.js';
import readingLesson from './cbc/grade-3/english/lessons/reading-comprehension-school-garden-lesson-001.js';
import spellingLesson from './cbc/grade-3/english/lessons/spelling-lesson-001.js';
import partsOfSpeechLesson from './cbc/grade-3/english/lessons/grade-3-english-parts-of-speech-lesson-001.js';
import readingPractice from './cbc/grade-3/english/practice/reading-comprehension-school-garden-practice-001.js';
import practiceOne from './cbc/grade-3/english/practice/spelling-practice-001.js';
import practiceTwo from './cbc/grade-3/english/practice/spelling-practice-002.js';
import examOne from './cbc/grade-3/english/assessments/spelling-exam-001.js';
import examTwo from './cbc/grade-3/english/assessments/spelling-exam-002.js';
import examThree from './cbc/grade-3/english/assessments/spelling-exam-003.js';
import examFour from './cbc/grade-3/english/assessments/spelling-exam-004.js';
import examFive from './cbc/grade-3/english/assessments/spelling-exam-005.js';
import examSix from './cbc/grade-3/english/assessments/spelling-exam-006.js';
import examSeven from './cbc/grade-3/english/assessments/spelling-classroom-items-exam-007.js';
import examEight from './cbc/grade-3/english/assessments/spelling-furniture-exam-008.js';
import examNine from './cbc/grade-3/english/assessments/spelling-body-parts-exam-009.js';
import examTen from './cbc/grade-3/english/assessments/spelling-random-hard-exam-010.js';
import examEleven from './cbc/grade-3/english/assessments/spelling-random-super-hard-exam-011.js';
import examTwelve from './cbc/grade-3/english/assessments/spelling-random-super-hard-genius-exam-012.js';
import examThirteen from './cbc/grade-3/english/assessments/spelling-domestic-animals-exam-013.js';
import examFourteen from './cbc/grade-3/english/assessments/spelling-wild-animals-exam-014.js';
import examFifteen from './cbc/grade-3/english/assessments/spelling-aquatic-animals-exam-015.js';
import partsOfSpeechExamOne from './cbc/grade-3/english/assessments/grade-3-parts-of-speech-spelling-exam-001.js';
import partsOfSpeechExamTwo from './cbc/grade-3/english/assessments/grade-3-parts-of-speech-spelling-exam-002.js';
import timedComprehensionExam from './cbc/grade-3/english/assessments/reading-comprehension-class-library-exam-001.js';
import kiswahiliHadithiExam from './cbc/grade-3/kiswahili/assessments/kiswahili-hadithi-exam-001.js';
import { getAcademyCatalog } from './catalog.js';
import { validateProblemCollection } from '../problems/validateProblem.js';

const cbcTopics = getAcademyCatalog('cbc').topics;
const subjectTopicIds = [
  'cre',
  'creative-activities',
  'english',
  'environmental-activities',
  'kiswahili',
  'mathematics'
];
const gradeThreeEnglishTopic = cbcTopics.find((topic) => topic.category === 'grade-3' && topic.id === 'english');
const gradeOneTopics = cbcTopics.filter((topic) => topic.category === 'grade-1');
const gradeThreeTopics = cbcTopics.filter((topic) => topic.category === 'grade-3');
const gradeOnePracticeQuestions = [
  ...gradeOneCreValuesPractice,
  ...gradeOneEnglishListeningPractice,
  ...gradeOneEnglishReadingPractice,
  ...gradeOneEnvironmentalHomePractice,
  ...gradeOneMathNumbersPractice,
  ...gradeOneMathShapesPractice
];
const gradeOneExamQuestions = [...gradeOneMathCountingExam, ...gradeOneReadingExam];
const gradeOneQuestions = [...gradeOnePracticeQuestions, ...gradeOneExamQuestions];
const gradeThreeSpellingPractice = [
  ...practiceOne,
  ...practiceTwo
];
const gradeThreeSpellingExams = [
  ...examOne,
  ...examTwo,
  ...examThree,
  ...examFour,
  ...examFive,
  ...examSix,
  ...examSeven,
  ...examEight,
  ...examNine,
  ...examTen,
  ...examEleven,
  ...examTwelve,
  ...examThirteen,
  ...examFourteen,
  ...examFifteen
];
const newGradeThreeSpellingExams = [
  ...examThree,
  ...examFour,
  ...examFive,
  ...examSix
];
const gradeThreeSpellingExamsSevenToFifteen = [
  ...examSeven,
  ...examEight,
  ...examNine,
  ...examTen,
  ...examEleven,
  ...examTwelve,
  ...examThirteen,
  ...examFourteen,
  ...examFifteen
];
const gradeThreeSpellingQuestions = [spellingLesson, ...gradeThreeSpellingPractice, ...gradeThreeSpellingExams];
const gradeThreeReadingQuestions = [readingLesson, ...readingPractice, ...timedComprehensionExam];
const gradeThreePartsOfSpeechExams = [...partsOfSpeechExamOne, ...partsOfSpeechExamTwo];
const gradeThreePartsOfSpeechQuestions = [partsOfSpeechLesson, ...gradeThreePartsOfSpeechExams];
const gradeThreeEnglishQuestions = [...gradeThreeSpellingQuestions, ...gradeThreeReadingQuestions, ...gradeThreePartsOfSpeechQuestions];
const gradeThreeKiswahiliQuestions = [...kiswahiliHadithiExam];
const gradeThreeQuestions = [...gradeThreeEnglishQuestions, ...gradeThreeKiswahiliQuestions];
const allQuestions = [...gradeOneQuestions, ...gradeThreeQuestions];

test('CBC Grade 1 subject practice keeps the pilot learning-area coverage', () => {
  const expectedSkills = [
    'recognition',
    'listening',
    'matching',
    'counting',
    'reading-simple-words',
    'choosing-clear-options'
  ];
  const practiceGroups = [
    { questions: gradeOneCreValuesPractice, topicId: 'cre', learningAreaId: 'christian-values', count: 1 },
    { questions: gradeOneEnglishListeningPractice, topicId: 'english', learningAreaId: 'listening-speaking', count: 2 },
    { questions: gradeOneEnglishReadingPractice, topicId: 'english', learningAreaId: 'reading-readiness', count: 5 },
    { questions: gradeOneEnvironmentalHomePractice, topicId: 'environmental-activities', learningAreaId: 'home-and-school', count: 1 },
    { questions: gradeOneMathNumbersPractice, topicId: 'mathematics', learningAreaId: 'numbers', count: 2 },
    { questions: gradeOneMathShapesPractice, topicId: 'mathematics', learningAreaId: 'shapes', count: 1 }
  ];

  assert.equal(gradeOnePracticeQuestions.length, 12);
  assert.equal(new Set(gradeOnePracticeQuestions.map((question) => question.id)).size, 12);

  for (const group of practiceGroups) {
    assert.equal(group.questions.length, group.count, group.learningAreaId);
    assert.ok(group.questions.every((question) => question.topicId === group.topicId), group.topicId);
    assert.ok(group.questions.every((question) => question.metadata.learningAreaId === group.learningAreaId), group.learningAreaId);
  }

  for (const skill of expectedSkills) {
    assert.equal(
      gradeOnePracticeQuestions.filter((question) => question.metadata.skill === skill).length,
      2,
      skill
    );
  }
});

test('CBC Grade 1 subject practice is question-only read-aloud enabled, manual by default, four-option, and timed for 60 seconds', () => {
  for (const question of gradeOnePracticeQuestions) {
    assert.equal(question.category, 'grade-1', question.id);
    assert.ok(subjectTopicIds.includes(question.topicId), question.id);
    assert.equal(question.estimatedTimeSeconds, 60, question.id);
    assert.equal(question.interactionType, 'visual-mcq', question.id);
    assert.equal(question.readAloud, true, question.id);
    assert.equal(question.autoReadAloud, false, question.id);
    assert.equal(question.readOptionsAloud, false, question.id);
    assert.equal(question.metadata.readOptionsAloud, false, question.id);
    assert.ok(question.readAloudText, question.id);
    assert.equal(question.options.length, 4, question.id);
    assert.equal(question.optionVisuals.length, question.options.length, question.id);
    assert.ok(question.promptVisual || question.optionVisuals.length, question.id);
    assert.ok(Number.isInteger(question.correctAnswer), question.id);
    assert.ok(question.correctAnswer >= 0 && question.correctAnswer < 4, question.id);
    assert.ok(question.body?.some((block) => block.type === 'section' && block.title === 'Objective'), question.id);
  }
});

test('CBC Grade 1 visual exams have 15 four-option question-only read-aloud questions each and required metadata', () => {
  assert.equal(gradeOneMathCountingExam.length, 15);
  assert.equal(gradeOneReadingExam.length, 15);

  for (const question of gradeOneExamQuestions) {
    assert.equal(question.category, 'grade-1', question.id);
    assert.ok(['english', 'mathematics'].includes(question.topicId), question.id);
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
    assert.equal(question.options.length, 4, question.id);
    assert.equal(question.optionVisuals.length, question.options.length, question.id);
    assert.ok(question.promptVisual, question.id);
    assert.ok(Number.isInteger(question.correctAnswer), question.id);
    assert.ok(question.correctAnswer >= 0 && question.correctAnswer < 4, question.id);
  }
});

test('CBC Grade 1 exposes matching subject learning areas with content under the right subjects', () => {
  assert.deepEqual(gradeOneTopics.map((topic) => topic.id), subjectTopicIds);
  assert.equal(cbcTopics.some((topic) => topic.id === 'foundation-practice'), false);
  assert.equal(cbcTopics.some((topic) => topic.id === 'phonics'), false);

  for (const subject of gradeOneTopics) {
    assert.ok(subject.learningAreas.length > 0, subject.id);
  }

  const cre = gradeOneTopics.find((topic) => topic.id === 'cre');
  const english = gradeOneTopics.find((topic) => topic.id === 'english');
  const environmentalActivities = gradeOneTopics.find((topic) => topic.id === 'environmental-activities');
  const mathematics = gradeOneTopics.find((topic) => topic.id === 'mathematics');
  const emptySubjects = gradeOneTopics.filter((topic) => ['creative-activities', 'kiswahili'].includes(topic.id));

  assert.deepEqual(cre.practice.map((item) => item.id), ['christian-values-practice-001']);
  assert.deepEqual(english.practice.map((item) => item.id), ['listening-speaking-practice-001', 'reading-readiness-practice-001']);
  assert.deepEqual(english.assessments.map((item) => item.id), ['object-matching-exam-001']);
  assert.equal(english.learningAreas.some((area) => area.id === 'parts-of-speech'), false);
  assert.deepEqual(environmentalActivities.practice.map((item) => item.id), ['home-and-school-practice-001']);
  assert.deepEqual(mathematics.practice.map((item) => item.id), ['numbers-practice-001', 'shapes-practice-001']);
  assert.deepEqual(mathematics.assessments.map((item) => item.id), ['counting-exam-001']);

  for (const subject of emptySubjects) {
    assert.equal(subject.questionBank.mode, 'empty');
    assert.deepEqual([...subject.lessons, ...subject.practice, ...subject.assessments], []);
  }
});

test('CBC Grade 3 English declares manifest-driven learning areas', () => {
  assert.deepEqual(
    gradeThreeEnglishTopic.learningAreas.map((area) => area.id),
    ['spelling', 'reading-comprehension', 'parts-of-speech', 'grammar', 'composition']
  );

  const contentReferences = [
    ...gradeThreeEnglishTopic.lessons,
    ...gradeThreeEnglishTopic.practice,
    ...gradeThreeEnglishTopic.assessments
  ];

  assert.ok(contentReferences.length > 0);
  assert.deepEqual(
    gradeThreeEnglishTopic.lessons.map((reference) => reference.id),
    [
      'spelling-lesson-001',
      'reading-comprehension-school-garden-lesson-001',
      'grade-3-english-parts-of-speech-lesson-001'
    ]
  );
  assert.deepEqual(
    gradeThreeEnglishTopic.practice.map((reference) => reference.id),
    [
      'spelling-practice-001',
      'spelling-practice-002',
      'reading-comprehension-school-garden-practice-001'
    ]
  );
  assert.deepEqual(
    gradeThreeEnglishTopic.assessments.map((reference) => reference.id),
    [
      'spelling-exam-001',
      'spelling-exam-002',
      'spelling-exam-003',
      'spelling-exam-004',
      'spelling-exam-005',
      'spelling-exam-006',
      'spelling-classroom-items-exam-007',
      'spelling-furniture-exam-008',
      'spelling-body-parts-exam-009',
      'spelling-random-hard-exam-010',
      'spelling-random-super-hard-exam-011',
      'spelling-random-super-hard-genius-exam-012',
      'spelling-domestic-animals-exam-013',
      'spelling-wild-animals-exam-014',
      'spelling-aquatic-animals-exam-015',
      'grade-3-parts-of-speech-spelling-exam-001',
      'grade-3-parts-of-speech-spelling-exam-002',
      'reading-comprehension-class-library-exam-001'
    ]
  );
  assert.ok(
    contentReferences
      .filter((reference) => reference.id.startsWith('spelling'))
      .every((reference) => reference.learningAreaId === 'spelling')
  );
  assert.ok(
    contentReferences
      .filter((reference) => reference.id.startsWith('reading-comprehension'))
      .every((reference) => reference.learningAreaId === 'reading-comprehension')
  );
  assert.deepEqual(
    contentReferences
      .filter((reference) => reference.learningAreaId === 'parts-of-speech')
      .map((reference) => reference.id),
    [
      'grade-3-english-parts-of-speech-lesson-001',
      'grade-3-parts-of-speech-spelling-exam-001',
      'grade-3-parts-of-speech-spelling-exam-002'
    ]
  );
});

test('CBC Grade 3 exposes subject learning areas and current content state', () => {
  assert.deepEqual(
    gradeThreeTopics.map((topic) => topic.id),
    subjectTopicIds
  );

  const mathematics = gradeThreeTopics.find((topic) => topic.id === 'mathematics');
  const kiswahili = gradeThreeTopics.find((topic) => topic.id === 'kiswahili');
  const environmentalActivities = gradeThreeTopics.find((topic) => topic.id === 'environmental-activities');
  const creativeActivities = gradeThreeTopics.find((topic) => topic.id === 'creative-activities');
  const cre = gradeThreeTopics.find((topic) => topic.id === 'cre');

  assert.deepEqual(mathematics.learningAreas.map((area) => area.id), ['addition', 'subtraction', 'multiplication', 'division']);
  assert.deepEqual(kiswahili.learningAreas.map((area) => area.id), ['ufahamu', 'sarufi', 'insha']);
  assert.deepEqual(kiswahili.assessments.map((reference) => reference.id), ['kiswahili-hadithi-exam-001']);
  assert.equal(kiswahili.assessments[0].learningAreaId, 'ufahamu');
  assert.deepEqual(environmentalActivities.learningAreas.map((area) => area.id), ['plants', 'weather', 'hygiene', 'community']);
  assert.deepEqual(creativeActivities.learningAreas.map((area) => area.id), ['art-and-craft', 'music', 'movement', 'drama']);
  assert.deepEqual(cre.learningAreas.map((area) => area.id), ['bible-stories', 'christian-values', 'prayer', 'service']);
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
  assert.equal(examThree.length, 20);
  assert.equal(examFour.length, 20);
  assert.equal(examFive.length, 20);
  assert.equal(examSix.length, 20);
  assert.equal(examSeven.length, 20);
  assert.equal(examEight.length, 20);
  assert.equal(examNine.length, 20);
  assert.equal(examTen.length, 20);
  assert.equal(examEleven.length, 20);
  assert.equal(examTwelve.length, 20);
  assert.equal(examThirteen.length, 20);
  assert.equal(examFourteen.length, 20);
  assert.equal(examFifteen.length, 20);
  assert.equal(newGradeThreeSpellingExams.length, 80);
  assert.equal(gradeThreeSpellingExamsSevenToFifteen.length, 180);
  assert.equal(new Set(gradeThreeSpellingQuestions.map((question) => question.id)).size, gradeThreeSpellingQuestions.length);
});

test('CBC Grade 3 English content is valid and includes a learner-facing Objective', () => {
  const validation = validateProblemCollection(gradeThreeEnglishQuestions, { topics: cbcTopics });

  assert.deepEqual(validation.errors, []);
  assert.ok(gradeThreeEnglishQuestions.every((question) => (
    question.body?.some((block) => block.type === 'section' && block.title === 'Objective')
  )));
});

test('CBC spelling MCQs have exactly four options and one configured answer', () => {
  const mcqs = [...gradeThreeSpellingPractice, ...gradeThreeSpellingExams];

  for (const question of mcqs) {
    assert.equal(question.options.length, 4, question.id);
    assert.equal(new Set(question.options).size, 4, question.id);
    assert.ok(Number.isInteger(question.correctAnswer), question.id);
    assert.ok(question.correctAnswer >= 0 && question.correctAnswer < 4, question.id);
    const expectedAnswer = question.explanation.replace(' is the correct spelling.', '');
    assert.equal(question.options[question.correctAnswer], expectedAnswer, question.id);
    assert.ok(question.explanation, question.id);
  }
});

test('CBC reading comprehension school garden content exposes the passage and ten MCQs', () => {
  assert.equal(readingLesson.category, 'grade-3');
  assert.equal(readingLesson.topicId, 'english');
  assert.equal(readingPractice.length, 10);
  assert.ok(
    readingLesson.body.some((block) => (
      block.title === 'A Visit to the School Garden'
      && block.content.includes('Grade Three learners visited the school garden')
    ))
  );

  const expectedSkills = new Set([
    'main idea',
    'detail recall',
    'vocabulary in context',
    'inference',
    'sequence',
    'life skill'
  ]);

  for (const question of readingPractice) {
    assert.equal(question.category, 'grade-3', question.id);
    assert.equal(question.topicId, 'english', question.id);
    assert.equal(question.options.length, 4, question.id);
    assert.equal(new Set(question.options).size, 4, question.id);
    assert.ok(Number.isInteger(question.correctAnswer), question.id);
    assert.ok(question.correctAnswer >= 0 && question.correctAnswer < 4, question.id);
    assert.ok(question.explanation, question.id);
    assert.ok(question.body.some((block) => (
      block.title === 'Passage'
      && block.content.includes('Grade Three learners visited the school garden')
    )), question.id);
    assert.ok(expectedSkills.has(question.metadata.skill), question.id);
  }
});

test('CBC Grade 3 English Parts of Speech lesson covers all nine word jobs with child-friendly wording', () => {
  const bodyText = JSON.stringify(partsOfSpeechLesson.body).toLowerCase();
  const expectedParts = [
    'noun',
    'pronoun',
    'verb',
    'adjective',
    'adverb',
    'preposition',
    'conjunction',
    'interjection',
    'article'
  ];

  assert.equal(partsOfSpeechLesson.category, 'grade-3');
  assert.equal(partsOfSpeechLesson.topicId, 'english');
  assert.equal(partsOfSpeechLesson.type, 'learning');
  assert.equal(partsOfSpeechLesson.metadata.learningAreaId, 'parts-of-speech');
  assert.ok(partsOfSpeechLesson.body.some((block) => block.type === 'table' && block.title === 'Recap Table'));
  assert.ok(partsOfSpeechLesson.body.some((block) => block.type === 'checklist' && block.title === 'Final Practice'));

  for (const part of expectedParts) {
    assert.match(bodyText, new RegExp(part), part);
  }

  for (const phrase of ['naming word', 'action word', 'tells us more about', 'joining word', 'used instead of a noun', 'tells us where something is', 'shows strong feeling']) {
    assert.ok(bodyText.includes(phrase), phrase);
  }
});

test('CBC Grade 3 English Parts of Speech exams are scoped timed grammar-and-spelling assessments', () => {
  assert.equal(partsOfSpeechExamOne.length, 30);
  assert.equal(partsOfSpeechExamTwo.length, 30);

  const examGroups = [
    {
      questions: partsOfSpeechExamOne,
      examId: 'grade-3-parts-of-speech-spelling-exam-001',
      examTitle: 'Parts of Speech Exam 1: Naming and Action Words',
      expectedTerms: ['noun', 'pronoun', 'verb']
    },
    {
      questions: partsOfSpeechExamTwo,
      examId: 'grade-3-parts-of-speech-spelling-exam-002',
      examTitle: 'Parts of Speech Exam 2: Telling More and Joining Words',
      expectedTerms: ['adjective', 'adverb', 'preposition', 'conjunction', 'interjection', 'article']
    }
  ];

  for (const group of examGroups) {
    const groupText = JSON.stringify(group.questions).toLowerCase();
    for (const term of group.expectedTerms) assert.ok(groupText.includes(term), `${group.examId} includes ${term}`);

    for (const question of group.questions) {
      assert.equal(question.category, 'grade-3', question.id);
      assert.equal(question.topicId, 'english', question.id);
      assert.equal(question.estimatedTimeSeconds, 30, question.id);
      assert.equal(question.metadata.gradeId, 'grade-3', question.id);
      assert.equal(question.metadata.subjectId, 'english', question.id);
      assert.equal(question.metadata.learningAreaId, 'parts-of-speech', question.id);
      assert.equal(question.metadata.examId, group.examId, question.id);
      assert.equal(question.metadata.examTitle, group.examTitle, question.id);
      assert.equal(question.metadata.assessmentType, 'exam', question.id);
      assert.equal(question.metadata.questionTimeSeconds, 30, question.id);
      assert.equal(question.metadata.totalTimeSeconds, 900, question.id);
      assert.equal(question.options.length, 4, question.id);
      assert.equal(new Set(question.options).size, 4, question.id);
      assert.ok(Number.isInteger(question.correctAnswer), question.id);
      assert.ok(question.correctAnswer >= 0 && question.correctAnswer < 4, question.id);
      assert.ok(question.explanation, question.id);
      assert.ok(question.body.some((block) => block.type === 'section' && block.title === 'Objective'), question.id);
    }
  }
});

test('CBC Grade 3 timed comprehension class library exam is a separate timed assessment', () => {
  assert.equal(timedComprehensionExam.length, 10);

  const firstQuestion = timedComprehensionExam[0];
  const config = firstQuestion.metadata.timedComprehensionExam;

  assert.equal(firstQuestion.metadata.examId, 'reading-comprehension-class-library-exam-001');
  assert.equal(firstQuestion.metadata.examTitle, 'Grade 3 English Timed Comprehension Exam 1');
  assert.equal(firstQuestion.metadata.examMode, 'timed-comprehension');
  assert.equal(firstQuestion.metadata.assessmentType, 'exam');
  assert.equal(firstQuestion.metadata.learningAreaId, 'reading-comprehension');
  assert.equal(config.passageTitle, 'The New Class Library');
  assert.equal(config.readingGuideSeconds, 600);
  assert.equal(config.questionTimeSeconds, 60);
  assert.equal(config.autoAdvanceAfterReading, false);
  assert.equal(config.allowStartQuestionsAnytime, true);
  assert.equal(config.allowPassageDuringQuestions, true);
  assert.equal(config.readAloud.enabled, true);
  assert.equal(config.readAloud.highlightCurrentSentence, true);
  assert.equal(config.passage.sentences.length, 15);
  assert.ok(config.passage.sentences.some((sentence) => sentence.text.includes('new class library')));

  for (const question of timedComprehensionExam) {
    assert.equal(question.category, 'grade-3', question.id);
    assert.equal(question.topicId, 'english', question.id);
    assert.equal(question.estimatedTimeSeconds, 60, question.id);
    assert.equal(question.metadata.examId, firstQuestion.metadata.examId, question.id);
    assert.equal(question.metadata.examMode, 'timed-comprehension', question.id);
    assert.equal(question.metadata.learningAreaId, 'reading-comprehension', question.id);
    assert.equal(question.options.length, 4, question.id);
    assert.equal(new Set(question.options).size, 4, question.id);
    assert.ok(Number.isInteger(question.correctAnswer), question.id);
    assert.ok(question.correctAnswer >= 0 && question.correctAnswer < 4, question.id);
    assert.ok(question.explanation, question.id);
    assert.ok(question.body.some((block) => block.type === 'section' && block.title === 'Objective'), question.id);
  }
});

test('CBC Grade 3 Kiswahili hadithi exam is a scoped timed passage assessment', () => {
  assert.equal(kiswahiliHadithiExam.length, 10);

  const firstQuestion = kiswahiliHadithiExam[0];
  const config = firstQuestion.metadata.timedComprehensionExam;

  assert.equal(firstQuestion.metadata.examId, 'grade-3-kiswahili-hadithi-exam-001');
  assert.equal(firstQuestion.metadata.examTitle, 'Grade 3 Kiswahili Hadithi Exam 1');
  assert.equal(firstQuestion.metadata.examMode, 'timed-comprehension');
  assert.equal(firstQuestion.metadata.assessmentType, 'exam');
  assert.equal(firstQuestion.metadata.learningAreaId, 'ufahamu');
  assert.equal(config.passageTitle, 'Safari ya Amina Shuleni');
  assert.equal(config.readingGuideSeconds, 600);
  assert.equal(config.questionTimeSeconds, 60);
  assert.equal(config.autoAdvanceAfterReading, false);
  assert.equal(config.allowStartQuestionsAnytime, true);
  assert.equal(config.allowPassageDuringQuestions, true);
  assert.equal(config.readAloud.enabled, true);
  assert.equal(config.readAloud.highlightCurrentSentence, true);
  assert.equal(config.readAloud.lang, 'sw-KE');
  assert.equal(config.passage.sentences.length, 12);
  assert.ok(config.passage.sentences.some((sentence) => sentence.text.includes('Amina alikuwa msichana mwenye bidii')));

  for (const question of kiswahiliHadithiExam) {
    assert.equal(question.category, 'grade-3', question.id);
    assert.equal(question.topicId, 'kiswahili', question.id);
    assert.equal(question.estimatedTimeSeconds, 60, question.id);
    assert.equal(question.metadata.examId, firstQuestion.metadata.examId, question.id);
    assert.equal(question.metadata.examMode, 'timed-comprehension', question.id);
    assert.equal(question.metadata.learningAreaId, 'ufahamu', question.id);
    assert.equal(question.options.length, 4, question.id);
    assert.equal(new Set(question.options).size, 4, question.id);
    assert.equal(question.correctAnswer, 0, question.id);
    assert.ok(question.explanation, question.id);
    assert.ok(question.body.some((block) => block.type === 'section' && block.title === 'Objective'), question.id);
  }
});

test('CBC spelling exam questions carry the required exam metadata and timing', () => {
  for (const question of gradeThreeSpellingExams) {
    assert.equal(question.estimatedTimeSeconds, 30, question.id);
    assert.equal(question.metadata.assessmentType, 'exam', question.id);
    assert.equal(question.metadata.learningAreaId || 'spelling', 'spelling', question.id);
    assert.equal(question.metadata.questionTimeSeconds || question.estimatedTimeSeconds, 30, question.id);
    assert.equal(question.metadata.gradeId || question.category, 'grade-3', question.id);
    assert.equal(question.metadata.subjectId || question.topicId, 'english', question.id);
    assert.ok(question.metadata.examId, question.id);
    assert.ok(question.metadata.examTitle, question.id);
    assert.equal(question.metadata.points, 1, question.id);
  }
});
