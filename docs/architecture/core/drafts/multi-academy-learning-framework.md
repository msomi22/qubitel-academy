# Multi-Academy Learning Framework Specification

## Document Status

This document defines the target architecture, product experience, extension model, and implementation standards for a reusable mobile-first learning platform.

The platform should support multiple academies from the same core system, including:

- CBC Academy for Grade 1–8 learners
- Tech Academy for developers
- CX Academy for customer experience training
- Future academies without core rewrites

The design goal is to make the system behave like a framework:

> Core engine stays stable. Academies, modules, themes, content, and selected components are added or overridden through configuration and extension points.

---

# 1. Vision

Build a world-class mobile-first learning framework that supports children, students, parents, teachers, and professional learners through a unified but customizable platform.

The platform must support:

- Grade-based learning
- Track-based learning
- Lessons
- Notes
- Roadmaps
- Lesson plans
- Teacher notes
- Student notes
- Topic practice
- Exams
- Results
- Progress tracking
- Read-aloud learning
- Visual walkthroughs
- Code walkthroughs
- Videos
- Rewards
- Badges
- Themes
- Academy-specific UI overrides

---

# 2. Design Principles

## 2.1 Mobile First

The system must be designed primarily for mobile users.

Requirements:

- Small screen optimized layouts
- Large tap targets
- Simple navigation
- Bottom navigation where useful
- Minimal scrolling on critical tasks
- Fast loading
- Offline-friendly where possible
- One-hand usage where possible

## 2.2 Few Clicks to Learning

The user should reach learning content quickly.

CBC example:

```text
Choose Grade
→ Choose Subject
→ Choose Learn / Practice / Exam
→ Start
```

Tech example:

```text
Choose Academy
→ Choose Track
→ Choose Topic
→ Learn / Practice / Visualize / Code
```

## 2.3 Framework First

The platform is not only a CBC app.

It is a reusable learning framework.

Academies should be added through configuration, module registration, content files, and optional overrides.

## 2.4 Configuration Before Custom Code

Prefer configuration over hardcoded logic.

Examples:

- Theme tokens
- Navigation labels
- Academy structure
- Module structure
- Reward rules
- Exam scoring rules
- Unlock rules

## 2.5 Core Stability

The core should not change every time a new academy, module, topic, or grade is added.

New learning experiences should be added through:

- Academy config
- Module config
- Content registry
- Theme config
- Optional overrides

---

# 3. User Roles

## 3.1 Student / Learner

Can:

- Select academy
- Select grade, track, or module
- Learn lessons
- Read notes
- Listen to read-aloud content
- Watch videos
- Practice questions
- Take exams
- View results
- Earn stars
- Unlock badges
- Unlock UI rewards
- Resume progress

## 3.2 Parent

Can:

- View child progress
- View weak areas
- View exam results
- View earned badges
- View learning time
- Guide the learner
- See recommended next steps

## 3.3 Teacher

Can:

- View class progress
- Assign lessons
- Assign quizzes
- Assign exams
- Review performance
- Identify weak areas
- Access lesson plans and teacher notes

## 3.4 Admin / Content Manager

Can:

- Add academies
- Add modules
- Add subjects
- Add lessons
- Add quizzes
- Add exams
- Configure themes
- Configure rewards
- Publish/unpublish content

---

# 4. Academy Model

An academy defines a learning universe.

Examples:

```text
cbc
tech
cx
```

Each academy owns:

- Name
- Audience
- Theme
- Navigation model
- Modules
- Content labels
- Optional UI overrides
- Reward model
- Progress model
- Exam model

Example:

```ts
export const cbcAcademyConfig = {
  id: "cbc",
  name: "CBC Academy",
  audience: "Grade 1–8 learners",
  navigationModel: "grade-subject-topic",
  defaultTheme: "cbc-light",
  supportedThemes: ["cbc-light", "cbc-dark", "cbc-grade-1-cartoon"],
  modules: ["grade-1", "grade-2", "grade-3"],
};
```

Example:

```ts
export const techAcademyConfig = {
  id: "tech",
  name: "Tech Academy",
  audience: "Developers and software learners",
  navigationModel: "track-topic-problem",
  defaultTheme: "tech-dark",
  supportedThemes: ["tech-dark", "tech-light"],
  modules: ["dsa", "backend", "frontend", "databases"],
};
```

---

# 5. Module Model

A module is a large learning area inside an academy.

CBC examples:

- Grade 1
- Grade 2
- Grade 3

Tech examples:

- DSA
- Backend
- Frontend
- Databases
- System Design

CX examples:

- Customer Support
- Communication
- Ticket Handling

Each module can define:

- Topics
- Lessons
- Notes
- Practices
- Exams
- Visualizations
- Videos
- Rewards
- Overrides

