import assert from 'node:assert/strict';
import test from 'node:test';

import alphabetLesson, {
  alphabetMasteryLetters
} from '../../../../../academies/cbc/grade-1/english/lessons/alphabet-mastery-lesson-001.js';
import writingExam from
  '../../../../../academies/cbc/grade-1/english/assessments/writing-readiness/writing-missing-letters-exam-001.js';
import numbersLesson, {
  numbersOneToOneHundred
} from '../../../../../academies/cbc/grade-1/mathematics/lessons/numbers-1-100-lesson-001.js';
import numbersExam from
  '../../../../../academies/cbc/grade-1/mathematics/assessments/counting-exam-001.js';
import {
  createMissingContentPage,
  STANDARD_CBC_CONTENT_TABS
} from '../../../../../components/learningNodeBookView.model.ts';
import type { LearningBookContent, LearningNode } from '../../../../core/index.ts';
import { createLearningNode } from '../../../../core/index.ts';
import {
  createLearningNodeRegistry,
  getChildren,
  isLearningNodeReady
} from '../../../../registry/index.ts';
import { grade1Nodes } from '../grade1.registry.ts';
import { grade3EnglishSpellingNodes } from
  '../grade3/english-activities/themes/spelling/spelling.registry.ts';
import { createInteractiveLessonPages } from './grade1InteractiveLesson.adapter.ts';
import { grade1EnglishSchoolNodes } from
  './english-activities/themes/school/school.registry.ts';
import { grade1MathNumbersNodes } from
  './mathematical-activities/themes/numbers/numbers.registry.ts';

type InteractiveBlock = {
  type: string;
  letters?: typeof alphabetMasteryLetters;
  numbers?: typeof numbersOneToOneHundred;
};

type ExamDescriptor = {
  id: string;
  estimatedTime: string;
  metadata: {
    examId: string;
    manifestId?: string;
    questionCount: number;
    sourceLearningAreaId?: string;
  };
};

function getNode(nodes: LearningNode[], nodeId: string): LearningNode {
  const node = nodes.find((candidate) => candidate.id === nodeId);
  assert.ok(node, nodeId);
  return node;
}

function getBook(nodes: LearningNode[], nodeId: string): LearningBookContent {
  const node = getNode(nodes, nodeId);
  assert.ok(node.content && typeof node.content === 'object' && !Array.isArray(node.content));
  assert.equal(node.content.type, 'book');
  return node.content as LearningBookContent;
}

function getExams(nodes: LearningNode[], nodeId: string): ExamDescriptor[] {
  const content = getNode(nodes, nodeId).content;
  assert.ok(content && typeof content === 'object' && !Array.isArray(content));
  const assessmentContent = content as Record<string, unknown>;
  assert.equal(assessmentContent.type, 'assessmentExamList');
  assert.ok(Array.isArray(assessmentContent.exams));
  return assessmentContent.exams as ExamDescriptor[];
}

function getInteractiveBlocks(book: LearningBookContent, type: string): InteractiveBlock[] {
  return book.pages
    .flatMap((page) => page.blocks)
    .filter((block) => block.type === type) as InteractiveBlock[];
}

function cloneAndFreeze<T>(value: T): T {
  if (!value || typeof value !== 'object') return value;
  if (Array.isArray(value)) value.forEach(cloneAndFreeze);
  else Object.values(value).forEach(cloneAndFreeze);
  return Object.freeze(value);
}

const academyNode = createLearningNode({
  id: 'cbc-academy',
  kind: 'academy',
  label: 'CBC Academy',
  childIds: ['grade-1']
});
const gradeNode = createLearningNode({
  id: 'grade-1',
  kind: 'grade',
  label: 'Grade 1',
  parentId: academyNode.id,
  childIds: ['grade-1-english-activities', 'grade-1-mathematical-activities']
});
const registry = createLearningNodeRegistry({
  nodes: [academyNode, gradeNode, ...grade1Nodes]
});

