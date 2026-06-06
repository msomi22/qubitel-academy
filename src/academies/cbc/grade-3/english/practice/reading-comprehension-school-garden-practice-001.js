import { defineMcqProblem } from '../../../../../problems/problemAuthoring.js';
import { schoolGardenPassage } from '../lessons/reading-comprehension-school-garden-lesson-001.js';

const questions = [
  {
    id: 'english-reading-comprehension-school-garden-main-idea-001',
    title: 'School Garden: Main Idea',
    skill: 'main idea',
    question: 'What is the passage mainly about?',
    options: [
      'Learners playing football',
      'Learners visiting and caring for a school garden',
      'Learners cooking lunch',
      'Learners painting the classroom'
    ],
    correctAnswer: 'Learners visiting and caring for a school garden',
    explanation: 'The passage tells about Grade Three learners visiting the school garden and learning how to care for plants.'
  },
  {
    id: 'english-reading-comprehension-school-garden-detail-location-002',
    title: 'School Garden: Garden Location',
    skill: 'detail recall',
    question: 'Where was the school garden?',
    options: [
      'Behind the classroom',
      'Inside the library',
      'Near the school gate',
      'Beside the playground'
    ],
    correctAnswer: 'Behind the classroom',
    explanation: 'The passage says the garden was behind the classroom, near the water tank.'
  },
  {
    id: 'english-reading-comprehension-school-garden-vocabulary-compost-003',
    title: 'School Garden: Compost Meaning',
    skill: 'vocabulary in context',
    question: 'What does the word compost mean in the passage?',
    options: [
      'Dry leaves used to help plants grow',
      'A type of classroom book',
      'Water kept in a tank',
      'A basket for carrying food'
    ],
    correctAnswer: 'Dry leaves used to help plants grow',
    explanation: 'Nia collected dry leaves, and the passage says they would later be used to make compost.'
  },
  {
    id: 'english-reading-comprehension-school-garden-inference-careful-walking-004',
    title: 'School Garden: Walking Carefully',
    skill: 'inference',
    question: 'Why did Miss Amina ask learners to walk carefully between the rows?',
    options: [
      'So they would not damage the plants',
      'So they could run faster',
      'So they could avoid reading',
      'So they could find footballs'
    ],
    correctAnswer: 'So they would not damage the plants',
    explanation: 'The learners had to walk carefully between the rows so they would not pull out or damage the young plants.'
  },
  {
    id: 'english-reading-comprehension-school-garden-sequence-after-watering-005',
    title: 'School Garden: After Watering',
    skill: 'sequence',
    question: 'What did the learners do after watering the plants?',
    options: [
      'They went home immediately',
      'They sat under a tree',
      'They cooked vegetables',
      'They opened the school gate'
    ],
    correctAnswer: 'They sat under a tree',
    explanation: 'The passage says that after watering the plants, the learners sat under a tree.'
  },
  {
    id: 'english-reading-comprehension-school-garden-life-skill-water-006',
    title: 'School Garden: Saving Water',
    skill: 'life skill',
    question: 'Why should the learners not waste water?',
    options: [
      'The garden needs water to grow vegetables',
      'Water makes books dirty',
      'Water stops learners from drawing',
      'The teacher wanted to hide the watering can'
    ],
    correctAnswer: 'The garden needs water to grow vegetables',
    explanation: 'Miss Amina reminded the learners not to waste water because the garden helped provide vegetables for lunch.'
  },
  {
    id: 'english-reading-comprehension-school-garden-detail-watering-can-007',
    title: 'School Garden: Watering Can',
    skill: 'detail recall',
    question: 'Which learner carried a small watering can?',
    options: [
      'Nia',
      'Brian',
      'Miss Amina',
      'The head teacher'
    ],
    correctAnswer: 'Brian',
    explanation: 'The passage says Brian carried a small watering can.'
  },
  {
    id: 'english-reading-comprehension-school-garden-detail-nia-drawing-008',
    title: 'School Garden: Nia Drawing',
    skill: 'detail recall',
    question: 'Which plant did Nia draw?',
    options: [
      'Carrots growing in the soil',
      'A tomato plant with small green tomatoes',
      'Spinach leaves in a basket',
      'Sukuma wiki near the gate'
    ],
    correctAnswer: 'A tomato plant with small green tomatoes',
    explanation: 'The passage says Nia drew a tomato plant with small green tomatoes.'
  },
  {
    id: 'english-reading-comprehension-school-garden-detail-plant-needs-009',
    title: 'School Garden: Plant Needs',
    skill: 'detail recall',
    question: 'Which of these do plants need to grow well according to Miss Amina?',
    options: [
      'Soil, water, air, and sunlight',
      'Books, pencils, desks, and chairs',
      'Stones, sand, paper, and paint',
      'Shoes, bags, uniforms, and chalk'
    ],
    correctAnswer: 'Soil, water, air, and sunlight',
    explanation: 'Miss Amina explained that plants need soil, water, air, and sunlight to grow well.'
  },
  {
    id: 'english-reading-comprehension-school-garden-lesson-learned-010',
    title: 'School Garden: Lesson Learned',
    skill: 'life skill',
    question: 'What lesson did the learners learn from the visit?',
    options: [
      'How to care for plants and keep the garden clean',
      'How to play during lunch time',
      'How to draw animals only',
      'How to waste water safely'
    ],
    correctAnswer: 'How to care for plants and keep the garden clean',
    explanation: 'The passage says the learners were happy because they had learned how to care for plants and keep the garden clean.'
  }
];

const practice = questions.map((item, index) => defineMcqProblem({
  id: item.id,
  category: 'grade-3',
  topicId: 'english',
  title: item.title,
  difficulty: 'Easy',
  estimatedTime: '2 min',
  estimatedTimeSeconds: 120,
  question: item.question,
  body: [
    {
      type: 'section',
      title: 'Objective',
      content: 'I can read a passage and choose an answer using details from the text.'
    },
    {
      type: 'section',
      title: 'Passage',
      content: schoolGardenPassage
    },
    {
      type: 'section',
      title: 'Question',
      content: item.question
    }
  ],
  options: item.options,
  correctAnswer: item.correctAnswer,
  explanation: item.explanation,
  finalTakeaway: 'Go back to the passage and choose the answer supported by the text.',
  tags: ['cbc', 'grade-3', 'english', 'reading-comprehension', 'practice', item.skill],
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod'],
    source: 'original',
    audience: 'grade-3',
    practiceId: 'reading-comprehension-school-garden-practice-001',
    practiceTitle: 'Reading Comprehension Practice: A Visit to the School Garden',
    skill: item.skill,
    sequence: 80 + index
  }
}));

export default practice;
