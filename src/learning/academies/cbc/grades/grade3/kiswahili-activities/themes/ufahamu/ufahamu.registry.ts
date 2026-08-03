import type { LearningNode } from '../../../../../../../core/index.ts';
import { createLearningNode } from '../../../../../../../core/index.ts';
import { LEARNING_NODE_KINDS } from '../../../../../../../core/learningNode.constants.ts';
import {
  createAssessmentExamDescriptor
} from '../../../assessmentExamDescriptor.ts';

const THEME_NODE_ID = 'grade-3-kiswahili-activities-theme-ufahamu';
const ASSESSMENT_NODE_ID = 'gd3-kis-ufahamu-assessment';

export const grade3UfahamuExamDescriptors = [
  createAssessmentExamDescriptor({
    manifestId: 'kiswahili-hadithi-exam-001',
    runtimeExamId: 'grade-3-kiswahili-hadithi-exam-001',
    title: 'Grade 3 Kiswahili Hadithi Exam 1',
    sourceFile:
      'src/academies/cbc/grade-3/kiswahili/assessments/kiswahili-hadithi-exam-001.js',
    questionCount: 10,
    questionTimeSeconds: 60,
    examMode: 'timed-comprehension'
  })
];

const themeNode = createLearningNode({
  id: THEME_NODE_ID,
  kind: LEARNING_NODE_KINDS.theme,
  label: 'Ufahamu',
  summary: 'Soma vifungu vifupi kisha ujibu maswali.',
  parentId: 'grade-3-kiswahili-activities',
  childIds: [ASSESSMENT_NODE_ID],
  attributes: [
    { key: 'routeSegment', value: 'ufahamu' },
    { key: 'themeId', value: 'ufahamu' },
    { key: 'themeName', value: 'Ufahamu' },
    { key: 'learningAreaId', value: 'kiswahili-activities' },
    { key: 'learningAreaName', value: 'Kiswahili Activities' }
  ],
  features: [{ kind: 'guidedContent' }, { kind: 'readAloud' }],
  actions: [{ intent: 'openChildren' }],
  appearances: [
    { key: 'icon', value: '📖' },
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
    exams: grade3UfahamuExamDescriptors
  },
  attributes: [
    { key: 'gradeCode', value: 'GD3' },
    { key: 'gradeName', value: 'Grade 3' },
    { key: 'learningAreaCode', value: 'KIS' },
    { key: 'learningAreaName', value: 'Kiswahili Activities' },
    { key: 'themeName', value: 'Ufahamu' },
    { key: 'routeSegment', value: 'assessment' },
    { key: 'contentType', value: 'assessment' },
    { key: 'themeId', value: 'ufahamu' }
  ],
  features: [{ kind: 'assessment' }, { kind: 'timed' }],
  actions: [{ intent: 'takeAssessment' }],
  appearances: [
    { key: 'icon', value: '✅' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

export const grade3UfahamuNodes: LearningNode[] = [
  themeNode,
  assessmentNode
];