test('preserves one four-tab child hierarchy for School and Numbers', () => {
  assert.deepEqual(
    getChildren(registry, 'grade-1-english-activities-theme-school').map((node) => node.id),
    [
      'gd1-eng-school-learning-material',
      'gd1-eng-school-practice',
      'gd1-eng-school-assessment',
      'gd1-eng-school-lesson-plan'
    ]
  );
  assert.deepEqual(
    getChildren(registry, 'grade-1-mathematical-activities-theme-numbers')
      .map((node) => node.id),
    [
      'gd1-math-numbers-learning-material',
      'gd1-math-numbers-practice',
      'gd1-math-numbers-assessment',
      'gd1-math-numbers-lesson-plan'
    ]
  );
  assert.equal(
    new Set(registry.nodesById.keys()).size,
    registry.nodesById.size
  );
});

test('keeps English Numbers disabled while Mathematical Numbers remains ready', () => {
  const englishNumbers = getNode(
    grade1Nodes,
    'grade-1-english-activities-theme-numbers'
  );
  const mathematicalNumbers = getNode(
    grade1Nodes,
    'grade-1-mathematical-activities-theme-numbers'
  );
  const removedEnglishChildIds = [
    'gd1-eng-numbers-learning-material',
    'gd1-eng-numbers-practice',
    'gd1-eng-numbers-assessment',
    'gd1-eng-numbers-lesson-plan'
  ];

  assert.ok(getChildren(registry, 'grade-1-english-activities').some((node) => (
    node.id === englishNumbers.id
  )));
  assert.deepEqual(englishNumbers.childIds, []);
  assert.deepEqual(getChildren(registry, englishNumbers.id), []);
  assert.deepEqual(englishNumbers.actions, []);
  assert.equal(isLearningNodeReady(registry, englishNumbers), false);
  removedEnglishChildIds.forEach((nodeId) => {
    assert.equal(registry.nodesById.has(nodeId), false, nodeId);
  });

  assert.deepEqual(getChildren(registry, mathematicalNumbers.id).map((node) => node.id), [
    'gd1-math-numbers-learning-material',
    'gd1-math-numbers-practice',
    'gd1-math-numbers-assessment',
    'gd1-math-numbers-lesson-plan'
  ]);
  assert.deepEqual(mathematicalNumbers.actions, [{ intent: 'openChildren' }]);
  assert.equal(isLearningNodeReady(registry, mathematicalNumbers), true);
});

test('removes Greetings Practice content while preserving its standard placeholder tab', () => {
  const greetingsChildren = getChildren(
    registry,
    'grade-1-english-activities-theme-greetings'
  );
  const greetingsLearningMaterial = getBook(
    grade1Nodes,
    'gd1-eng-greetings-learning-material'
  );

  assert.deepEqual(greetingsChildren.map((node) => node.id), [
    'gd1-eng-greetings-learning-material',
    'gd1-eng-greetings-assessment',
    'gd1-eng-greetings-lesson-plan'
  ]);
  assert.equal(registry.nodesById.has('gd1-eng-greetings-practice'), false);
  assert.equal(
    grade1Nodes.some((node) => (
      node.parentId === 'grade-1-english-activities-theme-greetings'
      && node.kind === 'practice'
    )),
    false
  );
  assert.equal(
    STANDARD_CBC_CONTENT_TABS.some((tab) => tab.key === 'practice'),
    true
  );
  assert.deepEqual(createMissingContentPage('practice'), {
    type: 'placeholder',
    title: 'Practice is not available yet.'
  });
  assert.equal(greetingsLearningMaterial.pages.length, 7);
  assert.ok(registry.nodesById.has('gd1-eng-greetings-assessment'));
  assert.ok(registry.nodesById.has('gd1-eng-greetings-lesson-plan'));
});

