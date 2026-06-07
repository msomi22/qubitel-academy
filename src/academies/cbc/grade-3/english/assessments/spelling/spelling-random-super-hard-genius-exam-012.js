import { defineMcqProblem } from "../../../../../../problems/problemAuthoring.js";

const examId = "grade-3-spelling-random-super-hard-genius-exam-012";
const examTitle = "Spelling Exam 12: Random Super Hard Genius";
const learningAreaId = "spelling";
const questionTimeSeconds = 30;
const sequenceBase = 250;
const examNumber = 12;

const questions = [
  {
    question: "Complete: I will ____ my handwriting every day.",
    options: ["practise", "practice", "praktise", "practize"],
    correctAnswer: "practise"
  },
  {
    question: "Complete: The spelling ____ was difficult.",
    options: ["practise", "practis", "practice", "praktice"],
    correctAnswer: "practice"
  },
  {
    question: "Complete: The doctor gave useful ____.",
    options: ["advise", "advize", "advice", "advese"],
    correctAnswer: "advice"
  },
  {
    question: "Complete: Parents ____ children to be careful.",
    options: ["advice", "advise", "advize", "advese"],
    correctAnswer: "advise"
  },
  {
    question: "Complete: The loud noise had a bad ____ on the baby.",
    options: ["affect", "effect", "efect", "affact"],
    correctAnswer: "effect"
  },
  {
    question: "Complete: Lack of sleep can ____ your learning.",
    options: ["effect", "affect", "efect", "affact"],
    correctAnswer: "affect"
  },
  {
    question: "Complete: The book is over ____.",
    options: ["their", "they’re", "there", "thier"],
    correctAnswer: "there"
  },
  {
    question: "Complete: The pupils said ____ ready.",
    options: ["their", "there", "they’re", "thier"],
    correctAnswer: "they’re"
  },
  {
    question: "Complete: The girls packed ____ lunch boxes.",
    options: ["they’re", "there", "thier", "their"],
    correctAnswer: "their"
  },
  {
    question: "Complete: I asked ____ I could join the game.",
    options: ["weather", "whether", "wether", "weathar"],
    correctAnswer: "whether"
  },
  {
    question: "Complete: The ____ changed in the afternoon.",
    options: ["whether", "wether", "weather", "weathar"],
    correctAnswer: "weather"
  },
  {
    question: "Complete: The ____ rule is to be kind.",
    options: ["principal", "principle", "principel", "prinsiple"],
    correctAnswer: "principle"
  },
  {
    question: "Complete: Our school ____ welcomed the visitors.",
    options: ["principle", "principel", "principal", "prinsiple"],
    correctAnswer: "principal"
  },
  {
    question: "Complete: I used blue ____ to write the letter.",
    options: ["stationary", "stationery", "stationerry", "stashionery"],
    correctAnswer: "stationery"
  },
  {
    question: "Complete: The bus remained ____ for ten minutes.",
    options: ["stationery", "stationary", "stationerry", "stashionary"],
    correctAnswer: "stationary"
  },
  {
    question: "Complete: The hot ____ had very little water.",
    options: ["dessert", "desert", "desart", "dezert"],
    correctAnswer: "desert"
  },
  {
    question: "Complete: Mango pudding is my favourite ____.",
    options: ["desert", "desart", "dessert", "dezert"],
    correctAnswer: "dessert"
  },
  {
    question: "Complete: Be careful not to ____ your homework.",
    options: ["loose", "lose", "luse", "loze"],
    correctAnswer: "lose"
  },
  {
    question: "Complete: The door handle is ____.",
    options: ["lose", "loze", "loose", "luse"],
    correctAnswer: "loose"
  },
  {
    question: "Complete: The library is ____ than the playground.",
    options: ["quite", "quiet", "quit", "quait"],
    correctAnswer: "quiet"
  }
];

const examQuestions = questions.map((item, index) => defineMcqProblem({
  id: examId + "-q" + String(index + 1).padStart(3, "0"),
  category: "grade-3",
  topicId: "english",
  title: "Spelling Exam " + examNumber + " Question " + (index + 1),
  difficulty: "Easy",
  estimatedTimeSeconds: questionTimeSeconds,
  question: item.question,
  body: [
    {
      type: "section",
      title: "Objective",
      content: "I can finish a short spelling exam and see my score."
    },
    {
      type: "section",
      title: "Question",
      content: item.question
    }
  ],
  options: item.options,
  correctAnswer: item.correctAnswer,
  explanation: item.correctAnswer + " is the correct spelling.",
  finalTakeaway: "Check every letter carefully.",
  tags: ["cbc", "grade-3", "english", learningAreaId, "exam", "very-confusing-spelling-meaning-and-usage"],
  metadata: {
    reviewStatus: "approved",
    visibility: ["dev", "prod"],
    source: "original",
    audience: "grade-3",
    gradeId: "grade-3",
    subjectId: "english",
    learningAreaId,
    examId,
    examTitle,
    assessmentType: "exam",
    questionTimeSeconds,
    points: 1,
    sequence: sequenceBase + index
  }
}));

export default examQuestions;
