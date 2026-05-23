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
  starterThought: 'Start with one output slot: skip the value at that index and multiply everything else.',
  intuition: 'For nums = [1, 2, 3, 4], each output slot skips one value and multiplies the other three values. output[0] skips 1 and uses 2 × 3 × 4. output[1] skips 2 and uses 1 × 3 × 4. output[2] skips 3 and uses 1 × 2 × 4. output[3] skips 4 and uses 1 × 2 × 3.',
  mentalPicture: 'Imagine each output slot pointing at one input value and saying: “skip this one, multiply the rest.”',
  patternSignal: 'This fits prefix/suffix thinking because each answer needs values from both sides of one skipped index.',
  invariant: 'Each answer slot must be built from values before its index and values after its index, but not the value at that same index.',
  bruteForceThought: 'A direct solution would rebuild the product for every index by scanning the whole array and skipping only that index.',
  optimizationJourney: 'The repeated work is the clue. Products before an index are reused many times, and products after an index are reused many times. We can prepare those two sides instead of recomputing the whole product for every slot.',
  stepByStepBreakdown: ['For one slot, “except self” means skip nums[i] and multiply every other value.', 'Split “every other value” into two groups: values before i and values after i.', 'Prepare the product of values before each index.', 'Prepare the product of values after each index.', 'Combine before × after to get the final value for that index.'],
  finalPattern: 'Precompute information before and after each position.',
  commonMistake: 'Including the current value in its own answer.',
  commonMistakes: ['Including nums[i] in output[i].', 'Using division even though the constraint disallows it.', 'Forgetting that edge positions still need a neutral multiplication value.', 'Counting the returned output array as extra space when the problem allows it.'],
  edgeCases: ['One zero in the array', 'Multiple zeros', 'Negative numbers', 'Array length two', 'Values of one'],
  complexityAnalysis: 'Time is O(n) because each index is visited from the left side and from the right side. Extra space is O(1) beyond the output array because the returned answer array is required.',
  explanation: 'The code below represents the visual idea as two sides around each index. answer is the array we return. leftProduct holds the product of values before the current index, so the first loop writes that left-side product into answer[i]. Then it updates leftProduct with nums[i] for the next index. rightProduct holds the product of values after the current index, so the second loop multiplies answer[i] by that right-side product. Then it updates rightProduct with nums[i] for the next index to the left. The update lines change leftProduct or rightProduct only; they are not writing into answer[i].',
  approach: 'Break every answer into two pieces: product before the index and product after the index. For [1, 2, 3, 4], index 2 skips 3. The answer is 1 × 2 × 4. That can be seen as left side 1 × 2 and right side 4, so answer[2] = 2 × 4 = 8.',
  solutionCode: `class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] answer = new int[n];

        // leftProduct is the product of values before index i.
        int leftProduct = 1;
        for (int i = 0; i < n; i++) {
            // Write the before-product for this index.
            answer[i] = leftProduct;

            // Prepare leftProduct for the next index.
            // This updates leftProduct only, not answer[i].
            leftProduct = leftProduct * nums[i];
        }

        // rightProduct is the product of values after index i.
        int rightProduct = 1;
        for (int i = n - 1; i >= 0; i--) {
            // Complete answer[i] by adding the after-product.
            answer[i] = answer[i] * rightProduct;

            // Prepare rightProduct for the next index to the left.
            // This updates rightProduct only, not answer[i].
            rightProduct = rightProduct * nums[i];
        }

        return answer;
    }
}`,
  finalTakeaway: 'Each answer slot is product before its index × product after its index. That is the same as multiplying every value except the current one.',
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
    { type: 'checklist', title: 'Mistakes to avoid', items: ['Do not include nums[i] in output[i].', 'Do not rely on division.', 'Do not use 0 as the multiplication starting value.'] }
  ],
  relatedConcepts: ['prefix products', 'suffix products', 'running accumulator'],
  metadata: { reviewStatus: 'approved', visibility: ['dev', 'prod'] }
});

export default problem;
