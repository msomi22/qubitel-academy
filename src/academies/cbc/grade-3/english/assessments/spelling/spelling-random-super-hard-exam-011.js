import { defineMcqProblem } from "../../../../../../problems/problemAuthoring.js";

const examId = "grade-3-spelling-random-super-hard-exam-011";
const examTitle = "Spelling Exam 11: Random Super Hard";
const learningAreaId = "spelling";
const questionTimeSeconds = 30;
const sequenceBase = 230;
const examNumber = 11;

const questions = [
  {
    question: "Complete: I need more ____ before the spelling test.",
    options: ["practise", "practice", "praktice", "practis"],
    correctAnswer: "practice"
  },
  {
    question: "Complete: Please ____ your friend to read slowly.",
    options: ["advice", "advise", "advize", "advese"],
    correctAnswer: "advise"
  },
  {
    question: "Complete: My teacher gave me good ____.",
    options: ["advise", "advize", "advice", "advese"],
    correctAnswer: "advice"
  },
  {
    question: "Complete: The rain will ____ our game.",
    options: ["effect", "afect", "affect", "affact"],
    correctAnswer: "affect"
  },
  {
    question: "Complete: The medicine had a good ____.",
    options: ["affect", "efect", "effect", "effact"],
    correctAnswer: "effect"
  },
  {
    question: "Complete: Put your books over ____.",
    options: ["their", "there", "they’re", "thier"],
    correctAnswer: "there"
  },
  {
    question: "Complete: The learners carried ____ bags.",
    options: ["there", "they’re", "thier", "their"],
    correctAnswer: "their"
  },
  {
    question: "Complete: ____ going to the library now.",
    options: ["Their", "There", "They’re", "Thier"],
    correctAnswer: "They’re"
  },
  {
    question: "Complete: I do not know ____ it will rain today.",
    options: ["weather", "whether", "wether", "weathar"],
    correctAnswer: "whether"
  },
  {
    question: "Complete: The ____ is cold and windy.",
    options: ["whether", "wether", "weather", "weathar"],
    correctAnswer: "weather"
  },
  {
    question: "Complete: The school ____ spoke during assembly.",
    options: ["principle", "principal", "prinsipal", "principel"],
    correctAnswer: "principal"
  },
  {
    question: "Complete: Honesty is an important ____.",
    options: ["principal", "prinsiple", "principle", "principel"],
    correctAnswer: "principle"
  },
  {
    question: "Complete: I bought ____ for writing letters.",
    options: ["stationary", "stationery", "stationerry", "stashionery"],
    correctAnswer: "stationery"
  },
  {
    question: "Complete: The parked car was ____.",
    options: ["stationery", "stationerry", "stationary", "stashionary"],
    correctAnswer: "stationary"
  },
  {
    question: "Complete: The camel walked across the ____.",
    options: ["dessert", "desert", "desart", "dezert"],
    correctAnswer: "desert"
  },
  {
    question: "Complete: We ate cake for ____.",
    options: ["desert", "desart", "dessert", "dezert"],
    correctAnswer: "dessert"
  },
  {
    question: "Complete: Do not ____ your pencil.",
    options: ["loose", "lose", "luse", "loze"],
    correctAnswer: "lose"
  },
  {
    question: "Complete: My shoe lace is ____.",
    options: ["lose", "loze", "loose", "luse"],
    correctAnswer: "loose"
  },
  {
    question: "Complete: The class was very ____ during the test.",
    options: ["quite", "quiet", "quit", "quait"],
    correctAnswer: "quiet"
  },
  {
    question: "Complete: This question is ____ hard.",
    options: ["quiet", "quit", "quite", "quait"],
    correctAnswer: "quite"
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
  tags: ["cbc", "grade-3", "english", learningAreaId, "exam", "confusing-word-pairs-and-tricky-spelling"],
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
