import assert from 'node:assert/strict';
import test from 'node:test';

import {
  buildCbcTopicActivityHref,
  getCbcGradeTitle,
  getCbcLastActivityContinueState,
  getCbcTopicTitle
} from './cbcLastActivityService.js';

test('CBC last activity titles use learner-facing subject labels', () => {
  assert.equal(getCbcTopicTitle('mathematics'), 'Math');
  assert.equal(getCbcTopicTitle('environmental-activities'), 'Environmental Activities');
  assert.equal(getCbcTopicTitle({ id: 'kiswahili', name: 'Kiswahili' }), 'Kiswahili');
  assert.equal(getCbcGradeTitle('grade-3'), 'Grade 3');
});

test('CBC topic activity href keeps selected grade and subject', () => {
  assert.equal(
    buildCbcTopicActivityHref({
      categoryId: 'grade-1',
      topicId: 'environmental-activities',
      page: 1
    }),
    '/category/grade-1?topic=environmental-activities&page=1'
  );
});

test('CBC last activity continue state uses stored href and subject copy', () => {
  assert.deepEqual(
    getCbcLastActivityContinueState({
      academy: 'cbc',
      categoryId: 'grade-3',
      topicId: 'kiswahili',
      activityType: 'practice',
      href: '/problem/grade-3-kiswahili-hadithi-q01?scope=hadithi',
      title: 'Kiswahili',
      categoryTitle: 'Grade 3',
      updatedAt: '2026-06-14T10:00:00.000Z'
    }),
    {
      href: '/problem/grade-3-kiswahili-hadithi-q01?scope=hadithi',
      title: 'Continue Kiswahili',
      description: 'Pick up from Grade 3 Kiswahili'
    }
  );
});
