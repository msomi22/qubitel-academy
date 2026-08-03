import { defineMcqProblem } from '../../../../../../problems/problemAuthoring.js';

const examId = 'gd1-eng-greetings-exam-001';
const examTitle = 'Exam 1: Greetings Check';
const learningAreaId = 'listening-speaking';
const questionTimeSeconds = 60;
const sequenceBase = 300;

const questions = [
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
];

const examQuestions = questions.map((item, index) => defineMcqProblem({
  id: `${examId}-q${String(index + 1).padStart(3, '0')}`,
  category: 'grade-1',
  topicId: 'english',
  title: `${examTitle} Question ${index + 1}`,
  difficulty: 'Easy',
  estimatedTime: '1 min',
  estimatedTimeSeconds: questionTimeSeconds,
  interactionType: 'mcq',
  question: item.question,
  readAloud: true,
  autoReadAloud: false,
  readAloudText: item.question,
  readOptionsAloud: true,
  body: [
    {
      type: 'section',
      title: 'Objective',
      content: 'I can choose polite greeting words and responses.'
    }
  ],
  options: item.options,
  correctAnswer: item.correctAnswer,
  explanation: item.explanation,
  finalTakeaway: 'Greetings help us speak politely to other people.',
  tags: ['cbc', 'grade-1', 'english', learningAreaId, 'greetings', 'exam', 'mcq'],
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod'],
    source: 'original',
    audience: 'grade-1',
    skill: 'greetings',
    gradeId: 'grade-1',
    subjectId: 'english',
    learningAreaId,
    themeId: 'greetings',
    examId,
    examTitle,
    examCardTitle: examTitle,
    assessmentType: 'exam',
    interactionType: 'mcq',
    readOptionsAloud: true,
    questionTimeSeconds,
    totalTimeSeconds: questions.length * questionTimeSeconds,
    points: 1,
    backPath: '/gd1/eng/greetings?tab=assessment',
    backLabel: 'Back to Assessment',
    sequence: sequenceBase + index
  }
}));

export default examQuestions;