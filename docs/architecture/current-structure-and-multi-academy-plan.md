# Current Structure and Multi-Academy Platform Plan

## Status

Documentation proposal for issue #261.

This document records the current Senior Dev Accelerator project structure and proposes a safe, phased path toward multi-academy support using the same codebase.

The current production experience at `https://academy.qubitel.net` must remain Senior Dev Accelerator. Future learning niches should use focused subdomains such as `https://cbc.academy.qubitel.net` and `https://support.academy.qubitel.net`.

---

## Executive summary

Senior Dev Accelerator is currently a single-academy learning platform with a strong reusable core.

The product is tech-focused, but the current architecture already supports reusable learning-platform concepts: categories, topics, discovered problem files, legacy question banks, MCQ helpers, learning-problem helpers, production visibility filtering, progress tracking, recent practice, timed question attempts, mobile-first learning screens, and category/topic/problem navigation.

The safest direction is not an immediate large folder restructure. Instead, add a thin academy layer above the existing category layer.

Current model:

```text
Category → Topic → Problem
```

Target model:

```text
Academy → Category → Topic → Problem
```

---

## Current project structure

High-level repository structure reviewed from the uploaded project ZIP:

```text
.github/workflows
docs/
public/
src/assets
src/components
src/config
src/data
src/hooks
src/pages
src/problems
src/services
src/styles
src/utils
Dockerfile
README.md
index.html
nginx.conf
package.json
vite.config.js
vitest.config.js
```

Important current source areas:

```text
src/App.jsx
src/main.jsx
src/config/
src/data/
src/problems/
src/services/
src/pages/
src/components/
src/styles/
```

---

## Current runtime architecture

`src/main.jsx` creates the React root, mounts a single `BrowserRouter`, imports global styles, and renders `App`.

`src/App.jsx` is the central shell. It owns route-level lazy loading, theme shell class, onboarding overlay, navbar, sidebar, page wrapper, bottom navigation, status bar, route table, and scroll reset.

Current route table includes:

```text
/
/categories
/dsa
/system-design
/category/:categoryId
/random
/recent
/progress
/settings
/problem/:questionId
```

Routes are currently product-global. They do not know about academy or niche. Future academy support should avoid changing these default routes. Instead, the app should determine the active academy from the hostname.

Default behavior should remain:

```text
academy.qubitel.net → tech academy / Senior Dev Accelerator
localhost           → tech academy / Senior Dev Accelerator
```

---

## Current content architecture

`src/data/topicManifest.js` currently contains both `topicManifest` and `categoryManifest`.

The current content model is:

```text
Category → Topic
```

Topics map to categories through `topic.category`.

Current category ids include:

```text
dsa
system
java
kubernetes-ckad
aptitude
ml-ai
engineering-leadership
```

## Canonical Learning Model

### Vision

The platform should evolve from a problem-centric system into a learning-centric system.

The same learning model should work across all academies, including:

- Senior Dev Accelerator
- CBC Exam Practice
- Customer Support Academy
- Future academies

The platform's canonical structure is:

Academy
└─ Category
   └─ Topic
      ├─ Lessons
      ├─ Practice
      └─ Assessments

### Lessons

Lessons teach concepts.

A lesson may include:

- explanations
- examples
- visual walkthroughs
- diagrams
- notes
- common mistakes
- mental models

Examples:

- Sliding Window Fundamentals
- Java HashMap Basics
- CKAD ConfigMaps
- Grade 3 Nouns
- Customer Complaint Handling

The goal of a lesson is understanding.

### Practice

Practice applies knowledge.

Practice may include:

- MCQs
- coding questions
- scenario questions
- exercises
- hands-on labs
- guided activities

Examples:

- Two Sum
- Sliding Window Maximum
- Grade 3 Noun Identification
- Customer Objection Handling Scenario

The goal of practice is skill development.

### Assessments

Assessments measure readiness.

Assessments may include:

- timed quizzes
- mock exams
- certification simulations
- topic assessments
- end-of-topic exams

Examples:

- CKAD ConfigMap Assessment
- Grade 3 English Topic Test
- Customer Support Readiness Assessment

The goal of an assessment is evaluation.

### Why This Model

The terms:

- Lesson
- Practice
- Assessment

are intentionally academy-neutral.

They work equally well for:

- software engineering
- CBC education
- customer support training
- business training
- future professional academies

This vocabulary is preferred over:

- Lesson
- Problem
- Exam

because:

- "Problem" is developer-centric.
- "Exam" is school-centric.

