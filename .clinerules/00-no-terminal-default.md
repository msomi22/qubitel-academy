---

paths:

* "**/*"

---

# No-Terminal Default Rule

## Highest priority

This rule applies to every task.

Cline must follow this rule before any task-specific rule.

## Default mode: no terminal commands

Cline must not run terminal commands by default.

For inspection, Cline should use file-reading, file-search, and workspace browsing tools instead of terminal commands.

Do not use terminal commands such as:

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

## When terminal commands are allowed

Terminal commands are allowed only when the user clearly says one of these:

```text
terminal allowed
run validation
run tests
commit the changes
push the branch
create the PR
```

Even then, Cline must run one command at a time.

Do not chain commands with `&&`, `;`, pipes, or fallback logic.

Bad:

```bash
git status --short && git diff --stat
```

Good:

```bash
git status --short
```

Then wait for result before the next command.

## If a command is skipped

If any terminal command is skipped, cancelled, blocked, or not approved, Cline must stop immediately.

Cline must not continue thinking.
Cline must not try another command.
Cline must not edit files.
Cline must not continue the workflow.

Cline must report:

```text
Command skipped:
- <command>

Current status:
- <what is already known>
- <what could not be confirmed>

Manual next steps:
- <command or action for the user>

Ready for next instruction.
```

Then stop.

## File inspection without terminal

For content tasks, Cline should inspect the repository by opening files directly.

Prefer reading these files directly when relevant:

```text
src/academies/cbc/<grade>/<subject>/topic.manifest.json
src/academies/cbc/<grade>/<subject>/assessments/<learning-area>/
```

Do not run `ls` just to list a folder if file/workspace browsing tools can be used.

## Validation and git workflow

Validation, commit, push, and PR commands must be treated as a separate user-approved phase.

After implementation, Cline should report the suggested commands instead of running them unless the user explicitly says:

```text
run validation
```

or:

```text
commit and push
```

## End behavior

At the end of the task, or after any skipped command, Cline must end with:

```text
Ready for next instruction.
```

Then stop.
