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
  mentalPicture: 'Do this exactly as you would on paper. Draw two areas. On the left, draw the descent: fact(4) calls fact(3), fact(3) calls fact(2), fact(2) calls fact(1). On the right, draw the return: fact(1) = 1, fact(2) = 2 × 1 = 2, fact(3) = 3 × 2 = 6, fact(4) = 4 × 6 = 24. Beside it, imagine a stack of plates: push calls while going down, pop calls while coming back up.',
  patternSignal: 'Use simple recursion when the problem can be expressed as the current value plus the same problem on a smaller input.',
  invariant: 'Every recursive call must reduce n, so the function eventually reaches n == 0 or n == 1.',
  bruteForceThought: 'An iterative loop can multiply from 1 to n, but this exercise is about learning how recursive calls pause and return.',
  optimizationJourney: 'There is no overlapping subproblem here, so memoization is unnecessary. The goal is to master the call stack before moving to harder recursion.',
  stepByStepBreakdown: [
    'Write the original call on paper: fact(4).',
    'Draw the descent column: fact(4) → fact(3) → fact(2) → fact(1).',
    'Push one plate for every call that is waiting.',
    'Circle the base case: fact(1) returns 1.',
    'Draw the unwinding column upward: fact(2) = 2 × 1 = 2.',
    'Continue returning: fact(3) = 3 × 2 = 6, then fact(4) = 4 × 6 = 24.',
    'Pop one plate for every completed return.'
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
  explanation: 'For fact(4), the function first descends through waiting calls: fact(4), fact(3), fact(2), and fact(1). The base case fact(1) returns 1. Then each completed call unwinds: fact(2) returns 2, fact(3) returns 6, and fact(4) returns 24.',
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
  finalTakeaway: 'Factorial is the simplest recursion exercise: define the smallest answer, draw the descent, mark the base case, then draw the return path as the stack unwinds.',
  selfExplanationPrompt: 'Before reading the solution, draw fact(4) on paper. Left side: call stack descent. Right side: unwinding return values. Then mark every push and pop.',
  visualExplanation: 'The visual uses fact(4), just like a paper classroom diagram. Each click adds one step to the descent or one step to the return side, so learners see calls go down and answers come back up.',
  visualWalkthrough: {
    title: 'Factorial on paper — descent and unwinding',
    summary: 'Draw recursion like a paper diagram: calls go down on the left, the base case stops the descent, and return values come back up on the right.',
    diagram: {
      type: 'array',
      title: 'fact(4): call stack descent and unwinding return',
      description: 'Each cell is one call frame. The visual shows what is pushed during descent and what is popped during return.',
      values: ['fact(4)', 'fact(3)', 'fact(2)', 'fact(1)', 'base case'],
      stateTitle: 'Paper trace step',
      stateDescription: 'Use the state panel as your paper: left column is CALL STACK (DESCENT), right column is UNWINDING (RETURN).',
      legend: [
        { role: 'current', label: 'current call / pushed plate', marker: 'PUSH' },
        { role: 'window', label: 'waiting call on stack', marker: 'WAIT' },
        { role: 'success', label: 'returned / popped plate', marker: 'RETURN' },
        { role: 'answer', label: 'base case or final answer', marker: '✓' }
      ],
      frames: [
        {
          title: '1. Big idea before drawing',
          description: 'Recursion breaks a problem into smaller versions, solves the smallest one, then builds the answer back up.',
          items: [],
          state: {
            label: 'BIG IDEA',
            role: 'answer',
            values: {
              bigIdea: 'Go down with calls. Come back up with returns.',
              paperLayout: 'Left: CALL STACK (DESCENT). Right: UNWINDING (RETURN).',
              stackOfPlates: 'Push calls going down, pop calls coming back up.'
            },
            helper: 'This is the mental picture students should draw until it becomes automatic.'
          }
        },
        {
          title: '2. CALL STACK: push fact(4)',
          description: 'Start the descent. fact(4) calls itself with a smaller input: fact(3).',
          items: [
            { index: 0, role: 'current', caption: 'push fact(4)' }
          ],
          state: {
            label: 'CALL STACK (DESCENT)',
            values: {
              drawLeftColumn: 'fact(4)',
              noteBesideArrow: 'calls itself',
              stackOfPlates: '[fact(4)]',
              waitingExpression: 'fact(4) = 4 × fact(3)',
              unwindRightColumn: 'not started yet'
            },
            helper: 'fact(4) is now a waiting plate on the stack.'
          }
        },
        {
          title: '3. CALL STACK: push fact(3)',
          description: 'Draw fact(3) under fact(4). fact(3) calls fact(2).',
          items: [
            { index: 0, role: 'window', caption: 'waits' },
            { index: 1, role: 'current', caption: 'push fact(3)' }
          ],
          state: {
            label: 'CALL STACK (DESCENT)',
            values: {
              drawLeftColumn: 'fact(4) ↓ fact(3)',
              noteBesideArrow: 'calls itself',
              stackOfPlates: '[fact(4), fact(3)]',
              waitingExpression: 'fact(3) = 3 × fact(2)',
              unwindRightColumn: 'not started yet'
            },
            helper: 'The new call sits on top of the older waiting call.'
          }
        },
        {
          title: '4. CALL STACK: push fact(2)',
          description: 'Draw fact(2) under fact(3). fact(2) calls fact(1).',
          items: [
            { index: 0, role: 'window', caption: 'waits' },
            { index: 1, role: 'window', caption: 'waits' },
            { index: 2, role: 'current', caption: 'push fact(2)' }
          ],
          state: {
            label: 'CALL STACK (DESCENT)',
            values: {
              drawLeftColumn: 'fact(4) ↓ fact(3) ↓ fact(2)',
              noteBesideArrow: 'calls itself',
              stackOfPlates: '[fact(4), fact(3), fact(2)]',
              waitingExpression: 'fact(2) = 2 × fact(1)',
              unwindRightColumn: 'not started yet'
            },
            helper: 'The call stack grows while the function keeps finding smaller problems.'
          }
        },
        {
          title: '5. CALL STACK: push fact(1), then stop',
          description: 'Draw fact(1). This is the base case, so it returns 1 without making another call.',
          items: [
            { index: 0, role: 'window', caption: 'waits' },
            { index: 1, role: 'window', caption: 'waits' },
            { index: 2, role: 'window', caption: 'waits' },
            { index: 3, role: 'answer', caption: 'base case' }
          ],
          state: {
            label: 'BASE CASE',
            role: 'answer',
            values: {
              drawLeftColumn: 'fact(4) ↓ fact(3) ↓ fact(2) ↓ fact(1)',
              baseCaseCard: 'fact(1) = 1',
              stackOfPlates: '[fact(4), fact(3), fact(2), fact(1)]',
              unwindRightColumn: 'fact(1) = 1'
            },
            helper: 'Circle the base case on paper. This is where descent ends and unwinding begins.'
          }
        },
        {
          title: '6. UNWINDING: pop fact(1), return 1',
          description: 'Remove fact(1) from the top of the stack and pass 1 back to fact(2).',
          items: [
            { index: 0, role: 'window', caption: 'waits' },
            { index: 1, role: 'window', caption: 'waits' },
            { index: 2, role: 'current', caption: 'receives 1' },
            { index: 3, role: 'success', caption: 'pop fact(1)' }
          ],
          state: {
            label: 'UNWINDING (RETURN)',
            values: {
              popAction: 'pop fact(1)',
              stackOfPlates: '[fact(4), fact(3), fact(2)]',
              drawRightColumn: 'fact(1) = 1',
              returnsTo: 'fact(2) receives 1'
            },
            helper: 'Coming back up always starts from the top plate.'
          }
        },
        {
          title: '7. UNWINDING: pop fact(2), return 2',
          description: 'fact(2) can now finish: fact(2) = 2 × 1 = 2.',
          items: [
            { index: 0, role: 'window', caption: 'waits' },
            { index: 1, role: 'current', caption: 'receives 2' },
            { index: 2, role: 'success', caption: 'pop fact(2)' },
            { index: 3, role: 'success', caption: 'returned 1' }
          ],
          state: {
            label: 'UNWINDING (RETURN)',
            values: {
              popAction: 'pop fact(2)',
              stackOfPlates: '[fact(4), fact(3)]',
              drawRightColumn: 'fact(1) = 1 ↑ fact(2) = 2 × 1 = 2',
              returnsTo: 'fact(3) receives 2'
            },
            helper: 'Write the return value beside the waiting call on your paper.'
          }
        },
        {
          title: '8. UNWINDING: pop fact(3), return 6',
          description: 'fact(3) can now finish: fact(3) = 3 × 2 = 6.',
          items: [
            { index: 0, role: 'current', caption: 'receives 6' },
            { index: 1, role: 'success', caption: 'pop fact(3)' },
            { index: 2, role: 'success', caption: 'returned 2' },
            { index: 3, role: 'success', caption: 'returned 1' }
          ],
          state: {
            label: 'UNWINDING (RETURN)',
            values: {
              popAction: 'pop fact(3)',
              stackOfPlates: '[fact(4)]',
              drawRightColumn: 'fact(1) = 1 ↑ fact(2) = 2 ↑ fact(3) = 3 × 2 = 6',
              returnsTo: 'fact(4) receives 6'
            },
            helper: 'The return side climbs upward while the stack gets smaller.'
          }
        },
        {
          title: '9. UNWINDING: pop fact(4), return 24',
          description: 'fact(4) can now finish: fact(4) = 4 × 6 = 24.',
          items: [
            { index: 0, role: 'answer', caption: 'pop fact(4)' },
            { index: 1, role: 'success', caption: 'returned 6' },
            { index: 2, role: 'success', caption: 'returned 2' },
            { index: 3, role: 'success', caption: 'returned 1' }
          ],
          state: {
            label: 'UNWINDING (RETURN)',
            role: 'answer',
            values: {
              popAction: 'pop fact(4)',
              stackOfPlates: '[]',
              drawRightColumn: 'fact(1) = 1 ↑ fact(2) = 2 ↑ fact(3) = 6 ↑ fact(4) = 4 × 6 = 24',
              finalAnswer: 'fact(4) = 24'
            },
            helper: 'The stack is empty. The original call has returned its final answer.'
          },
          finalResult: { title: 'Final answer', body: 'fact(4) returns 24.' }
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
      title: 'Paper return table for fact(4)',
      columns: ['Return step', 'What you write on the return side', 'Stack after pop'],
      rows: [
        ['fact(1)', 'base case: fact(1) = 1', '[fact(4), fact(3), fact(2)]'],
        ['fact(2)', 'fact(2) = 2 × 1 = 2', '[fact(4), fact(3)]'],
        ['fact(3)', 'fact(3) = 3 × 2 = 6', '[fact(4)]'],
        ['fact(4)', 'fact(4) = 4 × 6 = 24', '[]']
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
    'How many stack frames are created for fact(4)?',
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
