import { defineMcqProblem } from '../../../../../../problems/problemAuthoring.js';

export const ramanMeetsTheRockingHorsePassage = {
  title: "Raman Meets the Rocking-Horse",
  paragraphs: [
    {
      id: "ramanmeetstherockinghorse-p1",
      sentenceIds: [
        "ramanmeetstherockinghorse-s1",
        "ramanmeetstherockinghorse-s2",
        "ramanmeetstherockinghorse-s3"
      ]
    },
    {
      id: "ramanmeetstherockinghorse-p2",
      sentenceIds: [
        "ramanmeetstherockinghorse-s4",
        "ramanmeetstherockinghorse-s5"
      ]
    },
    {
      id: "ramanmeetstherockinghorse-p3",
      sentenceIds: [
        "ramanmeetstherockinghorse-s6",
        "ramanmeetstherockinghorse-s7"
      ]
    },
    {
      id: "ramanmeetstherockinghorse-p4",
      sentenceIds: [
        "ramanmeetstherockinghorse-s8",
        "ramanmeetstherockinghorse-s9",
        "ramanmeetstherockinghorse-s10"
      ]
    },
    {
      id: "ramanmeetstherockinghorse-p5",
      sentenceIds: [
        "ramanmeetstherockinghorse-s11",
        "ramanmeetstherockinghorse-s12"
      ]
    },
    {
      id: "ramanmeetstherockinghorse-p6",
      sentenceIds: [
        "ramanmeetstherockinghorse-s13",
        "ramanmeetstherockinghorse-s14",
        "ramanmeetstherockinghorse-s15"
      ]
    },
    {
      id: "ramanmeetstherockinghorse-p7",
      sentenceIds: [
        "ramanmeetstherockinghorse-s16"
      ]
    },
    {
      id: "ramanmeetstherockinghorse-p8",
      sentenceIds: [
        "ramanmeetstherockinghorse-s17",
        "ramanmeetstherockinghorse-s18",
        "ramanmeetstherockinghorse-s19"
      ]
    },
    {
      id: "ramanmeetstherockinghorse-p9",
      sentenceIds: [
        "ramanmeetstherockinghorse-s20"
      ]
    },
    {
      id: "ramanmeetstherockinghorse-p10",
      sentenceIds: [
        "ramanmeetstherockinghorse-s21",
        "ramanmeetstherockinghorse-s22",
        "ramanmeetstherockinghorse-s23"
      ]
    }
  ],
  sentences: [
    {
      id: "ramanmeetstherockinghorse-s1",
      text: "After school, Raman asked his mother if he could go to Jock’s house to play."
    },
    {
      id: "ramanmeetstherockinghorse-s2",
      text: "His mother smiled and said yes."
    },
    {
      id: "ramanmeetstherockinghorse-s3",
      text: "She told him she would come and fetch him at half past five."
    },
    {
      id: "ramanmeetstherockinghorse-s4",
      text: "Raman’s mother wore a long, flowing sari with bright colours."
    },
    {
      id: "ramanmeetstherockinghorse-s5",
      text: "When Jock saw her, he thought she looked beautiful and royal."
    },
    {
      id: "ramanmeetstherockinghorse-s6",
      text: "“She is like an Indian princess,” Jock thought."
    },
    {
      id: "ramanmeetstherockinghorse-s7",
      text: "“If she is ever in danger, I will ride to her rescue.”"
    },
    {
      id: "ramanmeetstherockinghorse-s8",
      text: "When the boys reached Jock’s house, Jock led Raman down to the basement room."
    },
    {
      id: "ramanmeetstherockinghorse-s9",
      text: "In the corner stood a large wooden rocking-horse."
    },
    {
      id: "ramanmeetstherockinghorse-s10",
      text: "Jock walked over to it and patted its neck proudly."
    },
    {
      id: "ramanmeetstherockinghorse-s11",
      text: "“What is he called?”"
    },
    {
      id: "ramanmeetstherockinghorse-s12",
      text: "Raman asked, gazing at the rocking-horse with admiration."
    },
    {
      id: "ramanmeetstherockinghorse-s13",
      text: "Jock paused."
    },
    {
      id: "ramanmeetstherockinghorse-s14",
      text: "He had not yet chosen a name for the horse."
    },
    {
      id: "ramanmeetstherockinghorse-s15",
      text: "But he did not want Raman to know that."
    },
    {
      id: "ramanmeetstherockinghorse-s16",
      text: "“I know his name,” Jock said quickly, “but it is a secret. He only allows me to call him by it.”"
    },
    {
      id: "ramanmeetstherockinghorse-s17",
      text: "Raman believed him."
    },
    {
      id: "ramanmeetstherockinghorse-s18",
      text: "“He is wonderful,” he whispered."
    },
    {
      id: "ramanmeetstherockinghorse-s19",
      text: "“May I have a ride?”"
    },
    {
      id: "ramanmeetstherockinghorse-s20",
      text: "Jock wanted the first ride himself, so he answered, “Well, he does not like strangers much. I will ride him first so he can look at you and get used to you.”"
    },
    {
      id: "ramanmeetstherockinghorse-s21",
      text: "Raman waited politely."
    },
    {
      id: "ramanmeetstherockinghorse-s22",
      text: "He admired the horse even more."
    },
    {
      id: "ramanmeetstherockinghorse-s23",
      text: "Jock climbed on, rocking gently, and imagined he was riding through a faraway kingdom on a brave secret horse."
    }
  ]
};

