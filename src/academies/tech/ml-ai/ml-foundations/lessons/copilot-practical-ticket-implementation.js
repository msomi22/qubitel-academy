import { defineLearningProblem } from '../../../../../problems/problemAuthoring.js';

const problem = defineLearningProblem({
  id: 'ml-foundations-copilot-practical-ticket-implementation',
  category: 'ml-ai',
  topicId: 'ml-foundations',
  title: 'GitHub Copilot in Practice: From Ticket to Shipped Code',
  difficulty: 'Medium',
  prompt: 'A hands-on, practical masterclass that walks through implementing a real-world GitHub ticket using GitHub Copilot. Covers ticket analysis, planning with Copilot Chat, creating reusable Skills (SKILL.md), writing task files for complex work, implementing with inline autocomplete and Agent Mode, writing tests, reviewing code, and creating pull requests — all with Copilot as your pair programmer. Includes a complete sample ticket, SKILL.md file, task spec, and step-by-step Copilot interactions.',
  tags: ['github-copilot', 'ai', 'productivity', 'practical', 'ticket-implementation', 'workflow', 'hands-on', 'skills', 'real-world'],
  rendering: {
    variant: 'deep-dive',
    density: 'detailed',
    accent: 'emerald'
  },
  body: [
    // ============================================================
    // INTRODUCTION
    // ============================================================
    {
      type: 'section',
      title: 'Architectural Introduction: From Ticket to Shipped Code',
      content: 'This masterclass is different from the others — it\'s a **hands-on walkthrough** of implementing a real-world GitHub ticket using GitHub Copilot. You\'ll see exactly how a senior developer takes a ticket, plans the work, uses Copilot\'s different modes (inline, chat, agent, CLI), creates reusable Skills, writes task files, and ships the code. By the end, you\'ll have a complete workflow you can apply to your own tickets.'
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'The Senior Developer\'s Workflow',
      content: 'The workflow we\'ll follow is: **Ticket → Plan → Skill/Task File → Implement → Test → Review → Ship**. Each step uses Copilot differently, and knowing which mode to use at each step is the key to productivity.'
    },

    // ============================================================
    // PART 1: THE TICKET
    // ============================================================
    {
      type: 'section',
      title: 'Part 1: The Ticket — A Real GitHub Issue',
      content: 'We\'ll implement a ticket from a fictional e-commerce platform. The ticket is a GitHub issue with a story, acceptance criteria, and technical notes.'
    },
    {
      type: 'code',
      language: 'markdown',
      code: '# GitHub Issue #342: Add Email Validation to User Registration\n\n**Title:** Add email validation and verification to user registration flow\n\n**Type:** Feature\n\n**Priority:** High\n\n**Story:**\nAs a new user,\nI want to receive a verification email when I register\nSo that I can confirm my email address and secure my account.\n\n**Acceptance Criteria:**\n- [ ] Email validation: Must be a valid format (RFC 5322 compatible)\n- [ ] Email verification: Send a verification email with a 6-digit code\n- [ ] Code expiry: Verification code expires after 15 minutes\n- [ ] Rate limiting: Max 3 verification requests per email per hour\n- [ ] Resend: Users can request a new code up to 3 times\n- [ ] Database: Store verification status in user table\n- [ ] API: Add /verify endpoint for code confirmation\n- [ ] Tests: Unit tests for validation, integration tests for verification flow\n\n**Technical Notes:**\n- Use existing `EmailService` for sending emails\n- Use `Redis` for storing verification codes (TTL support)\n- Add validation to `UserRegistrationDto`\n- Follow existing test patterns in `tests/unit/`\n- API response format: `{ success: boolean, message: string, data?: any }`\n\n**Estimated Effort:** 4-6 hours\n\n**Related Issues:** #341 (User Registration), #310 (Email Service)'
    },

    // ============================================================
    // PART 2: PLANNING WITH COPILOT CHAT
    // ============================================================
    {
      type: 'section',
      title: 'Part 2: Planning with Copilot Chat — "Explore → Plan → Code"',
      content: 'Before writing any code, we use Copilot Chat to explore the codebase and plan the approach. This saves time by catching misunderstandings early.'
    },

    // --- 2.1 Explore Phase ---
    {
      type: 'section',
      title: '2.1 Explore Phase — Understanding the Codebase',
      content: 'First, we ask Copilot to help us understand the existing registration flow and email service.'
    },
    {
      type: 'code',
      language: 'bash',
      code: '# In Copilot Chat:\n\n"@src/auth/ explain the user registration flow"\n\n# Copilot responds with:\n# The registration flow is in src/auth/registration.service.ts\n# 1. User submits registration data via POST /api/auth/register\n# 2. Validation runs via UserRegistrationDto (Zod schema)\n# 3. Password is hashed using bcrypt\n# 4. User is created in the database\n# 5. JWT token is generated and returned\n# 6. No email verification is currently implemented\n\n"@src/email/email.service.ts explain the email service"\n\n# Copilot responds with:\n# EmailService is in src/email/email.service.ts\n# Uses Nodemailer with SMTP transport\n# Methods: sendEmail(to, subject, html), sendTemplate(template, data)\n# Can be extended for verification emails'
    },

    // --- 2.2 Plan Phase ---
    {
      type: 'section',
      title: '2.2 Plan Phase — Designing the Solution',
      content: 'Next, we work with Copilot to design the approach and identify what needs to be created or modified.'
    },
    {
      type: 'code',
      language: 'bash',
      code: '# In Copilot Chat:\n\n"Based on the registration flow and email service, what needs to change to add email verification?"\n\n# Copilot responds with a plan:\n\n# 1. MODIFY: src/auth/dto/user-registration.dto.ts\n#    - Add email validation (RFC 5322 compatible regex or library)\n#\n# 2. MODIFY: src/auth/registration.service.ts\n#    - After creating user, generate 6-digit code\n#    - Store code in Redis with 15-minute TTL\n#    - Send verification email via EmailService\n#    - Track verification status in user table\n#\n# 3. CREATE: src/auth/verification.service.ts\n#    - generateCode(): string\n#    - storeCode(email, code): void (Redis)\n#    - verifyCode(email, code): boolean\n#    - getAttemptCount(email): number\n#    - incrementAttempts(email): number\n#\n# 4. CREATE: src/auth/verification.controller.ts\n#    - POST /verify with email and code\n#    - GET /resend with email\n#\n# 5. CREATE: tests/unit/verification.service.test.ts\n# 6. CREATE: tests/integration/verification-flow.test.ts'
    },

    // --- 2.3 Generate Task File ---
    {
      type: 'section',
      title: '2.3 Generate Task File — Capturing the Plan',
      content: 'Once the plan is clear, we ask Copilot to generate a task file that captures everything. This serves as our implementation specification.'
    },
    {
      type: 'code',
      language: 'bash',
      code: '# In Copilot Chat:\n\n"Write a task spec file for this implementation in markdown. Include the objective, context, requirements, constraints, and verification steps."\n\n# Copilot generates the task file. We save it as:\n# task-files/email-verification-implementation.md'
    },
    {
      type: 'code',
      language: 'markdown',
      code: '# task-files/email-verification-implementation.md\n\n## Objective\nAdd email validation and verification to the user registration flow.\n\n## Context\n- Registration flow: `src/auth/registration.service.ts`\n- Email service: `src/email/email.service.ts`\n- User DTO: `src/auth/dto/user-registration.dto.ts`\n- Redis client: `src/config/redis.ts`\n- Test patterns: `tests/unit/*.test.ts`, `tests/integration/*.test.ts`\n\n## Requirements\n1. **Email Validation**\n   - Add RFC 5322 compatible validation to `UserRegistrationDto.email`\n   - Use existing Zod validation pattern\n\n2. **Verification Code Generation**\n   - Generate 6-digit numeric code\n   - Store in Redis with key: `verify:{email}:code`\n   - TTL: 15 minutes\n   - Store attempt count with key: `verify:{email}:attempts`\n\n3. **Email Sending**\n   - Send HTML email with code\n   - Use existing EmailService\n\n4. **Verification API**\n   - POST /api/auth/verify\n     - Body: { email, code }\n     - Response: { success, message }\n   - POST /api/auth/resend\n     - Body: { email }\n     - Response: { success, message }\n\n5. **Database Changes**\n   - Add `email_verified` column to User table (boolean, default false)\n   - Add `email_verified_at` timestamp\n   - Run migration\n\n6. **Tests**\n   - Unit: VerificationService (generateCode, storeCode, verifyCode, rate limiting)\n   - Integration: Full registration + verification flow\n   - Edge cases: expired code, max attempts, invalid code\n\n## Constraints\n- Use existing Redis client (see `src/config/redis.ts`)\n- Use existing EmailService\n- Follow existing error handling pattern (ServiceError)\n- API responses must use `{ success, message, data? }` format\n- Must be backward compatible (existing users have email_verified = true)\n\n## Verification\n- `npm run test:unit` — all unit tests pass\n- `npm run test:integration` — all integration tests pass\n- `npm run lint` — no new warnings\n- Manual: Register new user, verify email works\n\n## Files to Create\n- `src/auth/verification.service.ts`\n- `src/auth/verification.controller.ts`\n- `src/auth/dto/verify-email.dto.ts`\n- `tests/unit/verification.service.test.ts`\n- `tests/integration/verification-flow.test.ts`\n\n## Files to Modify\n- `src/auth/dto/user-registration.dto.ts`\n- `src/auth/registration.service.ts`\n- `src/entities/user.entity.ts`\n- `src/email/email-templates/verification.html` (create if needed)'
    },

    // ============================================================
    // PART 3: CREATING A REUSABLE SKILL
    // ============================================================
    {
      type: 'section',
      title: 'Part 3: Creating a Reusable Skill — SKILL.md',
      content: 'Since adding verification flows is a common pattern, we create a reusable Skill that the team can use for future verification implementations.'
    },
    {
      type: 'code',
      language: 'markdown',
      code: '# .github/skills/add-verification-flow/SKILL.md\n---\nname: add-verification-flow\ndescription: Add a verification flow (email, SMS, 2FA) with code generation, storage, rate limiting, and verification endpoints\nversion: 1.0.0\nlicense: MIT\n---\n\n## Objective\nAdd a verification flow to any feature. This skill handles code generation, storage (Redis), rate limiting, expiration, and verification endpoints.\n\n## When to Use\n- Adding email verification to registration\n- Adding SMS verification for phone numbers\n- Adding 2FA code verification\n- Any feature requiring one-time codes\n\n## Context Required\n- What is being verified? (email, phone, etc.)\n- Storage: Redis (TTL support) is recommended\n- User model: Where to store verification status\n\n## Verification Flow Template\n\n### 1. Code Generation\n```typescript\nfunction generateVerificationCode(): string {\n    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit\n}\n```\n\n### 2. Storage Pattern\n```typescript\n// Store code with TTL\nawait redis.setex(`verify:${identifier}:code`, 900, code); // 15 minutes\n\n// Store attempts\nawait redis.incr(`verify:${identifier}:attempts`);\nawait redis.expire(`verify:${identifier}:attempts`, 3600); // 1 hour\n```\n\n### 3. Rate Limiting Pattern\n```typescript\nconst attempts = parseInt(await redis.get(`verify:${identifier}:attempts`) || \'0\');\nif (attempts >= 3) {\n    throw new ServiceError(\'TOO_MANY_ATTEMPTS\', \'Maximum attempts exceeded\');\n}\n```\n\n### 4. Verification Endpoint\n```typescript\n// POST /api/verify\nasync verify(request, reply) {\n    const { identifier, code } = request.body;\n    \n    const storedCode = await redis.get(`verify:${identifier}:code`);\n    if (!storedCode) {\n        throw new ServiceError(\'CODE_EXPIRED\', \'Code expired. Request a new one.\');\n    }\n    \n    if (storedCode !== code) {\n        await redis.incr(`verify:${identifier}:attempts`);\n        throw new ServiceError(\'INVALID_CODE\', \'Invalid verification code\');\n    }\n    \n    // Mark as verified — implement this based on your user model\n    await markVerified(identifier);\n    await redis.del(`verify:${identifier}:code`);\n    await redis.del(`verify:${identifier}:attempts`);\n    \n    return { success: true, message: \'Verified successfully\' };\n}\n```\n\n### 5. Resend Endpoint\n```typescript\n// POST /api/resend\nasync resend(request, reply) {\n    const { identifier } = request.body;\n    \n    const attempts = parseInt(await redis.get(`verify:${identifier}:attempts`) || \'0\');\n    if (attempts >= 3) {\n        throw new ServiceError(\'MAX_RESEND\', \'Maximum resends exceeded. Try again later.\');\n    }\n    \n    const code = generateVerificationCode();\n    await redis.setex(`verify:${identifier}:code`, 900, code);\n    await redis.incr(`verify:${identifier}:attempts`);\n    \n    // Send email/SMS — implement this based on your notification service\n    await sendVerification(identifier, code);\n    \n    return { success: true, message: \'Code sent successfully\' };\n}\n```\n\n## Implementation Notes\n- The `markVerified(identifier)` and `sendVerification(identifier, code)` functions are **placeholders** – you must implement them according to your project\'s domain logic.\n- Store the skill with its examples inside the skill\'s `assets/` or `examples/` directory for portability.\n\n## Verification Checklist\n- [ ] Code is generated and stored with TTL\n- [ ] Rate limiting works (max 3 attempts per hour)\n- [ ] Expired codes are rejected\n- [ ] Verification marks user as verified in database\n- [ ] Resend endpoint works and increments attempts\n- [ ] All unit tests pass\n- [ ] All integration tests pass\n\n## Example\nSee `examples/email-verification-implementation.md` (included in this skill\'s `examples/` folder) for a complete implementation.'
    },

    // ============================================================
    // PART 4: IMPLEMENTATION WITH COPILOT
    // ============================================================
    {
      type: 'section',
      title: 'Part 4: Implementation with Copilot — Step by Step',
      content: 'Now we use Copilot\'s different modes to implement the ticket, following the task file we created.'
    },

    // --- 4.1 Setup: Load the Task File ---
    {
      type: 'section',
      title: '4.1 Setup: Load the Task File into Copilot',
      content: 'First, we load the task file into Copilot Chat to give it full context.'
    },
    {
      type: 'code',
      language: 'bash',
      code: '# In Copilot Chat:\n\n"@task-files/email-verification-implementation.md implement this plan step by step"\n\n# Copilot acknowledges the plan and asks for confirmation:\n\n"I\'ve reviewed the task file. I\'ll implement this step by step:\n\n1. Create verification.service.ts\n2. Create verification.controller.ts\n3. Create verify-email.dto.ts\n4. Update user-registration.dto.ts\n5. Update registration.service.ts\n6. Update user.entity.ts\n7. Create tests\n8. Create migration\n\nShall I start with the service?"'
    },

    // --- 4.2 Step 1: Create the Service (Inline + Chat) ---
    {
      type: 'section',
      title: '4.2 Step 1: Create the Verification Service',
      content: 'We use a combination of Inline Autocomplete and Chat to create the service.'
    },
    {
      type: 'code',
      language: 'typescript',
      code: '// In src/auth/verification.service.ts:\n\n// Start with a comment\n// Verification service for email verification codes. Handles generation, storage, rate limiting, and verification.\n\n// Type the function signature\nclass VerificationService {\n    private readonly redis: Redis;\n    private readonly emailService: EmailService;\n\n// Copilot suggests the full implementation based on the task file context\n'
    },
    {
      type: 'code',
      language: 'typescript',
      code: '// Completed implementation (reviewed and accepted):\n\nimport { Redis } from "ioredis";\nimport { EmailService } from "../email/email.service";\nimport { ServiceError } from "../shared/service-error";\n\nconst CODE_TTL = 900; // 15 minutes\nconst MAX_ATTEMPTS = 3;\nconst ATTEMPTS_TTL = 3600; // 1 hour\n\nexport class VerificationService {\n    constructor(\n        private readonly redis: Redis,\n        private readonly emailService: EmailService\n    ) {}\n\n    generateCode(): string {\n        return Math.floor(100000 + Math.random() * 900000).toString();\n    }\n\n    async storeCode(identifier: string, code: string): Promise<void> {\n        await this.redis.setex(`verify:${identifier}:code`, CODE_TTL, code);\n        // Reset attempts when a new code is generated\n        await this.redis.setex(`verify:${identifier}:attempts`, ATTEMPTS_TTL, "0");\n    }\n\n    async getCode(identifier: string): Promise<string | null> {\n        return await this.redis.get(`verify:${identifier}:code`);\n    }\n\n    async incrementAttempts(identifier: string): Promise<number> {\n        const attempts = await this.redis.incr(`verify:${identifier}:attempts`);\n        await this.redis.expire(`verify:${identifier}:attempts`, ATTEMPTS_TTL);\n        return attempts;\n    }\n\n    async getAttempts(identifier: string): Promise<number> {\n        return parseInt(await this.redis.get(`verify:${identifier}:attempts`) || "0");\n    }\n\n    async canAttempt(identifier: string): Promise<boolean> {\n        const attempts = await this.getAttempts(identifier);\n        return attempts < MAX_ATTEMPTS;\n    }\n\n    async verify(identifier: string, code: string): Promise<boolean> {\n        const storedCode = await this.getCode(identifier);\n        \n        if (!storedCode) {\n            throw new ServiceError("CODE_EXPIRED", "Verification code expired. Request a new one.");\n        }\n\n        const attempts = await this.getAttempts(identifier);\n        if (attempts >= MAX_ATTEMPTS) {\n            throw new ServiceError("MAX_ATTEMPTS", "Maximum verification attempts exceeded.");\n        }\n\n        if (storedCode !== code) {\n            await this.incrementAttempts(identifier);\n            throw new ServiceError("INVALID_CODE", "Invalid verification code.");\n        }\n\n        // Verified successfully\n        await this.redis.del(`verify:${identifier}:code`);\n        await this.redis.del(`verify:${identifier}:attempts`);\n        return true;\n    }\n\n    async sendVerificationCode(identifier: string, code: string): Promise<void> {\n        await this.emailService.sendTemplate("verification", {\n            to: identifier,\n            code: code,\n            expiresIn: "15 minutes"\n        });\n    }\n}'
    },

    // --- 4.3 Step 2: Create the Controller (Agent Mode) ---
    {
      type: 'section',
      title: '4.3 Step 2: Create the Verification Controller (Agent Mode)',
      content: 'For the controller, we use Agent Mode to let Copilot work autonomously, following the pattern from the task file.'
    },
    {
      type: 'code',
      language: 'bash',
      code: '# In Copilot Chat with Agent Mode enabled:\n\n"Create src/auth/verification.controller.ts following the pattern from the task file. Include POST /verify and POST /resend endpoints."\n\n# Copilot Agent Mode:\n# - Reads the task file for endpoint specifications\n# - Examines existing controllers for patterns\n# - Creates the controller with both endpoints\n# - Adds validation for request bodies\n# - Uses the VerificationService\n# - Handles errors consistently\n\n# The agent completes the work and shows the diff'
    },
    {
      type: 'code',
      language: 'typescript',
      code: '// src/auth/verification.controller.ts (generated by Agent Mode)\n\nimport { FastifyReply, FastifyRequest } from "fastify";\nimport { VerificationService } from "./verification.service";\nimport { VerifyEmailDto } from "./dto/verify-email.dto";\nimport { ResendCodeDto } from "./dto/resend-code.dto";\n\nconst BASE_RESPONSE = { success: false, message: "", data: null };\n\nexport class VerificationController {\n    constructor(private readonly verificationService: VerificationService) {}\n\n    async verify(request: FastifyRequest<{ Body: VerifyEmailDto }>, reply: FastifyReply) {\n        const { email, code } = request.body;\n\n        try {\n            const verified = await this.verificationService.verify(email, code);\n            return reply.status(200).send({\n                success: true,\n                message: "Email verified successfully",\n                data: { email, verified }\n            });\n        } catch (error) {\n            return reply.status(400).send({\n                success: false,\n                message: error.message,\n                data: null\n            });\n        }\n    }\n\n    async resend(request: FastifyRequest<{ Body: ResendCodeDto }>, reply: FastifyReply) {\n        const { email } = request.body;\n\n        try {\n            const canAttempt = await this.verificationService.canAttempt(email);\n            if (!canAttempt) {\n                return reply.status(429).send({\n                    success: false,\n                    message: "Too many resend attempts. Please try again later."\n                });\n            }\n\n            const code = this.verificationService.generateCode();\n            await this.verificationService.storeCode(email, code);\n            await this.verificationService.sendVerificationCode(email, code);\n            await this.verificationService.incrementAttempts(email);\n\n            return reply.status(200).send({\n                success: true,\n                message: "Verification code sent successfully"\n            });\n        } catch (error) {\n            return reply.status(400).send({\n                success: false,\n                message: error.message,\n                data: null\n            });\n        }\n    }\n}'
    },

    // --- 4.4 Step 3: Update DTOs (Inline Autocomplete) ---
    {
      type: 'section',
      title: '4.4 Step 3: Update DTOs (Inline Autocomplete)',
      content: 'For the DTO updates, we use Inline Autocomplete for speed.'
    },
    {
      type: 'code',
      language: 'typescript',
      code: '// In src/auth/dto/user-registration.dto.ts:\n\n// Add email validation to the existing DTO\n// Valid email format (RFC 5322 compatible)\n\n// Zod schema already exists — we add the validation\nconst emailSchema = z.string()\n    .email("Invalid email format")  // Zod\'s built-in email validation\n    .min(5, "Email too short")\n    .max(255, "Email too long")\n    .transform((val) => val.toLowerCase());\n\n// Copilot suggests the complete DTO with validation\n'
    },

    // --- 4.5 Step 4: Write Tests (Chat + Inline) ---
    {
      type: 'section',
      title: '4.5 Step 4: Write Tests (Chat + Inline)',
      content: 'We use Copilot Chat to generate tests, then review and refine.'
    },
    {
      type: 'code',
      language: 'bash',
      code: '# In Copilot Chat:\n\n"Write unit tests for VerificationService covering:\n- generateCode returns a 6-digit string\n- storeCode stores with correct TTL\n- verify succeeds with correct code\n- verify fails with expired code\n- verify fails with wrong code\n- rate limiting: max 3 attempts per hour\n\nFollow the existing test pattern in tests/unit/\nUse Jest"'
    },
    {
      type: 'code',
      language: 'typescript',
      code: '// tests/unit/verification.service.test.ts (generated and reviewed)\n\nimport { Redis } from "ioredis";\nimport { VerificationService } from "../../src/auth/verification.service";\nimport { EmailService } from "../../src/email/email.service";\n\njest.mock("ioredis");\njest.mock("../../src/email/email.service");\n\ndescribe("VerificationService", () => {\n    let service: VerificationService;\n    let mockRedis: jest.Mocked<Redis>;\n    let mockEmailService: jest.Mocked<EmailService>;\n    const testEmail = "test@example.com" as const;\n\n    beforeEach(() => {\n        mockRedis = new Redis() as jest.Mocked<Redis>;\n        mockEmailService = new EmailService() as jest.Mocked<EmailService>;\n        service = new VerificationService(mockRedis, mockEmailService);\n    });\n\n    test("generateCode returns a 6-digit string", () => {\n        const code = service.generateCode();\n        expect(code).toMatch(/^\\d{6}$/);\n    });\n\n    test("storeCode stores with correct TTL", async () => {\n        const code = "123456";\n        await service.storeCode(testEmail, code);\n        expect(mockRedis.setex).toHaveBeenCalledWith(\n            `verify:${testEmail}:code`,\n            900,\n            code\n        );\n    });\n\n    test("verify succeeds with correct code", async () => {\n        const code = "123456";\n        mockRedis.get.mockResolvedValueOnce(code); // getCode\n        mockRedis.get.mockResolvedValueOnce("0");   // getAttempts\n        const result = await service.verify(testEmail, code);\n        expect(result).toBe(true);\n        expect(mockRedis.del).toHaveBeenCalledWith(`verify:${testEmail}:code`);\n    });\n\n    test("verify fails with expired code", async () => {\n        mockRedis.get.mockResolvedValueOnce(null);\n        await expect(service.verify(testEmail, "123456")).rejects.toThrow(\n            "Verification code expired. Request a new one."\n        );\n    });\n\n    test("verify fails with wrong code", async () => {\n        mockRedis.get.mockResolvedValueOnce("123456"); // stored code\n        mockRedis.get.mockResolvedValueOnce("0");       // attempts\n        await expect(service.verify(testEmail, "999999")).rejects.toThrow(\n            "Invalid verification code."\n        );\n        expect(mockRedis.incr).toHaveBeenCalled();\n    });\n\n    test("rate limiting prevents attempts after 3 failures", async () => {\n        mockRedis.get.mockResolvedValueOnce("3"); // attempts\n        const canAttempt = await service.canAttempt(testEmail);\n        expect(canAttempt).toBe(false);\n    });\n});'
    },

    // --- 4.6 Step 5: Verify with Copilot ---
    {
      type: 'section',
      title: '4.6 Step 5: Verify with Copilot — Run Tests and Fix Issues',
      content: 'After implementation, we ask Copilot to run tests and fix any failures.'
    },
    {
      type: 'code',
      language: 'bash',
      code: '# In Copilot Chat:\n\n"Run the tests for the verification feature and fix any failures"\n\n# Copilot:\n# - Runs `npm run test:unit`\n# - Identifies any test failures\n# - Fixes the issues by updating the test or implementation\n# - Re-runs tests until all pass\n\n"Run the integration tests"\n\n# Copilot:\n# - Runs `npm run test:integration`\n# - Fixes any integration issues\n# - Verifies the full flow works: register → verify → success'
    },

    // ============================================================
    // PART 5: CODE REVIEW WITH COPILOT
    // ============================================================
    {
      type: 'section',
      title: 'Part 5: Code Review with Copilot — Review Your Own Code',
      content: 'After implementation, we use Copilot to review the code we\'ve written, catching issues before the PR.'
    },
    {
      type: 'code',
      language: 'bash',
      code: '# In Copilot Chat:\n\n"Review the changes I\'ve made for the email verification feature. Check for:\n1. Security issues\n2. Performance issues\n3. Missing edge cases\n4. Code quality\n5. Consistency with existing patterns"\n\n# Copilot responds with a code review:\n\n"Here\'s my review:\n\n✅ **Security**: Good — codes expire, rate limiting is in place, no sensitive data in logs\n✅ **Performance**: Redis TTL and attempts are efficient. Consider adding a cleanup job for orphaned entries.\n⚠️ **Edge Cases**: If the user resends a code, should we reset the code TTL? Consider what happens if the user changes their email after verification.\n📝 **Code Quality**: Good separation of concerns. Consider extracting rate limiting logic to a shared service.\n✅ **Consistency**: Follows existing patterns. Good use of ServiceError and response format."'
    },

    // ============================================================
    // PART 6: CREATE PULL REQUEST
    // ============================================================
    {
      type: 'section',
      title: 'Part 6: Create Pull Request — Using Copilot CLI',
      content: 'Finally, we use Copilot CLI to create a PR with a comprehensive description.'
    },
    {
      type: 'code',
      language: 'bash',
      code: '# In Copilot CLI:\n\ncopilot "Generate a PR description for the email verification feature. Include:\n- What changed\n- Why it was done (ticket #342)\n- Testing performed\n- Screenshots of the email\n- Any migration instructions"\n\n# Copilot generates a PR description:\n\n## #342: Add Email Validation and Verification\n\n### What Changed\n- Added email validation to UserRegistrationDto\n- Added VerificationService for code generation, storage, and verification\n- Added /api/auth/verify endpoint\n- Added /api/auth/resend endpoint\n- Added email_verified and email_verified_at columns\n- Added unit and integration tests\n- Created reusable add-verification-flow skill\n\n### Why\nUsers need to verify their email to secure their accounts. This prevents bot registrations and ensures valid email addresses.\n\n### Testing\n- Unit tests: 12 tests passing\n- Integration tests: 6 tests passing\n- Manual testing: Registered new user, verified email, confirmed DB updated\n\n### Migration\nRun `npm run migration:run` to add the new columns. Existing users will have email_verified = true.\n\n### Related Issues\nCloses #342'
    },

    // ============================================================
    // PART 7: LESSONS LEARNED
    // ============================================================
    {
      type: 'section',
      title: 'Part 7: Lessons Learned — What Worked and What Didn\'t',
      content: 'Here\'s what we learned from implementing this ticket with Copilot.'
    },
    {
      type: 'checklist',
      title: 'What Worked Well',
      items: [
        '**Task file as single source of truth**: Having the plan in a markdown file meant Copilot always had the full context, even after long conversations.',
        '**Explore → Plan → Code workflow**: This three-phase approach prevented costly rework.',
        '**Agent Mode for boilerplate**: The controller and service were generated quickly with minimal steering.',
        '**Inline Autocomplete for small changes**: Updating DTOs and writing simple functions was fastest with inline suggestions.',
        '**Copilot for testing**: Generated comprehensive tests that caught edge cases I might have missed.',
        '**Reusable Skill**: The `add-verification-flow` skill will save time on future verification features.'
      ]
    },
    {
      type: 'checklist',
      title: 'What Could Have Gone Better',
      items: [
        '**Copilot over-optimized Redis interactions**: It suggested using `pipeline()` for operations that were fine as individual calls — I simplified.',
        '**Agent Mode required supervision**: It tried to generate the migration file with a complex down/up pattern that didn\'t match our project\'s style.',
        '**Email template generation**: Copilot generated a basic HTML template that needed significant design adjustments.',
        '**Test structure**: The integration tests were correct but didn\'t use our project\'s test utilities — I had to adjust them.'
      ]
    },
    {
      type: 'callout',
      tone: 'info',
      title: 'Copilot Is a Pair Programmer, Not a Replacement',
      content: 'Throughout this implementation, Copilot wrote code, but I made every decision. I reviewed every line, caught edge cases, simplified over-engineered code, and ensured consistency with the project\'s architecture. Copilot accelerated me — it didn\'t replace me. This is the mindset that makes AI-assisted development productive, not dangerous.'
    },

    // ============================================================
    // PART 8: REFERENCE MATERIALS
    // ============================================================
    {
      type: 'section',
      title: 'Part 8: Reference Materials — Files Created',
      content: 'Here\'s a complete list of all files created and modified during this implementation, with their purpose.'
    },
    {
      type: 'table',
      columns: ['File', 'Type', 'Purpose'],
      rows: [
        ['`task-files/email-verification-implementation.md`', 'Task Spec', 'Complete implementation plan used throughout the work'],
        ['`.github/skills/add-verification-flow/SKILL.md`', 'Reusable Skill', 'Team skill for adding verification flows to any feature'],
        ['`src/auth/verification.service.ts`', 'Business Logic', 'Code generation, storage, rate limiting, verification'],
        ['`src/auth/verification.controller.ts`', 'API Layer', 'POST /verify and POST /resend endpoints'],
        ['`src/auth/dto/verify-email.dto.ts`', 'DTO', 'Request validation for verification endpoint'],
        ['`src/auth/dto/resend-code.dto.ts`', 'DTO', 'Request validation for resend endpoint'],
        ['`src/auth/dto/user-registration.dto.ts`', 'DTO (Modified)', 'Added email validation to existing DTO'],
        ['`src/auth/registration.service.ts`', 'Business Logic (Modified)', 'Added verification code generation and email sending after registration'],
        ['`src/entities/user.entity.ts`', 'Entity (Modified)', 'Added `email_verified` and `email_verified_at` columns'],
        ['`tests/unit/verification.service.test.ts`', 'Unit Tests', 'Jest tests for VerificationService'],
        ['`tests/integration/verification-flow.test.ts`', 'Integration Tests', 'Full registration → verification flow tests']
      ]
    },

    // ============================================================
    // PART 9: QUICK REFERENCE — COPILOT WORKFLOW SUMMARY
    // ============================================================
    {
      type: 'table',
      columns: ['Step', 'Copilot Mode', 'Action', 'Why This Mode'],
      rows: [
        ['1. Explore', 'Chat', '"@src/auth/ explain the registration flow"', 'Chat is best for exploration — you can ask follow-up questions'],
        ['2. Plan', 'Chat', '"Plan the implementation based on the ticket"', 'Chat for brainstorming and refining the approach'],
        ['3. Create Task File', 'Chat', '"Write a task spec file"', 'Chat can generate structured markdown from the plan'],
        ['4. Create Skill', 'Chat', '"Create a reusable skill for this pattern"', 'Chat helps structure the skill with proper frontmatter'],
        ['5. Service', 'Chat + Inline', '"Create verification.service.ts"', 'Chat for the initial generation, inline for refinements'],
        ['6. Controller', 'Agent Mode', '"Create verification.controller.ts"', 'Agent Mode can work autonomously and maintain the right patterns'],
        ['7. DTO Updates', 'Inline', 'Type the Zod schema, Copilot fills the rest', 'Inline is fastest for small, predictable changes'],
        ['8. Tests', 'Chat', '"Write unit tests for VerificationService"', 'Chat generates complete test files quickly'],
        ['9. Verify', 'Chat', '"Run tests and fix failures"', 'Chat can run commands and iterate on failures'],
        ['10. Review', 'Chat', '"Review the changes for security, performance, edge cases"', 'Chat provides structured review with categories'],
        ['11. PR', 'CLI', '"Generate a PR description"', 'CLI is convenient when you\'re already in the terminal']
      ]
    },

    // ============================================================
    // CONCLUSION
    // ============================================================
    {
      type: 'callout',
      tone: 'success',
      title: 'Architectural Summary',
      content: 'This walkthrough demonstrates the complete workflow from ticket to shipped code using GitHub Copilot:\n\n1. **Ticket → Plan**: Use Copilot Chat to explore the codebase and design the solution\n2. **Plan → Task File**: Capture the plan in a markdown file as your implementation spec\n3. **Task File → Skill**: For repeatable patterns, create a reusable SKILL.md\n4. **Implementation**: Use the right Copilot mode for each task — inline for small changes, Chat for guidance, Agent Mode for autonomous work\n5. **Verification**: Have Copilot run tests and fix failures\n6. **Review**: Use Copilot to review your own code before PR\n7. **Ship**: Generate PR descriptions with Copilot CLI\n\nThe key insight is that Copilot is not a magic code generator — it\'s a **pair programmer**. It accelerates you, but you are still responsible for architecture, security, performance, and quality. Used this way, Copilot doesn\'t replace your judgment — it amplifies it.\n\n**Next Steps**: Apply this workflow to your next ticket. Create a task file, use Copilot to implement it, and reflect on what worked and what didn\'t. Over time, you\'ll develop a workflow that feels natural and dramatically increases your productivity.'
    }
  ],
  explanation: 'A hands-on, practical masterclass that walks through implementing a real-world GitHub ticket using GitHub Copilot. Covers ticket analysis, planning with Copilot Chat, creating reusable Skills (SKILL.md), writing task files for complex work, implementing with inline autocomplete and Agent Mode, writing tests, reviewing code, and creating pull requests — all with Copilot as your pair programmer. Includes a complete sample ticket, SKILL.md file, task spec, and step-by-step Copilot interactions.',
  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod']
  }
});

export default problem;