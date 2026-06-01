const visualWalkthrough = {
  title: 'Maximum Sum Subarray of Size K — visual walkthrough',
  summary: 'Think of a fixed-size sliding window as a 3-slot frame moving across the array. The frame keeps most of its old work: one value leaves, one value enters, and the rolling sum changes in O(1).',
  diagram: {
    type: 'array',
    variant: 'sliding-window',
    title: 'Watch the 3-slot window move across nums = [2, 1, 5, 1, 3, 2]',
    description: 'The visual focuses on the mental picture: a fixed-width frame slides one index at a time while windowSum and bestSum travel with it.',
    values: [2, 1, 5, 1, 3, 2],
    stateTitle: 'What the computer remembers',
    stateDescription: 'Instead of remembering every previous subarray, the algorithm keeps only the current window, the rolling sum, and the best sum seen so far.',
    frames: [
      {
        title: 'Mental picture: fixed 3-slot frame',
        activeRange: [0, 2],
        items: [
          { index: 0, role: 'window', caption: 'slot 1' },
          { index: 1, role: 'window', caption: 'slot 2' },
          { index: 2, role: 'window', caption: 'slot 3' }
        ],
        state: {
          role: 'window',
          label: 'Invariant before we start',
          values: { k: 3, frame: 'exactly 3 items', rule: 'slide by 1' },
          helper: 'At every valid step, the frame must contain exactly k contiguous values. We do not grow and shrink randomly here.'
        },
        description: 'Picture a 3-slot frame placed over the array. The frame can move, but its width never changes.'
      },
      {
        title: 'Build the first candidate once',
        activeRange: [0, 2],
        items: [
          { index: 0, role: 'window', caption: '2' },
          { index: 1, role: 'window', caption: '+ 1' },
          { index: 2, role: 'window', caption: '+ 5' }
        ],
        state: {
          role: 'answer',
          label: 'window [0..2]',
          values: { window: '[2, 1, 5]', formula: '2 + 1 + 5', windowSum: 8, bestSum: 8 },
          helper: 'The first full frame is the first valid answer candidate, so bestSum starts at 8.'
        },
        description: 'First compute the sum of the first k values. This is the only time we add all k values from scratch.'
      },
      {
        title: 'Slide right: reuse most of the work',
        activeRange: [1, 3],
        items: [
          { index: 0, role: 'remove', caption: 'remove 2' },
          { index: 1, role: 'window', caption: 'keep' },
          { index: 2, role: 'window', caption: 'keep' },
          { index: 3, role: 'current', caption: 'add 1' }
        ],
        state: {
          role: 'window',
          label: 'window [1..3]',
          values: { outgoing: 2, incoming: 1, formula: '8 - 2 + 1', windowSum: 7, bestSum: 8 },
          helper: 'The middle values 1 and 5 are reused. Only the outgoing and incoming values change the sum.'
        },
        description: 'The new frame is [1, 5, 1]. We do not recompute 1 + 5 + 1; we update the old sum: 8 - 2 + 1 = 7.'
      },
      {
        title: 'Slide again: the best window appears',
        activeRange: [2, 4],
        items: [
          { index: 1, role: 'remove', caption: 'remove 1' },
          { index: 2, role: 'answer', caption: 'best' },
          { index: 3, role: 'answer', caption: 'best' },
          { index: 4, role: 'answer', caption: 'add 3' }
        ],
        state: {
          role: 'answer',
          label: 'window [2..4]',
          values: { outgoing: 1, incoming: 3, formula: '7 - 1 + 3', windowSum: 9, bestSum: 9 },
          helper: 'The rolling sum becomes 9, which beats the previous best of 8. The answer candidate changes to [5, 1, 3].'
        },
        description: 'This is the key moment: [5, 1, 3] has sum 9, so bestSum is upgraded from 8 to 9.'
      },
      {
        title: 'Final slide: check the last valid frame',
        activeRange: [3, 5],
        items: [
          { index: 2, role: 'remove', caption: 'remove 5' },
          { index: 3, role: 'window', caption: 'keep' },
          { index: 4, role: 'window', caption: 'keep' },
          { index: 5, role: 'current', caption: 'add 2' }
        ],
        state: {
          role: 'window',
          label: 'window [3..5]',
          values: { outgoing: 5, incoming: 2, formula: '9 - 5 + 2', windowSum: 6, bestSum: 9 },
          helper: 'The final window [1, 3, 2] gives 6, so it does not beat the best window.'
        },
        description: 'The last valid 3-slot frame has sum 6. The best value remains 9.'
      },
      {
        title: 'Return the remembered best value',
        activeRange: [2, 4],
        items: [
          { index: 2, role: 'answer', caption: '5' },
          { index: 3, role: 'answer', caption: '+ 1' },
          { index: 4, role: 'answer', caption: '+ 3' }
        ],
        state: {
          role: 'answer',
          label: 'answer window [2..4]',
          values: { bestWindow: '[5, 1, 3]', bestSum: 9, extraSpace: 'O(1)' },
          helper: 'The computer never needed to store all windows. It only carried the current sum and the best sum.'
        },
        description: 'Return bestSum = 9 because no size-3 window produced a higher sum.',
        finalResult: { title: 'Final answer', body: 'Return 9 from the window [5, 1, 3].' }
      }
    ]
  },
  productionMapping: [
    'Rolling transaction-volume dashboards over the last k minutes',
    'Fraud detection counters where only the newest event enters and the oldest event leaves',
    'API rate-limit windows that track recent request totals',
    'Moving averages in observability pipelines without recalculating the whole range'
  ]
};

export default visualWalkthrough;
