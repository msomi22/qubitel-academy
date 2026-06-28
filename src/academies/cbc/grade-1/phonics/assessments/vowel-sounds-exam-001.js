import { defineMcqProblem } from '../../../../../problems/problemAuthoring.js';
import { emoji, optionVisualsFromEmoji, phonicsMetadata, shortVowels, textVisual } from '../phonicsData.js';

const byLetter = Object.fromEntries(shortVowels.map((item) => [item.letter, item]));

function vowelExamMcq({
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
    rendering: {
      suppressObjective: true
    },
    body: [
      {
        type: 'section',
        title: 'Objective',
        content: 'I can listen for short vowel sounds and match them to words and pictures.'
      }
    ],
    options,
    correctAnswer,
    explanation,
    finalTakeaway: 'Short vowel sounds help you read simple words.',
    tags: ['cbc', 'grade-1', 'phonics', 'short-vowels', 'exam', 'visual-mcq'],
    metadata: {
      reviewStatus: 'approved',
      visibility: ['dev', 'prod'],
      source: 'original',
      audience: 'grade-1',
      skill: 'short-vowels',
      interactionType: 'visual-mcq',
      promptVisual,
      optionVisuals,
      readAloud: true,
      autoReadAloud: false,
      readAloudText,
      readOptionsAloud: true,
      rendering: {
        suppressObjective: true
      },
      phonics: phonicsMetadata(item, { soundType: 'short-vowel' }),
      examId: 'vowel-sounds-exam-001',
      examTitle: 'Grade 1 Vowel Sounds Exam',
      assessmentType: 'exam',
      points: 1,
      sequence: 400 + sequence
    }
  });
}

