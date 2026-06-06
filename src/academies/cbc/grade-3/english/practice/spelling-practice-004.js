import { defineMcqProblem } from '../../../../../problems/problemAuthoring.js';

const words = [
  ['hoe', ['ho', 'hoo', 'howe']],
  ['rake', ['raik', 'reak', 'rakee']],
  ['spade', ['spaid', 'spad', 'spadee']],
  ['cow', ['caw', 'coww', 'kow']],
  ['goat', ['gote', 'goet', 'goatt']],
  ['sheep', ['shep', 'sheap', 'sheepp']],
  ['chicken', ['chiken', 'chickin', 'chickenn']],
  ['maize', ['maiz', 'maise', 'mayze']],
  ['beans', ['beens', 'beanes', 'beanz']],
  ['milk', ['melk', 'milck', 'milkk']],
  ['tractor', ['tracter', 'traktor', 'tractorr']],
  ['soil', ['soyl', 'soll', 'soill']],
  ['seed', ['sed', 'sead', 'seedd']],
  ['crop', ['crob', 'cropp', 'krop']],
  ['barn', ['ban', 'barne', 'barnn']],
  ['rope', ['roap', 'rop', 'ropee']],
  ['fence', ['fense', 'fens', 'fencee']],
  ['grass', ['gras', 'grase', 'grasss']],
  ['water', ['woter', 'watar', 'watter']],
  ['farmer', ['famer', 'farmar', 'farmmer']]
];

const answerPositions = [2, 0, 3, 1, 2, 3, 0, 1, 3, 2, 1, 0, 2, 3, 1, 0, 3, 2, 0, 1];

function optionsFor(correctWord, wrongWords, answerPosition) {
  const options = [...wrongWords];
  options.splice(answerPosition, 0, correctWord);
  return options;
}

const questions = words.map(([correctWord, wrongWords], index) => defineMcqProblem({
  id: `english-spelling-practice-004-q${String(index + 1).padStart(3, '0')}`,
  category: 'grade-3',
  topicId: 'english',
  title: `Spelling Practice 4: ${correctWord}`,
  difficulty: 'Easy',
  estimatedTime: '1 min',
  question: 'Choose the correctly spelt farm item.',
  body: [
    {
      type: 'section',
      title: 'Objective',
      content: 'I can check every letter before choosing an answer.'
    },
    {
      type: 'section',
      title: 'Question',
      content: 'Choose the correctly spelt farm item.'
    }
  ],
  options: optionsFor(correctWord, wrongWords, answerPositions[index]),
  correctAnswer: correctWord,
  explanation: `${correctWord} is the correct spelling.`,
  finalTakeaway: 'Look closely at the beginning, middle, and end of the word.',
  tags: ['cbc', 'grade-3', 'english', 'spelling', 'practice', 'farm-items'],
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod'],
    source: 'original',
    audience: 'grade-3',
    practiceId: 'spelling-practice-004',
    practiceTitle: 'Spelling Practice 4',
    sequence: 40 + index
  }
}));

export default questions;
