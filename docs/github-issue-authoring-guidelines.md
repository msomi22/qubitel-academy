# GitHub Issue Authoring Guidelines

Use this guide when creating GitHub issues for Senior Dev Accelerator. The goal is to make each issue clear enough for a human contributor or coding agent to research, implement, validate, and review safely.

Senior Dev Accelerator issues often touch learning content, production visibility, topic manifests, visual walkthroughs, dashboard/progress surfaces, and mobile-first UI behavior. Issues should protect those standards instead of giving vague tasks.

## Why issues matter in this repo

A good issue should:

- explain the learner or maintainer outcome;
- link small tasks to epics where possible;
- point implementers to the right docs and files;
- prevent unrelated refactors;
- protect production-visible content quality;
- make validation expectations clear;
- be ready for both humans and coding agents.

## Research before creating an issue

Before opening an issue, check:

- [ ] open issues for duplicates;
- [ ] closed issues for completed or rejected work;
- [ ] related PRs for implementation history;
- [ ] relevant docs under `docs/`;
- [ ] likely source files when behavior already exists;
- [ ] whether the work belongs under an existing epic;
- [ ] whether the task should be split into child issues.

Useful project references:

- `docs/writing-coding-implementation-instructions.md`
- `docs/adding-new-problems.md`
- `docs/problem-authoring.md`
- `docs/visual-schema.md`
- `docs/content-quality-rubric.md`
- `docs/production-question-audit.md`
- `README.md`

Useful GitHub references:

- About issues: `https://docs.github.com/en/issues/tracking-your-work-with-issues/learning-about-issues/about-issues`
- Managing labels: `https://docs.github.com/en/issues/using-labels-and-milestones-to-track-work/managing-labels`
- Configuring issue templates: `https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/configuring-issue-templates-for-your-repository`

## Choose the issue type

| Type | Use when | Typical labels |
| --- | --- | --- |
| Epic | Work is large and should be split into child issues. | `epic`, plus area labels |
| Feature | Adds user-facing capability or meaningful behavior. | `feature`, `enhancement` |
| Bug | Fixes unintended behavior, broken UI, incorrect counts, routing issues, or regressions. | `bug`, plus area labels |
| Documentation | Creates or improves docs, guides, or repository instructions. | `documentation` |
| Content | Adds or improves learning content, problem files, explanations, metadata, or audits. | `content` |
| UI/UX | Improves layout, responsiveness, accessibility, or interaction quality. | `ui`, `enhancement` |
| Refactor | Improves structure without changing intended behavior. | `refactor` |
| Testing | Adds or improves validation. | `testing` |
| Research/spike | Investigates an approach before implementation scope is known. | `research` |

Use labels that exist in the repository. If a useful label is missing, note it; do not make label changes part of the issue unless explicitly approved.

## Epics and child issues

Create an epic when the work affects multiple areas, needs phased delivery, changes standards across many files, expands a content area with many tasks, or would make one PR hard to review.

A good epic should include:

- [ ] overall outcome;
- [ ] why it matters;
- [ ] planned child issues or child themes;
- [ ] non-goals;
- [ ] safe implementation order;
- [ ] validation strategy.

When creating a child issue, link the epic near the top:

```md
Parent epic: #95
Refs #95
Part of #95
```

The child issue should stay executable on its own. Do not copy the full epic body into every child issue.

## Project-specific issue areas

Issues may touch:

- DSA learning tracks;
- System Design content;
- Java/backend content;
- visual walkthroughs;
- dashboard/progress surfaces;
- category/topic manifests;
- discovered production-ready problem files;
- content-profile and production-visibility logic;
- aptitude-test functionality.

Name the relevant area in the issue summary and references.

## Branch naming guidance

Branch naming is enforced by `.github/workflows/branch-name.yml`. Keep issue branch suggestions aligned with that workflow so contributors do not open PRs that fail the branch-name check.

Allowed branch prefixes are:

```text
feature/
bugfix/
hotfix/
release/
docs/
```

Use a short, lowercase, hyphenated name after the prefix. The workflow also allows letters, numbers, dots, underscores, and hyphens, but prefer lowercase hyphenated names for readability.

Recommended usage:

