import { defineMcqProblem } from '../../../../../problems/problemAuthoring.js';

function objects(item, count) {
  return { type: 'objects', item, count };
}

function textVisual(value) {
  return { type: 'text', value };
}

const examId = 'grade-1-mathematics-numbers-exam-001';
const examTitle = 'Grade 1 Mathematics Numbers Exam';
const learningAreaId = 'numbers';
const questionTimeSeconds = 60;
const sequenceBase = 100;

const items = [
  { name: 'stars', icon: '⭐', count: 3, options: ['1', '2', '3', '4'] },
  { name: 'apples', icon: '🍎', count: 5, options: ['3', '4', '5', '6'] },
  { name: 'balls', icon: '⚽', count: 2, options: ['1', '2', '3', '4'] },
  { name: 'books', icon: '📚', count: 4, options: ['2', '3', '4', '5'] },
  { name: 'cats', icon: '🐱', count: 1, options: ['1', '2', '3', '4'] },
  { name: 'cars', icon: '🚗', count: 6, options: ['4', '5', '6', '7'] },
  { name: 'flowers', icon: '🌸', count: 7, options: ['5', '6', '7', '8'] },
  { name: 'birds', icon: '🐦', count: 8, options: ['6', '7', '8', '9'] },
  { name: 'fish', icon: '🐟', count: 9, options: ['7', '8', '9', '10'] },
  { name: 'bananas', icon: '🍌', count: 10, options: ['8', '9', '10', '11'] },
  { name: 'pencils', icon: '✏️', count: 4, options: ['2', '4', '6', '8'] },
  { name: 'rabbits', icon: '🐰', count: 3, options: ['1', '2', '3', '5'] },
  { name: 'houses', icon: '🏠', count: 2, options: ['1', '2', '4', '5'] },
  { name: 'cups', icon: '🥤', count: 5, options: ['3', '4', '5', '7'] },
  { name: 'suns', icon: '☀️', count: 1, options: ['1', '2', '3', '4'] }
];

const examQuestions = items.map((item, index) => defineMcqProblem({
  id: `${examId}-q${String(index + 1).padStart(3, '0')}`,
  category: 'grade-1',
  topicId: 'mathematics',
  title: `${examTitle} Question ${index + 1}`,
  difficulty: 'Easy',
  estimatedTime: '1 min',
  estimatedTimeSeconds: questionTimeSeconds,
  interactionType: 'visual-mcq',
  question: `How many ${item.name} are there?`,
  promptVisual: objects(item.icon, item.count),
  optionVisuals: item.options.map((option) => textVisual(option)),
  readAloud: true,
  autoReadAloud: false,
  readAloudText: `How many ${item.name} are there?`,
  readOptionsAloud: false,
  body: [
    {
      type: 'section',
      title: 'Objective',
      content: 'I can count objects and choose the correct number.'
    }
  ],
  options: item.options,
  correctAnswer: String(item.count),
  explanation: `Great job! There are ${item.count} ${item.name}.`,
  finalTakeaway: 'Count each object one by one.',
  tags: ['cbc', 'grade-1', 'mathematics', learningAreaId, 'counting', 'exam', 'visual-mcq'],
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod'],
    source: 'original',
    audience: 'grade-1',
    skill: 'counting',
    gradeId: 'grade-1',
    subjectId: 'mathematics',
    learningAreaId,
    examId,
    examTitle,
    assessmentType: 'exam',
    interactionType: 'visual-mcq',
    readOptionsAloud: false,
    questionTimeSeconds,
    totalTimeSeconds: items.length * questionTimeSeconds,
    points: 1,
    promptVisual: objects(item.icon, item.count),
    optionVisuals: item.options.map((option) => textVisual(option)),
    readAloudText: `How many ${item.name} are there?`,
    sequence: sequenceBase + index
  }
}));

export default examQuestions;