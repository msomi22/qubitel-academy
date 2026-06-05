import { defineMcqProblem } from '../../../../../problems/problemAuthoring.js';

function objects(item, count) {
  return { type: 'objects', item, count };
}

function textVisual(value) {
  return { type: 'text', value };
}

const items = [
  ['stars', '⭐', 3, ['2', '3', '4']],
  ['apples', '🍎', 5, ['4', '5', '6']],
  ['balls', '⚽', 2, ['2', '3', '4']],
  ['books', '📚', 4, ['3', '4', '5']],
  ['cats', '🐱', 1, ['1', '2', '3']],
  ['cars', '🚗', 6, ['5', '6', '7']],
  ['flowers', '🌸', 7, ['6', '7', '8']],
  ['birds', '🐦', 8, ['7', '8', '9']],
  ['fish', '🐟', 9, ['8', '9', '10']],
  ['bananas', '🍌', 10, ['9', '10', '11']],
  ['pencils', '✏️', 4, ['2', '4', '6']],
  ['rabbits', '🐰', 3, ['1', '3', '5']],
  ['houses', '🏠', 2, ['1', '2', '5']],
  ['cups', '🥤', 5, ['3', '5', '7']],
  ['suns', '☀️', 1, ['1', '3', '4']]
];

const questions = items.map(([name, icon, count, options], index) => defineMcqProblem({
  id: `foundation-practice-counting-exam-001-q${String(index + 1).padStart(3, '0')}`,
  category: 'grade-1',
  topicId: 'foundation-practice',
  title: `Counting Exam Question ${index + 1}`,
  difficulty: 'Easy',
  estimatedTime: '1 min',
  estimatedTimeSeconds: 60,
  interactionType: 'visual-mcq',
  question: `How many ${name} are there?`,
  promptVisual: objects(icon, count),
  optionVisuals: options.map((option) => textVisual(option)),
  readAloud: true,
  autoReadAloud: false,
  readAloudText: `How many ${name} are there?`,
  readOptionsAloud: true,
  body: [
    {
      type: 'section',
      title: 'Objective',
      content: 'I can count objects and choose the correct number.'
    }
  ],
  options,
  correctAnswer: String(count),
  explanation: `There are ${count} ${name}.`,
  finalTakeaway: 'Count each object one by one.',
  tags: ['cbc', 'grade-1', 'foundation-practice', 'counting', 'exam', 'visual-mcq'],
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod'],
    source: 'original',
    audience: 'grade-1',
    skill: 'counting',
    interactionType: 'visual-mcq',
    promptVisual: objects(icon, count),
    optionVisuals: options.map((option) => textVisual(option)),
    readAloud: true,
    autoReadAloud: false,
    readAloudText: `How many ${name} are there?`,
    readOptionsAloud: true,
    examId: 'counting-exam-001',
    examTitle: 'Grade 1 Counting Exam',
    assessmentType: 'exam',
    points: 1,
    sequence: 100 + index
  }
}));

export default questions;
