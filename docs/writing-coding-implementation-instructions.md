# Writing Coding Implementation Instructions

Use this guide when creating implementation instructions for a developer or coding agent.

The goal is to make the task executable without guesswork. A good instruction tells the implementer exactly what to read, which branch to use, which files to edit, what not to change, how to validate the work, and how to write the pull request.

## Default delivery format

When asked to create coding or implementation instructions, deliver the final instruction **in the chat as one complete Markdown code block** unless the user explicitly asks to push it to the repository.

The one-block format is important because it gives the user a single copy button at the top right of the generated instruction.

The **first generated line in the assistant response** must be the required ChatGPT chat name.

The **first section inside the Markdown instruction block** must also be chat naming.

Use this response shape:

    Required ChatGPT chat name: #123 — Short Title

    Here is the copy-ready coding instruction:

    ```md
    # Coding Implementation Instruction: Issue #123 — Short Title

    ## 1. Chat Naming

    Required ChatGPT chat name: #123 — Short Title

    Before doing any implementation work, rename this ChatGPT conversation/thread to the exact name above.

    If the assistant or coding agent cannot rename the conversation directly, it must first surface this name to the user and ask the user to rename the conversation manually before continuing.

    ## 2. Task Summary
    ...
    ```

Do **not** split the final instruction across many small code blocks, because that forces the user to copy many fragments.

Do **not** push an instruction file to the repository unless the user explicitly asks for a file or asks you to update the Markdown guide.

Inline code examples are allowed inside the one Markdown block, but avoid nested fenced code blocks where possible. Use indented code blocks or plain text labels inside the main block so the copy-ready block remains easy to paste.

## Mandatory first execution step for coding agents

When an implementer, coding agent, or assistant is asked to execute coding implementation instructions, the chat name instruction must be handled before any other action.

This means the first assistant response after receiving the implementation request must:

1. Repeat the exact required ChatGPT chat name.
2. State that this is the required ChatGPT chat/thread name.
3. Ask the user to rename the ChatGPT conversation manually if the assistant cannot directly rename it.
4. Do this before reading issues, searching files, calling GitHub tools, checking branches, inspecting code, or starting implementation work.

Do not treat chat naming as background context.
Do not skip it because it looks like a simple title.
Do not begin repository work until the chat name has been surfaced first.

Required first response shape when executing instructions:

    Chat name: #<issue-number> — <short description>

    Please rename this ChatGPT conversation to the chat name above before continuing. I will use this as the working thread name for the implementation.

Only after this first response should the implementer proceed to references, branch setup, file inspection, coding, validation, and PR work.

## Chat naming convention

Every coding implementation instruction must begin with a required ChatGPT chat name.

Use this format:

    #<issue-number> — <short issue description>

Examples:

    #135 — Minimum Size Subarray Sum
    #133 — DSA Explanation Review
    #131 — Explanation-First Authoring Standard

Important: the chat name is not only documentation. It is the first execution step.

When an assistant or coding agent is asked to execute the instruction, it must handle chat naming before any other action. It must not inspect GitHub issues, search files, check branches, read docs, or start implementation until the chat name has been surfaced first.

Because assistants may not be able to directly rename the ChatGPT conversation, the required behavior is:

1. First response: show the exact required chat name.
2. Ask the user to rename the ChatGPT conversation manually if needed.
3. Only then continue to implementation work.

The desired chat name must appear twice when generating instructions:

1. As the first visible/generated line before the copy-ready Markdown block.
2. As the first instruction/section inside the Markdown block.

If the issue title is long, shorten it while keeping the intent clear. Prefer the issue number first so the chat is easy to find later.

## Required structure

Every implementation instruction should include these sections in this order.

### 1. Chat naming

This must be the first instruction inside the Markdown block and the first execution step for any assistant or coding agent using the instruction.

Include:

- required ChatGPT chat name using `#<issue-number> — <short description>`
- a brief instruction to use that exact name for the ChatGPT chat/thread
- a reminder that no repository, GitHub, branch, file, or coding work should start before chat naming is surfaced
- a fallback instruction that, if the assistant cannot rename ChatGPT directly, it must ask the user to rename the conversation manually before continuing

Example:

    Required ChatGPT chat name: #135 — Minimum Size Subarray Sum

    Before doing any implementation work, rename this ChatGPT conversation/thread to the exact name above.

    If the assistant or coding agent cannot rename the conversation directly, it must first surface this name to the user and ask the user to rename the conversation manually before continuing.

