---
paths:
  - "src/academies/cbc/**"
  - "src/pages/**Cbc**"
  - "src/pages/**cbc**"
  - "src/styles/cbc**"
  - "src/styles/**cbc**"
  - "src/assets/academies/cbc/**"
  - "docs/grade-*/**"
  - "docs/design-references/**"
---

# CBC Academy Rules

## Audience

CBC Academy is for child-friendly learning.

For Grade 1 and early grades:

- use simple language
- keep interactions obvious
- prefer large tappable targets
- support read-aloud/audio-first flows
- keep screens mobile-friendly
- avoid dense adult/admin dashboard patterns

## Grade 1 UI

Grade 1 should feel playful, friendly, and clear.

Prefer:

- big buttons
- compact single-screen flows where possible
- friendly visuals
- readable spacing
- consistent top/bottom navigation where that pattern already exists
- clear "Back to Topic" behavior
- no unnecessary repeated headings

Avoid:

- tiny controls
- clutter
- hidden mascots/illustrations
- overlapping cards
- hardcoded dashboard counts
- UI that requires scrolling for core question actions when avoidable

## CBC content correctness

For CBC questions:

- image/icon must match the asked word
- read-aloud text must match the expected answer
- options must include exactly one correct answer unless task says otherwise
- explanations must be short and child-friendly
- do not replace approved word/audio mappings with common alternatives

## Alphabet/audio caution

When working on existing alphabet/audio content, do not substitute examples casually.

Preserve existing approved mappings unless the task explicitly changes them.

## Exams and assessments

Use consistent learner-facing naming.

Prefer compact list labels for cards and more descriptive titles inside the exam page.

Do not duplicate grade text unnecessarily in tight card layouts when the surrounding page already provides grade context.

## Visual changes

For CBC UI work:

- preserve current routes and progress behavior
- keep mobile first
- test narrow screens
- provide screenshots or manual visual notes