import test from 'node:test';
import assert from 'node:assert/strict';

import { getAcademyRootNodeById } from '../learning/academies/index.ts';
import {
  createCbcGradesRegistrySource
} from '../learning/academies/cbc/cbcGrades.registry.ts';
import {
  createLearningNodeRegistry,
  getChildren
} from '../learning/registry/index.ts';
import {
  buildCbcGradeDestinationPath,
  buildCbcGradeSelectionPath,
  buildCbcLearningAreaPath,
  buildCbcSubjectGradeSelectionPath,
  findReadyCbcLearningArea,
  readCbcGradeSelectionIntent
} from './cbcGradeSelectionRouting.js';

const academyNode = getAcademyRootNodeById('cbc-academy');
const source = createCbcGradesRegistrySource();
const registry = createLearningNodeRegistry({
  nodes: [academyNode, ...source.nodes]
});
const grades = getChildren(registry, academyNode).filter((node) => node.kind === 'grade');
const gradeOne = grades.find((grade) => grade.id === 'grade-1');
const gradeThree = grades.find((grade) => grade.id === 'grade-3');

test('dashboard subject selection preserves intent on the existing Grades page', () => {
  assert.equal(
    buildCbcSubjectGradeSelectionPath({ subject: 'english' }),
    '/categories?subject=english'
  );
  assert.equal(
    buildCbcSubjectGradeSelectionPath({ subject: 'mathematics' }),
    '/categories?subject=math'
  );
  assert.equal(buildCbcSubjectGradeSelectionPath({ subject: 'unknown' }), '/categories');
});

test('excluded dashboard actions retain their current direct behavior', () => {
  assert.equal(buildCbcGradeSelectionPath({ action: 'continue' }), '/gd1');
  assert.equal(buildCbcGradeSelectionPath({ action: 'read-with-me' }), '/gd1/eng');
  assert.equal(buildCbcGradeSelectionPath({ subject: 'math' }), '/gd1/mathematical-activities');
});

test('compatibility destinations are derived from registered semantic routes', () => {
  assert.equal(
    buildCbcLearningAreaPath({ gradeId: 'grade-3', subject: 'english' }),
    '/gd3/english-activities'
  );
  assert.equal(
    buildCbcLearningAreaPath({ gradeId: 'grade-3', subject: 'mathematics' }),
    '/gd3/mathematical-activities'
  );
});

test('reads known subject intent and safely ignores unknown subject queries', () => {
  assert.deepEqual(
    readCbcGradeSelectionIntent(new URLSearchParams('subject=math')),
    { type: 'subject', subject: 'math' }
  );
  assert.equal(readCbcGradeSelectionIntent(new URLSearchParams('subject=unknown')), null);
});

test('normal Grades selection resolves the selected registered grade route', () => {
  assert.equal(buildCbcGradeDestinationPath(registry, gradeOne, null), '/gd1');
  assert.equal(buildCbcGradeDestinationPath(registry, gradeThree, null), '/gd3');
});

test('English selection resolves ready registered learning areas for Grade 1 and Grade 3', () => {
  assert.equal(
    buildCbcGradeDestinationPath(
      registry,
      gradeOne,
      { type: 'subject', subject: 'english' }
    ),
    '/gd1/eng'
  );
  assert.equal(
    buildCbcGradeDestinationPath(
      registry,
      gradeThree,
      { type: 'subject', subject: 'english' }
    ),
    '/gd3/english-activities'
  );
});

test('Mathematics selection resolves ready registered learning areas for Grade 1 and Grade 3', () => {
  assert.equal(
    buildCbcGradeDestinationPath(
      registry,
      gradeOne,
      { type: 'subject', subject: 'mathematics' }
    ),
    '/gd1/mathematical-activities'
  );
  assert.equal(
    buildCbcGradeDestinationPath(
      registry,
      gradeThree,
      { type: 'subject', subject: 'math' }
    ),
    '/gd3/mathematical-activities'
  );
});

test('missing or unready matching areas remain inaccessible', () => {
  const gradeTwo = grades.find((grade) => grade.id === 'grade-2');

  assert.equal(findReadyCbcLearningArea(registry, gradeTwo, 'english'), null);
  assert.equal(
    buildCbcGradeDestinationPath(
      registry,
      gradeTwo,
      { type: 'subject', subject: 'english' }
    ),
    null
  );
});
