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
- visual walkthrough requirements
- metadata visibility

For any new question/problem, include a visual walkthrough requirement whenever possible. Make it explicit instead of only linking `docs/visual-schema.md`.

Use this wording unless the task has a clear reason not to include one:

    Add a config-driven `visualWalkthrough` where the problem shows state, movement, decisions, or transitions. Use existing supported visual schema types and semantic roles only. Do not add raw HTML/CSS or one-off React renderers. If no visual is included, explain why it would not add meaningful clarity.

For Sliding Window, Two Pointers, DP, graph traversal, heap/stack/queue, prefix-sum, and other stateful DSA coding problems, treat the visual walkthrough as expected by default.

### 7. Content quality requirements

Reference #131 and convert it into task-specific checks.

Include checks for:

- clarity before code
- intuition before formula
- concrete example before abstraction
- no hidden jumps
- no repeated teaching without purpose
- section-specific responsibilities
- visuals that teach state changes
- visual frames that show the important invariant, state transition, and answer update where applicable

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
    - #<quality standard>
    - `docs/adding-new-problems.md`
    - `docs/visual-schema.md`
    - `docs/writing-coding-implementation-instructions.md`
    - `<reference-file-1>`
    - `<reference-file-with-visual-walkthrough>`

    ---

    ## 4. Branch Instructions

    The branch already exists. Do not create a new branch.

    Run:

        git fetch origin
        git checkout <branch-name>
        git pull --ff-only

    ---

    ## 5. Files to Create or Edit

    ### Create

    - `<new-file-path>`

    ### Edit if needed

    - `<test-file-path>`

    ### Do not edit

    - `<legacy-file-or-unrelated-area>`

    ---

    ## 6. Implementation Requirements

    - <requirement 1>
    - <requirement 2>
    - Add a config-driven `visualWalkthrough` where the problem shows state, movement, decisions, or transitions. Use supported visual schema types and semantic roles only. Do not add raw HTML/CSS or one-off React renderers.

    ---

    ## 7. Content Quality Requirements

    - <quality requirement 1>
    - <quality requirement 2>
    - The visual walkthrough must teach the important state change, invariant, or answer update, not just decorate the page.

    ---

    ## 8. Testing and Validation

    Run:

        npm run test:unit
        npm run build

    Manual verification:

    1. <manual check 1>
    2. Confirm the visual walkthrough renders correctly, frames are ordered, and the page remains mobile-readable.
    3. Check the browser console for visual/rendering errors.

    ---

    ## 9. Pull Request Requirements

    Open a PR into `main` from `<branch-name>`.

    The PR must include:

    - summary
    - validation results
    - screenshots or manual verification notes when UI is affected
    - visual walkthrough notes, or a reason if it was intentionally omitted
    - `Closes #<issue-number>` when complete

    ---

    ## 10. Non-goals

    Do not:

    - <non-goal 1>
    - add raw HTML/CSS to problem config
    - create one-off visual renderers for a single problem

    ---

    ## 11. Done Means

    The task is complete only when:

    - <done criterion 1>
    - `npm run test:unit` passes
    - `npm run build` passes
    - visual walkthrough behavior is manually verified where included
    ```

## Common mistakes to avoid

- Giving a high-level plan but no exact file paths.
- Splitting the final instruction across several code blocks instead of one copy-ready block.
- Pushing a coding-instruction file when the user asked for instructions in chat.
- Forgetting to make the required ChatGPT chat name the first generated line.
- Treating chat naming as optional or background context during execution.
- Calling GitHub tools, reading issues, checking branches, searching files, or starting repository work before surfacing the required ChatGPT chat name.
- Forgetting to tell the user to rename the ChatGPT conversation manually when the assistant cannot rename it directly.
- Forgetting to make chat naming the first section inside the Markdown instruction.
- Naming chats generically instead of using `#<issue-number> — <short description>`.
- Asking the implementer to create a branch that already exists.
- Forgetting to link the parent epic or quality standard.
- Mixing app registration instructions with discovery-based problem loading.
- Forgetting validation commands.
- Forgetting manual UI checks for visual content.
- Forgetting to explicitly require a visual walkthrough where a problem has state, movement, decisions, transitions, or learner-visible steps.
- Treating `docs/visual-schema.md` as enough without saying whether the specific task must include a visual walkthrough.
- Adding raw HTML/CSS or one-off React components instead of config-driven visual schema.
- Allowing renderer-specific data shapes that are known to break components.
- Saying to close the issue before all acceptance criteria are satisfied.
