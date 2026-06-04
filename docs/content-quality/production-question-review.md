# Production Question Quality Review

## Parent epic

Part of #95 — Epic: Expand production question bank with world-class clarity and intuition.

## Issue

#98 — Review existing production questions against clarity and learning-science guidelines.

## Review goal

Review current production-visible discovered questions against the #95 quality bar. This is documentation-only review work: no new production questions were added, and no production visibility was changed.

## Review method

Production-visible questions were identified in manifest-declared academy content by looking for approved production metadata:

```js
metadata: {
  reviewStatus: 'approved',
  visibility: ['dev', 'prod']
}
```

Each question was reviewed against:

- clarity and intuition
- mental picture and visual understanding
- cognitive load control
- attention guidance
- practical developer usefulness
- misconception handling
- concrete-to-abstract explanation quality
- predict-before-reveal and self-explanation opportunities
- MCQ distractor quality where applicable
- DSA walkthrough quality where applicable
- System Design trade-off and production-reality quality where applicable

## Rating scale

| Rating | Meaning |
|---|---|
| Excellent | Already meets the production quality standard and needs no immediate improvement. |
| Good | Production-safe, useful, and clear, but could become more intuitive or visual. |
| Needs revision | Useful but has meaningful clarity, intuition, mental-picture, or learning-support gaps. |
| Not production-ready | Should be improved before being treated as high-quality production content. |

## Summary

Reviewed production-visible questions: **14**.

| Rating | Count |
|---|---:|
| Excellent | 2 |
| Good | 10 |
| Needs revision | 2 |
| Not production-ready | 0 |

Overall, the current production bank is technically safe and generally learner-friendly. The strongest content is the newer rich Java explanation and URL Shortener v2 content. The biggest cross-cutting gap is that many MCQs explain the correct answer but do not provide structured distractor explanations, predict-before-reveal prompts, or explicit self-explanation moments. The DSA wrapper questions are useful, but the current production DSA set needs more concrete trace support and step-frame walkthroughs to fully meet the #95 standard.

## Production question inventory

| ID | Title | Category | Topic | Type | File path | Rating | Priority |
|---|---|---|---|---|---|---|---|
| java-core-equals-vs-double-equals-001 | equals() vs == | java | java-core | mcq | `src/academies/tech/java/java-core/practice/equals-vs-double-equals.js` | Excellent | Low |
| java-core-pass-by-value-object-references-001 | Java Pass-by-Value and Object References | java | java-core | mcq | `src/academies/tech/java/java-core/practice/pass-by-value-object-references.js` | Excellent | Low |
| java-core-hashmap-behavior-001 | HashMap Behavior at a High Level | java | java-core | learning | `src/academies/tech/java/java-core/lessons/hashmap-behavior.js` | Good | Medium |
| java-core-checked-vs-unchecked-exceptions-001 | Checked vs Unchecked Exceptions | java | java-core | learning | `src/academies/tech/java/java-core/lessons/checked-vs-unchecked-exceptions.js` | Good | Medium |
| sliding-window-001 | Maximum Sum Subarray of Size K | dsa | sliding-window | coding | `src/academies/tech/dsa/sliding-window/practice/sliding-window-001.js` | Needs revision | High |
| dynamic-programming-020 | Minimum Sideway Jumps | dsa | dynamic-programming | coding | `src/academies/tech/dsa/dynamic-programming/practice/dynamic-programming-020.js` | Good | Medium |
| api-design-rate-limiting-001 | Choosing a Simple Rate Limiting Strategy | system | api-design | mcq | `src/academies/tech/system/api-design/practice/api-design-rate-limiting-001.js` | Good | Medium |
| api-design-payment-idempotency-001 | Preventing Duplicate Payment Processing | system | api-design | mcq | `src/academies/tech/system/api-design/practice/api-design-payment-idempotency-001.js` | Good | Medium |
| caching-product-details-001 | Reducing Database Load with Caching | system | caching | mcq | `src/academies/tech/system/caching/practice/caching-product-details-001.js` | Good | Medium |
| messaging-queues-email-notification-001 | Handling Slow Email Notifications | system | messaging-queues | mcq | `src/academies/tech/system/messaging-queues/practice/messaging-queues-email-notification-001.js` | Good | Medium |
| scalability-realtime-updates-001 | Scaling Live Order Status Updates | system | scalability | mcq | `src/academies/tech/system/scalability/practice/scalability-realtime-updates-001.js` | Good | Medium |
| databases-multi-region-consistency-001 | Choosing a Multi-Region Consistency Strategy | system | databases | mcq | `src/academies/tech/system/databases/practice/databases-multi-region-consistency-001.js` | Good | Medium |
| scalability-url-shortener-001 | Design a URL Shortener | system | scalability | complex-system-design | `src/academies/tech/system/scalability/practice/scalability-url-shortener-001.js` | Needs revision | High |
| scalability-url-shortener-v2 | Design a URL Shortener | system | scalability | complex-system-design | `src/academies/tech/system/scalability/practice/url-shortener-v2.js` | Good | Medium |