The selected terminology scales across all current and future academies.

### Examples

Senior Dev Accelerator

DSA
└─ Sliding Window
   ├─ Lesson
   ├─ Practice
   └─ Assessment

CBC Exam Practice

English
└─ Nouns
   ├─ Lesson
   ├─ Practice
   └─ Assessment

Customer Support Academy

Customer Communication
└─ Complaint Handling
   ├─ Lesson
   ├─ Practice
   └─ Assessment

This model should be treated as the long-term content architecture for the platform.

The manifest model is simple and has worked well for adding CKAD, Aptitude, ML/AI, and Engineering Leadership.

The main risk is that `topicManifest.js` will become too large if CBC and Customer Support content are added directly without an academy grouping strategy.

---

## Current problem discovery and authoring

`src/problems/problemDiscovery.js` discovers problem files from:

```text
src/data/problems/**/*.js
```

This already behaves like a content warehouse.

The current structure can naturally support future folders such as:

```text
src/data/problems/cbc/
src/data/problems/customer-support/
```

`src/problems/problemAuthoring.js` provides reusable helpers:

```text
defineProblem
defineMcqProblem
defineLearningProblem
defineSimpleSystemDesignProblem
defineComplexSystemDesignProblem
```

CBC can use `defineMcqProblem` for timed exam questions. Customer Support can use `defineMcqProblem` for scenario-based judgment questions and `defineLearningProblem` for coaching lessons.

---

## Current question bank service

`src/services/questionBankService.js` is the main content gateway.

It handles category and topic lookup, legacy bank loading, discovered problem loading, virtual banks, content-profile filtering, category/topic counts, random question selection, `findQuestionById`, and progress summary support.

This file is the most important integration point for academy support.

Current assumption:

```text
all categories
all topics
all discovered problems
```

Future behavior:

```text
active academy categories
active academy topics
active academy problems
```

The default tech academy must keep the current behavior.

---

## Current production visibility

`src/config/contentProfile.js` controls profile-based visibility using `VITE_CONTENT_PROFILE`, approved topic ids, approved legacy question ids, and discovered-problem metadata such as `reviewStatus: 'approved'` and `visibility: ['prod']`.

Production visibility should remain independent from academy visibility.

Two filters should apply:

```text
Is this content approved for production?
Does this content belong to the active academy?
```

---

## Current storage and progress

`src/services/storageService.js` stores local learner state under `siteConfig.storageKey`.

Current stored state includes theme, completed questions, random count, selected topics, selected answers, timed question attempts, and complex design submissions.

Future academy progress should not mix.

Possible future storage keys:

```text
senior-dev-accelerator:v2:tech
senior-dev-accelerator:v2:cbc
senior-dev-accelerator:v2:customer-support
```

Preserve the current storage key as the tech default at first to avoid losing existing progress.

---

## Current site configuration

`src/config/siteConfig.js` currently assumes one product identity: Senior Dev Accelerator.

It also has tech-specific support copy that mentions CKAD, Java, DSA, System Design, Backend Engineering, and interview prep.

Future behavior should make site config academy-aware while keeping the current tech defaults unchanged.

---

## Styling structure

`src/main.jsx` imports many global CSS files directly.

Do not start multi-academy work by reorganizing all CSS. Keep global styles as-is. Add academy-specific shell classes later only if necessary.

Example future shell classes:

```text
app-shell academy-tech
app-shell academy-cbc
app-shell academy-customer-support
```

---

## Product and routing strategy

Keep current Senior Dev Accelerator at:

```text
https://academy.qubitel.net
```

Use subdomains for future academies:

```text
https://cbc.academy.qubitel.net
https://support.academy.qubitel.net
```

This prevents learner confusion. A developer should not see Grade 3 Religious Education beside Kubernetes. A CBC learner should not see DSA and System Design. A customer-support learner should not see Java unless intentionally cross-linked.

---

## Proposed academy layer

Add `academyId`.

Initial academy ids:

```text
tech
cbc
customer-support
```

Recommended registry shape:

```js
export const DEFAULT_ACADEMY_ID = 'tech';

export const academyRegistry = {
  tech: {
    id: 'tech',
    name: 'Senior Dev Accelerator',
    default: true,
    hostnames: ['academy.qubitel.net'],
    categoryIds: [
      'dsa',
      'system',
      'java',
      'kubernetes-ckad',
      'aptitude',
      'ml-ai',
      'engineering-leadership'
    ]
  },
  cbc: {
    id: 'cbc',
    name: 'CBC Exam Practice',
    hostnames: ['cbc.academy.qubitel.net'],
    categoryIds: []
  },
  'customer-support': {
    id: 'customer-support',
    name: 'Customer Support Academy',
    hostnames: ['support.academy.qubitel.net'],
    categoryIds: []
  }
};
```

