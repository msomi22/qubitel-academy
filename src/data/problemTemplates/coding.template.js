// Copy this file into src/academies/tech/dsa/<topicId>/practice/<problem-id>.js
// Required fields: id, type, category, topicId, title, difficulty, prompt/question.
// Use type "coding" to match existing quiz behavior. "code" is also registered for future use.

const problem = {
  id: 'dsa-topic-unique-id',
  type: 'coding',
  category: 'dsa',
  topicId: 'sliding-window',
  title: 'Replace with coding problem title',
  difficulty: 'Medium',
  tags: ['dsa', 'sliding-window', 'coding'],
  question: 'Explain the algorithm, invariant, edge cases, and complexity.',
  constraints: [
    'Input size can be large.',
    'State time and space complexity.'
  ],
  hints: [
    'Identify the invariant before writing code.'
  ],
  explanation: 'Describe the intended reasoning path and common mistakes.',
  metadata: {
    source: 'authoring-template'
  }
};

export default problem;
