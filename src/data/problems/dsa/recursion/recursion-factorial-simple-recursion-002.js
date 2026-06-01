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
  mentalPicture: 'See the whole picture first. Calls go down: fact(4) → fact(3) → fact(2) → fact(1). Then answers come back up: fact(1) = 1, fact(2) = 2 × 1 = 2, fact(3) = 3 × 2 = 6, fact(4) = 4 × 6 = 24. At the same time, picture a stack of plates: each new call is pushed on top during descent, and each completed call is popped during return.',
  patternSignal: 'Use simple recursion when the problem can be expressed as the current value plus the same problem on a smaller input.',
  invariant: 'Every recursive call must reduce n, so the function eventually reaches n == 0 or n == 1.',
  bruteForceThought: 'An iterative loop can multiply from 1 to n, but this exercise is about learning how recursive calls pause and return.',
  optimizationJourney: 'There is no overlapping subproblem here, so memoization is unnecessary. The goal is to master the call stack before moving to harder recursion.',
  stepByStepBreakdown: [
    'Start with the bigger picture: calls go down, returns come back up.',
    'Draw the left column for CALL STACK (DESCENT): fact(4), fact(3), fact(2), fact(1).',
    'Mark the bottom base case: return 1.',
    'Draw the right column for UNWINDING (RETURN): fact(1) = 1, fact(2) = 2, fact(3) = 6, fact(4) = 24.',
    'Use the stack-of-plates mental model: push one call for each descent step.',
    'Then pop one call for each return step.',
    'Practice this paper trace until the downward and upward flow feels automatic.'
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
  explanation: 'For fact(4), recursion first descends through smaller calls: fact(4), fact(3), fact(2), and fact(1). That is the downward phase. Then the base case returns 1, and the solution unwinds upward: fact(2) returns 2, fact(3) returns 6, and fact(4) returns 24.',
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
  finalTakeaway: 'Factorial is the simplest recursion exercise: see the calls going down, see the answers coming back up, and connect both with the push/pop behavior of the call stack.',
  selfExplanationPrompt: 'Before reading the solution, draw fact(4) on paper exactly this way: left side for calls going down, right side for returns coming up, and a stack-of-plates note beside it for push and pop actions.',
  visualExplanation: 'The visual walkthrough first shows the bigger picture, then builds it step by step. Learners should see both flows at all times: the CALL STACK (DESCENT) on the left and the UNWINDING (RETURN) on the right.',
  visualWalkthrough: {
    title: 'Factorial on paper — calls go down, returns come back up',
    summary: 'This is the full recursion picture. First, the calls go down the left side until the base case is reached. Then the answers come back up the right side as the call stack unwinds.',
    diagram: {
      type: 'array',
      title: 'fact(4): CALL STACK (DESCENT) and UNWINDING (RETURN)',
      description: 'The cells represent the recursive calls. Use the state panel to track the bigger picture: calls going down, returns going up, and push/pop stack actions.',
      values: ['fact(4)', 'fact(3)', 'fact(2)', 'fact(1)'],
      stateTitle: 'Recursion picture',
      stateDescription: 'Always read the state in four parts: Big idea, calls going down, returns going up, and stack of plates.',
      legend: [
        { role: 'current', label: 'current active call', marker: '↓ or PUSH' },
        { role: 'window', label: 'waiting call on stack', marker: 'WAIT' },
        { role: 'success', label: 'returned call during unwind', marker: '↑ or POP' },
        { role: 'answer', label: 'base case or final answer', marker: '✓' }
      ],
      frames: [
        {
          title: '1. The bigger picture first',
          description: 'Before tracing step by step, look at the whole shape of recursion. Calls go down. Returns come back up.',
          items: [
            { index: 0, role: 'window', caption: 'call 4' },
            { index: 1, role: 'window', caption: 'call 3' },
            { index: 2, role: 'window', caption: 'call 2' },
            { index: 3, role: 'answer', caption: 'base case at 1' }
          ],
          state: {
            label: 'BIG IDEA',
            role: 'answer',
            values: {
              bigIdea: 'Recursion breaks a problem into smaller instances of the same problem, solves the smallest one, then builds the solution back up.',
              callsGoingDown: 'fact(4) ↓ fact(3) ↓ fact(2) ↓ fact(1) ↓ base case',
              returnsGoingUp: 'base case 1 ↑ fact(2) = 2 ↑ fact(3) = 6 ↑ fact(4) = 24',
              callStackDescent: 'CALL STACK (DESCENT): fact(4), fact(3), fact(2), fact(1)',
              unwindingReturn: 'UNWINDING (RETURN): fact(1)=1, fact(2)=2, fact(3)=6, fact(4)=24',
              stackOfPlates: 'Push calls going down. Pop calls coming back up.'
            },
            helper: 'This is the exact paper picture a beginner should learn to draw.'
          }
        },
        {
          title: '2. CALL STACK (DESCENT): start at fact(4)',
          description: 'The first call is fact(4). It cannot finish yet, so it calls fact(3).',
          items: [
            { index: 0, role: 'current', caption: 'calls fact(3)' }
          ],
          state: {
            label: 'CALL STACK (DESCENT)',
            values: {
              bigIdea: 'We are in the going-down phase.',
              callsGoingDown: 'fact(4) ↓ ...',
              returnsGoingUp: 'nothing returned yet',
              callStackDescent: 'fact(4)',
              unwindingReturn: 'not started yet',
              stackOfPlates: 'push fact(4) → [fact(4)]'
            },
            helper: 'The stack begins with the original call.'
          }
        },
        {
          title: '3. CALL STACK (DESCENT): go down to fact(3)',
          description: 'fact(4) is waiting. Now fact(3) becomes the active call and it calls fact(2).',
          items: [
            { index: 0, role: 'window', caption: 'fact(4) waits' },
            { index: 1, role: 'current', caption: 'calls fact(2)' }
          ],
          state: {
            label: 'CALL STACK (DESCENT)',
            values: {
              bigIdea: 'Each call creates a smaller problem.',
              callsGoingDown: 'fact(4) ↓ fact(3) ↓ ...',
              returnsGoingUp: 'nothing returned yet',
              callStackDescent: 'fact(4) → fact(3)',
              unwindingReturn: 'not started yet',
              stackOfPlates: 'push fact(3) → [fact(4), fact(3)]'
            },
            helper: 'The most recent call sits on top of the older waiting call.'
          }
        },
        {
          title: '4. CALL STACK (DESCENT): go down to fact(2)',
          description: 'fact(3) is now waiting. The active call becomes fact(2), which still needs fact(1).',
          items: [
            { index: 0, role: 'window', caption: 'fact(4) waits' },
            { index: 1, role: 'window', caption: 'fact(3) waits' },
            { index: 2, role: 'current', caption: 'calls fact(1)' }
          ],
          state: {
            label: 'CALL STACK (DESCENT)',
            values: {
              bigIdea: 'We are still moving downward.',
              callsGoingDown: 'fact(4) ↓ fact(3) ↓ fact(2) ↓ ...',
              returnsGoingUp: 'nothing returned yet',
              callStackDescent: 'fact(4) → fact(3) → fact(2)',
              unwindingReturn: 'not started yet',
              stackOfPlates: 'push fact(2) → [fact(4), fact(3), fact(2)]'
            },
            helper: 'Every lower frame is paused until the smaller call returns.'
          }
        },
        {
          title: '5. CALL STACK (DESCENT): reach fact(1) base case',
          description: 'fact(1) is the stopping point. This is the base case, so recursion stops going down here.',
          items: [
            { index: 0, role: 'window', caption: 'fact(4) waits' },
            { index: 1, role: 'window', caption: 'fact(3) waits' },
            { index: 2, role: 'window', caption: 'fact(2) waits' },
            { index: 3, role: 'answer', caption: 'base case: return 1' }
          ],
          state: {
            label: 'BASE CASE',
            role: 'answer',
            values: {
              bigIdea: 'The smallest problem is solved directly.',
              callsGoingDown: 'fact(4) ↓ fact(3) ↓ fact(2) ↓ fact(1) ↓ base case',
              returnsGoingUp: 'base case will now start the upward return',
              callStackDescent: 'fact(4) → fact(3) → fact(2) → fact(1)',
              unwindingReturn: 'fact(1) = 1',
              stackOfPlates: 'push fact(1) → [fact(4), fact(3), fact(2), fact(1)]'
            },
            helper: 'This is the turning point: calls stop going down, and returns begin coming up.'
          }
        },
        {
          title: '6. UNWINDING (RETURN): come back up to fact(2)',
          description: 'The base case returns 1. That answer comes back up to fact(2), which can now finish.',
          items: [
            { index: 0, role: 'window', caption: 'fact(4) waits' },
            { index: 1, role: 'window', caption: 'fact(3) waits' },
            { index: 2, role: 'current', caption: '2 × 1 = 2' },
            { index: 3, role: 'success', caption: 'pop fact(1)' }
          ],
          state: {
            label: 'UNWINDING (RETURN)',
            values: {
              bigIdea: 'Now the solution is being built back up.',
              callsGoingDown: 'descent is complete',
              returnsGoingUp: 'fact(1) = 1 ↑ fact(2) = 2',
              callStackDescent: 'left side already drawn',
              unwindingReturn: 'fact(1) = 1, then fact(2) = 2 × 1 = 2',
              stackOfPlates: 'pop fact(1) → [fact(4), fact(3), fact(2)]'
            },
            helper: 'The first return climbs one level upward.'
          }
        },
        {
          title: '7. UNWINDING (RETURN): come back up to fact(3)',
          description: 'fact(2) returned 2. Now fact(3) uses that answer: fact(3) = 3 × 2 = 6.',
          items: [
            { index: 0, role: 'window', caption: 'fact(4) waits' },
            { index: 1, role: 'current', caption: '3 × 2 = 6' },
            { index: 2, role: 'success', caption: 'pop fact(2)' },
            { index: 3, role: 'success', caption: 'returned 1' }
          ],
          state: {
            label: 'UNWINDING (RETURN)',
            values: {
              bigIdea: 'Each higher call finishes using the returned value from below.',
              callsGoingDown: 'descent is complete',
              returnsGoingUp: 'fact(1) = 1 ↑ fact(2) = 2 ↑ fact(3) = 6',
              callStackDescent: 'left side already drawn',
              unwindingReturn: 'fact(1) = 1, fact(2) = 2, fact(3) = 3 × 2 = 6',
              stackOfPlates: 'pop fact(2) → [fact(4), fact(3)]'
            },
            helper: 'The return path is now clearly moving upward.'
          }
        },
        {
          title: '8. UNWINDING (RETURN): come back up to fact(4)',
          description: 'fact(3) returned 6. Now fact(4) uses that answer: fact(4) = 4 × 6 = 24.',
          items: [
            { index: 0, role: 'answer', caption: '4 × 6 = 24' },
            { index: 1, role: 'success', caption: 'pop fact(3)' },
            { index: 2, role: 'success', caption: 'returned 2' },
            { index: 3, role: 'success', caption: 'returned 1' }
          ],
          state: {
            label: 'UNWINDING (RETURN)',
            role: 'answer',
            values: {
              bigIdea: 'The original call now receives the full answer.',
              callsGoingDown: 'fact(4) ↓ fact(3) ↓ fact(2) ↓ fact(1)',
              returnsGoingUp: 'fact(1) = 1 ↑ fact(2) = 2 ↑ fact(3) = 6 ↑ fact(4) = 24',
              callStackDescent: 'CALL STACK (DESCENT): fact(4), fact(3), fact(2), fact(1)',
              unwindingReturn: 'UNWINDING (RETURN): fact(1)=1, fact(2)=2, fact(3)=6, fact(4)=24',
              stackOfPlates: 'pop fact(3), then pop fact(4) → []'
            },
            helper: 'This frame should match the paper diagram in the learner’s head: left side down, right side up.'
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