| Prefix | Use when | Example |
| --- | --- | --- |
| `feature/` | New product capability, content area, or meaningful behavior. | `feature/add-aptitude-test-category` |
| `bugfix/` | Normal bug fixes and regressions. | `bugfix/fix-random-practice-loading` |
| `hotfix/` | Urgent production fixes. | `hotfix/restore-production-routing` |
| `release/` | Release preparation or version branches. | `release/1.0.0` |
| `docs/` | Documentation-only changes. | `docs/update-github-issue-authoring-guidelines` |

For documentation-only issues, prefer `docs/<short-doc-task>` once the workflow supports it. For mixed documentation and implementation work, use `feature/`, `bugfix/`, or another appropriate implementation prefix.

Do not suggest unsupported prefixes such as `fix/`, `refactor/`, `test/`, or `chore/` unless the branch-name workflow is updated first.

## Required issue sections

Each implementation-ready issue should include these sections.

### Title

A clear searchable title. Good: `Fix Random Practice all-categories selection getting stuck`. Poor: `Random bug`.

### Type / Labels

State the type and suggested labels. Example: `Type: Bug`; `Labels: bug, ui, testing`.

### Parent epic or related issue

Link parent epics or related work. Example: `Parent epic: #95`; `Related: #131, #143`.

### Summary

Explain the desired outcome in one or two short paragraphs.

### Problem / Motivation

Explain what is broken, missing, confusing, risky, or valuable to improve.

### User-facing outcome

Describe what learners, maintainers, or contributors should experience after completion.

### Required references

List docs, issues, PRs, and source files that must be read before implementation.

### Research notes

Record what was checked: open issues, closed issues, related PRs, docs, and source files.

### Suggested branch name

Use a short lowercase hyphenated branch with a prefix allowed by `.github/workflows/branch-name.yml`.

### Scope

List exactly what should be implemented.

### Files likely to create or edit

Separate files to create, files to edit, and files not to edit.

### Implementation requirements

State exact behavior, data rules, metadata expectations, UI behavior, compatibility needs, and sequencing.

### Content/design/quality requirements

Reinforce project standards:

- clear explanation-first content;
- no hardcoded misleading counts;
- no unrelated refactors;
- mobile-friendly UI;
- accessible reusable components;
- production-ready metadata where applicable;
- tests and build validation.

### Testing and validation

Use the relevant validation steps. Common commands:

```bash
npm run test:unit
npm run build
```

For docs-only work, verify Markdown rendering, internal paths, issue references, and that no unrelated source files changed.

### Acceptance criteria

Use observable checklist items. Good: `category: "all" is treated as no category filter.` Poor: `Make it better.`

### Non-goals

State what must not change.

### PR requirements

Require issue link, summary, files changed, validation performed, screenshots for UI changes when useful, skipped-test notes, and `Closes #<issue>` when complete.

### Done means

Define the final state after merge.

## Reusable issue template

```md
# <Clear issue title>

## Type / Labels

Type: <Epic | Feature | Bug | Documentation | Content | UI/UX | Refactor | Testing | Research>

Suggested labels: `<label-1>`, `<label-2>`

## Parent epic or related issue

Parent epic: #<number>, if applicable

Related issues/PRs:

- #<number> — <short note>

## Summary

<One or two short paragraphs explaining the desired outcome.>

## Problem / Motivation

<What is broken, missing, risky, confusing, or valuable to improve?>

## User-facing outcome

<What should learners, maintainers, or contributors experience after this work is complete?>

## Required references

Read before implementation:

- `docs/...`
- `src/...`
- #<issue-number> — <reason>
- PR #<number> — <reason>

## Research notes

- Open issues checked: <notes>
- Closed issues checked: <notes>
- Related PRs checked: <notes>
- Relevant files checked: <notes>
- Current behavior: <notes>

## Suggested branch name

`<allowed-prefix>/<short-hyphenated-name>`

Examples:

- `feature/add-aptitude-test-category`
- `bugfix/fix-random-practice-loading`
- `docs/update-github-issue-authoring-guidelines`

## Scope

Implement:

- [ ] <specific task>
- [ ] <specific task>

## Files likely to create or edit

Create:

- `path/to/new-file.md`

Edit:

- `path/to/existing-file.js`

Do not edit:

- `path/to/unrelated-area`

## Implementation requirements

- <Specific behavior or documentation requirement>
- <Specific compatibility requirement>
- <Specific data/content/metadata rule>

## Content/design/quality requirements

- Use clear explanation-first language where learner-facing content is touched.
- Do not hardcode misleading counts or duplicate source-of-truth data.
- Keep UI mobile-friendly and accessible where UI is touched.
- Prefer reusable components and config-driven visuals.
- Avoid unrelated refactors.
- Use production-ready metadata where content should be visible in production.

## Testing and validation

Run when applicable:

- [ ] `npm run test:unit`
- [ ] `npm run build`

Manual validation:

- [ ] <manual check>
- [ ] <manual check>

If skipped, explain why.

## Acceptance criteria

- [ ] <observable pass condition>
- [ ] <observable pass condition>

## Non-goals

- <What this issue must not change>
- <What should be deferred>

## PR requirements

The PR must include:

- Link to this issue.
- Summary of changes.
- Files created/edited.
- Validation performed.
- Screenshots for UI changes when useful.
- Notes for skipped tests/build.
- `Closes #<issue-number>` if complete.

