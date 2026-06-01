import { defineLearningProblem } from '../../../../problems/problemAuthoring.js';

const problem = defineLearningProblem({
  id: 'recursion-factorial-simple-recursion-002',
  category: 'dsa',
  topicId: 'recursion',
  title: 'Factorial(n) - Simplest Recursion',
  difficulty: 'Easy',
  estimatedTime: '10 min',
  estimatedTimeSeconds: 600,
  language: 'java',
  tags: ['recursion', 'factorial', 'base-case', 'call-stack', 'java', 'visual-walkthrough'],
  scenario: 'You are learning the first recursion exercise: factorial. Factorial means multiplying a number by every positive whole number below it.',
  question: 'Write a recursive Java method factorial(n) that returns n!. For example, factorial(5) should return 120 because 5! = 5 * 4 * 3 * 2 * 1.',
  prompt: 'How does factorial(n) teach the base case, recursive case, and return unwinding in the simplest possible way?',
  examples: [
    'Input: n = 0 -> Output: 1 because 0! is defined as 1.',
    'Input: n = 1 -> Output: 1 because 1! = 1.',
    'Input: n = 3 -> Output: 6 because 3! = 3 * 2 * 1.',
    'Input: n = 5 -> Output: 120 because 5! = 5 * 4 * 3 * 2 * 1.'
  ],
  constraints: [
    'n is a non-negative integer.',
    'Use recursion for this exercise.',
    'Assume n is small enough that the result fits in a long.'
  ],
  starterThought: 'Factorial has a natural smaller problem: n! = n * (n - 1)!. The smallest direct answer is 0! = 1 or 1! = 1.',
  intuition: 'Factorial is beginner-friendly because it has one clear job: multiply the current number by the factorial of the number just below it. To compute 5!, first find 4!, then multiply that answer by 5. This continues until the base case returns 1.',
  plainLanguageExplanation: 'The symbol n! is read as n factorial. It means multiply n by every whole number below it until 1. So 4! means 4 * 3 * 2 * 1 = 24. Recursion works here because 4! can be written as 4 * 3!, and 3! can be written as 3 * 2!.',
  mentalPicture: 'See the whole picture first. Calls go down: fact(4) -> fact(3) -> fact(2) -> fact(1). Then answers come back up: fact(1) = 1, fact(2) = 2, fact(3) = 6, fact(4) = 24. Picture a stack of plates: each new call is pushed on top during descent, and each completed call is popped during return.',
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
  commonMistake: 'Forgetting the base case means the function never reaches the stopping answer.',
  commonMistakes: [
    'Using n * factorial(n) instead of n * factorial(n - 1).',
    'Returning 0 for factorial(0). The correct value is 1.',
    'Writing a base case that never gets reached.',
    'Trying to multiply while going down without understanding that the final result is built while returning.'
  ],
  edgeCases: [
    'n = 0 should return 1.',
    'n = 1 should return 1.',
    'Large n can exceed numeric limits or stack depth, but that is outside this beginner exercise.'
  ],
  complexityAnalysis: 'Time is O(n) because the function makes one recursive call for each value from n down to 1. Space is O(n) because each call waits on the call stack until the base case returns.',
  explanation: 'For fact(4), recursion first descends through smaller calls: fact(4), fact(3), fact(2), and fact(1). That is the downward phase. Then the base case returns 1, and the solution unwinds upward: fact(2) returns 2, fact(3) returns 6, and fact(4) returns 24.',
  solutionCode: `class Solution {
    public long factorial(int n) {
        if (n == 0 || n == 1) {
            return 1;
        }

        return n * factorial(n - 1);
    }
}`,
  finalTakeaway: 'Factorial is the simplest recursion exercise: see the calls going down, see the answers coming back up, and connect both with the push/pop behavior of the call stack.',
  selfExplanationPrompt: 'Before reading the solution, draw fact(4) on paper exactly this way: left side for calls going down, right side for returns coming up, and a stack-of-plates note beside it for push and pop actions.',
  visualExplanation: 'The Visual Walkthrough uses an animated picture first, then an interactive step trace. Learners should see the bigger recursion shape before studying individual frames.',
  visualWalkthrough: {
    title: 'Factorial recursion animation - calls go down, returns come back up',
    summary: 'Watch the animation first. The left side builds the CALL STACK (DESCENT). The right side shows UNWINDING (RETURN). This is the paper picture students must learn to draw from memory.',
    media: [
      {
        type: 'image',
        src: '/visuals/recursion/factorial-call-stack-animation.svg',
        alt: 'Animated diagram showing factorial calls going down and return values unwinding up',
        caption: 'Animated mental model: calls descend down the left side, hit the base case, then return values unwind up the right side.'
      }
    ],
    diagram: {
      type: 'cards',
      title: 'Step-by-step paper trace for fact(4)',
      description: 'Use Next to match the animation with the paper trace: push calls going down, pop calls returning up.',
      stateTitle: 'Call stack and return state',
      stateDescription: 'The state panel shows exactly what is on the call stack and what has already returned.',
      legend: [
        { role: 'current', label: 'current active call', marker: 'PUSH' },
        { role: 'window', label: 'waiting on stack', marker: 'WAIT' },
        { role: 'answer', label: 'base case or final answer', marker: 'OK' },
        { role: 'success', label: 'returned during unwind', marker: 'POP' }
      ],
      frames: [
        {
          title: '1. Big picture: recursion has two directions',
          description: 'Calls go down first. Returns come back up later. Do not mix these two phases.',
          cards: [
            { role: 'current', title: 'Calls going down', description: 'fact(4) -> fact(3) -> fact(2) -> fact(1)' },
            { role: 'answer', title: 'Base case', description: 'fact(1) returns 1' },
            { role: 'success', title: 'Returns going up', description: 'fact(2)=2 -> fact(3)=6 -> fact(4)=24' }
          ],
          state: { label: 'BIG PICTURE', role: 'answer', values: { descent: 'fact(4), fact(3), fact(2), fact(1)', baseCase: 'fact(1)=1', unwinding: 'fact(2)=2, fact(3)=6, fact(4)=24' }, helper: 'This is the mental picture students should copy on paper.' }
        },
        {
          title: '2. PUSH fact(4)',
          description: 'fact(4) cannot answer immediately. It must wait for fact(3).',
          cards: [{ role: 'current', title: 'CALL STACK (DESCENT)', description: 'Push fact(4). It calls fact(3).' }],
          state: { label: 'PUSH', values: { stack: '[fact(4)]', waitingFor: 'fact(3)', returned: 'nothing yet' }, helper: 'A call is pushed when it starts and cannot finish yet.' }
        },
        {
          title: '3. PUSH fact(3)',
          description: 'fact(4) is paused. fact(3) is now active and calls fact(2).',
          cards: [{ role: 'window', title: 'fact(4)', description: 'waiting' }, { role: 'current', title: 'fact(3)', description: 'active: calls fact(2)' }],
          state: { label: 'PUSH', values: { stack: '[fact(4), fact(3)]', waitingFor: 'fact(2)', returned: 'nothing yet' }, helper: 'The newest call sits on top of the stack.' }
        },
        {
          title: '4. PUSH fact(2)',
          description: 'fact(3) pauses. fact(2) is active and calls fact(1).',
          cards: [{ role: 'window', title: 'fact(4)', description: 'waiting' }, { role: 'window', title: 'fact(3)', description: 'waiting' }, { role: 'current', title: 'fact(2)', description: 'active: calls fact(1)' }],
          state: { label: 'PUSH', values: { stack: '[fact(4), fact(3), fact(2)]', waitingFor: 'fact(1)', returned: 'nothing yet' }, helper: 'The stack is growing downward in the drawing.' }
        },
        {
          title: '5. BASE CASE: fact(1) returns 1',
          description: 'This is the turning point. Calls stop going down. Returns begin going up.',
          cards: [{ role: 'window', title: 'fact(4)', description: 'waiting' }, { role: 'window', title: 'fact(3)', description: 'waiting' }, { role: 'window', title: 'fact(2)', description: 'waiting' }, { role: 'answer', title: 'fact(1)', description: 'base case: return 1' }],
          state: { label: 'BASE CASE', role: 'answer', values: { stack: '[fact(4), fact(3), fact(2), fact(1)]', returned: 'fact(1)=1', next: 'unwind to fact(2)' }, helper: 'A correct recursive function must always reach a base case.' }
        },
        {
          title: '6. POP fact(1), finish fact(2)',
          description: 'fact(2) receives 1, so it returns 2 * 1 = 2.',
          cards: [{ role: 'window', title: 'fact(4)', description: 'waiting' }, { role: 'window', title: 'fact(3)', description: 'waiting' }, { role: 'success', title: 'fact(2)', description: '2 * 1 = 2' }],
          state: { label: 'POP', values: { stack: '[fact(4), fact(3), fact(2)]', returned: 'fact(2)=2', next: 'unwind to fact(3)' }, helper: 'The returned answer climbs one level upward.' }
        },
        {
          title: '7. POP fact(2), finish fact(3)',
          description: 'fact(3) receives 2, so it returns 3 * 2 = 6.',
          cards: [{ role: 'window', title: 'fact(4)', description: 'waiting' }, { role: 'success', title: 'fact(3)', description: '3 * 2 = 6' }],
          state: { label: 'POP', values: { stack: '[fact(4), fact(3)]', returned: 'fact(3)=6', next: 'unwind to fact(4)' }, helper: 'The right side of the drawing is now being built upward.' }
        },
        {
          title: '8. POP fact(3), finish fact(4)',
          description: 'fact(4) receives 6, so it returns 4 * 6 = 24.',
          cards: [{ role: 'answer', title: 'fact(4)', description: '4 * 6 = 24' }],
          state: { label: 'FINAL ANSWER', role: 'answer', values: { stack: '[]', returned: 'fact(4)=24', complete: 'all calls popped' }, helper: 'The original call now has the final answer.' },
          finalResult: { title: 'Final answer', body: 'fact(4) returns 24.' }
        }
      ]
    }
  },
  body: [
    { type: 'section', title: 'What factorial means', content: 'Factorial is written with an exclamation mark. 5! means 5 * 4 * 3 * 2 * 1. 3! means 3 * 2 * 1. The result of 0! is defined as 1, which gives recursion a clean stopping answer.' },
    { type: 'callout', tone: 'info', title: 'Paper practice rule', content: 'For recursion, do not only read code. Draw the call tree and the stack of plates on paper until pushing calls and popping returns becomes automatic.' },
    { type: 'callout', tone: 'info', title: 'Practice ladder step 1', content: 'Factorial(n) is the first recursion practice because it has one obvious base case and one obvious smaller problem.' },
    { type: 'section', title: 'What you must learn here', content: 'Do not rush past factorial. Use it to understand how a recursive call pauses, waits for the smaller answer, and resumes when the smaller call returns.' }
  ],
  solutionBody: [
    {
      type: 'table',
      title: 'Paper return table for fact(4)',
      columns: ['Return step', 'What you write on the return side', 'Stack after pop'],
      rows: [
        ['fact(1)', 'base case: fact(1) = 1', '[fact(4), fact(3), fact(2)]'],
        ['fact(2)', 'fact(2) = 2 * 1 = 2', '[fact(4), fact(3)]'],
        ['fact(3)', 'fact(3) = 3 * 2 = 6', '[fact(4)]'],
        ['fact(4)', 'fact(4) = 4 * 6 = 24', '[]']
      ]
    }
  ],
  relatedConcepts: ['base case', 'recursive case', 'call stack', 'return unwinding', 'linear recursion'],
  followUpQuestions: [
    'Why is factorial(0) equal to 1?',
    'What happens if the recursive call uses factorial(n) instead of factorial(n - 1)?',
    'How many stack frames are created for fact(4)?',
    'Why is factorial not a dynamic programming problem in this basic form?'
  ],
  metadata: { sequence: 2, reviewStatus: 'approved', visibility: ['dev', 'prod'], source: 'original', estimatedTimeSeconds: 600 }
});

export default problem;
