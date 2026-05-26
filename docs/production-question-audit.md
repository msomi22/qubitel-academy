# Production Question Quality Audit

## Purpose

This audit supports #95, the epic to expand the production question bank with world-class clarity and intuition.

The purpose is to protect the learning quality of Senior Dev Accelerator as the project begins receiving global users. Before adding more production content, this audit maps the current production-visible question bank and records the quality fixes completed from the audit.

This audit now reflects the resolved production question quality pass completed in PR #129.

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
- PR #129 removes the legacy URL shortener wrapper from production by changing its metadata to `reviewStatus: 'legacy'` and `visibility: ['dev']`.
- The audit is intentionally practical rather than academic: each note should be easy to verify in the related production problem files.

## Rating definitions

| Rating | Meaning | Action |
| --- | --- | --- |
| Excellent | Keep as-is. The question is technically correct, clear, intuitive, practical, memorable, and production-ready. | Keep as-is. |
| Good | Minor clarity improvement needed. The question is usable in production but could be clearer, more intuitive, or more polished. | Improve during quality pass. |
| Needs revision | Technically useful but unclear, shallow, incomplete, repetitive, missing important learning support, or hard to picture. | Improve before expanding similar content. |
| Not production-ready | Should be hidden from prod or fixed before being treated as production-quality. The question may be incorrect, confusing, too shallow, missing required metadata, or not useful enough for learners. | Hide from prod until improved or fix quickly. |

Priority values:

| Priority | Meaning |
| --- | --- |
| P0 | Production risk or clearly broken. |
| P1 | Important quality issue affecting learner understanding. |
| P2 | Useful improvement affecting consistency and learning quality. |
| P3 | Polish only. |

## Summary findings after remediation

The current production-visible question bank is small and now consistent enough to keep as the production baseline.

The strongest content already had strong teaching structure: plain-language explanations, mental pictures, visual support, common mistakes, practical production notes, and memorable takeaways.

The previous inconsistency came from several production-visible MCQs that were correct but too concise. PR #129 upgrades those MCQs with explicit `mentalPicture`, `productionReality`, `commonMistake`, `finalTakeaway`, and stronger `visualExplanation` content where useful.

No P0, P1, or P2 audit issues remain open in the reviewed production-visible set.

## Production question summary by category

| Category | Production-visible count | Excellent | Good | Needs revision | Not production-ready | Notes |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| DSA | 3 | 3 | 0 | 0 | 0 | Sliding Window now includes both a fixed-window foundation problem and one approved Hard token-window problem; Dynamic Programming remains especially complete. |
| Java | 4 | 4 | 0 | 0 | 0 | Java production questions now include strong beginner-friendly explanations and explicit final takeaways where needed. |
| System / API design | 2 | 2 | 0 | 0 | 0 | Rate limiting and payment idempotency now include stronger mental pictures, production notes, common mistakes, and final takeaways. |
| System / caching | 1 | 1 | 0 | 0 | 0 | Cache-aside now explicitly covers stale data, TTL/invalidation, and freshness trade-offs. |
| System / databases | 1 | 1 | 0 | 0 | 0 | Multi-region consistency now has a clearer two-lane mental model and business-risk takeaway. |
| System / messaging queues | 1 | 1 | 0 | 0 | 0 | Queue-based notifications now cover idempotent workers, retries, backoff, and dead-letter queues. |
| System / scalability | 2 | 2 | 0 | 0 | 0 | URL shortener v2 is the only production-visible URL shortener walkthrough; realtime updates now covers connection ownership and fan-out. |
| **Total** | **14** | **14** | **0** | **0** | **0** | No pending production-quality issue remains from this audit. |

> Note: `dynamic-programming-020` is counted under DSA even though most learner content is inherited from `src/data/banks/dsa/minimum-sideway-jumps.js`.

## Current production-visible question inventory

| Question ID | Category | Topic | Type | Current rating | Remediation status | Priority |
| --- | --- | --- | --- | --- | --- | --- |
| `sliding-window-001` | DSA | sliding-window | coding | Excellent | Already production-ready. | P3 |
| `substring-concatenation-words-001` | DSA | sliding-window | coding | Excellent | Added as an approved Hard token-window problem with frequency-map reasoning and a config-driven visual walkthrough. | P3 |
| `dynamic-programming-020` | DSA | dynamic-programming | coding | Excellent | Already production-ready. | P3 |
| `scalability-url-shortener-v2` | System design | scalability | complex system design | Excellent | Current canonical learner-facing walkthrough and only URL shortener visible in production/search. | P3 |
| `scalability-realtime-updates-001` | System design | scalability | MCQ | Excellent | Added mental picture, stronger event-routing visual, production reality, common mistake, and final takeaway. | P3 |
| `caching-product-details-001` | System design | caching | MCQ | Excellent | Added cache shelf mental picture, freshness/invalidation production note, common mistake, and final takeaway. | P3 |
| `api-design-rate-limiting-001` | System design | api-design | MCQ | Excellent | Added turnstile mental picture, distributed counter note, anonymous/authenticated caller warning, common mistake, and final takeaway. | P3 |
| `api-design-payment-idempotency-001` | System design | api-design | MCQ | Excellent | Added receipt-number mental picture, request-fingerprint flow, production retention note, common mistake, and final takeaway. | P3 |
| `messaging-queues-email-notification-001` | System design | messaging-queues | MCQ | Excellent | Added queue/work-tray mental picture, retry/backoff/DLQ production note, common mistake, and final takeaway. | P3 |
| `databases-multi-region-consistency-001` | System design | databases | MCQ | Excellent | Added two-lane mental picture, business-risk production note, common mistake, and final takeaway. | P3 |
| `java-core-equals-vs-double-equals-001` | Java | java-core | MCQ | Excellent | Added explicit mental picture, visual explanation, production reality, common mistake, and final takeaway. | P3 |
| `java-core-checked-vs-unchecked-exceptions-001` | Java | java-core | learning | Excellent | Already production-ready. | P3 |
| `java-core-pass-by-value-object-references-001` | Java | java-core | MCQ | Excellent | Already production-ready. | P3 |
| `java-core-hashmap-behavior-001` | Java | java-core | learning | Excellent | Already production-ready. | P3 |

