# Grade 1 English Refinement Master Plan

> Working document for creating GitHub issues for `msomi22/qubitel-academy`.
>
> Purpose: refine the existing CBC Grade 1 English experience before expanding to Grades 7 and 8.
>
> Status: Draft for planning and issue creation.
>
> Source note: The two Google Drive curriculum/reference files should be treated as the primary reference documents once they are accessible locally or through the workspace. This document defines the refinement structure, issue breakdown, acceptance criteria, and content workflow.

---

## 1. Goal

Refine **Grade 1 English** so that the learner experience is complete, curriculum-aligned, mobile-friendly, accessible, and consistent across notes, practice, and exams.

The first priority is not adding more grades. The first priority is making the Grade 1 English foundation strong enough to reuse as the standard for later CBC grades.

---

## 2. Source References

### Primary references to inspect

- Google Drive reference 1: `https://drive.google.com/file/d/1EHfad6VuaIOlru1__yA3PY55_HcrCRNo/view`
- Google Drive reference 2: `https://drive.google.com/file/d/1H1x_FLY-MAUok0OmA6e-lVmteB9Mtf0G/view`

### Official/public reference to confirm

- KICD CBC Curriculum Designs
- KICD Lower Primary curriculum designs
- Grade 1–3 English Activities curriculum design

### Content-use rule

Do **not** copy long curriculum text directly into the app.

Use the official/reference materials to extract:

- learning areas
- strands
- sub-strands
- learning outcomes
- suggested activities
- vocabulary themes
- expected progression

Then create original learner-friendly notes, practice questions, revision questions, and exams.

---

## 3. Current Repository Context

Repo:

```text
msomi22/qubitel-academy
```

Known stack:

```text
Vite + React
Node >= 22
CBC content under src/academies/cbc/
```

Known Grade 1 English manifest:

```text
src/academies/cbc/grade-1/english/topic.manifest.json
```

Expected assessment grouping pattern:

```text
src/academies/cbc/<grade>/<subject>/assessments/<learning-area-id>/
```

Current Grade 1 English assessment work already includes Reading Readiness and Writing Readiness refinement.

Known Reading Readiness path:

```text
src/academies/cbc/grade-1/english/assessments/reading-readiness/
```

Known Writing Readiness path:

```text
src/academies/cbc/grade-1/english/assessments/writing-readiness/
```

---

## 4. Guiding Product Principles

### 4.1 Mobile-first Grade 1 experience

Grade 1 learners are young. The UI must be simple, clear, and readable on a phone.

Required:

- question, visual hint, and options should fit well on one mobile screen where possible
- large tap targets
- minimal repeated text
- clear visual hierarchy
- no hidden required information
- no tiny patterns like `_ow`, `c_t`, or `do_`
- use readable spacing such as `? o w`, `c ? t`, `d o ?`

### 4.2 Curriculum-first content

Content must follow the Grade 1 English curriculum progression, not random question generation.

Each content item should map to:

- grade
- subject
- learning area
- strand/sub-strand where applicable
- learning outcome
- skill type
- difficulty level
- estimated time
- revision purpose

### 4.3 Exam integrity

Exams should assess mastery.

Rules:

- exams must be registered in the manifest
- exam files must be grouped under the correct learning area
- avoid creating practice content inside exam tasks
- do not rename existing production files, exam IDs, manifest IDs, or question ID prefixes unless explicitly approved
- new exams should be appended as new files/IDs

### 4.4 Accessibility

All Grade 1 English question renderers must be accessible.

Required:

- no broken `aria-labelledby`
- hidden headings must remain available to screen readers
- do not use `display: none` for accessible labels
- images/emojis must have meaningful context where possible
- audio/read-aloud must not be the only way to understand a question
- color must not be the only signal for correctness or missing information

---

## 5. Proposed Grade 1 English Learning-Area Model

This model should be validated against the reference PDFs before implementation.

### 5.1 Listening and Speaking

Purpose:

Learners develop oral language, pronunciation, listening comprehension, and ability to respond to simple instructions.

Possible content:

