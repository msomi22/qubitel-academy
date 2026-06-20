# Grade 1 CBC English — Three/Four-Letter Word Mastery Exams (Reviewed)

## Review outcome

This reviewed version fixes the earlier quiz-design issue where some visible prompts exposed the answer, for example `Find the word that begins with B: bat.`

In this version:

- The learner-facing visible prompt does **not** reveal the answer.
- The target word is stored separately in `Read aloud text` for TTS/audio.
- Each question has exactly 4 options.
- Correct answers are distributed evenly across A, B, C, and D.
- Every consonant has at least 5 questions across the full set.
- Mostly 3-letter CVC words are used, with common 4-letter exceptions and a few necessary Grade 1-friendly longer words for Q/Z.

## Important implementation rule

Do **not** render `Read aloud text` as visible text in the learner question. The learner should see the `Visible prompt`, optional visual hint, and answer options. The `Read aloud text` should be used by the existing Grade 1 quiz read-aloud flow.

Correct learner flow:

```text
Visible prompt: Choose the word you hear.
Read aloud text: bat
Visual hint: 🦇
Options: bad, bag, bat, bed
Learner taps: bat
```

Avoid this learner-facing pattern:

```text
Find the word that begins with B: bat.
```

That exposes the answer and must not be used in the UI.

## CBC Grade 1 design requirements

- Keep language short, friendly, and mobile-first.
- Questions must be read aloud using the existing Grade 1 quiz audio/read-aloud pattern.
- Use one question at a time with 4 large answer cards.
- Allow the learner to tap the whole option card.
- Keep visual hints simple and concrete.
- Prefer short decodable words: `cat`, `dog`, `sun`, `pen`, `bus`, `fan`.
- Use common 4-letter words only where useful: `goat`, `kite`, `fish`, `sock`, `vest`, `rain`.
- For `X`, use words with the /ks/ sound such as `fox`, `box`, `six`, `wax`, `mix`, `fix`; do not claim they begin with X.
- For `Q`, use common `qu` words such as `quiz`, `quit`, `queen`, `quack`, `quick`.
- Avoid advanced silent-letter traps and complex blends in the early exams.

## Suggested metadata

| Field | Value |
|---|---|
| Grade | 1 |
| Subject | English |
| Learning area | Alphabet Mastery / Early Word Reading |
| Content type | Exam / quiz |
| Interaction type | Read-aloud multiple choice |
| Exams | 12 |
| Questions per exam | 20 |
| Total questions | 240 |
| Options per question | 4 |
| Read aloud | Required |
| Mobile layout | Required |

## Correct answer distribution

- Option A: 60 correct answers
- Option B: 60 correct answers
- Option C: 60 correct answers
- Option D: 60 correct answers

## Consonant coverage

| Letter | Question count |
|---|---:|
| B | 13 |
| C | 13 |
| D | 12 |
| F | 13 |
| G | 13 |
| H | 12 |
| J | 10 |
| K | 11 |
| L | 10 |
| M | 13 |
| N | 13 |
| P | 12 |
| Q | 10 |
| R | 11 |
| S | 10 |
| T | 12 |
| V | 11 |
| W | 10 |
| X | 11 |
| Y | 11 |
| Z | 9 |

## Word bank by consonant

- **B**: bat, bed, bib, bug, bus, boy, bun, box, bag, big, bin, bad
- **C**: cat, cup, cow, car, cap, can, cot, cub, cut, cab, cod, cop
- **D**: dog, dad, den, dig, dot, dip, dug, dam, day, duck, dish
- **F**: fan, fox, fin, fun, fog, fat, fig, fit, fed, fish
- **G**: gum, gap, gas, get, got, goat, gift, girl, gate, gold
- **H**: hat, hen, hop, hot, hug, hut, ham, him, hit, hand
- **J**: jam, jug, jet, job, jog, jar, joy, jump, jazz, jeep
- **K**: kid, kit, key, keg, kite, king, kick, keep, kiss
- **L**: leg, lid, log, lip, lap, let, lot, lion, leaf, lamp
- **M**: man, mat, mug, mom, map, mix, mad, mud, moon, milk, mop
- **N**: net, nap, nut, nod, not, new, nest, nose, nine, name
- **P**: pot, pan, pin, pig, pen, pup, pet, pop, pod, pink, park
- **Q**: quiz, quit, queen, quack, quilt, quick, quiet
- **R**: rat, red, rug, run, ram, rib, rod, rip, rose, rain
- **S**: sun, sit, sad, sip, six, sat, sock, sand, seed, soap
- **T**: tap, ten, top, tub, tin, tag, toy, two, tall, tent
- **V**: van, vet, vase, vest, vine, vote, very, vow, vat
- **W**: web, wig, wet, win, wax, was, war, worm, wave, woman
- **X**: fox, box, six, wax, axe, mix, fix
- **Y**: yes, yam, yak, yap, yell, yolk, yard, yarn, you
- **Z**: zip, zoo, zig, zap, zebra, zero, zone, zoom

---

# Exams

## Exam 1: Beginning Sounds B, C and D

- **Exam id:** `grade-1-english-word-mastery-exam-001`
- **Learner title:** `Exam 1: Beginning Sounds B, C and D`
- **Question count:** 20
- **Focus letters:** B, C, D
- **Learner instruction:** Listen carefully. Tap the word you hear.
- **Implementation note:** `Read aloud text` is for TTS only and should not be visibly displayed as the answer.

