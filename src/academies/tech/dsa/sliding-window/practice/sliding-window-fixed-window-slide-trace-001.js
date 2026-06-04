import { defineMcqProblem } from '../../../../../problems/problemAuthoring.js';

const question = 'nums = [2, 1, 5, 1, 3], k = 3. The current window is indices 0..2, or [2, 1, 5]. It slides one step to indices 1..3, or [1, 5, 1]. Which value leaves, which value enters, and how should the rolling sum change?';

const problem = defineMcqProblem({
  id: 'sliding-window-fixed-window-slide-trace-001',
  topicId: 'sliding-window',
  category: 'dsa',
  title: 'Which Value Leaves and Enters?',
  difficulty: 'Easy',
  estimatedTime: '6 min',
  tags: ['arrays', 'sliding-window', 'fixed-window', 'rolling-sum', 'trace', 'mcq'],
  prompt: question,
  options: [
    '2 leaves, 1 enters, so newSum = oldSum - 2 + 1.',
    '1 leaves, 2 enters, so newSum = oldSum - 1 + 2.',
    '5 leaves, 1 enters, so newSum = oldSum - 5 + 1.',
    'Nothing leaves; just add 1 because the right pointer moved.'
  ],
  correctAnswer: 0,
  explanation: 'Sliding from indices 0..2 to indices 1..3 removes the old left value nums[0] = 2 and includes the new right value nums[3] = 1. If the old window sum is 2 + 1 + 5 = 8, the new rolling sum is 8 - 2 + 1 = 7. The window still has exactly k values: [1, 5, 1]. This is the key fixed-window state update: one value leaves, one value enters, and the rest of the window is reused.',
  workedExample: {
    input: 'nums = [2, 1, 5, 1, 3], k = 3',
    trace: [
      { window: '[2, 1, 5]', indices: '0..2', sum: 8, best: 8 },
      { action: 'slide one step', outgoing: 'nums[0] = 2', incoming: 'nums[3] = 1' },
      { window: '[1, 5, 1]', indices: '1..3', sum: 7, best: 8 }
    ]
  },
  visualWalkthrough: {
    diagram: {
      type: 'array',
      variant: 'sliding-window',
      title: 'Fixed-size window slide',
      description: 'Watch one value leave and one value enter while the window keeps size k.',
      values: [2, 1, 5, 1, 3],
      stateTitle: 'Rolling state',
      stateDescription: 'The rolling sum changes by subtracting the outgoing value and adding the incoming value.',
      legend: [
        { role: 'window', label: 'current window' },
        { role: 'remove', label: 'outgoing value' },
        { role: 'current', label: 'incoming value' },
        { role: 'answer', label: 'best update' }
      ],
      frames: [
        { title: 'First full window [0..2]', activeRange: [0, 2], items: [{ index: 0, role: 'window', caption: 'left' }, { index: 2, role: 'window', caption: 'right' }], state: { label: 'valid', role: 'success', values: ['window [2, 1, 5]', 'sum 8', 'best 8', 'size 3'], helper: 'This is the first complete length-k window.' }, description: 'The first valid fixed window contains exactly three values, so best is initialized to 8.' },
        { title: 'Slide right: remove 2, add 1', activeRange: [1, 3], items: [{ index: 0, role: 'remove', caption: 'leaves 2' }, { index: 3, role: 'current', caption: 'enters 1' }], state: { label: 'rolling update', role: 'neutral', values: ['old sum 8', 'subtract 2', 'add 1', 'new sum 7'], helper: 'Only the boundary values change. The shared middle values stay in the window.' }, description: 'The rolling state avoids recomputing 1 + 5 + 1 from scratch.' },
        { title: 'New window [1..3]', activeRange: [1, 3], items: [{ index: 1, role: 'window', caption: 'left' }, { index: 3, role: 'window', caption: 'right' }], state: { label: 'valid', role: 'success', values: ['window [1, 5, 1]', 'sum 7', 'best remains 8', 'size 3'], helper: 'The window is still valid because it still has exactly k values.' }, description: 'After the slide, compare the valid rolling sum with best. Since 7 is less than 8, best stays 8.' },
        { title: 'Next slide: remove 1, add 3', activeRange: [2, 4], items: [{ index: 1, role: 'remove', caption: 'leaves 1' }, { index: 4, role: 'current', caption: 'enters 3' }], state: { label: 'best update', role: 'answer', values: ['old sum 7', 'subtract 1', 'add 3', 'new sum 9', 'best becomes 9'], helper: 'Again, one value leaves and one value enters.' }, description: 'The next valid window is [5, 1, 3] with sum 9, so best improves to 9.' }
      ]
    }
  },
  hints: [
    'The outgoing value is the old left boundary.',
    'The incoming value is the new right boundary.',
    'The middle values are shared, so the rolling sum only changes by the two boundary values.'
  ],
  commonMistake: 'A common mistake is only adding the incoming value and forgetting to subtract the outgoing value. That grows the state beyond k values and no longer represents a fixed-size window.',
  commonMistakes: [
    'Subtracting the wrong index when the window moves.',
    'Adding the incoming value without removing the outgoing value.',
    'Recomputing the full sum every time instead of using the rolling update.'
  ],
  relatedConcepts: ['outgoing value', 'incoming value', 'rolling sum', 'fixed-size invariant'],
  body: [
    { type: 'callout', tone: 'info', title: 'Question', content: question }
  ],
  metadata: { reviewStatus: 'approved', visibility: ['dev', 'prod'] }
});

export default problem;
