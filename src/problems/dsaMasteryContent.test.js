import test from 'node:test';
import assert from 'node:assert/strict';

import {
  filterTopicsForActiveProfile,
  isTopicVisibleForActiveProfile
} from '../config/contentProfile.js';
import { topicManifest } from '../data/topicManifest.js';
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

function hasStructuredVisualWalkthrough(problem) {
  return Boolean(
    problem.visualWalkthrough?.title &&
    problem.visualWalkthrough?.summary &&
    problem.visualWalkthrough?.diagram?.type &&
    Array.isArray(problem.visualWalkthrough?.diagram?.frames) &&
    problem.visualWalkthrough.diagram.frames.length >= 3
  );
}

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
  }
});

test('DSA mastery content batch includes Java solutions and structured visual walkthroughs', () => {
  for (const problem of dsaMasteryProblems) {
    assert.equal(problem.language, 'java', `${problem.id} should render Java in the solution section`);
    assert.match(problem.solutionCode || '', /class Solution/, `${problem.id} should include Java solution code`);
    assert.ok(problem.stepByStepBreakdown?.length >= 4, `${problem.id} should include approach steps`);
    assert.ok(problem.invariant, `${problem.id} should explain the invariant`);
    assert.ok(hasStructuredVisualWalkthrough(problem), `${problem.id} should include a structured visual walkthrough like reference DSA problems`);
  }
});

test('DSA mastery content batch has unique ids and valid rich body blocks', () => {
  const ids = dsaMasteryProblems.map((problem) => problem.id);
  assert.deepEqual(ids, [...new Set(ids)]);

  const validation = validateProblemCollection(dsaMasteryProblems);
  assert.deepEqual(validation.errors, []);
  assert.equal(validation.valid, true);
});

test('DSA mastery topics remain visible in production topic fallback paths', () => {
  for (const topicId of expectedTopicIds) {
    assert.equal(
      isTopicVisibleForActiveProfile(topicId, [], { profile: 'prod' }),
      true,
      `${topicId} should remain visible before discovered questions are loaded`
    );
  }

  const visibleDsaTopicIds = filterTopicsForActiveProfile(
    topicManifest.filter((topic) => topic.category === 'dsa'),
    [],
    { profile: 'prod' }
  ).map((topic) => topic.id);

  for (const topicId of expectedTopicIds) {
    assert.ok(visibleDsaTopicIds.includes(topicId), `${topicId} should appear in production DSA topic list`);
  }
});
