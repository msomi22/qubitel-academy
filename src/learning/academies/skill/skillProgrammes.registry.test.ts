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
    assert.equal(topics[0].content?.type, 'book');
    assert.ok(Array.isArray(topics[0].content?.pages));
    assert.ok(topics[0].content.pages.length > 0);
    assert.equal(getChildren(registry, topics[0].id).length, 0);
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


test('Skill LearningNode child labels do not duplicate parent labels', () => {
  const registry = createSkillRegistry();
  const normalize = (value) => String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

  for (const node of registry.nodesById.values()) {
    if (!node.parentId) continue;
    const parent = getNodeById(registry, node.parentId);
    if (!parent) continue;

    assert.notEqual(
      normalize(node.label),
      normalize(parent.label),
      `${node.id} repeats its parent label "${parent.label}"`
    );
  }
});


test('Skill topics do not add single learning-material pass-through nodes', () => {
  const registry = createSkillRegistry();

  for (const node of registry.nodesById.values()) {
    if (node.kind !== 'topic') continue;

    const children = getChildren(registry, node.id);
    const isSingleMaterialPassThrough =
      !node.content
      && children.length === 1
      && children[0].kind === 'learningMaterial';

    assert.equal(
      isSingleMaterialPassThrough,
      false,
      `${node.id} should carry its single learning material directly`
    );
  }
});


test('Onychology overview embeds separate top-view and cross-section nail figures', () => {
  const registry = createSkillRegistry();
  const onychology = getNodeById(registry, 'cos-l6-m18-t01-overview');

  assert.equal(onychology?.content?.type, 'book');

  const pages = onychology?.content?.pages || [];
  const topViewPage = pages.find((page) => page.id === 'nail-unit-top-view');
  const crossSectionPage = pages.find((page) => page.id === 'nail-unit-cross-section');

  assert.ok(topViewPage);
  assert.ok(crossSectionPage);

  const topViewImage = topViewPage.blocks?.find((block) => block.type === 'image');
  const crossSectionImage = crossSectionPage.blocks?.find((block) => block.type === 'image');

  assert.equal(
    topViewImage?.src,
    '/cosmetology/visuals/04-nails-body/18-01a-nail-unit-top-view.webp'
  );
  assert.equal(
    crossSectionImage?.src,
    '/cosmetology/visuals/04-nails-body/18-01b-nail-unit-cross-section.webp'
  );

  const serialized = JSON.stringify(pages).toLowerCase();
  for (const term of [
    'nail plate',
    'nail bed',
    'nail matrix',
    'lunula',
    'proximal nail fold',
    'lateral nail fold',
    'eponychium',
    'cuticle',
    'hyponychium',
    'free edge'
  ]) {
    assert.match(serialized, new RegExp(term.replace(/ /g, '\\s+')));
  }
});
