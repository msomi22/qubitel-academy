# Grade 1 CBC English — Missing Letter & Word Completion Writing Exams

## Purpose

These exams add an early-writing bridge after Alphabet Mastery and Word Reading Mastery.

The goal is to help Grade 1 learners move from reading short words to spelling and writing them by recognizing missing letters, missing sounds, and missing word parts.

The learner should not type freely yet. Instead, they choose the missing letter or missing letter group from four options. This keeps the task mobile-friendly and suitable for young learners.

## Design Principles

- Each question is read aloud.
- Each question has exactly four options.
- Correct answers are mixed across A/B/C/D positions.
- Words are mostly 3-letter CVC words.
- A few 4-letter words are used only when useful and familiar.
- Early questions ask for one missing letter.
- Later questions ask for two missing letters or a word part.
- The visible prompt must not expose the answer.
- The read-aloud text may say the full word because the learner is expected to connect sound to spelling.
- The missing-letter display should be large and child-friendly.
- Options should be tap-friendly on phone.
- Use picture cues where possible.

## Recommended UI Behavior

Each quiz card should show:

```txt
Picture cue
Missing word pattern
Question prompt
4 large answer options
Speaker / Read again button
```

Example:

```txt
Picture: 🐱
Pattern: c _ t
Prompt: Choose the missing letter.
Read aloud: Complete the word cat.
Options: x, g, o, a
Answer: a
```

More advanced example:

```txt
Picture: 👦
Pattern: b _ _
Prompt: Choose the missing letters.
Read aloud: Complete the word boy.
Options: oy, yo, ah, du
Answer: oy
```

## Suggested Data Shape

```js
{
  id: 'grade-1-missing-letter-exam-001-q01',
  type: 'missing-letter-choice',
  word: 'cat',
  pattern: 'c _ t',
  prompt: 'Choose the missing letter.',
  readAloudText: 'Complete the word cat.',
  visual: '🐱',
  options: ['x', 'g', 'o', 'a'],
  correctAnswer: 'a',
  skill: 'middle-vowel-spelling',
  difficulty: 1
}
```

For advanced word-part questions:

```js
{
  id: 'grade-1-missing-letter-exam-004-q01',
  type: 'missing-part-choice',
  word: 'boy',
  pattern: 'b _ _',
  prompt: 'Choose the missing letters.',
  readAloudText: 'Complete the word boy.',
  visual: '👦',
  options: ['oy', 'yo', 'ah', 'du'],
  correctAnswer: 'oy',
  skill: 'word-ending-spelling',
  difficulty: 3
}
```

## Exams Overview

| Exam | Title | Focus | Questions |
|---:|---|---|---:|
| 1 | Missing Middle Letters | CVC middle vowels | 20 |
| 2 | Missing First Letters | Beginning consonants | 20 |
| 3 | Missing Last Letters | Ending consonants | 20 |
| 4 | Missing Word Parts | Two-letter endings and advanced chunks | 20 |

---

# Exam 1: Missing Middle Letters

- **Exam id:** `grade-1-english-missing-letter-exam-001`
- **Learner title:** `Exam 1: Missing Middle Letters`
- **Question count:** 20
- **Focus:** middle vowel sounds in short CVC words
- **Instruction:** Listen to the word. Choose the missing letter.

