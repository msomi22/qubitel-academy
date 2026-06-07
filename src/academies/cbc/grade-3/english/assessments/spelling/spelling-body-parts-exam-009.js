import { defineMcqProblem } from "../../../../../../problems/problemAuthoring.js";

const examId = "grade-3-spelling-body-parts-exam-009";
const examTitle = "Spelling Exam 9: Body Parts";
const learningAreaId = "spelling";
const questionTimeSeconds = 30;
const sequenceBase = 190;
const examNumber = 9;

const questions = [
  {
    question: "Which word means the body part near the neck and arm?",
    options: ["sholder", "shoulder", "shulder", "shouldar"],
    correctAnswer: "shoulder"
  },
  {
    question: "Which word means the joint in the middle of the arm?",
    options: ["elbow", "elbo", "ellbow", "elbowe"],
    correctAnswer: "elbow"
  },
  {
    question: "Which word means the part between the hand and arm?",
    options: ["wrist", "rist", "wirst", "wriste"],
    correctAnswer: "wrist"
  },
  {
    question: "Complete: I pointed with my ____.",
    options: ["finger", "fingar", "fingger", "finga"],
    correctAnswer: "finger"
  },
  {
    question: "Which word means the short thick finger?",
    options: ["thumb", "thum", "thamb", "thomb"],
    correctAnswer: "thumb"
  },
  {
    question: "Which word means the joint in the middle of the leg?",
    options: ["knee", "nee", "kne", "kneee"],
    correctAnswer: "knee"
  },
  {
    question: "Which word means the joint near the foot?",
    options: ["ankel", "ankle", "ancle", "anklee"],
    correctAnswer: "ankle"
  },
  {
    question: "Complete: My ____ hurt after eating too much.",
    options: ["stomach", "stomack", "stomac", "stomech"],
    correctAnswer: "stomach"
  },
  {
    question: "Which word means the part in the mouth used for tasting?",
    options: ["tongue", "tounge", "tung", "tong"],
    correctAnswer: "tongue"
  },
  {
    question: "Which word means the front part of the head above the eyes?",
    options: ["forehead", "forhead", "fourhead", "forehed"],
    correctAnswer: "forehead"
  },
  {
    question: "Which word means the part used for seeing?",
    options: ["eye", "iye", "eya", "eie"],
    correctAnswer: "eye"
  },
  {
    question: "Which word means the part used for hearing?",
    options: ["ear", "eer", "ere", "eare"],
    correctAnswer: "ear"
  },
  {
    question: "Complete: I smell with my ____.",
    options: ["nose", "noze", "noz", "nouse"],
    correctAnswer: "nose"
  },
  {
    question: "Which word means the part used for chewing food?",
    options: ["teeth", "teath", "teethh", "teech"],
    correctAnswer: "teeth"
  },
  {
    question: "Which word means one hard white part in the mouth?",
    options: ["tooth", "touth", "toothe", "tuthe"],
    correctAnswer: "tooth"
  },
  {
    question: "Complete: I clapped my ____.",
    options: ["hands", "handes", "hans", "handz"],
    correctAnswer: "hands"
  },
  {
    question: "Which word means the part at the end of the leg?",
    options: ["foot", "fut", "foote", "fout"],
    correctAnswer: "foot"
  },
  {
    question: "Which word means more than one foot?",
    options: ["feet", "feat", "feete", "fiet"],
    correctAnswer: "feet"
  },
  {
    question: "Which word means the part between the head and shoulders?",
    options: ["neck", "nek", "neack", "necke"],
    correctAnswer: "neck"
  },
  {
    question: "Complete: I carry my schoolbag on my ____.",
    options: ["back", "bak", "bac", "backe"],
    correctAnswer: "back"
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
  tags: ["cbc", "grade-3", "english", learningAreaId, "exam", "body-parts"],
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
