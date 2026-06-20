---

paths:

* "src/academies/cbc/**"
* "docs/grade-*/**"

---

# CBC Question Quality and Visual Hint Rules

## Purpose

Use this rule whenever Cline creates or edits CBC questions, quizzes, exams, assessments, or practice items that include:

* visual hints
* emojis
* image prompts
* read-aloud text
* MCQ options
* picture naming questions
* beginning sound questions
* spelling/word recognition questions

This rule applies to all CBC grades and subjects, not only Grade 1.

## Core rule: the visual must name the answer

For picture or visual-hint questions, the visual hint must clearly and directly represent the `correctAnswer`.

A related idea is not enough.

Bad examples:

```text
vet 🩺
```

Reason: a child may say doctor, hospital, or stethoscope, not vet.

```text
zoo 🦁
```

Reason: a child will likely say lion, not zoo.

```text
win 🏆
```

Reason: a child may say cup, trophy, or prize, not win.

```text
wax 🕯️
```

Reason: a child may say candle, not wax.

```text
vat 🪣
```

Reason: a child may say bucket or pail, not vat.

Good examples:

```text
van 🚐
web 🕸️
yam 🍠
zebra 🦓
watch ⌚
wheel 🛞
worm 🪱
```

Reason: the visual strongly supports the exact target word.

## Picture naming question rule

For questions like:

```text
Which word names the picture?
Find the word <answer>.
```

the visual must be something a learner can naturally name as the `correctAnswer`.

Prefer concrete nouns:

* animal
* object
* food
* body part
* common place
* common classroom/home item

Avoid:

* abstract ideas
* actions
* feelings
* indirect associations
* tools that only imply a profession
* animals used to represent places
* objects used to represent materials

## Beginning sound question rule

For beginning sound questions, the target word must:

* begin with the intended sound
* be familiar for the grade
* have a visual hint that directly names the word
* avoid silent letters
* avoid confusing pronunciations
* avoid visual hints that suggest another option more strongly

If no clear visual exists for a word, choose a different word.

## Option safety rule

Before approving a question, Cline must check that no option names the visual better than the correct answer.

Example:

```js
visualHint: '🦁'
options: ['zoo', 'lion', 'zip', 'yam']
correctAnswer: 'zoo'
```

This is invalid because `lion` names the picture better than `zoo`.

## Read-aloud rule

The `readAloudText` must match the `correctAnswer`.

Examples:

```js
readAloudText: 'Tap the word van.'
correctAnswer: 'van'
```

```js
readAloudText: 'Find the word web.'
correctAnswer: 'web'
```

Do not use a read-aloud sentence that points to one word while the correct answer is another word.

## Visual hint ambiguity check

Before writing files, Cline must produce a visual-hint quality table for every proposed question that uses a visual hint.

Use this format:

```md
| Question | Correct answer | Visual hint | What a child may call it | Direct match? | Ambiguity risk | Decision |
|---|---|---|---|---|---|---|
| Find the word van. | van | 🚐 | van/minibus | yes | low | keep |
| Find the word zoo. | zoo | 🦁 | lion | no | high | replace |
```

If `Direct match?` is `no`, Cline must replace the word or visual hint before file creation.

If `Ambiguity risk` is `high`, Cline must replace it unless the user explicitly approves it.

## Duplicate and quality gate

For every CBC quiz, exam, assessment, or practice set, Cline must perform both:

1. Duplicate inspection.
2. Visual-hint quality inspection.

Cline must not treat duplicate-free content as approved if the visuals are weak or misleading.

Before writing files, Cline must report:

```text
Duplicate inspection: complete
Visual-hint quality inspection: complete
Read-aloud match check: complete
Option safety check: complete
No duplicate questions will be created: confirmed
No misleading visual hints will be used: confirmed
```

## Required pre-write approval

Cline must not create or edit files until it has shown:

1. Proposed questions.
2. Duplicate inspection table.
3. Visual-hint quality table.
4. Read-aloud match check.
5. Answer distribution.
6. Final target file path.
7. Final manifest registration entry.

If any visual hint is questionable, Cline must stop and ask for review.
