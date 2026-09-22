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
import itilFoundationGuide from
  '../../../academies/tech/itil/itil-foundation/lessons/foundation-certification-guide.js';
import { TECHNOLOGY_ACADEMY_NODE_ID } from '../academyRegistry.ts';
import { createQubitelAcademyPlatformRegistry } from '../index.ts';
import { createLearningNodeRegistry, getChildren } from '../../registry/index.ts';
import { createNodeUiPath } from '../../routing/index.ts';
import { validateLearningNodes } from '../../validation/index.ts';
import { DSA_CATEGORY_NODE_ID } from './dsa/dsa.registry.ts';
import {
  SLIDING_WINDOW_TOPIC_NODE_ID
} from './dsa/topics/slidingWindow.registry.ts';
import {
  ITIL_CATEGORY_NODE_ID,
  ITIL_FOUNDATION_GUIDE_NODE_ID,
  ITIL_FOUNDATION_TOPIC_NODE_ID
} from './itil/itil.registry.ts';
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

test('registers additive Technology Academy category graphs', () => {
  const registry = createPilotRegistry();

  assert.deepEqual(
    getChildren(registry, TECHNOLOGY_ACADEMY_NODE_ID).map((node) => node.id),
    [DSA_CATEGORY_NODE_ID, ITIL_CATEGORY_NODE_ID]
  );
  assert.deepEqual(
    getChildren(registry, DSA_CATEGORY_NODE_ID).map((node) => node.id),
    [SLIDING_WINDOW_TOPIC_NODE_ID]
  );
  assert.deepEqual(
    getChildren(registry, SLIDING_WINDOW_TOPIC_NODE_ID).map((node) => node.id),
    authoredProblems.map((problem) => problem.id)
  );
  assert.deepEqual(
    getChildren(registry, ITIL_CATEGORY_NODE_ID).map((node) => node.id),
    [ITIL_FOUNDATION_TOPIC_NODE_ID]
  );
  assert.deepEqual(
    getChildren(registry, ITIL_FOUNDATION_TOPIC_NODE_ID).map((node) => node.id),
    [ITIL_FOUNDATION_GUIDE_NODE_ID]
  );
});

test('preserves authored Sliding Window content field-for-field inside LearningNodes', () => {
  const registry = createPilotRegistry();

  authoredProblems.forEach((problem, index) => {
    const node = registry.nodesById.get(problem.id);

    assert.ok(node, `Missing LearningNode for authored problem ${problem.id}`);
    assert.deepEqual(node.content, problem);
    assert.equal(node.kind, index < 2 ? 'lesson' : 'practice');
  });
});

test('preserves the complete authored ITIL problem while projecting renderable book content', () => {
  const registry = createPilotRegistry();
  const node = registry.nodesById.get(ITIL_FOUNDATION_GUIDE_NODE_ID);

  assert.ok(node);
  assert.equal(node.kind, 'lesson');
  assert.ok(node.content && typeof node.content === 'object' && !Array.isArray(node.content));

  const content = node.content as Record<string, unknown>;
  assert.equal(content.type, 'book');

  const metadata = content.metadata as Record<string, unknown>;
  assert.deepEqual(metadata.sourceProblem, itilFoundationGuide);

  const pages = content.pages as Array<Record<string, unknown>>;
  assert.equal(pages.length, 1);
  const blocks = pages[0].blocks as Array<Record<string, unknown>>;
  const appendedBlockCount = [
    itilFoundationGuide.explanation,
    itilFoundationGuide.finalTakeaway
  ].filter(Boolean).length;

  assert.equal(blocks.length, itilFoundationGuide.body.length + appendedBlockCount);
  assert.deepEqual(
    blocks
      .slice(0, itilFoundationGuide.body.length)
      .map((block) => (block.metadata as Record<string, unknown>).sourceBlockIndex),
    itilFoundationGuide.body.map((_, index) => index)
  );
});

test('keeps authored Sliding Window content order stable', () => {
  const registry = createPilotRegistry();
  const childIds = getChildren(registry, SLIDING_WINDOW_TOPIC_NODE_ID)
    .map((node) => node.id);

  assert.deepEqual(
    childIds,
    authoredProblems.map((problem) => problem.id)
  );
});

test('creates stable LearningNode UI routes for the ITIL pilot', () => {
  const registry = createPilotRegistry();

  assert.equal(
    createNodeUiPath(registry, ITIL_FOUNDATION_TOPIC_NODE_ID, {
      includeRoot: false,
      includeAcademyRoot: false
    }),
    '/learn/itil-foundation'
  );
  assert.equal(
    createNodeUiPath(registry, ITIL_FOUNDATION_GUIDE_NODE_ID, {
      includeRoot: false,
      includeAcademyRoot: false
    }),
    '/learn/itil-5-foundation-certification-guide'
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
