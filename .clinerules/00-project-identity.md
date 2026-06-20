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

# Agent Completion and Stop Rules

## Priority

This rule has highest priority.

Cline must follow this rule for every task before applying any other task-specific rule.

## Stop when the requested task is complete

When the requested task is complete, Cline must stop working and report back.

Cline must not continue background thinking, speculative edits, extra cleanup, extra refactors, or repeated validation loops after the task is done.

## Definition of done

A task is done when:

1. The requested files have been created or updated.
2. Required manifest or registration changes have been made.
3. Required validation commands have been run, or clearly reported as skipped.
4. The final implementation summary has been prepared.

After this point, Cline must stop and wait for the next user instruction.

## No endless thinking

Cline must not remain in a “Thinking…” state after completion.

After finishing implementation and validation, Cline must immediately produce a final report using this format:

```text
Task complete.

Files changed:
- <file>
- <file>

What changed:
- <summary>

Validation:
- <command>: passed/failed/skipped
- <command>: passed/failed/skipped

Notes:
- <any important note>

Ready for next instruction.
```

## No extra edits after completion

After the main task is complete, Cline must not edit additional files unless one of these is true:

1. The user explicitly asks for another change.
2. A validation command fails because of the current task.
3. The file is clearly required by the task scope.

If Cline is unsure whether another edit is needed, it must stop and ask.

## No speculative test edits

Cline must not edit test files just to make tests pass.

Cline may edit tests only when:

1. The task explicitly requires a test update.
2. The test is outdated because of an intentional approved behavior change.
3. The user approves the test update.

Before editing any test file, Cline must explain:

```text
Test file edit required:
- File:
- Reason:
- Related task change:
- Risk:
```

Then Cline must wait for approval unless the user already explicitly requested test updates.

## Validation loop limit

Cline may run validation after implementation.

If validation fails, Cline may fix the directly related issue and rerun validation once.

If validation still fails after one fix attempt, Cline must stop and report the failure.

Cline must not enter repeated cycles of:

```text
edit -> test -> edit -> test -> edit -> test
```

without user approval.

## Skipped commands

If a command is skipped, blocked, or needs approval, Cline must not keep thinking indefinitely.

It must report:

```text
Command skipped or not approved:
- <command>

Current status:
- <what is already done>
- <what remains>

Waiting for user approval or next instruction.
```

## No unrelated refactors

Cline must not perform unrelated cleanup, renaming, refactoring, formatting, or test assertion changes after the requested work is complete.

Keep changes focused on the active issue/task.

## Final behavior

At the end of every task, Cline must stop with:

```text
Ready for next instruction.
```
