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
  constraints: [
    'The answer must be a contiguous substring length.',
    'Characters can repeat outside the active substring.',
    'The active substring is clean only when it has no repeated characters.',
    'Use O(n) time.'
  ],
  starterThought: 'Keep one clean substring alive. Grow it when possible, and trim it only when a duplicate enters.',
  intuition: 'Read the string from left to right. Keep a current substring that is allowed to contain each character only once. The right pointer is the reader: it brings in the next character. If the character is new, the substring stays clean and may become the best answer. If the character is already inside, the substring becomes dirty. Move the left pointer forward until the older copy is removed. Then the substring is clean again.',
  mentalPicture: 'Picture a tray holding letters. You slide new letters into the tray from the right. The tray is only allowed to hold one copy of each letter. When a second copy enters, you throw letters out from the left until the old duplicate is gone. The biggest clean tray you ever see is the answer.',
  patternSignal: 'Use sliding window when you are looking for the best contiguous group and a bad group can be fixed by removing items from the left.',
  invariant: 'After every repair, the active substring has no repeated characters.',
  bruteForceThought: 'Brute force keeps restarting from different positions and checks many of the same characters again.',
  optimizationJourney: 'The window avoids restarting. Each character enters once from the right and leaves at most once from the left, so the whole string is scanned in one pass.',
  stepByStepBreakdown: [
    'Start with an empty clean substring.',
    'Move right to bring in the next character.',
    'If that character is not already inside, update best.',
    'If that character is already inside, move left until the older copy is removed.',
    'Once the substring is clean again, update best.'
  ],
  finalPattern: 'Variable sliding window with a clean-substring rule.',
  commonMistake: 'Counting the substring while it still contains a duplicate.',
  commonMistakes: [
    'Updating best before removing the old duplicate.',
    'Moving left only once when the duplicate may require several removals.',
    'Confusing substring with subsequence.',
    'Forgetting to update character counts when letters leave from the left.'
  ],
  edgeCases: ['Empty string', 'All unique characters', 'All same characters', 'Duplicates far apart'],
  complexityAnalysis: 'Time is O(n) because each character enters and leaves the active substring at most once. Space is O(k), where k is the number of possible distinct characters.',
  explanation: 'For abcabcbb, the active substring grows to abc. The next a creates abca, which is dirty because it has two a characters. Remove letters from the left until the old a is gone, leaving bca. The best clean length remains 3.',
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
  finalTakeaway: 'right brings letters in. left throws old letters out. best remembers the largest clean substring.',
  visualExplanation: 'Think of the highlighted range as the current clean tray of letters. right brings in a new letter. If the tray now has two copies of that letter, left slides forward until only one copy remains.',
  visualWalkthrough: {
    title: 'Grow the clean substring, then repair it',
    summary: 'The picture follows one clean substring as it grows, gets polluted by a duplicate, and then becomes clean again.',
    diagram: {
      type: 'array',
      title: 's = abcabcbb',
      values: ['a', 'b', 'c', 'a', 'b', 'c', 'b', 'b'],
      stateTitle: 'Clean substring tracker',
      stateDescription: 'left marks where the clean substring starts. right marks the newest letter that entered. best remembers the largest clean substring seen.',
      frames: [
        {
          title: 'Start with a',
          activeRange: [0, 0],
          items: [
            { index: 0, role: 'current', caption: 'left + right' }
          ],
          state: { label: 'clean', values: ['left 0', 'right 0', 'tray a', 'best 1'], helper: 'The tray has one letter, so nothing repeats.' },
          description: 'The first clean substring is just "a".'
        },
        {
          title: 'Add b',
          activeRange: [0, 1],
          items: [
            { index: 0, role: 'window', caption: 'left' },
            { index: 1, role: 'current', caption: 'right adds b' }
          ],
          state: { label: 'clean', values: ['left 0', 'right 1', 'tray ab', 'best 2'], helper: 'a and b are different, so the tray is still clean.' },
          description: 'Add "b" to the right side. The clean substring becomes "ab".'
        },
        {
          title: 'Add c',
          activeRange: [0, 2],
          items: [
            { index: 0, role: 'window', caption: 'left' },
            { index: 2, role: 'current', caption: 'right adds c' }
          ],
          state: { label: 'clean', values: ['left 0', 'right 2', 'tray abc', 'best 3'], helper: 'abc is clean and becomes the best length so far.' },
          description: 'Add "c". Now the clean substring is "abc", length 3.'
        },
        {
          title: 'Another a enters',
          activeRange: [0, 3],
          items: [
            { index: 0, role: 'remove', caption: 'old a' },
            { index: 3, role: 'remove', caption: 'new a' }
          ],
          state: { label: 'dirty', values: ['left 0', 'right 3', 'tray abca', 'best 3'], helper: 'There are now two a letters in the tray.' },
          description: 'Add the next "a". The substring is no longer clean because it contains two a characters.'
        },
        {
          title: 'Throw out the old a',
          activeRange: [1, 3],
          items: [
            { index: 0, role: 'remove', caption: 'removed' },
            { index: 1, role: 'window', caption: 'left' },
            { index: 3, role: 'current', caption: 'right' }
          ],
          state: { label: 'clean again', values: ['left 1', 'right 3', 'tray bca', 'best 3'], helper: 'After the old a leaves, every letter is unique again.' },
          description: 'Move left forward and remove the old "a". The clean substring is now "bca".'
        },
        {
          title: 'Another b enters',
          activeRange: [1, 4],
          items: [
            { index: 1, role: 'remove', caption: 'old b' },
            { index: 4, role: 'remove', caption: 'new b' }
          ],
          state: { label: 'dirty', values: ['left 1', 'right 4', 'tray bcab', 'best 3'], helper: 'There are now two b letters.' },
          description: 'Add "b". The tray becomes dirty again because it has two b characters.'
        },
        {
          title: 'Throw out the old b',
          activeRange: [2, 4],
          items: [
            { index: 1, role: 'remove', caption: 'removed' },
            { index: 2, role: 'window', caption: 'left' },
            { index: 4, role: 'current', caption: 'right' }
          ],
          state: { label: 'clean again', values: ['left 2', 'right 4', 'tray cab', 'best 3'], helper: 'cab is clean, but it only ties the best length.' },
          description: 'Move left past the old "b". The clean substring becomes "cab".'
        },
        {
          title: 'Best length stays 3',
          activeRange: [3, 5],
          items: [
            { index: 3, role: 'answer', caption: 'clean' },
            { index: 4, role: 'answer', caption: 'clean' },
            { index: 5, role: 'answer', caption: 'clean' }
          ],
          state: { label: 'answer', values: ['best 3'], helper: 'Several clean substrings have length 3, but none are longer.' },
          description: 'The longest clean substring length is 3. Examples include "abc", "bca", and "cab".',
          finalResult: { title: 'Final answer', body: 'Return 3.' }
        }
      ]
    }
  },
  body: [
    { type: 'callout', tone: 'info', title: 'Mental model', content: 'Keep a clean tray of letters. Add from the right. When a duplicate enters, remove from the left until the tray is clean again.' },
    { type: 'callout', tone: 'info', title: 'Pattern signal', content: 'Use a sliding window when the answer is a contiguous group and a bad group can be repaired by trimming from the left.' }
  ],
  relatedConcepts: ['two pointers', 'hash map', 'window invariant'],
  metadata: { reviewStatus: 'approved', visibility: ['dev', 'prod'] }
});

export default problem;
