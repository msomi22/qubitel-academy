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

The current production experience remains Senior Dev Accelerator. CBC and Customer Experience are registered as future academy boundaries only; they must not be exposed to learners until their content, loader, routing, and validation layers are ready.

Target architecture: adding a new academy should become mostly config + data after the registry, loader, routing, and manifest validation layers are implemented. Today, the active tech content still comes from the existing content system.

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

This branch keeps the multi-academy work intentionally small:

```text
src/
├── config/
│   ├── academyRegistry.ts       # Academy ids, display names, subdomains, storage keys, safe category ids
│   ├── detectAcademy.ts         # Hostname/subdomain to academy resolution
│   ├── academyStorage.ts        # Returns the active academy storage key
│   └── detectAcademy.test.ts    # Node test coverage for detection and default fallback
│
├── types/
│   └── academy.ts               # TypeScript source of truth for academy config shape
│
└── academies/                   # Future-target academy skeleton only
    ├── tech/
    ├── cbc/
    └── customer-experience/
```

The `src/academies/*` folders are a future-target academy skeleton. They are not the active source of learner-facing content yet.

The active Senior Dev Accelerator content still comes from the current system:

```text
src/data/problems/
src/data/topicManifest.js
src/services/questionBankService.js
```

Do not move existing tech content into `src/academies/*` in this stabilization task. Do not expose CBC or Customer Experience categories to learners yet.

---

## Folder Structure Target

The future target keeps academy content grouped by academy, then category, then topic:

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

This target structure is documentation and migration scaffolding. The current learner experience must keep using the existing tech content system until a later migration introduces a stable loader.

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

## Adding a New Academy Later

This is **not** part of the current stabilization task.

Future academy onboarding should follow this direction after the registry, loader, routing, and manifest validation layers are implemented:

1. Add a safe academy id using lowercase kebab-case.
2. Add registry metadata: display name, product name, subdomain, storage key, and allowed category ids.
3. Add academy-scoped manifests/content under `src/academies/<academy-id>/`.
4. Validate ids, manifests, routing, and visibility rules before exposing the academy.
5. Keep unrelated existing routes and learner progress untouched.

Avoid promising that a new academy requires no code change today. The safer target is: adding a new academy should become mostly config + data once the remaining platform layers are implemented.

---

## Adding a New Category or Topic Later

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

Do not change existing category ids, topic ids, or question ids during architecture stabilization work.

---

## Manifest Examples

### `academy.manifest.json`

```json
{
  "id": "tech",
  "displayName": "Technology Academy",
  "subdomain": "academy.qubitel.net",
  "description": "Engineering and computer science learning for professionals.",
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

## Migration Notes

Migration must happen gradually:

1. Keep existing Senior Dev Accelerator behavior unchanged.
2. Stabilize academy registry, detection, and storage-key helpers.
3. Keep `src/academies/*` as a future-target skeleton.
4. Add validation before using academy manifests as learner-facing content.
5. Wire a content loader only after the source model is stable.
6. Move tech content only after the new loader is proven safe.

Until that migration is complete, the existing tech content remains the active source of truth.

---

*Last updated: June 2026 — Qubitel Platform Team*
