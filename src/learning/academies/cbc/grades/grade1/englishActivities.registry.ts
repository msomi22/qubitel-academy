import type { LearningNode } from '../../../../core/index.ts';
import { createLearningNode } from '../../../../core/index.ts';
import { LEARNING_NODE_KINDS } from '../../../../core/learningNode.constants.ts';

const grade1EnglishThemeGreetings = createLearningNode({
  id: 'grade-1-english-activities-theme-greetings',
  kind: LEARNING_NODE_KINDS.theme,
  label: 'Greetings',
  summary: 'Learn how to greet people in different situations.',
  parentId: 'grade-1-english-activities',
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
  parentId: 'grade-1-english-activities',
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

const grade1EnglishThemeNumbers = createLearningNode({
  id: 'grade-1-english-activities-theme-numbers',
  kind: LEARNING_NODE_KINDS.theme,
  label: 'Numbers',
  summary: 'Learn about numbers and counting.',
  parentId: 'grade-1-english-activities',
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

export const grade1EnglishActivitiesNodes: LearningNode[] = [
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