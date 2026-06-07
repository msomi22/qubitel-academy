import { defineMcqProblem } from "../../../../../../problems/problemAuthoring.js";

const examId = "grade-3-spelling-aquatic-animals-exam-015";
const examTitle = "Spelling Exam 15: Aquatic Animals";
const learningAreaId = "spelling";
const questionTimeSeconds = 30;
const sequenceBase = 310;
const examNumber = 15;

const questions = [
  {
    question: "Which word means an animal that lives in water and has fins?",
    options: ["fish", "fich", "fishe", "phish"],
    correctAnswer: "fish"
  },
  {
    question: "Complete: The ____ is a very large sea animal.",
    options: ["whale", "wale", "whail", "whael"],
    correctAnswer: "whale"
  },
  {
    question: "Which word means a clever sea animal that can jump from water?",
    options: ["dolphin", "dolfin", "dolphine", "dolfine"],
    correctAnswer: "dolphin"
  },
  {
    question: "Complete: The ____ has eight arms.",
    options: ["octopus", "octapus", "oktopus", "octopuss"],
    correctAnswer: "octopus"
  },
  {
    question: "Which word means a sea animal with a hard shell and claws?",
    options: ["crab", "crabb", "krab", "crabe"],
    correctAnswer: "crab"
  },
  {
    question: "Complete: The ____ moved slowly on the sea floor.",
    options: ["lobster", "lobstar", "lobester", "loppster"],
    correctAnswer: "lobster"
  },
  {
    question: "Which word means a soft sea animal that can sting?",
    options: ["jellyfish", "jelyfish", "jellyfich", "jelly fish"],
    correctAnswer: "jellyfish"
  },
  {
    question: "Complete: The ____ has a shell and moves slowly.",
    options: ["turtle", "turtel", "tortle", "turtlee"],
    correctAnswer: "turtle"
  },
  {
    question: "Which word means a dangerous sea animal with sharp teeth?",
    options: ["shark", "sharke", "shurk", "shaak"],
    correctAnswer: "shark"
  },
  {
    question: "Complete: The ____ looks like a horse and lives in water.",
    options: ["seahorse", "sea horse", "seahors", "seehorse"],
    correctAnswer: "seahorse"
  },
  {
    question: "Which word means a small animal with a shell found in water?",
    options: ["snail", "snaill", "snale", "sneil"],
    correctAnswer: "snail"
  },
  {
    question: "Complete: The ____ can live both in water and on land.",
    options: ["frog", "frogg", "forg", "frogate"],
    correctAnswer: "frog"
  },
  {
    question: "Which word means a flat sea animal shaped like a star?",
    options: ["starfish", "starfich", "star fish", "starfeesh"],
    correctAnswer: "starfish"
  },
  {
    question: "Complete: The ____ has a soft body and a shell.",
    options: ["oyster", "oister", "oystar", "oyester"],
    correctAnswer: "oyster"
  },
  {
    question: "Which word means a small sea animal often eaten as food?",
    options: ["shrimp", "shrim", "shreemp", "schrimp"],
    correctAnswer: "shrimp"
  },
  {
    question: "Complete: The ____ has a hard shell and walks sideways.",
    options: ["crab", "krabb", "crabe", "craab"],
    correctAnswer: "crab"
  },
  {
    question: "Which word means a fish that can puff up like a ball?",
    options: ["pufferfish", "puffer fich", "puferfish", "pufferfeesh"],
    correctAnswer: "pufferfish"
  },
  {
    question: "Complete: The ____ lives in rivers and has sharp teeth.",
    options: ["crocodile", "crocadile", "crocodil", "croccodile"],
    correctAnswer: "crocodile"
  },
  {
    question: "Which word means a large water animal with a wide mouth?",
    options: ["hippopotamus", "hipopotamus", "hippopotomus", "hippopottamus"],
    correctAnswer: "hippopotamus"
  },
  {
    question: "Complete: The ____ has a long body and moves like a snake in water.",
    options: ["eel", "eal", "eell", "ile"],
    correctAnswer: "eel"
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
  tags: ["cbc", "grade-3", "english", learningAreaId, "exam", "aquatic-animals"],
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
