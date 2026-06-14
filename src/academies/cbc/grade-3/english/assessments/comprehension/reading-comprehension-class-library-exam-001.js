import { defineMcqProblem } from '../../../../../../problems/problemAuthoring.js';
import { placeCorrectAnswerAt, targetAnswerSlotForQuestion } from '../../../../../../utils/cbcAnswerDistribution.js';

export const classLibraryPassage = {
  title: 'The New Class Library',
  paragraphs: [
    {
      id: 'library-p1',
      sentenceIds: ['library-s1', 'library-s2', 'library-s3']
    },
    {
      id: 'library-p2',
      sentenceIds: ['library-s4', 'library-s5', 'library-s6', 'library-s7']
    },
    {
      id: 'library-p3',
      sentenceIds: ['library-s8', 'library-s9', 'library-s10', 'library-s11']
    },
    {
      id: 'library-p4',
      sentenceIds: ['library-s12', 'library-s13', 'library-s14', 'library-s15']
    }
  ],
  sentences: [
    {
      id: 'library-s1',
      text: 'On Monday morning, Grade Three learners found a small bookshelf near the classroom door.'
    },
    {
      id: 'library-s2',
      text: 'Their teacher, Mr. Otieno, smiled and told them it was their new class library.'
    },
    {
      id: 'library-s3',
      text: 'Each learner had brought one clean storybook from home.'
    },
    {
      id: 'library-s4',
      text: 'Amina brought a book called The Brave Hare.'
    },
    {
      id: 'library-s5',
      text: 'Kip brought a book about wild animals.'
    },
    {
      id: 'library-s6',
      text: 'Before break time, the class arranged the books by size and wrote numbers on small cards.'
    },
    {
      id: 'library-s7',
      text: 'Mr. Otieno told them that each learner could borrow one book at a time and return it on Friday.'
    },
    {
      id: 'library-s8',
      text: 'During lunch break, Joy noticed that one book had a torn page.'
    },
    {
      id: 'library-s9',
      text: 'She did not hide it.'
    },
    {
      id: 'library-s10',
      text: 'She took the book to Mr. Otieno, who repaired the page with clear tape.'
    },
    {
      id: 'library-s11',
      text: 'He thanked Joy for being honest and careful.'
    },
    {
      id: 'library-s12',
      text: 'In the afternoon, the learners made a reading chart.'
    },
    {
      id: 'library-s13',
      text: 'When a learner finished reading a book, they would draw a star next to their name.'
    },
    {
      id: 'library-s14',
      text: 'The class promised to keep the books dry, clean, and safe.'
    },
    {
      id: 'library-s15',
      text: 'By the end of the day, everyone was excited to read.'
    }
  ]
};

const examId = 'reading-comprehension-class-library-exam-001';
const examTitle = 'Grade 3 English Timed Comprehension Exam 1';
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
  passageTitle: classLibraryPassage.title,
  readingGuideSeconds: 600,
  questionTimeSeconds,
  autoAdvanceAfterReading: false,
  allowStartQuestionsAnytime: true,
  allowPassageDuringQuestions: true,
  readAloud: {
    enabled: true,
    highlightCurrentSentence: true
  },
  passage: classLibraryPassage
};

