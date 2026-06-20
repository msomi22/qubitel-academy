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
