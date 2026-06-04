# Problem Authoring Guide

## Goal

New problems should normally be added as one manifest-declared file under:

```text
src/academies/{academy}/{category}/{topicId}/{lessons|practice|assessments}/{problem-id}.js
```

This keeps authoring simple: one problem file owns its prompt, answer fields, metadata, rich body blocks, and production visibility. Existing banks under `src/academies/{academy}/_legacy/banks` remain supported for compatibility, but new content must use academy topic folders.

## Quick start: add one problem to an existing topic

For an existing topic, create one file in the matching category/topic folder and export the helper result as the default export.

```js
import { defineLearningProblem } from '../../../../../problems/problemAuthoring.js';

const problem = defineLearningProblem({
  id: 'caching-cache-aside-basics-001',
  topicId: 'caching',
  title: 'Cache-aside basics',
  difficulty: 'Easy',
  prompt: 'Explain how cache-aside handles reads and cache misses.',
  explanation: 'The app checks cache first, reads from the database on miss, then stores the value in cache for future reads.',
  hints: ['Start with the read path.', 'Mention cache miss fallback.'],
  metadata: {
    reviewStatus: 'draft',
    visibility: ['dev']
  }
});

export default problem;
```

If `topicId` exists in the active academy catalog, the helper can infer the category from the topic. Add `category` manually only when that improves readability or when a migration needs to preserve old shape.

## Authoring helpers

Import helpers from `src/problems/problemAuthoring.js`.

- `defineProblem(problem)` is the general helper when you already know the exact `type`.
- `defineMcqProblem(problem)` sets `type: 'mcq'`, normalizes `correctAnswer`, and fills `answer` from the normalized answer when needed.
- `defineLearningProblem(problem)` sets `type: 'learning'` unless another learning-compatible type is provided.
- `defineSimpleSystemDesignProblem(problem)` sets `type: 'simple-system-design'`.
- `defineComplexSystemDesignProblem(problem)` sets `type: 'complex-system-design'`.

The helpers normalize `prompt` and `question`, infer category from `topicId`, merge useful tags, and add `metadata.authoringVersion`.

## Problem types

Use these types for new authored content:

| Type | Use when |
| --- | --- |
| `mcq` | The learner chooses from options and there is one correct answer. |
| `learning` | The item teaches or explains a concept without MCQ scoring. |
| `simple-system-design` | The prompt expects a short architecture explanation or focused design answer. |
| `complex-system-design` | The prompt expects a full system design answer with requirements, flows, trade-offs, scoring, and rich body. |

## MCQ authoring

Use `defineMcqProblem` for multiple-choice items.

```js
import { defineMcqProblem } from '../../../../../problems/problemAuthoring.js';

const problem = defineMcqProblem({
  id: 'java-core-equals-vs-double-equals-001',
  topicId: 'java-core',
  title: 'equals() vs ==',
  difficulty: 'Easy',
  prompt: 'What is the best explanation of == versus equals() for Java objects?',
  options: [
    '== compares object references; equals() can compare logical value.',
    '== and equals() always do exactly the same thing.',
    'equals() compares references; == compares object text.',
    '== converts objects to strings before comparing.'
  ],
  correctAnswer: '== compares object references; equals() can compare logical value.',
  explanation: 'For objects, == asks whether both variables reference the same object. equals() can be implemented to compare logical value.',
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod']
  }
});

export default problem;
```

`correctAnswer` may be a zero-based option index or an exact option string. The helper stores the normalized answer index. Common validation errors are missing `options`, an out-of-range answer index, or a string answer that does not exactly match an option.

## Learning problem authoring

Use `defineLearningProblem` for non-MCQ learning content. Common fields are:

- `prompt` or `question`
- `explanation`
- `hints`
- `starterThought`
- `relatedConcepts`
- `references`
- `followUpQuestions`
- optional rich `body` blocks

