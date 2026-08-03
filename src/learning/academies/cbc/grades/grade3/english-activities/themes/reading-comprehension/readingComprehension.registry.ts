import grade3ReadingComprehensionLesson from
  '../../../../../../../../academies/cbc/grade-3/english/lessons/reading-comprehension-school-garden-lesson-001.js';
import type { LearningNode } from '../../../../../../../core/index.ts';
import { createLearningNode } from '../../../../../../../core/index.ts';
import { LEARNING_NODE_KINDS } from '../../../../../../../core/learningNode.constants.ts';
import {
  adaptLegacyLearningProblemToBook
} from '../../../../../adapters/legacyLearningProblem.adapter.ts';
import {
  createAssessmentExamDescriptor
} from '../../../assessmentExamDescriptor.ts';

const THEME_NODE_ID = 'grade-3-english-activities-theme-reading-comprehension';
const LEARNING_MATERIAL_NODE_ID = 'gd3-eng-reading-comprehension-learning-material';
const ASSESSMENT_NODE_ID = 'gd3-eng-reading-comprehension-assessment';
const SOURCE_ROOT = 'src/academies/cbc/grade-3/english/assessments/comprehension';

export const grade3ReadingComprehensionExamDescriptors = [
  createAssessmentExamDescriptor({
    manifestId: 'reading-comprehension-class-library-exam-001',
    runtimeExamId: 'reading-comprehension-class-library-exam-001',
    title: 'Grade 3 English Timed Comprehension Exam 1',
    sourceFile: `${SOURCE_ROOT}/reading-comprehension-class-library-exam-001.js`,
    questionCount: 10,
    questionTimeSeconds: 60,
    examMode: 'timed-comprehension'
  }),
  createAssessmentExamDescriptor({
    manifestId: 'grade-3-english-comprehension-faithful-collie-exam-011',
    runtimeExamId: 'grade-3-english-comprehension-faithful-collie-exam-011',
    title: 'Grade 3 English Comprehension Exam 011: The Faithful Collie',
    sourceFile: `${SOURCE_ROOT}/faithful-collie-exam-011.js`,
    questionCount: 20,
    questionTimeSeconds: 60,
    examMode: 'timed-comprehension'
  }),
  createAssessmentExamDescriptor({
    manifestId: 'grade-3-english-comprehension-bear-cub-adventure-exam-012',
    runtimeExamId: 'grade-3-english-comprehension-bear-cub-adventure-exam-012',
    title: "Grade 3 English Comprehension Exam 012: A Bear Cub's Adventure",
    sourceFile: `${SOURCE_ROOT}/bear-cub-adventure-exam-012.js`,
    questionCount: 20,
    questionTimeSeconds: 60,
    examMode: 'timed-comprehension'
  }),
  createAssessmentExamDescriptor({
    manifestId: 'grade-3-english-comprehension-black-beauty-and-ginger-exam-013',
    runtimeExamId: 'grade-3-english-comprehension-black-beauty-and-ginger-exam-013',
    title: 'Grade 3 English Comprehension Exam 013: Black Beauty and Ginger',
    sourceFile: `${SOURCE_ROOT}/black-beauty-and-ginger-exam-013.js`,
    questionCount: 20,
    questionTimeSeconds: 60,
    examMode: 'timed-comprehension'
  }),
  createAssessmentExamDescriptor({
    manifestId: 'grade-3-english-comprehension-john-and-the-cherries-exam-014',
    runtimeExamId: 'grade-3-english-comprehension-john-and-the-cherries-exam-014',
    title: 'Grade 3 English Comprehension Exam 014: John and the Cherries',
    sourceFile: `${SOURCE_ROOT}/john-and-the-cherries-exam-014.js`,
    questionCount: 20,
    questionTimeSeconds: 60,
    examMode: 'timed-comprehension'
  }),
  createAssessmentExamDescriptor({
    manifestId: 'grade-3-english-comprehension-camping-holiday-exam-015',
    runtimeExamId: 'grade-3-english-comprehension-camping-holiday-exam-015',
    title: 'Grade 3 English Comprehension Exam 015: A Camping Holiday',
    sourceFile: `${SOURCE_ROOT}/camping-holiday-exam-015.js`,
    questionCount: 20,
    questionTimeSeconds: 60,
    examMode: 'timed-comprehension'
  }),
  createAssessmentExamDescriptor({
    manifestId: 'grade-3-english-comprehension-lion-and-the-mouse-exam-016',
    runtimeExamId: 'grade-3-english-comprehension-lion-and-the-mouse-exam-016',
    title: 'Grade 3 English Comprehension Exam 016: The Lion and the Mouse',
    sourceFile: `${SOURCE_ROOT}/lion-and-the-mouse-exam-016.js`,
    questionCount: 20,
    questionTimeSeconds: 60,
    examMode: 'timed-comprehension'
  }),
  createAssessmentExamDescriptor({
    manifestId: 'grade-3-english-comprehension-fox-and-the-goat-exam-017',
    runtimeExamId: 'grade-3-english-comprehension-fox-and-the-goat-exam-017',
    title: 'Grade 3 English Comprehension Exam 017: The Fox and the Goat',
    sourceFile: `${SOURCE_ROOT}/fox-and-the-goat-exam-017.js`,
    questionCount: 20,
    questionTimeSeconds: 60,
    examMode: 'timed-comprehension'
  }),
  createAssessmentExamDescriptor({
    manifestId: 'grade-3-english-comprehension-tom-thumb-exam-018',
    runtimeExamId: 'grade-3-english-comprehension-tom-thumb-exam-018',
    title: 'Grade 3 English Comprehension Exam 018: Tom Thumb',
    sourceFile: `${SOURCE_ROOT}/tom-thumb-exam-018.js`,
    questionCount: 20,
    questionTimeSeconds: 60,
    examMode: 'timed-comprehension'
  }),
  createAssessmentExamDescriptor({
    manifestId: 'grade-3-english-comprehension-some-useful-finds-exam-019',
    runtimeExamId: 'grade-3-english-comprehension-some-useful-finds-exam-019',
    title: 'Grade 3 English Comprehension Exam 019: Some Useful Finds',
    sourceFile: `${SOURCE_ROOT}/some-useful-finds-exam-019.js`,
    questionCount: 20,
    questionTimeSeconds: 60,
    examMode: 'timed-comprehension'
  }),
  createAssessmentExamDescriptor({
    manifestId: 'grade-3-english-comprehension-raman-meets-the-rocking-horse-exam-020',
    runtimeExamId: 'grade-3-english-comprehension-raman-meets-the-rocking-horse-exam-020',
    title: 'Grade 3 English Comprehension Exam 020: Raman Meets the Rocking-Horse',
    sourceFile: `${SOURCE_ROOT}/raman-meets-the-rocking-horse-exam-020.js`,
    questionCount: 20,
    questionTimeSeconds: 60,
    examMode: 'timed-comprehension'
  })
];