const questions = [
  vowelExamMcq({
    id: 'phonics-vowel-sounds-exam-001-q001',
    title: 'Vowel Sounds Exam Question 1',
    item: byLetter.A,
    question: 'Listen to the short /a/ sound. Which word has /a/?',
    options: ['cat', 'pen', 'dog'],
    correctAnswer: 'cat',
    promptVisual: textVisual('A'),
    optionVisuals: optionVisualsFromEmoji(['🐱', '🖊️', '🐶']),
    explanation: 'Cat has the short /a/ sound.',
    sequence: 1
  }),
  vowelExamMcq({
    id: 'phonics-vowel-sounds-exam-001-q002',
    title: 'Vowel Sounds Exam Question 2',
    item: byLetter.E,
    question: 'Which word has the short /e/ sound?',
    options: ['bed', 'cup', 'sun'],
    correctAnswer: 'bed',
    promptVisual: textVisual('E'),
    optionVisuals: optionVisualsFromEmoji(['🛏️', '🥤', '☀️']),
    explanation: 'Bed has the short /e/ sound.',
    sequence: 2
  }),
  vowelExamMcq({
    id: 'phonics-vowel-sounds-exam-001-q003',
    title: 'Vowel Sounds Exam Question 3',
    item: byLetter.I,
    question: 'Listen to the short /i/ sound. Choose the word with /i/.',
    options: ['pig', 'hat', 'box'],
    correctAnswer: 'pig',
    promptVisual: textVisual('I'),
    optionVisuals: optionVisualsFromEmoji(['🐷', '🎩', '📦']),
    explanation: 'Pig has the short /i/ sound.',
    sequence: 3
  }),
  vowelExamMcq({
    id: 'phonics-vowel-sounds-exam-001-q004',
    title: 'Vowel Sounds Exam Question 4',
    item: byLetter.O,
    question: 'Which word has the short /o/ sound?',
    options: ['dog', 'pen', 'bus'],
    correctAnswer: 'dog',
    promptVisual: textVisual('O'),
    optionVisuals: optionVisualsFromEmoji(['🐶', '🖊️', '🚌']),
    explanation: 'Dog has the short /o/ sound.',
    sequence: 4
  }),
  vowelExamMcq({
    id: 'phonics-vowel-sounds-exam-001-q005',
    title: 'Vowel Sounds Exam Question 5',
    item: byLetter.U,
    question: 'Listen to the short /u/ sound. Which word has /u/?',
    options: ['cup', 'fish', 'cat'],
    correctAnswer: 'cup',
    promptVisual: textVisual('U'),
    optionVisuals: optionVisualsFromEmoji(['🥤', '🐟', '🐱']),
    explanation: 'Cup has the short /u/ sound.',
    sequence: 5
  }),
  vowelExamMcq({
    id: 'phonics-vowel-sounds-exam-001-q006',
    title: 'Vowel Sounds Exam Question 6',
    item: byLetter.A,
    question: 'Which vowel starts apple?',
    options: ['A', 'E', 'O'],
    correctAnswer: 'A',
    promptVisual: emoji('🍎'),
    optionVisuals: [textVisual('A'), textVisual('E'), textVisual('O')],
    explanation: 'Apple starts with A and the short /a/ sound.',
    sequence: 6
  }),
  vowelExamMcq({
    id: 'phonics-vowel-sounds-exam-001-q007',
    title: 'Vowel Sounds Exam Question 7',
    item: byLetter.E,
    question: 'Which vowel starts egg?',
    options: ['I', 'E', 'U'],
    correctAnswer: 'E',
    promptVisual: emoji('🥚'),
    optionVisuals: [textVisual('I'), textVisual('E'), textVisual('U')],
    explanation: 'Egg starts with E and the short /e/ sound.',
    sequence: 7
  }),
  vowelExamMcq({
    id: 'phonics-vowel-sounds-exam-001-q008',
    title: 'Vowel Sounds Exam Question 8',
    item: byLetter.I,
    question: 'Choose the word with the short /i/ sound.',
    options: ['fish', 'sun', 'bed'],
    correctAnswer: 'fish',
    promptVisual: textVisual('I'),
    optionVisuals: optionVisualsFromEmoji(['🐟', '☀️', '🛏️']),
    explanation: 'Fish has the short /i/ sound.',
    sequence: 8
  }),
  vowelExamMcq({
    id: 'phonics-vowel-sounds-exam-001-q009',
    title: 'Vowel Sounds Exam Question 9',
    item: byLetter.O,
    question: 'Choose the word with the short /o/ sound.',
    options: ['box', 'hat', 'pen'],
    correctAnswer: 'box',
    promptVisual: textVisual('O'),
    optionVisuals: optionVisualsFromEmoji(['📦', '🎩', '🖊️']),
    explanation: 'Box has the short /o/ sound.',
    sequence: 9
  }),
  vowelExamMcq({
    id: 'phonics-vowel-sounds-exam-001-q010',
    title: 'Vowel Sounds Exam Question 10',
    item: byLetter.U,
    question: 'Choose the word with the short /u/ sound.',
    options: ['sun', 'dog', 'pen'],
    correctAnswer: 'sun',
    promptVisual: textVisual('U'),
    optionVisuals: optionVisualsFromEmoji(['☀️', '🐶', '🖊️']),
    explanation: 'Sun has the short /u/ sound.',
    sequence: 10
  }),
  vowelExamMcq({
    id: 'phonics-vowel-sounds-exam-001-q011',
    title: 'Vowel Sounds Exam Question 11',
    item: byLetter.A,
    question: 'Which word has the short /a/ sound?',
    options: ['bag', 'net', 'bus'],
    correctAnswer: 'bag',
    promptVisual: textVisual('A'),
    optionVisuals: optionVisualsFromEmoji(['🎒', '🥅', '🚌']),
    explanation: 'Bag has the short /a/ sound.',
    sequence: 11
  }),
  vowelExamMcq({
    id: 'phonics-vowel-sounds-exam-001-q012',
    title: 'Vowel Sounds Exam Question 12',
    item: byLetter.E,
    question: 'Listen to /e/. Choose the word with /e/.',
    options: ['hen', 'cup', 'box'],
    correctAnswer: 'hen',
    promptVisual: textVisual('E'),
    optionVisuals: optionVisualsFromEmoji(['🐔', '🥤', '📦']),
    explanation: 'Hen has the short /e/ sound.',
    sequence: 12
  }),
  vowelExamMcq({
    id: 'phonics-vowel-sounds-exam-001-q013',
    title: 'Vowel Sounds Exam Question 13',
    item: byLetter.I,
    question: 'Which word has the short /i/ sound?',
    options: ['pin', 'hat', 'dog'],
    correctAnswer: 'pin',
    promptVisual: textVisual('I'),
    optionVisuals: optionVisualsFromEmoji(['📍', '🎩', '🐶']),
    explanation: 'Pin has the short /i/ sound.',
    sequence: 13
  }),
  vowelExamMcq({
    id: 'phonics-vowel-sounds-exam-001-q014',
    title: 'Vowel Sounds Exam Question 14',
    item: byLetter.O,
    question: 'Listen to /o/. Choose the word with /o/.',
    options: ['pot', 'fish', 'sun'],
    correctAnswer: 'pot',
    promptVisual: textVisual('O'),
    optionVisuals: optionVisualsFromEmoji(['🍲', '🐟', '☀️']),
    explanation: 'Pot has the short /o/ sound.',
    sequence: 14
  }),
  vowelExamMcq({
    id: 'phonics-vowel-sounds-exam-001-q015',
    title: 'Vowel Sounds Exam Question 15',
    item: byLetter.U,
    question: 'Which word has the short /u/ sound?',
    options: ['hut', 'pen', 'cat'],
    correctAnswer: 'hut',
    promptVisual: textVisual('U'),
    optionVisuals: optionVisualsFromEmoji(['🏚️', '🖊️', '🐱']),
    explanation: 'Hut has the short /u/ sound.',
    sequence: 15
  })
];

export default questions;
