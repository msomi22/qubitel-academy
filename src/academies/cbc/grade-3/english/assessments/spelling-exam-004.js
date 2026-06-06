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
  id: `english-spelling-exam-004-q${String(index + 1).padStart(3, '0')}`,
  category: 'grade-3',
  topicId: 'english',
  title: `Spelling Exam 4 Question ${index + 1}`,
  difficulty: 'Easy',
  estimatedTimeSeconds: 30,
  question: 'Choose the correctly spelt farm item.',
  body: [
    {
      type: 'section',
      title: 'Objective',
      content: 'I can finish a short spelling exam and see my score.'
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
  finalTakeaway: 'Check every letter carefully.',
  tags: ['cbc', 'grade-3', 'english', 'spelling', 'exam', 'farm-items'],
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod'],
    source: 'original',
    audience: 'grade-3',
    examId: 'spelling-exam-004',
    examTitle: 'Spelling Exam 4',
    assessmentType: 'exam',
    points: 1,
    sequence: 90 + index
  }
}));

export default questions;
