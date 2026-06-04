import { defineMcqProblem } from '../../../../../problems/problemAuthoring.js';

const question = 'Why does a fixed-size Sliding Window solution for maximum sum of size k run in O(n) instead of recomputing every length-k sum from scratch?';

const problem = defineMcqProblem({
  id: 'sliding-window-fixed-window-rolling-state-001',
  topicId: 'sliding-window',
  category: 'dsa',
  title: 'Rolling Sum vs Recomputing',
  difficulty: 'Easy',
  estimatedTime: '5 min',
  tags: [
    'arrays',
    'sliding-window',
    'fixed-window',
    'complexity',
    'rolling-sum',
    'mcq'
  ],
  prompt: question,
  options: [
    'Because each slide reuses the previous sum by subtracting the outgoing value and adding the incoming value, so each index is processed a constant number of times.',
    'Because the algorithm sorts the array first, making every future window lookup constant time.',
    'Because the left pointer can move backward to reuse older values whenever the sum becomes smaller.',
    'Because fixed-size windows skip most indices and only inspect every kth value.'
  ],
  correctAnswer: 0,
  explanation: 'A fixed-size window is efficient because adjacent windows overlap. After the first length-k sum is built, the next window differs by only two boundary values: one outgoing value and one incoming value. The rolling update is O(1) per slide, so the full scan is O(n). Recomputing every length-k window from scratch would repeat work on the shared middle values and can cost O(n * k).',
  workedExample: {
    input: 'nums = [2, 1, 5, 1, 3], k = 3',
    trace: [
      { window: '[2, 1, 5]', sum: 8, note: 'build the first valid sum' },
      { window: '[1, 5, 1]', update: '8 - 2 + 1 = 7', note: 'reuse shared values 1 and 5' },
      { window: '[5, 1, 3]', update: '7 - 1 + 3 = 9', note: 'reuse shared values 5 and 1' }
    ]
  },
  hints: [
    'Compare two neighboring windows and look at how much they overlap.',
    'Only the left boundary and right boundary change after a one-step slide.'
  ],
  commonMistake: 'A common mistake is summing all k values for every candidate window. That works for small input, but it repeats the same middle values many times and hides the main reason Sliding Window is useful.',
  commonMistakes: [
    'Recomputing each window sum from scratch.',
    'Thinking O(n) comes from skipping values. It does not; every value is still handled safely.',
    'Assuming the left pointer moves backward. Sliding Window pointers move forward.'
  ],
  complexityAnalysis: 'Time is O(n) because each value enters the rolling state once and leaves it at most once. Extra space is O(1) because the algorithm stores only the rolling sum, the best answer, and indexes.',
  relatedConcepts: ['rolling state', 'time complexity', 'fixed-size window', 'overlap reuse'],
  body: [
    { type: 'callout', tone: 'info', title: 'Question', content: question },
    { type: 'callout', tone: 'info', title: 'Why O(n)?', content: 'The algorithm does not skip work incorrectly. It avoids repeated work by updating only the two values that changed between neighboring windows.' },
    { type: 'callout', tone: 'warning', title: 'Avoid recomputing', content: 'If every candidate recomputes k values, the solution loses the main benefit of Sliding Window.' }
  ],
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod']
  }
});

export default problem;
