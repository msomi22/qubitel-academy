import { defineMcqProblem } from "../../../../../../problems/problemAuthoring.js";

const examId = "grade-3-spelling-random-hard-exam-010";
const examTitle = "Spelling Exam 10: Random Very Hard";
const learningAreaId = "spelling";
const questionTimeSeconds = 30;
const sequenceBase = 210;
const examNumber = 10;

const questions = [
  {
    question: "Which word means what you learn and know?",
    options: ["knowledge", "knowlege", "knoledge", "knowladge"],
    correctAnswer: "knowledge"
  },
  {
    question: "Complete: Draw a ____ line with your ruler.",
    options: ["straight", "strait", "streight", "straigt"],
    correctAnswer: "straight"
  },
  {
    question: "Which word means a reply to a question?",
    options: ["answer", "anser", "answar", "anwser"],
    correctAnswer: "answer"
  },
  {
    question: "Which word means land surrounded by water?",
    options: ["island", "iland", "islend", "islund"],
    correctAnswer: "island"
  },
  {
    question: "Which word means telling the truth?",
    options: ["honest", "onest", "honnest", "honist"],
    correctAnswer: "honest"
  },
  {
    question: "Complete: The doctor gave me ____.",
    options: ["medicine", "medisine", "medicin", "medecine"],
    correctAnswer: "medicine"
  },
  {
    question: "Which word means body activity to stay healthy?",
    options: ["exercise", "excercise", "exersize", "exercize"],
    correctAnswer: "exercise"
  },
  {
    question: "Complete: We walked home ____.",
    options: ["together", "togather", "toogether", "togethar"],
    correctAnswer: "together"
  },
  {
    question: "Which word means the day after today?",
    options: ["tomorrow", "tomorow", "tommorrow", "tommorow"],
    correctAnswer: "tomorrow"
  },
  {
    question: "Which word means not ordinary or extra nice?",
    options: ["special", "spesial", "specail", "speacial"],
    correctAnswer: "special"
  },
  {
    question: "Complete: The teacher gave clear ____.",
    options: ["instructions", "instractions", "instructiones", "instrutions"],
    correctAnswer: "instructions"
  },
  {
    question: "Which word means something that happens by chance?",
    options: ["accident", "acident", "accedent", "aksident"],
    correctAnswer: "accident"
  },
  {
    question: "Which word means a person who lives near you?",
    options: ["neighbour", "neigbour", "nieghbour", "neighbar"],
    correctAnswer: "neighbour"
  },
  {
    question: "Complete: I made a good ____ today.",
    options: ["decision", "desicion", "decission", "desision"],
    correctAnswer: "decision"
  },
  {
    question: "Which word means a place where people are treated when sick?",
    options: ["hospital", "hospitol", "hostipal", "hospitle"],
    correctAnswer: "hospital"
  },
  {
    question: "Which word means to remember and say words aloud?",
    options: ["recite", "resite", "recit", "recheat"],
    correctAnswer: "recite"
  },
  {
    question: "Complete: We must keep our environment ____.",
    options: ["healthy", "helthy", "heathy", "healthly"],
    correctAnswer: "healthy"
  },
  {
    question: "Which word means to speak very softly?",
    options: ["whisper", "wisper", "whispar", "whispper"],
    correctAnswer: "whisper"
  },
  {
    question: "Which word means a thing that is very useful?",
    options: ["valuable", "valueable", "valuabel", "valuble"],
    correctAnswer: "valuable"
  },
  {
    question: "Complete: The pupils showed good ____.",
    options: ["behaviour", "behavour", "behaveour", "bihaviour"],
    correctAnswer: "behaviour"
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
  tags: ["cbc", "grade-3", "english", learningAreaId, "exam", "mixed-very-hard-spelling-words"],
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
