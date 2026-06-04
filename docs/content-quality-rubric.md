# Production Content Quality Rubric

## Purpose

This rubric protects the learning quality of Senior Dev Accelerator as the question bank grows for a larger global audience.

It supports #95 by giving contributors and reviewers a shared quality gate for creating, reviewing, auditing, and improving manifest-declared academy content.

A strong production question should make the learner feel:

> I finally understand this.

Future content audits and question-expansion issues should use this rubric before marking new questions as production-visible.

## Production-ready question standard

A production-ready question must be:

- technically correct;
- clear;
- intuitive;
- practical;
- non-repetitive;
- memorable;
- beginner-friendly without being shallow;
- useful for real developer growth;
- able to create a clear mental picture;
- emotionally calm and human in tone.

The question should explain the idea, not just state the answer. It should help a motivated beginner understand the main point while still giving a real developer something useful to remember or apply.

## Preferred explanation flow

Use this flow where it fits the problem type:

1. Concrete story or plain-language opening
2. Mental picture
3. Intuition
4. Technical concept
5. Step-by-step reasoning
6. Production or interview connection
7. Common mistake
8. Final takeaway

Not every field must appear with these exact names. The goal is the learning sequence: start concrete, build intuition, then connect to real technical use.

## Learning-science requirements

### Cognitive load control

Break complex ideas into small meaningful chunks. Introduce complexity gradually. Remove decorative, repetitive, or low-value text. Do not make the learner hold too many moving parts in memory at once.

### Attention guidance

Use headings, labels, callouts, arrows, visual focus cues, step labels, or short tables to show what the learner should notice.

### Predict-before-reveal moments

Where useful, ask the learner to predict the answer, next step, trade-off, bug, or consequence before revealing it.

Example:

> Before checking the answer, which half of the array can we safely discard?

### Self-explanation prompts

Add small prompts that help the learner explain the idea back to themselves.

Example:

> In one sentence, why does this cache reduce database load?

### Worked example -> guided practice -> independent challenge

Where useful, teach through progression:

1. show a worked example;
2. guide the learner through a similar step;
3. ask the learner to reason through a related case independently.

### Misconception-first teaching

Identify likely wrong mental models and replace them with better ones.

Example:

- Weak mental model: “A cache replaces the database.”
- Better mental model: “A cache is a fast helper. The database remains the source of truth unless the design says otherwise.”

### Concrete-to-abstract explanations

Prefer this order:

1. concrete story;
2. mental picture;
3. technical concept;
4. formal rule;
5. real-world application.

### Contrast pairs

Use comparison when nearby ideas are easy to confuse, such as:

- cache vs database;
- queue vs stack;
- authentication vs authorization;
- replication vs sharding;
- greedy vs dynamic programming;
- load balancer vs API gateway.

### Emotional clarity

Explanations should feel calm, patient, and human. Avoid answer dumps, dry textbook tone, unexplained leaps, and wording that makes the learner feel judged.

## Visual explanation rules

Use visuals when they make the concept easier to understand. Visuals should simplify understanding, not decorate the page.

Use visual explanations when a topic involves:

- movement;
- flow;
- state changes;
- pointer or index movement;
- queue or stack state;
- tree traversal;
- graph traversal;
- dynamic programming dependencies;
- system architecture flow;
- bottlenecks;
- trade-offs;
- hidden structure.

Useful visual explanation types include:

- diagrams;
- visual walkthroughs;
- step frames;
- tables;
- animation frames;
- pointer/index traces;
- queue states;
- stack states;
- dependency arrows;
- architecture flow diagrams.

Use supported app fields and rich body blocks where they already exist, such as `body` sections, callouts, tables, diagrams, flows, comparisons, checklists, code blocks, and architecture decisions. Do not invent a hard requirement for fields or renderers that the app does not currently support.

Examples of useful visuals:

- Sliding window: show left pointer, right pointer, current window, entering value, leaving value, and tracked state.
- Stack: show push/pop steps and explain why an item is removed.
- Binary search: show the eliminated search range and why the answer cannot be there.
- Graph BFS: show visited nodes, queue contents, and frontier expansion.
- Dynamic programming: show table cells, dependency arrows, and fill order.
- System design: show clients, services, databases, queues, caches, bottlenecks, and trade-offs.

## Required production metadata

Every real production question must include approved production metadata:

```js
metadata: {
  reviewStatus: 'approved',
  visibility: ['dev', 'prod']
}
```

