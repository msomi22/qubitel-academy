import type { LearningNode } from '../../../core/index.ts';
import { createLearningNode } from '../../../core/index.ts';
import { LEARNING_NODE_KINDS } from '../../../core/learningNode.constants.ts';
import { grade1EnglishActivitiesNodes } from './grade1/englishActivities.registry.ts';
import { grade1MathematicalActivitiesNodes } from './grade1/mathematical-activities/mathematicalActivities.registry.ts';

export const grade1English = createLearningNode({
  id: 'grade-1-english-activities',
  kind: LEARNING_NODE_KINDS.learningArea,
  label: 'English Activities',
  summary: 'Grade 1 English Activities for listening, speaking, reading, and early writing.',
  parentId: 'grade-1',
  attributes: [
    { key: 'routeSegment', value: 'english-activities' },
    { key: 'learningAreaCode', value: 'ENG' },
    { key: 'learningAreaId', value: 'english-activities' },
    { key: 'learningAreaName', value: 'English Activities' },
    { key: 'gradeId', value: 'grade-1' },
    { key: 'gradeName', value: 'Grade 1' }
  ],
  features: [{ kind: 'guidedContent' }, { kind: 'readAloud' }, { kind: 'assessment' }],
  actions: [{ intent: 'openChildren' }],
  appearances: [
    { key: 'icon', value: '📚' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

export const grade1Kiswahili = createLearningNode({
  id: 'grade-1-kiswahili-activities',
  kind: LEARNING_NODE_KINDS.learningArea,
  label: 'Kiswahili Activities',
  summary: 'Grade 1 Kiswahili language learning.',
  parentId: 'grade-1',
  attributes: [
    { key: 'routeSegment', value: 'kiswahili-activities' },
    { key: 'learningAreaId', value: 'kiswahili-activities' },
    { key: 'learningAreaName', value: 'Kiswahili Activities' },
    { key: 'gradeId', value: 'grade-1' },
    { key: 'gradeName', value: 'Grade 1' }
  ],
  features: [{ kind: 'guidedContent' }, { kind: 'readAloud' }],
  actions: [],
  appearances: [
    { key: 'icon', value: '💬' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

export const grade1Math = createLearningNode({
  id: 'grade-1-mathematical-activities',
  kind: LEARNING_NODE_KINDS.learningArea,
  label: 'Mathematical Activities',
  summary: 'Grade 1 Mathematics for numbers, shapes, and basic operations.',
  parentId: 'grade-1',
  childIds: ['grade-1-mathematical-activities-theme-numbers'],
  attributes: [
    { key: 'routeSegment', value: 'mathematical-activities' },
    { key: 'learningAreaId', value: 'mathematical-activities' },
    { key: 'learningAreaName', value: 'Mathematical Activities' },
    { key: 'gradeId', value: 'grade-1' },
    { key: 'gradeName', value: 'Grade 1' }
  ],
  features: [{ kind: 'guidedContent' }, { kind: 'practice' }, { kind: 'assessment' }],
  actions: [{ intent: 'openChildren' }],
  appearances: [
    { key: 'icon', value: '🔢' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

export const grade1Science = createLearningNode({
  id: 'grade-1-environmental-activities',
  kind: LEARNING_NODE_KINDS.learningArea,
  label: 'Environmental Activities',
  summary: 'Grade 1 Environmental Activities for science and social studies.',
  parentId: 'grade-1',
  attributes: [
    { key: 'routeSegment', value: 'environmental-activities' },
    { key: 'learningAreaId', value: 'environmental-activities' },
    { key: 'learningAreaName', value: 'Environmental Activities' },
    { key: 'gradeId', value: 'grade-1' },
    { key: 'gradeName', value: 'Grade 1' }
  ],
  features: [{ kind: 'guidedContent' }],
  actions: [],
  appearances: [
    { key: 'icon', value: '🌍' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

export const grade1Hygiene = createLearningNode({
  id: 'grade-1-hygiene-nutrition-activities',
  kind: LEARNING_NODE_KINDS.learningArea,
  label: 'Hygiene and Nutrition Activities',
  summary: 'Grade 1 Hygiene and Nutrition for healthy living.',
  parentId: 'grade-1',
  attributes: [
    { key: 'routeSegment', value: 'hygiene-nutrition-activities' },
    { key: 'learningAreaId', value: 'hygiene-nutrition-activities' },
    { key: 'learningAreaName', value: 'Hygiene and Nutrition Activities' },
    { key: 'gradeId', value: 'grade-1' },
    { key: 'gradeName', value: 'Grade 1' }
  ],
  features: [{ kind: 'guidedContent' }],
  actions: [],
  appearances: [
    { key: 'icon', value: '🧼' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

export const grade1Movement = createLearningNode({
  id: 'grade-1-movement-creative-activities',
  kind: LEARNING_NODE_KINDS.learningArea,
  label: 'Movement and Creative Activities',
  summary: 'Grade 1 Movement and Creative Arts.',
  parentId: 'grade-1',
  attributes: [
    { key: 'routeSegment', value: 'movement-creative-activities' },
    { key: 'learningAreaId', value: 'movement-creative-activities' },
    { key: 'learningAreaName', value: 'Movement and Creative Activities' },
    { key: 'gradeId', value: 'grade-1' },
    { key: 'gradeName', value: 'Grade 1' }
  ],
  features: [{ kind: 'guidedContent' }],
  actions: [],
  appearances: [
    { key: 'icon', value: '🎨' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

export const grade1Religious = createLearningNode({
  id: 'grade-1-religious-education-activities',
  kind: LEARNING_NODE_KINDS.learningArea,
  label: 'Religious Education Activities',
  summary: 'Grade 1 Religious Education.',
  parentId: 'grade-1',
  attributes: [
    { key: 'routeSegment', value: 'religious-education-activities' },
    { key: 'learningAreaId', value: 'religious-education-activities' },
    { key: 'learningAreaName', value: 'Religious Education Activities' },
    { key: 'gradeId', value: 'grade-1' },
    { key: 'gradeName', value: 'Grade 1' }
  ],
  features: [{ kind: 'guidedContent' }],
  actions: [],
  appearances: [
    { key: 'icon', value: '🕌' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

export const grade1LearningAreaNodes: LearningNode[] = [
  grade1English,
  grade1Kiswahili,
  grade1Math,
  grade1Science,
  grade1Hygiene,
  grade1Movement,
  grade1Religious
];

export const grade1Nodes: LearningNode[] = [
  ...grade1LearningAreaNodes,
  ...grade1EnglishActivitiesNodes,
  ...grade1MathematicalActivitiesNodes
];
