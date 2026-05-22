import { defineMcqProblem } from '../../../../problems/problemAuthoring.js';
import { systemDesignMcqsByTopic } from '../../../banks/system/real-world-mcqs.js';

const legacyProblem = systemDesignMcqsByTopic['api-design'].find(
  (question) => question.id === 'api-design-rate-limiting-001'
);

if (!legacyProblem) {
  throw new Error('Missing legacy problem api-design-rate-limiting-001 during migration.');
}

const problem = defineMcqProblem({
  ...legacyProblem,
  visualExplanation: 'One-minute fixed window\n0s ─ request 1 ─ request 2 ─ request 3 ─ limit reached ─ reject until window expires ─ 60s reset\nKey idea: count recent requests by caller identity, not every request forever.',
  distractorExplanations: [
    'Storing every request forever is unbounded and expensive for a short-window limit. It answers the question with too much history and creates avoidable storage and scan cost.',
    'Correct. A per-user counter with a 60-second expiry gives bounded state, simple enforcement, and clear behavior when the limit is exceeded.',
    'Adding servers increases capacity, but it does not stop one abusive user from consuming more than their fair share.',
    'Disabling authentication removes the identity needed for per-user limits and weakens the API security model.'
  ],
  selfExplanationPrompt: 'Explain why rate limiting needs caller identity. What breaks if every request is anonymous?',
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod']
  }
});

export default problem;