| # | Question ID | Focus | Skill | Visible prompt | Read aloud text | Visual hint | A | B | C | D | Answer |
|---:|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `grade-1-word-exam-001-q01` | B | word_hear | Choose the word you hear. | `bat` | 🦇 | bed | fit | bat | tall | **bat** |
| 2 | `grade-1-word-exam-001-q02` | C | picture | Which word names the picture? | `cat` | 🐱 | cat | quit | kiss | vote | **cat** |
| 3 | `grade-1-word-exam-001-q03` | D | listen | Listen and tap the matching word. | `dog` | 🐶 | nose | vine | mop | dog | **dog** |
| 4 | `grade-1-word-exam-001-q04` | B | sound | Choose the word with the sound you hear. | `bed` | 🛏️ | leg | bed | tag | fog | **bed** |
| 5 | `grade-1-word-exam-001-q05` | C | read | Tap the word that matches the voice. | `cup` | ☕ | hug | cup | wax | pig | **cup** |
| 6 | `grade-1-word-exam-001-q06` | D | word_hear | Choose the word you hear. | `dad` | 👨 | sat | cab | new | dad | **dad** |
| 7 | `grade-1-word-exam-001-q07` | B | picture | Which word names the picture? | `bib` | 👶 | bib | tag | nine | mop | **bib** |
| 8 | `grade-1-word-exam-001-q08` | C | listen | Listen and tap the matching word. | `cow` | 🐄 | web | bib | cow | fig | **cow** |
| 9 | `grade-1-word-exam-001-q09` | D | sound | Choose the word with the sound you hear. | `den` | 🏠 | new | rain | woman | den | **den** |
| 10 | `grade-1-word-exam-001-q10` | B | read | Tap the word that matches the voice. | `bug` | 🐞 | mat | bug | hug | pup | **bug** |
| 11 | `grade-1-word-exam-001-q11` | C | word_hear | Choose the word you hear. | `car` | 🚗 | jam | fin | car | jeep | **car** |
| 12 | `grade-1-word-exam-001-q12` | D | picture | Which word names the picture? | `dig` | ⛏️ | dig | pop | was | wig | **dig** |
| 13 | `grade-1-word-exam-001-q13` | B | listen | Listen and tap the matching word. | `bus` | 🚌 | bus | zip | quiet | rip | **bus** |
| 14 | `grade-1-word-exam-001-q14` | C | sound | Choose the word with the sound you hear. | `cap` | 🧢 | net | yap | cap | gold | **cap** |
| 15 | `grade-1-word-exam-001-q15` | D | read | Tap the word that matches the voice. | `dot` | ⚫ | woman | dot | dam | zone | **dot** |
| 16 | `grade-1-word-exam-001-q16` | B | word_hear | Choose the word you hear. | `boy` | 👦 | vote | fix | hug | boy | **boy** |
| 17 | `grade-1-word-exam-001-q17` | C | picture | Which word names the picture? | `can` | 🥫 | got | gold | can | was | **can** |
| 18 | `grade-1-word-exam-001-q18` | D | listen | Listen and tap the matching word. | `dip` | 🥣 | six | vote | jam | dip | **dip** |
| 19 | `grade-1-word-exam-001-q19` | B | sound | Choose the word with the sound you hear. | `bun` | 🥯 | bun | worm | fox | sit | **bun** |
| 20 | `grade-1-word-exam-001-q20` | C | read | Tap the word that matches the voice. | `cot` | 🛏️ | him | cot | hug | dish | **cot** |

## Exam 2: Beginning Sounds F, G and H

- **Exam id:** `grade-1-english-word-mastery-exam-002`
- **Learner title:** `Exam 2: Beginning Sounds F, G and H`
- **Question count:** 20
- **Focus letters:** F, G, H
- **Learner instruction:** Listen carefully. Tap the word you hear.
- **Implementation note:** `Read aloud text` is for TTS only and should not be visibly displayed as the answer.

| # | Question ID | Focus | Skill | Visible prompt | Read aloud text | Visual hint | A | B | C | D | Answer |
|---:|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `grade-1-word-exam-002-q01` | F | word_hear | Choose the word you hear. | `fan` | 🪭 | hug | run | fan | fish | **fan** |
| 2 | `grade-1-word-exam-002-q02` | G | picture | Which word names the picture? | `gum` | 🍬 | gum | jug | ram | tin | **gum** |
| 3 | `grade-1-word-exam-002-q03` | H | listen | Listen and tap the matching word. | `hat` | 🎩 | goat | keg | big | hat | **hat** |
| 4 | `grade-1-word-exam-002-q04` | F | sound | Choose the word with the sound you hear. | `fox` | 🦊 | queen | fox | ham | seed | **fox** |
| 5 | `grade-1-word-exam-002-q05` | G | read | Tap the word that matches the voice. | `gap` | ↔️ | toy | gap | jug | zip | **gap** |
| 6 | `grade-1-word-exam-002-q06` | H | word_hear | Choose the word you hear. | `hen` | 🐔 | lap | axe | zoo | hen | **hen** |
| 7 | `grade-1-word-exam-002-q07` | F | picture | Which word names the picture? | `fin` | 🐟 | fin | war | pet | cod | **fin** |
| 8 | `grade-1-word-exam-002-q08` | G | listen | Listen and tap the matching word. | `gas` | ⛽ | jar | vote | gas | ten | **gas** |
| 9 | `grade-1-word-exam-002-q09` | H | sound | Choose the word with the sound you hear. | `hop` | 🐰 | nose | bat | dig | hop | **hop** |
| 10 | `grade-1-word-exam-002-q10` | F | read | Tap the word that matches the voice. | `fun` | 🎈 | tub | fun | kid | wave | **fun** |
| 11 | `grade-1-word-exam-002-q11` | G | word_hear | Choose the word you hear. | `get` | ✋ | hut | yolk | get | mad | **get** |
| 12 | `grade-1-word-exam-002-q12` | H | picture | Which word names the picture? | `hot` | 🔥 | hot | woman | moon | wig | **hot** |
| 13 | `grade-1-word-exam-002-q13` | F | listen | Listen and tap the matching word. | `fog` | 🌫️ | fog | box | nine | top | **fog** |
| 14 | `grade-1-word-exam-002-q14` | G | sound | Choose the word with the sound you hear. | `got` | ✅ | day | fix | got | box | **got** |
| 15 | `grade-1-word-exam-002-q15` | H | read | Tap the word that matches the voice. | `hug` | 🤗 | him | hug | car | hot | **hug** |
| 16 | `grade-1-word-exam-002-q16` | F | word_hear | Choose the word you hear. | `fat` | 🐷 | jam | cat | get | fat | **fat** |
| 17 | `grade-1-word-exam-002-q17` | G | picture | Which word names the picture? | `goat` | 🐐 | soap | jet | goat | red | **goat** |
| 18 | `grade-1-word-exam-002-q18` | H | listen | Listen and tap the matching word. | `hut` | 🛖 | cot | new | sip | hut | **hut** |
| 19 | `grade-1-word-exam-002-q19` | F | sound | Choose the word with the sound you hear. | `fig` | 🫒 | fig | yarn | was | bug | **fig** |
| 20 | `grade-1-word-exam-002-q20` | G | read | Tap the word that matches the voice. | `gift` | 🎁 | him | gift | woman | moon | **gift** |

## Exam 3: Beginning Sounds J, K and L

- **Exam id:** `grade-1-english-word-mastery-exam-003`
- **Learner title:** `Exam 3: Beginning Sounds J, K and L`
- **Question count:** 20
- **Focus letters:** J, K, L
- **Learner instruction:** Listen carefully. Tap the word you hear.
- **Implementation note:** `Read aloud text` is for TTS only and should not be visibly displayed as the answer.

