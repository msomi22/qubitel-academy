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
  visualExplanation: 'Cache-aside flow\n1. Browser -> API asks for product P123\n2. API checks cache\n3. Cache hit: return product details quickly\n4. Cache miss: read database, store result in cache with TTL, return response\n5. Product update: invalidate or refresh P123 so future reads are not stale for too long',
  distractorExplanations: [
    'Correct. Product details are read often and changed less often, so cache-aside with TTL or invalidation reduces repeated database reads while controlling freshness.',
    'Writing to the database on every view increases load; it moves in the opposite direction of the goal.',
    'Removing product descriptions reduces product quality and does not solve the repeated-read architecture problem.',
    'Duplicating rows creates consistency problems and makes updates harder without giving a clean freshness strategy.'
  ],
  selfExplanationPrompt: 'Explain what could go wrong if the product price changes but the cache is never invalidated.',
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod']
  }
});

export default problem;
