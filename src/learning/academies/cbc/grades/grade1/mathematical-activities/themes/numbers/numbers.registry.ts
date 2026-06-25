import type { LearningNode } from '../../../../../../../core/index.ts';
import { createLearningNode } from '../../../../../../../core/index.ts';
import { LEARNING_NODE_KINDS } from '../../../../../../../core/learningNode.constants.ts';

const numbersLearningMaterialBook = {
  type: 'book',
  title: 'Learning Material',
  description: 'In this lesson, you will learn about numbers and counting.',
  pages: [
    {
      title: 'Numbers',
      subtitle: 'Learning Material',
      blocks: [
        {
          title: 'Numbers',
          text: 'In this lesson, you will learn about numbers and counting.'
        }
      ]
    }
  ]
};

const numbersLessonPlanBook = {
  type: 'book',
  title: 'Lesson Plan',
  description: 'Teacher focus: guide learners to count, read, and write numbers.',
  pages: [
    {
      title: 'Lesson Plan',
      subtitle: 'Numbers',
      blocks: [
        {
          title: 'Teacher focus',
          text: 'Teacher focus: guide learners to count, read, and write numbers.'
        }
      ]
    }
  ]
};

const grade1MathThemeNumbers = createLearningNode({
  id: 'grade-1-mathematical-activities-theme-numbers',
  kind: LEARNING_NODE_KINDS.theme,
  label: 'Numbers',
  summary: 'Learn about numbers and counting.',
  parentId: 'grade-1-mathematical-activities',
  childIds: [
    'gd1-math-numbers-learning-material',
    'gd1-math-numbers-practice',
    'gd1-math-numbers-assessment',
    'gd1-math-numbers-lesson-plan'
  ],
  attributes: [
    { key: 'routeSegment', value: 'numbers' },
    { key: 'themeId', value: 'numbers' },
    { key: 'themeName', value: 'Numbers' },
    { key: 'learningAreaId', value: 'mathematical-activities' },
    { key: 'learningAreaName', value: 'Mathematical Activities' }
  ],
  features: [{ kind: 'guidedContent' }, { kind: 'readAloud' }],
  actions: [{ intent: 'openChildren' }],
  appearances: [
    { key: 'icon', value: '🔢' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade1MathNumbersLearningMaterial = createLearningNode({
  id: 'gd1-math-numbers-learning-material',
  kind: 'learningMaterial',
  label: 'Learning Material',
  summary: 'Learn about numbers and counting.',
  parentId: grade1MathThemeNumbers.id,
  content: numbersLearningMaterialBook,
  attributes: [
    { key: 'gradeCode', value: 'GD1' },
    { key: 'gradeName', value: 'Grade 1' },
    { key: 'learningAreaCode', value: 'MATH' },
    { key: 'learningAreaName', value: 'Mathematical Activities' },
    { key: 'themeName', value: 'Numbers' },
    { key: 'routeSegment', value: 'learning-material' },
    { key: 'contentType', value: 'learningMaterial' },
    { key: 'themeId', value: 'numbers' }
  ],
  features: [{ kind: 'readAloud' }, { kind: 'guidedContent' }],
  actions: [{ intent: 'resume' }],
  appearances: [
    { key: 'icon', value: '📒' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade1MathNumbersPractice = createLearningNode({
  id: 'gd1-math-numbers-practice',
  kind: LEARNING_NODE_KINDS.practice,
  label: 'Practice',
  summary: 'Practise counting numbers.',
  parentId: grade1MathThemeNumbers.id,
  content: {
    type: 'practiceCardList',
    cards: [
      {
        id: 'gd1-math-numbers-practice-card-001',
        title: 'Counting Numbers',
        description: 'Practise counting and recognising numbers.',
        targetProblemId: 'numbers-practice-001',
        href: '/problem/numbers-practice-001?backPath=/gd1/mathematical-activities/numbers%3Ftab%3Dpractice&backLabel=Back',
        status: 'Ready'
      }
    ]
  },
  attributes: [
    { key: 'gradeCode', value: 'GD1' },
    { key: 'gradeName', value: 'Grade 1' },
    { key: 'learningAreaCode', value: 'MATH' },
    { key: 'learningAreaName', value: 'Mathematical Activities' },
    { key: 'themeName', value: 'Numbers' },
    { key: 'routeSegment', value: 'practice' },
    { key: 'contentType', value: 'practice' },
    { key: 'themeId', value: 'numbers' }
  ],
  features: [{ kind: 'practice' }, { kind: 'readAloud' }],
  actions: [{ intent: 'startPractice' }],
  appearances: [
    { key: 'icon', value: '✏️' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const numbersAssessmentExam = {
  id: 'grade-1-mathematics-numbers-exam-001',
  title: 'Exam 1: Numbers',
  description: 'Count objects and choose the correct number.',
  estimatedTime: '15 min',
  questions: [],
  metadata: {
    gradeCode: 'GD1',
    gradeName: 'Grade 1',
    learningAreaCode: 'MATH',
    learningAreaName: 'Mathematical Activities',
    themeName: 'Numbers',
    examId: 'grade-1-mathematics-numbers-exam-001',
    examTitle: 'Exam 1: Numbers',
    assessmentType: 'exam',
    questionCount: 15
  }
};

const grade1MathNumbersAssessment = createLearningNode({
  id: 'gd1-math-numbers-assessment',
  kind: LEARNING_NODE_KINDS.assessment,
  label: 'Assessment',
  summary: 'Check your understanding of numbers and counting.',
  parentId: grade1MathThemeNumbers.id,
  content: {
    type: 'assessmentExamList',
    exams: [numbersAssessmentExam]
  },
  attributes: [
    { key: 'gradeCode', value: 'GD1' },
    { key: 'gradeName', value: 'Grade 1' },
    { key: 'learningAreaCode', value: 'MATH' },
    { key: 'learningAreaName', value: 'Mathematical Activities' },
    { key: 'themeName', value: 'Numbers' },
    { key: 'routeSegment', value: 'assessment' },
    { key: 'contentType', value: 'assessment' },
    { key: 'themeId', value: 'numbers' }
  ],
  features: [{ kind: 'assessment' }, { kind: 'timed' }],
  actions: [{ intent: 'takeAssessment' }],
  appearances: [
    { key: 'icon', value: '✅' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade1MathNumbersLessonPlan = createLearningNode({
  id: 'gd1-math-numbers-lesson-plan',
  kind: 'lessonPlan',
  label: 'Lesson Plan',
  summary: 'Teacher-facing lesson plan for the Numbers theme.',
  parentId: grade1MathThemeNumbers.id,
  content: numbersLessonPlanBook,
  attributes: [
    { key: 'gradeCode', value: 'GD1' },
    { key: 'gradeName', value: 'Grade 1' },
    { key: 'learningAreaCode', value: 'MATH' },
    { key: 'learningAreaName', value: 'Mathematical Activities' },
    { key: 'themeName', value: 'Numbers' },
    { key: 'routeSegment', value: 'lesson-plan' },
    { key: 'contentType', value: 'lessonPlan' },
    { key: 'themeId', value: 'numbers' }
  ],
  features: [{ kind: 'guidedContent' }],
  actions: [{ intent: 'resume' }],
  appearances: [
    { key: 'icon', value: '🧑‍🏫' },
    { key: 'tone', value: 'teacherFacing' }
  ],
  version: 1
});

export const grade1MathNumbersNodes: LearningNode[] = [
  grade1MathThemeNumbers,
  grade1MathNumbersLearningMaterial,
  grade1MathNumbersPractice,
  grade1MathNumbersAssessment,
  grade1MathNumbersLessonPlan
];