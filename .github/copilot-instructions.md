# Qubitel Academy AI Instructions

## 📚 Global Context & Documentation
- **Purpose:** A multi-domain educational platform (`academy.qubitel.net`) encompassing Tech, CBC, and CX.
- **Architectural Source of Truth:** For full architectural context, ALWAYS read and adhere to `docs/architecture/current-structure-and-multi-academy-plan.md` before generating complex logic.

## 🚀 Current Core Priority: "Learning Node" Migration
- **Context:** We are actively migrating away from legacy, duplicated code structures toward a unified, generic "Learning Node" design.
- **The Concept:** All educational content (Tech video, CBC interactive game, CX quiz) must be modeled as a generic `LearningNode`.
- **Actionable Rule:** DO NOT duplicate domain-specific models (e.g., do not create `TechLesson.ts` and `CBCLesson.ts`). Always use or extend the shared `LearningNode` interface. 
- **Refactoring:** If asked to modify legacy duplicated code, proactively refactor it to the `LearningNode` pattern, separating data fetching from the presentation layer.

## 🏗️ Architecture & Shared Data (Universal)
- **Tech Stack:** React 18+ (Functional only), TypeScript (Strict mode), Vite, Tailwind CSS.
- **Vite Constraints:** ALWAYS use `import.meta.env` for environment variables. Prefix custom variables with `VITE_`.
- **Strict Typing:** All TS interfaces, types, and data models must be generic. Rely on a `type` or `format` property within the `LearningNode` to dictate behavior. NEVER use `any`.
- **State & Hooks:** Custom hooks and state management must remain completely agnostic of the visual presentation.

## 🎨 Base UI Standards (Tech Theme - Default)
- **Design Philosophy:** Premium, compact, and zero-clutter.
- **Styling:** Mobile-first responsive design with robust native dark mode support utilizing Tailwind `dark:` variants.
- **SEO & Semantics:** Maintain strict semantic HTML5 (`<article>`, `<nav>`, `<aside>`). Ensure proper heading hierarchy and canonical routing logic for sitemaps.
- **Rule:** Unless explicitly instructed otherwise, assume all new components should be styled using this default Tech theme.

## 🧸 Presentation Overrides (CBC Domain)
- **Trigger:** When working within CBC-specific views or applying CBC overrides to base components.
- **Design Philosophy:** Child-friendly, highly visual, and accessible.
- **Styling Overrides:** Use larger touch targets, vibrant color overrides, and integrate specific interactive assets (e.g., audio controls for phonics, 3D mascot placements).
- **Rule:** Apply these changes PURELY at the presentation layer via Tailwind override classes. NEVER alter the shared `LearningNode` data model to achieve a CBC visual requirement.

## 📊 Presentation Overrides (CX Domain)
- **Design Philosophy:** Clean, dashboard-driven, data-centric layouts. 
- **Rule:** Follow the Base UI standard but prioritize data table density and metrics visualization overrides.

## 🛡️ Code Quality, Testing & Git [NEW ADDITIONS]
- **Asynchronous States:** When fetching data for a `LearningNode`, always implement robust loading skeletons, error boundaries, and empty states. Do not assume happy-path network requests.
- **Styling Constraints:** Strictly use Tailwind CSS utility classes. NEVER use inline styles (`style={{...}}`) or custom CSS files unless absolutely unavoidable.
- **Commit Messages:** If generating Git commit messages, strictly follow Conventional Commits format (e.g., `feat(cbc): add audio controls to phonics node` or `refactor(core): migrate legacy video player to LearningNode`).
- **Clean Code:** Do not leave `console.log` statements or commented-out legacy code in the final output.
