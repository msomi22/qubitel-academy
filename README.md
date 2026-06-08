# Qubitel Academy

Qubitel Academy is a fast, multi-page learning platform for structured learning, practice, assessments, and exams.

The platform is evolving into a **LearningNode-powered multi-academy system** that can support:

* Technology Academy
* CBC Academy
* Customer Experience Academy
* Future academies

The current production experience still includes the original Technology Academy content for DSA, System Design, Java, Kubernetes, Aptitude, ML/AI, and Engineering Leadership, while CBC and Customer Experience academy support continues to grow.

---

## Repository rename

The repository has moved from:

```text
msomi22/senior-dev-accelerator
```

to:

```text
msomi22/qubitel-academy
```

If your local clone still points to the old repository URL, update it:

```bash
git remote set-url origin https://github.com/msomi22/qubitel-academy.git
git remote -v
```

---

## Platform direction

Qubitel Academy is being migrated toward a unified architecture where:

```text
Qubitel Academy
├── Technology Academy
├── CBC Academy
└── Customer Experience Academy
```

The long-term goal is for all academies, grades, categories, topics, lessons, questions, practices, assessments, and exams to be represented through a shared **LearningNode** model instead of academy-specific hardcoded structures.

---

## Current performance architecture

This version avoids earlier runtime slowdown by:

* Route-level lazy loading with `React.lazy` and `Suspense`.
* Topic pages loading visible content through manifests and question-bank services.
* Home and Progress pages using lightweight metadata instead of importing all quiz content upfront.
* Topic quiz banks loading independently.
* Rendering only the first few questions for selected topics, then revealing more on demand.
* Keeping performance knobs in `.env` instead of hardcoding them.
* Avoiding expensive backdrop blur on repeated cards.
* Removing React StrictMode double-mount behavior in local development.

Tune these values in `.env`:

```bash
VITE_INITIAL_VISIBLE_QUESTIONS=5
VITE_VISIBLE_QUESTIONS_STEP=5
VITE_ENABLE_TOPIC_ORBIT=true
```

---

## Academy coverage

### Technology Academy

Current Technology Academy areas include:

* Data Structures & Algorithms
* System Design
* Java
* Kubernetes / CKAD
* Aptitude Test Practice
* ML / AI
* Engineering Leadership

#### DSA topics

Includes the original app topics plus pattern-based learning tracks:

* WIND — Sliding Window
* PAIR — Two Pointers
* SEAR — Binary Search
* PREF — Prefix Sum & Hashing
* GREED — Greedy
* STATE — Dynamic Programming
* NODES — Graph BFS / DFS
* HEAP — Heap / Priority Queue
* CHOOSE — Backtracking
* UNION — Union-Find / DSU
* TRIE — Prefix Tree
* BITS — Bit Manipulation
* SPLIT — Divide & Conquer
* STACK — Monotonic Stack / Queue
* Trees

#### System Design topics

* Scalability
* Databases
* Caching
* Messaging Queues
* API Design

### CBC Academy

CBC Academy currently supports child-friendly learning and exam practice for selected grades and learning areas.

Current focus areas include:

* Grade 1 foundation practice
* Grade 3 English
* Reading comprehension
* Spelling
* Parts of speech
* Mathematics
* Kiswahili
* CRE
* Environmental Activities
* Creative Activities

### Customer Experience Academy

Customer Experience Academy is registered as part of the multi-academy direction and will continue growing through future content and LearningNode migration tasks.

---

## Setup

Install dependencies:

```bash
npm install
```

Start local development:

```bash
npm run dev
```

Then open:

```text
http://localhost:5173
```

---

## Production build

Build the app:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## Common validation commands

Run unit tests:

```bash
npm run test:unit
```

Run all tests:

```bash
npm run test
```

Run production build validation:

```bash
npm run build
```

---

## Cloudflare Pages deployment

After the repository rename, confirm Cloudflare Pages is still connected to the correct repository:

```text
msomi22/qubitel-academy
```

In Cloudflare, review:

```text
Workers & Pages → Pages project → Settings → Builds
```

Confirm:

```text
Production branch: main
Build command: npm run build
Build output directory: dist
```

Also confirm environment variables and custom domains.

Expected custom domains:

```text
academy.qubitel.net
cbc.academy.qubitel.net
cx.academy.qubitel.net
```

If Cloudflare still references the old repository name, reconnect the Pages Git integration to:

```text
msomi22/qubitel-academy
```

Do not delete the existing Pages project unless deployment cannot be safely repaired. Prefer reconnecting the existing project so production domains and deployment history remain stable.

---

## Configure the support CTA

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Then configure public hosted payment links:

```text
VITE_PAYPAL_SUPPORT_LINK=""
VITE_PAYPAL_HOSTED_BUTTON_ID="YOUR_REAL_PAYPAL_HOSTED_BUTTON_ID"
VITE_PAYSTACK_SUPPORT_LINK=""
```

The visible CTA copy is owned by:

```text
src/config/siteConfig.js
```

The default CTA copy is:

```text
🚀 Support from $1
```

Clicking the CTA opens a frontend-only support options modal.

PayPal uses `VITE_PAYPAL_SUPPORT_LINK` when configured, then falls back to the hosted PayPal donation URL. Paystack appears only when `VITE_PAYSTACK_SUPPORT_LINK` is configured.

Do not put private secrets in frontend environment variables or `.env.example`. Hosted payment links are public URLs only.

---

## Content authoring

Content is organized through academy manifests, topic manifests, and content files.

Current academy content lives under:

```text
src/academies/
```

Examples:

```text
src/academies/tech/
src/academies/cbc/
src/academies/customer-experience/
```

Topic manifests declare lessons, practice items, and assessments for each academy area.

When adding new content, keep it close to the academy/topic it belongs to and register it through the relevant manifest.

---

## Add real production content

New production-ready content should be:

* authored in the correct academy/topic location;
* declared in the relevant topic manifest;
* reviewed for learner clarity;
* marked with production-safe metadata where applicable;
* validated through tests and production build.

Production-visible content should use metadata such as:

```js
metadata: {
  reviewStatus: 'approved',
  visibility: ['dev', 'prod']
}
```

Avoid adding new real production content to legacy bank locations unless the task specifically requires legacy compatibility.

If a discovered problem and a legacy bank item share the same `id`, the discovered problem should be preferred.

---

## Add a new topic

When adding a new topic, update all required source-of-truth files for the active architecture.

Typical checklist:

1. Add the topic manifest under the correct academy/category path.
2. Register the topic in the parent category manifest.
3. Add lesson, practice, or assessment content under the topic folder.
4. Ensure the topic is visible in the correct academy/profile.
5. Run validation and build commands.

Recommended validation:

```bash
npm run test:unit
npm run build
```

The UI should automatically support progress, random practice, topic navigation, and completion tracking for visible topics when the topic is wired correctly.

---

## Documentation

Useful project docs:

* Problem authoring guide: `docs/problem-authoring.md`
* GitHub issue authoring guide: `docs/github-issue-authoring-guidelines.md`
* LearningNode framework: `docs/architecture/core/learning-node-framework-v1.0.md`
* LearningNode implementation guide: `docs/architecture/core/learning-node-implementation-guide-v1.0.md`

---

## Important note on content protection

The app includes mild right-click, selection, and shortcut blocking.

This is useful for casual friction, but no browser-based protection can fully prevent a determined developer from inspecting client-side content.

Do not treat frontend-only content protection as a strong security boundary.

---

## Migration notes

The platform is currently transitioning from a technology-focused learning app into a multi-academy learning platform.

During migration:

* keep existing production routes working;
* avoid broad blind renames;
* avoid mixing unrelated refactors into focused PRs;
* keep Technology Academy content stable;
* migrate architecture incrementally through the LearningNode epic;
* validate Cloudflare Pages deployment after repository or app identity changes.

Current repository:

```text
https://github.com/msomi22/qubitel-academy
```
