import { defineMcqProblem } from "../../../../../../problems/problemAuthoring.js";

const examId = "grade-3-spelling-classroom-items-exam-007";
const examTitle = "Spelling Exam 7: Classroom Items";
const learningAreaId = "spelling";
const questionTimeSeconds = 30;
const sequenceBase = 150;
const examNumber = 7;

const questions = [
  {
    question: "Which word means something used for writing?",
    options: ["pencil", "pensil", "pencel", "pencial"],
    correctAnswer: "pencil"
  },
  {
    question: "Which word means something used to draw straight lines?",
    options: ["ruller", "ruler", "rewler", "rulor"],
    correctAnswer: "ruler"
  },
  {
    question: "Complete: I rubbed out the mistake with an ____.",
    options: ["eraser", "erasor", "erazer", "erraser"],
    correctAnswer: "eraser"
  },
  {
    question: "Which word means something used to make a pencil sharp?",
    options: ["sharpner", "shapener", "sharpener", "sharpenner"],
    correctAnswer: "sharpener"
  },
  {
    question: "Which word means a book used for writing notes?",
    options: ["notebook", "notbook", "note book", "notebock"],
    correctAnswer: "notebook"
  },
  {
    question: "Which word means a school book used for learning a subject?",
    options: ["textbok", "texbook", "textbook", "text book"],
    correctAnswer: "textbook"
  },
  {
    question: "Complete: The teacher wrote on the ____.",
    options: ["blackboard", "blackbord", "blackboad", "blackbroad"],
    correctAnswer: "blackboard"
  },
  {
    question: "Which word means a place where books or items can be kept in class?",
    options: ["cupboard", "cuboard", "cupbord", "cubbord"],
    correctAnswer: "cupboard"
  },
  {
    question: "Which word shows lessons and times in school?",
    options: ["timtable", "timetable", "timeteble", "timetabel"],
    correctAnswer: "timetable"
  },
  {
    question: "Which word means a book used to find word meanings?",
    options: ["dictonary", "dictionary", "dictionery", "dicshonary"],
    correctAnswer: "dictionary"
  },
  {
    question: "Complete: I carried my books in my ____.",
    options: ["schoolbag", "school beg", "schoolbug", "school bage"],
    correctAnswer: "schoolbag"
  },
  {
    question: "Which word means a small piece of white writing material used on a board?",
    options: ["chock", "chalk", "chalck", "chaulk"],
    correctAnswer: "chalk"
  },
  {
    question: "Which word means a flat piece of paper used for writing or drawing?",
    options: ["paper", "peper", "papper", "paiper"],
    correctAnswer: "paper"
  },
  {
    question: "Complete: The teacher pinned the chart on the ____.",
    options: ["wall", "woll", "walle", "waul"],
    correctAnswer: "wall"
  },
  {
    question: "Which word means a container used to throw waste paper?",
    options: ["dustbin", "dustbeen", "dust bine", "dastbin"],
    correctAnswer: "dustbin"
  },
  {
    question: "Which word means a small table where a learner writes?",
    options: ["desk", "desck", "dask", "deske"],
    correctAnswer: "desk"
  },
  {
    question: "Complete: The teacher sat on a ____.",
    options: ["chair", "cheir", "chare", "chaire"],
    correctAnswer: "chair"
  },
  {
    question: "Which word means a printed picture or notice put on a wall?",
    options: ["poster", "postor", "posta", "poaster"],
    correctAnswer: "poster"
  },
  {
    question: "Which word means a small tool used to cut paper?",
    options: ["scissors", "scisors", "sissors", "sizors"],
    correctAnswer: "scissors"
  },
  {
    question: "Complete: I used a ____ to stick paper in my book.",
    options: ["glue", "gloo", "glu", "glew"],
    correctAnswer: "glue"
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
  tags: ["cbc", "grade-3", "english", learningAreaId, "exam", "classroom-items"],
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
