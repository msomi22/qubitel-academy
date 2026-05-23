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
  intuition: 'The walkthrough shows the meaning directly: for each index, skip that value and multiply all other values. The code represents “all other values” as two smaller groups: values before the index and values after the index. left side × right side gives everything except the current value.',
  mentalPicture: 'Imagine each output slot splitting the array into three parts: values on the left, the skipped value, and values on the right. The answer uses left × right and ignores the skipped value.',
  patternSignal: 'This fits prefix/suffix thinking because each answer needs values from both sides of one skipped index.',
  invariant: 'Each answer slot must be built from values before its index and values after its index, but not the value at that same index.',
  bruteForceThought: 'A direct solution would rebuild the product for every index by scanning the whole array and skipping only that index.',
  optimizationJourney: 'The repeated work is the clue. Products before an index are reused many times, and products after an index are reused many times. The first loop writes what is on the left of each index. The second loop multiplies what is on the right of each index. Left × right equals everything except the current value.',
  stepByStepBreakdown: ['For one slot, “except self” means skip nums[i] and multiply every other value.', 'Split “every other value” into two groups: values before i and values after i.', 'First loop writes the product of values before each index.', 'Second loop multiplies in the product of values after each index.', 'Left product × right product gives the final answer for that index.'],
  finalPattern: 'Precompute information before and after each position.',
  commonMistake: 'Including the current value in its own answer.',
  commonMistakes: ['Including nums[i] in output[i].', 'Using division even though the constraint disallows it.', 'Forgetting that edge positions still need a neutral multiplication value.', 'Counting the returned output array as extra space when the problem allows it.'],
  edgeCases: ['One zero in the array', 'Multiple zeros', 'Negative numbers', 'Array length two', 'Values of one'],
  complexityAnalysis: 'Time is O(n) because each index is visited from the left side and from the right side. Extra space is O(1) beyond the output array because the returned answer array is required.',
  explanation: 'The visual says: skip one value and multiply everything else. The code turns “everything else” into left side × right side. answer is the array we will return. leftProduct means “product of numbers before the current index.” The first loop writes that left-side product into answer[i], then updates leftProduct with nums[i] for the next index. rightProduct means “product of numbers after the current index.” The second loop multiplies answer[i] by that right-side product, then updates rightProduct with nums[i] for the next index to the left. The update lines change leftProduct or rightProduct only; they are not writing into answer[i].',
  approach: 'Break every answer into two pieces: product before the index and product after the index. For [1, 2, 3, 4], look at index 2 where nums[2] is 3. The walkthrough answer is 1 × 2 × 4. The code sees that as left side before index 2 = 1 × 2, and right side after index 2 = 4. So answer[2] = 2 × 4 = 8. The first loop is not trying to finish the answer; it only prepares the left side for every index: [1, 1, 2, 6]. The second loop brings the missing right side and completes the answer.',
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
  finalTakeaway: 'The first loop writes what is on the left of each index. The second loop multiplies what is on the right of each index. Left × right = everything except the current value.',
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
    { type: 'callout', tone: 'info', title: 'Bridge from visual to code', content: 'The visual says: skip one value and multiply everything else. The code splits “everything else” into two pieces: everything before the index and everything after the index.' },
    { type: 'callout', tone: 'info', title: 'Key idea', content: 'The first loop writes what is on the left of each index. The second loop multiplies what is on the right of each index. Left × right = everything except the current value.' },
    { type: 'callout', tone: 'info', title: 'Example at index 2', content: 'For nums = [1, 2, 3, 4], index 2 holds 3. Product except self is 1 × 2 × 4. The code sees that as left side 1 × 2 and right side 4, so answer[2] = 2 × 4 = 8.' },
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