- greetings
- classroom instructions
- polite words
- naming common objects
- listening to short sentences
- following simple commands
- speaking about self, family, school, and environment

Possible activities:

- listen and choose
- listen and repeat
- match spoken instruction to picture
- choose correct response
- identify sound heard
- oral vocabulary practice

### 5.2 Reading Readiness

Purpose:

Learners build pre-reading skills before full reading.

Current direction:

- object matching foundation exam
- word mastery progression after foundation exam
- beginning sounds and simple word recognition

Existing known sequence:

```text
Exam 1: Object Matching
Exam 2: Word Mastery B/C/D
Exam 3: Word Mastery F/G/H
Exam 4: Word Mastery J/K/L
Exam 5: Word Mastery M/N/P/R/S/T
Exam 6: Word Mastery V/W/Y/Z
```

Refinement needs:

- confirm all exam prompts are age-appropriate
- confirm all visual hints match the correct answer
- confirm word choices are familiar to Grade 1 learners
- confirm answer options are balanced
- avoid confusing emojis
- avoid words where emoji meaning is ambiguous
- keep read-aloud text aligned with correct answers

### 5.3 Phonemic Awareness and Letter Sounds

Purpose:

Learners connect letters with sounds.

Possible content:

- beginning sounds
- ending sounds
- matching letter to sound
- matching sound to picture
- identifying same beginning sound
- simple letter-sound discrimination

Important:

- audio must be carefully scripted
- avoid TTS pronunciations that mislead children
- use simple, familiar vocabulary

### 5.4 Alphabet Knowledge

Purpose:

Learners recognize letters, letter names, and alphabet order.

Possible content:

- uppercase letters
- lowercase letters
- matching uppercase to lowercase
- alphabet order
- missing letters in alphabet sequence
- letter recognition with pictures

Potential exam types:

- tap the letter you hear
- choose uppercase/lowercase match
- complete alphabet sequence
- identify first letter of a word

### 5.5 Vocabulary and Object Recognition

Purpose:

Learners build everyday English vocabulary.

Possible themes:

- family
- classroom
- home
- food
- animals
- body parts
- clothes
- weather
- school items
- colors
- numbers
- actions

Question types:

- which word names the picture?
- tap the word you hear
- match object to word
- choose the picture for a word

### 5.6 Writing Readiness

Purpose:

Learners prepare for writing by recognizing letter positions and completing simple words.

Current first exam:

```text
Exam 1: Missing Letters in 3-Letter Words
```

Expected progression:

```text
Exam 1: Missing Letters in 3-Letter Words
Exam 2: Missing Letters in 4-Letter Words
Exam 3: Missing Letters in 5-Letter Words
Exam 4: Missing Letters in 6-Letter Words
```

Rules:

- this is missing letters, not only missing vowels
- missing letters can be first, middle, or last
- `correctAnswer` must be the missing letter, not the completed word
- completed word appears in `completedWord`, `readAloudText`, and `explanation`
- prompts must use spaced `?` format

Correct:

```text
? o w
c ? t
d o ?
```

Incorrect:

```text
_ow
c_t
do_
```

### 5.7 Early Reading Comprehension

Purpose:

Learners begin understanding simple sentences and short passages.

Possible progression:

1. picture-based comprehension
2. one-sentence comprehension
3. two-sentence comprehension
4. short story comprehension
5. simple instructions and responses

Question types:

- who?
- what?
- where?
- choose the correct picture
- choose what happened first/next
- identify the correct sentence

### 5.8 Language Use

Purpose:

Learners start using simple English structures.

Possible content:

- naming words
- action words
- describing words
- simple sentence completion
- singular/plural basics
- use of `a` and `an`
- use of `is` and `are`
- simple punctuation and capitalization

---

## 6. Recommended Content Architecture

### 6.1 Directory structure

Recommended structure for Grade 1 English:

```text
src/academies/cbc/grade-1/english/
  topic.manifest.json
  notes/
    listening-speaking/
    reading-readiness/
    alphabet-knowledge/
    phonemic-awareness/
    vocabulary/
    writing-readiness/
    comprehension/
    language-use/
  practice/
    listening-speaking/
    reading-readiness/
    alphabet-knowledge/
    phonemic-awareness/
    vocabulary/
    writing-readiness/
    comprehension/
    language-use/
  assessments/
    listening-speaking/
    reading-readiness/
    alphabet-knowledge/
    phonemic-awareness/
    vocabulary/
    writing-readiness/
    comprehension/
    language-use/
```

If the current app does not yet support notes/practice folders, create separate issues for data model and UI support before adding many content files.

### 6.2 Manifest requirements

Every visible item must be registered in the relevant manifest.

For assessments:

```json
{
  "id": "<exam-id>",
  "file": "assessments/<learning-area-id>/<exam-file>.js",
  "learningAreaId": "<learning-area-id>"
}
```

For notes/practice, inspect the existing repo pattern first. Do not invent a conflicting format without checking existing manifests.

---

## 7. Content Quality Standards

### 7.1 Question data standard

Every question should include:

```js
{
  question: '<learner-facing question>',
  readAloudText: '<clear read-aloud instruction>',
  visualHint: '<emoji or visual>',
  options: ['<option1>', '<option2>', '<option3>', '<option4>'],
  correctAnswer: '<answer>',
  explanation: '<short explanation>'
}
```

Where needed:

```js
{
  prompt: '<special displayed pattern>',
  completedWord: '<full word>',
  rendering: {
    wordPattern: '<special displayed pattern>'
  }
}
```

### 7.2 Read-aloud standard

Good:

```text
Choose the missing letter to complete cat.
Tap the word fan.
Which picture shows a dog?
```

Avoid:

```text
Choose the missing letter to complete the word, cat.
Tap the option that corresponds to the lexical item.
```

### 7.3 Visual hint standard

Visual hints must be:

- familiar to Grade 1 learners
- directly related to the answer
- not culturally confusing where possible
- not too abstract
- not visually similar to another option

### 7.4 Answer option standard

Options should be:

- 4 options for MCQ where the renderer expects 4
- balanced across answer positions
- not repeated
- plausible but not confusing beyond the intended skill
- age-appropriate

---

## 8. UI Refinement Requirements

### 8.1 Grade 1 question renderer

The Grade 1 renderer should support:

- question text
- read aloud button
- visual hint
- answer options
- optional word pattern chip/card
- optional objective
- top and bottom navigation controls where required
- back-to-topic navigation where required

### 8.2 Word pattern rendering

For missing-letter writing readiness questions, the renderer must display the word pattern.

Fallback logic:

```js
const wordPattern =
  problem.prompt ??
  problem.rendering?.wordPattern ??
  problem.metadata?.wordPattern ??
  null;
```

Expected screen order:

```text
Which letter is missing?

c ? t

🐈

i   a
e   o
```

### 8.3 Accessibility heading rule

If the question container uses:

```jsx
aria-labelledby="grade-one-question-title"
```

then the element with:

```jsx
id="grade-one-question-title"
```

must always exist in the DOM.

If the prompt heading is visually suppressed, keep it as a visually hidden heading, not `null`.

---

## 9. Suggested GitHub Issues

### Issue 1: Audit Grade 1 English against curriculum references

Goal:

Compare current Grade 1 English content against the official/reference curriculum materials.

Tasks:

- inspect the two Google Drive reference PDFs
- inspect KICD Grade 1–3 English Activities design
- list expected learning areas/strands/sub-strands
- compare with current app learning areas
- identify missing notes, practice, and exams
- produce a gap analysis document

Acceptance criteria:

- gap analysis exists
- current coverage is listed
- missing areas are listed
- recommended issue breakdown is provided

---

### Issue 2: Standardize Grade 1 English learning-area structure

Goal:

Make Grade 1 English learning areas consistent and ready for notes, practice, and exams.

Tasks:

- inspect `topic.manifest.json`
- confirm current learning areas
- add missing learning areas only after approval
- ensure naming is learner-friendly
- ensure IDs are stable
- do not rename production IDs without approval

Acceptance criteria:

- Grade 1 English manifest has consistent learning-area structure
- all existing exams remain visible
- no existing production IDs are renamed without approval

