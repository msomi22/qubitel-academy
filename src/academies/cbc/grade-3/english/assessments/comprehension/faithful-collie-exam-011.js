import { defineMcqProblem } from '../../../../../../problems/problemAuthoring.js';
import { placeCorrectAnswerAt, targetAnswerSlotForQuestion } from '../../../../../../utils/cbcAnswerDistribution.js';

export const faithfulColliePassage = {
  title: "The Faithful Collie",
  paragraphs: [
    {
      id: "faithfulcollie-p1",
      sentenceIds: [
        "faithfulcollie-s1",
        "faithfulcollie-s2",
        "faithfulcollie-s3"
      ]
    },
    {
      id: "faithfulcollie-p2",
      sentenceIds: [
        "faithfulcollie-s4",
        "faithfulcollie-s5",
        "faithfulcollie-s6"
      ]
    },
    {
      id: "faithfulcollie-p3",
      sentenceIds: [
        "faithfulcollie-s7",
        "faithfulcollie-s8",
        "faithfulcollie-s9",
        "faithfulcollie-s10"
      ]
    },
    {
      id: "faithfulcollie-p4",
      sentenceIds: [
        "faithfulcollie-s11",
        "faithfulcollie-s12",
        "faithfulcollie-s13",
        "faithfulcollie-s14"
      ]
    },
    {
      id: "faithfulcollie-p5",
      sentenceIds: [
        "faithfulcollie-s15",
        "faithfulcollie-s16",
        "faithfulcollie-s17",
        "faithfulcollie-s18",
        "faithfulcollie-s19"
      ]
    },
    {
      id: "faithfulcollie-p6",
      sentenceIds: [
        "faithfulcollie-s20",
        "faithfulcollie-s21",
        "faithfulcollie-s22",
        "faithfulcollie-s23"
      ]
    }
  ],
  sentences: [
    {
      id: "faithfulcollie-s1",
      text: "James Hogg was a poet, but he was also a shepherd."
    },
    {
      id: "faithfulcollie-s2",
      text: "One winter evening, he was looking after his sheep on a wide, lonely moor."
    },
    {
      id: "faithfulcollie-s3",
      text: "Suddenly, dark clouds covered the sky and heavy snow began to fall."
    },
    {
      id: "faithfulcollie-s4",
      text: "James knew he had to bring the sheep home before the storm became worse."
    },
    {
      id: "faithfulcollie-s5",
      text: "He whistled for his faithful collie, Belle."
    },
    {
      id: "faithfulcollie-s6",
      text: "When Belle ran to him, James pointed to one side of the moor and said, “Bring in the sheep from that side. I will gather the sheep from this side.”"
    },
    {
      id: "faithfulcollie-s7",
      text: "James worked for a long time in the freezing snow."
    },
    {
      id: "faithfulcollie-s8",
      text: "At last, he reached his cabin with the sheep he had found."
    },
    {
      id: "faithfulcollie-s9",
      text: "Belle was not there."
    },
    {
      id: "faithfulcollie-s10",
      text: "James felt worried, but he hoped she was still working."
    },
    {
      id: "faithfulcollie-s11",
      text: "Several hours later, he heard a weak whine and a soft scratching at the door."
    },
    {
      id: "faithfulcollie-s12",
      text: "He rushed outside and saw Belle standing in the snow."
    },
    {
      id: "faithfulcollie-s13",
      text: "She had brought all her sheep home."
    },
    {
      id: "faithfulcollie-s14",
      text: "Not one was missing."
    },
    {
      id: "faithfulcollie-s15",
      text: "Then James noticed something tiny in Belle’s mouth."
    },
    {
      id: "faithfulcollie-s16",
      text: "Belle came forward and gently laid a newborn puppy at his feet."
    },
    {
      id: "faithfulcollie-s17",
      text: "Before James could speak, Belle turned and went back into the snow."
    },
    {
      id: "faithfulcollie-s18",
      text: "Soon she returned with another puppy."
    },
    {
      id: "faithfulcollie-s19",
      text: "She placed it beside the first one, then sank to the ground."
    },
    {
      id: "faithfulcollie-s20",
      text: "James knelt beside Belle with tears in his eyes."
    },
    {
      id: "faithfulcollie-s21",
      text: "She had given birth during the storm, yet she had still done her work and saved the sheep."
    },
    {
      id: "faithfulcollie-s22",
      text: "James wrapped the puppies in a warm blanket and carried Belle carefully into the cabin."
    },
    {
      id: "faithfulcollie-s23",
      text: "He never forgot the brave collie who stayed faithful to the end."
    }
  ]
};