| # | Question ID | Focus | Skill | Visible prompt | Read aloud text | Visual hint | A | B | C | D | Answer |
|---:|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `grade-1-word-exam-003-q01` | J | word_hear | Choose the word you hear. | `jam` | 🍓 | pup | quick | jam | jar | **jam** |
| 2 | `grade-1-word-exam-003-q02` | K | picture | Which word names the picture? | `kid` | 🧒 | kid | leaf | nap | gum | **kid** |
| 3 | `grade-1-word-exam-003-q03` | L | listen | Listen and tap the matching word. | `leg` | 🦵 | get | ten | yarn | leg | **leg** |
| 4 | `grade-1-word-exam-003-q04` | J | sound | Choose the word with the sound you hear. | `jug` | 🏺 | new | jug | quack | rip | **jug** |
| 5 | `grade-1-word-exam-003-q05` | K | read | Tap the word that matches the voice. | `kit` | 🧰 | bun | kit | kiss | yell | **kit** |
| 6 | `grade-1-word-exam-003-q06` | L | word_hear | Choose the word you hear. | `lid` | 🧢 | fox | kid | fig | lid | **lid** |
| 7 | `grade-1-word-exam-003-q07` | J | picture | Which word names the picture? | `jet` | ✈️ | jet | fin | king | keg | **jet** |
| 8 | `grade-1-word-exam-003-q08` | K | listen | Listen and tap the matching word. | `key` | 🔑 | red | quack | key | milk | **key** |
| 9 | `grade-1-word-exam-003-q09` | L | sound | Choose the word with the sound you hear. | `log` | 🪵 | zig | nut | box | log | **log** |
| 10 | `grade-1-word-exam-003-q10` | J | read | Tap the word that matches the voice. | `job` | 💼 | wax | job | wig | bad | **job** |
| 11 | `grade-1-word-exam-003-q11` | K | word_hear | Choose the word you hear. | `keg` | 🛢️ | queen | lip | keg | tent | **keg** |
| 12 | `grade-1-word-exam-003-q12` | L | picture | Which word names the picture? | `lip` | 👄 | lip | boy | keg | dish | **lip** |
| 13 | `grade-1-word-exam-003-q13` | J | listen | Listen and tap the matching word. | `jog` | 🏃 | jog | pet | yes | rug | **jog** |
| 14 | `grade-1-word-exam-003-q14` | K | sound | Choose the word with the sound you hear. | `kite` | 🪁 | fun | bin | kite | two | **kite** |
| 15 | `grade-1-word-exam-003-q15` | L | read | Tap the word that matches the voice. | `lap` | 🧍 | mom | lap | dug | pan | **lap** |
| 16 | `grade-1-word-exam-003-q16` | J | word_hear | Choose the word you hear. | `jar` | 🫙 | gold | vest | girl | jar | **jar** |
| 17 | `grade-1-word-exam-003-q17` | K | picture | Which word names the picture? | `king` | 🤴 | red | dog | king | girl | **king** |
| 18 | `grade-1-word-exam-003-q18` | L | listen | Listen and tap the matching word. | `let` | ✅ | run | not | war | let | **let** |
| 19 | `grade-1-word-exam-003-q19` | J | sound | Choose the word with the sound you hear. | `joy` | 😊 | joy | bun | yolk | woman | **joy** |
| 20 | `grade-1-word-exam-003-q20` | K | read | Tap the word that matches the voice. | `kick` | 🦵 | sad | kick | seed | bin | **kick** |

## Exam 4: Beginning Sounds M, N and P

- **Exam id:** `grade-1-english-word-mastery-exam-004`
- **Learner title:** `Exam 4: Beginning Sounds M, N and P`
- **Question count:** 20
- **Focus letters:** M, N, P
- **Learner instruction:** Listen carefully. Tap the word you hear.
- **Implementation note:** `Read aloud text` is for TTS only and should not be visibly displayed as the answer.

| # | Question ID | Focus | Skill | Visible prompt | Read aloud text | Visual hint | A | B | C | D | Answer |
|---:|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `grade-1-word-exam-004-q01` | M | word_hear | Choose the word you hear. | `man` | 👨 | jump | sand | man | pot | **man** |
| 2 | `grade-1-word-exam-004-q02` | N | picture | Which word names the picture? | `net` | 🥅 | net | box | dish | mom | **net** |
| 3 | `grade-1-word-exam-004-q03` | P | listen | Listen and tap the matching word. | `pot` | 🍲 | goat | cop | zoo | pot | **pot** |
| 4 | `grade-1-word-exam-004-q04` | M | sound | Choose the word with the sound you hear. | `mat` | 🧘 | duck | mat | let | kit | **mat** |
| 5 | `grade-1-word-exam-004-q05` | N | read | Tap the word that matches the voice. | `nap` | 😴 | zap | nap | jug | hen | **nap** |
| 6 | `grade-1-word-exam-004-q06` | P | word_hear | Choose the word you hear. | `pan` | 🍳 | nose | kick | vat | pan | **pan** |
| 7 | `grade-1-word-exam-004-q07` | M | picture | Which word names the picture? | `mug` | ☕ | mug | pig | joy | pan | **mug** |
| 8 | `grade-1-word-exam-004-q08` | N | listen | Listen and tap the matching word. | `nut` | 🥜 | axe | mud | nut | tag | **nut** |
| 9 | `grade-1-word-exam-004-q09` | P | sound | Choose the word with the sound you hear. | `pin` | 📌 | nut | yam | rug | pin | **pin** |
| 10 | `grade-1-word-exam-004-q10` | M | read | Tap the word that matches the voice. | `mom` | 👩 | fed | mom | dig | zero | **mom** |
| 11 | `grade-1-word-exam-004-q11` | N | word_hear | Choose the word you hear. | `nod` | 🙂 | map | mix | nod | tin | **nod** |
| 12 | `grade-1-word-exam-004-q12` | P | picture | Which word names the picture? | `pig` | 🐷 | pig | rib | pot | gap | **pig** |
| 13 | `grade-1-word-exam-004-q13` | M | listen | Listen and tap the matching word. | `map` | 🗺️ | map | wet | kid | woman | **map** |
| 14 | `grade-1-word-exam-004-q14` | N | sound | Choose the word with the sound you hear. | `not` | 🚫 | jump | wax | not | mix | **not** |
| 15 | `grade-1-word-exam-004-q15` | P | read | Tap the word that matches the voice. | `pen` | 🖊️ | got | pen | rip | not | **pen** |
| 16 | `grade-1-word-exam-004-q16` | M | word_hear | Choose the word you hear. | `mix` | 🥣 | vote | rug | zoom | mix | **mix** |
| 17 | `grade-1-word-exam-004-q17` | N | picture | Which word names the picture? | `new` | ✨ | box | hot | new | fix | **new** |
| 18 | `grade-1-word-exam-004-q18` | P | listen | Listen and tap the matching word. | `pup` | 🐶 | wax | wax | pan | pup | **pup** |
| 19 | `grade-1-word-exam-004-q19` | M | sound | Choose the word with the sound you hear. | `mad` | 😠 | mad | lap | cow | keep | **mad** |
| 20 | `grade-1-word-exam-004-q20` | N | read | Tap the word that matches the voice. | `nest` | 🪺 | can | nest | fox | mad | **nest** |

