import assert from 'node:assert/strict';
import test from 'node:test';

import longestSubstringLesson from
  '../../../academies/tech/dsa/sliding-window/lessons/longest-substring-without-repeating-characters.js';
import minimumSizeSubarrayLesson from
  '../../../academies/tech/dsa/sliding-window/lessons/minimum-size-subarray-sum.js';
import anagramFrequencyWindowPractice from
  '../../../academies/tech/dsa/sliding-window/practice/anagram-frequency-window-001.js';
import slidingWindowPractice from
  '../../../academies/tech/dsa/sliding-window/practice/sliding-window-001.js';
import fixedWindowRollingStatePractice from
  '../../../academies/tech/dsa/sliding-window/practice/sliding-window-fixed-window-rolling-state-001.js';
import fixedWindowSlideTracePractice from
  '../../../academies/tech/dsa/sliding-window/practice/sliding-window-fixed-window-slide-trace-001.js';
import fixedWindowStateMcqPractice from
  '../../../academies/tech/dsa/sliding-window/practice/sliding-window-fixed-window-state-mcq-001.js';
import fixedWindowUpdateTimingPractice from
  '../../../academies/tech/dsa/sliding-window/practice/sliding-window-fixed-window-update-timing-001.js';
import permutationInStringPractice from
  '../../../academies/tech/dsa/sliding-window/practice/sliding-window-permutation-in-string-001.js';
import substringConcatenationPractice from
  '../../../academies/tech/dsa/sliding-window/practice/substring-concatenation-words-001.js';
import { TECHNOLOGY_ACADEMY_NODE_ID } from '../academyRegistry.ts';
import { createQubitelAcademyPlatformRegistry } from '../index.ts';
import { createLearningNodeRegistry, getChildren } from '../../registry/index.ts';
import { validateLearningNodes } from '../../validation/index.ts';
import { DSA_CATEGORY_NODE_ID } from './dsa/dsa.registry.ts';
import {
  SLIDING_WINDOW_TOPIC_NODE_ID
} from './dsa/topics/slidingWindow.registry.ts';
import {
  createTechCategoriesRegistrySource
} from './techCategories.registry.ts';

type AuthoredProblem = Record<string, unknown> & {
  id: string;
};

const authoredProblems = [
  longestSubstringLesson,
  minimumSizeSubarrayLesson,
  anagramFrequencyWindowPractice,
  slidingWindowPractice,
  fixedWindowRollingStatePractice,
  fixedWindowSlideTracePractice,
  fixedWindowStateMcqPractice,
  fixedWindowUpdateTimingPractice,
  permutationInStringPractice,
  substringConcatenationPractice
] as AuthoredProblem[];

function createPilotRegistry() {
  const platformRegistry = createQubitelAcademyPlatformRegistry();
  const techSource = createTechCategoriesRegistrySource();

  return createLearningNodeRegistry({
    nodes: [
      ...platformRegistry.nodesById.values(),
      ...techSource.nodes
    ]
  });
}

test('registers the additive Tech pilot as Technology Academy -> DSA -> Sliding Window', () => {
  const registry = createPilotRegistry();

  assert.deepEqual(
    getChildren(registry, TECHNOLOGY_ACADEMY_NODE_ID).map((node) => node.id),
    [DSA_CATEGORY_NODE_ID]
  );
  assert.deepEqual(
    getChildren(registry, DSA_CATEGORY_NODE_ID).map((node) => node.id),
    [SLIDING_WINDOW_TOPIC_NODE_ID]
  );
  assert.deepEqual(
    getChildren(registry, SLIDING_WINDOW_TOPIC_NODE_ID).map((node) => node.id),
    authoredProblems.map((problem) => problem.id)
  );
});

test('preserves authored Sliding Window content field-for-field inside LearningNodes', () => {
  const registry = createPilotRegistry();

  authoredProblems.forEach((problem, index) => {
    const node = registry.nodesById.get(problem.id);

    assert.ok(node, `Missing LearningNode for authored problem ${problem.id}`);
    assert.deepEqual(node.content, problem);
    assert.equal(
      node.kind,
      index < 2 ? 'lesson' : 'practice'
    );
  });
});

test('keeps authored content order stable', () => {
  const registry = createPilotRegistry();
  const childIds = getChildren(registry, SLIDING_WINDOW_TOPIC_NODE_ID)
    .map((node) => node.id);

  assert.deepEqual(
    childIds,
    authoredProblems.map((problem) => problem.id)
  );
});

test('passes LearningNode graph validation without changing existing Tech content', () => {
  const platformRegistry = createQubitelAcademyPlatformRegistry();
  const techSource = createTechCategoriesRegistrySource();
  const validation = validateLearningNodes(
    [
      ...platformRegistry.nodesById.values(),
      ...techSource.nodes
    ],
    {
      requireSingleRoot: true,
      allowOrphans: false
    }
  );

  assert.equal(
    validation.valid,
    true,
    JSON.stringify(validation.issues, null, 2)
  );
  assert.deepEqual(validation.issues, []);
});
