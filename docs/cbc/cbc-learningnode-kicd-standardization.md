# CBC LearningNode Standardization Guide

> Purpose: standardize current CBC work so it matches the KICD curriculum naming and the new LearningNode approach.
>
> Core hierarchy:
>
> ```text
> Academy → Grade → Learning Area → Theme → Strand → Sub-strand → Content
> ```
>
> This guide is intended for `msomi22/qubitel-academy`.

---

## 1. Core Standard

All CBC curriculum structure must be represented using the LearningNode model and KICD-aligned naming.

Do not organize curriculum around generic software terms such as `subject` when the curriculum uses **Learning Area**.

Correct hierarchy:

```text
Academy
  → Grade
    → Learning Area
      → Theme
        → Strand
          → Sub-strand
            → Content
```

For CBC Grade 1 English, the correct curriculum-facing name is:

```text
English Activities
```

not simply:

```text
English
```

The app may use a shorter learner-facing alias such as `English` only where approved, but the canonical curriculum metadata must preserve the KICD name.

---

## 2. Naming Rule

Use KICD names for curriculum labels, metadata, and planning documents.

### Use

```text
Learning Area
English Activities
Kiswahili Activities
Mathematical Activities
Environmental Activities
Hygiene and Nutrition Activities
Movement and Creative Activities
Religious Education Activities
```

### Avoid as canonical curriculum terms

```text
Subject
English
Math
PE
Creative Arts
```

These may exist as legacy route aliases or UI shortcuts, but they should not be the canonical curriculum structure.

---

## 3. LearningNode Kind Standard

Use the following `kind` values.

```text
academy
grade
learning-area
theme
strand
sub-strand
content
notes
practice
revision
assessment
exam
activity
```

Do not use:

```text
subject
topic
unit
lesson-group
```

unless the KICD curriculum explicitly uses those terms for that grade/learning area or the node is not representing CBC curriculum structure.

---

## 4. Canonical Hierarchy Example

For CBC Grade 1 English Activities, the hierarchy should look like this:

```text
cbc-academy
  └── grade-1
        └── grade-1-english-activities
              └── grade-1-english-activities-theme-greetings
                    └── grade-1-english-activities-greetings-listening-speaking
                          └── grade-1-english-activities-greetings-pronunciation-vocabulary
                                ├── grade-1-english-activities-greetings-pronunciation-vocabulary-notes
                                ├── grade-1-english-activities-greetings-pronunciation-vocabulary-practice
                                ├── grade-1-english-activities-greetings-pronunciation-vocabulary-revision
                                └── grade-1-english-activities-greetings-pronunciation-vocabulary-assessments
```

---

## 5. Current Work Standardization

Current work may already use shorter or older names such as:

```text
grade-1/english
subjectId: english
topicId: english
```

During standardization, do not break existing production content.

Use this approach:

1. Keep existing routes and content files working.
2. Add LearningNode metadata using KICD-aligned names.
3. Add aliases only for backward compatibility.
4. Do not rename production IDs unless explicitly approved.
5. Do not move existing files unless a migration issue explicitly approves it.
6. New LearningNode work must use KICD-aligned naming.

---

## 6. Compatibility Rule

If old content exists under:

```text
src/academies/cbc/grade-1/english/
```

keep it working.

The LearningNode may map the legacy folder to the canonical KICD learning area.

Example:

```ts
attributes: {
  academyId: 'cbc-academy',
  curriculum: 'cbc',
  country: 'KE',

  gradeId: 'grade-1',

  learningAreaId: 'english-activities',
  learningAreaName: 'English Activities',

  legacySubjectId: 'english',
  legacyTopicId: 'english',
  legacyPath: 'src/academies/cbc/grade-1/english'
}
```

This allows current files to remain stable while the curriculum model becomes correct.

---

## 7. Required Node Field Standard

Every LearningNode should have:

```ts
{
  id: string,
  kind: string,
  label: string,
  summary: string,
  parentId: string | null,
  childIds: string[],
  attributes: Record<string, unknown>,
  features: Record<string, boolean>,
  actions?: Record<string, unknown>,
  appearance?: Record<string, unknown>,
  version: number
}
```

