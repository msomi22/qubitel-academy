import { defineMcqProblem } from '../../../../../../problems/problemAuthoring.js';

function emoji(value) {
  return { type: 'emoji', value };
}

const examId = 'grade-1-reading-word-mastery-exam-006';
const examTitle = 'Exam 6: Beginning Sounds V, W, Y and Z';
const learningAreaId = 'reading-readiness';
const questionTimeSeconds = 30;
const sequenceBase = 1080;

const questions = [
  {
    question: 'Tap the word you hear.',
    readAloudText: 'Tap the word van.',
    visualHint: '🚐',
    options: ['van', 'zoo', 'yam', 'web'],
    correctAnswer: 'van',
    explanation: 'van is the word you heard.'
  },
  {
    question: 'Which word names the picture?',
    readAloudText: 'Find the word vest.',
    visualHint: '🦺',
    options: ['web', 'yam', 'zoo', 'vest'],
    correctAnswer: 'vest',
    explanation: 'vest is the word for the picture.'
  },
  {
    question: 'Tap the word you hear.',
    readAloudText: 'Tap the word web.',
    visualHint: '🕸️',
    options: ['yam', 'web', 'zoo', 'vest'],
    correctAnswer: 'web',
    explanation: 'web is the word you heard.'
  },
  {
    question: 'Which word names the picture?',
    readAloudText: 'Find the word watch.',
    visualHint: '⌚',
    options: ['van', 'zoo', 'watch', 'yam'],
    correctAnswer: 'watch',
    explanation: 'watch is the word for the picture.'
  },
  {
    question: 'Tap the word you hear.',
    readAloudText: 'Tap the word worm.',
    visualHint: '🪱',
    options: ['worm', 'vest', 'yam', 'zoo'],
    correctAnswer: 'worm',
    explanation: 'worm is the word you heard.'
  },
  {
    question: 'Which word names the picture?',
    readAloudText: 'Find the word wheel.',
    visualHint: '🛞',
    options: ['vest', 'yam', 'zoo', 'wheel'],
    correctAnswer: 'wheel',
    explanation: 'wheel is the word for the picture.'
  },
  {
    question: 'Tap the word you hear.',
    readAloudText: 'Tap the word yam.',
    visualHint: '🍠',
    options: ['van', 'yam', 'zoo', 'web'],
    correctAnswer: 'yam',
    explanation: 'yam is the word you heard.'
  },
  {
    question: 'Tap the word you hear.',
    readAloudText: 'Tap the word yes.',
    visualHint: '✅',
    options: ['web', 'zoo', 'yes', 'vest'],
    correctAnswer: 'yes',
    explanation: 'yes is the word you heard.'
  },
  {
    question: 'Tap the word you hear.',
    readAloudText: 'Tap the word zebra.',
    visualHint: '🦓',
    options: ['zebra', 'yam', 'web', 'vest'],
    correctAnswer: 'zebra',
    explanation: 'zebra is the word you heard.'
  },
  {
    question: 'Which word names the picture?',
    readAloudText: 'Find the word zero.',
    visualHint: '0️⃣',
    options: ['van', 'web', 'yam', 'zero'],
    correctAnswer: 'zero',
    explanation: 'zero is the word for the picture.'
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
  body: [
    {
      type: 'section',
      title: 'Objective',
      content: 'I can recognize and read words with beginning sounds V, W, Y, and Z.'
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
    readAloudText: item.readAloudText,
    visualHint: item.visualHint,
    promptVisual: emoji(item.visualHint),
    sequence: sequenceBase + index
  }
}));

export default examQuestions;