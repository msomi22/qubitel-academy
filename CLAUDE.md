# Qubitel Academy - AI Agent Guide

## Project Overview

Qubitel Academy is a fast, multi-academy learning platform built with React + Vite. It provides structured lessons, practice, assessments, exams, and learner progress tracking through a **LearningNode-powered architecture**.

### Academy Structure

```
Qubitel Academy
├── Technology Academy (DSA, System Design, Interview Prep)
├── CBC Academy (Grade 1-8, Kenyan Curriculum)
├── Customer Experience Academy (Support Training)
└── Future Academies
```

### Technology Stack

- **Frontend**: React 18+ with JSX (not TypeScript for source files)
- **Build**: Vite
- **Styling**: Tailwind CSS (strict utility classes only)
- **Routing**: react-router-dom
- **Testing**: Node.js native test runner with `--experimental-strip-types`
- **Node**: >=22 required

---

## Architecture: LearningNode Framework

The platform uses a **single universal data model** called `LearningNode` to represent all content structures. This is the core abstraction that makes the multi-academy architecture possible.

### Core Principle

**Everything is a LearningNode.** Never hardcode concepts like:
- Grade, Learning Area, Subject, Strand, Topic, Module
- Lesson, Practice, Assessment, Exam

Instead, represent all content using the LearningNode model.

### LearningNode Schema

```typescript
type LearningNode = {
  id: string;           // Globally unique identifier
  kind: string;          // Type of node (academy, grade, lesson, etc.)
  label: string;         // Human-readable name
  summary?: string;      // Optional description
  parentId?: string;     // Parent node reference
  childIds?: string[];   // Child node references
  attributes?: NodeAttribute[];   // Contextual metadata
  features?: NodeFeature[];       // Capabilities offered
  actions?: NodeAction[];         // Available intents
  appearances?: NodeAppearance[]; // Presentation hints
  version?: number;
};
```

### Extension Points

| Type | Purpose | Example |
|------|---------|---------|
| Attributes | Contextual metadata | `{ key: "gradeLevel", value: 1 }` |
| Features | Capabilities | `{ kind: "practice" }`, `{ kind: "assessment" }` |
| Actions | User intents | `{ intent: "startPractice" }` |
| Appearances | UI hints | `{ key: "layout", value: "grid" }` |

### Important Rules

1. **Never modify the LearningNode schema** - extend through attributes/features/actions/appearances
2. **Actions must be intent-based** - use `startPractice` not `goToPracticePage`
3. **Appearances are key-value** - intentionally flexible to avoid schema changes
4. **Registries implement declarations** - LearningNodes declare, registries resolve to React components

---

## Directory Structure

```
src/
├── academies/          # Academy-specific content
│   ├── tech/           # Technology Academy
│   ├── cbc/            # CBC Academy (Kenyan curriculum)
│   └── customer-experience/  # CX Academy
├── assets/             # Static assets (images, icons)
├── components/         # Shared React components
├── config/             # Configuration files
│   ├── siteConfig.js   # Brand, support, academy settings
│   └── detectAcademy.ts # Academy detection logic
├── data/               # Static data files
├── hooks/              # Custom React hooks
├── learning/           # LearningNode core implementation
├── lib/                # Utility libraries
├── pages/              # Route-level page components
├── problems/           # Practice problem definitions
├── services/           # API and service layer
├── styles/             # Global styles (Tailwind)
├── types/              # TypeScript type definitions
└── utils/              # Helper utilities
```

---

## Styling Conventions

### Base Theme (Tech Academy - Default)

- **Aesthetic**: Clean, professional, developer-focused
- **Colors**: Slate/neutral palette
- **Interaction**: Standard touch targets, minimal animations

### CBC Theme Overrides

- **Aesthetic**: Child-friendly, highly visual, accessible
- **Target Users**: Grade 1-3 learners (ages 6-9)
- **Interaction**: Large touch targets, vibrant colors, gamification
- **Override Pattern**: Apply via Tailwind override classes, NOT data model changes

```jsx
// Base component
<Learn className="px-4 py-2 text-sm" />

// CBC override
<Learn className="px-4 py-2 text-sm px-8 py-4 text-lg rounded-2xl bg-purple-500" />
```

