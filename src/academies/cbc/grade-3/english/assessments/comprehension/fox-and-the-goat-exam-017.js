import { defineMcqProblem } from '../../../../../../problems/problemAuthoring.js';
import { placeCorrectAnswerAt, targetAnswerSlotForQuestion } from '../../../../../../utils/cbcAnswerDistribution.js';

export const foxAndTheGoatPassage = {
  title: "The Fox and the Goat",
  paragraphs: [
    {
      id: "foxandthegoat-p1",
      sentenceIds: [
        "foxandthegoat-s1",
        "foxandthegoat-s2"
      ]
    },
    {
      id: "foxandthegoat-p2",
      sentenceIds: [
        "foxandthegoat-s3",
        "foxandthegoat-s4",
        "foxandthegoat-s5"
      ]
    },
    {
      id: "foxandthegoat-p3",
      sentenceIds: [
        "foxandthegoat-s6",
        "foxandthegoat-s7"
      ]
    },
    {
      id: "foxandthegoat-p4",
      sentenceIds: [
        "foxandthegoat-s8",
        "foxandthegoat-s9"
      ]
    },
    {
      id: "foxandthegoat-p5",
      sentenceIds: [
        "foxandthegoat-s10",
        "foxandthegoat-s11",
        "foxandthegoat-s12"
      ]
    },
    {
      id: "foxandthegoat-p6",
      sentenceIds: [
        "foxandthegoat-s13",
        "foxandthegoat-s14"
      ]
    },
    {
      id: "foxandthegoat-p7",
      sentenceIds: [
        "foxandthegoat-s15",
        "foxandthegoat-s16"
      ]
    },
    {
      id: "foxandthegoat-p8",
      sentenceIds: [
        "foxandthegoat-s17",
        "foxandthegoat-s18",
        "foxandthegoat-s19"
      ]
    },
    {
      id: "foxandthegoat-p9",
      sentenceIds: [
        "foxandthegoat-s20"
      ]
    },
    {
      id: "foxandthegoat-p10",
      sentenceIds: [
        "foxandthegoat-s21",
        "foxandthegoat-s22"
      ]
    }
  ],
  sentences: [
    {
      id: "foxandthegoat-s1",
      text: "One dry day, a thirsty fox came to a deep well."
    },
    {
      id: "foxandthegoat-s2",
      text: "He leaned over the side to drink the cool water, but he leaned too far and slipped in with a splash."
    },
    {
      id: "foxandthegoat-s3",
      text: "The fox drank the water, but soon he had a serious problem."
    },
    {
      id: "foxandthegoat-s4",
      text: "The walls of the well were high and smooth."
    },
    {
      id: "foxandthegoat-s5",
      text: "No matter how hard he jumped, he could not climb out."
    },
    {
      id: "foxandthegoat-s6",
      text: "After a while, a goat came along the path."
    },
    {
      id: "foxandthegoat-s7",
      text: "He looked down and saw the fox in the well."
    },
    {
      id: "foxandthegoat-s8",
      text: "“Why are you down there?”"
    },
    {
      id: "foxandthegoat-s9",
      text: "asked the goat."
    },
    {
      id: "foxandthegoat-s10",
      text: "The fox was clever and cunning."
    },
    {
      id: "foxandthegoat-s11",
      text: "He did not say, “I am trapped.”"
    },
    {
      id: "foxandthegoat-s12",
      text: "Instead, he smiled and said, “I am enjoying the freshest, coolest water. Come down and taste it for yourself.”"
    },
    {
      id: "foxandthegoat-s13",
      text: "The goat was thirsty too."
    },
    {
      id: "foxandthegoat-s14",
      text: "Without stopping to think, he jumped into the well."
    },
    {
      id: "foxandthegoat-s15",
      text: "As soon as the goat reached the bottom, the fox leaped onto the goat’s back."
    },
    {
      id: "foxandthegoat-s16",
      text: "Then he jumped onto the goat’s horns and scrambled out of the well."
    },
    {
      id: "foxandthegoat-s17",
      text: "The goat looked up sadly."
    },
    {
      id: "foxandthegoat-s18",
      text: "“What about me?”"
    },
    {
      id: "foxandthegoat-s19",
      text: "he asked."
    },
    {
      id: "foxandthegoat-s20",
      text: "The fox looked down and said, “Next time, friend goat, look before you leap.”"
    },
    {
      id: "foxandthegoat-s21",
      text: "Then the fox ran away, leaving the goat to wait for help."
    },
    {
      id: "foxandthegoat-s22",
      text: "The goat learned that it is wise to think carefully before acting."
    }
  ]
};

