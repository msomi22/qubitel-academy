import { defineLearningProblem } from '../../../../problems/problemAuthoring.js';

const problem = defineLearningProblem({
  id: 'recursion-fibonacci-branching-recursion-003',
  category: 'dsa',
  topicId: 'recursion',
  title: 'Fibonacci(n) - Branching Recursion',
  difficulty: 'Easy',
  estimatedTime: '15 min',
  estimatedTimeSeconds: 900,
  language: 'java',
  tags: ['recursion', 'fibonacci', 'branching-recursion', 'base-case', 'call-stack', 'memory', 'recursion-tree', 'java'],
  scenario: 'You are moving from linear recursion into branching recursion. Fibonacci is the first exercise where one parent call waits for two child calls instead of one.',
  question: 'Write a recursive Java method fib(n) that returns the nth Fibonacci number. Use the simple branching-recursion solution where fib(n) returns fib(n - 1) + fib(n - 2).',
  prompt: 'How does Fibonacci teach branching recursion, call-stack memory, waiting parent calls, return unwinding, and repeated work?',
  examples: [
    'Input: n = 0 -> Output: 0',
    'Input: n = 1 -> Output: 1',
    'Input: n = 2 -> Output: 1',
    'Input: n = 3 -> Output: 2',
    'Input: n = 5 -> Output: 5',
    'Input: n = 6 -> Output: 8'
  ],
  constraints: [
    'n is a non-negative integer.',
    'Use the simple recursive solution for this exercise.',
    'Assume n is small enough that stack depth and integer size are not the main focus.'
  ],
  starterThought: 'Fibonacci starts with two direct answers: fib(0) = 0 and fib(1) = 1. Every larger answer needs the previous two answers.',
  plainLanguageExplanation: 'Fibonacci is a sequence where each number is made by adding the previous two numbers. The sequence starts 0, 1, 1, 2, 3, 5, 8, 13, and keeps going. The number at position n is called fib(n).',
  intuition: 'Use the everyday memory: to know today\'s number, I need yesterday\'s number and the day before yesterday\'s number. In recursion, yesterday becomes fib(n - 1), and the day before yesterday becomes fib(n - 2).',
  mentalPicture: 'Factorial creates one smaller call at each step. Fibonacci creates two smaller calls at each non-base step. A parent like fib(5) pauses while it waits for fib(4) and fib(3). Each child call gets its own stack frame, returns a value, and is popped from memory when complete.',
  patternSignal: 'Use branching recursion when one problem naturally splits into two or more smaller versions of the same problem.',
  invariant: 'Every recursive branch must move toward fib(1) or fib(0), otherwise the recursion will not stop.',
  bruteForceThought: 'The naive recursive version is intentionally simple. It follows the definition directly, even though it repeats work.',
  optimizationJourney: 'Memoization can remember repeated answers and make Fibonacci much faster, but that belongs to dynamic programming. This lesson stays focused on understanding branching recursion and call-stack behavior.',
  stepByStepBreakdown: [
    'Handle fib(0) immediately by returning 0.',
    'Handle fib(1) immediately by returning 1.',
    'For every n greater than 1, ask for fib(n - 1) and fib(n - 2).',
    'Let Java evaluate the left recursive call first: fib(n - 1).',
    'When the left side returns, evaluate the right recursive call: fib(n - 2).',
    'Add the two returned values and return the sum to the waiting parent.'
  ],
  finalPattern: 'Branching recursion with two base cases and two smaller recursive calls.',
  commonMistake: 'The most common mistake is treating Fibonacci like factorial. Factorial has one smaller call; Fibonacci needs two smaller calls.',
  commonMistakes: [
    'Forgetting one of the base cases. Both fib(0) and fib(1) must return directly.',
    'Returning 1 for fib(0). The correct value is 0.',
    'Using only fib(n - 1), which makes the recursion linear but gives the wrong Fibonacci answer.',
    'Assuming Fibonacci is efficient just because the code is short.',
    'Not noticing that the same calls are repeated, such as fib(3), fib(2), and fib(1).',
    'Misunderstanding Java evaluation order. In fib(n - 1) + fib(n - 2), Java evaluates the left call before the right call.'
  ],
  edgeCases: [
    'n = 0 should return 0.',
    'n = 1 should return 1.',
    'n = 2 should return fib(1) + fib(0), which is 1.',
    'Large n becomes slow with naive recursion because repeated subproblems grow quickly.'
  ],
  complexityAnalysis: 'Time complexity is exponential for naive recursion because most calls branch into two more calls and many smaller answers are recomputed. The code for fib(5) already computes fib(3), fib(2), and fib(1) more than once. Space complexity is O(n) because the deepest active path on the call stack goes from fib(n) down to fib(1) or fib(0), even though the total number of calls is much larger.',
  explanation: 'For fib(5), the method first asks for fib(4) and fib(3). Java starts with the left side, so fib(4) is explored before the right fib(3). Each call waits on the stack while its child calls run. Base cases return direct values, then parent calls add returned values during unwinding: fib(2) returns 1, fib(3) returns 2, fib(4) returns 3, and finally fib(5) returns 5.',
  solutionCode: `class Solution {
    public int fib(int n) {
        if (n == 0) {
            return 0;
        }
        if (n == 1) {
            return 1;
        }

        return fib(n - 1) + fib(n - 2);
    }
}`,
  finalTakeaway: 'Fibonacci is the learner\'s first branching-recursion exercise: one parent call creates two child calls, waits, receives values, adds them, and returns upward.',
  selfExplanationPrompt: 'Before moving on, trace fib(4) on paper. Write the active stack, mark which parent is waiting, and circle each repeated call.',
  visualExplanation: 'Trace fib(4). Watch parent calls go to sleep, child calls return, and answers get substituted into the parent equations.',
  visualWalkthrough: {
    title: 'Fibonacci(4) - The Math Substitution Visualizer',
    summary: 'Watch how parent functions go to sleep, wait for their children, and substitute the answers into their equations.',
    diagram: {
      id: 'recursion-fibonacci-branching-recursion-003-walkthrough',
      type: 'recursion-branching',
      input: 4,
      title: 'Fibonacci(4) - The Math Substitution Visualizer',
      summary: 'Watch how parent functions go to sleep, wait for their children, and substitute the answers into their equations.'
    }
  },
  body: [
    {
      type: 'checklist',
      title: 'Objective',
      items: [
        'I can explain what Fibonacci means.',
        'I can identify the base cases for fib(0) and fib(1).',
        'I can trace how fib(n) branches into two smaller calls.',
        'I can describe what gets pushed to and popped from the call stack.',
        'I can explain why naive Fibonacci repeats work.'
      ]
    },
    { type: 'section', title: 'What Fibonacci means', content: 'Fibonacci is a sequence where each number is made by adding the previous two numbers. It starts as 0, 1, 1, 2, 3, 5, 8, 13, and continues the same way.' },
    {
      type: 'table',
      title: 'How the first Fibonacci values are formed',
      columns: ['Value', 'Meaning'],
      rows: [
        ['fib(0)', '0'],
        ['fib(1)', '1'],
        ['fib(2)', 'fib(1) + fib(0) = 1 + 0 = 1'],
        ['fib(3)', 'fib(2) + fib(1) = 1 + 1 = 2'],
        ['fib(4)', 'fib(3) + fib(2) = 2 + 1 = 3'],
        ['fib(5)', 'fib(4) + fib(3) = 3 + 2 = 5'],
        ['fib(6)', 'fib(5) + fib(4) = 5 + 3 = 8']
      ]
    },
    { type: 'callout', tone: 'info', title: 'Mental model before formula', content: 'To know today\'s number, I need yesterday\'s number and the day before yesterday\'s number. That is why fib(n) needs two smaller answers.' },
    {
      type: 'comparison',
      title: 'Factorial vs Fibonacci',
      items: [
        { label: 'Factorial', content: 'One recursive call waits for one smaller answer, such as factorial(n - 1).' },
        { label: 'Fibonacci', content: 'One recursive call waits for two smaller answers, fib(n - 1) and fib(n - 2).' }
      ]
    },
    { type: 'callout', tone: 'warning', title: 'Why this is educational but inefficient', content: 'Naive Fibonacci repeats smaller calls. That is useful for learning recursion trees, but it becomes slow for large n. Later, dynamic programming adds memory so repeated answers are reused.' }
  ],
  solutionBody: [
    {
      type: 'table',
      title: 'Return table for fib(5)',
      columns: ['Call returns', 'What it adds', 'Returned value'],
      rows: [
        ['fib(2)', 'fib(1) + fib(0) = 1 + 0', '1'],
        ['fib(3)', 'fib(2) + fib(1) = 1 + 1', '2'],
        ['fib(4)', 'fib(3) + fib(2) = 2 + 1', '3'],
        ['fib(5)', 'fib(4) + fib(3) = 3 + 2', '5']
      ]
    },
    {
      type: 'checklist',
      title: 'Trace checklist',
      items: [
        'Write both base cases before writing the recursive return.',
        'Trace the left call first because Java evaluates fib(n - 1) before fib(n - 2).',
        'Mark parent calls as waiting while child calls execute.',
        'Pop a stack frame only when that call has returned a value.',
        'Circle repeated calls so the future dynamic programming improvement feels obvious.'
      ]
    }
  ],
  relatedConcepts: ['base case', 'recursive case', 'branching recursion', 'call stack', 'return unwinding', 'recursion tree', 'overlapping subproblems'],
  followUpQuestions: [
    'Why does fib(0) return 0 while factorial(0) returns 1?',
    'Which call is evaluated first in Java: fib(n - 1) or fib(n - 2)?',
    'Where does fib(2) repeat while tracing fib(5)?',
    'Why is the deepest stack path O(n) even though the total number of calls is much larger?',
    'How would memoization avoid repeated work without changing the meaning of Fibonacci?'
  ],
  metadata: {
    sequence: 3,
    reviewStatus: 'approved',
    visibility: ['dev', 'prod'],
    source: 'original',
    estimatedTimeSeconds: 900
  }
});

export default problem;
