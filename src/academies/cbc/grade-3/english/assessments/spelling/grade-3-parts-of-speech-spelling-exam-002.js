import { defineMcqProblem } from '../../../../../../problems/problemAuthoring.js';

const examId = 'grade-3-parts-of-speech-spelling-exam-002';
const examTitle = 'Parts of Speech Exam 2: Telling More and Joining Words';
const learningAreaId = 'parts-of-speech';
const questionTimeSeconds = 30;
const sequenceBase = 340;

const questions = [
  {
    question: 'The ___ bag is on the desk.\n\nWhich correctly spelled word tells us more about the bag?',
    options: ['red', 'reed', 'redd', 'rade'],
    correctAnswer: 'red',
    explanation: 'red is an adjective because it tells us more about the bag.'
  },
  {
    question: 'Look at this sentence:\n\nThe happy child is playing.\n\nWhich word tells us more about the child?',
    options: ['happy', 'child', 'playing', 'The'],
    correctAnswer: 'happy',
    explanation: 'happy is an adjective because it tells us more about the child.'
  },
  {
    question: 'Which sentence has a correctly spelled adjective?',
    options: [
      'The cleen classroom is bright.',
      'The clean classroom is bright.',
      'The clene classroom is bright.',
      'The clen classroom is bright.'
    ],
    correctAnswer: 'The clean classroom is bright.',
    explanation: 'clean is an adjective because it tells us more about the classroom. It is spelled correctly.'
  },
  {
    question: 'The ___ elephant walked slowly.\n\nWhich word tells us more about the elephant?',
    options: ['big', 'bigg', 'beig', 'biig'],
    correctAnswer: 'big',
    explanation: 'big is an adjective because it tells us more about the elephant.'
  },
  {
    question: 'Pick the word card that tells us more about the noun cake.',
    options: ['sweet', 'eating', 'under', 'and'],
    correctAnswer: 'sweet',
    explanation: 'sweet is an adjective because it tells us more about the cake.'
  },
  {
    question: 'Which correctly spelled colour word tells us more about bananas?',
    options: ['yelow', 'yellow', 'yello', 'yelloe'],
    correctAnswer: 'yellow',
    explanation: 'yellow is an adjective because it tells us more about bananas.'
  },
  {
    question: 'Look at this sentence:\n\nThe small cat is sleeping.\n\nWhich word tells us more about the cat?',
    options: ['small', 'cat', 'sleeping', 'is'],
    correctAnswer: 'small',
    explanation: 'small is an adjective because it tells us more about the cat.'
  },
  {
    question: 'Help the teacher fix the adjective:\n\nThe butiful flower is growing.\n\nWhich word is correct?',
    options: ['beautifull', 'beautiful', 'beutiful', 'butiful'],
    correctAnswer: 'beautiful',
    explanation: 'beautiful is an adjective because it tells us more about the flower. It is spelled correctly.'
  },
  {
    question: 'The boy runs ___.\n\nWhich correctly spelled word tells us how he runs?',
    options: ['quikly', 'quickly', 'quickley', 'kwikly'],
    correctAnswer: 'quickly',
    explanation: 'quickly is an adverb because it tells us more about the action runs.'
  },
  {
    question: 'The baby sleeps ___.\n\nWhich word tells us how the baby sleeps?',
    options: ['quietly', 'quietley', 'quitely', 'qiuetly'],
    correctAnswer: 'quietly',
    explanation: 'quietly is an adverb because it tells us more about the action sleeps.'
  },
  {
    question: 'The girl sings ___.\n\nWhich word tells us how she sings?',
    options: ['softley', 'softly', 'sofetly', 'softli'],
    correctAnswer: 'softly',
    explanation: 'softly is an adverb because it tells us more about the action sings.'
  },
  {
    question: 'Look at this sentence:\n\nThe bell rang loudly.\n\nWhich word tells us more about the action?',
    options: ['bell', 'rang', 'loudly', 'The'],
    correctAnswer: 'loudly',
    explanation: 'loudly is an adverb because it tells us more about the action rang.'
  },
  {
    question: 'Which sentence has a correctly spelled adverb?',
    options: [
      'The boy walked slowley.',
      'The boy walked slowly.',
      'The boy walked sloly.',
      'The boy walked slowli.'
    ],
    correctAnswer: 'The boy walked slowly.',
    explanation: 'slowly is an adverb because it tells us more about how the boy walked.'
  },
  {
    question: 'We will play ___.\n\nWhich correctly spelled word tells when the action will happen?',
    options: ['today', 'todai', 'tooday', 'tuday'],
    correctAnswer: 'today',
    explanation: 'today is an adverb because it tells when the action will happen.'
  },
  {
    question: 'The cat is ___ the table.\n\nWhich correctly spelled word tells where the cat is?',
    options: ['undar', 'under', 'ander', 'undre'],
    correctAnswer: 'under',
    explanation: 'under is a preposition because it tells where the cat is.'
  },
  {
    question: 'The book is ___ the desk.\n\nWhich word tells where the book is?',
    options: ['on', 'and', 'wow', 'quickly'],
    correctAnswer: 'on',
    explanation: 'on is a preposition because it tells where the book is.'
  },
  {
    question: 'The ball is ___ the boxes.\n\nWhich correctly spelled preposition fits?',
    options: ['betwen', 'between', 'beetween', 'betwean'],
    correctAnswer: 'between',
    explanation: 'between is a preposition because it tells where the ball is.'
  },
  {
    question: 'Look at this sentence:\n\nThe bird is above the tree.\n\nWhich word tells where the bird is?',
    options: ['bird', 'above', 'tree', 'The'],
    correctAnswer: 'above',
    explanation: 'above is a preposition because it tells where the bird is.'
  },
  {
    question: 'Which sentence has a correctly spelled preposition?',
    options: [
      'The bag is bihind the door.',
      'The bag is behined the door.',
      'The bag is behind the door.',
      'The bag is behynd the door.'
    ],
    correctAnswer: 'The bag is behind the door.',
    explanation: 'behind is a preposition because it tells where the bag is. It is spelled correctly.'
  },
  {
    question: 'Picture clue: 🐶 near 🏠\n\nWhich word tells where the dog is?',
    options: ['near', 'neer', 'nera', 'niar'],
    correctAnswer: 'near',
    explanation: 'near is a preposition because it tells where the dog is.'
  },
  {
    question: 'I like mangoes ___ bananas.\n\nWhich correctly spelled joining word fits?',
    options: ['and', 'aand', 'end', 'annd'],
    correctAnswer: 'and',
    explanation: 'and is a conjunction because it joins mangoes and bananas.'
  },
  {
    question: 'Look at this sentence:\n\nI wanted to play, but it was raining.\n\nWhich word joins the two ideas?',
    options: ['wanted', 'play', 'but', 'raining'],
    correctAnswer: 'but',
    explanation: 'but is a conjunction because it joins two ideas.'
  },
  {
    question: 'I stayed home ___ I was sick.\n\nWhich correctly spelled joining word gives a reason?',
    options: ['becose', 'because', 'becaus', 'becuase'],
    correctAnswer: 'because',
    explanation: 'because is a conjunction because it joins ideas and gives a reason.'
  },
  {
    question: 'Would you like tea ___ milk?\n\nWhich joining word shows a choice?',
    options: ['or', 'ore', 'oor', 'our'],
    correctAnswer: 'or',
    explanation: 'or is a conjunction because it joins choices.'
  },
  {
    question: '___! We won the game.\n\nWhich correctly spelled word shows excitement?',
    options: ['Hurey', 'Huray', 'Hurray', 'Hurrayy'],
    correctAnswer: 'Hurray',
    explanation: 'Hurray is an interjection because it shows excitement.'
  },
  {
    question: 'Look at this sentence:\n\nOops! I dropped my pencil.\n\nWhich word shows strong feeling?',
    options: ['I', 'dropped', 'pencil', 'Oops!'],
    correctAnswer: 'Oops!',
    explanation: 'Oops! is an interjection because it shows a sudden feeling.'
  },
  {
    question: '___! That cake is big.\n\nWhich correctly spelled interjection shows surprise?',
    options: ['Wow', 'Waw', 'Woow', 'Wouw'],
    correctAnswer: 'Wow',
    explanation: 'Wow is an interjection because it shows surprise.'
  },
  {
    question: 'She ate ___ orange.\n\nWhich small word should come before the noun orange?',
    options: ['a', 'an', 'and', 'the'],
    correctAnswer: 'an',
    explanation: 'an is an article. We use an before orange because it starts with a vowel sound.'
  },
  {
    question: 'Look at this sentence:\n\nThe sun is hot.\n\nWhich word is an article?',
    options: ['The', 'sun', 'is', 'hot'],
    correctAnswer: 'The',
    explanation: 'The is an article because it comes before the noun sun.'
  },
  {
    question: 'Which sentence uses an article before a correctly spelled animal noun?',
    options: ['I saw a rabit.', 'I saw a rabbit.', 'I saw and rabbit.', 'I saw a rabbitt.'],
    correctAnswer: 'I saw a rabbit.',
    explanation: 'a is an article because it comes before the noun rabbit. rabbit is a correctly spelled animal noun.'
  }
];

