# Production Question Quality Audit

## Purpose

This audit supports #95, the epic to expand the production question bank with world-class clarity and intuition.

The purpose is to protect the learning quality of Senior Dev Accelerator as the project begins receiving global users. Before adding more production content, this audit maps the current production-visible question bank so follow-up work can clearly see:

- which questions are strong enough to keep;
- which questions need minor polish;
- which questions need deeper revision;
- which areas should not be expanded until the current standard is clearer.

This audit is documentation-only. It does not rewrite questions, add new batches, change visibility, or change app behavior.

## Audit scope

Reviewed production-visible questions under:

```text
src/data/problems/**
```

A production-visible question is any question that the current app logic treats as visible in production.

For this audit, a question is production-visible when it has approved production metadata:

```js
metadata: {
  reviewStatus: 'approved',
  visibility: ['dev', 'prod']
}
```

The current production visibility logic uses `isProblemApprovedForProduction(question)` to approve questions when `metadata.reviewStatus === 'approved'` and `metadata.visibility` includes `prod`. The legacy explicit production allow-list is currently empty, so production visibility is driven by per-question metadata in discovered problem files.

## Rubric used

This audit follows `docs/content-quality-rubric.md`.

Each reviewed question was evaluated against the rubric standards for:

- correctness;
- clarity;
- intuition;
- mental picture;
- practical usefulness;
- non-repetition;
- cognitive load control;
- attention guidance;
- visual support where useful;
- common mistake coverage;
- final takeaway quality;
- production metadata correctness.

## Audit method and assumptions

The repository currently has a manageable production-visible set, so this audit reviewed all discovered approved production questions found through `src/data/problems/**` metadata searches.

Assumptions:

- The audit treats `metadata.reviewStatus: 'approved'` plus `visibility` containing `prod` as the source of truth for production question visibility.
- Files under `src/data/problems/**` that wrap legacy bank content were judged using both the wrapper and the inherited legacy content when visible from imports.
- No production visibility changes were made. Even weaker items are left visible unless follow-up work explicitly decides to hide or revise them.
- The audit is intentionally practical rather than academic: each note should be easy to turn into a follow-up implementation issue.

## Rating definitions

| Rating | Meaning | Action |
| --- | --- | --- |
| Excellent | Keep as-is. The question is technically correct, clear, intuitive, practical, memorable, and production-ready. | Keep as-is. |
| Good | Minor clarity improvement needed. The question is usable in production but could be clearer, more intuitive, or more polished. | Minor polish when convenient. |
| Needs revision | Technically useful but unclear, shallow, incomplete, repetitive, missing important learning support, or hard to picture. | Improve before expanding similar content. |
| Not production-ready | Should be hidden from prod or fixed before being treated as production-quality. The question may be incorrect, confusing, too shallow, missing required metadata, or not useful enough for learners. | Hide from prod until improved or fix quickly. |

Priority values:

| Priority | Meaning |
| --- | --- |
| P0 | Production risk or clearly broken. |
| P1 | Important quality issue affecting learner understanding. |
| P2 | Useful improvement but not urgent. |
| P3 | Polish only. |

## Summary findings

The current production-visible question bank is small and mostly strong. The best content already follows the rubric well: it starts with a plain-language story, creates a mental picture, guides attention through tables or diagrams, explains common mistakes, and ends with a memorable takeaway.

The main quality risk is inconsistency. Some production-visible questions are excellent deep dives, while some MCQs are production-safe but still depend heavily on concise inherited legacy prompts. They have good distractor explanations and visual summaries, but several would be stronger with a fuller `finalTakeaway`, clearer mental-picture wording, or a more explicit production-reality section.

No P0 issues were found in the reviewed production-visible set. The previous P1 concern around URL shortener duplication has been clarified in code comments and metadata: `scalability-url-shortener-001` is the legacy design-review drill, while `scalability-url-shortener-v2` is the current canonical learner-facing walkthrough.

