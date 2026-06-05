import { defineMcqProblem } from '../../../../../problems/problemAuthoring.js';
import { alphabetSounds, emoji, optionVisualsFromEmoji, phonicsMetadata, textVisual } from '../phonicsData.js';

const byLetter = Object.fromEntries(alphabetSounds.map((item) => [item.letter, item]));

function soundExamMcq({
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
  const readAloudText = `${question} Option A: ${options[0]}. Option B: ${options[1]}. Option C: ${options[2]}.`;

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
    readAloudText,
    readOptionsAloud: true,
    body: [
      {
        type: 'section',
        title: 'Objective',
        content: 'I can listen for alphabet sounds and match them to letters, words, and pictures.'
      }
    ],
    options,
    correctAnswer,
    explanation,
    finalTakeaway: 'The sound helps you find the letter, word, or picture.',
    tags: ['cbc', 'grade-1', 'phonics', 'alphabet-sounds', 'exam', 'visual-mcq'],
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
      readAloudText,
      readOptionsAloud: true,
      phonics: phonicsMetadata(item),
      examId: 'alphabet-sounds-exam-001',
      examTitle: 'Grade 1 Alphabet Sounds Exam',
      assessmentType: 'exam',
      points: 1,
      sequence: 300 + sequence
    }
  });
}

