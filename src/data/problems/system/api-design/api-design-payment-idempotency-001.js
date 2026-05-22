import { defineMcqProblem } from '../../../../problems/problemAuthoring.js';
import { systemDesignMcqsByTopic } from '../../../banks/system/real-world-mcqs.js';

const legacyProblem = systemDesignMcqsByTopic['api-design'].find(
  (question) => question.id === 'api-design-payment-idempotency-001'
);

if (!legacyProblem) {
  throw new Error('Missing legacy problem api-design-payment-idempotency-001 during migration.');
}

const problem = defineMcqProblem({
  ...legacyProblem,
  visualExplanation: 'Client sends payment request with key K1 -> API stores attempt as processing -> provider call may timeout -> client retries with K1 -> API returns the stored outcome for K1 instead of creating a second charge.',
  distractorExplanations: [
    'Correct. The key ties retries to one logical payment attempt, so the server can return the same stored result instead of charging again.',
    'Rejecting all retries avoids duplicates, but it also makes timeout recovery brittle because clients cannot safely learn the outcome.',
    'Processing every retry treats ambiguous network failures as new payments, which can double-charge customers.',
    'Logging only after provider success loses important in-flight and failed-attempt state needed for recovery and reconciliation.'
  ],
  selfExplanationPrompt: 'If the same idempotency key is reused with a different amount, explain why the server should reject or flag the request instead of treating it as a harmless retry.',
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod']
  }
});

export default problem;
