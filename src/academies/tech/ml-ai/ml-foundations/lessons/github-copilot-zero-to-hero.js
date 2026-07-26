import { defineLearningProblem } from '../../../../../problems/problemAuthoring.js';

const problem = defineLearningProblem({
  id: 'ml-foundations-github-copilot-zero-to-hero',
  category: 'ml-ai',
  topicId: 'ml-foundations',
  title: 'GitHub Copilot: From Zero to Hero',
  difficulty: 'Medium',
  prompt: 'A rigorous, production-grade masterclass on using GitHub Copilot effectively in daily development workflows. Covers installation (VS Code, JetBrains, CLI), authentication, inline autocomplete, Copilot Agent Mode, Copilot CLI, Skills (SKILL.md) with community resources from awesome-copilot, prompt crafting for Copilot, day-to-day workflows (chat vs. task files), verification loops, token efficiency, dos and don\'ts, and integrating Copilot into your daily coding rhythm.',
  tags: ['github-copilot', 'ai', 'productivity', 'vscode', 'autocomplete', 'agentic-workflows', 'developer-tools', 'skills', 'awesome-copilot'],
  rendering: {
    variant: 'deep-dive',
    density: 'detailed',
    accent: 'blue'
  },
  body: [
    // ============================================================
    // INTRODUCTION
    // ============================================================
    {
      type: 'section',
      title: 'Architectural Introduction: From Autocomplete to Agentic Collaboration',
      content: 'GitHub Copilot has evolved from a simple autocomplete tool into a full agentic assistant that can read your entire codebase, run multi-step workflows, fix failing tests, and open pull requests autonomously. This masterclass teaches you not only *how* to install and use Copilot, but also *when* to use each mode (inline vs. agent vs. CLI), *how* to craft prompts that get the right output, *how* to use Skills for reusable workflows, and *what* pitfalls to avoid — transforming you from a casual user into a power user who consistently ships better code, faster.'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'The Senior Developer\'s Mindset on Copilot',
      content: 'Copilot doesn\'t replace your judgment — it amplifies it. The weakest users treat it as a magic code generator and accept whatever it produces. The strongest users treat Copilot as a junior collaborator: they provide clear context, review everything, guide the work iteratively, and know exactly when to override or reject suggestions. Copilot is a tool — you are still the architect.'
    },

    // ============================================================
    // PART 1: SETUP AND INITIALIZATION
    // ============================================================
    {
      type: 'section',
      title: 'Part 1: Setup and Initialization — Getting Started the Right Way',
      content: 'A clean setup avoids 80% of "it doesn\'t listen" complaints. Proper installation, authentication, and initial configuration are the foundation of effective AI-assisted development.'
    },

    // --- 1.1 VS Code Setup ---
    {
      type: 'section',
      title: '1.1 VS Code Extension — The Most Common Entry Point',
      content: 'The VS Code extension is the most popular way to use Copilot, providing inline autocomplete, chat, and agent mode.'
    },
    {
      type: 'code',
      language: 'bash',
      code: '# Install the GitHub Copilot extension in VS Code\n# 1. Open VS Code\n# 2. Go to Extensions (Ctrl+Shift+X)\n# 3. Search for "GitHub Copilot"\n# 4. Click Install\n# 5. Sign in with your GitHub account\n\n# Or install via command line\ncode --install-extension GitHub.copilot\ncode --install-extension GitHub.copilot-chat'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'VS Code Keyboard Shortcuts for Copilot',
      content: '`Tab` — Accept suggestion | `Ctrl+Right` — Accept word by word | `Alt+]` — Next suggestion | `Alt+[` — Previous suggestion | `Ctrl+Shift+I` — Open Copilot Chat | `Ctrl+Shift+P` → "Copilot: Explain This" — Get an explanation of selected code'
    },

    // --- 1.2 JetBrains Setup ---
    {
      type: 'section',
      title: '1.2 JetBrains IDEs — IntelliJ, WebStorm, PyCharm',
      content: 'Copilot integrates seamlessly with JetBrains IDEs through the official plugin.'
    },
    {
      type: 'code',
      language: 'bash',
      code: '# Install the GitHub Copilot plugin in JetBrains\n# 1. Open Settings/Preferences\n# 2. Go to Plugins\n# 3. Search for "GitHub Copilot"\n# 4. Click Install\n# 5. Restart the IDE\n# 6. Sign in with your GitHub account'
    },

    // --- 1.3 CLI Setup ---
    {
      type: 'section',
      title: '1.3 Copilot CLI — Bring Copilot to the Terminal',
      content: 'Copilot CLI brings agentic capabilities directly to the command line, letting you assign tasks and review results later — all without switching tools.'
    },
    {
      type: 'code',
      language: 'bash',
      code: '# Install GitHub Copilot CLI\nnpm install -g @github/copilot\n\n# Or via Homebrew (macOS/Linux)\nbrew install --cask copilot-cli\n\n# Or via WinGet (Windows)\nwinget install GitHub.Copilot\n\n# Start an interactive CLI session\ncopilot\n\n# Authenticate\n/login'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Core Shortcuts to Master in Copilot CLI',
      content: '`Esc` — Cancel current operation | `Ctrl+C` — Cancel, clear input, or exit | `Ctrl+L` — Clear screen | `@` — Mention files to include in context | `/` — Show slash commands | `?` — Show tabbed help | `↑` and `↓` — Navigate command history'
    },

    // ============================================================
    // PART 2: UNDERSTANDING COPILOT'S MODES
    // ============================================================
    {
      type: 'section',
      title: 'Part 2: Understanding Copilot\'s Modes — Inline, Chat, Agent, and CLI',
      content: 'Copilot has four distinct modes, each suited to different tasks. Knowing which mode to use for which task is the first step to productivity.'
    },
    {
      type: 'table',
      columns: ['Mode', 'When to Use', 'How to Access'],
      rows: [
        ['Inline Autocomplete', 'Writing small functions, boilerplate, repetitive code, tests', 'Starts typing — suggestions appear automatically (VS Code, JetBrains)'],
        ['Inline Chat', 'Explaining code, quick questions, small refactors', 'Ctrl+I (VS Code) or Cmd+I (JetBrains)'],
        ['Copilot Chat (Panel)', 'Multi-step conversations, planning, code review, debugging', 'Ctrl+Shift+I (VS Code) or Click the chat icon'],
        ['Copilot Agent Mode', 'Autonomous multi-step tasks (tests, PRs, complex refactors)', 'Click "Agent Mode" in Copilot Chat'],
        ['Copilot CLI', 'Terminal-based agentic assistant, task delegation', 'Run `copilot` in your terminal']
      ]
    },

    // ============================================================
    // PART 3: CONTEXT ENGINEERING
    // ============================================================
    {
      type: 'section',
      title: 'Part 3: Context Engineering — Teaching Copilot to Understand Your Project',
      content: 'Context is the single most important factor in Copilot output quality. The more relevant context you provide upfront, the less time you spend correcting and iterating.'
    },

    // --- 3.1 copilot-instructions.md ---
    {
      type: 'section',
      title: '3.1 copilot-instructions.md — Persistent Project Context',
      content: '`copilot-instructions.md` is a special file that Copilot uses as persistent context, guiding its output to match your project\'s coding standards, testing patterns, and conventions.'
    },
    {
      type: 'code',
      language: 'markdown',
      code: '# copilot-instructions.md — GitHub Copilot Guidelines\n\n## Code Style\n- Use TypeScript with strict mode\n- Prefer functional components over class components\n- Use named exports, not default exports\n- Follow ESLint rules (see .eslintrc)\n\n## Testing\n- Write Jest tests for all new features\n- Aim for 80%+ branch coverage\n- Use `describe` and `it` blocks\n\n## Performance\n- Avoid unnecessary re-renders with `useMemo` and `useCallback`\n- Use React.memo for expensive components\n\n## Security\n- No hardcoded secrets or API keys\n- Validate all user inputs with Zod\n- Use HTTPS for all external calls'
    },

    // --- 3.2 Using @ Mentions to Include Context ---
    {
      type: 'section',
      title: '3.2 @ Mentions — Including Specific Files in Context',
      content: 'In Copilot Chat or CLI, use `@` to reference specific files or directories to include in the context. This is the most direct way to give Copilot the information it needs.'
    },
    {
      type: 'code',
      language: 'bash',
      code: '# In Copilot Chat, reference files with @\n@src/auth/auth.service.ts: Implement a logout function that invalidates the token\n\n# Reference multiple files\n@src/auth/*.ts: What authentication patterns are being used?\n\n# Reference a specific function\n@src/auth/auth.service.ts:refreshToken\n\n# In Copilot CLI\n@file:src/api/orders.ts explain this file'
    },

    // ============================================================
    // PART 4: PROMPT CRAFTING
    // ============================================================
    {
      type: 'section',
      title: 'Part 4: Prompt Crafting — Getting the Right Output Every Time',
      content: 'The quality of Copilot\'s output is directly proportional to the quality of your prompt. A comment immediately above your cursor is the strongest signal Copilot has.'
    },

    // --- 4.1 Specific Beats Short ---
    {
      type: 'section',
      title: '4.1 Specific Beats Short — The Most Important Rule',
      content: 'Vague prompts produce unpredictable results. Specific prompts produce tightly constrained, correct output.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// ❌ BAD: Vague prompt produces five different things on five runs\n// parse date\ndef parse_date(s): pass\n\n// ✅ GOOD: Specific prompt produces a tightly constrained function\n// Parse an ISO 8601 datetime string into a timezone-aware datetime.\n// Accept either \'Z\' suffix or explicit \'+00:00\' offset.\n// Raise ValueError on any other format.\ndef parse_date(s: str) -> datetime: pass'
    },

    // --- 4.2 Lead with the Contract ---
    {
      type: 'section',
      title: '4.2 Lead with the Contract — State Inputs, Outputs, and Errors First',
      content: 'State inputs, outputs, errors, and side effects before describing behavior.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Input: array of orders, each with .totalCents and .currency\n// Output: Map<currency, totalCents> with all currencies present\n// Throws: never (returns empty map for empty input)\n// Side effects: none\nfunction totalsByCurrency(orders: Order[]): Map<string, number> {'
    },

    // --- 4.3 Constraints, Not Just Goals ---
    {
      type: 'section',
      title: '4.3 Constraints, Not Just Goals — Tell Copilot How, Not Just What',
      content: 'If you care about how the code is implemented, say so.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Build a frequency map of words in `text`.\n// Use only the stdlib (no Counter — implement with dict).\n// Lowercase before counting. Strip punctuation.\ndef word_frequencies(text: str) -> dict[str, int]:\n    # Without the "no Counter" constraint, Copilot uses collections.Counter every time.'
    },

    // --- 4.4 Follow the Shape of Existing Files ---
    {
      type: 'section',
      title: '4.4 Follow the Shape of Existing Files — Pattern Matching on Code Structure',
      content: 'If a sibling file exemplifies the pattern you want, name it. Copilot can\'t read the file, but it does pattern-match on the name and produce structurally consistent code.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Follow the same shape as services/orders.py:\n// - sync function wrapping the async impl\n// - All exceptions converted to ServiceError\n// - Logging at INFO on entry, DEBUG on success, ERROR on failure\ndef create_subscription(user_id: str, plan_id: str) -> Subscription:'
    },

    // ============================================================
    // PART 5: COPILOT SKILLS (SKILL.md)
    // ============================================================
    {
      type: 'section',
      title: 'Part 5: Copilot Skills — Reusable Workflows (SKILL.md)',
      content: 'Agent Skills are self-contained folders with instructions and bundled resources that enhance AI capabilities for specialized tasks.[reference:4] Based on the open [Agent Skills specification](https://agentskills.io/specification), each skill contains a `SKILL.md` file with detailed instructions that agents load on-demand. Skills differ from simple prompts by supporting bundled assets — scripts, code samples, reference data — that agents can utilize when performing specialized tasks.[reference:5]'
    },

    // --- 5.1 What Is a Skill? ---
    {
      type: 'section',
      title: '5.1 What Is a Skill?',
      content: 'A Skill is a folder containing a `SKILL.md` instruction file, and optionally helper scripts, code templates, or reference data.[reference:6] Skills follow the Agent Skills specification for maximum compatibility across different coding agents (Copilot, Claude Code, Cursor, Codex, Gemini CLI, and more).[reference:7]'
    },
    {
      type: 'code',
      language: 'markdown',
      code: '# .github/skills/add-api-endpoint/SKILL.md\n---\nname: add-api-endpoint\ndescription: Add a new REST API endpoint with validation, tests, and documentation\n---\n\n## Objective\nAdd a new REST API endpoint for [feature description].\n\n## Context\n- Controllers live in: `src/controllers/`\n- Services live in: `src/services/`\n- Models live in: `src/models/`\n- Tests live in: `tests/integration/`\n\n## Requirements\n1. Create a new controller method\n2. Add validation using Zod (see `src/middleware/validate.ts`)\n3. Add a service method for business logic\n4. Write integration tests (see `tests/integration/orders.test.ts` for pattern)\n5. Add OpenAPI documentation\n\n## Constraints\n- All responses must use the standard `{ success, data, error }` shape\n- Error codes must match the standard error map (see `src/errors.ts`)\n- No breaking changes to existing endpoints\n\n## Verification\n- Run `npm test` — all tests must pass\n- Run `npm run lint` — no new warnings\n- Manually test with a curl command\n\n## Output\nProduce a PR with the new endpoint, tests, and updated documentation.'
    },

    // --- 5.2 Where to Store Skills ---
    {
      type: 'section',
      title: '5.2 Where to Store Skills — Project vs. Personal',
      content: 'Skills can be stored in two locations, depending on whether they are specific to a single repository or shared across all your projects.[reference:8]'
    },
    {
      type: 'table',
      columns: ['Location', 'Scope', 'Path'],
      rows: [
        ['**Project Skills**', 'Specific to a single repository', '`.github/skills/` or `.claude/skills/` or `.agents/skills/`'],
        ['**Personal Skills**', 'Shared across all your projects', '`~/.copilot/skills/` or `~/.agents/skills/`']
      ]
    },
    {
      type: 'code',
      language: 'bash',
      code: '# Project skills — in your repository root\nmkdir -p .github/skills/my-skill\n\n# Personal skills — in your home directory\nmkdir -p ~/.copilot/skills/my-skill\n\n# Skill subdirectory names should be lowercase and use hyphens for spaces[reference:9]'
    },

    // --- 5.3 SKILL.md Structure ---
    {
      type: 'section',
      title: '5.3 SKILL.md Structure — The Required Format',
      content: 'A `SKILL.md` file is a Markdown file with YAML frontmatter. In their simplest form, they include:[reference:10]'
    },
    {
      type: 'code',
      language: 'markdown',
      code: '---\nname: github-actions-failure-debugging  # Required — unique identifier, lowercase with hyphens[reference:11]\ndescription: Guide for debugging failing GitHub Actions workflows. Use this when asked to debug failing GitHub Actions workflows.[reference:12]\nlicense: MIT  # Optional\n---\n\n# Detailed instructions, examples, and guidelines for Copilot to follow\n\n1. Use the `list_workflow_runs` tool to look up recent workflow runs\n2. Use the `summarize_job_log_failures` tool to get an AI summary of the logs\n3. Fix the failing build and verify the fix[reference:13]'
    },

    // --- 5.4 Bundled Assets ---
    {
      type: 'section',
      title: '5.4 Bundled Assets — Scripts, Templates, and References',
      content: 'Skills can include additional resources beyond the `SKILL.md` file. These assets are referenced in the instructions and give Copilot much more to work with.[reference:14]'
    },
    {
      type: 'code',
      language: 'bash',
      code: '.github/skills/acquire-codebase-knowledge/\n├── SKILL.md                           # Main instructions\n├── assets/\n│   ├── templates/                     # Code templates\n│   │   └── architecture-template.md\n│   ├── references/                    # Reference documents\n│   │   ├── inquiry-checkpoints.md\n│   │   └── stack-detection.md\n│   └── scripts/                       # Helper scripts\n│       └── scan.py\n└── examples/                          # Example code[reference:15][reference:16]'
    },

    // --- 5.5 The Community Skills Collection ---
    {
      type: 'section',
      title: '5.5 The Community Skills Collection — awesome-copilot',
      content: 'The [awesome-copilot](https://awesome-copilot.github.com/skills) repository is a community-created collection of custom agents, instructions, skills, hooks, workflows, and plugins to supercharge your GitHub Copilot experience.[reference:17] As of March 2026, it contains **208+ skills**, **175+ agents**, and **176+ instructions** contributed by the community.[reference:18]'
    },
    {
      type: 'checklist',
      title: 'How to Use Community Skills',
      items: [
        '**Browse the collection**: Visit [awesome-copilot.github.com/skills](https://awesome-copilot.github.com/skills) to explore available skills[reference:19]',
        '**Install a skill via CLI**: `gh skills install github/awesome-copilot <skill-name>` (requires GitHub CLI v2.90.0+)[reference:20]',
        '**Manual installation**: Copy the skill folder to your local skills directory (`.github/skills/` or `~/.copilot/skills/`)[reference:21]',
        '**Reference in prompts**: Skills can be invoked via slash commands (`/skill-name`) or discovered automatically by the agent[reference:22]'
      ]
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Why Skills Are Better Than Prompts',
      content: 'Skills replace the older `*.prompt.md` pattern with several advantages:\n\n- **Agent discovery**: Skills include extended frontmatter that lets agents find and invoke them automatically — prompts could only be triggered manually[reference:23]\n- **Richer context**: Skills can bundle reference files, scripts, templates, and other assets alongside their instructions[reference:24]\n- **Cross-platform portability**: The Agent Skills specification works across Copilot, Claude Code, Cursor, Codex, and Gemini CLI[reference:25]\n- **Slash command support**: Skills can still be invoked via `/command` in VS Code Chat[reference:26]'
    },

    // --- 5.6 When to Use a Skill vs. Chat vs. Task File ---
    {
      type: 'section',
      title: '5.6 When to Use a Skill vs. Chat vs. Task File — The Critical Workflow Decision',
      content: 'This is one of the most important workflow decisions you\'ll make. Choosing the right approach saves time and reduces errors.'
    },
    {
      type: 'table',
      columns: ['Approach', 'When to Use', 'Example'],
      rows: [
        ['**Chat (Direct Prompt)**', 'Quick questions, small changes, exploratory work, one-off tasks', '"Explain this function", "Fix this type error", "What does this error mean?"'],
        ['**Chat with @ Mentions**', 'Tasks that need specific file context but are still one-off', '"@src/api/orders.ts add a PUT /orders/:id endpoint"'],
        ['**Skill (SKILL.md)**', 'Repeated tasks, complex multi-step workflows, team standards', 'Adding a new API endpoint, creating a new component, setting up a new microservice'],
        ['**Task File (.md)**', 'Complex one-off tasks that need detailed planning and context', 'A major refactor, security audit, or migration — write the spec in a file, then reference it']
      ]
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'When to Write a Task File vs. a Skill',
      content: 'If a task is too complex to describe in one or two sentences, write it as a markdown file first. This gives you a chance to think through the requirements, structure the context, and share the spec with your team.\n\n- **Reusable task?** → Convert the task file into a `SKILL.md` skill[reference:27]\n- **One-off complex task?** → Reference the task file directly with `@task-file.md`'
    },

    // ============================================================
    // PART 6: DAY-TO-DAY WORKFLOWS
    // ============================================================
    {
      type: 'section',
      title: 'Part 6: Day-to-Day Workflows — Integrating Copilot into Your Daily Coding Rhythm',
      content: 'Here\'s how a senior developer weaves Copilot into their daily workflow — not as a separate tool, but as a natural part of the coding process.'
    },

    // --- 6.1 Morning Setup ---
    {
      type: 'section',
      title: '6.1 Morning Setup — Start Your Day with Context',
      content: 'Start your day by making sure Copilot has the context it needs.'
    },
    {
      type: 'checklist',
      title: 'Daily Copilot Checklist',
      items: [
        'Pull the latest code from main',
        'Run `copilot` to start the CLI session (if using CLI)',
        'Open Copilot Chat and ask: "What changed in the codebase recently?"',
        'Review any open PRs Copilot has generated',
        'Check for any failed builds or test failures Copilot flagged'
      ]
    },

    // --- 6.2 The "Chat First" Workflow ---
    {
      type: 'section',
      title: '6.2 The "Chat First" Workflow — Plan Before You Code',
      content: 'For non-trivial tasks, start in Copilot Chat before writing code. This saves time by catching misunderstandings early.'
    },
    {
      type: 'code',
      language: 'bash',
      code: '# Step 1: Explore in Chat\n"@src/auth/ explain the authentication flow"\n\n# Step 2: Plan the approach\n"I need to add OAuth2 support. What changes would be needed?"\n\n# Step 3: Generate the plan as a task file\n"Write a task spec for this work in a markdown file"\n\n# Step 4: Review and refine the spec\n# Review the generated spec, add any missing context\n\n# Step 5: Implement using the task file\n"@task-files/oauth2-implementation.md implement this"\n\n# Step 6: Verify\n"Run the tests and fix any failures"'
    },

    // --- 6.3 The "Inline First" Workflow ---
    {
      type: 'section',
      title: '6.3 The "Inline First" Workflow — Let Copilot Suggest as You Type',
      content: 'For small, well-defined tasks, start with inline autocomplete. This is the fastest way to write code you already know how to write.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Step 1: Write a descriptive comment\n// Create a function that validates an email address\n\n// Step 2: Write the function signature\nfunction validateEmail(email: string): boolean {\n\n// Step 3: Let Copilot fill in the rest\n// → Copilot suggests the complete function\n\n// Step 4: Review and accept\n// → Check the logic, simplify if needed, then Tab to accept\n\n// Step 5: Write a test\n// Write tests for validateEmail\n\n// Step 6: Verify\n// Run the tests'
    },

    // --- 6.4 The "Agent Mode" Workflow ---
    {
      type: 'section',
      title: '6.4 The "Agent Mode" Workflow — Let Copilot Work Autonomously',
      content: 'For multi-step, well-defined tasks, use Copilot Agent Mode. This gives Copilot the freedom to work through the problem autonomously while you focus on other work.'
    },
    {
      type: 'code',
      language: 'bash',
      code: '# Step 1: Define the task clearly\n"Fix all failing tests in the auth module"\n\n# Step 2: Enable Agent Mode\n# Click "Agent Mode" in Copilot Chat\n\n# Step 3: Let Copilot work\n# Copilot reads files, identifies failures, plans fixes, runs tests\n\n# Step 4: Review the changes\n# Review each change Copilot made\n\n# Step 5: Iterate\n"One test is still failing. Fix it."\n\n# Step 6: Commit\n# Accept the changes and commit'
    },

    // --- 6.5 The "Skill" Workflow ---
    {
      type: 'section',
      title: '6.5 The "Skill" Workflow — For Repeatable, Well-Defined Tasks',
      content: 'For tasks your team performs regularly, create a Skill. This gives the entire team a consistent, battle-tested workflow.'
    },
    {
      type: 'code',
      language: 'bash',
      code: '# Step 1: Identify a repeatable task\n# "We add new API endpoints all the time — let\'s standardize the process"\n\n# Step 2: Create the skill\nmkdir -p .github/skills/add-api-endpoint\n\n# Step 3: Write SKILL.md with context, requirements, constraints, and verification\n\n# Step 4: Commit the skill to the repository\n# Now the entire team can use it\n\n# Step 5: Invoke the skill\n/skill add-api-endpoint "Add a GET /users/:id/orders endpoint"\n\n# Step 6: Review the result\n# The skill ensures consistency across the team'
    },

    // ============================================================
    // PART 7: DOS AND DON'TS
    // ============================================================
    {
      type: 'section',
      title: 'Part 7: Dos and Don\'ts — Maximizing Productivity, Minimizing Pain',
      content: 'Understanding what works and what doesn\'t is what separates power users from frustrated experimenters.'
    },
    {
      type: 'checklist',
      title: '✅ DO — Practices That Work',
      items: [
        '**Review everything**: Copilot writes code; you approve it. Always check logic, security, and performance.',
        '**Provide adequate context**: Use `copilot-instructions.md` and `@` mentions to give Copilot context.',
        '**Use comments as prompts**: A comment above your cursor is the strongest signal Copilot has.',
        '**Start small**: Pick one small, well-defined feature. Give Copilot three attempts. Review the output like you\'re mentoring a junior developer.',
        '**Give Copilot a way to verify**: Tests, builds, linters — anything that produces a pass/fail signal.',
        '**Use Skills for repeatable tasks**: Create `SKILL.md` files for tasks your team does frequently.',
        '**Use task files for complex one-offs**: Write a spec file before asking Copilot to implement a complex task.',
        '**Address root causes, not symptoms**: When the build is failing, don\'t just suppress the error — fix the underlying cause.',
        '**Explore the community skills collection**: Browse [awesome-copilot.github.com/skills](https://awesome-copilot.github.com/skills) for pre-built skills[reference:28]'
      ]
    },
    {
      type: 'checklist',
      title: '❌ DON\'T — Practices to Avoid',
      items: [
        '**Don\'t accept verbose code**: Copilot may generate 30 lines when 8 lines would do — review and simplify.',
        '**Don\'t accept fashionable libraries you don\'t use**: Copilot often picks a fashionable library that doesn\'t fit your stack.',
        '**Don\'t accept plausible nonsense**: It calls APIs that don\'t exist or interprets your function name wrong.',
        '**Don\'t let Copilot change too much code at once**: Prefer smaller, focused changes.',
        '**Don\'t skip human oversight**: Code reviews are still essential.',
        '**Don\'t treat Copilot as fully autonomous**: Even in Agent Mode, you\'re still responsible for the final output.',
        '**Don\'t use Copilot on things it\'s not good at**: Novel reasoning or highly specific domain knowledge.'
      ]
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'The Three Big Failure Modes',
      content: 'Almost every productivity problem with Copilot is one of these:\n\n1. **Verbose code** — Copilot generates 30 lines when 8 lines would do.\n2. **Library-of-the-week** — It picks a fashionable library you don\'t use.\n3. **Plausible nonsense** — It calls APIs that don\'t exist or interprets your function name wrong.\n\nEach has a counter: be specific, set constraints, and use comments as prompts.'
    },

    // ============================================================
    // PART 8: QUICK CHEAT SHEET
    // ============================================================
    {
      type: 'table',
      columns: ['Topic', 'Best Practice', 'Common Mistake'],
      rows: [
        ['Prompts', 'Be specific — state inputs, outputs, errors, constraints', 'Vague prompts that produce unpredictable results'],
        ['Context', 'Use copilot-instructions.md and @ mentions', 'Assuming Copilot knows your project structure'],
        ['Skills', 'Use SKILL.md for repeatable tasks with bundled assets', 'Writing the same prompt over and over'],
        ['Task Files', 'Use .md spec files for complex one-off tasks', 'Trying to explain complex tasks in a single chat message'],
        ['Verification', 'Give Copilot tests or builds to verify its work', 'Relying on Copilot to "look done" without verification'],
        ['Code Review', 'Review everything — Copilot writes code; you approve it', 'Accepting Copilot output without review'],
        ['File References', 'Use @file: mentions to include specific files', 'Assuming Copilot knows about files you haven\'t referenced'],
        ['Inline vs Chat', 'Use inline for small tasks, chat for planning, agent for complex work', 'Using inline for tasks that need planning'],
        ['Agent Mode', 'Use for multi-step, well-defined tasks', 'Using Agent Mode for tasks that need constant steering'],
        ['Community Skills', 'Browse awesome-copilot.github.com/skills for pre-built skills', 'Re-inventing the wheel when a skill already exists']
      ]
    },

    // ============================================================
    // CONCLUSION
    // ============================================================
    {
      type: 'callout',
      tone: 'success',
      title: 'Architectural Summary',
      content: 'GitHub Copilot is a powerful collaborator, not a magic code generator. Master it by understanding its four modes (inline, chat, agent, CLI), using `copilot-instructions.md` for persistent context, creating `SKILL.md` files for reusable workflows, and writing task spec files for complex one-off tasks. Leverage the community skills collection at [awesome-copilot.github.com/skills](https://awesome-copilot.github.com/skills) to accelerate your team\'s adoption[reference:29]. Be specific in your prompts — state inputs, outputs, errors, and constraints. Give Copilot a way to verify its work with tests or builds. Review everything. The goal is not to let Copilot write all your code — it\'s to amplify your productivity so you can focus on the problems that truly require human judgment. Copilot is your junior collaborator — you are still the architect.'
    }
  ],
  explanation: 'A comprehensive, enterprise-grade masterclass on using GitHub Copilot effectively in daily development workflows. Covers installation (VS Code, JetBrains, CLI), authentication, inline autocomplete, Copilot Agent Mode, Copilot CLI, Skills (SKILL.md) with community resources from awesome-copilot, prompt crafting for Copilot, day-to-day workflows (chat vs. task files vs. skills), verification loops, token efficiency, dos and don\'ts, and integrating Copilot into your daily coding rhythm.',
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod']
  }
});

export default problem;