## Exam 5: Q, R and S Word Reading

- **Exam id:** `grade-1-english-word-mastery-exam-005`
- **Learner title:** `Exam 5: Q, R and S Word Reading`
- **Question count:** 20
- **Focus letters:** Q, R, S
- **Learner instruction:** Listen carefully. Tap the word you hear.
- **Implementation note:** `Read aloud text` is for TTS only and should not be visibly displayed as the answer.

| # | Question ID | Focus | Skill | Visible prompt | Read aloud text | Visual hint | A | B | C | D | Answer |
|---:|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `grade-1-word-exam-005-q01` | Q | word_hear | Choose the word you hear. | `quiz` | ❓ | gold | wig | quiz | seed | **quiz** |
| 2 | `grade-1-word-exam-005-q02` | R | picture | Which word names the picture? | `rat` | 🐀 | rat | nod | map | vase | **rat** |
| 3 | `grade-1-word-exam-005-q03` | S | listen | Listen and tap the matching word. | `sun` | ☀️ | lion | zoom | vine | sun | **sun** |
| 4 | `grade-1-word-exam-005-q04` | Q | sound | Choose the word with the sound you hear. | `quit` | ✋ | toy | quit | pot | dig | **quit** |
| 5 | `grade-1-word-exam-005-q05` | R | read | Tap the word that matches the voice. | `red` | 🔴 | cap | red | cab | vow | **red** |
| 6 | `grade-1-word-exam-005-q06` | S | word_hear | Choose the word you hear. | `sit` | 🪑 | nine | duck | two | sit | **sit** |
| 7 | `grade-1-word-exam-005-q07` | Q | picture | Which word names the picture? | `queen` | 👸 | queen | sat | get | park | **queen** |
| 8 | `grade-1-word-exam-005-q08` | R | listen | Listen and tap the matching word. | `rug` | 🧶 | dog | hand | rug | fish | **rug** |
| 9 | `grade-1-word-exam-005-q09` | S | sound | Choose the word with the sound you hear. | `sad` | 😢 | gift | pan | pig | sad | **sad** |
| 10 | `grade-1-word-exam-005-q10` | Q | read | Tap the word that matches the voice. | `quack` | 🦆 | name | quack | two | run | **quack** |
| 11 | `grade-1-word-exam-005-q11` | R | word_hear | Choose the word you hear. | `run` | 🏃 | hop | jug | run | tub | **run** |
| 12 | `grade-1-word-exam-005-q12` | S | picture | Which word names the picture? | `sip` | 🥤 | sip | pup | cut | bed | **sip** |
| 13 | `grade-1-word-exam-005-q13` | Q | listen | Listen and tap the matching word. | `quilt` | 🛌 | quilt | sip | hot | hat | **quilt** |
| 14 | `grade-1-word-exam-005-q14` | R | sound | Choose the word with the sound you hear. | `ram` | 🐏 | king | joy | ram | tap | **ram** |
| 15 | `grade-1-word-exam-005-q15` | S | read | Tap the word that matches the voice. | `six` | 6️⃣ | kiss | six | vote | jet | **six** |
| 16 | `grade-1-word-exam-005-q16` | Q | word_hear | Choose the word you hear. | `quick` | ⚡ | nut | nose | net | quick | **quick** |
| 17 | `grade-1-word-exam-005-q17` | R | picture | Which word names the picture? | `rib` | 🦴 | duck | quit | rib | bed | **rib** |
| 18 | `grade-1-word-exam-005-q18` | S | listen | Listen and tap the matching word. | `sat` | 🪑 | new | name | gum | sat | **sat** |
| 19 | `grade-1-word-exam-005-q19` | Q | sound | Choose the word with the sound you hear. | `quiet` | 🤫 | quiet | van | zero | quilt | **quiet** |
| 20 | `grade-1-word-exam-005-q20` | R | read | Tap the word that matches the voice. | `rod` | 🎣 | hot | rod | cod | gap | **rod** |

## Exam 6: T, V and W Word Reading

- **Exam id:** `grade-1-english-word-mastery-exam-006`
- **Learner title:** `Exam 6: T, V and W Word Reading`
- **Question count:** 20
- **Focus letters:** T, V, W
- **Learner instruction:** Listen carefully. Tap the word you hear.
- **Implementation note:** `Read aloud text` is for TTS only and should not be visibly displayed as the answer.

