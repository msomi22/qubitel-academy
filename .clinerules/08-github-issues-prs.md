---
paths:
  - ".github/**"
  - "docs/github-issue-authoring-guidelines.md"
  - ".clinerules/**"
  - "docs/**"
---

## Highest priority stop rule

If a command is skipped, cancelled, blocked, or not approved, Cline must stop immediately.

Cline must not continue thinking.
Cline must not try another command.
Cline must not edit files.
Cline must not continue validation, commit, push, PR creation, or diff inspection.

Instead, Cline must return:

```text
Command skipped:
- <command>

Current status:
- <what is already known>
- <what could not be confirmed>

Manual next steps:
- <commands or user action>

Ready for next instruction.

# GitHub Issues and PR Rules

## Issue quality

When creating or updating an issue, include:

- clear title
- type/labels
- parent epic or related issue
- summary
- problem/motivation
- user-facing outcome
- required references
- research notes
- suggested branch name
- scope
- files likely to create/edit
- files not to edit
- implementation requirements
- testing and validation
- acceptance criteria
- non-goals
- PR requirements
- done means

## Branch naming

Allowed branch prefixes:

```text
feature/
bugfix/
hotfix/
release/
docs/
```

Prefer short lowercase hyphenated branch names.

Do not suggest unsupported prefixes such as:

fix/
refactor/
test/
chore/

unless the branch workflow is changed first.

PR requirements

PRs should include:

issue link
summary of changes
files created/edited
validation performed
screenshots for UI changes when useful
skipped test/build notes
Closes #<issue-number> only when the PR fully completes that issue

Use Refs #<issue> for related epics or follow-up issues that should remain open.

Scope control

Issues and PRs must explicitly prevent unrelated refactors.

Do not mix:

UI redesign
architecture migration
content creation
route changes
test refactors
asset optimization

unless the issue intentionally covers those areas.