test('appends seven canonical four-pair Alphabet pages after the preserved School page', () => {
  const book = getBook(grade1EnglishSchoolNodes, 'gd1-eng-school-learning-material');
  const alphabetPages = book.pages.slice(1);
  const blocks = getInteractiveBlocks(book, 'alphabetMastery');
  const migratedLetters = blocks.flatMap((block) => block.letters || []);

  assert.equal(book.pages[0].title, 'School');
  assert.equal(book.pages[0].blocks[0].text,
    'In this lesson, you will learn about school environment and activities.');
  assert.equal(book.pages.length, 8);
  assert.equal(alphabetPages.length, 7);
  assert.deepEqual(alphabetPages.map((page) => page.id), [
    'alphabet-mastery-lesson-001-page-a-d',
    'alphabet-mastery-lesson-001-page-e-h',
    'alphabet-mastery-lesson-001-page-i-l',
    'alphabet-mastery-lesson-001-page-m-p',
    'alphabet-mastery-lesson-001-page-q-t',
    'alphabet-mastery-lesson-001-page-u-x',
    'alphabet-mastery-lesson-001-page-y-z'
  ]);
  assert.deepEqual(alphabetPages.map((page) => page.title), [
    'Letters A–D',
    'Letters E–H',
    'Letters I–L',
    'Letters M–P',
    'Letters Q–T',
    'Letters U–X',
    'Letters Y–Z'
  ]);
  assert.deepEqual(blocks.map((block) => block.letters?.length), [4, 4, 4, 4, 4, 4, 2]);
  assert.deepEqual(
    blocks.map((block) => (block.letters?.length || 0) * 2),
    [8, 8, 8, 8, 8, 8, 4]
  );
  assert.deepEqual(migratedLetters, alphabetMasteryLetters);
  assert.deepEqual(migratedLetters.map((item) => item.letter),
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''));
  assert.equal(new Set(migratedLetters.map((item) => item.id)).size, 26);
  migratedLetters.forEach((item, index) => {
    assert.deepEqual(item.identifier, alphabetMasteryLetters[index].identifier);
    assert.deepEqual(item.phonetic, alphabetMasteryLetters[index].phonetic);
  });
  assert.ok(alphabetPages.every((page) => (
    page.metadata?.authoredLessonId === alphabetLesson.id
    && page.metadata?.manifestId === 'alphabet-mastery-lesson-001'
  )));
});

test('keeps exactly six Reading exams followed by the missing Writing exam', () => {
  const exams = getExams(grade1EnglishSchoolNodes, 'gd1-eng-school-assessment');
  const writingMetadata = writingExam[0].metadata;

  assert.equal(exams.length, 7);
  assert.deepEqual(exams.map((exam) => exam.id), [
    'grade-1-reading-readiness-exam-001',
    'grade-1-reading-word-mastery-exam-002',
    'grade-1-reading-word-mastery-exam-003',
    'grade-1-reading-word-mastery-exam-004',
    'grade-1-reading-word-mastery-exam-005',
    'grade-1-reading-word-mastery-exam-006',
    'writing-missing-letters-exam-001'
  ]);
  assert.equal(new Set(exams.map((exam) => exam.id)).size, 7);
  assert.deepEqual(exams.slice(0, 6).map((exam) => exam.metadata.manifestId), [
    'object-matching-exam-001',
    'reading-word-mastery-exam-002',
    'reading-word-mastery-exam-003',
    'reading-word-mastery-exam-004',
    'reading-word-mastery-exam-005',
    'reading-word-mastery-exam-006'
  ]);
  assert.ok(exams.slice(0, 6).every((exam) => (
    exam.metadata.sourceLearningAreaId === 'reading-readiness'
  )));
  assert.equal(exams[6].metadata.manifestId, 'writing-missing-letters-exam-001');
  assert.equal(exams[6].metadata.examId, writingMetadata.examId);
  assert.equal(exams[6].metadata.questionCount, writingExam.length);
  assert.equal(exams[6].metadata.sourceLearningAreaId, 'writing-readiness');
  assert.equal(exams[6].estimatedTime, '10 min');
  assert.equal('questions' in exams[6], false);
});

