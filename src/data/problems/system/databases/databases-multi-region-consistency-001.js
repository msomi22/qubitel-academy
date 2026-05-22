import { defineMcqProblem } from '../../../../problems/problemAuthoring.js';
import { systemDesignMcqsByTopic } from '../../../banks/system/real-world-mcqs.js';

const legacyProblem = systemDesignMcqsByTopic.databases.find(
  (question) => question.id === 'databases-multi-region-consistency-001'
);

if (!legacyProblem) {
  throw new Error('Missing legacy problem databases-multi-region-consistency-001 during migration.');
}

const problem = defineMcqProblem({
  ...legacyProblem,
  visualExplanation: 'Two-path architecture\nCatalog browsing path: regional cache/read replica -> fast reads, accepts short staleness\nFinancial transaction path: strongly consistent system of record -> correctness first, higher coordination cost',
  distractorExplanations: [
    'Using the same consistency model everywhere is too blunt: it can make low-risk reads slow or high-risk transactions unsafe.',
    'Correct. Catalog reads can often tolerate short staleness, while financial transactions need stronger correctness guarantees.',
    'Browser cache is not a trustworthy system of record and cannot enforce financial correctness.',
    'Disabling regional deployments simplifies one concern, but sacrifices global latency, resilience, and availability goals.'
  ],
  selfExplanationPrompt: 'Name one workflow that can tolerate stale data and one workflow that must not. Explain the business risk behind each choice.',
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod']
  }
});

export default problem;
