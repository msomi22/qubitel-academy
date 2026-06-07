import { defineMcqProblem } from '../../../../../../problems/problemAuthoring.js';

export const bearCubAdventurePassage = {
  title: "A Bear Cub's Adventure",
  paragraphs: [
    {
      id: "bearcubadventure-p1",
      sentenceIds: [
        "bearcubadventure-s1",
        "bearcubadventure-s2",
        "bearcubadventure-s3"
      ]
    },
    {
      id: "bearcubadventure-p2",
      sentenceIds: [
        "bearcubadventure-s4",
        "bearcubadventure-s5",
        "bearcubadventure-s6",
        "bearcubadventure-s7"
      ]
    },
    {
      id: "bearcubadventure-p3",
      sentenceIds: [
        "bearcubadventure-s8"
      ]
    },
    {
      id: "bearcubadventure-p4",
      sentenceIds: [
        "bearcubadventure-s9",
        "bearcubadventure-s10",
        "bearcubadventure-s11"
      ]
    },
    {
      id: "bearcubadventure-p5",
      sentenceIds: [
        "bearcubadventure-s12",
        "bearcubadventure-s13",
        "bearcubadventure-s14"
      ]
    },
    {
      id: "bearcubadventure-p6",
      sentenceIds: [
        "bearcubadventure-s15",
        "bearcubadventure-s16",
        "bearcubadventure-s17"
      ]
    },
    {
      id: "bearcubadventure-p7",
      sentenceIds: [
        "bearcubadventure-s18",
        "bearcubadventure-s19",
        "bearcubadventure-s20",
        "bearcubadventure-s21"
      ]
    }
  ],
  sentences: [
    {
      id: "bearcubadventure-s1",
      text: "Mishook was a young bear cub who lived in the forest with his mother and two older cubs."
    },
    {
      id: "bearcubadventure-s2",
      text: "Bears do not see very well from far away, but they have a wonderful sense of smell and very sharp hearing."
    },
    {
      id: "bearcubadventure-s3",
      text: "These senses help them find food and notice danger."
    },
    {
      id: "bearcubadventure-s4",
      text: "One warm afternoon, a gentle breeze moved through the trees."
    },
    {
      id: "bearcubadventure-s5",
      text: "It carried a sweet smell towards Mishook’s nose."
    },
    {
      id: "bearcubadventure-s6",
      text: "Mishook lifted his head and sniffed."
    },
    {
      id: "bearcubadventure-s7",
      text: "He did not know what the smell was, but his mother knew at once."
    },
    {
      id: "bearcubadventure-s8",
      text: "“Honey,” she grunted softly."
    },
    {
      id: "bearcubadventure-s9",
      text: "The whole bear family hurried through the forest."
    },
    {
      id: "bearcubadventure-s10",
      text: "They followed the smell for about a kilometre until they reached an old, hollow tree trunk."
    },
    {
      id: "bearcubadventure-s11",
      text: "Bees had made their home inside it, and the tree was full of golden honey."
    },
    {
      id: "bearcubadventure-s12",
      text: "The bees saw the bears coming and quickly sounded an alarm."
    },
    {
      id: "bearcubadventure-s13",
      text: "Many bees flew out together, buzzing angrily."
    },
    {
      id: "bearcubadventure-s14",
      text: "They tried to protect their honey by stinging the bears."
    },
    {
      id: "bearcubadventure-s15",
      text: "Mother Bear and the older cubs kept eating calmly because their thick fur protected them."
    },
    {
      id: "bearcubadventure-s16",
      text: "Mishook pushed his nose too close to the tree."
    },
    {
      id: "bearcubadventure-s17",
      text: "One angry bee stung him right on the nose."
    },
    {
      id: "bearcubadventure-s18",
      text: "Mishook growled, shook his head, jumped about, snorted, and spun around like a top."
    },
    {
      id: "bearcubadventure-s19",
      text: "At last, he brushed the bee away with his paw."
    },
    {
      id: "bearcubadventure-s20",
      text: "His nose hurt, but the honey tasted so sweet that he soon forgot his trouble."
    },
    {
      id: "bearcubadventure-s21",
      text: "From that day, Mishook knew two things: honey is delicious, and bees do not give it away easily."
    }
  ]
};

const examId = 'grade-3-english-comprehension-bear-cub-adventure-exam-012';
const examTitle = 'Grade 3 English Comprehension Exam 012: A Bear Cub\'s Adventure';
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
  passageTitle: bearCubAdventurePassage.title,
  readingGuideSeconds: 600,
  questionTimeSeconds,
  autoAdvanceAfterReading: false,
  allowStartQuestionsAnytime: true,
  allowPassageDuringQuestions: true,
  readAloud: {
    enabled: true,
    highlightCurrentSentence: true
  },
  passage: bearCubAdventurePassage
};

