import type { LearningNode } from '../../../core/index.ts';
import { createLearningNode } from '../../../core/index.ts';
import { LEARNING_NODE_KINDS } from '../../../core/learningNode.constants.ts';
import {
  grade3EnglishActivitiesNodes
} from './grade3/english-activities/englishActivities.registry.ts';
import {
  grade3MathematicalActivitiesNodes
} from './grade3/mathematical-activities/mathematicalActivities.registry.ts';
import {
  grade3KiswahiliActivitiesNodes
} from './grade3/kiswahili-activities/kiswahiliActivities.registry.ts';

export const grade3English = createLearningNode({
  id: 'grade-3-english-activities',
  kind: LEARNING_NODE_KINDS.learningArea,
  label: 'English Activities',
  summary: 'Grade 3 English Activities.',
  parentId: 'grade-3',
  childIds: [
    'grade-3-english-activities-theme-spelling',
    'grade-3-english-activities-theme-reading-comprehension',
    'grade-3-english-activities-theme-parts-of-speech'
  ],
  attributes: [
    { key: 'routeSegment', value: 'english-activities' },
    { key: 'learningAreaId', value: 'english-activities' },
    { key: 'learningAreaName', value: 'English Activities' },
    { key: 'gradeId', value: 'grade-3' },
    { key: 'gradeName', value: 'Grade 3' }
  ],
  features: [{ kind: 'guidedContent' }, { kind: 'readAloud' }],
  actions: [{ intent: 'openChildren' }],
  appearances: [
    { key: 'icon', value: '📚' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

export const grade3Math = createLearningNode({
  id: 'grade-3-mathematical-activities',
  kind: LEARNING_NODE_KINDS.learningArea,
  label: 'Mathematical Activities',
  summary: 'Grade 3 Mathematics.',
  parentId: 'grade-3',
  childIds: ['grade-3-mathematical-activities-theme-mixed-revision'],
  attributes: [
    { key: 'routeSegment', value: 'mathematical-activities' },
    { key: 'learningAreaId', value: 'mathematical-activities' },
    { key: 'learningAreaName', value: 'Mathematical Activities' },
    { key: 'gradeId', value: 'grade-3' },
    { key: 'gradeName', value: 'Grade 3' }
  ],
  features: [{ kind: 'guidedContent' }],
  actions: [{ intent: 'openChildren' }],
  appearances: [
    { key: 'icon', value: '🔢' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

export const grade3LearningAreaNodes: LearningNode[] = [
  grade3English,
  grade3Math,
  ...grade3EnglishActivitiesNodes,
  ...grade3MathematicalActivitiesNodes,
  ...grade3KiswahiliActivitiesNodes
];