| # | Question ID | Focus | Skill | Visible prompt | Read aloud text | Visual hint | A | B | C | D | Answer |
|---:|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `grade-1-word-exam-006-q01` | T | word_hear | Choose the word you hear. | `tap` | 👆 | top | joy | tap | wave | **tap** |
| 2 | `grade-1-word-exam-006-q02` | V | picture | Which word names the picture? | `van` | 🚐 | van | war | rod | pink | **van** |
| 3 | `grade-1-word-exam-006-q03` | W | listen | Listen and tap the matching word. | `web` | 🕸️ | cap | vine | rib | web | **web** |
| 4 | `grade-1-word-exam-006-q04` | T | sound | Choose the word with the sound you hear. | `ten` | 🔟 | nut | ten | tub | lot | **ten** |
| 5 | `grade-1-word-exam-006-q05` | V | read | Tap the word that matches the voice. | `vet` | 👩‍⚕️ | cap | vet | mop | yes | **vet** |
| 6 | `grade-1-word-exam-006-q06` | W | word_hear | Choose the word you hear. | `wig` | 💇 | job | hit | worm | wig | **wig** |
| 7 | `grade-1-word-exam-006-q07` | T | picture | Which word names the picture? | `top` | 🔝 | top | lip | jar | pan | **top** |
| 8 | `grade-1-word-exam-006-q08` | V | listen | Listen and tap the matching word. | `vase` | 🏺 | fin | hut | vase | new | **vase** |
| 9 | `grade-1-word-exam-006-q09` | W | sound | Choose the word with the sound you hear. | `wet` | 💧 | quiz | yarn | cab | wet | **wet** |
| 10 | `grade-1-word-exam-006-q10` | T | read | Tap the word that matches the voice. | `tub` | 🛁 | queen | tub | mix | van | **tub** |
| 11 | `grade-1-word-exam-006-q11` | V | word_hear | Choose the word you hear. | `vest` | 🦺 | mud | yard | vest | top | **vest** |
| 12 | `grade-1-word-exam-006-q12` | W | picture | Which word names the picture? | `win` | 🏆 | win | dam | sip | fog | **win** |
| 13 | `grade-1-word-exam-006-q13` | T | listen | Listen and tap the matching word. | `tin` | 🥫 | tin | gap | fox | fun | **tin** |
| 14 | `grade-1-word-exam-006-q14` | V | sound | Choose the word with the sound you hear. | `vine` | 🌿 | web | you | vine | worm | **vine** |
| 15 | `grade-1-word-exam-006-q15` | W | read | Tap the word that matches the voice. | `wax` | 🕯️ | kit | wax | bun | get | **wax** |
| 16 | `grade-1-word-exam-006-q16` | T | word_hear | Choose the word you hear. | `tag` | 🏷️ | king | queen | bag | tag | **tag** |
| 17 | `grade-1-word-exam-006-q17` | V | picture | Which word names the picture? | `vote` | 🗳️ | joy | duck | vote | dish | **vote** |
| 18 | `grade-1-word-exam-006-q18` | W | listen | Listen and tap the matching word. | `was` | 📖 | lamp | six | dam | was | **was** |
| 19 | `grade-1-word-exam-006-q19` | T | sound | Choose the word with the sound you hear. | `toy` | 🧸 | toy | mud | zoo | zap | **toy** |
| 20 | `grade-1-word-exam-006-q20` | V | read | Tap the word that matches the voice. | `very` | ⭐ | worm | very | pop | jar | **very** |

## Exam 7: X, Y and Z Word Reading

- **Exam id:** `grade-1-english-word-mastery-exam-007`
- **Learner title:** `Exam 7: X, Y and Z Word Reading`
- **Question count:** 20
- **Focus letters:** X, Y, Z
- **Learner instruction:** Listen carefully. Tap the word you hear.
- **Implementation note:** `Read aloud text` is for TTS only and should not be visibly displayed as the answer.

| # | Question ID | Focus | Skill | Visible prompt | Read aloud text | Visual hint | A | B | C | D | Answer |
|---:|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `grade-1-word-exam-007-q01` | X | word_hear | Choose the word with the x sound you hear. | `fox` | 🦊 | vat | duck | fox | yarn | **fox** |
| 2 | `grade-1-word-exam-007-q02` | Y | picture | Which word names the picture? | `yes` | ✅ | yes | pin | rain | zap | **yes** |
| 3 | `grade-1-word-exam-007-q03` | Z | listen | Listen and tap the matching word. | `zip` | 🤐 | web | pen | nest | zip | **zip** |
| 4 | `grade-1-word-exam-007-q04` | X | sound | Choose the word with the x sound you hear. | `box` | 📦 | joy | box | rip | zone | **box** |
| 5 | `grade-1-word-exam-007-q05` | Y | read | Tap the word that matches the voice. | `yam` | 🍠 | mad | yam | jog | seed | **yam** |
| 6 | `grade-1-word-exam-007-q06` | Z | word_hear | Choose the word you hear. | `zoo` | 🦓 | hug | hut | vat | zoo | **zoo** |
| 7 | `grade-1-word-exam-007-q07` | X | picture | Choose the word with the x sound you hear. | `six` | 6️⃣ | six | can | got | dug | **six** |
| 8 | `grade-1-word-exam-007-q08` | Y | listen | Listen and tap the matching word. | `yak` | 🐂 | pig | zoom | yak | pet | **yak** |
| 9 | `grade-1-word-exam-007-q09` | Z | sound | Choose the word with the sound you hear. | `zig` | ↗️ | six | lion | nod | zig | **zig** |
| 10 | `grade-1-word-exam-007-q10` | X | read | Choose the word with the x sound you hear. | `wax` | 🕯️ | zone | wax | jam | map | **wax** |
| 11 | `grade-1-word-exam-007-q11` | Y | word_hear | Choose the word you hear. | `yap` | 🐶 | lip | soap | yap | lion | **yap** |
| 12 | `grade-1-word-exam-007-q12` | Z | picture | Which word names the picture? | `zap` | ⚡ | zap | sun | hat | kiss | **zap** |
| 13 | `grade-1-word-exam-007-q13` | X | listen | Choose the word with the x sound you hear. | `axe` | 🪓 | axe | you | jam | quiet | **axe** |
| 14 | `grade-1-word-exam-007-q14` | Y | sound | Choose the word with the sound you hear. | `yell` | 📣 | kiss | hand | yell | log | **yell** |
| 15 | `grade-1-word-exam-007-q15` | Z | read | Tap the word that matches the voice. | `zebra` | 🦓 | sock | zebra | fan | pin | **zebra** |
| 16 | `grade-1-word-exam-007-q16` | X | word_hear | Choose the word with the x sound you hear. | `mix` | 🥣 | fed | woman | pod | mix | **mix** |
| 17 | `grade-1-word-exam-007-q17` | Y | picture | Which word names the picture? | `yolk` | 🥚 | milk | zero | yolk | lamp | **yolk** |
| 18 | `grade-1-word-exam-007-q18` | Z | listen | Listen and tap the matching word. | `zero` | 0️⃣ | yak | wax | very | zero | **zero** |
| 19 | `grade-1-word-exam-007-q19` | X | sound | Choose the word with the x sound you hear. | `fix` | 🔧 | fix | pet | joy | pop | **fix** |
| 20 | `grade-1-word-exam-007-q20` | Y | read | Tap the word that matches the voice. | `yard` | 🏡 | worm | yard | six | cup | **yard** |

## Exam 8: Mixed CVC Review 1

