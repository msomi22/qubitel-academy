import { defineMcqProblem } from '../../../../../../problems/problemAuthoring.js';

function emoji(value) {
  return { type: 'emoji', value };
}

const examId = 'grade-1-reading-word-mastery-exam-002';
const examTitle = 'Exam 2: Beginning Sounds B, C and D';
const learningAreaId = 'reading-readiness';
const questionTimeSeconds = 60;
const sequenceBase = 1000;

const questions = [
  {
    question: 'Tap the word you hear.',
    readAloudText: 'Tap the word bat.',
    visualHint: '🦇',
    options: ['bed', 'fit', 'bat', 'top'],
    correctAnswer: 'bat',
    explanation: 'bat is the word you heard.'
  },
  {
    question: 'Which word names the picture?',
    readAloudText: 'Find the word cat.',
    visualHint: '🐱',
    options: ['cat', 'log', 'pen', 'mop'],
    correctAnswer: 'cat',
    explanation: 'cat is the word for the picture.'
  },
  {
    question: 'Tap the word you hear.',
    readAloudText: 'Tap the word dog.',
    visualHint: '🐶',
    options: ['nod', 'van', 'mop', 'dog'],
    correctAnswer: 'dog',
    explanation: 'dog is the word you heard.'
  },
  {
    question: 'Which word names the picture?',
    readAloudText: 'Find the word bed.',
    visualHint: '🛏️',
    options: ['leg', 'bed', 'tag', 'fog'],
    correctAnswer: 'bed',
    explanation: 'bed is the word for the picture.'
  },
  {
    question: 'Tap the word you hear.',
    readAloudText: 'Tap the word cup.',
    visualHint: '☕',
    options: ['hug', 'cup', 'wax', 'pig'],
    correctAnswer: 'cup',
    explanation: 'cup is the word you heard.'
  },
  {
    question: 'Which word names the picture?',
    readAloudText: 'Find the word dad.',
    visualHint: '👨',
    options: ['sat', 'cab', 'new', 'dad'],
    correctAnswer: 'dad',
    explanation: 'dad is the word for the picture.'
  },
  {
    question: 'Tap the word you hear.',
    readAloudText: 'Tap the word bib.',
    visualHint: '👶',
    options: ['bib', 'tag', 'net', 'mop'],
    correctAnswer: 'bib',
    explanation: 'bib is the word you heard.'
  },
  {
    question: 'Which word names the picture?',
    readAloudText: 'Find the word cow.',
    visualHint: '🐄',
    options: ['web', 'bib', 'cow', 'fig'],
    correctAnswer: 'cow',
    explanation: 'cow is the word for the picture.'
  },
  {
    question: 'Tap the word you hear.',
    readAloudText: 'Tap the word den.',
    visualHint: '🏠',
    options: ['new', 'rat', 'wet', 'den'],
    correctAnswer: 'den',
    explanation: 'den is the word you heard.'
  },
  {
    question: 'Which word names the picture?',
    readAloudText: 'Find the word bug.',
    visualHint: '🐞',
    options: ['mat', 'bug', 'hug', 'pup'],
    correctAnswer: 'bug',
    explanation: 'bug is the word for the picture.'
  },
  {
    question: 'Tap the word you hear.',
    readAloudText: 'Tap the word car.',
    visualHint: '🚗',
    options: ['jam', 'fin', 'car', 'job'],
    correctAnswer: 'car',
    explanation: 'car is the word you heard.'
  },
  {
    question: 'Which word names the picture?',
    readAloudText: 'Find the word dig.',
    visualHint: '⛏️',
    options: ['dig', 'pop', 'was', 'wig'],
    correctAnswer: 'dig',
    explanation: 'dig is the word for the picture.'
  },
  {
    question: 'Tap the word you hear.',
    readAloudText: 'Tap the word bus.',
    visualHint: '🚌',
    options: ['bus', 'zip', 'run', 'rip'],
    correctAnswer: 'bus',
    explanation: 'bus is the word you heard.'
  },
  {
    question: 'Which word names the picture?',
    readAloudText: 'Find the word cap.',
    visualHint: '🧢',
    options: ['net', 'yap', 'cap', 'get'],
    correctAnswer: 'cap',
    explanation: 'cap is the word for the picture.'
  },
  {
    question: 'Tap the word you hear.',
    readAloudText: 'Tap the word dot.',
    visualHint: '⚫',
    options: ['wet', 'dot', 'dam', 'zip'],
    correctAnswer: 'dot',
    explanation: 'dot is the word you heard.'
  },
  {
    question: 'Which word names the picture?',
    readAloudText: 'Find the word boy.',
    visualHint: '👦',
    options: ['van', 'fix', 'hug', 'boy'],
    correctAnswer: 'boy',
    explanation: 'boy is the word for the picture.'
  },
  {
    question: 'Tap the word you hear.',
    readAloudText: 'Tap the word can.',
    visualHint: '🥫',
    options: ['got', 'gum', 'can', 'was'],
    correctAnswer: 'can',
    explanation: 'can is the word you heard.'
  },
  {
    question: 'Which word names the picture?',
    readAloudText: 'Find the word cab.',
    visualHint: '🚕',
    options: ['six', 'van', 'jam', 'cab'],
    correctAnswer: 'cab',
    explanation: 'cab is the word for the picture.'
  },
  {
    question: 'Tap the word you hear.',
    readAloudText: 'Tap the word bun.',
    visualHint: '🥯',
    options: ['bun', 'wig', 'fox', 'sit'],
    correctAnswer: 'bun',
    explanation: 'bun is the word you heard.'
  },
  {
    question: 'Which word names the picture?',
    readAloudText: 'Find the word bag.',
    visualHint: '🎒',
    options: ['him', 'bag', 'hug', 'dad'],
    correctAnswer: 'bag',
    explanation: 'bag is the word for the picture.'
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
      content: 'I can recognize and read three-letter words with beginning sounds B, C, and D.'
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