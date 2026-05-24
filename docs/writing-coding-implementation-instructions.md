# Writing Coding Implementation Instructions

Use this guide when creating implementation instructions for a developer or coding agent.

The goal is to make the task executable without guesswork. A good instruction tells the implementer exactly what to read, which branch to use, which files to edit, what not to change, how to validate the work, and how to write the pull request.

## Default delivery format

When asked to create coding or implementation instructions, deliver the final instruction **in the chat as one complete Markdown code block** unless the user explicitly asks to push it to the repository.

The one-block format is important because it gives the user a single copy button at the top right of the generated instruction.

The **first generated line in the assistant response** must be the suggested chat name.

The **first section inside the Markdown instruction block** must also be chat naming.

Use this response shape:

    Suggested chat name: #123 — Short Title

    Here is the copy-ready coding instruction:

    ```md
    # Coding Implementation Instruction: Issue #123 — Short Title

    ## 1. Chat Naming

    Suggested chat name: #123 — Short Title

    Use this name for the chat/thread so the work is easy to find later.

    ## 2. Task Summary
    ...
    ```

Do **not** split the final instruction across many small code blocks, because that forces the user to copy many fragments.

Do **not** push an instruction file to the repository unless the user explicitly asks for a file or asks you to update the Markdown guide.

Inline code examples are allowed inside the one Markdown block, but avoid nested fenced code blocks where possible. Use indented code blocks or plain text labels inside the main block so the copy-ready block remains easy to paste.

## Chat naming convention

When creating a new chat for coding or implementation instructions, make the desired chat name obvious using the issue number plus a short description.

Use this format:

    #<issue-number> — <short issue description>

Examples:

    #135 — Minimum Size Subarray Sum
    #133 — DSA Explanation Review
    #131 — Explanation-First Authoring Standard

Important: the assistant cannot directly rename the ChatGPT conversation. The app may still generate its own title. To give the title generator the strongest signal, the desired chat name must appear twice:

1. As the first visible/generated line before the copy-ready Markdown block.
2. As the first instruction/section inside the Markdown block.

If the issue title is long, shorten it while keeping the intent clear. Prefer the issue number first so the chat is easy to find later.

## Required structure

Every implementation instruction should include these sections in this order.

### 1. Chat naming

This must be the first instruction inside the Markdown block.

Include:

- suggested chat name using `#<issue-number> — <short description>`
- a brief instruction to use that name for the chat/thread

Example:

    Suggested chat name: #135 — Minimum Size Subarray Sum

    Use this name for the chat/thread so the implementation work is easy to find later.

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
- #131 — explanation-first problem authoring standard
- the target issue
- the parent epic when relevant
- at least one existing problem file to use as a style reference

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

### 8. Testing and validation

List exact commands.

At minimum:

    npm run test:unit
    npm run build

For visual or UI work, include manual verification steps and console-error checks.

### 9. Pull request requirements

Tell the implementer what the PR must include.

Usually:

- link to the issue
- summary of files changed
- validation commands and results
- screenshots or notes for UI work
- `Closes #<issue-number>` when the PR fully completes the issue

### 10. Non-goals

Call out what should not be done.

Examples:

- do not add a legacy bank entry as the primary source
- do not create one-off visual components unless the issue explicitly requires it
- do not change unrelated topics
- do not weaken tests to make content pass

## Quality checklist

Before posting implementation instructions, confirm:

- [ ] The first generated line is `Suggested chat name: #<issue-number> — <short description>`.
- [ ] The first section inside the Markdown block is `## 1. Chat Naming`.
- [ ] The same suggested chat name appears inside that first Markdown section.
- [ ] The final answer is one complete Markdown code block for one-click copying.
- [ ] The target branch is named.
- [ ] The task issue is linked.
- [ ] The parent epic is linked when relevant.
- [ ] Required docs are linked.
- [ ] Exact file paths are provided.
- [ ] Existing reference files are provided.
- [ ] Validation commands are provided.
- [ ] Manual verification steps are provided when UI behavior changes.
- [ ] The instruction says what not to change.
- [ ] The PR requirements are clear.
- [ ] The instruction was not pushed to the repo unless explicitly requested.

## Preferred instruction template

When producing the final answer in chat, first write the suggested chat name as plain text, then put the entire instruction inside a single `md` code block.

    Suggested chat name: #<number> — <Short Title>

    Here is the copy-ready coding instruction:

    ```md
    # Coding Implementation Instruction: Issue #<number> — <Short Title>

    ## 1. Chat Naming

    Suggested chat name: #<number> — <Short Title>

    Use this name for the chat/thread so the implementation work is easy to find later.

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
    - `docs/writing-coding-implementation-instructions.md`
    - `<reference-file-1>`
    - `<reference-file-2>`

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
    - <requirement 3>

    ---

    ## 7. Content Quality Requirements

    - <quality requirement 1>
    - <quality requirement 2>
    - <quality requirement 3>

    ---

    ## 8. Testing and Validation

    Run:

        npm run test:unit
        npm run build

    Manual verification:

    1. <manual check 1>
    2. <manual check 2>
    3. <manual check 3>

    ---

    ## 9. Pull Request Requirements

    Open a PR into `main` from `<branch-name>`.

    The PR must include:

    - summary
    - validation results
    - screenshots or manual verification notes when UI is affected
    - `Closes #<issue-number>` when complete

    ---

    ## 10. Non-goals

    Do not:

    - <non-goal 1>
    - <non-goal 2>
    - <non-goal 3>

    ---

    ## 11. Done Means

    The task is complete only when:

    - <done criterion 1>
    - <done criterion 2>
    - <done criterion 3>
    ```

## Common mistakes to avoid

- Giving a high-level plan but no exact file paths.
- Splitting the final instruction across several code blocks instead of one copy-ready block.
- Pushing a coding-instruction file when the user asked for instructions in chat.
- Forgetting to make the suggested chat name the first generated line.
- Forgetting to make chat naming the first section inside the Markdown instruction.
- Naming chats generically instead of using `#<issue-number> — <short description>`.
- Asking the implementer to create a branch that already exists.
- Forgetting to link the parent epic or quality standard.
- Mixing app registration instructions with discovery-based problem loading.
- Forgetting validation commands.
- Forgetting manual UI checks for visual content.
- Allowing renderer-specific data shapes that are known to break components.
- Saying to close the issue before all acceptance criteria are satisfied.
