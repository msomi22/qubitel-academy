import type { LearningNode } from '../../../../../../../core/index.ts';
import { createLearningNode } from '../../../../../../../core/index.ts';
import { LEARNING_NODE_KINDS } from '../../../../../../../core/learningNode.constants.ts';
import {
  createAssessmentExamDescriptor
} from '../../../assessmentExamDescriptor.ts';

const THEME_NODE_ID = 'grade-3-english-activities-theme-parts-of-speech';
const ASSESSMENT_NODE_ID = 'gd3-eng-parts-of-speech-assessment';
const SOURCE_ROOT = 'src/academies/cbc/grade-3/english/assessments/spelling';

export const grade3PartsOfSpeechExamDescriptors = [
  createAssessmentExamDescriptor({
    manifestId: 'grade-3-parts-of-speech-spelling-exam-001',
    runtimeExamId: 'grade-3-parts-of-speech-spelling-exam-001',
    title: 'Parts of Speech Exam 1: Naming and Action Words',
    sourceFile: `${SOURCE_ROOT}/grade-3-parts-of-speech-spelling-exam-001.js`,
    questionCount: 30,
    questionTimeSeconds: 30
  }),
  createAssessmentExamDescriptor({
    manifestId: 'grade-3-parts-of-speech-spelling-exam-002',
    runtimeExamId: 'grade-3-parts-of-speech-spelling-exam-002',
    title: 'Parts of Speech Exam 2: Telling More and Joining Words',
    sourceFile: `${SOURCE_ROOT}/grade-3-parts-of-speech-spelling-exam-002.js`,
    questionCount: 30,
    questionTimeSeconds: 30
  })
];

const themeNode = createLearningNode({
  id: THEME_NODE_ID,
  kind: LEARNING_NODE_KINDS.theme,
  label: 'Parts of Speech',
  summary: 'Use naming, action, describing, and joining words.',
  parentId: 'grade-3-english-activities',
  childIds: [ASSESSMENT_NODE_ID],
  attributes: [
    { key: 'routeSegment', value: 'parts-of-speech' },
    { key: 'themeId', value: 'parts-of-speech' },
    { key: 'themeName', value: 'Parts of Speech' },
    { key: 'learningAreaId', value: 'english-activities' },
    { key: 'learningAreaName', value: 'English Activities' }
  ],
  features: [{ kind: 'guidedContent' }],
  actions: [{ intent: 'openChildren' }],
  appearances: [
    { key: 'icon', value: '📝' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const assessmentNode = createLearningNode({
  id: ASSESSMENT_NODE_ID,
  kind: LEARNING_NODE_KINDS.assessment,
  label: 'Assessment',
  parentId: THEME_NODE_ID,
  content: {
    type: 'assessmentExamList',
    exams: grade3PartsOfSpeechExamDescriptors
  },
  attributes: [
    { key: 'gradeCode', value: 'GD3' },
    { key: 'gradeName', value: 'Grade 3' },
    { key: 'learningAreaCode', value: 'ENG' },
    { key: 'learningAreaName', value: 'English Activities' },
    { key: 'themeName', value: 'Parts of Speech' },
    { key: 'routeSegment', value: 'assessment' },
    { key: 'contentType', value: 'assessment' },
    { key: 'themeId', value: 'parts-of-speech' }
  ],
  features: [{ kind: 'assessment' }, { kind: 'timed' }],
  actions: [{ intent: 'takeAssessment' }],
  appearances: [
    { key: 'icon', value: '✅' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

export const grade3EnglishPartsOfSpeechNodes: LearningNode[] = [
  themeNode,
  assessmentNode
];