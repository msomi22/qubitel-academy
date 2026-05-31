# Senior Dev Accelerator

A fast, multi-page learning platform for DSA and System Design mastery.

## What changed in this performance refactor

- Route-level lazy loading with `React.lazy` and `Suspense`.
- Topic pages load visible content through the topic manifest and question-bank service.
- Home and Progress pages use a lightweight manifest instead of importing all quizzes.
- DSA and System Design pages load only the selected topic bank.
- Random question page loads only the selected/random topic bank.
- Changeable values such as PayPal configuration and storage keys live in `src/config/siteConfig.js`.
- The learner support CTA is a reusable component: `src/components/SupportButton.jsx`.

## Topic coverage

### DSA

Includes the original app topics plus the frameworks from the uploaded DSA Pattern Frameworks guide:

- WIND — Sliding Window
- PAIR — Two Pointers
- SEAR — Binary Search
- PREF — Prefix Sum & Hashing
- GREED — Greedy
- STATE — Dynamic Programming
- NODES — Graph BFS / DFS
- HEAP — Heap / Priority Queue
- CHOOSE — Backtracking
- UNION — Union-Find / DSU
- TRIE — Prefix Tree
- BITS — Bit Manipulation
- SPLIT — Divide & Conquer
- STACK — Monotonic Stack / Queue
- Trees

### System Design

- Scalability
- Databases
- Caching
- Messaging Queues
- API Design

Production-visible real DSA and System Design content is authored under `src/data/problems/**` and made production-visible through problem metadata.

## Setup

```bash
npm install
npm run dev
```

Then open:

```text
http://localhost:5173
```

## Production build

```bash
npm run build
npm run preview
```

## Documentation

- Problem authoring guide: `docs/problem-authoring.md`
- GitHub issue authoring guide: `docs/github-issue-authoring-guidelines.md`

## Configure the PayPal support CTA

Copy `.env.example` to `.env` and set your real PayPal hosted donation button ID:

```bash
cp .env.example .env
```

Then edit:

```text
VITE_PAYPAL_HOSTED_BUTTON_ID="YOUR_REAL_PAYPAL_HOSTED_BUTTON_ID"
```

The UI component reads this from `src/config/siteConfig.js`, so payment data is not hardcoded inside the button component. The visible CTA copy is owned by the app config and defaults to `🚀 Support from $1`.

## Add real production content

New real content should be authored as discovered problem files under:

```text
src/data/problems/{category}/{topicId}/{problem-id}.js
```

Production visibility is controlled by each problem's metadata:

```js
metadata: {
  reviewStatus: 'approved',
  visibility: ['dev', 'prod']
}
```

Do not add new real production content to `src/data/banks/**`, and do not add per-question production allow-list entries for new real content. Legacy banks remain supported for local/test/demo compatibility. If a discovered problem and a legacy bank item share the same `id`, the discovered problem is preferred.

## Add a new topic

1. Add the topic metadata to `src/data/topicManifest.js`.
2. Use `questionBank: { mode: 'discovered' }` when the topic should rely on discovered problem files only.
3. Add one or more problem files under `src/data/problems/{category}/{topicId}/`.
4. Run validation/build commands.

The UI will automatically support progress, random practice, topic navigation, and completion tracking for visible topics.

## Important note on content protection

The app includes mild right-click, selection, and shortcut blocking. This is useful for casual friction, but no browser-based protection can fully prevent a determined developer from inspecting client-side content.

## Performance architecture

This version avoids the earlier runtime slowdown by:

- Lazy loading each route.
- Lazy loading each topic quiz bank independently.
- Rendering only the first few questions for the selected topic, then revealing more on demand.
- Keeping performance knobs in `.env` instead of hardcoding them.
- Avoiding expensive backdrop blur on repeated cards.
- Removing React StrictMode double-mount behavior in local development.

Tune these values in `.env`:

```bash
VITE_INITIAL_VISIBLE_QUESTIONS=5
VITE_VISIBLE_QUESTIONS_STEP=5
VITE_ENABLE_TOPIC_ORBIT=true
```