const learningMaterialBook = adaptLegacyLearningProblemToBook(
  grade3ReadingComprehensionLesson,
  {
    manifestId: 'reading-comprehension-school-garden-lesson-001',
    pageSubtitle: 'Learning Material',
    pageBreakAfterBodyIndexes: [1, 2]
  }
);

const themeNode = createLearningNode({
  id: THEME_NODE_ID,
  kind: LEARNING_NODE_KINDS.theme,
  label: 'Reading Comprehension',
  summary: 'Read passages and answer questions using details from the text.',
  parentId: 'grade-3-english-activities',
  childIds: [LEARNING_MATERIAL_NODE_ID, ASSESSMENT_NODE_ID],
  attributes: [
    { key: 'routeSegment', value: 'reading-comprehension' },
    { key: 'themeId', value: 'reading-comprehension' },
    { key: 'themeName', value: 'Reading Comprehension' },
    { key: 'learningAreaId', value: 'english-activities' },
    { key: 'learningAreaName', value: 'English Activities' }
  ],
  features: [{ kind: 'guidedContent' }, { kind: 'readAloud' }],
  actions: [{ intent: 'openChildren' }],
  appearances: [
    { key: 'icon', value: '📖' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const learningMaterialNode = createLearningNode({
  id: LEARNING_MATERIAL_NODE_ID,
  kind: 'learningMaterial',
  label: 'Learning Material',
  summary: grade3ReadingComprehensionLesson.question,
  parentId: THEME_NODE_ID,
  content: learningMaterialBook,
  attributes: [
    { key: 'gradeCode', value: 'GD3' },
    { key: 'gradeName', value: 'Grade 3' },
    { key: 'learningAreaCode', value: 'ENG' },
    { key: 'learningAreaName', value: 'English Activities' },
    { key: 'themeName', value: 'Reading Comprehension' },
    { key: 'routeSegment', value: 'learning-material' },
    { key: 'contentType', value: 'learningMaterial' },
    { key: 'themeId', value: 'reading-comprehension' },
    {
      key: 'authoredLessonId',
      value: 'english-reading-comprehension-school-garden-lesson-001'
    },
    {
      key: 'legacyManifestId',
      value: 'reading-comprehension-school-garden-lesson-001'
    }
  ],
  features: [{ kind: 'guidedContent' }],
  actions: [{ intent: 'resume' }],
  appearances: [
    { key: 'icon', value: '📒' },
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
    exams: grade3ReadingComprehensionExamDescriptors
  },
  attributes: [
    { key: 'gradeCode', value: 'GD3' },
    { key: 'gradeName', value: 'Grade 3' },
    { key: 'learningAreaCode', value: 'ENG' },
    { key: 'learningAreaName', value: 'English Activities' },
    { key: 'themeName', value: 'Reading Comprehension' },
    { key: 'routeSegment', value: 'assessment' },
    { key: 'contentType', value: 'assessment' },
    { key: 'themeId', value: 'reading-comprehension' }
  ],
  features: [{ kind: 'assessment' }, { kind: 'timed' }],
  actions: [{ intent: 'takeAssessment' }],
  appearances: [
    { key: 'icon', value: '✅' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

export const grade3EnglishReadingComprehensionNodes: LearningNode[] = [
  themeNode,
  learningMaterialNode,
  assessmentNode
];