- **Exam id:** `grade-1-english-word-mastery-exam-008`
- **Learner title:** `Exam 8: Mixed CVC Review 1`
- **Question count:** 20
- **Focus letters:** B, C, D, F, G, H, J
- **Learner instruction:** Listen carefully. Tap the word you hear.
- **Implementation note:** `Read aloud text` is for TTS only and should not be visibly displayed as the answer.

| # | Question ID | Focus | Skill | Visible prompt | Read aloud text | Visual hint | A | B | C | D | Answer |
|---:|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `grade-1-word-exam-008-q01` | B | word_hear | Choose the word you hear. | `box` | 📦 | dig | hug | box | keg | **box** |
| 2 | `grade-1-word-exam-008-q02` | C | picture | Which word names the picture? | `cub` | 🐻 | cub | man | sock | fox | **cub** |
| 3 | `grade-1-word-exam-008-q03` | D | listen | Listen and tap the matching word. | `dug` | ⛏️ | dam | goat | sun | dug | **dug** |
| 4 | `grade-1-word-exam-008-q04` | F | sound | Choose the word with the sound you hear. | `fit` | 🏃 | dug | fit | box | lamp | **fit** |
| 5 | `grade-1-word-exam-008-q05` | G | read | Tap the word that matches the voice. | `girl` | 👧 | dad | girl | nest | mad | **girl** |
| 6 | `grade-1-word-exam-008-q06` | H | word_hear | Choose the word you hear. | `ham` | 🍖 | leaf | sat | seed | ham | **ham** |
| 7 | `grade-1-word-exam-008-q07` | J | picture | Which word names the picture? | `jump` | ⬆️ | jump | leg | duck | yard | **jump** |
| 8 | `grade-1-word-exam-008-q08` | B | listen | Listen and tap the matching word. | `bag` | 🎒 | rat | bin | bag | fix | **bag** |
| 9 | `grade-1-word-exam-008-q09` | C | sound | Choose the word with the sound you hear. | `cut` | ✂️ | top | get | nut | cut | **cut** |
| 10 | `grade-1-word-exam-008-q10` | D | read | Tap the word that matches the voice. | `dam` | 🌊 | cap | dam | sip | keep | **dam** |
| 11 | `grade-1-word-exam-008-q11` | F | word_hear | Choose the word you hear. | `fed` | 🍽️ | joy | got | fed | cab | **fed** |
| 12 | `grade-1-word-exam-008-q12` | G | picture | Which word names the picture? | `gate` | 🚪 | gate | pen | cow | got | **gate** |
| 13 | `grade-1-word-exam-008-q13` | H | listen | Listen and tap the matching word. | `him` | 👦 | him | wave | sat | hot | **him** |
| 14 | `grade-1-word-exam-008-q14` | J | sound | Choose the word with the sound you hear. | `jazz` | 🎷 | keep | bad | jazz | net | **jazz** |
| 15 | `grade-1-word-exam-008-q15` | B | read | Tap the word that matches the voice. | `big` | 🔠 | bag | big | zone | let | **big** |
| 16 | `grade-1-word-exam-008-q16` | C | word_hear | Choose the word you hear. | `cab` | 🚕 | cat | hop | keg | cab | **cab** |
| 17 | `grade-1-word-exam-008-q17` | D | picture | Which word names the picture? | `day` | ☀️ | mat | fit | day | queen | **day** |
| 18 | `grade-1-word-exam-008-q18` | F | listen | Listen and tap the matching word. | `fish` | 🐟 | moon | log | sand | fish | **fish** |
| 19 | `grade-1-word-exam-008-q19` | G | sound | Choose the word with the sound you hear. | `gold` | 🥇 | gold | quick | dug | fig | **gold** |
| 20 | `grade-1-word-exam-008-q20` | H | read | Tap the word that matches the voice. | `hit` | 🥎 | hug | hit | sun | big | **hit** |

## Exam 9: Mixed CVC Review 2

- **Exam id:** `grade-1-english-word-mastery-exam-009`
- **Learner title:** `Exam 9: Mixed CVC Review 2`
- **Question count:** 20
- **Focus letters:** K, L, M, N, P, R, S
- **Learner instruction:** Listen carefully. Tap the word you hear.
- **Implementation note:** `Read aloud text` is for TTS only and should not be visibly displayed as the answer.

| # | Question ID | Focus | Skill | Visible prompt | Read aloud text | Visual hint | A | B | C | D | Answer |
|---:|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `grade-1-word-exam-009-q01` | K | word_hear | Choose the word you hear. | `keep` | 🤲 | new | can | keep | box | **keep** |
| 2 | `grade-1-word-exam-009-q02` | L | picture | Which word names the picture? | `lot` | 🔢 | lot | fig | cat | pod | **lot** |
| 3 | `grade-1-word-exam-009-q03` | M | listen | Listen and tap the matching word. | `mud` | 🟤 | quick | fit | very | mud | **mud** |
| 4 | `grade-1-word-exam-009-q04` | N | sound | Choose the word with the sound you hear. | `nose` | 👃 | got | nose | yolk | mom | **nose** |
| 5 | `grade-1-word-exam-009-q05` | P | read | Tap the word that matches the voice. | `pet` | 🐕 | gap | pet | gift | kid | **pet** |
| 6 | `grade-1-word-exam-009-q06` | R | word_hear | Choose the word you hear. | `rip` | 📄 | red | let | six | rip | **rip** |
| 7 | `grade-1-word-exam-009-q07` | S | picture | Which word names the picture? | `sock` | 🧦 | sock | leaf | zip | duck | **sock** |
| 8 | `grade-1-word-exam-009-q08` | K | listen | Listen and tap the matching word. | `kiss` | 💋 | pod | bib | kiss | two | **kiss** |
| 9 | `grade-1-word-exam-009-q09` | L | sound | Choose the word with the sound you hear. | `lion` | 🦁 | nose | fun | seed | lion | **lion** |
| 10 | `grade-1-word-exam-009-q10` | M | read | Tap the word that matches the voice. | `moon` | 🌙 | zoom | moon | six | pod | **moon** |
| 11 | `grade-1-word-exam-009-q11` | N | word_hear | Choose the word you hear. | `nine` | 9️⃣ | new | dug | nine | six | **nine** |
| 12 | `grade-1-word-exam-009-q12` | P | picture | Which word names the picture? | `pop` | 🎈 | pop | man | kite | fish | **pop** |
| 13 | `grade-1-word-exam-009-q13` | R | listen | Listen and tap the matching word. | `rose` | 🌹 | rose | man | bag | tag | **rose** |
| 14 | `grade-1-word-exam-009-q14` | S | sound | Choose the word with the sound you hear. | `sand` | 🏖️ | mix | zebra | sand | zone | **sand** |
| 15 | `grade-1-word-exam-009-q15` | K | read | Tap the word that matches the voice. | `kid` | 🧒 | leaf | kid | nap | gum | **kid** |
| 16 | `grade-1-word-exam-009-q16` | L | word_hear | Choose the word you hear. | `leaf` | 🍃 | toy | joy | jazz | leaf | **leaf** |
| 17 | `grade-1-word-exam-009-q17` | M | picture | Which word names the picture? | `milk` | 🥛 | nod | sock | milk | sand | **milk** |
| 18 | `grade-1-word-exam-009-q18` | N | listen | Listen and tap the matching word. | `name` | 🏷️ | dig | hen | sand | name | **name** |
| 19 | `grade-1-word-exam-009-q19` | P | sound | Choose the word with the sound you hear. | `pod` | 🌱 | pod | you | nod | keg | **pod** |
| 20 | `grade-1-word-exam-009-q20` | R | read | Tap the word that matches the voice. | `rain` | 🌧️ | pot | rain | cut | can | **rain** |

