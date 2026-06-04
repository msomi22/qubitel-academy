# Adding New Problems

The question bank supports two academy-scoped sources:

1. Manifest-declared one-file content under `src/academies/<academy>/<category>/<topic>/`.
2. Compatibility banks under `src/academies/<academy>/_legacy/banks/`.

The preferred workflow for new content is:

1. Choose `lessons`, `practice`, or `assessments` for the content.
2. Create a file under `src/academies/<academy>/<category>/<topicId>/<section>/<problem-id>.js`.
3. Add its id and section-relative file path to the topic's `topic.manifest.json`.
4. Export a problem object as `export default problem` or `export const problem = { ... }`.
5. Add a config-driven `visualWalkthrough` whenever the question can reasonably benefit from showing state, movement, decisions, or transitions.
6. Run `npm run test:unit` and `npm run build`.
7. Open the app and verify the problem appears under the expected topic.

## Folder structure

Use this structure for new problems:

```text
src/academies/tech/system/scalability/practice/url-shortener.js
src/academies/tech/system/caching/lessons/cache-aside.js
src/academies/tech/dsa/sliding-window/practice/max-sum-subarray.js
```

The folder names should match the problem metadata:

- `category` should match a category from `categoryManifest`.
- `topicId` should match an existing topic in `topicManifest`.
- The topic's category should match the problem category.

## Required fields

Every problem should include:

```js
const problem = {
  id: 'unique-problem-id',
  type: 'multiple-choice',
  category: 'dsa',
  topicId: 'sliding-window',
  title: 'Clear problem title',
  difficulty: 'Easy',
  question: 'Problem statement'
};

export default problem;
```

`prompt` and `question` are compatibility aliases. You may provide either one. Normalization keeps both available so existing UI code continues to work.

## Visual walkthrough expectation

New questions should include a config-driven `visualWalkthrough` wherever possible.

This is especially expected when the learner benefits from seeing:

- how a window, pointer, index, cursor, or frontier moves;
- how state changes after each step;
- when an invariant becomes valid or invalid;
- how an answer is recorded or updated;
- how a DP table, graph traversal, stack, queue, heap, or frequency map evolves.

For DSA coding questions, the default expectation is: include a visual walkthrough unless there is a clear reason it would not help. If no visual is included, explain why in the PR notes.

A visual walkthrough is for mental pictures and state movement, not for repeating static algorithm instructions. Do not add extra `body` flow cards beside the visual that simply duplicate steps already covered by `stepByStepBreakdown`, `hints`, `intuition`, or `explanation`. For example, avoid cards like `Window update order` when the visual itself already shows what enters, what leaves, and when state matches.

Visuals must follow `docs/visual-schema.md`:

- use `visualWalkthrough` config in the problem file;
- use supported diagram types such as `array`, `grid`, `graph`, `table`, `timeline`, `cards`, `tree`, `heap`, or `state`;
- use ordered `frames` to show progression;
- use semantic `role` values instead of CSS classes;
- focus each frame on the changing state, movement, invariant, or decision point;
- do not add raw HTML or raw CSS;
- do not create one-off React renderers for a single problem;
- do not use static step cards as a substitute for a real visual walkthrough.

For Sliding Window problems, prefer:

```js
visualWalkthrough: {
  diagram: {
    type: 'array',
    variant: 'sliding-window',
    title: 'Sliding window walkthrough',
    description: 'Show what enters, what leaves, and how state changes.',
    values: [],
    legend: [],
    frames: []
  }
}
```

## Optional fields

Common optional fields include:

- `tags`
- `options`
- `answer`
- `explanation`
- `scoring`
- `metadata`
- `constraints`
- `hints`
- `visualWalkthrough`

Complex system design problems can also use existing rich fields:

- `scenario`
- `requirements`
- `expectedAnswerOutline`
- `scoringRubric`
- `scoringDictionary`
- `modelAnswer`
- `commonWeakAnswers`
- `finalPattern`

## Supported problem types

Supported types are registered in `src/problems/problemTypeRegistry.js`:

- `multiple-choice`
- `coding`
- `code`
- `simple-system-design`
- `complex-system-design`

Use `coding` for existing DSA-style coding questions because that is the current user-facing behavior. `code` is available as a normalized future-friendly alias.

## Discovery and loading

`src/problems/problemDiscovery.js` uses the active academy catalog and `src/lib/content-loader.js` to select files declared by topic manifests.

Each discovered problem is normalized, validated, and then merged into the matching topic by `questionBankService`.

Legacy bank files under `src/academies/<academy>/_legacy/banks/` are compatibility fallbacks. If a discovered problem and a legacy bank question use the same `id`, the discovered problem wins and the legacy duplicate is skipped for that topic.

## Migrating legacy bank questions

Legacy banks are being phased out. New authored content must use manifest-declared academy topic folders, while `_legacy/banks` remains a compatibility layer for topics that have not been fully migrated.

When migrating a topic:

1. Pick one source file: `src/academies/tech/_legacy/banks/<category>/<topicId>.js`.
2. Create one file per question under `src/academies/<academy>/<category>/<topicId>/<section>/<problem-id>.js`.
3. Preserve the original `id` exactly. Do not rename, prefix, suffix, slugify, or regenerate it because progress and completed status are keyed by ID.
4. Preserve existing authored fields unless a compatibility layer already normalizes them safely.
5. Add `category: '<category>'` if the legacy object did not already have it.
6. Preserve `topicId`; if missing, infer it from the legacy bank file name and add it explicitly.
7. Keep complex system design problems conservative: preserve scoring dictionaries, model answers, weak-answer examples, final patterns, and evaluation fields.
8. Preserve existing `visualWalkthrough` fields when present. When the migrated problem clearly benefits from a visual but does not have one, add a config-driven walkthrough instead of leaving a visual gap.
9. Add every migrated file to the topic manifest, then leave the old bank as a fallback until tests prove its remaining questions are safe to remove.

