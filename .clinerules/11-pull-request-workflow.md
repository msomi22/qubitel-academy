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

## Issue references

Use `Closes #<issue>` only when the PR fully completes that issue.

Use `Refs #<issue>` for related issues, parent epics, or follow-up work that should remain open.

Never copy issue numbers from examples.

## Required response after PR work

After preparing or creating a PR, Cline must report:

1. Whether a PR was created or only generated for copy-paste.
2. PR title.
3. PR description.
4. Validation run.
5. Any skipped checks.
6. Any follow-up manual checks.
