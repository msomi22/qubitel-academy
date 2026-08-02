import { defineMcqProblem } from '../../../../../../problems/problemAuthoring.js';

function emoji(value) {
  return { type: 'emoji', value };
}

const examId = 'writing-missing-letters-exam-001';
const examTitle = 'Exam 1: Missing Letters in 3-Letter Words';
const learningAreaId = 'writing-readiness';
const questionTimeSeconds = 60;
const sequenceBase = 2000;

const questions = [
  {
    prompt: '_ o w',
    completedWord: 'cow',
    readAloudText: 'Choose the missing letter to complete the word, cow.',
    visualHint: '🐄',
    options: ['c', 'b', 'd', 'm'],
    correctAnswer: 'c',
    explanation: 'c completes cow.'
  },
  {
    prompt: 'c _ t',
    completedWord: 'cat',
    readAloudText: 'Choose the missing letter to complete the word, cat.',
    visualHint: '🐈',
    options: ['i', 'a', 'e', 'o'],
    correctAnswer: 'a',
    explanation: 'a completes cat.'
  },
  {
    prompt: 'd o _',
    completedWord: 'dog',
    readAloudText: 'Choose the missing letter to complete the word, dog.',
    visualHint: '🐕',
    options: ['t', 'n', 'g', 'p'],
    correctAnswer: 'g',
    explanation: 'g completes dog.'
  },
  {
    prompt: '_ u n',
    completedWord: 'sun',
    readAloudText: 'Choose the missing letter to complete the word, sun.',
    visualHint: '☀️',
    options: ['m', 'r', 't', 's'],
    correctAnswer: 's',
    explanation: 's completes sun.'
  },
  {
    prompt: 'p _ n',
    completedWord: 'pen',
    readAloudText: 'Choose the missing letter to complete the word, pen.',
    visualHint: '🖊️',
    options: ['e', 'i', 'o', 'a'],
    correctAnswer: 'e',
    explanation: 'e completes pen.'
  },
  {
    prompt: 'b u _',
    completedWord: 'bus',
    readAloudText: 'Choose the missing letter to complete the word, bus.',
    visualHint: '🚌',
    options: ['n', 's', 't', 'g'],
    correctAnswer: 's',
    explanation: 's completes bus.'
  },
  {
    prompt: '_ i g',
    completedWord: 'pig',
    readAloudText: 'Choose the missing letter to complete the word, pig.',
    visualHint: '🐖',
    options: ['d', 'f', 'p', 'b'],
    correctAnswer: 'p',
    explanation: 'p completes pig.'
  },
  {
    prompt: 'b _ x',
    completedWord: 'box',
    readAloudText: 'Choose the missing letter to complete the word, box.',
    visualHint: '📦',
    options: ['e', 'i', 'a', 'o'],
    correctAnswer: 'o',
    explanation: 'o completes box.'
  },
  {
    prompt: 'h a _',
    completedWord: 'hat',
    readAloudText: 'Choose the missing letter to complete the word, hat.',
    visualHint: '🎩',
    options: ['t', 'p', 'n', 'm'],
    correctAnswer: 't',
    explanation: 't completes hat.'
  },
  {
    prompt: '_ u p',
    completedWord: 'cup',
    readAloudText: 'Choose the missing letter to complete the word, cup.',
    visualHint: '🥤',
    options: ['r', 'c', 'h', 'b'],
    correctAnswer: 'c',
    explanation: 'c completes cup.'
  }
];

const examQuestions = questions.map((item, index) => defineMcqProblem({
  id: `${examId}-q${String(index + 1).padStart(3, '0')}`,
  category: 'grade-1',
  topicId: 'english',
  title: `${examTitle} Question ${index + 1}`,
  difficulty: 'Easy',
  estimatedTime: '1 min',
  estimatedTimeSeconds: questionTimeSeconds,
  interactionType: 'visual-mcq',
  question: 'Which letter is missing?',
  rendering: {
    wordPattern: item.prompt,
    suppressPromptHeading: true,
    suppressObjective: true
  },
  promptVisual: emoji(item.visualHint),
  readAloud: true,
  autoReadAloud: false,
  readAloudText: item.readAloudText,
  readOptionsAloud: false,
  body: [
    {
      type: 'section',
      title: 'Objective',
      content: 'I can find the missing letter in a 3-letter word.'
    }
  ],
  options: item.options,
  correctAnswer: item.correctAnswer,
  explanation: item.explanation,
  finalTakeaway: 'Great job finding the missing letters!',
  tags: ['cbc', 'grade-1', 'english', learningAreaId, 'exam', 'missing-letters', 'writing-readiness'],
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod'],
    source: 'original',
    audience: 'grade-1',
    gradeId: 'grade-1',
    subjectId: 'english',
    learningAreaId,
    examId,
    examTitle,
    assessmentType: 'exam',
    questionTimeSeconds,
    totalTimeSeconds: questions.length * questionTimeSeconds,
    points: 1,
    rendering: {
      wordPattern: item.prompt,
      suppressPromptHeading: true,
      suppressObjective: true
    },
    readAloudText: item.readAloudText,
    visualHint: item.visualHint,
    promptVisual: emoji(item.visualHint),
    sequence: sequenceBase + index
  }
}));

export default examQuestions;