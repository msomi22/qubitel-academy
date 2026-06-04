import { defineMcqProblem } from '../../../../../problems/problemAuthoring.js';

const question = 'A team is building a model to predict whether a customer will cancel their subscription next month. One proposed feature is “number of support tickets opened in the 30 days after cancellation.” Why is this a problem?';

const problem = defineMcqProblem({
  id: 'ml-foundations-data-leakage-basic-mcq-002',
  category: 'ml-ai',
  topicId: 'ml-foundations',
  title: 'Spotting Data Leakage',
  difficulty: 'Easy',
  estimatedTimeSeconds: 120,
  tags: [
    'ml-foundations',
    'data-leakage',
    'features',
    'production-ml',
    'model-evaluation'
  ],
  prompt: question,
  question,
  options: [
    'The feature is too expensive to store in a database.',
    'The feature uses information that would not be available at prediction time.',
    'The feature should only be used with unsupervised learning.',
    'The feature makes the model train more slowly, but it is otherwise valid.'
  ],
  correctAnswer: 'The feature uses information that would not be available at prediction time.',
  explanation: 'This is data leakage. At prediction time, the system is trying to predict next month cancellation before it happens, so it cannot know support tickets opened after cancellation. The storage-cost option is not the main issue because cost does not decide whether a feature is valid. The unsupervised-learning option is incorrect because leakage can affect any ML workflow. The training-speed option is also incorrect because the feature is invalid even if it is cheap and fast to compute. Leakage can make validation metrics look unrealistically good while causing production failure.',
  hints: [
    'Ask whether the feature would be available at the moment the prediction is made.',
    'A feature that uses facts from after the target event is usually leaking future information.',
    'Strong validation metrics can be misleading when future information leaks into the training data.'
  ],
  relatedConcepts: [
    'data leakage',
    'prediction time',
    'feature engineering',
    'model evaluation',
    'production ML'
  ],
  scoring: {
    type: 'single-answer',
    points: 1
  },
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod'],
    source: 'original',
    estimatedTimeSeconds: 120
  }
});

export default problem;