Minimum required fields:

```ts
id
kind
label
parentId
childIds
attributes
version
```

---

## 8. Academy Node

The academy node is the root of CBC content.

Example:

```ts
export const cbcAcademyNode = {
  id: 'cbc-academy',
  kind: 'academy',
  label: 'CBC Academy',
  summary: 'Kenya CBC curriculum learning content.',
  parentId: 'qubitel-academy',
  childIds: [
    'grade-1'
  ],
  attributes: {
    academyId: 'cbc-academy',
    curriculum: 'cbc',
    country: 'KE'
  },
  features: {
    notes: true,
    practice: true,
    revision: true,
    assessments: true,
    mobileFirst: true
  },
  version: 1
};
```

---

## 9. Grade Node

A grade node represents a CBC grade level.

Example:

```ts
export const gradeOneNode = {
  id: 'grade-1',
  kind: 'grade',
  label: 'Grade 1',
  summary: 'CBC Grade 1 learning content.',
  parentId: 'cbc-academy',
  childIds: [
    'grade-1-english-activities'
  ],
  attributes: {
    academyId: 'cbc-academy',
    curriculum: 'cbc',
    country: 'KE',
    gradeId: 'grade-1',
    gradeNumber: 1,
    level: 'lower-primary'
  },
  features: {
    notes: true,
    practice: true,
    revision: true,
    assessments: true,
    readAloud: true,
    mobileFirst: true
  },
  version: 1
};
```

---

## 10. Learning Area Node

A learning area node belongs under a grade.

For Grade 1, use the KICD learning area name.

Correct:

```text
English Activities
```

Avoid making `English` the canonical curriculum label.

Example:

```ts
export const gradeOneEnglishActivitiesNode = {
  id: 'grade-1-english-activities',
  kind: 'learning-area',
  label: 'English Activities',
  summary: 'Grade 1 English Activities learning content.',
  parentId: 'grade-1',
  childIds: [
    'grade-1-english-activities-theme-greetings'
  ],
  attributes: {
    academyId: 'cbc-academy',
    curriculum: 'cbc',
    country: 'KE',
    gradeId: 'grade-1',

    learningAreaId: 'english-activities',
    learningAreaName: 'English Activities',

    legacySubjectId: 'english',
    legacyTopicId: 'english',
    legacyPath: 'src/academies/cbc/grade-1/english'
  },
  features: {
    notes: true,
    practice: true,
    revision: true,
    assessments: true,
    readAloud: true,
    mobileFirst: true
  },
  appearance: {
    displayAlias: 'English'
  },
  version: 1
};
```

---

## 11. Theme Node

A theme node belongs under a learning area.

Grade 1 English Activities themes include:

1. Greetings
2. School
3. Family
4. Home
5. Time
6. Weather and our Environment
7. Hygiene
8. Parts of the Body
9. My Friends
10. Safety
11. Community Leaders
12. Living Together
13. Technology
14. Numbers
15. Conserving Resources

Example:

```ts
export const gradeOneEnglishActivitiesGreetingsThemeNode = {
  id: 'grade-1-english-activities-theme-greetings',
  kind: 'theme',
  label: 'Greetings',
  summary: 'Learners use greetings in everyday conversations.',
  parentId: 'grade-1-english-activities',
  childIds: [
    'grade-1-english-activities-greetings-listening-speaking'
  ],
  attributes: {
    academyId: 'cbc-academy',
    curriculum: 'cbc',
    country: 'KE',
    gradeId: 'grade-1',
    learningAreaId: 'english-activities',
    learningAreaName: 'English Activities',
    themeNumber: 1,
    themeName: 'Greetings',
    suggestedVocabulary: [
      'Good morning',
      'Good afternoon',
      'Hello',
      'Good evening',
      'Greet',
      'Fine',
      'How are you?'
    ]
  },
  features: {
    notes: true,
    practice: true,
    revision: true,
    assessments: true,
    readAloud: true,
    mobileFirst: true
  },
  version: 1
};
```

