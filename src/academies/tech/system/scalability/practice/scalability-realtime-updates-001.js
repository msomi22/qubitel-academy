import { defineMcqProblem } from '../../../../../problems/problemAuthoring.js';
import { systemDesignMcqsByTopic } from '../../../_legacy/banks/system/real-world-mcqs.js';

const legacyProblem = systemDesignMcqsByTopic.scalability.find(
  (question) => question.id === 'scalability-realtime-updates-001'
);

if (!legacyProblem) {
  throw new Error('Missing legacy problem scalability-realtime-updates-001 during migration.');
}

const problem = defineMcqProblem({
  ...legacyProblem,
  mentalPicture: 'Think of each WebSocket server as an apartment building. The user is inside one building, but the order update may be produced somewhere else. Pub/sub is the postal system that delivers the event to the building that currently owns the user connection.',
  visualExplanation: 'Realtime update flow\n1. Order service publishes status change for order O123\n2. Pub/sub broker routes the event by order/user channel\n3. All relevant WebSocket nodes receive or can claim the event\n4. The node holding the active user session sends the message to the device\n5. If the user reconnects elsewhere, connection ownership changes but event routing still works',
  productionReality: 'In production, scaling WebSockets is not just about opening more connections. You must know which server owns each active connection, handle reconnects, avoid duplicate fan-out, and keep the event broker from becoming the hidden bottleneck.',
  commonMistake: 'A common mistake is assuming one WebSocket server can receive every event and push to every user forever. That design becomes a bottleneck and makes failover painful because connection ownership and event routing are mixed together.',
  finalTakeaway: 'For scalable realtime systems, separate event production from connection ownership: publish events to a broker, then let the WebSocket node that owns the active session deliver the update.',
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
