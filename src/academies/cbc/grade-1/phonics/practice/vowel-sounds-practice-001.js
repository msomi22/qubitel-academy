import { defineMcqProblem } from '../../../../../problems/problemAuthoring.js';
import {
  completePhonicsOptions,
  emoji,
  optionVisualsFromEmoji,
  phonicsMetadata,
  readAloudWithOptions,
  shortVowels,
  textVisual
} from '../phonicsData.js';

const byLetter = Object.fromEntries(shortVowels.map((item) => [item.letter, item]));

function vowelMcq({
  id,
  title,
  item,
  question,
  options,
  correctAnswer,
  promptVisual,
  optionVisuals,
  explanation,
  sequence
}) {
  const expanded = completePhonicsOptions({
    options,
    optionVisuals,
    item,
    soundItems: shortVowels
  });
  const readAloudText = readAloudWithOptions(question, expanded.options);

  return defineMcqProblem({
    id,
    category: 'grade-1',
    topicId: 'phonics',
    title,
    difficulty: 'Easy',
    estimatedTime: '1 min',
    estimatedTimeSeconds: 60,
    interactionType: 'visual-mcq',
    question,
    promptVisual,
    optionVisuals: expanded.optionVisuals,
    readAloud: true,
    autoReadAloud: false,
    readAloudText,
    readOptionsAloud: true,
    body: [
      {
        type: 'section',
        title: 'Objective',
        content: 'I can listen for short vowel sounds and choose the correct answer.'
      }
    ],
    options: expanded.options,
    correctAnswer,
    explanation,
    finalTakeaway: 'Listen for the vowel sound inside the word.',
    tags: ['cbc', 'grade-1', 'phonics', 'short-vowels', 'practice', 'visual-mcq'],
    metadata: {
      reviewStatus: 'approved',
      visibility: ['dev', 'prod'],
      source: 'original',
      audience: 'grade-1',
      skill: 'short-vowels',
      interactionType: 'visual-mcq',
      promptVisual,
      optionVisuals: expanded.optionVisuals,
      readAloud: true,
      autoReadAloud: false,
      readAloudText,
      readOptionsAloud: true,
      phonics: phonicsMetadata(item, { soundType: 'short-vowel' }),
      sequence
    }
  });
}

const questions = [
  vowelMcq({
    id: 'phonics-vowel-sounds-practice-001-q001',
    title: 'Short A Sound',
    item: byLetter.A,
    question: 'Listen to the short /a/ sound. Which word has the /a/ sound?',
    options: ['cat', 'pen', 'dog'],
    correctAnswer: 'cat',
    promptVisual: textVisual('A'),
    optionVisuals: optionVisualsFromEmoji(['🐱', '🖊️', '🐶']),
    explanation: 'Cat has the short /a/ sound.',
    sequence: 1
  }),
  vowelMcq({
    id: 'phonics-vowel-sounds-practice-001-q002',
    title: 'Short E Sound',
    item: byLetter.E,
    question: 'Which word has the short /e/ sound?',
    options: ['bed', 'cup', 'sun'],
    correctAnswer: 'bed',
    promptVisual: textVisual('E'),
    optionVisuals: optionVisualsFromEmoji(['🛏️', '🥤', '☀️']),
    explanation: 'Bed has the short /e/ sound.',
    sequence: 2
  }),
  vowelMcq({
    id: 'phonics-vowel-sounds-practice-001-q003',
    title: 'Short I Sound',
    item: byLetter.I,
    question: 'Listen to the short /i/ sound. Choose the word with /i/.',
    options: ['pig', 'hat', 'box'],
    correctAnswer: 'pig',
    promptVisual: textVisual('I'),
    optionVisuals: optionVisualsFromEmoji(['🐷', '🎩', '📦']),
    explanation: 'Pig has the short /i/ sound.',
    sequence: 3
  }),
  vowelMcq({
    id: 'phonics-vowel-sounds-practice-001-q004',
    title: 'Short O Sound',
    item: byLetter.O,
    question: 'Which word has the short /o/ sound?',
    options: ['dog', 'pen', 'bus'],
    correctAnswer: 'dog',
    promptVisual: textVisual('O'),
    optionVisuals: optionVisualsFromEmoji(['🐶', '🖊️', '🚌']),
    explanation: 'Dog has the short /o/ sound.',
    sequence: 4
  }),
  vowelMcq({
    id: 'phonics-vowel-sounds-practice-001-q005',
    title: 'Short U Sound',
    item: byLetter.U,
    question: 'Listen to the short /u/ sound. Which word has /u/?',
    options: ['cup', 'fish', 'cat'],
    correctAnswer: 'cup',
    promptVisual: textVisual('U'),
    optionVisuals: optionVisualsFromEmoji(['🥤', '🐟', '🐱']),
    explanation: 'Cup has the short /u/ sound.',
    sequence: 5
  }),
  vowelMcq({
    id: 'phonics-vowel-sounds-practice-001-q006',
    title: 'Apple Starts with A',
    item: byLetter.A,
    question: 'Which vowel starts apple?',
    options: ['A', 'E', 'O'],
    correctAnswer: 'A',
    promptVisual: emoji('🍎'),
    optionVisuals: [textVisual('A'), textVisual('E'), textVisual('O')],
    explanation: 'Apple starts with A and the short /a/ sound.',
    sequence: 6
  }),
  vowelMcq({
    id: 'phonics-vowel-sounds-practice-001-q007',
    title: 'Egg Starts with E',
    item: byLetter.E,
    question: 'Which vowel starts egg?',
    options: ['I', 'E', 'U'],
    correctAnswer: 'E',
    promptVisual: emoji('🥚'),
    optionVisuals: [textVisual('I'), textVisual('E'), textVisual('U')],
    explanation: 'Egg starts with E and the short /e/ sound.',
    sequence: 7
  }),
  vowelMcq({
    id: 'phonics-vowel-sounds-practice-001-q008',
    title: 'Fish Has Short I',
    item: byLetter.I,
    question: 'Choose the word with the short /i/ sound.',
    options: ['fish', 'sun', 'bed'],
    correctAnswer: 'fish',
    promptVisual: textVisual('I'),
    optionVisuals: optionVisualsFromEmoji(['🐟', '☀️', '🛏️']),
    explanation: 'Fish has the short /i/ sound.',
    sequence: 8
  }),
  vowelMcq({
    id: 'phonics-vowel-sounds-practice-001-q009',
    title: 'Box Has Short O',
    item: byLetter.O,
    question: 'Choose the word with the short /o/ sound.',
    options: ['box', 'hat', 'pen'],
    correctAnswer: 'box',
    promptVisual: textVisual('O'),
    optionVisuals: optionVisualsFromEmoji(['📦', '🎩', '🖊️']),
    explanation: 'Box has the short /o/ sound.',
    sequence: 9
  }),
  vowelMcq({
    id: 'phonics-vowel-sounds-practice-001-q010',
    title: 'Sun Has Short U',
    item: byLetter.U,
    question: 'Choose the word with the short /u/ sound.',
    options: ['sun', 'dog', 'pen'],
    correctAnswer: 'sun',
    promptVisual: textVisual('U'),
    optionVisuals: optionVisualsFromEmoji(['☀️', '🐶', '🖊️']),
    explanation: 'Sun has the short /u/ sound.',
    sequence: 10
  })
];

export default questions;
