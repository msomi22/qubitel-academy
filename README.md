# Qubitel Academy

Qubitel Academy is a fast, multi-academy learning platform for structured lessons, practice, assessments, exams, and learner progress tracking.

It is built around a growing **LearningNode-powered architecture** designed to support multiple academies from one shared platform.

Current academy direction:

```text
Qubitel Academy
├── Technology Academy
├── CBC Academy
├── Customer Experience Academy
└── Future Academies
```

---

## Platform direction

Qubitel Academy is evolving into a unified multi-academy learning system where academies, grades, categories, topics, lessons, practice questions, assessments, and exams can be represented through a shared **LearningNode** model.

The goal is to reduce hardcoded academy-specific structures and make the platform easier to extend, personalize, and maintain.

The platform is designed to support:

* domain-specific academies;
* academy-aware routing;
* reusable learning flows;
* structured lessons and practice;
* assessments and exams;
* progress tracking;
* academy-specific UI and content overrides;
* future personalization and adaptive learning.

---

## Academy coverage

### Technology Academy

Technology Academy focuses on software engineering mastery and technical interview preparation.

Current areas include:

* Data Structures & Algorithms
* System Design
* Java
* Kubernetes / CKAD
* Aptitude Test Practice
* ML / AI
* Engineering Leadership

#### DSA learning tracks

Pattern-based DSA tracks include:

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

Current System Design areas include:

* Scalability
* Databases
* Caching
* Messaging Queues
* API Design

---

### CBC Academy

CBC Academy supports child-friendly learning, practice, and exam preparation for selected grades and learning areas.

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

CBC Academy is expected to continue growing toward a structured Grade 1–8 learning experience.

---

### Customer Experience Academy

Customer Experience Academy is part of the multi-academy platform direction.

It is intended to support future customer service, communication, support operations, and learner practice content through the shared LearningNode architecture.

---

## Architecture direction

The platform is moving toward a shared content and learning architecture based on:

* academy manifests;
* category manifests;
* topic manifests;
* LearningNode definitions;
* academy-aware routing;
* production-safe metadata;
* reusable lesson, practice, assessment, and exam flows.

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

When adding content, keep it close to the academy or topic it belongs to and register it through the relevant manifest.

---

## Performance architecture

The app uses performance-focused loading patterns to keep the learning experience fast as content grows.

Current performance strategies include:

* route-level lazy loading with `React.lazy` and `Suspense`;
* manifest-based topic loading;
* lightweight metadata for Home and Progress pages;
* independently loaded topic quiz banks;
* progressive question rendering;
* environment-based performance knobs;
* reduced expensive visual effects on repeated cards.

Performance-related environment values:

```bash
VITE_INITIAL_VISIBLE_QUESTIONS=5
VITE_VISIBLE_QUESTIONS_STEP=5
VITE_ENABLE_TOPIC_ORBIT=true
```

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

Open:

```text
http://localhost:5173
```

To test on another device on the same network:

```bash
npm run dev -- --host 0.0.0.0
```

---

## Academy-aware home testing

The academy-aware home experience can be enabled or disabled with:

```bash
VITE_ENABLE_ACADEMY_AWARE_HOME=true
```

Run locally with academy-aware home enabled:

```bash
VITE_ENABLE_ACADEMY_AWARE_HOME=true npm run dev -- --host 0.0.0.0
```

Run locally with academy-aware home disabled:

```bash
VITE_ENABLE_ACADEMY_AWARE_HOME=false npm run dev -- --host 0.0.0.0
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

## Validation commands

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

Recommended validation before opening a PR:

```bash
npm run test:unit
npm run build
```

---

## Cloudflare Pages deployment

Cloudflare Pages should use the following build settings:

```text
Production branch: main
Build command: npm run build
Build output directory: dist
```

Expected custom domains:

```text
academy.qubitel.net
cbc.academy.qubitel.net
cx.academy.qubitel.net
```

After deployment-related changes, confirm:

* the correct GitHub repository is connected;
* environment variables are configured;
* custom domains are active;
* the production build succeeds.

---

## Support CTA configuration

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Configure public hosted payment links:

```text
VITE_PAYPAL_SUPPORT_LINK=""
VITE_PAYPAL_HOSTED_BUTTON_ID="YOUR_REAL_PAYPAL_HOSTED_BUTTON_ID"
VITE_PAYSTACK_SUPPORT_LINK=""
```

The visible CTA copy is owned by:

```text
src/config/siteConfig.js
```

Default CTA copy:

```text
🚀 Support from $1
```

Clicking the CTA opens a frontend-only support options modal.

PayPal uses `VITE_PAYPAL_SUPPORT_LINK` when configured, then falls back to the hosted PayPal donation URL.

Paystack appears only when `VITE_PAYSTACK_SUPPORT_LINK` is configured.

Do not put private secrets in frontend environment variables or `.env.example`. Hosted payment links are public URLs only.

---

## Content authoring

Content is organized through academy manifests, topic manifests, and content files.

Topic manifests declare lessons, practice items, assessments, and exams for each academy area.

When adding new content:

1. Add the content under the correct academy or topic folder.
2. Register it through the relevant manifest.
3. Confirm it appears in the correct academy/profile.
4. Validate learner-facing copy.
5. Run tests and production build validation.

---

## Production content rules

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

## Content protection note

The app includes mild right-click, selection, and shortcut blocking.

This is useful for casual friction, but no browser-based protection can fully prevent a determined developer from inspecting client-side content.

Do not treat frontend-only content protection as a strong security boundary.

---

## Migration notes

During the multi-academy migration:

* keep existing production routes working;
* avoid broad blind renames;
* avoid mixing unrelated refactors into focused PRs;
* keep Technology Academy content stable;
* migrate architecture incrementally through the LearningNode epic;
* validate Cloudflare Pages deployment after app identity, routing, or deployment changes.
