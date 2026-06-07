import { defineMcqProblem } from '../../../../../../problems/problemAuthoring.js';

export const campingHolidayPassage = {
  title: "A Camping Holiday",
  paragraphs: [
    {
      id: "campingholiday-p1",
      sentenceIds: [
        "campingholiday-s1",
        "campingholiday-s2"
      ]
    },
    {
      id: "campingholiday-p2",
      sentenceIds: [
        "campingholiday-s3",
        "campingholiday-s4",
        "campingholiday-s5"
      ]
    },
    {
      id: "campingholiday-p3",
      sentenceIds: [
        "campingholiday-s6",
        "campingholiday-s7",
        "campingholiday-s8",
        "campingholiday-s9"
      ]
    },
    {
      id: "campingholiday-p4",
      sentenceIds: [
        "campingholiday-s10",
        "campingholiday-s11",
        "campingholiday-s12",
        "campingholiday-s13"
      ]
    },
    {
      id: "campingholiday-p5",
      sentenceIds: [
        "campingholiday-s14",
        "campingholiday-s15",
        "campingholiday-s16",
        "campingholiday-s17"
      ]
    },
    {
      id: "campingholiday-p6",
      sentenceIds: [
        "campingholiday-s18",
        "campingholiday-s19",
        "campingholiday-s20"
      ]
    }
  ],
  sentences: [
    {
      id: "campingholiday-s1",
      text: "Last summer, Roger and his sister Jill went on a camping holiday in Wales with their parents."
    },
    {
      id: "campingholiday-s2",
      text: "It was their first camping trip, so everything felt new and exciting."
    },
    {
      id: "campingholiday-s3",
      text: "Their family had a blue tent with two bedrooms and a small living room."
    },
    {
      id: "campingholiday-s4",
      text: "They pitched it in a large field near a sandy bay."
    },
    {
      id: "campingholiday-s5",
      text: "There were no other tents in the field, so Roger pretended they were brave explorers in a quiet new land."
    },
    {
      id: "campingholiday-s6",
      text: "Every morning, Roger, Jill, and their mother went swimming in the sea."
    },
    {
      id: "campingholiday-s7",
      text: "Their father stayed near the tent and cooked breakfast on a portable gas stove."
    },
    {
      id: "campingholiday-s8",
      text: "When the swimmers came back, they were hungry and happy."
    },
    {
      id: "campingholiday-s9",
      text: "They ate warm beans and eggs together."
    },
    {
      id: "campingholiday-s10",
      text: "After breakfast, the whole family went down to the beach."
    },
    {
      id: "campingholiday-s11",
      text: "They played cricket, built shapes in the sand, and enjoyed the sunshine."
    },
    {
      id: "campingholiday-s12",
      text: "In the afternoon, Roger and Jill used small nets to look for tiny fish and sea creatures in the clear pools."
    },
    {
      id: "campingholiday-s13",
      text: "Their parents sat nearby reading books."
    },
    {
      id: "campingholiday-s14",
      text: "In the evening, the family walked to a farmhouse at the foot of the hill."
    },
    {
      id: "campingholiday-s15",
      text: "They watched the cows being milked and had supper with the farmer and his wife."
    },
    {
      id: "campingholiday-s16",
      text: "The farmer told them about his animals and crops."
    },
    {
      id: "campingholiday-s17",
      text: "He even promised that Roger and Jill could help with the harvest if they came back in autumn."
    },
    {
      id: "campingholiday-s18",
      text: "At sunset, the family strolled back along the quiet road."
    },
    {
      id: "campingholiday-s19",
      text: "They climbed into their sleeping bags and fell fast asleep."
    },
    {
      id: "campingholiday-s20",
      text: "Nothing woke them until the birds began singing the next morning."
    }
  ]
};

const examId = 'grade-3-english-comprehension-camping-holiday-exam-015';
const examTitle = 'Grade 3 English Comprehension Exam 015: A Camping Holiday';
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
  passageTitle: campingHolidayPassage.title,
  readingGuideSeconds: 600,
  questionTimeSeconds,
  autoAdvanceAfterReading: false,
  allowStartQuestionsAnytime: true,
  allowPassageDuringQuestions: true,
  readAloud: {
    enabled: true,
    highlightCurrentSentence: true
  },
  passage: campingHolidayPassage
};

