import { defineMcqProblem } from '../../../../../../problems/problemAuthoring.js';

function emoji(value) {
  return { type: 'emoji', value };
}

const examId = 'grade-1-reading-word-mastery-exam-002';
const examTitle = 'Exam 2: Beginning Sounds F, G and H';
const learningAreaId = 'reading-readiness';
const questionTimeSeconds = 30;
const sequenceBase = 1020;

const questions = [
  {
    question: 'Tap the word you hear.',
    readAloudText: 'Tap the word fan.',
    visualHint: '🪭',
    options: ['hug', 'run', 'fan', 'fix'],
    correctAnswer: 'fan',
    explanation: 'fan is the word you heard.'
  },
  {
    question: 'Which word names the picture?',
    readAloudText: 'Find the word gum.',
    visualHint: '🍬',
    options: ['gum', 'jug', 'ram', 'tin'],
    correctAnswer: 'gum',
    explanation: 'gum is the word for the picture.'
  },
  {
    question: 'Tap the word you hear.',
    readAloudText: 'Tap the word hat.',
    visualHint: '🎩',
    options: ['got', 'keg', 'big', 'hat'],
    correctAnswer: 'hat',
    explanation: 'hat is the word you heard.'
  },
  {
    question: 'Which word names the picture?',
    readAloudText: 'Find the word fox.',
    visualHint: '🦊',
    options: ['pen', 'fox', 'ham', 'sad'],
    correctAnswer: 'fox',
    explanation: 'fox is the word for the picture.'
  },
  {
    question: 'Tap the word you hear.',
    readAloudText: 'Tap the word gap.',
    visualHint: '↔️',
    options: ['toy', 'gap', 'jug', 'zip'],
    correctAnswer: 'gap',
    explanation: 'gap is the word you heard.'
  },
  {
    question: 'Which word names the picture?',
    readAloudText: 'Find the word hen.',
    visualHint: '🐔',
    options: ['lap', 'box', 'zoo', 'hen'],
    correctAnswer: 'hen',
    explanation: 'hen is the word for the picture.'
  },
  {
    question: 'Tap the word you hear.',
    readAloudText: 'Tap the word fin.',
    visualHint: '🐟',
    options: ['fin', 'war', 'pet', 'cod'],
    correctAnswer: 'fin',
    explanation: 'fin is the word you heard.'
  },
  {
    question: 'Which word names the picture?',
    readAloudText: 'Find the word gas.',
    visualHint: '⛽',
    options: ['jar', 'van', 'gas', 'ten'],
    correctAnswer: 'gas',
    explanation: 'gas is the word for the picture.'
  },
  {
    question: 'Tap the word you hear.',
    readAloudText: 'Tap the word hop.',
    visualHint: '🐰',
    options: ['nod', 'bat', 'dig', 'hop'],
    correctAnswer: 'hop',
    explanation: 'hop is the word you heard.'
  },
  {
    question: 'Which word names the picture?',
    readAloudText: 'Find the word fun.',
    visualHint: '🎈',
    options: ['tub', 'fun', 'kid', 'wet'],
    correctAnswer: 'fun',
    explanation: 'fun is the word for the picture.'
  },
  {
    question: 'Tap the word you hear.',
    readAloudText: 'Tap the word get.',
    visualHint: '✋',
    options: ['hut', 'yap', 'get', 'mad'],
    correctAnswer: 'get',
    explanation: 'get is the word you heard.'
  },
  {
    question: 'Which word names the picture?',
    readAloudText: 'Find the word hot.',
    visualHint: '🔥',
    options: ['hot', 'win', 'mat', 'wig'],
    correctAnswer: 'hot',
    explanation: 'hot is the word for the picture.'
  },
  {
    question: 'Tap the word you hear.',
    readAloudText: 'Tap the word fog.',
    visualHint: '🌫️',
    options: ['fog', 'box', 'net', 'top'],
    correctAnswer: 'fog',
    explanation: 'fog is the word you heard.'
  },
  {
    question: 'Which word names the picture?',
    readAloudText: 'Find the word got.',
    visualHint: '✅',
    options: ['day', 'fix', 'got', 'boy'],
    correctAnswer: 'got',
    explanation: 'got is the word for the picture.'
  },
  {
    question: 'Tap the word you hear.',
    readAloudText: 'Tap the word hug.',
    visualHint: '🤗',
    options: ['him', 'hug', 'car', 'hot'],
    correctAnswer: 'hug',
    explanation: 'hug is the word you heard.'
  },
  {
    question: 'Which word names the picture?',
    readAloudText: 'Find the word fat.',
    visualHint: '🐷',
    options: ['jam', 'cat', 'get', 'fat'],
    correctAnswer: 'fat',
    explanation: 'fat is the word for the picture.'
  },
  {
    question: 'Tap the word you hear.',
    readAloudText: 'Tap the word hog.',
    visualHint: '🐖',
    options: ['sit', 'jet', 'hog', 'red'],
    correctAnswer: 'hog',
    explanation: 'hog is the word you heard.'
  },
  {
    question: 'Which word names the picture?',
    readAloudText: 'Find the word hut.',
    visualHint: '🛖',
    options: ['cot', 'new', 'sip', 'hut'],
    correctAnswer: 'hut',
    explanation: 'hut is the word for the picture.'
  },
  {
    question: 'Tap the word you hear.',
    readAloudText: 'Tap the word fig.',
    visualHint: '🫒',
    options: ['fig', 'yes', 'was', 'bug'],
    correctAnswer: 'fig',
    explanation: 'fig is the word you heard.'
  },
  {
    question: 'Which word names the picture?',
    readAloudText: 'Find the word ham.',
    visualHint: '🍖',
    options: ['him', 'ham', 'win', 'mat'],
    correctAnswer: 'ham',
    explanation: 'ham is the word for the picture.'
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
      content: 'I can recognize and read three-letter words with beginning sounds F, G, and H.'
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
    source: 'github issue #363',
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