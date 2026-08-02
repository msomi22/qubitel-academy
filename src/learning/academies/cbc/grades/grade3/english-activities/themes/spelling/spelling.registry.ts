import grade3SpellingLesson from
  '../../../../../../../../academies/cbc/grade-3/english/lessons/spelling-lesson-001.js';
import type { LearningNode } from '../../../../../../../core/index.ts';
import { createLearningNode } from '../../../../../../../core/index.ts';
import {
  LEARNING_NODE_KINDS
} from '../../../../../../../core/learningNode.constants.ts';
import {
  adaptLegacyLearningProblemToBook
} from '../../../../../adapters/legacyLearningProblem.adapter.ts';
import {
  createAssessmentExamDescriptor
} from '../../../assessmentExamDescriptor.ts';

const SPELLING_THEME_NODE_ID = 'grade-3-english-activities-theme-spelling';
const SPELLING_LEARNING_MATERIAL_NODE_ID = 'gd3-eng-spelling-learning-material';
const SPELLING_ASSESSMENT_NODE_ID = 'gd3-eng-spelling-assessment';
const SPELLING_SOURCE_ROOT = 'src/academies/cbc/grade-3/english/assessments/spelling';

export const grade3SpellingExamDescriptors = [
  ...Array.from({ length: 6 }, (_, index) => {
    const sequence = String(index + 1).padStart(3, '0');

    return createAssessmentExamDescriptor({
      manifestId: `spelling-exam-${sequence}`,
      runtimeExamId: `spelling-exam-${sequence}`,
      title: `Spelling Exam ${index + 1}`,
      sourceFile: `${SPELLING_SOURCE_ROOT}/spelling-exam-${sequence}.js`,
      questionCount: 20,
      questionTimeSeconds: 30
    });
  }),
  createAssessmentExamDescriptor({
    manifestId: 'spelling-classroom-items-exam-007',
    runtimeExamId: 'grade-3-spelling-classroom-items-exam-007',
    title: 'Spelling Exam 7: Classroom Items',
    sourceFile: `${SPELLING_SOURCE_ROOT}/spelling-classroom-items-exam-007.js`,
    questionCount: 20,
    questionTimeSeconds: 30
  }),
  createAssessmentExamDescriptor({
    manifestId: 'spelling-furniture-exam-008',
    runtimeExamId: 'grade-3-spelling-furniture-exam-008',
    title: 'Spelling Exam 8: Furniture',
    sourceFile: `${SPELLING_SOURCE_ROOT}/spelling-furniture-exam-008.js`,
    questionCount: 20,
    questionTimeSeconds: 30
  }),
  createAssessmentExamDescriptor({
    manifestId: 'spelling-body-parts-exam-009',
    runtimeExamId: 'grade-3-spelling-body-parts-exam-009',
    title: 'Spelling Exam 9: Body Parts',
    sourceFile: `${SPELLING_SOURCE_ROOT}/spelling-body-parts-exam-009.js`,
    questionCount: 20,
    questionTimeSeconds: 30
  }),
  createAssessmentExamDescriptor({
    manifestId: 'spelling-random-hard-exam-010',
    runtimeExamId: 'grade-3-spelling-random-hard-exam-010',
    title: 'Spelling Exam 10: Random Very Hard',
    sourceFile: `${SPELLING_SOURCE_ROOT}/spelling-random-hard-exam-010.js`,
    questionCount: 20,
    questionTimeSeconds: 30
  }),
  createAssessmentExamDescriptor({
    manifestId: 'spelling-random-super-hard-exam-011',
    runtimeExamId: 'grade-3-spelling-random-super-hard-exam-011',
    title: 'Spelling Exam 11: Random Super Hard',
    sourceFile: `${SPELLING_SOURCE_ROOT}/spelling-random-super-hard-exam-011.js`,
    questionCount: 20,
    questionTimeSeconds: 30
  }),
  createAssessmentExamDescriptor({
    manifestId: 'spelling-random-super-hard-genius-exam-012',
    runtimeExamId: 'grade-3-spelling-random-super-hard-genius-exam-012',
    title: 'Spelling Exam 12: Random Super Hard Genius',
    sourceFile: `${SPELLING_SOURCE_ROOT}/spelling-random-super-hard-genius-exam-012.js`,
    questionCount: 20,
    questionTimeSeconds: 30
  }),
  createAssessmentExamDescriptor({
    manifestId: 'spelling-domestic-animals-exam-013',
    runtimeExamId: 'grade-3-spelling-domestic-animals-exam-013',
    title: 'Spelling Exam 13: Domestic Animals',
    sourceFile: `${SPELLING_SOURCE_ROOT}/spelling-domestic-animals-exam-013.js`,
    questionCount: 20,
    questionTimeSeconds: 30
  }),
  createAssessmentExamDescriptor({
    manifestId: 'spelling-wild-animals-exam-014',
    runtimeExamId: 'grade-3-spelling-wild-animals-exam-014',
    title: 'Spelling Exam 14: Wild Animals',
    sourceFile: `${SPELLING_SOURCE_ROOT}/spelling-wild-animals-exam-014.js`,
    questionCount: 20,
    questionTimeSeconds: 30
  }),
  createAssessmentExamDescriptor({
    manifestId: 'spelling-aquatic-animals-exam-015',
    runtimeExamId: 'grade-3-spelling-aquatic-animals-exam-015',
    title: 'Spelling Exam 15: Aquatic Animals',
    sourceFile: `${SPELLING_SOURCE_ROOT}/spelling-aquatic-animals-exam-015.js`,
    questionCount: 20,
    questionTimeSeconds: 30
  })
];

