import assert from 'node:assert/strict';
import test from 'node:test';

import partsOfSpeechLesson from
  '../../../../../academies/cbc/grade-3/english/lessons/grade-3-english-parts-of-speech-lesson-001.js';
import readingComprehensionLesson from
  '../../../../../academies/cbc/grade-3/english/lessons/reading-comprehension-school-garden-lesson-001.js';
import type {
  LearningBookContent,
  LearningContentBlock,
  LearningNode
} from '../../../../core/index.ts';
import { createLearningNode } from '../../../../core/index.ts';
import { createLearningNodeRegistry, getChildren } from '../../../../registry/index.ts';
import { isLearningNodeReady } from '../../../../registry/registry.readiness.ts';
import { createNodeRoutePath } from '../../../../routing/index.ts';
import {
  adaptLegacyLearningProblemToBook
} from '../../adapters/legacyLearningProblem.adapter.ts';
import { grade3LearningAreaNodes } from '../grade3.registry.ts';
import {
  grade3EnglishReadingComprehensionNodes,
  grade3ReadingComprehensionExamDescriptors
} from './english-activities/themes/reading-comprehension/readingComprehension.registry.ts';
import {
  grade3EnglishPartsOfSpeechNodes,
  grade3PartsOfSpeechExamDescriptors
} from './english-activities/themes/parts-of-speech/partsOfSpeech.registry.ts';
import {
  grade3EnglishSpellingNodes
} from './english-activities/themes/spelling/spelling.registry.ts';

type CanonicalLesson = {
  id: string;
  type: string;
  body: Array<Record<string, unknown>>;
  explanation?: string;
  finalTakeaway?: string;
};

function asCanonicalLesson(value: unknown): CanonicalLesson {
  return value as CanonicalLesson;
}

function getBlockMetadata(block: LearningContentBlock): Record<string, unknown> {
  return block.metadata && typeof block.metadata === 'object'
    ? block.metadata as Record<string, unknown>
    : {};
}

const academyNode = createLearningNode({
  id: 'cbc-academy',
  kind: 'academy',
  label: 'CBC Academy',
  childIds: ['grade-3']
});
const gradeNode = createLearningNode({
  id: 'grade-3',
  kind: 'grade',
  label: 'Grade 3',
  parentId: academyNode.id,
  childIds: ['grade-3-english-activities'],
  attributes: [{ key: 'routeSegment', value: 'grade-3' }]
});
const registry = createLearningNodeRegistry({
  nodes: [academyNode, gradeNode, ...grade3LearningAreaNodes]
});
const routeOptions = { includeRoot: false, includeAcademyRoot: false };

function getAttribute(node: LearningNode, key: string): unknown {
  return node.attributes?.find((attribute) => attribute.key === key)?.value;
}

function getBook(nodes: LearningNode[], nodeId: string): LearningBookContent {
  const node = nodes.find((candidate) => candidate.id === nodeId);
  assert.ok(node);
  assert.equal(node.kind, 'learningMaterial');
  assert.ok(node.content && typeof node.content === 'object' && !Array.isArray(node.content));
  assert.equal(node.content.type, 'book');
  return node.content as LearningBookContent;
}

function flattenBlocks(book: LearningBookContent): LearningContentBlock[] {
  return book.pages.flatMap((page) => page.blocks);
}

function expectedBodyBlockIds(lesson: CanonicalLesson): string[] {
  return lesson.body.map((_, index) => (
    `${lesson.id}-block-${String(index + 1).padStart(3, '0')}`
  ));
}

function cloneAndFreeze<T>(value: T): T {
  if (!value || typeof value !== 'object') return value;
  if (Array.isArray(value)) {
    value.forEach(cloneAndFreeze);
  } else {
    Object.values(value).forEach(cloneAndFreeze);
  }
  return Object.freeze(value);
}

