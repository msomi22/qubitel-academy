import { defineMcqProblem } from '../../../../../problems/problemAuthoring.js';

const words = [
  ['morning', ['moring', 'mornin', 'moning']],
  ['evening', ['evning', 'evenin', 'eavning']],
  ['children', ['childrens', 'childen', 'childern']],
  ['birthday', ['bithday', 'birthdy', 'berthday']],
  ['family', ['famly', 'familey', 'femily']],
  ['people', ['peaple', 'peeple', 'peple']],
  ['answer', ['anser', 'answar', 'anwser']],
  ['different', ['diferent', 'differnt', 'diffrent']],
  ['beautiful', ['butiful', 'beatiful', 'beautifull']],
  ['colour', ['colur', 'culour', 'collour']]
];

const answerPositions = [2, 0, 3, 1, 2, 3, 0, 1, 3, 2];

function optionsFor(correctWord, wrongWords, answerPosition) {
  const options = [...wrongWords];
  options.splice(answerPosition, 0, correctWord);
  return options;
}

const questions = words.map(([correctWord, wrongWords], index) => defineMcqProblem({
  id: `english-spelling-practice-002-q${String(index + 1).padStart(3, '0')}`,
  category: 'grade-3',
  topicId: 'english',
  title: `Spelling Practice 2: ${correctWord}`,
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
  finalTakeaway: 'Look closely at the beginning, middle, and end of the word.',
  tags: ['cbc', 'grade-3', 'english', 'spelling', 'practice'],
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod'],
    source: 'original',
    audience: 'grade-3',
    practiceId: 'spelling-practice-002',
    practiceTitle: 'Spelling Practice 2',
    sequence: 20 + index
  }
}));

export default questions;
