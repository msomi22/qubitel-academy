import type { LearningNode } from '../../../../core/index.ts';
import { createLearningNode } from '../../../../core/index.ts';
import { LEARNING_NODE_KINDS } from '../../../../core/learningNode.constants.ts';

export const GRADE_1_ENGLISH_ACTIVITIES_NODE_ID = 'grade-1-english-activities';
export const GRADE_1_NODE_ID = 'grade-1';
export const CBC_ACADEMY_NODE_ID = 'cbc-academy';

export const grade1Node = createLearningNode({
  id: GRADE_1_NODE_ID,
  kind: LEARNING_NODE_KINDS.grade,
  label: 'Grade 1',
  summary: 'Grade 1 curriculum learning areas.',
  parentId: CBC_ACADEMY_NODE_ID,
  attributes: [
    { key: 'routeSegment', value: 'grade-1' },
    { key: 'gradeId', value: 'grade-1' },
    { key: 'gradeName', value: 'Grade 1' }
  ],
  features: [
    { kind: 'guidedContent' }
  ],
  actions: [
    { intent: 'openChildren' }
  ],
  appearances: [
    { key: 'icon', value: '🎒' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

export const grade1EnglishActivitiesLearningArea = createLearningNode({
  id: GRADE_1_ENGLISH_ACTIVITIES_NODE_ID,
  kind: LEARNING_NODE_KINDS.learningArea,
  label: 'English Activities',
  summary: 'Grade 1 English Activities for listening, speaking, reading, and early writing.',
  parentId: GRADE_1_NODE_ID,
  attributes: [
    { key: 'routeSegment', value: 'english-activities' },
    { key: 'learningAreaId', value: 'english-activities' },
    { key: 'learningAreaName', value: 'English Activities' },
    { key: 'gradeId', value: 'grade-1' },
    { key: 'gradeName', value: 'Grade 1' }
  ],
  features: [
    { kind: 'guidedContent' },
    { kind: 'readAloud' },
    { kind: 'assessment' }
  ],
  actions: [
    { intent: 'openChildren' }
  ],
  appearances: [
    { key: 'icon', value: '📚' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

export const englishActivitiesRootNodes: LearningNode[] = [
  grade1Node,
  grade1EnglishActivitiesLearningArea
];