---

## 12. Strand Node

A strand node belongs under a theme when the curriculum presents strands through themes.

For Grade 1 English Activities, shared strands are:

1. Listening and Speaking
2. Reading
3. Language Use
4. Writing

Example:

```ts
export const gradeOneEnglishActivitiesGreetingsListeningSpeakingNode = {
  id: 'grade-1-english-activities-greetings-listening-speaking',
  kind: 'strand',
  label: 'Listening and Speaking',
  summary: 'Learners listen, speak, and use greetings correctly.',
  parentId: 'grade-1-english-activities-theme-greetings',
  childIds: [
    'grade-1-english-activities-greetings-pronunciation-vocabulary'
  ],
  attributes: {
    academyId: 'cbc-academy',
    curriculum: 'cbc',
    country: 'KE',
    gradeId: 'grade-1',
    learningAreaId: 'english-activities',
    learningAreaName: 'English Activities',
    themeId: 'grade-1-english-activities-theme-greetings',
    themeName: 'Greetings',
    strandNumber: '1.1',
    strandName: 'Listening and Speaking'
  },
  features: {
    notes: true,
    practice: true,
    revision: true,
    assessments: true,
    readAloud: true,
    mobileFirst: true
  },
  version: 1
};
```

---

## 13. Sub-strand Node

A sub-strand node belongs under a strand.

Example from Grade 1 English Activities, Theme 1: Greetings:

```text
Sub-strand: Pronunciation and Vocabulary
Lessons: 4
```

Example:

```ts
export const gradeOneEnglishActivitiesGreetingsPronunciationVocabularyNode = {
  id: 'grade-1-english-activities-greetings-pronunciation-vocabulary',
  kind: 'sub-strand',
  label: 'Pronunciation and Vocabulary',
  summary: 'Learners pronounce sounds and use greetings vocabulary.',
  parentId: 'grade-1-english-activities-greetings-listening-speaking',
  childIds: [
    'grade-1-english-activities-greetings-pronunciation-vocabulary-notes',
    'grade-1-english-activities-greetings-pronunciation-vocabulary-practice',
    'grade-1-english-activities-greetings-pronunciation-vocabulary-revision',
    'grade-1-english-activities-greetings-pronunciation-vocabulary-assessments'
  ],
  attributes: {
    academyId: 'cbc-academy',
    curriculum: 'cbc',
    country: 'KE',
    gradeId: 'grade-1',

    learningAreaId: 'english-activities',
    learningAreaName: 'English Activities',

    themeId: 'grade-1-english-activities-theme-greetings',
    themeName: 'Greetings',

    strandId: 'grade-1-english-activities-greetings-listening-speaking',
    strandNumber: '1.1',
    strandName: 'Listening and Speaking',

    subStrandNumber: '1.1.1',
    subStrandName: 'Pronunciation and Vocabulary',
    lessons: 4,

    suggestedVocabulary: [
      'Good morning',
      'Good afternoon',
      'Hello',
      'Good evening',
      'Greet',
      'Fine',
      'How are you?'
    ],

    learningOutcomes: [
      'Recognize the letters and their corresponding sounds for effective communication.',
      'Pronounce words with the target sounds accurately for effective communication.',
      'Use words related to greetings in everyday conversations.',
      'Realize the importance of greetings in diverse contexts.'
    ],

    keyInquiryQuestions: [
      'Why do we greet people?',
      'How do we greet people at different times of the day?'
    ]
  },
  features: {
    notes: true,
    practice: true,
    revision: true,
    assessments: true,
    readAloud: true,
    mobileFirst: true
  },
  version: 1
};
```

---

## 14. Content Nodes

Content nodes belong under the relevant sub-strand.

Allowed content node kinds:

```text
notes
practice
revision
assessment
exam
activity
```

Example notes node:

```ts
export const gradeOneEnglishActivitiesGreetingsNotesNode = {
  id: 'grade-1-english-activities-greetings-pronunciation-vocabulary-notes',
  kind: 'notes',
  label: 'Greetings Notes',
  summary: 'Learn common greetings and when to use them.',
  parentId: 'grade-1-english-activities-greetings-pronunciation-vocabulary',
  childIds: [],
  attributes: {
    academyId: 'cbc-academy',
    curriculum: 'cbc',
    country: 'KE',
    gradeId: 'grade-1',
    learningAreaId: 'english-activities',
    learningAreaName: 'English Activities',
    themeId: 'grade-1-english-activities-theme-greetings',
    strandId: 'grade-1-english-activities-greetings-listening-speaking',
    subStrandId: 'grade-1-english-activities-greetings-pronunciation-vocabulary',
    contentType: 'notes'
  },
  features: {
    readAloud: true,
    mobileFirst: true
  },
  version: 1
};
```

Example revision node:

```ts
export const gradeOneEnglishActivitiesGreetingsRevisionNode = {
  id: 'grade-1-english-activities-greetings-pronunciation-vocabulary-revision',
  kind: 'revision',
  label: 'Greetings Revision Questions',
  summary: 'Revise greetings, polite responses, and sounds a-h.',
  parentId: 'grade-1-english-activities-greetings-pronunciation-vocabulary',
  childIds: [],
  attributes: {
    academyId: 'cbc-academy',
    curriculum: 'cbc',
    country: 'KE',
    gradeId: 'grade-1',
    learningAreaId: 'english-activities',
    learningAreaName: 'English Activities',
    themeId: 'grade-1-english-activities-theme-greetings',
    strandId: 'grade-1-english-activities-greetings-listening-speaking',
    subStrandId: 'grade-1-english-activities-greetings-pronunciation-vocabulary',
    contentType: 'revision'
  },
  features: {
    readAloud: true,
    mobileFirst: true
  },
  version: 1
};
```

---

## 15. Assessment and Exam Compatibility

Current assessment files may still live under legacy paths such as:

```text
src/academies/cbc/grade-1/english/assessments/<learning-area-id>/
```

Do not rename or move existing assessment files unless a migration issue explicitly approves it.

For new LearningNode work, wrap legacy exams using canonical KICD metadata.

Example:

```ts
export const writingMissingLettersExamOneNode = {
  id: 'writing-missing-letters-exam-001',
  kind: 'exam',
  label: 'Exam 1: Missing Letters in 3-Letter Words',
  summary: 'Choose the missing letter to complete simple 3-letter words.',
  parentId: 'grade-1-english-activities-writing-readiness',
  childIds: [],
  attributes: {
    academyId: 'cbc-academy',
    curriculum: 'cbc',
    country: 'KE',

    gradeId: 'grade-1',
    learningAreaId: 'english-activities',
    learningAreaName: 'English Activities',

    legacySubjectId: 'english',
    legacyLearningAreaId: 'writing-readiness',
    legacyManifestId: 'writing-missing-letters-exam-001',
    legacyFile: 'assessments/writing-readiness/writing-missing-letters-exam-001.js',

    assessmentType: 'exam'
  },
  features: {
    readAloud: true,
    timed: true,
    mobileFirst: true
  },
  version: 1
};
```

---

## 16. File and Folder Naming Standard

### Canonical LearningNode files

Use KICD-aligned file and folder names for new LearningNode files.

Recommended:

```text
src/learning/academies/cbc/grades/gradeOne/
  gradeOneNode.ts
  gradeOneRegistry.ts
  englishActivities/
    englishActivitiesNode.ts
    englishActivitiesRegistry.ts
    themes/
      greetings/
        greetingsThemeNode.ts
        greetingsListeningSpeakingNode.ts
        greetingsPronunciationVocabularyNode.ts
        greetingsNotesNode.ts
        greetingsRevisionNode.ts
```

### Legacy content folders

Do not rename legacy folders automatically.

Current legacy folder may remain:

```text
src/academies/cbc/grade-1/english/
```