Use `approved` and `prod` only after the question has been reviewed against this rubric. Draft, experimental, incomplete, or local-only content should stay dev-only.

## Required and recommended fields by problem type

The production metadata above is required for every production-visible question. Other fields below are recommended based on problem type, learner value, and current app support.

### DSA learning questions

Recommended fields:

- `title`
- `category`
- `topicId`
- `type`
- `difficulty`
- `estimatedTime`
- `tags`
- `scenario`
- `question` or `prompt`
- `plainLanguageExplanation`
- `intuition`
- `mentalPicture`
- `realWorldAnalogy` where helpful
- `starterThought`
- `hints`
- `stepByStepBreakdown`
- `visualExplanation` where useful
- `visualWalkthrough` where useful
- `stepFrames` where useful
- `bruteForceThought`
- `optimizationJourney`
- `finalPattern`
- `complexityAnalysis`
- `commonMistake` or `commonMistakes`
- `edgeCases`
- `relatedConcepts`
- `examples`
- `constraints`
- `solution` or `solutionCode` where appropriate
- `metadata`

### System design questions

Recommended fields:

- `title`
- `category`
- `topicId`
- `type`
- `difficulty`
- `estimatedTime`
- `tags`
- `scenario`
- `prompt`
- `plainLanguageExplanation`
- `mentalPicture`
- `realWorldAnalogy`
- `architectureOverview`
- `stepByStepBreakdown`
- `diagram` where useful
- `tradeOffs`
- `bottlenecks`
- `scalingConsiderations`
- `productionReality`
- `commonMistakes`
- `finalTakeaway`
- `relatedConcepts`
- `metadata`

### Backend engineering questions

Recommended fields:

- `title`
- `category`
- `topicId`
- `type`
- `difficulty`
- `estimatedTime`
- `tags`
- `scenario`
- `question` or `prompt`
- `plainLanguageExplanation`
- `intuition`
- `stepByStepBreakdown`
- `productionReality`
- `engineeringInsight`
- `tradeOffs`
- `commonMistake`
- `finalTakeaway`
- `relatedConcepts`
- `metadata`

### Java questions

Recommended fields:

- `title`
- `category`
- `topicId`
- `type`
- `difficulty`
- `estimatedTime`
- `tags`
- `scenario`
- `question` or `prompt`
- `plainLanguageExplanation`
- `intuition`
- `stepByStepBreakdown`
- `codeExample` where useful
- `commonMistake`
- `productionReality`
- `finalTakeaway`
- `relatedConcepts`
- `metadata`

### Database questions

Recommended fields:

- `title`
- `category`
- `topicId`
- `type`
- `difficulty`
- `estimatedTime`
- `tags`
- `scenario`
- `question` or `prompt`
- `plainLanguageExplanation`
- `mentalPicture`
- `stepByStepBreakdown`
- `queryExample` where useful
- `tradeOffs`
- `productionReality`
- `commonMistake`
- `finalTakeaway`
- `relatedConcepts`
- `metadata`

### DevOps/cloud questions

Recommended fields:

- `title`
- `category`
- `topicId`
- `type`
- `difficulty`
- `estimatedTime`
- `tags`
- `scenario`
- `question` or `prompt`
- `plainLanguageExplanation`
- `mentalPicture`
- `operationalContext`
- `stepByStepBreakdown`
- `tradeOffs`
- `failureModes`
- `productionReality`
- `commonMistake`
- `finalTakeaway`
- `metadata`

### Security questions

Recommended fields:

- `title`
- `category`
- `topicId`
- `type`
- `difficulty`
- `estimatedTime`
- `tags`
- `scenario`
- `question` or `prompt`
- `plainLanguageExplanation`
- `threatModel` where useful
- `commonMistake`
- `safePractice`
- `productionReality`
- `finalTakeaway`
- `metadata`

### Engineering leadership / soft-skill questions

Recommended fields:

- `title`
- `category`
- `topicId`
- `type`
- `difficulty`
- `estimatedTime`
- `tags`
- `scenario`
- `question` or `prompt`
- `plainLanguageExplanation`
- `leadershipIntuition`
- `likelyWrongMentalModel`
- `betterMentalModel`
- `stepByStepReasoning`
- `practicalTradeOffs`
- `commonMistake`
- `teamReality`
- `selfReflectionPrompt`
- `finalTakeaway`
- `metadata`

### MCQs

Recommended fields:

