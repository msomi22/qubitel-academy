---
paths:
  - "**/*"
---

# Always-on Cline operating rules

These rules apply to every task.

## No terminal by default

Cline must not run terminal commands by default.

For inspection, Cline should use workspace file reading, file search, and editor context before terminal commands.

Do not run commands such as:

```bash
ls
find
grep
git status
git diff
git log
npm run test
npm run build
```

unless the user explicitly says terminal commands are allowed.

## One command at a time

When terminal commands are explicitly allowed, Cline must run one command at a time.

Do not chain commands with:

```bash
&&
;
|
||
```

Bad:

```bash
git status --short && git diff --stat
```

Good:

```bash
git status --short
```

## Stop after skipped commands

If any command is skipped, cancelled, blocked, or not approved, Cline must stop immediately.

Cline must not continue thinking.
Cline must not try another command.
Cline must not edit files.
Cline must not continue validation, commit, push, or PR creation.

Cline must report:

```text
Command skipped:
- <command>

Current status:
- <what is already known>
- <what could not be confirmed>

Manual next steps:
- <next action>

Ready for next instruction.
```

Then stop.

## No background thinking after completion

When a task is complete, Cline must produce the final report and stop.

Final report format:

```text
Task complete.

Files changed:
- <file>
- <file>

What changed:
- <summary>

Validation:
- <command>: passed/failed/skipped

Notes:
- <important note>

Ready for next instruction.
```

## PR generation mode

If the user asks only for a PR title and description, Cline must not run commands unless explicitly allowed.

If diff inspection is unavailable, generate the PR title and description from known task context and mark validation as unconfirmed.

## Issue reference rule

Every PR description must include an Issue section.

If an issue number is provided, use:

```text
Closes #<issue-number>
```

only when the PR fully completes the issue.

Use:

```text
Refs #<issue-number>
```

for related work that does not close the issue.

If no issue number is available, include:

```text
Issue:
- TODO: Add issue reference, for example `Closes #<issue-number>`.
```
