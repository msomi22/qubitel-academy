import { defineLearningProblem } from '../../../../problems/problemAuthoring.js';

const problem = defineLearningProblem({
  id: 'java-core-checked-vs-unchecked-exceptions-001',
  topicId: 'java-core',
  title: 'Checked vs Unchecked Exceptions',
  difficulty: 'Medium',
  prompt: 'Compare checked and unchecked exceptions in Java. Explain when the compiler forces handling, when RuntimeException is appropriate, and how exception choices affect API design.',
  tags: ['java', 'exceptions', 'api-design'],
  body: [
    {
      type: 'section',
      title: 'Core distinction',
      content: 'Checked exceptions must be caught or declared. Unchecked exceptions usually represent programming errors or invalid runtime conditions and do not require catch-or-declare handling.'
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'Do not overuse checked exceptions',
      content: 'Checked exceptions are useful when callers can realistically recover, but they can make APIs noisy when recovery is not expected.'
    }
  ],
  explanation: 'A good answer separates compiler rules from design intent: checked exceptions are part of the method contract, while unchecked exceptions usually signal bugs or invalid usage.',
  metadata: {
    reviewStatus: 'draft',
    visibility: ['dev']
  }
});

export default problem;