## Exam 10: Mixed CVC Review 3

- **Exam id:** `grade-1-english-word-mastery-exam-010`
- **Learner title:** `Exam 10: Mixed CVC Review 3`
- **Question count:** 20
- **Focus letters:** Q, T, V, W, X, Y, Z
- **Learner instruction:** Listen carefully. Tap the word you hear.
- **Implementation note:** `Read aloud text` is for TTS only and should not be visibly displayed as the answer.

| # | Question ID | Focus | Skill | Visible prompt | Read aloud text | Visual hint | A | B | C | D | Answer |
|---:|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `grade-1-word-exam-010-q01` | T | word_hear | Choose the word you hear. | `two` | 2️⃣ | zebra | cat | two | fish | **two** |
| 2 | `grade-1-word-exam-010-q02` | V | picture | Which word names the picture? | `vow` | 🤝 | vow | nod | gas | bed | **vow** |
| 3 | `grade-1-word-exam-010-q03` | W | listen | Listen and tap the matching word. | `war` | ⚔️ | rod | box | cat | war | **war** |
| 4 | `grade-1-word-exam-010-q04` | X | sound | Choose the word with the x sound you hear. | `fox` | 🦊 | vat | fox | duck | yarn | **fox** |
| 5 | `grade-1-word-exam-010-q05` | Y | read | Tap the word that matches the voice. | `yarn` | 🧶 | new | yarn | mug | cat | **yarn** |
| 6 | `grade-1-word-exam-010-q06` | Z | word_hear | Choose the word you hear. | `zone` | ⭕ | cup | yolk | hut | zone | **zone** |
| 7 | `grade-1-word-exam-010-q07` | Q | picture | Which word names the picture? | `quiz` | ❓ | quiz | gold | wig | seed | **quiz** |
| 8 | `grade-1-word-exam-010-q08` | T | listen | Listen and tap the matching word. | `tall` | 📏 | quiet | rug | tall | moon | **tall** |
| 9 | `grade-1-word-exam-010-q09` | V | sound | Choose the word with the sound you hear. | `vat` | 🛢️ | bug | six | sip | vat | **vat** |
| 10 | `grade-1-word-exam-010-q10` | W | read | Tap the word that matches the voice. | `worm` | 🪱 | zap | worm | big | soap | **worm** |
| 11 | `grade-1-word-exam-010-q11` | X | word_hear | Choose the word with the x sound you hear. | `box` | 📦 | joy | rip | box | zone | **box** |
| 12 | `grade-1-word-exam-010-q12` | Y | picture | Which word names the picture? | `you` | 👉 | you | keg | dad | six | **you** |
| 13 | `grade-1-word-exam-010-q13` | Z | listen | Listen and tap the matching word. | `zoom` | 🏎️ | zoom | nap | fin | rain | **zoom** |
| 14 | `grade-1-word-exam-010-q14` | Q | sound | Choose the word with the sound you hear. | `quit` | ✋ | toy | pot | quit | dig | **quit** |
| 15 | `grade-1-word-exam-010-q15` | T | read | Tap the word that matches the voice. | `tent` | ⛺ | cut | tent | mud | tap | **tent** |
| 16 | `grade-1-word-exam-010-q16` | V | word_hear | Choose the word you hear. | `van` | 🚐 | war | rod | pink | van | **van** |
| 17 | `grade-1-word-exam-010-q17` | W | picture | Which word names the picture? | `wave` | 👋 | cot | fox | wave | den | **wave** |
| 18 | `grade-1-word-exam-010-q18` | X | listen | Choose the word with the x sound you hear. | `six` | 6️⃣ | can | got | dug | six | **six** |
| 19 | `grade-1-word-exam-010-q19` | Y | sound | Choose the word with the sound you hear. | `yes` | ✅ | yes | pin | rain | zap | **yes** |
| 20 | `grade-1-word-exam-010-q20` | Z | read | Tap the word that matches the voice. | `zip` | 🤐 | web | zip | pen | nest | **zip** |

## Exam 11: Short Vowel Word Families

- **Exam id:** `grade-1-english-word-mastery-exam-011`
- **Learner title:** `Exam 11: Short Vowel Word Families`
- **Question count:** 20
- **Focus letters:** B, C, D, F, G, H, M, N, P, S, T
- **Learner instruction:** Listen carefully. Tap the word you hear.
- **Implementation note:** `Read aloud text` is for TTS only and should not be visibly displayed as the answer.

