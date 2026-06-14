import { defineMcqProblem } from '../../../../../../problems/problemAuthoring.js';
import { placeCorrectAnswerAt, targetAnswerSlotForQuestion } from '../../../../../../utils/cbcAnswerDistribution.js';

export const johnAndTheCherriesPassage = {
  title: "John and the Cherries",
  paragraphs: [
    {
      id: "johnandthecherries-p1",
      sentenceIds: [
        "johnandthecherries-s1",
        "johnandthecherries-s2",
        "johnandthecherries-s3",
        "johnandthecherries-s4"
      ]
    },
    {
      id: "johnandthecherries-p2",
      sentenceIds: [
        "johnandthecherries-s5",
        "johnandthecherries-s6"
      ]
    },
    {
      id: "johnandthecherries-p3",
      sentenceIds: [
        "johnandthecherries-s7",
        "johnandthecherries-s8"
      ]
    },
    {
      id: "johnandthecherries-p4",
      sentenceIds: [
        "johnandthecherries-s9",
        "johnandthecherries-s10"
      ]
    },
    {
      id: "johnandthecherries-p5",
      sentenceIds: [
        "johnandthecherries-s11",
        "johnandthecherries-s12"
      ]
    },
    {
      id: "johnandthecherries-p6",
      sentenceIds: [
        "johnandthecherries-s13",
        "johnandthecherries-s14",
        "johnandthecherries-s15"
      ]
    },
    {
      id: "johnandthecherries-p7",
      sentenceIds: [
        "johnandthecherries-s16"
      ]
    },
    {
      id: "johnandthecherries-p8",
      sentenceIds: [
        "johnandthecherries-s17"
      ]
    },
    {
      id: "johnandthecherries-p9",
      sentenceIds: [
        "johnandthecherries-s18",
        "johnandthecherries-s19"
      ]
    }
  ],
  sentences: [
    {
      id: "johnandthecherries-s1",
      text: "One Saturday morning, John went shopping with his mother."
    },
    {
      id: "johnandthecherries-s2",
      text: "Their first stop was the greengrocer’s shop."
    },
    {
      id: "johnandthecherries-s3",
      text: "The shop was full of bright fruits and fresh vegetables."
    },
    {
      id: "johnandthecherries-s4",
      text: "John saw apples, bananas, oranges, carrots, and a box of shiny red cherries."
    },
    {
      id: "johnandthecherries-s5",
      text: "John looked longingly at the cherries."
    },
    {
      id: "johnandthecherries-s6",
      text: "He wanted some very much, but he did not ask for them."
    },
    {
      id: "johnandthecherries-s7",
      text: "The greengrocer noticed John’s eyes and smiled."
    },
    {
      id: "johnandthecherries-s8",
      text: "“Help yourself to a handful, John,” he said."
    },
    {
      id: "johnandthecherries-s9",
      text: "John stood still."
    },
    {
      id: "johnandthecherries-s10",
      text: "He did not move his hand towards the box."
    },
    {
      id: "johnandthecherries-s11",
      text: "“I’m sure you like cherries, don’t you?”"
    },
    {
      id: "johnandthecherries-s12",
      text: "asked the puzzled greengrocer."
    },
    {
      id: "johnandthecherries-s13",
      text: "John nodded quickly."
    },
    {
      id: "johnandthecherries-s14",
      text: "The greengrocer thought John was too shy to take any cherries by himself."
    },
    {
      id: "johnandthecherries-s15",
      text: "So he reached into the box and gave John a large handful."
    },
    {
      id: "johnandthecherries-s16",
      text: "After they left the shop, John’s mother asked, “Why didn’t you take the cherries when the greengrocer told you to?”"
    },
    {
      id: "johnandthecherries-s17",
      text: "John looked up and answered, “Well, Mummy, his hand is twice as big as mine!”"
    },
    {
      id: "johnandthecherries-s18",
      text: "His mother laughed."
    },
    {
      id: "johnandthecherries-s19",
      text: "John had been quiet, but he had also been very clever."
    }
  ]
};

const examId = 'grade-3-english-comprehension-john-and-the-cherries-exam-014';
const examTitle = 'Grade 3 English Comprehension Exam 014: John and the Cherries';
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
  passageTitle: johnAndTheCherriesPassage.title,
  readingGuideSeconds: 600,
  questionTimeSeconds,
  autoAdvanceAfterReading: false,
  allowStartQuestionsAnytime: true,
  allowPassageDuringQuestions: true,
  readAloud: {
    enabled: true,
    highlightCurrentSentence: true
  },
  passage: johnAndTheCherriesPassage
};

