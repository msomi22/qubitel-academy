import { defineMcqProblem } from '../../../../problems/problemAuthoring.js';
import { systemDesignMcqsByTopic } from '../../../banks/system/real-world-mcqs.js';

const legacyProblem = systemDesignMcqsByTopic.caching.find(
  (question) => question.id === 'caching-product-details-001'
);

if (!legacyProblem) {
  throw new Error('Missing legacy problem caching-product-details-001 during migration.');
}

const problem = defineMcqProblem({
  ...legacyProblem,
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod']
  }
});

export default problem;
