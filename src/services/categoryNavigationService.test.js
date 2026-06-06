import test from 'node:test';
import assert from 'node:assert/strict';

import {
  buildCategoryReturnPath,
  parseCategoryPage,
  readCategorySearchState
} from './categoryNavigationService.js';

test('buildCategoryReturnPath preserves system category return state', () => {
  const path = buildCategoryReturnPath({
    categoryId: 'system',
    topicId: 'scalability',
    learningAreaId: 'caching',
    page: 3,
    difficulty: 'Medium',
    completionFilter: 'incomplete',
    questionId: 'scalability-realtime-updates-001'
  });

  assert.equal(
    path,
    '/system-design?topic=scalability&area=caching&page=3&difficulty=Medium&completion=incomplete&question=scalability-realtime-updates-001'
  );
});

test('buildCategoryReturnPath preserves special dsa route without fallback rewriting', () => {
  assert.equal(
    buildCategoryReturnPath({ categoryId: 'dsa', topicId: 'arrays', page: 2 }),
    '/dsa?topic=arrays&page=2'
  );
});

test('buildCategoryReturnPath falls back to the normal category route', () => {
  assert.equal(buildCategoryReturnPath({ categoryId: 'cloud', page: 1 }), '/category/cloud?page=1');
});

test('readCategorySearchState restores selected topic, page, difficulty, and completion filter', () => {
  const state = readCategorySearchState(
    new URLSearchParams('topic=scalability&area=eviction&page=4&difficulty=Hard&completion=completed')
  );

  assert.deepEqual(state, {
    topicId: 'scalability',
    learningAreaId: 'eviction',
    page: 4,
    difficulty: 'Hard',
    completionFilter: 'completed'
  });
});

test('readCategorySearchState accepts legacy strand route values', () => {
  const state = readCategorySearchState(new URLSearchParams('topic=english&strand=spelling'));

  assert.equal(state.learningAreaId, 'spelling');
});

test('parseCategoryPage clamps invalid route values to page one', () => {
  assert.equal(parseCategoryPage('0'), 1);
  assert.equal(parseCategoryPage('-2'), 1);
  assert.equal(parseCategoryPage('abc'), 1);
});
