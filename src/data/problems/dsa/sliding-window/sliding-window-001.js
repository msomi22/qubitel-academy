import { defineProblem } from '../../../../problems/problemAuthoring.js';
import topic from '../../../banks/dsa/sliding-window.js';

const legacyProblem = topic.questions.find((question) => question.id === 'sliding-window-001');

const problem = defineProblem({
  ...legacyProblem,
  category: 'dsa',
  metadata: {
    ...(legacyProblem.metadata || {}),
    reviewStatus: 'approved',
    visibility: ['dev', 'prod']
  }
});

export default problem;
