# Config-Driven Visual Schema

This project should treat quiz/problem visuals as data, not as one-off React components.

## Core rule

New quiz/problem additions should be config-only whenever they use an existing visual capability.

Any new question or problem should include a `visualWalkthrough` whenever the concept can reasonably benefit from a visual explanation. This is especially expected for DSA, state transitions, pointer movement, window movement, recursion, graph traversal, DP, queues/stacks/heaps, and any problem where the learner needs to see how state changes over time.

If a visual walkthrough is not included, the implementation or PR notes should briefly explain why a visual would not add meaningful clarity for that specific problem.

Normal problem additions should usually modify only files under:

```txt
src/academies/<academy>/<category>/<topic>/{lessons,practice,assessments}/...
```

Core React changes are acceptable only when adding a new reusable visual capability that many future problems can use.

## Visual walkthrough expectation

Use a `visualWalkthrough` for new authored questions whenever possible. The goal is not decoration; the visual should teach the important state change, invariant, or decision point that the learner might otherwise miss.

A visual walkthrough must support the learner's mental picture. It should show movement, state transitions, or changing relationships over time. It should not be used as a place to repeat static algorithm notes that are already covered by fields such as `stepByStepBreakdown`, `hints`, `intuition`, `explanation`, or `body` callouts.

Avoid adding extra static cards near the visual walkthrough that simply restate ordered steps, such as a `body` flow card titled `Window update order`. The visual section should stay focused on the animated/configured mental model: what enters, what leaves, which state changes, when an invariant becomes true/false, and when an answer is recorded.

Good candidates for a required visual walkthrough include:

- Sliding Window problems where values enter/leave a window.
- Two Pointers problems where pointer movement matters.
- Prefix Sum problems where running state changes by index.
- Dynamic Programming problems where table/state transitions matter.
- Graph or tree traversal problems where visited/frontier state changes.
- Stack, queue, heap, or monotonic structure problems where push/pop state is central.
- Greedy problems where choices happen in sequence.

A visual may be skipped only when it would be repetitive or unhelpful, such as a purely conceptual text-only question with no meaningful state transition. In that case, say so in the task or PR notes.

Do not satisfy this requirement with raw HTML, raw CSS, screenshots, static step cards, or one-off components. Use the config-driven schema and existing reusable renderers.

## Why this exists

Without a visual schema, every interesting problem risks adding a custom component and custom routing. That creates tech debt quickly.

The desired flow is:

```txt
Problem config
  -> visual schema
  -> reusable renderer
  -> consistent interactive walkthrough
```

## Supported visual types

| Type | Use for |
| --- | --- |
| `grid` | DP tables, matrices, boards, road/lane problems, obstacle traversal |
| `matrix` | Alias of `grid` |
| `board` | Alias of `grid` |
| `array` | Sliding window, two pointers, prefix sums, scans, partitions |
| `timeline` | Greedy choices, state transitions, process walkthroughs |
| `table` | Comparisons, DP state tables, complexity trade-offs |
| `cards` | Only when the cards themselves model changing state, decisions, or relationships; not for repeating static notes |
| `graph` | BFS, DFS, shortest path, relationship traversal |
| `tree` | Tree traversal, recursion, hierarchy problems |
| `heap` | Priority queues and heap state walkthroughs |
| `state` | State machine or transition walkthroughs |

## Shared diagram fields

```js
diagram: {
  type: 'array',
  variant: 'sliding-window',
  title: 'Maximum Sum Subarray of Size K',
  description: 'Explain what the visual is showing.',
  intervalMs: 1400,
  frames: []
}
```

### Required fields

| Field | Meaning |
| --- | --- |
| `type` | Visual family, such as `grid`, `array`, `graph` |
| `title` | Human-friendly visual title |
| `frames` | Ordered walkthrough steps |

### Recommended fields

| Field | Meaning |
| --- | --- |
| `variant` | Styling or learning mode hint, such as `dp-table`, `sliding-window`, `bfs` |
| `description` | One-line visual context |
| `stateTitle` | Title for the state panel |
| `stateDescription` | Explanation of state values |
| `legend` | Semantic labels for markers/roles |

## Frame shape

```js
{
  title: 'Current step title',
  description: 'What changed and why it matters.',
  state: {
    label: 'S1',
    values: [1, 0, 1],
    helper: 'Short state note.'
  }
}
```

## Semantic roles

Use semantic roles instead of raw CSS.

Common roles:

```txt
active
current
window
visited
blocked
goal
answer
success
error
muted
neutral
infinite
remove
warning
```

The renderer owns the styling. Problem config owns the meaning.

## Grid example

```js
visualWalkthrough: {
  diagram: {
    type: 'grid',
    variant: 'road',
    title: 'Three-lane road',
    rows: ['Lane 1', 'Lane 2', 'Lane 3'],
    columns: ['0', '1', '2', '3', '4', '5'],
    defaultCellLabel: '→',
    baseCells: [
      { row: 0, col: 1, role: 'blocked', label: 'X' }
    ],
    frames: [
      {
        title: 'Start',
        position: 0,
        cells: [{ row: 1, col: 0, role: 'active', label: '🐸' }],
        state: { label: 'P0', values: [1, 0, 1] },
        description: 'The frog starts in lane 2.'
      }
    ]
  }
}
```

## Array example

```js
visualWalkthrough: {
  diagram: {
    type: 'array',
    variant: 'sliding-window',
    title: 'Sliding window',
    description: 'A fixed-size window slides one step at a time.',
    values: [2, 1, 5, 1, 3, 2],
    stateTitle: 'Window state',
    stateDescription: 'The state panel shows the rolling summary for the active window.',
    legend: [
      { role: 'window', label: 'current window' },
      { role: 'remove', label: 'outgoing value' },
      { role: 'current', label: 'incoming value' },
      { role: 'answer', label: 'best answer so far' }
    ],
    frames: [
      {
        title: 'First full window',
        activeRange: [0, 2],
        items: [
          { index: 0, role: 'window' },
          { index: 1, role: 'window' },
          { index: 2, role: 'window' }
        ],
        state: {
          label: 'W0',
          values: { windowSum: 8, best: 8 },
          helper: 'The first valid window has size k, so best can be updated.'
        },
        description: 'The first valid window has sum 8.'
      }
    ]
  }
}
```

## Graph example

```js
visualWalkthrough: {
  diagram: {
    type: 'graph',
    variant: 'bfs',
    title: 'BFS traversal',
    nodes: [
      { id: 'A', label: 'A' },
      { id: 'B', label: 'B' }
    ],
    edges: [
      { from: 'A', to: 'B' }
    ],
    frames: [
      {
        title: 'Visit A',
        activeNodes: ['A'],
        visitedNodes: [],
        state: { label: 'Queue', values: ['A'] },
        description: 'Start BFS from A.'
      }
    ]
  }
}
```

## Guardrails

Do not add raw HTML or raw CSS into problem configs.

Do not use visual walkthrough areas or adjacent visual-body cards to duplicate static ordered instructions. Put static algorithm explanation in normal authored fields instead.

Prefer:

```js
{ role: 'blocked', label: 'X' }
```

Avoid:

```js
{ html: '<div class="custom-red-cell">X</div>' }
```

This keeps visuals safe, responsive, theme-consistent, and maintainable.

## Future renderer rule

If a visual cannot be expressed with the existing schema, first ask:

1. Can it be represented as `grid`, `array`, `timeline`, `table`, `cards`, or `graph`?
2. Can semantic roles express the difference?
3. Would a new renderer be reused by many problems?

Only create a new core renderer when the answer to #3 is yes.