| # | Question ID | Word | Pattern | Visible Prompt | Read Aloud Text | Visual Hint | Options | Answer |
|---:|---|---|---|---|---|---|---|---|
| 1 | `grade-1-missing-letter-exam-001-q01` | cat | c _ t | Choose the missing letter. | Complete the word cat. | 🐱 | x; g; o; a | **a** |
| 2 | `grade-1-missing-letter-exam-001-q02` | dog | d _ g | Choose the missing letter. | Complete the word dog. | 🐶 | o; a; e; u | **o** |
| 3 | `grade-1-missing-letter-exam-001-q03` | pen | p _ n | Choose the missing letter. | Complete the word pen. | 🖊️ | a; i; e; o | **e** |
| 4 | `grade-1-missing-letter-exam-001-q04` | sun | s _ n | Choose the missing letter. | Complete the word sun. | ☀️ | a; e; i; u | **u** |
| 5 | `grade-1-missing-letter-exam-001-q05` | pig | p _ g | Choose the missing letter. | Complete the word pig. | 🐷 | i; a; o; e | **i** |
| 6 | `grade-1-missing-letter-exam-001-q06` | hat | h _ t | Choose the missing letter. | Complete the word hat. | 🎩 | e; a; u; i | **a** |
| 7 | `grade-1-missing-letter-exam-001-q07` | cup | c _ p | Choose the missing letter. | Complete the word cup. | ☕ | a; i; u; o | **u** |
| 8 | `grade-1-missing-letter-exam-001-q08` | bed | b _ d | Choose the missing letter. | Complete the word bed. | 🛏️ | a; i; o; e | **e** |
| 9 | `grade-1-missing-letter-exam-001-q09` | bus | b _ s | Choose the missing letter. | Complete the word bus. | 🚌 | u; a; e; i | **u** |
| 10 | `grade-1-missing-letter-exam-001-q10` | fox | f _ x | Choose the missing letter. | Complete the word fox. | 🦊 | a; o; e; u | **o** |
| 11 | `grade-1-missing-letter-exam-001-q11` | man | m _ n | Choose the missing letter. | Complete the word man. | 👨 | e; u; a; i | **a** |
| 12 | `grade-1-missing-letter-exam-001-q12` | sit | s _ t | Choose the missing letter. | Complete the word sit. | 🪑 | a; e; o; i | **i** |
| 13 | `grade-1-missing-letter-exam-001-q13` | hen | h _ n | Choose the missing letter. | Complete the word hen. | 🐔 | e; a; i; o | **e** |
| 14 | `grade-1-missing-letter-exam-001-q14` | top | t _ p | Choose the missing letter. | Complete the word top. | 🔝 | a; o; i; e | **o** |
| 15 | `grade-1-missing-letter-exam-001-q15` | bug | b _ g | Choose the missing letter. | Complete the word bug. | 🐞 | a; e; u; i | **u** |
| 16 | `grade-1-missing-letter-exam-001-q16` | fan | f _ n | Choose the missing letter. | Complete the word fan. | 🪭 | e; i; o; a | **a** |
| 17 | `grade-1-missing-letter-exam-001-q17` | red | r _ d | Choose the missing letter. | Complete the word red. | 🔴 | e; a; i; u | **e** |
| 18 | `grade-1-missing-letter-exam-001-q18` | pin | p _ n | Choose the missing letter. | Complete the word pin. | 📌 | a; i; o; e | **i** |
| 19 | `grade-1-missing-letter-exam-001-q19` | hot | h _ t | Choose the missing letter. | Complete the word hot. | 🔥 | e; a; o; i | **o** |
| 20 | `grade-1-missing-letter-exam-001-q20` | mug | m _ g | Choose the missing letter. | Complete the word mug. | ☕ | a; e; i; u | **u** |

---

# Exam 2: Missing First Letters

- **Exam id:** `grade-1-english-missing-letter-exam-002`
- **Learner title:** `Exam 2: Missing First Letters`
- **Question count:** 20
- **Focus:** beginning consonant sounds
- **Instruction:** Listen to the word. Choose the missing first letter.