---

# 6. Theme System

## 6.1 Theme Requirement

The platform must support:

- Light theme
- Dark theme
- Grade-specific themes
- Academy-specific themes
- Easily tunable design tokens

Themes must not be hardcoded inside components.

## 6.2 Theme Tokens

All visual parameters should be configurable.

Example theme tokens:

```ts
export const cbcGrade1LightTheme = {
  id: "cbc-grade-1-light",
  mode: "light",

  colors: {
    background: "#FFF8EA",
    surface: "#FFFFFF",
    primary: "#7C3AED",
    secondary: "#F59E0B",
    success: "#22C55E",
    danger: "#EF4444",
    text: "#1F2937",
    mutedText: "#6B7280",
  },

  radius: {
    card: "24px",
    button: "999px",
  },

  spacing: {
    xs: "4px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
  },

  typography: {
    fontFamily: "Inter, system-ui, sans-serif",
    headingWeight: 800,
    bodyWeight: 500,
    baseSize: "16px",
  },

  components: {
    cardVariant: "cartoon",
    buttonSize: "large",
    showMascot: true,
    showDecorations: true,
  },
};
```

## 6.3 Theme Modes

Each academy should support theme switching:

```text
Light
Dark
System
Grade-specific
```

## 6.4 Theme Tuning

Admin or config should allow easy tuning of:

- Colors
- Card radius
- Button radius
- Spacing
- Font scale
- Icon style
- Mascot visibility
- Animation intensity
- Reward effects

---

# 7. CBC Academy Experience

## 7.1 Main CBC Flow

```text
Open App
→ Choose CBC Academy
→ Choose Grade
→ Choose Subject
→ Choose Learn / Practice / Exams
```

## 7.2 Grade 1 Example Flow

```text
Grade 1
→ English
→ Learn
→ Choose Lesson
→ Read / Listen / Practice
→ Take Quiz
→ Earn Stars
→ Unlock Badge
```

## 7.3 CBC Subject Screen

Each subject should show:

- Continue learning
- Learn
- Practice
- Exams
- Progress
- Badges

Example:

```text
English

Continue
[Sounds and Letters]

Main Actions
[Learn]
[Practice]
[Exams]

Progress
Lessons: 6 / 20
Quizzes: 4 / 20
Exams: 1 / 5
```

## 7.4 CBC Lesson Detail

A lesson should contain:

- Title
- Objective
- Read-aloud button
- Student note
- Teacher note
- Examples
- Visuals
- Practice
- Quiz
- Next step

Example:

```text
Lesson: Sounds and Letters

Objective:
Learn the sounds a, e, i, o, u.

Student Note:
A sound helps us read words.

Examples:
a - apple
e - egg

Actions:
[Read Aloud]
[Start Practice]
[Start Quiz]
```

## 7.5 CBC Exams

Exam flow:

```text
Choose Exam
→ Start Exam
→ Answer Questions
→ Submit
→ View Score
→ View Stars
→ View Corrections
→ Retry / Continue
```

## 7.6 CBC Reward Rules

Example star rules:

```ts
export const starRules = [
  { minScore: 90, stars: 5 },
  { minScore: 80, stars: 4 },
  { minScore: 70, stars: 3 },
  { minScore: 50, stars: 2 },
  { minScore: 0, stars: 1 },
];
```

## 7.7 CBC Celebration Rules

When a learner performs well:

```text
Score > 90%
→ Show congratulations overlay
→ Award 5 stars
→ Unlock badge
→ Play celebration animation
```

Example:

```ts
export const celebrationRules = {
  excellentScore: {
    minScore: 90,
    message: "Amazing work!",
    animation: "confetti",
    badgeUnlock: true,
  },
};
```

## 7.8 CBC Badges

Badge examples:

- Reading Star
- Spelling Hero
- Math Explorer
- Exam Champion
- 5-Day Streak
- Perfect Score
- Retry Champion

## 7.9 UI Feature Unlocks

Learners may unlock cosmetic features:

- New avatar frame
- New dashboard background
- New badge shelf
- New mascot expression
- New celebration effect

Important rule:

> Do not lock core learning content behind performance. Unlock cosmetic and motivational features only.

---

# 8. Tech Academy Experience

## 8.1 Main Tech Flow

```text
Tech Academy
→ DSA
→ Dynamic Programming
→ Lessons / Notes / Practice / Visual Walkthrough / Code
```

## 8.2 DSA Module

DSA module can include tracks:

- Arrays
- Strings
- Two Pointers
- Sliding Window
- Recursion
- Dynamic Programming
- Graphs
- Trees
- Heaps
- Greedy
- Binary Search

## 8.3 Dynamic Programming Topic

Example structure:

```text
DSA
→ Dynamic Programming
  → Overview
  → Roadmap
  → Lessons
  → Notes
  → Visual Walkthroughs
  → Code Walkthroughs
  → Practice
  → Quizzes
  → Assessments
  → Videos
```

## 8.4 Tech Lesson Content

A tech lesson should support:

- Theory explanation
- Intuition
- Visual walkthrough
- Code walkthrough
- Complexity analysis
- Common mistakes
- Practice problems
- Video explanation
- Quiz
- Related topics

## 8.5 Code Walkthrough

Code walkthrough should support:

- Syntax-highlighted code
- Step-by-step execution
- Variable state
- Call stack
- Memory model
- Recursion tree
- Complexity explanation

## 8.6 Recursion Visualization

For recursion-heavy topics, the system should support:

- Recursive call tree
- Stack frame visualization
- Base case highlighting
- Return value animation
- Repeated subproblem detection
- Memoization visualization

Example for Fibonacci:

```text
fib(5)
├── fib(4)
│   ├── fib(3)
│   └── fib(2)
└── fib(3)
```

## 8.7 Video Support

Lessons may include videos:

```ts
videos: [
  {
    title: "Understanding Dynamic Programming",
    provider: "youtube",
    url: "...",
    duration: "12:30",
  }
]
```

Video should be optional.

The lesson must still work without video.

---

# 9. CX Academy Experience

CX can use the same engine with different labels.

Example flow:

```text
CX Academy
→ Communication Skills
→ Handling Difficult Customers
→ Scenario
→ Simulation
→ Assessment
```

CX content types:

- Lessons
- Scenarios
- Role-play simulations
- Scripts
- Assessments
- Feedback

---

# 10. Content Schema

## 10.1 Base Lesson Schema

```ts
export type Lesson = {
  id: string;
  title: string;
  summary: string;
  objectives: string[];
  studentNotes?: string[];
  teacherNotes?: string[];
  contentBlocks: ContentBlock[];
  quizIds?: string[];
  practiceIds?: string[];
  videoIds?: string[];
  visualizationIds?: string[];
};
```

## 10.2 Content Block Schema

```ts
export type ContentBlock =
  | TextBlock
  | ImageBlock
  | AudioBlock
  | VideoBlock
  | CodeBlock
  | VisualizationBlock
  | CalloutBlock
  | QuizBlock;
```

## 10.3 Visualization Block

```ts
export type VisualizationBlock = {
  type: "visualization";
  visualizationType:
    | "recursion-tree"
    | "call-stack"
    | "array-window"
    | "graph-traversal"
    | "dp-table"
    | "memory-model";
  data: unknown;
};
```

## 10.4 Exam Schema

```ts
export type Exam = {
  id: string;
  title: string;
  description: string;
  durationMinutes?: number;
  questions: Question[];
  scoring: ScoringConfig;
  rewardRules?: RewardRule[];
};
```

---

# 11. Read-Aloud and Speech

## 11.1 Principle

Do not build a custom speech engine initially.

Build a speech abstraction layer.

## 11.2 Speech Service

```text
SpeechService
→ BrowserSpeechProvider
→ CloudTtsProvider
→ RecordedAudioProvider
→ FutureProvider
```

## 11.3 Read-Aloud Features

Required for CBC Grade 1–3:

- Play
- Pause
- Stop
- Replay
- Slow speed
- Normal speed
- Highlight sentence being read
- Read instructions aloud
- Read question aloud
- Optional voice selection

## 11.4 Provider Strategy

Phase 1:

- Browser text-to-speech

Phase 2:

- Cloud-generated premium audio
- Cached audio

Phase 3:

- Speech-to-text for pronunciation and reading practice

---

# 12. Practice and Assessment Engine

## 12.1 Practice Types

Supported practice types:

- Multiple choice
- Fill in the blank
- Matching
- Spelling
- Ordering
- Short answer
- Code answer
- Drag and drop
- Scenario response

## 12.2 Result Screen

Result screen should show:

- Score
- Stars
- Correct answers
- Wrong answers
- Explanation
- Retry button
- Next recommendation

## 12.3 Star Rules

Default:

```text
90–100% = 5 stars
80–89% = 4 stars
70–79% = 3 stars
50–69% = 2 stars
0–49% = 1 star
```

## 12.4 Feedback

Feedback must be friendly and age-appropriate.

Grade 1 example:

```text
Great try! Let us learn this again together.
```

Grade 8 example:

```text
Review the explanation and retry the weak areas.
```

Tech example:

```text
Your approach works, but the time complexity can be improved.
```

---

# 13. Gamification

## 13.1 Reward Types

- Stars
- Badges
- Streaks
- Progress rings
- Confetti
- Avatar items
- UI skins
- Completion certificates

## 13.2 Badge Unlock Examples

