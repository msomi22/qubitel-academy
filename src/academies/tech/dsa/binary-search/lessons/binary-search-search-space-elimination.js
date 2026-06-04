import { defineLearningProblem } from '../../../../../problems/problemAuthoring.js';

const problem = defineLearningProblem({
  id: 'binary-search-search-space-elimination-001',
  topicId: 'binary-search',
  title: 'Binary Search — search space elimination',
  difficulty: 'Easy',
  estimatedTime: '12 min',
  language: 'java',
  tags: ['binary-search', 'arrays', 'interview-pattern', 'mental-model', 'visual-walkthrough', 'coding'],
  scenario: 'Search for a target in a sorted array by repeatedly removing the half that cannot contain the answer.',
  question: 'Given nums = [1, 3, 5, 7, 9, 11] and target = 9, return index 4.',
  prompt: 'Why is binary search about proving which side is impossible, not just guessing the middle?',
  examples: ['Input: nums = [1, 3, 5, 7, 9, 11], target = 9 → Output: 4'],
  constraints: ['The array is sorted in ascending order.', 'Return the target index if found.', 'Return -1 when the target does not exist.'],
  starterThought: 'The middle value is evidence. Use it to discard a whole impossible side.',
  intuition: 'Because the array is sorted, comparing the target with the middle value tells us which half cannot contain the target. If mid is too small, everything to the left is also too small. If mid is too large, everything to the right is also too large.',
  plainLanguageExplanation: 'Because the array is sorted, comparing the target with the middle value tells us which half cannot contain the target.',
  mentalPicture: 'Looking for a word in a dictionary. If the middle word comes before your word alphabetically, every earlier page can be ignored at once.',
  patternSignal: 'You have sorted data or a monotonic yes/no condition, and each check can eliminate half of the remaining search space.',
  invariant: 'If the target exists, it is always inside the current inclusive range [left, right]. Every boundary update must preserve that truth.',
  bruteForceThought: 'Linear search checks values one by one. It is simple, but it does not use the sorted order.',
  optimizationJourney: 'Sorted order gives a monotonic rule: once the middle is too small or too large, an entire side becomes impossible.',
  stepByStepBreakdown: [
    'Start with left = 0 and right = nums.length - 1.',
    'Compute mid inside the active range.',
    'If nums[mid] equals the target, return mid.',
    'If nums[mid] is smaller than the target, eliminate left..mid and move left to mid + 1.',
    'If nums[mid] is larger than the target, eliminate mid..right and move right to mid - 1.',
    'If left passes right, the target is not present.'
  ],
  finalPattern: 'Search space elimination using a monotonic condition.',
  commonMistake: 'Off-by-one boundary updates can cause infinite loops. Each comparison must shrink the search space.',
  commonMistakes: ['Using binary search on unsorted data.', 'Forgetting +1 or -1 when using inclusive boundaries.', 'Returning the mid value instead of the mid index.', 'Not changing the strategy for first/last occurrence variants.'],
  edgeCases: ['Empty array', 'One element', 'Target smaller than all values', 'Target larger than all values', 'Duplicate values if the problem asks for first or last occurrence'],
  complexityAnalysis: 'Time is O(log n) because each step cuts the remaining search space roughly in half. Space is O(1) for the iterative version.',
  explanation: 'The sorted order lets every comparison prove that one half is impossible. For target 9, mid first points to value 5, so indexes 0..2 are too small and are removed. The next mid points to 9, so index 4 is returned.',
  solutionCode: `class Solution {
    public int search(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;

            if (nums[mid] == target) {
                return mid;
            }

            if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return -1;
    }
}`,
  finalTakeaway: 'Binary search is repeated proof that one side cannot contain the answer.',
  selfExplanationPrompt: 'Before revealing the next step, explain which range can be eliminated and why.',
  visualExplanation: 'Watch the active range shrink. The important visual is not the middle index alone; it is the proof that everything outside the active range is impossible.',
  visualWalkthrough: {
    title: 'Binary search range elimination walkthrough',
    summary: 'Track left, right, and mid while the sorted array lets us remove impossible ranges in one step.',
    diagram: {
      type: 'array',
      title: 'Active search range',
      description: 'Only cells inside the current window can still contain the target. Removed cells are proven impossible.',
      values: [1, 3, 5, 7, 9, 11],
      stateTitle: 'Boundary state evolution',
      stateDescription: 'Each frame preserves the invariant that the target, if present, is inside [left, right].',
      legend: [
        { role: 'window', marker: '[]', label: 'Active search range' },
        { role: 'current', marker: 'M', label: 'Middle value checked' },
        { role: 'remove', marker: '×', label: 'Eliminated range' },
        { role: 'answer', marker: '✓', label: 'Target found' }
      ],
      frames: [
        {
          title: 'Start with the full sorted array',
          activeRange: [0, 5],
          items: [{ index: 2, role: 'current', caption: 'mid' }],
          state: { label: 'L=0, R=5, M=2', values: { left: 0, right: 5, mid: 2, value: 5 }, helper: '5 is smaller than 9, so indexes 0..2 cannot contain the target.' },
          description: 'The first middle value is 5. Since the target is 9 and the array is sorted, every value at index 2 or before is too small.'
        },
        {
          title: 'Discard the left half',
          activeRange: [3, 5],
          items: [
            { index: 0, role: 'remove', caption: 'removed' },
            { index: 1, role: 'remove', caption: 'removed' },
            { index: 2, role: 'remove', caption: 'removed' },
            { index: 4, role: 'current', caption: 'mid' }
          ],
          state: { label: 'L=3, R=5, M=4', values: { left: 3, right: 5, mid: 4, value: 9 }, helper: 'The active range is now indexes 3..5.' },
          description: 'Move left to mid + 1. The next middle value is 9, which matches the target.'
        },
        {
          title: 'Return the matching index',
          activeRange: [4, 4],
          items: [{ index: 4, role: 'answer', caption: 'answer' }],
          state: { label: 'Found', values: { index: 4, value: 9 }, helper: 'Return the index, not the value.' },
          description: 'The middle value equals the target, so the search stops and returns index 4.',
          finalResult: { title: 'Final answer', body: 'Return 4.' }
        }
      ]
    }
  },
  body: [
    { type: 'callout', tone: 'info', title: 'Pattern signal', content: 'Use binary search on sorted data or any monotonic yes/no condition where one side can be proven impossible.' }
  ],
  relatedConcepts: ['sorted array', 'monotonic predicate', 'bounds'],
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod']
  }
});

export default problem;
