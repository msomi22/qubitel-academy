import { defineMcqProblem } from '../../../../../problems/problemAuthoring.js';

const commonMetadata = {
  reviewStatus: 'approved',
  visibility: ['dev', 'prod'],
  source: 'original',
  audience: 'grade-1',
  practiceId: 'foundation-practice-001',
  practiceTitle: 'Grade 1 Foundation Practice'
};

function shape(shape) {
  return { type: 'shape', shape };
}

function emoji(value) {
  return { type: 'emoji', value };
}

function objects(item, count) {
  return { type: 'objects', item, count };
}

function textVisual(value) {
  return { type: 'text', value };
}

function gradeOneMcq({
  id,
  title,
  skill,
  question,
  readAloudText,
  options,
  correctAnswer,
  explanation,
  finalTakeaway,
  sequence,
  promptVisual = null,
  optionVisuals = [],
  body = []
}) {
  return defineMcqProblem({
    id,
    category: 'grade-1',
    topicId: 'foundation-practice',
    title,
    difficulty: 'Easy',
    estimatedTime: '1 min',
    estimatedTimeSeconds: 60,
    interactionType: 'visual-mcq',
    question,
    promptVisual,
    optionVisuals,
    readAloud: true,
    autoReadAloud: false,
    readAloudText,
    readOptionsAloud: false,
    body: [
      {
        type: 'section',
        title: 'Objective',
        content: `I can practise ${skill}.`
      },
      ...body
    ],
    options,
    correctAnswer,
    explanation,
    finalTakeaway,
    tags: ['cbc', 'grade-1', 'foundation-practice', skill, 'visual-mcq'],
    metadata: {
      ...commonMetadata,
      skill,
      sequence,
      interactionType: 'visual-mcq',
      promptVisual,
      optionVisuals,
      readAloud: true,
      autoReadAloud: false,
      readAloudText,
      readOptionsAloud: false
    }
  });
}

