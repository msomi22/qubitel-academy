import { defineLearningProblem } from '../../../../../problems/problemAuthoring.js';

const problem = defineLearningProblem({
  id: 'prefix-sum-hashing-two-sum-complement-001',
  topicId: 'prefix-sum-hashing',
  title: 'Two Sum — hash map complement',
  difficulty: 'Easy',
  estimatedTime: '12 min',
  language: 'java',
  tags: ['arrays', 'hash-map', 'interview-pattern', 'mental-model', 'visual-walkthrough', 'coding'],
  scenario: 'You are given numbers and a target. Return the two indices whose values add up to the target.',
  question: 'Given nums = [2, 7, 11, 15] and target = 9, return [0, 1].',
  prompt: 'How can you solve Two Sum by remembering complements instead of checking every pair?',
  examples: ['Input: nums = [2, 7, 11, 15], target = 9 → Output: [0, 1]'],
  constraints: ['Use two different indices.', 'Assume exactly one answer for the standard variant.', 'Numbers may repeat.'],
  starterThought: 'Do not ask, “Which pair should I try next?” Ask, “What number would complete the pair for the value I am holding now?”',
  intuition: 'For each number, compute the missing partner: target - current number. A hash map stores numbers you have already passed. If the missing partner is already in the map, the pair is found immediately.',
  mentalPicture: 'Imagine a shopping list where the total must be exactly 9. When you pick up item 7, you ask, “Have I already seen an item priced 2?” The map is your memory of earlier prices.',
  patternSignal: 'Use complement lookup when a pair must combine to a target and you can remember values already seen.',
  invariant: 'Before processing index i, the map contains only values from earlier indices, so any match uses two different elements.',
  bruteForceThought: 'Brute force checks every possible pair and repeats the same search again and again.',
  optimizationJourney: 'Every current value has exactly one complement for a fixed target. Hash lookup turns “search all previous values” into “ask directly whether the missing value was seen.”',
  stepByStepBreakdown: ['Create a map from value to index.', 'For each index, compute complement = target - nums[i].', 'Check whether complement was seen earlier.', 'If yes, return the stored index and current index.', 'If no, store nums[i] for future values.'],
  finalPattern: 'Complement lookup with a hash map.',
  commonMistake: 'Adding the current number before checking can accidentally allow using the same element twice.',
  commonMistakes: ['Checking after inserting current value when complement equals current value.', 'Returning values instead of indices.', 'Forgetting duplicate values need separate indices.'],
  edgeCases: ['Duplicate values such as [3, 3] with target 6', 'Negative numbers', 'No valid pair if the variant allows that', 'A complement equal to the current value must come from a different index'],
  complexityAnalysis: 'Time is O(n) because each number is processed once and hash lookups are expected constant time. Space is O(n) because the map may store many previously seen numbers.',
  explanation: 'At index 0, value 2 needs complement 7, but 7 has not been seen, so store 2 -> 0. At index 1, value 7 needs complement 2, and 2 is already stored at index 0. Return [0, 1].',
  solutionCode: `import java.util.HashMap;
import java.util.Map;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> seen = new HashMap<>();

        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];

            if (seen.containsKey(complement)) {
                return new int[] { seen.get(complement), i };
            }

            seen.put(nums[i], i);
        }

        return new int[] { -1, -1 };
    }
}`,
  finalTakeaway: 'A hash map turns “search all previous values” into “ask directly whether the missing value was seen.”',
  selfExplanationPrompt: 'In one sentence, explain why checking the complement before inserting the current number avoids reusing the same element.',
  visualExplanation: 'The walkthrough shows the map as memory. Each frame asks whether the current number’s complement is already remembered from an earlier index.',
  visualWalkthrough: {
    title: 'Complement lookup walkthrough',
    summary: 'Process each number once. The map stores previous values only, so a found complement always comes from an earlier index.',
    diagram: {
      type: 'array',
      title: 'nums = [2, 7, 11, 15], target = 9',
      description: 'Current value asks for its complement. The map answers using only earlier values.',
      values: [2, 7, 11, 15],
      stateTitle: 'Hash map memory',
      stateDescription: 'Map entries are value → index before the current value is inserted.',
      legend: [
        { role: 'current', marker: 'C', label: 'Current value' },
        { role: 'add', marker: '+', label: 'Stored for later' },
        { role: 'answer', marker: '✓', label: 'Complement found' }
      ],
      frames: [
        { title: 'Check value 2', items: [{ index: 0, role: 'current', caption: 'current' }], state: { label: 'i=0', values: { current: 2, complement: 7, map: '{}' }, helper: '7 is not in the map yet.' }, description: 'Value 2 needs 7. The map is empty, so no pair is found. Store 2 -> 0.' },
        { title: 'Store 2 for future numbers', items: [{ index: 0, role: 'add', caption: 'stored' }, { index: 1, role: 'current', caption: 'current' }], state: { label: 'i=1', values: { current: 7, complement: 2, map: '{2:0}' }, helper: '2 is already remembered from index 0.' }, description: 'Value 7 needs 2. The complement is in the map, so the pair is found.' },
        { title: 'Return both indices', items: [{ index: 0, role: 'answer', caption: 'index 0' }, { index: 1, role: 'answer', caption: 'index 1' }], state: { label: 'Found', values: { leftIndex: 0, rightIndex: 1 }, helper: 'nums[0] + nums[1] = 2 + 7 = 9.' }, description: 'Return the stored complement index and the current index.', finalResult: { title: 'Final answer', body: 'Return [0, 1].' } }
      ]
    }
  },
  body: [
    { type: 'callout', tone: 'info', title: 'Pattern signal', content: 'Use complement lookup when a pair must combine to a target and you can remember values already seen.' }
  ],
  relatedConcepts: ['hash map lookup', 'complement', 'single-pass scan'],
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod']
  }
});

export default problem;