## Production question summary by category

| Category | Production-visible count | Excellent | Good | Needs revision | Not production-ready | Notes |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| DSA | 2 | 2 | 0 | 0 | 0 | Both have strong intuition and visual support; Dynamic Programming is especially complete. |
| Java | 4 | 3 | 1 | 0 | 0 | Strong beginner-friendly explanations; one MCQ could use a stronger final takeaway. |
| System / API design | 2 | 0 | 2 | 0 | 0 | Concise MCQs with good distractor explanations; final takeaways could be more explicit. |
| System / caching | 1 | 0 | 1 | 0 | 0 | Good MCQ, but could benefit from explicit stale-cache takeaway. |
| System / databases | 1 | 0 | 1 | 0 | 0 | Good trade-off framing; could add clearer final memory sentence. |
| System / messaging queues | 1 | 0 | 1 | 0 | 0 | Good production framing; could add clearer failure-mode takeaway. |
| System / scalability | 3 | 2 | 1 | 0 | 0 | URL shortener v2 is the canonical walkthrough; URL shortener 001 is a clearly marked legacy review drill. |
| **Total** | **14** | **7** | **7** | **0** | **0** | No clearly broken production-visible question found. |

> Note: `dynamic-programming-020` is counted under DSA even though most learner content is inherited from `src/data/banks/dsa/minimum-sideway-jumps.js`.

## Current production-visible question inventory

| Question ID | Category | Topic | Type | Rating | Main issue | Recommended action | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `sliding-window-001` | DSA | sliding-window | coding | Excellent | Strong mental picture, rolling-sum invariant, brute-force contrast, mistakes, and follow-ups. Could add a richer rendered step-frame later, but content is already production-ready. | Keep as-is | P3 |
| `dynamic-programming-020` | DSA | dynamic-programming | coding | Excellent | Excellent state-compression explanation, visual walkthrough, invariant, common mistakes, and production connection. | Keep as-is | P3 |
| `scalability-url-shortener-v2` | System design | scalability | complex system design | Excellent | Current canonical learner-facing walkthrough. Very strong full walkthrough with requirements, APIs, data model, flows, trade-offs, abuse controls, observability, and scoring rubric. | Keep as-is | P3 |
| `scalability-url-shortener-001` | System design | scalability | complex system design / review drill | Excellent | Legacy URL shortener problem is intentionally retained as a design-review/scoring drill and is now explicitly commented in the file with `contentRole` and `relatedTeachingProblemId` metadata. | Keep as-is as legacy review drill | P3 |
| `scalability-realtime-updates-001` | System design | scalability | MCQ | Good | Clear pub/sub and WebSocket routing idea. Needs a more memorable final takeaway and perhaps a small note about connection ownership and fan-out failure modes. | Improve final takeaway | P2 |
| `caching-product-details-001` | System design | caching | MCQ | Good | Good cache-aside explanation and distractor coverage. Could make stale-cache risk and invalidation decision more explicit. | Improve final takeaway | P2 |
| `api-design-rate-limiting-001` | System design | api-design | MCQ | Good | Correct and practical fixed-window explanation. Could mention sliding window/token bucket as follow-up contrast so learners do not overgeneralize fixed windows. | Add common mistake | P2 |
| `api-design-payment-idempotency-001` | System design | api-design | MCQ | Good | Strong practical scenario. Could add a final takeaway about storing request fingerprint and outcome together. | Improve final takeaway | P2 |
| `messaging-queues-email-notification-001` | System design | messaging-queues | MCQ | Good | Clear queue decoupling explanation. Could add a stronger production-reality note about retries, idempotent consumers, and dead-letter queues. | Improve production connection | P2 |
| `databases-multi-region-consistency-001` | System design | databases | MCQ | Good | Good consistency trade-off framing. Could use a stronger mental picture for two paths and a more explicit final takeaway. | Add mental picture | P2 |
| `java-core-equals-vs-double-equals-001` | Java | java-core | MCQ | Good | Very beginner-friendly story, table, and common trap. Missing explicit `finalTakeaway` field, though body has a remember-this checklist. | Improve final takeaway | P2 |
| `java-core-checked-vs-unchecked-exceptions-001` | Java | java-core | learning | Excellent | Strong hierarchy diagram, predict-before-reveal prompt, examples, API design warning, production boundary note, and memory sentence. | Keep as-is | P3 |
| `java-core-pass-by-value-object-references-001` | Java | java-core | MCQ | Excellent | Excellent remote-control mental model, diagrams, reassignment vs mutation contrast, and memory sentence. | Keep as-is | P3 |
| `java-core-hashmap-behavior-001` | Java | java-core | learning | Excellent | Strong bucket mental picture, collision misconception coverage, mutable-key warning, and production performance intuition. | Keep as-is | P3 |

