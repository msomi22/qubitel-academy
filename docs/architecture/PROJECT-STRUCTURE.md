# Qubitel Multi-Academy Platform — Project Structure & Design

> Canonical reference for architects, content editors, and developers working on the platform.

---

## Table of Contents

1. [Overview](#overview)
2. [Conceptual Model](#conceptual-model)
3. [Folder Structure](#folder-structure)
4. [Naming Conventions](#naming-conventions)
5. [Manifest Schemas](#manifest-schemas)
6. [Adding a New Academy](#adding-a-new-academy)
7. [Adding a New Category or Topic](#adding-a-new-category-or-topic)
8. [Content Types Reference](#content-types-reference)
9. [Subdomain Routing](#subdomain-routing)
10. [Design Considerations](#design-considerations)
11. [Scalability Notes](#scalability-notes)

---

## Overview

The platform hosts multiple independent **learning academies** from a single codebase. Each academy:

- Has its own **subdomain** (e.g. `cbc.academy.qubitel.net`)
- Has its own **category taxonomy** (e.g. grades for CBC; job roles for CX)
- Shares the **same data model** and UI shell

This means adding a brand-new academy is a config + data change, not a code change.

---

## Conceptual Model

```
Academy
└── Category
    └── Topic
        ├── Lessons       ← teach concepts
        ├── Practice      ← apply knowledge
        └── Assessments   ← measure readiness
```

| Level       | Purpose                                  | Examples                                  |
|-------------|------------------------------------------|-------------------------------------------|
| Academy     | Top-level product / learner audience     | Technology, CBC, Customer Experience      |
| Category    | Major grouping visible to learners       | DSA, Grade 3, Customer Support            |
| Topic       | Focused learning area within a category  | Sliding Window, English (Nouns)           |
| Lesson      | Conceptual explanation or walkthrough    | "What is a Sliding Window?"               |
| Practice    | Applied exercise (MCQ, coding, scenario) | "Maximum Sum Subarray of Size K"          |
| Assessment  | Readiness gate (timed, cumulative)       | "Sliding Window Timed Quiz"               |

---

## Folder Structure

```
src/
│
├── academies/                          # One subfolder per academy
│   │
│   ├── tech/                           # safe-id: lowercase kebab-case
│   │   ├── academy.manifest.json       # Academy-level config
│   │   │
│   │   ├── dsa/                        # Category: Data Structures & Algorithms
│   │   │   ├── category.manifest.json
│   │   │   │
│   │   │   ├── sliding-window/         # Topic
│   │   │   │   ├── topic.manifest.json
│   │   │   │   ├── lessons/
│   │   │   │   │   ├── 01-what-is-sliding-window.md
│   │   │   │   │   └── 02-fixed-vs-variable.md
│   │   │   │   ├── practice/
│   │   │   │   │   ├── max-sum-subarray.json
│   │   │   │   │   └── longest-substring.json
│   │   │   │   └── assessments/
│   │   │   │       └── sliding-window-timed-quiz.json
│   │   │   │
│   │   │   └── two-pointers/
│   │   │       └── ...
│   │   │
│   │   ├── java/
│   │   ├── ckad/
│   │   └── system-design/
│   │
│   ├── cbc/
│   │   ├── academy.manifest.json
│   │   │
│   │   ├── grade-3/
│   │   │   ├── category.manifest.json
│   │   │   ├── english/
│   │   │   │   ├── topic.manifest.json
│   │   │   │   ├── lessons/
│   │   │   │   ├── practice/
│   │   │   │   └── assessments/
│   │   │   └── mathematics/
│   │   │       └── ...
│   │   │
│   │   ├── grade-4/
│   │   └── grade-5/
│   │
│   └── customer-experience/
│       ├── academy.manifest.json
│       │
│       ├── customer-support/
│       │   ├── category.manifest.json
│       │   ├── complaint-handling/
│       │   │   ├── topic.manifest.json
│       │   │   ├── lessons/
│       │   │   ├── practice/
│       │   │   └── assessments/
│       │   └── de-escalation/
│       │       └── ...
│       │
│       ├── it-support/
│       ├── helpdesk/
│       ├── service-desk/
│       └── customer-success/
│
├── components/                         # Shared UI components
│   ├── AcademyShell.tsx                # Top nav, sidebar, layout
│   ├── TopicCard.tsx
│   ├── ContentList.tsx
│   ├── LessonViewer.tsx
│   ├── PracticePlayer.tsx
│   └── AssessmentRunner.tsx
│
├── hooks/
│   ├── useAcademy.ts                   # Resolves academy from subdomain
│   ├── useTopic.ts
│   └── useContent.ts
│
├── lib/
│   ├── registry.ts                     # Builds the global academy/category/topic tree
│   ├── manifest.ts                     # Parses and validates manifest files
│   └── content-loader.ts              # Lazy-loads lessons/practice/assessments
│
├── types/
│   ├── academy.ts                      # Academy, Category, Topic interfaces
│   └── content.ts                      # Lesson, PracticeItem, Assessment interfaces
│
└── config/
    └── subdomain-map.ts               # Maps subdomains → academy safe-IDs
```

---

## Naming Conventions

| Context              | Convention         | Examples                                       |
|----------------------|--------------------|------------------------------------------------|
| Folder / route IDs   | `lowercase-kebab`  | `sliding-window`, `grade-3`, `complaint-handling` |
| Display names        | Title Case         | `Sliding Window`, `Grade 3`, `Complaint Handling` |
| Manifest keys        | `lowercase-kebab`  | `"id": "sliding-window"`                       |
| Lesson files         | `NN-slug.md`       | `01-what-is-sliding-window.md`                 |
| Practice files       | `slug.json`        | `max-sum-subarray.json`                        |
| Assessment files     | `slug.json`        | `sliding-window-timed-quiz.json`               |
| TypeScript types     | `PascalCase`       | `Academy`, `TopicManifest`, `PracticeItem`     |
| Hook names           | `useNoun`          | `useAcademy`, `useTopic`                       |

> **Rule:** Anywhere an ID is stored or referenced in code/routing/manifests, use `lowercase-kebab`. Reserve human-readable display names for the `displayName` field only.

---

## Manifest Schemas

### `academy.manifest.json`

```json
{
  "id": "tech",
  "displayName": "Technology Academy",
  "subdomain": "academy.qubitel.net",
  "accentColor": "#4fffb0",
  "description": "Engineering and computer science learning for professionals.",
  "categories": ["dsa", "java", "ckad", "system-design", "aptitude", "ml-ai", "engineering-leadership"]
}
```

### `category.manifest.json`

```json
{
  "id": "dsa",
  "displayName": "Data Structures & Algorithms",
  "academy": "tech",
  "description": "Core algorithmic thinking and problem-solving patterns.",
  "topics": ["sliding-window", "two-pointers", "dynamic-programming", "graphs", "trees"]
}
```

### `topic.manifest.json`

```json
{
  "id": "sliding-window",
  "displayName": "Sliding Window",
  "category": "dsa",
  "academy": "tech",
  "description": "Technique for contiguous subarray/substring problems.",
  "status": "active",
  "lessons": [
    { "id": "what-is-sliding-window", "file": "01-what-is-sliding-window.md", "title": "What is a Sliding Window?", "durationMin": 5 },
    { "id": "fixed-vs-variable",      "file": "02-fixed-vs-variable.md",      "title": "Fixed vs Variable Window",   "durationMin": 8 }
  ],
  "practice": [
    { "id": "max-sum-subarray",        "file": "max-sum-subarray.json",        "type": "coding", "difficulty": "easy" },
    { "id": "longest-substring",       "file": "longest-substring.json",       "type": "coding", "difficulty": "medium" }
  ],
  "assessments": [
    { "id": "sliding-window-timed-quiz", "file": "sliding-window-timed-quiz.json", "type": "timed", "durationMin": 30 }
  ]
}
```

---

## Adding a New Academy

1. **Create the folder:**
   ```
   src/academies/<safe-id>/
   ```

2. **Add `academy.manifest.json`** with all required fields.

3. **Register the subdomain** in `src/config/subdomain-map.ts`:
   ```ts
   export const subdomainMap: Record<string, string> = {
     'academy.qubitel.net':     'tech',
     'cbc.academy.qubitel.net': 'cbc',
     'cx.academy.qubitel.net':  'customer-experience',
     'new.academy.qubitel.net': 'new-academy-id',   // ← add this line
   };
   ```

4. **Add categories and topics** following the pattern below.

No code changes to the router or UI shell are needed.

---

## Adding a New Category or Topic

### New Category

```bash
mkdir src/academies/tech/new-category
touch src/academies/tech/new-category/category.manifest.json
```

Update `src/academies/tech/academy.manifest.json` → add `"new-category"` to the `categories` array.

### New Topic

```bash
mkdir -p src/academies/tech/dsa/new-topic/{lessons,practice,assessments}
touch src/academies/tech/dsa/new-topic/topic.manifest.json
```

Update `src/academies/tech/dsa/category.manifest.json` → add `"new-topic"` to the `topics` array.

---

## Content Types Reference

### Lesson (`.md` file)

Free-form Markdown with optional frontmatter:

```md
---
title: What is a Sliding Window?
duration: 5
tags: [intro, pattern]
---

## Definition

A **sliding window** is a technique where a fixed or variable-size window
moves through a sequence to reduce nested loops to a single pass...
```

### Practice Item (`.json`)

```json
{
  "id": "max-sum-subarray",
  "title": "Maximum Sum Subarray of Size K",
  "type": "coding",
  "difficulty": "easy",
  "languages": ["java", "python", "javascript"],
  "prompt": "Given an array of integers and a number K...",
  "starterCode": { "java": "class Solution { ... }" },
  "testCases": [
    { "input": "[2,3,4,1,5], K=3", "expected": "11" }
  ]
}
```

Supported `type` values: `coding` · `mcq` · `scenario` · `exercise` · `lab`

### Assessment (`.json`)

```json
{
  "id": "sliding-window-timed-quiz",
  "title": "Sliding Window Timed Quiz",
  "type": "timed",
  "durationMin": 30,
  "passMark": 70,
  "questions": [
    {
      "id": "q1",
      "type": "mcq",
      "prompt": "Which of the following problems benefits most from sliding window?",
      "options": ["...", "...", "...", "..."],
      "answer": 2
    }
  ]
}
```

Supported `type` values: `timed` · `mock-exam` · `certification-sim` · `end-of-topic`

---

## Subdomain Routing

The platform resolves which academy to display by reading `window.location.hostname` at runtime (or the `Host` header server-side):

```ts
// src/config/subdomain-map.ts
export const subdomainMap: Record<string, string> = {
  'academy.qubitel.net':     'tech',
  'cbc.academy.qubitel.net': 'cbc',
  'cx.academy.qubitel.net':  'customer-experience',
};

// src/hooks/useAcademy.ts
export function useAcademy() {
  const host = window.location.hostname;
  const academyId = subdomainMap[host] ?? 'tech'; // fallback for local dev
  return registry.getAcademy(academyId);
}
```

Learners never need to select an academy — it is inferred from the URL.

---

## Design Considerations

### 1. Data-Driven, Code-Light

All content lives in manifest files and Markdown/JSON. The UI reads from these at build or load time. Adding a new academy, category, or topic never requires a code change or redeployment of the application logic.

### 2. Hierarchical But Flat

The file system mirrors the conceptual model (`academy/category/topic`) but each level is self-contained via its own manifest. This means:

- A topic can be previewed or moved without touching parent manifests (only the parent's `topics` array needs updating).
- Individual manifests can be validated independently with a JSON schema.

### 3. Naming Discipline Is Non-Negotiable

IDs in manifests, folder names, and route segments must all match. A mismatch causes a missing topic. Use a pre-commit hook or CI step to validate:

```bash
# Example: verify folder name matches manifest id
jq -r '.id' topic.manifest.json | xargs -I{} test "{}" = "$(basename $PWD)"
```

### 4. Status Field for Content Governance

Every topic carries a `status` field:

| Status     | Meaning                                      |
|------------|----------------------------------------------|
| `draft`    | Not visible to learners                      |
| `review`   | Visible internally; awaiting approval        |
| `active`   | Fully published and learner-accessible       |
| `archived` | Hidden from learner view; data preserved     |

This avoids hard-deleting content and allows rollback.

### 5. Accent Colours per Academy

Each academy defines its own `accentColor` in the manifest. The UI shell reads this and applies it as a CSS variable. No hardcoded academy-specific colours in component code.

### 6. Lazy Loading

Lessons, practice items, and assessments within a topic are loaded on demand (not bundled at build time). The `content-loader.ts` utility handles this:

```ts
const lesson = await contentLoader.loadLesson('tech', 'dsa', 'sliding-window', 'what-is-sliding-window');
```

This keeps initial page load fast regardless of how large the content library grows.

### 7. Extending Content Types

To add a new content type (e.g. `video`, `lab`, `flashcards`):

1. Add the type to `types/content.ts`.
2. Add the new subfolder to the topic template (`topic/videos/`).
3. Add a renderer component in `components/`.
4. Update `topic.manifest.json` to include the new array key.

No changes to the academy or category layer are needed.

---

## Scalability Notes

| Concern              | Approach                                                                 |
|----------------------|--------------------------------------------------------------------------|
| Many academies       | Each is an isolated folder; no coupling between academies                |
| Many topics          | Registry indexes at startup; topics are lazy-loaded on navigation        |
| Multilingual content | Add `locale` field to topic manifest; loader resolves correct file       |
| Permissions          | Wrap topic manifest with `access: ["role-a", "role-b"]`; check in hook  |
| CMS integration      | Replace manifest JSON files with API responses; loader is the seam       |
| Search               | Index manifest `displayName` + lesson content at build time (e.g. Algolia) |

---

## Migration Note

The current codebase still uses `src/data/problems/`, `topicManifest.js`, and `categoryManifest` as the active content source.

The proposed `src/academies/` structure is the target model, not the first refactor.

Migration should happen gradually:

1. Add academy registry and subdomain detection.
2. Make existing manifests academy-aware.
3. Introduce `src/academies/` for new academy content.
4. Keep existing tech content working during migration.
5. Move tech content only after the new loader is stable.

*Last updated: June 2026 — Qubitel Platform Team*
