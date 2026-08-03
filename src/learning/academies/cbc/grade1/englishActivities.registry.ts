import type { LearningNode } from '../../../core/index.ts';
import { createLearningNode } from '../../../core/index.ts';
import { LEARNING_NODE_KINDS } from '../../../core/learningNode.constants.ts';

export const GRADE_1_ENGLISH_ACTIVITIES_NODE_ID = 'grade-1-english-activities';
export const GRADE_1_NODE_ID = 'grade-1';
export const CBC_ACADEMY_NODE_ID = 'cbc-academy';

const themeGreetings = createLearningNode({
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

const strandGreetingsListeningSpeaking = createLearningNode({
  id: 'grade-1-english-activities-greetings-listening-speaking',
  kind: LEARNING_NODE_KINDS.strand,
  label: 'Listening and Speaking',
  summary: 'Listen carefully, answer simple questions, and speak clearly.',
  parentId: themeGreetings.id,
  attributes: [
    { key: 'routeSegment', value: 'listening-speaking' },
    { key: 'themeId', value: themeGreetings.id },
    { key: 'themeName', value: 'Greetings' }
  ],
  features: [
    { kind: 'readAloud' },
    { kind: 'guidedContent' }
  ],
  actions: [
    { intent: 'openChildren' }
  ],
  appearances: [
    { key: 'icon', value: '👂' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const subStrandGreetingsPronunciationVocabulary = createLearningNode({
  id: 'grade-1-english-activities-greetings-pronunciation-vocabulary',
  kind: LEARNING_NODE_KINDS.subStrand,
  label: 'Pronunciation and Vocabulary',
  summary: 'Learn correct pronunciation and new words for greetings.',
  parentId: strandGreetingsListeningSpeaking.id,
  attributes: [
    { key: 'routeSegment', value: 'pronunciation-vocabulary' },
    { key: 'strandId', value: strandGreetingsListeningSpeaking.id },
    { key: 'strandName', value: 'Listening and Speaking' }
  ],
  features: [
    { kind: 'readAloud' },
    { kind: 'practice' }
  ],
  actions: [
    { intent: 'openChildren' }
  ],
  appearances: [
    { key: 'icon', value: '🗣️' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const notesGreetingsPronunciation = createLearningNode({
  id: 'grade-1-english-activities-greetings-pronunciation-notes',
  kind: LEARNING_NODE_KINDS.notes,
  label: 'Greetings Pronunciation Notes',
  summary: 'Learn how to pronounce common greetings correctly.',
  parentId: subStrandGreetingsPronunciationVocabulary.id,
  attributes: [
    { key: 'routeSegment', value: 'pronunciation-notes' },
    { key: 'subStrandId', value: subStrandGreetingsPronunciationVocabulary.id },
    { key: 'subStrandName', value: 'Pronunciation and Vocabulary' },
    { key: 'contentType', value: 'notes' }
  ],
  features: [
    { kind: 'readAloud' },
    { kind: 'guidedContent' }
  ],
  actions: [
    { intent: 'resume' }
  ],
  appearances: [
    { key: 'icon', value: '📖' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const practiceGreetingsPronunciation = createLearningNode({
  id: 'grade-1-english-activities-greetings-pronunciation-practice',
  kind: LEARNING_NODE_KINDS.practice,
  label: 'Greetings Pronunciation Practice',
  summary: 'Practice pronouncing common greetings.',
  parentId: subStrandGreetingsPronunciationVocabulary.id,
  attributes: [
    { key: 'routeSegment', value: 'pronunciation-practice' },
    { key: 'subStrandId', value: subStrandGreetingsPronunciationVocabulary.id },
    { key: 'subStrandName', value: 'Pronunciation and Vocabulary' },
    { key: 'contentType', value: 'practice' }
  ],
  features: [
    { kind: 'practice' },
    { kind: 'readAloud' }
  ],
  actions: [
    { intent: 'startPractice' }
  ],
  appearances: [
    { key: 'icon', value: '✏️' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const revisionGreetingsPronunciation = createLearningNode({
  id: 'grade-1-english-activities-greetings-pronunciation-revision',
  kind: LEARNING_NODE_KINDS.revision,
  label: 'Greetings Pronunciation Revision',
  summary: 'Review and revise greetings pronunciation.',
  parentId: subStrandGreetingsPronunciationVocabulary.id,
  attributes: [
    { key: 'routeSegment', value: 'pronunciation-revision' },
    { key: 'subStrandId', value: subStrandGreetingsPronunciationVocabulary.id },
    { key: 'subStrandName', value: 'Pronunciation and Vocabulary' },
    { key: 'contentType', value: 'revision' }
  ],
  features: [
    { kind: 'practice' },
    { kind: 'assessment' }
  ],
  actions: [
    { intent: 'startPractice' }
  ],
  appearances: [
    { key: 'icon', value: '🔄' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const assessmentGreetingsPronunciation = createLearningNode({
  id: 'grade-1-english-activities-greetings-pronunciation-assessment',
  kind: LEARNING_NODE_KINDS.assessment,
  label: 'Greetings Pronunciation Assessment',
  summary: 'Test your knowledge of greetings pronunciation.',
  parentId: subStrandGreetingsPronunciationVocabulary.id,
  attributes: [
    { key: 'routeSegment', value: 'pronunciation-assessment' },
    { key: 'subStrandId', value: subStrandGreetingsPronunciationVocabulary.id },
    { key: 'subStrandName', value: 'Pronunciation and Vocabulary' },
    { key: 'contentType', value: 'assessment' },
    { key: 'assessmentType', value: 'formative' }
  ],
  features: [
    { kind: 'assessment' }
  ],
  actions: [
    { intent: 'takeAssessment' }
  ],
  appearances: [
    { key: 'icon', value: '✅' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const themeSchool = createLearningNode({
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

const strandSchoolListeningSpeaking = createLearningNode({
  id: 'grade-1-english-activities-school-listening-speaking',
  kind: LEARNING_NODE_KINDS.strand,
  label: 'Listening and Speaking',
  summary: 'Listen and speak about school activities.',
  parentId: themeSchool.id,
  attributes: [
    { key: 'routeSegment', value: 'listening-speaking' },
    { key: 'themeId', value: themeSchool.id },
    { key: 'themeName', value: 'School' }
  ],
  features: [
    { kind: 'readAloud' },
    { kind: 'guidedContent' }
  ],
  actions: [
    { intent: 'openChildren' }
  ],
  appearances: [
    { key: 'icon', value: '👂' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const subStrandSchoolVocabulary = createLearningNode({
  id: 'grade-1-english-activities-school-vocabulary',
  kind: LEARNING_NODE_KINDS.subStrand,
  label: 'School Vocabulary',
  summary: 'Learn words related to school.',
  parentId: strandSchoolListeningSpeaking.id,
  attributes: [
    { key: 'routeSegment', value: 'vocabulary' },
    { key: 'strandId', value: strandSchoolListeningSpeaking.id },
    { key: 'strandName', value: 'Listening and Speaking' }
  ],
  features: [
    { kind: 'readAloud' },
    { kind: 'practice' }
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

const notesSchoolVocabulary = createLearningNode({
  id: 'grade-1-english-activities-school-vocabulary-notes',
  kind: LEARNING_NODE_KINDS.notes,
  label: 'School Vocabulary Notes',
  summary: 'Learn school-related vocabulary words.',
  parentId: subStrandSchoolVocabulary.id,
  attributes: [
    { key: 'routeSegment', value: 'vocabulary-notes' },
    { key: 'subStrandId', value: subStrandSchoolVocabulary.id },
    { key: 'subStrandName', value: 'School Vocabulary' },
    { key: 'contentType', value: 'notes' }
  ],
  features: [
    { kind: 'readAloud' },
    { kind: 'guidedContent' }
  ],
  actions: [
    { intent: 'resume' }
  ],
  appearances: [
    { key: 'icon', value: '📖' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const practiceSchoolVocabulary = createLearningNode({
  id: 'grade-1-english-activities-school-vocabulary-practice',
  kind: LEARNING_NODE_KINDS.practice,
  label: 'School Vocabulary Practice',
  summary: 'Practice using school vocabulary words.',
  parentId: subStrandSchoolVocabulary.id,
  attributes: [
    { key: 'routeSegment', value: 'vocabulary-practice' },
    { key: 'subStrandId', value: subStrandSchoolVocabulary.id },
    { key: 'subStrandName', value: 'School Vocabulary' },
    { key: 'contentType', value: 'practice' }
  ],
  features: [
    { kind: 'practice' },
    { kind: 'readAloud' }
  ],
  actions: [
    { intent: 'startPractice' }
  ],
  appearances: [
    { key: 'icon', value: '✏️' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const themeFamily = createLearningNode({
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

const strandFamilyListeningSpeaking = createLearningNode({
  id: 'grade-1-english-activities-family-listening-speaking',
  kind: LEARNING_NODE_KINDS.strand,
  label: 'Listening and Speaking',
  summary: 'Listen and speak about family members.',
  parentId: themeFamily.id,
  attributes: [
    { key: 'routeSegment', value: 'listening-speaking' },
    { key: 'themeId', value: themeFamily.id },
    { key: 'themeName', value: 'Family' }
  ],
  features: [
    { kind: 'readAloud' },
    { kind: 'guidedContent' }
  ],
  actions: [
    { intent: 'openChildren' }
  ],
  appearances: [
    { key: 'icon', value: '👂' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const subStrandFamilyVocabulary = createLearningNode({
  id: 'grade-1-english-activities-family-vocabulary',
  kind: LEARNING_NODE_KINDS.subStrand,
  label: 'Family Vocabulary',
  summary: 'Learn words for family members.',
  parentId: strandFamilyListeningSpeaking.id,
  attributes: [
    { key: 'routeSegment', value: 'vocabulary' },
    { key: 'strandId', value: strandFamilyListeningSpeaking.id },
    { key: 'strandName', value: 'Listening and Speaking' }
  ],
  features: [
    { kind: 'readAloud' },
    { kind: 'practice' }
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

const notesFamilyVocabulary = createLearningNode({
  id: 'grade-1-english-activities-family-vocabulary-notes',
  kind: LEARNING_NODE_KINDS.notes,
  label: 'Family Vocabulary Notes',
  summary: 'Learn family member vocabulary words.',
  parentId: subStrandFamilyVocabulary.id,
  attributes: [
    { key: 'routeSegment', value: 'vocabulary-notes' },
    { key: 'subStrandId', value: subStrandFamilyVocabulary.id },
    { key: 'subStrandName', value: 'Family Vocabulary' },
    { key: 'contentType', value: 'notes' }
  ],
  features: [
    { kind: 'readAloud' },
    { kind: 'guidedContent' }
  ],
  actions: [
    { intent: 'resume' }
  ],
  appearances: [
    { key: 'icon', value: '📖' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const practiceFamilyVocabulary = createLearningNode({
  id: 'grade-1-english-activities-family-vocabulary-practice',
  kind: LEARNING_NODE_KINDS.practice,
  label: 'Family Vocabulary Practice',
  summary: 'Practice using family vocabulary words.',
  parentId: subStrandFamilyVocabulary.id,
  attributes: [
    { key: 'routeSegment', value: 'vocabulary-practice' },
    { key: 'subStrandId', value: subStrandFamilyVocabulary.id },
    { key: 'subStrandName', value: 'Family Vocabulary' },
    { key: 'contentType', value: 'practice' }
  ],
  features: [
    { kind: 'practice' },
    { kind: 'readAloud' }
  ],
  actions: [
    { intent: 'startPractice' }
  ],
  appearances: [
    { key: 'icon', value: '✏️' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const themeHome = createLearningNode({
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

const strandHomeListeningSpeaking = createLearningNode({
  id: 'grade-1-english-activities-home-listening-speaking',
  kind: LEARNING_NODE_KINDS.strand,
  label: 'Listening and Speaking',
  summary: 'Listen and speak about home.',
  parentId: themeHome.id,
  attributes: [
    { key: 'routeSegment', value: 'listening-speaking' },
    { key: 'themeId', value: themeHome.id },
    { key: 'themeName', value: 'Home' }
  ],
  features: [
    { kind: 'readAloud' },
    { kind: 'guidedContent' }
  ],
  actions: [
    { intent: 'openChildren' }
  ],
  appearances: [
    { key: 'icon', value: '👂' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const subStrandHomeVocabulary = createLearningNode({
  id: 'grade-1-english-activities-home-vocabulary',
  kind: LEARNING_NODE_KINDS.subStrand,
  label: 'Home Vocabulary',
  summary: 'Learn words about home.',
  parentId: strandHomeListeningSpeaking.id,
  attributes: [
    { key: 'routeSegment', value: 'vocabulary' },
    { key: 'strandId', value: strandHomeListeningSpeaking.id },
    { key: 'strandName', value: 'Listening and Speaking' }
  ],
  features: [
    { kind: 'readAloud' },
    { kind: 'practice' }
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

const notesHomeVocabulary = createLearningNode({
  id: 'grade-1-english-activities-home-vocabulary-notes',
  kind: LEARNING_NODE_KINDS.notes,
  label: 'Home Vocabulary Notes',
  summary: 'Learn home-related vocabulary words.',
  parentId: subStrandHomeVocabulary.id,
  attributes: [
    { key: 'routeSegment', value: 'vocabulary-notes' },
    { key: 'subStrandId', value: subStrandHomeVocabulary.id },
    { key: 'subStrandName', value: 'Home Vocabulary' },
    { key: 'contentType', value: 'notes' }
  ],
  features: [
    { kind: 'readAloud' },
    { kind: 'guidedContent' }
  ],
  actions: [
    { intent: 'resume' }
  ],
  appearances: [
    { key: 'icon', value: '📖' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const practiceHomeVocabulary = createLearningNode({
  id: 'grade-1-english-activities-home-vocabulary-practice',
  kind: LEARNING_NODE_KINDS.practice,
  label: 'Home Vocabulary Practice',
  summary: 'Practice using home vocabulary words.',
  parentId: subStrandHomeVocabulary.id,
  attributes: [
    { key: 'routeSegment', value: 'vocabulary-practice' },
    { key: 'subStrandId', value: subStrandHomeVocabulary.id },
    { key: 'subStrandName', value: 'Home Vocabulary' },
    { key: 'contentType', value: 'practice' }
  ],
  features: [
    { kind: 'practice' },
    { kind: 'readAloud' }
  ],
  actions: [
    { intent: 'startPractice' }
  ],
  appearances: [
    { key: 'icon', value: '✏️' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const themeTime = createLearningNode({
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

const strandTimeListeningSpeaking = createLearningNode({
  id: 'grade-1-english-activities-time-listening-speaking',
  kind: LEARNING_NODE_KINDS.strand,
  label: 'Listening and Speaking',
  summary: 'Listen and speak about time.',
  parentId: themeTime.id,
  attributes: [
    { key: 'routeSegment', value: 'listening-speaking' },
    { key: 'themeId', value: themeTime.id },
    { key: 'themeName', value: 'Time' }
  ],
  features: [
    { kind: 'readAloud' },
    { kind: 'guidedContent' }
  ],
  actions: [
    { intent: 'openChildren' }
  ],
  appearances: [
    { key: 'icon', value: '👂' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const subStrandTimeVocabulary = createLearningNode({
  id: 'grade-1-english-activities-time-vocabulary',
  kind: LEARNING_NODE_KINDS.subStrand,
  label: 'Time Vocabulary',
  summary: 'Learn words about time.',
  parentId: strandTimeListeningSpeaking.id,
  attributes: [
    { key: 'routeSegment', value: 'vocabulary' },
    { key: 'strandId', value: strandTimeListeningSpeaking.id },
    { key: 'strandName', value: 'Listening and Speaking' }
  ],
  features: [
    { kind: 'readAloud' },
    { kind: 'practice' }
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

const notesTimeVocabulary = createLearningNode({
  id: 'grade-1-english-activities-time-vocabulary-notes',
  kind: LEARNING_NODE_KINDS.notes,
  label: 'Time Vocabulary Notes',
  summary: 'Learn time-related vocabulary words.',
  parentId: subStrandTimeVocabulary.id,
  attributes: [
    { key: 'routeSegment', value: 'vocabulary-notes' },
    { key: 'subStrandId', value: subStrandTimeVocabulary.id },
    { key: 'subStrandName', value: 'Time Vocabulary' },
    { key: 'contentType', value: 'notes' }
  ],
  features: [
    { kind: 'readAloud' },
    { kind: 'guidedContent' }
  ],
  actions: [
    { intent: 'resume' }
  ],
  appearances: [
    { key: 'icon', value: '📖' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const practiceTimeVocabulary = createLearningNode({
  id: 'grade-1-english-activities-time-vocabulary-practice',
  kind: LEARNING_NODE_KINDS.practice,
  label: 'Time Vocabulary Practice',
  summary: 'Practice using time vocabulary words.',
  parentId: subStrandTimeVocabulary.id,
  attributes: [
    { key: 'routeSegment', value: 'vocabulary-practice' },
    { key: 'subStrandId', value: subStrandTimeVocabulary.id },
    { key: 'subStrandName', value: 'Time Vocabulary' },
    { key: 'contentType', value: 'practice' }
  ],
  features: [
    { kind: 'practice' },
    { kind: 'readAloud' }
  ],
  actions: [
    { intent: 'startPractice' }
  ],
  appearances: [
    { key: 'icon', value: '✏️' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const themeWeatherEnvironment = createLearningNode({
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

const strandWeatherListeningSpeaking = createLearningNode({
  id: 'grade-1-english-activities-weather-listening-speaking',
  kind: LEARNING_NODE_KINDS.strand,
  label: 'Listening and Speaking',
  summary: 'Listen and speak about weather and environment.',
  parentId: themeWeatherEnvironment.id,
  attributes: [
    { key: 'routeSegment', value: 'listening-speaking' },
    { key: 'themeId', value: themeWeatherEnvironment.id },
    { key: 'themeName', value: 'Weather and our Environment' }
  ],
  features: [
    { kind: 'readAloud' },
    { kind: 'guidedContent' }
  ],
  actions: [
    { intent: 'openChildren' }
  ],
  appearances: [
    { key: 'icon', value: '👂' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const subStrandWeatherVocabulary = createLearningNode({
  id: 'grade-1-english-activities-weather-vocabulary',
  kind: LEARNING_NODE_KINDS.subStrand,
  label: 'Weather Vocabulary',
  summary: 'Learn words about weather and environment.',
  parentId: strandWeatherListeningSpeaking.id,
  attributes: [
    { key: 'routeSegment', value: 'vocabulary' },
    { key: 'strandId', value: strandWeatherListeningSpeaking.id },
    { key: 'strandName', value: 'Listening and Speaking' }
  ],
  features: [
    { kind: 'readAloud' },
    { kind: 'practice' }
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

const notesWeatherVocabulary = createLearningNode({
  id: 'grade-1-english-activities-weather-vocabulary-notes',
  kind: LEARNING_NODE_KINDS.notes,
  label: 'Weather Vocabulary Notes',
  summary: 'Learn weather and environment vocabulary words.',
  parentId: subStrandWeatherVocabulary.id,
  attributes: [
    { key: 'routeSegment', value: 'vocabulary-notes' },
    { key: 'subStrandId', value: subStrandWeatherVocabulary.id },
    { key: 'subStrandName', value: 'Weather Vocabulary' },
    { key: 'contentType', value: 'notes' }
  ],
  features: [
    { kind: 'readAloud' },
    { kind: 'guidedContent' }
  ],
  actions: [
    { intent: 'resume' }
  ],
  appearances: [
    { key: 'icon', value: '📖' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const practiceWeatherVocabulary = createLearningNode({
  id: 'grade-1-english-activities-weather-vocabulary-practice',
  kind: LEARNING_NODE_KINDS.practice,
  label: 'Weather Vocabulary Practice',
  summary: 'Practice using weather vocabulary words.',
  parentId: subStrandWeatherVocabulary.id,
  attributes: [
    { key: 'routeSegment', value: 'vocabulary-practice' },
    { key: 'subStrandId', value: subStrandWeatherVocabulary.id },
    { key: 'subStrandName', value: 'Weather Vocabulary' },
    { key: 'contentType', value: 'practice' }
  ],
  features: [
    { kind: 'practice' },
    { kind: 'readAloud' }
  ],
  actions: [
    { intent: 'startPractice' }
  ],
  appearances: [
    { key: 'icon', value: '✏️' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const themeHygiene = createLearningNode({
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

const strandHygieneListeningSpeaking = createLearningNode({
  id: 'grade-1-english-activities-hygiene-listening-speaking',
  kind: LEARNING_NODE_KINDS.strand,
  label: 'Listening and Speaking',
  summary: 'Listen and speak about hygiene.',
  parentId: themeHygiene.id,
  attributes: [
    { key: 'routeSegment', value: 'listening-speaking' },
    { key: 'themeId', value: themeHygiene.id },
    { key: 'themeName', value: 'Hygiene' }
  ],
  features: [
    { kind: 'readAloud' },
    { kind: 'guidedContent' }
  ],
  actions: [
    { intent: 'openChildren' }
  ],
  appearances: [
    { key: 'icon', value: '👂' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const subStrandHygieneVocabulary = createLearningNode({
  id: 'grade-1-english-activities-hygiene-vocabulary',
  kind: LEARNING_NODE_KINDS.subStrand,
  label: 'Hygiene Vocabulary',
  summary: 'Learn words about hygiene.',
  parentId: strandHygieneListeningSpeaking.id,
  attributes: [
    { key: 'routeSegment', value: 'vocabulary' },
    { key: 'strandId', value: strandHygieneListeningSpeaking.id },
    { key: 'strandName', value: 'Listening and Speaking' }
  ],
  features: [
    { kind: 'readAloud' },
    { kind: 'practice' }
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

const notesHygieneVocabulary = createLearningNode({
  id: 'grade-1-english-activities-hygiene-vocabulary-notes',
  kind: LEARNING_NODE_KINDS.notes,
  label: 'Hygiene Vocabulary Notes',
  summary: 'Learn hygiene-related vocabulary words.',
  parentId: subStrandHygieneVocabulary.id,
  attributes: [
    { key: 'routeSegment', value: 'vocabulary-notes' },
    { key: 'subStrandId', value: subStrandHygieneVocabulary.id },
    { key: 'subStrandName', value: 'Hygiene Vocabulary' },
    { key: 'contentType', value: 'notes' }
  ],
  features: [
    { kind: 'readAloud' },
    { kind: 'guidedContent' }
  ],
  actions: [
    { intent: 'resume' }
  ],
  appearances: [
    { key: 'icon', value: '📖' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const practiceHygieneVocabulary = createLearningNode({
  id: 'grade-1-english-activities-hygiene-vocabulary-practice',
  kind: LEARNING_NODE_KINDS.practice,
  label: 'Hygiene Vocabulary Practice',
  summary: 'Practice using hygiene vocabulary words.',
  parentId: subStrandHygieneVocabulary.id,
  attributes: [
    { key: 'routeSegment', value: 'vocabulary-practice' },
    { key: 'subStrandId', value: subStrandHygieneVocabulary.id },
    { key: 'subStrandName', value: 'Hygiene Vocabulary' },
    { key: 'contentType', value: 'practice' }
  ],
  features: [
    { kind: 'practice' },
    { kind: 'readAloud' }
  ],
  actions: [
    { intent: 'startPractice' }
  ],
  appearances: [
    { key: 'icon', value: '✏️' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const themePartsOfBody = createLearningNode({
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

const strandPartsOfBodyListeningSpeaking = createLearningNode({
  id: 'grade-1-english-activities-parts-of-body-listening-speaking',
  kind: LEARNING_NODE_KINDS.strand,
  label: 'Listening and Speaking',
  summary: 'Listen and speak about parts of the body.',
  parentId: themePartsOfBody.id,
  attributes: [
    { key: 'routeSegment', value: 'listening-speaking' },
    { key: 'themeId', value: themePartsOfBody.id },
    { key: 'themeName', value: 'Parts of the Body' }
  ],
  features: [
    { kind: 'readAloud' },
    { kind: 'guidedContent' }
  ],
  actions: [
    { intent: 'openChildren' }
  ],
  appearances: [
    { key: 'icon', value: '👂' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const subStrandPartsOfBodyVocabulary = createLearningNode({
  id: 'grade-1-english-activities-parts-of-body-vocabulary',
  kind: LEARNING_NODE_KINDS.subStrand,
  label: 'Body Parts Vocabulary',
  summary: 'Learn words for parts of the body.',
  parentId: strandPartsOfBodyListeningSpeaking.id,
  attributes: [
    { key: 'routeSegment', value: 'vocabulary' },
    { key: 'strandId', value: strandPartsOfBodyListeningSpeaking.id },
    { key: 'strandName', value: 'Listening and Speaking' }
  ],
  features: [
    { kind: 'readAloud' },
    { kind: 'practice' }
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

const notesPartsOfBodyVocabulary = createLearningNode({
  id: 'grade-1-english-activities-parts-of-body-vocabulary-notes',
  kind: LEARNING_NODE_KINDS.notes,
  label: 'Body Parts Vocabulary Notes',
  summary: 'Learn body parts vocabulary words.',
  parentId: subStrandPartsOfBodyVocabulary.id,
  attributes: [
    { key: 'routeSegment', value: 'vocabulary-notes' },
    { key: 'subStrandId', value: subStrandPartsOfBodyVocabulary.id },
    { key: 'subStrandName', value: 'Body Parts Vocabulary' },
    { key: 'contentType', value: 'notes' }
  ],
  features: [
    { kind: 'readAloud' },
    { kind: 'guidedContent' }
  ],
  actions: [
    { intent: 'resume' }
  ],
  appearances: [
    { key: 'icon', value: '📖' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const practicePartsOfBodyVocabulary = createLearningNode({
  id: 'grade-1-english-activities-parts-of-body-vocabulary-practice',
  kind: LEARNING_NODE_KINDS.practice,
  label: 'Body Parts Vocabulary Practice',
  summary: 'Practice using body parts vocabulary words.',
  parentId: subStrandPartsOfBodyVocabulary.id,
  attributes: [
    { key: 'routeSegment', value: 'vocabulary-practice' },
    { key: 'subStrandId', value: subStrandPartsOfBodyVocabulary.id },
    { key: 'subStrandName', value: 'Body Parts Vocabulary' },
    { key: 'contentType', value: 'practice' }
  ],
  features: [
    { kind: 'practice' },
    { kind: 'readAloud' }
  ],
  actions: [
    { intent: 'startPractice' }
  ],
  appearances: [
    { key: 'icon', value: '✏️' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const themeMyFriends = createLearningNode({
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

const strandMyFriendsListeningSpeaking = createLearningNode({
  id: 'grade-1-english-activities-my-friends-listening-speaking',
  kind: LEARNING_NODE_KINDS.strand,
  label: 'Listening and Speaking',
  summary: 'Listen and speak about friends.',
  parentId: themeMyFriends.id,
  attributes: [
    { key: 'routeSegment', value: 'listening-speaking' },
    { key: 'themeId', value: themeMyFriends.id },
    { key: 'themeName', value: 'My Friends' }
  ],
  features: [
    { kind: 'readAloud' },
    { kind: 'guidedContent' }
  ],
  actions: [
    { intent: 'openChildren' }
  ],
  appearances: [
    { key: 'icon', value: '👂' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const subStrandMyFriendsVocabulary = createLearningNode({
  id: 'grade-1-english-activities-my-friends-vocabulary',
  kind: LEARNING_NODE_KINDS.subStrand,
  label: 'Friends Vocabulary',
  summary: 'Learn words about friends.',
  parentId: strandMyFriendsListeningSpeaking.id,
  attributes: [
    { key: 'routeSegment', value: 'vocabulary' },
    { key: 'strandId', value: strandMyFriendsListeningSpeaking.id },
    { key: 'strandName', value: 'Listening and Speaking' }
  ],
  features: [
    { kind: 'readAloud' },
    { kind: 'practice' }
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

const notesMyFriendsVocabulary = createLearningNode({
  id: 'grade-1-english-activities-my-friends-vocabulary-notes',
  kind: LEARNING_NODE_KINDS.notes,
  label: 'Friends Vocabulary Notes',
  summary: 'Learn friends-related vocabulary words.',
  parentId: subStrandMyFriendsVocabulary.id,
  attributes: [
    { key: 'routeSegment', value: 'vocabulary-notes' },
    { key: 'subStrandId', value: subStrandMyFriendsVocabulary.id },
    { key: 'subStrandName', value: 'Friends Vocabulary' },
    { key: 'contentType', value: 'notes' }
  ],
  features: [
    { kind: 'readAloud' },
    { kind: 'guidedContent' }
  ],
  actions: [
    { intent: 'resume' }
  ],
  appearances: [
    { key: 'icon', value: '📖' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const practiceMyFriendsVocabulary = createLearningNode({
  id: 'grade-1-english-activities-my-friends-vocabulary-practice',
  kind: LEARNING_NODE_KINDS.practice,
  label: 'Friends Vocabulary Practice',
  summary: 'Practice using friends vocabulary words.',
  parentId: subStrandMyFriendsVocabulary.id,
  attributes: [
    { key: 'routeSegment', value: 'vocabulary-practice' },
    { key: 'subStrandId', value: subStrandMyFriendsVocabulary.id },
    { key: 'subStrandName', value: 'Friends Vocabulary' },
    { key: 'contentType', value: 'practice' }
  ],
  features: [
    { kind: 'practice' },
    { kind: 'readAloud' }
  ],
  actions: [
    { intent: 'startPractice' }
  ],
  appearances: [
    { key: 'icon', value: '✏️' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const themeSafety = createLearningNode({
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

const strandSafetyListeningSpeaking = createLearningNode({
  id: 'grade-1-english-activities-safety-listening-speaking',
  kind: LEARNING_NODE_KINDS.strand,
  label: 'Listening and Speaking',
  summary: 'Listen and speak about safety.',
  parentId: themeSafety.id,
  attributes: [
    { key: 'routeSegment', value: 'listening-speaking' },
    { key: 'themeId', value: themeSafety.id },
    { key: 'themeName', value: 'Safety' }
  ],
  features: [
    { kind: 'readAloud' },
    { kind: 'guidedContent' }
  ],
  actions: [
    { intent: 'openChildren' }
  ],
  appearances: [
    { key: 'icon', value: '👂' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const subStrandSafetyVocabulary = createLearningNode({
  id: 'grade-1-english-activities-safety-vocabulary',
  kind: LEARNING_NODE_KINDS.subStrand,
  label: 'Safety Vocabulary',
  summary: 'Learn words about safety.',
  parentId: strandSafetyListeningSpeaking.id,
  attributes: [
    { key: 'routeSegment', value: 'vocabulary' },
    { key: 'strandId', value: strandSafetyListeningSpeaking.id },
    { key: 'strandName', value: 'Listening and Speaking' }
  ],
  features: [
    { kind: 'readAloud' },
    { kind: 'practice' }
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

const notesSafetyVocabulary = createLearningNode({
  id: 'grade-1-english-activities-safety-vocabulary-notes',
  kind: LEARNING_NODE_KINDS.notes,
  label: 'Safety Vocabulary Notes',
  summary: 'Learn safety-related vocabulary words.',
  parentId: subStrandSafetyVocabulary.id,
  attributes: [
    { key: 'routeSegment', value: 'vocabulary-notes' },
    { key: 'subStrandId', value: subStrandSafetyVocabulary.id },
    { key: 'subStrandName', value: 'Safety Vocabulary' },
    { key: 'contentType', value: 'notes' }
  ],
  features: [
    { kind: 'readAloud' },
    { kind: 'guidedContent' }
  ],
  actions: [
    { intent: 'resume' }
  ],
  appearances: [
    { key: 'icon', value: '📖' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const practiceSafetyVocabulary = createLearningNode({
  id: 'grade-1-english-activities-safety-vocabulary-practice',
  kind: LEARNING_NODE_KINDS.practice,
  label: 'Safety Vocabulary Practice',
  summary: 'Practice using safety vocabulary words.',
  parentId: subStrandSafetyVocabulary.id,
  attributes: [
    { key: 'routeSegment', value: 'vocabulary-practice' },
    { key: 'subStrandId', value: subStrandSafetyVocabulary.id },
    { key: 'subStrandName', value: 'Safety Vocabulary' },
    { key: 'contentType', value: 'practice' }
  ],
  features: [
    { kind: 'practice' },
    { kind: 'readAloud' }
  ],
  actions: [
    { intent: 'startPractice' }
  ],
  appearances: [
    { key: 'icon', value: '✏️' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const themeCommunityLeaders = createLearningNode({
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

const strandCommunityLeadersListeningSpeaking = createLearningNode({
  id: 'grade-1-english-activities-community-leaders-listening-speaking',
  kind: LEARNING_NODE_KINDS.strand,
  label: 'Listening and Speaking',
  summary: 'Listen and speak about community leaders.',
  parentId: themeCommunityLeaders.id,
  attributes: [
    { key: 'routeSegment', value: 'listening-speaking' },
    { key: 'themeId', value: themeCommunityLeaders.id },
    { key: 'themeName', value: 'Community Leaders' }
  ],
  features: [
    { kind: 'readAloud' },
    { kind: 'guidedContent' }
  ],
  actions: [
    { intent: 'openChildren' }
  ],
  appearances: [
    { key: 'icon', value: '👂' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const subStrandCommunityLeadersVocabulary = createLearningNode({
  id: 'grade-1-english-activities-community-leaders-vocabulary',
  kind: LEARNING_NODE_KINDS.subStrand,
  label: 'Community Leaders Vocabulary',
  summary: 'Learn words about community leaders.',
  parentId: strandCommunityLeadersListeningSpeaking.id,
  attributes: [
    { key: 'routeSegment', value: 'vocabulary' },
    { key: 'strandId', value: strandCommunityLeadersListeningSpeaking.id },
    { key: 'strandName', value: 'Listening and Speaking' }
  ],
  features: [
    { kind: 'readAloud' },
    { kind: 'practice' }
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

const notesCommunityLeadersVocabulary = createLearningNode({
  id: 'grade-1-english-activities-community-leaders-vocabulary-notes',
  kind: LEARNING_NODE_KINDS.notes,
  label: 'Community Leaders Vocabulary Notes',
  summary: 'Learn community leaders vocabulary words.',
  parentId: subStrandCommunityLeadersVocabulary.id,
  attributes: [
    { key: 'routeSegment', value: 'vocabulary-notes' },
    { key: 'subStrandId', value: subStrandCommunityLeadersVocabulary.id },
    { key: 'subStrandName', value: 'Community Leaders Vocabulary' },
    { key: 'contentType', value: 'notes' }
  ],
  features: [
    { kind: 'readAloud' },
    { kind: 'guidedContent' }
  ],
  actions: [
    { intent: 'resume' }
  ],
  appearances: [
    { key: 'icon', value: '📖' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const practiceCommunityLeadersVocabulary = createLearningNode({
  id: 'grade-1-english-activities-community-leaders-vocabulary-practice',
  kind: LEARNING_NODE_KINDS.practice,
  label: 'Community Leaders Vocabulary Practice',
  summary: 'Practice using community leaders vocabulary words.',
  parentId: subStrandCommunityLeadersVocabulary.id,
  attributes: [
    { key: 'routeSegment', value: 'vocabulary-practice' },
    { key: 'subStrandId', value: subStrandCommunityLeadersVocabulary.id },
    { key: 'subStrandName', value: 'Community Leaders Vocabulary' },
    { key: 'contentType', value: 'practice' }
  ],
  features: [
    { kind: 'practice' },
    { kind: 'readAloud' }
  ],
  actions: [
    { intent: 'startPractice' }
  ],
  appearances: [
    { key: 'icon', value: '✏️' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const themeLivingTogether = createLearningNode({
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

const strandLivingTogetherListeningSpeaking = createLearningNode({
  id: 'grade-1-english-activities-living-together-listening-speaking',
  kind: LEARNING_NODE_KINDS.strand,
  label: 'Listening and Speaking',
  summary: 'Listen and speak about living together.',
  parentId: themeLivingTogether.id,
  attributes: [
    { key: 'routeSegment', value: 'listening-speaking' },
    { key: 'themeId', value: themeLivingTogether.id },
    { key: 'themeName', value: 'Living Together' }
  ],
  features: [
    { kind: 'readAloud' },
    { kind: 'guidedContent' }
  ],
  actions: [
    { intent: 'openChildren' }
  ],
  appearances: [
    { key: 'icon', value: '👂' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const subStrandLivingTogetherVocabulary = createLearningNode({
  id: 'grade-1-english-activities-living-together-vocabulary',
  kind: LEARNING_NODE_KINDS.subStrand,
  label: 'Living Together Vocabulary',
  summary: 'Learn words about living together.',
  parentId: strandLivingTogetherListeningSpeaking.id,
  attributes: [
    { key: 'routeSegment', value: 'vocabulary' },
    { key: 'strandId', value: strandLivingTogetherListeningSpeaking.id },
    { key: 'strandName', value: 'Listening and Speaking' }
  ],
  features: [
    { kind: 'readAloud' },
    { kind: 'practice' }
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

const notesLivingTogetherVocabulary = createLearningNode({
  id: 'grade-1-english-activities-living-together-vocabulary-notes',
  kind: LEARNING_NODE_KINDS.notes,
  label: 'Living Together Vocabulary Notes',
  summary: 'Learn living together vocabulary words.',
  parentId: subStrandLivingTogetherVocabulary.id,
  attributes: [
    { key: 'routeSegment', value: 'vocabulary-notes' },
    { key: 'subStrandId', value: subStrandLivingTogetherVocabulary.id },
    { key: 'subStrandName', value: 'Living Together Vocabulary' },
    { key: 'contentType', value: 'notes' }
  ],
  features: [
    { kind: 'readAloud' },
    { kind: 'guidedContent' }
  ],
  actions: [
    { intent: 'resume' }
  ],
  appearances: [
    { key: 'icon', value: '📖' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const practiceLivingTogetherVocabulary = createLearningNode({
  id: 'grade-1-english-activities-living-together-vocabulary-practice',
  kind: LEARNING_NODE_KINDS.practice,
  label: 'Living Together Vocabulary Practice',
  summary: 'Practice using living together vocabulary words.',
  parentId: subStrandLivingTogetherVocabulary.id,
  attributes: [
    { key: 'routeSegment', value: 'vocabulary-practice' },
    { key: 'subStrandId', value: subStrandLivingTogetherVocabulary.id },
    { key: 'subStrandName', value: 'Living Together Vocabulary' },
    { key: 'contentType', value: 'practice' }
  ],
  features: [
    { kind: 'practice' },
    { kind: 'readAloud' }
  ],
  actions: [
    { intent: 'startPractice' }
  ],
  appearances: [
    { key: 'icon', value: '✏️' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const themeTechnology = createLearningNode({
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

const strandTechnologyListeningSpeaking = createLearningNode({
  id: 'grade-1-english-activities-technology-listening-speaking',
  kind: LEARNING_NODE_KINDS.strand,
  label: 'Listening and Speaking',
  summary: 'Listen and speak about technology.',
  parentId: themeTechnology.id,
  attributes: [
    { key: 'routeSegment', value: 'listening-speaking' },
    { key: 'themeId', value: themeTechnology.id },
    { key: 'themeName', value: 'Technology' }
  ],
  features: [
    { kind: 'readAloud' },
    { kind: 'guidedContent' }
  ],
  actions: [
    { intent: 'openChildren' }
  ],
  appearances: [
    { key: 'icon', value: '👂' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const subStrandTechnologyVocabulary = createLearningNode({
  id: 'grade-1-english-activities-technology-vocabulary',
  kind: LEARNING_NODE_KINDS.subStrand,
  label: 'Technology Vocabulary',
  summary: 'Learn words about technology.',
  parentId: strandTechnologyListeningSpeaking.id,
  attributes: [
    { key: 'routeSegment', value: 'vocabulary' },
    { key: 'strandId', value: strandTechnologyListeningSpeaking.id },
    { key: 'strandName', value: 'Listening and Speaking' }
  ],
  features: [
    { kind: 'readAloud' },
    { kind: 'practice' }
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

const notesTechnologyVocabulary = createLearningNode({
  id: 'grade-1-english-activities-technology-vocabulary-notes',
  kind: LEARNING_NODE_KINDS.notes,
  label: 'Technology Vocabulary Notes',
  summary: 'Learn technology-related vocabulary words.',
  parentId: subStrandTechnologyVocabulary.id,
  attributes: [
    { key: 'routeSegment', value: 'vocabulary-notes' },
    { key: 'subStrandId', value: subStrandTechnologyVocabulary.id },
    { key: 'subStrandName', value: 'Technology Vocabulary' },
    { key: 'contentType', value: 'notes' }
  ],
  features: [
    { kind: 'readAloud' },
    { kind: 'guidedContent' }
  ],
  actions: [
    { intent: 'resume' }
  ],
  appearances: [
    { key: 'icon', value: '📖' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const practiceTechnologyVocabulary = createLearningNode({
  id: 'grade-1-english-activities-technology-vocabulary-practice',
  kind: LEARNING_NODE_KINDS.practice,
  label: 'Technology Vocabulary Practice',
  summary: 'Practice using technology vocabulary words.',
  parentId: subStrandTechnologyVocabulary.id,
  attributes: [
    { key: 'routeSegment', value: 'vocabulary-practice' },
    { key: 'subStrandId', value: subStrandTechnologyVocabulary.id },
    { key: 'subStrandName', value: 'Technology Vocabulary' },
    { key: 'contentType', value: 'practice' }
  ],
  features: [
    { kind: 'practice' },
    { kind: 'readAloud' }
  ],
  actions: [
    { intent: 'startPractice' }
  ],
  appearances: [
    { key: 'icon', value: '✏️' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const themeNumbers = createLearningNode({
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

const strandNumbersListeningSpeaking = createLearningNode({
  id: 'grade-1-english-activities-numbers-listening-speaking',
  kind: LEARNING_NODE_KINDS.strand,
  label: 'Listening and Speaking',
  summary: 'Listen and speak about numbers.',
  parentId: themeNumbers.id,
  attributes: [
    { key: 'routeSegment', value: 'listening-speaking' },
    { key: 'themeId', value: themeNumbers.id },
    { key: 'themeName', value: 'Numbers' }
  ],
  features: [
    { kind: 'readAloud' },
    { kind: 'guidedContent' }
  ],
  actions: [
    { intent: 'openChildren' }
  ],
  appearances: [
    { key: 'icon', value: '👂' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const subStrandNumbersVocabulary = createLearningNode({
  id: 'grade-1-english-activities-numbers-vocabulary',
  kind: LEARNING_NODE_KINDS.subStrand,
  label: 'Numbers Vocabulary',
  summary: 'Learn words about numbers.',
  parentId: strandNumbersListeningSpeaking.id,
  attributes: [
    { key: 'routeSegment', value: 'vocabulary' },
    { key: 'strandId', value: strandNumbersListeningSpeaking.id },
    { key: 'strandName', value: 'Listening and Speaking' }
  ],
  features: [
    { kind: 'readAloud' },
    { kind: 'practice' }
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

const notesNumbersVocabulary = createLearningNode({
  id: 'grade-1-english-activities-numbers-vocabulary-notes',
  kind: LEARNING_NODE_KINDS.notes,
  label: 'Numbers Vocabulary Notes',
  summary: 'Learn numbers-related vocabulary words.',
  parentId: subStrandNumbersVocabulary.id,
  attributes: [
    { key: 'routeSegment', value: 'vocabulary-notes' },
    { key: 'subStrandId', value: subStrandNumbersVocabulary.id },
    { key: 'subStrandName', value: 'Numbers Vocabulary' },
    { key: 'contentType', value: 'notes' }
  ],
  features: [
    { kind: 'readAloud' },
    { kind: 'guidedContent' }
  ],
  actions: [
    { intent: 'resume' }
  ],
  appearances: [
    { key: 'icon', value: '📖' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const practiceNumbersVocabulary = createLearningNode({
  id: 'grade-1-english-activities-numbers-vocabulary-practice',
  kind: LEARNING_NODE_KINDS.practice,
  label: 'Numbers Vocabulary Practice',
  summary: 'Practice using numbers vocabulary words.',
  parentId: subStrandNumbersVocabulary.id,
  attributes: [
    { key: 'routeSegment', value: 'vocabulary-practice' },
    { key: 'subStrandId', value: subStrandNumbersVocabulary.id },
    { key: 'subStrandName', value: 'Numbers Vocabulary' },
    { key: 'contentType', value: 'practice' }
  ],
  features: [
    { kind: 'practice' },
    { kind: 'readAloud' }
  ],
  actions: [
    { intent: 'startPractice' }
  ],
  appearances: [
    { key: 'icon', value: '✏️' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const themeConservingResources = createLearningNode({
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

const strandConservingResourcesListeningSpeaking = createLearningNode({
  id: 'grade-1-english-activities-conserving-resources-listening-speaking',
  kind: LEARNING_NODE_KINDS.strand,
  label: 'Listening and Speaking',
  summary: 'Listen and speak about conserving resources.',
  parentId: themeConservingResources.id,
  attributes: [
    { key: 'routeSegment', value: 'listening-speaking' },
    { key: 'themeId', value: themeConservingResources.id },
    { key: 'themeName', value: 'Conserving Resources' }
  ],
  features: [
    { kind: 'readAloud' },
    { kind: 'guidedContent' }
  ],
  actions: [
    { intent: 'openChildren' }
  ],
  appearances: [
    { key: 'icon', value: '👂' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const subStrandConservingResourcesVocabulary = createLearningNode({
  id: 'grade-1-english-activities-conserving-resources-vocabulary',
  kind: LEARNING_NODE_KINDS.subStrand,
  label: 'Conserving Resources Vocabulary',
  summary: 'Learn words about conserving resources.',
  parentId: strandConservingResourcesListeningSpeaking.id,
  attributes: [
    { key: 'routeSegment', value: 'vocabulary' },
    { key: 'strandId', value: strandConservingResourcesListeningSpeaking.id },
    { key: 'strandName', value: 'Listening and Speaking' }
  ],
  features: [
    { kind: 'readAloud' },
    { kind: 'practice' }
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

const notesConservingResourcesVocabulary = createLearningNode({
  id: 'grade-1-english-activities-conserving-resources-vocabulary-notes',
  kind: LEARNING_NODE_KINDS.notes,
  label: 'Conserving Resources Vocabulary Notes',
  summary: 'Learn conserving resources vocabulary words.',
  parentId: subStrandConservingResourcesVocabulary.id,
  attributes: [
    { key: 'routeSegment', value: 'vocabulary-notes' },
    { key: 'subStrandId', value: subStrandConservingResourcesVocabulary.id },
    { key: 'subStrandName', value: 'Conserving Resources Vocabulary' },
    { key: 'contentType', value: 'notes' }
  ],
  features: [
    { kind: 'readAloud' },
    { kind: 'guidedContent' }
  ],
  actions: [
    { intent: 'resume' }
  ],
  appearances: [
    { key: 'icon', value: '📖' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const practiceConservingResourcesVocabulary = createLearningNode({
  id: 'grade-1-english-activities-conserving-resources-vocabulary-practice',
  kind: LEARNING_NODE_KINDS.practice,
  label: 'Conserving Resources Vocabulary Practice',
  summary: 'Practice using conserving resources vocabulary words.',
  parentId: subStrandConservingResourcesVocabulary.id,
  attributes: [
    { key: 'routeSegment', value: 'vocabulary-practice' },
    { key: 'subStrandId', value: subStrandConservingResourcesVocabulary.id },
    { key: 'subStrandName', value: 'Conserving Resources Vocabulary' },
    { key: 'contentType', value: 'practice' }
  ],
  features: [
    { kind: 'practice' },
    { kind: 'readAloud' }
  ],
  actions: [
    { intent: 'startPractice' }
  ],
  appearances: [
    { key: 'icon', value: '✏️' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const examEnglishActivities001 = createLearningNode({
  id: 'grade-1-english-activities-exam-001',
  kind: LEARNING_NODE_KINDS.exam,
  label: 'English Activities Exam 1',
  summary: 'Comprehensive exam covering all English Activities topics.',
  parentId: GRADE_1_ENGLISH_ACTIVITIES_NODE_ID,
  attributes: [
    { key: 'routeSegment', value: 'exam-001' },
    { key: 'learningAreaId', value: 'english-activities' },
    { key: 'learningAreaName', value: 'English Activities' },
    { key: 'examType', value: 'comprehensive' },
    { key: 'legacyManifestId', value: 'english-activities-exam-001' },
    { key: 'legacyPath', value: 'src/academies/cbc/grade-1/english' }
  ],
  features: [
    { kind: 'assessment' },
    { kind: 'readAloud' }
  ],
  actions: [
    { intent: 'startExam' }
  ],
  appearances: [
    { key: 'icon', value: '📝' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const examGreetings001 = createLearningNode({
  id: 'grade-1-english-activities-greetings-exam-001',
  kind: LEARNING_NODE_KINDS.exam,
  label: 'Greetings Exam 1',
  summary: 'Exam covering the Greetings theme.',
  parentId: themeGreetings.id,
  attributes: [
    { key: 'routeSegment', value: 'exam-001' },
    { key: 'themeId', value: themeGreetings.id },
    { key: 'themeName', value: 'Greetings' },
    { key: 'examType', value: 'theme' },
    { key: 'legacyManifestId', value: 'greetings-exam-001' },
    { key: 'legacyPath', value: 'src/academies/cbc/grade-1/english' }
  ],
  features: [
    { kind: 'assessment' },
    { kind: 'readAloud' }
  ],
  actions: [
    { intent: 'startExam' }
  ],
  appearances: [
    { key: 'icon', value: '📝' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const examListeningSpeaking001 = createLearningNode({
  id: 'grade-1-english-activities-greetings-listening-speaking-exam-001',
  kind: LEARNING_NODE_KINDS.exam,
  label: 'Listening and Speaking Exam 1',
  summary: 'Exam covering the Listening and Speaking strand.',
  parentId: strandGreetingsListeningSpeaking.id,
  attributes: [
    { key: 'routeSegment', value: 'exam-001' },
    { key: 'strandId', value: strandGreetingsListeningSpeaking.id },
    { key: 'strandName', value: 'Listening and Speaking' },
    { key: 'examType', value: 'strand' },
    { key: 'legacyManifestId', value: 'listening-speaking-exam-001' },
    { key: 'legacyPath', value: 'src/academies/cbc/grade-1/english' }
  ],
  features: [
    { kind: 'assessment' },
    { kind: 'readAloud' }
  ],
  actions: [
    { intent: 'startExam' }
  ],
  appearances: [
    { key: 'icon', value: '📝' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const examPronunciationVocabulary001 = createLearningNode({
  id: 'grade-1-english-activities-greetings-pronunciation-vocabulary-exam-001',
  kind: LEARNING_NODE_KINDS.exam,
  label: 'Pronunciation and Vocabulary Exam 1',
  summary: 'Exam covering the Pronunciation and Vocabulary sub-strand.',
  parentId: subStrandGreetingsPronunciationVocabulary.id,
  attributes: [
    { key: 'routeSegment', value: 'exam-001' },
    { key: 'subStrandId', value: subStrandGreetingsPronunciationVocabulary.id },
    { key: 'subStrandName', value: 'Pronunciation and Vocabulary' },
    { key: 'examType', value: 'sub-strand' },
    { key: 'legacyManifestId', value: 'pronunciation-vocabulary-exam-001' },
    { key: 'legacyPath', value: 'src/academies/cbc/grade-1/english' }
  ],
  features: [
    { kind: 'assessment' },
    { kind: 'readAloud' }
  ],
  actions: [
    { intent: 'startExam' }
  ],
  appearances: [
    { key: 'icon', value: '📝' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade1Node = createLearningNode({
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

const grade1EnglishActivitiesLearningArea = createLearningNode({
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

const grade1EnglishActivitiesNodes: LearningNode[] = [
  grade1Node,
  grade1EnglishActivitiesLearningArea,
  themeGreetings,
  strandGreetingsListeningSpeaking,
  subStrandGreetingsPronunciationVocabulary,
  notesGreetingsPronunciation,
  practiceGreetingsPronunciation,
  revisionGreetingsPronunciation,
  assessmentGreetingsPronunciation,
  examGreetings001,
  examListeningSpeaking001,
  examPronunciationVocabulary001,
  themeSchool,
  strandSchoolListeningSpeaking,
  subStrandSchoolVocabulary,
  notesSchoolVocabulary,
  practiceSchoolVocabulary,
  themeFamily,
  strandFamilyListeningSpeaking,
  subStrandFamilyVocabulary,
  notesFamilyVocabulary,
  practiceFamilyVocabulary,
  themeHome,
  strandHomeListeningSpeaking,
  subStrandHomeVocabulary,
  notesHomeVocabulary,
  practiceHomeVocabulary,
  themeTime,
  strandTimeListeningSpeaking,
  subStrandTimeVocabulary,
  notesTimeVocabulary,
  practiceTimeVocabulary,
  themeWeatherEnvironment,
  strandWeatherListeningSpeaking,
  subStrandWeatherVocabulary,
  notesWeatherVocabulary,
  practiceWeatherVocabulary,
  themeHygiene,
  strandHygieneListeningSpeaking,
  subStrandHygieneVocabulary,
  notesHygieneVocabulary,
  practiceHygieneVocabulary,
  themePartsOfBody,
  strandPartsOfBodyListeningSpeaking,
  subStrandPartsOfBodyVocabulary,
  notesPartsOfBodyVocabulary,
  practicePartsOfBodyVocabulary,
  themeMyFriends,
  strandMyFriendsListeningSpeaking,
  subStrandMyFriendsVocabulary,
  notesMyFriendsVocabulary,
  practiceMyFriendsVocabulary,
  themeSafety,
  strandSafetyListeningSpeaking,
  subStrandSafetyVocabulary,
  notesSafetyVocabulary,
  practiceSafetyVocabulary,
  themeCommunityLeaders,
  strandCommunityLeadersListeningSpeaking,
  subStrandCommunityLeadersVocabulary,
  notesCommunityLeadersVocabulary,
  practiceCommunityLeadersVocabulary,
  themeLivingTogether,
  strandLivingTogetherListeningSpeaking,
  subStrandLivingTogetherVocabulary,
  notesLivingTogetherVocabulary,
  practiceLivingTogetherVocabulary,
  themeTechnology,
  strandTechnologyListeningSpeaking,
  subStrandTechnologyVocabulary,
  notesTechnologyVocabulary,
  practiceTechnologyVocabulary,
  themeNumbers,
  strandNumbersListeningSpeaking,
  subStrandNumbersVocabulary,
  notesNumbersVocabulary,
  practiceNumbersVocabulary,
  themeConservingResources,
  strandConservingResourcesListeningSpeaking,
  subStrandConservingResourcesVocabulary,
  notesConservingResourcesVocabulary,
  practiceConservingResourcesVocabulary,
  examEnglishActivities001
];

export function createGrade1EnglishActivitiesRegistrySource() {
  return {
    id: 'grade-1-english-activities',
    layer: 'grade-1-english-activities',
    nodes: grade1EnglishActivitiesNodes
  };
}

export function getGrade1EnglishActivitiesNodes(): LearningNode[] {
  return grade1EnglishActivitiesNodes.map((node) => createLearningNode(node));
}