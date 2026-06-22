import { createLearningNode } from '../../../../core/index.ts';
import { LEARNING_NODE_KINDS } from '../../../../core/learningNode.constants.ts';
import { GRADE_1_ENGLISH_ACTIVITIES_NODE_ID } from '../englishActivities.registry.ts';

export const grade1EnglishStrandListeningSpeaking = createLearningNode({
  id: 'grade-1-english-activities-greetings-listening-speaking',
  kind: LEARNING_NODE_KINDS.strand,
  label: 'Listening and Speaking',
  summary: 'Listen carefully, answer simple questions, and speak clearly.',
  parentId: 'grade-1-english-activities-theme-greetings',
  attributes: [
    { key: 'routeSegment', value: 'listening-speaking' },
    { key: 'themeId', value: 'grade-1-english-activities-theme-greetings' },
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

export const grade1EnglishSubStrandPronunciation = createLearningNode({
  id: 'grade-1-english-activities-greetings-pronunciation-vocabulary',
  kind: LEARNING_NODE_KINDS.subStrand,
  label: 'Pronunciation and Vocabulary',
  summary: 'Learn correct pronunciation and new words for greetings.',
  parentId: 'grade-1-english-activities-greetings-listening-speaking',
  attributes: [
    { key: 'routeSegment', value: 'pronunciation-vocabulary' },
    { key: 'strandId', value: 'grade-1-english-activities-greetings-listening-speaking' },
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

export const grade1EnglishNotesPronunciation = createLearningNode({
  id: 'grade-1-english-activities-greetings-pronunciation-notes',
  kind: LEARNING_NODE_KINDS.notes,
  label: 'Greetings Pronunciation Notes',
  summary: 'Learn how to pronounce common greetings correctly.',
  parentId: 'grade-1-english-activities-greetings-pronunciation-vocabulary',
  attributes: [
    { key: 'routeSegment', value: 'pronunciation-notes' },
    { key: 'subStrandId', value: 'grade-1-english-activities-greetings-pronunciation-vocabulary' },
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

export const grade1EnglishPracticePronunciation = createLearningNode({
  id: 'grade-1-english-activities-greetings-pronunciation-practice',
  kind: LEARNING_NODE_KINDS.practice,
  label: 'Greetings Pronunciation Practice',
  summary: 'Practice pronouncing common greetings.',
  parentId: 'grade-1-english-activities-greetings-pronunciation-vocabulary',
  attributes: [
    { key: 'routeSegment', value: 'pronunciation-practice' },
    { key: 'subStrandId', value: 'grade-1-english-activities-greetings-pronunciation-vocabulary' },
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

export const grade1EnglishRevisionPronunciation = createLearningNode({
  id: 'grade-1-english-activities-greetings-pronunciation-revision',
  kind: LEARNING_NODE_KINDS.revision,
  label: 'Greetings Pronunciation Revision',
  summary: 'Review and revise greetings pronunciation.',
  parentId: 'grade-1-english-activities-greetings-pronunciation-vocabulary',
  attributes: [
    { key: 'routeSegment', value: 'pronunciation-revision' },
    { key: 'subStrandId', value: 'grade-1-english-activities-greetings-pronunciation-vocabulary' },
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

export const grade1EnglishAssessmentPronunciation = createLearningNode({
  id: 'grade-1-english-activities-greetings-pronunciation-assessment',
  kind: LEARNING_NODE_KINDS.assessment,
  label: 'Greetings Pronunciation Assessment',
  summary: 'Test your knowledge of greetings pronunciation.',
  parentId: 'grade-1-english-activities-greetings-pronunciation-vocabulary',
  attributes: [
    { key: 'routeSegment', value: 'pronunciation-assessment' },
    { key: 'subStrandId', value: 'grade-1-english-activities-greetings-pronunciation-vocabulary' },
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

export const grade1EnglishGreetingsNodes = [
  grade1EnglishStrandListeningSpeaking,
  grade1EnglishSubStrandPronunciation,
  grade1EnglishNotesPronunciation,
  grade1EnglishPracticePronunciation,
  grade1EnglishRevisionPronunciation,
  grade1EnglishAssessmentPronunciation
];