- `title`
- `category`
- `topicId`
- `type`
- `difficulty`
- `estimatedTime`
- `tags`
- `scenario`
- `question`
- `options`
- `correctAnswer`
- `explanation`
- `distractorExplanations` where useful
- `finalTakeaway`
- `metadata`

## MCQ quality standard

MCQs should include:

- one best answer;
- plausible distractors;
- no trick wording;
- a clear explanation for why the correct answer is correct;
- an explanation for why wrong answers are tempting but wrong, where useful;
- a practical scenario where possible;
- a final takeaway.

Suggested field:

```js
distractorExplanations: {
  A: 'Tempting because...',
  B: 'Correct because...',
  C: 'Wrong because...',
  D: 'Wrong because...'
}
```

A good distractor should reveal a real misconception. Avoid obviously silly options that make the question too easy without teaching anything.

## Review classification model

Use this model when reviewing existing production questions:

| Rating | Meaning | Action |
| --- | --- | --- |
| Excellent | Technically correct, clear, intuitive, practical, and memorable. | Keep as-is. |
| Good | Usable and production-safe, but could be easier to understand or more polished. | Make minor clarity improvements when convenient. |
| Needs revision | Technically useful but unclear, shallow, incomplete, repetitive, or hard to picture. | Improve before expanding similar content. |
| Not production-ready | Incorrect, confusing, too shallow, missing required metadata, or not useful enough for learners. | Hide from prod until improved. |

## Scoring dimensions

Use this 0-3 scale for content review:

- 0 = missing or poor
- 1 = present but weak
- 2 = acceptable
- 3 = strong

Score these dimensions:

| Dimension | What to check |
| --- | --- |
| Correctness | The answer and explanation are technically accurate. |
| Clarity | The learner can understand the main point without rereading many times. |
| Intuition | The content explains why the idea works, not just what it is. |
| Mental picture | The learner can visualize the process, structure, or trade-off. |
| Practical usefulness | The lesson connects to real developer work, production systems, or interviews. |
| Non-repetition | The explanation avoids repeated wording that does not add meaning. |
| Cognitive load control | The idea is broken into small, meaningful chunks. |
| Attention guidance | The content shows what to notice at each step. |
| Visual support where useful | The question uses diagrams, tables, traces, or flows when they improve understanding. |
| Common mistake coverage | The content addresses likely wrong mental models. |
| Final takeaway quality | The learner leaves with a memorable rule or insight. |
| Production metadata correctness | Approved production questions include required metadata. |

Recommended audit output:

| Question ID | Category | Topic | Rating | Main issue | Recommended action |
| --- | --- | --- | --- | --- | --- |
| example-id | dsa | sliding-window | Needs revision | Missing step trace | Add visual walkthrough and common mistake |

## Good vs weak examples

### Weak explanation vs improved explanation

Weak:

> Binary search checks the middle and repeats until it finds the value.

Improved:

> Binary search works when the data has an order. Instead of checking every item, you ask: can the answer still be on the left side or the right side? Each step throws away the half where the answer cannot be.

### Weak mental picture vs strong mental picture

Weak:

> Sliding window uses two pointers.

Strong:

> Imagine a camera frame moving across a row of numbers. The frame only cares about what is inside it. When the frame moves, one value may enter and one value may leave, so we update only what changed instead of recalculating everything.

### Weak MCQ explanation vs strong MCQ explanation

Weak:

> B is correct because caching improves performance.

Strong:

> B is correct because caching keeps frequently used data close to the application, reducing repeated database reads. A is tempting because databases are reliable, but reading from the database every time can become slow and expensive under heavy traffic.

### Weak visual usage vs useful visual usage

Weak:

> A decorative diagram that repeats the same words already in the explanation.

Useful:

> A sliding-window step table showing left index, right index, current window, entering character, leaving character, frequency map, and best answer after each step.

## Reviewer checklist

Use this checklist in future PRs:

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

## How to use this rubric in future PRs

Future content PRs should:

- mention whether new or changed questions were checked against this rubric;
- include a short content-quality summary in the PR body;
- avoid merging large content batches without review;
- split broad content work into focused topic batches;
- use this rubric during audits of existing production questions;
- use this rubric before marking new questions as prod-visible.

Recommended PR note:

```md
## Content quality

- Checked new or changed questions against `docs/content-quality-rubric.md`.
- Main learning-quality focus: clarity, intuition, mental picture, common mistakes, and final takeaway.
- Production metadata verified for prod-visible questions.
```

This rubric should be referenced by future audit and question-expansion issues under #95.
