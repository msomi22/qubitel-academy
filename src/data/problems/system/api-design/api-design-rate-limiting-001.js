import { defineMcqProblem } from '../../../../problems/problemAuthoring.js';
import { systemDesignMcqsByTopic } from '../../../banks/system/real-world-mcqs.js';

const legacyProblem = systemDesignMcqsByTopic['api-design'].find(
  (question) => question.id === 'api-design-rate-limiting-001'
);

if (!legacyProblem) {
  throw new Error('Missing legacy problem api-design-rate-limiting-001 during migration.');
}

const problem = defineMcqProblem({
  ...legacyProblem,
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod']
  }
});

export default problem;
