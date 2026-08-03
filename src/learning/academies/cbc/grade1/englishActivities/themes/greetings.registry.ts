import type { LearningNode } from '../../../../../core/index.ts';
import { createLearningNode } from '../../../../../core/index.ts';
import { LEARNING_NODE_KINDS } from '../../../../../core/learningNode.constants.ts';
import { GRADE_1_ENGLISH_ACTIVITIES_NODE_ID, GRADE_1_NODE_ID, CBC_ACADEMY_NODE_ID } from '../root.ts';

export const greetingsThemeNodes: LearningNode[] = [
  createLearningNode({
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
  }),
  createLearningNode({
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
  }),
  createLearningNode({
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
  }),
  createLearningNode({
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
  }),
  createLearningNode({
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
  }),
  createLearningNode({
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
  }),
  createLearningNode({
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
  }),
  createLearningNode({
    id: 'grade-1-english-activities-greetings-exam-001',
    kind: LEARNING_NODE_KINDS.exam,
    label: 'Greetings Exam 1',
    summary: 'Exam covering the Greetings theme.',
    parentId: 'grade-1-english-activities-theme-greetings',
    attributes: [
      { key: 'routeSegment', value: 'exam-001' },
      { key: 'themeId', value: 'grade-1-english-activities-theme-greetings' },
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
  }),
  createLearningNode({
    id: 'grade-1-english-activities-greetings-listening-speaking-exam-001',
    kind: LEARNING_NODE_KINDS.exam,
    label: 'Listening and Speaking Exam 1',
    summary: 'Exam covering the Listening and Speaking strand.',
    parentId: 'grade-1-english-activities-greetings-listening-speaking',
    attributes: [
      { key: 'routeSegment', value: 'exam-001' },
      { key: 'strandId', value: 'grade-1-english-activities-greetings-listening-speaking' },
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
  }),
  createLearningNode({
    id: 'grade-1-english-activities-greetings-pronunciation-vocabulary-exam-001',
    kind: LEARNING_NODE_KINDS.exam,
    label: 'Pronunciation and Vocabulary Exam 1',
    summary: 'Exam covering the Pronunciation and Vocabulary sub-strand.',
    parentId: 'grade-1-english-activities-greetings-pronunciation-vocabulary',
    attributes: [
      { key: 'routeSegment', value: 'exam-001' },
      { key: 'subStrandId', value: 'grade-1-english-activities-greetings-pronunciation-vocabulary' },
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
  })
];

export const greetingsThemeIds = [
  'grade-1-english-activities-theme-greetings',
  'grade-1-english-activities-greetings-listening-speaking',
  'grade-1-english-activities-greetings-pronunciation-vocabulary',
  'grade-1-english-activities-greetings-pronunciation-notes',
  'grade-1-english-activities-greetings-pronunciation-practice',
  'grade-1-english-activities-greetings-pronunciation-revision',
  'grade-1-english-activities-greetings-pronunciation-assessment',
  'grade-1-english-activities-greetings-exam-001',
  'grade-1-english-activities-greetings-listening-speaking-exam-001',
  'grade-1-english-activities-greetings-pronunciation-vocabulary-exam-001'
];