```js
import { defineLearningProblem } from '../../../../../problems/problemAuthoring.js';

const problem = defineLearningProblem({
  id: 'java-core-pass-by-value-001',
  topicId: 'java-core',
  title: 'Java passes object references by value',
  difficulty: 'Medium',
  prompt: 'Explain why Java is pass-by-value even when objects are involved.',
  starterThought: 'Separate the object from the copied reference value.',
  explanation: 'Java copies the value of the variable. For object variables, that copied value is a reference to the same object.',
  relatedConcepts: ['references', 'mutation', 'method parameters'],
  followUpQuestions: ['What changes if the method reassigns the parameter?', 'What changes if the method mutates the object?'],
  references: ['Java language fundamentals: parameter passing'],
  metadata: {
    reviewStatus: 'draft',
    visibility: ['dev']
  }
});

export default problem;
```

## System design authoring

Use `simple-system-design` when the answer should be compact and focused. Use `complex-system-design` when the problem needs requirements, constraints, flows, scoring dictionaries, rubrics, rich examples, and model answers.

### One-file simple system design problem

```js
import { defineSimpleSystemDesignProblem } from '../../../../../problems/problemAuthoring.js';

const problem = defineSimpleSystemDesignProblem({
  id: 'caching-product-details-002',
  topicId: 'caching',
  title: 'Cache product details',
  difficulty: 'Medium',
  prompt: 'Design a cache strategy for product detail pages with frequent reads and occasional updates.',
  requirements: ['Low read latency', 'Safe fallback on cache miss', 'Reasonable freshness after updates'],
  constraints: ['Read-heavy traffic', 'Product data can change', 'Cache failures should not break the page'],
  hints: ['Discuss cache-aside.', 'Mention TTL and invalidation.'],
  metadata: {
    reviewStatus: 'draft',
    visibility: ['dev']
  }
});

export default problem;
```

### One-file complex system design problem

```js
import { defineComplexSystemDesignProblem } from '../../../../../problems/problemAuthoring.js';

const problem = defineComplexSystemDesignProblem({
  id: 'scalability-news-feed-001',
  topicId: 'scalability',
  title: 'Design a News Feed',
  difficulty: 'Hard',
  scenario: 'Design a feed for users following many accounts.',
  prompt: 'Design feed generation, storage, ranking, delivery, reliability, and observability.',
  requirements: {
    functional: ['Create posts', 'Read personalized feeds', 'Support follow relationships'],
    nonFunctional: ['Low read latency', 'High availability', 'Graceful handling of celebrity accounts']
  },
  constraints: ['Read traffic is much higher than write traffic.', 'Some authors have millions of followers.'],
  expectedAnswerOutline: ['APIs', 'Data model', 'Fanout strategy', 'Caching', 'Failure behavior'],
  scoringRubric: [
    { id: 'requirements', title: 'Requirements', weight: 10, criteria: [{ id: 'scope', label: 'Clear scope', points: 5 }] }
  ],
  scoringDictionary: {
    fanout: { terms: ['fanout', 'fan out', 'push model', 'pull model'], synonyms: ['hybrid feed generation'] }
  },
  modelAnswer: 'A strong answer compares fanout-on-write and fanout-on-read, then proposes a hybrid for high-follower accounts.',
  commonWeakAnswers: ['Uses one table without discussing hot users, ranking, caching, or fanout trade-offs.'],
  metadata: {
    reviewStatus: 'draft',
    visibility: ['dev']
  }
});

export default problem;
```

## Rich body blocks

`body` is an ordered array of structured render blocks. Use supported block types only; do not invent CSS classes or renderer-specific shapes.

### Supported block examples

