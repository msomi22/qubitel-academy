import assert from 'node:assert/strict';
import test from 'node:test';

import { getBreadcrumbs } from '../navigation/index.ts';
import { getChildren, getNodeById } from '../registry/index.ts';
import { createNodeRoutePath } from '../routing/index.ts';
import { validateLearningNodeRegistry } from '../validation/index.ts';
import {
  createMinimalAcademyPlaceholderNodes,
  createQubitelPlatformRegistry,
  getPlatformRootNodeId,
  getQubitelAcademyRootNode,
  QUBITEL_ACADEMY_CHILD_NODE_IDS,
  QUBITEL_ACADEMY_ROOT_NODE_ID
} from './index.ts';

test('creates the Qubitel Academy root node with stable identity', () => {
  const root = getQubitelAcademyRootNode();

  assert.equal(root.id, QUBITEL_ACADEMY_ROOT_NODE_ID);
  assert.equal(root.id, 'qubitel-academy');
  assert.equal(root.kind, 'platform');
  assert.equal(root.label, 'Qubitel Academy');
  assert.equal(getPlatformRootNodeId(), 'qubitel-academy');
});

test('declares stable future academy child ids', () => {
  const root = getQubitelAcademyRootNode();

  assert.deepEqual(root.childIds, [
    'technology-academy',
    'cbc-academy',
    'customer-experience-academy'
  ]);
  assert.deepEqual([...QUBITEL_ACADEMY_CHILD_NODE_IDS], root.childIds);
});

test('returned root node cannot mutate the internal source node', () => {
  const firstRoot = getQubitelAcademyRootNode();
  firstRoot.childIds?.push('mutated-academy');
  firstRoot.attributes?.push({ key: 'mutated', value: true });

  const secondRoot = getQubitelAcademyRootNode();

  assert.deepEqual(secondRoot.childIds, [
    'technology-academy',
    'cbc-academy',
    'customer-experience-academy'
  ]);
  assert.equal(secondRoot.attributes?.some((attribute) => attribute.key === 'mutated'), false);
});

test('indexes the root node in a LearningNode registry', () => {
  const registry = createQubitelPlatformRegistry();

  assert.equal(getNodeById(registry, 'qubitel-academy')?.label, 'Qubitel Academy');
});

test('connects minimal academy placeholder children when supplied', () => {
  const registry = createQubitelPlatformRegistry(createMinimalAcademyPlaceholderNodes());

  assert.deepEqual(getChildren(registry, 'qubitel-academy').map((node) => node.id), [
    'technology-academy',
    'cbc-academy',
    'customer-experience-academy'
  ]);
});

test('root works with navigation breadcrumbs', () => {
  const registry = createQubitelPlatformRegistry(createMinimalAcademyPlaceholderNodes());

  assert.deepEqual(getBreadcrumbs(registry, 'qubitel-academy').map((node) => node.id), [
    'qubitel-academy'
  ]);
  assert.deepEqual(getBreadcrumbs(registry, 'cbc-academy').map((node) => node.id), [
    'qubitel-academy',
    'cbc-academy'
  ]);
});

test('root works with route generation', () => {
  const registry = createQubitelPlatformRegistry(createMinimalAcademyPlaceholderNodes());

  assert.equal(createNodeRoutePath(registry, 'qubitel-academy'), '/academy');
  assert.equal(createNodeRoutePath(registry, 'cbc-academy'), '/academy/cbc-academy');
});

test('root graph validates successfully when minimal academy placeholders are supplied', () => {
  const registry = createQubitelPlatformRegistry(createMinimalAcademyPlaceholderNodes());
  const validation = validateLearningNodeRegistry(registry, { requireSingleRoot: true });

  assert.equal(validation.valid, true);
  assert.deepEqual(validation.issues, []);
});

test('registry helper clones extra nodes so callers cannot mutate registry source through input references', () => {
  const placeholders = createMinimalAcademyPlaceholderNodes();
  const registry = createQubitelPlatformRegistry(placeholders);

  placeholders[0].label = 'Mutated Technology Academy';

  assert.equal(getNodeById(registry, 'technology-academy')?.label, 'Technology Academy');
});
