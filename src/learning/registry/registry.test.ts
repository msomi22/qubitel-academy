import assert from 'node:assert/strict';
import test from 'node:test';

import {
  createLearningNodeRegistry,
  createRegistryFromSources,
  getAncestors,
  getChildren,
  getDescendants,
  getDuplicateNodeIds,
  getNodeById,
  getParent,
  getRootNodes,
  LEARNING_NODE_REGISTRY_LAYERS,
  loadLearningNodeRegistry,
  mergeLearningNodeSources
} from './index.ts';
import type { LearningNode } from '../core/index.ts';

function node(input: Partial<LearningNode> & Pick<LearningNode, 'id' | 'kind' | 'label'>): LearningNode {
  return input;
}

const platform = node({
  id: 'platform',
  kind: 'platform',
  label: 'Qubitel Academy',
  childIds: ['tech']
});
const tech = node({
  id: 'tech',
  kind: 'academy',
  label: 'Technology Academy',
  parentId: 'platform',
  childIds: ['dsa']
});
const dsa = node({
  id: 'dsa',
  kind: 'category',
  label: 'DSA',
  parentId: 'tech'
});
const slidingWindow = node({
  id: 'sliding-window',
  kind: 'topic',
  label: 'Sliding Window',
  parentId: 'dsa',
  childIds: ['lesson-1']
});
const lesson = node({
  id: 'lesson-1',
  kind: 'lesson',
  label: 'Intro Lesson'
});

test('creates a registry and indexes nodes by id', () => {
  const registry = createLearningNodeRegistry({ nodes: [platform, tech, dsa] });

  assert.equal(getNodeById(registry, 'platform')?.label, 'Qubitel Academy');
  assert.equal(getNodeById(registry, 'tech')?.label, 'Technology Academy');
  assert.equal(getNodeById(registry, 'missing'), undefined);
});

test('gets children from parent childIds', () => {
  const registry = createLearningNodeRegistry({ nodes: [platform, tech, dsa] });

  assert.deepEqual(getChildren(registry, 'platform').map((child) => child.id), ['tech']);
});

test('gets children from child parentId', () => {
  const registry = createLearningNodeRegistry({ nodes: [platform, tech, dsa, slidingWindow] });

  assert.deepEqual(getChildren(registry, 'dsa').map((child) => child.id), ['sliding-window']);
});

test('gets parent from derived parent index', () => {
  const registry = createLearningNodeRegistry({ nodes: [platform, tech, dsa, slidingWindow] });

  assert.equal(getParent(registry, 'sliding-window')?.id, 'dsa');
  assert.equal(getParent(registry, slidingWindow)?.id, 'dsa');
  assert.equal(getParent(registry, 'platform'), undefined);
  assert.equal(getParent(registry, 'missing'), undefined);
});

test('gets ancestors from child to root', () => {
  const registry = createLearningNodeRegistry({ nodes: [platform, tech, dsa, slidingWindow] });

  assert.deepEqual(getAncestors(registry, 'sliding-window').map((ancestor) => ancestor.id), [
    'dsa',
    'tech',
    'platform'
  ]);
});

test('gets descendants breadth-first and avoids missing child ids', () => {
  const registry = createLearningNodeRegistry({ nodes: [platform, tech, dsa, slidingWindow, lesson] });

  assert.deepEqual(getDescendants(registry, 'platform').map((descendant) => descendant.id), [
    'tech',
    'dsa',
    'sliding-window',
    'lesson-1'
  ]);
  assert.deepEqual(getDescendants(registry, 'missing'), []);
});

test('gets root nodes sorted by id', () => {
  const standalone = node({ id: 'standalone', kind: 'academy', label: 'Standalone' });
  const registry = createLearningNodeRegistry({ nodes: [standalone, dsa, platform, tech] });

  assert.deepEqual(getRootNodes(registry).map((root) => root.id), ['platform', 'standalone']);
});

test('detects duplicate node ids deterministically', () => {
  const duplicates = getDuplicateNodeIds([
    node({ id: 'b', kind: 'topic', label: 'B' }),
    node({ id: 'a', kind: 'topic', label: 'A' }),
    node({ id: 'b', kind: 'topic', label: 'B2' }),
    node({ id: 'a', kind: 'topic', label: 'A2' })
  ]);

  assert.deepEqual(duplicates, ['a', 'b']);
});

test('merges node sources without requiring a central registry file', () => {
  const merged = mergeLearningNodeSources([
    {
      id: 'platform-source',
      layer: LEARNING_NODE_REGISTRY_LAYERS.platform,
      nodes: [platform]
    },
    {
      id: 'tech-source',
      layer: LEARNING_NODE_REGISTRY_LAYERS.academy,
      nodes: [tech]
    }
  ]);

  assert.deepEqual(merged.map((item) => item.id), ['platform', 'tech']);
});

test('creates registry from sources', () => {
  const registry = createRegistryFromSources([
    { id: 'platform-source', layer: 'platform', nodes: [platform] },
    { id: 'tech-source', layer: 'academy', nodes: [tech, dsa] }
  ]);

  assert.equal(getNodeById(registry, 'dsa')?.label, 'DSA');
  assert.deepEqual(getChildren(registry, 'tech').map((child) => child.id), ['dsa']);
});

test('loads registry from a source loader contract', async () => {
  const registry = await loadLearningNodeRegistry(async () => [
    { id: 'platform-source', layer: 'platform', nodes: [platform] },
    { id: 'tech-source', layer: 'academy', nodes: [tech] }
  ]);

  assert.equal(getNodeById(registry, 'tech')?.label, 'Technology Academy');
});

test('does not mutate input arrays or nodes', () => {
  const inputNodes = [platform, tech];
  const originalSnapshot = JSON.stringify(inputNodes);

  const registry = createLearningNodeRegistry({ nodes: inputNodes });
  getNodeById(registry, 'platform')?.childIds?.push('mutated-child');

  assert.equal(JSON.stringify(inputNodes), originalSnapshot);
});

test('keeps traversal cycle-safe for descendants', () => {
  const cycleA = node({ id: 'cycle-a', kind: 'topic', label: 'Cycle A', childIds: ['cycle-b'] });
  const cycleB = node({ id: 'cycle-b', kind: 'topic', label: 'Cycle B', childIds: ['cycle-a'] });
  const registry = createLearningNodeRegistry({ nodes: [cycleA, cycleB] });

  assert.deepEqual(getDescendants(registry, 'cycle-a').map((descendant) => descendant.id), [
    'cycle-b'
  ]);
});

test('keeps traversal cycle-safe for ancestors', () => {
  const cycleA = node({ id: 'cycle-a', kind: 'topic', label: 'Cycle A', parentId: 'cycle-b' });
  const cycleB = node({ id: 'cycle-b', kind: 'topic', label: 'Cycle B', parentId: 'cycle-a' });
  const registry = createLearningNodeRegistry({ nodes: [cycleA, cycleB] });

  assert.deepEqual(getAncestors(registry, 'cycle-a').map((ancestor) => ancestor.id), [
    'cycle-b',
    'cycle-a'
  ]);
});

test('supports custom flexible layer values', () => {
  const source = {
    id: 'future-layer-source',
    layer: 'futureLayer',
    nodes: [node({ id: 'future-node', kind: 'futureKind', label: 'Future Node' })]
  };
  const registry = createRegistryFromSources([source]);

  assert.equal(getNodeById(registry, 'future-node')?.kind, 'futureKind');
});
