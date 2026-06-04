const slidingWindowMaxSumK = {
  id: 'sliding-window-001',
  type: 'coding',
  topicId: 'sliding-window',
  title: 'Maximum Sum Subarray of Size K',
  difficulty: 'Medium',
  estimatedTime: '8 min',
  tags: [
    'dsa',
    'sliding-window',
    'wind',
    'fixed-size-window',
    'maximum-sum',
    'array',
    'invariant',
    'rolling-aggregate'
  ],
  scenario:
    'You are building a lightweight analytics feature for a payments dashboard. Given a stream of daily transaction volumes, the product team wants to know the highest total volume seen in any continuous K-day period. For example, if each number is one day of volume, the answer should come from one contiguous block of exactly K days.',
  question:
    'Given nums = [2, 1, 5, 1, 3, 2] and k = 3, find the maximum sum of any contiguous subarray of exactly size k. Output: 9, because the best window is [5, 1, 3].',
  examples: [
    'Input: nums = [2, 1, 5, 1, 3, 2], k = 3 → Output: 9',
    'Window sums: [2,1,5] = 8, [1,5,1] = 7, [5,1,3] = 9, [1,3,2] = 6'
  ],
  constraints: [
    'The window must contain exactly k elements, not at most k elements.',
    'If k is larger than the array length, the problem input is invalid or should return a clear fallback depending on product requirements.',
    'Negative numbers are allowed, so do not initialize the answer to 0 unless the problem guarantees non-negative input.',
    'The target runtime should be O(n), because each element should enter and leave the active window at most once.'
  ],
  starterThought:
    'This is a fixed-size sliding window problem. The invariant is: after the first full window is formed, windowSum always represents the sum of exactly k contiguous elements between left and right. Every transition removes the value leaving the left side of the window and adds the value entering from the right.',
  intuition:
    'Key Insight — Reuse Overlap: neighboring fixed-size windows share k - 1 elements. Instead of recomputing the sum of every window from scratch, carry a rolling sum. The transition is always: newWindowSum = oldWindowSum - outgoingValue + incomingValue.',
  visualExplanation:
    'Build the first full window [2, 1, 5] with sum 8. Then slide by one position at a time: remove the leftmost value, add the new rightmost value, and update the best sum seen.',
  patternSignal:
    'The phrase “contiguous subarray of exactly size k” is the strongest signal for a fixed-size sliding window. The state is small: left, right, windowSum, and maxSum.',
  invariant:
    'At the end of each transition, windowSum equals the sum of exactly k elements from left to right, and maxSum equals the best valid window sum seen so far.',
  hints: [
    'Start by computing the sum of the first k elements.',
    'When the window moves one step right, only two values change: one leaves, one enters.',
    'Do not recompute the sum of every k-sized block from scratch.',
    'Update maxSum after each valid k-sized window is formed.'
  ],
  visualWalkthrough: {
    title: 'Fixed-size sliding window',
    summary: 'Track one rolling window of size 3. Each transition removes the outgoing value, adds the incoming value, and updates the best sum.',
    diagram: {
      type: 'array',
      variant: 'sliding-window',
      title: 'Maximum Sum Subarray of Size K',
      description: 'The highlighted cells form the current fixed-size window. Captions show which value leaves, which value enters, and where the best answer is found.',
      values: [2, 1, 5, 1, 3, 2],
      stateTitle: 'Window transition evolution',
      stateDescription: 'Each row captures the exact rolling transition: outgoing value, incoming value, windowSum, and maxSum.',
      legend: [
        { role: 'window', marker: '▣', label: 'Current window' },
        { role: 'remove', marker: '−', label: 'Outgoing value' },
        { role: 'add', marker: '+', label: 'Incoming value' },
        { role: 'best', marker: '★', label: 'Best window' }
      ],
      frames: [
        {
          title: 'Initialize first full window',
          activeRange: [0, 2],
          items: [
            { index: 0, role: 'window', caption: 'left' },
            { index: 1, role: 'window', caption: 'inside' },
            { index: 2, role: 'window', caption: 'right' }
          ],
          state: {
            label: 'Window [0..2]',
            values: { left: 0, right: 2, outgoing: '-', incoming: '-', windowSum: 8, maxSum: 8 },
            helper: '2 + 1 + 5 = 8. First valid answer candidate is 8.'
          },
          description: 'Build the first valid window of exactly k = 3 elements. Since this is the first valid window, both windowSum and maxSum become 8.'
        },
        {
          title: 'Transition: slide to [1..3]',
          activeRange: [1, 3],
          items: [
            { index: 0, role: 'remove', caption: 'remove 2' },
            { index: 1, role: 'window', caption: 'left' },
            { index: 2, role: 'window', caption: 'inside' },
            { index: 3, role: 'add', caption: 'add 1' }
          ],
          state: {
            label: 'Window [1..3]',
            values: { left: 1, right: 3, outgoing: 2, incoming: 1, windowSum: 7, maxSum: 8 },
            helper: 'Previous sum 8 - outgoing 2 + incoming 1 = 7.'
          },
          description: 'Slide the window one step right. The old left value 2 exits, the new right value 1 enters, and maxSum remains 8 because 7 is smaller.'
        },
        {
          title: 'Transition: slide to [2..4]',
          activeRange: [2, 4],
          items: [
            { index: 1, role: 'remove', caption: 'remove 1' },
            { index: 2, role: 'best', caption: 'left' },
            { index: 3, role: 'best', caption: 'inside' },
            { index: 4, role: 'add', caption: 'add 3' }
          ],
          state: {
            label: 'Window [2..4]',
            values: { left: 2, right: 4, outgoing: 1, incoming: 3, windowSum: 9, maxSum: 9 },
            helper: 'Previous sum 7 - outgoing 1 + incoming 3 = 9.'
          },
          description: 'This transition finds the best window. The current window [5, 1, 3] sums to 9, so maxSum is updated from 8 to 9.'
        },
        {
          title: 'Transition: slide to [3..5]',
          activeRange: [3, 5],
          items: [
            { index: 2, role: 'remove', caption: 'remove 5' },
            { index: 3, role: 'window', caption: 'left' },
            { index: 4, role: 'window', caption: 'inside' },
            { index: 5, role: 'add', caption: 'add 2' }
          ],
          state: {
            label: 'Window [3..5]',
            values: { left: 3, right: 5, outgoing: 5, incoming: 2, windowSum: 6, maxSum: 9 },
            helper: 'Previous sum 9 - outgoing 5 + incoming 2 = 6.'
          },
          description: 'The final valid window sums to 6. It does not beat the best sum 9, so maxSum stays unchanged.'
        },
        {
          title: 'Return maxSum',
          activeRange: [2, 4],
          items: [
            { index: 2, role: 'best', caption: 'best' },
            { index: 3, role: 'best', caption: 'best' },
            { index: 4, role: 'best', caption: 'best' }
          ],
          state: {
            label: 'Answer',
            values: { bestWindow: '[5,1,3]', maxSum: 9 },
            helper: 'All valid windows have been checked exactly once.'
          },
          description: 'The maximum sum among all fixed-size windows is 9, produced by the window [5, 1, 3].',
          finalResult: {
            title: 'Final answer',
            body: 'Maximum sum subarray of size 3 = 9.'
          }
        }
      ]
    }
  },
  stepByStepBreakdown: [
    'Build the first window using the first k elements: [2, 1, 5] gives sum 8.',
    'Set maxSum to the first full window sum, because it is the first valid candidate.',
    'Move the window one position right by removing nums[left] and adding nums[right].',
    'For [1, 5, 1], compute 8 - 2 + 1 = 7, so maxSum remains 8.',
    'For [5, 1, 3], compute 7 - 1 + 3 = 9, so maxSum becomes 9.',
    'For [1, 3, 2], compute 9 - 5 + 2 = 6, so maxSum remains 9.',
    'Return maxSum after all valid windows have been checked.'
  ],
  bruteForceThought:
    'The brute-force approach tries every subarray of size k and sums each one independently. For n items and window size k, this costs O(n × k), because every window repeats almost all the previous work.',
  optimizationJourney:
    'The optimization comes from noticing overlap. Consecutive k-sized windows share k - 1 elements. Instead of recomputing the full sum, maintain a running windowSum and update it with only the outgoing and incoming elements.',
  finalPattern: 'Fixed-size Sliding Window',
  complexityAnalysis:
    'Time complexity is O(n): the first window costs O(k), then each remaining element is processed once as it enters the window. Space complexity is O(1), because only windowSum, maxSum, and pointer/index values are stored.',
  explanation:
    'For nums = [2, 1, 5, 1, 3, 2] and k = 3, the valid windows are [2,1,5] = 8, [1,5,1] = 7, [5,1,3] = 9, and [1,3,2] = 6. The maximum is 9. The key is that the active window always has exactly k elements, so every update is safe and predictable: subtract the element that leaves, add the element that enters, then compare with the best answer so far.',
  engineeringInsight:
    'This mirrors production rolling metrics: you rarely recompute an entire time window from scratch. You maintain a rolling aggregate and update it as new data arrives and old data expires.',
  commonMistake:
    'A common mistake is updating maxSum before the window has exactly k elements, or initializing maxSum to 0 when all numbers could be negative.',
  commonMistakes: [
    'Using a variable-size window when the problem requires exactly k elements.',
    'Recomputing every window sum from scratch.',
    'Updating the result before the first full window exists.',
    'Initializing maxSum to 0 when negative values are possible.',
    'Forgetting the invalid case where k is 0 or k is larger than nums.length.'
  ],
  productionReality:
    'The same pattern appears in rolling revenue totals, moving averages, rate-limit windows, observability metrics, fraud checks over recent transactions, and time-bucketed monitoring dashboards.',
  followUpQuestion:
    'How would the solution change if the window size was not fixed, for example longest subarray with sum at most S?',
  followUpQuestions: [
    'How would you handle a stream where values arrive continuously?',
    'What changes if the requirement asks for the average instead of the sum?',
    'How would negative numbers affect the approach?',
    'How would you return the actual window indices, not just the sum?'
  ],
  relatedConcepts: [
    'Fixed-size Sliding Window',
    'rolling aggregate',
    'contiguous subarray',
    'invariant',
    'O(n) optimization'
  ],
  references: [
    'Pattern: Fixed-size Sliding Window',
    'Example input: nums = [2, 1, 5, 1, 3, 2], k = 3',
    'Production analogy: rolling K-day transaction volume'
  ]
};

export default slidingWindowMaxSumK;
