import { defineMcqProblem } from '../../../../../problems/problemAuthoring.js';
import { systemDesignMcqsByTopic } from '../../../_legacy/banks/system/real-world-mcqs.js';

const legacyProblem = systemDesignMcqsByTopic.caching.find(
  (question) => question.id === 'caching-product-details-001'
);

if (!legacyProblem) {
  throw new Error('Missing legacy problem caching-product-details-001 during migration.');
}

const problem = defineMcqProblem({
  ...legacyProblem,
  mentalPicture: 'Think of the cache as a small shelf near the application. Popular product details stay nearby so the API does not query the database for every read, but the shelf must be refreshed when the product changes.',
  visualExplanation: 'Cache-aside flow\n1. Browser asks API for product P123\n2. API checks cache using key product:P123\n3. Cache hit: return product details quickly\n4. Cache miss: read database, store result in cache with TTL, return response\n5. Product update: invalidate or refresh product:P123\n6. Next read loads the fresh value instead of serving stale data forever',
  productionReality: 'In production, caching improves read latency and reduces database load, but it creates a freshness contract. Prices, stock, and disabled products need deliberate TTLs, invalidation, or refresh paths so users do not see stale data for too long.',
  commonMistake: 'A common mistake is adding a cache and forgetting invalidation. That makes the system fast at returning old answers, which is a poor fit for prices, stock, or frequently updated product data.',
  finalTakeaway: 'Cache-aside works well for read-heavy product details when every cached value has a freshness plan: TTL, invalidation, or refresh on update.',
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
