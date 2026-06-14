import { defineMcqProblem } from '../../../../../../problems/problemAuthoring.js';
import { placeCorrectAnswerAt, targetAnswerSlotForQuestion } from '../../../../../../utils/cbcAnswerDistribution.js';

export const someUsefulFindsPassage = {
  title: "Some Useful Finds",
  paragraphs: [
    {
      id: "someusefulfinds-p1",
      sentenceIds: [
        "someusefulfinds-s1",
        "someusefulfinds-s2",
        "someusefulfinds-s3"
      ]
    },
    {
      id: "someusefulfinds-p2",
      sentenceIds: [
        "someusefulfinds-s4",
        "someusefulfinds-s5"
      ]
    },
    {
      id: "someusefulfinds-p3",
      sentenceIds: [
        "someusefulfinds-s6",
        "someusefulfinds-s7",
        "someusefulfinds-s8"
      ]
    },
    {
      id: "someusefulfinds-p4",
      sentenceIds: [
        "someusefulfinds-s9",
        "someusefulfinds-s10"
      ]
    },
    {
      id: "someusefulfinds-p5",
      sentenceIds: [
        "someusefulfinds-s11",
        "someusefulfinds-s12",
        "someusefulfinds-s13"
      ]
    },
    {
      id: "someusefulfinds-p6",
      sentenceIds: [
        "someusefulfinds-s14",
        "someusefulfinds-s15"
      ]
    },
    {
      id: "someusefulfinds-p7",
      sentenceIds: [
        "someusefulfinds-s16",
        "someusefulfinds-s17",
        "someusefulfinds-s18"
      ]
    },
    {
      id: "someusefulfinds-p8",
      sentenceIds: [
        "someusefulfinds-s19",
        "someusefulfinds-s20",
        "someusefulfinds-s21",
        "someusefulfinds-s22"
      ]
    }
  ],
  sentences: [
    {
      id: "someusefulfinds-s1",
      text: "James, Jenny, and Penny were walking along a quiet lane when the rubbish dump came into sight."
    },
    {
      id: "someusefulfinds-s2",
      text: "It looked like a low, flat hill made of ashes and cinders."
    },
    {
      id: "someusefulfinds-s3",
      text: "Old tyres, broken chairs, bent tins, and pieces of wood lay all around."
    },
    {
      id: "someusefulfinds-s4",
      text: "James and Jenny ran towards it as if they had found a secret treasure island."
    },
    {
      id: "someusefulfinds-s5",
      text: "They climbed over the rubbish carefully, calling out with excitement each time they found something useful."
    },
    {
      id: "someusefulfinds-s6",
      text: "Penny followed more slowly."
    },
    {
      id: "someusefulfinds-s7",
      text: "She did not like the grey dust that rose under her shoes, and she disliked the crunching sound of the cinders beneath her feet."
    },
    {
      id: "someusefulfinds-s8",
      text: "Still, she kept looking."
    },
    {
      id: "someusefulfinds-s9",
      text: "Soon Penny found a big bundle of paper."
    },
    {
      id: "someusefulfinds-s10",
      text: "One side of each sheet was plain and clean."
    },
    {
      id: "someusefulfinds-s11",
      text: "“Drawing paper!”"
    },
    {
      id: "someusefulfinds-s12",
      text: "she cried."
    },
    {
      id: "someusefulfinds-s13",
      text: "“Scribbling paper! Sheets and sheets of it! We can decorate the dolls’ house and paper all the walls. We can also play school.”"
    },
    {
      id: "someusefulfinds-s14",
      text: "James found an old chain."
    },
    {
      id: "someusefulfinds-s15",
      text: "He lifted it and clanked it joyfully."
    },
    {
      id: "someusefulfinds-s16",
      text: "“A strong, useful chain!”"
    },
    {
      id: "someusefulfinds-s17",
      text: "he said."
    },
    {
      id: "someusefulfinds-s18",
      text: "“We can use it when we play prison. I will chain you up and you can try to escape.”"
    },
    {
      id: "someusefulfinds-s19",
      text: "Jenny laughed and picked up a small wooden box."
    },
    {
      id: "someusefulfinds-s20",
      text: "To grown-ups, the dump might have looked messy."
    },
    {
      id: "someusefulfinds-s21",
      text: "To the children, it was full of ideas."
    },
    {
      id: "someusefulfinds-s22",
      text: "They saw toys, games, and make-believe adventures waiting to begin."
    }
  ]
};

