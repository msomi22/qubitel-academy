import test from 'node:test';
import assert from 'node:assert/strict';

import {
  buildCbcGradeDestinationPath,
  buildCbcGradeSelectionPath,
  readCbcGradeSelectionIntent
} from './cbcGradeSelectionRouting.js';

const gradeOne = {
  id: 'grade-1',
  topics: ['cre', 'english', 'environmental-activities', 'kiswahili', 'mathematics']
};

test('buildCbcGradeSelectionPath preserves CBC home subject intent', () => {
  assert.equal(buildCbcGradeSelectionPath({ subject: 'english' }), '/categories?subject=english');
  assert.equal(buildCbcGradeSelectionPath({ subject: 'mathematics' }), '/categories?subject=math');
  assert.equal(
    buildCbcGradeSelectionPath({ subject: 'environmental-activities' }),
    '/categories?subject=environmental-activities'
  );
});

test('buildCbcGradeSelectionPath preserves CBC home action intent', () => {
  assert.equal(buildCbcGradeSelectionPath({ action: 'continue' }), '/categories?action=continue');
  assert.equal(buildCbcGradeSelectionPath({ action: 'read-with-me' }), '/categories?action=read-with-me');
});

test('readCbcGradeSelectionIntent accepts only supported CBC grade-selection params', () => {
  assert.deepEqual(
    readCbcGradeSelectionIntent(new URLSearchParams('subject=math')),
    { type: 'subject', subject: 'math' }
  );
  assert.deepEqual(
    readCbcGradeSelectionIntent(new URLSearchParams('action=read-with-me')),
    { type: 'action', action: 'read-with-me' }
  );
  assert.equal(readCbcGradeSelectionIntent(new URLSearchParams('subject=unknown')), null);
});

test('buildCbcGradeDestinationPath routes selected grades to matching subject topics', () => {
  assert.equal(
    buildCbcGradeDestinationPath(gradeOne, { type: 'subject', subject: 'english' }),
    '/category/grade-1?topic=english&page=1'
  );
  assert.equal(
    buildCbcGradeDestinationPath(gradeOne, { type: 'subject', subject: 'math' }),
    '/category/grade-1?topic=mathematics&page=1'
  );
});

test('buildCbcGradeDestinationPath safely falls back to the selected grade', () => {
  assert.equal(
    buildCbcGradeDestinationPath({ id: 'grade-3', topics: ['english'] }, { type: 'subject', subject: 'kiswahili' }),
    '/category/grade-3'
  );
  assert.equal(
    buildCbcGradeDestinationPath(gradeOne, { type: 'action', action: 'continue' }),
    '/category/grade-1'
  );
});

test('buildCbcGradeDestinationPath continues to the selected grade most recent topic when available', () => {
  assert.equal(
    buildCbcGradeDestinationPath(gradeOne, { type: 'action', action: 'continue' }, { continueTopicId: 'mathematics' }),
    '/category/grade-1?topic=mathematics&page=1'
  );
  assert.equal(
    buildCbcGradeDestinationPath(gradeOne, { type: 'action', action: 'continue' }, { continueTopicId: 'missing' }),
    '/category/grade-1'
  );
});

test('buildCbcGradeDestinationPath sends read-with-me to an available reading subject', () => {
  assert.equal(
    buildCbcGradeDestinationPath(gradeOne, { type: 'action', action: 'read-with-me' }),
    '/category/grade-1?topic=english&page=1'
  );
});