const examId = 'grade-3-english-comprehension-faithful-collie-exam-011';
const examTitle = 'Grade 3 English Comprehension Exam 011: The Faithful Collie';
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
  passageTitle: faithfulColliePassage.title,
  readingGuideSeconds: 600,
  questionTimeSeconds,
  autoAdvanceAfterReading: false,
  allowStartQuestionsAnytime: true,
  allowPassageDuringQuestions: true,
  readAloud: {
    enabled: true,
    highlightCurrentSentence: true
  },
  passage: faithfulColliePassage
};

const questions = [
  {
    id: "grade-3-english-comprehension-faithful-collie-exam-011-q01",
    title: "The Faithful Collie: Question 1",
    skill: "detail recall",
    question: "What two jobs did James Hogg do?",
    options: [
      "He was a poet and a shepherd.",
      "He was a farmer and a builder.",
      "He was a teacher and a poet.",
      "He was a hunter and a cook."
    ],
    correctAnswer: "He was a poet and a shepherd.",
    explanation: "The first sentence says James Hogg was a poet and also a shepherd."
  },
  {
    id: "grade-3-english-comprehension-faithful-collie-exam-011-q02",
    title: "The Faithful Collie: Question 2",
    skill: "detail recall",
    question: "Where was James when the snow began to fall?",
    options: [
      "In a market",
      "On a wide, lonely moor",
      "Inside his cabin",
      "At a school"
    ],
    correctAnswer: "On a wide, lonely moor",
    explanation: "The passage says he was looking after sheep on a wide, lonely moor."
  },
  {
    id: "grade-3-english-comprehension-faithful-collie-exam-011-q03",
    title: "The Faithful Collie: Question 3",
    skill: "inference",
    question: "Why did James need to bring the sheep home quickly?",
    options: [
      "The sheep were hungry.",
      "The storm was becoming worse.",
      "Belle wanted to rest.",
      "The cabin was far away."
    ],
    correctAnswer: "The storm was becoming worse.",
    explanation: "Heavy snow had begun to fall, so the sheep needed safety."
  },
  {
    id: "grade-3-english-comprehension-faithful-collie-exam-011-q04",
    title: "The Faithful Collie: Question 4",
    skill: "detail recall",
    question: "How did James call Belle?",
    options: [
      "He rang a bell.",
      "He shouted her name only.",
      "He whistled for her.",
      "He sent another dog."
    ],
    correctAnswer: "He whistled for her.",
    explanation: "The passage says James whistled for his faithful collie."
  },
  {
    id: "grade-3-english-comprehension-faithful-collie-exam-011-q05",
    title: "The Faithful Collie: Question 5",
    skill: "detail recall",
    question: "What job did James give Belle?",
    options: [
      "To guard the cabin",
      "To find the puppies",
      "To bring in sheep from one side of the moor",
      "To cook supper"
    ],
    correctAnswer: "To bring in sheep from one side of the moor",
    explanation: "James told Belle to bring in sheep from one side of the moor."
  },
  {
    id: "grade-3-english-comprehension-faithful-collie-exam-011-q06",
    title: "The Faithful Collie: Question 6",
    skill: "detail recall",
    question: "What did James do on the other side of the moor?",
    options: [
      "He gathered sheep.",
      "He slept.",
      "He searched for firewood.",
      "He followed Belle."
    ],
    correctAnswer: "He gathered sheep.",
    explanation: "James said he would gather the sheep from his side."
  },
  {
    id: "grade-3-english-comprehension-faithful-collie-exam-011-q07",
    title: "The Faithful Collie: Question 7",
    skill: "inference",
    question: "Why did James feel worried when he reached the cabin?",
    options: [
      "The cabin door was broken.",
      "Belle had not returned.",
      "The sheep were missing.",
      "The snow had stopped."
    ],
    correctAnswer: "Belle had not returned.",
    explanation: "Belle was not there when James arrived."
  },
  {
    id: "grade-3-english-comprehension-faithful-collie-exam-011-q08",
    title: "The Faithful Collie: Question 8",
    skill: "sequence",
    question: "What did James hear after several hours?",
    options: [
      "A loud bark",
      "A weak whine and soft scratching",
      "A bell ringing",
      "A sheep jumping"
    ],
    correctAnswer: "A weak whine and soft scratching",
    explanation: "The passage says he heard a weak whine and soft scratching at the door."
  },
  {
    id: "grade-3-english-comprehension-faithful-collie-exam-011-q09",
    title: "The Faithful Collie: Question 9",
    skill: "detail recall",
    question: "What showed that Belle had done her work well?",
    options: [
      "She ate her food quickly.",
      "She brought all her sheep home.",
      "She slept outside.",
      "She barked loudly."
    ],
    correctAnswer: "She brought all her sheep home.",
    explanation: "Not one sheep was missing."
  },
  {
    id: "grade-3-english-comprehension-faithful-collie-exam-011-q10",
    title: "The Faithful Collie: Question 10",
    skill: "detail recall",
    question: "What was Belle carrying in her mouth?",
    options: [
      "A piece of rope",
      "A newborn puppy",
      "A warm blanket",
      "A small sheep"
    ],
    correctAnswer: "A newborn puppy",
    explanation: "Belle gently laid a newborn puppy at James’s feet."
  },
  {
    id: "grade-3-english-comprehension-faithful-collie-exam-011-q11",
    title: "The Faithful Collie: Question 11",
    skill: "vocabulary in context",
    question: "Which word in the passage means loyal and trusted?",
    options: [
      "lonely",
      "faithful",
      "freezing",
      "tiny"
    ],
    correctAnswer: "faithful",
    explanation: "Faithful means loyal and trusted."
  },
  {
    id: "grade-3-english-comprehension-faithful-collie-exam-011-q12",
    title: "The Faithful Collie: Question 12",
    skill: "vocabulary in context",
    question: "What does “newborn” mean in the passage?",
    options: [
      "Very old",
      "Just born",
      "Very noisy",
      "Lost"
    ],
    correctAnswer: "Just born",
    explanation: "The puppy had just been born."
  },
  {
    id: "grade-3-english-comprehension-faithful-collie-exam-011-q13",
    title: "The Faithful Collie: Question 13",
    skill: "inference",
    question: "Why did Belle go back into the snow after bringing the first puppy?",
    options: [
      "To fetch another puppy",
      "To look for James",
      "To chase a sheep",
      "To play"
    ],
    correctAnswer: "To fetch another puppy",
    explanation: "She returned with another puppy."
  },
  {
    id: "grade-3-english-comprehension-faithful-collie-exam-011-q14",
    title: "The Faithful Collie: Question 14",
    skill: "detail recall",
    question: "How did James feel when Belle sank to the ground?",
    options: [
      "Angry",
      "Careless",
      "Sad and thankful",
      "Bored"
    ],
    correctAnswer: "Sad and thankful",
    explanation: "He knelt beside her with tears in his eyes."
  },
  {
    id: "grade-3-english-comprehension-faithful-collie-exam-011-q15",
    title: "The Faithful Collie: Question 15",
    skill: "detail recall",
    question: "What kind of weather is described in the story?",
    options: [
      "Hot and sunny",
      "Windy and dry",
      "Snowy and freezing",
      "Warm and cloudy"
    ],
    correctAnswer: "Snowy and freezing",
    explanation: "The passage describes heavy snow and freezing weather."
  },
  {
    id: "grade-3-english-comprehension-faithful-collie-exam-011-q16",
    title: "The Faithful Collie: Question 16",
    skill: "spelling recognition",
    question: "Which word is spelled correctly?",
    options: [
      "sheperd",
      "shepherd",
      "sheppard",
      "shephard"
    ],
    correctAnswer: "shepherd",
    explanation: "Shepherd is the correct spelling."
  },
  {
    id: "grade-3-english-comprehension-faithful-collie-exam-011-q17",
    title: "The Faithful Collie: Question 17",
    skill: "life skill",
    question: "What lesson can we learn from Belle?",
    options: [
      "Being faithful and responsible is important.",
      "Snow is always dangerous.",
      "Puppies should live outside.",
      "Sheep do not need care."
    ],
    correctAnswer: "Being faithful and responsible is important.",
    explanation: "Belle stayed faithful and responsible even in danger."
  },
  {
    id: "grade-3-english-comprehension-faithful-collie-exam-011-q18",
    title: "The Faithful Collie: Question 18",
    skill: "detail recall",
    question: "Which title could also fit this story?",
    options: [
      "The Lazy Dog",
      "The Brave Collie",
      "The Lost Cabin",
      "The Sunny Moor"
    ],
    correctAnswer: "The Brave Collie",
    explanation: "Belle is brave and faithful."
  },
  {
    id: "grade-3-english-comprehension-faithful-collie-exam-011-q19",
    title: "The Faithful Collie: Question 19",
    skill: "inference",
    question: "Why did James wrap the puppies in a warm blanket?",
    options: [
      "To keep them warm and safe",
      "To hide them",
      "To carry sheep",
      "To clean the floor"
    ],
    correctAnswer: "To keep them warm and safe",
    explanation: "Newborn puppies need warmth, especially after a snowstorm."
  },
  {
    id: "grade-3-english-comprehension-faithful-collie-exam-011-q20",
    title: "The Faithful Collie: Question 20",
    skill: "inference",
    question: "How would you describe Belle best?",
    options: [
      "selfish",
      "brave",
      "forgetful",
      "playful only"
    ],
    correctAnswer: "brave",
    explanation: "Belle worked bravely during the storm and protected the sheep and puppies."
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
    sequence: 1100 + index
  }
}));

export default examQuestions;
