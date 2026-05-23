import { defineLearningProblem } from '../../../../problems/problemAuthoring.js';

const problem = defineLearningProblem({
  id: 'sliding-window-longest-substring-unique-001',
  topicId: 'sliding-window',
  title: 'Longest Substring Without Repeating Characters — variable sliding window',
  difficulty: 'Medium',
  estimatedTime: '15 min',
  language: 'java',
  tags: ['strings', 'sliding-window', 'hash-set', 'interview-pattern', 'mental-model', 'visual-walkthrough', 'coding'],
  scenario: 'Find the length of the longest contiguous substring that contains no repeated characters.',
  question: 'Given s = "abcabcbb", return 3 because "abc" is the longest substring without repeated characters.',
  examples: ['Input: s = "abcabcbb" -> Output: 3'],
  constraints: ['The answer must be a contiguous substring length.', 'Characters can repeat outside the active window.', 'Use O(n) time.'],
  starterThought: 'Keep one live window instead of restarting every substring from scratch.',
  intuition: 'The right pointer expands the window. If a duplicate appears, the left pointer moves until the window is valid again. The best length is updated only after the window is valid.',
  mentalPicture: 'A camera frame moves across the string. The frame is only allowed to contain unique characters.',
  patternSignal: 'Use a sliding window when you need the best contiguous range and can repair invalid windows by moving one boundary.',
  invariant: 'After the shrink step, the active window contains no duplicate characters.',
  bruteForceThought: 'Brute force checks many substrings and repeatedly rechecks characters it already understood.',
  optimizationJourney: 'Each character enters the window once and leaves at most once, so the scan stays linear.',
  stepByStepBreakdown: ['Move right over the string.', 'Add the current character to the window.', 'While the character count is duplicated, remove characters from the left.', 'Update best from the valid window length.'],
  finalPattern: 'Variable sliding window with a validity invariant.',
  commonMistake: 'Updating best length before removing duplicates can count an invalid window.',
  commonMistakes: ['Shrinking only once when several removals are needed.', 'Confusing substring with subsequence.', 'Forgetting to decrement counts while moving left.'],
  edgeCases: ['Empty string', 'All unique characters', 'All same characters', 'Duplicates far apart'],
  complexityAnalysis: 'Time is O(n) because each character enters and leaves the window at most once. Space is O(k), where k is the character set size.',
  explanation: 'When the second a enters abcabcbb, the window abca is invalid. Move left until the old a leaves, making bca valid. Continue this repair process and the best length remains 3.',
  solutionCode: `import java.util.HashMap;
import java.util.Map;

class Solution {
    public int lengthOfLongestSubstring(String s) {
        Map<Character, Integer> count = new HashMap<>();
        int left = 0;
        int best = 0;

        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            count.put(c, count.getOrDefault(c, 0) + 1);

            while (count.get(c) > 1) {
                char remove = s.charAt(left);
                count.put(remove, count.get(remove) - 1);
                left++;
            }

            best = Math.max(best, right - left + 1);
        }

        return best;
    }
}`,
  finalTakeaway: 'Sliding window works when you can fix a bad window by moving one side instead of starting over.',
  visualExplanation: 'The visual shows the active substring window grow, become invalid, then shrink until it is valid again.',
  visualWalkthrough: {
    title: 'Variable sliding window walkthrough',
    summary: 'Grow with right, shrink with left, and update best only after the window has unique characters.',
    diagram: {
      type: 'array',
      title: 's = abcabcbb',
      values: ['a', 'b', 'c', 'a', 'b', 'c', 'b', 'b'],
      stateTitle: 'Window state evolution',
      stateDescription: 'The active range is always repaired back to a unique-character substring.',
      frames: [
        { title: 'Grow to abc', activeRange: [0, 2], items: [{ index: 2, role: 'current', caption: 'right' }], state: { label: 'valid', values: { left: 0, right: 2, window: 'abc', best: 3 }, helper: 'All characters are unique.' }, description: 'The first three characters form a valid window of length 3.' },
        { title: 'Duplicate a enters', activeRange: [0, 3], items: [{ index: 3, role: 'remove', caption: 'duplicate' }], state: { label: 'invalid', values: { left: 0, right: 3, window: 'abca', best: 3 }, helper: 'a appears twice, so the left side must move.' }, description: 'The window is temporarily invalid because a repeated character entered.' },
        { title: 'Shrink until valid', activeRange: [1, 3], items: [{ index: 0, role: 'remove', caption: 'left moved' }], state: { label: 'valid again', values: { left: 1, right: 3, window: 'bca', best: 3 }, helper: 'The old a has left the window.' }, description: 'Move left until the duplicate is removed. Now the window is valid again.' },
        { title: 'Finish with best length', activeRange: [3, 5], items: [{ index: 3, role: 'answer', caption: 'best window' }, { index: 4, role: 'answer', caption: 'best window' }, { index: 5, role: 'answer', caption: 'best window' }], state: { label: 'answer', values: { best: 3 }, helper: 'No later valid window beats length 3.' }, description: 'Several valid windows have length 3, so the final answer is 3.', finalResult: { title: 'Final answer', body: 'Return 3.' } }
      ]
    }
  },
  body: [{ type: 'callout', tone: 'info', title: 'Pattern signal', content: 'Use a sliding window for best contiguous ranges with a repairable validity rule.' }],
  relatedConcepts: ['two pointers', 'hash map', 'window invariant'],
  metadata: { reviewStatus: 'approved', visibility: ['dev', 'prod'] }
});

export default problem;