| # | Question ID | Focus | Skill | Visible prompt | Read aloud text | Visual hint | A | B | C | D | Answer |
|---:|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `grade-1-word-exam-011-q01` | B | word_hear | Choose the word you hear. | `bin` | 🗑️ | box | yak | bin | sat | **bin** |
| 2 | `grade-1-word-exam-011-q02` | C | picture | Which word names the picture? | `cod` | 🐟 | cod | yolk | box | lion | **cod** |
| 3 | `grade-1-word-exam-011-q03` | D | listen | Listen and tap the matching word. | `duck` | 🦆 | quit | cup | pod | duck | **duck** |
| 4 | `grade-1-word-exam-011-q04` | F | sound | Choose the word with the sound you hear. | `fan` | 🪭 | hug | fan | run | fish | **fan** |
| 5 | `grade-1-word-exam-011-q05` | G | read | Tap the word that matches the voice. | `gum` | 🍬 | jug | gum | ram | tin | **gum** |
| 6 | `grade-1-word-exam-011-q06` | H | word_hear | Choose the word you hear. | `hand` | ✋ | rose | wax | cat | hand | **hand** |
| 7 | `grade-1-word-exam-011-q07` | M | picture | Which word names the picture? | `mop` | 🧹 | mop | dot | war | mud | **mop** |
| 8 | `grade-1-word-exam-011-q08` | N | listen | Listen and tap the matching word. | `net` | 🥅 | box | dish | net | mom | **net** |
| 9 | `grade-1-word-exam-011-q09` | P | sound | Choose the word with the sound you hear. | `pink` | 🌸 | kiss | nest | tag | pink | **pink** |
| 10 | `grade-1-word-exam-011-q10` | S | read | Tap the word that matches the voice. | `seed` | 🌱 | tall | seed | goat | run | **seed** |
| 11 | `grade-1-word-exam-011-q11` | T | word_hear | Choose the word you hear. | `tap` | 👆 | top | joy | tap | wave | **tap** |
| 12 | `grade-1-word-exam-011-q12` | B | picture | Which word names the picture? | `bad` | 👎 | bad | tin | cut | keg | **bad** |
| 13 | `grade-1-word-exam-011-q13` | C | listen | Listen and tap the matching word. | `cop` | 👮 | cop | quack | sun | sip | **cop** |
| 14 | `grade-1-word-exam-011-q14` | D | sound | Choose the word with the sound you hear. | `dish` | 🍽️ | tent | duck | dish | lot | **dish** |
| 15 | `grade-1-word-exam-011-q15` | F | read | Tap the word that matches the voice. | `fox` | 🦊 | queen | fox | ham | seed | **fox** |
| 16 | `grade-1-word-exam-011-q16` | G | word_hear | Choose the word you hear. | `gap` | ↔️ | toy | jug | zip | gap | **gap** |
| 17 | `grade-1-word-exam-011-q17` | H | picture | Which word names the picture? | `hat` | 🎩 | goat | keg | hat | big | **hat** |
| 18 | `grade-1-word-exam-011-q18` | M | listen | Listen and tap the matching word. | `man` | 👨 | jump | sand | pot | man | **man** |
| 19 | `grade-1-word-exam-011-q19` | N | sound | Choose the word with the sound you hear. | `nap` | 😴 | nap | zap | jug | hen | **nap** |
| 20 | `grade-1-word-exam-011-q20` | P | read | Tap the word that matches the voice. | `park` | 🏞️ | zig | park | box | fig | **park** |

## Exam 12: Cumulative Three and Four Letter Mastery

- **Exam id:** `grade-1-english-word-mastery-exam-012`
- **Learner title:** `Exam 12: Cumulative Three and Four Letter Mastery`
- **Question count:** 20
- **Focus letters:** B, C, D, F, G, H, J, K, L, M, N, P, Q, R, S, T, V, W, X, Y
- **Learner instruction:** Listen carefully. Tap the word you hear.
- **Implementation note:** `Read aloud text` is for TTS only and should not be visibly displayed as the answer.

| # | Question ID | Focus | Skill | Visible prompt | Read aloud text | Visual hint | A | B | C | D | Answer |
|---:|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `grade-1-word-exam-012-q01` | B | word_hear | Choose the word you hear. | `bat` | 🦇 | bed | fit | bat | tall | **bat** |
| 2 | `grade-1-word-exam-012-q02` | C | picture | Which word names the picture? | `cat` | 🐱 | cat | quit | kiss | vote | **cat** |
| 3 | `grade-1-word-exam-012-q03` | D | listen | Listen and tap the matching word. | `dog` | 🐶 | nose | vine | mop | dog | **dog** |
| 4 | `grade-1-word-exam-012-q04` | F | sound | Choose the word with the sound you hear. | `fin` | 🐟 | war | fin | pet | cod | **fin** |
| 5 | `grade-1-word-exam-012-q05` | G | read | Tap the word that matches the voice. | `gas` | ⛽ | jar | gas | vote | ten | **gas** |
| 6 | `grade-1-word-exam-012-q06` | H | word_hear | Choose the word you hear. | `hen` | 🐔 | lap | axe | zoo | hen | **hen** |
| 7 | `grade-1-word-exam-012-q07` | J | picture | Which word names the picture? | `jeep` | 🚙 | jeep | vest | cot | bug | **jeep** |
| 8 | `grade-1-word-exam-012-q08` | K | listen | Listen and tap the matching word. | `kit` | 🧰 | bun | kiss | kit | yell | **kit** |
| 9 | `grade-1-word-exam-012-q09` | L | sound | Choose the word with the sound you hear. | `lamp` | 💡 | red | kick | quilt | lamp | **lamp** |
| 10 | `grade-1-word-exam-012-q10` | M | read | Tap the word that matches the voice. | `mat` | 🧘 | duck | mat | let | kit | **mat** |
| 11 | `grade-1-word-exam-012-q11` | N | word_hear | Choose the word you hear. | `nut` | 🥜 | axe | mud | nut | tag | **nut** |
| 12 | `grade-1-word-exam-012-q12` | P | picture | Which word names the picture? | `pot` | 🍲 | pot | goat | cop | zoo | **pot** |
| 13 | `grade-1-word-exam-012-q13` | Q | listen | Listen and tap the matching word. | `queen` | 👸 | queen | sat | get | park | **queen** |
| 14 | `grade-1-word-exam-012-q14` | R | sound | Choose the word with the sound you hear. | `rat` | 🐀 | nod | map | rat | vase | **rat** |
| 15 | `grade-1-word-exam-012-q15` | S | read | Tap the word that matches the voice. | `soap` | 🧼 | quick | soap | mix | rib | **soap** |
| 16 | `grade-1-word-exam-012-q16` | T | word_hear | Choose the word you hear. | `ten` | 🔟 | nut | tub | lot | ten | **ten** |
| 17 | `grade-1-word-exam-012-q17` | V | picture | Which word names the picture? | `vet` | 👩‍⚕️ | cap | mop | vet | yes | **vet** |
| 18 | `grade-1-word-exam-012-q18` | W | listen | Listen and tap the matching word. | `woman` | 👩 | bun | get | dad | woman | **woman** |
| 19 | `grade-1-word-exam-012-q19` | X | sound | Choose the word with the x sound you hear. | `wax` | 🕯️ | wax | zone | jam | map | **wax** |
| 20 | `grade-1-word-exam-012-q20` | Y | read | Tap the word that matches the voice. | `yam` | 🍠 | mad | yam | jog | seed | **yam** |
