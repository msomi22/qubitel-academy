import { defineLearningProblem } from '../../../../../problems/problemAuthoring.js';

const problem = defineLearningProblem({
  id: 'ml-foundations-claude-code-zero-to-hero',
  category: 'ml-ai',
  topicId: 'ml-foundations',
  title: 'Claude Code: From Zero to Hero',
  difficulty: 'Medium',
  prompt: 'A rigorous, production-grade masterclass on using Claude Code effectively in daily development workflows. Covers installation, authentication, context engineering with CLAUDE.md, subdirectory overrides, the /init command, prompt crafting, agentic workflows (explore → plan → code), subagents, slash commands, MCP (Model Context Protocol), token efficiency, dos and don\'ts, day-to-day workflows (interactive vs. task files), and integrating Claude into your daily coding rhythm.',
  tags: ['claude-code', 'ai', 'productivity', 'agentic-workflows', 'mcp', 'developer-tools', 'anthropic'],
  rendering: {
    variant: 'deep-dive',
    density: 'detailed',
    accent: 'violet'
  },
  body: [
    // ============================================================
    // INTRODUCTION
    // ============================================================
    {
      type: 'section',
      title: 'Architectural Introduction: The Terminal-Native Agentic Assistant',
      content: 'Claude Code is a terminal-native agentic assistant capable of reading your entire codebase, running commands, making changes, and working autonomously through problems while you watch, redirect, or step away entirely. It has full file system access, command execution capabilities, and subagent support. This masterclass teaches you not only *how* to install and use Claude Code, but also *when* to use it (vs. other tools), *how* to craft prompts that get the right output, *how* to manage context and tokens efficiently, and *what* pitfalls to avoid — transforming you from a casual user into a power user who consistently ships better code, faster.'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'The Senior Developer\'s Mindset on Claude Code',
      content: 'Claude Code is intentionally unopinionated and scriptable. The best way to use it is with explicit context, clear feedback loops, and a willingness to step in and steer. It doesn\'t replace your judgment — it amplifies it.'
    },

    // ============================================================
    // PART 1: SETUP AND INITIALIZATION
    // ============================================================
    {
      type: 'section',
      title: 'Part 1: Setup and Initialization — Getting Started the Right Way',
      content: 'A clean setup avoids 80% of "it doesn\'t listen" complaints. Proper installation, authentication, and initial configuration are the foundation of effective AI-assisted development.'
    },

    // --- 1.1 Installation ---
    {
      type: 'section',
      title: '1.1 Installation and Authentication',
      content: 'Claude Code is a global CLI tool that requires API key configuration.'
    },
    {
      type: 'code',
      language: 'bash',
      code: '# Install Claude Code CLI globally\nnpm install -g @anthropic-ai/claude-code\n\n# Set your Anthropic API key (or use OAuth)\nexport ANTHROPIC_API_KEY=sk-...\n\n# Launch Claude Code in your project root\nclaude\n\n# Optional: Install IDE integration (VS Code beta or JetBrains)\n# VS Code marketplace has Claude Code extension (beta)'
    },

    // --- 1.2 Validation Routine ---
    {
      type: 'section',
      title: '1.2 The Five-Minute Validation Routine',
      content: 'Before trusting Claude Code with any real work, run this validation routine to ensure it understands your codebase.'
    },
    {
      type: 'checklist',
      title: 'Claude Code Validation Routine',
      items: [
        'Run tests locally; fix red builds first',
        'Open Claude in repo root: `claude`',
        'Ask it to explain the top-level structure: "Give me an overview of this project\'s architecture"',
        'Request a tiny change: "Add a pre-commit hook that runs the linter"',
        'Review the proposed diff inline',
        'Revert using Checkpoints or `/rewind` if the diff isn\'t acceptable'
      ]
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'Keep Your Repo Buildable',
      content: 'Claude Code performs better when it can reason over an intact, working tree. Always ensure your repo is clean and buildable before starting a Claude session.'
    },

    // ============================================================
    // PART 2: CONTEXT ENGINEERING
    // ============================================================
    {
      type: 'section',
      title: 'Part 2: Context Engineering — Teaching Claude to Understand Your Project',
      content: 'Context is the single most important factor in Claude\'s output quality. Claude\'s context window holds your entire conversation — every message, every file Claude reads, and every command output.'
    },

    // --- 2.1 CLAUDE.md ---
    {
      type: 'section',
      title: '2.1 CLAUDE.md — Claude\'s Persistent Memory',
      content: '`CLAUDE.md` is a special configuration file that Claude automatically pulls into context when starting a conversation. Think of it as a configuration file that Claude automatically incorporates into every conversation, ensuring it always knows your project structure, coding standards, and preferred workflows.'
    },
    {
      type: 'code',
      language: 'markdown',
      code: '# CLAUDE.md — Project Context for Claude Code\n\n## Overview\n- App type: Full-stack web (Next.js + FastAPI)\n- Key modules: /web (Next.js), /api (FastAPI), /infra (IaC)\n- Primary workflows: feature branch via PR; tests must pass; small diffs preferred\n\n## Environment\n- Node 20.x, Python 3.11, Postgres 15\n- Local setup: `docker compose up -d` then `make dev`\n\n## Commands\n- Build: `make build`\n- Test: `make test` (must pass before PR)\n- Lint: `make lint`\n- Format: `make format`\n\n## Code Style\n- Type hints required on all functions\n- PEP 8 with 100 character lines\n- No `any` types unless absolutely necessary\n\n## Notes\n- All routes use `/api/v1` prefix\n- JWT tokens expire after 24 hours\n- Use `@dataclass` for simple data containers'
    },

    // --- 2.2 The /init Command ---
    {
      type: 'section',
      title: '2.2 The /init Command — Auto-Generate Your CLAUDE.md',
      content: 'Creating a CLAUDE.md from scratch can feel daunting. The `/init` command automates this process by analyzing your project — reading package files, existing documentation, configuration files, and code structure — then generating a tailored CLAUDE.md.'
    },
    {
      type: 'code',
      language: 'bash',
      code: '# Generate a tailored CLAUDE.md\nclaude /init\n\n# After generating, review and refine:\n# - Add any missing context\n# - Correct any assumptions\n# - Add team-specific conventions\n\n# Think of /init as a starting point, not a finished product.'
    },

    // --- 2.3 Subdirectory Overrides ---
    {
      type: 'section',
      title: '2.3 Subdirectory Overrides — Granular Context for Large Codebases',
      content: 'For large codebases, place concise CLAUDE.md files in subdirectories to provide context specific to each module. Claude automatically reads these as it navigates your project.'
    },
    {
      type: 'code',
      language: 'bash',
      code: '# Project structure with context files\nmy-repo/\n├── CLAUDE.md              # Global project context\n├── api/\n│   └── CLAUDE.md          # API-specific context\n├── frontend/\n│   └── CLAUDE.md          # Frontend-specific context\n└── tests/\n    └── CLAUDE.md          # Test-specific context'
    },

    // ============================================================
    // PART 3: PROMPT CRAFTING
    // ============================================================
    {
      type: 'section',
      title: 'Part 3: Prompt Crafting — Getting the Right Output Every Time',
      content: 'The quality of Claude\'s output is directly proportional to the quality of your prompt. With Claude Code, your natural language prompt guides the entire agentic loop.'
    },

    // --- 3.1 Specific Beats Short ---
    {
      type: 'section',
      title: '3.1 Specific Beats Short — The Most Important Rule',
      content: 'Vague prompts produce unpredictable results. Specific prompts produce tightly constrained, correct output.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// ❌ BAD: Vague prompt produces five different things on five runs\n// parse date\ndef parse_date(s): pass\n\n// ✅ GOOD: Specific prompt produces a tightly constrained function\n// Parse an ISO 8601 datetime string into a timezone-aware datetime.\n// Accept either \'Z\' suffix or explicit \'+00:00\' offset.\n// Raise ValueError on any other format.\ndef parse_date(s: str) -> datetime: pass'
    },

    // --- 3.2 Lead with the Contract ---
    {
      type: 'section',
      title: '3.2 Lead with the Contract — State Inputs, Outputs, and Errors First',
      content: 'State inputs, outputs, errors, and side effects before describing behavior.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// Input: array of orders, each with .totalCents and .currency\n// Output: Map<currency, totalCents> with all currencies present\n// Throws: never (returns empty map for empty input)\n// Side effects: none\nfunction totalsByCurrency(orders: Order[]): Map<string, number> {'
    },

    // --- 3.3 The Explore → Plan → Code Workflow ---
    {
      type: 'section',
      title: '3.3 The Explore → Plan → Code Workflow',
      content: 'Anthropic recommends a three-phase approach for any non-trivial task in Claude Code: **Explore** (understand the codebase and problem), **Plan** (design the approach), **Code** (execute with verification). This structure maximizes the quality of the final result.'
    },
    {
      type: 'code',
      language: 'bash',
      code: '# Phase 1: Explore\n"Give me an overview of how the authentication flow works"\n\n# Phase 2: Plan\n"Based on the auth flow, what changes would be needed to add OAuth2 support?"\n\n# Phase 3: Code\n"Now implement OAuth2 support following the plan we discussed"\n\n# Phase 3 includes verification: run tests, check the build, linter passes'
    },

    // --- 3.4 Template Structure for Prompts ---
    {
      type: 'section',
      title: '3.4 Template Structure — Consistent Prompting for Consistent Results',
      content: 'Use templates for common tasks to ensure consistency.'
    },
    {
      type: 'code',
      language: 'java',
      code: '# <one-line purpose>\n# Args: <each param with type and meaning>\n# Returns: <return shape>\n# Raises: <exception types and triggers>\n# Notes: <constraints, conventions, references>'
    },

    // ============================================================
    // PART 4: AGENTIC WORKFLOWS
    // ============================================================
    {
      type: 'section',
      title: 'Part 4: Agentic Workflows — Letting Claude Work Autonomously',
      content: 'Claude Code can work autonomously through multi-step tasks. The key is giving it a verification mechanism so it can self-correct without your constant supervision.'
    },

    // --- 4.1 The Agentic Loop ---
    {
      type: 'section',
      title: '4.1 The Agentic Loop — Gather, Act, Verify',
      content: 'When you give Claude a task, it works through three phases: gather context, take action, and verify results. Claude uses tools throughout, whether searching files to understand your code, editing to make changes, or running tests to check its work. For complex tasks, it breaks work into steps, executes them, and adjusts based on what it learns.'
    },
    {
      type: 'code',
      language: 'bash',
      code: '# Example: Claude Code fixing a failing test\n# The agentic loop in action:\n\nclaude\n> fix the failing tests in the auth module\n\n# Claude explores the codebase, reads the test file,\n# identifies the failure, plans a fix, applies it,\n# runs the test, verifies it passes, and reports back.\n\n# You can interrupt at any point to steer Claude in a different direction'
    },

    // --- 4.2 Verification Loops ---
    {
      type: 'section',
      title: '4.2 Verification Loops — The Difference Between Watching and Walking Away',
      content: 'Give Claude something that produces a pass or fail, and the loop closes on its own. Claude does the work, runs the check, reads the result, and iterates until the check passes.'
    },
    {
      type: 'code',
      language: 'java',
      code: '// ❌ BAD: Vague verification criteria\n"implement a function that validates email addresses"\n\n// ✅ GOOD: Specific verification criteria with tests\n"write a validateEmail function. example test cases:\n user@example.com is true,\n invalid is false,\n user@.com is false.\n run the tests after implementing"\n\n// Claude implements the function, runs the tests,\n// and iterates until all tests pass.'
    },
    {
      type: 'callout',
      tone: 'success',
      title: 'Verification Strategy Examples',
      content: 'Before | After\n"implement a function that validates email addresses" | "write a validateEmail function. example test cases: [user@example.com] is true, invalid is false, [user@.com] is false. run the tests after implementing"\n\n"make the dashboard look better" | "[paste screenshot] implement this design. take a screenshot of the result and compare it to the original. list differences and fix them"\n\n"the build is failing" | "the build fails with this error: [paste error]. fix it and verify the build succeeds. address the root cause, don\'t suppress the error"'
    },

    // --- 4.3 Subagents ---
    {
      type: 'section',
      title: '4.3 Subagents — Specialized AI Workers for Specific Tasks',
      content: 'Claude Code supports creating custom subagents — specialized AI agents that run in their own context window with custom system prompts, specific tool access, and independent permissions. When Claude encounters a task matching a subagent\'s description, it delegates to that subagent.'
    },
    {
      type: 'code',
      language: 'bash',
      code: '# Create a subagent for security reviews\n# File: .claude/subagents/security-review.md\n\n---\nname: security-review\ndescription: Expert security reviewer for code vulnerabilities\ntools: [read_file, search_content, suggest]\n---\n\nYou are a security expert. Review code for:\n- SQL injection vulnerabilities\n- XSS risks\n- Hardcoded secrets\n- Authentication bypasses\n- Authorization flaws\n\nProvide specific recommendations with line numbers and code examples.\n\n# Usage in conversation:\n> @security-review check the auth module for vulnerabilities'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Subagent Context Savings',
      content: 'Each subagent runs in its own context window, keeping the main conversation\'s context focused and token-efficient. This is especially valuable for large codebases.'
    },

    // --- 4.4 Slash Commands ---
    {
      type: 'section',
      title: '4.4 Slash Commands — Reusable Workflows',
      content: 'For repeatable tasks, save prompts as slash commands in `.claude/commands/` and call them with `/name args`.'
    },
    {
      type: 'code',
      language: 'bash',
      code: '# File: .claude/commands/review.md\n---\nname: review\ndescription: Perform a thorough code review of the current changes\n---\n\nReview the current changes for:\n1. Code quality and readability\n2. Test coverage and edge cases\n3. Security vulnerabilities\n4. Performance implications\n5. API design consistency\n\nProvide specific recommendations with line numbers.\n\n# Usage:\n> /review\n> /review --focus security\n> /review --files src/auth/*.ts'
    },

    // ============================================================
    // PART 5: DAY-TO-DAY WORKFLOWS
    // ============================================================
    {
      type: 'section',
      title: 'Part 5: Day-to-Day Workflows — Integrating Claude Code into Your Daily Coding Rhythm',
      content: 'Here\'s how a senior developer weaves Claude Code into their daily workflow.'
    },

    // --- 5.1 Interactive vs. Task Files ---
    {
      type: 'section',
      title: '5.1 Interactive vs. Task Files — The Critical Workflow Decision',
      content: 'Deciding whether to interact with Claude interactively or via a task file is a critical workflow decision.'
    },
    {
      type: 'table',
      columns: ['Approach', 'When to Use', 'Example'],
      rows: [
        ['**Interactive (Chat)**', 'Quick questions, exploratory work, small changes', '"Explain this function", "What would it take to add OAuth2?"'],
        ['**Interactive with Planning**', 'Medium tasks where you want to steer the approach', '"Plan the OAuth2 implementation, then execute step by step"'],
        ['**Task File (.md)**', 'Complex tasks, multi-step workflows, team collaboration', 'Write a detailed spec in a markdown file, then reference it: `@task-files/refactor-auth.md`'],
        ['**Slash Commands**', 'Repeated tasks', '`/review` for code review, `/test` for running tests with analysis']
      ]
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'When to Write a Task File vs. Chat',
      content: 'If a task is too complex to describe in one or two sentences, write it as a markdown file first. This gives you a chance to think through the requirements, structure the context, and share the spec with your team.'
    },

    // --- 5.2 The Complete Daily Workflow ---
    {
      type: 'section',
      title: '5.2 The Complete Daily Workflow',
      content: 'Here\'s how a senior developer uses Claude Code throughout the day.'
    },
    {
      type: 'checklist',
      title: 'Senior Developer\'s Claude Code Workflow',
      items: [
        '**1. Start with Context**: Run `claude /init` to ensure CLAUDE.md is up to date.',
        '**2. Explore**: Ask Claude for an overview of the area you\'re working on.',
        '**3. Plan**: Work with Claude to design the approach.',
        '**4. Execute**: Write a task file or use interactive prompts to implement.',
        '**5. Verify**: Ask Claude to run tests and fix failures.',
        '**6. Review**: Review all changes Claude made.',
        '**7. Refine**: Ask Claude for improvements, additional tests, or optimization.',
        '**8. Commit**: Commit the changes with a summary generated by Claude.'
      ]
    },

    // ============================================================
    // PART 6: TOKEN EFFICIENCY
    // ============================================================
    {
      type: 'section',
      title: 'Part 6: Token Efficiency — Doing More with Less',
      content: 'Tokens are the currency of AI interactions. The context window is the most important resource to manage.'
    },
    {
      type: 'checklist',
      title: 'Token Efficiency Strategies for Claude Code',
      items: [
        '**Write dense, specific prompts**: Shorter, denser instructions improve compliance and reduce token cost.',
        '**Avoid repeating workflow instructions**: Package guidance into CLAUDE.md and slash commands.',
        '**Use subagents for specialized work**: Each subagent runs in its own context window.',
        '**Summarize long conversations**: Instruct Claude to summarize using a DSL format to filter noise and compress context.',
        '**Review every AI-generated change**: Sometimes Claude generates more verbose code than necessary.',
        '**Use `/clear` to reset**: When the conversation gets long, `/clear` resets the context.'
      ]
    },
    {
      type: 'code',
      language: 'bash',
      code: '# Track context usage in Claude Code\n# Enable a custom status line to see token usage in real-time\n\n# Reduce token usage strategies:\n# 1. Use /init to generate a CLAUDE.md with the right context\n# 2. Be specific in prompts — vague prompts require more back-and-forth\n# 3. Use subagents for large tasks\n# 4. Regularly /clear to reset the conversation'
    },

    // ============================================================
    // PART 7: MCP — MODEL CONTEXT PROTOCOL
    // ============================================================
    {
      type: 'section',
      title: 'Part 7: MCP — Model Context Protocol',
      content: 'Model Context Protocol (MCP) is an open standard developed by Anthropic that standardizes how applications provide context to AI models and agents. MCP servers extend what Claude Code can see and do by connecting AI models to your tools and data.'
    },
    {
      type: 'checklist',
      title: 'What MCP Enables',
      items: [
        'Integrate Code Context with Claude Code and other assistants',
        'AI assistants can help create configurations, find documentation, and get contextual help using natural language',
        'Connect AI models to your tools and data across different environments'
      ]
    },
    {
      type: 'code',
      language: 'bash',
      code: '# Example: Adding an MCP server to Claude Code\n# In Cursor: Settings -> Cursor Settings -> MCP -> Add new global MCP server\n\n# MCP servers can expose specialized knowledge and tools\n# Example: Kendo UI for jQuery AI Coding Assistant integrated into an MCP Server'
    },
    {
      type: 'callout',
      tone: 'warning',
      title: 'MCP Warning — Start with Zero',
      content: 'Don\'t worry too much about MCP servers when starting out — they can blow context. Start with CLAUDE.md and good prompting first. Add MCP servers only when you have a specific, well-defined need that your current setup can\'t handle.'
    },

    // ============================================================
    // PART 8: DOS AND DON'TS
    // ============================================================
    {
      type: 'section',
      title: 'Part 8: Dos and Don\'ts — Maximizing Productivity, Minimizing Pain',
      content: 'Understanding what works and what doesn\'t is what separates power users from frustrated experimenters.'
    },
    {
      type: 'checklist',
      title: '✅ DO — Practices That Work',
      items: [
        '**Review everything**: Claude writes code; you approve it. Always check logic, security, and performance.',
        '**Provide adequate context**: Use CLAUDE.md, subdirectory files, and task files.',
        '**Give Claude a way to verify**: Tests, builds, linters — anything that produces a pass/fail signal.',
        '**Use the Explore → Plan → Code workflow**: This structure maximizes quality.',
        '**Use slash commands for repeatable tasks**: Create `.claude/commands/` for team workflows.',
        '**Use subagents for specialized work**: Each runs in its own context window.',
        '**Write task files for complex one-off tasks**: Plan before you ask Claude to implement.',
        '**Address root causes, not symptoms**: When the build is failing, fix the underlying cause.'
      ]
    },
    {
      type: 'checklist',
      title: '❌ DON\'T — Practices to Avoid',
      items: [
        '**Don\'t treat your big codebase like a small one**: Less of your app fits into Claude\'s context window — be more careful about what goes into it.',
        '**Don\'t trust Claude to be fully autonomous**: Even with agentic capabilities, you\'re still responsible for the final output.',
        '**Don\'t use Claude on things it\'s not good at**: Novel reasoning or highly specific domain knowledge.',
        '**Don\'t skip human oversight**: Code reviews are still essential.',
        '**Don\'t let Claude change too much code at once**: Prefer smaller, focused changes.',
        '**Don\'t add MCP servers before mastering basic prompting**: Start with CLAUDE.md and good prompts first.'
      ]
    },

    // ============================================================
    // PART 9: QUICK CHEAT SHEET
    // ============================================================
    {
      type: 'table',
      columns: ['Topic', 'Best Practice', 'Common Mistake'],
      rows: [
        ['Prompts', 'Be specific — use Explore → Plan → Code workflow', 'Vague prompts that produce unpredictable results'],
        ['Context', 'Use CLAUDE.md, subdirectory files, and /init', 'Assuming Claude knows your project structure'],
        ['Workflow', 'Interactive for exploration, task files for complex work', 'Using interactive for tasks that need detailed planning'],
        ['Verification', 'Give Claude tests or builds to verify its work', 'Relying on Claude to "look done" without verification'],
        ['Tokens', 'Write dense prompts, use subagents, /clear regularly', 'Letting context window fill up and degrade performance'],
        ['Code Review', 'Review everything — Claude writes code; you approve it', 'Accepting Claude output without review'],
        ['MCP', 'Add MCP servers only when you have a specific need', 'Adding MCP servers before mastering basic prompting'],
        ['Subagents', 'Use for specialized, independent tasks', 'Forcing every task through the main conversation'],
        ['Slash Commands', 'Use for repeatable team workflows', 'Re-typing the same prompt over and over']
      ]
    },

    // ============================================================
    // CONCLUSION
    // ============================================================
    {
      type: 'callout',
      tone: 'success',
      title: 'Architectural Summary',
      content: 'Claude Code is a powerful terminal-native agentic assistant. Master it by understanding the Explore → Plan → Code workflow, using CLAUDE.md for persistent context, creating subagents for specialized tasks, and writing task files for complex one-off work. Be specific in your prompts — state inputs, outputs, errors, and constraints. Give Claude a way to verify its work with tests or builds. Review everything. Add MCP servers only when you have a specific need. The goal is not to let Claude write all your code — it\'s to amplify your productivity so you can focus on the problems that truly require human judgment. Claude is your junior collaborator — you are still the architect.'
    }
  ],
  explanation: 'A comprehensive, enterprise-grade masterclass on using Claude Code effectively in daily development workflows. Covers installation, authentication, context engineering with CLAUDE.md, subdirectory overrides, the /init command, prompt crafting, agentic workflows (explore → plan → code), subagents, slash commands, MCP (Model Context Protocol), token efficiency, dos and don\'ts, day-to-day workflows (interactive vs. task files), and integrating Claude Code into your daily coding rhythm.',
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod']
  }
});

export default problem;