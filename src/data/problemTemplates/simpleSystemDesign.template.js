// Copy this file into src/academies/tech/system/<topicId>/practice/<problem-id>.js
// Required fields: id, type, category, topicId, title, difficulty, prompt/question.
// Optional fields: constraints, hints, explanation, scoring, metadata.

const problem = {
  id: 'system-topic-unique-id',
  type: 'simple-system-design',
  category: 'system',
  topicId: 'scalability',
  title: 'Replace with a system design prompt title',
  difficulty: 'Medium',
  tags: ['system', 'scalability'],
  question: 'Describe the design decision and explain the operational trade-offs.',
  constraints: [
    'State assumptions clearly.',
    'Discuss failure behavior.',
    'Include monitoring and rollback signals.'
  ],
  hints: [
    'Start from the bottleneck.',
    'Name the trade-off you accept.'
  ],
  explanation: 'Describe what a strong answer should include.',
  metadata: {
    source: 'authoring-template'
  }
};

export default problem;
