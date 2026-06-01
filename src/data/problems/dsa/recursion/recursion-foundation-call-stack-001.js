import { defineLearningProblem } from '../../../../problems/problemAuthoring.js';

const prompt = 'You are starting the Recursion topic. What should you study first, what goals should guide your practice, and why is recursion a gateway to DFS, trees, backtracking, divide-and-conquer, and dynamic programming?';

const problem = defineLearningProblem({
  id: 'recursion-foundation-call-stack-001',
  category: 'dsa',
  topicId: 'recursion',
  title: 'Recursion — Foundation Study Map',
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
      content: 'Recursion means solving a problem by reducing it into smaller versions of the same problem. Every recursive solution needs a base case, a recursive case, and clear progress toward stopping.'
    },
    {
      type: 'checklist',
      title: 'Goals for this topic',
      items: [
        'Recognize when a problem can be solved by solving a smaller version of itself.',
        'Write a clear base case before writing the recursive call.',
        'Trace what each function call stores on the call stack.',
        'Explain what happens when recursive calls return and unwind.',
        'Understand why recursion is the foundation for DFS, tree traversal, backtracking, divide-and-conquer, and dynamic programming.'
      ]
    },
    {
      type: 'checklist',
      title: 'Areas to study first',
      items: [
        'Base case: the smallest input that can be answered directly.',
        'Recursive case: how the current problem becomes a smaller problem.',
        'Progress: why every call moves closer to the base case.',
        'Call stack: how function calls pause, wait, and resume.',
        'Return unwinding: how answers are built while calls return.',
        'Branching recursion: how one call can create multiple choices or paths.'
      ]
    },
    {
      type: 'comparison',
      title: 'Where recursion leads next',
      items: [
        {
          label: 'Trees and DFS',
          content: 'A recursive call naturally explores child nodes or neighboring states, which is why many tree and DFS solutions feel recursive.'
        },
        {
          label: 'Backtracking',
          content: 'Recursion helps try a choice, go deeper, then return and try another choice.'
        },
        {
          label: 'Divide-and-conquer',
          content: 'Recursion can split a problem into smaller independent parts, solve them, then combine the answers.'
        },
        {
          label: 'Dynamic programming',
          content: 'When recursive subproblems repeat, memoization or tabulation can turn recursion into an efficient DP solution.'
        }
      ]
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Mental model',
      content: 'Think of recursion as a stack of paused promises. Each call says: “I will finish after the smaller problem gives me its answer.”'
    },
    {
      type: 'section',
      title: 'Final takeaway',
      content: 'To master recursion, do not memorize code. Learn to name the smallest answer, define the smaller problem, trace the stack, and explain how the answer returns.'
    }
  ],
  explanation: 'The first goal is to build a mental model. A recursive function must know when to stop, how to reduce the problem, and what to do with the answer returned by the smaller call. This foundation prepares learners for tree traversal, DFS, backtracking, divide-and-conquer, and dynamic programming.',
  starterThought: 'Before coding, ask: what is the smallest input I can answer immediately, and how does the current input become smaller?',
  hints: [
    'Start with the base case, not the recursive call.',
    'Trace the call stack using a tiny input before trying a large one.',
    'Notice whether each call creates one smaller call or many branches.'
  ],
  relatedConcepts: [
    'base case',
    'recursive case',
    'call stack',
    'return unwinding',
    'DFS',
    'backtracking',
    'divide-and-conquer',
    'dynamic programming'
  ],
  followUpQuestions: [
    'What can go wrong if a recursive function has no base case?',
    'How would you explain the call stack to a beginner using factorial(3)?',
    'When does recursion become a dynamic programming problem?'
  ],
  finalTakeaway: 'Recursion is not magic. It is a smaller-problem pattern plus a stopping rule plus the call stack.',
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod'],
    source: 'original',
    estimatedTimeSeconds: 300
  }
});

export default problem;
