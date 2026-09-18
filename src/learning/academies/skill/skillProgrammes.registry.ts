import type { LearningNode } from '../../core/index.ts';
import { createLearningNode } from '../../core/index.ts';
import { LEARNING_NODE_KINDS } from '../../core/learningNode.constants.ts';
import { SKILL_ACADEMY_NODE_ID } from '../academyRegistry.ts';
import {
  COSMETOLOGY_FOUNDATIONS_MODULE_NODE_ID,
  cosmetologyLevel6ContentNodes
} from './programmes/cosmetology/level6.registry.ts';
import {
  COSMETOLOGY_ONYCHOLOGY_MODULE_NODE_ID,
  cosmetologyOnychologyNodes
} from './programmes/cosmetology/level6Onychology.registry.ts';

export const COSMETOLOGY_PROGRAMME_NODE_ID = 'cosmetology';

function createCosmetologyLevel(level: number): LearningNode {
  const id = `cosmetology-level-${level}`;

  return createLearningNode({
    id,
    kind: LEARNING_NODE_KINDS.level,
    label: `Level ${level}`,
    summary: `Cosmetology Level ${level} learning pathway.`,
    parentId: COSMETOLOGY_PROGRAMME_NODE_ID,
    childIds: level === 6
      ? [
          COSMETOLOGY_FOUNDATIONS_MODULE_NODE_ID,
          COSMETOLOGY_ONYCHOLOGY_MODULE_NODE_ID
        ]
      : [],
    attributes: [
      { key: 'routeSegment', value: `level-${level}` },
      { key: 'programmeId', value: COSMETOLOGY_PROGRAMME_NODE_ID },
      { key: 'programmeName', value: 'Cosmetology' },
      { key: 'level', value: level }
    ],
    features: [
      { kind: 'guidedContent' }
    ],
    actions: [
      { intent: 'openChildren' }
    ],
    appearances: [
      { key: 'icon', value: '📘' },
      { key: 'tone', value: 'professional' }
    ],
    version: 1
  });
}

const cosmetologyLevels = [3, 4, 5, 6].map(createCosmetologyLevel);

export const cosmetologyProgrammeNode = createLearningNode({
  id: COSMETOLOGY_PROGRAMME_NODE_ID,
  kind: LEARNING_NODE_KINDS.programme,
  label: 'Cosmetology',
  summary: 'Hair, skin, nails, beauty therapy, salon practice and professional cosmetology.',
  parentId: SKILL_ACADEMY_NODE_ID,
  childIds: cosmetologyLevels.map((node) => node.id),
  content: 'A structured professional learning pathway covering scientific foundations and practical cosmetology from Level 3 through Level 6.',
  attributes: [
    { key: 'routeSegment', value: 'cosmetology' },
    { key: 'programmeId', value: COSMETOLOGY_PROGRAMME_NODE_ID },
    { key: 'frameworkNeutral', value: true }
  ],
  features: [
    { kind: 'guidedContent' }
  ],
  actions: [
    { intent: 'openChildren' }
  ],
  appearances: [
    { key: 'icon', value: '✂️' },
    { key: 'tone', value: 'professional' }
  ],
  version: 1
});

export const skillProgrammeNodes: LearningNode[] = [
  cosmetologyProgrammeNode,
  ...cosmetologyLevels,
  ...cosmetologyLevel6ContentNodes,
  ...cosmetologyOnychologyNodes
];

export function createSkillProgrammesRegistrySource() {
  return {
    id: 'skill-programmes',
    layer: 'skill-programmes',
    nodes: skillProgrammeNodes
  };
}

export function getSkillProgrammeNodes(): LearningNode[] {
  return skillProgrammeNodes.map((node) => createLearningNode(node));
}
