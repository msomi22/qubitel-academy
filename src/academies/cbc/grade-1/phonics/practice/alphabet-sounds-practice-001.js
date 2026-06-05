import { defineMcqProblem } from '../../../../../problems/problemAuthoring.js';
import { alphabetSounds, emoji, optionVisualsFromEmoji, phonicsMetadata, textVisual } from '../phonicsData.js';

const byLetter = Object.fromEntries(alphabetSounds.map((item) => [item.letter, item]));

function phonicsMcq({
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
    optionVisuals,
    readAloud: true,
    autoReadAloud: false,
    readAloudText: `${question} Option A: ${options[0]}. Option B: ${options[1]}. Option C: ${options[2]}.`,
    readOptionsAloud: true,
    body: [
      {
        type: 'section',
        title: 'Objective',
        content: 'I can listen for alphabet sounds and choose the correct answer.'
      }
    ],
    options,
    correctAnswer,
    explanation,
    finalTakeaway: 'Listen for the first sound before you choose.',
    tags: ['cbc', 'grade-1', 'phonics', 'alphabet-sounds', 'practice', 'visual-mcq'],
    metadata: {
      reviewStatus: 'approved',
      visibility: ['dev', 'prod'],
      source: 'original',
      audience: 'grade-1',
      skill: 'alphabet-sounds',
      interactionType: 'visual-mcq',
      promptVisual,
      optionVisuals,
      readAloud: true,
      autoReadAloud: false,
      readAloudText: `${question} Option A: ${options[0]}. Option B: ${options[1]}. Option C: ${options[2]}.`,
      readOptionsAloud: true,
      phonics: phonicsMetadata(item),
      sequence
    }
  });
}

const questions = [
  phonicsMcq({
    id: 'phonics-alphabet-sounds-practice-001-q001',
    title: 'Alphabet Sound: /b/',
    item: byLetter.B,
    question: 'Listen to the sound /b/. Choose the word that starts with /b/.',
    options: ['ball', 'sun', 'cat'],
    correctAnswer: 'ball',
    promptVisual: textVisual('B'),
    optionVisuals: optionVisualsFromEmoji(['⚽', '☀️', '🐱']),
    explanation: 'Ball starts with the /b/ sound.',
    sequence: 1
  }),
  phonicsMcq({
    id: 'phonics-alphabet-sounds-practice-001-q002',
    title: 'Alphabet Sound: /m/',
    item: byLetter.M,
    question: 'Which letter makes the /m/ sound?',
    options: ['S', 'M', 'T'],
    correctAnswer: 'M',
    promptVisual: emoji('🥭'),
    optionVisuals: [textVisual('S'), textVisual('M'), textVisual('T')],
    explanation: 'M makes the /m/ sound, as in mango.',
    sequence: 2
  }),
  phonicsMcq({
    id: 'phonics-alphabet-sounds-practice-001-q003',
    title: 'Alphabet Sound: /d/',
    item: byLetter.D,
    question: 'Choose the picture that starts with /d/.',
    options: ['dog', 'sun', 'apple'],
    correctAnswer: 'dog',
    promptVisual: textVisual('D'),
    optionVisuals: optionVisualsFromEmoji(['🐶', '☀️', '🍎']),
    explanation: 'Dog starts with the /d/ sound.',
    sequence: 3
  }),
  phonicsMcq({
    id: 'phonics-alphabet-sounds-practice-001-q004',
    title: 'Alphabet Sound: /s/',
    item: byLetter.S,
    question: 'Listen to the sound /s/. Choose the word that starts with /s/.',
    options: ['cup', 'sun', 'dog'],
    correctAnswer: 'sun',
    promptVisual: textVisual('S'),
    optionVisuals: optionVisualsFromEmoji(['🥤', '☀️', '🐶']),
    explanation: 'Sun starts with the /s/ sound.',
    sequence: 4
  }),
  phonicsMcq({
    id: 'phonics-alphabet-sounds-practice-001-q005',
    title: 'Alphabet Sound: /f/',
    item: byLetter.F,
    question: 'Which word starts with /f/?',
    options: ['fish', 'ball', 'goat'],
    correctAnswer: 'fish',
    promptVisual: textVisual('F'),
    optionVisuals: optionVisualsFromEmoji(['🐟', '⚽', '🐐']),
    explanation: 'Fish starts with the /f/ sound.',
    sequence: 5
  }),
  phonicsMcq({
    id: 'phonics-alphabet-sounds-practice-001-q006',
    title: 'Alphabet Sound: /r/',
    item: byLetter.R,
    question: 'Choose the picture that starts with /r/.',
    options: ['rabbit', 'hat', 'net'],
    correctAnswer: 'rabbit',
    promptVisual: textVisual('R'),
    optionVisuals: optionVisualsFromEmoji(['🐰', '🎩', '🥅']),
    explanation: 'Rabbit starts with the /r/ sound.',
    sequence: 6
  }),
  phonicsMcq({
    id: 'phonics-alphabet-sounds-practice-001-q007',
    title: 'Alphabet Sound: /t/',
    item: byLetter.T,
    question: 'Which letter makes the /t/ sound?',
    options: ['T', 'N', 'L'],
    correctAnswer: 'T',
    promptVisual: emoji('🍅'),
    optionVisuals: [textVisual('T'), textVisual('N'), textVisual('L')],
    explanation: 'T makes the /t/ sound, as in tomato.',
    sequence: 7
  }),
  phonicsMcq({
    id: 'phonics-alphabet-sounds-practice-001-q008',
    title: 'Alphabet Sound: /p/',
    item: byLetter.P,
    question: 'Listen to the sound /p/. Choose the word that starts with /p/.',
    options: ['pen', 'lion', 'van'],
    correctAnswer: 'pen',
    promptVisual: textVisual('P'),
    optionVisuals: optionVisualsFromEmoji(['🖊️', '🦁', '🚐']),
    explanation: 'Pen starts with the /p/ sound.',
    sequence: 8
  }),
  phonicsMcq({
    id: 'phonics-alphabet-sounds-practice-001-q009',
    title: 'Alphabet Sound: /k/',
    item: byLetter.C,
    question: 'Choose the picture that starts with /k/.',
    options: ['cat', 'dog', 'sun'],
    correctAnswer: 'cat',
    promptVisual: textVisual('C'),
    optionVisuals: optionVisualsFromEmoji(['🐱', '🐶', '☀️']),
    explanation: 'Cat starts with the /k/ sound. Letter C can make the /k/ sound.',
    sequence: 9
  }),
  phonicsMcq({
    id: 'phonics-alphabet-sounds-practice-001-q010',
    title: 'Alphabet Sound: /z/',
    item: byLetter.Z,
    question: 'Which word starts with /z/?',
    options: ['zebra', 'water', 'moon'],
    correctAnswer: 'zebra',
    promptVisual: textVisual('Z'),
    optionVisuals: optionVisualsFromEmoji(['🦓', '💧', '🌙']),
    explanation: 'Zebra starts with the /z/ sound.',
    sequence: 10
  })
];

export default questions;