### 2. Task summary

Explain the goal in one or two short paragraphs.

Include:

- issue number
- parent epic if applicable
- branch name
- expected user-facing outcome

Example:

    Implement #135 on branch feature/add-min-size-subarray-sum-sliding-window.
    Add one new explanation-first Sliding Window DSA problem for Minimum Size Subarray Sum.

### 3. Required references

List the documents and issues the implementer must read before coding.

For Senior Dev Accelerator problem-authoring tasks, include:

- `docs/adding-new-problems.md`
- `docs/visual-schema.md`
- #131 — explanation-first problem authoring standard
- the target issue
- the parent epic when relevant
- at least one existing problem file to use as a style reference
- at least one existing problem with a `visualWalkthrough` when the task involves DSA, state transitions, pointers/windows, or visual learning

### 4. Branch instructions

State whether the branch already exists.

If the branch exists, say:

    git fetch origin
    git checkout <branch-name>
    git pull --ff-only

Do not tell the implementer to create a new branch when one already exists.

### 5. Files to create or edit

Be explicit.

Use three groups:

- create
- edit if needed
- do not edit

This avoids accidental legacy-bank changes, renderer hacks, or unrelated refactors.

### 6. Implementation requirements

Describe the required behavior and content.

For problem-authoring tasks, include:

- problem id
- category
- topicId
- type
- language
- difficulty
- required fields
- learner-facing Objective section
- visual walkthrough requirements
- metadata visibility

Every new quiz/problem must include a learner-facing `Objective` section near the top of the content. The Objective should answer: `What should the learner be able to do after completing this problem?` Prefer concise `I can...` wording. For CKAD problems, this is required from now onward and should appear before scenario, story, or explanatory sections such as `Why this lab exists`.

For CKAD and Kubernetes lessons, every command block must follow the command authoring standard:

- one command block must contain one executable command only;
- every command must have its own learner-facing explanation immediately before it;
- the explanation must say what the command checks or changes, why it is being run, and what the learner should notice;
- do not stack multiple unrelated commands in one block;
- do not hide cleanup commands inside normal text or fenced Markdown inside a section;
- use a real `code` block for every executable command;
- avoid grouped Kubernetes resource lists unless the grouped form is itself the exact concept being taught;
- when grouping is used, explain the grouping and keep Kubernetes comma syntax tight, for example `deploy,rs`, not `deploy, rs`;
- prefer independent inspection commands for beginner lessons, even when experienced users would combine them;
- code blocks may scroll horizontally on small screens, but normal explanatory text must wrap on desktop.

For learner-facing quiz/problem content, do not use raw Markdown syntax as a styling mechanism inside data strings:

- do not write raw bold markers such as double asterisks around terms in section content;
- do not write raw inline-code backticks around terms in normal explanation text;
- do not write raw Markdown bullets inside a string that the renderer treats as plain text;
- do not place fenced code blocks inside normal `section` content;
- use structured blocks such as `checklist`, `comparison`, `callout`, `table`, and `code` instead of embedded Markdown formatting;
- use labels, titles, and item fields for emphasis instead of raw Markdown punctuation;
- executable commands must be `code` blocks, not fenced Markdown inside a section;
- if a technical term needs visual emphasis, prefer renderer-supported structured fields or plain text that the renderer can style without showing syntax characters.

For any new question/problem, include a visual walkthrough requirement whenever possible. Make it explicit instead of only linking `docs/visual-schema.md`.

Use this wording unless the task has a clear reason not to include one:

    Add a config-driven `visualWalkthrough` where the problem shows state, movement, decisions, or transitions. Use existing supported visual schema types and semantic roles only. Do not add raw HTML/CSS or one-off React renderers. If no visual is included, explain why it would not add meaningful clarity.

For Sliding Window, Two Pointers, DP, graph traversal, heap/stack/queue, prefix-sum, and other stateful DSA coding problems, treat the visual walkthrough as expected by default.

### 7. Content quality requirements

Reference #131 and convert it into task-specific checks.

Include checks for:

- a clear learner-facing Objective section near the top of every new quiz/problem
- clarity before code
- intuition before formula
- concrete example before abstraction
- no hidden jumps
- no repeated teaching without purpose
- section-specific responsibilities
- visuals that teach state changes
- visual frames that show the important invariant, state transition, and answer update where applicable
- no raw Markdown styling characters in learner-facing rendered text

