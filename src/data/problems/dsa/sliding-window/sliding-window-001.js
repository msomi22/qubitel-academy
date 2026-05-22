import { defineProblem } from '../../../../problems/problemAuthoring.js';
import topic from '../../../banks/dsa/sliding-window.js';

const legacyProblem = topic.questions.find((question) => question.id === 'sliding-window-001');

const problem = defineProblem({
  ...legacyProblem,
  category: 'dsa',
  scenario: 'You are solving Maximum Sum Subarray of Size K. Given an array of numbers and a fixed window size k, find the largest sum of any contiguous subarray of length k. The learning goal is to see exactly how a fixed-size window reuses work instead of recomputing each subarray from scratch.',
  starterThought: 'Before writing code, make the window visible. For a fixed-size window, the invariant is: after each move, the active window contains exactly k contiguous elements, windowSum equals the sum of those k elements, and bestSum is the largest valid window sum seen so far.',
  intuition: 'A fixed-size sliding window is like moving a picture frame across the array. Most of the frame stays the same between moves. Instead of adding all k values again, subtract the value that leaves the frame and add the value that enters.',
  stepByStepBreakdown: [
    'Build the first window: 2 + 1 + 5 = 8, so windowSum = 8 and bestSum = 8.',
    'Move right once: remove 2 and add 1. The new sum is 8 - 2 + 1 = 7. bestSum stays 8.',
    'Move right again: remove 1 and add 3. The new sum is 7 - 1 + 3 = 9. bestSum becomes 9.',
    'Move right again: remove 5 and add 2. The new sum is 9 - 5 + 2 = 6. bestSum stays 9.',
    'Return bestSum = 9 because [5, 1, 3] is the highest-sum window of size 3.'
  ],
  workedExample: {
    input: 'arr = [2, 1, 5, 1, 3, 2], k = 3',
    answer: 9,
    trace: [
      { window: '[2, 1, 5]', outgoing: null, incoming: null, windowSum: 8, bestSum: 8 },
      { window: '[1, 5, 1]', outgoing: 2, incoming: 1, windowSum: 7, bestSum: 8 },
      { window: '[5, 1, 3]', outgoing: 1, incoming: 3, windowSum: 9, bestSum: 9 },
      { window: '[1, 3, 2]', outgoing: 5, incoming: 2, windowSum: 6, bestSum: 9 }
    ]
  },
  bruteForceThought: 'The brute-force baseline tries every length-k subarray and sums k numbers each time. For n items, that is roughly (n - k + 1) windows times k work per window, which can become O(n * k).',
  optimizationJourney: 'The repeated work is obvious after the first two windows: [2, 1, 5] and [1, 5, 1] share two values. Sliding window keeps the shared work and changes only the outgoing and incoming values.',
  complexityAnalysis: 'The optimized version runs in O(n) time because each array element enters the window once and leaves the window at most once. It uses O(1) extra space because it stores only windowSum, bestSum, and a few indexes.',
  explanation: 'For Maximum Sum Subarray of Size K, keep a rolling sum for exactly k contiguous elements. First compute the sum of the initial k elements. Then move the window one position at a time by subtracting the outgoing left value and adding the incoming right value. After every move, compare the rolling sum with the best sum seen so far. This preserves the invariant that windowSum always describes the current valid fixed-size window.',
  commonMistake: 'The most common bug is updating bestSum while the window has fewer or more than k elements, or forgetting to subtract the outgoing value before adding the incoming one.',
  commonMistakes: [
    'Recomputing every window from scratch instead of reusing the rolling sum.',
    'Updating the answer before the window has exactly k elements.',
    'Moving only the right pointer and forgetting that the left pointer must move too.',
    'Returning 0 for all-negative arrays instead of initializing from the first valid window.',
    'Forgetting to define behavior when k is 0, k is larger than the array, or the input is empty.'
  ],
  followUpQuestion: 'How would the solution change if k were not fixed and the window had to grow or shrink based on a condition?',
  followUpQuestions: [
    'Can you explain why subtract outgoing and add incoming is enough?',
    'What should the function return when k is larger than the array length?',
    'How would you test all-negative input such as [-5, -2, -7]?',
    'What metric in production resembles this rolling sum pattern?'
  ],
  rendering: {
    ...(legacyProblem.rendering || {}),
    recommendedVisual: 'fixed-window-trace',
    stepFrameSupport: true
  },
  metadata: {
    ...(legacyProblem.metadata || {}),
    reviewStatus: 'approved',
    visibility: ['dev', 'prod']
  }
});

export default problem;