const examId = 'grade-3-english-comprehension-fox-and-the-goat-exam-017';
const examTitle = 'Grade 3 English Comprehension Exam 017: The Fox and the Goat';
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
  passageTitle: foxAndTheGoatPassage.title,
  readingGuideSeconds: 600,
  questionTimeSeconds,
  autoAdvanceAfterReading: false,
  allowStartQuestionsAnytime: true,
  allowPassageDuringQuestions: true,
  readAloud: {
    enabled: true,
    highlightCurrentSentence: true
  },
  passage: foxAndTheGoatPassage
};

const questions = [
  {
    id: "grade-3-english-comprehension-fox-and-the-goat-exam-017-q01",
    title: "The Fox and the Goat: Question 1",
    skill: "inference",
    question: "Why did the fox go to the well?",
    options: [
      "He was thirsty.",
      "He wanted to sleep.",
      "He was hiding from rain.",
      "He wanted to meet a goat."
    ],
    correctAnswer: "He was thirsty.",
    explanation: "The fox was thirsty."
  },
  {
    id: "grade-3-english-comprehension-fox-and-the-goat-exam-017-q02",
    title: "The Fox and the Goat: Question 2",
    skill: "detail recall",
    question: "What happened when the fox leaned over?",
    options: [
      "He slipped into the well.",
      "He found cherries.",
      "He flew away.",
      "He saw a horse."
    ],
    correctAnswer: "He slipped into the well.",
    explanation: "He leaned too far and slipped in."
  },
  {
    id: "grade-3-english-comprehension-fox-and-the-goat-exam-017-q03",
    title: "The Fox and the Goat: Question 3",
    skill: "inference",
    question: "Why could the fox not get out?",
    options: [
      "The walls were high and smooth.",
      "He was asleep.",
      "The water was too sweet.",
      "The goat stopped him."
    ],
    correctAnswer: "The walls were high and smooth.",
    explanation: "The well walls were high and smooth."
  },
  {
    id: "grade-3-english-comprehension-fox-and-the-goat-exam-017-q04",
    title: "The Fox and the Goat: Question 4",
    skill: "detail recall",
    question: "Who came along the path?",
    options: [
      "A goat",
      "A lion",
      "A mouse",
      "A shepherd"
    ],
    correctAnswer: "A goat",
    explanation: "A goat came along."
  },
  {
    id: "grade-3-english-comprehension-fox-and-the-goat-exam-017-q05",
    title: "The Fox and the Goat: Question 5",
    skill: "detail recall",
    question: "What did the goat ask?",
    options: [
      "Why the fox was down there",
      "Where the market was",
      "What time it was",
      "Who owned the cherries"
    ],
    correctAnswer: "Why the fox was down there",
    explanation: "The goat asked why he was in the well."
  },
  {
    id: "grade-3-english-comprehension-fox-and-the-goat-exam-017-q06",
    title: "The Fox and the Goat: Question 6",
    skill: "detail recall",
    question: "Was the fox honest with the goat?",
    options: [
      "No",
      "Yes",
      "Only at the end",
      "The passage does not say"
    ],
    correctAnswer: "No",
    explanation: "He did not say he was trapped."
  },
  {
    id: "grade-3-english-comprehension-fox-and-the-goat-exam-017-q07",
    title: "The Fox and the Goat: Question 7",
    skill: "detail recall",
    question: "What did the fox say about the water?",
    options: [
      "It was fresh and cool.",
      "It was dirty.",
      "It was gone.",
      "It was too hot."
    ],
    correctAnswer: "It was fresh and cool.",
    explanation: "He called it fresh and cool."
  },
  {
    id: "grade-3-english-comprehension-fox-and-the-goat-exam-017-q08",
    title: "The Fox and the Goat: Question 8",
    skill: "inference",
    question: "Why did the goat jump in?",
    options: [
      "He was thirsty and did not stop to think.",
      "He wanted to rescue the fox carefully.",
      "He knew the way out.",
      "He was pushed."
    ],
    correctAnswer: "He was thirsty and did not stop to think.",
    explanation: "The goat was thirsty and foolish."
  },
  {
    id: "grade-3-english-comprehension-fox-and-the-goat-exam-017-q09",
    title: "The Fox and the Goat: Question 9",
    skill: "detail recall",
    question: "How did the fox escape?",
    options: [
      "He climbed on the goat’s back and horns.",
      "He flew out.",
      "He dug a tunnel.",
      "He used a rope."
    ],
    correctAnswer: "He climbed on the goat’s back and horns.",
    explanation: "He used the goat to climb out."
  },
  {
    id: "grade-3-english-comprehension-fox-and-the-goat-exam-017-q10",
    title: "The Fox and the Goat: Question 10",
    skill: "sequence",
    question: "What did the goat ask after the fox escaped?",
    options: [
      "What about me?",
      "Where is the honey?",
      "Can I sleep?",
      "Who is James?"
    ],
    correctAnswer: "What about me?",
    explanation: "The goat asked, 'What about me?'"
  },
  {
    id: "grade-3-english-comprehension-fox-and-the-goat-exam-017-q11",
    title: "The Fox and the Goat: Question 11",
    skill: "vocabulary in context",
    question: "What does “cunning” mean?",
    options: [
      "Clever in a tricky way",
      "Very sleepy",
      "Kind and gentle",
      "Full of fear"
    ],
    correctAnswer: "Clever in a tricky way",
    explanation: "The fox tricked the goat."
  },
  {
    id: "grade-3-english-comprehension-fox-and-the-goat-exam-017-q12",
    title: "The Fox and the Goat: Question 12",
    skill: "vocabulary in context",
    question: "What does “scrambled out” mean?",
    options: [
      "Climbed out quickly and awkwardly",
      "Walked slowly down",
      "Slept inside",
      "Swam deeper"
    ],
    correctAnswer: "Climbed out quickly and awkwardly",
    explanation: "Scrambled means climbed quickly with effort."
  },
  {
    id: "grade-3-english-comprehension-fox-and-the-goat-exam-017-q13",
    title: "The Fox and the Goat: Question 13",
    skill: "spelling recognition",
    question: "Which word is spelled correctly?",
    options: [
      "thirsty",
      "thursty",
      "thirstey",
      "thirsy"
    ],
    correctAnswer: "thirsty",
    explanation: "Thirsty is correct."
  },
  {
    id: "grade-3-english-comprehension-fox-and-the-goat-exam-017-q14",
    title: "The Fox and the Goat: Question 14",
    skill: "detail recall",
    question: "What advice did the fox give?",
    options: [
      "Look before you leap.",
      "Always jump first.",
      "Never drink water.",
      "Trust every stranger."
    ],
    correctAnswer: "Look before you leap.",
    explanation: "The fox told the goat to look before leaping."
  },
  {
    id: "grade-3-english-comprehension-fox-and-the-goat-exam-017-q15",
    title: "The Fox and the Goat: Question 15",
    skill: "vocabulary in context",
    question: "What does “look before you leap” mean?",
    options: [
      "Think before you act.",
      "Jump as high as possible.",
      "Look at your feet only.",
      "Close your eyes."
    ],
    correctAnswer: "Think before you act.",
    explanation: "It means think carefully before acting."
  },
  {
    id: "grade-3-english-comprehension-fox-and-the-goat-exam-017-q16",
    title: "The Fox and the Goat: Question 16",
    skill: "inference",
    question: "How did the goat probably feel at the end?",
    options: [
      "Sad and foolish",
      "Proud and happy",
      "Sleepy and calm",
      "Angry at the water only"
    ],
    correctAnswer: "Sad and foolish",
    explanation: "He was left trapped."
  },
  {
    id: "grade-3-english-comprehension-fox-and-the-goat-exam-017-q17",
    title: "The Fox and the Goat: Question 17",
    skill: "life skill",
    question: "What lesson does the story teach?",
    options: [
      "Think carefully before making a choice.",
      "Wells are always empty.",
      "Foxes love goats.",
      "Goats can fly."
    ],
    correctAnswer: "Think carefully before making a choice.",
    explanation: "The goat learned to think before acting."
  },
  {
    id: "grade-3-english-comprehension-fox-and-the-goat-exam-017-q18",
    title: "The Fox and the Goat: Question 18",
    skill: "detail recall",
    question: "Which animal was tricked?",
    options: [
      "The goat",
      "The fox",
      "A mouse",
      "A horse"
    ],
    correctAnswer: "The goat",
    explanation: "The goat was tricked by the fox."
  },
  {
    id: "grade-3-english-comprehension-fox-and-the-goat-exam-017-q19",
    title: "The Fox and the Goat: Question 19",
    skill: "sequence",
    question: "Which animal was trapped first?",
    options: [
      "The fox",
      "The goat",
      "Both together",
      "Neither"
    ],
    correctAnswer: "The fox",
    explanation: "The fox fell in first."
  },
  {
    id: "grade-3-english-comprehension-fox-and-the-goat-exam-017-q20",
    title: "The Fox and the Goat: Question 20",
    skill: "sequence",
    question: "What could the goat have done before jumping?",
    options: [
      "Asked more questions or looked for a way out",
      "Closed his eyes",
      "Jumped faster",
      "Called the water sweet"
    ],
    correctAnswer: "Asked more questions or looked for a way out",
    explanation: "He should have thought carefully."
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
    sequence: 1700 + index
  }
}));

export default examQuestions;
