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

test('Cosmetology exposes Levels 3 through 6 as LearningNodes', () => {
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