## High-priority issues found

### P0 issues

No P0 production risk was found in the reviewed production-visible set.

### P1 issues

No P1 issue remains after clarifying the URL shortener pair.

Resolved clarification:

1. **Clarified the role of `scalability-url-shortener-001`.**
   - `scalability-url-shortener-v2` is the current canonical learner-facing walkthrough.
   - `scalability-url-shortener-001` is the older legacy wrapper retained as a design-review/scoring drill.
   - Both files now include comments that explain the relationship and reduce future confusion.
   - The legacy wrapper keeps metadata that marks its role with `contentRole: 'design-review-drill'` and `relatedTeachingProblemId: 'scalability-url-shortener-v2'`.

## Common quality gaps

### 1. MCQs often explain the correct answer well but lack explicit final takeaways

Several MCQs include good `distractorExplanations` and a `selfExplanationPrompt`, but do not have a clear final memory sentence. The rubric expects learners to leave with a memorable takeaway.

Affected examples:

- `caching-product-details-001`
- `api-design-rate-limiting-001`
- `api-design-payment-idempotency-001`
- `messaging-queues-email-notification-001`
- `databases-multi-region-consistency-001`
- `scalability-realtime-updates-001`
- `java-core-equals-vs-double-equals-001`

### 2. Some visual explanations are useful but compressed

The concise string-based `visualExplanation` fields help, but several system-design MCQs would be stronger with a small table or flow block where the app already supports it. This is especially useful for flow, state changes, and trade-offs.

Affected examples:

- `databases-multi-region-consistency-001`
- `scalability-realtime-updates-001`
- `api-design-payment-idempotency-001`

### 3. Production reality is uneven across categories

The Java learning problems and URL shortener v2 connect well to real developer work. Some MCQs have practical scenarios but do not always explain the production consequence deeply enough.

Affected examples:

- `messaging-queues-email-notification-001`: add idempotent consumer and dead-letter queue consequence.
- `api-design-rate-limiting-001`: add consequences of anonymous requests and distributed counters.
- `caching-product-details-001`: add stale data and invalidation trade-off.

### 4. Duplicate-topic risk exists in URL shortener content, but the current pair is intentionally separated

There are two production-visible URL shortener questions. This is currently intentional:

- `scalability-url-shortener-v2` is the canonical teaching walkthrough.
- `scalability-url-shortener-001` is the legacy review/scoring drill.

For future duplicate-looking problems, confirm which one is legacy and which one is in use before deleting, hiding, or rewriting either file. Add comments and role metadata where useful so future contributors do not confuse a review drill with a teaching walkthrough.

### 5. Metadata is present for production-visible questions, but content-role metadata is rare

The required production metadata is present in the reviewed production-visible set. However, only the URL shortener review drill uses `contentRole` and `relatedTeachingProblemId`. More metadata like this may help distinguish teaching walkthroughs, review drills, MCQs, and practice prompts as the bank grows.

## Missing or weak fields by pattern

