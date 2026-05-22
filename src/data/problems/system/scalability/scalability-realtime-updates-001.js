import { defineMcqProblem } from '../../../../problems/problemAuthoring.js';
import { systemDesignMcqsByTopic } from '../../../banks/system/real-world-mcqs.js';

const legacyProblem = systemDesignMcqsByTopic.scalability.find(
  (question) => question.id === 'scalability-realtime-updates-001'
);

if (!legacyProblem) {
  throw new Error('Missing legacy problem scalability-realtime-updates-001 during migration.');
}

const problem = defineMcqProblem({
  ...legacyProblem,
  visualExplanation: 'Order service publishes a status change -> pub/sub broker routes by order or user channel -> WebSocket servers receive matching events -> the server with the active session sends the update to the device.',
  distractorExplanations: [
    'Correct. Pub/sub separates event creation from the server that currently owns the active WebSocket session.',
    'Frontend-only storage cannot receive authoritative backend state changes when the server changes order status.',
    'One WebSocket server forever becomes a bottleneck and a single point of failure as traffic grows.',
    'Disabling live updates removes product functionality instead of solving routing and fan-out.'
  ],
  selfExplanationPrompt: 'Explain why WebSocket scaling is not only a connection-count problem, but also an event-routing problem.',
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod']
  }
});

export default problem;
