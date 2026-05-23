import test from 'node:test';
import assert from 'node:assert/strict';

import { validateProblemCollection } from './validateProblem.js';

import binarySearch from '../data/problems/dsa/binary-search/binary-search-search-space-elimination.js';
import coinChange from '../data/problems/dsa/dynamic-programming/coin-change-dp-state-transition.js';
import numberOfIslands from '../data/problems/dsa/graphs/number-of-islands-grid-traversal.js';
import validParentheses from '../data/problems/dsa/monotonic-stack-queue/valid-parentheses-stack.js';
import productExceptSelf from '../data/problems/dsa/prefix-sum-hashing/product-of-array-except-self-prefix-suffix.js';
import twoSum from '../data/problems/dsa/prefix-sum-hashing/two-sum-hash-map-complement.js';
import slidingWindow from '../data/problems/dsa/sliding-window/longest-substring-without-repeating-characters.js';
import containerWater from '../data/problems/dsa/two-pointers/container-with-most-water-two-pointers.js';

const dsaMasteryProblems = [
  binarySearch,
  coinChange,
  numberOfIslands,
  validParentheses,
  productExceptSelf,
  twoSum,
  slidingWindow,
  containerWater
];

const expectedTopicIds = new Set([
  'binary-search',
  'dynamic-programming',
  'graphs',
  'monotonic-stack-queue',
  'prefix-sum-hashing',
  'sliding-window',
  'two-pointers'
]);

test('DSA mastery content batch is production-approved discovered content', () => {
  assert.equal(dsaMasteryProblems.length, 8);

  for (const problem of dsaMasteryProblems) {
    assert.equal(problem.category, 'dsa');
    assert.equal(problem.type, 'learning');
    assert.equal(problem.metadata.reviewStatus, 'approved');
    assert.deepEqual(problem.metadata.visibility, ['dev', 'prod']);
    assert.equal(problem.metadata.authoringVersion, 2);
    assert.ok(expectedTopicIds.has(problem.topicId), `${problem.id} uses an unexpected topicId`);
    assert.ok(problem.prompt.length > 40, `${problem.id} should have a meaningful prompt`);
    assert.ok(problem.explanation || problem.plainLanguageExplanation, `${problem.id} should explain the concept`);
    assert.ok(Array.isArray(problem.body) && problem.body.length >= 3, `${problem.id} should include rich visual teaching blocks`);
  }
});

test('DSA mastery content batch has unique ids and valid rich body blocks', () => {
  const ids = dsaMasteryProblems.map((problem) => problem.id);
  assert.deepEqual(ids, [...new Set(ids)]);

  const validation = validateProblemCollection(dsaMasteryProblems);
  assert.deepEqual(validation.errors, []);
  assert.equal(validation.valid, true);
});
