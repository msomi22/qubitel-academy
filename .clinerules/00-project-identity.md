# Qubitel Academy Project Identity

## Product

This repository is `qubitel-academy`.

Qubitel Academy is a fast, multi-academy learning platform for:

- structured lessons
- practice
- assessments
- exams
- learner progress tracking

Current academies:

- Technology Academy
- CBC Academy
- Customer Experience Academy
- Future academies

## Core architecture direction

The platform is moving toward a shared `LearningNode` architecture.

Prefer:

- academy manifests
- category manifests
- topic manifests
- `LearningNode` definitions
- academy-aware routing
- reusable learning flows
- production-safe metadata

Avoid:

- hardcoded academy-specific models
- broad blind renames
- unrelated refactors
- adding new content to legacy bank locations unless explicitly required

## Tech stack

Use the existing stack:

- Vite
- React
- React Router
- JavaScript / TypeScript where already used
- Node >= 22
- ESM modules

Do not introduce a new framework, state library, CSS framework, backend, database, or build tool unless the task explicitly requires it.

## Default validation

Before claiming work is complete, run when applicable:

```bash
npm run test:unit
npm run build
```