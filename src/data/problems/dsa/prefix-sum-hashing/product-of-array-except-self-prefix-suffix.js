import { defineLearningProblem } from '../../../../problems/problemAuthoring.js';

const problem = defineLearningProblem({
  id: 'prefix-sum-hashing-product-except-self-001',
  topicId: 'prefix-sum-hashing',
  title: 'Product of Array Except Self — prefix/suffix thinking',
  difficulty: 'Medium',
  estimatedTime: '14 min',
  language: 'java',
  tags: ['arrays', 'prefix-suffix', 'interview-pattern', 'mental-model', 'visual-walkthrough', 'coding'],
  scenario: 'For each index, return the product of every number except the number at that index, without using division.',
  question: 'Given nums = [1, 2, 3, 4], return [24, 12, 8, 6].',
  examples: ['nums = [1, 2, 3, 4] -> [24, 12, 8, 6]'],
  constraints: ['Do not use division.', 'Each output index must exclude nums[i].', 'Use prefix and suffix products to avoid repeated multiplication.'],
  starterThought: 'For each position, split the world into two safe parts: everything on the left and everything on the right.',
  intuition: 'The answer at index i is the product before i multiplied by the product after i. A left pass stores products before each index. A right pass multiplies in products after each index.',
  mentalPicture: 'Each number stands in the middle of a line. It cannot use itself, so it looks left for one product and right for another product.',
  patternSignal: 'Use prefix/suffix thinking when each answer depends on information from both sides of the current index.',
  invariant: 'Before multiplying by the right product at index i, output[i] already contains the product of all values strictly to the left of i.',
  bruteForceThought: 'Brute force recomputes a product for every index, repeatedly multiplying the same neighboring values.',
  optimizationJourney: 'Division is disallowed and awkward with zeros. Prefix/suffix thinking avoids division and handles zeros naturally.',
  stepByStepBreakdown: ['Create an output array.', 'Left pass: store product of everything before index i.', 'Right pass: keep one running product of everything after index i.', 'Multiply output[i] by the running right product.', 'Update the right product after using nums[i].'],
  finalPattern: 'Precompute information before and after each position.',
  commonMistake: 'Accidentally including the current element in either the prefix or suffix product.',
  commonMistakes: ['Updating the running suffix before multiplying output[i].', 'Using division even though the constraint disallows it.', 'Counting the output array as extra space when the problem allows returning it.'],
  edgeCases: ['One zero in the array', 'Multiple zeros', 'Negative numbers', 'Array length two', 'Values of one'],
  complexityAnalysis: 'Time is O(n) because the array is scanned twice. Extra space is O(1) beyond the output array.',
  explanation: 'For nums = [1, 2, 3, 4], the left products are [1, 1, 2, 6]. Multiplying by right-side products during the right pass gives [24, 12, 8, 6].',
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
  finalTakeaway: 'For “everything except me” problems, split the world into “left of me” and “right of me.”',
  visualExplanation: 'The visual focuses on the changing output state instead of repeating a static list of steps.',
  visualWalkthrough: {
    title: 'Prefix and suffix walkthrough',
    summary: 'Each answer is left product times right product, excluding the current value.',
    diagram: {
      type: 'cards',
      title: 'Product except self walkthrough',
      description: 'Use the changing state panel to watch the output array get built one idea at a time.',
      stateTitle: 'Building the output array',
      stateDescription: 'The current number is excluded by writing or multiplying before the running product is updated.',
      frames: [
        { title: 'Start building output', state: { label: 'products before index', values: { output: '[1, _, _, _]', leftProduct: 1 }, helper: 'Index 0 has nothing before it.' }, description: 'Write the product before the current index.' },
        { title: 'Output stores products before each index', state: { label: 'products before index', values: { output: '[1, 1, 2, 6]' }, helper: 'Each cell excludes its own value.' }, description: 'The output now contains products strictly before each position.' },
        { title: 'Combine with values after each index', state: { label: 'products after index', values: { output: '[1, 1, 2, 6]', rightProduct: 1 }, helper: 'Index 3 has nothing after it.' }, description: 'Multiply by the product after the current index.' },
        { title: 'Final output is ready', state: { label: 'answer', values: { output: '[24, 12, 8, 6]' }, helper: 'Every index combines products before and after it.' }, description: 'All answers exclude the current value.', finalResult: { title: 'Final answer', body: 'Return [24, 12, 8, 6].' } }
      ]
    }
  },
  body: [
    { type: 'callout', tone: 'info', title: 'Pattern signal', content: 'Use prefix/suffix thinking when each answer depends on all items except the current one.' },
    { type: 'checklist', title: 'Mistakes to avoid', items: ['Do not include nums[i]', 'Do not rely on division', 'Handle zeros through multiplication naturally'] }
  ],
  relatedConcepts: ['prefix products', 'suffix products', 'running accumulator'],
  metadata: { reviewStatus: 'approved', visibility: ['dev', 'prod'] }
});

export default problem;
