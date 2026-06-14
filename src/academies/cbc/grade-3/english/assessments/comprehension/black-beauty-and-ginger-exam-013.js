import { defineMcqProblem } from '../../../../../../problems/problemAuthoring.js';
import { placeCorrectAnswerAt, targetAnswerSlotForQuestion } from '../../../../../../utils/cbcAnswerDistribution.js';

export const blackBeautyAndGingerPassage = {
  title: "Black Beauty and Ginger",
  paragraphs: [
    {
      id: "blackbeautyandginger-p1",
      sentenceIds: [
        "blackbeautyandginger-s1",
        "blackbeautyandginger-s2",
        "blackbeautyandginger-s3"
      ]
    },
    {
      id: "blackbeautyandginger-p2",
      sentenceIds: [
        "blackbeautyandginger-s4",
        "blackbeautyandginger-s5",
        "blackbeautyandginger-s6",
        "blackbeautyandginger-s7",
        "blackbeautyandginger-s8",
        "blackbeautyandginger-s9"
      ]
    },
    {
      id: "blackbeautyandginger-p3",
      sentenceIds: [
        "blackbeautyandginger-s10",
        "blackbeautyandginger-s11",
        "blackbeautyandginger-s12"
      ]
    },
    {
      id: "blackbeautyandginger-p4",
      sentenceIds: [
        "blackbeautyandginger-s13",
        "blackbeautyandginger-s14"
      ]
    },
    {
      id: "blackbeautyandginger-p5",
      sentenceIds: [
        "blackbeautyandginger-s15",
        "blackbeautyandginger-s16",
        "blackbeautyandginger-s17",
        "blackbeautyandginger-s18"
      ]
    }
  ],
  sentences: [
    {
      id: "blackbeautyandginger-s1",
      text: "Black Beauty and Ginger were two strong carriage horses."
    },
    {
      id: "blackbeautyandginger-s2",
      text: "One morning, their master and mistress decided to visit friends who lived forty-six miles away."
    },
    {
      id: "blackbeautyandginger-s3",
      text: "James, the careful driver, prepared the carriage and made sure the horses were comfortable before the journey began."
    },
    {
      id: "blackbeautyandginger-s4",
      text: "On the first day, they travelled thirty-two miles."
    },
    {
      id: "blackbeautyandginger-s5",
      text: "The road was not easy."
    },
    {
      id: "blackbeautyandginger-s6",
      text: "Some parts were smooth, but others had long, steep hills."
    },
    {
      id: "blackbeautyandginger-s7",
      text: "James drove gently and never hurried the horses."
    },
    {
      id: "blackbeautyandginger-s8",
      text: "When they went downhill, he put on the brake so the carriage would not push too hard against them."
    },
    {
      id: "blackbeautyandginger-s9",
      text: "At the right place, he took the brake off again."
    },
    {
      id: "blackbeautyandginger-s10",
      text: "James also guided the horses to the smoothest part of the road so their feet would not hurt."
    },
    {
      id: "blackbeautyandginger-s11",
      text: "When a hill was very long, he turned the wheels a little across the road."
    },
    {
      id: "blackbeautyandginger-s12",
      text: "This stopped the carriage from rolling backwards and gave Black Beauty and Ginger time to breathe."
    },
    {
      id: "blackbeautyandginger-s13",
      text: "James spoke kind words to the horses along the way."
    },
    {
      id: "blackbeautyandginger-s14",
      text: "To a tired horse, kind words and careful driving can feel as helpful as food and rest."
    },
    {
      id: "blackbeautyandginger-s15",
      text: "As the sun was setting, they reached a busy town."
    },
    {
      id: "blackbeautyandginger-s16",
      text: "They stopped at the biggest hotel in the Market Place."
    },
    {
      id: "blackbeautyandginger-s17",
      text: "The carriage went under an archway and into a long yard."
    },
    {
      id: "blackbeautyandginger-s18",
      text: "At the far end of the yard were clean stables where Black Beauty and Ginger could eat, drink, and rest for the night."
    }
  ]
};

const examId = 'grade-3-english-comprehension-black-beauty-and-ginger-exam-013';
const examTitle = 'Grade 3 English Comprehension Exam 013: Black Beauty and Ginger';
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
  passageTitle: blackBeautyAndGingerPassage.title,
  readingGuideSeconds: 600,
  questionTimeSeconds,
  autoAdvanceAfterReading: false,
  allowStartQuestionsAnytime: true,
  allowPassageDuringQuestions: true,
  readAloud: {
    enabled: true,
    highlightCurrentSentence: true
  },
  passage: blackBeautyAndGingerPassage
};

