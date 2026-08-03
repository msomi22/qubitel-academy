import type { LearningNode } from '../../../../../core/index.ts';
import { createLearningNode } from '../../../../../core/index.ts';
import { LEARNING_NODE_KINDS } from '../../../../../core/learningNode.constants.ts';
import { grade3UfahamuNodes } from './themes/ufahamu/ufahamu.registry.ts';

export const grade3Kiswahili = createLearningNode({
  id: 'grade-3-kiswahili-activities',
  kind: LEARNING_NODE_KINDS.learningArea,
  label: 'Kiswahili Activities',
  summary: 'Grade 3 Kiswahili Activities.',
  parentId: 'grade-3',
  childIds: ['grade-3-kiswahili-activities-theme-ufahamu'],
  attributes: [
    { key: 'routeSegment', value: 'kiswahili-activities' },
    { key: 'learningAreaId', value: 'kiswahili-activities' },
    { key: 'learningAreaName', value: 'Kiswahili Activities' },
    { key: 'gradeId', value: 'grade-3' },
    { key: 'gradeName', value: 'Grade 3' }
  ],
  features: [{ kind: 'guidedContent' }, { kind: 'readAloud' }],
  actions: [{ intent: 'openChildren' }],
  appearances: [
    { key: 'icon', value: '📗' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

export const grade3KiswahiliActivitiesNodes: LearningNode[] = [
  grade3Kiswahili,
  ...grade3UfahamuNodes
];