test('registers one canonical Learning Material child before each unchanged Assessment', () => {
  const expectedChildren = new Map([
    ['grade-3-english-activities-theme-reading-comprehension', [
      'gd3-eng-reading-comprehension-learning-material',
      'gd3-eng-reading-comprehension-assessment'
    ]],
    ['grade-3-english-activities-theme-parts-of-speech', [
      'gd3-eng-parts-of-speech-learning-material',
      'gd3-eng-parts-of-speech-assessment'
    ]]
  ]);

  expectedChildren.forEach((childIds, themeId) => {
    const children = getChildren(registry, themeId);
    assert.deepEqual(children.map((child) => child.id), childIds);
    assert.equal(children.filter((child) => child.kind === 'learningMaterial').length, 1);
    assert.equal(children.filter((child) => child.kind === 'assessment').length, 1);
    assert.equal(children.some((child) => child.kind === 'practice'), false);
    assert.equal(children.some((child) => child.kind === 'lessonPlan'), false);
    assert.equal(isLearningNodeReady(registry, themeId), true);
  });

  assert.equal(grade3ReadingComprehensionExamDescriptors.length, 11);
  assert.equal(grade3PartsOfSpeechExamDescriptors.length, 2);
});

test('keeps canonical and manifest lesson identities as separate provenance', () => {
  const readingNode = registry.nodesById.get(
    'gd3-eng-reading-comprehension-learning-material'
  ) as LearningNode;
  const partsNode = registry.nodesById.get(
    'gd3-eng-parts-of-speech-learning-material'
  ) as LearningNode;

  assert.equal(
    getAttribute(readingNode, 'authoredLessonId'),
    'english-reading-comprehension-school-garden-lesson-001'
  );
  assert.equal(
    getAttribute(readingNode, 'legacyManifestId'),
    'reading-comprehension-school-garden-lesson-001'
  );
  assert.equal(
    getAttribute(partsNode, 'authoredLessonId'),
    'grade-3-english-parts-of-speech-lesson-001'
  );
  assert.equal(
    getAttribute(partsNode, 'legacyManifestId'),
    'grade-3-english-parts-of-speech-lesson-001'
  );
});

test('creates stable semantic Reading Comprehension and Parts of Speech books', () => {
  const readingBook = getBook(
    grade3EnglishReadingComprehensionNodes,
    'gd3-eng-reading-comprehension-learning-material'
  );
  const partsBook = getBook(
    grade3EnglishPartsOfSpeechNodes,
    'gd3-eng-parts-of-speech-learning-material'
  );

  assert.equal(readingBook.pages.length, 3);
  assert.equal(partsBook.pages.length, 14);
  assert.deepEqual(
    readingBook.pages.map((page) => page.id),
    Array.from({ length: 3 }, (_, index) => (
      `english-reading-comprehension-school-garden-lesson-001-page-${String(index + 1).padStart(3, '0')}`
    ))
  );
  assert.deepEqual(
    partsBook.pages.map((page) => page.id),
    Array.from({ length: 14 }, (_, index) => (
      `grade-3-english-parts-of-speech-lesson-001-page-${String(index + 1).padStart(3, '0')}`
    ))
  );
  assert.equal(new Set(readingBook.pages.map((page) => page.id)).size, 3);
  assert.equal(new Set(partsBook.pages.map((page) => page.id)).size, 14);
  assert.ok(readingBook.pages.every((page) => page.blocks.length > 0));
  assert.ok(partsBook.pages.every((page) => page.blocks.length > 0));
});

test('preserves canonical authored block order and appends summaries exactly once', () => {
  const cases = [
    [
      asCanonicalLesson(readingComprehensionLesson),
      getBook(
        grade3EnglishReadingComprehensionNodes,
        'gd3-eng-reading-comprehension-learning-material'
      )
    ],
    [
      asCanonicalLesson(partsOfSpeechLesson),
      getBook(
        grade3EnglishPartsOfSpeechNodes,
        'gd3-eng-parts-of-speech-learning-material'
      )
    ]
  ] as const;

  cases.forEach(([lesson, book]) => {
    const blocks = flattenBlocks(book);
    assert.deepEqual(
      blocks.slice(0, lesson.body.length).map((block) => block.id),
      expectedBodyBlockIds(lesson)
    );
    assert.deepEqual(
      blocks.slice(lesson.body.length).map((block) => block.id),
      [`${lesson.id}-explanation`, `${lesson.id}-finalTakeaway`]
    );
  });
});

