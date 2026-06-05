import { defineMcqProblem } from '../../../../../problems/problemAuthoring.js';

function emoji(value) {
  return { type: 'emoji', value };
}

function completeObjectOptions(options = [], optionIcons = []) {
  const nextOptions = [...options];
  const nextIcons = [...optionIcons];
  const used = new Set(nextOptions);
  const candidates = [
    ['star', '⭐'],
    ['bag', '🎒'],
    ['tree', '🌳'],
    ['moon', '🌙'],
    ['shoe', '👟'],
    ['fish', '🐟']
  ];

  for (const [option, icon] of candidates) {
    if (nextOptions.length >= 4) {
      break;
    }

    if (!used.has(option)) {
      nextOptions.push(option);
      nextIcons.push(icon);
      used.add(option);
    }
  }

  return { options: nextOptions, optionIcons: nextIcons };
}

const items = [
  ['apple', '🍎', ['apple', 'banana', 'cup'], ['🍎', '🍌', '🥤'], 'Choose the apple.'],
  ['cat', '🐱', ['cat', 'car', 'cup'], ['🐱', '🚗', '🥤'], 'Choose the word cat.'],
  ['ball', '⚽', ['ball', 'book', 'bird'], ['⚽', '📚', '🐦'], 'Choose the picture that matches ball.'],
  ['dog', '🐶', ['dog', 'duck', 'door'], ['🐶', '🦆', '🚪'], 'Choose the dog.'],
  ['book', '📚', ['bag', 'book', 'box'], ['🎒', '📚', '📦'], 'Choose the word book.'],
  ['banana', '🍌', ['banana', 'apple', 'fish'], ['🍌', '🍎', '🐟'], 'Choose the banana.'],
  ['sun', '☀️', ['star', 'sun', 'moon'], ['⭐', '☀️', '🌙'], 'Choose the picture that matches sun.'],
  ['flower', '🌸', ['flower', 'fish', 'frog'], ['🌸', '🐟', '🐸'], 'Choose the flower.'],
  ['house', '🏠', ['house', 'horse', 'hat'], ['🏠', '🐴', '🎩'], 'Choose the house.'],
  ['car', '🚗', ['cat', 'cup', 'car'], ['🐱', '🥤', '🚗'], 'Choose the word car.'],
  ['fish', '🐟', ['fish', 'flower', 'frog'], ['🐟', '🌸', '🐸'], 'Choose the fish.'],
  ['pencil', '✏️', ['pencil', 'paper', 'plate'], ['✏️', '📄', '🍽️'], 'Choose the pencil.'],
  ['cup', '🥤', ['cap', 'cup', 'cat'], ['🧢', '🥤', '🐱'], 'Choose the cup.'],
  ['rabbit', '🐰', ['rabbit', 'robot', 'rain'], ['🐰', '🤖', '🌧️'], 'Choose the rabbit.'],
  ['chair', '🪑', ['chair', 'table', 'bed'], ['🪑', '🪵', '🛏️'], 'Choose the picture that matches chair.']
];

const questions = items.map(([answer, promptIcon, options, optionIcons, questionText], index) => {
  const expanded = completeObjectOptions(options, optionIcons);

  return defineMcqProblem({
    id: `foundation-practice-object-matching-exam-001-q${String(index + 1).padStart(3, '0')}`,
    category: 'grade-1',
    topicId: 'foundation-practice',
    title: `Object Matching Exam Question ${index + 1}`,
    difficulty: 'Easy',
    estimatedTime: '1 min',
    estimatedTimeSeconds: 60,
    interactionType: 'visual-mcq',
    question: questionText,
    promptVisual: emoji(promptIcon),
    optionVisuals: expanded.optionIcons.map((icon) => emoji(icon)),
    readAloud: true,
    autoReadAloud: false,
    readAloudText: questionText,
    readOptionsAloud: true,
    body: [
      {
        type: 'section',
        title: 'Objective',
        content: 'I can identify common objects and match pictures to words.'
      }
    ],
    options: expanded.options,
    correctAnswer: answer,
    explanation: `${answer} is the correct match.`,
    finalTakeaway: 'Look carefully at the picture and the word before you choose.',
    tags: ['cbc', 'grade-1', 'foundation-practice', 'object-matching', 'exam', 'visual-mcq'],
    metadata: {
      reviewStatus: 'approved',
      visibility: ['dev', 'prod'],
      source: 'original',
      audience: 'grade-1',
      skill: 'object-matching',
      interactionType: 'visual-mcq',
      promptVisual: emoji(promptIcon),
      optionVisuals: expanded.optionIcons.map((icon) => emoji(icon)),
      readAloud: true,
      autoReadAloud: false,
      readAloudText: questionText,
      readOptionsAloud: true,
      examId: 'object-matching-exam-001',
      examTitle: 'Grade 1 Object Matching Exam',
      assessmentType: 'exam',
      points: 1,
      sequence: 200 + index
    }
  });
});

export default questions;
