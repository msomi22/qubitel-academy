import { defineLearningProblem } from '../../../../../problems/problemAuthoring.js';

const lesson = defineLearningProblem({
  id: 'english-spelling-lesson-001',
  category: 'grade-3',
  topicId: 'english',
  title: 'Spelling: Choosing the Correct Word',
  difficulty: 'Easy',
  estimatedTimeSeconds: 300,
  question: 'Learn how to choose the correctly spelt word.',
  body: [
    {
      type: 'section',
      title: 'Objective',
      content: 'I can choose the correctly spelt word from four choices.'
    },
    {
      type: 'section',
      title: 'What is spelling?',
      content: 'Spelling means writing the letters of a word in the correct order.'
    },
    {
      type: 'section',
      title: 'How to choose the correct word',
      content: 'Look at every letter. Read the word slowly. Compare words that look almost the same. Choose the word you know is correct.'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Example',
      content: 'school is correct. skool is not correct.'
    }
  ],
  explanation: 'Good spelling helps other people read and understand your writing.',
  finalTakeaway: 'Read slowly, check every letter, and choose the word that looks right.',
  tags: ['cbc', 'grade-3', 'english', 'spelling', 'lesson'],
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod'],
    source: 'original',
    audience: 'grade-3',
    sequence: 1
  }
});

export default lesson;