## Done means

- <Final state after merge>
- <Documentation or validation complete>
- <No unrelated files changed>
```

## Good and poor examples

### Bug

Good: `Fix dashboard count mismatch with topic page problem totals`.

Why it works: it names the surface, the mismatch, and the expected source-of-truth concern.

Poor: `Dashboard numbers are wrong`.

Why it fails: it does not identify the data path, scope, or acceptance criteria.

### Content

Good: `Add anagram frequency-window coding problem for Sliding Window`.

Why it works: it names one topic, one concept, and one content deliverable.

Poor: `Add an anagram problem`.

Why it fails: it omits topic path, quality standard, visual expectation, metadata, and validation.

### UI/UX

Good: `Improve dashboard hero card large-screen layout`.

Why it works: it names the surface and viewport focus while leaving room for a small targeted UI change.

Poor: `Make dashboard prettier`.

Why it fails: it is subjective and has no acceptance criteria.

## Project standards checklist

Every issue should reinforce these standards when relevant:

- [ ] Learner-facing content is clear, practical, and explanation-first.
- [ ] New real content lives under an academy topic's `lessons`, `practice`, or `assessments` folder and is declared in its topic manifest.
- [ ] Production-visible content uses approved production metadata where applicable.
- [ ] Visual walkthroughs are config-driven and use existing renderers where possible.
- [ ] Counts and progress use reliable source-of-truth paths, not hardcoded values.
- [ ] UI changes remain mobile-friendly and accessible.
- [ ] Components are reusable where possible.
- [ ] Tests and build validation are requested when applicable.
- [ ] Skipped validation must be explained in the PR.
- [ ] Unrelated cleanup or refactors are explicitly out of scope.

## Useful prior issues

Reference prior work only when it helps implementers understand context.

- #95 — Production question bank quality epic.
- #131 — Explanation-first authoring standard.
- #135 — Focused DSA mastery problem task.
- #138 — Topic objectives, notes, and roadmap metadata task.
- #143 — Sliding Window production content task.
- #151 — Responsive layout bug.
- #155 — Dashboard UI improvement.
- #164 — Dashboard count source-of-truth bug.
- #165 — Large feature/category addition.
- #166 — This documentation task.

## Final authoring checklist

Before submitting an issue, confirm:

- [ ] title is clear and searchable;
- [ ] type and suggested labels are listed;
- [ ] parent epic or related issues are linked where possible;
- [ ] summary explains the outcome;
- [ ] motivation explains why the work matters;
- [ ] required docs, files, issues, and PRs are referenced;
- [ ] branch name follows `.github/workflows/branch-name.yml`;
- [ ] scope and non-goals are explicit;
- [ ] likely files are listed;
- [ ] implementation requirements are specific;
- [ ] acceptance criteria are testable;
- [ ] validation steps are included;
- [ ] PR requirements are listed;
- [ ] done criteria are clear;
- [ ] issue is ready for humans and coding agents.
