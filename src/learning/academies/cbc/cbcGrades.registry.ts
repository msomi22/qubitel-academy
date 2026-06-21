import type { LearningNode } from '../../core/index.ts';
import { createLearningNode } from '../../core/index.ts';
import { LEARNING_NODE_KINDS } from '../../core/learningNode.constants.ts';

export const CBC_ACADEMY_NODE_ID = 'cbc-academy';

// Grade nodes
const pp1 = createLearningNode({
  id: 'pp1',
  kind: LEARNING_NODE_KINDS.grade,
  label: 'PP1',
  summary: 'Pre-Primary 1 curriculum learning areas.',
  parentId: CBC_ACADEMY_NODE_ID,
  attributes: [
    { key: 'routeSegment', value: 'pp1' },
    { key: 'gradeId', value: 'pp1' },
    { key: 'gradeName', value: 'PP1' }
  ],
  features: [{ kind: 'guidedContent' }],
  actions: [],
  appearances: [
    { key: 'icon', value: '🎒' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const pp2 = createLearningNode({
  id: 'pp2',
  kind: LEARNING_NODE_KINDS.grade,
  label: 'PP2',
  summary: 'Pre-Primary 2 curriculum learning areas.',
  parentId: CBC_ACADEMY_NODE_ID,
  attributes: [
    { key: 'routeSegment', value: 'pp2' },
    { key: 'gradeId', value: 'pp2' },
    { key: 'gradeName', value: 'PP2' }
  ],
  features: [{ kind: 'guidedContent' }],
  actions: [{ intent: 'openContent' }],
  appearances: [
    { key: 'icon', value: '🎒' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade1 = createLearningNode({
  id: 'grade-1',
  kind: LEARNING_NODE_KINDS.grade,
  label: 'Grade 1',
  summary: 'Grade 1 curriculum learning areas.',
  parentId: CBC_ACADEMY_NODE_ID,
  attributes: [
    { key: 'routeSegment', value: 'grade-1' },
    { key: 'gradeId', value: 'grade-1' },
    { key: 'gradeName', value: 'Grade 1' }
  ],
  features: [{ kind: 'guidedContent' }],
  actions: [{ intent: 'openChildren' }],
  appearances: [
    { key: 'icon', value: '🎒' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade2 = createLearningNode({
  id: 'grade-2',
  kind: LEARNING_NODE_KINDS.grade,
  label: 'Grade 2',
  summary: 'Grade 2 curriculum learning areas.',
  parentId: CBC_ACADEMY_NODE_ID,
  attributes: [
    { key: 'routeSegment', value: 'grade-2' },
    { key: 'gradeId', value: 'grade-2' },
    { key: 'gradeName', value: 'Grade 2' }
  ],
  features: [{ kind: 'guidedContent' }],
  actions: [{ intent: 'openChildren' }],
  appearances: [
    { key: 'icon', value: '🎒' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade3 = createLearningNode({
  id: 'grade-3',
  kind: LEARNING_NODE_KINDS.grade,
  label: 'Grade 3',
  summary: 'Grade 3 curriculum learning areas.',
  parentId: CBC_ACADEMY_NODE_ID,
  attributes: [
    { key: 'routeSegment', value: 'grade-3' },
    { key: 'gradeId', value: 'grade-3' },
    { key: 'gradeName', value: 'Grade 3' }
  ],
  features: [{ kind: 'guidedContent' }],
  actions: [{ intent: 'openChildren' }],
  appearances: [
    { key: 'icon', value: '🎒' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade4 = createLearningNode({
  id: 'grade-4',
  kind: LEARNING_NODE_KINDS.grade,
  label: 'Grade 4',
  summary: 'Grade 4 curriculum learning areas.',
  parentId: CBC_ACADEMY_NODE_ID,
  attributes: [
    { key: 'routeSegment', value: 'grade-4' },
    { key: 'gradeId', value: 'grade-4' },
    { key: 'gradeName', value: 'Grade 4' }
  ],
  features: [{ kind: 'guidedContent' }],
  actions: [{ intent: 'openChildren' }],
  appearances: [
    { key: 'icon', value: '🎒' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade5 = createLearningNode({
  id: 'grade-5',
  kind: LEARNING_NODE_KINDS.grade,
  label: 'Grade 5',
  summary: 'Grade 5 curriculum learning areas.',
  parentId: CBC_ACADEMY_NODE_ID,
  attributes: [
    { key: 'routeSegment', value: 'grade-5' },
    { key: 'gradeId', value: 'grade-5' },
    { key: 'gradeName', value: 'Grade 5' }
  ],
  features: [{ kind: 'guidedContent' }],
  actions: [{ intent: 'openChildren' }],
  appearances: [
    { key: 'icon', value: '🎒' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade6 = createLearningNode({
  id: 'grade-6',
  kind: LEARNING_NODE_KINDS.grade,
  label: 'Grade 6',
  summary: 'Grade 6 curriculum learning areas.',
  parentId: CBC_ACADEMY_NODE_ID,
  attributes: [
    { key: 'routeSegment', value: 'grade-6' },
    { key: 'gradeId', value: 'grade-6' },
    { key: 'gradeName', value: 'Grade 6' }
  ],
  features: [{ kind: 'guidedContent' }],
  actions: [{ intent: 'openChildren' }],
  appearances: [
    { key: 'icon', value: '🎒' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade7 = createLearningNode({
  id: 'grade-7',
  kind: LEARNING_NODE_KINDS.grade,
  label: 'Grade 7',
  summary: 'Grade 7 curriculum learning areas.',
  parentId: CBC_ACADEMY_NODE_ID,
  attributes: [
    { key: 'routeSegment', value: 'grade-7' },
    { key: 'gradeId', value: 'grade-7' },
    { key: 'gradeName', value: 'Grade 7' }
  ],
  features: [{ kind: 'guidedContent' }],
  actions: [{ intent: 'openChildren' }],
  appearances: [
    { key: 'icon', value: '🎒' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade8 = createLearningNode({
  id: 'grade-8',
  kind: LEARNING_NODE_KINDS.grade,
  label: 'Grade 8',
  summary: 'Grade 8 curriculum learning areas.',
  parentId: CBC_ACADEMY_NODE_ID,
  attributes: [
    { key: 'routeSegment', value: 'grade-8' },
    { key: 'gradeId', value: 'grade-8' },
    { key: 'gradeName', value: 'Grade 8' }
  ],
  features: [{ kind: 'guidedContent' }],
  actions: [{ intent: 'openChildren' }],
  appearances: [
    { key: 'icon', value: '🎒' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

// Learning areas for each grade
const pp1English = createLearningNode({
  id: 'pp1-english-activities',
  kind: LEARNING_NODE_KINDS.learningArea,
  label: 'English Activities',
  summary: 'English language learning for PP1.',
  parentId: pp1.id,
  attributes: [
    { key: 'routeSegment', value: 'english-activities' },
    { key: 'learningAreaId', value: 'english-activities' },
    { key: 'learningAreaName', value: 'English Activities' },
    { key: 'gradeId', value: 'pp1' },
    { key: 'gradeName', value: 'PP1' }
  ],
  features: [{ kind: 'guidedContent' }, { kind: 'readAloud' }],
  actions: [{ intent: 'openChildren' }],
  appearances: [
    { key: 'icon', value: '📚' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const pp1Math = createLearningNode({
  id: 'pp1-mathematical-activities',
  kind: LEARNING_NODE_KINDS.learningArea,
  label: 'Mathematical Activities',
  summary: 'Mathematics learning for PP1.',
  parentId: pp1.id,
  attributes: [
    { key: 'routeSegment', value: 'mathematical-activities' },
    { key: 'learningAreaId', value: 'mathematical-activities' },
    { key: 'learningAreaName', value: 'Mathematical Activities' },
    { key: 'gradeId', value: 'pp1' },
    { key: 'gradeName', value: 'PP1' }
  ],
  features: [{ kind: 'guidedContent' }],
  actions: [{ intent: 'openChildren' }],
  appearances: [
    { key: 'icon', value: '🔢' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const pp2English = createLearningNode({
  id: 'pp2-english-activities',
  kind: LEARNING_NODE_KINDS.learningArea,
  label: 'English Activities',
  summary: 'English language learning for PP2.',
  parentId: pp2.id,
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

const pp2Math = createLearningNode({
  id: 'pp2-mathematical-activities',
  kind: LEARNING_NODE_KINDS.learningArea,
  label: 'Mathematical Activities',
  summary: 'Mathematics learning for PP2.',
  parentId: pp2.id,
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

const grade1English = createLearningNode({
  id: 'grade-1-english-activities',
  kind: LEARNING_NODE_KINDS.learningArea,
  label: 'English Activities',
  summary: 'Grade 1 English Activities for listening, speaking, reading, and early writing.',
  parentId: grade1.id,
  attributes: [
    { key: 'routeSegment', value: 'english-activities' },
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

const grade1Kiswahili = createLearningNode({
  id: 'grade-1-kiswahili-activities',
  kind: LEARNING_NODE_KINDS.learningArea,
  label: 'Kiswahili Activities',
  summary: 'Grade 1 Kiswahili language learning.',
  parentId: grade1.id,
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

const grade1Math = createLearningNode({
  id: 'grade-1-mathematical-activities',
  kind: LEARNING_NODE_KINDS.learningArea,
  label: 'Mathematical Activities',
  summary: 'Grade 1 Mathematics for numbers, shapes, and basic operations.',
  parentId: grade1.id,
  attributes: [
    { key: 'routeSegment', value: 'mathematical-activities' },
    { key: 'learningAreaId', value: 'mathematical-activities' },
    { key: 'learningAreaName', value: 'Mathematical Activities' },
    { key: 'gradeId', value: 'grade-1' },
    { key: 'gradeName', value: 'Grade 1' }
  ],
  features: [{ kind: 'guidedContent' }, { kind: 'practice' }],
  actions: [],
  appearances: [
    { key: 'icon', value: '🔢' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade1Science = createLearningNode({
  id: 'grade-1-environmental-activities',
  kind: LEARNING_NODE_KINDS.learningArea,
  label: 'Environmental Activities',
  summary: 'Grade 1 Environmental Activities for science and social studies.',
  parentId: grade1.id,
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

const grade1Hygiene = createLearningNode({
  id: 'grade-1-hygiene-nutrition-activities',
  kind: LEARNING_NODE_KINDS.learningArea,
  label: 'Hygiene and Nutrition Activities',
  summary: 'Grade 1 Hygiene and Nutrition for healthy living.',
  parentId: grade1.id,
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

const grade1Movement = createLearningNode({
  id: 'grade-1-movement-creative-activities',
  kind: LEARNING_NODE_KINDS.learningArea,
  label: 'Movement and Creative Activities',
  summary: 'Grade 1 Movement and Creative Arts.',
  parentId: grade1.id,
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

const grade1Religious = createLearningNode({
  id: 'grade-1-religious-education-activities',
  kind: LEARNING_NODE_KINDS.learningArea,
  label: 'Religious Education Activities',
  summary: 'Grade 1 Religious Education.',
  parentId: grade1.id,
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

// English Activities - All 15 Themes (only Greetings is clickable)
const grade1EnglishThemeGreetings = createLearningNode({
  id: 'grade-1-english-activities-theme-greetings',
  kind: LEARNING_NODE_KINDS.theme,
  label: 'Greetings',
  summary: 'Learn how to greet people in different situations.',
  parentId: grade1English.id,
  attributes: [
    { key: 'routeSegment', value: 'greetings' },
    { key: 'themeId', value: 'greetings' },
    { key: 'themeName', value: 'Greetings' },
    { key: 'learningAreaId', value: 'english-activities' },
    { key: 'learningAreaName', value: 'English Activities' }
  ],
  features: [{ kind: 'guidedContent' }, { kind: 'readAloud' }],
  actions: [{ intent: 'openChildren' }],
  appearances: [
    { key: 'icon', value: '👋' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade1EnglishThemeSchool = createLearningNode({
  id: 'grade-1-english-activities-theme-school',
  kind: LEARNING_NODE_KINDS.theme,
  label: 'School',
  summary: 'Learn about school environment and activities.',
  parentId: grade1English.id,
  attributes: [
    { key: 'routeSegment', value: 'school' },
    { key: 'themeId', value: 'school' },
    { key: 'themeName', value: 'School' },
    { key: 'learningAreaId', value: 'english-activities' },
    { key: 'learningAreaName', value: 'English Activities' }
  ],
  features: [{ kind: 'guidedContent' }, { kind: 'readAloud' }],
  actions: [],
  appearances: [
    { key: 'icon', value: '🏫' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade1EnglishThemeFamily = createLearningNode({
  id: 'grade-1-english-activities-theme-family',
  kind: LEARNING_NODE_KINDS.theme,
  label: 'Family',
  summary: 'Learn about family members and relationships.',
  parentId: grade1English.id,
  attributes: [
    { key: 'routeSegment', value: 'family' },
    { key: 'themeId', value: 'family' },
    { key: 'themeName', value: 'Family' },
    { key: 'learningAreaId', value: 'english-activities' },
    { key: 'learningAreaName', value: 'English Activities' }
  ],
  features: [{ kind: 'guidedContent' }, { kind: 'readAloud' }],
  actions: [],
  appearances: [
    { key: 'icon', value: '👨‍👩‍👧‍👦' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade1EnglishThemeHome = createLearningNode({
  id: 'grade-1-english-activities-theme-home',
  kind: LEARNING_NODE_KINDS.theme,
  label: 'Home',
  summary: 'Learn about home and household items.',
  parentId: grade1English.id,
  attributes: [
    { key: 'routeSegment', value: 'home' },
    { key: 'themeId', value: 'home' },
    { key: 'themeName', value: 'Home' },
    { key: 'learningAreaId', value: 'english-activities' },
    { key: 'learningAreaName', value: 'English Activities' }
  ],
  features: [{ kind: 'guidedContent' }, { kind: 'readAloud' }],
  actions: [],
  appearances: [
    { key: 'icon', value: '🏠' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade1EnglishThemeTime = createLearningNode({
  id: 'grade-1-english-activities-theme-time',
  kind: LEARNING_NODE_KINDS.theme,
  label: 'Time',
  summary: 'Learn about time and daily routines.',
  parentId: grade1English.id,
  attributes: [
    { key: 'routeSegment', value: 'time' },
    { key: 'themeId', value: 'time' },
    { key: 'themeName', value: 'Time' },
    { key: 'learningAreaId', value: 'english-activities' },
    { key: 'learningAreaName', value: 'English Activities' }
  ],
  features: [{ kind: 'guidedContent' }, { kind: 'readAloud' }],
  actions: [],
  appearances: [
    { key: 'icon', value: '⏰' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade1EnglishThemeWeather = createLearningNode({
  id: 'grade-1-english-activities-theme-weather',
  kind: LEARNING_NODE_KINDS.theme,
  label: 'Weather and our Environment',
  summary: 'Learn about weather and our environment.',
  parentId: grade1English.id,
  attributes: [
    { key: 'routeSegment', value: 'weather-environment' },
    { key: 'themeId', value: 'weather-environment' },
    { key: 'themeName', value: 'Weather and our Environment' },
    { key: 'learningAreaId', value: 'english-activities' },
    { key: 'learningAreaName', value: 'English Activities' }
  ],
  features: [{ kind: 'guidedContent' }, { kind: 'readAloud' }],
  actions: [],
  appearances: [
    { key: 'icon', value: '🌤️' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade1EnglishThemeHygiene = createLearningNode({
  id: 'grade-1-english-activities-theme-hygiene',
  kind: LEARNING_NODE_KINDS.theme,
  label: 'Hygiene',
  summary: 'Learn about personal hygiene and cleanliness.',
  parentId: grade1English.id,
  attributes: [
    { key: 'routeSegment', value: 'hygiene' },
    { key: 'themeId', value: 'hygiene' },
    { key: 'themeName', value: 'Hygiene' },
    { key: 'learningAreaId', value: 'english-activities' },
    { key: 'learningAreaName', value: 'English Activities' }
  ],
  features: [{ kind: 'guidedContent' }, { kind: 'readAloud' }],
  actions: [],
  appearances: [
    { key: 'icon', value: '🧼' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade1EnglishThemeBodyParts = createLearningNode({
  id: 'grade-1-english-activities-theme-body-parts',
  kind: LEARNING_NODE_KINDS.theme,
  label: 'Parts of the Body',
  summary: 'Learn about different parts of the body.',
  parentId: grade1English.id,
  attributes: [
    { key: 'routeSegment', value: 'body-parts' },
    { key: 'themeId', value: 'body-parts' },
    { key: 'themeName', value: 'Parts of the Body' },
    { key: 'learningAreaId', value: 'english-activities' },
    { key: 'learningAreaName', value: 'English Activities' }
  ],
  features: [{ kind: 'guidedContent' }, { kind: 'readAloud' }],
  actions: [],
  appearances: [
    { key: 'icon', value: '🧍' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade1EnglishThemeFriends = createLearningNode({
  id: 'grade-1-english-activities-theme-friends',
  kind: LEARNING_NODE_KINDS.theme,
  label: 'My Friends',
  summary: 'Learn about friendship and social skills.',
  parentId: grade1English.id,
  attributes: [
    { key: 'routeSegment', value: 'friends' },
    { key: 'themeId', value: 'friends' },
    { key: 'themeName', value: 'My Friends' },
    { key: 'learningAreaId', value: 'english-activities' },
    { key: 'learningAreaName', value: 'English Activities' }
  ],
  features: [{ kind: 'guidedContent' }, { kind: 'readAloud' }],
  actions: [],
  appearances: [
    { key: 'icon', value: '👫' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade1EnglishThemeSafety = createLearningNode({
  id: 'grade-1-english-activities-theme-safety',
  kind: LEARNING_NODE_KINDS.theme,
  label: 'Safety',
  summary: 'Learn about personal safety and rules.',
  parentId: grade1English.id,
  attributes: [
    { key: 'routeSegment', value: 'safety' },
    { key: 'themeId', value: 'safety' },
    { key: 'themeName', value: 'Safety' },
    { key: 'learningAreaId', value: 'english-activities' },
    { key: 'learningAreaName', value: 'English Activities' }
  ],
  features: [{ kind: 'guidedContent' }, { kind: 'readAloud' }],
  actions: [],
  appearances: [
    { key: 'icon', value: '🛡️' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade1EnglishThemeCommunityLeaders = createLearningNode({
  id: 'grade-1-english-activities-theme-community-leaders',
  kind: LEARNING_NODE_KINDS.theme,
  label: 'Community Leaders',
  summary: 'Learn about leaders in our community.',
  parentId: grade1English.id,
  attributes: [
    { key: 'routeSegment', value: 'community-leaders' },
    { key: 'themeId', value: 'community-leaders' },
    { key: 'themeName', value: 'Community Leaders' },
    { key: 'learningAreaId', value: 'english-activities' },
    { key: 'learningAreaName', value: 'English Activities' }
  ],
  features: [{ kind: 'guidedContent' }, { kind: 'readAloud' }],
  actions: [],
  appearances: [
    { key: 'icon', value: '👔' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade1EnglishThemeLivingTogether = createLearningNode({
  id: 'grade-1-english-activities-theme-living-together',
  kind: LEARNING_NODE_KINDS.theme,
  label: 'Living Together',
  summary: 'Learn about living together in harmony.',
  parentId: grade1English.id,
  attributes: [
    { key: 'routeSegment', value: 'living-together' },
    { key: 'themeId', value: 'living-together' },
    { key: 'themeName', value: 'Living Together' },
    { key: 'learningAreaId', value: 'english-activities' },
    { key: 'learningAreaName', value: 'English Activities' }
  ],
  features: [{ kind: 'guidedContent' }, { kind: 'readAloud' }],
  actions: [],
  appearances: [
    { key: 'icon', value: '🤝' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade1EnglishThemeTechnology = createLearningNode({
  id: 'grade-1-english-activities-theme-technology',
  kind: LEARNING_NODE_KINDS.theme,
  label: 'Technology',
  summary: 'Learn about technology in our lives.',
  parentId: grade1English.id,
  attributes: [
    { key: 'routeSegment', value: 'technology' },
    { key: 'themeId', value: 'technology' },
    { key: 'themeName', value: 'Technology' },
    { key: 'learningAreaId', value: 'english-activities' },
    { key: 'learningAreaName', value: 'English Activities' }
  ],
  features: [{ kind: 'guidedContent' }, { kind: 'readAloud' }],
  actions: [],
  appearances: [
    { key: 'icon', value: '💻' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade1EnglishThemeNumbers = createLearningNode({
  id: 'grade-1-english-activities-theme-numbers',
  kind: LEARNING_NODE_KINDS.theme,
  label: 'Numbers',
  summary: 'Learn about numbers and counting.',
  parentId: grade1English.id,
  attributes: [
    { key: 'routeSegment', value: 'numbers' },
    { key: 'themeId', value: 'numbers' },
    { key: 'themeName', value: 'Numbers' },
    { key: 'learningAreaId', value: 'english-activities' },
    { key: 'learningAreaName', value: 'English Activities' }
  ],
  features: [{ kind: 'guidedContent' }, { kind: 'readAloud' }],
  actions: [],
  appearances: [
    { key: 'icon', value: '🔢' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade1EnglishThemeConservingResources = createLearningNode({
  id: 'grade-1-english-activities-theme-conserving-resources',
  kind: LEARNING_NODE_KINDS.theme,
  label: 'Conserving Resources',
  summary: 'Learn about conserving our resources.',
  parentId: grade1English.id,
  attributes: [
    { key: 'routeSegment', value: 'conserving-resources' },
    { key: 'themeId', value: 'conserving-resources' },
    { key: 'themeName', value: 'Conserving Resources' },
    { key: 'learningAreaId', value: 'english-activities' },
    { key: 'learningAreaName', value: 'English Activities' }
  ],
  features: [{ kind: 'guidedContent' }, { kind: 'readAloud' }],
  actions: [],
  appearances: [
    { key: 'icon', value: '♻️' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade1EnglishStrandListeningSpeaking = createLearningNode({
  id: 'grade-1-english-activities-greetings-listening-speaking',
  kind: LEARNING_NODE_KINDS.strand,
  label: 'Listening and Speaking',
  summary: 'Listen carefully, answer simple questions, and speak clearly.',
  parentId: grade1EnglishThemeGreetings.id,
  attributes: [
    { key: 'routeSegment', value: 'listening-speaking' },
    { key: 'strandId', value: 'listening-speaking' },
    { key: 'strandName', value: 'Listening and Speaking' },
    { key: 'themeId', value: 'greetings' },
    { key: 'themeName', value: 'Greetings' }
  ],
  features: [{ kind: 'readAloud' }, { kind: 'guidedContent' }],
  actions: [{ intent: 'openChildren' }],
  appearances: [
    { key: 'icon', value: '👂' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade1EnglishSubStrandPronunciation = createLearningNode({
  id: 'grade-1-english-activities-greetings-pronunciation-vocabulary',
  kind: LEARNING_NODE_KINDS.subStrand,
  label: 'Pronunciation and Vocabulary',
  summary: 'Learn correct pronunciation and new words for greetings.',
  parentId: grade1EnglishStrandListeningSpeaking.id,
  attributes: [
    { key: 'routeSegment', value: 'pronunciation-vocabulary' },
    { key: 'subStrandId', value: 'pronunciation-vocabulary' },
    { key: 'subStrandName', value: 'Pronunciation and Vocabulary' },
    { key: 'strandId', value: 'listening-speaking' },
    { key: 'strandName', value: 'Listening and Speaking' }
  ],
  features: [{ kind: 'readAloud' }, { kind: 'practice' }],
  actions: [{ intent: 'openChildren' }],
  appearances: [
    { key: 'icon', value: '🗣️' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade1EnglishNotesPronunciation = createLearningNode({
  id: 'grade-1-english-activities-greetings-pronunciation-notes',
  kind: LEARNING_NODE_KINDS.notes,
  label: 'Pronunciation Notes',
  summary: 'Learn how to pronounce common greetings correctly.',
  parentId: grade1EnglishSubStrandPronunciation.id,
  attributes: [
    { key: 'routeSegment', value: 'pronunciation-notes' },
    { key: 'contentType', value: 'notes' },
    { key: 'subStrandId', value: 'pronunciation-vocabulary' },
    { key: 'subStrandName', value: 'Pronunciation and Vocabulary' }
  ],
  features: [{ kind: 'readAloud' }, { kind: 'guidedContent' }],
  actions: [{ intent: 'startPractice' }],
  appearances: [
    { key: 'icon', value: '📒' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade1EnglishPracticePronunciation = createLearningNode({
  id: 'grade-1-english-activities-greetings-pronunciation-practice',
  kind: LEARNING_NODE_KINDS.practice,
  label: 'Pronunciation Practice',
  summary: 'Practice pronouncing greeting words: Hello, Good morning, Good afternoon, Good evening, Good night. Say each greeting clearly and practice with your friends!',
  parentId: grade1EnglishSubStrandPronunciation.id,
  attributes: [
    { key: 'routeSegment', value: 'pronunciation-practice' },
    { key: 'contentType', value: 'practice' },
    { key: 'subStrandId', value: 'pronunciation-vocabulary' },
    { key: 'subStrandName', value: 'Pronunciation and Vocabulary' }
  ],
  features: [{ kind: 'practice' }, { kind: 'readAloud' }],
  actions: [{ intent: 'startPractice' }],
  appearances: [
    { key: 'icon', value: '✏️' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade1EnglishRevisionPronunciation = createLearningNode({
  id: 'grade-1-english-activities-greetings-pronunciation-revision',
  kind: LEARNING_NODE_KINDS.revision,
  label: 'Pronunciation Revision',
  summary: 'Review and reinforce pronunciation skills.',
  parentId: grade1EnglishSubStrandPronunciation.id,
  attributes: [
    { key: 'routeSegment', value: 'pronunciation-revision' },
    { key: 'contentType', value: 'revision' },
    { key: 'subStrandId', value: 'pronunciation-vocabulary' },
    { key: 'subStrandName', value: 'Pronunciation and Vocabulary' }
  ],
  features: [{ kind: 'revision' }, { kind: 'practice' }],
  actions: [{ intent: 'startPractice' }],
  appearances: [
    { key: 'icon', value: '🔄' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade1EnglishAssessmentPronunciation = createLearningNode({
  id: 'grade-1-english-activities-greetings-pronunciation-assessment',
  kind: LEARNING_NODE_KINDS.assessment,
  label: 'Pronunciation Assessment',
  summary: 'Test your pronunciation skills.',
  parentId: grade1EnglishSubStrandPronunciation.id,
  attributes: [
    { key: 'routeSegment', value: 'pronunciation-assessment' },
    { key: 'contentType', value: 'assessment' },
    { key: 'subStrandId', value: 'pronunciation-vocabulary' },
    { key: 'subStrandName', value: 'Pronunciation and Vocabulary' }
  ],
  features: [{ kind: 'assessment' }, { kind: 'timed' }],
  actions: [{ intent: 'takeAssessment' }],
  appearances: [
    { key: 'icon', value: '✅' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade2English = createLearningNode({
  id: 'grade-2-english-activities',
  kind: LEARNING_NODE_KINDS.learningArea,
  label: 'English Activities',
  summary: 'Grade 2 English Activities.',
  parentId: grade2.id,
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

const grade2Math = createLearningNode({
  id: 'grade-2-mathematical-activities',
  kind: LEARNING_NODE_KINDS.learningArea,
  label: 'Mathematical Activities',
  summary: 'Grade 2 Mathematics.',
  parentId: grade2.id,
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

const grade3English = createLearningNode({
  id: 'grade-3-english-activities',
  kind: LEARNING_NODE_KINDS.learningArea,
  label: 'English Activities',
  summary: 'Grade 3 English Activities.',
  parentId: grade3.id,
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

const grade3Math = createLearningNode({
  id: 'grade-3-mathematical-activities',
  kind: LEARNING_NODE_KINDS.learningArea,
  label: 'Mathematical Activities',
  summary: 'Grade 3 Mathematics.',
  parentId: grade3.id,
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

const grade4English = createLearningNode({
  id: 'grade-4-english-activities',
  kind: LEARNING_NODE_KINDS.learningArea,
  label: 'English Activities',
  summary: 'Grade 4 English Activities.',
  parentId: grade4.id,
  attributes: [
    { key: 'routeSegment', value: 'english-activities' },
    { key: 'learningAreaId', value: 'english-activities' },
    { key: 'learningAreaName', value: 'English Activities' },
    { key: 'gradeId', value: 'grade-4' },
    { key: 'gradeName', value: 'Grade 4' }
  ],
  features: [{ kind: 'guidedContent' }, { kind: 'readAloud' }],
  actions: [{ intent: 'openChildren' }],
  appearances: [
    { key: 'icon', value: '📚' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade4Math = createLearningNode({
  id: 'grade-4-mathematical-activities',
  kind: LEARNING_NODE_KINDS.learningArea,
  label: 'Mathematical Activities',
  summary: 'Grade 4 Mathematics.',
  parentId: grade4.id,
  attributes: [
    { key: 'routeSegment', value: 'mathematical-activities' },
    { key: 'learningAreaId', value: 'mathematical-activities' },
    { key: 'learningAreaName', value: 'Mathematical Activities' },
    { key: 'gradeId', value: 'grade-4' },
    { key: 'gradeName', value: 'Grade 4' }
  ],
  features: [{ kind: 'guidedContent' }],
  actions: [{ intent: 'openChildren' }],
  appearances: [
    { key: 'icon', value: '🔢' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade5English = createLearningNode({
  id: 'grade-5-english-activities',
  kind: LEARNING_NODE_KINDS.learningArea,
  label: 'English Activities',
  summary: 'Grade 5 English Activities.',
  parentId: grade5.id,
  attributes: [
    { key: 'routeSegment', value: 'english-activities' },
    { key: 'learningAreaId', value: 'english-activities' },
    { key: 'learningAreaName', value: 'English Activities' },
    { key: 'gradeId', value: 'grade-5' },
    { key: 'gradeName', value: 'Grade 5' }
  ],
  features: [{ kind: 'guidedContent' }, { kind: 'readAloud' }],
  actions: [{ intent: 'openChildren' }],
  appearances: [
    { key: 'icon', value: '📚' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade5Math = createLearningNode({
  id: 'grade-5-mathematical-activities',
  kind: LEARNING_NODE_KINDS.learningArea,
  label: 'Mathematical Activities',
  summary: 'Grade 5 Mathematics.',
  parentId: grade5.id,
  attributes: [
    { key: 'routeSegment', value: 'mathematical-activities' },
    { key: 'learningAreaId', value: 'mathematical-activities' },
    { key: 'learningAreaName', value: 'Mathematical Activities' },
    { key: 'gradeId', value: 'grade-5' },
    { key: 'gradeName', value: 'Grade 5' }
  ],
  features: [{ kind: 'guidedContent' }],
  actions: [{ intent: 'openChildren' }],
  appearances: [
    { key: 'icon', value: '🔢' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade6English = createLearningNode({
  id: 'grade-6-english-activities',
  kind: LEARNING_NODE_KINDS.learningArea,
  label: 'English Activities',
  summary: 'Grade 6 English Activities.',
  parentId: grade6.id,
  attributes: [
    { key: 'routeSegment', value: 'english-activities' },
    { key: 'learningAreaId', value: 'english-activities' },
    { key: 'learningAreaName', value: 'English Activities' },
    { key: 'gradeId', value: 'grade-6' },
    { key: 'gradeName', value: 'Grade 6' }
  ],
  features: [{ kind: 'guidedContent' }, { kind: 'readAloud' }],
  actions: [{ intent: 'openChildren' }],
  appearances: [
    { key: 'icon', value: '📚' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade6Math = createLearningNode({
  id: 'grade-6-mathematical-activities',
  kind: LEARNING_NODE_KINDS.learningArea,
  label: 'Mathematical Activities',
  summary: 'Grade 6 Mathematics.',
  parentId: grade6.id,
  attributes: [
    { key: 'routeSegment', value: 'mathematical-activities' },
    { key: 'learningAreaId', value: 'mathematical-activities' },
    { key: 'learningAreaName', value: 'Mathematical Activities' },
    { key: 'gradeId', value: 'grade-6' },
    { key: 'gradeName', value: 'Grade 6' }
  ],
  features: [{ kind: 'guidedContent' }],
  actions: [{ intent: 'openChildren' }],
  appearances: [
    { key: 'icon', value: '🔢' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade7English = createLearningNode({
  id: 'grade-7-english-activities',
  kind: LEARNING_NODE_KINDS.learningArea,
  label: 'English Activities',
  summary: 'Grade 7 English Activities.',
  parentId: grade7.id,
  attributes: [
    { key: 'routeSegment', value: 'english-activities' },
    { key: 'learningAreaId', value: 'english-activities' },
    { key: 'learningAreaName', value: 'English Activities' },
    { key: 'gradeId', value: 'grade-7' },
    { key: 'gradeName', value: 'Grade 7' }
  ],
  features: [{ kind: 'guidedContent' }, { kind: 'readAloud' }],
  actions: [{ intent: 'openChildren' }],
  appearances: [
    { key: 'icon', value: '📚' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade7Math = createLearningNode({
  id: 'grade-7-mathematical-activities',
  kind: LEARNING_NODE_KINDS.learningArea,
  label: 'Mathematical Activities',
  summary: 'Grade 7 Mathematics.',
  parentId: grade7.id,
  attributes: [
    { key: 'routeSegment', value: 'mathematical-activities' },
    { key: 'learningAreaId', value: 'mathematical-activities' },
    { key: 'learningAreaName', value: 'Mathematical Activities' },
    { key: 'gradeId', value: 'grade-7' },
    { key: 'gradeName', value: 'Grade 7' }
  ],
  features: [{ kind: 'guidedContent' }],
  actions: [{ intent: 'openChildren' }],
  appearances: [
    { key: 'icon', value: '🔢' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade8English = createLearningNode({
  id: 'grade-8-english-activities',
  kind: LEARNING_NODE_KINDS.learningArea,
  label: 'English Activities',
  summary: 'Grade 8 English Activities.',
  parentId: grade8.id,
  attributes: [
    { key: 'routeSegment', value: 'english-activities' },
    { key: 'learningAreaId', value: 'english-activities' },
    { key: 'learningAreaName', value: 'English Activities' },
    { key: 'gradeId', value: 'grade-8' },
    { key: 'gradeName', value: 'Grade 8' }
  ],
  features: [{ kind: 'guidedContent' }, { kind: 'readAloud' }],
  actions: [{ intent: 'openChildren' }],
  appearances: [
    { key: 'icon', value: '📚' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade8Math = createLearningNode({
  id: 'grade-8-mathematical-activities',
  kind: LEARNING_NODE_KINDS.learningArea,
  label: 'Mathematical Activities',
  summary: 'Grade 8 Mathematics.',
  parentId: grade8.id,
  attributes: [
    { key: 'routeSegment', value: 'mathematical-activities' },
    { key: 'learningAreaId', value: 'mathematical-activities' },
    { key: 'learningAreaName', value: 'Mathematical Activities' },
    { key: 'gradeId', value: 'grade-8' },
    { key: 'gradeName', value: 'Grade 8' }
  ],
  features: [{ kind: 'guidedContent' }],
  actions: [{ intent: 'openChildren' }],
  appearances: [
    { key: 'icon', value: '🔢' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

export const cbcGradesNodes: LearningNode[] = [
  pp1,
  pp2,
  grade1,
  grade2,
  grade3,
  grade4,
  grade5,
  grade6,
  grade7,
  grade8,
  pp1English,
  pp1Math,
  pp2English,
  pp2Math,
  grade1English,
  grade1Kiswahili,
  grade1Math,
  grade1Science,
  grade1Hygiene,
  grade1Movement,
  grade1Religious,
  grade2English,
  grade2Math,
  grade3English,
  grade3Math,
  grade4English,
  grade4Math,
  grade5English,
  grade5Math,
  grade6English,
  grade6Math,
  grade7English,
  grade7Math,
  grade8English,
  grade8Math,
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
  grade1EnglishThemeConservingResources,
  grade1EnglishStrandListeningSpeaking,
  grade1EnglishSubStrandPronunciation,
  grade1EnglishNotesPronunciation,
  grade1EnglishPracticePronunciation,
  grade1EnglishRevisionPronunciation,
  grade1EnglishAssessmentPronunciation
];

export function createCbcGradesRegistrySource() {
  return {
    id: 'cbc-grades',
    layer: 'cbc-grades',
    nodes: cbcGradesNodes
  };
}

export function getCbcGradesNodes(): LearningNode[] {
  return cbcGradesNodes.map((node) => createLearningNode(node));
}