| # | Question ID | Word | Pattern | Visible Prompt | Read Aloud Text | Visual Hint | Options | Answer |
|---:|---|---|---|---|---|---|---|---|
| 1 | `grade-1-missing-letter-exam-002-q01` | bat | _ a t | Choose the first letter. | Complete the word bat. | 🦇 | d; m; b; p | **b** |
| 2 | `grade-1-missing-letter-exam-002-q02` | cat | _ a t | Choose the first letter. | Complete the word cat. | 🐱 | c; b; h; r | **c** |
| 3 | `grade-1-missing-letter-exam-002-q03` | dog | _ o g | Choose the first letter. | Complete the word dog. | 🐶 | b; t; d; f | **d** |
| 4 | `grade-1-missing-letter-exam-002-q04` | fan | _ a n | Choose the first letter. | Complete the word fan. | 🪭 | p; m; s; f | **f** |
| 5 | `grade-1-missing-letter-exam-002-q05` | gum | _ u m | Choose the first letter. | Complete the word gum. | 🍬 | g; d; c; j | **g** |
| 6 | `grade-1-missing-letter-exam-002-q06` | hat | _ a t | Choose the first letter. | Complete the word hat. | 🎩 | c; h; b; p | **h** |
| 7 | `grade-1-missing-letter-exam-002-q07` | jam | _ a m | Choose the first letter. | Complete the word jam. | 🍓 | g; d; j; y | **j** |
| 8 | `grade-1-missing-letter-exam-002-q08` | kid | _ i d | Choose the first letter. | Complete the word kid. | 🧒 | t; b; p; k | **k** |
| 9 | `grade-1-missing-letter-exam-002-q09` | leg | _ e g | Choose the first letter. | Complete the word leg. | 🦵 | l; r; n; m | **l** |
| 10 | `grade-1-missing-letter-exam-002-q10` | man | _ a n | Choose the first letter. | Complete the word man. | 👨 | n; m; w; h | **m** |
| 11 | `grade-1-missing-letter-exam-002-q11` | net | _ e t | Choose the first letter. | Complete the word net. | 🥅 | l; t; n; r | **n** |
| 12 | `grade-1-missing-letter-exam-002-q12` | pen | _ e n | Choose the first letter. | Complete the word pen. | 🖊️ | b; d; f; p | **p** |
| 13 | `grade-1-missing-letter-exam-002-q13` | rat | _ a t | Choose the first letter. | Complete the word rat. | 🐀 | r; l; n; m | **r** |
| 14 | `grade-1-missing-letter-exam-002-q14` | sun | _ u n | Choose the first letter. | Complete the word sun. | ☀️ | t; s; f; h | **s** |
| 15 | `grade-1-missing-letter-exam-002-q15` | top | _ o p | Choose the first letter. | Complete the word top. | 🔝 | p; b; t; d | **t** |
| 16 | `grade-1-missing-letter-exam-002-q16` | van | _ a n | Choose the first letter. | Complete the word van. | 🚐 | b; f; w; v | **v** |
| 17 | `grade-1-missing-letter-exam-002-q17` | web | _ e b | Choose the first letter. | Complete the word web. | 🕸️ | w; v; y; r | **w** |
| 18 | `grade-1-missing-letter-exam-002-q18` | yak | _ a k | Choose the first letter. | Complete the word yak. | 🐂 | w; y; j; l | **y** |
| 19 | `grade-1-missing-letter-exam-002-q19` | zip | _ i p | Choose the first letter. | Complete the word zip. | 🤐 | s; j; z; g | **z** |
| 20 | `grade-1-missing-letter-exam-002-q20` | cup | _ u p | Choose the first letter. | Complete the word cup. | ☕ | b; d; f; c | **c** |

---

# Exam 3: Missing Last Letters

- **Exam id:** `grade-1-english-missing-letter-exam-003`
- **Learner title:** `Exam 3: Missing Last Letters`
- **Question count:** 20
- **Focus:** ending consonant sounds
- **Instruction:** Listen to the word. Choose the missing last letter.

