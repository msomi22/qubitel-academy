// Copy this file into src/academies/tech/system/<topicId>/practice/<problem-id>.js
// Required common fields: id, type, category, topicId, title, difficulty, prompt/question.
// Complex system design may also use: scenario, requirements, constraints, hints,
// expectedAnswerOutline, scoringRubric, scoringDictionary, modelAnswer,
// commonWeakAnswers, finalPattern.

const problem = {
  id: 'complex-system-topic-unique-id',
  type: 'complex-system-design',
  category: 'system',
  topicId: 'scalability',
  title: 'Design a Production System',
  difficulty: 'Hard',
  tags: ['system', 'complex-system-design'],
  scenario: 'Describe the product and operational context.',
  question: 'Design the system and explain key trade-offs.',
  requirements: [
    'Functional requirement one',
    'Non-functional requirement one'
  ],
  constraints: [
    'Expected traffic, latency, availability, consistency, or cost constraint'
  ],
  hints: [
    'Think about bottlenecks, failure modes, and observability.'
  ],
  expectedAnswerOutline: [
    'API and data model',
    'Storage and scaling strategy',
    'Failure handling and observability'
  ],
  scoringRubric: [
    'Clear requirements and assumptions',
    'Correct scalable architecture',
    'Operational maturity'
  ],
  scoringDictionary: {
    scalability: ['partitioning', 'horizontal scaling', 'load balancing'],
    reliability: ['retry', 'idempotency', 'fallback', 'monitoring']
  },
  modelAnswer: 'Add a concise model answer here.',
  commonWeakAnswers: [
    'Only drawing components without explaining behavior under failure.'
  ],
  finalPattern: 'Scalability',
  metadata: {
    source: 'authoring-template'
  }
};

export default problem;
