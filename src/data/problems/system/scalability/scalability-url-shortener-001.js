// Legacy URL shortener problem wrapper.
// This file is retained for dev-only reference to the migrated legacy bank item.
// It must not be shown in production because `url-shortener-v2.js` is the
// canonical learner-facing URL shortener walkthrough.
//
// Production-visible replacement:
// - file: `url-shortener-v2.js`
// - id: `scalability-url-shortener-v2`
//
// Keep this wrapper out of prod/search to avoid showing two URL shortener
// problems to learners.

import { defineComplexSystemDesignProblem } from '../../../../problems/problemAuthoring.js';
import legacyBank from '../../../banks/system/complex-system-design.js';

const legacyProblem = legacyBank.questions.find(
  (question) => question.id === 'complex-system-design-url-shortener-001'
);

if (!legacyProblem) {
  throw new Error('Missing legacy problem complex-system-design-url-shortener-001 during migration.');
}

const problem = defineComplexSystemDesignProblem({
  ...legacyProblem,
  id: 'scalability-url-shortener-001',
  topicId: 'scalability',
  title: 'URL Shortener Design Review Drill',
  finalPattern: 'Scalability',
  scenario: 'You are reviewing a URL shortener design answer in an interview or design review. The goal is to judge whether the answer covers the essential scalability, reliability, and operational trade-offs, not to introduce a second full teaching version of the URL shortener problem.',
  prompt: 'Evaluate a URL shortener design answer. Look for clear requirements, short-code generation, collision handling, storage, redirect flow, caching, analytics, expiry, abuse prevention, high availability, observability, and trade-offs.',
  starterThought: 'Use this as a scoring drill. For the full learner-facing teaching walkthrough, prefer scalability-url-shortener-v2. Here, focus on whether an answer mentions the right production concerns and explains the trade-offs clearly.',
  tags: [...new Set([...(legacyProblem.tags || []), 'scalability', 'design-review', 'scoring-drill', 'legacy'])],
  visualExplanation: 'Review lens: requirements -> create flow -> redirect flow -> cache/storage -> analytics queue -> abuse controls -> reliability/observability -> trade-offs',
  explanation: `${legacyProblem.explanation || ''}\n\nProduction quality note: this legacy variant is retained for dev-only reference. The learner-facing production URL shortener walkthrough is scalability-url-shortener-v2.`,
  followUpQuestions: [
    ...(legacyProblem.followUpQuestions || []),
    'Which missing detail would most reduce confidence in the candidate answer: collision handling, cache fallback, async analytics, or abuse prevention?',
    'How would you distinguish a memorized answer from one that understands redirect-path trade-offs?'
  ],
  metadata: {
    reviewStatus: 'legacy',
    visibility: ['dev'],
    contentRole: 'legacy-reference',
    productionReplacementId: 'scalability-url-shortener-v2',
    relatedTeachingProblemId: 'scalability-url-shortener-v2'
  }
});

export default problem;