For quiz/problem content, prefer this learner-facing order where supported:

1. Objective
2. Scenario / why this exists
3. Current state / starting point
4. Tasks
5. Verification
6. Explanation
7. Common mistakes
8. Cleanup, if applicable

### 8. Testing and validation

List exact commands.

At minimum:

    npm run test:unit
    npm run build

For visual or UI work, include manual verification steps and console-error checks.

When a `visualWalkthrough` is added, manual verification must include:

- the visual renders on the problem page;
- frames progress in the expected order;
- semantic roles display clearly in light and dark themes where applicable;
- the walkthrough remains mobile-readable;
- the browser console has no visual/rendering errors.

### 9. Pull request requirements

Tell the implementer what the PR must include.

Usually:

- link to the issue
- summary of files changed
- validation commands and results
- screenshots or notes for UI work
- visual walkthrough notes when a problem includes one, or a clear reason if it was intentionally omitted
- `Closes #<issue-number>` when the PR fully completes the issue

### 10. Non-goals

Call out what should not be done.

Examples:

- do not add a legacy bank entry as the primary source
- do not create one-off visual components unless the issue explicitly requires a reusable renderer change
- do not add raw HTML/CSS to problem config
- do not change unrelated topics
- do not weaken tests to make content pass

## Quality checklist

Before posting implementation instructions, confirm:

- [ ] The first generated line is `Required ChatGPT chat name: #<issue-number> — <short description>`.
- [ ] The chat name is marked as required, not merely suggested.
- [ ] The first section inside the Markdown block is `## 1. Chat Naming`.
- [ ] The same required ChatGPT chat name appears inside that first Markdown section.
- [ ] The first instruction explicitly says chat naming must happen before any repository, GitHub, branch, file, or coding work.
- [ ] The instruction tells coding agents not to call tools or inspect context before surfacing the required chat name.
- [ ] The instruction explains that if the assistant cannot rename ChatGPT directly, it must ask the user to rename the conversation manually first.
- [ ] The final answer is one complete Markdown code block for one-click copying.
- [ ] The target branch is named.
- [ ] The task issue is linked.
- [ ] The parent epic is linked when relevant.
- [ ] Required docs are linked.
- [ ] `docs/visual-schema.md` is linked for new question/problem work where visual learning may apply.
- [ ] Every new quiz/problem includes a learner-facing Objective section near the top of the content.
- [ ] CKAD/Kubernetes command content follows the command authoring standard: one command block, one command, one immediate explanation.
- [ ] Learner-facing rendered content avoids raw Markdown styling characters such as double asterisks, inline-code backticks, Markdown bullets inside plain strings, and fenced code blocks inside section content.
- [ ] Exact file paths are provided.
- [ ] Existing reference files are provided.
- [ ] A visual walkthrough is explicitly required where the question has state, movement, decisions, transitions, or learner-visible steps.
- [ ] If a visual walkthrough is not required, the instruction explains why it would not add meaningful clarity.
- [ ] Validation commands are provided.
- [ ] Manual verification steps are provided when UI behavior changes.
- [ ] Manual visual verification steps are provided when a `visualWalkthrough` is added.
- [ ] The instruction says what not to change.
- [ ] The PR requirements are clear.
- [ ] The instruction was not pushed to the repo unless explicitly requested.

## Preferred instruction template

When producing the final answer in chat, first write the required ChatGPT chat name as plain text, then put the entire instruction inside a single `md` code block.

    Required ChatGPT chat name: #<number> — <Short Title>

    Here is the copy-ready coding instruction:

    ```md
    # Coding Implementation Instruction: Issue #<number> — <Short Title>

    ## 1. Chat Naming

    Required ChatGPT chat name: #<number> — <Short Title>

    Before doing any implementation work, rename this ChatGPT conversation/thread to the exact name above.

    If the assistant or coding agent cannot rename the conversation directly, it must first surface this name to the user and ask the user to rename the conversation manually before continuing.

    ---

    ## 2. Task Summary

    Implement #<number> on branch `<branch-name>`.

    Expected outcome: <short user-facing result>.

    Parent epic: #<epic-number>, if applicable.

    Quality standard: #131, if applicable.

    ---

    ## 3. Required References

    Read these before coding:

    - #<target issue>
    - #<parent epic>
