# Agent Safety Workflow

## Before editing

Always inspect the relevant files before changing them.

Do not guess file paths when the repo already has established patterns.

Before making changes:

1. Read the issue/task carefully.
2. Identify the smallest safe scope.
3. Search for existing implementations.
4. Read related manifests, loaders, routes, and docs.
5. Confirm the source of truth before editing.

## Change discipline

Make focused changes only.

Do not:

- rewrite unrelated files
- rename folders broadly
- move content unless required
- delete existing behavior without explicit instruction
- replace working architecture with a new approach
- change public routes unless the task requires it
- change generated files manually if there is a generator command

## Implementation style

Prefer small, reviewable commits/diffs.

When modifying a feature:

- preserve existing behavior first
- add the smallest necessary change
- keep config/data close to the owning academy/topic
- use existing helpers and renderers
- follow existing naming and folder conventions

## User review expectation

For UI, content, and learning-flow tasks, provide a clear summary:

- what changed
- files changed
- validation run
- what was not changed
- screenshots/manual checks needed, if applicable