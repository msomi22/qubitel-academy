import { defineMcqProblem } from '../../../../problems/problemAuthoring.js';
import { systemDesignMcqsByTopic } from '../../../banks/system/real-world-mcqs.js';

const legacyProblem = systemDesignMcqsByTopic['messaging-queues'].find(
  (question) => question.id === 'messaging-queues-email-notification-001'
);

if (!legacyProblem) {
  throw new Error('Missing legacy problem messaging-queues-email-notification-001 during migration.');
}

const problem = defineMcqProblem({
  ...legacyProblem,
  visualExplanation: 'Checkout API -> create order transaction -> publish email job to durable queue -> return success to user\nWorker -> send email provider request -> retry transient failures -> move repeated failures to dead-letter queue for inspection',
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
