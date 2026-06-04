import { defineLearningProblem } from '../../../../../problems/problemAuthoring.js';

const prompt = 'Recursion is the gateway to DFS, backtracking, divide-and-conquer, tree traversal, and dynamic programming. What must you understand first before moving to advanced patterns?';

const problem = defineLearningProblem({
  id: 'recursion-foundation-call-stack-001',
  category: 'dsa',
  topicId: 'recursion',
  title: 'Recursion — The Gateway to Everything',
  difficulty: 'Easy',
  estimatedTimeSeconds: 300,
  tags: [
    'recursion',
    'call-stack',
    'base-case',
    'recursive-case',
    'dsa-foundations',
    'learning-roadmap'
  ],
  rendering: {
    variant: 'deep-dive',
    density: 'compact',
    accent: 'blue'
  },
  prompt,
  question: prompt,
  body: [
    {
      type: 'section',
      title: 'Big idea',
      content: 'Recursion is the foundation of DFS, backtracking, divide-and-conquer, tree traversal, and dynamic programming. If recursion feels uncomfortable, slow down and spend more time here before moving forward.'
    },
    {
      type: 'checklist',
      title: 'The Three Laws of Recursion',
      items: [
        'A recursive function must call itself.',
        'A recursive function must have a base case that stops the recursion.',
        'A recursive function must move toward the base case.'
      ]
    },
    {
      type: 'section',
      title: 'The recursion mental model: the call stack',
      content: 'When a recursive function calls itself, the current state is pushed onto the call stack. When the function returns, that state is popped. Visualize the call stack as a stack of plates: new calls go on top, and completed calls come off from the top first. Draw call trees on paper until this becomes automatic.'
    },
    {
      type: 'checklist',
      title: 'Recursion practice ladder — do these in order',
      items: [
        '1. Factorial(n) — simplest recursion.',
        '2. Fibonacci(n) — introduces overlapping subproblems.',
        '3. Power(x, n) — divide-and-conquer recursion.',
        '4. Reverse a string — recursion on strings.',
        '5. Check palindrome — two-pointer recursion.',
        '6. Sum of digits — mathematical recursion.',
        '7. Generate all subsets — recursion with choices.',
        '8. Generate all permutations — recursion with branching.',
        '9. Tower of Hanoi — classic recursion reasoning.',
        '10. Binary search, recursive version — divide-and-conquer.'
      ]
    },
    {
      type: 'checklist',
      title: 'Phase 0 checklist — ready for Phase 1 when you can...',
      items: [
        'Write a Java class from scratch with fields, constructor, and methods.',
        'Use arrays, ArrayList, HashMap, HashSet, PriorityQueue, and ArrayDeque fluently.',
        'State the time and space complexity of any code you write.',
        'Write and trace recursive functions on paper without IDE help.',
        'Solve any easy LeetCode problem within 20 minutes.',
        'Explain what happens in memory when a recursive function executes.'
      ]
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'How to practice',
      content: 'Do not just run recursive code in an IDE. For small inputs, draw every call, every return value, and every stack frame on paper until you can explain the full execution from memory.'
    },
    {
      type: 'section',
      title: 'Final takeaway',
      content: 'Recursion is not optional if you want to master advanced DSA. It teaches you how problems shrink, how state is preserved, and how answers are built as calls return.'
    }
  ],
  explanation: 'This foundation question defines recursion as the gateway to advanced patterns. A learner should understand the three laws of recursion, the call stack mental model, the ordered practice ladder, and the Phase 0 readiness checklist before moving to Phase 1.',
  starterThought: 'Start with the base case, then ask how each call makes the problem smaller and what gets stored on the call stack.',
  hints: [
    'If you cannot trace factorial or Fibonacci on paper, do not rush to trees or backtracking yet.',
    'The base case prevents infinite recursion.',
    'The call stack explains why recursive calls pause and resume.'
  ],
  relatedConcepts: [
    'base case',
    'recursive case',
    'call stack',
    'return unwinding',
    'DFS',
    'tree traversal',
    'backtracking',
    'divide-and-conquer',
    'dynamic programming'
  ],
  followUpQuestions: [
    'Why does every recursive function need a base case?',
    'What happens on the call stack when factorial(3) runs?',
    'Why does Fibonacci introduce overlapping subproblems?',
    'Which practice ladder item prepares you for divide-and-conquer?'
  ],
  finalTakeaway: 'Master the three laws, the call stack, and the practice ladder before moving to advanced recursion-based patterns.',
  metadata: {
    sequence: 1,
    reviewStatus: 'approved',
    visibility: ['dev', 'prod'],
    source: 'original',
    estimatedTimeSeconds: 300
  }
});

export default problem;
