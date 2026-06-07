import { defineMcqProblem } from "../../../../../../problems/problemAuthoring.js";

const examId = "grade-3-spelling-wild-animals-exam-014";
const examTitle = "Spelling Exam 14: Wild Animals";
const learningAreaId = "spelling";
const questionTimeSeconds = 30;
const sequenceBase = 290;
const examNumber = 14;

const questions = [
  {
    question: "Which word means a large wild animal with a long trunk?",
    options: ["elephant", "elefant", "elephent", "eliphant"],
    correctAnswer: "elephant"
  },
  {
    question: "Complete: The ____ has a very long neck.",
    options: ["giraffe", "girafe", "geraffe", "giraff"],
    correctAnswer: "giraffe"
  },
  {
    question: "Which word means a black and white striped animal?",
    options: ["zebra", "zembra", "zeebra", "zebar"],
    correctAnswer: "zebra"
  },
  {
    question: "Which word means a big cat called the king of the jungle?",
    options: ["lion", "loin", "lione", "lyion"],
    correctAnswer: "lion"
  },
  {
    question: "Complete: The ____ has black spots and runs very fast.",
    options: ["cheetah", "cheeta", "chita", "cheetahh"],
    correctAnswer: "cheetah"
  },
  {
    question: "Which word means a big grey animal with a horn on its nose?",
    options: ["rhinoceros", "rhinoseros", "rinoceros", "rhinocerous"],
    correctAnswer: "rhinoceros"
  },
  {
    question: "Complete: The ____ lives in water and has a very wide mouth.",
    options: ["hippopotamus", "hipopotamus", "hippopottamus", "hippopotomus"],
    correctAnswer: "hippopotamus"
  },
  {
    question: "Which word means an animal with a hard shell that moves slowly?",
    options: ["tortoise", "tortise", "tortoisee", "tortos"],
    correctAnswer: "tortoise"
  },
  {
    question: "Which word means a jumping animal with strong back legs?",
    options: ["kangaroo", "kangaro", "kangarou", "kanggaroo"],
    correctAnswer: "kangaroo"
  },
  {
    question: "Complete: The ____ swings from tree to tree.",
    options: ["monkey", "monky", "monkye", "monkkey"],
    correctAnswer: "monkey"
  },
  {
    question: "Which word means a dangerous reptile with sharp teeth?",
    options: ["crocodile", "crocadile", "crocodil", "croccodile"],
    correctAnswer: "crocodile"
  },
  {
    question: "Complete: The ____ laughs loudly in the wild.",
    options: ["hyena", "hiena", "hayena", "hyenna"],
    correctAnswer: "hyena"
  },
  {
    question: "Which word means a large wild cat with spots?",
    options: ["leopard", "lepard", "leopad", "leppard"],
    correctAnswer: "leopard"
  },
  {
    question: "Complete: The ____ has strong horns and lives in herds.",
    options: ["buffalo", "bufalo", "buffallo", "buffalow"],
    correctAnswer: "buffalo"
  },
  {
    question: "Which word means a wild dog-like animal?",
    options: ["jackal", "jakal", "jackle", "jackall"],
    correctAnswer: "jackal"
  },
  {
    question: "Complete: The ____ climbed the tree quickly.",
    options: ["baboon", "babon", "baboone", "baboun"],
    correctAnswer: "baboon"
  },
  {
    question: "Which word means a bear-like animal that eats bamboo?",
    options: ["panda", "penda", "pandar", "pandda"],
    correctAnswer: "panda"
  },
  {
    question: "Complete: The ____ slept in a cave.",
    options: ["bear", "bare", "beare", "bair"],
    correctAnswer: "bear"
  },
  {
    question: "Which word means a wild animal with tusks and a snout?",
    options: ["warthog", "wathog", "worthog", "warthogue"],
    correctAnswer: "warthog"
  },
  {
    question: "Complete: The ____ moved quietly through the grass.",
    options: ["tiger", "tigar", "tyger", "tigerr"],
    correctAnswer: "tiger"
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
  tags: ["cbc", "grade-3", "english", learningAreaId, "exam", "wild-animals"],
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
