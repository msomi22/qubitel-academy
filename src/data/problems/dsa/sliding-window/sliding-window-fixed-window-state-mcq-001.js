import { defineMcqProblem } from '../../../../problems/problemAuthoring.js';

const question = 'nums = [2, 1, 5, 1, 3] and k = 3. When does the first valid fixed-size window exist, and when should best first be updated?';

const problem = defineMcqProblem({
  id: 'sliding-window-fixed-window-state-mcq-001',
  topicId: 'sliding-window',
  category: 'dsa',
  title: 'Fixed Window State MCQ',
  difficulty: 'Easy',
  estimatedTime: '5 min',
  tags: [
    'arrays',
    'sliding-window',
    'fixed-window',
    'window-invariant',
    'mcq',
    'foundation'
  ],
  prompt: question,
  options: [
    'After index 0 is included, because the first number can already be compared as a candidate answer.',
    'After index 1 is included, because the window has started growing and contains multiple values.',
    'After index 2 is included, because indices 0..2 form the first window with exactly k = 3 values, so best can first be updated then.',
    'Only after index 3 is included, because a slide must happen before any fixed-size window is valid.'
  ],
  correctAnswer: 2,
  explanation: 'A fixed-size window is valid only when it contains exactly k contiguous values. With k = 3, the first valid window is nums[0..2] = [2, 1, 5]. That is the first moment when best can be updated. Updating best at index 0 or index 1 would record a partial window, which is not a length-3 candidate. Waiting until after index 3 is also too late because the first valid window already existed at indices 0..2.',
  workedExample: {
    input: 'nums = [2, 1, 5, 1, 3], k = 3',
    trace: [
      { right: 0, window: '[2]', size: 1, valid: false, reason: 'size is less than k' },
      { right: 1, window: '[2, 1]', size: 2, valid: false, reason: 'size is still less than k' },
      { right: 2, window: '[2, 1, 5]', size: 3, valid: true, reason: 'size equals k, so best can first update' }
    ]
  },
  hints: [
    'Fixed-size means exactly k elements, not at most k elements.',
    'Ask whether the current window is a complete length-k candidate before updating best.'
  ],
  commonMistake: 'A common mistake is updating best while the window is still partial. For k = 3, [2] and [2, 1] are useful setup state, but they are not valid answers.',
  commonMistakes: [
    'Treating every prefix as a candidate window before it reaches size k.',
    'Waiting for the first slide even though the first complete window is already valid.',
    'Forgetting that fixed-size windows are contiguous and must have exactly k values.'
  ],
  relatedConcepts: ['fixed-size window invariant', 'first valid window', 'answer update timing'],
  body: [
    { type: 'callout', tone: 'info', title: 'Invariant', content: 'For this task, a valid fixed-size window always contains exactly k contiguous elements.' },
    { type: 'callout', tone: 'warning', title: 'Do not update too early', content: 'Before right reaches index 2, the current window has fewer than 3 values, so it is only setup state.' }
  ],
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod']
  }
});

export default problem;