```js
body: [
  { type: 'section', title: 'Scope', content: 'Focus on read-heavy traffic and clear failure behavior.' },
  { type: 'callout', tone: 'info', title: 'Interview tip', content: 'State assumptions before choosing storage.' },
  {
    type: 'table',
    title: 'Core entities',
    columns: ['Entity', 'Purpose'],
    rows: [['short_links', 'Maps short code to long URL'], ['click_events', 'Stores analytics events']]
  },
  { type: 'image', src: '/images/url-shortener.png', caption: 'High-level architecture' },
  { type: 'diagram', content: 'Client -> Edge -> Redirect Service -> Cache -> Database' },
  { type: 'flow', title: 'Redirect flow', steps: ['Receive short code', 'Check cache', 'Read storage on miss', 'Return redirect'] },
  { type: 'code', language: 'http', code: 'GET /{shortCode}\n302 Location: https://example.com' },
  { type: 'checklist', title: 'Answer checklist', items: ['Requirements', 'Data model', 'Caching', 'Failure modes'] },
  {
    type: 'comparison',
    title: 'Storage trade-offs',
    items: [
      { label: 'Relational DB', content: 'Good constraints and transactions.' },
      { label: 'Key-value store', content: 'Fast lookups and easier horizontal scaling.' }
    ]
  },
  {
    type: 'architectureDecision',
    title: 'Async analytics',
    decision: 'Emit click events to a queue instead of writing analytics synchronously.',
    consequences: ['Redirect latency stays low.', 'Dashboards become eventually consistent.']
  },
  { type: 'divider' }
]
```

A compact rich body example with table, callout, flow, checklist, and code blocks:

```js
body: [
  { type: 'callout', tone: 'warning', title: 'Critical path', content: 'Do not block redirects on analytics writes.' },
  {
    type: 'table',
    columns: ['Path', 'Main concern'],
    rows: [['Create', 'Uniqueness and validation'], ['Redirect', 'Latency and availability']]
  },
  { type: 'flow', steps: ['Validate code', 'Check cache', 'Read DB on miss', 'Emit async event', 'Redirect'] },
  { type: 'checklist', items: ['Collision handling', 'Expiry behavior', 'Abuse controls', 'Observability'] },
  { type: 'code', language: 'http', code: 'POST /api/v1/links\nGET /{shortCode}' }
]
```

Block validation currently enforces supported block types, callout tones, non-empty table columns/rows, trusted root-relative image paths, non-empty flow steps, non-empty code content, comparison item count, and useful architecture decision content.

## Rendering metadata

Use `rendering` to request a controlled presentation variant:

```js
rendering: {
  variant: 'architecture-case-study',
  density: 'detailed',
  accent: 'blue'
}
```

Allowed values are:

- `variant`: `default`, `architecture-case-study`, `interview-drill`, `deep-dive`
- `density`: `compact`, `comfortable`, `detailed`
- `accent`: `blue`, `green`, `amber`, `neutral`

Problem files should not define arbitrary CSS classes. Add renderer support centrally before introducing new controlled values.

## Production visibility

Production visibility is controlled in problem metadata.

Approved production-visible problem:

```js
metadata: {
  reviewStatus: 'approved',
  visibility: ['dev', 'prod']
}
```

Draft or dev-only problem:

```js
metadata: {
  reviewStatus: 'draft',
  visibility: ['dev']
}
```

`metadata.reviewStatus` describes content review state. Use `approved` only when the prompt, answer, metadata, and rendering have been reviewed. Use `draft` for incomplete or local-only content.

`metadata.visibility` describes where the problem may appear. Include `prod` only for approved production content. New discovered problems approved through metadata do not need a `src/config/contentProfile.js` allow-list update.

## Java topic/category example

Java is the proof that a new category can be added without legacy bank files.

Topic and category manifest entries:

```js
{
  id: 'java-core',
  name: 'Java Core',
  category: 'java',
  description: 'Practice Java language fundamentals, object-oriented reasoning, collections, exceptions, and JVM basics.',
  questionBank: { mode: 'discovered' }
}

{
  id: 'java',
  name: 'Java',
  shortName: 'Java',
  description: 'Core Java, backend fundamentals, language behavior, and production-ready Java reasoning.',
  route: '/category/java',
  featured: true
}
```

