import { defineMcqProblem } from '../../../../problems/problemAuthoring.js';
import { systemDesignMcqsByTopic } from '../../../banks/system/real-world-mcqs.js';

const legacyProblem = systemDesignMcqsByTopic.databases.find(
  (question) => question.id === 'databases-multi-region-consistency-001'
);

if (!legacyProblem) {
  throw new Error('Missing legacy problem databases-multi-region-consistency-001 during migration.');
}

const problem = defineMcqProblem({
  ...legacyProblem,
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod']
  }
});

export default problem;
