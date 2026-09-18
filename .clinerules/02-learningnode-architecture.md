---
paths:
  - "src/learning/**"
  - "src/config/**"
  - "src/academies/**"
  - "docs/architecture/**"
  - "src/routes/**"
  - "src/services/**"
---

# LearningNode Architecture Rules

## Core rule

Everything in the learning hierarchy should move toward `LearningNode`.

Do not hardcode concepts such as:

- Grade
- Learning Area
- Subject
- Strand
- Topic
- Module
- Lesson
- Practice
- Assessment
- Exam

Represent these through the shared node model, manifests, attributes, features, actions, appearances, and registries.

## Keep the model stable

Do not change the core `LearningNode` schema unless the task explicitly requires architecture-level work.

Prefer extending through:

- attributes
- features
- actions
- appearances
- registries

## Declarative design

LearningNodes should describe:

- what something is
- what it contains
- what capabilities it offers
- what actions are available
- how it should appear

LearningNodes must not contain implementation details.

## Actions

Actions must be intent-based, not route-based.

Good:

```text
openChildren
resume
startPractice
takeAssessment
reviewResults
readAloud
```
Bad:

goToEnglishPage
openGradeOnePage
openTopicScreen

Registry pattern

Use registries to resolve declarations into implementation:

React components
navigation
analytics
progress tracking
access rules
academy-specific overrides
Migration safety

During migration work:

keep existing production routes working
avoid broad blind renames
avoid mixing unrelated refactors into focused PRs
keep current academy behavior stable while introducing generic architecture

## Navigation naming standard

LearningNode names appear in cards, breadcrumbs, compact headers, back controls, mobile layouts, and URLs. Keep navigation names deliberately short.

### Hard limits

- `label`: maximum **32 characters**.
- `id`: maximum **40 characters**.
- `routeSegment`: maximum **24 characters**.
- IDs and route segments must use lowercase kebab-case.

### Naming rules

- Prefer 2–4 words for visible navigation labels.
- Do not repeat information already supplied by the parent node.
- Put long official curriculum names in metadata such as `officialTitle`, not in `label`.
- Put explanatory detail in `summary` or learning content, not in breadcrumbs.
- Use compact module labels: `M1 · Foundations`, `M18 · Onychology`.
- Use short topic labels: `Professional Scope`, `Nail Anatomy`.
- Use short learning-material labels: `Getting Started`, `Nail Structure`.
- IDs should encode only enough hierarchy to remain unique and understandable.

Good:

```text
Cosmetology
→ Level 6
→ M18 · Onychology
→ Nail Anatomy
→ Nail Structure
```

Bad:

```text
Cosmetology
→ Level 6
→ Module 18 — Onychology, Manicure, Pedicure and Nail Technology
→ Introduction to Onychology and Professional Nail Technology
→ Comprehensive Introduction to Onychology Learning Material
```

Example identifiers:

```text
cos-l6
cos-l6-m18-onychology
cos-l6-m18-t01-anatomy
cos-l6-m18-lm01-structure
```

The full official title remains available through metadata:

```ts
attributes: [
  { key: 'officialTitle', value: 'Onychology, Manicure, Pedicure and Nail Technology' }
]
```