const examId = 'grade-3-english-comprehension-raman-meets-the-rocking-horse-exam-020';
const examTitle = 'Grade 3 English Comprehension Exam 020: Raman Meets the Rocking-Horse';
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
  passageTitle: ramanMeetsTheRockingHorsePassage.title,
  readingGuideSeconds: 600,
  questionTimeSeconds,
  autoAdvanceAfterReading: false,
  allowStartQuestionsAnytime: true,
  allowPassageDuringQuestions: true,
  readAloud: {
    enabled: true,
    highlightCurrentSentence: true
  },
  passage: ramanMeetsTheRockingHorsePassage
};

const questions = [
  {
    id: "grade-3-english-comprehension-raman-meets-the-rocking-horse-exam-020-q01",
    title: "Raman Meets the Rocking-Horse: Question 1",
    skill: "detail recall",
    question: "When did Raman ask to visit Jock?",
    options: [
      "After school",
      "Before breakfast",
      "At midnight",
      "During supper"
    ],
    correctAnswer: "After school",
    explanation: "The passage begins after school."
  },
  {
    id: "grade-3-english-comprehension-raman-meets-the-rocking-horse-exam-020-q02",
    title: "Raman Meets the Rocking-Horse: Question 2",
    skill: "detail recall",
    question: "What time would Raman’s mother fetch him?",
    options: [
      "Half past five",
      "Half past six",
      "Five o’clock",
      "Seven o’clock"
    ],
    correctAnswer: "Half past five",
    explanation: "She said half past five."
  },
  {
    id: "grade-3-english-comprehension-raman-meets-the-rocking-horse-exam-020-q03",
    title: "Raman Meets the Rocking-Horse: Question 3",
    skill: "detail recall",
    question: "What was Raman’s mother wearing?",
    options: [
      "A long, flowing sari",
      "A blue tent",
      "A riding coat",
      "A school uniform only"
    ],
    correctAnswer: "A long, flowing sari",
    explanation: "She wore a long, flowing sari."
  },
  {
    id: "grade-3-english-comprehension-raman-meets-the-rocking-horse-exam-020-q04",
    title: "Raman Meets the Rocking-Horse: Question 4",
    skill: "detail recall",
    question: "What is a sari?",
    options: [
      "A long piece of clothing often worn by women in India",
      "A kind of horse",
      "A small box",
      "A cooking pot"
    ],
    correctAnswer: "A long piece of clothing often worn by women in India",
    explanation: "The passage describes it as clothing."
  },
  {
    id: "grade-3-english-comprehension-raman-meets-the-rocking-horse-exam-020-q05",
    title: "Raman Meets the Rocking-Horse: Question 5",
    skill: "inference",
    question: "Why did Jock think Raman’s mother looked like a princess?",
    options: [
      "She looked beautiful and royal in her sari.",
      "She wore a crown.",
      "She rode a horse.",
      "She lived in a palace."
    ],
    correctAnswer: "She looked beautiful and royal in her sari.",
    explanation: "Her sari made her look beautiful and royal to him."
  },
  {
    id: "grade-3-english-comprehension-raman-meets-the-rocking-horse-exam-020-q06",
    title: "Raman Meets the Rocking-Horse: Question 6",
    skill: "detail recall",
    question: "Where was the rocking-horse kept?",
    options: [
      "In the basement room",
      "In the kitchen",
      "In the garden",
      "At school"
    ],
    correctAnswer: "In the basement room",
    explanation: "Jock led Raman to the basement room."
  },
  {
    id: "grade-3-english-comprehension-raman-meets-the-rocking-horse-exam-020-q07",
    title: "Raman Meets the Rocking-Horse: Question 7",
    skill: "detail recall",
    question: "What was the rocking-horse made of?",
    options: [
      "Wood",
      "Glass",
      "Paper",
      "Water"
    ],
    correctAnswer: "Wood",
    explanation: "It was a large wooden rocking-horse."
  },
  {
    id: "grade-3-english-comprehension-raman-meets-the-rocking-horse-exam-020-q08",
    title: "Raman Meets the Rocking-Horse: Question 8",
    skill: "detail recall",
    question: "What did Jock do to the horse’s neck?",
    options: [
      "Patted it",
      "Washed it",
      "Painted it",
      "Tied it"
    ],
    correctAnswer: "Patted it",
    explanation: "He patted its neck proudly."
  },
  {
    id: "grade-3-english-comprehension-raman-meets-the-rocking-horse-exam-020-q09",
    title: "Raman Meets the Rocking-Horse: Question 9",
    skill: "detail recall",
    question: "How did Raman look at the horse?",
    options: [
      "With admiration",
      "With anger",
      "Without interest",
      "With fear only"
    ],
    correctAnswer: "With admiration",
    explanation: "He gazed at it with admiration."
  },
  {
    id: "grade-3-english-comprehension-raman-meets-the-rocking-horse-exam-020-q10",
    title: "Raman Meets the Rocking-Horse: Question 10",
    skill: "vocabulary in context",
    question: "What does “gazing” mean?",
    options: [
      "Looking steadily for some time",
      "Closing your eyes",
      "Running away",
      "Looking for one second only"
    ],
    correctAnswer: "Looking steadily for some time",
    explanation: "Gazing means looking steadily."
  },
  {
    id: "grade-3-english-comprehension-raman-meets-the-rocking-horse-exam-020-q11",
    title: "Raman Meets the Rocking-Horse: Question 11",
    skill: "detail recall",
    question: "What did Raman ask Jock?",
    options: [
      "What the horse was called",
      "Where the food was",
      "Why the room was empty",
      "Who owned the sari"
    ],
    correctAnswer: "What the horse was called",
    explanation: "He asked the horse’s name."
  },
  {
    id: "grade-3-english-comprehension-raman-meets-the-rocking-horse-exam-020-q12",
    title: "Raman Meets the Rocking-Horse: Question 12",
    skill: "inference",
    question: "Why did Jock not tell the real name?",
    options: [
      "He had not chosen a name yet.",
      "The horse had no ears.",
      "Raman could not hear.",
      "His mother said no."
    ],
    correctAnswer: "He had not chosen a name yet.",
    explanation: "Jock had not yet chosen a name."
  },
  {
    id: "grade-3-english-comprehension-raman-meets-the-rocking-horse-exam-020-q13",
    title: "Raman Meets the Rocking-Horse: Question 13",
    skill: "detail recall",
    question: "What reason did Jock give instead?",
    options: [
      "The name was secret and only he could use it.",
      "The horse could not speak.",
      "The name was too long to say.",
      "Raman already knew it."
    ],
    correctAnswer: "The name was secret and only he could use it.",
    explanation: "He said it was secret."
  },
  {
    id: "grade-3-english-comprehension-raman-meets-the-rocking-horse-exam-020-q14",
    title: "Raman Meets the Rocking-Horse: Question 14",
    skill: "detail recall",
    question: "What did Raman ask to do?",
    options: [
      "Have a ride",
      "Take the horse home",
      "Paint the basement",
      "Call his mother"
    ],
    correctAnswer: "Have a ride",
    explanation: "Raman asked if he could ride."
  },
  {
    id: "grade-3-english-comprehension-raman-meets-the-rocking-horse-exam-020-q15",
    title: "Raman Meets the Rocking-Horse: Question 15",
    skill: "inference",
    question: "Why did Jock say he should ride first?",
    options: [
      "So the horse could get used to Raman",
      "Because Raman was going home",
      "Because the horse was broken",
      "Because Raman disliked horses"
    ],
    correctAnswer: "So the horse could get used to Raman",
    explanation: "That was Jock’s reason."
  },
  {
    id: "grade-3-english-comprehension-raman-meets-the-rocking-horse-exam-020-q16",
    title: "Raman Meets the Rocking-Horse: Question 16",
    skill: "sequence",
    question: "What was Jock’s real reason for riding first?",
    options: [
      "He wanted the first ride himself.",
      "He wanted to clean the horse.",
      "He was afraid of Raman.",
      "He wanted to leave."
    ],
    correctAnswer: "He wanted the first ride himself.",
    explanation: "The passage says Jock wanted the first ride himself."
  },
  {
    id: "grade-3-english-comprehension-raman-meets-the-rocking-horse-exam-020-q17",
    title: "Raman Meets the Rocking-Horse: Question 17",
    skill: "detail recall",
    question: "How did Raman behave while waiting?",
    options: [
      "Politely",
      "Rudely",
      "Angrily",
      "Loudly"
    ],
    correctAnswer: "Politely",
    explanation: "Raman waited politely."
  },
  {
    id: "grade-3-english-comprehension-raman-meets-the-rocking-horse-exam-020-q18",
    title: "Raman Meets the Rocking-Horse: Question 18",
    skill: "spelling recognition",
    question: "Which word is spelled correctly?",
    options: [
      "rocking-horse",
      "roking-horse",
      "rockin-horse",
      "rocking-hourse"
    ],
    correctAnswer: "rocking-horse",
    explanation: "Rocking-horse is correct."
  },
  {
    id: "grade-3-english-comprehension-raman-meets-the-rocking-horse-exam-020-q19",
    title: "Raman Meets the Rocking-Horse: Question 19",
    skill: "vocabulary in context",
    question: "What does the story show about Jock?",
    options: [
      "He had a big imagination but was not fully honest.",
      "He hated toys.",
      "He never played.",
      "He was a farmer."
    ],
    correctAnswer: "He had a big imagination but was not fully honest.",
    explanation: "Jock invented stories but hid the truth."
  },
  {
    id: "grade-3-english-comprehension-raman-meets-the-rocking-horse-exam-020-q20",
    title: "Raman Meets the Rocking-Horse: Question 20",
    skill: "detail recall",
    question: "Suggest a good name for the rocking-horse.",
    options: [
      "Brave Thunder",
      "Tiny Spoon",
      "Old Cinder",
      "Silent Paper"
    ],
    correctAnswer: "Brave Thunder",
    explanation: "Brave Thunder fits the imagined adventure horse."
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
    sequence: 2000 + index
  }
}));

export default examQuestions;