| # | Question ID | Word | Pattern | Visible Prompt | Read Aloud Text | Visual Hint | Options | Answer |
|---:|---|---|---|---|---|---|---|---|
| 1 | `grade-1-missing-letter-exam-003-q01` | cat | c a _ | Choose the last letter. | Complete the word cat. | 🐱 | p; g; t; n | **t** |
| 2 | `grade-1-missing-letter-exam-003-q02` | dog | d o _ | Choose the last letter. | Complete the word dog. | 🐶 | g; t; d; p | **g** |
| 3 | `grade-1-missing-letter-exam-003-q03` | pen | p e _ | Choose the last letter. | Complete the word pen. | 🖊️ | t; m; n; d | **n** |
| 4 | `grade-1-missing-letter-exam-003-q04` | bus | b u _ | Choose the last letter. | Complete the word bus. | 🚌 | n; t; p; s | **s** |
| 5 | `grade-1-missing-letter-exam-003-q05` | pig | p i _ | Choose the last letter. | Complete the word pig. | 🐷 | g; t; n; d | **g** |
| 6 | `grade-1-missing-letter-exam-003-q06` | hat | h a _ | Choose the last letter. | Complete the word hat. | 🎩 | p; t; g; n | **t** |
| 7 | `grade-1-missing-letter-exam-003-q07` | cup | c u _ | Choose the last letter. | Complete the word cup. | ☕ | t; n; p; g | **p** |
| 8 | `grade-1-missing-letter-exam-003-q08` | bed | b e _ | Choose the last letter. | Complete the word bed. | 🛏️ | n; p; t; d | **d** |
| 9 | `grade-1-missing-letter-exam-003-q09` | fan | f a _ | Choose the last letter. | Complete the word fan. | 🪭 | n; g; t; p | **n** |
| 10 | `grade-1-missing-letter-exam-003-q10` | fox | f o _ | Choose the last letter. | Complete the word fox. | 🦊 | t; x; n; g | **x** |
| 11 | `grade-1-missing-letter-exam-003-q11` | man | m a _ | Choose the last letter. | Complete the word man. | 👨 | t; p; n; d | **n** |
| 12 | `grade-1-missing-letter-exam-003-q12` | sit | s i _ | Choose the last letter. | Complete the word sit. | 🪑 | n; g; p; t | **t** |
| 13 | `grade-1-missing-letter-exam-003-q13` | hen | h e _ | Choose the last letter. | Complete the word hen. | 🐔 | n; d; t; p | **n** |
| 14 | `grade-1-missing-letter-exam-003-q14` | top | t o _ | Choose the last letter. | Complete the word top. | 🔝 | g; p; t; n | **p** |
| 15 | `grade-1-missing-letter-exam-003-q15` | bug | b u _ | Choose the last letter. | Complete the word bug. | 🐞 | n; d; g; t | **g** |
| 16 | `grade-1-missing-letter-exam-003-q16` | red | r e _ | Choose the last letter. | Complete the word red. | 🔴 | n; t; p; d | **d** |
| 17 | `grade-1-missing-letter-exam-003-q17` | pin | p i _ | Choose the last letter. | Complete the word pin. | 📌 | n; p; t; d | **n** |
| 18 | `grade-1-missing-letter-exam-003-q18` | hot | h o _ | Choose the last letter. | Complete the word hot. | 🔥 | n; t; p; g | **t** |
| 19 | `grade-1-missing-letter-exam-003-q19` | mug | m u _ | Choose the last letter. | Complete the word mug. | ☕ | d; n; g; p | **g** |
| 20 | `grade-1-missing-letter-exam-003-q20` | jam | j a _ | Choose the last letter. | Complete the word jam. | 🍓 | n; t; p; m | **m** |

---

# Exam 4: Missing Word Parts

- **Exam id:** `grade-1-english-missing-letter-exam-004`
- **Learner title:** `Exam 4: Missing Word Parts`
- **Question count:** 20
- **Focus:** two-letter endings and advanced word chunks
- **Instruction:** Listen to the word. Choose the missing letters.

