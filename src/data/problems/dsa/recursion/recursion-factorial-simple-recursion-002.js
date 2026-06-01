import { defineLearningProblem } from '../../../../problems/problemAuthoring.js';

const problem = defineLearningProblem({
  id: 'recursion-factorial-simple-recursion-002',
  category: 'dsa',
  topicId: 'recursion',
  title: 'Factorial(n) — Simplest Recursion',
  difficulty: 'Easy',
  estimatedTime: '10 min',
  estimatedTimeSeconds: 600,
  language: 'java',
  tags: [
    'recursion',
    'factorial',
    'base-case',
    'call-stack',
    'java',
    'visual-walkthrough'
  ],
  scenario: 'You are given a non-negative integer n. Compute n factorial using recursion.',
  question: 'Write a recursive Java method factorial(n) that returns n!. For example, factorial(5) should return 120.',
  prompt: 'How does factorial(n) teach the base case, recursive case, and return unwinding in the simplest possible way?',
  examples: [
    'Input: n = 0 → Output: 1',
    'Input: n = 1 → Output: 1',
    'Input: n = 5 → Output: 120'
  ],
  constraints: [
    'n is a non-negative integer.',
    'Use recursion for this exercise.',
    'Assume n is small enough that the result fits in a long.'
  ],
  starterThought: 'Factorial has a natural smaller problem: n! = n × (n - 1)!. The smallest direct answer is 0! = 1.',
  intuition: 'Factorial works recursively because the answer for n depends on the answer for n - 1. You do not need to multiply every number immediately. You ask the smaller problem for its answer, then multiply by the current n as the calls return.',
  plainLanguageExplanation: 'To compute 5!, pause 5 × factorial(4). Then pause 4 × factorial(3), and keep going until the base case returns 1. After that, each waiting call resumes and multiplies its number.',
  mentalPicture: 'Imagine stacking plates labeled factorial(5), factorial(4), factorial(3), factorial(2), factorial(1). The top plate returns first, then each lower plate receives an answer and continues.',
  patternSignal: 'Use simple recursion when the problem can be expressed as the current value plus the same problem on a smaller input.',
  invariant: 'Every recursive call must reduce n, so the function eventually reaches n == 0 or n == 1.',
  bruteForceThought: 'An iterative loop can multiply from 1 to n, but this exercise is about learning how recursive calls pause and return.',
  optimizationJourney: 'There is no overlapping subproblem here, so memoization is unnecessary. The goal is to master the call stack before moving to harder recursion.',
  stepByStepBreakdown: [
    'Define the base case: if n is 0 or 1, return 1.',
    'Define the recursive case: return n * factorial(n - 1).',
    'Make sure each call moves closer to the base case by subtracting 1 from n.',
    'Trace factorial(5) as 5 * factorial(4).',
    'Continue until factorial(1) returns 1.',
    'Unwind the calls: 2 * 1, then 3 * 2, then 4 * 6, then 5 * 24.'
  ],
  finalPattern: 'Linear recursion with one smaller recursive call and one direct base case.',
  commonMistake: 'Forgetting the base case causes infinite recursion until the call stack overflows.',
  commonMistakes: [
    'Using n * factorial(n) instead of n * factorial(n - 1).',
    'Returning 0 for factorial(0). The correct value is 1.',
    'Writing a base case that never gets reached.',
    'Trying to multiply while going down without understanding that the final result is built while returning.'
  ],
  edgeCases: [
    'n = 0 should return 1.',
    'n = 1 should return 1.',
    'Large n can overflow numeric types or exceed stack depth, but that is outside this beginner exercise.'
  ],
  complexityAnalysis: 'Time is O(n) because the function makes one recursive call for each value from n down to 1. Space is O(n) because each call waits on the call stack until the base case returns.',
  explanation: 'For factorial(5), the function first builds a chain of waiting calls: 5 * factorial(4), 4 * factorial(3), 3 * factorial(2), and 2 * factorial(1). The base case factorial(1) returns 1. Then the stack unwinds: factorial(2) returns 2, factorial(3) returns 6, factorial(4) returns 24, and factorial(5) returns 120.',
  solutionCode: `class Solution {
    public long factorial(int n) {
        if (n < 0) {
            throw new IllegalArgumentException("n must be non-negative");
        }

        if (n == 0 || n == 1) {
            return 1;
        }

        return n * factorial(n - 1);
    }
}`,
  finalTakeaway: 'Factorial is the simplest recursion exercise: define the smallest answer, call the smaller problem, and let the answer build while the stack unwinds.',
  selfExplanationPrompt: 'Before reading the solution, trace factorial(4) on paper and write what each stack frame is waiting for.',
  visualExplanation: 'The visual lesson is the call stack. Calls go down from n to 1, then answers come back up from 1 to n.',
  visualWalkthrough: {
    title: 'Factorial call stack walkthrough',
    summary: 'Trace factorial(5) as recursive calls are pushed onto the stack, then popped as return values are computed.',
    steps: [
      'factorial(5) waits for factorial(4), then will multiply by 5.',
      'factorial(4) waits for factorial(3), then will multiply by 4.',
      'factorial(3) waits for factorial(2), then will multiply by 3.',
      'factorial(2) waits for factorial(1), then will multiply by 2.',
      'factorial(1) hits the base case and returns 1.',
      'The stack unwinds: 2, then 6, then 24, then 120.'
    ],
    diagram: {
      type: 'stack',
      title: 'Call stack for factorial(5)',
      description: 'Each frame waits for the smaller factorial call to return before it can finish.',
      frames: [
        {
          title: 'Push calls until the base case',
          state: { label: 'Going down', values: { call: 'factorial(5) → factorial(4) → factorial(3) → factorial(2) → factorial(1)' } },
          description: 'Each call pauses and asks for the answer to a smaller problem.'
        },
        {
          title: 'Base case returns',
          state: { label: 'Base case', values: { call: 'factorial(1)', returns: 1 } },
          description: 'The recursion stops because n is 1.'
        },
        {
          title: 'Unwind and multiply',
          state: { label: 'Returning up', values: { factorial2: 2, factorial3: 6, factorial4: 24, factorial5: 120 } },
          description: 'Each waiting call resumes, multiplies its n by the returned value, and returns its own answer.',
          finalResult: { title: 'Final answer', body: 'factorial(5) returns 120.' }
        }
      ]
    }
  },
  body: [
    {
      type: 'callout',
      tone: 'info',
      title: 'Practice ladder step 1',
      content: 'Factorial(n) is the first recursion practice because it has one obvious base case and one obvious smaller problem.'
    },
    {
      type: 'section',
      title: 'What you must learn here',
      content: 'Do not rush past factorial. Use it to understand how a recursive call pauses, waits for the smaller answer, and resumes when the smaller call returns.'
    }
  ],
  relatedConcepts: [
    'base case',
    'recursive case',
    'call stack',
    'return unwinding',
    'linear recursion'
  ],
  followUpQuestions: [
    'Why is factorial(0) equal to 1?',
    'What happens if the recursive call uses factorial(n) instead of factorial(n - 1)?',
    'How many stack frames are created for factorial(5)?',
    'Why is factorial not a dynamic programming problem in this basic form?'
  ],
  metadata: {
    sequence: 2,
    reviewStatus: 'approved',
    visibility: ['dev', 'prod'],
    source: 'original',
    estimatedTimeSeconds: 600
  }
});

export default problem;
