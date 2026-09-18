import type { LearningNode } from '../core/index.ts';
import { createAcademyNode, createLearningNode } from '../core/index.ts';
import { createLearningNodeRegistry, type LearningNodeRegistry } from '../registry/index.ts';
import {
  createQubitelPlatformRegistry,
  QUBITEL_ACADEMY_ROOT_NODE_ID
} from '../platform/index.ts';

export const TECHNOLOGY_ACADEMY_NODE_ID = 'technology-academy';
export const CBC_ACADEMY_NODE_ID = 'cbc-academy';
export const CUSTOMER_EXPERIENCE_ACADEMY_NODE_ID = 'customer-experience-academy';
export const SKILL_ACADEMY_NODE_ID = 'skill-academy';

export const ACADEMY_ROOT_NODE_IDS = [
  TECHNOLOGY_ACADEMY_NODE_ID,
  CBC_ACADEMY_NODE_ID,
  CUSTOMER_EXPERIENCE_ACADEMY_NODE_ID,
  SKILL_ACADEMY_NODE_ID
] as const;

const ACADEMY_ROOT_NODES = [
  createAcademyNode({
    id: TECHNOLOGY_ACADEMY_NODE_ID,
    label: 'Technology Academy',
    summary: 'Engineering and computer science learning for professionals.',
    parentId: QUBITEL_ACADEMY_ROOT_NODE_ID,
    attributes: [
      { key: 'scope', value: 'academyRoot' }
    ],
    features: [
      { kind: 'technologyLearning' }
    ],
    actions: [
      { intent: 'openChildren' }
    ],
    appearances: [
      { key: 'tone', value: 'professional' },
      { key: 'icon', value: 'code' }
    ]
  }),
  createAcademyNode({
    id: CBC_ACADEMY_NODE_ID,
    label: 'CBC Academy',
    summary: 'Child-friendly curriculum learning and practice.',
    parentId: QUBITEL_ACADEMY_ROOT_NODE_ID,
    attributes: [
      { key: 'scope', value: 'academyRoot' }
    ],
    features: [
      { kind: 'curriculumLearning' }
    ],
    actions: [
      { intent: 'openChildren' }
    ],
    appearances: [
      { key: 'tone', value: 'childFriendly' },
      { key: 'icon', value: 'book-open' }
    ]
  }),
  createAcademyNode({
    id: CUSTOMER_EXPERIENCE_ACADEMY_NODE_ID,
    label: 'Customer Experience Academy',
    summary: 'Customer support and service excellence learning.',
    parentId: QUBITEL_ACADEMY_ROOT_NODE_ID,
    attributes: [
      { key: 'scope', value: 'academyRoot' }
    ],
    features: [
      { kind: 'serviceExcellenceLearning' }
    ],
    actions: [
      { intent: 'openChildren' }
    ],
    appearances: [
      { key: 'tone', value: 'serviceFocused' },
      { key: 'icon', value: 'headphones' }
    ]
  }),
  createAcademyNode({
    id: SKILL_ACADEMY_NODE_ID,
    label: 'Skill Academy',
    summary: 'Technical, vocational and professional learning.',
    parentId: QUBITEL_ACADEMY_ROOT_NODE_ID,
    attributes: [
      { key: 'scope', value: 'academyRoot' },
      { key: 'routeSegment', value: 'skill' }
    ],
    features: [
      { kind: 'skillsLearning' }
    ],
    actions: [
      { intent: 'openChildren' }
    ],
    appearances: [
      { key: 'tone', value: 'professional' },
      { key: 'icon', value: 'tools' }
    ]
  })
] as const;

function cloneLearningNode(node: LearningNode): LearningNode {
  return createLearningNode(node);
}

export function getAcademyRootNodeIds(): string[] {
  return [...ACADEMY_ROOT_NODE_IDS];
}

export function getAcademyRootNodes(): LearningNode[] {
  return ACADEMY_ROOT_NODES.map(cloneLearningNode);
}

export function getAcademyRootNodeById(id: string): LearningNode | undefined {
  const academyNode = ACADEMY_ROOT_NODES.find((node) => node.id === id);
  return academyNode ? cloneLearningNode(academyNode) : undefined;
}

export function createAcademyRegistry(): LearningNodeRegistry {
  return createLearningNodeRegistry({
    nodes: getAcademyRootNodes()
  });
}

export function createQubitelAcademyPlatformRegistry(): LearningNodeRegistry {
  return createQubitelPlatformRegistry(getAcademyRootNodes());
}