```text
Complete 5 lessons → Learning Starter
Score 90%+ in exam → Exam Champion
Retry and improve → Growth Mindset
Complete DP basics → DP Beginner
Complete recursion visualizer → Recursion Explorer
```

## 13.3 Safety Rule

Rewards should encourage learning, not shame learners.

Avoid:

- Public ranking for young kids
- Punitive messaging
- Locking essential content
- Excessive pressure

---

# 14. Progress Engine

## 14.1 Free Users

Free users may use browser storage.

Stored locally:

- Last lesson
- Completed quizzes
- Recent scores
- Basic progress

## 14.2 Paid Users

Paid users get cloud sync.

Stored in backend:

- Cross-device progress
- Long-term results
- Parent dashboard
- Teacher reports
- Badges
- Certificates

## 14.3 Progress Model

Track:

- Lesson completion
- Practice attempts
- Exam attempts
- Best score
- Last score
- Stars
- Badges
- Streaks
- Weak areas

---

# 15. Component Override System

## 15.1 Resolution Order

```text
Module override
→ Academy override
→ Core component
```

Alternative acceptable order:

```text
Academy + module specific override
→ Academy override
→ Core component
```

## 15.2 Example

For CBC Grade 1 LessonCard:

```text
academies/cbc/modules/grade-1/overrides/LessonCard.tsx
→ academies/cbc/overrides/LessonCard.tsx
→ core/components/LessonCard.tsx
```

## 15.3 Rule

Core components must be generic.

Bad:

```ts
if (grade === "grade-1") showMascot();
```

Good:

```ts
if (theme.components.showMascot) showMascot();
```

---

# 16. Recommended Folder Structure

```text
src/
  app/
    App.tsx
    routes.tsx
    providers.tsx

  core/
    components/
    layouts/
    hooks/
    services/
    types/
    utils/
    constants/

  platform/
    academy/
      academyRegistry.ts
      academyResolver.ts
      overrideResolver.ts
      moduleLoader.ts

    content/
      contentRegistry.ts
      contentSchema.ts
      lessonEngine.ts
      quizEngine.ts
      examEngine.ts

    progress/
      progressService.ts
      localProgressStore.ts
      cloudProgressStore.ts

    speech/
      speechService.ts
      providers/
        browserSpeechProvider.ts
        cloudTtsProvider.ts
        recordedAudioProvider.ts

    rewards/
      rewardEngine.ts
      starRules.ts
      badgeRegistry.ts
      unlockEngine.ts

    theme/
      themeRegistry.ts
      themeResolver.ts
      themeTokens.ts

  academies/
    cbc/
      academy.config.ts
      theme.config.ts
      navigation.config.ts
      routes.config.ts
      reward.config.ts
      modules/
        grade-1/
          module.config.ts
          subjects/
            english/
              subject.config.ts
              lessons/
              quizzes/
              exams/
              notes/
          overrides/
        grade-2/
        grade-3/
      overrides/
        components/
        layouts/

    tech/
      academy.config.ts
      theme.config.ts
      navigation.config.ts
      modules/
        dsa/
          module.config.ts
          tracks/
            dynamic-programming/
              topic.config.ts
              lessons/
              notes/
              practices/
              visualizations/
              videos/
        backend/
        frontend/

    cx/
      academy.config.ts
      theme.config.ts
      navigation.config.ts
      modules/
        communication/
        support-skills/

  shared/
    ui/
    icons/
    assets/
    styles/
```

---

# 17. Routing Strategy

The platform should support both path-based and domain-based academy resolution.

## 17.1 Path Based

```text
/academy/cbc
/academy/tech
/academy/cx
```

## 17.2 Subdomain Based

```text
cbc.academy.qubitel.net
academy.qubitel.net
cx.academy.qubitel.net
```

## 17.3 Route Labels

CBC can use:

```text
Grades
Subjects
Lessons
Exams
```

Tech can use:

```text
Tracks
Topics
Problems
Assessments
```

Same route engine.

Different labels.

---

# 18. Quality Standards

## 18.1 TypeScript

Use TypeScript strict mode.

Required:

- Strict types
- Explicit content schemas
- No untyped content imports
- No `any` unless justified

## 18.2 Linting and Formatting

Required:

- ESLint
- Prettier
- Import order rules
- No circular dependencies

## 18.3 Testing

Required:

- Unit tests for engines
- Component tests for reusable UI
- Integration tests for academy loading
- E2E tests for critical flows

Critical E2E flows:

- Grade 1 English lesson read-aloud flow
- Grade 1 English exam with stars and badge
- Tech DSA dynamic programming lesson
- Theme switch light/dark
- Paid progress sync
- Free browser progress

---

# 19. Accessibility Standards

The platform should follow WCAG-aligned principles.

Requirements:

- Visible focus states
- Keyboard navigation
- High color contrast
- Screen reader labels
- Reduced motion support
- Large touch targets
- Captions/transcripts for video where possible
- Audio alternatives

Kids-specific requirements:

- Simple language
- Large buttons
- Read-aloud support
- Friendly error messages

---

# 20. Child Safety and Privacy

Requirements:

- Minimal child data collection
- Parent-controlled accounts where needed
- No public leaderboard for young children by default
- No unsafe messaging
- Safe avatars and badges
- No manipulative reward loops
- Clear parent visibility
- No unnecessary location collection

---

# 21. Performance Standards

Requirements:

- Lazy load academies
- Lazy load modules
- Lazy load videos
- Lazy load visualization engines
- Cache content where safe
- PWA-ready
- Fast first load
- Optimized images
- Minimal JavaScript for young learner flows

---

# 22. Monetization Model

Free user:

- Browser progress
- Limited cloud sync
- Basic lessons
- Basic practice

Paid user:

- Account
- Permanent cloud progress
- Parent dashboard
- Advanced reports
- Premium exams
- Premium audio
- More badges/certificates
- Multi-device sync

Rule:

> Free users should still have a useful learning experience.

---

# 23. Example Scenarios

## 23.1 CBC Grade 1 English Read-Aloud Scenario

```text
Learner opens app.
Learner selects CBC Academy.
Learner selects Grade 1.
Learner selects English.
Learner selects Learn.
Learner selects "Sounds and Letters".
Learner taps Read Aloud.
Text is highlighted sentence by sentence.
Learner starts quiz.
Learner completes quiz.
Learner receives score.
Learner receives stars.
If score is above 90%, learner receives 5 stars.
Congratulations overlay appears.
Badge may unlock.
Progress is saved.
```

## 23.2 CBC Grade 1 Exam Scenario

```text
Learner selects Grade 1.
Learner selects English.
Learner selects Exams.
Learner chooses Exam 1.
Learner answers questions.
Learner submits.
System calculates score.
System assigns stars.
System shows corrections.
System unlocks badge if rule matches.
Parent can later view result.
```

## 23.3 Tech DSA Dynamic Programming Scenario

```text
Learner opens Tech Academy.
Learner selects DSA.
Learner selects Dynamic Programming.
Learner opens "Introduction to DP".
Learner reads notes.
Learner watches optional video.
Learner opens visual walkthrough.
System shows recursion tree and repeated subproblems.
Learner opens code walkthrough.
System shows code, call stack, variables, and DP table.
Learner practices problems.
Progress is saved.
```

---

# 24. Readiness Review Against Target Requirements

## Requirement: Light and Dark Theme

Supported.

The document defines a theme token system with light, dark, grade-specific, and academy-specific themes.

## Requirement: Easy Theme Tuning

Supported.

Tokens allow tuning colors, spacing, typography, radius, animation, component variants, and mascot visibility.

## Requirement: Add Tech Module

Supported.

The academy/module model supports Tech Academy and DSA module.

## Requirement: Add DSA Dynamic Programming Track

Supported.

The Tech section defines DSA tracks and the Dynamic Programming topic structure.

## Requirement: Lessons, Notes, Practice, Code Walkthroughs

Supported.

The content schema supports text, code, visualizations, videos, practice, quizzes, and exams.

## Requirement: Recursion Visualizations

Supported.

The visualization schema includes recursion tree, call stack, memory model, DP table, and related visual types.

## Requirement: Video Explanations

Supported.

Video blocks are included as optional lesson content.

## Requirement: Kid Selects Grade 1 → English → Lesson

Supported.

The CBC flow explicitly supports this.

## Requirement: Guided Read-Aloud

Supported.

SpeechService and read-aloud features are defined.

## Requirement: Exams and Results

Supported.

Exam engine and result screen are defined.

## Requirement: Stars Based on Score

Supported.

Star rules are defined.

## Requirement: Congratulations Overlay

Supported.

Celebration rules are defined.

## Requirement: Unlock Badges

Supported.

Badge and reward engine are defined.

## Requirement: Unlock Better UI Features

Supported.

Cosmetic unlocks are defined with safety rules.

---

# 25. Implementation Roadmap

## Phase 1: Platform Foundation

Build:

- Academy registry
- Theme registry
- Module loader
- Content schema
- Core layouts
- Core navigation
- Override resolver

## Phase 2: CBC MVP

Build:

- Grade selector
- Subject selector
- Grade 1 English
- Lessons
- Read aloud
- Quiz
- Exam
- Result screen
- Stars

## Phase 3: Rewards

Build:

- Badge registry
- Reward engine
- Celebration overlay
- UI unlocks

## Phase 4: Tech Academy

Build:

- Tech academy config
- DSA module
- Dynamic Programming topic
- Code walkthrough
- Recursion visualization
- Video block support

## Phase 5: Progress

Build:

- Browser storage for free users
- Cloud sync for paid users
- Parent dashboard
- Teacher dashboard

## Phase 6: Expansion

Add:

- More CBC grades
- More subjects
- More Tech tracks
- CX Academy
- Additional academies

---

# 26. Non-Negotiable Engineering Rules

1. No academy-specific logic inside core.
2. No hardcoded grade names inside reusable components.
3. No direct localStorage usage outside progress services.
4. No direct speech API usage inside UI components.
5. No direct payment logic inside UI components.
6. No duplicated screen logic across academies.
7. All content must pass schema validation.
8. All themes must use tokens.
9. Overrides must follow the documented resolution order.
10. Essential learning content must not be locked behind gamification.

---

# 27. Final Verdict

This design is ready to become the foundation for implementation.

It supports:

- Mobile-first CBC learning
- Grade-specific kid-friendly UI
- Light and dark themes
- Easily tunable theme tokens
- Tech Academy
- CX Academy
- DSA and Dynamic Programming
- Recursion visualizations
- Code walkthroughs
- Video explanations
- Read-aloud support
- Exams
- Results
- Stars
- Congratulations overlays
- Badges
- Cosmetic UI unlocks
- Free browser progress
- Paid cloud progress
- Parent and teacher dashboards
- Future academies without core rewrites

The platform should now be implemented as a reusable learning framework, with CBC, Tech, and CX added as academies on top of the shared core.


---

# 28. Zero-Hardcoding Architecture

## 28.1 Principle

The platform should be designed so that business behavior, academy behavior, labels, navigation, themes, scoring, rewards, content, and feature availability are not hardcoded inside React components.

The React code should render and execute based on configuration, schemas, registries, and provider contracts.

## 28.2 What Must Not Be Hardcoded

The following must not be hardcoded in UI components:

- Academy names
- Grade names
- Subject names
- Track names
- Topic names
- Route labels
- Button labels
- Menu labels
- Theme colors
- Font sizes
- Card variants
- Exam scoring rules
- Star rules
- Badge unlock rules
- Celebration messages
- Feature flags
- Payment rules
- Language text
- Read-aloud settings
- Progress storage strategy
- Academy-specific layout behavior
- Content type labels

Bad example:

```tsx
<button>Start Grade 1 English</button>
```

Good example:

```tsx
<button>{t(action.labelKey)}</button>
```

Bad example:

```tsx
if (academy === "cbc") {
  showGrades();
}
```

Good example:

```tsx
renderNavigation(currentAcademy.navigationModel);
```

## 28.3 What Can Exist in Code

Code may contain:

- Generic rendering engines
- Generic routing engine
- Generic assessment engine
- Generic progress engine
- Generic speech interface
- Generic theme resolver
- Generic override resolver
- Type definitions
- Schema validation
- Utility functions
- Default fallback components

Code should not contain academy-specific business decisions unless it is inside an academy module or override.

---

# 29. Configuration-Driven System

## 29.1 Configuration Sources

The system should support configuration from:

- Local TypeScript config files
- JSON/YAML content files
- Remote backend config
- Feature flag service
- CMS or admin portal in future

## 29.2 Config Categories

The platform should define configs for:

```text
Academy Config
Module Config
Navigation Config
Theme Config
Localization Config
Feature Config
Reward Config
Assessment Config
Progress Config
Speech Config
Payment Config
Content Config
Route Config
```

## 29.3 Academy Config Example

```ts
export const academyConfig = {
  id: "cbc",
  nameKey: "academy.cbc.name",
  defaultLocale: "en",
  supportedLocales: ["en", "sw", "zh", "ru", "fr", "ar"],
  themeIds: ["cbc-light", "cbc-dark", "cbc-grade-1-cartoon"],
  navigationModel: "grade-subject-topic",
  modules: ["grade-1", "grade-2", "grade-3"],
  features: {
    readAloud: true,
    exams: true,
    badges: true,
    parentDashboard: true,
    teacherDashboard: true,
  },
};
```

## 29.4 Feature Config Example

```ts
export const featureConfig = {
  readAloud: {
    enabled: true,
    provider: "browser",
    highlightText: true,
    defaultRate: 0.85,
  },

  rewards: {
    stars: true,
    badges: true,
    confetti: true,
    cosmeticUnlocks: true,
  },

  videos: {
    enabled: true,
    providers: ["youtube", "cloudflare-stream", "self-hosted"],
  },
};
```

---

# 30. Overrideable Core Features

## 30.1 Principle

All core features should have default behavior, but academies should be able to override behavior when needed.

Core provides defaults.

Academy overrides customize experience.

## 30.2 Overrideable Features

