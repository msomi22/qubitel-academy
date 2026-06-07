import { defineMcqProblem } from '../../../../../../problems/problemAuthoring.js';

export const tomThumbPassage = {
  title: "Tom Thumb",
  paragraphs: [
    {
      id: "tomthumb-p1",
      sentenceIds: [
        "tomthumb-s1",
        "tomthumb-s2",
        "tomthumb-s3"
      ]
    },
    {
      id: "tomthumb-p2",
      sentenceIds: [
        "tomthumb-s4",
        "tomthumb-s5",
        "tomthumb-s6",
        "tomthumb-s7"
      ]
    },
    {
      id: "tomthumb-p3",
      sentenceIds: [
        "tomthumb-s8",
        "tomthumb-s9",
        "tomthumb-s10"
      ]
    },
    {
      id: "tomthumb-p4",
      sentenceIds: [
        "tomthumb-s11",
        "tomthumb-s12",
        "tomthumb-s13"
      ]
    },
    {
      id: "tomthumb-p5",
      sentenceIds: [
        "tomthumb-s14",
        "tomthumb-s15"
      ]
    },
    {
      id: "tomthumb-p6",
      sentenceIds: [
        "tomthumb-s16",
        "tomthumb-s17",
        "tomthumb-s18",
        "tomthumb-s19"
      ]
    },
    {
      id: "tomthumb-p7",
      sentenceIds: [
        "tomthumb-s20"
      ]
    }
  ],
  sentences: [
    {
      id: "tomthumb-s1",
      text: "Tom Thumb lived with his parents and brothers near a thick forest."
    },
    {
      id: "tomthumb-s2",
      text: "One day, their father, a poor woodman, took the children into the forest to help gather sticks."
    },
    {
      id: "tomthumb-s3",
      text: "The trees grew so close together that the children could not see far ahead."
    },
    {
      id: "tomthumb-s4",
      text: "The woodman began cutting wood."
    },
    {
      id: "tomthumb-s5",
      text: "The children picked up sticks and tied them into small bundles."
    },
    {
      id: "tomthumb-s6",
      text: "While everyone seemed busy, the father and mother slowly moved away."
    },
    {
      id: "tomthumb-s7",
      text: "Then, suddenly, they ran through the bushes and disappeared."
    },
    {
      id: "tomthumb-s8",
      text: "When the children noticed they were alone, they began to cry loudly."
    },
    {
      id: "tomthumb-s9",
      text: "The forest looked dark and strange."
    },
    {
      id: "tomthumb-s10",
      text: "They were afraid they would never find the way home."
    },
    {
      id: "tomthumb-s11",
      text: "Tom Thumb did not cry."
    },
    {
      id: "tomthumb-s12",
      text: "Before they entered the forest, he had filled his pockets with small white stones."
    },
    {
      id: "tomthumb-s13",
      text: "As they walked, he had quietly dropped the stones one by one along the path."
    },
    {
      id: "tomthumb-s14",
      text: "“Do not be afraid,” Tom told his brothers."
    },
    {
      id: "tomthumb-s15",
      text: "“Father and Mother have left us here, but I can take you home. Follow me.”"
    },
    {
      id: "tomthumb-s16",
      text: "The children followed Tom."
    },
    {
      id: "tomthumb-s17",
      text: "He looked carefully for the white stones shining on the ground."
    },
    {
      id: "tomthumb-s18",
      text: "Step by step, the stones led them back along the same path."
    },
    {
      id: "tomthumb-s19",
      text: "At last, Tom brought his brothers safely home."
    },
    {
      id: "tomthumb-s20",
      text: "Although Tom was the smallest child, he was brave, calm, and clever."
    }
  ]
};

const examId = 'grade-3-english-comprehension-tom-thumb-exam-018';
const examTitle = 'Grade 3 English Comprehension Exam 018: Tom Thumb';
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
  passageTitle: tomThumbPassage.title,
  readingGuideSeconds: 600,
  questionTimeSeconds,
  autoAdvanceAfterReading: false,
  allowStartQuestionsAnytime: true,
  allowPassageDuringQuestions: true,
  readAloud: {
    enabled: true,
    highlightCurrentSentence: true
  },
  passage: tomThumbPassage
};

