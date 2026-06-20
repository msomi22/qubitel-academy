import { defineMcqProblem } from '../../../../../../problems/problemAuthoring.js';

function emoji(value) {
  return { type: 'emoji', value };
}

const examId = 'grade-1-reading-word-mastery-exam-004';
const examTitle = 'Exam 4: Beginning Sounds J, K and L';
const learningAreaId = 'reading-readiness';
const questionTimeSeconds = 30;
const sequenceBase = 1040;

const questions = [
  {
    question: 'Tap the word you hear.',
    readAloudText: 'Tap the word jam.',
    visualHint: '🍓',
    options: ['pup', 'win', 'jam', 'box'],
    correctAnswer: 'jam',
    explanation: 'jam is the word you heard.'
  },
  {
    question: 'Which word names the picture?',
    readAloudText: 'Find the word kid.',
    visualHint: '🧒',
    options: ['kid', 'red', 'nap', 'gum'],
    correctAnswer: 'kid',
    explanation: 'kid is the word for the picture.'
  },
  {
    question: 'Tap the word you hear.',
    readAloudText: 'Tap the word leg.',
    visualHint: '🦵',
    options: ['get', 'ten', 'mad', 'leg'],
    correctAnswer: 'leg',
    explanation: 'leg is the word you heard.'
  },
  {
    question: 'Which word names the picture?',
    readAloudText: 'Find the word jug.',
    visualHint: '🏺',
    options: ['new', 'jug', 'sip', 'rip'],
    correctAnswer: 'jug',
    explanation: 'jug is the word for the picture.'
  },
  {
    question: 'Tap the word you hear.',
    readAloudText: 'Tap the word kit.',
    visualHint: '🧰',
    options: ['bun', 'kit', 'sad', 'yes'],
    correctAnswer: 'kit',
    explanation: 'kit is the word you heard.'
  },
  {
    question: 'Which word names the picture?',
    readAloudText: 'Find the word lid.',
    visualHint: '🍲',
    options: ['fox', 'kid', 'fig', 'lid'],
    correctAnswer: 'lid',
    explanation: 'lid is the word for the picture.'
  },
  {
    question: 'Tap the word you hear.',
    readAloudText: 'Tap the word jet.',
    visualHint: '✈️',
    options: ['jet', 'fin', 'pot', 'keg'],
    correctAnswer: 'jet',
    explanation: 'jet is the word you heard.'
  },
  {
    question: 'Which word names the picture?',
    readAloudText: 'Find the word key.',
    visualHint: '🔑',
    options: ['red', 'pen', 'key', 'map'],
    correctAnswer: 'key',
    explanation: 'key is the word for the picture.'
  },
  {
    question: 'Tap the word you hear.',
    readAloudText: 'Tap the word log.',
    visualHint: '🪵',
    options: ['zig', 'nut', 'box', 'log'],
    correctAnswer: 'log',
    explanation: 'log is the word you heard.'
  },
  {
    question: 'Which word names the picture?',
    readAloudText: 'Find the word job.',
    visualHint: '💼',
    options: ['wax', 'job', 'wig', 'bad'],
    correctAnswer: 'job',
    explanation: 'job is the word for the picture.'
  },
  {
    question: 'Tap the word you hear.',
    readAloudText: 'Tap the word keg.',
    visualHint: '🛢️',
    options: ['run', 'lip', 'keg', 'top'],
    correctAnswer: 'keg',
    explanation: 'keg is the word you heard.'
  },
  {
    question: 'Which word names the picture?',
    readAloudText: 'Find the word lip.',
    visualHint: '👄',
    options: ['lip', 'boy', 'keg', 'dog'],
    correctAnswer: 'lip',
    explanation: 'lip is the word for the picture.'
  },
  {
    question: 'Tap the word you hear.',
    readAloudText: 'Tap the word jog.',
    visualHint: '🏃',
    options: ['jog', 'pet', 'yes', 'rug'],
    correctAnswer: 'jog',
    explanation: 'jog is the word you heard.'
  },
  {
    question: 'Which word names the picture?',
    readAloudText: 'Find the word jab.',
    visualHint: '🥊',
    options: ['fun', 'bin', 'jab', 'win'],
    correctAnswer: 'jab',
    explanation: 'jab is the word for the picture.'
  },
  {
    question: 'Tap the word you hear.',
    readAloudText: 'Tap the word lap.',
    visualHint: '🧍',
    options: ['mom', 'lap', 'dug', 'pan'],
    correctAnswer: 'lap',
    explanation: 'lap is the word you heard.'
  },
  {
    question: 'Which word names the picture?',
    readAloudText: 'Find the word jar.',
    visualHint: '🫙',
    options: ['got', 'van', 'gas', 'jar'],
    correctAnswer: 'jar',
    explanation: 'jar is the word for the picture.'
  },
  {
    question: 'Tap the word you hear.',
    readAloudText: 'Tap the word lad.',
    visualHint: '👦',
    options: ['red', 'dog', 'lad', 'gas'],
    correctAnswer: 'lad',
    explanation: 'lad is the word you heard.'
  },
  {
    question: 'Which word names the picture?',
    readAloudText: 'Find the word let.',
    visualHint: '✅',
    options: ['run', 'not', 'war', 'let'],
    correctAnswer: 'let',
    explanation: 'let is the word for the picture.'
  },
  {
    question: 'Tap the word you hear.',
    readAloudText: 'Tap the word joy.',
    visualHint: '😊',
    options: ['joy', 'bun', 'yes', 'mad'],
    correctAnswer: 'joy',
    explanation: 'joy is the word you heard.'
  },
  {
    question: 'Which word names the picture?',
    readAloudText: 'Find the word lab.',
    visualHint: '🥼',
    options: ['sad', 'lab', 'wet', 'bin'],
    correctAnswer: 'lab',
    explanation: 'lab is the word for the picture.'
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
    { type: 'section', title: 'Objective', content: 'I can recognize and read three-letter words with beginning sounds J, K, and L.' }
  ],
  options: item.options,
  correctAnswer: item.correctAnswer,
  explanation: item.explanation,
  finalTakeaway: 'Great job matching the words!',
  tags: ['cbc', 'grade-1', 'english', learningAreaId, 'exam', 'word-reading'],
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