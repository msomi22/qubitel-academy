import foundationGuide from
  '../../../../academies/tech/itil/itil-foundation/lessons/foundation-certification-guide.js';
import type { LearningNode } from '../../../core/index.ts';
import { createLearningNode } from '../../../core/index.ts';
import { LEARNING_NODE_KINDS } from '../../../core/learningNode.constants.ts';
import { TECHNOLOGY_ACADEMY_NODE_ID } from '../../academyRegistry.ts';

export const ITIL_CATEGORY_NODE_ID = 'itil';
export const ITIL_FOUNDATION_TOPIC_NODE_ID = 'itil-foundation';
export const ITIL_FOUNDATION_GUIDE_NODE_ID = 'itil-5-foundation-certification-guide';

const authoredGuide = foundationGuide;

const foundationGuideNode = createLearningNode({
  id: ITIL_FOUNDATION_GUIDE_NODE_ID,
  kind: LEARNING_NODE_KINDS.lesson,
  label: authoredGuide.title,
  summary: authoredGuide.prompt,
  parentId: ITIL_FOUNDATION_TOPIC_NODE_ID,
  content: authoredGuide,
  attributes: [
    { key: 'routeSegment', value: ITIL_FOUNDATION_GUIDE_NODE_ID },
    { key: 'academyId', value: 'tech' },
    { key: 'categoryId', value: ITIL_CATEGORY_NODE_ID },
    { key: 'topicId', value: ITIL_FOUNDATION_TOPIC_NODE_ID },
    { key: 'authoredProblemId', value: authoredGuide.id },
    { key: 'legacyManifestId', value: ITIL_FOUNDATION_GUIDE_NODE_ID },
    { key: 'contentType', value: 'lesson' },
    { key: 'difficulty', value: authoredGuide.difficulty }
  ],
  features: [{ kind: 'guidedContent' }],
  actions: [{ intent: 'resume' }],
  appearances: [
    { key: 'icon', value: 'book-open' },
    { key: 'tone', value: 'professional' }
  ],
  version: 1
});

const itilFoundationTopicNode = createLearningNode({
  id: ITIL_FOUNDATION_TOPIC_NODE_ID,
  kind: LEARNING_NODE_KINDS.topic,
  label: 'ITIL Foundation',
  summary: 'ITIL Foundation certification and modern IT service management.',
  parentId: ITIL_CATEGORY_NODE_ID,
  childIds: [ITIL_FOUNDATION_GUIDE_NODE_ID],
  attributes: [
    { key: 'routeSegment', value: ITIL_FOUNDATION_TOPIC_NODE_ID },
    { key: 'academyId', value: 'tech' },
    { key: 'categoryId', value: ITIL_CATEGORY_NODE_ID },
    { key: 'topicId', value: ITIL_FOUNDATION_TOPIC_NODE_ID }
  ],
  features: [{ kind: 'guidedContent' }],
  actions: [{ intent: 'openChildren' }],
  appearances: [
    { key: 'icon', value: 'book-open' },
    { key: 'tone', value: 'professional' }
  ],
  version: 1
});

export const itilCategoryNode = createLearningNode({
  id: ITIL_CATEGORY_NODE_ID,
  kind: LEARNING_NODE_KINDS.category,
  label: 'ITIL / ITSM',
  summary: 'ITIL Foundation certification and modern IT service management practice.',
  parentId: TECHNOLOGY_ACADEMY_NODE_ID,
  childIds: [ITIL_FOUNDATION_TOPIC_NODE_ID],
  attributes: [
    { key: 'routeSegment', value: ITIL_CATEGORY_NODE_ID },
    { key: 'academyId', value: 'tech' },
    { key: 'categoryId', value: ITIL_CATEGORY_NODE_ID },
    { key: 'legacyPath', value: '/category/itil' }
  ],
  features: [{ kind: 'guidedContent' }],
  actions: [{ intent: 'openChildren' }],
  appearances: [
    { key: 'icon', value: 'book-open' },
    { key: 'tone', value: 'professional' }
  ],
  version: 1
});

export const itilNodes: LearningNode[] = [
  itilCategoryNode,
  itilFoundationTopicNode,
  foundationGuideNode
];
