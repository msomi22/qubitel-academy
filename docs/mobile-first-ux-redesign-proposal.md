# Qubitel Academy — Mobile-First UX Redesign Proposal

**Status:** Approved direction; implementation not started  
**Scope:** Shared academy experience, starting with CBC Academy  
**Reference experience:** [IkoValid](https://ikovalid.com/) — clarity and minimal friction, not identical appearance  
**Primary goal:** Make every academy intuitive, lightweight, accessible and mobile-first without changing learning content or capabilities.

## 1. Principles

1. **One obvious next action:** Each screen immediately communicates what the learner can do.
2. **Content first:** Avoid decorative dashboards, competing CTAs, large banners and unnecessary controls.
3. **Mobile first:** Design and test the smallest supported viewport before adapting to desktop.
4. **Navigation depth is data:** An academy's content hierarchy determines the number of steps, not separate bespoke page designs.
5. **Progressive disclosure:** Show controls when they are useful, not by default.
6. **Consistency:** Shared typography, spacing, affordances, loading/error states and visual tokens.
7. **Keep it lightweight:** Prefer existing React/Router and components; don't add UI frameworks or dependencies without strong justification.
8. **Preserve behavior:** Keep content, assessments, learning progress, deep links and established URLs working.

## 2. Reference journey: CBC Academy

| Stage | Current URL | Purpose |
| --- | --- | --- |
| Landing | https://cbc.academy.qubitel.net/ | Understand the academy and choose the primary action |
| Grades | https://cbc.academy.qubitel.net/categories | Select a grade |
| Grade | https://cbc.academy.qubitel.net/gd1 | Select a learning area |
| Learning area | https://cbc.academy.qubitel.net/gd1/eng | Select a topic |
| Topic/content | https://cbc.academy.qubitel.net/gd1/eng/greetings | Access learning material and associated practice |

These are **examples of one academy**, not fixed universal navigation levels. Other academies may contain fewer or more nested collections. The interface must represent arbitrary supported hierarchies without adding navigation chrome at every level.

## 3. Three reusable page patterns

### A. Academy landing page
- Compact academy branding and clear headline; a brief description of the offering.
- One primary CTA for the next relevant step (for CBC, **Choose your grade**).
- Minimal secondary information only when it helps users decide or resume.
- Avoid busy hero sections, statistics, carousels, multiple competing CTAs or forced onboarding.
- For CBC, initial CTA links to `/categories`.

### B. Collection page (repeated at any depth)
- Current collection title, optional short summary and visible back/parent navigation.
- A simple, accessible list or responsive grid of immediate child nodes, with informative labels and clear tap targets.
- Use the same component for grades, learning areas, topics, programmes and additional levels.
- Show availability only where relevant; disabled items must clearly communicate why.
- Avoid imposing curriculum-specific labels on shared components (e.g., a generic collection must not always say “Grades”).
- Preserve academy-specific routing rules and valid deep links.

### C. Content page
- Prioritize actual learning content, quizzes, readings and other node-specific renderers.
- Compact contextual heading and a clear route back to the parent collection.
- Next/previous or practice actions only when supported and useful.
- Minimize permanent navigation chrome during focused learning or exams.
- Preserve existing assessment behavior, completion tracking and content protections.

## 4. Shared shell and navigation

**Current implementation to review:** `src/App.jsx` composes `Navbar`, an academy sidebar, `BottomNav`, `StatusBar` and a first-visit `OnboardingOverlay`. These layers may compete with primary content, especially on mobile.

**Direction:**
- One compact header with academy identity, contextual navigation and a restrained menu if essential.
- A clearly labelled back or parent affordance; optional collapsible breadcrumbs on larger viewports.
- Avoid duplicated destinations between header, side navigation and bottom navigation.
- Remove or hide nonessential status widgets and onboarding overlays from the default learning journey; retain genuinely necessary access to functions.
- Keep exams distraction-free.
- Do not remove user capabilities merely because their current UI is crowded; relocate infrequently used controls as needed.

## 5. Visual system

- Calm, readable typography; restrained brand accent; sufficient text/background contrast.
- Simple spacing scale, consistent card/button/input styling and predictable focus/hover states.
- Mobile-first single-column layout; increase columns only when real estate permits.
- Comfortable touch targets (aim for at least 44 × 44 CSS pixels).
- Avoid horizontal overflow, redundant nested borders, ornamental gradients and gratuitous animation.
- Support keyboard use, semantic headings, focus visibility and reduced-motion preferences.
- Fix/verify favicon and related branding on the **deployed CBC domain**. The repository already has `public/favicon.svg` and an `index.html` icon link; investigate deployment, path and caching instead of assuming it is absent.

## 6. Migration phases (small, reviewable PRs)

### Phase 1 — Landing page
Replace the CBC landing presentation with a minimal academy intro and **Choose your grade** CTA. Preserve academy configuration and current routing. Define the shared design tokens and minimum header approach needed by the page. Do not redesign deep content yet.

### Phase 2 — Grades / `/categories`
Introduce a clear, responsive collection presentation for available grades. Preserve readiness checks and any grade-selection routing intent. Keep unavailable choices understandable.

### Phase 3 — Grade / learning area / topic collections
Use a common child-node collection pattern for `/gd1`, `/gd1/eng` and comparable nested nodes. Respect parent/child relationships and arbitrary hierarchy depth instead of hardcoding five levels. Preserve semantic routes and `/learn/:nodeId` compatibility.

### Phase 4 — Content experience
Reduce clutter on `/gd1/eng/greetings` and other content pages while retaining learning, practice and exam renderers, navigation, state and completion logic. Audit phone-sized reading and exercise controls.

### Phase 5 — Shared cleanup and rollout
Consolidate redundant shell controls, finish visual/accessibility consistency, verify other academies and desktop, and confirm favicon deployment. Remove obsolete UI/CSS only after no usages remain.

**Migration rule:** Each phase should stand alone, be tested, and be reviewed before the next. Implement in a feature branch and don't merge or deploy UI changes without approval.

## 7. Existing code to reuse or review

- `src/App.jsx`: routing and global shell.
- `src/pages/Home.jsx`: home-view model and academy-specific home components.
- `src/pages/CategoriesPage.jsx`: existing CBC grade selection and readiness logic.
- `src/pages/LearningNodePage.jsx`: semantic route resolution and learning-node registry.
- `src/components/LearningNodePageShell.jsx`, `LearningNodeChildGrid.jsx`, `LearningNodeBreadcrumbs.jsx`, `LearningNodeContentRenderer.jsx`: candidates to simplify/reuse, not blindly replace.
- `src/academies/` and `src/learning/`: preserve academy manifests and registry as the source of hierarchy.
- `public/favicon.svg` and `index.html`: investigate browser tab icon deployment.

The shared presentation should consume existing learning-node metadata, not establish a new content model.

## 8. Acceptance criteria

- The five reference CBC routes remain accessible via direct navigation and refresh.
- All existing valid learning routes and academy-specific flows continue to work.
- At a 360px viewport, no unintentional horizontal scrolling or clipped primary controls.
- One clearly identifiable primary action on landing and a clear next step in collections.
- Child-node navigation works at varying depths without a new bespoke page per level.
- Back/parent navigation is predictable and keyboard accessible.
- Content remains legible and interactive on phones; tap targets are comfortable.
- Existing quiz/practice/exam behavior and progress persistence remain intact.
- Mobile and desktop share a consistent design with no duplicate competing menus.
- Favicon resolves and renders on the deployed CBC academy domain.
- Build, existing automated tests and targeted route/mobile checks pass.

## 9. Validation approach

Before implementation, visually inspect the five deployed routes on phone and desktop widths and compare with the current component implementation. In each phase, test 360px, 390px, tablet and desktop layouts; exercise keyboard navigation; verify direct deep-link refresh; and test at least one non-CBC academy to catch unintended shared-component effects. Use screenshots for before/after review.

## 10. Deliberate exclusions

No backend redesign, content migration, new curriculum model, new analytics dashboard, forced authentication, additional gamification, or general feature expansion. Do not invent progress data or “continue learning” state if unavailable. Focus on removing friction.

## 11. Open design details for implementation review

Final visual tokens and the exact minimum global navigation should be decided from deployed-page screenshots and actual use cases. The structure, sequencing and content-first direction above are approved; these smaller visual decisions can be reviewed phase by phase.


---

## 12. Global learning-platform UX references (design inspiration)

**Review status:** Proposal for further review, not final UI approval.

The proposed page patterns borrow selectively from:
- **Khan Academy:** readily browsable course, unit and lesson structure; clear educational hierarchy.
- **Duolingo:** a clear next action and restrained progress communication, **not** mandatory linear journeys or gamification.
- **freeCodeCamp:** focused practice and one exercise at a time.
- **Coursera:** clear separation of course material types and assignments.
- **Moodle:** structured sections and activities, without adopting its more elaborate navigation chrome.

Do not clone these platforms or introduce features merely because competitors have them. Validate the mobile layouts against Qubitel's actual content and learners.

## 13. Refined content page: topic learning workspace

The content page is **not** a single static article, and should not show one basic note plus one embedded quiz. A topic provides several **available learning modes**, such as:

- **Notes:** Student-facing notes divided into short pages (for example 10 pages), with clear **Previous / Next**, “Page 3 of 10”, and a compact **Jump to page** control. Render one page at a time and avoid overwhelming students with the whole book on one screen.
- **Lessons:** Links or rendered lesson materials where present; preserve actual content types rather than assume all lessons are videos.
- **Practice:** Topic-related questions and exercises; the practice interface is described below.
- **Assessments:** **View available assessments only**, with cards/rows and links to the existing separate assessment experience. Do **not** embed assessment taking in the content workspace.
- **Other configured content:** Revision, teacher lesson plans or additional content types where supported, with permissions and relevance respected.

Only show modes that exist for the selected topic. Use a compact tab row or equivalent accessible mobile control; allow overflow when necessary rather than shrinking labels or wrapping multiple rows. Never introduce empty placeholders as if they were real content.

**Navigation expectation:** Learners can switch between Notes and Practice without first walking up the topic hierarchy. Switching modes should preserve the selected note page, selected practice question and answers when supported; returning from an assessment should lead back to its proper topic context. Preserve routes and deep links.

### Notes layout

1. Minimal contextual header: academy / topic, parent/back affordance.
2. Compact modes: Notes / Lessons / Practice / Assessments, conditional on content.
3. Note title and page count, optionally modest progress based on real page position.
4. One concise note page: learning blocks, illustrations, media or links supplied by the current content.
5. Previous / Next at the bottom, plus unobtrusive page-jump control.
6. For 10 pages, make page changes fast and predictable. Do not convert this into a long scrolling article.

## 14. Practice question workspace: interactive UX proposal

**Design objective:** One focused practice question at a time, minimal navigation, easy retry, immediate instructional feedback when supported, and no exam-like restrictions by default.

### Suggested visual hierarchy

1. Compact header with **topic name** and clear way back to the topic/notes.
2. Context: **Practice**, “Question 2 of 5”; an unobtrusive count of checked questions.
3. Slim progress indicator based on **checked questions** (not merely visited questions); avoid falsely portraying unanswered questions as completed.
4. One question prompt, exactly its configured answer controls (single-select, multi-select, true/false, text, etc.).
5. **Check answer** for question types supporting immediate checks; show a concise explanation and correct answer when the content includes or permits it.
6. Bottom **Previous / Next** controls, with a compact **Questions** picker for direct navigation.
7. Optional **Notes** shortcut to review related material without abandoning question state.
8. Optional **Practice summary** with checked/correct/unanswered state and links to review; **Practise again** resets only the current attempt.

### Behavior and interaction rules

- Single choice chooses one answer; multi-select toggles multiple answers; question types must follow existing backend/content definitions.
- Selected answers remain when moving forward, backward or jumping to another question.
- Checking an answer is explicit when applicable. Revising an answer after a check invalidates the previous checked result until checked again.
- Show explanation only after check where pedagogically appropriate. Preserve legitimate content-specific settings.
- The picker lists all questions; distinguish current question, checked result and unanswered state accessibly.
- Previous is disabled on the first question; Next is disabled on the last, which can instead offer **Summary**. Allow reviewing and correcting questions even after visiting Summary.
- Do not force checking every question before moving on unless the practice type specifically requires that.
- The example prototype used five **illustrative** greetings questions, including single- and multiple-select. It does not represent verified Qubitel question inventory or data persistence.
- A demo may use local client-side state; real implementation should use the current Qubitel question, completion and preference mechanisms.
- **Practice is distinct from assessment.** Students can retry and learn from explanations; assessment submission, timing, marking and attempt policies remain in the separate assessment flow.

### Mobile layout principles

- Full-width readable question card without nesting multiple decorative cards.
- Comfortable radio/checkbox tap targets; selected state must not rely on color alone.
- Keep explanation close to the answer, after the check action.
- Make primary Check/Next controls findable, without obscuring learning text.
- No permanent sidebar, game-like clutter or unnecessary statistics.
- Show only controls grounded in real content and functionality.

## 15. Assessment availability versus assessment-taking

The **Assessments** mode in the content workspace means **browse available assessments** for a topic.

Expected journey:

`Topic workspace → Assessments tab → List of available assessments → Select assessment → Separate assessment interface`

The content workspace **must not administer assessments**, render their full question-taking UI or reproduce exam timers/submission flows. Maintain existing exam routes and return-path behavior. List metadata (e.g. question count/time) only when available and reliable. Do not manufacture exams, availability or durations.

## 16. Review checklist before implementing the content workspace

- [ ] Confirm real CBC Notes / Lessons / Practice / Assessments content relationships and permitted modes.
- [ ] Inspect existing book page transition and content renderer behavior.
- [ ] Preserve page position and question state when switching modes where appropriate.
- [ ] Validate next/previous, jump-to-page, question navigation and state on phones and with keyboard input.
- [ ] Validate existing practice question types, answers and feedback semantics.
- [ ] Verify that assessment listing **only links out** to the separate exam experience.
- [ ] Verify the topic remains a valid return destination from practice and assessments.
- [ ] Check direct-route refresh, browser back navigation, accessibility, performance and non-CBC academies.
- [ ] Review the landing, recursive collection and revised content patterns together before implementation.

**Current decision:** Landing and Collection directions are acceptable. Content / Practice refinements above are documented **for further review**, not approved for code implementation. Keep the work documentation-only until explicitly authorized.