test('preserves checklist and table meaning through non-interactive list blocks', () => {
  const partsBook = getBook(
    grade3EnglishPartsOfSpeechNodes,
    'gd3-eng-parts-of-speech-learning-material'
  );
  const blocks = flattenBlocks(partsBook);
  const partsLesson = asCanonicalLesson(partsOfSpeechLesson);
  const checklistSource = partsLesson.body[2];
  const checklistBlock = blocks[2];
  const checklistMetadata = getBlockMetadata(checklistBlock);

  assert.equal(checklistBlock.type, 'list');
  assert.equal(checklistBlock.title, checklistSource.title);
  assert.deepEqual(checklistBlock.items, checklistSource.items);
  assert.equal(checklistMetadata.sourceBlockType, 'checklist');
  assert.equal(checklistMetadata.sourceBlockId, checklistBlock.id);
  assert.equal('interactive' in checklistBlock, false);

  partsLesson.body.forEach((sourceBlock, sourceIndex) => {
    if (sourceBlock.type !== 'table') return;
    const adaptedBlock = blocks[sourceIndex];
    const adaptedMetadata = getBlockMetadata(adaptedBlock);
    const columns = sourceBlock.columns as string[];
    const rows = sourceBlock.rows as string[][];

    assert.equal(adaptedBlock.type, 'list');
    assert.deepEqual(adaptedMetadata.sourceColumns, columns);
    assert.deepEqual(adaptedMetadata.sourceRows, rows);
    assert.deepEqual(
      adaptedBlock.items,
      rows.map((row) => (
        row.map((cell, index) => `${columns[index]}: ${cell}`).join(' · ')
      ))
    );
  });
});

test('does not mutate deeply frozen canonical-shaped input and validates semantic breaks', () => {
  const frozenLesson = cloneAndFreeze(structuredClone(partsOfSpeechLesson));
  const onePageBook = adaptLegacyLearningProblemToBook(frozenLesson, {
    pageId: 'preserved-one-page-id'
  });
  const book = adaptLegacyLearningProblemToBook(frozenLesson, {
    manifestId: 'grade-3-english-parts-of-speech-lesson-001',
    pageBreakAfterBodyIndexes: [2, 4]
  });

  assert.equal(onePageBook.pages.length, 1);
  assert.equal(onePageBook.pages[0].id, 'preserved-one-page-id');
  assert.equal(book.pages.length, 3);
  assert.equal(frozenLesson.body[2].type, 'checklist');
  assert.throws(() => adaptLegacyLearningProblemToBook(frozenLesson, {
    pageBreakAfterBodyIndexes: [4, 2]
  }));
  assert.throws(() => adaptLegacyLearningProblemToBook(frozenLesson, {
    pageBreakAfterBodyIndexes: [2, 2]
  }));
  assert.throws(() => adaptLegacyLearningProblemToBook(frozenLesson, {
    pageBreakAfterBodyIndexes: [frozenLesson.body.length]
  }));
  assert.throws(() => adaptLegacyLearningProblemToBook({
    id: 'empty-lesson',
    title: 'Empty lesson',
    body: []
  }));
  assert.throws(() => adaptLegacyLearningProblemToBook({
    id: 'empty-final-page',
    title: 'Empty final page',
    body: [{ type: 'section', title: 'Only block', content: 'Only content' }]
  }, {
    pageBreakAfterBodyIndexes: [0]
  }));
});

test('preserves routes and existing Spelling Learning Material contract', () => {
  assert.equal(
    createNodeRoutePath(
      registry,
      'grade-3-english-activities-theme-reading-comprehension',
      routeOptions
    ),
    '/gd3/english-activities/reading-comprehension'
  );
  assert.equal(
    createNodeRoutePath(
      registry,
      'grade-3-english-activities-theme-parts-of-speech',
      routeOptions
    ),
    '/gd3/english-activities/parts-of-speech'
  );

  const spellingBook = getBook(
    grade3EnglishSpellingNodes,
    'gd3-eng-spelling-learning-material'
  );
  assert.equal(spellingBook.pages.length, 1);
  assert.equal(spellingBook.pages[0].id, 'english-spelling-lesson-001-page-001');
});