// Copy this file into src/academies/tech/<category>/<topicId>/practice/<problem-id>.js
// Required fields: id, type, category, topicId, title, difficulty, prompt/question.
// Optional fields: tags, options, answer, explanation, scoring, metadata.

const problem = {
  id: 'replace-with-unique-id',
  type: 'multiple-choice',
  category: 'dsa',
  topicId: 'sliding-window',
  title: 'Replace with a clear title',
  difficulty: 'Easy',
  tags: ['dsa', 'sliding-window'],
  question: 'What is the best answer?',
  options: [
    'Option A',
    'Option B',
    'Option C',
    'Option D'
  ],
  answer: 'Option A',
  explanation: 'Explain why the answer is correct and why the common traps are wrong.',
  scoring: {
    points: 1
  },
  metadata: {
    source: 'authoring-template'
  }
};

export default problem;
