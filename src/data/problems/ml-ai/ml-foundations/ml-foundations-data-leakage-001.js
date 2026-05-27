import { defineMcqProblem } from '../../../../problems/problemAuthoring.js';

const question = 'A churn model uses a feature named support_tickets_after_cancellation to predict whether a customer will cancel next month. What is the main problem with this feature?';

const problem = defineMcqProblem({
  id: 'ml-foundations-data-leakage-001',
  category: 'ml-ai',
  topicId: 'ml-foundations',
  title: 'Spotting data leakage in a churn model',
  difficulty: 'Easy',
  estimatedTimeSeconds: 90,
  tags: [
    'ml-ai',
    'machine-learning',
    'ml-foundations',
    'data-leakage',
    'features',
    'production-ml'
  ],
  prompt: question,
  question,
  options: [
    'It is data leakage because the feature depends on information from after the cancellation outcome.',
    'It is a good feature because support tickets are always useful for predicting churn.',
    'It is only a naming problem; the model can still use it safely if validation accuracy is high.',
    'It is a class imbalance problem because most customers may not cancel.'
  ],
  correctAnswer: 'It is data leakage because the feature depends on information from after the cancellation outcome.',
  explanation: 'This is data leakage. The model is supposed to predict next month cancellation before it happens, so it cannot know support tickets opened after cancellation. Using information from after the outcome can make validation metrics look unrealistically strong while causing the model to fail in production.',
  hints: [
    'Ask whether the feature would be available at the exact time prediction is made.',
    'A feature that knows something after the outcome has already happened is not safe for prediction.',
    'Great validation metrics can be misleading when future information leaks into training data.'
  ],
  relatedConcepts: [
    'data leakage',
    'feature engineering',
    'prediction time',
    'validation metrics',
    'production failure'
  ],
  scoring: {
    type: 'single-answer',
    points: 1
  },
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod'],
    source: 'original',
    estimatedTimeSeconds: 90
  }
});

export default problem;
