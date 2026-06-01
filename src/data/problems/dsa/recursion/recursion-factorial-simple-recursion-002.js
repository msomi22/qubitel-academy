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
  scenario: 'You are learning the first recursion exercise: factorial. Factorial means multiplying a number by every positive whole number below it.',
  question: 'Write a recursive Java method factorial(n) that returns n!. For example, factorial(5) should return 120 because 5! = 5 × 4 × 3 × 2 × 1.',
  prompt: 'How does factorial(n) teach the base case, recursive case, and return unwinding in the simplest possible way?',
  examples: [
    'Input: n = 0 → Output: 1 because 0! is defined as 1.',
    'Input: n = 1 → Output: 1 because 1! = 1.',
    'Input: n = 3 → Output: 6 because 3! = 3 × 2 × 1.',
    'Input: n = 5 → Output: 120 because 5! = 5 × 4 × 3 × 2 × 1.'
  ],
  constraints: [
    'n is a non-negative integer.',
    'Use recursion for this exercise.',
    'Assume n is small enough that the result fits in a long.'
  ],
  starterThought: 'Factorial has a natural smaller problem: n! = n × (n - 1)!. The smallest direct answer is 0! = 1 or 1! = 1.',
  intuition: 'Factorial is beginner-friendly because it has one clear job: multiply the current number by the factorial of the number just below it. To compute 5!, first find 4!, then multiply that answer by 5. To find 4!, first find 3!, then multiply by 4. This continues until the base case returns 1.',
  plainLanguageExplanation: 'The symbol n! is read as “n factorial.” It means multiply n by every whole number below it until 1. So 4! means 4 × 3 × 2 × 1 = 24. Recursion works here because 4! can be written as 4 × 3!, and 3! can be written as 3 × 2!.',
  mentalPicture: 'Do this exactly as you would on paper. On the left, draw the call tree as a chain: factorial(5) → factorial(4) → factorial(3) → factorial(2) → factorial(1). On the right, draw a stack of plates. Each new call is a plate added on top. Each return removes the top plate and writes the returned value beside the waiting call below it.',
  patternSignal: 'Use simple recursion when the problem can be expressed as the current value plus the same problem on a smaller input.',
  invariant: 'Every recursive call must reduce n, so the function eventually reaches n == 0 or n == 1.',
  bruteForceThought: 'An iterative loop can multiply from 1 to n, but this exercise is about learning how recursive calls pause and return.',
  optimizationJourney: 'There is no overlapping subproblem here, so memoization is unnecessary. The goal is to master the call stack before moving to harder recursion.',
  stepByStepBreakdown: [
    'Write the original call on paper: factorial(5).',
    'Draw an arrow to the smaller call: factorial(5) needs factorial(4).',
    'Push factorial(5) onto the stack of plates because it is now waiting.',
    'Repeat the same paper action for factorial(4), factorial(3), and factorial(2).',
    'Stop when factorial(1) reaches the base case and returns 1.',
    'Pop factorial(1), then write return 1 beside factorial(2).',
    'Pop each waiting call one by one, writing the multiplication and returned value beside it.'
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
  explanation: 'For factorial(5), the function first pushes waiting calls onto the stack: factorial(5), factorial(4), factorial(3), factorial(2), and factorial(1). The base case factorial(1) returns 1. Then each completed call is popped from the stack: factorial(2) returns 2, factorial(3) returns 6, factorial(4) returns 24, and factorial(5) returns 120.',
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
  finalTakeaway: 'Factorial is the simplest recursion exercise: define the smallest answer, draw the call tree, push smaller calls onto the stack, then pop completed calls as the answer unwinds.',
  selfExplanationPrompt: 'Before reading the solution, draw factorial(5) on paper. Use one side for the call tree and one side for the stack of plates. Mark every push and every pop.',
  visualExplanation: 'The visual uses factorial(5) and follows the same paper method learners should practice: draw the call chain, push one plate per call, then pop one plate per return. Each click changes the stack by one clear action.',
  visualWalkthrough: {
    title: 'Factorial on paper — call tree and stack of plates',
    summary: 'Pretend you are drawing this by hand. Each frame shows what to draw next in the call tree and what plate is added to or removed from the stack.',
    diagram: {
      type: 'array',
      title: 'Stack of plates for factorial(5)',
      description: 'Each cell is one stack plate. Build the stack from factorial(5) up to factorial(1), then remove plates from factorial(1) back down to factorial(5).',
      values: ['5! plate', '4! plate', '3! plate', '2! plate', '1! plate'],
      stateTitle: 'Paper trace',
      stateDescription: 'Draw the call tree on paper and update the stack of plates after every click.',
      legend: [
        { role: 'current', label: 'plate just added / active call', marker: 'PUSH' },
        { role: 'window', label: 'plate waiting below', marker: 'WAIT' },
        { role: 'success', label: 'plate removed with return value', marker: 'POP' },
        { role: 'answer', label: 'final returned answer', marker: 'DONE' }
      ],
      frames: [
        {
          title: '1. Draw factorial(5), then push its plate',
          description: 'On paper, write factorial(5). It needs factorial(4), so put the factorial(5) plate on the stack while it waits.',
          items: [
            { index: 0, role: 'current', caption: 'push 5!' }
          ],
          state: { label: 'PAPER STEP 1', values: { callTree: 'factorial(5)', stackOfPlatesTopLast: '[5!]', waitingExpression: '5 × factorial(4)' }, helper: 'The first plate is waiting for a smaller answer.' }
        },
        {
          title: '2. Draw factorial(4), then push its plate',
          description: 'Extend the call tree: factorial(5) → factorial(4). Put the factorial(4) plate on top of factorial(5).',
          items: [
            { index: 0, role: 'window', caption: '5! waits' },
            { index: 1, role: 'current', caption: 'push 4!' }
          ],
          state: { label: 'PAPER STEP 2', values: { callTree: 'factorial(5) → factorial(4)', stackOfPlatesTopLast: '[5!, 4!]', waitingExpression: '4 × factorial(3)' }, helper: 'The newest plate is always placed on top.' }
        },
        {
          title: '3. Draw factorial(3), then push its plate',
          description: 'Extend the call tree again and add the factorial(3) plate to the top of the stack.',
          items: [
            { index: 0, role: 'window', caption: '5! waits' },
            { index: 1, role: 'window', caption: '4! waits' },
            { index: 2, role: 'current', caption: 'push 3!' }
          ],
          state: { label: 'PAPER STEP 3', values: { callTree: 'factorial(5) → factorial(4) → factorial(3)', stackOfPlatesTopLast: '[5!, 4!, 3!]', waitingExpression: '3 × factorial(2)' }, helper: 'Keep drawing until the base case is reached.' }
        },
        {
          title: '4. Draw factorial(2), then push its plate',
          description: 'factorial(2) still has a smaller problem: factorial(1). Add the factorial(2) plate on top.',
          items: [
            { index: 0, role: 'window', caption: '5! waits' },
            { index: 1, role: 'window', caption: '4! waits' },
            { index: 2, role: 'window', caption: '3! waits' },
            { index: 3, role: 'current', caption: 'push 2!' }
          ],
          state: { label: 'PAPER STEP 4', values: { callTree: 'factorial(5) → factorial(4) → factorial(3) → factorial(2)', stackOfPlatesTopLast: '[5!, 4!, 3!, 2!]', waitingExpression: '2 × factorial(1)' }, helper: 'Every plate below the top is paused and waiting.' }
        },
        {
          title: '5. Draw factorial(1), then mark base case',
          description: 'factorial(1) is the base case. Add its plate, circle it on paper, and write returns 1.',
          items: [
            { index: 0, role: 'window', caption: '5! waits' },
            { index: 1, role: 'window', caption: '4! waits' },
            { index: 2, role: 'window', caption: '3! waits' },
            { index: 3, role: 'window', caption: '2! waits' },
            { index: 4, role: 'current', caption: 'base case' }
          ],
          state: { label: 'BASE CASE', values: { callTree: 'factorial(5) → factorial(4) → factorial(3) → factorial(2) → factorial(1)', stackOfPlatesTopLast: '[5!, 4!, 3!, 2!, 1!]', writeOnPaper: 'factorial(1) = 1' }, helper: 'The base case is where the stack stops growing.' }
        },
        {
          title: '6. Remove the factorial(1) plate',
          description: 'Pop the top plate. Write return 1 beside factorial(2), because factorial(2) was waiting for that answer.',
          items: [
            { index: 0, role: 'window', caption: '5! waits' },
            { index: 1, role: 'window', caption: '4! waits' },
            { index: 2, role: 'window', caption: '3! waits' },
            { index: 3, role: 'current', caption: 'receives 1' },
            { index: 4, role: 'success', caption: 'pop 1!' }
          ],
          state: { label: 'POP 1!', values: { removedPlate: '1!', returnedValue: 1, stackOfPlatesTopLast: '[5!, 4!, 3!, 2!]', writeOnPaper: 'factorial(2) receives 1' }, helper: 'Only the top plate can be removed.' }
        },
        {
          title: '7. Remove the factorial(2) plate',
          description: 'factorial(2) now computes 2 × 1 = 2. Pop its plate and write return 2 beside factorial(3).',
          items: [
            { index: 0, role: 'window', caption: '5! waits' },
            { index: 1, role: 'window', caption: '4! waits' },
            { index: 2, role: 'current', caption: 'receives 2' },
            { index: 3, role: 'success', caption: 'pop 2!' },
            { index: 4, role: 'success', caption: 'returned 1' }
          ],
          state: { label: 'POP 2!', values: { removedPlate: '2!', computation: '2 × 1 = 2', returnedValue: 2, stackOfPlatesTopLast: '[5!, 4!, 3!]', writeOnPaper: 'factorial(3) receives 2' }, helper: 'This is return unwinding: answers move back down the call tree.' }
        },
        {
          title: '8. Remove the factorial(3) plate',
          description: 'factorial(3) computes 3 × 2 = 6. Pop its plate and write return 6 beside factorial(4).',
          items: [
            { index: 0, role: 'window', caption: '5! waits' },
            { index: 1, role: 'current', caption: 'receives 6' },
            { index: 2, role: 'success', caption: 'pop 3!' },
            { index: 3, role: 'success', caption: 'returned 2' },
            { index: 4, role: 'success', caption: 'returned 1' }
          ],
          state: { label: 'POP 3!', values: { removedPlate: '3!', computation: '3 × 2 = 6', returnedValue: 6, stackOfPlatesTopLast: '[5!, 4!]', writeOnPaper: 'factorial(4) receives 6' }, helper: 'Every popped plate completes one waiting expression.' }
        },
        {
          title: '9. Remove the factorial(4) plate',
          description: 'factorial(4) computes 4 × 6 = 24. Pop its plate and write return 24 beside factorial(5).',
          items: [
            { index: 0, role: 'current', caption: 'receives 24' },
            { index: 1, role: 'success', caption: 'pop 4!' },
            { index: 2, role: 'success', caption: 'returned 6' },
            { index: 3, role: 'success', caption: 'returned 2' },
            { index: 4, role: 'success', caption: 'returned 1' }
          ],
          state: { label: 'POP 4!', values: { removedPlate: '4!', computation: '4 × 6 = 24', returnedValue: 24, stackOfPlatesTopLast: '[5!]', writeOnPaper: 'factorial(5) receives 24' }, helper: 'Only the original call remains on the paper stack.' }
        },
        {
          title: '10. Remove the factorial(5) plate',
          description: 'factorial(5) computes 5 × 24 = 120. Pop the final plate and box the answer on paper.',
          items: [
            { index: 0, role: 'answer', caption: 'pop 5!' },
            { index: 1, role: 'success', caption: 'returned 24' },
            { index: 2, role: 'success', caption: 'returned 6' },
            { index: 3, role: 'success', caption: 'returned 2' },
            { index: 4, role: 'success', caption: 'returned 1' }
          ],
          state: { label: 'FINAL POP', values: { removedPlate: '5!', computation: '5 × 24 = 120', returnedValue: 120, stackOfPlatesTopLast: '[]', writeOnPaper: 'factorial(5) = 120' }, helper: 'The stack is empty. The original call has finished.' },
          finalResult: { title: 'Final answer', body: 'factorial(5) returns 120.' }
        }
      ]
    }
  },
  body: [
    {
      type: 'section',
      title: 'What factorial means',
      content: 'Factorial is written with an exclamation mark. 5! means 5 × 4 × 3 × 2 × 1. 3! means 3 × 2 × 1. The result of 0! is defined as 1, which gives recursion a clean stopping answer.'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Paper practice rule',
      content: 'For recursion, do not only read code. Draw the call tree and the stack of plates on paper until pushing calls and popping returns becomes automatic.'
    },
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
  solutionBody: [
    {
      type: 'table',
      title: 'Paper return table for factorial(5)',
      columns: ['Plate removed', 'What you write beside the call tree', 'Returned value'],
      rows: [
        ['factorial(1)', 'base case', '1'],
        ['factorial(2)', '2 × factorial(1) = 2 × 1', '2'],
        ['factorial(3)', '3 × factorial(2) = 3 × 2', '6'],
        ['factorial(4)', '4 × factorial(3) = 4 × 6', '24'],
        ['factorial(5)', '5 × factorial(4) = 5 × 24', '120']
      ]
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