test('appends ten canonical Number pages and preserves Practice and one Assessment', () => {
  const book = getBook(grade1MathNumbersNodes, 'gd1-math-numbers-learning-material');
  const numberPages = book.pages.slice(1);
  const blocks = getInteractiveBlocks(book, 'numberAudioGrid');
  const migratedNumbers = blocks.flatMap((block) => block.numbers || []);
  const practice = getNode(grade1MathNumbersNodes, 'gd1-math-numbers-practice');
  const exams = getExams(grade1MathNumbersNodes, 'gd1-math-numbers-assessment');

  assert.equal(book.pages[0].title, 'Numbers');
  assert.equal(book.pages.length, 11);
  assert.equal(numberPages.length, 10);
  assert.deepEqual(numberPages.map((page) => page.id), [
    'numbers-1-100-lesson-001-page-001-010',
    'numbers-1-100-lesson-001-page-011-020',
    'numbers-1-100-lesson-001-page-021-030',
    'numbers-1-100-lesson-001-page-031-040',
    'numbers-1-100-lesson-001-page-041-050',
    'numbers-1-100-lesson-001-page-051-060',
    'numbers-1-100-lesson-001-page-061-070',
    'numbers-1-100-lesson-001-page-071-080',
    'numbers-1-100-lesson-001-page-081-090',
    'numbers-1-100-lesson-001-page-091-100'
  ]);
  assert.deepEqual(numberPages.map((page) => page.title), [
    'Numbers 1–10',
    'Numbers 11–20',
    'Numbers 21–30',
    'Numbers 31–40',
    'Numbers 41–50',
    'Numbers 51–60',
    'Numbers 61–70',
    'Numbers 71–80',
    'Numbers 81–90',
    'Numbers 91–100'
  ]);
  assert.deepEqual(blocks.map((block) => block.numbers?.length), Array(10).fill(10));
  assert.deepEqual(migratedNumbers, numbersOneToOneHundred);
  assert.deepEqual(migratedNumbers.map((item) => item.number),
    Array.from({ length: 100 }, (_, index) => index + 1));
  assert.equal(new Set(migratedNumbers.map((item) => item.id)).size, 100);
  migratedNumbers.forEach((item, index) => {
    const canonicalItem = numbersOneToOneHundred[index];
    assert.equal(item.id, canonicalItem.id);
    assert.equal(item.display, canonicalItem.display);
    assert.equal(item.label, canonicalItem.label);
    assert.equal(item.audioFile, canonicalItem.audioFile);
    assert.equal(item.audioSrc, canonicalItem.audioSrc);
  });
  assert.deepEqual(practice.content, {
    type: 'practiceCardList',
    cards: [{
      id: 'gd1-math-numbers-practice-card-001',
      title: 'Counting Numbers',
      description: 'Practise counting and recognising numbers.',
      targetProblemId: 'numbers-practice-001',
      href: '/practice/numbers-practice-001?backPath=/gd1/mathematical-activities/'
        + 'numbers%3Ftab%3Dpractice&backLabel=Back',
      status: 'Ready'
    }]
  });
  assert.equal(exams.length, 1);
  assert.equal(exams[0].id, numbersExam[0].metadata.examId);
  assert.equal(exams[0].metadata.manifestId, 'counting-exam-001');
  assert.equal(exams[0].metadata.sourceLearningAreaId, 'numbers');
  assert.equal(exams[0].metadata.questionCount, numbersExam.length);
});

test('does not mutate frozen canonical-shaped interactive lessons', () => {
  const frozenLesson = cloneAndFreeze(structuredClone(numbersLesson));
  const pages = createInteractiveLessonPages(frozenLesson, {
    manifestId: 'numbers-1-100-lesson-001',
    interactiveBlockType: 'numberAudioGrid',
    itemField: 'numbers',
    pageSubtitle: 'Numbers 1–100',
    pages: [
      { id: 'page-1', title: 'Numbers 1–50', startIndex: 0, endIndex: 50 },
      { id: 'page-2', title: 'Numbers 51–100', startIndex: 50, endIndex: 100 }
    ]
  });

  assert.equal(pages.length, 2);
  assert.deepEqual(frozenLesson, numbersLesson);
  assert.throws(() => createInteractiveLessonPages(frozenLesson, {
    manifestId: 'numbers-1-100-lesson-001',
    interactiveBlockType: 'numberAudioGrid',
    itemField: 'numbers',
    pageSubtitle: 'Numbers 1–100',
    pages: [{ id: 'gap', title: 'Numbers 2–100', startIndex: 1, endIndex: 100 }]
  }));
});

test('does not change the existing Grade 3 Spelling Learning Material contract', () => {
  const book = getBook(
    grade3EnglishSpellingNodes,
    'gd3-eng-spelling-learning-material'
  );

  assert.equal(book.pages.length, 1);
  assert.equal(book.pages[0].id, 'english-spelling-lesson-001-page-001');
});