import { defineMcqProblem } from '../../../../../problems/problemAuthoring.js';

const examId = 'grade-3-parts-of-speech-spelling-exam-001';
const examTitle = 'Parts of Speech Exam 1: Naming and Action Words';
const learningAreaId = 'parts-of-speech';
const questionTimeSeconds = 30;
const sequenceBase = 300;

const questions = [
  {
    question: 'The ___ is writing on the board.\n\nWhich correctly spelled noun names a person?',
    options: ['techer', 'teacher', 'teecher', 'teachar'],
    correctAnswer: 'teacher',
    explanation: 'teacher is a noun because it names a person. It is also spelled correctly.'
  },
  {
    question: 'Which word matches this place noun? 🏫',
    options: ['skool', 'scool', 'school', 'shool'],
    correctAnswer: 'school',
    explanation: 'school is a noun because it names a place. It is also spelled correctly.'
  },
  {
    question: 'Which word matches this animal noun? 🐰',
    options: ['rabit', 'rabbit', 'rabbet', 'rabbitt'],
    correctAnswer: 'rabbit',
    explanation: 'rabbit is a noun because it names an animal. It is also spelled correctly.'
  },
  {
    question: 'Look at this sentence:\n\nThe children are going to school.\n\nWhich word is a noun that names a place?',
    options: ['children', 'going', 'school', 'are'],
    correctAnswer: 'school',
    explanation: 'school is a noun because it names a place.'
  },
  {
    question: 'The ___ is sharp.\n\nWhich correctly spelled noun names a thing used for writing?',
    options: ['pensil', 'pencel', 'pencil', 'pensal'],
    correctAnswer: 'pencil',
    explanation: 'pencil is a noun because it names a thing. It is also spelled correctly.'
  },
  {
    question: 'My ___ cooks dinner.\n\nWhich correctly spelled noun names a person in a family?',
    options: ['mother', 'muther', 'mather', 'mothar'],
    correctAnswer: 'mother',
    explanation: 'mother is a noun because it names a person. It is also spelled correctly.'
  },
  {
    question: 'Which correctly spelled noun names a morning meal?',
    options: ['breakfast', 'brekfast', 'breakfirst', 'brakfast'],
    correctAnswer: 'breakfast',
    explanation: 'breakfast is a noun because it names a thing we eat. It is also spelled correctly.'
  },
  {
    question: 'A learner made four word cards.\n\nWhich card is an action word, not a noun?',
    options: ['chair', 'table', 'book', 'jumping'],
    correctAnswer: 'jumping',
    explanation: 'jumping is a verb because it shows an action. The other words are nouns.'
  },
  {
    question: 'Mary is reading a book.\n\nWhich word can we use instead of Mary?',
    options: ['He', 'She', 'It', 'They'],
    correctAnswer: 'She',
    explanation: 'She is a pronoun because it is used instead of the name Mary.'
  },
  {
    question: 'Tom and I are playing.\n\nWhich pronoun can replace Tom and I?',
    options: ['We', 'She', 'It', 'He'],
    correctAnswer: 'We',
    explanation: 'We is a pronoun because it is used instead of Tom and I.'
  },
  {
    question: 'Peter has a ball. Peter kicks it.\n\nWhich pronoun can replace the second Peter?',
    options: ['He', 'She', 'It', 'They'],
    correctAnswer: 'He',
    explanation: 'He is a pronoun because it can be used instead of the name Peter.'
  },
  {
    question: 'Which correctly spelled pronoun means more than one person?',
    options: ['they', 'thay', 'thei', 'thiy'],
    correctAnswer: 'they',
    explanation: 'they is a pronoun. It can stand for more than one person.'
  },
  {
    question: 'Look at this sentence:\n\nThe dog wagged its tail.\n\nWhich word is a pronoun?',
    options: ['dog', 'wagged', 'its', 'tail'],
    correctAnswer: 'its',
    explanation: 'its is a pronoun because it stands for the dog.'
  },
  {
    question: 'The cat is sleeping.\n\nWhich pronoun can replace the cat?',
    options: ['It', 'He', 'We', 'They'],
    correctAnswer: 'It',
    explanation: 'It is a pronoun because it can be used instead of the cat.'
  },
  {
    question: 'The boy can ___ very fast.\n\nWhich action word fits best?',
    options: ['run', 'rinn', 'rane', 'rune'],
    correctAnswer: 'run',
    explanation: 'run is a verb because it shows an action.'
  },
  {
    question: 'Which correctly spelled action word means making words on paper?',
    options: ['writting', 'writing', 'writeing', 'wryting'],
    correctAnswer: 'writing',
    explanation: 'writing is a verb because it shows an action. It is also spelled correctly.'
  },
  {
    question: 'Look at this sentence:\n\nThe baby sleeps.\n\nWhich word shows an action?',
    options: ['The', 'baby', 'sleeps', 'none'],
    correctAnswer: 'sleeps',
    explanation: 'sleeps is a verb because it tells us what the baby does.'
  },
  {
    question: 'Which word matches this action clue? 🏃',
    options: ['runing', 'running', 'runnin', 'runeing'],
    correctAnswer: 'running',
    explanation: 'running is a verb because it shows an action. It is also spelled correctly.'
  },
  {
    question: 'The baby is ___.\n\nWhich correctly spelled action word fits?',
    options: ['cryying', 'criing', 'crying', 'cryeing'],
    correctAnswer: 'crying',
    explanation: 'crying is a verb because it shows what the baby is doing.'
  },
  {
    question: 'Which word shows what birds do?',
    options: ['nest', 'fly', 'wing', 'sky'],
    correctAnswer: 'fly',
    explanation: 'fly is a verb because it shows an action.'
  },
  {
    question: 'Help the teacher fix the action word:\n\nThe children are plaing.\n\nWhich word is correct?',
    options: ['playing', 'playying', 'plaing', 'pleing'],
    correctAnswer: 'playing',
    explanation: 'playing is a verb because it shows an action. It is also spelled correctly.'
  },
  {
    question: 'Pick the correctly spelled action word.',
    options: ['jumping', 'jumpping', 'jamping', 'jumpin'],
    correctAnswer: 'jumping',
    explanation: 'jumping is a verb because it shows an action. It is also spelled correctly.'
  },
  {
    question: 'Which sentence has a correctly spelled verb?',
    options: ['The girl is singging.', 'The girl is singing.', 'The girl is senging.', 'The girl is singin.'],
    correctAnswer: 'The girl is singing.',
    explanation: 'singing is a verb because it shows an action. It is spelled correctly.'
  },
  {
    question: 'Look at this sentence:\n\nThe cook cooks food.\n\nWhich word is the verb?',
    options: ['The', 'cook', 'cooks', 'food'],
    correctAnswer: 'cooks',
    explanation: 'cooks is a verb because it tells us what the cook does.'
  },
  {
    question: 'Which word is a noun, not an action?',
    options: ['walking', 'eating', 'family', 'running'],
    correctAnswer: 'family',
    explanation: 'family is a noun because it names a group of people. The other words are actions.'
  },
  {
    question: 'The ___ runs fast.\n\nWhich correctly spelled animal noun fits?',
    options: ['rabit', 'rabbit', 'rabbet', 'rabbitt'],
    correctAnswer: 'rabbit',
    explanation: 'rabbit is a noun because it names an animal. It is also spelled correctly.'
  },
  {
    question: 'Look at this sentence:\n\nThey are reading books.\n\nWhich word is a pronoun?',
    options: ['They', 'reading', 'books', 'are'],
    correctAnswer: 'They',
    explanation: 'They is a pronoun because it is used instead of names.'
  },
  {
    question: 'A teacher ___ a story.\n\nWhich correctly spelled verb fits?',
    options: ['reads', 'readds', 'redes', 'reids'],
    correctAnswer: 'reads',
    explanation: 'reads is a verb because it shows an action.'
  },
  {
    question: 'Which pair has a noun and a correctly spelled verb?',
    options: ['dog runs', 'dog runing', 'dog runns', 'dog rans'],
    correctAnswer: 'dog runs',
    explanation: 'dog is a noun because it names an animal. runs is a verb because it shows an action.'
  },
  {
    question: 'Read the mini story:\n\nThe girl writes.\nShe smiles.\n\nWhich statement is correct?',
    options: [
      'girl is a verb, writes is a noun, She is an adjective',
      'girl is a noun, writes is a verb, She is a pronoun',
      'girl is a pronoun, writes is a noun, She is a verb',
      'girl is an adverb, writes is an article, She is a noun'
    ],
    correctAnswer: 'girl is a noun, writes is a verb, She is a pronoun',
    explanation: 'girl names a person, writes shows an action, and She is used instead of the girl’s name.'
  }
];

const examQuestions = questions.map((item, index) => defineMcqProblem({
  id: `${examId}-q${String(index + 1).padStart(3, '0')}`,
  category: 'grade-3',
  topicId: 'english',
  title: `Parts of Speech Exam 1 Question ${index + 1}`,
  difficulty: 'Easy',
  estimatedTimeSeconds: questionTimeSeconds,
  question: item.question,
  body: [
    {
      type: 'section',
      title: 'Objective',
      content: 'I can identify nouns, pronouns, verbs, and correctly spelled words in a parts of speech exam.'
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
  tags: ['cbc', 'grade-3', 'english', learningAreaId, 'exam', 'nouns', 'pronouns', 'verbs', 'spelling'],
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
