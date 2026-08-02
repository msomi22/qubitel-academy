import type { LearningNode } from '../../../../../../../core/index.ts';
import { createLearningNode } from '../../../../../../../core/index.ts';
import { LEARNING_NODE_KINDS } from '../../../../../../../core/learningNode.constants.ts';
import {
  createAssessmentExamDescriptor
} from '../../../assessmentExamDescriptor.ts';

const THEME_NODE_ID = 'grade-3-mathematical-activities-theme-mixed-revision';
const ASSESSMENT_NODE_ID = 'gd3-math-mixed-revision-assessment';
const SOURCE_ROOT = 'src/academies/cbc/grade-3/mathematics/assessments/mixed';

export const grade3MixedRevisionExamDescriptors = Array.from(
  { length: 8 },
  (_, index) => {
    const sequence = String(index + 1).padStart(3, '0');

    return createAssessmentExamDescriptor({
      manifestId: `grade-3-mathematics-mixed-exam-${sequence}`,
      runtimeExamId: `grade-3-mathematics-mixed-exam-${sequence}`,
      title: `Exam ${index + 1}: Mixed Mathematics`,
      sourceFile: `${SOURCE_ROOT}/mixed-mathematics-exam-${sequence}.js`,
      questionCount: 20,
      questionTimeSeconds: 120
    });
  }
);

const themeNode = createLearningNode({
  id: THEME_NODE_ID,
  kind: LEARNING_NODE_KINDS.theme,
  label: 'Mixed Revision',
  summary: 'Revise number work, measurements, and geometry.',
  parentId: 'grade-3-mathematical-activities',
  childIds: [ASSESSMENT_NODE_ID],
  attributes: [
    { key: 'routeSegment', value: 'mixed-revision' },
    { key: 'themeId', value: 'mixed-revision' },
    { key: 'themeName', value: 'Mixed Revision' },
    { key: 'learningAreaId', value: 'mathematical-activities' },
    { key: 'learningAreaName', value: 'Mathematical Activities' }
  ],
  features: [{ kind: 'guidedContent' }],
  actions: [{ intent: 'openChildren' }],
  appearances: [
    { key: 'icon', value: '🔢' },
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
    exams: grade3MixedRevisionExamDescriptors
  },
  attributes: [
    { key: 'gradeCode', value: 'GD3' },
    { key: 'gradeName', value: 'Grade 3' },
    { key: 'learningAreaCode', value: 'MATH' },
    { key: 'learningAreaName', value: 'Mathematical Activities' },
    { key: 'themeName', value: 'Mixed Revision' },
    { key: 'routeSegment', value: 'assessment' },
    { key: 'contentType', value: 'assessment' },
    { key: 'themeId', value: 'mixed-revision' }
  ],
  features: [{ kind: 'assessment' }, { kind: 'timed' }],
  actions: [{ intent: 'takeAssessment' }],
  appearances: [
    { key: 'icon', value: '✅' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

export const grade3MixedRevisionNodes: LearningNode[] = [
  themeNode,
  assessmentNode
];