const questions = [
  {
    id: "grade-3-english-comprehension-bear-cub-adventure-exam-012-q01",
    title: "A Bear Cub's Adventure: Question 1",
    skill: "detail recall",
    question: "Who was Mishook?",
    options: [
      "A young bear cub",
      "A farmer",
      "A bee",
      "A bird"
    ],
    correctAnswer: "A young bear cub",
    explanation: "Mishook was a young bear cub."
  },
  {
    id: "grade-3-english-comprehension-bear-cub-adventure-exam-012-q02",
    title: "A Bear Cub's Adventure: Question 2",
    skill: "detail recall",
    question: "Which two senses are very good in bears?",
    options: [
      "Taste and touch",
      "Smell and hearing",
      "Sight and taste",
      "Touch and sight"
    ],
    correctAnswer: "Smell and hearing",
    explanation: "The passage says bears have a wonderful sense of smell and sharp hearing."
  },
  {
    id: "grade-3-english-comprehension-bear-cub-adventure-exam-012-q03",
    title: "A Bear Cub's Adventure: Question 3",
    skill: "inference",
    question: "Why are these senses useful to bears?",
    options: [
      "They help bears find food and notice danger.",
      "They help bears fly.",
      "They help bears write.",
      "They help bears sleep all day."
    ],
    correctAnswer: "They help bears find food and notice danger.",
    explanation: "Good smell and hearing help bears survive."
  },
  {
    id: "grade-3-english-comprehension-bear-cub-adventure-exam-012-q04",
    title: "A Bear Cub's Adventure: Question 4",
    skill: "detail recall",
    question: "What carried the sweet smell to Mishook?",
    options: [
      "Rain",
      "A gentle breeze",
      "A river",
      "A bird"
    ],
    correctAnswer: "A gentle breeze",
    explanation: "A gentle breeze moved through the trees and carried the smell."
  },
  {
    id: "grade-3-english-comprehension-bear-cub-adventure-exam-012-q05",
    title: "A Bear Cub's Adventure: Question 5",
    skill: "detail recall",
    question: "What was the sweet smell?",
    options: [
      "Milk",
      "Honey",
      "Flowers only",
      "Bread"
    ],
    correctAnswer: "Honey",
    explanation: "Mother Bear knew the smell was honey."
  },
  {
    id: "grade-3-english-comprehension-bear-cub-adventure-exam-012-q06",
    title: "A Bear Cub's Adventure: Question 6",
    skill: "detail recall",
    question: "How far did the bears follow the smell?",
    options: [
      "About one kilometre",
      "About ten kilometres",
      "Across the sea",
      "Only one step"
    ],
    correctAnswer: "About one kilometre",
    explanation: "They followed it for about a kilometre."
  },
  {
    id: "grade-3-english-comprehension-bear-cub-adventure-exam-012-q07",
    title: "A Bear Cub's Adventure: Question 7",
    skill: "detail recall",
    question: "Where had the bees made their home?",
    options: [
      "In a hollow tree trunk",
      "In a cave",
      "Under a stone",
      "In a basket"
    ],
    correctAnswer: "In a hollow tree trunk",
    explanation: "The bees lived inside an old, hollow tree trunk."
  },
  {
    id: "grade-3-english-comprehension-bear-cub-adventure-exam-012-q08",
    title: "A Bear Cub's Adventure: Question 8",
    skill: "vocabulary in context",
    question: "What does “sounded an alarm” mean in the passage?",
    options: [
      "Made a warning signal",
      "Played music",
      "Went to sleep",
      "Opened a door"
    ],
    correctAnswer: "Made a warning signal",
    explanation: "The bees warned one another that danger was coming."
  },
  {
    id: "grade-3-english-comprehension-bear-cub-adventure-exam-012-q09",
    title: "A Bear Cub's Adventure: Question 9",
    skill: "inference",
    question: "Why did the bees sting the bears?",
    options: [
      "To protect their honey",
      "To play with them",
      "To show the way",
      "To thank them"
    ],
    correctAnswer: "To protect their honey",
    explanation: "The bees tried to protect their honey."
  },
  {
    id: "grade-3-english-comprehension-bear-cub-adventure-exam-012-q10",
    title: "A Bear Cub's Adventure: Question 10",
    skill: "inference",
    question: "Why could Mother Bear continue eating?",
    options: [
      "Her thick fur protected her.",
      "The bees liked her.",
      "She was hiding in water.",
      "She had no nose."
    ],
    correctAnswer: "Her thick fur protected her.",
    explanation: "The thick fur protected her from many stings."
  },
  {
    id: "grade-3-english-comprehension-bear-cub-adventure-exam-012-q11",
    title: "A Bear Cub's Adventure: Question 11",
    skill: "detail recall",
    question: "Where was Mishook stung?",
    options: [
      "On his paw",
      "On his nose",
      "On his ear",
      "On his back"
    ],
    correctAnswer: "On his nose",
    explanation: "One angry bee stung his nose."
  },
  {
    id: "grade-3-english-comprehension-bear-cub-adventure-exam-012-q12",
    title: "A Bear Cub's Adventure: Question 12",
    skill: "detail recall",
    question: "Which action did Mishook do to remove the bee?",
    options: [
      "He brushed it away with his paw.",
      "He sang to it.",
      "He gave it honey.",
      "He hid under leaves."
    ],
    correctAnswer: "He brushed it away with his paw.",
    explanation: "At last, he brushed the bee away with his paw."
  },
  {
    id: "grade-3-english-comprehension-bear-cub-adventure-exam-012-q13",
    title: "A Bear Cub's Adventure: Question 13",
    skill: "vocabulary in context",
    question: "Which word in the story means empty inside?",
    options: [
      "hollow",
      "golden",
      "gentle",
      "sharp"
    ],
    correctAnswer: "hollow",
    explanation: "A hollow tree trunk is empty inside."
  },
  {
    id: "grade-3-english-comprehension-bear-cub-adventure-exam-012-q14",
    title: "A Bear Cub's Adventure: Question 14",
    skill: "vocabulary in context",
    question: "What does “delicious” mean?",
    options: [
      "Very tasty",
      "Very heavy",
      "Very loud",
      "Very cold"
    ],
    correctAnswer: "Very tasty",
    explanation: "The honey tasted sweet and delicious."
  },
  {
    id: "grade-3-english-comprehension-bear-cub-adventure-exam-012-q15",
    title: "A Bear Cub's Adventure: Question 15",
    skill: "spelling recognition",
    question: "Which word is spelled correctly?",
    options: [
      "hony",
      "honney",
      "honey",
      "honee"
    ],
    correctAnswer: "honey",
    explanation: "Honey is the correct spelling."
  },
  {
    id: "grade-3-english-comprehension-bear-cub-adventure-exam-012-q16",
    title: "A Bear Cub's Adventure: Question 16",
    skill: "detail recall",
    question: "What did Mishook learn about bees?",
    options: [
      "They do not give honey away easily.",
      "They are always asleep.",
      "They cannot fly.",
      "They like bear cubs."
    ],
    correctAnswer: "They do not give honey away easily.",
    explanation: "The ending says bees do not give honey away easily."
  },
  {
    id: "grade-3-english-comprehension-bear-cub-adventure-exam-012-q17",
    title: "A Bear Cub's Adventure: Question 17",
    skill: "inference",
    question: "How did Mishook probably feel when he was stung?",
    options: [
      "Happy and calm",
      "Hurt and angry",
      "Sleepy",
      "Proud only"
    ],
    correctAnswer: "Hurt and angry",
    explanation: "He growled, jumped, snorted, and spun around."
  },
  {
    id: "grade-3-english-comprehension-bear-cub-adventure-exam-012-q18",
    title: "A Bear Cub's Adventure: Question 18",
    skill: "inference",
    question: "Why is the title “A Bear Cub’s Adventure” suitable?",
    options: [
      "Mishook followed a smell and had an exciting experience.",
      "Mishook went to school.",
      "Mishook bought fruit.",
      "Mishook built a house."
    ],
    correctAnswer: "Mishook followed a smell and had an exciting experience.",
    explanation: "The story is about Mishook’s forest adventure."
  },
  {
    id: "grade-3-english-comprehension-bear-cub-adventure-exam-012-q19",
    title: "A Bear Cub's Adventure: Question 19",
    skill: "sequence",
    question: "What should Mishook do next time he sees bees?",
    options: [
      "Be more careful near their home",
      "Put his nose closer",
      "Break every tree",
      "Chase them with leaves"
    ],
    correctAnswer: "Be more careful near their home",
    explanation: "He learned that bees protect their honey."
  },
  {
    id: "grade-3-english-comprehension-bear-cub-adventure-exam-012-q20",
    title: "A Bear Cub's Adventure: Question 20",
    skill: "detail recall",
    question: "What was the main prize the bears wanted?",
    options: [
      "Golden honey",
      "A new cave",
      "A fish net",
      "A blanket"
    ],
    correctAnswer: "Golden honey",
    explanation: "They went in search of honey."
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
    sequence: 1200 + index
  }
}));

export default examQuestions;
