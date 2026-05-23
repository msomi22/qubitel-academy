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
  mentalPicture: 'Think of the idempotency key as a receipt number for one payment attempt. If the client asks again with the same receipt number, the API looks up the existing result instead of starting a new payment.',
  visualExplanation: 'Payment retry flow\n1. Client sends amount + merchant + idempotency key K1\n2. API stores K1 with request fingerprint and status=processing\n3. Provider call may succeed, fail, or timeout\n4. Client retries with K1\n5. API compares the request fingerprint\n6. Same request: return stored outcome\n7. Different request with same key: reject or flag for investigation',
  productionReality: 'In production, the idempotency record should store the request fingerprint, processing state, final outcome, and response body or error. It also needs a retention period so old keys do not grow forever, while still covering realistic client retry windows.',
  commonMistake: 'A common mistake is storing only successful provider responses. If the first attempt is still processing or times out, the retry can create a second provider call unless the in-flight state is recorded too.',
  finalTakeaway: 'Payment idempotency is not just a retry header; it is a server-side record that binds one request fingerprint to one stored outcome.',
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