Academies should be able to override:

- Layouts
- Cards
- Navigation
- Lesson renderer
- Quiz renderer
- Exam renderer
- Result screen
- Reward rules
- Badge rules
- Theme tokens
- Read-aloud behavior
- Progress strategy
- Payment strategy
- Content rendering
- Visualization rendering
- Dashboard widgets
- Parent dashboard sections
- Teacher dashboard sections

## 30.3 Override Contract

Override resolution:

```text
Module-specific override
→ Academy-specific override
→ Core default
```

Example:

```text
tech/dsa/dynamic-programming/overrides/VisualizationRenderer
→ tech/overrides/VisualizationRenderer
→ core/VisualizationRenderer
```

## 30.4 Provider-Based Overrides

Use provider interfaces for behavior.

Example:

```ts
export interface SpeechProvider {
  speak(input: SpeakInput): Promise<void>;
  pause(): void;
  resume(): void;
  stop(): void;
}
```

Academies can configure:

```ts
speechProvider: "browser"
speechProvider: "cloud"
speechProvider: "recorded-audio"
```

## 30.5 Engine-Based Overrides

Core engines should accept config, not hardcoded rules.

Example:

```ts
calculateStars(score, rewardConfig.starRules);
```

Not:

```ts
if (score > 90) return 5;
```

---

# 31. Internationalization and Localization

## 31.1 Principle

The platform must support global languages from the start.

The UI must not contain hardcoded visible strings.

All visible text should use translation keys.

Supported examples:

- English
- Kiswahili
- Chinese
- Russian
- French
- Arabic
- Spanish
- Portuguese
- Hindi

## 31.2 Language Switching

Users should be able to switch language globally.

Language may be determined by:

- User selection
- Browser language
- Academy default
- Parent/teacher preference

## 31.3 Localization Files

Example structure:

```text
src/
  i18n/
    locales/
      en/
        common.json
        cbc.json
        tech.json
        rewards.json
      sw/
        common.json
        cbc.json
        tech.json
        rewards.json
      zh/
        common.json
        cbc.json
        tech.json
        rewards.json
      ru/
        common.json
        cbc.json
        tech.json
        rewards.json
```

## 31.4 Translation Key Example

```json
{
  "common.start": "Start",
  "common.continue": "Continue",
  "rewards.congratulations": "Congratulations!",
  "cbc.grade1.english.title": "Grade 1 English",
  "tech.dsa.dynamicProgramming.title": "Dynamic Programming"
}
```

React usage:

```tsx
<h1>{t("cbc.grade1.english.title")}</h1>
<button>{t("common.start")}</button>
```

## 31.5 Right-to-Left Language Support

The platform should support RTL languages such as Arabic and Hebrew.

Theme/layout must support:

```text
direction: ltr
direction: rtl
```

Config example:

```ts
export const localeConfig = {
  locale: "ar",
  direction: "rtl",
};
```

## 31.6 Localized Content

Lessons, questions, exams, notes, and video metadata should support localization.

Example:

```ts
titleKey: "tech.dsa.dynamicProgramming.lesson1.title"
summaryKey: "tech.dsa.dynamicProgramming.lesson1.summary"
```

For full localized content:

```text
content/en/tech/dsa/dynamic-programming/
content/zh/tech/dsa/dynamic-programming/
content/ru/tech/dsa/dynamic-programming/
```

## 31.7 Read-Aloud Localization

Read-aloud must respect language and voice.

Example:

```ts
speech: {
  locale: "en-US",
  voicePreference: "child-friendly",
  rate: 0.85
}
```

For Chinese:

```ts
speech: {
  locale: "zh-CN",
  rate: 0.9
}
```

For Russian:

```ts
speech: {
  locale: "ru-RU",
  rate: 0.9
}
```

## 31.8 Localization Quality Rules

Translations should support:

- Different word lengths
- Different sentence structures
- Pluralization
- Date formats
- Number formats
- Directionality
- Voice availability
- Fallback language

Fallback example:

```text
zh-CN → zh → en
ru-RU → ru → en
```

---

# 32. Config-First Readiness Review

## Requirement: All system configs are never hardcoded

Supported after this update.

The document now explicitly defines configuration categories and forbids hardcoded system behavior inside UI components.

## Requirement: Nothing is hardcoded in code

Mostly supported with a practical clarification.

The correct target is:

> No business behavior, academy behavior, labels, content, theme values, scoring rules, reward rules, or feature behavior should be hardcoded in components.

Some generic framework logic must still exist in code, such as engines, validators, resolvers, and interfaces.

## Requirement: Purely config driven

Supported.

The platform should be config-driven through academy, module, theme, navigation, reward, speech, progress, assessment, and localization configs.

## Requirement: All core features can be overridden by specific academies

Supported.

