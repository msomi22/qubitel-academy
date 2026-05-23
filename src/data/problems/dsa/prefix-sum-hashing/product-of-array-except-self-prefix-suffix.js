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
  starterThought: 'At each index, identify the current number as the one excluded from that answer slot. Then multiply the other numbers.',
  intuition: '“Product except self” means each position gets the product of all the other positions. For [1, 2, 3, 4], answer[0] excludes 1 and becomes 2 × 3 × 4 = 24. answer[1] excludes 2 and becomes 1 × 3 × 4 = 12.',
  mentalPicture: 'Imagine each answer slot pointing to one input number and saying, “leave this one out, multiply the rest.”',
  patternSignal: 'Use prefix/suffix thinking when each answer depends on information from both sides of the current index.',
  invariant: 'Before multiplying by the right product at index i, output[i] already contains the product of all values strictly to the left of i.',
  bruteForceThought: 'Brute force recomputes a product for every index by excluding the current value and multiplying all the others again.',
  optimizationJourney: 'Once “except self” is clear, the optimization is to avoid rebuilding the same products many times. The code uses two simple passes: the first pass stores what is before each index, and the second pass multiplies in what is after each index.',
  stepByStepBreakdown: ['For each index, identify nums[i] as the excluded value.', 'The answer at that index must multiply every other number.', 'First loop, left to right: write the product before the current index into answer[i].', 'Second loop, right to left: multiply answer[i] by the product after the current index.', 'Update the running product only after using the current value, so the current value is not included in its own answer.'],
  finalPattern: 'Precompute information before and after each position.',
  commonMistake: 'Accidentally including the current element in either the prefix or suffix product.',
  commonMistakes: ['Including the current value in the product for its own index.', 'Updating the running suffix before multiplying output[i].', 'Using division even though the constraint disallows it.', 'Counting the output array as extra space when the problem allows returning it.'],
  edgeCases: ['One zero in the array', 'Multiple zeros', 'Negative numbers', 'Array length two', 'Values of one'],
  complexityAnalysis: 'Time is O(n) because the code makes two linear passes: one pass builds products from the left, and one pass combines products from the right. Extra space is O(1) beyond the output array.',
  explanation: 'Product except self means every output position excludes the number at the same index. For nums = [1, 2, 3, 4], answer[0] excludes 1 and multiplies 2 × 3 × 4 = 24. answer[1] excludes 2 and multiplies 1 × 3 × 4 = 12. answer[2] excludes 3 and multiplies 1 × 2 × 4 = 8. answer[3] excludes 4 and multiplies 1 × 2 × 3 = 6. In code, the first loop writes the left-side product into each answer slot. The second loop walks from the right and multiplies in the right-side product. Together, those two pieces form “everything except self.”',
  approach: 'Use the output array as a notepad. In the first loop, answer[i] stores the product of values before i. For [1, 2, 3, 4], this creates [1, 1, 2, 6]. In the second loop, keep one rightProduct value. Before updating rightProduct with nums[i], multiply answer[i] by rightProduct. This adds the product of values after i without including nums[i].',
  solutionCode: `class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] answer = new int[n];

        int leftProduct = 1;
        for (int i = 0; i < n; i++) {
            answer[i] = leftProduct;
            leftProduct *= nums[i];
        }

        int rightProduct = 1;
        for (int i = n - 1; i >= 0; i--) {
            answer[i] *= rightProduct;
            rightProduct *= nums[i];
        }

        return answer;
    }
}`,
  finalTakeaway: 'For “everything except me” problems, first exclude the current value, then multiply what remains around it. The two loops simply collect the two sides: before me, then after me.',
  visualExplanation: 'The visual explains the given example directly. Each frame builds one answer slot for nums = [1, 2, 3, 4]. The code uses two loops to build the same idea efficiently: one left pass for products before each index, then one right pass for products after each index.',
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
    { type: 'callout', tone: 'info', title: 'What “except self” means', content: 'For nums = [1, 2, 3, 4], answer[0] excludes 1 and multiplies the rest: 2 × 3 × 4 = 24.' },
    { type: 'callout', tone: 'info', title: 'Why the code has two loops', content: 'The first loop collects the product before each index. The second loop collects the product after each index. Multiplying those two parts gives the answer without including the current value.' },
    { type: 'callout', tone: 'info', title: 'Pattern signal', content: 'Use prefix/suffix thinking when each answer depends on all items except the current one.' },
    { type: 'checklist', title: 'Mistakes to avoid', items: ['Do not include nums[i]', 'Do not rely on division', 'Handle zeros through multiplication naturally'] }
  ],
  relatedConcepts: ['prefix products', 'suffix products', 'running accumulator'],
  metadata: { reviewStatus: 'approved', visibility: ['dev', 'prod'] }
});

export default problem;
