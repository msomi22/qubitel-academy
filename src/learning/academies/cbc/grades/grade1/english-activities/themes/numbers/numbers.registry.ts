import type { LearningNode } from '../../../../../../../core/index.ts';
import { createLearningNode } from '../../../../../../../core/index.ts';
import { LEARNING_NODE_KINDS } from '../../../../../../../core/learningNode.constants.ts';

const numbersLearningMaterialBook = {
  type: 'book',
  title: 'Learning Material',
  description: 'In this lesson, you will learn to read, say, and recognise numbers.',
  pages: [
    {
      title: 'Numbers',
      subtitle: 'Learning Material',
      blocks: [
        {
          title: 'Numbers',
          text: 'In this lesson, you will learn to read, say, and recognise numbers.'
        }
      ]
    }
  ]
};

const numbersLessonPlanBook = {
  type: 'book',
  title: 'Lesson Plan',
  description: 'Teacher focus: guide learners to recognise, say, and use numbers in simple classroom activities.',
  pages: [
    {
      title: 'Lesson Plan',
      subtitle: 'Numbers',
      blocks: [
        {
          title: 'Teacher focus',
          text: 'Teacher focus: guide learners to recognise, say, and use numbers in simple classroom activities.'
        }
      ]
    }
  ]
};

const grade1EnglishThemeNumbers = createLearningNode({
  id: 'grade-1-english-activities-theme-numbers',
  kind: LEARNING_NODE_KINDS.theme,
  label: 'Numbers',
  summary: 'Learn about numbers and counting.',
  parentId: 'grade-1-english-activities',
  childIds: [
    'gd1-eng-numbers-learning-material',
    'gd1-eng-numbers-practice',
    'gd1-eng-numbers-assessment',
    'gd1-eng-numbers-lesson-plan'
  ],
  attributes: [
    { key: 'routeSegment', value: 'numbers' },
    { key: 'themeId', value: 'numbers' },
    { key: 'themeName', value: 'Numbers' },
    { key: 'learningAreaId', value: 'english-activities' },
    { key: 'learningAreaName', value: 'English Activities' }
  ],
  features: [{ kind: 'guidedContent' }, { kind: 'readAloud' }],
  actions: [{ intent: 'openChildren' }],
  appearances: [
    { key: 'icon', value: '🔢' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade1EnglishNumbersLearningMaterial = createLearningNode({
  id: 'gd1-eng-numbers-learning-material',
  kind: 'learningMaterial',
  label: 'Learning Material',
  summary: 'In this lesson, you will learn to read, say, and recognise numbers.',
  parentId: grade1EnglishThemeNumbers.id,
  content: numbersLearningMaterialBook,
  attributes: [
    { key: 'gradeCode', value: 'GD1' },
    { key: 'gradeName', value: 'Grade 1' },
    { key: 'learningAreaCode', value: 'ENG' },
    { key: 'learningAreaName', value: 'English Activities' },
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

const grade1EnglishNumbersPractice = createLearningNode({
  id: 'gd1-eng-numbers-practice',
  kind: LEARNING_NODE_KINDS.practice,
  label: 'Practice',
  summary: 'Practise reading, hearing, and recognising numbers.',
  parentId: grade1EnglishThemeNumbers.id,
  content: {
    type: 'practiceCardList',
    cards: [
      {
        id: 'gd1-eng-numbers-101-practice',
        title: 'Counting Numbers',
        description: 'Practise reading, hearing, and recognising numbers.',
        targetProblemId: 'numbers-1-100-lesson-001',
        href: '/problem/numbers-1-100-lesson-001?backPath=/gd1/eng/numbers%3Ftab%3Dpractice&backLabel=Back',
        status: 'Ready'
      }
    ]
  },
  attributes: [
    { key: 'gradeCode', value: 'GD1' },
    { key: 'gradeName', value: 'Grade 1' },
    { key: 'learningAreaCode', value: 'ENG' },
    { key: 'learningAreaName', value: 'English Activities' },
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

const grade1EnglishNumbersLessonPlan = createLearningNode({
  id: 'gd1-eng-numbers-lesson-plan',
  kind: 'lessonPlan',
  label: 'Lesson Plan',
  summary: 'Teacher-facing lesson plan for the Numbers theme.',
  parentId: grade1EnglishThemeNumbers.id,
  content: numbersLessonPlanBook,
  attributes: [
    { key: 'gradeCode', value: 'GD1' },
    { key: 'gradeName', value: 'Grade 1' },
    { key: 'learningAreaCode', value: 'ENG' },
    { key: 'learningAreaName', value: 'English Activities' },
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

const grade1EnglishNumbersAssessment = createLearningNode({
  id: 'gd1-eng-numbers-assessment',
  kind: LEARNING_NODE_KINDS.assessment,
  label: 'Assessment',
  summary: 'Check your understanding of numbers.',
  parentId: grade1EnglishThemeNumbers.id,
  content: {
    content: 'Numbers assessment is being prepared.'
  },
  attributes: [
    { key: 'gradeCode', value: 'GD1' },
    { key: 'gradeName', value: 'Grade 1' },
    { key: 'learningAreaCode', value: 'ENG' },
    { key: 'learningAreaName', value: 'English Activities' },
    { key: 'themeName', value: 'Numbers' },
    { key: 'routeSegment', value: 'assessment' },
    { key: 'contentType', value: 'assessment' },
    { key: 'themeId', value: 'numbers' }
  ],
  features: [{ kind: 'assessment' }],
  actions: [{ intent: 'takeAssessment' }],
  appearances: [
    { key: 'icon', value: '✅' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

export const grade1EnglishNumbersNodes: LearningNode[] = [
  grade1EnglishThemeNumbers,
  grade1EnglishNumbersLearningMaterial,
  grade1EnglishNumbersPractice,
  grade1EnglishNumbersAssessment,
  grade1EnglishNumbersLessonPlan
];