import test from 'node:test';
import assert from 'node:assert/strict';

import {
  buildCbcGradeDestinationPath,
  buildCbcGradeSelectionPath,
  buildCbcLearningAreaPath,
  readCbcGradeSelectionIntent
} from './cbcGradeSelectionRouting.js';

const gradeOne = {
  id: 'grade-1',
  topics: ['cre', 'english', 'environmental-activities', 'kiswahili', 'mathematics']
};

test('buildCbcGradeSelectionPath uses current Grade 1 learning-area routes', () => {
  assert.equal(buildCbcGradeSelectionPath({ subject: 'english' }), '/gd1/eng');
  assert.equal(
    buildCbcGradeSelectionPath({ subject: 'mathematics' }),
    '/gd1/mathematical-activities'
  );
  assert.equal(
    buildCbcGradeSelectionPath({ subject: 'environmental-activities' }),
    '/gd1'
  );
});

test('buildCbcGradeSelectionPath sends dashboard actions to non-blank CBC pages', () => {
  assert.equal(buildCbcGradeSelectionPath({ action: 'continue' }), '/gd1');
  assert.equal(buildCbcGradeSelectionPath({ action: 'read-with-me' }), '/gd1/eng');
});

test('buildCbcLearningAreaPath uses ready canonical Grade 3 routes', () => {
  assert.equal(
    buildCbcLearningAreaPath({ gradeId: 'grade-3', subject: 'english' }),
    '/gd3/english-activities'
  );
  assert.equal(
    buildCbcLearningAreaPath({ gradeId: 'grade-3', subject: 'mathematics' }),
    '/gd3/mathematical-activities'
  );
  assert.equal(
    buildCbcLearningAreaPath({ gradeId: 'grade-3', subject: 'kiswahili' }),
    '/gd3/kiswahili-activities'
  );
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
    '/gd1/eng'
  );
  assert.equal(
    buildCbcGradeDestinationPath(gradeOne, { type: 'subject', subject: 'math' }),
    '/gd1/mathematical-activities'
  );
});

test('buildCbcGradeDestinationPath safely falls back to the selected grade', () => {
  assert.equal(
    buildCbcGradeDestinationPath(
      { id: 'grade-3', topics: ['english'] },
      { type: 'subject', subject: 'kiswahili' }
    ),
    '/gd3'
  );
  assert.equal(
    buildCbcGradeDestinationPath(gradeOne, { type: 'action', action: 'continue' }),
    '/gd1'
  );
});

test('buildCbcGradeDestinationPath continues to the selected grade most recent topic when available', () => {
  assert.equal(
    buildCbcGradeDestinationPath(
      gradeOne,
      { type: 'action', action: 'continue' },
      { continueTopicId: 'mathematics' }
    ),
    '/gd1/mathematical-activities'
  );
  assert.equal(
    buildCbcGradeDestinationPath(
      gradeOne,
      { type: 'action', action: 'continue' },
      { continueTopicId: 'missing' }
    ),
    '/gd1'
  );
});

test('buildCbcGradeDestinationPath sends read-with-me to an available reading subject', () => {
  assert.equal(
    buildCbcGradeDestinationPath(gradeOne, { type: 'action', action: 'read-with-me' }),
    '/gd1/eng'
  );
});

test('buildCbcGradeDestinationPath keeps continue and read-with-me destinations distinct', () => {
  const gradeThree = {
    id: 'grade-3',
    topics: ['kiswahili', 'mathematics']
  };

  assert.equal(
    buildCbcGradeDestinationPath(gradeThree, { type: 'action', action: 'continue' }),
    '/gd3'
  );
  assert.equal(
    buildCbcGradeDestinationPath(gradeThree, { type: 'action', action: 'read-with-me' }),
    '/gd3/english-activities'
  );
});
