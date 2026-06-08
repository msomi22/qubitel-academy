import assert from 'node:assert/strict';
import test from 'node:test';

import type { LearningNode } from '../core/index.ts';
import { createLearningNodeRegistry } from '../registry/index.ts';
import {
  createNodeRoutePath,
  createRouteIndex,
  createRouteSegment,
  getNodeRouteEntry,
  getRouteNode,
  getRoutingMatch,
  getRoutingPath,
  normalizeRoutePath,
  resolveNodeFromRoutePath,
  splitRoutePath
} from './index.ts';

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
  childIds: ['dsa', 'java']
});
const dsa = node({
  id: 'dsa',
  kind: 'category',
  label: 'DSA',
  parentId: 'tech',
  childIds: ['sliding-window', 'two-pointers']
});
const java = node({
  id: 'java',
  kind: 'category',
  label: 'Java',
  parentId: 'tech'
});
const slidingWindow = node({
  id: 'sliding-window',
  kind: 'topic',
  label: 'Sliding Window',
  parentId: 'dsa',
  attributes: [{ key: 'routeSegment', value: 'Sliding Window' }]
});
const twoPointers = node({
  id: 'two-pointers',
  kind: 'topic',
  label: 'Two Pointers',
  parentId: 'dsa'
});

function registry() {
  return createLearningNodeRegistry({
    nodes: [platform, tech, dsa, java, slidingWindow, twoPointers]
  });
}

test('creates URL-safe route segments from node ids', () => {
  assert.equal(createRouteSegment(node({ id: 'Grade 3 English', kind: 'topic', label: 'English' })), 'grade-3-english');
  assert.equal(createRouteSegment(node({ id: 'cbc/math/add & subtract', kind: 'topic', label: 'Math' })), 'cbc%2Fmath%2Fadd-%26-subtract');
});

test('creates route segments from custom segment attributes', () => {
  assert.equal(createRouteSegment(slidingWindow), 'sliding-window');
  assert.equal(
    createRouteSegment(node({
      id: 'internal-id',
      kind: 'topic',
      label: 'Topic',
      attributes: [{ key: 'slug', value: 'Custom Segment' }]
    }), { segmentAttributeKey: 'slug' }),
    'custom-segment'
  );
});

test('normalizes route paths with a leading slash and no trailing slash', () => {
  assert.equal(normalizeRoutePath(''), '/');
  assert.equal(normalizeRoutePath('/'), '/');
  assert.equal(normalizeRoutePath('academy/tech/'), '/academy/tech');
  assert.equal(normalizeRoutePath('//academy///tech//'), '/academy/tech');
});

test('splits normalized route paths into decoded segments', () => {
  assert.deepEqual(splitRoutePath('/academy/tech/sliding-window'), ['academy', 'tech', 'sliding-window']);
  assert.deepEqual(splitRoutePath('/academy/cbc%2Fmath'), ['academy', 'cbc/math']);
});

test('generates route path for a known node', () => {
  assert.equal(
    createNodeRoutePath(registry(), 'two-pointers'),
    '/platform/tech/dsa/two-pointers'
  );
});

test('generates route path with a base path', () => {
  assert.equal(
    createNodeRoutePath(registry(), 'two-pointers', { basePath: '/learn' }),
    '/learn/platform/tech/dsa/two-pointers'
  );
});

test('generates route path with and without root inclusion', () => {
  const testRegistry = registry();

  assert.equal(createNodeRoutePath(testRegistry, 'tech'), '/platform/tech');
  assert.equal(createNodeRoutePath(testRegistry, 'tech', { includeRoot: false }), '/tech');
});

test('generates route path from custom segment attributes', () => {
  assert.equal(
    createNodeRoutePath(registry(), 'sliding-window'),
    '/platform/tech/dsa/sliding-window'
  );
});

test('returns undefined for unknown node ids', () => {
  assert.equal(createNodeRoutePath(registry(), 'missing'), undefined);
  assert.equal(getRoutingPath(registry(), 'missing'), undefined);
});

test('creates route index and resolves node entries', () => {
  const testRegistry = registry();
  const routeIndex = createRouteIndex(testRegistry);
  const entry = getNodeRouteEntry(routeIndex, 'two-pointers');

  assert.equal(entry?.nodeId, 'two-pointers');
  assert.equal(entry?.path, '/platform/tech/dsa/two-pointers');
  assert.deepEqual(entry?.segments, ['platform', 'tech', 'dsa', 'two-pointers']);
  assert.equal(getRouteNode(testRegistry, routeIndex, '/platform/tech/dsa/two-pointers')?.id, 'two-pointers');
});

test('resolves route path back to a node', () => {
  const testRegistry = registry();
  const match = resolveNodeFromRoutePath(testRegistry, '/platform/tech/dsa/two-pointers');
  const wrapperMatch = getRoutingMatch(testRegistry, '/platform/tech/dsa/two-pointers');

  assert.equal(match.node?.id, 'two-pointers');
  assert.equal(match.entry?.path, '/platform/tech/dsa/two-pointers');
  assert.equal(wrapperMatch.node?.id, 'two-pointers');
  assert.deepEqual(resolveNodeFromRoutePath(testRegistry, '/missing'), {});
});

test('handles duplicate paths deterministically', () => {
  const first = node({ id: 'first', kind: 'topic', label: 'First', attributes: [{ key: 'routeSegment', value: 'same' }] });
  const second = node({ id: 'second', kind: 'topic', label: 'Second', attributes: [{ key: 'routeSegment', value: 'same' }] });
  const testRegistry = createLearningNodeRegistry({ nodes: [first, second] });
  const routeIndex = createRouteIndex(testRegistry);

  assert.deepEqual(routeIndex.duplicatePaths.get('/same'), ['first', 'second']);
  assert.equal(routeIndex.nodeIdsByPath.get('/same'), 'first');
});

test('route index creation is deterministic by node id ordering', () => {
  const testRegistry = createLearningNodeRegistry({ nodes: [twoPointers, platform, tech, dsa, slidingWindow, java] });
  const routeIndex = createRouteIndex(testRegistry);

  assert.deepEqual([...routeIndex.entriesByNodeId.keys()], [
    'dsa',
    'java',
    'platform',
    'sliding-window',
    'tech',
    'two-pointers'
  ]);
});

test('routing helpers do not mutate input nodes', () => {
  const inputNodes = [platform, tech, dsa, slidingWindow];
  const snapshot = JSON.stringify(inputNodes);
  const testRegistry = createLearningNodeRegistry({ nodes: inputNodes });

  createRouteIndex(testRegistry);
  createNodeRoutePath(testRegistry, 'sliding-window');
  resolveNodeFromRoutePath(testRegistry, '/platform/tech/dsa/sliding-window');

  assert.equal(JSON.stringify(inputNodes), snapshot);
});