## Detailed per-question review

### Question ID: java-core-equals-vs-double-equals-001

Title: equals() vs ==
Category: java
Topic: java-core
Type: mcq
File: `src/academies/tech/java/java-core/practice/equals-vs-double-equals.js`
Current rating: Excellent
Priority: Low

What works well:

- Uses a simple lunch-box analogy before technical details.
- Includes a compact Java example and a comparison table.
- Clearly separates reference equality from logical equality.
- Ends with memorable checklist guidance.

What is missing:

- Could optionally add structured distractor explanations, but the current explanation already addresses the main misconception.

Recommended improvements:

- Add `distractorExplanations` later if the MCQ renderer supports displaying them consistently.

Needs visual, animation, diagram, table, or step-frame support: No
Suggested visual support: Existing table and code block are enough.
MCQ distractor explanation needed: Optional

Review checklist: main idea yes; intuition before mechanics yes; jargon controlled yes; mental picture yes; cognitive load yes; attention guidance yes; predict-before-reveal could benefit; self-explanation could benefit; misconception yes; real software connection yes; common mistake yes; clear takeaway yes.

### Question ID: java-core-pass-by-value-object-references-001

Title: Java Pass-by-Value and Object References
Category: java
Topic: java-core
Type: mcq
File: `src/academies/tech/java/java-core/practice/pass-by-value-object-references.js`
Current rating: Excellent
Priority: Low

What works well:

- Strong concrete mental model using copied references.
- Excellent step-by-step diagrams for reassignment versus mutation.
- Explains the likely misconception directly: Java is not pass-by-reference.
- Uses contrast pairs and mutation examples to deepen understanding.

What is missing:

- No major gap for production quality.

Recommended improvements:

- Add a short predict-before-reveal prompt before the answer if the product supports that interaction.

Needs visual, animation, diagram, table, or step-frame support: No
Suggested visual support: Existing diagrams and flow steps are sufficient.
MCQ distractor explanation needed: Optional

Review checklist: main idea yes; intuition before mechanics yes; jargon controlled yes; mental picture yes; cognitive load yes; attention guidance yes; predict-before-reveal could benefit; self-explanation could benefit; misconception yes; real software connection yes; common mistake yes; clear takeaway yes.

### Question ID: java-core-hashmap-behavior-001

Title: HashMap Behavior at a High Level
Category: java
Topic: java-core
Type: learning
File: `src/academies/tech/java/java-core/lessons/hashmap-behavior.js`
Current rating: Good
Priority: Medium

What works well:

- Clear high-level story: hash first, then equality check.
- Covers hashing, buckets, collisions, resizing, mutable keys, and production mistakes.
- Includes useful table, code examples, and checklist.

What is missing:

- No visual bucket walkthrough showing two keys landing in the same bucket.
- Could include a small predict-before-reveal moment for mutable key behavior.

Recommended improvements:

- Add a simple bucket diagram or step frame for `put` and `get`.
- Add a misconception-first callout: “same hash does not mean same key.”
- Add one self-explanation prompt asking the learner to explain why a mutated key becomes hard to find.

Needs visual, animation, diagram, table, or step-frame support: Yes
Suggested visual support: bucket diagram and collision step frames.
MCQ distractor explanation needed: Not applicable

### Question ID: java-core-checked-vs-unchecked-exceptions-001

Title: Checked vs Unchecked Exceptions
Category: java
Topic: java-core
Type: learning
File: `src/academies/tech/java/java-core/lessons/checked-vs-unchecked-exceptions.js`
Current rating: Good
Priority: Medium

What works well:

- Strong simple distinction between compiler-forced handling and runtime-only handling.
- Good table and realistic API-design warning.
- Connects exception choice to backend boundary design.

What is missing:

- Could make the exception hierarchy more visual.
- Could better contrast “recoverable operation failure” with “caller violated method contract.”

Recommended improvements:

- Add a small hierarchy diagram: `Throwable -> Exception -> RuntimeException` and `Error`.
- Add a scenario table where the learner predicts checked or unchecked before revealing the recommendation.