But new LearningNode metadata should identify the canonical learning area as:

```text
English Activities
```

---

## 17. Route Standard

Routes may use friendly aliases, but route metadata must still know the KICD structure.

Preferred canonical route:

```text
/academy/cbc-academy/grade-1/english-activities
/academy/cbc-academy/grade-1/english-activities/greetings
/academy/cbc-academy/grade-1/english-activities/greetings/listening-speaking
```

Backward-compatible legacy route may continue to work:

```text
/academy/cbc/grade-1/english
```

Do not remove existing routes during standardization unless explicitly approved.

---

## 18. Breadcrumb Standard

Breadcrumbs should use KICD-aligned labels.

Example:

```text
CBC Academy
  → Grade 1
    → English Activities
      → Greetings
        → Listening and Speaking
          → Pronunciation and Vocabulary
```

If UI space is limited, use approved display aliases only in UI, not in canonical metadata.

---

## 19. Metadata Naming Standard

Use these fields:

```ts
attributes: {
  academyId: 'cbc-academy',
  curriculum: 'cbc',
  country: 'KE',

  gradeId: 'grade-1',
  gradeNumber: 1,

  learningAreaId: 'english-activities',
  learningAreaName: 'English Activities',

  themeId: 'grade-1-english-activities-theme-greetings',
  themeNumber: 1,
  themeName: 'Greetings',

  strandId: 'grade-1-english-activities-greetings-listening-speaking',
  strandNumber: '1.1',
  strandName: 'Listening and Speaking',

  subStrandId: 'grade-1-english-activities-greetings-pronunciation-vocabulary',
  subStrandNumber: '1.1.1',
  subStrandName: 'Pronunciation and Vocabulary'
}
```

Avoid using these as canonical curriculum fields:

```ts
subjectId
subjectName
topicId
topicName
```

If they are still needed for compatibility, prefix them as legacy fields:

```ts
legacySubjectId
legacyTopicId
legacyLearningAreaId
legacyManifestId
legacyFile
legacyPath
```

---

## 20. Migration Rules

### Do

- Use KICD names in new LearningNode metadata.
- Keep current production files working.
- Add compatibility aliases where needed.
- Preserve existing stable IDs.
- Add new nodes incrementally.
- Validate parent/child references.
- Keep breadcrumbs and routes working.

### Do not

- Rename `english` folders to `english-activities` without approval.
- Rename exam IDs without approval.
- Rename manifest IDs without approval.
- Rename generated question prefixes without approval.
- Replace working content with incomplete LearningNode wrappers.
- Use `subject` as a canonical CBC curriculum term.
- Mix unrelated grade work into a standardization PR.

---

## 21. Standardization Checklist for Existing Work

Use this checklist for each current Grade 1 English item.

```text
[ ] Identify current legacy file/path.
[ ] Identify current manifest ID.
[ ] Identify current learner-facing label.
[ ] Map it to the correct KICD Learning Area.
[ ] Map it to the correct Theme where applicable.
[ ] Map it to the correct Strand where applicable.
[ ] Map it to the correct Sub-strand where applicable.
[ ] Create or update the LearningNode wrapper.
[ ] Preserve legacy IDs and file paths.
[ ] Add legacy aliases in attributes.
[ ] Update registry exports.
[ ] Confirm parent/child references.
[ ] Confirm breadcrumbs.
[ ] Confirm routes.
[ ] Confirm old UI still works.
[ ] Confirm new LearningNode navigation works.
```

---

## 22. Suggested First Standardization Scope

Start with Grade 1 English Activities because current work is already active there.

Suggested first scope:

```text
Academy: CBC Academy
Grade: Grade 1
Learning Area: English Activities
Theme: Greetings
Strand: Listening and Speaking
Sub-strand: Pronunciation and Vocabulary
Content:
  - notes
  - practice
  - revision questions
```

Do not standardize all grades in one PR.

---

## 23. GitHub Issue Template

