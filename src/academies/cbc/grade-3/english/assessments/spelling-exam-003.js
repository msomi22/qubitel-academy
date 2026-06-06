import { defineMcqProblem } from '../../../../../problems/problemAuthoring.js';

const words = [
  ['spoon', ['spun', 'spon', 'spoonn']],
  ['plate', ['plat', 'plte', 'platee']],
  ['cup', ['cap', 'cop', 'cupp']],
  ['fork', ['fok', 'forck', 'frok']],
  ['knife', ['nife', 'knif', 'knaif']],
  ['kettle', ['ketle', 'kettel', 'ketal']],
  ['pot', ['pat', 'pott', 'poat']],
  ['pan', ['pen', 'pann', 'paan']],
  ['stove', ['stov', 'stoove', 'stovee']],
  ['bowl', ['bol', 'bowel', 'boal']],
  ['fridge', ['frige', 'fridg', 'fridgee']],
  ['cooker', ['coker', 'cookar', 'coocker']],
  ['table', ['tabel', 'tabble', 'tayble']],
  ['chair', ['chare', 'cheir', 'chairr']],
  ['sink', ['sinc', 'synk', 'sinkk']],
  ['jug', ['jag', 'jugg', 'jog']],
  ['tray', ['trai', 'trey', 'trayy']],
  ['glass', ['glas', 'glase', 'glasss']],
  ['bucket', ['buket', 'buckit', 'buckett']],
  ['basket', ['baskit', 'bascket', 'baskett']]
];

const answerPositions = [1, 3, 0, 2, 1, 0, 3, 2, 0, 1, 2, 0, 3, 1, 2, 3, 0, 1, 3, 2];

function optionsFor(correctWord, wrongWords, answerPosition) {
  const options = [...wrongWords];
  options.splice(answerPosition, 0, correctWord);
  return options;
}

const questions = words.map(([correctWord, wrongWords], index) => defineMcqProblem({
  id: `english-spelling-exam-003-q${String(index + 1).padStart(3, '0')}`,
  category: 'grade-3',
  topicId: 'english',
  title: `Spelling Exam 3 Question ${index + 1}`,
  difficulty: 'Easy',
  estimatedTimeSeconds: 30,
  question: 'Choose the correctly spelt kitchen item.',
  body: [
    {
      type: 'section',
      title: 'Objective',
      content: 'I can finish a short spelling exam and see my score.'
    },
    {
      type: 'section',
      title: 'Question',
      content: 'Choose the correctly spelt kitchen item.'
    }
  ],
  options: optionsFor(correctWord, wrongWords, answerPositions[index]),
  correctAnswer: correctWord,
  explanation: `${correctWord} is the correct spelling.`,
  finalTakeaway: 'Check every letter carefully.',
  tags: ['cbc', 'grade-3', 'english', 'spelling', 'exam', 'kitchen-items'],
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod'],
    source: 'original',
    audience: 'grade-3',
    examId: 'spelling-exam-003',
    examTitle: 'Spelling Exam 3',
    assessmentType: 'exam',
    points: 1,
    sequence: 70 + index
  }
}));

export default questions;
