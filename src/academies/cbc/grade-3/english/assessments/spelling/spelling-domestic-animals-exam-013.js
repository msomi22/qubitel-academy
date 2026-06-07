import { defineMcqProblem } from "../../../../../../problems/problemAuthoring.js";

const examId = "grade-3-spelling-domestic-animals-exam-013";
const examTitle = "Spelling Exam 13: Domestic Animals";
const learningAreaId = "spelling";
const questionTimeSeconds = 30;
const sequenceBase = 270;
const examNumber = 13;

const questions = [
  {
    question: "Which word means a farm animal that gives milk?",
    options: ["cow", "caw", "cowe", "kow"],
    correctAnswer: "cow"
  },
  {
    question: "Complete: The ____ gives us wool.",
    options: ["sheep", "sheap", "sheepe", "ship"],
    correctAnswer: "sheep"
  },
  {
    question: "Which word means a young dog?",
    options: ["puppy", "pupy", "puppie", "puppey"],
    correctAnswer: "puppy"
  },
  {
    question: "Complete: The ____ laid eggs in the nest.",
    options: ["chicken", "chiken", "chickin", "chickenn"],
    correctAnswer: "chicken"
  },
  {
    question: "Which word means an animal that carries heavy loads and looks like a horse?",
    options: ["donkey", "donky", "donkie", "donkkey"],
    correctAnswer: "donkey"
  },
  {
    question: "Which word means a small animal kept to catch mice?",
    options: ["cat", "kat", "catt", "cate"],
    correctAnswer: "cat"
  },
  {
    question: "Complete: The ____ guards the home at night.",
    options: ["dog", "dag", "dogg", "doog"],
    correctAnswer: "dog"
  },
  {
    question: "Which word means a farm animal that gives meat and milk?",
    options: ["goat", "gote", "goate", "gout"],
    correctAnswer: "goat"
  },
  {
    question: "Complete: The ____ pulled the cart.",
    options: ["ox", "ocks", "oxs", "oxe"],
    correctAnswer: "ox"
  },
  {
    question: "Which word means a male chicken?",
    options: ["cock", "cok", "cokk", "coock"],
    correctAnswer: "cock"
  },
  {
    question: "Which word means a female chicken?",
    options: ["hen", "henn", "han", "hene"],
    correctAnswer: "hen"
  },
  {
    question: "Complete: The ____ ran around the compound.",
    options: ["rabbit", "rabit", "rabbitt", "rabbet"],
    correctAnswer: "rabbit"
  },
  {
    question: "Which word means a large animal used for riding?",
    options: ["horse", "hourse", "hors", "horce"],
    correctAnswer: "horse"
  },
  {
    question: "Complete: The ____ rolled in the mud.",
    options: ["pig", "peg", "pigg", "pigue"],
    correctAnswer: "pig"
  },
  {
    question: "Which word means a young cow?",
    options: ["calf", "caf", "calve", "calff"],
    correctAnswer: "calf"
  },
  {
    question: "Complete: The ____ followed its mother sheep.",
    options: ["lamb", "lam", "lumb", "lambb"],
    correctAnswer: "lamb"
  },
  {
    question: "Which word means a young goat?",
    options: ["kid", "kidd", "ked", "kide"],
    correctAnswer: "kid"
  },
  {
    question: "Complete: The ____ made a loud quack.",
    options: ["duck", "duk", "duckk", "ducke"],
    correctAnswer: "duck"
  },
  {
    question: "Which word means a bird kept at home for eggs or meat?",
    options: ["poultry", "poulty", "poltry", "poultery"],
    correctAnswer: "poultry"
  },
  {
    question: "Complete: The ____ walked slowly near the house.",
    options: ["turkey", "turky", "terkye", "turkie"],
    correctAnswer: "turkey"
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
  tags: ["cbc", "grade-3", "english", learningAreaId, "exam", "domestic-animals"],
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
