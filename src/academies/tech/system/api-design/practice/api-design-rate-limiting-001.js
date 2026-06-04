import { defineMcqProblem } from '../../../../../problems/problemAuthoring.js';
import { systemDesignMcqsByTopic } from '../../../_legacy/banks/system/real-world-mcqs.js';

const legacyProblem = systemDesignMcqsByTopic['api-design'].find(
  (question) => question.id === 'api-design-rate-limiting-001'
);

if (!legacyProblem) {
  throw new Error('Missing legacy problem api-design-rate-limiting-001 during migration.');
}

const problem = defineMcqProblem({
  ...legacyProblem,
  mentalPicture: 'Think of rate limiting as a turnstile with a short timer. Each caller gets a limited number of entries during the current window. When the timer resets, the caller gets a fresh allowance.',
  visualExplanation: 'One-minute fixed window\n0s -> request 1 -> request 2 -> request 3 -> limit reached -> reject until window expires -> 60s reset\nDistributed version: API gateway/app instances must share the same counter store, otherwise each server grants its own separate allowance.',
  productionReality: 'In production, the counter usually lives in a shared store such as Redis or an API gateway layer so multiple app instances enforce the same limit. Anonymous traffic needs a fallback key such as IP or device fingerprint, but authenticated user/API-key limits are more reliable.',
  commonMistake: 'A common mistake is adding more servers and thinking that solves abuse. More servers increase capacity, but without a shared per-caller limit, one noisy client can still consume unfair resources.',
  finalTakeaway: 'Rate limiting works by counting recent requests per caller identity in bounded time, then rejecting or throttling when that caller exceeds the allowed budget.',
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