| # | Question ID | Word | Pattern | Visible Prompt | Read Aloud Text | Visual Hint | Options | Answer |
|---:|---|---|---|---|---|---|---|---|
| 1 | `grade-1-missing-letter-exam-004-q01` | boy | b _ _ | Choose the missing letters. | Complete the word boy. | 👦 | oy; yo; ah; du | **oy** |
| 2 | `grade-1-missing-letter-exam-004-q02` | cow | c _ _ | Choose the missing letters. | Complete the word cow. | 🐄 | aw; ow; wa; ew | **ow** |
| 3 | `grade-1-missing-letter-exam-004-q03` | day | d _ _ | Choose the missing letters. | Complete the word day. | ☀️ | oy; ey; ay; ya | **ay** |
| 4 | `grade-1-missing-letter-exam-004-q04` | toy | t _ _ | Choose the missing letters. | Complete the word toy. | 🧸 | ow; ay; ya; oy | **oy** |
| 5 | `grade-1-missing-letter-exam-004-q05` | goat | g _ _ t | Choose the missing letters. | Complete the word goat. | 🐐 | oa; ao; ee; ai | **oa** |
| 6 | `grade-1-missing-letter-exam-004-q06` | boat | b _ _ t | Choose the missing letters. | Complete the word boat. | ⛵ | ai; oa; oo; ae | **oa** |
| 7 | `grade-1-missing-letter-exam-004-q07` | rain | r _ _ n | Choose the missing letters. | Complete the word rain. | 🌧️ | ie; ea; ai; oa | **ai** |
| 8 | `grade-1-missing-letter-exam-004-q08` | leaf | l _ _ f | Choose the missing letters. | Complete the word leaf. | 🍃 | ai; oa; ee; ea | **ea** |
| 9 | `grade-1-missing-letter-exam-004-q09` | seed | s _ _ d | Choose the missing letters. | Complete the word seed. | 🌱 | ee; ea; ai; oa | **ee** |
| 10 | `grade-1-missing-letter-exam-004-q10` | moon | m _ _ n | Choose the missing letters. | Complete the word moon. | 🌙 | oa; oo; ee; ai | **oo** |
| 11 | `grade-1-missing-letter-exam-004-q11` | fish | f _ _ h | Choose the missing letters. | Complete the word fish. | 🐟 | ee; oa; is; ai | **is** |
| 12 | `grade-1-missing-letter-exam-004-q12` | sock | s _ _ k | Choose the missing letters. | Complete the word sock. | 🧦 | ai; ea; oc; oo | **oc** |
| 13 | `grade-1-missing-letter-exam-004-q13` | duck | d _ _ k | Choose the missing letters. | Complete the word duck. | 🦆 | uc; oo; ea; ai | **uc** |
| 14 | `grade-1-missing-letter-exam-004-q14` | king | k _ _ g | Choose the missing letters. | Complete the word king. | 🤴 | ee; in; oa; ai | **in** |
| 15 | `grade-1-missing-letter-exam-004-q15` | jump | j _ _ p | Choose the missing letters. | Complete the word jump. | 🦘 | ai; ea; um; oo | **um** |
| 16 | `grade-1-missing-letter-exam-004-q16` | tent | t _ _ t | Choose the missing letters. | Complete the word tent. | ⛺ | ee; en; oa; ai | **en** |
| 17 | `grade-1-missing-letter-exam-004-q17` | milk | m _ _ k | Choose the missing letters. | Complete the word milk. | 🥛 | oo; ea; il; ai | **il** |
| 18 | `grade-1-missing-letter-exam-004-q18` | park | p _ _ k | Choose the missing letters. | Complete the word park. | 🏞️ | ar; ra; er; or | **ar** |
| 19 | `grade-1-missing-letter-exam-004-q19` | yard | y _ _ d | Choose the missing letters. | Complete the word yard. | 🏡 | oo; ar; ea; ai | **ar** |
| 20 | `grade-1-missing-letter-exam-004-q20` | zoom | z _ _ m | Choose the missing letters. | Complete the word zoom. | 🔍 | oa; ee; ai; oo | **oo** |

---

## Acceptance Criteria

- All four exams are available under Grade 1 English writing or word mastery.
- Each exam has 20 questions.
- Each question has four options.
- Correct answer positions are mixed across A/B/C/D.
- Visible prompts do not expose the answer.
- `readAloudText` reads the full target word aloud.
- Missing letter/word-part pattern is shown clearly.
- Learners can tap options comfortably on phone.
- The app gives immediate feedback.
- The learner can replay the read-aloud prompt.
- Manual and auto-read behavior should remain consistent with existing Grade 1 quiz behavior.
