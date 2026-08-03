import { createLearningNode } from '../../../../core/index.ts';
import { LEARNING_NODE_KINDS } from '../../../../core/learningNode.constants.ts';

const GRADE_1_ENGLISH_ACTIVITIES_NODE_ID = 'grade-1-english-activities';
const GRADE_1_NODE_ID = 'grade-1';
const CBC_ACADEMY_NODE_ID = 'cbc-academy';

export const grade1EnglishThemeGreetings = createLearningNode({
  id: 'grade-1-english-activities-theme-greetings',
  kind: LEARNING_NODE_KINDS.theme,
  label: 'Greetings',
  summary: 'Learn how to greet people in different situations.',
  parentId: GRADE_1_ENGLISH_ACTIVITIES_NODE_ID,
  attributes: [
    { key: 'routeSegment', value: 'greetings' },
    { key: 'learningAreaId', value: 'english-activities' },
    { key: 'learningAreaName', value: 'English Activities' },
    { key: 'gradeId', value: 'grade-1' },
    { key: 'gradeName', value: 'Grade 1' }
  ],
  features: [
    { kind: 'guidedContent' },
    { kind: 'readAloud' }
  ],
  actions: [
    { intent: 'openChildren' }
  ],
  appearances: [
    { key: 'icon', value: '👋' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

export const grade1EnglishThemeSchool = createLearningNode({
  id: 'grade-1-english-activities-theme-school',
  kind: LEARNING_NODE_KINDS.theme,
  label: 'School',
  summary: 'Learn vocabulary and phrases related to school.',
  parentId: GRADE_1_ENGLISH_ACTIVITIES_NODE_ID,
  attributes: [
    { key: 'routeSegment', value: 'school' },
    { key: 'learningAreaId', value: 'english-activities' },
    { key: 'learningAreaName', value: 'English Activities' },
    { key: 'gradeId', value: 'grade-1' },
    { key: 'gradeName', value: 'Grade 1' }
  ],
  features: [
    { kind: 'guidedContent' },
    { kind: 'readAloud' }
  ],
  actions: [
    { intent: 'openChildren' }
  ],
  appearances: [
    { key: 'icon', value: '🏫' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

export const grade1EnglishThemeFamily = createLearningNode({
  id: 'grade-1-english-activities-theme-family',
  kind: LEARNING_NODE_KINDS.theme,
  label: 'Family',
  summary: 'Learn vocabulary and phrases about family members.',
  parentId: GRADE_1_ENGLISH_ACTIVITIES_NODE_ID,
  attributes: [
    { key: 'routeSegment', value: 'family' },
    { key: 'learningAreaId', value: 'english-activities' },
    { key: 'learningAreaName', value: 'English Activities' },
    { key: 'gradeId', value: 'grade-1' },
    { key: 'gradeName', value: 'Grade 1' }
  ],
  features: [
    { kind: 'guidedContent' },
    { kind: 'readAloud' }
  ],
  actions: [
    { intent: 'openChildren' }
  ],
  appearances: [
    { key: 'icon', value: '👨‍👩‍👧‍👦' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

export const grade1EnglishThemeHome = createLearningNode({
  id: 'grade-1-english-activities-theme-home',
  kind: LEARNING_NODE_KINDS.theme,
  label: 'Home',
  summary: 'Learn vocabulary and phrases about home.',
  parentId: GRADE_1_ENGLISH_ACTIVITIES_NODE_ID,
  attributes: [
    { key: 'routeSegment', value: 'home' },
    { key: 'learningAreaId', value: 'english-activities' },
    { key: 'learningAreaName', value: 'English Activities' },
    { key: 'gradeId', value: 'grade-1' },
    { key: 'gradeName', value: 'Grade 1' }
  ],
  features: [
    { kind: 'guidedContent' },
    { kind: 'readAloud' }
  ],
  actions: [
    { intent: 'openChildren' }
  ],
  appearances: [
    { key: 'icon', value: '🏠' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

export const grade1EnglishThemeTime = createLearningNode({
  id: 'grade-1-english-activities-theme-time',
  kind: LEARNING_NODE_KINDS.theme,
  label: 'Time',
  summary: 'Learn vocabulary and phrases about time.',
  parentId: GRADE_1_ENGLISH_ACTIVITIES_NODE_ID,
  attributes: [
    { key: 'routeSegment', value: 'time' },
    { key: 'learningAreaId', value: 'english-activities' },
    { key: 'learningAreaName', value: 'English Activities' },
    { key: 'gradeId', value: 'grade-1' },
    { key: 'gradeName', value: 'Grade 1' }
  ],
  features: [
    { kind: 'guidedContent' },
    { kind: 'readAloud' }
  ],
  actions: [
    { intent: 'openChildren' }
  ],
  appearances: [
    { key: 'icon', value: '⏰' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

export const grade1EnglishThemeWeather = createLearningNode({
  id: 'grade-1-english-activities-theme-weather-environment',
  kind: LEARNING_NODE_KINDS.theme,
  label: 'Weather and our Environment',
  summary: 'Learn vocabulary and phrases about weather and environment.',
  parentId: GRADE_1_ENGLISH_ACTIVITIES_NODE_ID,
  attributes: [
    { key: 'routeSegment', value: 'weather-environment' },
    { key: 'learningAreaId', value: 'english-activities' },
    { key: 'learningAreaName', value: 'English Activities' },
    { key: 'gradeId', value: 'grade-1' },
    { key: 'gradeName', value: 'Grade 1' }
  ],
  features: [
    { kind: 'guidedContent' },
    { kind: 'readAloud' }
  ],
  actions: [
    { intent: 'openChildren' }
  ],
  appearances: [
    { key: 'icon', value: '🌤️' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

export const grade1EnglishThemeHygiene = createLearningNode({
  id: 'grade-1-english-activities-theme-hygiene',
  kind: LEARNING_NODE_KINDS.theme,
  label: 'Hygiene',
  summary: 'Learn vocabulary and phrases about hygiene.',
  parentId: GRADE_1_ENGLISH_ACTIVITIES_NODE_ID,
  attributes: [
    { key: 'routeSegment', value: 'hygiene' },
    { key: 'learningAreaId', value: 'english-activities' },
    { key: 'learningAreaName', value: 'English Activities' },
    { key: 'gradeId', value: 'grade-1' },
    { key: 'gradeName', value: 'Grade 1' }
  ],
  features: [
    { kind: 'guidedContent' },
    { kind: 'readAloud' }
  ],
  actions: [
    { intent: 'openChildren' }
  ],
  appearances: [
    { key: 'icon', value: '🧼' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

export const grade1EnglishThemeBodyParts = createLearningNode({
  id: 'grade-1-english-activities-theme-parts-of-body',
  kind: LEARNING_NODE_KINDS.theme,
  label: 'Parts of the Body',
  summary: 'Learn vocabulary for parts of the body.',
  parentId: GRADE_1_ENGLISH_ACTIVITIES_NODE_ID,
  attributes: [
    { key: 'routeSegment', value: 'parts-of-body' },
    { key: 'learningAreaId', value: 'english-activities' },
    { key: 'learningAreaName', value: 'English Activities' },
    { key: 'gradeId', value: 'grade-1' },
    { key: 'gradeName', value: 'Grade 1' }
  ],
  features: [
    { kind: 'guidedContent' },
    { kind: 'readAloud' }
  ],
  actions: [
    { intent: 'openChildren' }
  ],
  appearances: [
    { key: 'icon', value: '🧍' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

export const grade1EnglishThemeFriends = createLearningNode({
  id: 'grade-1-english-activities-theme-my-friends',
  kind: LEARNING_NODE_KINDS.theme,
  label: 'My Friends',
  summary: 'Learn vocabulary and phrases about friends.',
  parentId: GRADE_1_ENGLISH_ACTIVITIES_NODE_ID,
  attributes: [
    { key: 'routeSegment', value: 'my-friends' },
    { key: 'learningAreaId', value: 'english-activities' },
    { key: 'learningAreaName', value: 'English Activities' },
    { key: 'gradeId', value: 'grade-1' },
    { key: 'gradeName', value: 'Grade 1' }
  ],
  features: [
    { kind: 'guidedContent' },
    { kind: 'readAloud' }
  ],
  actions: [
    { intent: 'openChildren' }
  ],
  appearances: [
    { key: 'icon', value: '👫' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

export const grade1EnglishThemeSafety = createLearningNode({
  id: 'grade-1-english-activities-theme-safety',
  kind: LEARNING_NODE_KINDS.theme,
  label: 'Safety',
  summary: 'Learn vocabulary and phrases about safety.',
  parentId: GRADE_1_ENGLISH_ACTIVITIES_NODE_ID,
  attributes: [
    { key: 'routeSegment', value: 'safety' },
    { key: 'learningAreaId', value: 'english-activities' },
    { key: 'learningAreaName', value: 'English Activities' },
    { key: 'gradeId', value: 'grade-1' },
    { key: 'gradeName', value: 'Grade 1' }
  ],
  features: [
    { kind: 'guidedContent' },
    { kind: 'readAloud' }
  ],
  actions: [
    { intent: 'openChildren' }
  ],
  appearances: [
    { key: 'icon', value: '🦺' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

export const grade1EnglishThemeCommunityLeaders = createLearningNode({
  id: 'grade-1-english-activities-theme-community-leaders',
  kind: LEARNING_NODE_KINDS.theme,
  label: 'Community Leaders',
  summary: 'Learn vocabulary and phrases about community leaders.',
  parentId: GRADE_1_ENGLISH_ACTIVITIES_NODE_ID,
  attributes: [
    { key: 'routeSegment', value: 'community-leaders' },
    { key: 'learningAreaId', value: 'english-activities' },
    { key: 'learningAreaName', value: 'English Activities' },
    { key: 'gradeId', value: 'grade-1' },
    { key: 'gradeName', value: 'Grade 1' }
  ],
  features: [
    { kind: 'guidedContent' },
    { kind: 'readAloud' }
  ],
  actions: [
    { intent: 'openChildren' }
  ],
  appearances: [
    { key: 'icon', value: '👔' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

export const grade1EnglishThemeLivingTogether = createLearningNode({
  id: 'grade-1-english-activities-theme-living-together',
  kind: LEARNING_NODE_KINDS.theme,
  label: 'Living Together',
  summary: 'Learn vocabulary and phrases about living together.',
  parentId: GRADE_1_ENGLISH_ACTIVITIES_NODE_ID,
  attributes: [
    { key: 'routeSegment', value: 'living-together' },
    { key: 'learningAreaId', value: 'english-activities' },
    { key: 'learningAreaName', value: 'English Activities' },
    { key: 'gradeId', value: 'grade-1' },
    { key: 'gradeName', value: 'Grade 1' }
  ],
  features: [
    { kind: 'guidedContent' },
    { kind: 'readAloud' }
  ],
  actions: [
    { intent: 'openChildren' }
  ],
  appearances: [
    { key: 'icon', value: '🏘️' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

export const grade1EnglishThemeTechnology = createLearningNode({
  id: 'grade-1-english-activities-theme-technology',
  kind: LEARNING_NODE_KINDS.theme,
  label: 'Technology',
  summary: 'Learn vocabulary and phrases about technology.',
  parentId: GRADE_1_ENGLISH_ACTIVITIES_NODE_ID,
  attributes: [
    { key: 'routeSegment', value: 'technology' },
    { key: 'learningAreaId', value: 'english-activities' },
    { key: 'learningAreaName', value: 'English Activities' },
    { key: 'gradeId', value: 'grade-1' },
    { key: 'gradeName', value: 'Grade 1' }
  ],
  features: [
    { kind: 'guidedContent' },
    { kind: 'readAloud' }
  ],
  actions: [
    { intent: 'openChildren' }
  ],
  appearances: [
    { key: 'icon', value: '💻' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

export const grade1EnglishThemeNumbers = createLearningNode({
  id: 'grade-1-english-activities-theme-numbers',
  kind: LEARNING_NODE_KINDS.theme,
  label: 'Numbers',
  summary: 'Learn vocabulary and phrases about numbers.',
  parentId: GRADE_1_ENGLISH_ACTIVITIES_NODE_ID,
  attributes: [
    { key: 'routeSegment', value: 'numbers' },
    { key: 'learningAreaId', value: 'english-activities' },
    { key: 'learningAreaName', value: 'English Activities' },
    { key: 'gradeId', value: 'grade-1' },
    { key: 'gradeName', value: 'Grade 1' }
  ],
  features: [
    { kind: 'guidedContent' },
    { kind: 'readAloud' }
  ],
  actions: [
    { intent: 'openChildren' }
  ],
  appearances: [
    { key: 'icon', value: '🔢' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

export const grade1EnglishThemeConservingResources = createLearningNode({
  id: 'grade-1-english-activities-theme-conserving-resources',
  kind: LEARNING_NODE_KINDS.theme,
  label: 'Conserving Resources',
  summary: 'Learn vocabulary and phrases about conserving resources.',
  parentId: GRADE_1_ENGLISH_ACTIVITIES_NODE_ID,
  attributes: [
    { key: 'routeSegment', value: 'conserving-resources' },
    { key: 'learningAreaId', value: 'english-activities' },
    { key: 'learningAreaName', value: 'English Activities' },
    { key: 'gradeId', value: 'grade-1' },
    { key: 'gradeName', value: 'Grade 1' }
  ],
  features: [
    { kind: 'guidedContent' },
    { kind: 'readAloud' }
  ],
  actions: [
    { intent: 'openChildren' }
  ],
  appearances: [
    { key: 'icon', value: '♻️' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

export const grade1EnglishActivitiesThemeNodes = [
  grade1EnglishThemeGreetings,
  grade1EnglishThemeSchool,
  grade1EnglishThemeFamily,
  grade1EnglishThemeHome,
  grade1EnglishThemeTime,
  grade1EnglishThemeWeather,
  grade1EnglishThemeHygiene,
  grade1EnglishThemeBodyParts,
  grade1EnglishThemeFriends,
  grade1EnglishThemeSafety,
  grade1EnglishThemeCommunityLeaders,
  grade1EnglishThemeLivingTogether,
  grade1EnglishThemeTechnology,
  grade1EnglishThemeNumbers,
  grade1EnglishThemeConservingResources
];