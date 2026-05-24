import { defineMcqProblem } from '../../../../problems/problemAuthoring.js';

const problem = defineMcqProblem({
  id: 'sliding-window-fixed-window-update-timing-001',
  topicId: 'sliding-window',
  category: 'dsa',
  title: 'When Should Best Update?',
  difficulty: 'Easy',
  estimatedTime: '6 min',
  tags: [
    'arrays',
    'sliding-window',
    'fixed-window',
    'answer-update',
    'rolling-state',
    'mcq'
  ],
  prompt: 'You are scanning nums with a fixed window size k and a rolling sum. Which update order is correct?',
  options: [
    'Add nums[right]. If the window has more than k values, subtract nums[left] and move left. Update best only when the window has exactly k values.',
    'Update best immediately after every add, even when the window has fewer than k values, because every prefix is a candidate.',
    'Move left before adding nums[right], so the window never has a chance to become full.',
    'Whenever the sum changes, shrink repeatedly while possible, just like a variable-size window.'
  ],
  correctAnswer: 0,
  explanation: 'For a fixed-size rolling sum, right adds the incoming value. If the window grows beyond k values, remove the outgoing left value and move left once. Then update best only when the current window has exactly k values. Partial windows are not valid candidates. A fixed-size window also should not shrink repeatedly like a variable-size window because the invariant is length exactly k, not a condition such as sum >= target or distinct count <= k.',
  workedExample: {
    input: 'nums = [2, 1, 5, 1, 3], k = 3',
    trace: [
      { right: 0, action: 'add 2', window: '[2]', validForBest: false },
      { right: 1, action: 'add 1', window: '[2, 1]', validForBest: false },
      { right: 2, action: 'add 5', window: '[2, 1, 5]', validForBest: true, bestCanUpdate: true },
      { right: 3, action: 'add 1, then remove outgoing 2', window: '[1, 5, 1]', validForBest: true, bestCanUpdate: true }
    ]
  },
  hints: [
    'The answer should describe a window that is currently valid.',
    'For fixed-size windows, repair means removing one outgoing value after the window becomes too large.',
    'Do not use a variable-window shrink loop unless validity is controlled by a condition.'
  ],
  commonMistake: 'A common mistake is copying variable-window logic and shrinking repeatedly. In a fixed-size window, the target length is already known, so after the first full window, each slide removes exactly one outgoing value for each incoming value.',
  commonMistakes: [
    'Updating best for partial windows before size reaches k.',
    'Moving left too early, which prevents the first valid window from forming.',
    'Shrinking in a loop even though the required length is exactly k.',
    'Recomputing the full window sum instead of maintaining a rolling sum.'
  ],
  complexityAnalysis: 'The fixed-size rolling-sum pattern is O(n) time because each right index is processed once and each outgoing left value is removed at most once. It uses O(1) extra space for left, windowSum, and best.',
  relatedConcepts: ['answer update timing', 'fixed-size invariant', 'rolling state', 'variable window contrast'],
  body: [
    { type: 'callout', tone: 'info', title: 'Correct timing', content: 'Update best only when the current state represents a complete length-k window.' },
    { type: 'callout', tone: 'warning', title: 'Fixed is not variable', content: 'A fixed-size window does not shrink while a condition is true. It slides by removing one outgoing value when the size would exceed k.' }
  ],
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod']
  }
});

export default problem;
