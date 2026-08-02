# Qubitel Academy AI Instructions

## 📚 Global Context & Documentation
- **Purpose:** A multi-domain educational platform (`academy.qubitel.net`) encompassing Tech, CBC, and CX.
- **Architectural Source of Truth:** For full architectural context, ALWAYS read and adhere to `docs/architecture/current-structure-and-multi-academy-plan.md` before generating complex logic.
- **Primary Objective:** Migrate legacy duplicated code toward a unified, generic "Learning Node" design that works seamlessly across all domains.

---

## 🚀 Current Core Priority: "Learning Node" Migration

### The Concept
All educational content (Tech video, CBC interactive game, CX quiz) must be modeled as a generic `LearningNode`.

### The Pattern
```typescript
// Generic LearningNode interface
interface LearningNode {
  id: string;
  type: 'video' | 'game' | 'quiz' | 'reading';
  title: string;
  description: string;
  content: unknown;
  metadata: {
    domain: 'tech' | 'cbc' | 'cx';
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    duration: number;
  };
}
```

### Actionable Rules
- **DO NOT** duplicate domain-specific models (e.g., do not create `TechLesson.ts` and `CBCLesson.ts`).
- **ALWAYS** use or extend the shared `LearningNode` interface.
- **PROACTIVELY** refactor legacy duplicated code, separating data fetching from the presentation layer.
- **NEVER** store presentation-specific logic (colors, icons, animations) in the data model.

---

## 🏗️ Architecture & Shared Data (Universal)

### Tech Stack
- **Framework:** React 18+ (Functional components only, no Class components)
- **Language:** TypeScript (Strict mode: `"strict": true`)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS (with native dark mode via `dark:` variants)
- **Testing:** Vitest + React Testing Library
- **Package Manager:** npm (Lockfile: `package-lock.json`)

### Vite Configuration
- **Environment Variables:** ALWAYS use `import.meta.env`
- **Custom Variables:** Prefix with `VITE_` (e.g., `VITE_API_URL`, `VITE_DOMAIN`)
- **Example:**
  ```typescript
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  ```

### Strict TypeScript Rules
- All interfaces, types, and data models must be **generic and domain-agnostic**.
- Use a `type` or `format` property within the `LearningNode` to dictate behavior.
- **NEVER** use `any`. Replace with proper type unions or generics.
- Example of correct pattern:
  ```typescript
  type NodeContent<T extends LearningNode['type']> = T extends 'video'
    ? VideoContent
    : T extends 'quiz'
    ? QuizContent
    : never;
  ```

### State & Hooks
- Custom hooks must remain **completely agnostic** of the visual presentation.
- Hooks should focus on **data logic and side effects**, not rendering.
- Example of good pattern:
  ```typescript
  const useLearningNode = (nodeId: string) => {
    const [node, setNode] = useState<LearningNode | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    // ... fetch and return node
  };
  ```

---

## 📂 File & Folder Structure Conventions

