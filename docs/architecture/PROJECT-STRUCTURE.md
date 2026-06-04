# Qubitel Multi-Academy Platform — Project Structure & Design

> Canonical reference for architects, content editors, and developers working on the platform.

---

## Overview

The platform is moving toward multiple independent learning academies from one shared codebase.

An **Academy** is an internal platform boundary. It separates learner audiences, category taxonomies, storage keys, and future content loading rules. Learners do not normally choose an academy manually. The academy is selected from the hostname or subdomain.

Current examples:

| Hostname | Academy id | Product |
|---|---:|---|
| `academy.qubitel.net` | `tech` | Senior Dev Accelerator |
| `cbc.academy.qubitel.net` | `cbc` | CBC Exam Practice |
| `cx.academy.qubitel.net` | `customer-experience` | Customer Experience Academy |
| `localhost`, previews, unknown hosts | `tech` | Senior Dev Accelerator |

The current production experience remains Senior Dev Accelerator. CBC and Customer Experience are registered as future academy boundaries only; their active academy manifests intentionally expose no categories.

The academy registry, manifest validation, catalog, content loader, storage isolation, and active tech content migration are implemented. Adding an academy is now primarily config + manifests + content, followed by validation and deliberate learner exposure.

---

## Conceptual Model

```text
Academy
└── Category
    └── Topic
        ├── Lessons       ← teach concepts
        ├── Practice      ← apply knowledge
        └── Assessments   ← measure readiness
```

| Level | Purpose | Examples |
|---|---|---|
| Academy | Internal platform boundary for a learner audience/product | Technology, CBC, Customer Experience |
| Category | First major grouping visible to learners | DSA, Grade 3, Customer Support |
| Topic | Focused learning area inside a category | Sliding Window, English, Complaint Handling |
| Lesson | Conceptual explanation or walkthrough | What is a Sliding Window? |
| Practice | Applied exercise such as MCQ, coding, lab, or scenario | Maximum Sum Subarray of Size K |
| Assessment | Readiness gate or timed evaluation | Sliding Window Timed Quiz |

A learner normally sees **categories** first. They do not need to know that academy routing happened internally before the categories loaded.

---

## Current Implementation State

Academy manifests and academy-scoped content are the active source of truth:

```text
src/
├── academies/
│   ├── catalog.js                       # Builds validated academy/category/topic catalogs
│   ├── manifestImports.generated.js     # Static imports for Vite and Node tests
│   ├── tech/                            # Active learner-facing academy
│   ├── cbc/                             # Registered skeleton; no active categories
│   └── customer-experience/             # Registered skeleton; no active categories
│
├── config/
│   ├── academyRegistry.ts       # Academy ids, display names, subdomains, storage keys, safe category ids
│   ├── detectAcademy.ts         # Hostname/subdomain to academy resolution
│   ├── academyStorage.ts        # Returns the active academy storage key
│   └── detectAcademy.test.ts    # Node test coverage for detection and default fallback
│
├── lib/
│   ├── manifest.js              # Manifest shape and relationship validation
│   └── content-loader.js        # Selects manifest-declared content for an academy
│
├── types/
│   ├── academy.ts               # Academy and manifest contracts
│   └── content.ts               # Academy-scoped content location contracts
│
└── services/
    └── questionBankService.js   # Loads active academy authored content and legacy bank fallbacks
```

Bulk legacy banks remain under `src/academies/tech/_legacy/banks/` until they are converted to one-file authored content. New content must not be added there.

---

## Active Folder Structure

Academy content is grouped by academy, then category, then topic:

```text
src/
└── academies/
    ├── tech/
    │   ├── academy.manifest.json
    │   └── dsa/
    │       ├── category.manifest.json
    │       └── sliding-window/
    │           ├── topic.manifest.json
    │           ├── lessons/
    │           ├── practice/
    │           └── assessments/
    │
    ├── cbc/
    │   ├── academy.manifest.json
    │   └── grade-3/
    │       ├── category.manifest.json
    │       └── english/
    │           ├── topic.manifest.json
    │           ├── lessons/
    │           ├── practice/
    │           └── assessments/
    │
    └── customer-experience/
        ├── academy.manifest.json
        └── customer-support/
            ├── category.manifest.json
            └── complaint-handling/
                ├── topic.manifest.json
                ├── lessons/
                ├── practice/
                └── assessments/
```

Each topic manifest declares the files that are active under `lessons`, `practice`, and `assessments`. Merely placing a file in a topic folder does not expose it.

