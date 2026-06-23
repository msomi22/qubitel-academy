import type { LearningNode } from '../../../core/index.ts';
import { createLearningNode } from '../../../core/index.ts';
import { LEARNING_NODE_KINDS } from '../../../core/learningNode.constants.ts';

export const pp2English = createLearningNode({
  id: 'pp2-english-activities',
  kind: LEARNING_NODE_KINDS.learningArea,
  label: 'English Activities',
  summary: 'English language learning for PP2.',
  parentId: 'pp2',
  attributes: [
    { key: 'routeSegment', value: 'english-activities' },
    { key: 'learningAreaId', value: 'english-activities' },
    { key: 'learningAreaName', value: 'English Activities' },
    { key: 'gradeId', value: 'pp2' },
    { key: 'gradeName', value: 'PP2' }
  ],
  features: [{ kind: 'guidedContent' }, { kind: 'readAloud' }],
  actions: [{ intent: 'openChildren' }],
  appearances: [
    { key: 'icon', value: '📚' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

export const pp2Math = createLearningNode({
  id: 'pp2-mathematical-activities',
  kind: LEARNING_NODE_KINDS.learningArea,
  label: 'Mathematical Activities',
  summary: 'Mathematics learning for PP2.',
  parentId: 'pp2',
  attributes: [
    { key: 'routeSegment', value: 'mathematical-activities' },
    { key: 'learningAreaId', value: 'mathematical-activities' },
    { key: 'learningAreaName', value: 'Mathematical Activities' },
    { key: 'gradeId', value: 'pp2' },
    { key: 'gradeName', value: 'PP2' }
  ],
  features: [{ kind: 'guidedContent' }],
  actions: [{ intent: 'openChildren' }],
  appearances: [
    { key: 'icon', value: '🔢' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

export const pp2LearningAreaNodes: LearningNode[] = [
  pp2English,
  pp2Math
];