const questions = [
  {
    id: "grade-3-english-comprehension-black-beauty-and-ginger-exam-013-q01",
    title: "Black Beauty and Ginger: Question 1",
    skill: "detail recall",
    question: "Who were Black Beauty and Ginger?",
    options: [
      "Two carriage horses",
      "Two dogs",
      "Two children",
      "Two farmers"
    ],
    correctAnswer: "Two carriage horses",
    explanation: "They were carriage horses."
  },
  {
    id: "grade-3-english-comprehension-black-beauty-and-ginger-exam-013-q02",
    title: "Black Beauty and Ginger: Question 2",
    skill: "detail recall",
    question: "Where were the master and mistress going?",
    options: [
      "To visit friends",
      "To buy cherries",
      "To look for honey",
      "To go fishing"
    ],
    correctAnswer: "To visit friends",
    explanation: "They decided to visit friends."
  },
  {
    id: "grade-3-english-comprehension-black-beauty-and-ginger-exam-013-q03",
    title: "Black Beauty and Ginger: Question 3",
    skill: "detail recall",
    question: "How far away did the friends live?",
    options: [
      "Forty-six miles",
      "Thirty-two miles",
      "Ten miles",
      "One mile"
    ],
    correctAnswer: "Forty-six miles",
    explanation: "The friends lived forty-six miles away."
  },
  {
    id: "grade-3-english-comprehension-black-beauty-and-ginger-exam-013-q04",
    title: "Black Beauty and Ginger: Question 4",
    skill: "detail recall",
    question: "Who drove the carriage?",
    options: [
      "James",
      "Roger",
      "Raman",
      "Tom"
    ],
    correctAnswer: "James",
    explanation: "James was the driver."
  },
  {
    id: "grade-3-english-comprehension-black-beauty-and-ginger-exam-013-q05",
    title: "Black Beauty and Ginger: Question 5",
    skill: "sequence",
    question: "How far did they travel on the first day?",
    options: [
      "Thirty-two miles",
      "Forty-six miles",
      "Five miles",
      "One hundred miles"
    ],
    correctAnswer: "Thirty-two miles",
    explanation: "They travelled thirty-two miles."
  },
  {
    id: "grade-3-english-comprehension-black-beauty-and-ginger-exam-013-q06",
    title: "Black Beauty and Ginger: Question 6",
    skill: "detail recall",
    question: "What kind of hills were on the road?",
    options: [
      "Long and steep",
      "Small and sandy",
      "Flat and muddy",
      "Short and icy"
    ],
    correctAnswer: "Long and steep",
    explanation: "The road had long, steep hills."
  },
  {
    id: "grade-3-english-comprehension-black-beauty-and-ginger-exam-013-q07",
    title: "Black Beauty and Ginger: Question 7",
    skill: "detail recall",
    question: "What did James do when going downhill?",
    options: [
      "Put on the brake",
      "Closed his eyes",
      "Ran beside the horses",
      "Stopped talking"
    ],
    correctAnswer: "Put on the brake",
    explanation: "He put on the brake downhill."
  },
  {
    id: "grade-3-english-comprehension-black-beauty-and-ginger-exam-013-q08",
    title: "Black Beauty and Ginger: Question 8",
    skill: "inference",
    question: "Why did James put on the brake downhill?",
    options: [
      "So the carriage would not push too hard against the horses",
      "So the horses could run faster",
      "So the wheels would fall off",
      "So the road would become smooth"
    ],
    correctAnswer: "So the carriage would not push too hard against the horses",
    explanation: "The brake helped protect the horses."
  },
  {
    id: "grade-3-english-comprehension-black-beauty-and-ginger-exam-013-q09",
    title: "Black Beauty and Ginger: Question 9",
    skill: "detail recall",
    question: "Where did James guide the horses’ feet?",
    options: [
      "To the smoothest part of the road",
      "Into deep mud",
      "Over sharp stones",
      "Into the river"
    ],
    correctAnswer: "To the smoothest part of the road",
    explanation: "He kept their feet on the smoothest part."
  },
  {
    id: "grade-3-english-comprehension-black-beauty-and-ginger-exam-013-q10",
    title: "Black Beauty and Ginger: Question 10",
    skill: "inference",
    question: "Why did he turn the wheels a little across a long hill?",
    options: [
      "To stop the carriage rolling back and give the horses time to breathe",
      "To decorate the road",
      "To frighten the horses",
      "To make the journey longer"
    ],
    correctAnswer: "To stop the carriage rolling back and give the horses time to breathe",
    explanation: "This helped the horses on a long hill."
  },
  {
    id: "grade-3-english-comprehension-black-beauty-and-ginger-exam-013-q11",
    title: "Black Beauty and Ginger: Question 11",
    skill: "vocabulary in context",
    question: "Which word means not rough?",
    options: [
      "smooth",
      "steep",
      "busy",
      "clean"
    ],
    correctAnswer: "smooth",
    explanation: "Smooth means not rough."
  },
  {
    id: "grade-3-english-comprehension-black-beauty-and-ginger-exam-013-q12",
    title: "Black Beauty and Ginger: Question 12",
    skill: "detail recall",
    question: "What helped the horses besides careful driving?",
    options: [
      "Kind words",
      "Loud shouting",
      "Heavy loads",
      "Sharp stones"
    ],
    correctAnswer: "Kind words",
    explanation: "James spoke kind words to them."
  },
  {
    id: "grade-3-english-comprehension-black-beauty-and-ginger-exam-013-q13",
    title: "Black Beauty and Ginger: Question 13",
    skill: "detail recall",
    question: "At what time did they reach the town?",
    options: [
      "As the sun was setting",
      "At midnight",
      "Early morning",
      "At noon"
    ],
    correctAnswer: "As the sun was setting",
    explanation: "They arrived as the sun was setting."
  },
  {
    id: "grade-3-english-comprehension-black-beauty-and-ginger-exam-013-q14",
    title: "Black Beauty and Ginger: Question 14",
    skill: "detail recall",
    question: "Where was the hotel?",
    options: [
      "In the Market Place",
      "In a forest",
      "On a beach",
      "Inside a school"
    ],
    correctAnswer: "In the Market Place",
    explanation: "The hotel was in the Market Place."
  },
  {
    id: "grade-3-english-comprehension-black-beauty-and-ginger-exam-013-q15",
    title: "Black Beauty and Ginger: Question 15",
    skill: "detail recall",
    question: "Where were the stables?",
    options: [
      "At the far end of the yard",
      "On top of a hill",
      "Inside the carriage",
      "Beside the river"
    ],
    correctAnswer: "At the far end of the yard",
    explanation: "The stables were at the far end of the yard."
  },
  {
    id: "grade-3-english-comprehension-black-beauty-and-ginger-exam-013-q16",
    title: "Black Beauty and Ginger: Question 16",
    skill: "spelling recognition",
    question: "Which word is spelled correctly?",
    options: [
      "carriage",
      "carrige",
      "carige",
      "cariage"
    ],
    correctAnswer: "carriage",
    explanation: "Carriage is correctly spelled."
  },
  {
    id: "grade-3-english-comprehension-black-beauty-and-ginger-exam-013-q17",
    title: "Black Beauty and Ginger: Question 17",
    skill: "inference",
    question: "How would you describe James?",
    options: [
      "Careful and kind",
      "Careless and cruel",
      "Lazy and noisy",
      "Angry and rough"
    ],
    correctAnswer: "Careful and kind",
    explanation: "James cared for the horses."
  },
  {
    id: "grade-3-english-comprehension-black-beauty-and-ginger-exam-013-q18",
    title: "Black Beauty and Ginger: Question 18",
    skill: "inference",
    question: "Why were the horses not tired or troubled?",
    options: [
      "James drove carefully and treated them kindly.",
      "The road was all flat.",
      "They did not pull anything.",
      "They slept while walking."
    ],
    correctAnswer: "James drove carefully and treated them kindly.",
    explanation: "James’s careful driving helped them."
  },
  {
    id: "grade-3-english-comprehension-black-beauty-and-ginger-exam-013-q19",
    title: "Black Beauty and Ginger: Question 19",
    skill: "detail recall",
    question: "What did the horses need at the end of the day?",
    options: [
      "Food, water, and rest",
      "A school book",
      "A fishing net",
      "A new driver"
    ],
    correctAnswer: "Food, water, and rest",
    explanation: "The stables allowed them to eat, drink, and rest."
  },
  {
    id: "grade-3-english-comprehension-black-beauty-and-ginger-exam-013-q20",
    title: "Black Beauty and Ginger: Question 20",
    skill: "life skill",
    question: "What lesson does the passage teach?",
    options: [
      "Animals should be treated kindly.",
      "Horses should always run fast.",
      "Drivers should shout loudly.",
      "Long journeys are always bad."
    ],
    correctAnswer: "Animals should be treated kindly.",
    explanation: "James shows kindness to animals."
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
    sequence: 1300 + index
  }
}));

export default examQuestions;