The tech academy also contains `_legacy/banks/` as a compatibility boundary. These banks are loaded only when a topic still needs unmigrated questions.

---

## Naming Conventions

| Context | Convention | Examples |
|---|---|---|
| Folder names | lowercase kebab-case | `sliding-window`, `grade-3`, `complaint-handling` |
| Route ids | lowercase kebab-case | `customer-experience`, `kubernetes-ckad` |
| Code/config ids | lowercase kebab-case | `tech`, `cbc`, `customer-support` |
| Manifest ids | lowercase kebab-case | `"id": "sliding-window"` |
| Display names | Human-readable text | `Sliding Window`, `Grade 3`, `Customer Support` |
| TypeScript types | PascalCase | `AcademyConfig`, `AcademyId` |

Safe ids must be lowercase kebab-case. Display names can contain spaces and normal punctuation because they are for humans, not routing or lookup.

Current runtime invariant: topic ids must be unique within an academy because existing service APIs and saved category selections resolve topics by id. Manifest validation enforces this until topic routing becomes category-scoped.

---

## Academy Registry Rules

The registry is currently the TypeScript source of truth for known academies.

Required academy ids:

```text
tech
cbc
customer-experience
```

Required behavior:

- `tech` is the default academy.
- Unknown academy ids fall back to `tech`.
- `academy.qubitel.net`, `localhost`, preview hosts, and unknown hosts resolve to `tech`.
- `cbc.academy.qubitel.net` resolves to `cbc`.
- `cx.academy.qubitel.net` resolves to `customer-experience`.
- `tech` keeps the existing storage key `senior-dev-accelerator:v2` so existing learner progress is preserved.
- CBC and Customer Experience use separate storage keys for future isolation.
- CBC and Customer Experience category arrays remain empty in the active registry until they are ready for learner exposure.

---

## Adding a New Academy

1. Add a safe academy id using lowercase kebab-case.
2. Add registry metadata: display name, product name, subdomain, storage key, and allowed category ids.
3. Add academy-scoped manifests/content under `src/academies/<academy-id>/`.
4. Run `npm run generate:academy-manifests`.
5. Run tests and the production build.
6. Keep the academy manifest and registry category arrays empty until learner exposure is approved.

---

## Adding a New Category or Topic

A category is the first major grouping visible to learners. A topic belongs to one category and may contain Lessons, Practice, and Assessments.

Use safe ids for folders and config:

```text
src/academies/tech/new-category/
src/academies/tech/dsa/new-topic/
```

Use display names for UI labels:

```text
New Category
New Topic
```

Add every new category/topic id to its parent manifest, then regenerate static manifest imports. Do not change existing category ids, topic ids, or question ids because routes and learner progress depend on them.

---

## Manifest Examples

### `academy.manifest.json`

```json
{
  "id": "tech",
  "displayName": "Technology Academy",
  "productName": "Senior Dev Accelerator",
  "description": "Engineering and computer science learning for professionals.",
  "subdomains": ["academy.qubitel.net"],
  "storageKey": "senior-dev-accelerator:v2",
  "default": true,
  "categories": ["dsa", "java", "kubernetes-ckad", "system", "aptitude", "ml-ai", "engineering-leadership"]
}
```

### `category.manifest.json`

```json
{
  "id": "dsa",
  "displayName": "Data Structures and Algorithms",
  "academy": "tech",
  "topics": ["sliding-window", "two-pointers", "dynamic-programming"]
}
```

### `topic.manifest.json`

```json
{
  "id": "sliding-window",
  "displayName": "Sliding Window",
  "category": "dsa",
  "academy": "tech",
  "lessons": [],
  "practice": [],
  "assessments": []
}
```

---

## Subdomain Routing

Academy selection is based on the hostname. The current helper is `src/config/detectAcademy.ts`.

```ts
const academyId = detectAcademyIdFromHostname(window.location.hostname);
```

Learners do not normally select this manually. The URL selects the academy, then the academy controls which categories should eventually be available.

---

## Migration Status

- Active tech categories, topics, authored problems, and visuals have moved into `src/academies/tech/`.
- Topic manifests are the source of truth for authored content discovery.
- Existing question ids, topic ids, routes, and the tech storage key are preserved.
- Legacy banks are isolated under `src/academies/tech/_legacy/banks/` and continue to merge behind the same service API.
- CBC and Customer Experience manifests exist, but their active category arrays remain empty.
- All active catalog imports resolve through `src/academies/catalog.js`.

---

*Last updated: June 2026 — Qubitel Platform Team*
