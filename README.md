# Senior Dev Accelerator

A fast, multi-page learning platform for DSA and System Design mastery.

## What changed in this performance refactor

- Route-level lazy loading with `React.lazy` and `Suspense`.
- Every topic now reads from a different quiz bank file.
- Home and Progress pages use a lightweight manifest instead of importing all quizzes.
- DSA and System Design pages load only the selected topic bank.
- Random question page loads only the selected/random topic bank.
- Changeable values such as PayPal configuration and storage keys live in `src/config/siteConfig.js`.
- The PayPal coffee button is a reusable component: `src/components/BuyCoffeeButton.jsx`.

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

Every topic has at least 10 quiz items. This build uses 15 per topic.

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

Problem authoring guide: `docs/problem-authoring.md`

## Configure the PayPal coffee button

Copy `.env.example` to `.env` and set your real PayPal hosted donation button ID:

```bash
cp .env.example .env
```

Then edit:

```text
VITE_PAYPAL_HOSTED_BUTTON_ID="YOUR_REAL_PAYPAL_HOSTED_BUTTON_ID"
```

The UI component reads this from `src/config/siteConfig.js`, so payment data is not hardcoded inside the button component.

## Add a new topic in under one minute

1. Create a new file under one of these folders:

```text
src/data/banks/dsa/
src/data/banks/system/
```

2. Export a topic object with `id`, `name`, `category`, `description`, and `questions`.
3. Add the topic metadata to `src/data/topicManifest.js`.
4. Add one loader entry in `src/services/questionBankService.js`.

The UI will automatically support progress, random practice, topic navigation, and completion tracking.

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
