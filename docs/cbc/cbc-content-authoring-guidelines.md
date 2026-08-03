# CBC Content Authoring Guidelines

## Purpose

This document defines how CBC curriculum source material should be converted into Qubitel Academy learning nodes and learner-facing content.

The goal is to keep CBC content structured, scalable, accessible, and easy to extend without repeatedly touching top-level registry files.

---

## 1. Curriculum Source Structure

CBC curriculum source material may include:

* Theme
* Suggested vocabulary
* Strand
* Sub-strand
* Specific learning outcomes
* Suggested learning experiences
* Key inquiry questions
* Core competencies
* Values
* Pertinent and contemporary issues
* Links to other learning areas
* Suggested learning resources

When converting curriculum material into the app, preserve the curriculum meaning, sequence, and learner intent.

---

## 2. App Content Structure

CBC content should follow this structure:

```txt
Grade
└── Learning Area
    └── Theme
        └── Strand
            └── Sub-strand
                └── Content Unit / Book Page
                    ├── Notes
                    ├── Practice
                    ├── Revision
                    └── Assessment
```

This means:

* A grade contains learning areas.
* A learning area contains themes.
* A theme contains strands.
* A strand contains sub-strands.
* A sub-strand contains content units or book pages.
* A content unit contains learner-facing notes, practice, revision, and assessment.

---

## 3. Registry Ownership Rules

`cbcGrades.registry.ts` must never be edited when adding CBC curriculum content.

It is a top-level CBC registry aggregator only. It should not directly know about specific learning areas, themes, strands, sub-strands, lessons, practice items, or assessments.

Content must be added lower in the tree and aggregated upward.

Example:

```txt
Grade 1 English Greetings content
→ src/learning/academies/cbc/grades/grade1/english-activities/...
→ aggregated by grade1.registry.ts
→ not added directly to cbcGrades.registry.ts
```

### Ownership model

```txt
cbcGrades.registry.ts
└── grade-level aggregation only

grade1.registry.ts
└── Grade 1 learning areas and Grade 1 content aggregates

grade1/english-activities/
└── English Activities themes, strands, sub-strands, and content
```

Content should never be imported directly into `cbcGrades.registry.ts`.

---

## 4. Curriculum-to-App Mapping

| Curriculum section             | App usage                                                      |
| ------------------------------ | -------------------------------------------------------------- |
| Theme                          | Theme node / content group                                     |
| Suggested vocabulary           | Vocabulary block, practice prompts, read-aloud/signing support |
| Strand                         | Strand node                                                    |
| Sub-strand                     | Sub-strand node                                                |
| Specific learning outcomes     | Lesson goals and assessment criteria                           |
| Suggested learning experiences | Notes, guided activities, practice tasks                       |
| Key inquiry questions          | Warm-up/reflection questions                                   |
| Core competencies              | Metadata and teacher/parent view                               |
| Values / PCIs                  | Metadata and reflection prompts                                |
| Links to other learning areas  | Cross-learning metadata                                        |
| Suggested learning resources   | Teacher/parent support notes                                   |

---

## 5. Learning Node Roles

Every CBC node must have a clear role.

| Node type                | Purpose                                 |
| ------------------------ | --------------------------------------- |
| Grade                    | CBC grade level                         |
| Learning area            | Subject/learning area under a grade     |
| Theme                    | Curriculum theme under a learning area  |
| Strand                   | Curriculum strand under a theme         |
| Sub-strand               | Curriculum sub-strand under a strand    |
| Content unit / book page | Learner-facing unit under a sub-strand  |
| Notes                    | Concept explanation and guided learning |
| Practice                 | Learner attempts and activities         |
| Revision                 | Recap and reinforcement                 |
| Assessment               | Outcome-based checking                  |

---

## 6. Grade and Learning Area Code Standards

The code standard applies strictly to:

* grade codes
* learning area codes

It does not define codes for themes, strands, sub-strands, notes, practice, revision, assessment, or other content below the learning area level.

### 6.1 Coding Principle

Codes shorten the **values**, not the **keys**.

Correct:

```ts
{ key: 'gradeCode', value: 'GD1' }
{ key: 'learningAreaCode', value: 'ENG' }
```

Wrong:

```ts
{ key: 'gc', value: 'GD1' }
{ key: 'la', value: 'ENG' }
```

Attribute keys must remain descriptive and readable.