A Java problem then lives at:

```text
src/academies/tech/java/java-core/practice/equals-vs-double-equals.js
```

## URL Shortener v2 example

URL Shortener v2 is the final one-file proof for a rich, production-visible complex system design problem. It lives at:

```text
src/academies/tech/system/scalability/practice/url-shortener-v2.js
```

It uses `defineComplexSystemDesignProblem`, rich body blocks, rendering metadata, scoring dictionary/rubric fields, hints, follow-up questions, references, and:

```js
metadata: {
  reviewStatus: 'approved',
  visibility: ['dev', 'prod']
}
```

Do not add URL Shortener v2 again. Use it as a reference when creating future rich system design problems.

## Adding a new topic

Add a topic when the category already exists but the concept does not fit an existing topic.

1. Create `src/academies/{academy}/{category}/{topicId}/topic.manifest.json`.
2. Set `id`, `displayName`, `academy`, `category`, and the three content arrays.
3. Add the topic id to its parent `category.manifest.json`.
4. Add one or more files under the topic's `lessons`, `practice`, or `assessments` folder and declare them in the topic manifest.
5. Run `npm run generate:academy-manifests`, tests, and the production build.

## Adding a new category

Add a category when the learning area is broader than a topic, such as Java. Create its `category.manifest.json`, add it to the academy manifest, then add at least one topic manifest.

A new category should include route metadata, user-facing names, description, domain, tags, and featured status. The category becomes useful only when it has visible topics and problems.

## When manifests must be edited

Edit academy manifests when:

- adding a new topic;
- adding a new category;
- changing topic/category names, descriptions, routes, or featured behavior;
- adding or removing a content file from a topic.

## Legacy banks

Legacy banks under `src/academies/{academy}/_legacy/banks` remain supported so older content continues to load. They must not be used for new content.

New content should use discovered one-file problems because it avoids editing central loader files, makes review smaller, and keeps problem metadata next to the prompt.

If a discovered problem and a legacy question share the same `id`, the discovered problem takes priority and the legacy duplicate is skipped for that topic. This allows safe gradual migration without duplicate questions or broken saved progress.

## Validation

Run where possible:

```bash
npm run test:unit
npm run build
```

`npm run test:unit` covers config, problem helpers, rich body validation, discovery/service behavior, and scoring utilities. `npm run build` verifies the Vite production build.

## PR checklist

Before opening a PR, check:

- Adding a problem under an existing topic changes one problem file only unless there is a clear reason.
- New content does not create or expand legacy bank files.
- Prod-approved discovered problems do not require `contentProfile` allow-list updates.
- Rich body blocks use supported structured `type` values.
- `metadata.reviewStatus` is set correctly.
- `metadata.visibility` is set correctly.
- `rendering` uses controlled values only.
- The topic manifest declares every new authored file.
- `npm run test:unit` was run where possible.
- `npm run build` was run where possible.
- PR issue references are correct.

## Linking PRs to issues

Use issue references intentionally so project bookkeeping stays accurate.

- Use a closing keyword such as `Fixes`, `Closes`, or `Resolves` only for the issue that should close automatically when the PR merges.
- Use `Refs` for related parent issues, epics, checklists, or follow-up issues that should not close automatically.
- Do not copy issue IDs from old examples. Always use the issue numbers for the current PR.
- If a PR belongs to a larger epic, close the smallest completed implementation issue automatically and reference the epic unless the PR truly completes the epic.

Example format:

```text
Fixes #<issue-this-pr-completes>
Refs #<related-epic-or-parent>
Refs #<related-checklist-or-follow-up>
```

## After merge

After an authoring PR merges:

1. Confirm any issue referenced with a closing keyword closed automatically.
2. Manually close related checklist, phase, or epic issues only when their acceptance criteria are fully satisfied.
3. Leave related issues open when the PR only references them or only completes part of the work.
4. Do not reopen or modify previous phase issues unless a new documentation or content bug requires it.
