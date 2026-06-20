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