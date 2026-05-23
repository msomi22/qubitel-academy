import { defineLearningProblem } from '../../../../problems/problemAuthoring.js';

const problem = defineLearningProblem({
  id: 'prefix-sum-hashing-product-except-self-001',
  topicId: 'prefix-sum-hashing',
  title: 'Product of Array Except Self — prefix/suffix thinking',
  difficulty: 'Medium',
  estimatedTime: '14 min',
  language: 'java',
  tags: ['arrays', 'prefix-suffix', 'interview-pattern', 'mental-model', 'visual-walkthrough', 'coding'],
  scenario: 'For each index, multiply every other number except the number sitting at that index. That excluded number is called “self.”',
  question: 'Given nums = [1, 2, 3, 4], return [24, 12, 8, 6].',
  examples: ['nums = [1, 2, 3, 4] -> [24, 12, 8, 6]', 'At index 0, answer[0] excludes 1, so answer[0] = 2 × 3 × 4 = 24'],
  constraints: ['Do not use division.', 'Each output index must exclude nums[i].', 'Use prefix and suffix products to avoid repeated multiplication.'],
  starterThought: 'Start with the meaning of one answer slot: the value at the same index is skipped, and every other value is multiplied.',
  intuition: 'For nums = [1, 2, 3, 4], each output slot skips the input value at the same index. So output[0] skips 1 and uses 2 × 3 × 4 = 24. output[1] skips 2 and uses 1 × 3 × 4 = 12. output[2] skips 3 and uses 1 × 2 × 4 = 8. output[3] skips 4 and uses 1 × 2 × 3 = 6.',
  mentalPicture: 'Imagine each output slot pointing at one input value and saying: “skip this one, multiply the rest.”',
  patternSignal: 'This fits prefix/suffix thinking because each answer needs values from both sides of one skipped index.',
  invariant: 'Each answer slot must be built from values before its index and values after its index, but not the value at that same index.',
  bruteForceThought: 'A direct solution would rebuild the product for every index by scanning the whole array and skipping only that index.',
  optimizationJourney: 'The repeated work is the clue. Products before an index are reused many times, and products after an index are reused many times. Store the before part first, then combine it with the after part.',
  stepByStepBreakdown: ['Understand one slot first: output[0] skips nums[0] and multiplies nums[1], nums[2], and nums[3].', 'Build the products that appear before each index.', 'Build the products that appear after each index.', 'For each index, combine before × after.', 'Because the same-index value is not in before or after, it is excluded naturally.'],
  finalPattern: 'Precompute information before and after each position.',
  commonMistake: 'Including the current value in its own answer.',
  commonMistakes: ['Including nums[i] in output[i].', 'Using division even though the constraint disallows it.', 'Forgetting that edge positions still need a neutral multiplication value.', 'Counting the returned output array as extra space when the problem allows it.'],
  edgeCases: ['One zero in the array', 'Multiple zeros', 'Negative numbers', 'Array length two', 'Values of one'],
  complexityAnalysis: 'Time is O(n) because each index is visited from the left side and from the right side. Extra space is O(1) beyond the output array because the returned answer array is required.',
  explanation: 'Read the code in two parts. First, answer is created to hold the result. In the left-to-right loop, answer[i] is assigned leftProduct before leftProduct is updated with nums[i]. That means answer[i] receives only values before index i. The line leftProduct *= nums[i] means leftProduct = leftProduct * nums[i]; it updates leftProduct using the current input value, not answer[i]. For nums = [1, 2, 3, 4], this first pass creates answer = [1, 1, 2, 6]. The first 1 does not mean “nothing equals 1”; it means no earlier values have been multiplied yet, so leftProduct is still its multiplication starting value. Next, the right-to-left loop uses rightProduct. answer[i] is multiplied by rightProduct before rightProduct is updated with nums[i]. That means answer[i] receives only values after index i. The line rightProduct *= nums[i] means rightProduct = rightProduct * nums[i]; it updates rightProduct using the current input value for the next index to the left. For the same input, the second pass changes [1, 1, 2, 6] into [24, 12, 8, 6]. The current value nums[i] is excluded because each product is used before nums[i] is added to that product.',
  approach: 'Break every answer into two pieces: product before the index and product after the index. For [1, 2, 3, 4], the before-products are [1, 1, 2, 6]. The after-products are [24, 12, 4, 1]. Multiply matching positions: [1×24, 1×12, 2×4, 6×1] = [24, 12, 8, 6].',
  solutionCode: `class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] answer = new int[n];

        int leftProduct = 1;
        for (int i = 0; i < n; i++) {
            // Save the product before index i.
            answer[i] = leftProduct;

            // Update leftProduct with nums[i] for future indexes.
            // This means: leftProduct = leftProduct * nums[i]
            leftProduct *= nums[i];
        }

        int rightProduct = 1;
        for (int i = n - 1; i >= 0; i--) {
            // Multiply by the product after index i.
            answer[i] *= rightProduct;

            // Update rightProduct with nums[i] for earlier indexes.
            // This means: rightProduct = rightProduct * nums[i]
            rightProduct *= nums[i];
        }

        return answer;
    }
}`,
  finalTakeaway: 'Each output index gets product before that index × product after that index. Since nums[i] is neither before nor after index i, it is excluded.',
  visualExplanation: 'The visual only builds the given example: one frame, one output slot. The highlighted value is skipped, the other values are multiplied, and the answer is written for that slot.',
  visualWalkthrough: {
    title: 'Product except self walkthrough',
    summary: 'Each answer is the product of everything except the number at that same index.',
    diagram: {
      type: 'array',
      title: 'Build the given example one answer slot at a time',
      description: 'The current input value is excluded from its own output slot.',
      values: [1, 2, 3, 4],
      stateTitle: 'Answer slot being built',
      stateDescription: 'Each frame shows the excluded value, the numbers multiplied, and the output value created for that index.',
      legend: [
        { role: 'current', label: 'excluded value', marker: 'E' },
        { role: 'success', label: 'used in product', marker: '×' },
        { role: 'answer', label: 'answer written', marker: '✓' }
      ],
      frames: [
        {
          title: 'Index 0 excludes 1',
          description: 'At index 0, exclude 1. Multiply the remaining values: 2 × 3 × 4 = 24.',
          items: [
            { index: 0, role: 'current', caption: 'exclude 1' },
            { index: 1, role: 'success', caption: 'use 2' },
            { index: 2, role: 'success', caption: 'use 3' },
            { index: 3, role: 'success', caption: 'use 4' }
          ],
          state: { label: 'output[0]', role: 'answer', values: { nums: '[1, 2, 3, 4]', excluded: '1 at index 0', multiply: '2 × 3 × 4', output: '[24, _, _, _]' }, helper: 'The answer at index 0 is formed from every value except nums[0].' }
        },
        {
          title: 'Index 1 excludes 2',
          description: 'Move one index. Exclude 2, then multiply 1 × 3 × 4 = 12.',
          items: [
            { index: 0, role: 'success', caption: 'use 1' },
            { index: 1, role: 'current', caption: 'exclude 2' },
            { index: 2, role: 'success', caption: 'use 3' },
            { index: 3, role: 'success', caption: 'use 4' }
          ],
          state: { label: 'output[1]', role: 'answer', values: { excluded: '2 at index 1', multiply: '1 × 3 × 4', output: '[24, 12, _, _]' }, helper: 'Only the current index changes. The rule stays the same: multiply every other value.' }
        },
        {
          title: 'Index 2 excludes 3',
          description: 'Move to index 2. Exclude 3 and multiply 1 × 2 × 4 = 8.',
          items: [
            { index: 0, role: 'success', caption: 'use 1' },
            { index: 1, role: 'success', caption: 'use 2' },
            { index: 2, role: 'current', caption: 'exclude 3' },
            { index: 3, role: 'success', caption: 'use 4' }
          ],
          state: { label: 'output[2]', role: 'answer', values: { excluded: '3 at index 2', multiply: '1 × 2 × 4', output: '[24, 12, 8, _]' }, helper: 'This writes the answer for index 2.' }
        },
        {
          title: 'Index 3 excludes 4',
          description: 'Move to index 3. Exclude 4 and multiply 1 × 2 × 3 = 6.',
          items: [
            { index: 0, role: 'success', caption: 'use 1' },
            { index: 1, role: 'success', caption: 'use 2' },
            { index: 2, role: 'success', caption: 'use 3' },
            { index: 3, role: 'current', caption: 'exclude 4' }
          ],
          state: { label: 'output[3]', values: { excluded: '4 at index 3', multiply: '1 × 2 × 3', output: '[24, 12, 8, 6]' }, helper: 'Now every answer slot has been filled.' },
          finalResult: { title: 'Final answer', body: 'Return [24, 12, 8, 6].' }
        }
      ]
    }
  },
  body: [
    { type: 'callout', tone: 'info', title: 'What “except self” means', content: 'For nums = [1, 2, 3, 4], answer[0] excludes nums[0], which is 1, and multiplies the rest: 2 × 3 × 4 = 24.' },
    {
      type: 'table',
      title: 'Before and after products for the given example',
      columns: ['Index', 'Skip value', 'Product before index', 'Product after index', 'Answer'],
      rows: [
        ['0', '1', '1', '2 × 3 × 4 = 24', '1 × 24 = 24'],
        ['1', '2', '1', '3 × 4 = 12', '1 × 12 = 12'],
        ['2', '3', '1 × 2 = 2', '4', '2 × 4 = 8'],
        ['3', '4', '1 × 2 × 3 = 6', '1', '6 × 1 = 6']
      ]
    },
    { type: 'callout', tone: 'info', title: 'Why the edge product is 1', content: 'At index 0, there is no product before the index yet. At index 3, there is no product after the index yet. We use 1 as the multiplication starting value because it does not change the other side of the answer.' },
    { type: 'callout', tone: 'info', title: 'Pattern signal', content: 'Use prefix/suffix thinking when each answer needs values before and after one skipped index.' },
    { type: 'checklist', title: 'Mistakes to avoid', items: ['Do not include nums[i] in output[i].', 'Do not rely on division.', 'Do not use 0 as the multiplication starting value.'] }
  ],
  relatedConcepts: ['prefix products', 'suffix products', 'running accumulator'],
  metadata: { reviewStatus: 'approved', visibility: ['dev', 'prod'] }
});

export default problem;
