# Pull Request Workflow Rules

## Purpose

Cline may help generate GitHub pull request titles and descriptions from the current branch, git diff, staged diff, commit history, and changed files.

Cline must be safe by default:

* do not create a pull request unless explicitly instructed
* do not merge a pull request
* do not force-push
* do not delete branches
* do not claim validation passed unless commands were actually run successfully

## Pull request title and description generation

When asked to prepare a PR, first inspect the relevant changes using commands such as:

```bash
git status --short
git branch --show-current
git diff --stat
git diff
git diff --staged
git log --oneline main..HEAD
```

Use the actual diff and changed files to generate:

* a concise conventional-commit-style title
* a clear pull request description
* validation notes
* skipped validation notes, if any
* issue references only when provided or clearly present in the task

## No-command PR generation mode

If the user explicitly says:

- do not run commands
- generate from known context only
- commands are blocked
- commands were skipped

then Cline must not run git commands.

Cline must generate the PR title and description from the known task context and clearly mark validation as unconfirmed if needed.

Cline must stop after producing the PR title and description.

## GitHub CLI availability check

Before attempting to create a GitHub pull request, check whether GitHub CLI is installed and authenticated:

```bash
command -v gh
gh auth status
```

## If GitHub CLI is available and authenticated

Only create a pull request when explicitly instructed.

Prefer a draft PR unless the user clearly asks for a normal ready-for-review PR.

Example:

```bash
gh pr create --draft --base main --head <current-branch> --title "<title>" --body-file <body-file>
```

Do not merge the PR.

## If GitHub CLI is missing or not authenticated

Do not stop the workflow.

Do not attempt risky workarounds.

Instead, print a copy-paste-ready PR title and description for the user.

Use this exact format:

```text
PR Title:
<title>

PR Description:
## Summary
- <change 1>
- <change 2>

## Issue
- Closes #<issue-number>

## Files Changed
- `<path>` — <short reason>
- `<path>` — <short reason>

## Validation
- [ ] `npm run test:unit`
- [ ] `npm run build`

## Manual Checks
- [ ] <manual check, if applicable>

## Notes
- <anything important>
```

If validation was already run successfully, mark it as checked:

```text
- [x] `npm run test:unit`
- [x] `npm run build`
```

If validation was skipped, keep it unchecked and explain why.

If no issue number is available, use:

```text
## Issue
- TODO: Add issue reference, for example `Closes #<issue-number>`.
```


## Issue references

Every PR description must include an `Issue` section.

Cline must not silently omit issue references.

Use `Closes #<issue-number>` only when the PR fully completes the issue.

Use `Refs #<issue-number>` when the PR is related to the issue but does not fully close it.

Never copy issue numbers from examples.

If the user provides an issue number, Cline must include it in the PR description.

If the user says the work is tracked by an issue but does not provide the issue number, Cline must ask for the issue number before generating the final PR description.

If the issue number is genuinely unknown and the user still asks for a draft PR description, Cline must include:

```text
Issue:
- TODO: Add issue reference, for example `Closes #<issue-number>`.
```

Cline must not produce a final PR description for tracked work without one of these:

```text
Issue:
- Closes #<issue-number>
```

or:

```text
Issue:
- Refs #<issue-number>
```

or:

```text
Issue:
- TODO: Add issue reference, for example `Closes #<issue-number>`.
```


## Required response after PR work

After preparing or creating a PR, Cline must report:

1. Whether a PR was created or only generated for copy-paste.
2. PR title.
3. PR description.
4. Validation run.
5. Any skipped checks.
6. Any follow-up manual checks.
