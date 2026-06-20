import { defineMcqProblem } from '../../../../../../problems/problemAuthoring.js';

function emoji(value) {
  return { type: 'emoji', value };
}

const examId = 'grade-1-reading-word-mastery-exam-004';
const examTitle = 'Exam 5: Common 3 to 6 Letter Words';
const learningAreaId = 'reading-readiness';
const questionTimeSeconds = 30;
const sequenceBase = 1080;

const questions = [
  {
    question: 'Tap the word you hear.',
    readAloudText: 'Tap the word tree.',
    visualHint: '🌲',
    options: ['free', 'tree', 'true', 'toad'],
    correctAnswer: 'tree',
    explanation: 'Great job! tree is the word you heard.'
  },
  {
    question: 'Which word names the picture?',
    readAloudText: 'Find the word star.',
    visualHint: '⭐',
    options: ['step', 'stop', 'star', 'stay'],
    correctAnswer: 'star',
    explanation: 'Great job! star is the word for the picture.'
  },
  {
    question: 'Tap the word you hear.',
    readAloudText: 'Tap the word boat.',
    visualHint: '⛵',
    options: ['boat', 'boot', 'coat', 'beat'],
    correctAnswer: 'boat',
    explanation: 'Great job! boat is the word you heard.'
  },
  {
    question: 'Which word names the picture?',
    readAloudText: 'Find the word moon.',
    visualHint: '🌙',
    options: ['noon', 'moon', 'man', 'soon'],
    correctAnswer: 'moon',
    explanation: 'Great job! moon is the word for the picture.'
  },
  {
    question: 'Tap the word you hear.',
    readAloudText: 'Tap the word frog.',
    visualHint: '🐸',
    options: ['flag', 'free', 'frog', 'from'],
    correctAnswer: 'frog',
    explanation: 'Great job! frog is the word you heard.'
  },
  {
    question: 'Which word names the picture?',
    readAloudText: 'Find the word shoe.',
    visualHint: '👞',
    options: ['shop', 'show', 'shut', 'shoe'],
    correctAnswer: 'shoe',
    explanation: 'Great job! shoe is the word for the picture.'
  },
  {
    question: 'Tap the word you hear.',
    readAloudText: 'Tap the word drum.',
    visualHint: '🥁',
    options: ['drop', 'drum', 'drag', 'draw'],
    correctAnswer: 'drum',
    explanation: 'Great job! drum is the word you heard.'
  },
  {
    question: 'Which word names the picture?',
    readAloudText: 'Find the word cake.',
    visualHint: '🍰',
    options: ['came', 'lake', 'cake', 'make'],
    correctAnswer: 'cake',
    explanation: 'Great job! cake is the word for the picture.'
  },
  {
    question: 'Tap the word you hear.',
    readAloudText: 'Tap the word clock.',
    visualHint: '🕰️',
    options: ['click', 'clock', 'flock', 'cluck'],
    correctAnswer: 'clock',
    explanation: 'Great job! clock is the word you heard.'
  },
  {
    question: 'Which word names the picture?',
    readAloudText: 'Find the word mouse.',
    visualHint: '🐭',
    options: ['mouse', 'house', 'mouth', 'moose'],
    correctAnswer: 'mouse',
    explanation: 'Great job! mouse is the word for the picture.'
  },
  {
    question: 'Tap the word you hear.',
    readAloudText: 'Tap the word bird.',
    visualHint: '🐦',
    options: ['barn', 'bark', 'bird', 'burn'],
    correctAnswer: 'bird',
    explanation: 'Great job! bird is the word you heard.'
  },
  {
    question: 'Which word names the picture?',
    readAloudText: 'Find the word plant.',
    visualHint: '🪴',
    options: ['plane', 'plan', 'plant', 'plate'],
    correctAnswer: 'plant',
    explanation: 'Great job! plant is the word for the picture.'
  },
  {
    question: 'Tap the word you hear.',
    readAloudText: 'Tap the word train.',
    visualHint: '🚆',
    options: ['trail', 'train', 'brain', 'drain'],
    correctAnswer: 'train',
    explanation: 'Great job! train is the word you heard.'
  },
  {
    question: 'Which word names the picture?',
    readAloudText: 'Find the word apple.',
    visualHint: '🍎',
    options: ['apply', 'ample', 'ankle', 'apple'],
    correctAnswer: 'apple',
    explanation: 'Great job! apple is the word for the picture.'
  },
  {
    question: 'Tap the word you hear.',
    readAloudText: 'Tap the word duck.',
    visualHint: '🦆',
    options: ['deck', 'dock', 'duck', 'luck'],
    correctAnswer: 'duck',
    explanation: 'Great job! duck is the word you heard.'
  },
  {
    question: 'Which word names the picture?',
    readAloudText: 'Find the word sheep.',
    visualHint: '🐑',
    options: ['sheet', 'sheep', 'sleep', 'steep'],
    correctAnswer: 'sheep',
    explanation: 'Great job! sheep is the word for the picture.'
  },
  {
    question: 'Tap the word you hear.',
    readAloudText: 'Tap the word shirt.',
    visualHint: '👕',
    options: ['shirt', 'short', 'skirt', 'shift'],
    correctAnswer: 'shirt',
    explanation: 'Great job! shirt is the word you heard.'
  },
  {
    question: 'Which word names the picture?',
    readAloudText: 'Find the word spoon.',
    visualHint: '🥄',
    options: ['spool', 'sport', 'spoon', 'spill'],
    correctAnswer: 'spoon',
    explanation: 'Great job! spoon is the word for the picture.'
  },
  {
    question: 'Tap the word you hear.',
    readAloudText: 'Tap the word block.',
    visualHint: '🧱',
    options: ['black', 'block', 'brick', 'flock'],
    correctAnswer: 'block',
    explanation: 'Great job! block is the word you heard.'
  },
  {
    question: 'Which word names the picture?',
    readAloudText: 'Find the word snake.',
    visualHint: '🐍',
    options: ['snack', 'snail', 'shake', 'snake'],
    correctAnswer: 'snake',
    explanation: 'Great job! snake is the word for the picture.'
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
      content: 'I can recognize and read common 3 to 6-letter words.' 
    }
  ],
  options: item.options,
  correctAnswer: item.correctAnswer,
  explanation: item.explanation,
  finalTakeaway: 'Great job reading and matching the words!',
  tags: ['cbc', 'grade-1', 'english', learningAreaId, 'exam', 'word-reading'],
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