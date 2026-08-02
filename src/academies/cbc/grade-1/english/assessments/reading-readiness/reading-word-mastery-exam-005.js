import { defineMcqProblem } from '../../../../../../problems/problemAuthoring.js';

function emoji(value) {
  return { type: 'emoji', value };
}

const examId = 'grade-1-reading-word-mastery-exam-005';
const examTitle = 'Exam 5: Beginning Sounds M, N, P, R, S and T';
const learningAreaId = 'reading-readiness';
const questionTimeSeconds = 60;
const sequenceBase = 1060;

const questions = [
  {
    question: 'Tap the word you hear.',
    readAloudText: 'Tap the word mop.',
    visualHint: '🧹',
    options: ['run', 'mop', 'pen', 'sun'],
    correctAnswer: 'mop',
    explanation: 'mop is the word you heard.'
  },
  {
    question: 'Which word names the picture?',
    readAloudText: 'Find the word net.',
    visualHint: '🥅',
    options: ['bed', 'map', 'sun', 'net'],
    correctAnswer: 'net',
    explanation: 'net is the word for the picture.'
  },
  {
    question: 'Tap the word you hear.',
    readAloudText: 'Tap the word pan.',
    visualHint: '🍳',
    options: ['pan', 'top', 'man', 'run'],
    correctAnswer: 'pan',
    explanation: 'pan is the word you heard.'
  },
  {
    question: 'Which word names the picture?',
    readAloudText: 'Find the word rug.',
    visualHint: '🟫',
    options: ['pen', 'map', 'rug', 'sun'],
    correctAnswer: 'rug',
    explanation: 'rug is the word for the picture.'
  },
  {
    question: 'Tap the word you hear.',
    readAloudText: 'Tap the word sun.',
    visualHint: '☀️',
    options: ['run', 'sun', 'map', 'pen'],
    correctAnswer: 'sun',
    explanation: 'sun is the word you heard.'
  },
  {
    question: 'Which word names the picture?',
    readAloudText: 'Find the word top.',
    visualHint: '🪀',
    options: ['mop', 'run', 'bed', 'top'],
    correctAnswer: 'top',
    explanation: 'top is the word for the picture.'
  },
  {
    question: 'Tap the word you hear.',
    readAloudText: 'Tap the word mat.',
    visualHint: '🟩',
    options: ['mat', 'sun', 'pen', 'rug'],
    correctAnswer: 'mat',
    explanation: 'mat is the word you heard.'
  },
  {
    question: 'Which word names the picture?',
    readAloudText: 'Find the word pup.',
    visualHint: '🐕',
    options: ['top', 'man', 'pup', 'run'],
    correctAnswer: 'pup',
    explanation: 'pup is the word for the picture.'
  },
  {
    question: 'Tap the word you hear.',
    readAloudText: 'Tap the word rat.',
    visualHint: '🐀',
    options: ['mat', 'rat', 'sun', 'pen'],
    correctAnswer: 'rat',
    explanation: 'rat is the word you heard.'
  },
  {
    question: 'Which word names the picture?',
    readAloudText: 'Find the word sip.',
    visualHint: '🥤',
    options: ['run', 'map', 'tip', 'sip'],
    correctAnswer: 'sip',
    explanation: 'sip is the word for the picture.'
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
  interactionType: 'visual-mcq',
  question: item.question,
  promptVisual: emoji(item.visualHint),
  readAloud: true,
  autoReadAloud: false,
  readAloudText: item.readAloudText,
  readOptionsAloud: false,
  rendering: {
    suppressObjective: true
  },
  body: [
    {
      type: 'section',
      title: 'Objective',
      content: 'I can recognize and read three-letter words with beginning sounds M, N, P, R, S, and T.'
    }
  ],
  options: item.options,
  correctAnswer: item.correctAnswer,
  explanation: item.explanation,
  finalTakeaway: 'Great job matching the words!',
  tags: ['cbc', 'grade-1', 'english', learningAreaId, 'exam', 'word-reading', 'reading-readiness'],
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod'],
    source: 'original',
    audience: 'grade-1',
    gradeId: 'grade-1',
    subjectId: 'english',
    learningAreaId,
    examId,
    examTitle,
    assessmentType: 'exam',
    questionTimeSeconds,
    totalTimeSeconds: questions.length * questionTimeSeconds,
    points: 1,
    rendering: {
      suppressObjective: true
    },
    readAloudText: item.readAloudText,
    visualHint: item.visualHint,
    promptVisual: emoji(item.visualHint),
    sequence: sequenceBase + index
  }
}));

export default examQuestions;