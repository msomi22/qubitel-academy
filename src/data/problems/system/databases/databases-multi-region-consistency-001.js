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
  mentalPicture: 'Think of the system as having two lanes. The browsing lane can be fast and slightly stale, like a catalog copy in each region. The money lane must go through the trusted source of record so balances and payments stay correct.',
  visualExplanation: 'Two-path architecture\nCatalog browsing path: regional cache/read replica -> fast reads, accepts short staleness\nFinancial transaction path: strongly consistent system of record -> correctness first, higher coordination cost\nDesign rule: choose consistency per workflow, not once for the whole company.',
  productionReality: 'In production, multi-region design is usually mixed. Product pages, search results, and recommendations often tolerate brief staleness, while payments, inventory reservations, account balances, and order state transitions need stronger correctness guarantees.',
  commonMistake: 'A common mistake is using one consistency model for everything. Strong consistency everywhere can make harmless reads slow; eventual consistency everywhere can make critical transactions incorrect.',
  finalTakeaway: 'Pick consistency based on business risk: stale catalog data is usually acceptable, but stale financial or ownership data is not.',
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