const questions = [
  {
    id: "grade-3-english-comprehension-camping-holiday-exam-015-q01",
    title: "A Camping Holiday: Question 1",
    skill: "detail recall",
    question: "Where did Roger and Jill go camping?",
    options: [
      "Wales",
      "France",
      "A city market",
      "A desert"
    ],
    correctAnswer: "Wales",
    explanation: "They went camping in Wales."
  },
  {
    id: "grade-3-english-comprehension-camping-holiday-exam-015-q02",
    title: "A Camping Holiday: Question 2",
    skill: "detail recall",
    question: "Who went with Roger and Jill?",
    options: [
      "Their parents",
      "Their teacher",
      "Their cousins only",
      "Their neighbours"
    ],
    correctAnswer: "Their parents",
    explanation: "They went with their parents."
  },
  {
    id: "grade-3-english-comprehension-camping-holiday-exam-015-q03",
    title: "A Camping Holiday: Question 3",
    skill: "sequence",
    question: "Was it their first camping trip?",
    options: [
      "Yes",
      "No",
      "The passage does not say",
      "Only for Jill"
    ],
    correctAnswer: "Yes",
    explanation: "The passage says it was their first camping trip."
  },
  {
    id: "grade-3-english-comprehension-camping-holiday-exam-015-q04",
    title: "A Camping Holiday: Question 4",
    skill: "detail recall",
    question: "What colour was the tent?",
    options: [
      "Blue",
      "Red",
      "Green",
      "Yellow"
    ],
    correctAnswer: "Blue",
    explanation: "Their family had a blue tent."
  },
  {
    id: "grade-3-english-comprehension-camping-holiday-exam-015-q05",
    title: "A Camping Holiday: Question 5",
    skill: "detail recall",
    question: "How many bedrooms did the tent have?",
    options: [
      "Two",
      "One",
      "Three",
      "None"
    ],
    correctAnswer: "Two",
    explanation: "The tent had two bedrooms."
  },
  {
    id: "grade-3-english-comprehension-camping-holiday-exam-015-q06",
    title: "A Camping Holiday: Question 6",
    skill: "detail recall",
    question: "Where was the tent pitched?",
    options: [
      "In a large field near a sandy bay",
      "Inside a farmhouse",
      "On a busy road",
      "In a school field"
    ],
    correctAnswer: "In a large field near a sandy bay",
    explanation: "It was in a large field near a sandy bay."
  },
  {
    id: "grade-3-english-comprehension-camping-holiday-exam-015-q07",
    title: "A Camping Holiday: Question 7",
    skill: "inference",
    question: "Why did Roger pretend they were explorers?",
    options: [
      "There were no other tents, so the place felt quiet and new.",
      "He had a map.",
      "He saw a lion.",
      "They were lost."
    ],
    correctAnswer: "There were no other tents, so the place felt quiet and new.",
    explanation: "The empty field made it feel like a new land."
  },
  {
    id: "grade-3-english-comprehension-camping-holiday-exam-015-q08",
    title: "A Camping Holiday: Question 8",
    skill: "detail recall",
    question: "Who cooked breakfast?",
    options: [
      "Their father",
      "Their mother",
      "Roger",
      "The farmer"
    ],
    correctAnswer: "Their father",
    explanation: "Their father cooked breakfast."
  },
  {
    id: "grade-3-english-comprehension-camping-holiday-exam-015-q09",
    title: "A Camping Holiday: Question 9",
    skill: "detail recall",
    question: "What did he use to cook breakfast?",
    options: [
      "A portable gas stove",
      "A campfire only",
      "A large oven",
      "A candle"
    ],
    correctAnswer: "A portable gas stove",
    explanation: "He used a portable gas stove."
  },
  {
    id: "grade-3-english-comprehension-camping-holiday-exam-015-q10",
    title: "A Camping Holiday: Question 10",
    skill: "vocabulary in context",
    question: "What does “portable” mean?",
    options: [
      "Easy to carry",
      "Very heavy",
      "Broken",
      "Made of sand"
    ],
    correctAnswer: "Easy to carry",
    explanation: "Portable means easy to carry."
  },
  {
    id: "grade-3-english-comprehension-camping-holiday-exam-015-q11",
    title: "A Camping Holiday: Question 11",
    skill: "detail recall",
    question: "What did they eat for breakfast?",
    options: [
      "Beans and eggs",
      "Rice and fish",
      "Cake and sweets",
      "Milk only"
    ],
    correctAnswer: "Beans and eggs",
    explanation: "They ate warm beans and eggs."
  },
  {
    id: "grade-3-english-comprehension-camping-holiday-exam-015-q12",
    title: "A Camping Holiday: Question 12",
    skill: "detail recall",
    question: "What game did they play at the beach?",
    options: [
      "Cricket",
      "Football",
      "Tennis",
      "Chess"
    ],
    correctAnswer: "Cricket",
    explanation: "They played cricket."
  },
  {
    id: "grade-3-english-comprehension-camping-holiday-exam-015-q13",
    title: "A Camping Holiday: Question 13",
    skill: "detail recall",
    question: "What did the children use in the clear pools?",
    options: [
      "Small nets",
      "Large baskets",
      "Fishing rods only",
      "Buckets of paint"
    ],
    correctAnswer: "Small nets",
    explanation: "They used small nets."
  },
  {
    id: "grade-3-english-comprehension-camping-holiday-exam-015-q14",
    title: "A Camping Holiday: Question 14",
    skill: "sequence",
    question: "What did their parents do in the afternoon?",
    options: [
      "Sat nearby reading books",
      "Went to town",
      "Built a boat",
      "Slept in the sea"
    ],
    correctAnswer: "Sat nearby reading books",
    explanation: "Their parents read nearby."
  },
  {
    id: "grade-3-english-comprehension-camping-holiday-exam-015-q15",
    title: "A Camping Holiday: Question 15",
    skill: "detail recall",
    question: "Where did the family go in the evening?",
    options: [
      "To a farmhouse",
      "To a cinema",
      "To a market",
      "To school"
    ],
    correctAnswer: "To a farmhouse",
    explanation: "They walked to a farmhouse."
  },
  {
    id: "grade-3-english-comprehension-camping-holiday-exam-015-q16",
    title: "A Camping Holiday: Question 16",
    skill: "detail recall",
    question: "What animals did they watch being milked?",
    options: [
      "Cows",
      "Goats",
      "Horses",
      "Sheep"
    ],
    correctAnswer: "Cows",
    explanation: "They watched cows being milked."
  },
  {
    id: "grade-3-english-comprehension-camping-holiday-exam-015-q17",
    title: "A Camping Holiday: Question 17",
    skill: "spelling recognition",
    question: "Which word is spelled correctly?",
    options: [
      "holiday",
      "holidey",
      "holliday",
      "holyday"
    ],
    correctAnswer: "holiday",
    explanation: "Holiday is correctly spelled."
  },
  {
    id: "grade-3-english-comprehension-camping-holiday-exam-015-q18",
    title: "A Camping Holiday: Question 18",
    skill: "detail recall",
    question: "What did the farmer promise?",
    options: [
      "The children could help with the harvest if they came back in autumn.",
      "They could keep a cow.",
      "They could sleep in the barn forever.",
      "He would sell the tent."
    ],
    correctAnswer: "The children could help with the harvest if they came back in autumn.",
    explanation: "He promised they could help with the harvest."
  },
  {
    id: "grade-3-english-comprehension-camping-holiday-exam-015-q19",
    title: "A Camping Holiday: Question 19",
    skill: "detail recall",
    question: "How did the children sleep?",
    options: [
      "Soundly until morning",
      "Badly all night",
      "Only for one minute",
      "Not at all"
    ],
    correctAnswer: "Soundly until morning",
    explanation: "They fell fast asleep."
  },
  {
    id: "grade-3-english-comprehension-camping-holiday-exam-015-q20",
    title: "A Camping Holiday: Question 20",
    skill: "detail recall",
    question: "What made the holiday special?",
    options: [
      "Family time, nature, and new experiences",
      "Long homework",
      "Crowded roads",
      "No food"
    ],
    correctAnswer: "Family time, nature, and new experiences",
    explanation: "The passage shows many happy family experiences."
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
  options: item.options,
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
    sequence: 1500 + index
  }
}));

export default examQuestions;
