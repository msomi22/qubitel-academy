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
  id: `english-spelling-practice-006-q${String(index + 1).padStart(3, '0')}`,
  category: 'grade-3',
  topicId: 'english',
  title: `Spelling Practice 6: ${correctWord}`,
  difficulty: 'Easy',
  estimatedTime: '1 min',
  question: 'Choose the correctly spelt fruit.',
  body: [
    {
      type: 'section',
      title: 'Objective',
      content: 'I can check every letter before choosing an answer.'
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
  finalTakeaway: 'Check the spelling from the first letter to the last letter.',
  tags: ['cbc', 'grade-3', 'english', 'spelling', 'practice', 'fruits'],
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod'],
    source: 'original',
    audience: 'grade-3',
    practiceId: 'spelling-practice-006',
    practiceTitle: 'Spelling Practice 6',
    sequence: 60 + index
  }
}));

export default questions;
