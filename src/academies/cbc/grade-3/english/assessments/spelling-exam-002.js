import { defineMcqProblem } from '../../../../../problems/problemAuthoring.js';

const words = [
  ['garden', ['gardan', 'gaden', 'gardern']],
  ['window', ['windo', 'wendow', 'winndow']],
  ['kitchen', ['kichen', 'kitshen', 'kitchin']],
  ['banana', ['bannana', 'bananna', 'banena']],
  ['sister', ['sester', 'sistar', 'sisster']],
  ['brother', ['broter', 'brothar', 'bruther']],
  ['holiday', ['holliday', 'holidy', 'holladay']],
  ['market', ['markit', 'markett', 'marcket']],
  ['doctor', ['docter', 'doktor', 'doctar']],
  ['pencil', ['pensil', 'pencel', 'pencill']],
  ['rabbit', ['rabit', 'rabbitt', 'rebbit']],
  ['flower', ['flouer', 'flowar', 'flowerr']],
  ['table', ['tabel', 'tabble', 'tayble']],
  ['basket', ['baskit', 'bascket', 'baskett']],
  ['tomorrow', ['tomorow', 'tommorrow', 'tomarrow']],
  ['yesterday', ['yestarday', 'yesturday', 'yesterdey']],
  ['lesson', ['leson', 'lessun', 'lessonn']],
  ['number', ['nuber', 'numbar', 'nummber']],
  ['picture', ['pictur', 'pikchure', 'pictuer']],
  ['village', ['vilage', 'villige', 'villlage']]
];

const answerPositions = [2, 0, 3, 1, 2, 3, 0, 1, 3, 2, 1, 0, 2, 3, 1, 0, 3, 2, 0, 1];

function optionsFor(correctWord, wrongWords, answerPosition) {
  const options = [...wrongWords];
  options.splice(answerPosition, 0, correctWord);
  return options;
}

const questions = words.map(([correctWord, wrongWords], index) => defineMcqProblem({
  id: `english-spelling-exam-002-q${String(index + 1).padStart(3, '0')}`,
  category: 'grade-3',
  topicId: 'english',
  title: `Spelling Exam 2 Question ${index + 1}`,
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
    examId: 'spelling-exam-002',
    examTitle: 'Spelling Exam 2',
    assessmentType: 'exam',
    points: 1,
    sequence: 50 + index
  }
}));

export default questions;
