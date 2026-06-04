import { defineMcqProblem } from '../../../../../problems/problemAuthoring.js';
import { systemDesignMcqsByTopic } from '../../../_legacy/banks/system/real-world-mcqs.js';

const legacyProblem = systemDesignMcqsByTopic['messaging-queues'].find(
  (question) => question.id === 'messaging-queues-email-notification-001'
);

if (!legacyProblem) {
  throw new Error('Missing legacy problem messaging-queues-email-notification-001 during migration.');
}

const problem = defineMcqProblem({
  ...legacyProblem,
  mentalPicture: 'Think of checkout as the fast counter and the queue as a reliable work tray. The order is completed first, then a separate worker picks up the notification task from the tray.',
  visualExplanation: 'Checkout and notification flow\n1. Checkout API creates the order transaction\n2. API publishes a notification job to a durable queue\n3. API returns success to the user\n4. Worker reads the notification job\n5. Worker calls the notification provider\n6. Temporary failure: retry with backoff\n7. Repeated failure: move to dead-letter queue for inspection',
  productionReality: 'In production, the notification worker should be idempotent because queue messages may be delivered more than once. Retries need backoff, poison messages need a dead-letter queue, and the checkout path should not fail just because the notification provider is slow.',
  commonMistake: 'A common mistake is sending notifications synchronously inside checkout. That couples a non-critical side effect to the revenue-critical transaction and makes checkout latency depend on an external provider.',
  finalTakeaway: 'Use a durable queue when important side effects should happen reliably, but should not block the critical user transaction.',
  distractorExplanations: [
    'Correct. A durable queue removes slow email delivery from the checkout critical path while preserving retryable work.',
    'Asking users to refresh pushes backend reliability problems onto the customer and still does not guarantee email delivery.',
    'Browser localStorage is not a reliable server-side communication channel for confirmed order notifications.',
    'Blocking all orders because email is slow couples a non-critical side effect to the revenue-critical checkout path.'
  ],
  selfExplanationPrompt: 'Explain why email confirmation is usually a side effect, while order creation is the critical transaction.',
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod']
  }
});

export default problem;
