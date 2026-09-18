import assert from 'node:assert/strict';
import test from 'node:test';

import { getAcademyRootNodeById } from '../academyRegistry.ts';
import {
  COSMETOLOGY_PROGRAMME_NODE_ID,
  createSkillProgrammesRegistrySource
} from './skillProgrammes.registry.ts';
import {
  createLearningNodeRegistry,
  getChildren,
  getNodeById,
  isLearningNodeReady
} from '../../registry/index.ts';
import { createNodeUiPath } from '../../routing/index.ts';
import { getLearningNodeAcademyIdForRuntimeAcademy } from '../../home/activeAcademyNode.ts';

function createSkillRegistry() {
  const academyNode = getAcademyRootNodeById('skill-academy');
  const source = createSkillProgrammesRegistrySource();

  return createLearningNodeRegistry({
    nodes: [academyNode, ...source.nodes].filter(Boolean)
  });
}

test('runtime Skill Academy maps to the Skill LearningNode root', () => {
  assert.equal(getLearningNodeAcademyIdForRuntimeAcademy('skill'), 'skill-academy');
});

test('Skill Academy exposes Cosmetology as a programme LearningNode', () => {
  const registry = createSkillRegistry();
  const academy = getNodeById(registry, 'skill-academy');
  const programmes = getChildren(registry, academy.id);

  assert.deepEqual(programmes.map((node) => node.id), [COSMETOLOGY_PROGRAMME_NODE_ID]);
  assert.equal(programmes[0].kind, 'programme');
  assert.equal(isLearningNodeReady(registry, programmes[0]), true);
});

test('Cosmetology exposes Levels 3 through 6 and only Level 6 is ready', () => {
  const registry = createSkillRegistry();
  const levels = getChildren(registry, COSMETOLOGY_PROGRAMME_NODE_ID);

  assert.deepEqual(levels.map((node) => node.label), [
    'Level 3',
    'Level 4',
    'Level 5',
    'Level 6'
  ]);
  assert.ok(levels.every((node) => node.kind === 'level'));
  assert.ok(levels.every((node) => node.parentId === COSMETOLOGY_PROGRAMME_NODE_ID));

  assert.deepEqual(
    levels.map((node) => isLearningNodeReady(registry, node)),
    [false, false, false, true]
  );
});

test('Level 6 exposes a ready module, topic, and learning material', () => {
  const registry = createSkillRegistry();
  const modules = getChildren(registry, 'cosmetology-level-6');

  assert.equal(modules.length, 1);
  assert.equal(modules[0].kind, 'module');
  assert.equal(modules[0].label, 'Module 1 — Cosmetology Foundations and Professional Practice');
  assert.equal(isLearningNodeReady(registry, modules[0]), true);

  const topics = getChildren(registry, modules[0].id);
  assert.equal(topics.length, 1);
  assert.equal(topics[0].kind, 'topic');

  const materials = getChildren(registry, topics[0].id);
  assert.equal(materials.length, 1);
  assert.equal(materials[0].kind, 'learningMaterial');
  assert.equal(materials[0].content?.type, 'book');
  assert.ok(Array.isArray(materials[0].content?.pages));
  assert.ok(materials[0].content.pages.length > 0);
});

test('non-CBC LearningNode UI routes use stable /learn/:nodeId routes', () => {
  const registry = createSkillRegistry();

  assert.equal(
    createNodeUiPath(registry, COSMETOLOGY_PROGRAMME_NODE_ID, {
      includeRoot: false,
      includeAcademyRoot: false
    }),
    '/learn/cosmetology'
  );
});
