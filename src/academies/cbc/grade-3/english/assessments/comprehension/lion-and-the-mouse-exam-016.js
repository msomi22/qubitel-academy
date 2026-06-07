import { defineMcqProblem } from '../../../../../../problems/problemAuthoring.js';

export const lionAndTheMousePassage = {
  title: "The Lion and the Mouse",
  paragraphs: [
    {
      id: "lionandthemouse-p1",
      sentenceIds: [
        "lionandthemouse-s1",
        "lionandthemouse-s2",
        "lionandthemouse-s3"
      ]
    },
    {
      id: "lionandthemouse-p2",
      sentenceIds: [
        "lionandthemouse-s4"
      ]
    },
    {
      id: "lionandthemouse-p3",
      sentenceIds: [
        "lionandthemouse-s5",
        "lionandthemouse-s6"
      ]
    },
    {
      id: "lionandthemouse-p4",
      sentenceIds: [
        "lionandthemouse-s7",
        "lionandthemouse-s8",
        "lionandthemouse-s9",
        "lionandthemouse-s10"
      ]
    },
    {
      id: "lionandthemouse-p5",
      sentenceIds: [
        "lionandthemouse-s11",
        "lionandthemouse-s12",
        "lionandthemouse-s13",
        "lionandthemouse-s14"
      ]
    },
    {
      id: "lionandthemouse-p6",
      sentenceIds: [
        "lionandthemouse-s15",
        "lionandthemouse-s16"
      ]
    },
    {
      id: "lionandthemouse-p7",
      sentenceIds: [
        "lionandthemouse-s17"
      ]
    },
    {
      id: "lionandthemouse-p8",
      sentenceIds: [
        "lionandthemouse-s18",
        "lionandthemouse-s19",
        "lionandthemouse-s20"
      ]
    },
    {
      id: "lionandthemouse-p9",
      sentenceIds: [
        "lionandthemouse-s21",
        "lionandthemouse-s22",
        "lionandthemouse-s23"
      ]
    }
  ],
  sentences: [
    {
      id: "lionandthemouse-s1",
      text: "One hot afternoon, a lion slept in his den after a long hunt."
    },
    {
      id: "lionandthemouse-s2",
      text: "A playful little mouse ran across the lion’s paw and over his nose."
    },
    {
      id: "lionandthemouse-s3",
      text: "The lion woke up with a roar."
    },
    {
      id: "lionandthemouse-s4",
      text: "Quickly, he trapped the frightened mouse under his mighty paw."
    },
    {
      id: "lionandthemouse-s5",
      text: "“Please do not kill me,” squeaked the mouse."
    },
    {
      id: "lionandthemouse-s6",
      text: "“Let me go this time, and one day I may help you.”"
    },
    {
      id: "lionandthemouse-s7",
      text: "The lion laughed softly."
    },
    {
      id: "lionandthemouse-s8",
      text: "“You are very small,” he said."
    },
    {
      id: "lionandthemouse-s9",
      text: "“How could you ever help me, the king of beasts?”"
    },
    {
      id: "lionandthemouse-s10",
      text: "Still, the lion felt kind, so he lifted his paw and let the mouse run away."
    },
    {
      id: "lionandthemouse-s11",
      text: "A few days later, hunters placed a strong rope net in the forest."
    },
    {
      id: "lionandthemouse-s12",
      text: "While the lion was walking among the trees, he stepped into the net and became trapped."
    },
    {
      id: "lionandthemouse-s13",
      text: "He pulled and twisted, but the ropes only grew tighter."
    },
    {
      id: "lionandthemouse-s14",
      text: "The lion roared so loudly that the sound echoed through the forest."
    },
    {
      id: "lionandthemouse-s15",
      text: "The little mouse heard the roar and knew it was the lion who had spared his life."
    },
    {
      id: "lionandthemouse-s16",
      text: "He ran to the net at once."
    },
    {
      id: "lionandthemouse-s17",
      text: "“Your Majesty,” said the mouse, “now I can repay your kindness.”"
    },
    {
      id: "lionandthemouse-s18",
      text: "The mouse used his sharp teeth to nibble through the ropes."
    },
    {
      id: "lionandthemouse-s19",
      text: "Bit by bit, the net opened."
    },
    {
      id: "lionandthemouse-s20",
      text: "Soon the lion was free."
    },
    {
      id: "lionandthemouse-s21",
      text: "The lion looked at the tiny mouse with respect."
    },
    {
      id: "lionandthemouse-s22",
      text: "He had learned that even the smallest friend can be a great helper."
    },
    {
      id: "lionandthemouse-s23",
      text: "Kindness is never wasted."
    }
  ]
};