const questions = [
  gradeOneMcq({
    id: 'foundation-practice-recognition-shape-circle-001',
    title: 'Recognition: Choose the Circle',
    skill: 'recognition',
    question: 'Choose the circle.',
    readAloudText: 'Choose the circle.',
    options: ['Triangle', 'Circle', 'Square'],
    optionVisuals: [shape('triangle'), shape('circle'), shape('square')],
    correctAnswer: 'Circle',
    explanation: 'A circle is round.',
    finalTakeaway: 'A circle is round and has no corners.',
    sequence: 1
  }),
  gradeOneMcq({
    id: 'foundation-practice-recognition-letter-b-002',
    title: 'Recognition: Choose Letter B',
    skill: 'recognition',
    question: 'Choose the letter B.',
    readAloudText: 'Choose the letter B.',
    options: ['A', 'B', 'D'],
    optionVisuals: [textVisual('A'), textVisual('B'), textVisual('D')],
    correctAnswer: 'B',
    explanation: 'B is the correct letter.',
    finalTakeaway: 'Look at the letter shape before you choose.',
    sequence: 2
  }),
  gradeOneMcq({
    id: 'foundation-practice-listening-ball-starts-b-003',
    title: 'Listening: Beginning Sound B',
    skill: 'listening',
    question: 'Which letter does ball start with?',
    readAloudText: 'Listen carefully. The word is ball. Which letter does ball start with?',
    options: ['B', 'M', 'S'],
    promptVisual: emoji('⚽'),
    optionVisuals: [textVisual('B'), textVisual('M'), textVisual('S')],
    correctAnswer: 'B',
    explanation: 'Ball starts with the sound b.',
    finalTakeaway: 'Listen to the first sound in the word.',
    sequence: 3
  }),
  gradeOneMcq({
    id: 'foundation-practice-listening-sun-word-004',
    title: 'Listening: Choose Sun',
    skill: 'listening',
    question: 'Choose the word sun.',
    readAloudText: 'Listen carefully. Choose the word sun.',
    options: ['sun', 'cup', 'dog'],
    promptVisual: emoji('☀️'),
    optionVisuals: [emoji('☀️'), emoji('🥤'), emoji('🐶')],
    correctAnswer: 'sun',
    explanation: 'Sun is the word you heard.',
    finalTakeaway: 'Listen first, then choose the matching word.',
    sequence: 4
  }),
  gradeOneMcq({
    id: 'foundation-practice-matching-uppercase-a-005',
    title: 'Matching: A and a',
    skill: 'matching',
    question: 'Choose the small letter that matches A.',
    readAloudText: 'Choose the small letter that matches capital A.',
    options: ['b', 'a', 'c'],
    promptVisual: textVisual('A'),
    optionVisuals: [textVisual('b'), textVisual('a'), textVisual('c')],
    correctAnswer: 'a',
    explanation: 'Small a matches capital A.',
    finalTakeaway: 'Capital A and small a are the same letter.',
    sequence: 5
  }),
  gradeOneMcq({
    id: 'foundation-practice-matching-cat-word-006',
    title: 'Matching: Picture of a Cat',
    skill: 'matching',
    question: 'Look at the cat. Choose the word cat.',
    readAloudText: 'Look at the cat. Choose the word cat.',
    options: ['cat', 'cup', 'car'],
    promptVisual: emoji('🐱'),
    optionVisuals: [emoji('🐱'), emoji('🥤'), emoji('🚗')],
    correctAnswer: 'cat',
    explanation: 'Cat matches the animal.',
    finalTakeaway: 'Match the picture to the word.',
    sequence: 6
  }),
  gradeOneMcq({
    id: 'foundation-practice-counting-three-stars-007',
    title: 'Counting: Three Stars',
    skill: 'counting',
    question: 'How many stars are there?',
    readAloudText: 'How many stars are there?',
    options: ['2', '3', '4'],
    promptVisual: objects('⭐', 3),
    optionVisuals: [objects('⭐', 2), objects('⭐', 3), objects('⭐', 4)],
    correctAnswer: '3',
    explanation: 'There are three stars.',
    finalTakeaway: 'Count each star one by one.',
    sequence: 7
  }),
  gradeOneMcq({
    id: 'foundation-practice-counting-after-five-008',
    title: 'Counting: After Five',
    skill: 'counting',
    question: 'What number comes after 5?',
    readAloudText: 'What number comes after five?',
    options: ['4', '6', '7'],
    promptVisual: textVisual('5'),
    optionVisuals: [textVisual('4'), textVisual('6'), textVisual('7')],
    correctAnswer: '6',
    explanation: '6 comes after 5.',
    finalTakeaway: 'When counting, 6 comes after 5.',
    sequence: 8
  }),
  gradeOneMcq({
    id: 'foundation-practice-reading-word-dog-009',
    title: 'Reading Simple Words: Dog',
    skill: 'reading-simple-words',
    question: 'Choose the word dog.',
    readAloudText: 'Choose the word dog.',
    options: ['dog', 'dig', 'dot'],
    promptVisual: emoji('🐶'),
    optionVisuals: [emoji('🐶'), emoji('⛏️'), emoji('•')],
    correctAnswer: 'dog',
    explanation: 'Dog is the correct word.',
    finalTakeaway: 'Look at every letter in the word.',
    sequence: 9
  }),
  gradeOneMcq({
    id: 'foundation-practice-reading-sentence-cat-010',
    title: 'Reading Simple Words: I See a Cat',
    skill: 'reading-simple-words',
    question: 'Which word completes: I can see a cat?',
    readAloudText: 'Which word completes this sentence? I can see a cat.',
    options: ['cat', 'run', 'big'],
    promptVisual: emoji('🐱'),
    optionVisuals: [emoji('🐱'), emoji('🏃'), emoji('⬛')],
    correctAnswer: 'cat',
    explanation: 'I can see a cat is a good sentence.',
    finalTakeaway: 'Choose the word that makes the sentence make sense.',
    sequence: 10
  }),
  gradeOneMcq({
    id: 'foundation-practice-clear-options-thank-you-011',
    title: 'Clear Options: Thank You',
    skill: 'choosing-clear-options',
    question: 'What do you say when someone gives you something?',
    readAloudText: 'What do you say when someone gives you something?',
    options: ['Thank you', 'Go away', 'Stop'],
    promptVisual: emoji('🎁'),
    optionVisuals: [emoji('🙏'), emoji('🚶'), emoji('🛑')],
    correctAnswer: 'Thank you',
    explanation: 'Thank you is polite.',
    finalTakeaway: 'Use kind words when someone helps you.',
    sequence: 11
  }),
  gradeOneMcq({
    id: 'foundation-practice-clear-options-cross-road-012',
    title: 'Clear Options: Road Safety',
    skill: 'choosing-clear-options',
    question: 'What should you do before crossing the road?',
    readAloudText: 'What should you do before crossing the road?',
    options: ['Run fast', 'Look left and right', 'Close your eyes'],
    promptVisual: emoji('🚦'),
    optionVisuals: [emoji('🏃'), emoji('👀'), emoji('🙈')],
    correctAnswer: 'Look left and right',
    explanation: 'Look left and right before crossing the road.',
    finalTakeaway: 'Always check the road before crossing.',
    sequence: 12
  })
];

export default questions;
