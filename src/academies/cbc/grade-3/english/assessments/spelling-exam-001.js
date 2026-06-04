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
  ['orange', ['orenge', 'orang', 'oranje']],
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

const answerPositions = [1, 3, 0, 2, 1, 0, 3, 2, 0, 1, 2, 0, 3, 1, 2, 3, 0, 1, 3, 2];

function optionsFor(correctWord, wrongWords, answerPosition) {
  const options = [...wrongWords];
  options.splice(answerPosition, 0, correctWord);
  return options;
}

const questions = words.map(([correctWord, wrongWords], index) => defineMcqProblem({
  id: `english-spelling-exam-001-q${String(index + 1).padStart(3, '0')}`,
  category: 'grade-3',
  topicId: 'english',
  title: `Spelling Exam 1 Question ${index + 1}`,
  difficulty: 'Easy',
  estimatedTimeSeconds: 30,
  question: 'Choose the correctly spelt word.',
  body: [
    {
      type: 'section',
      title: 'Objective',
      content: 'I can finish a short spelling exam and see my score.'
    }
  ],
  options: optionsFor(correctWord, wrongWords, answerPositions[index]),
  correctAnswer: correctWord,
  explanation: `${correctWord} is the correct spelling.`,
  finalTakeaway: 'Check every letter carefully.',
  tags: ['cbc', 'grade-3', 'english', 'spelling', 'exam'],
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod'],
    source: 'original',
    audience: 'grade-3',
    examId: 'spelling-exam-001',
    examTitle: 'Spelling Exam 1',
    assessmentType: 'exam',
    points: 1,
    sequence: 30 + index
  }
}));

export default questions;
