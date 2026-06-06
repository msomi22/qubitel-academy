import { defineMcqProblem } from '../../../../../problems/problemAuthoring.js';

const words = [
  ['mango', ['mengo', 'mangoe', 'mangoo']],
  ['banana', ['bannana', 'bananna', 'banena']],
  ['apple', ['aple', 'appel', 'applee']],
  ['orange', ['orenge', 'orang', 'oranje']],
  ['lemon', ['lemen', 'lemmon', 'lemonn']],
  ['melon', ['mellon', 'melun', 'melonn']],
  ['pawpaw', ['powpaw', 'pawpwa', 'pawpaww']],
  ['guava', ['guva', 'guawa', 'guavaa']],
  ['avocado', ['avacado', 'avocardo', 'avocadoe']],
  ['pineapple', ['pinapple', 'pineaple', 'pineappel']],
  ['grapes', ['graps', 'graipes', 'grapse']],
  ['peach', ['peech', 'pech', 'peache']],
  ['plum', ['plam', 'plumm', 'plume']],
  ['berry', ['bery', 'berri', 'berryy']],
  ['coconut', ['cocunut', 'coconat', 'coconnut']],
  ['tomato', ['tamato', 'tomatto', 'tomatoo']],
  ['passion', ['pashon', 'passon', 'pashion']],
  ['pear', ['pair', 'peare', 'per']],
  ['dates', ['dats', 'datees', 'daites']],
  ['watermelon', ['watermellon', 'watermelun', 'watermellun']]
];

const answerPositions = [3, 1, 2, 0, 3, 1, 2, 0, 3, 1, 2, 0, 3, 1, 2, 0, 3, 1, 2, 0];

function optionsFor(correctWord, wrongWords, answerPosition) {
  const options = [...wrongWords];
  options.splice(answerPosition, 0, correctWord);
  return options;
}

const questions = words.map(([correctWord, wrongWords], index) => defineMcqProblem({
  id: `english-spelling-exam-006-q${String(index + 1).padStart(3, '0')}`,
  category: 'grade-3',
  topicId: 'english',
  title: `Spelling Exam 6 Question ${index + 1}`,
  difficulty: 'Easy',
  estimatedTimeSeconds: 30,
  question: 'Choose the correctly spelt fruit.',
  body: [
    {
      type: 'section',
      title: 'Objective',
      content: 'I can finish a short spelling exam and see my score.'
    },
    {
      type: 'section',
      title: 'Question',
      content: 'Choose the correctly spelt fruit.'
    }
  ],
  options: optionsFor(correctWord, wrongWords, answerPositions[index]),
  correctAnswer: correctWord,
  explanation: `${correctWord} is the correct spelling.`,
  finalTakeaway: 'Check every letter carefully.',
  tags: ['cbc', 'grade-3', 'english', 'spelling', 'exam', 'fruits'],
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod'],
    source: 'original',
    audience: 'grade-3',
    examId: 'spelling-exam-006',
    examTitle: 'Spelling Exam 6',
    assessmentType: 'exam',
    points: 1,
    sequence: 130 + index
  }
}));

export default questions;
