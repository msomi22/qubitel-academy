import { defineMcqProblem } from "../../../../../../problems/problemAuthoring.js";

const examId = "grade-3-spelling-furniture-exam-008";
const examTitle = "Spelling Exam 8: Furniture";
const learningAreaId = "spelling";
const questionTimeSeconds = 30;
const sequenceBase = 170;
const examNumber = 8;

const questions = [
  {
    question: "Which word means furniture used for sitting?",
    options: ["chair", "cheir", "chare", "chaire"],
    correctAnswer: "chair"
  },
  {
    question: "Which word means furniture used for placing things?",
    options: ["tabel", "table", "tabble", "tabil"],
    correctAnswer: "table"
  },
  {
    question: "Which word means a seat with no back?",
    options: ["stool", "stoll", "stul", "stoole"],
    correctAnswer: "stool"
  },
  {
    question: "Which word means a long seat for many people?",
    options: ["bench", "banch", "bensh", "bentch"],
    correctAnswer: "bench"
  },
  {
    question: "Which word means a flat place for keeping books?",
    options: ["shelf", "shelff", "shlef", "shelve"],
    correctAnswer: "shelf"
  },
  {
    question: "Complete: We kept cups in the ____.",
    options: ["cupboard", "cuboard", "cupbord", "cubbord"],
    correctAnswer: "cupboard"
  },
  {
    question: "Which word means furniture used for keeping clothes?",
    options: ["wardrobe", "wardrope", "wadrobe", "wordrobe"],
    correctAnswer: "wardrobe"
  },
  {
    question: "Which word means a soft seat found in a sitting room?",
    options: ["sofa", "sopha", "soffa", "sofah"],
    correctAnswer: "sofa"
  },
  {
    question: "Which word means furniture used for reading or writing?",
    options: ["desk", "desck", "dask", "deske"],
    correctAnswer: "desk"
  },
  {
    question: "Which word means a sliding box in furniture?",
    options: ["drawer", "drawa", "drower", "drawwer"],
    correctAnswer: "drawer"
  },
  {
    question: "Complete: I slept on a ____.",
    options: ["bed", "bead", "bad", "bhed"],
    correctAnswer: "bed"
  },
  {
    question: "Which word means a soft thing placed on a bed for sleeping?",
    options: ["mattress", "matress", "mattres", "mattrass"],
    correctAnswer: "mattress"
  },
  {
    question: "Which word means a soft support for the head while sleeping?",
    options: ["pillow", "pilow", "pillo", "pellow"],
    correctAnswer: "pillow"
  },
  {
    question: "Complete: We ate supper at the dining ____.",
    options: ["table", "tabel", "tabble", "tabil"],
    correctAnswer: "table"
  },
  {
    question: "Which word means a small table near a bed?",
    options: ["bedside", "bed side", "bedsied", "bedsyde"],
    correctAnswer: "bedside"
  },
  {
    question: "Which word means a flat board fixed on a wall for keeping items?",
    options: ["shelf", "shelve", "shalf", "shelff"],
    correctAnswer: "shelf"
  },
  {
    question: "Complete: The clothes were folded in the ____.",
    options: ["cabinet", "cabnet", "cabbinet", "kabinet"],
    correctAnswer: "cabinet"
  },
  {
    question: "Which word means a seat that can rock back and forth?",
    options: ["rocking chair", "roking chair", "rocking cheir", "rockin chair"],
    correctAnswer: "rocking chair"
  },
  {
    question: "Which word means a small low table in a sitting room?",
    options: ["coffee table", "cofee table", "coffe table", "coffey table"],
    correctAnswer: "coffee table"
  },
  {
    question: "Complete: The baby slept in a ____.",
    options: ["cradle", "cradel", "creadle", "craddle"],
    correctAnswer: "cradle"
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
  tags: ["cbc", "grade-3", "english", learningAreaId, "exam", "furniture"],
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
