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
  examples: ['nums = [1, 2, 3, 4] -> [24, 12, 8, 6]', 'Meaning example: nums = [2, 3, 4] -> index 0 excludes 2, so answer[0] = 3 × 4 = 12'],
  constraints: ['Do not use division.', 'Each output index must exclude nums[i].', 'Use prefix and suffix products to avoid repeated multiplication.'],
  starterThought: 'At each index, point at the current number and say: “this one is self, so do not multiply it.” Then multiply everything around it.',
  intuition: '“Product except self” means each position gets the product of all the other positions. For [2, 3, 4], index 0 holds 2, so self is 2 and the answer there is 3 × 4 = 12. Index 1 holds 3, so self is 3 and the answer there is 2 × 4 = 8.',
  mentalPicture: 'Imagine each number stepping out of the line for its own turn. The remaining numbers multiply together to fill that number’s answer slot.',
  patternSignal: 'Use prefix/suffix thinking when each answer depends on information from both sides of the current index.',
  invariant: 'Before multiplying by the right product at index i, output[i] already contains the product of all values strictly to the left of i.',
  bruteForceThought: 'Brute force recomputes a product for every index by skipping the current value and multiplying all the others again.',
  optimizationJourney: 'Once “except self” is clear, the optimization is to avoid rebuilding the same products many times. Store the product before each index, then combine it with the product after each index.',
  stepByStepBreakdown: ['For each index, identify nums[i] as self.', 'The answer at that index must multiply every number except self.', 'Create an output array.', 'Store the product of everything before index i.', 'Multiply by the product of everything after index i.'],
  finalPattern: 'Precompute information before and after each position.',
  commonMistake: 'Accidentally including the current element in either the prefix or suffix product.',
  commonMistakes: ['Including self in the product for its own index.', 'Updating the running suffix before multiplying output[i].', 'Using division even though the constraint disallows it.', 'Counting the output array as extra space when the problem allows returning it.'],
  edgeCases: ['One zero in the array', 'Multiple zeros', 'Negative numbers', 'Array length two', 'Values of one'],
  complexityAnalysis: 'Time is O(n) because the array is scanned twice. Extra space is O(1) beyond the output array.',
  explanation: 'Product except self means every output position excludes the number at the same index. For nums = [1, 2, 3, 4], answer[0] excludes 1 and multiplies 2 × 3 × 4 = 24. answer[1] excludes 2 and multiplies 1 × 3 × 4 = 12. The final output is [24, 12, 8, 6].',
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
  finalTakeaway: 'For “everything except me” problems, first remove self from the product, then multiply what remains around it.',
  visualExplanation: 'The visual focuses on the changing output state. Each answer slot represents one index whose own value is excluded.',
  visualWalkthrough: {
    title: 'Prefix and suffix walkthrough',
    summary: 'Each answer is the product of everything except the number at that same index.',
    diagram: {
      type: 'cards',
      title: 'Product except self walkthrough',
      description: 'Self means the number at the current index. That number is skipped when filling its own answer slot.',
      stateTitle: 'Building the output array',
      stateDescription: 'Each output slot excludes its own input value, then combines the product before it with the product after it.',
      frames: [
        { title: 'What does except self mean?', state: { label: 'meaning first', values: { nums: '[2, 3, 4]', self: '2 at index 0', answer0: '3 × 4 = 12' }, helper: 'At index 0, self is 2, so 2 is skipped and the other numbers are multiplied.' }, description: 'Before optimizing, understand the target: each index skips its own value.' },
        { title: 'Start building output', state: { label: 'products before index', values: { output: '[1, _, _, _]', leftProduct: 1 }, helper: 'Index 0 has nothing before it.' }, description: 'Write the product before the current index.' },
        { title: 'Output stores products before each index', state: { label: 'products before index', values: { output: '[1, 1, 2, 6]' }, helper: 'Each cell still excludes its own value.' }, description: 'The output now contains products strictly before each position.' },
        { title: 'Combine with values after each index', state: { label: 'products after index', values: { output: '[24, 12, 8, 6]' }, helper: 'Each answer combines products before and after its own index.' }, description: 'After combining both sides, every answer excludes self.', finalResult: { title: 'Final answer', body: 'Return [24, 12, 8, 6].' } }
      ]
    }
  },
  body: [
    { type: 'callout', tone: 'info', title: 'What “except self” means', content: 'At index 0 in [2, 3, 4], self is 2. So answer[0] ignores 2 and multiplies the rest: 3 × 4 = 12.' },
    { type: 'callout', tone: 'info', title: 'Pattern signal', content: 'Use prefix/suffix thinking when each answer depends on all items except the current one.' },
    { type: 'checklist', title: 'Mistakes to avoid', items: ['Do not include nums[i]', 'Do not rely on division', 'Handle zeros through multiplication naturally'] }
  ],
  relatedConcepts: ['prefix products', 'suffix products', 'running accumulator'],
  metadata: { reviewStatus: 'approved', visibility: ['dev', 'prod'] }
});

export default problem;
