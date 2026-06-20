export const LEARNING_NODE_KINDS = {
  platform: 'platform',
  academy: 'academy',
  category: 'category',
  grade: 'grade',
  learningArea: 'learningArea',
  theme: 'theme',
  strand: 'strand',
  subStrand: 'subStrand',
  topic: 'topic',
  lesson: 'lesson',
  question: 'question',
  practice: 'practice',
  assessment: 'assessment',
  exam: 'exam',
  notes: 'notes',
  revision: 'revision',
  activity: 'activity'
} as const;

export const LEARNING_NODE_FEATURES = {
  guidedContent: 'guidedContent',
  practice: 'practice',
  assessment: 'assessment',
  readAloud: 'readAloud',
  aiTutor: 'aiTutor',
  videoLesson: 'videoLesson',
  parentReview: 'parentReview',
  teacherAssignment: 'teacherAssignment'
} as const;

export const LEARNING_NODE_ACTION_INTENTS = {
  openChildren: 'openChildren',
  resume: 'resume',
  startGuidedLearning: 'startGuidedLearning',
  startPractice: 'startPractice',
  takeAssessment: 'takeAssessment',
  startExam: 'startExam',
  reviewResults: 'reviewResults',
  readAloud: 'readAloud'
} as const;

export const LEARNING_NODE_APPEARANCE_KEYS = {
  layout: 'layout',
  density: 'density',
  tone: 'tone',
  icon: 'icon',
  animation: 'animation',
  mascot: 'mascot',
  soundEffect: 'soundEffect'
} as const;

export const DEFAULT_LEARNING_NODE_VERSION = 1;