A migrated problem should look like this:

```js
const problem = {
  id: 'scalability-001',
  type: 'system-design',
  category: 'system',
  topicId: 'scalability',
  title: 'Scale a URL Shortener',
  difficulty: 'Medium',
  question: 'Preserve the original question text and related fields.'
};

export default problem;
```

After migrating a topic, verify:

- `npm run test:unit` passes.
- `npm run build` passes.
- The topic still displays the same problem IDs.
- No duplicate IDs appear in the topic.
- `findQuestionById` can still locate migrated IDs.
- Completed and incomplete filters still match existing saved progress.
- Difficulty filters still work.
- Topic and progress counts remain correct.
- Complex system design rendering and scoring still work when the topic includes those problems.
- Existing or newly added visual walkthroughs render correctly and remain mobile-readable.

## Examples

### Multiple choice

```js
const problem = {
  id: 'sliding-window-window-size-001',
  type: 'multiple-choice',
  category: 'dsa',
  topicId: 'sliding-window',
  title: 'Fixed Window State',
  difficulty: 'Easy',
  tags: ['dsa', 'sliding-window'],
  question: 'What state is usually maintained in a fixed-size sliding window?',
  options: ['All previous windows', 'Only the current window summary', 'A sorted graph', 'A recursive stack'],
  answer: 'Only the current window summary',
  explanation: 'A sliding window reuses state from the previous window instead of recomputing every candidate.',
  visualWalkthrough: {
    diagram: {
      type: 'array',
      variant: 'sliding-window',
      title: 'Fixed window state',
      values: [2, 1, 5, 1],
      frames: [
        {
          title: 'Current window',
          activeRange: [0, 2],
          state: { label: 'Window', values: { sum: 8 } },
          description: 'Only the current fixed-size window summary is needed.'
        }
      ]
    }
  }
};

export default problem;
```

### Simple system design

```js
const problem = {
  id: 'caching-cache-aside-001',
  type: 'simple-system-design',
  category: 'system',
  topicId: 'caching',
  title: 'Use Cache-Aside Safely',
  difficulty: 'Medium',
  tags: ['system', 'caching'],
  question: 'Explain how cache-aside works and what can go wrong during stale reads or cache failures.',
  constraints: ['Discuss freshness, fallback behavior, and observability.'],
  hints: ['Start with read path, then write/update path.']
};

export default problem;
```

### Complex system design

```js
const problem = {
  id: 'scalability-news-feed-001',
  type: 'complex-system-design',
  category: 'system',
  topicId: 'scalability',
  title: 'Design a News Feed',
  difficulty: 'Hard',
  tags: ['system', 'scalability', 'complex-system-design'],
  scenario: 'Design a feed for users following many accounts.',
  question: 'Design the feed generation, storage, ranking, and delivery architecture.',
  requirements: ['Post creation', 'Feed reads', 'Fanout strategy'],
  constraints: ['High read traffic', 'Some accounts have many followers'],
  expectedAnswerOutline: ['API', 'Data model', 'Fanout', 'Caching', 'Failure behavior'],
  scoringRubric: ['Requirements', 'Trade-offs', 'Reliability', 'Observability'],
  scoringDictionary: {
    scalability: ['fanout', 'partitioning', 'cache'],
    reliability: ['retry', 'idempotency', 'fallback']
  },
  modelAnswer: 'A strong answer compares fanout-on-write and fanout-on-read and explains hybrid handling for celebrity accounts.',
  commonWeakAnswers: ['Using one database table without discussing hot users or ranking.'],
  finalPattern: 'Scalability'
};

export default problem;
```

### Coding

```js
const problem = {
  id: 'sliding-window-longest-unique-001',
  type: 'coding',
  category: 'dsa',
  topicId: 'sliding-window',
  title: 'Longest Substring Without Repeating Characters',
  difficulty: 'Medium',
  tags: ['dsa', 'sliding-window', 'coding'],
  question: 'Explain the invariant, algorithm, edge cases, and complexity for the longest unique substring problem.',
  constraints: ['Input can be empty.', 'Characters may repeat many times.'],
  hints: ['Track the last seen position or a set for the active window.'],
  visualWalkthrough: {
    diagram: {
      type: 'array',
      variant: 'sliding-window',
      title: 'Unique-character window',
      description: 'The left pointer moves when a repeated character breaks the invariant.',
      values: ['a', 'b', 'c', 'a'],
      frames: [
        {
          title: 'Repeat found',
          activeRange: [0, 3],
          state: { label: 'Invariant', values: { repeated: 'a', action: 'move left' } },
          description: 'The second a breaks the unique-character invariant, so the window must be repaired.'
        }
      ]
    }
  }
};

export default problem;
```

## Adding a brand-new topic

1. Create `src/academies/<academy>/<category>/<topicId>/topic.manifest.json`.
2. Set the topic `id`, `displayName`, `academy`, `category`, and content arrays.
3. Add the topic id to its parent `category.manifest.json`.
4. Add one or more manifest-declared content files under the topic.
5. Run `npm run generate:academy-manifests`, `npm run test:unit`, and `npm run build`.
6. Open the category page and confirm the topic count is computed from loaded questions.

## Adding a brand-new problem type

1. Add the type to `src/problems/problemTypeRegistry.js`.
2. Provide a label and any type-specific normalization, validation, scorer, or component wiring.
3. Add validation and loading tests.
4. Add an authoring template if the type will be used regularly.

## Tests

Run:

```bash
npm run test:unit
npm run build
```

Prefer focused tests for normalization, validation, discovery, and service behavior instead of large snapshots.
