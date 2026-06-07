import { defineMcqProblem } from '../../../../../../problems/problemAuthoring.js';

const words = [
  ['book', ['bok', 'boook', 'booke']],
  ['pencil', ['pensil', 'pencel', 'pencill']],
  ['ruler', ['rular', 'ruller', 'ruleer']],
  ['desk', ['desck', 'dask', 'deskk']],
  ['chair', ['chare', 'cheir', 'chairr']],
  ['bag', ['beg', 'bagg', 'baag']],
  ['chalk', ['chock', 'chak', 'chalkk']],
  ['board', ['bord', 'boad', 'boardd']],
  ['eraser', ['erazer', 'erasa', 'erasor']],
  ['crayon', ['crayen', 'crayun', 'crayonn']],
  ['teacher', ['techer', 'teachar', 'teecher']],
  ['classroom', ['clasroom', 'classrom', 'classroomm']],
  ['bell', ['bel', 'belll', 'bal']],
  ['paper', ['papar', 'papor', 'papper']],
  ['marker', ['markar', 'makker', 'markerr']],
  ['uniform', ['unform', 'yuniform', 'uniformm']],
  ['lesson', ['leson', 'lessun', 'lessonn']],
  ['library', ['libary', 'librery', 'liberary']],
  ['school', ['skool', 'shool', 'scool']],
  ['exercise', ['exersise', 'exercize', 'excercise']]
];

const answerPositions = [0, 2, 1, 3, 0, 1, 2, 3, 1, 0, 3, 2, 0, 1, 3, 2, 1, 0, 3, 2];

function optionsFor(correctWord, wrongWords, answerPosition) {
  const options = [...wrongWords];
  options.splice(answerPosition, 0, correctWord);
  return options;
}

const questions = words.map(([correctWord, wrongWords], index) => defineMcqProblem({
  id: `english-spelling-exam-005-q${String(index + 1).padStart(3, '0')}`,
  category: 'grade-3',
  topicId: 'english',
  title: `Spelling Exam 5 Question ${index + 1}`,
  difficulty: 'Easy',
  estimatedTimeSeconds: 30,
  question: 'Choose the correctly spelt school item.',
  body: [
    {
      type: 'section',
      title: 'Objective',
      content: 'I can finish a short spelling exam and see my score.'
    },
    {
      type: 'section',
      title: 'Question',
      content: 'Choose the correctly spelt school item.'
    }
  ],
  options: optionsFor(correctWord, wrongWords, answerPositions[index]),
  correctAnswer: correctWord,
  explanation: `${correctWord} is the correct spelling.`,
  finalTakeaway: 'Check every letter carefully.',
  tags: ['cbc', 'grade-3', 'english', 'spelling', 'exam', 'school-items'],
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod'],
    source: 'original',
    audience: 'grade-3',
    examId: 'spelling-exam-005',
    examTitle: 'Spelling Exam 5',
    assessmentType: 'exam',
    points: 1,
    sequence: 110 + index
  }
}));

export default questions;
