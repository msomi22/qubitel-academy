import { defineMcqProblem } from '../../../../../problems/problemAuthoring.js';

export const safariYaAminaPassage = {
  title: 'Safari ya Amina Shuleni',
  paragraphs: [
    {
      id: 'amina-p1',
      sentenceIds: ['amina-s1', 'amina-s2']
    },
    {
      id: 'amina-p2',
      sentenceIds: ['amina-s3', 'amina-s4', 'amina-s5', 'amina-s6']
    },
    {
      id: 'amina-p3',
      sentenceIds: ['amina-s7', 'amina-s8', 'amina-s9']
    },
    {
      id: 'amina-p4',
      sentenceIds: ['amina-s10', 'amina-s11', 'amina-s12']
    }
  ],
  sentences: [
    {
      id: 'amina-s1',
      text: 'Amina alikuwa msichana mwenye bidii.'
    },
    {
      id: 'amina-s2',
      text: 'Kila asubuhi, aliamka mapema, akaosha uso, akavaa sare yake ya shule, na kula kiamsha kinywa.'
    },
    {
      id: 'amina-s3',
      text: 'Mama yake alimkumbusha kubeba daftari, penseli, na kitabu chake cha Kiswahili.'
    },
    {
      id: 'amina-s4',
      text: 'Amina alipokuwa njiani kwenda shule, alimuona mtoto mdogo akilia karibu na lango.'
    },
    {
      id: 'amina-s5',
      text: 'Mtoto huyo alikuwa amepoteza kalamu yake.'
    },
    {
      id: 'amina-s6',
      text: 'Amina alisimama na kumsaidia kutafuta kalamu hiyo.'
    },
    {
      id: 'amina-s7',
      text: 'Baada ya muda mfupi, waliipata chini ya mti.'
    },
    {
      id: 'amina-s8',
      text: 'Mtoto huyo alifurahi sana na kumwambia Amina, "Asante sana."'
    },
    {
      id: 'amina-s9',
      text: 'Amina alitabasamu na kumwambia, "Karibu."'
    },
    {
      id: 'amina-s10',
      text: 'Walifika shuleni kabla ya kengele kulia.'
    },
    {
      id: 'amina-s11',
      text: 'Mwalimu alipowasili darasani, aliwasifu wanafunzi waliowasaidia wengine.'
    },
    {
      id: 'amina-s12',
      text: 'Amina alijifunza kuwa ni vizuri kuwa na bidii, huruma, na kusaidia wenzetu.'
    }
  ]
};

const examId = 'grade-3-kiswahili-hadithi-exam-001';
const examTitle = 'Grade 3 Kiswahili Hadithi Exam 1';
const learningAreaId = 'ufahamu';
const questionTimeSeconds = 60;

const timedComprehensionExam = {
  id: examId,
  type: 'timed-comprehension-exam',
  category: 'grade-3',
  topicId: 'kiswahili',
  learningAreaId,
  title: examTitle,
  passageTitle: safariYaAminaPassage.title,
  readingGuideSeconds: 600,
  questionTimeSeconds,
  autoAdvanceAfterReading: false,
  allowStartQuestionsAnytime: true,
  allowPassageDuringQuestions: true,
  readAloud: {
    enabled: true,
    highlightCurrentSentence: true
  },
  passage: safariYaAminaPassage
};

