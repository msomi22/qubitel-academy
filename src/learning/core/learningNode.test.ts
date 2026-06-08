import assert from 'node:assert/strict';
import test from 'node:test';

import {
  createAcademyNode,
  createContainerNode,
  createContentNode,
  createLearningNode,
  createPlatformNode,
  getAppearance,
  getAttribute,
  getChildIds,
  hasAction,
  hasChildren,
  hasFeature,
  isLearningNode,
  LEARNING_NODE_ACTION_INTENTS,
  LEARNING_NODE_APPEARANCE_KEYS,
  LEARNING_NODE_FEATURES,
  LEARNING_NODE_KINDS,
  normalizeLearningNode
} from './index.ts';
import type { LearningNode } from './learningNode.types.ts';

test('detects valid LearningNode values', () => {
  const node: LearningNode = {
    id: 'technology-academy',
    kind: LEARNING_NODE_KINDS.academy,
    label: 'Technology Academy',
    summary: 'Engineering learning path.',
    parentId: 'qubitel-academy',
    childIds: ['dsa'],
    attributes: [{ key: 'audience', value: 'engineers' }],
    features: [{ kind: LEARNING_NODE_FEATURES.practice }],
    actions: [{ intent: LEARNING_NODE_ACTION_INTENTS.openChildren }],
    appearances: [{ key: LEARNING_NODE_APPEARANCE_KEYS.layout, value: 'grid' }],
    version: 1
  };

  assert.equal(isLearningNode(node), true);
});

test('rejects invalid LearningNode values', () => {
  assert.equal(isLearningNode(null), false);
  assert.equal(isLearningNode({}), false);
  assert.equal(isLearningNode({ id: 'node-1', kind: 'topic' }), false);
  assert.equal(isLearningNode({ id: 'node-1', kind: 'topic', label: 'Topic', childIds: [1] }), false);
  assert.equal(isLearningNode({ id: 'node-1', kind: 'topic', label: 'Topic', features: [{ name: 'practice' }] }), false);
});

test('handles missing optional arrays safely', () => {
  const node: LearningNode = {
    id: 'node-1',
    kind: LEARNING_NODE_KINDS.topic,
    label: 'Topic'
  };

  assert.deepEqual(getChildIds(node), []);
  assert.equal(hasChildren(node), false);
  assert.equal(getAttribute(node, 'level'), undefined);
  assert.equal(getAppearance(node, 'layout'), undefined);
  assert.equal(hasFeature(node, LEARNING_NODE_FEATURES.practice), false);
  assert.equal(hasAction(node, LEARNING_NODE_ACTION_INTENTS.openChildren), false);
});

test('looks up attributes and appearances', () => {
  const node: LearningNode = {
    id: 'grade-3-english',
    kind: LEARNING_NODE_KINDS.learningArea,
    label: 'English',
    attributes: [
      { key: 'grade', value: 3 },
      { key: 'academy', value: 'cbc' }
    ],
    appearances: [
      { key: LEARNING_NODE_APPEARANCE_KEYS.icon, value: 'book' },
      { key: LEARNING_NODE_APPEARANCE_KEYS.tone, value: 'child-friendly' }
    ]
  };

  assert.equal(getAttribute<number>(node, 'grade'), 3);
  assert.equal(getAttribute<string>(node, 'academy'), 'cbc');
  assert.equal(getAppearance<string>(node, LEARNING_NODE_APPEARANCE_KEYS.icon), 'book');
  assert.equal(getAppearance<string>(node, LEARNING_NODE_APPEARANCE_KEYS.tone), 'child-friendly');
});

test('detects features and actions', () => {
  const node: LearningNode = {
    id: 'exam-1',
    kind: LEARNING_NODE_KINDS.exam,
    label: 'Exam 1',
    features: [
      { kind: LEARNING_NODE_FEATURES.assessment },
      { kind: LEARNING_NODE_FEATURES.readAloud }
    ],
    actions: [
      { intent: LEARNING_NODE_ACTION_INTENTS.startExam },
      { intent: LEARNING_NODE_ACTION_INTENTS.reviewResults }
    ]
  };

  assert.equal(hasFeature(node, LEARNING_NODE_FEATURES.assessment), true);
  assert.equal(hasFeature(node, LEARNING_NODE_FEATURES.aiTutor), false);
  assert.equal(hasAction(node, LEARNING_NODE_ACTION_INTENTS.startExam), true);
  assert.equal(hasAction(node, LEARNING_NODE_ACTION_INTENTS.startPractice), false);
});

