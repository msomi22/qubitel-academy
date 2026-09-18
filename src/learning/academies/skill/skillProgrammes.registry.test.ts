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
import { LEARNING_NODE_NAMING_LIMITS } from '../../core/learningNode.constants.ts';

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
  assert.equal(programmes[0].content, undefined);
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

test('Level 6 exposes Foundations and Onychology as ready learning modules', () => {
  const registry = createSkillRegistry();
  const modules = getChildren(registry, 'cos-l6');

  assert.deepEqual(
    modules.map((node) => node.label),
    [
      'M1 · Foundations',
      'M18 · Onychology'
    ]
  );
  assert.ok(modules.every((node) => node.kind === 'module'));
  assert.ok(modules.every((node) => isLearningNodeReady(registry, node)));

  for (const moduleNode of modules) {
    const topics = getChildren(registry, moduleNode.id);
    assert.equal(topics.length, 1);
    assert.equal(topics[0].kind, 'topic');

    const materials = getChildren(registry, topics[0].id);
    assert.equal(materials.length, 1);
    assert.equal(materials[0].kind, 'learningMaterial');
    assert.equal(materials[0].content?.type, 'book');
    assert.ok(Array.isArray(materials[0].content?.pages));
    assert.ok(materials[0].content.pages.length > 0);
  }
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


test('Skill LearningNode navigation names stay within platform limits', () => {
  const registry = createSkillRegistry();
  const nodes = Array.from(registry.nodesById.values());

  for (const node of nodes) {
    assert.ok(
      node.label.length <= LEARNING_NODE_NAMING_LIMITS.label,
      `${node.id} label exceeds ${LEARNING_NODE_NAMING_LIMITS.label} characters`
    );
    assert.ok(
      node.id.length <= LEARNING_NODE_NAMING_LIMITS.id,
      `${node.id} exceeds ${LEARNING_NODE_NAMING_LIMITS.id} characters`
    );
    assert.match(node.id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);

    const routeSegment = node.attributes?.find((attribute) => attribute.key === 'routeSegment')?.value;
    if (typeof routeSegment === 'string') {
      assert.ok(
        routeSegment.length <= LEARNING_NODE_NAMING_LIMITS.routeSegment,
        `${node.id} route segment exceeds ${LEARNING_NODE_NAMING_LIMITS.routeSegment} characters`
      );
      assert.match(routeSegment, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    }
  }
});
