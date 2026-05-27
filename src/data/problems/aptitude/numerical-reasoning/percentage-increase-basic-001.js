import { defineMcqProblem } from '../../../../problems/problemAuthoring.js';

const question = 'A value increases from 80 to 100. What is the percentage increase?';

const problem = defineMcqProblem({
  id: 'aptitude-numerical-percentage-increase-basic-001',
  category: 'aptitude',
  topicId: 'numerical-reasoning',
  title: 'Percentage increase from 80 to 100',
  difficulty: 'Easy',
  estimatedTimeSeconds: 20,
  tags: [
    'aptitude',
    'numerical-reasoning',
    'percentages',
    'percentage-increase',
    'timed-practice'
  ],
  prompt: question,
  question,
  options: [
    '20%',
    '25%',
    '30%',
    '40%'
  ],
  correctAnswer: '25%',
  explanation: 'The increase is 20. Divide the increase by the original value: 20 / 80 = 0.25, so the percentage increase is 25%.',
  hints: [
    'Find the increase first: new value minus original value.',
    'Percentage increase uses the original value as the denominator.'
  ],
  relatedConcepts: [
    'percentage increase',
    'original value',
    'numerical reasoning'
  ],
  scoring: {
    type: 'single-answer',
    points: 1
  },
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod'],
    source: 'original',
    estimatedTimeSeconds: 20
  }
});

export default problem;
