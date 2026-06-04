import { defineMcqProblem } from '../../../../../problems/problemAuthoring.js';

const words = [
  ['school', ['skool', 'shool', 'scool']],
  ['friend', ['frend', 'freind', 'friand']],
  ['teacher', ['techer', 'teachar', 'teecher']],
  ['mother', ['muther', 'mothar', 'mather']],
  ['father', ['fater', 'fathar', 'faather']],
  ['house', ['hause', 'hous', 'hoese']],
  ['water', ['woter', 'watar', 'watter']],
  ['animal', ['animol', 'anemal', 'animel']],
  ['yellow', ['yelow', 'yelloe', 'yello']],
  ['orange', ['orenge', 'orang', 'oranje']]
];

const answerPositions = [1, 3, 0, 2, 1, 0, 3, 2, 0, 1];

function optionsFor(correctWord, wrongWords, answerPosition) {
  const options = [...wrongWords];
  options.splice(answerPosition, 0, correctWord);
  return options;
}

const questions = words.map(([correctWord, wrongWords], index) => defineMcqProblem({
  id: `english-spelling-practice-001-q${String(index + 1).padStart(3, '0')}`,
  category: 'grade-3',
  topicId: 'english',
  title: `Spelling Practice 1: ${correctWord}`,
  difficulty: 'Easy',
  estimatedTime: '1 min',
  question: 'Choose the correctly spelt word.',
  body: [
    {
      type: 'section',
      title: 'Objective',
      content: 'I can check every letter before choosing an answer.'
    },
    {
      type: 'section',
      title: 'Question',
      content: 'Choose the correctly spelt word.'
    }
  ],
  options: optionsFor(correctWord, wrongWords, answerPositions[index]),
  correctAnswer: correctWord,
  explanation: `${correctWord} is the correct spelling.`,
  finalTakeaway: 'Read every letter before you choose.',
  tags: ['cbc', 'grade-3', 'english', 'spelling', 'practice'],
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod'],
    source: 'original',
    audience: 'grade-3',
    practiceId: 'spelling-practice-001',
    practiceTitle: 'Spelling Practice 1',
    sequence: 10 + index
  }
}));

export default questions;
