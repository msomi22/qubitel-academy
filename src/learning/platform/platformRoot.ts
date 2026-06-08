import type { LearningNode } from '../core/index.ts';
import { createAcademyNode, createLearningNode } from '../core/index.ts';
import { createLearningNodeRegistry, type LearningNodeRegistry } from '../registry/index.ts';

export const QUBITEL_ACADEMY_ROOT_NODE_ID = 'qubitel-academy';

export const QUBITEL_ACADEMY_CHILD_NODE_IDS = [
  'technology-academy',
  'cbc-academy',
  'customer-experience-academy'
] as const;

const QUBITEL_ACADEMY_ROOT_NODE = createLearningNode({
  id: QUBITEL_ACADEMY_ROOT_NODE_ID,
  kind: 'platform',
  label: 'Qubitel Academy',
  summary: 'Multi-academy learning platform for technology, CBC, customer experience, and future academies.',
  childIds: [...QUBITEL_ACADEMY_CHILD_NODE_IDS],
  attributes: [
    { key: 'scope', value: 'platform' },
    { key: 'routeSegment', value: 'academy' },
    { key: 'supportsFutureAcademies', value: true }
  ],
  features: [
    { kind: 'multiAcademy' },
    { kind: 'nodeDrivenNavigation' },
    { kind: 'nodeDrivenRouting' }
  ],
  actions: [
    { intent: 'openChildren' }
  ],
  appearances: [
    { key: 'layout', value: 'academyRoot' },
    { key: 'tone', value: 'professional' },
    { key: 'icon', value: 'graduation-cap' }
  ]
});

function cloneLearningNode(node: LearningNode): LearningNode {
  return createLearningNode(node);
}

export function getPlatformRootNodeId(): string {
  return QUBITEL_ACADEMY_ROOT_NODE_ID;
}

export function getQubitelAcademyRootNode(): LearningNode {
  return cloneLearningNode(QUBITEL_ACADEMY_ROOT_NODE);
}

export function createQubitelPlatformRegistry(extraNodes: LearningNode[] = []): LearningNodeRegistry {
  return createLearningNodeRegistry({
    nodes: [
      getQubitelAcademyRootNode(),
      ...extraNodes.map(cloneLearningNode)
    ]
  });
}

export function createMinimalAcademyPlaceholderNodes(): LearningNode[] {
  return [
    createAcademyNode({
      id: 'technology-academy',
      label: 'Technology Academy',
      parentId: QUBITEL_ACADEMY_ROOT_NODE_ID
    }),
    createAcademyNode({
      id: 'cbc-academy',
      label: 'CBC Academy',
      parentId: QUBITEL_ACADEMY_ROOT_NODE_ID
    }),
    createAcademyNode({
      id: 'customer-experience-academy',
      label: 'Customer Experience Academy',
      parentId: QUBITEL_ACADEMY_ROOT_NODE_ID
    })
  ];
}
