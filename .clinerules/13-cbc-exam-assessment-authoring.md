## Global exam duplicate inspection rules

This rule applies to every CBC exam, quiz, or assessment task, across all grades and subjects.

It is not limited to Grade 1.

Before creating any new CBC exam, quiz, or assessment, Cline must inspect both:

1. The relevant topic manifest.
2. The actual question contents inside existing registered exam/assessment files.

Use this manifest path pattern:

```text
src/academies/cbc/<grade>/<subject>/topic.manifest.json
```

Use this assessment path pattern:

```text
src/academies/cbc/<grade>/<subject>/assessments/
```

Examples:

```text
src/academies/cbc/grade-1/english/topic.manifest.json
src/academies/cbc/grade-3/english/topic.manifest.json
src/academies/cbc/grade-3/english/assessments/
```

Checking the manifest is not enough.

The manifest can confirm registered exams, ids, files, and learning areas, but it does not prove whether the proposed questions already exist inside earlier exams.

For any new exam, Cline must:

1. Inspect the relevant topic manifest.
2. Identify existing exams, quizzes, or assessments in the target learning area.
3. Open every relevant existing registered file.
4. Read the question arrays/content inside those files.
5. Compare the proposed questions against existing questions.
6. Report duplicates before writing files.

Cline must check for duplicates by:

* exam id
* exam file path
* exam title
* learning area id
* exam number/sequence
* question text
* correct answer
* read-aloud text
* visual hint or image prompt
* full option set
* passage title, if comprehension
* spelling word, if spelling
* topic/skill tested
* explanation or answer rationale

For comprehension exams, Cline must also check:

* passage title
* passage content/theme
* repeated comprehension questions
* repeated answer options
* repeated correct answers

For spelling exams, Cline must also check:

* spelling words
* repeated word lists
* repeated audio/read-aloud text
* repeated distractor patterns

For phonics/beginning-sound exams, Cline must also check:

* target sound
* target word
* visual hint
* read-aloud text
* repeated distractors

Before writing files, Cline must report:

```text
Manifest inspected: yes
Manifest path: <path>
Target section: assessments
Requested content type: exam | quiz | assessment
Existing matching exam found: yes/no
Existing matching exam details: <id/file/title if found>

Question-level duplicate inspection: complete
Question files inspected:
- <file>
- <file>
- <file>

Next available exam id: <id>
Next available sequence: <number>
Corrected exam title: <title>
Target exam file path: <path>
Reference exam file used: <path>
Manifest registration entry: <json>

No duplicate exam will be created: confirmed
No duplicate questions will be created: confirmed
```

Cline must also report a duplicate-check table before writing files:

```md
| Proposed item/question | Existing as correct answer? | Existing as option/distractor? | Existing question/readAloudText? | Existing visual/passage/spelling word? | Existing exam/file | Safe to use? |
|---|---|---|---|---|---|---|
| <item> | yes/no | yes/no | yes/no | yes/no | <file or N/A> | yes/no |
```

If a proposed question already exists with the same or very similar prompt, correct answer, read-aloud text, visual hint, passage, or spelling word, Cline must replace it unless the task explicitly asks to reuse it.

If a proposed answer exists only as a distractor in another exam, Cline may still use it as a correct answer, but it must report that clearly.

If Cline cannot inspect all relevant existing registered exam files, it must stop and ask for review before creating or editing files.

This duplicate inspection rule applies to all CBC grades and subjects.


## Assessment folder rule

CBC exams must be grouped by learning area inside `assessments`.

Use this pattern:

```text
src/academies/cbc/<grade>/<subject>/assessments/<learning-area-id>/<exam-file>.js

Examples:

src/academies/cbc/grade-1/english/assessments/reading-readiness/reading-word-mastery-exam-006.js
src/academies/cbc/grade-1/english/assessments/writing-readiness/writing-missing-letters-exam-001.js

Do not place new exams directly under assessments/ unless the existing architecture for that exact learning area already uses that pattern.