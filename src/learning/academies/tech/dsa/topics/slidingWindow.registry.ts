import longestSubstringLesson from
  '../../../../../academies/tech/dsa/sliding-window/lessons/longest-substring-without-repeating-characters.js';
import minimumSizeSubarrayLesson from
  '../../../../../academies/tech/dsa/sliding-window/lessons/minimum-size-subarray-sum.js';
import anagramFrequencyWindowPractice from
  '../../../../../academies/tech/dsa/sliding-window/practice/anagram-frequency-window-001.js';
import slidingWindowPractice from
  '../../../../../academies/tech/dsa/sliding-window/practice/sliding-window-001.js';
import fixedWindowRollingStatePractice from
  '../../../../../academies/tech/dsa/sliding-window/practice/sliding-window-fixed-window-rolling-state-001.js';
import fixedWindowSlideTracePractice from
  '../../../../../academies/tech/dsa/sliding-window/practice/sliding-window-fixed-window-slide-trace-001.js';
import fixedWindowStateMcqPractice from
  '../../../../../academies/tech/dsa/sliding-window/practice/sliding-window-fixed-window-state-mcq-001.js';
import fixedWindowUpdateTimingPractice from
  '../../../../../academies/tech/dsa/sliding-window/practice/sliding-window-fixed-window-update-timing-001.js';
import permutationInStringPractice from
  '../../../../../academies/tech/dsa/sliding-window/practice/sliding-window-permutation-in-string-001.js';
import substringConcatenationPractice from
  '../../../../../academies/tech/dsa/sliding-window/practice/substring-concatenation-words-001.js';
import type { LearningNode } from '../../../../core/index.ts';
import { createLearningNode } from '../../../../core/index.ts';
import { LEARNING_NODE_KINDS } from '../../../../core/learningNode.constants.ts';

export const SLIDING_WINDOW_TOPIC_NODE_ID = 'sliding-window';

type TechLearningProblem = Record<string, unknown> & {
  id: string;
  title: string;
};

type AuthoredContentEntry = {
  manifestId: string;
  kind: 'lesson' | 'practice';
  problem: unknown;
};

function asTechLearningProblem(value: unknown): TechLearningProblem {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error('Tech LearningNode content must be an authored problem object.');
  }

  const problem = value as Record<string, unknown>;
  if (typeof problem.id !== 'string' || !problem.id.trim()) {
    throw new Error('Tech LearningNode content requires a stable authored problem id.');
  }
  if (typeof problem.title !== 'string' || !problem.title.trim()) {
    throw new Error(`Tech problem ${problem.id} requires a title.`);
  }

  return problem as TechLearningProblem;
}

function optionalString(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value : undefined;
}

function createContentNode(entry: AuthoredContentEntry): LearningNode {
  const problem = asTechLearningProblem(entry.problem);
  const summary = optionalString(problem.question)
    || optionalString(problem.prompt)
    || optionalString(problem.explanation);
  const difficulty = optionalString(problem.difficulty);
  const language = optionalString(problem.language);

  return createLearningNode({
    id: problem.id,
    kind: entry.kind === 'lesson'
      ? LEARNING_NODE_KINDS.lesson
      : LEARNING_NODE_KINDS.practice,
    label: problem.title,
    ...(summary ? { summary } : {}),
    parentId: SLIDING_WINDOW_TOPIC_NODE_ID,
    content: problem,
    attributes: [
      { key: 'routeSegment', value: entry.manifestId },
      { key: 'academyId', value: 'tech' },
      { key: 'categoryId', value: 'dsa' },
      { key: 'topicId', value: SLIDING_WINDOW_TOPIC_NODE_ID },
      { key: 'legacyManifestId', value: entry.manifestId },
      { key: 'authoredProblemId', value: problem.id },
      { key: 'contentType', value: entry.kind },
      ...(difficulty ? [{ key: 'difficulty', value: difficulty }] : []),
      ...(language ? [{ key: 'language', value: language }] : [])
    ],
    features: [
      { kind: entry.kind === 'lesson' ? 'guidedContent' : 'practice' }
    ],
    actions: [
      { intent: entry.kind === 'lesson' ? 'resume' : 'startPractice' }
    ],
    appearances: [
      { key: 'icon', value: entry.kind === 'lesson' ? 'book-open' : 'code' },
      { key: 'tone', value: 'professional' }
    ],
    version: 1
  });
}

const authoredContent: AuthoredContentEntry[] = [
  {
    manifestId: 'longest-substring-without-repeating-characters',
    kind: 'lesson',
    problem: longestSubstringLesson
  },
  {
    manifestId: 'minimum-size-subarray-sum',
    kind: 'lesson',
    problem: minimumSizeSubarrayLesson
  },
  {
    manifestId: 'anagram-frequency-window-001',
    kind: 'practice',
    problem: anagramFrequencyWindowPractice
  },
  {
    manifestId: 'sliding-window-001',
    kind: 'practice',
    problem: slidingWindowPractice
  },
  {
    manifestId: 'sliding-window-fixed-window-rolling-state-001',
    kind: 'practice',
    problem: fixedWindowRollingStatePractice
  },
  {
    manifestId: 'sliding-window-fixed-window-slide-trace-001',
    kind: 'practice',
    problem: fixedWindowSlideTracePractice
  },
  {
    manifestId: 'sliding-window-fixed-window-state-mcq-001',
    kind: 'practice',
    problem: fixedWindowStateMcqPractice
  },
  {
    manifestId: 'sliding-window-fixed-window-update-timing-001',
    kind: 'practice',
    problem: fixedWindowUpdateTimingPractice
  },
  {
    manifestId: 'sliding-window-permutation-in-string-001',
    kind: 'practice',
    problem: permutationInStringPractice
  },
  {
    manifestId: 'substring-concatenation-words-001',
    kind: 'practice',
    problem: substringConcatenationPractice
  }
];

export const slidingWindowContentNodes = authoredContent.map(createContentNode);

export const slidingWindowTopicNode = createLearningNode({
  id: SLIDING_WINDOW_TOPIC_NODE_ID,
  kind: LEARNING_NODE_KINDS.topic,
  label: 'WIND — Sliding Window',
  summary: 'Use moving contiguous windows while maintaining a clear validity invariant.',
  parentId: 'dsa',
  childIds: slidingWindowContentNodes.map((node) => node.id),
  attributes: [
    { key: 'routeSegment', value: SLIDING_WINDOW_TOPIC_NODE_ID },
    { key: 'academyId', value: 'tech' },
    { key: 'categoryId', value: 'dsa' },
    { key: 'topicId', value: SLIDING_WINDOW_TOPIC_NODE_ID },
    { key: 'legacyPath', value: '/category/dsa/sliding-window' }
  ],
  features: [
    { kind: 'guidedContent' },
    { kind: 'practice' }
  ],
  actions: [
    { intent: 'openChildren' }
  ],
  appearances: [
    { key: 'icon', value: 'code' },
    { key: 'tone', value: 'professional' }
  ],
  version: 1
});

export const slidingWindowNodes: LearningNode[] = [
  slidingWindowTopicNode,
  ...slidingWindowContentNodes
];