const examQuestions = questions.map((item, index) => defineMcqProblem({
  id: `${examId}-q${String(index + 1).padStart(3, '0')}`,
  category: 'grade-3',
  topicId: 'english',
  title: `Parts of Speech Exam 2 Question ${index + 1}`,
  difficulty: 'Easy',
  estimatedTimeSeconds: questionTimeSeconds,
  question: item.question,
  body: [
    {
      type: 'section',
      title: 'Objective',
      content: 'I can identify describing words, action helpers, position words, joining words, feeling words, articles, and correct spelling.'
    },
    {
      type: 'section',
      title: 'Question',
      content: item.question
    }
  ],
  options: item.options,
  correctAnswer: item.correctAnswer,
  explanation: item.explanation,
  finalTakeaway: 'Look at the job the word is doing, then check the spelling carefully.',
  tags: ['cbc', 'grade-3', 'english', learningAreaId, 'exam', 'adjectives', 'adverbs', 'prepositions', 'conjunctions', 'interjections', 'articles', 'spelling'],
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod'],
    source: 'github issue #302 comment',
    audience: 'grade-3',
    gradeId: 'grade-3',
    subjectId: 'english',
    learningAreaId,
    examId,
    examTitle,
    assessmentType: 'exam',
    questionTimeSeconds,
    totalTimeSeconds: questions.length * questionTimeSeconds,
    points: 1,
    sequence: sequenceBase + index
  }
}));

export default examQuestions;