const examId = 'grade-3-english-comprehension-lion-and-the-mouse-exam-016';
const examTitle = 'Grade 3 English Comprehension Exam 016: The Lion and the Mouse';
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
  passageTitle: lionAndTheMousePassage.title,
  readingGuideSeconds: 600,
  questionTimeSeconds,
  autoAdvanceAfterReading: false,
  allowStartQuestionsAnytime: true,
  allowPassageDuringQuestions: true,
  readAloud: {
    enabled: true,
    highlightCurrentSentence: true
  },
  passage: lionAndTheMousePassage
};

const questions = [
  {
    id: "grade-3-english-comprehension-lion-and-the-mouse-exam-016-q01",
    title: "The Lion and the Mouse: Question 1",
    skill: "detail recall",
    question: "Where was the lion sleeping?",
    options: [
      "In his den",
      "In a shop",
      "On a boat",
      "In a classroom"
    ],
    correctAnswer: "In his den",
    explanation: "The lion slept in his den."
  },
  {
    id: "grade-3-english-comprehension-lion-and-the-mouse-exam-016-q02",
    title: "The Lion and the Mouse: Question 2",
    skill: "detail recall",
    question: "What woke the lion?",
    options: [
      "A mouse ran across his paw and nose.",
      "A hunter shouted.",
      "Rain fell.",
      "A bird sang."
    ],
    correctAnswer: "A mouse ran across his paw and nose.",
    explanation: "The mouse ran over him."
  },
  {
    id: "grade-3-english-comprehension-lion-and-the-mouse-exam-016-q03",
    title: "The Lion and the Mouse: Question 3",
    skill: "detail recall",
    question: "What did the lion trap the mouse with?",
    options: [
      "His mighty paw",
      "A rope",
      "A basket",
      "His tail"
    ],
    correctAnswer: "His mighty paw",
    explanation: "He trapped the mouse under his paw."
  },
  {
    id: "grade-3-english-comprehension-lion-and-the-mouse-exam-016-q04",
    title: "The Lion and the Mouse: Question 4",
    skill: "detail recall",
    question: "How did the mouse feel when trapped?",
    options: [
      "Frightened",
      "Proud",
      "Sleepy",
      "Bored"
    ],
    correctAnswer: "Frightened",
    explanation: "The passage calls him frightened."
  },
  {
    id: "grade-3-english-comprehension-lion-and-the-mouse-exam-016-q05",
    title: "The Lion and the Mouse: Question 5",
    skill: "detail recall",
    question: "What did the mouse ask the lion to do?",
    options: [
      "Let him go",
      "Give him honey",
      "Build a den",
      "Catch hunters"
    ],
    correctAnswer: "Let him go",
    explanation: "The mouse asked not to be killed."
  },
  {
    id: "grade-3-english-comprehension-lion-and-the-mouse-exam-016-q06",
    title: "The Lion and the Mouse: Question 6",
    skill: "detail recall",
    question: "What did the mouse promise?",
    options: [
      "To help the lion one day",
      "To bring cherries",
      "To guard sheep",
      "To cook beans"
    ],
    correctAnswer: "To help the lion one day",
    explanation: "He promised to help one day."
  },
  {
    id: "grade-3-english-comprehension-lion-and-the-mouse-exam-016-q07",
    title: "The Lion and the Mouse: Question 7",
    skill: "inference",
    question: "Why did the lion laugh?",
    options: [
      "He thought the mouse was too small to help him.",
      "He was eating.",
      "The mouse told a joke.",
      "The hunters ran away."
    ],
    correctAnswer: "He thought the mouse was too small to help him.",
    explanation: "The lion doubted the tiny mouse could help."
  },
  {
    id: "grade-3-english-comprehension-lion-and-the-mouse-exam-016-q08",
    title: "The Lion and the Mouse: Question 8",
    skill: "detail recall",
    question: "What did the lion do in the end?",
    options: [
      "Let the mouse go",
      "Ate the mouse",
      "Chased the mouse forever",
      "Put the mouse in a cage"
    ],
    correctAnswer: "Let the mouse go",
    explanation: "He lifted his paw and freed the mouse."
  },
  {
    id: "grade-3-english-comprehension-lion-and-the-mouse-exam-016-q09",
    title: "The Lion and the Mouse: Question 9",
    skill: "detail recall",
    question: "What trapped the lion later?",
    options: [
      "A strong rope net",
      "A deep well",
      "A heavy door",
      "A river"
    ],
    correctAnswer: "A strong rope net",
    explanation: "Hunters placed a strong rope net."
  },
  {
    id: "grade-3-english-comprehension-lion-and-the-mouse-exam-016-q10",
    title: "The Lion and the Mouse: Question 10",
    skill: "detail recall",
    question: "Who set the trap?",
    options: [
      "Hunters",
      "The mouse",
      "Other lions",
      "Children"
    ],
    correctAnswer: "Hunters",
    explanation: "Hunters placed the net."
  },
  {
    id: "grade-3-english-comprehension-lion-and-the-mouse-exam-016-q11",
    title: "The Lion and the Mouse: Question 11",
    skill: "detail recall",
    question: "How did the mouse recognise the lion?",
    options: [
      "By his roar",
      "By his crown",
      "By his colour only",
      "By his food"
    ],
    correctAnswer: "By his roar",
    explanation: "The mouse heard the roar and knew it was him."
  },
  {
    id: "grade-3-english-comprehension-lion-and-the-mouse-exam-016-q12",
    title: "The Lion and the Mouse: Question 12",
    skill: "detail recall",
    question: "How did the mouse free the lion?",
    options: [
      "By nibbling through the ropes",
      "By pushing a tree",
      "By calling hunters",
      "By lifting the net alone"
    ],
    correctAnswer: "By nibbling through the ropes",
    explanation: "He used his sharp teeth to nibble the ropes."
  },
  {
    id: "grade-3-english-comprehension-lion-and-the-mouse-exam-016-q13",
    title: "The Lion and the Mouse: Question 13",
    skill: "vocabulary in context",
    question: "What does “echoed” mean?",
    options: [
      "The sound repeated through the forest",
      "The sound became silent",
      "The sound turned into rain",
      "The sound disappeared at once"
    ],
    correctAnswer: "The sound repeated through the forest",
    explanation: "Echoed means the sound repeated."
  },
  {
    id: "grade-3-english-comprehension-lion-and-the-mouse-exam-016-q14",
    title: "The Lion and the Mouse: Question 14",
    skill: "vocabulary in context",
    question: "What does “Your Majesty” show?",
    options: [
      "Respect for the lion as king",
      "Anger at the lion",
      "Fear of the mouse",
      "A greeting to hunters"
    ],
    correctAnswer: "Respect for the lion as king",
    explanation: "Majesty is used for a king or queen."
  },
  {
    id: "grade-3-english-comprehension-lion-and-the-mouse-exam-016-q15",
    title: "The Lion and the Mouse: Question 15",
    skill: "spelling recognition",
    question: "Which word is spelled correctly?",
    options: [
      "kindness",
      "kindnes",
      "kinedness",
      "kindniss"
    ],
    correctAnswer: "kindness",
    explanation: "Kindness is correct."
  },
  {
    id: "grade-3-english-comprehension-lion-and-the-mouse-exam-016-q16",
    title: "The Lion and the Mouse: Question 16",
    skill: "life skill",
    question: "What lesson does the fable teach?",
    options: [
      "Kindness is never wasted.",
      "Only big animals matter.",
      "Small animals cannot help.",
      "Never sleep in a den."
    ],
    correctAnswer: "Kindness is never wasted.",
    explanation: "The final line gives this lesson."
  },
  {
    id: "grade-3-english-comprehension-lion-and-the-mouse-exam-016-q17",
    title: "The Lion and the Mouse: Question 17",
    skill: "detail recall",
    question: "How did the lion’s view of the mouse change?",
    options: [
      "He respected the mouse.",
      "He hated the mouse more.",
      "He forgot the mouse.",
      "He became afraid of all mice."
    ],
    correctAnswer: "He respected the mouse.",
    explanation: "He looked at the mouse with respect."
  },
  {
    id: "grade-3-english-comprehension-lion-and-the-mouse-exam-016-q18",
    title: "The Lion and the Mouse: Question 18",
    skill: "detail recall",
    question: "Which animal was brave?",
    options: [
      "The mouse",
      "Only the hunters",
      "A goat",
      "A horse"
    ],
    correctAnswer: "The mouse",
    explanation: "The mouse bravely helped the lion."
  },
  {
    id: "grade-3-english-comprehension-lion-and-the-mouse-exam-016-q19",
    title: "The Lion and the Mouse: Question 19",
    skill: "detail recall",
    question: "What could be another title?",
    options: [
      "Small Friend, Big Help",
      "The Lazy Lion",
      "The Lost Honey",
      "The Sleeping Farmer"
    ],
    correctAnswer: "Small Friend, Big Help",
    explanation: "The mouse is small but helps greatly."
  },
  {
    id: "grade-3-english-comprehension-lion-and-the-mouse-exam-016-q20",
    title: "The Lion and the Mouse: Question 20",
    skill: "inference",
    question: "Why is it good to be kind to others?",
    options: [
      "Anyone may need or give help later.",
      "It makes nets stronger.",
      "It makes lions sleep more.",
      "It keeps mice away."
    ],
    correctAnswer: "Anyone may need or give help later.",
    explanation: "The story shows kindness can return."
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
    sequence: 1600 + index
  }
}));

export default examQuestions;