const examId = 'grade-3-english-comprehension-some-useful-finds-exam-019';
const examTitle = 'Grade 3 English Comprehension Exam 019: Some Useful Finds';
const learningAreaId = 'reading-comprehension';
const questionTimeSeconds = 60;

const timedComprehensionExam = {
  id: examId,
  type: 'timed-comprehension-exam',
  category: 'grade-3',
  topicId: 'english',
  learningAreaId,
  title: examTitle,
  introTitle: 'Grade 3 English Timed Comprehension Exam',
  introLines: [
    'Read the passage carefully.',
    'You may start the questions when you are ready.',
    'Each question has 60 seconds.',
    'You can view the passage again while answering.'
  ],
  passageTitle: someUsefulFindsPassage.title,
  readingGuideSeconds: 600,
  questionTimeSeconds,
  autoAdvanceAfterReading: false,
  allowStartQuestionsAnytime: true,
  allowPassageDuringQuestions: true,
  readAloud: {
    enabled: true,
    highlightCurrentSentence: true
  },
  passage: someUsefulFindsPassage
};

const questions = [
  {
    id: "grade-3-english-comprehension-some-useful-finds-exam-019-q01",
    title: "Some Useful Finds: Question 1",
    skill: "detail recall",
    question: "Who were the three children?",
    options: [
      "James, Jenny, and Penny",
      "Roger, Jill, and Raman",
      "Tom, John, and James",
      "Belle, Ginger, and Mishook"
    ],
    correctAnswer: "James, Jenny, and Penny",
    explanation: "The passage names James, Jenny, and Penny."
  },
  {
    id: "grade-3-english-comprehension-some-useful-finds-exam-019-q02",
    title: "Some Useful Finds: Question 2",
    skill: "detail recall",
    question: "What came into sight?",
    options: [
      "A rubbish dump",
      "A palace",
      "A beach",
      "A hotel"
    ],
    correctAnswer: "A rubbish dump",
    explanation: "The rubbish dump came into sight."
  },
  {
    id: "grade-3-english-comprehension-some-useful-finds-exam-019-q03",
    title: "Some Useful Finds: Question 3",
    skill: "detail recall",
    question: "What did the dump look like?",
    options: [
      "A low, flat hill of ashes and cinders",
      "A clean shop",
      "A blue tent",
      "A deep well"
    ],
    correctAnswer: "A low, flat hill of ashes and cinders",
    explanation: "It looked like a low, flat hill."
  },
  {
    id: "grade-3-english-comprehension-some-useful-finds-exam-019-q04",
    title: "Some Useful Finds: Question 4",
    skill: "detail recall",
    question: "Name two things found at the dump.",
    options: [
      "Old tyres and broken chairs",
      "Honey and cherries",
      "Horses and cows",
      "Books and pencils only"
    ],
    correctAnswer: "Old tyres and broken chairs",
    explanation: "The passage mentions old tyres and broken chairs."
  },
  {
    id: "grade-3-english-comprehension-some-useful-finds-exam-019-q05",
    title: "Some Useful Finds: Question 5",
    skill: "detail recall",
    question: "How did James and Jenny feel?",
    options: [
      "Excited",
      "Bored",
      "Afraid only",
      "Sleepy"
    ],
    correctAnswer: "Excited",
    explanation: "They ran and called out with excitement."
  },
  {
    id: "grade-3-english-comprehension-some-useful-finds-exam-019-q06",
    title: "Some Useful Finds: Question 6",
    skill: "inference",
    question: "Why did Penny walk more slowly?",
    options: [
      "She disliked the dust and crunching cinders.",
      "She was carrying a goat.",
      "She was reading a book.",
      "She had no shoes."
    ],
    correctAnswer: "She disliked the dust and crunching cinders.",
    explanation: "Penny disliked the dust and crunching sound."
  },
  {
    id: "grade-3-english-comprehension-some-useful-finds-exam-019-q07",
    title: "Some Useful Finds: Question 7",
    skill: "detail recall",
    question: "What did Penny find?",
    options: [
      "A big bundle of paper",
      "A gold ring",
      "A puppy",
      "A rope net"
    ],
    correctAnswer: "A big bundle of paper",
    explanation: "She found a big bundle of paper."
  },
  {
    id: "grade-3-english-comprehension-some-useful-finds-exam-019-q08",
    title: "Some Useful Finds: Question 8",
    skill: "detail recall",
    question: "What was special about the paper?",
    options: [
      "One side was plain and clean.",
      "It was wet.",
      "It was made of metal.",
      "It was full of holes."
    ],
    correctAnswer: "One side was plain and clean.",
    explanation: "One side of each sheet was plain and clean."
  },
  {
    id: "grade-3-english-comprehension-some-useful-finds-exam-019-q09",
    title: "Some Useful Finds: Question 9",
    skill: "sequence",
    question: "What did Penny want to use the paper for first?",
    options: [
      "Drawing and scribbling",
      "Cooking",
      "Feeding cows",
      "Catching bees"
    ],
    correctAnswer: "Drawing and scribbling",
    explanation: "She called it drawing and scribbling paper."
  },
  {
    id: "grade-3-english-comprehension-some-useful-finds-exam-019-q10",
    title: "Some Useful Finds: Question 10",
    skill: "detail recall",
    question: "What did Penny want to decorate?",
    options: [
      "The dolls’ house",
      "The well",
      "The fox’s tail",
      "The horse’s stable"
    ],
    correctAnswer: "The dolls’ house",
    explanation: "She wanted to decorate the dolls’ house."
  },
  {
    id: "grade-3-english-comprehension-some-useful-finds-exam-019-q11",
    title: "Some Useful Finds: Question 11",
    skill: "detail recall",
    question: "What game could they play with the paper?",
    options: [
      "School",
      "Hunting",
      "Swimming",
      "Shopping"
    ],
    correctAnswer: "School",
    explanation: "Penny said they could play school."
  },
  {
    id: "grade-3-english-comprehension-some-useful-finds-exam-019-q12",
    title: "Some Useful Finds: Question 12",
    skill: "detail recall",
    question: "What did James find?",
    options: [
      "An old chain",
      "A new bicycle",
      "A box of cherries",
      "A tent"
    ],
    correctAnswer: "An old chain",
    explanation: "James found an old chain."
  },
  {
    id: "grade-3-english-comprehension-some-useful-finds-exam-019-q13",
    title: "Some Useful Finds: Question 13",
    skill: "vocabulary in context",
    question: "What does “clanked” mean?",
    options: [
      "Made a loud metal sound",
      "Whispered softly",
      "Broke silently",
      "Floated in water"
    ],
    correctAnswer: "Made a loud metal sound",
    explanation: "A chain clanks when its metal parts hit together."
  },
  {
    id: "grade-3-english-comprehension-some-useful-finds-exam-019-q14",
    title: "Some Useful Finds: Question 14",
    skill: "detail recall",
    question: "Which two adjectives did James use for the chain?",
    options: [
      "Strong and useful",
      "Soft and sweet",
      "Tiny and warm",
      "Blue and clean"
    ],
    correctAnswer: "Strong and useful",
    explanation: "He called it a strong, useful chain."
  },
  {
    id: "grade-3-english-comprehension-some-useful-finds-exam-019-q15",
    title: "Some Useful Finds: Question 15",
    skill: "detail recall",
    question: "What game did James suggest?",
    options: [
      "Playing prison",
      "Playing cricket",
      "Playing school only",
      "Playing camping"
    ],
    correctAnswer: "Playing prison",
    explanation: "He suggested playing prison."
  },
  {
    id: "grade-3-english-comprehension-some-useful-finds-exam-019-q16",
    title: "Some Useful Finds: Question 16",
    skill: "detail recall",
    question: "What did Jenny pick up?",
    options: [
      "A small wooden box",
      "A puppy",
      "A fishing net",
      "A sari"
    ],
    correctAnswer: "A small wooden box",
    explanation: "Jenny picked up a small wooden box."
  },
  {
    id: "grade-3-english-comprehension-some-useful-finds-exam-019-q17",
    title: "Some Useful Finds: Question 17",
    skill: "vocabulary in context",
    question: "What does “treasure” mean in this passage?",
    options: [
      "Something the children found useful or exciting",
      "Only gold and money",
      "A dangerous animal",
      "A clean classroom"
    ],
    correctAnswer: "Something the children found useful or exciting",
    explanation: "The children treated useful finds as treasure."
  },
  {
    id: "grade-3-english-comprehension-some-useful-finds-exam-019-q18",
    title: "Some Useful Finds: Question 18",
    skill: "spelling recognition",
    question: "Which word is spelled correctly?",
    options: [
      "useful",
      "usefull",
      "usefool",
      "usefil"
    ],
    correctAnswer: "useful",
    explanation: "Useful is correct."
  },
  {
    id: "grade-3-english-comprehension-some-useful-finds-exam-019-q19",
    title: "Some Useful Finds: Question 19",
    skill: "inference",
    question: "Why did the children enjoy the dump?",
    options: [
      "They used imagination to turn old things into play ideas.",
      "It was very clean.",
      "It had fresh food.",
      "Their parents told them to sleep there."
    ],
    correctAnswer: "They used imagination to turn old things into play ideas.",
    explanation: "They saw toys, games, and adventures."
  },
  {
    id: "grade-3-english-comprehension-some-useful-finds-exam-019-q20",
    title: "Some Useful Finds: Question 20",
    skill: "life skill",
    question: "What lesson can we learn from the children?",
    options: [
      "Creativity can turn simple things into fun.",
      "Rubbish is always safe to touch.",
      "Children should never imagine.",
      "Old paper cannot be reused."
    ],
    correctAnswer: "Creativity can turn simple things into fun.",
    explanation: "The story shows creativity and reuse."
  }
];

const examQuestions = questions.map((item, index) => defineMcqProblem({
  id: item.id,
  category: 'grade-3',
  topicId: 'english',
  title: item.title,
  difficulty: 'Easy',
  estimatedTime: '1 min',
  estimatedTimeSeconds: questionTimeSeconds,
  question: item.question,
  body: [
    {
      type: 'section',
      title: 'Objective',
      content: 'I can read a passage and answer timed comprehension questions.'
    }
  ],
  options: placeCorrectAnswerAt(
    item.options,
    item.correctAnswer,
    targetAnswerSlotForQuestion(index)
  ),
  correctAnswer: item.correctAnswer,
  finalTakeaway: 'Use details from the passage to choose the best answer.',
  tags: ['cbc', 'grade-3', 'english', learningAreaId, 'timed-exam', item.skill],
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod'],
    source: 'adapted-and-expanded',
    audience: 'grade-3',
    learningAreaId,
    skill: item.skill,
    examId,
    examTitle,
    assessmentType: 'exam',
    examMode: 'timed-comprehension',
    timedComprehensionExam,
    points: 1,
    sequence: 1900 + index
  }
}));

export default examQuestions;