Needs visual, animation, diagram, table, or step-frame support: Yes
Suggested visual support: exception hierarchy diagram and predict-before-reveal scenario table.
MCQ distractor explanation needed: Not applicable

### Question ID: sliding-window-001

Title: Maximum Sum Subarray of Size K
Category: dsa
Topic: sliding-window
Type: coding
File: `src/academies/tech/dsa/sliding-window/practice/sliding-window-001.js`
Current rating: Needs revision
Priority: High

What works well:

- Has the right invariant language and a useful pattern-first framing.
- Includes constraints, hints, brute-force baseline, optimization journey, common mistakes, and production reality.
- Useful as a general pattern prompt.

What is missing:

- Too abstract for a learner who needs the concrete movement of a fixed-size window.
- Does not show a specific numeric array trace for the stated problem.
- Complexity explanation is generic rather than tied to the fixed-size sliding sum.
- Needs a clearer answer path from brute force to rolling sum.

Recommended improvements:

- Add a concrete example such as `arr = [2, 1, 5, 1, 3, 2], k = 3`.
- Add step frames showing the window sum as right moves and left exits.
- Explain the exact reuse: subtract outgoing value, add incoming value.
- Add final complexity: `O(n)` time and `O(1)` extra space.

Needs visual, animation, diagram, table, or step-frame support: Yes
Suggested visual support: array trace, rolling-sum table, window movement animation.
MCQ distractor explanation needed: Not applicable

### Question ID: dynamic-programming-020

Title: Minimum Sideway Jumps
Category: dsa
Topic: dynamic-programming
Type: coding
File: `src/academies/tech/dsa/dynamic-programming/practice/dynamic-programming-020.js`
Current rating: Good
Priority: Medium

What works well:

- Strong concrete scenario and clear invariant.
- Excellent compressed-state explanation using three lane costs.
- Includes a visual walkthrough structure with frame-by-frame DP states.
- Complexity is specific and useful.

What is missing:

- The Python solution appears before a learner may have fully predicted the state transitions.
- Could use a shorter self-explanation prompt after each frame.

Recommended improvements:

- Add a predict-before-reveal prompt: “Which lane becomes impossible at this position?”
- Add a compact table summarizing each obstacle, blocked lane, and resulting DP state.

Needs visual, animation, diagram, table, or step-frame support: Yes
Suggested visual support: Existing visual walkthrough is strong; add compact DP-state table.
MCQ distractor explanation needed: Not applicable

### Question ID: api-design-rate-limiting-001

Title: Choosing a Simple Rate Limiting Strategy
Category: system
Topic: api-design
Type: mcq
File: `src/academies/tech/system/api-design/practice/api-design-rate-limiting-001.js`
Current rating: Good
Priority: Medium

What works well:

- Scenario is realistic and simple.
- Correctly guides attention to identity and bounded expiring counters.
- Explains why adding capacity is not abuse control.

What is missing:

- No structured distractor explanations.
- Could include a small timeline/window visual.

Recommended improvements:

- Add `distractorExplanations` for storing all requests, adding servers, and disabling authentication.
- Add a 60-second counter timeline diagram.

Needs visual, animation, diagram, table, or step-frame support: Yes
Suggested visual support: fixed-window timeline or token bucket comparison table.
MCQ distractor explanation needed: Yes

### Question ID: api-design-payment-idempotency-001

Title: Preventing Duplicate Payment Processing
Category: system
Topic: api-design
Type: mcq
File: `src/academies/tech/system/api-design/practice/api-design-payment-idempotency-001.js`
Current rating: Good
Priority: Medium

What works well:

- Strong real-world scenario with high correctness stakes.
- Explains timeout ambiguity well.
- Connects to reconciliation and stored payment attempts.

What is missing:

- No sequence diagram showing first request, timeout, retry, and same stored result.
- No structured distractor explanations.

Recommended improvements:

- Add a payment attempt timeline/sequence diagram.
- Add distractor explanations for rejecting retries, processing every retry, and logging only after provider success.
- Add a self-explanation prompt around reusing the same idempotency key with a different amount.

Needs visual, animation, diagram, table, or step-frame support: Yes
Suggested visual support: idempotency sequence diagram.
MCQ distractor explanation needed: Yes

### Question ID: caching-product-details-001

Title: Reducing Database Load with Caching
Category: system
Topic: caching
Type: mcq
File: `src/academies/tech/system/caching/practice/caching-product-details-001.js`
Current rating: Good
Priority: Medium

What works well:

- Clear read-heavy scenario.
- Explains cache freshness and invalidation as part of the design, not an afterthought.
- Good production reality around TTLs and event-based invalidation.

