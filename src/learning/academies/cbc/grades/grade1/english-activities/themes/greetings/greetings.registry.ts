import type { LearningNode } from '../../../../../../../core/index.ts';
import { createLearningNode } from '../../../../../../../core/index.ts';
import { LEARNING_NODE_KINDS } from '../../../../../../../core/learningNode.constants.ts';
import { greetingsLearningMaterialBook } from './notes/greetingsLearningMaterial.book.ts';
import { greetingsLessonPlanBook } from './notes/greetingsLessonPlan.book.ts';

const grade1EnglishThemeGreetings = createLearningNode({
  id: 'grade-1-english-activities-theme-greetings',
  kind: LEARNING_NODE_KINDS.theme,
  label: 'Greetings',
  summary: 'Learn how to greet people in different situations.',
  parentId: 'grade-1-english-activities',
  childIds: [
    'gd1-eng-greetings-learning-material',
    'gd1-eng-greetings-practice',
    'gd1-eng-greetings-assessment',
    'gd1-eng-greetings-lesson-plan'
  ],
  attributes: [
    { key: 'routeSegment', value: 'greetings' },
    { key: 'themeId', value: 'greetings' },
    { key: 'themeName', value: 'Greetings' },
    { key: 'learningAreaId', value: 'english-activities' },
    { key: 'learningAreaName', value: 'English Activities' }
  ],
  features: [{ kind: 'guidedContent' }, { kind: 'readAloud' }],
  actions: [{ intent: 'openChildren' }],
  appearances: [
    { key: 'icon', value: '👋' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade1EnglishGreetingsLearningMaterial = createLearningNode({
  id: 'gd1-eng-greetings-learning-material',
  kind: 'learningMaterial',
  label: 'Learning Material',
  summary: 'Learn how to greet people politely at different times and in different situations.',
  parentId: grade1EnglishThemeGreetings.id,
  content: greetingsLearningMaterialBook,
  attributes: [
    { key: 'gradeCode', value: 'GD1' },
    { key: 'gradeName', value: 'Grade 1' },
    { key: 'learningAreaCode', value: 'ENG' },
    { key: 'learningAreaName', value: 'English Activities' },
    { key: 'themeName', value: 'Greetings' },
    { key: 'routeSegment', value: 'learning-material' },
    { key: 'contentType', value: 'learningMaterial' },
    { key: 'themeId', value: 'greetings' }
  ],
  features: [{ kind: 'readAloud' }, { kind: 'guidedContent' }],
  actions: [{ intent: 'resume' }],
  appearances: [
    { key: 'icon', value: '📒' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade1EnglishGreetingsPractice = createLearningNode({
  id: 'gd1-eng-greetings-practice',
  kind: LEARNING_NODE_KINDS.practice,
  label: 'Practice',
  summary: 'Practice using greetings politely.',
  parentId: grade1EnglishThemeGreetings.id,
  content: {
    type: 'practiceCardList',
    cards: [
      {
        id: 'gd1-eng-greetings-pronunciation-vocabulary-practice',
        title: 'Pronunciation and Vocabulary',
        description: 'Practise greeting words, letter sounds, and polite responses.',
        targetProblemId: 'alphabet-mastery-lesson-001',
        href: '/problem/alphabet-mastery-lesson-001?backPath=/gd1/eng/greetings%3Ftab%3Dpractice&backLabel=Back',
        status: 'Ready'
      }
    ]
  },
  attributes: [
    { key: 'gradeCode', value: 'GD1' },
    { key: 'gradeName', value: 'Grade 1' },
    { key: 'learningAreaCode', value: 'ENG' },
    { key: 'learningAreaName', value: 'English Activities' },
    { key: 'themeName', value: 'Greetings' },
    { key: 'routeSegment', value: 'practice' },
    { key: 'contentType', value: 'practice' },
    { key: 'themeId', value: 'greetings' }
  ],
  features: [{ kind: 'practice' }, { kind: 'readAloud' }],
  actions: [{ intent: 'startPractice' }],
  appearances: [
    { key: 'icon', value: '✏️' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade1EnglishGreetingsLessonPlan = createLearningNode({
  id: 'gd1-eng-greetings-lesson-plan',
  kind: 'lessonPlan',
  label: 'Lesson Plan',
  summary: 'Teacher-facing lesson plan for the Greetings theme.',
  parentId: grade1EnglishThemeGreetings.id,
  content: greetingsLessonPlanBook,
  attributes: [
    { key: 'gradeCode', value: 'GD1' },
    { key: 'gradeName', value: 'Grade 1' },
    { key: 'learningAreaCode', value: 'ENG' },
    { key: 'learningAreaName', value: 'English Activities' },
    { key: 'themeName', value: 'Greetings' },
    { key: 'routeSegment', value: 'lesson-plan' },
    { key: 'contentType', value: 'lessonPlan' },
    { key: 'themeId', value: 'greetings' }
  ],
  features: [{ kind: 'guidedContent' }],
  actions: [{ intent: 'resume' }],
  appearances: [
    { key: 'icon', value: '🧑‍🏫' },
    { key: 'tone', value: 'teacherFacing' }
  ],
  version: 1
});

const greetingsAssessmentExam = {
  id: 'gd1-eng-greetings-exam-001',
  title: 'Exam 1: Greetings Check',
  description: 'Check if you can choose polite greeting words and responses.',
  estimatedTime: '5 min',
  questions: [
    {
      question: 'Which greeting do we use in the morning?',
      options: ['Good morning', 'Good evening', 'Good night', 'Goodbye'],
      correctAnswer: 'Good morning',
      explanation: 'Good morning is the greeting we use in the morning.'
    },
    {
      question: 'What do you say when you meet a friend?',
      options: ['Hello', 'Sleep', 'Run', 'Book'],
      correctAnswer: 'Hello',
      explanation: 'Hello is a polite greeting.'
    },
    {
      question: 'What can you say when someone asks “How are you?”',
      options: ['Fine, thank you', 'Good night', 'Good afternoon', 'Goodbye'],
      correctAnswer: 'Fine, thank you',
      explanation: 'Fine, thank you is a polite response.'
    },
    {
      question: 'Which greeting can we use after lunch?',
      options: ['Good afternoon', 'Good morning', 'Good night', 'Thank you'],
      correctAnswer: 'Good afternoon',
      explanation: 'Good afternoon is used after midday.'
    },
    {
      question: 'Which greeting can we use in the evening?',
      options: ['Good evening', 'Good morning', 'Hello book', 'Fine chair'],
      correctAnswer: 'Good evening',
      explanation: 'Good evening is used in the evening.'
    }
  ],
  metadata: {
    gradeCode: 'GD1',
    gradeName: 'Grade 1',
    learningAreaCode: 'ENG',
    learningAreaName: 'English Activities',
    themeName: 'Greetings',
    examId: 'gd1-eng-greetings-exam-001',
    examTitle: 'Exam 1: Greetings Check',
    assessmentType: 'exam',
    questionCount: 5
  }
};

const grade1EnglishGreetingsAssessment = createLearningNode({
  id: 'gd1-eng-greetings-assessment',
  kind: LEARNING_NODE_KINDS.assessment,
  label: 'Assessment',
  summary: 'Check your understanding of greetings.',
  parentId: grade1EnglishThemeGreetings.id,
  content: {
    type: 'assessmentExamList',
    exams: [greetingsAssessmentExam]
  },
  attributes: [
    { key: 'gradeCode', value: 'GD1' },
    { key: 'gradeName', value: 'Grade 1' },
    { key: 'learningAreaCode', value: 'ENG' },
    { key: 'learningAreaName', value: 'English Activities' },
    { key: 'themeName', value: 'Greetings' },
    { key: 'routeSegment', value: 'assessment' },
    { key: 'contentType', value: 'assessment' },
    { key: 'themeId', value: 'greetings' }
  ],
  features: [{ kind: 'assessment' }, { kind: 'timed' }],
  actions: [{ intent: 'takeAssessment' }],
  appearances: [
    { key: 'icon', value: '✅' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

export const grade1EnglishGreetingsNodes: LearningNode[] = [
  grade1EnglishThemeGreetings,
  grade1EnglishGreetingsLearningMaterial,
  grade1EnglishGreetingsPractice,
  grade1EnglishGreetingsAssessment,
  grade1EnglishGreetingsLessonPlan
];