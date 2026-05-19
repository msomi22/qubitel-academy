# Adding New Problems

The question bank supports two sources of problems:

1. Existing legacy banks under `src/data/banks`.
2. New one-file-per-problem files under `src/data/problems`.

The preferred workflow for new content is:

1. Create a file under `src/data/problems/<category>/<topicId>/<problem-id>.js`.
2. Export a problem object as `export default problem` or `export const problem = { ... }`.
3. Run `npm run test:unit`.
4. Open the app and verify the problem appears under the expected topic.

## Folder structure

Use this structure for new problems:

```text
src/data/problems/system/scalability/url-shortener.js
src/data/problems/system/caching/cache-aside.js
src/data/problems/dsa/sliding-window/max-sum-subarray.js
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

`src/problems/problemDiscovery.js` uses `import.meta.glob` to discover files under `src/data/problems/**/*.js`.

Each discovered problem is normalized, validated, and then merged into the matching topic by `questionBankService`.

Legacy bank files under `src/data/banks` are now compatibility fallbacks. If a discovered problem and a legacy bank question use the same `id`, the discovered problem wins and the legacy duplicate is skipped for that topic. This lets migration happen gradually without showing duplicate questions or breaking old topics that still rely on banks.

## Migrating legacy bank questions

Legacy banks are being phased out. New authored content should use `src/data/problems` only, while `src/data/banks` remains a temporary compatibility layer for topics that have not been migrated yet.

When migrating a topic:

1. Pick one source file: `src/data/banks/<category>/<topicId>.js`.
2. Create one file per question under `src/data/problems/<category>/<topicId>/<problem-id>.js`.
3. Preserve the original `id` exactly. Do not rename, prefix, suffix, slugify, or regenerate it because progress and completed status are keyed by ID.
4. Preserve existing authored fields unless a compatibility layer already normalizes them safely.
5. Add `category: '<category>'` if the legacy object did not already have it.
6. Preserve `topicId`; if missing, infer it from the legacy bank file name and add it explicitly.
7. Keep complex system design problems conservative: preserve scoring dictionaries, model answers, weak-answer examples, final patterns, and evaluation fields.
8. Leave the old bank file as a compatibility shell or fallback until tests prove it is safe to remove its questions.

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

## Validation

Validation checks that:

- `id` exists.
- `id` is unique across discovered problems.
- `type` exists.
- `type` exists in `problemTypeRegistry`.
- `category` exists.
- `topicId` exists.
- `title` exists.
- `difficulty` exists.
- `prompt` or `question` exists.
- `topicId` exists in `topicManifest`.
- `category` matches the topic category where possible.

Validation returns structured errors instead of crashing production. In development and tests, validation issues are surfaced with a console warning.

Example result:

```js
{
  valid: false,
  errors: [
    {
      problemId: 'example-id',
      field: 'topicId',
      message: 'Unknown topicId: missing-topic.'
    }
  ]
}
```

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
  explanation: 'A sliding window reuses state from the previous window instead of recomputing every candidate.'
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
  hints: ['Track the last seen position or a set for the active window.']
};

export default problem;
```

## Adding a brand-new topic

1. Add a topic entry to `src/data/topicManifest.js`.
2. Set the topic `id`, `name`, `category`, and `description`.
3. Add one or more problem files under `src/data/problems/<category>/<topicId>/`.
4. Run `npm run test:unit`.
5. Open the category page and confirm the topic count is computed from loaded questions.

## Adding a brand-new problem type

1. Add the type to `src/problems/problemTypeRegistry.js`.
2. Provide a label and any type-specific normalization, validation, scorer, or component wiring.
3. Add validation and loading tests.
4. Add an authoring template if the type will be used regularly.

## Tests

Run:

```bash
npm run test:unit
```

Prefer focused tests for normalization, validation, discovery, and service behavior instead of large snapshots.