---

### Issue 3: Add Grade 1 English notes support

Goal:

Enable learner notes for Grade 1 English.

Tasks:

- inspect whether notes are already supported elsewhere
- define notes data shape
- define route/rendering behavior
- create first notes example for one learning area
- register notes in manifest if required

Acceptance criteria:

- notes can be displayed for Grade 1 English
- notes are mobile-friendly
- notes use simple learner language
- notes do not break assessments

---

### Issue 4: Add Grade 1 English Reading Readiness notes

Goal:

Add notes that prepare learners for Reading Readiness exams.

Possible sections:

- look at the picture
- listen carefully
- tap the word you hear
- beginning sounds
- simple object words

Acceptance criteria:

- notes are visible
- notes align with existing reading-readiness exams
- examples are Grade 1 friendly

---

### Issue 5: Review and refine Reading Readiness exams

Goal:

Improve current Reading Readiness exam quality.

Tasks:

- inspect all reading-readiness exams
- confirm visual hints match answers
- confirm read-aloud text is correct
- confirm answer positions are balanced
- remove ambiguous emojis/words
- confirm exam sequence is correct
- keep object-matching as the foundation exam

Acceptance criteria:

- all Reading Readiness exams pass content quality review
- no broken visual hints
- no incorrect read-aloud text
- no accidental ID renames

---

### Issue 6: Complete Writing Readiness Exam 1 renderer support

Goal:

Ensure missing-letter questions display correctly.

Tasks:

- confirm `writing-missing-letters-exam-001.js` uses spaced `?` prompts
- ensure renderer displays `prompt` / `rendering.wordPattern` / `metadata.wordPattern`
- ensure word pattern is shown as separate chip/card
- ensure accessibility heading remains valid

Acceptance criteria:

- `c ? t`, `? o w`, and `d o ?` display on UI
- normal MCQ exams remain unchanged
- no broken `aria-labelledby`
- mobile layout remains clean

---

### Issue 7: Add Writing Readiness Exam 2: Missing Letters in 4-Letter Words

Goal:

Continue writing-readiness progression.

Example words:

- milk
- book
- hand
- fish
- ball
- frog
- tree
- bird
- desk
- lamp

Rules:

- missing letters can be beginning, middle, or end
- use spaced `?` prompts
- correct answer is the missing letter
- completed word appears in metadata/read aloud/explanation
- register in manifest

Acceptance criteria:

- exam file exists under `assessments/writing-readiness/`
- manifest entry exists
- prompts are spaced and clear
- UI displays word pattern

---

### Issue 8: Add Alphabet Knowledge learning content

Goal:

Add alphabet recognition and matching content.

Possible content:

- uppercase recognition
- lowercase recognition
- uppercase/lowercase matching
- missing alphabet letters
- alphabet order

Acceptance criteria:

- learner can practice letter recognition
- content is registered correctly
- visuals are Grade 1 friendly

---

### Issue 9: Add Phonemic Awareness content

Goal:

Add sound-focused Grade 1 English content.

Possible content:

- beginning sounds
- same beginning sound
- ending sounds
- letter-sound matching

Acceptance criteria:

- audio/read-aloud is clear
- TTS wording is tested carefully
- learner sees both visual and answer options

---

### Issue 10: Add Vocabulary and Object Recognition notes/practice

Goal:

Build vocabulary by themes.

Suggested themes:

- animals
- food
- home
- school
- body parts
- clothes
- colors
- numbers
- actions

Acceptance criteria:

- vocabulary grouped by theme
- notes and practice available
- visuals match words
- questions are age-appropriate

---

### Issue 11: Add Early Comprehension foundation content

Goal:

Introduce comprehension gradually.

Tasks:

- add picture comprehension
- add one-sentence comprehension
- add two-sentence comprehension
- add simple story comprehension later

Acceptance criteria:

- comprehension does not start too hard
- questions are short
- visuals support understanding

---

### Issue 12: Add Grade 1 English revision dashboard

Goal:

Let learners revise by skill area.

Dashboard should show:

- Reading Readiness
- Writing Readiness
- Alphabet Knowledge
- Vocabulary
- Listening and Speaking
- Comprehension
- Language Use

Acceptance criteria:

- learner can choose revision area
- progress is shown if available
- UI is compact and mobile-friendly

---

### Issue 13: Add content-quality validation checklist

Goal:

Create a reusable checklist for all Grade 1 English content PRs.

Checklist:

- visual hints checked
- read-aloud checked
- answer positions checked
- duplicate answers checked
- prompt rendering checked
- accessibility checked
- manifest registration checked
- mobile layout checked

Acceptance criteria:

- checklist exists in docs or PR template
- future content issues reference it

---

### Issue 14: Add Grade 1 English teacher review workflow

Goal:

Allow teacher feedback to drive refinement.

Tasks:

- create review checklist for teachers
- capture unclear questions
- capture wrong visuals
- capture too-hard vocabulary
- capture missing curriculum areas

Acceptance criteria:

- teacher review format exists
- feedback can be turned into issues quickly

---

## 10. Recommended Implementation Order

1. Curriculum/source audit
2. Manifest/learning-area structure audit
3. Grade 1 renderer fixes
4. Reading Readiness content review
5. Writing Readiness Exam 1 final fix
6. Notes data model and first notes example
7. Reading Readiness notes
8. Alphabet Knowledge content
9. Phonemic Awareness content
10. Vocabulary content
11. Writing Readiness Exam 2
12. Early Comprehension content
13. Revision dashboard
14. Teacher review workflow

---

## 11. Cline Prompt Template for Each Issue

Use this template when asking Cline to implement one issue.

```md
No terminal commands.

Use workspace file reading/search only.

Apply always-on rules first.

Task:
<ISSUE TITLE>

Context:
We are refining CBC Grade 1 English in `msomi22/qubitel-academy`.

Before editing, inspect:
- `src/academies/cbc/grade-1/english/topic.manifest.json`
- relevant Grade 1 English content folders
- relevant renderer/components if UI is affected
- existing patterns for the same content type

Requirements:
- Do not rename existing production files unless explicitly approved.
- Do not rename existing manifest IDs unless explicitly approved.
- Do not rename existing exam IDs unless explicitly approved.
- Do not change generated question ID prefixes unless explicitly approved.
- Register new visible content in the correct manifest.
- Keep Grade 1 UI mobile-friendly.
- Keep accessibility intact.
- Do not edit unrelated grades, subjects, or learning areas.

Before editing, report:
- Files/areas inspected
- Current state
- Proposed changes
- Files to change
- Risks / assumptions

Wait for approval before writing files.
```

---

## 12. Definition of Done for Grade 1 English Refinement

Grade 1 English can be considered refined when:

- official/reference curriculum coverage has been audited
- learning areas are stable and clearly named
- notes are supported and visible
- Reading Readiness exams are reviewed and cleaned
- Writing Readiness missing-letter UI works
- Grade 1 renderer is accessible
- content is mobile-friendly
- revision content exists for core skills
- future content can be added using repeatable patterns
- teacher feedback can be converted into issues quickly

---

## 13. Open Questions

These should be answered after inspecting the reference PDFs:

1. What exact strands/sub-strands are listed for Grade 1 English Activities?
2. Does the official design combine Grade 1–3 or separate Grade 1 outcomes clearly?
3. Which learning areas should appear in the Grade 1 English UI?
4. Should notes be per strand, per sub-strand, or per learner skill?
5. Should revision questions be separate from exams?
6. Should practice content affect learner progress differently from exams?
7. How should teacher-facing content differ from learner-facing content?
8. Should audio/read-aloud be required for all Grade 1 English content?
9. Should every Grade 1 English question have a visual hint?
10. What is the minimum content needed before expanding to Grade 2 or Grade 7/8?

---

## 14. Immediate Next Issue Recommendation

Start with this issue:

```text
Audit and refine Grade 1 English against CBC curriculum references
```

Reason:

Before adding more notes/exams, we need a clear gap analysis between the current app and the curriculum/reference materials. That prevents random content growth and gives us a clean issue roadmap.