## Dev-only legacy reference

| Question ID | Status | Replacement | Notes |
| --- | --- | --- | --- |
| `scalability-url-shortener-001` | Dev-only legacy reference | `scalability-url-shortener-v2` | Removed from production/search by setting `reviewStatus: 'legacy'` and `visibility: ['dev']`. Retained only as a reference to the migrated legacy bank wrapper. |

## High-priority issues found

### P0 issues

No P0 production risk was found in the reviewed production-visible set.

### P1 issues

No P1 issue remains after removing the legacy URL shortener wrapper from production.

Resolved clarification:

1. **Removed `scalability-url-shortener-001` from production visibility.**
   - `scalability-url-shortener-v2` is the current canonical learner-facing walkthrough.
   - `scalability-url-shortener-001` is the older legacy wrapper retained only for dev/reference use.
   - The legacy wrapper now has `metadata.reviewStatus: 'legacy'` and `metadata.visibility: ['dev']`.
   - Both files include comments explaining the relationship and reducing future confusion.

### P2 issues

No P2 issue remains open from the audit. The previous P2 quality gaps were remediated in PR #129.

## Resolved quality gaps

### 1. Explicit final takeaways added to MCQs

Resolved for:

- `caching-product-details-001`
- `api-design-rate-limiting-001`
- `api-design-payment-idempotency-001`
- `messaging-queues-email-notification-001`
- `databases-multi-region-consistency-001`
- `scalability-realtime-updates-001`
- `java-core-equals-vs-double-equals-001`

### 2. Mental pictures strengthened where concepts were abstract

Resolved for:

- `databases-multi-region-consistency-001`
- `scalability-realtime-updates-001`
- `api-design-payment-idempotency-001`
- `api-design-rate-limiting-001`
- `caching-product-details-001`
- `messaging-queues-email-notification-001`
- `java-core-equals-vs-double-equals-001`

### 3. Visual explanations improved where useful and made visible in the UI

Resolved for:

- `databases-multi-region-consistency-001`
- `scalability-realtime-updates-001`
- `api-design-payment-idempotency-001`
- `api-design-rate-limiting-001`
- `caching-product-details-001`
- `messaging-queues-email-notification-001`
- `java-core-equals-vs-double-equals-001`

`visualExplanation` now appears in the focused Visual Walkthrough tab when a question does not have a structured `visualWalkthrough` object.

### 4. Production-reality notes added to system MCQs

Resolved for:

- `messaging-queues-email-notification-001`: idempotent workers, retries, backoff, and dead-letter queues.
- `api-design-rate-limiting-001`: shared counters, caller identity, and anonymous traffic fallback keys.
- `caching-product-details-001`: stale data, TTLs, invalidation, and freshness contracts.
- `api-design-payment-idempotency-001`: request fingerprint, processing state, final outcome, and retention period.
- `databases-multi-region-consistency-001`: per-workflow consistency based on business risk.
- `scalability-realtime-updates-001`: connection ownership, reconnects, fan-out, and broker bottlenecks.

### 5. Common mistakes added where needed

Resolved for all previously `Good` MCQs listed in the audit.

### 6. Duplicate-topic risk removed from production

Only one URL shortener problem is now production-visible:

- `scalability-url-shortener-v2` is the canonical teaching walkthrough.

The legacy wrapper remains dev-only:

- `scalability-url-shortener-001` is retained only as a legacy reference and is not production-visible.

### 7. Metadata guardrail status

No required production metadata gaps were found in the reviewed production-visible set.

This audit does not add a new automated metadata test because the reviewed production set already has the required metadata and the current PR is focused on remediating the audited production content. Future batches should continue enforcing:

```js
metadata: {
  reviewStatus: 'approved',
  visibility: ['dev', 'prod']
}
```

## Recommended follow-up issues

No follow-up issue is required to complete this audit.

Future improvements can be treated as new enhancement work, not pending audit remediation:

1. Add automated production metadata guardrails for future batches.
2. Add richer step-frame support for future DSA questions involving pointer movement, DP tables, graph traversal, stack state, and queue state.
3. Continue using role metadata such as `contentRole`, `productionReplacementId`, and `relatedTeachingProblemId` when keeping legacy references beside canonical content.

## Suggested future quality order

1. Keep the current 14 production-visible questions as the baseline standard.
2. Add automated checks before scaling the question bank further.
3. Add new production batches only when they meet the same content standard.
4. When duplicate-looking problems are discovered, confirm which one is legacy and which one is current before hiding, deleting, or rewriting either file.

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

- This audit now records the completed remediation, not only the original findings.
- This PR adds one approved Hard DSA Sliding Window problem and updates the audit inventory to keep production counts accurate.
- This PR does not change routing, styling, rendering components unrelated to focused problem field visibility, or production visibility beyond the new approved problem.
- The audit found no clearly broken production-visible question.
- The main improvement opportunity was consistency, and the reviewed production-visible MCQs were upgraded to match the strongest Java, DSA, and URL shortener v2 examples.

## Validation

Content and documentation change. Suggested validation commands for the PR:

```bash
npm run lint
npm run test:unit
npm run test:integration
npm run build
```

Validation status for this PR should be recorded in the PR body after commands are run locally or in CI.
