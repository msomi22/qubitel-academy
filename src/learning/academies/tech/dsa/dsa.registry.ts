import type { LearningNode } from '../../../core/index.ts';
import { createLearningNode } from '../../../core/index.ts';
import { LEARNING_NODE_KINDS } from '../../../core/learningNode.constants.ts';
import { TECHNOLOGY_ACADEMY_NODE_ID } from '../../academyRegistry.ts';
import {
  SLIDING_WINDOW_TOPIC_NODE_ID,
  slidingWindowNodes
} from './topics/slidingWindow.registry.ts';

export const DSA_CATEGORY_NODE_ID = 'dsa';

export const dsaCategoryNode = createLearningNode({
  id: DSA_CATEGORY_NODE_ID,
  kind: LEARNING_NODE_KINDS.category,
  label: 'Data Structures & Algorithms',
  summary: 'Pattern-based coding interview mastery with invariants and optimized reasoning.',
  parentId: TECHNOLOGY_ACADEMY_NODE_ID,
  childIds: [SLIDING_WINDOW_TOPIC_NODE_ID],
  attributes: [
    { key: 'routeSegment', value: DSA_CATEGORY_NODE_ID },
    { key: 'academyId', value: 'tech' },
    { key: 'categoryId', value: DSA_CATEGORY_NODE_ID },
    { key: 'legacyPath', value: '/category/dsa' }
  ],
  features: [
    { kind: 'guidedContent' },
    { kind: 'practice' }
  ],
  actions: [
    { intent: 'openChildren' }
  ],
  appearances: [
    { key: 'icon', value: 'code' },
    { key: 'tone', value: 'professional' }
  ],
  version: 1
});

export const dsaNodes: LearningNode[] = [
  dsaCategoryNode,
  ...slidingWindowNodes
];
