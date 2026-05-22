import { defineProblem } from '../../../../problems/problemAuthoring.js';
import legacyProblem from '../../../banks/dsa/minimum-sideway-jumps.js';

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