const questions = [
  {
    id: "grade-3-english-comprehension-tom-thumb-exam-018-q01",
    title: "Tom Thumb: Question 1",
    skill: "detail recall",
    question: "Where did the family live?",
    options: [
      "Near a thick forest",
      "Beside the sea",
      "In a castle",
      "In a shop"
    ],
    correctAnswer: "Near a thick forest",
    explanation: "They lived near a thick forest."
  },
  {
    id: "grade-3-english-comprehension-tom-thumb-exam-018-q02",
    title: "Tom Thumb: Question 2",
    skill: "detail recall",
    question: "What work did the father do?",
    options: [
      "He was a woodman.",
      "He was a farmer.",
      "He was a teacher.",
      "He was a driver."
    ],
    correctAnswer: "He was a woodman.",
    explanation: "The passage calls him a poor woodman."
  },
  {
    id: "grade-3-english-comprehension-tom-thumb-exam-018-q03",
    title: "Tom Thumb: Question 3",
    skill: "inference",
    question: "Why did the father take the children into the forest?",
    options: [
      "To help gather sticks",
      "To buy fruit",
      "To visit friends",
      "To find honey"
    ],
    correctAnswer: "To help gather sticks",
    explanation: "They went to gather sticks."
  },
  {
    id: "grade-3-english-comprehension-tom-thumb-exam-018-q04",
    title: "Tom Thumb: Question 4",
    skill: "detail recall",
    question: "What made the forest difficult to see through?",
    options: [
      "The trees grew close together.",
      "It was full of tents.",
      "There was too much sand.",
      "The sun was too bright."
    ],
    correctAnswer: "The trees grew close together.",
    explanation: "The trees were very close."
  },
  {
    id: "grade-3-english-comprehension-tom-thumb-exam-018-q05",
    title: "Tom Thumb: Question 5",
    skill: "detail recall",
    question: "What did the children do with the sticks?",
    options: [
      "Tied them into bundles",
      "Threw them in a well",
      "Painted them",
      "Gave them to a goat"
    ],
    correctAnswer: "Tied them into bundles",
    explanation: "They tied sticks into bundles."
  },
  {
    id: "grade-3-english-comprehension-tom-thumb-exam-018-q06",
    title: "Tom Thumb: Question 6",
    skill: "detail recall",
    question: "What did the parents do while the children were busy?",
    options: [
      "Moved away and disappeared",
      "Cooked breakfast",
      "Built a tent",
      "Sang songs"
    ],
    correctAnswer: "Moved away and disappeared",
    explanation: "They slowly moved away and ran off."
  },
  {
    id: "grade-3-english-comprehension-tom-thumb-exam-018-q07",
    title: "Tom Thumb: Question 7",
    skill: "inference",
    question: "Why did the children cry?",
    options: [
      "They noticed they were alone.",
      "They lost their cherries.",
      "They saw a bee.",
      "They were hungry only."
    ],
    correctAnswer: "They noticed they were alone.",
    explanation: "They were frightened after being left alone."
  },
  {
    id: "grade-3-english-comprehension-tom-thumb-exam-018-q08",
    title: "Tom Thumb: Question 8",
    skill: "inference",
    question: "Why did Tom not cry?",
    options: [
      "He had a plan to find the way home.",
      "He did not like his brothers.",
      "He was asleep.",
      "He knew a farmer was coming."
    ],
    correctAnswer: "He had a plan to find the way home.",
    explanation: "Tom had dropped stones to mark the path."
  },
  {
    id: "grade-3-english-comprehension-tom-thumb-exam-018-q09",
    title: "Tom Thumb: Question 9",
    skill: "detail recall",
    question: "What had Tom put in his pockets?",
    options: [
      "Small white stones",
      "Golden honey",
      "Red cherries",
      "Tiny fish"
    ],
    correctAnswer: "Small white stones",
    explanation: "He filled his pockets with small white stones."
  },
  {
    id: "grade-3-english-comprehension-tom-thumb-exam-018-q10",
    title: "Tom Thumb: Question 10",
    skill: "detail recall",
    question: "What did Tom do with the stones as they walked?",
    options: [
      "Dropped them one by one along the path",
      "Ate them",
      "Threw them into a well",
      "Gave them to birds"
    ],
    correctAnswer: "Dropped them one by one along the path",
    explanation: "He dropped stones along the path."
  },
  {
    id: "grade-3-english-comprehension-tom-thumb-exam-018-q11",
    title: "Tom Thumb: Question 11",
    skill: "detail recall",
    question: "How did the stones help?",
    options: [
      "They marked the way home.",
      "They scared animals.",
      "They became bread.",
      "They made the trees move."
    ],
    correctAnswer: "They marked the way home.",
    explanation: "The stones led them back."
  },
  {
    id: "grade-3-english-comprehension-tom-thumb-exam-018-q12",
    title: "Tom Thumb: Question 12",
    skill: "detail recall",
    question: "What did Tom tell his brothers?",
    options: [
      "Do not be afraid; follow me.",
      "Run in every direction.",
      "Stay in the forest.",
      "Cry louder."
    ],
    correctAnswer: "Do not be afraid; follow me.",
    explanation: "Tom comforted them and told them to follow."
  },
  {
    id: "grade-3-english-comprehension-tom-thumb-exam-018-q13",
    title: "Tom Thumb: Question 13",
    skill: "vocabulary in context",
    question: "Which word means small tied groups?",
    options: [
      "bundles",
      "bushes",
      "pockets",
      "parents"
    ],
    correctAnswer: "bundles",
    explanation: "Bundles are tied groups of sticks."
  },
  {
    id: "grade-3-english-comprehension-tom-thumb-exam-018-q14",
    title: "Tom Thumb: Question 14",
    skill: "spelling recognition",
    question: "Which word is spelled correctly?",
    options: [
      "forest",
      "forrest",
      "forist",
      "foreest"
    ],
    correctAnswer: "forest",
    explanation: "Forest is correct."
  },
  {
    id: "grade-3-english-comprehension-tom-thumb-exam-018-q15",
    title: "Tom Thumb: Question 15",
    skill: "detail recall",
    question: "How did Tom behave in danger?",
    options: [
      "Bravely and calmly",
      "Carelessly",
      "Rudely",
      "Lazily"
    ],
    correctAnswer: "Bravely and calmly",
    explanation: "He stayed calm and solved the problem."
  },
  {
    id: "grade-3-english-comprehension-tom-thumb-exam-018-q16",
    title: "Tom Thumb: Question 16",
    skill: "detail recall",
    question: "Who brought the children home?",
    options: [
      "Tom Thumb",
      "The father",
      "A goat",
      "A fox"
    ],
    correctAnswer: "Tom Thumb",
    explanation: "Tom led his brothers home."
  },
  {
    id: "grade-3-english-comprehension-tom-thumb-exam-018-q17",
    title: "Tom Thumb: Question 17",
    skill: "vocabulary in context",
    question: "What does the story show about size?",
    options: [
      "Even a small person can be clever and brave.",
      "Only big people can help.",
      "Small people cannot think.",
      "Size is everything."
    ],
    correctAnswer: "Even a small person can be clever and brave.",
    explanation: "Tom was small but saved his brothers."
  },
  {
    id: "grade-3-english-comprehension-tom-thumb-exam-018-q18",
    title: "Tom Thumb: Question 18",
    skill: "detail recall",
    question: "What would have happened if Tom had not dropped stones?",
    options: [
      "They might have struggled to find the way home.",
      "They would have found honey.",
      "They would have met James.",
      "They would have slept in a hotel."
    ],
    correctAnswer: "They might have struggled to find the way home.",
    explanation: "The stones marked their route."
  },
  {
    id: "grade-3-english-comprehension-tom-thumb-exam-018-q19",
    title: "Tom Thumb: Question 19",
    skill: "detail recall",
    question: "Which title could also fit?",
    options: [
      "The Clever Trail of Stones",
      "The Greedy Goat",
      "The Faithful Horse",
      "The Camping Trip"
    ],
    correctAnswer: "The Clever Trail of Stones",
    explanation: "The stones are central to Tom’s clever plan."
  },
  {
    id: "grade-3-english-comprehension-tom-thumb-exam-018-q20",
    title: "Tom Thumb: Question 20",
    skill: "life skill",
    question: "What lesson can learners take from Tom?",
    options: [
      "Stay calm and think when there is a problem.",
      "Always cry first.",
      "Never help your family.",
      "Throw away useful things."
    ],
    correctAnswer: "Stay calm and think when there is a problem.",
    explanation: "Tom stayed calm and found a solution."
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
    sequence: 1800 + index
  }
}));

export default examQuestions;