### 6.2 Grade Codes

Grade codes must be exactly **3 characters**.

| Grade   | Code  |
| ------- | ----- |
| PP1     | `PP1` |
| PP2     | `PP2` |
| Grade 1 | `GD1` |
| Grade 2 | `GD2` |
| Grade 3 | `GD3` |
| Grade 4 | `GD4` |
| Grade 5 | `GD5` |
| Grade 6 | `GD6` |
| Grade 7 | `GD7` |
| Grade 8 | `GD8` |

Node IDs and route segments should use lowercase versions:

```txt
pp1
pp2
gd1
gd2
gd3
gd4
gd5
gd6
gd7
gd8
```

Metadata example:

```ts
attributes: [
  { key: 'gradeCode', value: 'GD1' },
  { key: 'gradeName', value: 'Grade 1' }
]
```

### 6.3 Learning Area Codes

Learning area codes must be exactly **3 characters**.

| Learning Area                    | Code  |
| -------------------------------- | ----- |
| English Activities               | `ENG` |
| Kiswahili Activities             | `KIS` |
| Mathematical Activities          | `MAT` |
| Environmental Activities         | `ENV` |
| Hygiene and Nutrition Activities | `HGN` |
| Movement and Creative Activities | `MCA` |
| Religious Education Activities   | `REL` |
| Creative Arts and Sports         | `CAS` |
| Integrated Science               | `SCI` |
| Agriculture and Nutrition        | `AGR` |
| Social Studies                   | `SOC` |
| Pre-Technical Studies            | `PTS` |
| Business Studies                 | `BUS` |

Learning area node IDs should combine the lowercase grade code and lowercase learning area code.

Examples:

```txt
gd1-eng
gd1-kis
gd1-mat
gd1-env
gd1-hgn
gd1-mca
gd1-rel
gd7-cas
gd7-sci
gd7-agr
gd7-soc
```

Metadata example:

```ts
attributes: [
  { key: 'gradeCode', value: 'GD1' },
  { key: 'gradeName', value: 'Grade 1' },
  { key: 'learningAreaCode', value: 'ENG' },
  { key: 'learningAreaName', value: 'English Activities' }
]
```

### 6.4 Case Standard

Use uppercase codes in metadata:

```txt
GD1
ENG
```

Use lowercase codes in node IDs and route segments:

```txt
gd1
eng
gd1-eng
```

Example route:

```txt
/gd1/eng
```

Learner-facing breadcrumb:

```txt
Grade 1 → English Activities
```

The UI must display learner-friendly labels, not raw codes.

### 6.5 Stability Rules

Grade and learning area codes are permanent after publishing.

Do not change:

* grade codes
* learning area codes
* published grade node IDs
* published learning area node IDs
* published grade route segments
* published learning area route segments

unless there is a migration plan.

Labels may change without changing codes.

Example:

```txt
ENG
```

may remain stable even if the label changes from:

```txt
English Activities
```

to:

```txt
English Language Activities
```

### 6.6 Scope Boundary

This code standard does not define codes for:

* themes
* strands
* sub-strands
* content units
* notes
* practice
* revision
* assessment
* vocabulary sets
* activities
* resources

Those content levels should keep readable, meaningful identifiers unless a separate content-level coding standard is approved later.

---

## 7. File Organization Standard

CBC content should be organized by grade, learning area, theme, strand, and sub-strand.

Recommended structure:

```txt
src/learning/academies/cbc/grades/
├── grade1.registry.ts
├── grade1/
│   ├── englishActivities.registry.ts
│   └── english-activities/
│       ├── themes/
│       │   └── greetings.registry.ts
│       └── strands/
│           ├── listening-speaking.registry.ts
│           ├── sign-reading.registry.ts
│           ├── language-use.registry.ts
│           └── writing.registry.ts
├── grade2.registry.ts
├── grade3.registry.ts
└── ...
```

### Aggregation rule

Content should aggregate upward:

```txt
content registry
→ strand/sub-strand registry
→ learning-area registry
→ grade registry
→ CBC top registry
```

Do not import learning-area-specific content directly into `cbcGrades.registry.ts`.

---

## 8. Registry Aggregation Rules

### Top CBC registry

`src/learning/academies/cbc/cbcGrades.registry.ts` should only aggregate generic grade-level arrays.

Allowed:

```ts
...grade1Nodes
...grade2Nodes
...grade3Nodes
```

