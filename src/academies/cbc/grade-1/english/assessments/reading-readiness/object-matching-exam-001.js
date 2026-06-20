import { defineMcqProblem } from '../../../../../../problems/problemAuthoring.js';

function emoji(value) {
  return { type: 'emoji', value };
}

const examId = 'grade-1-reading-readiness-exam-001';
const examTitle = 'Exam 1: Picture and Object Matching';
const learningAreaId = 'reading-readiness';
const questionTimeSeconds = 60;
const sequenceBase = 200;

const items = [
  { answer: 'apple', promptIcon: '🍎', options: ['apple', 'banana', 'cup', 'book'], optionIcons: ['🍎', '🍌', '🥤', '📚'] },
  { answer: 'cat', promptIcon: '🐱', options: ['cat', 'car', 'cup', 'dog'], optionIcons: ['🐱', '🚗', '🥤', '🐶'] },
  { answer: 'ball', promptIcon: '⚽', options: ['ball', 'book', 'bird', 'bag'], optionIcons: ['⚽', '📚', '🐦', '🎒'] },
  { answer: 'dog', promptIcon: '🐶', options: ['dog', 'duck', 'door', 'cat'], optionIcons: ['🐶', '🦆', '🚪', '🐱'] },
  { answer: 'book', promptIcon: '📚', options: ['bag', 'book', 'box', 'ball'], optionIcons: ['🎒', '📚', '📦', '⚽'] },
  { answer: 'banana', promptIcon: '🍌', options: ['banana', 'apple', 'fish', 'cup'], optionIcons: ['🍌', '🍎', '🐟', '🥤'] },
  { answer: 'sun', promptIcon: '☀️', options: ['star', 'sun', 'moon', 'cloud'], optionIcons: ['⭐', '☀️', '🌙', '☁️'] },
  { answer: 'flower', promptIcon: '🌸', options: ['flower', 'fish', 'frog', 'sun'], optionIcons: ['🌸', '🐟', '🐸', '☀️'] },
  { answer: 'house', promptIcon: '🏠', options: ['house', 'horse', 'hat', 'car'], optionIcons: ['🏠', '🐴', '🎩', '🚗'] },
  { answer: 'car', promptIcon: '🚗', options: ['cat', 'cup', 'car', 'bus'], optionIcons: ['🐱', '🥤', '🚗', '🚌'] },
  { answer: 'fish', promptIcon: '🐟', options: ['fish', 'flower', 'frog', 'bird'], optionIcons: ['🐟', '🌸', '🐸', '🐦'] },
  { answer: 'pencil', promptIcon: '✏️', options: ['pencil', 'paper', 'plate', 'book'], optionIcons: ['✏️', '📄', '🍽️', '📚'] },
  { answer: 'cup', promptIcon: '🥤', options: ['cap', 'cup', 'cat', 'car'], optionIcons: ['🧢', '🥤', '🐱', '🚗'] },
  { answer: 'rabbit', promptIcon: '🐰', options: ['rabbit', 'robot', 'rain', 'cat'], optionIcons: ['🐰', '🤖', '🌧️', '🐱'] },
  { answer: 'chair', promptIcon: '🪑', options: ['chair', 'table', 'bed', 'house'], optionIcons: ['🪑', '🪵', '🛏️', '🏠'] }
];

const examQuestions = items.map((item, index) => defineMcqProblem({
  id: `${examId}-q${String(index + 1).padStart(3, '0')}`,
  category: 'grade-1',
  topicId: 'english',
  title: `${examTitle} Question ${index + 1}`,
  difficulty: 'Easy',
  estimatedTime: '1 min',
  estimatedTimeSeconds: questionTimeSeconds,
  interactionType: 'visual-mcq',
  question: 'Which word names the picture?',
  promptVisual: emoji(item.promptIcon),
  optionVisuals: item.optionIcons.map((icon) => emoji(icon)),
  readAloud: true,
  autoReadAloud: false,
  readAloudText: `Find the word ${item.answer}.`,
  readOptionsAloud: false,
  body: [
    {
      type: 'section',
      title: 'Objective',
      content: 'I can identify common objects and match pictures to words.'
    }
  ],
  options: item.options,
  correctAnswer: item.answer,
  explanation: `Great job! ${item.answer} is the word for the picture.`,
  finalTakeaway: 'Look carefully at the picture and the word before you choose.',
  tags: ['cbc', 'grade-1', 'english', learningAreaId, 'object-matching', 'exam', 'visual-mcq'],
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod'],
    source: 'original',
    audience: 'grade-1',
    skill: 'object-matching',
    gradeId: 'grade-1',
    subjectId: 'english',
    learningAreaId,
    examId,
    examTitle,
    assessmentType: 'exam',
    interactionType: 'visual-mcq',
    readOptionsAloud: false,
    questionTimeSeconds,
    totalTimeSeconds: items.length * questionTimeSeconds,
    points: 1,
    promptVisual: emoji(item.promptIcon),
    optionVisuals: item.optionIcons.map((icon) => emoji(icon)),
    readAloudText: `Find the word ${item.answer}.`,
    sequence: sequenceBase + index
  }
}));

export default examQuestions;