## Cline Default Safe Task Template

No terminal commands.

Use workspace file reading/search only.

Apply always-on rules first.

If any command is skipped, cancelled, blocked, or not approved, stop immediately and report.

Do not continue background thinking after a skipped command or after task completion.

Do not run `ls`, `find`, `grep`, `git status`, `git diff`, `git log`, `npm run test`, `npm run build`, `git commit`, `git push`, or `gh pr create` unless I explicitly say terminal commands are allowed.

Now do the task:

```text
<TASK DESCRIPTION HERE>
```

Before editing, report:

```text
Files/areas inspected:
- <file>
- <file>

Current state:
- <what exists now>

Proposed changes:
- <change 1>
- <change 2>

Files to change:
- <file>
- <file>

Risks / assumptions:
- <risk or none>

Waiting for approval before writing files.
```

After implementation, report only:

```text
Task complete.

Files changed:
- <file>
- <file>

What changed:
- <summary>

Validation:
- npm run test:unit: skipped unless terminal was approved
- npm run build: skipped unless terminal was approved

Notes:
- <important note>

Ready for next instruction.
```




For tasks where you do want validation, use this version:



## Cline Safe Task Template With Validation

Terminal allowed only for validation.

Use workspace file reading/search for inspection.

Do not use terminal commands for inspection.

Run validation only after implementation, and run one command at a time.

Allowed validation commands:

```bash
npm run test:unit
npm run build
```

If any command is skipped, cancelled, blocked, or not approved, stop immediately and report.

Now do the task:

```text
<TASK DESCRIPTION HERE>
```

Before editing, inspect files using workspace file reading/search only and report the plan.

After I approve, implement the change.

After implementation, run:

```bash
npm run test:unit
```

Then, only after that finishes, run:

```bash
npm run build
```

Do not chain commands.

After validation, stop and report:

```text
Task complete.

Files changed:
- <file>
- <file>

What changed:
- <summary>

Validation:
- npm run test:unit: passed/failed/skipped
- npm run build: passed/failed/skipped

Ready for next instruction.
```
