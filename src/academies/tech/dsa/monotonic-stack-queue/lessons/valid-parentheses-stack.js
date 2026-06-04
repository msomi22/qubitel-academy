import { defineLearningProblem } from '../../../../../problems/problemAuthoring.js';

const problem = defineLearningProblem({
  id: 'monotonic-stack-queue-valid-parentheses-001',
  topicId: 'monotonic-stack-queue',
  title: 'Valid Parentheses — stack',
  difficulty: 'Easy',
  estimatedTime: '10 min',
  language: 'java',
  tags: ['stack', 'strings', 'interview-pattern', 'mental-model', 'visual-walkthrough', 'coding'],
  scenario: 'Given a string of bracket characters, decide whether every opening bracket is closed in the correct order.',
  question: 'Given s = "({[]})", return true because every closing bracket matches the most recent unmatched opening bracket.',
  examples: ['s = "({[]})" -> true', 's = "([)]" -> false'],
  constraints: ['Only bracket characters are considered.', 'A closing bracket must match the most recent unmatched opening bracket.', 'The stack must be empty after the full scan.'],
  starterThought: 'The most recently opened bracket must be the first one closed.',
  intuition: 'Opening brackets wait to be closed, so push them onto a stack. When a closing bracket appears, it must match the top of the stack. Anything else means the nesting order is broken.',
  mentalPicture: 'Think of a stack of plates. A closing bracket can only remove the top plate, never one buried underneath.',
  patternSignal: 'Use a stack when nested work must close in reverse order.',
  invariant: 'The stack contains exactly the unmatched opening brackets, with the next required closing match on top.',
  bruteForceThought: 'Checking whether a matching opening bracket exists somewhere is not enough because the order of closing matters.',
  optimizationJourney: 'The stack stores unfinished openings in last-in-first-out order, exactly matching nested bracket rules.',
  stepByStepBreakdown: ['Scan the string from left to right.', 'Push every opening bracket.', 'For every closing bracket, first ensure the stack is not empty.', 'Pop the top opening and verify it matches the closing bracket.', 'After the scan, return true only if the stack is empty.'],
  finalPattern: 'Last-in-first-out matching.',
  commonMistake: 'Checking whether a closing bracket matches anything in the stack instead of only the top opening.',
  commonMistakes: ['Peeking or popping before checking whether the stack is empty.', 'Forgetting to reject leftover opening brackets.', 'Using contains instead of top-of-stack matching.'],
  edgeCases: ['Closing bracket appears first', 'Leftover openings at the end', 'Mixed bracket types', 'Empty string if allowed', 'Odd-length string'],
  complexityAnalysis: 'Time is O(n) because each character is processed once. Space is O(n) in the worst case when many openings wait to close.',
  explanation: 'For the sample, each opening bracket is pushed onto the stack until the innermost bracket appears on top. Each closing bracket then compares only with that top opening. ], }, and ) match [, {, and ( in reverse order, and the stack is empty at the end, so the string is valid.',
  solutionCode: `import java.util.ArrayDeque;
import java.util.Deque;

class Solution {
    public boolean isValid(String s) {
        Deque<Character> stack = new ArrayDeque<>();

        for (char c : s.toCharArray()) {
            if (c == '(' || c == '[' || c == '{') {
                stack.push(c);
                continue;
            }

            if (stack.isEmpty()) {
                return false;
            }

            char open = stack.pop();
            if ((c == ')' && open != '(') ||
                (c == ']' && open != '[') ||
                (c == '}' && open != '{')) {
                return false;
            }
        }

        return stack.isEmpty();
    }
}`,
  finalTakeaway: 'Use a stack when the last thing opened must be the first thing closed.',
  visualWalkthrough: {
    title: 'Stack matching animation',
    summary: 'Watch each opening bracket get pushed and each closing bracket compare only against the latest unmatched opening on top of the stack.',
    diagram: {
      type: 'stack',
      title: 'Scan s = "({[]})"',
      description: 'Given example: s = "({[]})". The top of the stack is the only opening bracket a closing bracket may match.',
      values: ['(', '{', '[', ']', '}', ')'],
      stateTitle: 'Stack state evolution',
      stateDescription: 'Each frame shows the current character, the stack after the action, and why the action is valid.',
      frames: [
        {
          title: 'Start with an empty stack',
          description: 'Nothing has been scanned yet, so there are no unmatched opening brackets waiting to close.',
          currentIndex: -1,
          stack: [],
          action: 'Before scanning',
          detail: 'The stack starts empty.',
          state: { label: 'empty stack', values: { stack: '[]', nextAction: 'read first character' }, helper: 'The invariant starts true because no opening bracket is waiting to be closed.' }
        },
        {
          title: 'Read (',
          description: '( is an opening bracket, so push it onto the stack. It now waits for a future ) to close it.',
          currentIndex: 0,
          stack: ['('],
          action: 'Push opening bracket',
          detail: 'Opening bracket found: push ( onto the stack.',
          state: { label: 'push (', values: { current: '(', stack: '[(]', waitingFor: ')' }, helper: 'An opening bracket cannot be validated yet, so it is stored as unmatched work.' }
        },
        {
          title: 'Read {',
          description: '{ is another opening bracket, so push it above (. It must be closed before ( can close.',
          currentIndex: 1,
          stack: ['(', '{'],
          action: 'Push opening bracket',
          detail: 'Opening bracket found: push { onto the stack.',
          state: { label: 'push {', values: { current: '{', stack: '[(, {]', top: '{' }, helper: 'The new opening is now on top, so it must be the next one closed.' }
        },
        {
          title: 'Read [',
          description: '[ is an opening bracket, so push it above {. It is now the most recent unmatched opening.',
          currentIndex: 2,
          stack: ['(', '{', '['],
          action: 'Push opening bracket',
          detail: 'Opening bracket found: push [ onto the stack.',
          state: { label: 'push [', values: { current: '[', stack: '[(, {, []', top: '[' }, helper: 'The stack records nesting order. The bracket on top is the only one the next closer may match.' }
        },
        {
          title: 'Read ]',
          description: '] is a closing bracket. The stack top is [, so this is the correct match. Pop [ from the stack.',
          currentIndex: 3,
          stack: ['(', '{'],
          action: 'Match then pop',
          detail: 'The closing ] matches the top opening [, so [ is removed.',
          compare: { top: '[', current: ']', result: 'match' },
          state: { label: '] matches [', values: { current: ']', topBeforePop: '[', stackAfterPop: '[(, {]' }, helper: 'The close bracket is valid because it matches the most recent unmatched opening.' }
        },
        {
          title: 'Read }',
          description: '} is a closing bracket. The stack top is {, so this is the correct match. Pop { from the stack.',
          currentIndex: 4,
          stack: ['('],
          action: 'Match then pop',
          detail: 'The closing } matches the top opening {, so { is removed.',
          compare: { top: '{', current: '}', result: 'match' },
          state: { label: '} matches {', values: { current: '}', topBeforePop: '{', stackAfterPop: '[(]' }, helper: 'After the inner pair closes, the previous opening becomes the top again.' }
        },
        {
          title: 'Read )',
          description: ') is a closing bracket. The stack top is (, so this is the correct match. Pop ( from the stack.',
          currentIndex: 5,
          stack: [],
          action: 'Match then pop',
          detail: 'The closing ) matches the top opening (, so ( is removed.',
          compare: { top: '(', current: ')', result: 'match' },
          state: { label: ') matches (', values: { current: ')', topBeforePop: '(', stackAfterPop: '[]' }, helper: 'The outermost pair closes last, which is exactly the reverse order stack behavior requires.' }
        },
        {
          title: 'Finish scan',
          description: 'All characters were scanned and the stack is empty. That means every opening bracket found its correct closing bracket.',
          currentIndex: 6,
          stack: [],
          action: 'Return true',
          detail: 'No unmatched opening brackets remain.',
          state: { label: 'valid', values: { remainingStack: '[]', result: 'true' }, helper: 'An empty stack at the end means no opening bracket was left unmatched.' },
          finalResult: {
            title: 'Valid string',
            body: 'Return true because the stack is empty after processing all characters.'
          }
        }
      ]
    }
  },
  body: [
    { type: 'callout', tone: 'info', title: 'Pattern signal', content: 'Use a stack when nested work must close in reverse order.' },
    { type: 'checklist', title: 'Mistakes to avoid', items: ['Only compare with the top of stack', 'Fail fast on empty stack before closing', 'Check leftover openings at the end'] }
  ],
  relatedConcepts: ['stack', 'LIFO', 'nested structure'],
  metadata: { reviewStatus: 'approved', visibility: ['dev', 'prod'] }
});

export default problem;