### Naming Conventions
- **Components:** PascalCase (e.g., `LearningNodeCard.tsx`)
- **Hooks:** camelCase, prefixed with `use` (e.g., `useLearningNode.ts`)
- **Types/Interfaces:** PascalCase (e.g., `LearningNode.ts`)
- **Utilities:** camelCase (e.g., `formatDate.ts`)
- **Constants:** UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS.ts`)

### Folder Structure
```
src/
├── components/          # Shared, reusable React components
│   ├── LearningNodeCard.tsx
│   ├── ErrorBoundary.tsx
│   └── LoadingSkeleton.tsx
├── hooks/               # Custom React hooks (logic only)
│   ├── useLearningNode.ts
│   ├── useFetch.ts
│   └── useLocalStorage.ts
├── types/               # Shared TypeScript interfaces
│   ├── LearningNode.ts
│   ├── User.ts
│   └── index.ts
├── utils/               # Helper functions and utilities
│   ├── formatDate.ts
│   ├── api.ts
│   └── validation.ts
├── pages/               # Page-level components (route-driven)
│   ├── TechDashboard.tsx
│   ├── CBCHome.tsx
│   └── CXMetrics.tsx
├── styles/              # Domain-specific Tailwind overrides (if needed)
│   ├── cbc-home/
│   └── cx-overrides.css
└── env.d.ts             # Vite environment type definitions
```

---

## 🎨 Base UI Standards (Tech Theme - Default)

### Design Philosophy
- **Aesthetic:** Premium, compact, and zero-clutter
- **Approach:** Mobile-first responsive design
- **Dark Mode:** Native support using Tailwind `dark:` variants
- **Target Users:** Professionals and advanced learners

### Styling Rules
- **ONLY** use Tailwind CSS utility classes
- **NEVER** use inline styles (`style={{...}}`)
- **AVOID** custom CSS files unless absolutely unavoidable (document reasons in PR)
- Dark mode example:
  ```jsx
  <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
    Content
  </div>
  ```

### SEO & Semantics
- Maintain **strict semantic HTML5:**
  - `<article>` for content containers
  - `<nav>` for navigation
  - `<aside>` for sidebars
  - `<section>` for logical groupings
- Ensure **proper heading hierarchy** (`<h1>` → `<h2>` → `<h3>`, no skipping levels)
- Implement **canonical URLs** for SEO and proper sitemap routing

### Default Rule
- **Unless explicitly instructed otherwise, assume all new components should be styled using this default Tech theme.**

---

## 🧸 Presentation Overrides (CBC Domain)

### Trigger
When working within CBC-specific views or applying CBC overrides to base components.

### Design Philosophy
- **Aesthetic:** Child-friendly, highly visual, and accessible
- **Target Users:** Grade 1-3 learners (ages 6-9)
- **Interaction Model:** Large touch targets, vibrant colors, gamification elements

### Styling Overrides
- Use **Tailwind override classes** to differentiate CBC presentation:
  ```jsx
  // Base component
  <button className="px-4 py-2 text-sm md:text-base rounded-lg">
    Learn
  </button>

  // CBC override
  <button className="cbc-override px-8 py-4 text-lg rounded-2xl">
    Learn
  </button>
  ```
- Integrate specific interactive assets:
  - Audio controls for phonics lessons
  - 3D mascot placements and animations
  - Progress badges and star reward systems
  - Vibrant color palettes (greens, purples, oranges)

### Rule
- **PURELY apply** these changes at the presentation layer via Tailwind override classes or CBC-specific component wrappers.
- **NEVER** alter the shared `LearningNode` data model to achieve a CBC visual requirement.

---

## 📊 Presentation Overrides (CX Domain)

### Design Philosophy
- **Aesthetic:** Clean, dashboard-driven, data-centric layouts
- **Target Users:** Support agents and managers
- **Interaction Model:** High information density, metrics-focused

### Styling Rules
- Follow the **Base UI standard** (Tech theme)
- Prioritize:
  - Data table density and sorting
  - Metrics visualization (charts, KPIs)
  - Bulk action workflows
  - Real-time data updates

---

## 🛡️ Code Quality, Testing & Git

### Asynchronous State Management
When fetching data for a `LearningNode`, **always implement:**
- **Loading skeletons** to indicate progress
- **Error boundaries** to gracefully handle failures
- **Empty states** with actionable guidance
- **Retry logic** for transient failures

Example:
```typescript
const useLearningNode = (nodeId: string) => {
  const [node, setNode] = useState<LearningNode | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchNode = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/nodes/${nodeId}`);
        if (!response.ok) throw new Error('Failed to fetch node');
        setNode(await response.json());
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };
    fetchNode();
  }, [nodeId]);

  return { node, loading, error };
};
```

### Error Handling
- **Always wrap** async operations in try-catch blocks
- **Log errors** with context using a centralized logger (never log sensitive data)
- **Provide user-friendly** error messages (avoid stack traces in UI)
- **Implement retry mechanisms** for transient failures

### Testing Standards
- **Coverage Target:** Minimum 80% for critical paths
- **Test Types:**
  - **Unit tests** for hooks and utilities (Vitest)
  - **Integration tests** for components and data flows (React Testing Library)
  - **E2E tests** for critical user journeys (optional, document separately)
- **Test File Naming:** `*.test.ts` or `*.test.tsx`

### Styling Constraints
- **STRICTLY** use Tailwind CSS utility classes
- **NEVER** use inline styles (`style={{...}}`)
- **AVOID** custom CSS files unless:
  - Complex animations not achievable with Tailwind
  - Domain-specific overrides (CBC, CX)
  - Document reasons in PR description
- If CSS is necessary, use `@layer` directive:
  ```css
  @layer components {
    .cbc-button {
      @apply px-8 py-4 text-lg rounded-2xl;
    }
  }
  ```

### Clean Code Standards
- **NO `console.log` statements** in production code
- **NO commented-out legacy code** (use Git history for reference)
- **NO unused imports** or variables
- **Consistent formatting** (use Prettier with project config)
- **MAX line length:** 100 characters
- **MAX lines per file:** 400 lines

### Commit Message Format (Conventional Commits)
- **Format:** `<type>(<scope>): <subject>`
- **Types:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`
- **Scope:** Domain or feature (e.g., `cbc`, `core`, `api`)
- **Subject:** Lowercase, imperative tense, no period

Examples:
```
feat(cbc): add audio controls to phonics node
fix(core): resolve LearningNode type inference bug
refactor(core): migrate legacy video player to LearningNode
docs: update architecture guide for multi-domain setup
test(core): add unit tests for useLearningNode hook
```

### Performance Optimization
- **Memoization:** Use `React.memo` for expensive components
- **Lazy Loading:** Use `React.lazy()` for route-level code splitting
- **Data Fetching:** Implement request caching and deduplication
- **Image Optimization:** Use responsive images with `srcset` and `webp` formats
- **Bundle Analysis:** Monitor bundle size with `vite-plugin-visualizer`

### Accessibility (a11y)
- **WCAG 2.1 Level AA** compliance as minimum
- **Color Contrast:** Minimum 4.5:1 for text (WCAG AA)
- **Keyboard Navigation:** All interactive elements must be keyboard-accessible
- **ARIA Labels:** Use `aria-label`, `aria-labelledby`, `aria-describedby` appropriately
- **Focus Management:** Visible focus indicators, logical tab order
- **Screen Reader Testing:** Validate with NVDA, JAWS, or VoiceOver

---

## 🌐 API Integration & Environment

### API Client Pattern
```typescript
// utils/api.ts
const API_BASE = import.meta.env.VITE_API_URL;

export const fetchLearningNode = async (nodeId: string): Promise<LearningNode> => {
  const response = await fetch(`${API_BASE}/nodes/${nodeId}`);
  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }
  return response.json();
};
```

### Environment Variables
- **Development:** `.env.local` (git-ignored)
- **Production:** Managed via deployment platform (e.g., Vercel, GitHub Actions)
- **Required Variables:** Document in `.env.example`

---

## 📋 Checklist Before Submitting PRs

- [ ] No `console.log` or commented-out code
- [ ] TypeScript strict mode: all types defined, no `any`
- [ ] Tailwind CSS only for styling (no inline styles or custom CSS)
- [ ] Tests written for critical logic (minimum 80% coverage)
- [ ] Semantic HTML maintained
- [ ] Dark mode tested (`dark:` variants applied)
- [ ] Commit messages follow Conventional Commits format
- [ ] No unused imports or variables
- [ ] Error handling and loading states implemented
- [ ] Accessibility (a11y) verified
- [ ] Performance optimizations considered

---

## 📖 Additional Resources
- **Architectural Guide:** `docs/architecture/current-structure-and-multi-academy-plan.md`
- **Component Library:** (Reference URL if available)
- **Design System:** (Reference URL if available)
- **API Documentation:** (Reference URL if available)

---

**Last Updated:** June 2026 | **Owner:** Qubitel Platform Team