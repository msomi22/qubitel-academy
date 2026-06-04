import { defineLearningProblem } from '../../../../../problems/problemAuthoring.js';

const problem = defineLearningProblem({
  id: 'sliding-window-minimum-size-subarray-sum-001',
  topicId: 'sliding-window',
  title: 'Minimum Size Subarray Sum — shrink-to-valid sliding window',
  difficulty: 'Medium',
  estimatedTime: '15 min',
  language: 'java',
  tags: [
    'arrays',
    'sliding-window',
    'two-pointers',
    'interview-pattern',
    'mental-model',
    'visual-walkthrough',
    'coding'
  ],
  scenario: 'Find the shortest contiguous subarray whose sum is at least a target value. For target 7 and nums = [2, 3, 1, 2, 4, 3], the answer is 2 because [4, 3] reaches sum 7, has length 2, and no single number in the array reaches 7 by itself.',
  question: 'Given a positive integer target and an array of positive integers nums, return the minimum length of a contiguous subarray whose sum is greater than or equal to target. If no such subarray exists, return 0.',
  examples: [
    'Input: target = 7, nums = [2, 3, 1, 2, 4, 3] -> Output: 2 because [4, 3] has sum 7 and length 2.',
    'Input: target = 11, nums = [1, 1, 1, 1, 1, 1, 1, 1] -> Output: 0 because every contiguous subarray sums to less than 11.'
  ],
  constraints: [
    'The subarray must be contiguous; you cannot skip values.',
    'The sum must be at least target, not exactly equal to target.',
    'All numbers are positive, which lets shrinking from the left reduce the window sum predictably.',
    'Return the shortest valid length, not the first valid length found.'
  ],
  starterThought: 'Do not ask, “which subarray works?” Ask, “when a window finally works, how much can I trim from the left before it stops working?”',
  intuition: 'Use right as the pointer that collects enough sum. Each time right moves, the entering value is added to windowSum. Once windowSum is at least target, the current window is valid, but it may be longer than necessary. Now left becomes the pointer that removes values from the front. After every valid check, record the current length, remove nums[left], and move left forward to see whether the window can stay valid while becoming shorter. This is different from fixed-size sliding window: fixed-size problems keep a known window length, but here the length is controlled by validity. Grow until valid, then shrink while valid.',
  mentalPicture: 'Picture a basket that must hold at least target weight. You keep adding boxes from the right until the basket is heavy enough. Once it is heavy enough, you try removing the oldest boxes from the left. Every time the basket is still heavy enough, you have found a smaller valid basket. The best answer is the smallest heavy-enough basket seen during the scan.',
  patternSignal: 'Use this pattern when the answer is the shortest contiguous group that satisfies a minimum requirement, and removing items from the left can only reduce the current total.',
  invariant: 'At every check, windowSum equals the sum of nums from left through right. The inner shrink loop only runs while that exact window is valid with windowSum >= target.',
  bruteForceThought: 'A brute force solution tries every starting index, grows every possible ending index, and repeatedly recomputes or revisits many overlapping sums.',
  optimizationJourney: 'Sliding window keeps one running sum instead of rebuilding each candidate. right moves forward to include each value once. left moves forward only when the current window is valid and worth shrinking. Because neither pointer moves backward, repeated work disappears.',
  stepByStepBreakdown: [
    'Start with left = 0, windowSum = 0, and best = Integer.MAX_VALUE.',
    'Move right across the array one index at a time.',
    'Add nums[right] to windowSum because the value at right has entered the current window.',
    'While windowSum >= target, the current window is valid, so update best with right - left + 1.',
    'Still inside the valid loop, remove nums[left] and move left forward to test whether a shorter window can remain valid.',
    'After the scan, return 0 if best never changed; otherwise return best.'
  ],
  finalPattern: 'Grow right until the window is valid, then shrink left while the window remains valid.',
  commonMistake: 'Updating best after removing nums[left], which can record a window that is no longer valid.',
  commonMistakes: [
    'Stopping after the first valid window instead of shrinking it to search for a shorter one.',
    'Updating best when windowSum is below target.',
    'Using a fixed-size window even though the correct length is unknown.',
    'Forgetting that the current valid length is right - left + 1 before removing from the left.'
  ],
  edgeCases: [
    'No subarray reaches the target, so the answer is 0.',
    'One element alone reaches the target, so the answer can be 1.',
    'The whole array is the only valid window.',
    'Several valid windows exist, and the shortest one appears near the end.'
  ],
  complexityAnalysis: 'Time is O(n). Even though the code has a while loop inside the for loop, each element enters the window once when right reaches it and leaves the window at most once when left passes it. right only moves forward, and left only moves forward. Extra space is O(1) because the algorithm keeps only a few integer variables: left, windowSum, best, and right.',
  explanation: 'For target 7 and nums = [2, 3, 1, 2, 4, 3], we are not looking for any valid subarray; we are looking for the shortest valid one. The window [2, 3, 1, 2] reaches sum 8, so it is valid with length 4. Because it is valid, we try shrinking from the left. Later, when the scan reaches the final 3, the window [4, 3] has sum 7 and length 2. No length-1 value reaches 7, so length 2 is the shortest possible valid answer.',
  solutionCode: `class Solution {
    public int minSubArrayLen(int target, int[] nums) {
        int left = 0;
        int windowSum = 0;
        int best = Integer.MAX_VALUE;

        for (int right = 0; right < nums.length; right++) {
            windowSum += nums[right];

            while (windowSum >= target) {
                best = Math.min(best, right - left + 1);
                windowSum -= nums[left];
                left++;
            }
        }

        return best == Integer.MAX_VALUE ? 0 : best;
    }
}`,
  finalTakeaway: 'When you need the shortest contiguous group that reaches a target, grow until valid, then shrink while valid.',
  visualWalkthrough: {
    title: 'Grow until valid, then shrink while valid',
    summary: 'Watch right add values until the sum reaches target 7. Whenever the window is valid, best is updated before left removes the oldest value to test whether the valid window can become shorter.',
    diagram: {
      type: 'array',
      title: 'target = 7, nums = [2, 3, 1, 2, 4, 3]',
      values: ['2', '3', '1', '2', '4', '3'],
      stateTitle: 'What to watch',
      stateDescription: 'left marks the start of the current window, right marks the newest value that entered, windowSum is the sum from left through right, and best remembers the shortest valid length seen so far.',
      frames: [
        {
          title: 'Start with an empty window',
          activeRange: [0, 0],
          items: [{ index: 0, role: 'current', caption: 'next right' }],
          state: { label: 'not valid yet', role: 'neutral', values: ['left 0', 'right not started', 'window []', 'windowSum 0', 'best none'], helper: 'No values have entered, so the next move must expand right.' },
          description: 'The window starts empty. Since windowSum is 0, it cannot reach target 7 yet, so right will begin collecting values.'
        },
        {
          title: 'Add 2 at index 0',
          activeRange: [0, 0],
          items: [{ index: 0, role: 'current', caption: 'right adds 2' }],
          state: { label: 'still too small', role: 'neutral', values: ['left 0', 'right 0', 'window [2]', 'entering 2', 'windowSum 2', 'valid no', 'best none'], helper: '2 is below 7, so shrinking would only make the sum smaller.' },
          description: 'right moves to index 0 and adds 2. The current window is [2], but its sum is not enough, so we keep expanding.'
        },
        {
          title: 'Add 3 at index 1',
          activeRange: [0, 1],
          items: [{ index: 0, role: 'window', caption: 'left' }, { index: 1, role: 'current', caption: 'right adds 3' }],
          state: { label: 'still too small', role: 'neutral', values: ['left 0', 'right 1', 'window [2, 3]', 'entering 3', 'windowSum 5', 'valid no', 'best none'], helper: 'The sum increased to 5, but it still has not reached target 7.' },
          description: 'right adds 3. The window sum becomes 5, so the window is still invalid and left does not move.'
        },
        {
          title: 'Add 1 at index 2',
          activeRange: [0, 2],
          items: [{ index: 0, role: 'window', caption: 'left' }, { index: 2, role: 'current', caption: 'right adds 1' }],
          state: { label: 'one short', role: 'neutral', values: ['left 0', 'right 2', 'window [2, 3, 1]', 'entering 1', 'windowSum 6', 'valid no', 'best none'], helper: 'The window is close, but 6 is still less than 7, so the only useful move is to expand right.' },
          description: 'right adds 1. The running sum is now 6, which is not valid yet.'
        },
        {
          title: 'Add 2 at index 3 and become valid',
          activeRange: [0, 3],
          items: [{ index: 0, role: 'window', caption: 'left' }, { index: 3, role: 'current', caption: 'right adds 2' }],
          state: { label: 'valid window', role: 'success', values: ['left 0', 'right 3', 'window [2, 3, 1, 2]', 'entering 2', 'windowSum 8', 'valid yes', 'best updates to 4'], helper: 'Now windowSum is at least 7, so record length 4 before removing anything.' },
          description: 'right adds the 2 at index 3. The window sum becomes 8, so [2, 3, 1, 2] is the first valid window and best becomes 4.'
        },
        {
          title: 'Shrink once by removing the left 2',
          activeRange: [1, 3],
          items: [{ index: 0, role: 'remove', caption: 'leaves 2' }, { index: 1, role: 'window', caption: 'left moves to 1' }, { index: 3, role: 'current', caption: 'right stays 3' }],
          state: { label: 'invalid after shrink', role: 'warning', values: ['left 1', 'right 3', 'window [3, 1, 2]', 'leaving 2', 'windowSum 6', 'valid no', 'best 4'], helper: 'After recording length 4, remove nums[left]. The sum drops below 7, so shrinking stops.' },
          description: 'Because the window was valid, we tested whether it could be shorter. Removing the left 2 drops the sum from 8 to 6, so the window is no longer valid.'
        },
        {
          title: 'Add 4 at index 4',
          activeRange: [1, 4],
          items: [{ index: 1, role: 'window', caption: 'left' }, { index: 4, role: 'current', caption: 'right adds 4' }],
          state: { label: 'valid again', role: 'success', values: ['left 1', 'right 4', 'window [3, 1, 2, 4]', 'entering 4', 'windowSum 10', 'valid yes', 'best remains 4'], helper: 'The length is 4, which ties best. Because the window is valid, try shrinking again.' },
          description: 'right moves to index 4 and adds 4. The sum jumps to 10, so this window is valid and ready to shrink.'
        },
        {
          title: 'Shrink by removing 3',
          activeRange: [2, 4],
          items: [{ index: 1, role: 'remove', caption: 'leaves 3' }, { index: 2, role: 'window', caption: 'left moves to 2' }, { index: 4, role: 'current', caption: 'right stays 4' }],
          state: { label: 'still valid', role: 'success', values: ['left 2', 'right 4', 'window [1, 2, 4]', 'leaving 3', 'windowSum 7', 'valid yes', 'best updates to 3'], helper: 'The shorter window still reaches 7, so best improves from 4 to 3.' },
          description: 'Remove the 3 at the old left. The window [1, 2, 4] still sums to 7, so its length 3 becomes the new best.'
        },
        {
          title: 'Shrink again by removing 1',
          activeRange: [3, 4],
          items: [{ index: 2, role: 'remove', caption: 'leaves 1' }, { index: 3, role: 'window', caption: 'left moves to 3' }, { index: 4, role: 'current', caption: 'right stays 4' }],
          state: { label: 'invalid after shrink', role: 'warning', values: ['left 3', 'right 4', 'window [2, 4]', 'leaving 1', 'windowSum 6', 'valid no', 'best 3'], helper: 'After recording length 3, removing 1 makes the sum 6, so the shrink loop stops.' },
          description: 'The valid loop tries one more shrink. Removing 1 makes [2, 4] sum to 6, which is below target 7.'
        },
        {
          title: 'Add 3 at index 5',
          activeRange: [3, 5],
          items: [{ index: 3, role: 'window', caption: 'left' }, { index: 5, role: 'current', caption: 'right adds 3' }],
          state: { label: 'valid window', role: 'success', values: ['left 3', 'right 5', 'window [2, 4, 3]', 'entering 3', 'windowSum 9', 'valid yes', 'best remains 3'], helper: 'The window is valid with length 3, so record the tie and then shrink to search for length 2.' },
          description: 'right adds the final 3. The window [2, 4, 3] has sum 9, so it is valid and the algorithm starts shrinking again.'
        },
        {
          title: 'Remove 2 and discover [4, 3]',
          activeRange: [4, 5],
          items: [{ index: 3, role: 'remove', caption: 'leaves 2' }, { index: 4, role: 'window', caption: 'left moves to 4' }, { index: 5, role: 'current', caption: 'right stays 5' }],
          state: { label: 'best improves', role: 'success', values: ['left 4', 'right 5', 'window [4, 3]', 'leaving 2', 'windowSum 7', 'valid yes', 'best updates to 2'], helper: '[4, 3] still reaches 7 and has length 2, so this is the best answer so far.' },
          description: 'Remove the 2 from the left. The remaining window [4, 3] still sums to 7, so best improves to 2.'
        },
        {
          title: 'Try one final shrink, then return 2',
          activeRange: [5, 5],
          items: [{ index: 4, role: 'remove', caption: 'leaves 4' }, { index: 5, role: 'current', caption: 'left + right' }],
          state: { label: 'answer', role: 'success', values: ['left 5', 'right 5', 'window [3]', 'leaving 4', 'windowSum 3', 'valid no', 'best 2'], helper: 'Removing 4 breaks validity. The scan is complete, and no length-1 value reaches 7, so return 2.' },
          description: 'The algorithm records length 2 before removing 4. After 4 leaves, the sum is only 3, the array is finished, and best is returned.',
          finalResult: { title: 'Final answer', body: 'Return 2 because [4, 3] is the shortest contiguous subarray with sum at least 7.' }
        }
      ]
    }
  },
  body: [
    { type: 'callout', tone: 'info', title: 'Overview', content: 'We need the shortest contiguous subarray whose sum reaches at least the target. In the sample, [4, 3] reaches 7, its length is 2, and no single value reaches 7, so the answer is 2.' },
    { type: 'callout', tone: 'info', title: 'Mental model', content: 'right grows the window until it becomes valid. left then shrinks the valid window to test whether it can stay valid with fewer values.' },
    { type: 'callout', tone: 'warning', title: 'Key implementation detail', content: 'Update best before removing nums[left]. At that moment the current window is known to be valid, so right - left + 1 is a legitimate candidate length.' }
  ],
  relatedConcepts: ['variable sliding window', 'two pointers', 'running sum', 'window invariant'],
  metadata: { reviewStatus: 'approved', visibility: ['dev', 'prod'] }
});

export default problem;