What is missing:

- No cache-hit/cache-miss step-frame or freshness trade-off table.
- No structured distractor explanations.

Recommended improvements:

- Add a cache-aside flow diagram with hit, miss, and invalidation paths.
- Add distractor explanations for write-on-view, removing descriptions, and duplicate rows.

Needs visual, animation, diagram, table, or step-frame support: Yes
Suggested visual support: cache-aside flow diagram and freshness trade-off table.
MCQ distractor explanation needed: Yes

### Question ID: messaging-queues-email-notification-001

Title: Handling Slow Email Notifications
Category: system
Topic: messaging-queues
Type: mcq
File: `src/academies/tech/system/messaging-queues/practice/messaging-queues-email-notification-001.js`
Current rating: Good
Priority: Medium

What works well:

- Very clear separation between critical checkout path and async notification work.
- Explains latency isolation, retry behavior, and dead-letter queues.
- Good practical developer usefulness.

What is missing:

- Could better show queue durability and retry path visually.
- No structured distractor explanations.

Recommended improvements:

- Add sequence flow: checkout API -> order creation -> queue -> worker -> email provider.
- Add retry/dead-letter branch to the visual.
- Add distractor explanations for browser retry, blocking orders, and localStorage.

Needs visual, animation, diagram, table, or step-frame support: Yes
Suggested visual support: async queue sequence diagram with retry branch.
MCQ distractor explanation needed: Yes

### Question ID: scalability-realtime-updates-001

Title: Scaling Live Order Status Updates
Category: system
Topic: scalability
Type: mcq
File: `src/academies/tech/system/scalability/practice/scalability-realtime-updates-001.js`
Current rating: Good
Priority: Medium

What works well:

- Clear distributed routing problem.
- Explains why a single WebSocket server becomes a bottleneck.
- Connects to connection tracking, authorization, heartbeat handling, and backpressure.

What is missing:

- No diagram showing event producer, pub/sub broker, multiple WebSocket servers, and user connections.
- No structured distractor explanations.

Recommended improvements:

- Add architecture flow diagram for multi-server WebSocket fan-out.
- Add distractor explanations for frontend-only storage, one server forever, and disabling live updates.

Needs visual, animation, diagram, table, or step-frame support: Yes
Suggested visual support: pub/sub fan-out architecture diagram.
MCQ distractor explanation needed: Yes

### Question ID: databases-multi-region-consistency-001

Title: Choosing a Multi-Region Consistency Strategy
Category: system
Topic: databases
Type: mcq
File: `src/academies/tech/system/databases/practice/databases-multi-region-consistency-001.js`
Current rating: Good
Priority: Medium

What works well:

- Strong principal-level framing: consistency depends on business risk.
- Good contrast between catalog browsing and financial transactions.
- Explains why one consistency model everywhere is usually too blunt.

What is missing:

- Could use a two-lane architecture visual: catalog read model versus financial system of record.
- No structured distractor explanations.

Recommended improvements:

- Add a trade-off table for eventual versus strong consistency by workflow.
- Add distractor explanations for same model everywhere, browser cache, and disabling regions.

Needs visual, animation, diagram, table, or step-frame support: Yes
Suggested visual support: two-path multi-region architecture diagram.
MCQ distractor explanation needed: Yes

### Question ID: scalability-url-shortener-001

Title: Design a URL Shortener
Category: system
Topic: scalability
Type: complex-system-design
File: `src/academies/tech/system/scalability/practice/scalability-url-shortener-001.js`
Current rating: Needs revision
Priority: High

What works well:

- Broadly covers the right system design areas: APIs, mapping, collision handling, caching, analytics, scaling, security, reliability, and observability.
- Has a solid scoring rubric for interview-style evaluation.
- Technically safe enough for production, but not yet world-class as teaching content.

What is missing:

- It is a migrated legacy complex problem and is more rubric-heavy than learner-teaching-heavy.
- Needs richer body blocks, clearer architecture flow, and more concrete mental pictures.
- Duplicates the newer URL Shortener v2 topic area, which is stronger.

Recommended improvements:

- Prefer `scalability-url-shortener-v2` as the teaching reference.
- Either retire this older variant from production in a separate issue, or rewrite it into a distinct angle such as “URL shortener scoring drill.”
- Add architecture flow, read/write flows, cache-miss path, and analytics pipeline if kept.

Needs visual, animation, diagram, table, or step-frame support: Yes
Suggested visual support: architecture flow, create/redirect flow, analytics async flow, bottleneck table.
MCQ distractor explanation needed: Not applicable

### Question ID: scalability-url-shortener-v2