The document now defines overrideable layouts, renderers, engines, providers, reward rules, progress behavior, speech behavior, and dashboard sections.

## Requirement: Switch to global languages like English, Chinese, Russian

Supported.

The document now includes internationalization, localization files, translation keys, RTL support, content localization, read-aloud localization, and fallback language strategy.

---

# 33. Final Architecture Rule

The final rule for implementation:

> If changing the experience requires editing a shared React component, the framework is not yet flexible enough.

A new academy, module, language, theme, reward model, or content type should be added through configuration, content files, registries, providers, or overrides.



---

# 34. Multi-Domain and Tenant Resolution

## 34.1 Principle

The platform must support multiple domains and subdomains where each domain resolves to the correct academy, theme, navigation, modules, and content.

The same React application can serve many academies.

The academy is selected by a tenant resolver before rendering the app experience.

## 34.2 Example Domain Mapping

```text
cbc.academy.qubitel.net  → CBC Academy
academy.qubitel.net → Tech Academy
cx.academy.qubitel.net   → CX Academy
```

Expected behavior:

```text
Grade 1 learner visits cbc.academy.qubitel.net
→ App resolves academyId = "cbc"
→ Loads CBC content
→ Shows CBC grades, subjects, lessons, quizzes, exams

IT student visits academy.qubitel.net
→ App resolves academyId = "tech"
→ Loads Tech content
→ Shows Tech tracks such as DSA, Backend, Frontend, Databases

Customer support specialist visits cx.academy.qubitel.net
→ App resolves academyId = "cx"
→ Loads CX content
→ Shows CX modules such as Communication, Support Skills, Ticket Handling
```

## 34.3 Important Correction

Tech and CX domains should not land on CBC content.

They should land on their own academy content.

Correct mapping:

```text
cbc.academy.qubitel.net  → CBC content
academy.qubitel.net → Tech content
cx.academy.qubitel.net   → CX content
```

## 34.4 Tenant Resolver

The platform should include a tenant resolver.

Example:

```ts
export function resolveTenantFromHost(hostname: string): string {
  const mappings = {
    "cbc.academy.qubitel.net": "cbc",
    "academy.qubitel.net": "tech",
    "cx.academy.qubitel.net": "cx",
  };

  return mappings[hostname] ?? "default";
}
```

## 34.5 Runtime Boot Flow

Application boot sequence:

```text
1. Read current hostname
2. Resolve academyId from hostname
3. Load academy config
4. Load academy theme
5. Load academy navigation
6. Load academy modules
7. Load localization config
8. Load feature config
9. Render academy shell
```

## 34.6 Academy Host Config

Each academy should define allowed hosts.

Example:

```ts
export const cbcAcademyConfig = {
  id: "cbc",
  hosts: ["cbc.academy.qubitel.net", "cbc.academy.qubitel.net"],
  defaultRoute: "/",
  modules: ["grade-1", "grade-2", "grade-3"],
};
```

Example:

```ts
export const techAcademyConfig = {
  id: "tech",
  hosts: ["academy.qubitel.net"],
  defaultRoute: "/",
  modules: ["dsa", "backend", "frontend", "databases"],
};
```

Example:

```ts
export const cxAcademyConfig = {
  id: "cx",
  hosts: ["cx.academy.qubitel.net", "cx.academy.qubitel.net"],
  defaultRoute: "/",
  modules: ["communication", "support-skills", "ticket-handling"],
};
```

## 34.7 Fallback Behavior

If hostname is unknown:

```text
academy.qubitel.net
→ Show academy selector

unknown.academy.qubitel.net
→ Show not configured page or academy selector
```

Do not silently load CBC for unknown domains unless configured intentionally.

## 34.8 Local Development Support

Local development should support host-based testing.

Example `/etc/hosts` entries:

```text
127.0.0.1 cbc.academy.qubitel.net
127.0.0.1 academy.qubitel.net
127.0.0.1 cx.academy.qubitel.net
```

Dev server:

```text
http://cbc.academy.qubitel.net:5173
http://academy.qubitel.net:5173
http://cx.academy.qubitel.net:5173
```

## 34.9 Deployment Support

The deployment platform should route all academy domains to the same frontend application.

The frontend then resolves the correct academy from hostname.

Possible deployment model:

```text
Same React build
Same CDN/static hosting
Multiple domains/subdomains
Runtime academy resolution
```

## 34.10 Domain Resolution Readiness

Requirement: Grade 1 student uses `cbc.academy.qubitel.net` and lands on CBC content.

Supported.

Requirement: IT student uses `academy.qubitel.net` and lands on Tech content.

Supported.

Requirement: Customer support specialist uses `cx.academy.qubitel.net` and lands on CX content.

Supported.

The document now explicitly defines host-based tenant resolution.