const questions = [
  soundExamMcq({
    id: 'phonics-alphabet-sounds-exam-001-q001',
    title: 'Alphabet Sounds Exam Question 1',
    item: byLetter.B,
    question: 'Listen to the sound /b/. Choose the word that starts with /b/.',
    options: ['ball', 'sun', 'cat'],
    correctAnswer: 'ball',
    promptVisual: textVisual('B'),
    optionVisuals: optionVisualsFromEmoji(['⚽', '☀️', '🐱']),
    explanation: 'Ball starts with /b/.',
    sequence: 1
  }),
  soundExamMcq({
    id: 'phonics-alphabet-sounds-exam-001-q002',
    title: 'Alphabet Sounds Exam Question 2',
    item: byLetter.M,
    question: 'Which letter makes the /m/ sound?',
    options: ['S', 'M', 'T'],
    correctAnswer: 'M',
    promptVisual: emoji('🥭'),
    optionVisuals: [textVisual('S'), textVisual('M'), textVisual('T')],
    explanation: 'M makes the /m/ sound.',
    sequence: 2
  }),
  soundExamMcq({
    id: 'phonics-alphabet-sounds-exam-001-q003',
    title: 'Alphabet Sounds Exam Question 3',
    item: byLetter.D,
    question: 'Choose the picture that starts with /d/.',
    options: ['dog', 'apple', 'sun'],
    correctAnswer: 'dog',
    promptVisual: textVisual('D'),
    optionVisuals: optionVisualsFromEmoji(['🐶', '🍎', '☀️']),
    explanation: 'Dog starts with /d/.',
    sequence: 3
  }),
  soundExamMcq({
    id: 'phonics-alphabet-sounds-exam-001-q004',
    title: 'Alphabet Sounds Exam Question 4',
    item: byLetter.S,
    question: 'Listen to /s/. Which word starts with /s/?',
    options: ['cup', 'sun', 'dog'],
    correctAnswer: 'sun',
    promptVisual: textVisual('S'),
    optionVisuals: optionVisualsFromEmoji(['🥤', '☀️', '🐶']),
    explanation: 'Sun starts with /s/.',
    sequence: 4
  }),
  soundExamMcq({
    id: 'phonics-alphabet-sounds-exam-001-q005',
    title: 'Alphabet Sounds Exam Question 5',
    item: byLetter.F,
    question: 'Which word starts with /f/?',
    options: ['fish', 'ball', 'goat'],
    correctAnswer: 'fish',
    promptVisual: textVisual('F'),
    optionVisuals: optionVisualsFromEmoji(['🐟', '⚽', '🐐']),
    explanation: 'Fish starts with /f/.',
    sequence: 5
  }),
  soundExamMcq({
    id: 'phonics-alphabet-sounds-exam-001-q006',
    title: 'Alphabet Sounds Exam Question 6',
    item: byLetter.R,
    question: 'Choose the picture that starts with /r/.',
    options: ['rabbit', 'hat', 'net'],
    correctAnswer: 'rabbit',
    promptVisual: textVisual('R'),
    optionVisuals: optionVisualsFromEmoji(['🐰', '🎩', '🥅']),
    explanation: 'Rabbit starts with /r/.',
    sequence: 6
  }),
  soundExamMcq({
    id: 'phonics-alphabet-sounds-exam-001-q007',
    title: 'Alphabet Sounds Exam Question 7',
    item: byLetter.T,
    question: 'Which letter makes the /t/ sound?',
    options: ['T', 'N', 'L'],
    correctAnswer: 'T',
    promptVisual: emoji('🍅'),
    optionVisuals: [textVisual('T'), textVisual('N'), textVisual('L')],
    explanation: 'T makes the /t/ sound.',
    sequence: 7
  }),
  soundExamMcq({
    id: 'phonics-alphabet-sounds-exam-001-q008',
    title: 'Alphabet Sounds Exam Question 8',
    item: byLetter.P,
    question: 'Listen to /p/. Which word starts with /p/?',
    options: ['pen', 'lion', 'van'],
    correctAnswer: 'pen',
    promptVisual: textVisual('P'),
    optionVisuals: optionVisualsFromEmoji(['🖊️', '🦁', '🚐']),
    explanation: 'Pen starts with /p/.',
    sequence: 8
  }),
  soundExamMcq({
    id: 'phonics-alphabet-sounds-exam-001-q009',
    title: 'Alphabet Sounds Exam Question 9',
    item: byLetter.C,
    question: 'Choose the picture that starts with /k/.',
    options: ['cat', 'dog', 'sun'],
    correctAnswer: 'cat',
    promptVisual: textVisual('C'),
    optionVisuals: optionVisualsFromEmoji(['🐱', '🐶', '☀️']),
    explanation: 'Cat starts with /k/. Letter C can make the /k/ sound.',
    sequence: 9
  }),
  soundExamMcq({
    id: 'phonics-alphabet-sounds-exam-001-q010',
    title: 'Alphabet Sounds Exam Question 10',
    item: byLetter.Z,
    question: 'Which word starts with /z/?',
    options: ['zebra', 'water', 'moon'],
    correctAnswer: 'zebra',
    promptVisual: textVisual('Z'),
    optionVisuals: optionVisualsFromEmoji(['🦓', '💧', '🌙']),
    explanation: 'Zebra starts with /z/.',
    sequence: 10
  }),
  soundExamMcq({
    id: 'phonics-alphabet-sounds-exam-001-q011',
    title: 'Alphabet Sounds Exam Question 11',
    item: byLetter.L,
    question: 'Listen to /l/. Choose the word that starts with /l/.',
    options: ['lion', 'fish', 'cup'],
    correctAnswer: 'lion',
    promptVisual: textVisual('L'),
    optionVisuals: optionVisualsFromEmoji(['🦁', '🐟', '🥤']),
    explanation: 'Lion starts with /l/.',
    sequence: 11
  }),
  soundExamMcq({
    id: 'phonics-alphabet-sounds-exam-001-q012',
    title: 'Alphabet Sounds Exam Question 12',
    item: byLetter.H,
    question: 'Choose the picture that starts with /h/.',
    options: ['hat', 'goat', 'apple'],
    correctAnswer: 'hat',
    promptVisual: textVisual('H'),
    optionVisuals: optionVisualsFromEmoji(['🎩', '🐐', '🍎']),
    explanation: 'Hat starts with /h/.',
    sequence: 12
  }),
  soundExamMcq({
    id: 'phonics-alphabet-sounds-exam-001-q013',
    title: 'Alphabet Sounds Exam Question 13',
    item: byLetter.W,
    question: 'Which letter makes the /w/ sound?',
    options: ['V', 'W', 'Y'],
    correctAnswer: 'W',
    promptVisual: emoji('💧'),
    optionVisuals: [textVisual('V'), textVisual('W'), textVisual('Y')],
    explanation: 'W makes the /w/ sound, as in water.',
    sequence: 13
  }),
  soundExamMcq({
    id: 'phonics-alphabet-sounds-exam-001-q014',
    title: 'Alphabet Sounds Exam Question 14',
    item: byLetter.X,
    question: 'Listen to /ks/. Which word has the /ks/ sound?',
    options: ['box', 'bed', 'sun'],
    correctAnswer: 'box',
    promptVisual: textVisual('X'),
    optionVisuals: optionVisualsFromEmoji(['📦', '🛏️', '☀️']),
    explanation: 'Box has the /ks/ sound.',
    sequence: 14
  }),
  soundExamMcq({
    id: 'phonics-alphabet-sounds-exam-001-q015',
    title: 'Alphabet Sounds Exam Question 15',
    item: byLetter.Y,
    question: 'Which word starts with /y/?',
    options: ['yellow', 'zebra', 'rabbit'],
    correctAnswer: 'yellow',
    promptVisual: textVisual('Y'),
    optionVisuals: optionVisualsFromEmoji(['🟡', '🦓', '🐰']),
    explanation: 'Yellow starts with /y/.',
    sequence: 15
  })
];

export default questions;