Not allowed:

```ts
...grade1EnglishActivitiesNodes
...grade1EnglishGreetingsNodes
...grade1EnglishListeningSpeakingNodes
```

### Grade registry

A grade registry may aggregate learning areas and grade-specific content trees.

Example:

```ts
export const grade1Nodes: LearningNode[] = [
  ...grade1LearningAreaNodes,
  ...grade1EnglishActivitiesNodes,
  ...grade1MathematicalActivitiesNodes
];
```

### Learning area registry

A learning area registry may aggregate themes, strands, sub-strands, and content units belonging to that learning area.

Example:

```ts
export const grade1EnglishActivitiesNodes: LearningNode[] = [
  ...grade1EnglishGreetingsNodes,
  ...grade1EnglishListeningSpeakingNodes,
  ...grade1EnglishSignReadingNodes,
  ...grade1EnglishLanguageUseNodes,
  ...grade1EnglishWritingNodes
];
```

---

## 9. Notes, Practice, Revision, and Assessment Rules

Every content unit should ideally provide:

```txt
Notes
Practice
Revision
Assessment
```

### Notes

Notes should explain the concept in simple learner-friendly language.

They may include:

* vocabulary
* examples
* guided explanations
* visual prompts
* sign/read-aloud guidance
* teacher or parent support notes

### Practice

Practice should help learners try the skill.

It may include:

* matching activities
* oral/signing practice
* drag/tap/select activities
* short guided tasks
* peer or group activities adapted for app use

### Revision

Revision should reinforce the concept.

It may include:

* short summaries
* recap questions
* mixed practice
* correction prompts
* learner reflection

### Assessment

Assessment should check whether the learner achieved the learning outcomes.

It should align to:

* specific learning outcomes
* vocabulary
* strand/sub-strand skills
* expected learner performance

---

## 10. Accessibility and Inclusive Learning Rules

CBC content must support inclusive learning where applicable.

When the source includes Deaf and Hard of Hearing guidance, preserve it in the app content.

Content should support:

* Hard of Hearing learner instructions
* Deaf learner instructions
* sign vocabulary
* fingerspelling
* captioned/signed video references
* visual prompts
* read-aloud where appropriate
* sign-aloud or signing support where appropriate
* visual demonstrations
* picture/photo-based activities
* gesture and facial-expression guidance

Do not remove Deaf or Hard of Hearing learning guidance when converting content.

---

## 11. Metadata Rules

Preserve curriculum metadata where available.

Use metadata for:

* specific learning outcomes
* key inquiry questions
* core competencies
* values
* pertinent and contemporary issues
* links to other learning areas
* suggested learning resources
* lesson count
* accessibility notes
* Deaf or Hard of Hearing learner notes

Metadata should support future teacher, parent, analytics, and adaptive-learning views.

---

## 12. Example: Grade 1 English Activities - Greetings

### Curriculum source

```txt
Theme 1.0: Greetings

Suggested vocabulary:
Good morning, good afternoon, hello, good evening, greet, fine, how are you?

Strand 1.1:
Observing and articulating signs / Listening and speaking

Sub-strand 1.1.1:
Proper articulation of signs with correct mouth movement and signing vocabulary /
Pronunciation and vocabulary
```

### App hierarchy

```txt
Grade 1
└── English Activities
    └── Theme: Greetings
        └── Strand: Listening and Speaking
            └── Sub-strand: Pronunciation and Vocabulary
                ├── Notes
                ├── Practice
                ├── Revision
                └── Assessment
```

### Example ownership

```txt
grade1.registry.ts
└── aggregates Grade 1 learning areas and Grade 1 content trees

grade1/englishActivities.registry.ts
└── aggregates English Activities themes, strands, and content trees

grade1/english-activities/themes/greetings.registry.ts
└── owns Greetings theme content

grade1/english-activities/strands/listening-speaking.registry.ts
└── owns Listening and Speaking strand content
```

---

## 13. Content Authoring Checklist

Before adding or reviewing CBC content, confirm:

* [ ] I did not edit `src/learning/academies/cbc/cbcGrades.registry.ts`.
* [ ] I added content under the correct grade.
* [ ] I added content under the correct learning area.
* [ ] I preserved the theme, strand, and sub-strand structure.
* [ ] I added specific learning outcomes where available.
* [ ] I added suggested learning experiences where available.
* [ ] I added key inquiry questions where available.
* [ ] I added core competencies where available.
* [ ] I added values and PCIs where available.
* [ ] I added links to other learning areas where available.
* [ ] I added suggested resources where available.
* [ ] I used stable IDs and route segments.
* [ ] I preserved Deaf and Hard of Hearing learner guidance where applicable.
* [ ] I did not add learning-area-specific imports directly to `cbcGrades.registry.ts`.
* [ ] I aggregated content upward through the correct registry layer.

---

## 14. Non-Negotiable Rules

1. Do not edit `cbcGrades.registry.ts` when adding curriculum content.
2. Do not place specific learning-area content directly in the top CBC registry.
3. Do not change existing node IDs without a migration plan.
4. Do not change existing route segments without a migration plan.
5. Do not remove accessibility guidance from curriculum sources.
6. Do not flatten curriculum structure into random lessons.
7. Preserve grade, learning area, theme, strand, sub-strand, and content relationships.
8. Add learner-facing content through the correct grade and learning-area registry path.




## Theme Book View Standard

A CBC theme should be displayed as a learner-facing book unit.

The learner-facing structure is:

```txt
Grade
└── Learning Area
    └── Theme
        ├── Notes
        ├── Practice
        ├── Revision
        └── Assessment
```

Example:

```txt
Grade 1
└── English Activities
    └── Greetings
        ├── Notes
        │   ├── Page 1: Overview
        │   ├── Page 2: Vocabulary
        │   ├── Page 3: Listening and Speaking
        │   ├── Page 4: Sign Reading
        │   ├── Page 5: Language Use
        │   ├── Page 6: Writing
        │   └── Page 7: Recap
        ├── Practice
        ├── Revision
        └── Assessment
```

## Theme Navigation Rule

Themes are learner-facing content units.

A learner should open:

```txt
Grade 1 → English Activities → Greetings → Notes
```

The learner should not be forced to navigate through:

```txt
Greetings → Strand → Sub-strand → Notes
```

Strands and sub-strands are curriculum structure inside the theme content. They may appear as headings, sections, pages, metadata, or grouping labels inside Notes, Practice, Revision, and Assessment.

## Example Node Structure

```txt
gd1
└── gd1-eng
    └── gd1-eng-greetings
        ├── gd1-eng-greetings-notes
        ├── gd1-eng-greetings-practice
        ├── gd1-eng-greetings-revision
        └── gd1-eng-greetings-assessment
```

Only these values use formal short codes:

```txt
GD1 = Grade 1
ENG = English Activities
```

The theme remains readable:

```txt
greetings
```

## Notes Book Page Rule

Large notes should be split into internal book pages.

The Notes node remains one learner-facing node:

```txt
gd1-eng-greetings-notes
```

Its book content may contain many internal pages:

```txt
overview
vocabulary
listening-speaking
sign-reading
language-use
writing
recap
```

These internal pages are not separate learning nodes unless there is a strong product reason to make them separately trackable.

## Practice, Revision, and Assessment Rule

Practice, Revision, and Assessment may also use internal pages or sections when content is large.

Example:

```txt
Greetings
├── Practice
│   ├── Vocabulary practice
│   ├── Signing practice
│   ├── Reading practice
│   └── Writing readiness practice
├── Revision
│   ├── Vocabulary recap
│   ├── Greeting situations
│   └── Quick check
└── Assessment
    ├── Vocabulary questions
    ├── Sign recognition
    ├── Language use
    └── Writing readiness
```

The learner-facing navigation still remains:

```txt
Greetings → Practice
Greetings → Revision
Greetings → Assessment
```

## Storage Rule

The theme owns the four main learner-facing content nodes:

```txt
Theme
├── Notes
├── Practice
├── Revision
└── Assessment
```

Detailed curriculum structure such as strands, sub-strands, outcomes, learning experiences, inquiry questions, competencies, values, PCIs, links, resources, Deaf guidance, and Hard of Hearing guidance should be stored inside the content payload or metadata of those nodes.

## Example: Greetings Notes Pages

For `gd1-eng-greetings-notes`, the book pages should be:

```txt
Page 1: Overview
Page 2: Vocabulary
Page 3: Listening and Speaking
Page 4: Sign Reading
Page 5: Language Use
Page 6: Writing
Page 7: Recap
```

This keeps the learner experience simple while preserving the full curriculum structure.
