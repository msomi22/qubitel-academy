import type { LearningNode } from '../../../../../../../core/index.ts';
import { createLearningNode } from '../../../../../../../core/index.ts';
import { LEARNING_NODE_KINDS } from '../../../../../../../core/learningNode.constants.ts';

const schoolLearningMaterialBook = {
  type: 'book',
  title: 'Learning Material',
  description: 'In this lesson, you will learn about school environment and activities.',
  pages: [
    {
      title: 'School',
      subtitle: 'Learning Material',
      blocks: [
        {
          title: 'School',
          text: 'In this lesson, you will learn about school environment and activities.'
        }
      ]
    }
  ]
};

const schoolLessonPlanBook = {
  type: 'book',
  title: 'Lesson Plan',
  description: 'Teacher focus: guide learners to talk about school environment and activities.',
  pages: [
    {
      title: 'Lesson Plan',
      subtitle: 'School',
      blocks: [
        {
          title: 'Teacher focus',
          text: 'Teacher focus: guide learners to talk about school environment and activities.'
        }
      ]
    }
  ]
};

const grade1EnglishThemeSchool = createLearningNode({
  id: 'grade-1-english-activities-theme-school',
  kind: LEARNING_NODE_KINDS.theme,
  label: 'School',
  summary: 'Learn about school environment and activities.',
  parentId: 'grade-1-english-activities',
  childIds: [
    'gd1-eng-school-learning-material',
    'gd1-eng-school-practice',
    'gd1-eng-school-assessment',
    'gd1-eng-school-lesson-plan'
  ],
  attributes: [
    { key: 'routeSegment', value: 'school' },
    { key: 'themeId', value: 'school' },
    { key: 'themeName', value: 'School' },
    { key: 'learningAreaId', value: 'english-activities' },
    { key: 'learningAreaName', value: 'English Activities' }
  ],
  features: [{ kind: 'guidedContent' }, { kind: 'readAloud' }],
  actions: [{ intent: 'openChildren' }],
  appearances: [
    { key: 'icon', value: '🏫' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade1EnglishSchoolLearningMaterial = createLearningNode({
  id: 'gd1-eng-school-learning-material',
  kind: 'learningMaterial',
  label: 'Learning Material',
  summary: 'Learn about school environment and activities.',
  parentId: grade1EnglishThemeSchool.id,
  content: schoolLearningMaterialBook,
  attributes: [
    { key: 'gradeCode', value: 'GD1' },
    { key: 'gradeName', value: 'Grade 1' },
    { key: 'learningAreaCode', value: 'ENG' },
    { key: 'learningAreaName', value: 'English Activities' },
    { key: 'themeName', value: 'School' },
    { key: 'routeSegment', value: 'learning-material' },
    { key: 'contentType', value: 'learningMaterial' },
    { key: 'themeId', value: 'school' }
  ],
  features: [{ kind: 'readAloud' }, { kind: 'guidedContent' }],
  actions: [{ intent: 'resume' }],
  appearances: [
    { key: 'icon', value: '📒' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade1EnglishSchoolPractice = createLearningNode({
  id: 'gd1-eng-school-practice',
  kind: LEARNING_NODE_KINDS.practice,
  label: 'Practice',
  summary: 'Practise school-related vocabulary and reading skills.',
  parentId: grade1EnglishThemeSchool.id,
  content: {
    content: 'School practice content is being prepared.'
  },
  attributes: [
    { key: 'gradeCode', value: 'GD1' },
    { key: 'gradeName', value: 'Grade 1' },
    { key: 'learningAreaCode', value: 'ENG' },
    { key: 'learningAreaName', value: 'English Activities' },
    { key: 'themeName', value: 'School' },
    { key: 'routeSegment', value: 'practice' },
    { key: 'contentType', value: 'practice' },
    { key: 'themeId', value: 'school' }
  ],
  features: [{ kind: 'practice' }, { kind: 'readAloud' }],
  actions: [{ intent: 'startPractice' }],
  appearances: [
    { key: 'icon', value: '✏️' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const schoolAssessmentExam1 = {
  id: 'grade-1-reading-readiness-exam-001',
  title: 'Exam 1: Picture and Object Matching',
  description: 'Match pictures to the correct words.',
  estimatedTime: '15 min',
  questions: [],
  metadata: {
    gradeCode: 'GD1',
    gradeName: 'Grade 1',
    learningAreaCode: 'ENG',
    learningAreaName: 'English Activities',
    themeName: 'School',
    examId: 'grade-1-reading-readiness-exam-001',
    examTitle: 'Exam 1: Picture and Object Matching',
    assessmentType: 'exam',
    questionCount: 15
  }
};

const schoolAssessmentExam2 = {
  id: 'grade-1-reading-word-mastery-exam-002',
  title: 'Exam 2: Beginning Sounds B, C and D',
  description: 'Recognise and read three-letter words with beginning sounds B, C, and D.',
  estimatedTime: '20 min',
  questions: [],
  metadata: {
    gradeCode: 'GD1',
    gradeName: 'Grade 1',
    learningAreaCode: 'ENG',
    learningAreaName: 'English Activities',
    themeName: 'School',
    examId: 'grade-1-reading-word-mastery-exam-002',
    examTitle: 'Exam 2: Beginning Sounds B, C and D',
    assessmentType: 'exam',
    questionCount: 20
  }
};

const schoolAssessmentExam3 = {
  id: 'grade-1-reading-word-mastery-exam-003',
  title: 'Exam 3: Beginning Sounds F, G and H',
  description: 'Recognise and read three-letter words with beginning sounds F, G, and H.',
  estimatedTime: '20 min',
  questions: [],
  metadata: {
    gradeCode: 'GD1',
    gradeName: 'Grade 1',
    learningAreaCode: 'ENG',
    learningAreaName: 'English Activities',
    themeName: 'School',
    examId: 'grade-1-reading-word-mastery-exam-003',
    examTitle: 'Exam 3: Beginning Sounds F, G and H',
    assessmentType: 'exam',
    questionCount: 20
  }
};

const schoolAssessmentExam4 = {
  id: 'grade-1-reading-word-mastery-exam-004',
  title: 'Exam 4: Beginning Sounds J, K and L',
  description: 'Recognise and read three-letter words with beginning sounds J, K, and L.',
  estimatedTime: '20 min',
  questions: [],
  metadata: {
    gradeCode: 'GD1',
    gradeName: 'Grade 1',
    learningAreaCode: 'ENG',
    learningAreaName: 'English Activities',
    themeName: 'School',
    examId: 'grade-1-reading-word-mastery-exam-004',
    examTitle: 'Exam 4: Beginning Sounds J, K and L',
    assessmentType: 'exam',
    questionCount: 20
  }
};

const schoolAssessmentExam5 = {
  id: 'grade-1-reading-word-mastery-exam-005',
  title: 'Exam 5: Beginning Sounds M, N, P, R, S and T',
  description: 'Recognise and read three-letter words with beginning sounds M, N, P, R, S, and T.',
  estimatedTime: '10 min',
  questions: [],
  metadata: {
    gradeCode: 'GD1',
    gradeName: 'Grade 1',
    learningAreaCode: 'ENG',
    learningAreaName: 'English Activities',
    themeName: 'School',
    examId: 'grade-1-reading-word-mastery-exam-005',
    examTitle: 'Exam 5: Beginning Sounds M, N, P, R, S and T',
    assessmentType: 'exam',
    questionCount: 10
  }
};

const schoolAssessmentExam6 = {
  id: 'grade-1-reading-word-mastery-exam-006',
  title: 'Exam 6: Beginning Sounds V, W, Y and Z',
  description: 'Recognise and read words with beginning sounds V, W, Y, and Z.',
  estimatedTime: '10 min',
  questions: [],
  metadata: {
    gradeCode: 'GD1',
    gradeName: 'Grade 1',
    learningAreaCode: 'ENG',
    learningAreaName: 'English Activities',
    themeName: 'School',
    examId: 'grade-1-reading-word-mastery-exam-006',
    examTitle: 'Exam 6: Beginning Sounds V, W, Y and Z',
    assessmentType: 'exam',
    questionCount: 10
  }
};

const grade1EnglishSchoolAssessment = createLearningNode({
  id: 'gd1-eng-school-assessment',
  kind: LEARNING_NODE_KINDS.assessment,
  label: 'Assessment',
  summary: 'Check your understanding of school-themed vocabulary and reading.',
  parentId: grade1EnglishThemeSchool.id,
  content: {
    type: 'assessmentExamList',
    exams: [
      schoolAssessmentExam1,
      schoolAssessmentExam2,
      schoolAssessmentExam3,
      schoolAssessmentExam4,
      schoolAssessmentExam5,
      schoolAssessmentExam6
    ]
  },
  attributes: [
    { key: 'gradeCode', value: 'GD1' },
    { key: 'gradeName', value: 'Grade 1' },
    { key: 'learningAreaCode', value: 'ENG' },
    { key: 'learningAreaName', value: 'English Activities' },
    { key: 'themeName', value: 'School' },
    { key: 'routeSegment', value: 'assessment' },
    { key: 'contentType', value: 'assessment' },
    { key: 'themeId', value: 'school' }
  ],
  features: [{ kind: 'assessment' }, { kind: 'timed' }],
  actions: [{ intent: 'takeAssessment' }],
  appearances: [
    { key: 'icon', value: '✅' },
    { key: 'tone', value: 'childFriendly' }
  ],
  version: 1
});

const grade1EnglishSchoolLessonPlan = createLearningNode({
  id: 'gd1-eng-school-lesson-plan',
  kind: 'lessonPlan',
  label: 'Lesson Plan',
  summary: 'Teacher-facing lesson plan for the School theme.',
  parentId: grade1EnglishThemeSchool.id,
  content: schoolLessonPlanBook,
  attributes: [
    { key: 'gradeCode', value: 'GD1' },
    { key: 'gradeName', value: 'Grade 1' },
    { key: 'learningAreaCode', value: 'ENG' },
    { key: 'learningAreaName', value: 'English Activities' },
    { key: 'themeName', value: 'School' },
    { key: 'routeSegment', value: 'lesson-plan' },
    { key: 'contentType', value: 'lessonPlan' },
    { key: 'themeId', value: 'school' }
  ],
  features: [{ kind: 'guidedContent' }],
  actions: [{ intent: 'resume' }],
  appearances: [
    { key: 'icon', value: '🧑‍🏫' },
    { key: 'tone', value: 'teacherFacing' }
  ],
  version: 1
});

export const grade1EnglishSchoolNodes: LearningNode[] = [
  grade1EnglishThemeSchool,
  grade1EnglishSchoolLearningMaterial,
  grade1EnglishSchoolPractice,
  grade1EnglishSchoolAssessment,
  grade1EnglishSchoolLessonPlan
];