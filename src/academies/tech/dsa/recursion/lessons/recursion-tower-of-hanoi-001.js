import { defineLearningProblem } from '../../../../../problems/problemAuthoring.js';

const problem = defineLearningProblem({
  id: 'recursion-tower-of-hanoi-001',
  category: 'dsa',
  topicId: 'recursion',
  title: 'Tower of Hanoi - Recursive Move Planning',
  difficulty: 'Hard',
  estimatedTime: '25 min',
  estimatedTimeSeconds: 1500,
  language: 'java',
  tags: ['recursion', 'tower-of-hanoi', 'call-stack', 'recursive-planning', 'backtracking-prep', 'java', 'visual-walkthrough'],
  scenario: 'You are teaching a robot how to move a tower of disks between three rods without ever placing a larger disk on top of a smaller disk.',
  question: 'Write a recursive Java method that prints the minimum sequence of moves needed to move n Tower of Hanoi disks from a source rod to a target rod using an auxiliary rod.',
  prompt: 'How does Tower of Hanoi use recursion as a plan of deferred work, and how do stack frames, pending phases, and emitted disk moves fit together?',
  examples: [
    'Input: n = 1, source = A, auxiliary = B, target = C -> Move disk 1 from A to C',
    'Input: n = 2 -> Move disk 1 A to B, disk 2 A to C, disk 1 B to C',
    'Input: n = 3 -> 7 moves total',
    'Minimum moves for n disks: 2^n - 1'
  ],
  constraints: [
    'n is a positive integer.',
    'A larger disk must never be placed on top of a smaller disk.',
    'Only one disk may move at a time.',
    'Use recursion for the main solution.',
    'Print moves in the order they must happen.'
  ],
  starterThought: 'Do not try to move the largest disk first. First move the smaller tower out of the way, then move the largest disk, then move the smaller tower back on top.',
  plainLanguageExplanation: 'Tower of Hanoi has three rods and a stack of disks. All disks start on one rod, smallest on top and largest at the bottom. The goal is to move the full stack to another rod while obeying one rule: a bigger disk can never sit on a smaller disk.',
  intuition: 'Think of the largest disk as a locked door. To move it, every smaller disk above it must first move away. Once the largest disk moves to the target, the same smaller tower must be rebuilt on top of it. That is why the recursive shape has three phases.',
  mentalPicture: 'Each hanoi(n, source, auxiliary, target) call is not just one move. It is a small project plan: move n - 1 disks away, move disk n, then move n - 1 disks back. The computer keeps that plan on the call stack while deeper calls solve smaller towers.',
  patternSignal: 'Use this pattern when one recursive call must do work before and after a central action. The parent frame waits while child frames complete the before-work, emits its own move, then waits again while child frames complete the after-work.',
  invariant: 'At every moment, each rod must have smaller disks above larger disks. The recursive plan preserves this by moving n - 1 smaller disks before moving disk n.',
  bruteForceThought: 'A manual move-by-move strategy becomes confusing quickly. Recursion gives a repeatable plan: treat the top n - 1 disks as a smaller Tower of Hanoi problem.',
  optimizationJourney: 'The move count cannot be improved below 2^n - 1 because disk n cannot move until n - 1 disks move away, and after disk n moves, those n - 1 disks must move again onto it.',
  stepByStepBreakdown: [
    'If n is 1, move the only disk directly from source to target.',
    'Otherwise, recursively move n - 1 disks from source to auxiliary, using target as temporary storage.',
    'Move the largest disk n from source to target.',
    'Recursively move the n - 1 disks from auxiliary to target, using source as temporary storage.',
    'Each recursive call follows the same three-phase plan until it reaches the base case.'
  ],
  finalPattern: 'Recursive deferred-work planning: before recursive call, central emitted action, after recursive call.',
  commonMistake: 'The most common mistake is mixing up the auxiliary and target rods in the two recursive calls.',
  commonMistakes: [
    'Forgetting the base case n == 1.',
    'Calling hanoi(n - 1, source, auxiliary, target) for both recursive calls. The rod roles must rotate.',
    'Moving the largest disk before clearing the smaller disks above it.',
    'Thinking every stack frame immediately moves a disk. Many frames first push smaller frames and wait.',
    'Counting stack depth as the same as total moves. Stack depth is O(n), while the total number of moves is O(2^n).',
    'Printing the middle move in the wrong position. It must happen between the two recursive calls.'
  ],
  edgeCases: [
    'n = 1 should produce one direct move.',
    'n = 2 should produce three moves.',
    'n = 3 should produce seven moves and shows the full recursive pattern clearly.',
    'Large n produces many moves, even though the code is short.'
  ],
  complexityAnalysis: 'Time complexity is O(2^n) because the algorithm emits exactly 2^n - 1 moves. Space complexity is O(n) because the deepest active call stack contains hanoi(n), hanoi(n - 1), hanoi(n - 2), and so on down to hanoi(1). Output size is also O(2^n) because the printed move list itself is exponential.',
  explanation: 'For n = 3, the first call hanoi(3, A, B, C) pauses while hanoi(2, A, C, B) moves the top two disks to the auxiliary rod. Then the parent emits the middle move A -> C for disk 3. Finally, it calls hanoi(2, B, A, C) to rebuild the two smaller disks on top of disk 3. The key insight is that the parent frame remembers its unfinished phases while child frames execute.',
  solutionCode: `class Solution {
    public void hanoi(int n, char source, char auxiliary, char target) {
        if (n == 1) {
            System.out.println("Move disk 1 from " + source + " to " + target);
            return;
        }

        hanoi(n - 1, source, target, auxiliary);

        System.out.println("Move disk " + n + " from " + source + " to " + target);

        hanoi(n - 1, auxiliary, source, target);
    }
}`,
  finalTakeaway: 'Tower of Hanoi teaches recursion as planning plus waiting: each frame stores a three-phase promise, deeper frames do smaller work, and real disk moves are emitted only when the right frame reaches its moment.',
  selfExplanationPrompt: 'Trace hanoi(3, A, B, C). For every step, write the active stack frame, the pending phase, and the rods after any emitted move.',
  visualExplanation: 'Use n = 3. Watch the rods and disks change at the same time as stack frames are pushed, paused, resumed, and popped.',
  visualWalkthrough: {
    title: 'Tower of Hanoi(3) - Rods, Moves, and Call Stack',
    summary: 'A cinematic walkthrough showing disks moving across rods while recursive stack frames wait, resume, emit moves, and pop.',
    diagram: {
      id: 'recursion-tower-of-hanoi-001-walkthrough',
      type: 'recursion-hanoi',
      disks: 3,
      title: 'Tower of Hanoi(3) - Recursive Move Planning',
      summary: 'Step through the exact n = 3 execution: rods show disk movement; memory shows active and paused stack frames.'
    }
  },
  body: [
    {
      type: 'checklist',
      title: 'Objective',
      items: [
        'I can explain the three rods: source, auxiliary, and target.',
        'I can explain why a bigger disk cannot sit on a smaller disk.',
        'I can describe the three recursive phases for hanoi(n).',
        'I can trace hanoi(3) using both rods and call stack frames.',
        'I can explain why the minimum number of moves is 2^n - 1.'
      ]
    },
    { type: 'section', title: 'What Tower of Hanoi means', content: 'The puzzle starts with all disks stacked on the source rod. Disk 1 is the smallest and must always stay above larger disks. The target is to rebuild the same ordered tower on another rod.' },
    {
      type: 'table',
      title: 'The three-phase recursive plan',
      columns: ['Phase', 'Meaning', 'Recursive call or move'],
      rows: [
        ['1', 'Move the smaller tower out of the way', 'hanoi(n - 1, source, target, auxiliary)'],
        ['2', 'Move the largest disk in this frame', 'print source -> target'],
        ['3', 'Move the smaller tower onto the largest disk', 'hanoi(n - 1, auxiliary, source, target)']
      ]
    },
    { type: 'callout', tone: 'info', title: 'Why this prepares you for backtracking', content: 'Tower of Hanoi trains the same thinking used later in backtracking: make a smaller plan, pause, do one important action, then continue with another smaller plan.' },
    {
      type: 'comparison',
      title: 'Factorial vs Fibonacci vs Tower of Hanoi',
      items: [
        { label: 'Factorial', content: 'One child call, then multiply during return.' },
        { label: 'Fibonacci', content: 'Two child calls whose returned values are added.' },
        { label: 'Tower of Hanoi', content: 'One child call, one real move, then another child call with rotated rod roles.' }
      ]
    }
  ],
  solutionBody: [
    {
      type: 'table',
      title: 'Move sequence for n = 3',
      columns: ['Move', 'Disk', 'From', 'To', 'Why now?'],
      rows: [
        ['1', '1', 'A', 'C', 'Base case inside hanoi(1, A, B, C).'],
        ['2', '2', 'A', 'B', 'Disk 2 is clear after disk 1 moved away.'],
        ['3', '1', 'C', 'B', 'Rebuild small tower on disk 2.'],
        ['4', '3', 'A', 'C', 'Largest disk is finally clear.'],
        ['5', '1', 'B', 'A', 'Prepare to move disk 2 onto disk 3.'],
        ['6', '2', 'B', 'C', 'Disk 2 moves onto disk 3.'],
        ['7', '1', 'A', 'C', 'Finish rebuilding the tower on target.']
      ]
    },
    {
      type: 'checklist',
      title: 'Trace checklist',
      items: [
        'Write hanoi(n, source, auxiliary, target) exactly; rod order matters.',
        'Mark parent frames as waiting while child calls run.',
        'Emit the middle move only after the first child call returns.',
        'Pop a frame only after all three phases are complete.',
        'Count moves with 2^n - 1 and stack depth with n.'
      ]
    }
  ],
  relatedConcepts: ['base case', 'recursive case', 'call stack', 'deferred work', 'return unwinding', 'backtracking prep', 'exponential time'],
  followUpQuestions: [
    'Why is hanoi(1) the base case?',
    'Why does the first recursive call use target as the temporary rod?',
    'At which moment does disk 3 move when n = 3?',
    'Why does Tower of Hanoi use O(n) stack space but O(2^n) time?',
    'How is Tower of Hanoi different from Fibonacci branching recursion?'
  ],
  metadata: {
    sequence: 11,
    reviewStatus: 'approved',
    visibility: ['dev', 'prod'],
    source: 'original',
    estimatedTimeSeconds: 1500
  }
});

export default problem;