const questions = [
  {
    id: "grade-3-english-comprehension-john-and-the-cherries-exam-014-q01",
    title: "John and the Cherries: Question 1",
    skill: "detail recall",
    question: "Who went shopping with John?",
    options: [
      "His mother",
      "His father",
      "His teacher",
      "His uncle"
    ],
    correctAnswer: "His mother",
    explanation: "John went shopping with his mother."
  },
  {
    id: "grade-3-english-comprehension-john-and-the-cherries-exam-014-q02",
    title: "John and the Cherries: Question 2",
    skill: "sequence",
    question: "Where did they stop first?",
    options: [
      "At the greengrocer’s shop",
      "At school",
      "At a toy shop",
      "At a hotel"
    ],
    correctAnswer: "At the greengrocer’s shop",
    explanation: "Their first stop was the greengrocer’s shop."
  },
  {
    id: "grade-3-english-comprehension-john-and-the-cherries-exam-014-q03",
    title: "John and the Cherries: Question 3",
    skill: "detail recall",
    question: "What fruit did John look at longingly?",
    options: [
      "Cherries",
      "Pears",
      "Mangoes",
      "Plums"
    ],
    correctAnswer: "Cherries",
    explanation: "He looked at shiny red cherries."
  },
  {
    id: "grade-3-english-comprehension-john-and-the-cherries-exam-014-q04",
    title: "John and the Cherries: Question 4",
    skill: "vocabulary in context",
    question: "What does “looked longingly” mean?",
    options: [
      "Looked as if he wanted something very much",
      "Looked angrily",
      "Looked without seeing",
      "Looked quickly and left"
    ],
    correctAnswer: "Looked as if he wanted something very much",
    explanation: "John wanted the cherries very much."
  },
  {
    id: "grade-3-english-comprehension-john-and-the-cherries-exam-014-q05",
    title: "John and the Cherries: Question 5",
    skill: "detail recall",
    question: "What did the greengrocer tell John to do?",
    options: [
      "Help himself to a handful",
      "Sweep the floor",
      "Count the apples",
      "Go outside"
    ],
    correctAnswer: "Help himself to a handful",
    explanation: "He invited John to take a handful."
  },
  {
    id: "grade-3-english-comprehension-john-and-the-cherries-exam-014-q06",
    title: "John and the Cherries: Question 6",
    skill: "detail recall",
    question: "Did John take the cherries himself?",
    options: [
      "No",
      "Yes",
      "Only one",
      "He took the box"
    ],
    correctAnswer: "No",
    explanation: "John stood still."
  },
  {
    id: "grade-3-english-comprehension-john-and-the-cherries-exam-014-q07",
    title: "John and the Cherries: Question 7",
    skill: "inference",
    question: "Why was the greengrocer puzzled?",
    options: [
      "John liked cherries but did not take any.",
      "The shop was empty.",
      "The cherries were missing.",
      "John was singing."
    ],
    correctAnswer: "John liked cherries but did not take any.",
    explanation: "John nodded but still did not move."
  },
  {
    id: "grade-3-english-comprehension-john-and-the-cherries-exam-014-q08",
    title: "John and the Cherries: Question 8",
    skill: "detail recall",
    question: "What did the greengrocer do for John?",
    options: [
      "Gave him a large handful",
      "Closed the shop",
      "Asked him to pay",
      "Gave him carrots"
    ],
    correctAnswer: "Gave him a large handful",
    explanation: "He gave John a large handful."
  },
  {
    id: "grade-3-english-comprehension-john-and-the-cherries-exam-014-q09",
    title: "John and the Cherries: Question 9",
    skill: "inference",
    question: "Why did John wait for the greengrocer to give him cherries?",
    options: [
      "The greengrocer’s hand was bigger.",
      "John disliked cherries.",
      "John was asleep.",
      "His mother told him to run."
    ],
    correctAnswer: "The greengrocer’s hand was bigger.",
    explanation: "John said the man’s hand was twice as big as his."
  },
  {
    id: "grade-3-english-comprehension-john-and-the-cherries-exam-014-q10",
    title: "John and the Cherries: Question 10",
    skill: "vocabulary in context",
    question: "Which word best describes John?",
    options: [
      "Clever",
      "Rude",
      "Careless",
      "Cruel"
    ],
    correctAnswer: "Clever",
    explanation: "John cleverly got a bigger handful."
  },
  {
    id: "grade-3-english-comprehension-john-and-the-cherries-exam-014-q11",
    title: "John and the Cherries: Question 11",
    skill: "vocabulary in context",
    question: "What does “puzzled” mean?",
    options: [
      "Confused",
      "Hungry",
      "Angry",
      "Tired"
    ],
    correctAnswer: "Confused",
    explanation: "The greengrocer did not understand John’s behaviour."
  },
  {
    id: "grade-3-english-comprehension-john-and-the-cherries-exam-014-q12",
    title: "John and the Cherries: Question 12",
    skill: "spelling recognition",
    question: "Which word is spelled correctly?",
    options: [
      "cherries",
      "cherrys",
      "cherryes",
      "cheries"
    ],
    correctAnswer: "cherries",
    explanation: "Cherries is the correct spelling."
  },
  {
    id: "grade-3-english-comprehension-john-and-the-cherries-exam-014-q13",
    title: "John and the Cherries: Question 13",
    skill: "detail recall",
    question: "What kind of shop is a greengrocer’s?",
    options: [
      "A shop that sells fruits and vegetables",
      "A shop that sells shoes",
      "A shop that sells books",
      "A shop that sells cars"
    ],
    correctAnswer: "A shop that sells fruits and vegetables",
    explanation: "The passage lists fruits and vegetables there."
  },
  {
    id: "grade-3-english-comprehension-john-and-the-cherries-exam-014-q14",
    title: "John and the Cherries: Question 14",
    skill: "inference",
    question: "Why did John’s mother laugh?",
    options: [
      "John’s reason was funny and clever.",
      "John dropped all the cherries.",
      "The shopkeeper sang.",
      "The cherries were blue."
    ],
    correctAnswer: "John’s reason was funny and clever.",
    explanation: "John had a clever reason."
  },
  {
    id: "grade-3-english-comprehension-john-and-the-cherries-exam-014-q15",
    title: "John and the Cherries: Question 15",
    skill: "detail recall",
    question: "What colour were the cherries?",
    options: [
      "Shiny red",
      "Dark blue",
      "White",
      "Green"
    ],
    correctAnswer: "Shiny red",
    explanation: "They were shiny red."
  },
  {
    id: "grade-3-english-comprehension-john-and-the-cherries-exam-014-q16",
    title: "John and the Cherries: Question 16",
    skill: "detail recall",
    question: "What did John do when asked if he liked cherries?",
    options: [
      "He nodded quickly.",
      "He shouted no.",
      "He cried.",
      "He ran away."
    ],
    correctAnswer: "He nodded quickly.",
    explanation: "John nodded quickly."
  },
  {
    id: "grade-3-english-comprehension-john-and-the-cherries-exam-014-q17",
    title: "John and the Cherries: Question 17",
    skill: "vocabulary in context",
    question: "What does “handful” mean?",
    options: [
      "As much as a hand can hold",
      "A full basket",
      "One tiny seed",
      "A full shop"
    ],
    correctAnswer: "As much as a hand can hold",
    explanation: "A handful is what a hand can hold."
  },
  {
    id: "grade-3-english-comprehension-john-and-the-cherries-exam-014-q18",
    title: "John and the Cherries: Question 18",
    skill: "life skill",
    question: "What can we learn from the story?",
    options: [
      "Sometimes quiet people are thinking cleverly.",
      "Never eat fruit.",
      "Never go shopping.",
      "Small hands are always bad."
    ],
    correctAnswer: "Sometimes quiet people are thinking cleverly.",
    explanation: "John was quiet but clever."
  },
  {
    id: "grade-3-english-comprehension-john-and-the-cherries-exam-014-q19",
    title: "John and the Cherries: Question 19",
    skill: "detail recall",
    question: "Which sentence is true?",
    options: [
      "John wanted cherries.",
      "John hated cherries.",
      "John bought a bicycle.",
      "John went alone."
    ],
    correctAnswer: "John wanted cherries.",
    explanation: "The passage shows he wanted cherries."
  },
  {
    id: "grade-3-english-comprehension-john-and-the-cherries-exam-014-q20",
    title: "John and the Cherries: Question 20",
    skill: "detail recall",
    question: "Suggest another good title for the story.",
    options: [
      "The Clever Handful",
      "The Lost Cherries",
      "The Angry Shopkeeper",
      "The Empty Basket"
    ],
    correctAnswer: "The Clever Handful",
    explanation: "The story is about John cleverly getting a bigger handful."
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
  explanation: item.explanation,
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
    sequence: 1400 + index
  }
}));

export default examQuestions;