const questions = [
  {
    id: 'hadithi-main-character-001',
    title: 'Hadithi: Amina',
    question: 'Hadithi hii inamhusu nani zaidi?',
    options: ['Amina', 'Mama', 'Mwalimu', 'Mtoto'],
    correctAnswer: 'Amina',
    explanation: 'Hadithi inazungumzia zaidi Amina.'
  },
  {
    id: 'hadithi-morning-routine-002',
    title: 'Hadithi: Kila Asubuhi',
    question: 'Amina alifanya nini kila asubuhi?',
    options: ['Aliamka mapema', 'Alilala tena', 'Alicheza mpira', 'Alienda sokoni'],
    correctAnswer: 'Aliamka mapema',
    explanation: 'Amina aliamka mapema.'
  },
  {
    id: 'hadithi-school-items-003',
    title: 'Hadithi: Vifaa vya Shule',
    question: 'Mama yake Amina alimkumbusha kubeba nini?',
    options: ['Daftari, penseli, na kitabu cha Kiswahili', 'Mpira na maji', 'Kiti na meza', 'Chakula cha jioni'],
    correctAnswer: 'Daftari, penseli, na kitabu cha Kiswahili',
    explanation: 'Alikumbushwa kubeba vifaa vya shule.'
  },
  {
    id: 'hadithi-child-at-gate-004',
    title: 'Hadithi: Njiani',
    question: 'Amina alimuona nani njiani?',
    options: ['Mtoto mdogo aliyekuwa akilia', 'Mwalimu mkuu', 'Dereva', 'Muuzaji'],
    correctAnswer: 'Mtoto mdogo aliyekuwa akilia',
    explanation: 'Alimuona mtoto akilia karibu na lango.'
  },
  {
    id: 'hadithi-lost-pen-005',
    title: 'Hadithi: Kalamu Iliyopotea',
    question: 'Mtoto alikuwa amepoteza nini?',
    options: ['Kalamu', 'Kiatu', 'Mkoba', 'Kikombe'],
    correctAnswer: 'Kalamu',
    explanation: 'Mtoto alipoteza kalamu.'
  },
  {
    id: 'hadithi-pen-location-006',
    title: 'Hadithi: Chini ya Mti',
    question: 'Kalamu ilipatikana wapi?',
    options: ['Chini ya mti', 'Darasani', 'Nyumbani', 'Sokoni'],
    correctAnswer: 'Chini ya mti',
    explanation: 'Waliipata chini ya mti.'
  },
  {
    id: 'hadithi-thank-you-007',
    title: 'Hadithi: Asante',
    question: 'Mtoto alimwambia Amina nini?',
    options: ['Asante sana', 'Pole sana', 'Kwaheri', 'Habari'],
    correctAnswer: 'Asante sana',
    explanation: 'Mtoto alimshukuru.'
  },
  {
    id: 'hadithi-you-are-welcome-008',
    title: 'Hadithi: Karibu',
    question: 'Amina alimjibu mtoto kwa kusema nini?',
    options: ['Karibu', 'Samahani', 'Lala salama', 'Njoo kesho'],
    correctAnswer: 'Karibu',
    explanation: 'Amina alisema "Karibu."'
  },
  {
    id: 'hadithi-arrival-time-009',
    title: 'Hadithi: Kufika Shuleni',
    question: 'Wanafunzi walifika shuleni lini?',
    options: ['Kabla ya kengele kulia', 'Baada ya shule kufungwa', 'Usiku', 'Wakati wa chakula cha mchana'],
    correctAnswer: 'Kabla ya kengele kulia',
    explanation: 'Walifika kabla ya kengele.'
  },
  {
    id: 'hadithi-main-lesson-010',
    title: 'Hadithi: Funzo Kuu',
    question: 'Funzo kuu la hadithi ni lipi?',
    options: ['Ni vizuri kuwa na bidii na kusaidia wengine', 'Ni vizuri kupoteza kalamu', 'Ni vizuri kuchelewa shule', 'Ni vizuri kulia kila siku'],
    correctAnswer: 'Ni vizuri kuwa na bidii na kusaidia wengine',
    explanation: 'Hadithi inafundisha bidii na kusaidia wengine.'
  }
];

const examQuestions = questions.map((item, index) => defineMcqProblem({
  id: `grade-3-kiswahili-hadithi-exam-001-q${String(index + 1).padStart(3, '0')}`,
  category: 'grade-3',
  topicId: 'kiswahili',
  title: item.title,
  difficulty: 'Easy',
  estimatedTime: '1 min',
  estimatedTimeSeconds: questionTimeSeconds,
  question: item.question,
  body: [
    {
      type: 'section',
      title: 'Objective',
      content: 'Ninaweza kusoma hadithi na kujibu maswali.'
    }
  ],
  options: item.options,
  correctAnswer: item.correctAnswer,
  explanation: item.explanation,
  finalTakeaway: 'Tumia maelezo ya hadithi kuchagua jibu sahihi.',
  tags: ['cbc', 'grade-3', 'kiswahili', learningAreaId, 'hadithi', 'exam'],
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod'],
    source: 'original',
    audience: 'grade-3',
    learningAreaId,
    examId,
    examTitle,
    assessmentType: 'exam',
    examMode: 'timed-comprehension',
    timedComprehensionExam,
    points: 1,
    sequence: 10 + index
  }
}));

export default examQuestions;