### CX Theme Overrides

- **Aesthetic**: Dashboard-driven, data-centric
- **Target Users**: Support agents and managers
- **Interaction**: High information density, metrics-focused

### Strict Rules

- **NEVER** use inline styles (`style={{...}}`)
- **NEVER** use custom CSS files unless absolutely necessary
- If CSS is required, use `@layer components { }` directive
- All styling through Tailwind utility classes

---

## Code Quality Standards

### Forbidden Patterns

- No `console.log` in production code
- No commented-out legacy code (use Git history)
- No unused imports or variables
- No `any` types in TypeScript

### Async State Management

Always implement for LearningNode data fetching:
- Loading skeletons
- Error boundaries
- Empty states with actionable guidance
- Retry logic for transient failures

### File Size Limits

- **Maximum line length**: 100 characters
- **Maximum lines per file**: 400 lines

### Commit Message Format

Conventional Commits: `type(scope): subject`

Types: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`

Examples:
```
feat(cbc): add audio controls to phonics node
fix(core): resolve LearningNode type inference bug
refactor(core): migrate legacy video player to LearningNode
```

---

## Key Commands

```bash
# Development
npm run dev                    # Start dev server at localhost:5173

# Build & Production
npm run build                  # Production build
npm run preview               # Preview production build locally

# Testing
npm run test                   # Run all tests
npm run test:unit             # Unit tests only
npm run test:ci               # CI test runner

# Validation (recommended before PR)
npm run build && npm run test
```

---

## Multi-Academy Configuration

### Academy Detection

Academies are detected via hostname or environment variable:
- `academy.qubitel.net` → Tech Academy
- `cbc.academy.qubitel.net` → CBC Academy
- `cx.academy.qubitel.net` → Customer Experience Academy

Local development:
```bash
VITE_ACTIVE_ACADEMY=tech npm run dev
VITE_ACTIVE_ACADEMY=cbc npm run dev
```

### Brand Assets

Each academy has separate brand assets configured in `siteConfig.js`:
- `logoLight` - Light mode logo
- `logoDark` - Dark mode logo

---

## Content Authoring

### Adding New Topics

When adding a new topic, update all required source-of-truth files:
1. Create content file in appropriate academy directory
2. Register in academy manifest
3. Verify topic appears in navigation
4. Test progress tracking works

### Content Locations

- **Tech Academy**: `src/academies/tech/`
- **CBC Academy**: `src/academies/cbc/`
- **CX Academy**: `src/academies/customer-experience/`

Keep content close to the academy it belongs to.

---

## Performance Architecture

- **React.lazy()** for route-level code splitting
- **Suspense** for loading states
- Request caching and deduplication
- Responsive images with `srcset` and `webp` formats

---

## Accessibility (a11y)

- **WCAG 2.1 Level AA** minimum compliance
- Color contrast: minimum 4.5:1 for text
- All interactive elements keyboard-accessible
- Proper ARIA labels and focus management

---

## Additional Resources

- `docs/architecture/core/learning-node-framework-v1.0.md` - LearningNode deep dive
- `docs/problem-authoring.md` - Creating practice problems
- `docs/github-issue-authoring-guidelines.md` - Issue templates
- `AGENTS.md` - Full agent guidelines (from repository)

---

## Quick Reference for Common Tasks

### Adding a New LearningNode

1. Define the node with proper `kind`, `label`, `id`
2. Set `parentId` and `childIds` for hierarchy
3. Add appropriate `features` (guidedContent, practice, assessment)
4. Add `actions` (startPractice, takeAssessment)
5. Register in the appropriate manifest

### Creating a New Component

1. Use Tailwind utility classes only
2. Implement loading/error/empty states if async
3. Ensure keyboard accessibility
4. Test dark mode with `dark:` variants
5. Keep under 400 lines

### Adding a New Academy

1. Create `src/academies/<academy-id>/` directory
2. Add brand assets (logos) to `public/academy-logos/`
3. Update `siteConfig.js` with academy entry
4. Update `detectAcademy.ts` detection logic
5. Create academy manifest
