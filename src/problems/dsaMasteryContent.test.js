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

function wordCount(value) {
  return String(value || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function richTextFromBlocks(blocks = []) {
  return blocks
    .map((block) => [block.title, block.content, block.body, ...(block.items || [])].filter(Boolean).join(' '))
    .join(' ');
}

function assertTeachingText(problem, field, minimumWords) {
  assert.ok(
    wordCount(problem[field]) >= minimumWords,
    `${problem.id} should provide a substantial ${field} explanation`
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

test('DSA mastery problems follow explanation-first teaching structure', () => {
  for (const problem of dsaMasteryProblems) {
    assertTeachingText(problem, 'scenario', 8);
    assertTeachingText(problem, 'starterThought', 12);
    assertTeachingText(problem, 'mentalPicture', 12);
    assertTeachingText(problem, 'intuition', 12);
    assertTeachingText(problem, 'invariant', 8);
    assertTeachingText(problem, 'explanation', 18);
    assertTeachingText(problem, 'complexityAnalysis', 8);
    assertTeachingText(problem, 'finalTakeaway', 8);

    assert.ok(
      problem.examples?.length >= 1,
      `${problem.id} should include at least one concrete example before abstraction`
    );
    assert.ok(
      problem.edgeCases?.length >= 2,
      `${problem.id} should call out edge cases so learners do not infer hidden assumptions`
    );
  }
});

test('DSA mastery visual walkthrough frames explain state changes', () => {
  for (const problem of dsaMasteryProblems) {
    const frames = problem.visualWalkthrough?.diagram?.frames || [];

    for (const [index, frame] of frames.entries()) {
      const frameLabel = `${problem.id} frame ${index + 1}`;

      assert.ok(frame.title, `${frameLabel} should have a title`);
      assert.ok(wordCount(frame.description) >= 6, `${frameLabel} should explain what the learner is seeing`);
      assert.ok(frame.state?.label, `${frameLabel} should label the current state`);
      assert.ok(wordCount(frame.state?.helper) >= 8, `${frameLabel} should explain what changed and why`);

      const values = Array.isArray(frame.state?.values) ? frame.state.values : [];
      assert.ok(values.length >= 1, `${frameLabel} should expose the active state values or decisions`);
      assert.ok(
        values.some((value) => wordCount(value) >= 3),
        `${frameLabel} should use at least one descriptive state value, not only terse labels`
      );
    }
  }
});

test('DSA mastery overview rich bodies teach the sample answer without replacing later sections', () => {
  for (const problem of dsaMasteryProblems) {
    const overviewText = richTextFromBlocks(problem.body);

    assert.ok(
      wordCount(overviewText) >= 20,
      `${problem.id} should use overview rich content to orient the learner`
    );
    assert.match(
      overviewText,
      /answer|return|because|why|means|result/i,
      `${problem.id} overview should explain why the sample answer or result is correct`
    );
  }
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
