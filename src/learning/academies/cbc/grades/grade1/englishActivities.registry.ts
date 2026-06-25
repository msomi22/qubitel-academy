import type { LearningNode } from '../../../../core/index.ts';
import { createLearningNode } from '../../../../core/index.ts';
import { LEARNING_NODE_KINDS } from '../../../../core/learningNode.constants.ts';
import { grade1EnglishGreetingsNodes } from './english-activities/themes/greetings/greetings.registry.ts';
import { grade1EnglishNumbersNodes } from './english-activities/themes/numbers/numbers.registry.ts';
import { grade1EnglishSchoolNodes } from './english-activities/themes/school/school.registry.ts';

const grade1EnglishThemeFamily = createLearningNode({
  id: 'grade-1-english-activities-theme-family',
  kind: LEARNING_NODE_KINDS.theme,
  label: 'Family',
  summary: 'Learn about family members and relationships.',
  parentId: 'grade-1-english-activities',
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
  parentId: 'grade-1-english-activities',
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
  parentId: 'grade-1-english-activities',
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
  parentId: 'grade-1-english-activities',
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
  parentId: 'grade-1-english-activities',
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
  parentId: 'grade-1-english-activities',
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
  parentId: 'grade-1-english-activities',
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
  parentId: 'grade-1-english-activities',
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
  parentId: 'grade-1-english-activities',
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
  parentId: 'grade-1-english-activities',
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
  parentId: 'grade-1-english-activities',
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

const grade1EnglishThemeConservingResources = createLearningNode({
  id: 'grade-1-english-activities-theme-conserving-resources',
  kind: LEARNING_NODE_KINDS.theme,
  label: 'Conserving Resources',
  summary: 'Learn about conserving our resources.',
  parentId: 'grade-1-english-activities',
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

export const grade1EnglishActivitiesNodes: LearningNode[] = [
  ...grade1EnglishGreetingsNodes,
  ...grade1EnglishSchoolNodes,
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
  ...grade1EnglishNumbersNodes,
  grade1EnglishThemeConservingResources
];