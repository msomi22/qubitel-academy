import assert from 'node:assert/strict';
import test from 'node:test';

import {
  ASSESSMENT_CARDS_PER_PAGE,
  createAssessmentBookPages,
  createMissingContentPage,
  isCbcTheme,
  isStandardCbcContentType,
  resolveStandardCbcContentType,
  STANDARD_CBC_CONTENT_TABS
} from '../../../../../components/learningNodeBookView.model.ts';
import type { LearningNode } from '../../../../core/index.ts';
import { grade1EnglishGreetingsNodes } from
  '../grade1/english-activities/themes/greetings/greetings.registry.ts';
import {
  grade3SpellingExamDescriptors,
  grade3EnglishSpellingNodes
} from './english-activities/themes/spelling/spelling.registry.ts';
import {
  grade3ReadingComprehensionExamDescriptors,
  grade3EnglishReadingComprehensionNodes
} from './english-activities/themes/reading-comprehension/readingComprehension.registry.ts';
import {
  grade3PartsOfSpeechExamDescriptors,
  grade3EnglishPartsOfSpeechNodes
} from './english-activities/themes/parts-of-speech/partsOfSpeech.registry.ts';
import {
  grade3MixedRevisionExamDescriptors,
  grade3MixedRevisionNodes
} from './mathematical-activities/themes/mixed-revision/mixedRevision.registry.ts';
import {
  grade3UfahamuExamDescriptors,
  grade3UfahamuNodes
} from './kiswahili-activities/themes/ufahamu/ufahamu.registry.ts';

const academyBreadcrumb = { id: 'cbc-academy' } as LearningNode;
const cbcTheme = { id: 'theme', kind: 'theme' } as LearningNode;

function findAssessment(nodes: LearningNode[]): LearningNode {
  const assessment = nodes.find((node) => node.kind === 'assessment');
  assert.ok(assessment);
  return assessment;
}

function assertAssessmentPages(
  nodes: LearningNode[],
  descriptors: readonly { id: string }[],
  expectedPages: number
): void {
  const pages = createAssessmentBookPages<{ id: string }>(findAssessment(nodes));

  assert.equal(pages.length, expectedPages);
  assert.ok(pages.every((page) => page.exams.length <= ASSESSMENT_CARDS_PER_PAGE));
  assert.deepEqual(pages.flatMap((page) => page.exams), descriptors);
  pages.flatMap((page) => page.exams).forEach((descriptor, index) => {
    assert.equal(descriptor, descriptors[index]);
  });
}

test('recognizes only CBC theme nodes for the standard theme book', () => {
  assert.equal(isCbcTheme(cbcTheme, [academyBreadcrumb]), true);
  assert.equal(isCbcTheme(cbcTheme, []), false);
  assert.equal(
    isCbcTheme({ id: 'area', kind: 'learningArea' } as LearningNode, [academyBreadcrumb]),
    false
  );
});

test('uses the four canonical CBC tabs and query values in the required order', () => {
  assert.deepEqual(
    STANDARD_CBC_CONTENT_TABS.map(({ key, label }) => ({ key, label })),
    [
      { key: 'learningMaterial', label: 'Learning Material' },
      { key: 'practice', label: 'Practice' },
      { key: 'assessment', label: 'Assessment' },
      { key: 'lessonPlan', label: 'Lesson Plan' }
    ]
  );
  assert.equal(isStandardCbcContentType('lessonPlan'), true);
  assert.equal(isStandardCbcContentType('lesson-plan'), false);
  assert.equal(resolveStandardCbcContentType('assessment'), 'assessment');
  assert.equal(resolveStandardCbcContentType(''), 'learningMaterial');
  assert.equal(resolveStandardCbcContentType('lesson-plan'), 'learningMaterial');
});

test('creates one neutral presentation placeholder for each missing content type', () => {
  STANDARD_CBC_CONTENT_TABS.forEach(({ key, label }) => {
    assert.deepEqual(createMissingContentPage(key), {
      type: 'placeholder',
      title: `${label} is not available yet.`
    });
  });
});

test('paginates Grade 3 assessment descriptors at four cards per logical leaf', () => {
  assert.equal(ASSESSMENT_CARDS_PER_PAGE, 12);
  assert.equal(
    grade3SpellingExamDescriptors.length
      + grade3ReadingComprehensionExamDescriptors.length
      + grade3PartsOfSpeechExamDescriptors.length
      + grade3MixedRevisionExamDescriptors.length
      + grade3UfahamuExamDescriptors.length,
    37
  );

  assertAssessmentPages(grade3EnglishSpellingNodes, grade3SpellingExamDescriptors, 4);
  assertAssessmentPages(
    grade3EnglishReadingComprehensionNodes,
    grade3ReadingComprehensionExamDescriptors,
    3
  );
  assertAssessmentPages(
    grade3EnglishPartsOfSpeechNodes,
    grade3PartsOfSpeechExamDescriptors,
    1
  );
  assertAssessmentPages(grade3MixedRevisionNodes, grade3MixedRevisionExamDescriptors, 2);
  assertAssessmentPages(grade3UfahamuNodes, grade3UfahamuExamDescriptors, 1);
});

test('preserves the Greetings seven-page Learning Material source', () => {
  const learningMaterial = grade1EnglishGreetingsNodes.find(
    (node) => node.id === 'gd1-eng-greetings-learning-material'
  );
  const content = learningMaterial?.content;

  assert.ok(content && typeof content === 'object' && 'pages' in content);
  assert.ok(Array.isArray(content.pages));
  assert.equal(content.pages.length, 7);
});