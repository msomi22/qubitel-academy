---

paths:

* "src/academies/cbc/grade-1/**"
* "src/assets/academies/cbc/**"
* "docs/grade-1/**"
* "docs/design-references/**"

---

# Grade 1 Question Authoring Rules

## Purpose

Use this rule whenever Cline creates or edits Grade 1 CBC questions, practice items, assessments, exams, read-aloud content, visual hints, or answer options.

Grade 1 content must be simple, clear, child-friendly, and safe for early learners.

Cline must prioritize educational correctness over speed.

## Required authoring behavior

Before creating or editing Grade 1 questions, Cline must:

1. Read the existing nearby Grade 1 files.
2. Follow the existing file structure and helper patterns.
3. Use existing authoring helpers where applicable.
4. Confirm the correct manifest or registration location.
5. Keep the change focused.
6. Avoid unrelated refactors.
7. Show generated questions for review when requested before writing files.

## Question structure

For Grade 1 MCQ questions, each item should normally include:

```js
{
  question: '<short learner-facing instruction>',
  readAloudText: '<exact text the learner should hear>',
  visualHint: '<emoji or visual hint>',
  options: ['<option 1>', '<option 2>', '<option 3>', '<option 4>'],
  correctAnswer: '<exact correct option>',
  explanation: '<short child-friendly explanation>'
}
```

Use `defineMcqProblem` or the existing nearby helper pattern.

Do not invent a new question schema unless the existing file already uses a different approved structure.

## Grade 1 language rules

Use simple Grade 1 words.

Prefer:

* short words
* familiar objects
* familiar actions
* clear sound-word relationships
* short instructions
* one idea per question

Avoid:

* complex vocabulary
* abstract words
* confusing synonyms
* compound instructions
* adult examples
* culturally confusing examples
* words that are hard to represent visually
* words where pronunciation may confuse the target sound

## Read-aloud rules

The `readAloudText` must match the task exactly.

For “Tap the word you hear” questions:

```js
readAloudText: 'Tap the word fan.'
```

The spoken word must match `correctAnswer`.

Do not say one word in `readAloudText` and set another word as `correctAnswer`.

For picture questions:

```js
readAloudText: 'Find the word gum.'
```

The target word must match the picture/emoji and the correct answer.

## Visual hint rules

The `visualHint` must clearly match the `correctAnswer`.

Good examples:

```js
visualHint: '🐟'
correctAnswer: 'fish'
```

```js
visualHint: '🚌'
correctAnswer: 'bus'
```

Bad examples:

```js
visualHint: '🍬'
correctAnswer: 'gum'
```

Only use this if the intended meaning is clearly gum in the UI context. If the emoji can mean sweet/candy generally, prefer a clearer target word or visual.

Do not use an icon if it can strongly suggest a different answer option.

If no clear emoji exists, use a different word.

## Options rules

Each MCQ should have exactly one correct answer.

Options must:

* include the correct answer exactly once
* be short
* be lowercase unless proper nouns are required
* be easy to tap/read
* be roughly similar in difficulty
* avoid repeated confusing near-duplicates unless the task is specifically sound discrimination

Do not include:

* two correct answers
* words that match the same visual hint
* words that sound too similar unless intentionally testing that sound
* words that are too advanced for Grade 1
* offensive, scary, violent, or adult words

## Beginning sound rules

When creating beginning sound questions:

* the target word must clearly start with the requested sound
* distractors should not start with the same target sound unless the task explicitly requires close discrimination
* keep sound examples familiar to Grade 1 learners
* avoid words with silent letters
* avoid words where the first letter does not match the first sound

Good:

```js
target sound: f
correctAnswer: 'fan'
visualHint: '🪭'
```

Avoid:

```js
target sound: k
correctAnswer: 'knife'
```

because the first sound is not /k/.

## Alphabet sound caution

Do not casually change approved alphabet sound text.

If the task is about phonics audio or alphabet pronunciation:

* inspect existing audio/read-aloud patterns
* preserve approved mappings
* do not replace sounds with letter names
* do not invent phonetic spellings without instruction
* avoid making Google TTS spell letters separately when a continuous sound is intended

When uncertain, generate a draft and ask for review before editing many files.

## Exam authoring rules

When creating Grade 1 exams:

* keep exam titles short in list/card views
* use clearer full titles inside the exam page if the existing pattern supports it
* keep question count reasonable for young learners
* avoid repeating the same word/icon too often
* mix correct option positions
* avoid placing the correct answer in the same option index repeatedly
* ensure every question has a useful explanation

## Exam vs practice routing rules

If the task says `exam`, Cline must create or edit content under the existing Grade 1 exam/assessment structure, not under `practice`.

Do not create files under:

```text
src/academies/cbc/grade-1/english/practice/
```

## Answer distribution

For MCQ exams, distribute correct answers across option positions.

Avoid patterns like:

```text
A, A, A, A
```

Prefer a balanced spread such as:

```text
A, C, B, D, B, A, D, C
```

Do not force perfect distribution if it makes the content worse, but avoid obvious repetition.

## Explanation rules

Explanations must be short and friendly.

Good:

```js
explanation: 'fan is the word you heard.'
```

```js
explanation: 'bus names the picture.'
```

Avoid:

```js
explanation: 'The learner should infer phonemic correspondence from the grapheme.'
```

## Mobile-first content rules

Grade 1 question content must fit small screens well.

Prefer:

* short options
* short questions
* short explanations
* simple visual hints
* no long paragraphs inside question cards

Avoid:

* long option text
* repeated headings
* unnecessary helper copy
* content that forces scrolling before the child can answer

## Production metadata

If Grade 1 content is intended to be visible in production, use approved production-safe metadata where the nearby file pattern supports metadata.

Example:

```js
metadata: {
  reviewStatus: 'approved',
  visibility: ['dev', 'prod']
}
```

Use draft/dev-only metadata for unreviewed content:

```js
metadata: {
  reviewStatus: 'draft',
  visibility: ['dev']
}
```

Do not mark content as approved unless the questions, answers, icons, read-aloud text, and explanations have been reviewed.

## Manifest and registration rules

When adding new Grade 1 content:

1. Put the file in the correct Grade 1 academy/topic folder.
2. Register it in the relevant topic or assessment manifest if the existing architecture requires it.
3. Do not add new content to legacy banks unless explicitly instructed.
4. Run manifest generation if the repo workflow requires it.
5. Confirm the content appears in the correct CBC Grade 1 UI path.

## Validation

When applicable, run:

```bash
npm run test:unit
npm run build
```

If manifests were changed or new academy content was added, run when applicable:

```bash
npm run generate:academy-manifests
```

Do not claim validation passed unless commands were run successfully.

If validation is skipped, explain why.

## Required response after Grade 1 content work

After creating or editing Grade 1 questions, Cline must report:

1. Files changed.
2. Number of questions added or edited.
3. Topic/exam affected.
4. Whether visual hints were checked.
5. Whether read-aloud text matches correct answers.
6. Whether answer distribution was checked.
7. Validation commands run.
8. Any skipped checks.
9. Any manual review still needed.

## Non-goals

Do not:

* redesign the UI unless explicitly requested
* change routing unless explicitly requested
* edit unrelated grades
* edit unrelated academies
* rename existing exams broadly unless requested
* change approved phonics/audio mappings without instruction
* create new renderers or schemas unless the task requires it


## Manifest inspection and duplicate prevention rules

Before creating any Grade 1 lesson, practice item, quiz, assessment, or exam, Cline must inspect the relevant topic manifest first.

For Grade 1 English, inspect:

```text
src/academies/cbc/grade-1/english/topic.manifest.json
```

Cline must check the correct manifest section before deciding what to create:

* `lessons` for lessons
* `practice` for practice content
* `assessments` for exams, quizzes, and assessments

Do not create a new file if an equivalent item already exists.

Cline must check for duplicates by:

1. `id`
2. `file`
3. `learningAreaId`
4. exam/quiz number
5. exam/quiz title
6. nearby existing content purpose
7. existing source files under the target folder

For exam tasks, Cline must inspect:

```text
src/academies/cbc/grade-1/english/topic.manifest.json
src/academies/cbc/grade-1/english/assessments/
```

and confirm:

* whether the requested exam already exists
* the next available exam number
* the correct learning area
* the correct target folder
* the correct registration entry

If a matching exam already exists, Cline must not create a duplicate.

Instead, Cline should report:

```text
A matching exam already appears to exist:
- id: <existing-id>
- file: <existing-file>
- learningAreaId: <learning-area-id>

Recommended action:
- edit the existing exam, or
- create a new exam only if the new task has a different scope/title/content.
```

When adding a new exam, Cline must choose the next available sequence from the manifest and existing files.

Example:

If the manifest already contains:

```text
reading-word-mastery-exam-001
reading-word-mastery-exam-002
reading-word-mastery-exam-003
reading-word-mastery-exam-004
```

then Cline must not create another `reading-word-mastery-exam-004`.

The next new exam in that family should normally be:

```text
reading-word-mastery-exam-005
```

unless the task requires a different exam family.

Before writing files, Cline must print this confirmation:

```text
Manifest inspected: yes
Target section: assessments | practice | lessons
Existing matching item found: yes/no
Next available id: <id>
Target file: <path>
Registration entry: <json>
No duplicate will be created: confirmed
```

If Cline cannot confidently determine whether the item already exists, it must stop and ask for review before creating files.


## Missing-letter position rule

Writing Readiness missing-letter exams must include missing letters from different positions where appropriate:

- beginning: `_ow` -> cow
- middle: `c_w` -> cow
- ending: `co_` -> cow

Do not make every question a missing-middle-letter question unless the exam title specifically says “Missing Middle Letters”.