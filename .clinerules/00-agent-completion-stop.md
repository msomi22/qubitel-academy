---

paths:

* "**/*"

---

# Agent Completion and Command Stop Rules

## Highest priority

This rule applies to every task.

Cline must follow this rule before all other project, content, GitHub, testing, or implementation rules.

## Stop after skipped commands

If any command is skipped, cancelled, blocked, or not approved, Cline must stop immediately.

Cline must not continue thinking.
Cline must not ask to run another command.
Cline must not edit files.
Cline must not continue validation, commit, push, or PR creation.

Instead, Cline must report:

```text
Command skipped:
- <command>

Current status:
- <what is already done>
- <what could not be confirmed>

Manual commands for the user:
1. <command>
2. <command>

Waiting for next instruction.
```

## No command chaining when approval is required

When commands require user approval, Cline must avoid long chained commands like:

```bash
git status --short && echo "---" && git diff --stat
```

Prefer one command at a time:

```bash
git status --short
git diff --stat
```

This makes approval, failure, and skipped-command handling clear.

## Commit and PR stop rule

During commit or PR workflow, if any of these commands are skipped, Cline must stop and switch to manual handoff mode:

```bash
git status --short
git diff --stat
npm run test:unit
npm run build
git add
git commit
git push
gh auth status
gh pr create
```

Cline must not keep trying alternative commands unless the user explicitly approves.

## End-of-task behavior

When the task is complete, or when a command is skipped, Cline must end with:

```text
Ready for next instruction.
```

Then stop.