Title: Design a URL Shortener
Category: system
Topic: scalability
Type: complex-system-design
File: `src/academies/tech/system/scalability/practice/url-shortener-v2.js`
Current rating: Good
Priority: Medium

What works well:

- Strongest current system-design production item.
- Includes requirements, assumptions, APIs, data model, code generation, collision handling, redirect flow, analytics flow, scaling, abuse prevention, trade-offs, scoring rubric, and weak-answer guidance.
- Strong practical developer usefulness and production-reality coverage.

What is missing:

- Despite rich structured content, it still lacks an actual architecture diagram block with components and arrows.
- Could benefit from a learner-facing “predict the bottleneck” or “choose the trade-off” moment before revealing recommendations.

Recommended improvements:

- Add a top-level architecture diagram: Client/CDN -> Redirect Service -> Cache -> Mapping Store, plus Queue -> Analytics Workers -> Stats Store.
- Add one bottleneck/failure-mode table.
- Add predict-before-reveal prompts around 301 vs 302 and synchronous versus async analytics.

Needs visual, animation, diagram, table, or step-frame support: Yes
Suggested visual support: full architecture diagram and bottleneck/failure-mode table.
MCQ distractor explanation needed: Not applicable

## Common gaps found

1. **MCQ distractor explanations are the largest recurring gap.** Most MCQs explain why the correct answer is correct and mention why wrong answers are weak inside a paragraph, but they do not have structured, option-by-option distractor explanations.
2. **Predict-before-reveal moments are rare.** The content is explanatory, but learners are not often asked to make a small prediction before the explanation appears.
3. **Self-explanation prompts are underused.** Several questions have follow-up questions, but fewer ask the learner to restate the key mental model in their own words.
4. **Visual support is inconsistent.** The newer Java and DP content is strong visually, while several system-design MCQs would be much clearer with compact flow diagrams.
5. **Some migrated legacy wrappers are production-safe but less teachable.** `sliding-window-001` and `scalability-url-shortener-001` are useful, but they feel more like pattern/rubric prompts than polished learning experiences.
6. **Duplicate URL Shortener production coverage should be resolved deliberately.** The v2 version is much stronger as a teaching artifact; the older variant needs a distinct purpose or a visibility decision in a separate issue.

## Recommended follow-up issues

### High priority

1. **Improve DSA examples and visual walkthrough for `sliding-window-001`**
   - Add concrete numeric example, rolling-sum table, fixed-window step frames, and exact `O(n)` / `O(1)` explanation.

2. **Resolve duplicated URL Shortener production variants**
   - Decide whether `scalability-url-shortener-001` should be rewritten as a scoring drill, merged conceptually into v2, or made dev-only in a separate visibility-focused issue.

3. **Add structured MCQ distractor explanations across production MCQs**
   - Add option-by-option explanations for the six system MCQs and optionally the Java MCQs.

### Medium priority

4. **Add compact system-design visuals to production MCQs**
   - Rate limiting timeline.
   - Idempotency sequence diagram.
   - Cache-aside flow.
   - Queue retry/dead-letter flow.
   - Pub/sub fan-out diagram.
   - Multi-region consistency split-path diagram.

5. **Add visual and predict-before-reveal support to `java-core-hashmap-behavior-001`**
   - Bucket/collision walkthrough and mutable-key prediction prompt.

6. **Add hierarchy and scenario-prediction support to `java-core-checked-vs-unchecked-exceptions-001`**
   - Exception hierarchy diagram and checked/unchecked decision scenarios.

7. **Add architecture diagram and bottleneck table to `scalability-url-shortener-v2`**
   - Make the already-strong v2 problem more visually scannable.

### Low priority

8. **Add optional predict-before-reveal prompts to the strongest Java MCQs**
   - `equals() vs ==` and pass-by-value are already excellent; small interaction improvements would make them even stronger.

## Suggested priority order

1. Revise `sliding-window-001` because it is the clearest production DSA gap.
2. Decide what to do with duplicate URL Shortener variants.
3. Add structured distractor explanations for all production MCQs.
4. Add system-design visuals where they most improve mental models.
5. Polish the already-good Java learning items with diagrams and prediction prompts.
6. Add extra interaction polish to already-excellent Java MCQs only after higher-impact gaps are addressed.

## Validation

- Documentation-only change.
- No production content, visibility metadata, routing, UI, or service logic changed.
- Markdown structure reviewed for readability and clean rendering.

## Scope notes

This report completes the review and recommendation portion of #98. Follow-up implementation should happen in separate issues so this PR remains conservative and focused.
