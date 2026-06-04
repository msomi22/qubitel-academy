# Hard DSA Problem Roadmap

This document tracks candidate Hard DSA problems that should be added to the production-ready problem bank **one by one**.

The goal is not to bulk-add difficult problems. Each problem should be reviewed, authored, validated, and merged independently so the production bank stays high quality.

## Process

For each problem:

1. Create or review a dedicated GitHub issue.
2. Confirm the category/topic placement.
3. Author the problem under `src/academies/tech/dsa/<topic-id>/practice/` and declare it in the topic manifest.
4. Review the content against `docs/content-quality-rubric.md`.
5. Include a config-driven `visualWalkthrough` where it improves understanding.
6. Mark production-visible only after review:
   - `metadata.reviewStatus: 'approved'`
   - `metadata.visibility: ['dev', 'prod']`
7. Validate with:
   - `npm run test:unit`
   - `npm run build`

## Candidate Problems by Category

### Stack / String Parsing

| Problem | Suggested Topic | Notes |
| --- | --- | --- |
| `longest-valid-parentheses` | Stack | Teaches stack indices, invalid boundaries, and substring validity windows. |

### Dynamic Programming / Pattern Matching

| Problem | Suggested Topic | Notes |
| --- | --- | --- |
| `wildcard-matching` | Dynamic Programming | Teaches DP state design for `?` and `*` matching. |
| `regular-expression-matching` | Dynamic Programming | Teaches DP state transitions for `.` and `*`; should be added after a strong DP foundation problem. |

### Array / In-place Indexing

| Problem | Suggested Topic | Notes |
| --- | --- | --- |
| `first-missing-positive` | Arrays / In-place Hashing | Teaches using array indices as buckets while preserving O(n) time and O(1) extra space. |

### Backtracking / Constraint Solving

| Problem | Suggested Topic | Notes |
| --- | --- | --- |
| `sudoku-solver` | Backtracking | Teaches constraint propagation, candidate pruning, and recursive search. |

### Sliding Window / Hash Map

| Problem | Suggested Topic | Notes |
| --- | --- | --- |
| `substring-with-concatenation-of-all-words` | Sliding Window | Teaches fixed-size token windows, frequency maps, and window reset logic. |

### Linked List

| Problem | Suggested Topic | Notes |
| --- | --- | --- |
| `reverse-nodes-in-k-group` | Linked List | Teaches pointer surgery, group validation, and local reversal. |
| `merge-k-sorted-lists` | Linked List / Heap | Teaches heap-based merging and tradeoffs versus divide-and-conquer merging. |

### Binary Search / Divide and Conquer

| Problem | Suggested Topic | Notes |
| --- | --- | --- |
| `median-of-two-sorted-arrays` | Binary Search | Teaches partition-based binary search and boundary reasoning. |

## Suggested Addition Order

A balanced order is preferred so learners encounter different Hard problem families instead of many from one topic at once.

1. `substring-with-concatenation-of-all-words` — Sliding Window / Hash Map
2. `reverse-nodes-in-k-group` — Linked List
3. `first-missing-positive` — Array / In-place Indexing
4. `longest-valid-parentheses` — Stack
5. `merge-k-sorted-lists` — Linked List / Heap
6. `wildcard-matching` — Dynamic Programming
7. `sudoku-solver` — Backtracking
8. `regular-expression-matching` — Dynamic Programming
9. `median-of-two-sorted-arrays` — Binary Search

## Implementation Notes

- Each problem should be added in its own focused PR.
- Each PR should close its own implementation issue.
- Do not add all problems in one branch or PR.
- Do not use `src/academies/tech/_legacy/banks/**` as the primary source for new production-ready content.
- Existing legacy/raw versions may be used only as reference material and must still be rewritten/reviewed against the current rubric.
- The first implementation issue should start with one problem only, preferably `substring-with-concatenation-of-all-words` because it directly validates the Hard path for the Sliding Window topic.