const spellingLearningMaterialBook = adaptLegacyLearningProblemToBook(
  grade3SpellingLesson,
  {
    manifestId: 'spelling-lesson-001',
    pageId: 'english-spelling-lesson-001-page-001',
    pageSubtitle: 'Learning Material'
  }
);

const grade3EnglishThemeSpelling = createLearningNode({
  id: SPELLING_THEME_NODE_ID,
  kind: LEARNING_NODE_KINDS.theme,
  label: 'Spelling',
  summary: 'Build strong spelling skills.',
  parentId: 'grade-3-english-activities',
  childIds: [SPELLING_LEARNING_MATERIAL_NODE_ID, SPELLING_ASSESSMENT_NODE_ID],
  attributes: [
    { key: 'routeSegment', value: 'spelling' },
    { key: 'themeId', value: 'spelling' },
    { key: 'themeName', value: 'Spelling' },
    { key: 'learningAreaId', value: 'english-activities' },
    { key: 'learningAreaName', value: 'English Activities' }
  ],
  features: [{ kind: 'guidedContent' }],
  actions: [{ intent: 'openChildren' }],
  appearances: [
    { key: 'icon', value: '🔤' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade3EnglishSpellingLearningMaterial = createLearningNode({
  id: SPELLING_LEARNING_MATERIAL_NODE_ID,
  kind: 'learningMaterial',
  label: 'Learning Material',
  summary: grade3SpellingLesson.question,
  parentId: SPELLING_THEME_NODE_ID,
  content: spellingLearningMaterialBook,
  attributes: [
    { key: 'gradeCode', value: 'GD3' },
    { key: 'gradeName', value: 'Grade 3' },
    { key: 'learningAreaCode', value: 'ENG' },
    { key: 'learningAreaName', value: 'English Activities' },
    { key: 'themeName', value: 'Spelling' },
    { key: 'routeSegment', value: 'learning-material' },
    { key: 'contentType', value: 'learningMaterial' },
    { key: 'themeId', value: 'spelling' },
    { key: 'authoredLessonId', value: 'english-spelling-lesson-001' },
    { key: 'legacyManifestId', value: 'spelling-lesson-001' }
  ],
  features: [{ kind: 'guidedContent' }],
  actions: [{ intent: 'resume' }],
  appearances: [
    { key: 'icon', value: '📒' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade3EnglishSpellingAssessment = createLearningNode({
  id: SPELLING_ASSESSMENT_NODE_ID,
  kind: LEARNING_NODE_KINDS.assessment,
  label: 'Assessment',
  parentId: SPELLING_THEME_NODE_ID,
  content: {
    type: 'assessmentExamList',
    exams: grade3SpellingExamDescriptors
  },
  attributes: [
    { key: 'gradeCode', value: 'GD3' },
    { key: 'gradeName', value: 'Grade 3' },
    { key: 'learningAreaCode', value: 'ENG' },
    { key: 'learningAreaName', value: 'English Activities' },
    { key: 'themeName', value: 'Spelling' },
    { key: 'routeSegment', value: 'assessment' },
    { key: 'contentType', value: 'assessment' },
    { key: 'themeId', value: 'spelling' }
  ],
  features: [{ kind: 'assessment' }, { kind: 'timed' }],
  actions: [{ intent: 'takeAssessment' }],
  appearances: [
    { key: 'icon', value: '✅' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

export const grade3EnglishSpellingNodes: LearningNode[] = [
  grade3EnglishThemeSpelling,
  grade3EnglishSpellingLearningMaterial,
  grade3EnglishSpellingAssessment
];