const questions = [
  {
    id: 'main-idea-001',
    title: 'Class Library: Main Idea',
    skill: 'main idea',
    question: 'What is the passage mainly about?',
    options: [
      'Learners playing football',
      'Learners starting and caring for a class library',
      'Learners cooking food',
      'Learners visiting a farm'
    ],
    correctAnswer: 'Learners starting and caring for a class library',
    explanation: 'The passage is mainly about Grade Three learners starting a class library and learning how to care for books.'
  },
  {
    id: 'bookshelf-location-002',
    title: 'Class Library: Bookshelf Location',
    skill: 'detail recall',
    question: 'Where was the small bookshelf placed?',
    options: [
      'Near the classroom door',
      'Under a tree',
      'Inside the kitchen',
      'Beside the school gate'
    ],
    correctAnswer: 'Near the classroom door',
    explanation: 'The passage says the bookshelf was near the classroom door.'
  },
  {
    id: 'storybook-from-home-003',
    title: 'Class Library: Storybook From Home',
    skill: 'detail recall',
    question: 'What did each learner bring from home?',
    options: [
      'A pencil',
      'A clean storybook',
      'A lunch box',
      'A toy'
    ],
    correctAnswer: 'A clean storybook',
    explanation: 'Each learner brought one clean storybook from home.'
  },
  {
    id: 'brave-hare-owner-004',
    title: 'Class Library: The Brave Hare',
    skill: 'detail recall',
    question: 'Who brought The Brave Hare?',
    options: [
      'Joy',
      'Kip',
      'Amina',
      'Mr. Otieno'
    ],
    correctAnswer: 'Amina',
    explanation: 'The passage says Amina brought a book called The Brave Hare.'
  },
  {
    id: 'before-break-time-005',
    title: 'Class Library: Before Break Time',
    skill: 'sequence',
    question: 'What did the class do before break time?',
    options: [
      'They arranged the books and wrote numbers on cards',
      'They went home',
      'They cooked lunch',
      'They washed the classroom floor'
    ],
    correctAnswer: 'They arranged the books and wrote numbers on cards',
    explanation: 'Before break time, the class arranged the books by size and wrote numbers on small cards.'
  },
  {
    id: 'one-book-at-a-time-006',
    title: 'Class Library: One Book at a Time',
    skill: 'inference',
    question: 'Why did Mr. Otieno say learners should borrow one book at a time?',
    options: [
      'So the books could be shared and returned properly',
      'So learners would stop reading',
      'So the books could be hidden',
      'So only teachers could read'
    ],
    correctAnswer: 'So the books could be shared and returned properly',
    explanation: 'Borrowing one book at a time helps learners share books and return them properly.'
  },
  {
    id: 'joy-torn-page-007',
    title: 'Class Library: Joy and the Torn Page',
    skill: 'detail recall',
    question: 'What did Joy do when she saw a torn page?',
    options: [
      'She hid the book',
      'She threw the book away',
      'She took the book to Mr. Otieno',
      'She laughed at the book'
    ],
    correctAnswer: 'She took the book to Mr. Otieno',
    explanation: 'Joy took the book to Mr. Otieno when she noticed the torn page.'
  },
  {
    id: 'repaired-meaning-008',
    title: 'Class Library: Repaired Meaning',
    skill: 'vocabulary in context',
    question: 'What does the word repaired mean in the passage?',
    options: [
      'Fixed',
      'Lost',
      'Painted',
      'Counted'
    ],
    correctAnswer: 'Fixed',
    explanation: 'Mr. Otieno repaired the torn page, meaning he fixed it with clear tape.'
  },
  {
    id: 'reading-chart-stars-009',
    title: 'Class Library: Reading Chart Stars',
    skill: 'detail recall',
    question: 'How would learners show that they had finished reading a book?',
    options: [
      'By drawing a star next to their name',
      'By tearing a page',
      'By hiding the book',
      'By closing the classroom door'
    ],
    correctAnswer: 'By drawing a star next to their name',
    explanation: 'The passage says learners would draw a star next to their name after finishing a book.'
  },
  {
    id: 'lesson-learned-010',
    title: 'Class Library: Lesson Learned',
    skill: 'life skill',
    question: 'What lesson can learners get from the passage?',
    options: [
      'Books should be kept dry, clean, and safe',
      'Books should be thrown away',
      'Learners should never share books',
      'Torn pages should be hidden'
    ],
    correctAnswer: 'Books should be kept dry, clean, and safe',
    explanation: 'The learners promised to keep the books dry, clean, and safe.'
  }
];

const examQuestions = questions.map((item, index) => defineMcqProblem({
  id: `english-reading-comprehension-class-library-exam-001-q${String(index + 1).padStart(3, '0')}`,
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
    source: 'original',
    audience: 'grade-3',
    learningAreaId,
    skill: item.skill,
    examId,
    examTitle,
    assessmentType: 'exam',
    examMode: 'timed-comprehension',
    timedComprehensionExam,
    points: 1,
    sequence: 150 + index
  }
}));

export default examQuestions;
