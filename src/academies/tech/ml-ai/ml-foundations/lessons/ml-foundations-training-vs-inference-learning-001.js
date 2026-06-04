import { defineLearningProblem } from '../../../../../problems/problemAuthoring.js';

const prompt = 'A team says, “Our model performed well during training, so production predictions should automatically be reliable.” What important difference between training and inference are they overlooking?';

const problem = defineLearningProblem({
  id: 'ml-foundations-training-vs-inference-learning-001',
  category: 'ml-ai',
  topicId: 'ml-foundations',
  title: 'Training vs Inference',
  difficulty: 'Easy',
  estimatedTimeSeconds: 180,
  tags: [
    'ml-foundations',
    'training',
    'inference',
    'model-lifecycle',
    'production-ml',
    'model-evaluation'
  ],
  rendering: {
    variant: 'deep-dive',
    density: 'compact',
    accent: 'blue'
  },
  prompt,
  question: prompt,
  body: [
    {
      type: 'section',
      title: 'Big idea',
      content: 'Training and inference are different phases of the machine learning lifecycle. Training is where a model learns. Inference is where the trained model is used to make predictions on new inputs.'
    },
    {
      type: 'comparison',
      items: [
        {
          title: 'Training',
          content: 'The model uses historical or prepared examples, compares its output with known answers, and updates its internal parameters using feedback from a loss signal.'
        },
        {
          title: 'Inference',
          content: 'The model receives new input and applies the parameters it already learned. A normal production prediction should not update the model just because one request arrived.'
        }
      ]
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'Why training success is not enough',
      content: 'A model can look strong during training but behave poorly in production if it memorized examples, was evaluated on weak data, receives different inputs after release, or uses preprocessing that does not match the training pipeline.'
    },
    {
      type: 'section',
      title: 'Production reliability check',
      content: 'Before trusting the model in production, check whether validation data resembles real usage, whether missing values and changing user behavior are handled, whether training and serving preprocessing match, and whether the system monitors drift after release.'
    },
    {
      type: 'checklist',
      title: 'Strong answer checklist',
      items: [
        'Say that training updates the model from examples.',
        'Say that inference applies the trained model to new inputs.',
        'Mention that high training performance can hide overfitting or weak evaluation.',
        'Mention production risks such as drift, missing values, changing behavior, or integration/preprocessing mismatch.'
      ]
    },
    {
      type: 'callout',
      tone: 'success',
      title: 'Interview-ready summary',
      content: 'Training teaches the model; inference uses the trained model. Good production behavior requires more than strong training results because real inputs, data quality, and serving pipelines can differ from the training setup.'
    }
  ],
  explanation: 'The team is mixing up training with inference. Training is where the model learns and changes. Inference is where the model uses learned parameters on new data. Production reliability still requires evaluation on data that resembles real usage, checks for data drift, and consistency between training-time and serving-time preprocessing.',
  starterThought: 'Ask whether the model is still learning from labeled examples or only applying what it already learned.',
  hints: [
    'Training changes the model; inference uses the model.',
    'High training performance can hide memorization or weak evaluation.',
    'Production inputs may not behave like the training dataset.'
  ],
  relatedConcepts: [
    'training',
    'inference',
    'generalization',
    'overfitting',
    'training-serving skew',
    'data drift',
    'production ML'
  ],
  followUpQuestions: [
    'What validation data would make this team more confident before release?',
    'What monitoring would you add after the model starts serving production traffic?'
  ],
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod'],
    source: 'original',
    estimatedTimeSeconds: 180
  }
});

export default problem;