---

## Proposed academy detection

Create:

```text
src/config/detectAcademy.js
```

Suggested behavior:

```js
export function detectAcademyIdFromHostname(hostname = '') {
  const normalized = String(hostname || '').toLowerCase();

  if (normalized.startsWith('cbc.')) return 'cbc';
  if (normalized.startsWith('support.')) return 'customer-support';

  return 'tech';
}
```

Defaulting to tech protects localhost, Cloudflare previews, the current production domain, and unknown hostnames.

---

## Proposed filtering strategy

At first, avoid moving all content. Filter visible categories by active academy.

Example:

```js
const activeAcademy = getActiveAcademy();
const visibleCategoryIds = new Set(activeAcademy.categoryIds);
const visibleCategories = categoryManifest.filter((category) => visibleCategoryIds.has(category.id));
```

Topics naturally follow categories:

```js
topicManifest.filter((topic) => visibleCategoryIds.has(topic.category));
```

---

## Future folder direction

Do not do this immediately, but long-term the project may evolve toward:

```text
src/
  app/
    App.jsx
    routes.jsx
    academyRegistry.js
    detectAcademy.js

  shared/
    components/
    hooks/
    services/
    utils/
    styles/

  academies/
    tech/
      config.js
      data/
      pages/
      services/

    cbc/
      config.js
      data/
      exam/
      pages/
      services/

    customer-support/
      config.js
      data/
      pages/
      scenarios/
      services/
```

This should not be the first PR. The first PR should add academy detection with no visible behavior change.

---

## Recommended phased refactor

1. Documentation only.
2. Academy registry and hostname detection.
3. Academy-aware site config.
4. Academy-aware storage.
5. Academy-aware content filtering.
6. CBC academy skeleton.
7. Customer Support academy skeleton.
8. Shared assessment engine.

---

## CBC academy requirements

CBC should eventually support Grade 3 first, subjects such as English, Kiswahili, Religious Education, Mathematics, and Environmental Activities, timed MCQs, exam-mode UI, auto-fail on timeout, auto-next, accidental-exit warning, final score summary, and PDF export.

CBC content must not appear under the tech academy.

---

## Customer Support academy requirements

Customer Support should eventually support customer inquiry handling, enrollment conversations, objection handling, complaint resolution, empathy and tone, follow-up communication, global customer communication, scenario-based MCQs, and coaching explanations.

The content should remain generic and not tied to a specific institution.

Customer Support content must not appear under the tech academy.

---

## Risks and mitigations

### Breaking existing URLs

Mitigation: keep all current tech routes unchanged, default academy detection to tech, and validate `/`, `/categories`, `/category/dsa`, and `/problem/:id`.

### Mixing learner progress across academies

Mitigation: introduce academy-aware storage keys and preserve the existing tech key during migration.

### Manifest growth

Mitigation: add academy grouping first and split manifests later only when needed.

### CSS refactor scope creep

Mitigation: do not reorganize CSS in the first academy PR.

### Content appearing in the wrong academy

Mitigation: filter categories by active academy and add tests for academy/category visibility.

---

## First runtime refactor acceptance criteria

- `academyRegistry.js` exists.
- `detectAcademy.js` exists.
- Hostname detection defaults to tech.
- CBC and support subdomains are detected.
- No visible app behavior changes.
- Existing routes still work.
- Unit tests pass.
- Build passes.

---

## Non-goals for first runtime refactor

Do not move existing pages, components, problem files, split `topicManifest.js`, add CBC content, add Customer Support content, change current production routes, change dashboard UI, or change current category/topic/problem behavior.

---

## Recommended next issues

After issue #261, create an implementation epic:

```text
EPIC: Multi-academy platform foundation
```

Possible child issues:

```text
Academy registry and hostname detection
Academy-aware site configuration
Academy-aware storage keys
Academy-aware category filtering
CBC academy skeleton
Customer Support academy skeleton
Shared timed assessment engine
PDF exam-result export
```

---

## Final recommendation

Start small.

Do not restructure the repository yet.

The first runtime refactor should only add the academy registry and hostname detection with tests. Once that works with zero visible behavior change, the next PR can make category filtering academy-aware.