| Field / support area | Current pattern | Recommended follow-up |
| --- | --- | --- |
| `finalTakeaway` | Often implicit in body/checklist/callout, especially MCQs. | Add explicit final memory sentences to MCQs. |
| `mentalPicture` | Strong in DSA and Java learning problems; less explicit in some system MCQs. | Add compact mental-picture wording where concepts are abstract. |
| `visualExplanation` | Present in many MCQs, but sometimes compressed as plain text. | Upgrade high-value flow/trade-off questions to supported rich blocks where useful. |
| `productionReality` | Strong in URL shortener v2 and some Java learning content; lighter in MCQs. | Add one production consequence per system MCQ. |
| `commonMistake` | Strong in DSA/Java; system MCQs rely mostly on distractor explanations. | Add common mistake callouts where the misconception is common in interviews. |
| `metadata` | Required production metadata appears present in reviewed prod-visible questions. | Continue enforcing metadata during future question batches. |

## Recommended follow-up issues

1. **Maintain DSA quality standard for future production questions**
   - Current DSA set is strong, so future DSA additions should preserve the same level of intuition, trace support, and common-mistake coverage.

2. **Add visual walkthroughs to high-value DSA questions**
   - Prioritize questions involving pointer movement, DP tables, graph traversal, stack state, and queue state.

3. **Standardize MCQ distractor explanations**
   - Current migrated MCQs already have useful distractor explanations. Follow-up should standardize format and ensure each distractor maps to a real misconception.

4. **Improve system design production question clarity**
   - With the URL shortener pair clarified, start with system MCQs that need stronger final takeaways, production reality, or mental pictures.

5. **Improve backend engineering production question clarity**
   - As backend topics grow, require a production-reality note, common mistake, and final takeaway before prod approval.

6. **Add automated production metadata guardrails**
   - No required metadata gaps were found in the reviewed set, but add automated or documented checks to prevent future gaps.

7. **Add missing mental pictures and final takeaways to production questions**
   - Begin with MCQs listed in the common gaps section.

8. **Add missing production-reality notes to system MCQs**
   - Add one practical consequence, failure mode, or operational warning to each high-value system-design MCQ.

## Suggested fix order

1. Fix P0 production risks and metadata issues.
2. Improve production-visible questions rated Not production-ready.
3. Improve high-traffic or high-value questions rated Needs revision.
4. Add missing mental pictures and final takeaways to MCQs.
5. Add visual explanations where they improve understanding.
6. Add new question batches only after weak existing content is mapped.

## Reviewer checklist used

This checklist is adapted from `docs/content-quality-rubric.md`:

- Does the question explain the idea in plain language first?
- Does it create a useful mental picture?
- Does it explain why the answer works?
- Does it avoid unexplained jargon?
- Does it control cognitive load?
- Does it guide learner attention toward the important idea?
- Does it include predict-before-reveal or self-explanation prompts where useful?
- Does it include a common mistake where useful?
- Does it connect to real developer work or interview reasoning?
- Does it avoid unnecessary repetition?
- Does it include visual support where it would improve understanding?
- Does it leave the learner with a memorable takeaway?
- Does it include approved production metadata?
- Is the content emotionally clear, calm, and human?
- Would a motivated beginner understand the main idea?
- Would a real developer still find it technically useful?

## Notes and assumptions

- This audit intentionally does not perform large rewrites.
- This audit intentionally does not add new question batches.
- This audit intentionally does not change UI, routing, styling, rendering components, or app behavior.
- The audit found no clearly broken production-visible question.
- The main improvement opportunity is consistency: make every production-visible question feel as intuitive and memorable as the strongest Java, DSA, and URL shortener v2 examples.

## Validation

Documentation-only and comment-only change. Suggested validation commands for the PR:

```bash
npm run lint
npm run test:unit
npm run test:integration
npm run build
```

Validation status for this audit PR should be recorded in the PR body after commands are run locally or in CI.