```md
## Title

Standardize CBC Grade 1 English Activities using KICD LearningNode hierarchy

## Background

Current CBC Grade 1 English work needs to align with the LearningNode architecture and KICD naming.

The required hierarchy is:

```text
Academy → Grade → Learning Area → Theme → Strand → Sub-strand → Content
```

For Grade 1, the KICD learning area name is `English Activities`, not simply `English`.

## Scope

Standardize the current Grade 1 English work so that it maps to:

- Academy: CBC Academy
- Grade: Grade 1
- Learning Area: English Activities
- Theme: Greetings
- Strand: Listening and Speaking
- Sub-strand: Pronunciation and Vocabulary

## Requirements

- Use `learning-area` as the canonical node kind, not `subject`.
- Use `learningAreaId` and `learningAreaName` in canonical metadata.
- Use `English Activities` as the canonical curriculum label.
- Preserve existing legacy paths such as `src/academies/cbc/grade-1/english/`.
- Preserve existing manifest IDs and exam IDs.
- Add legacy aliases only where needed, such as `legacySubjectId: 'english'`.
- Do not rename production files.
- Do not move current assessment files.
- Do not change unrelated grades or learning areas.
- Keep parent/child references valid.

## Acceptance Criteria

- CBC academy has a Grade 1 child node.
- Grade 1 has an English Activities learning-area child node.
- English Activities has a Greetings theme node.
- Greetings has a Listening and Speaking strand node.
- Listening and Speaking has a Pronunciation and Vocabulary sub-strand node.
- Nodes use KICD-aligned metadata.
- Legacy `english` path remains supported.
- No canonical node uses `kind: 'subject'`.
- Routes and breadcrumbs use KICD labels.
- Existing Grade 1 English content remains visible.
- No existing exam IDs are renamed.

## Validation

- [ ] Node IDs are unique.
- [ ] Parent/child links are valid.
- [ ] Registry exports are updated.
- [ ] Breadcrumbs are correct.
- [ ] Routes are correct or backward compatible.
- [ ] Existing content remains accessible.
- [ ] No unrelated content changed.
```

---

## 24. Cline Prompt Template

```md
No terminal commands.

Use workspace file reading/search only.

Apply always-on rules first.

Task:
Standardize current CBC Grade 1 English work using the KICD LearningNode hierarchy.

Required hierarchy:
Academy → Grade → Learning Area → Theme → Strand → Sub-strand → Content

Important naming rule:
Use KICD curriculum naming. Use `Learning Area`, not `Subject`.

For Grade 1 English, the canonical learning area is:
English Activities

Do not use `kind: 'subject'` for canonical CBC curriculum nodes.

Use:
- `kind: 'learning-area'`
- `learningAreaId`
- `learningAreaName`

Legacy compatibility is allowed:
- `legacySubjectId`
- `legacyTopicId`
- `legacyPath`

Before editing, inspect:
- current LearningNode files
- current CBC academy registry
- current Grade 1 registry
- current Grade 1 English files
- current manifests under `src/academies/cbc/grade-1/english/`
- existing tests for routes, breadcrumbs, graph validation, and registries

Requirements:
- Preserve existing production files.
- Preserve existing exam IDs.
- Preserve existing manifest IDs.
- Do not move assessment files.
- Do not rename current folders unless explicitly approved.
- Add KICD-aligned LearningNode wrappers/metadata.
- Keep parent/child references valid.
- Keep old routes/content working.
- Do not edit unrelated grades or learning areas.

Before editing, report:
- Files/areas inspected
- Current state
- Proposed changes
- Files to change
- Risks / assumptions

Wait for approval before writing files.
```

---

## 25. Definition of Done

This standardization is complete when:

- current CBC content maps to the hierarchy:
  `Academy → Grade → Learning Area → Theme → Strand → Sub-strand → Content`
- canonical CBC curriculum nodes use `learning-area`, not `subject`
- Grade 1 English is represented as `English Activities`
- legacy `english` paths remain supported
- all parent/child references are valid
- routes and breadcrumbs use KICD labels
- existing production content remains visible
- no unrelated content is changed
