import type { LearningNode } from '../../../core/index.ts';
import { createLearningNode } from '../../../core/index.ts';
import { LEARNING_NODE_KINDS } from '../../../core/learningNode.constants.ts';

export const grade2English = createLearningNode({
  id: 'grade-2-english-activities',
  kind: LEARNING_NODE_KINDS.learningArea,
  label: 'English Activities',
  summary: 'Grade 2 English Activities.',
  parentId: 'grade-2',
  attributes: [
    { key: 'routeSegment', value: 'english-activities' },
    { key: 'learningAreaId', value: 'english-activities' },
    { key: 'learningAreaName', value: 'English Activities' },
    { key: 'gradeId', value: 'grade-2' },
    { key: 'gradeName', value: 'Grade 2' }
  ],
  features: [{ kind: 'guidedContent' }, { kind: 'readAloud' }],
  actions: [{ intent: 'openChildren' }],
  appearances: [
    { key: 'icon', value: '📚' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

export const grade2Math = createLearningNode({
  id: 'grade-2-mathematical-activities',
  kind: LEARNING_NODE_KINDS.learningArea,
  label: 'Mathematical Activities',
  summary: 'Grade 2 Mathematics.',
  parentId: 'grade-2',
  attributes: [
    { key: 'routeSegment', value: 'mathematical-activities' },
    { key: 'learningAreaId', value: 'mathematical-activities' },
    { key: 'learningAreaName', value: 'Mathematical Activities' },
    { key: 'gradeId', value: 'grade-2' },
    { key: 'gradeName', value: 'Grade 2' }
  ],
  features: [{ kind: 'guidedContent' }],
  actions: [{ intent: 'openChildren' }],
  appearances: [
    { key: 'icon', value: '🔢' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

export const grade2LearningAreaNodes: LearningNode[] = [grade2English, grade2Math];