test('normalizes optional arrays and default version without mutating input', () => {
  const node: LearningNode = {
    id: 'node-1',
    kind: LEARNING_NODE_KINDS.topic,
    label: 'Topic',
    childIds: ['child-1'],
    attributes: [{ key: 'difficulty', value: 'easy' }]
  };
  const originalSnapshot = JSON.stringify(node);

  const normalized = normalizeLearningNode(node);

  assert.notEqual(normalized, node);
  assert.deepEqual(normalized.childIds, ['child-1']);
  assert.deepEqual(normalized.features, []);
  assert.deepEqual(normalized.actions, []);
  assert.deepEqual(normalized.appearances, []);
  assert.equal(normalized.version, 1);
  assert.equal(JSON.stringify(node), originalSnapshot);
});

test('returns child id copies without exposing the original array', () => {
  const node: LearningNode = {
    id: 'node-1',
    kind: LEARNING_NODE_KINDS.category,
    label: 'Category',
    childIds: ['topic-1']
  };

  const childIds = getChildIds(node);
  childIds.push('topic-2');

  assert.deepEqual(node.childIds, ['topic-1']);
  assert.deepEqual(getChildIds(node), ['topic-1']);
  assert.equal(hasChildren(node), true);
});

test('creates generic LearningNodes with defaults', () => {
  const node = createLearningNode({
    id: 'topic-1',
    kind: LEARNING_NODE_KINDS.topic,
    label: 'Topic 1'
  });

  assert.deepEqual(node, {
    id: 'topic-1',
    kind: LEARNING_NODE_KINDS.topic,
    label: 'Topic 1',
    childIds: [],
    attributes: [],
    features: [],
    actions: [],
    appearances: [],
    version: 1
  });
});

test('creates platform and academy nodes', () => {
  const platform = createPlatformNode({
    id: 'qubitel-academy',
    label: 'Qubitel Academy'
  });
  const academy = createAcademyNode({
    id: 'technology-academy',
    label: 'Technology Academy',
    parentId: 'qubitel-academy'
  });

  assert.equal(platform.kind, LEARNING_NODE_KINDS.platform);
  assert.equal(academy.kind, LEARNING_NODE_KINDS.academy);
  assert.equal(academy.parentId, 'qubitel-academy');
});

test('creates container and content nodes while keeping kind flexible', () => {
  const container = createContainerNode({
    id: 'grade-3',
    kind: LEARNING_NODE_KINDS.grade,
    label: 'Grade 3'
  });
  const customContainer = createContainerNode({
    id: 'future-container',
    kind: 'futureContainer',
    label: 'Future Container'
  });
  const content = createContentNode({
    id: 'lesson-1',
    kind: LEARNING_NODE_KINDS.lesson,
    label: 'Lesson 1'
  });
  const customContent = createContentNode({
    id: 'future-content',
    kind: 'futureContent',
    label: 'Future Content'
  });

  assert.equal(container.kind, LEARNING_NODE_KINDS.grade);
  assert.equal(customContainer.kind, 'futureContainer');
  assert.equal(content.kind, LEARNING_NODE_KINDS.lesson);
  assert.equal(customContent.kind, 'futureContent');
});

test('factories do not mutate input objects', () => {
  const input = {
    id: 'practice-1',
    kind: LEARNING_NODE_KINDS.practice,
    label: 'Practice 1',
    childIds: ['question-1'],
    features: [{ kind: LEARNING_NODE_FEATURES.practice }]
  };
  const originalSnapshot = JSON.stringify(input);

  const node = createLearningNode(input);
  node.childIds?.push('question-2');
  node.features?.push({ kind: LEARNING_NODE_FEATURES.aiTutor });

  assert.equal(JSON.stringify(input), originalSnapshot);
});
