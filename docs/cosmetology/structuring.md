# Cosmetology Course Content Structure

> **Authoring guide for the Complete Cosmetology Science & Professional Practice course**

This document defines how the cosmetology learning materials in this repository are organised, written, reviewed, and expanded.

The goal is to build a **single-stop, textbook-quality cosmetology resource** that can support students, teachers, trainers, and independent learners from foundational science through professional practice.

The course is designed to:

- cover the major competency areas in the Kenyan TVET-CDACC Cosmetology pathway;
- incorporate globally recognised cosmetology and beauty-therapy subject areas;
- explain the **science behind practice**, not only procedures;
- support both classroom teaching and self-study;
- remain modular enough to publish as web content, course notes, or a future book.

The master curriculum specification is maintained in [curriculum specification](./curriculum_specification.md).

---

## 1. Course Design Philosophy

The course follows a **science-first, practice-connected** approach.

Instead of teaching only:

> “Use this product for this service.”

the material should help the learner reason through:

- What is the structure and condition of the hair, skin, or nail?
- What anatomy and physiology are involved?
- What chemistry or physics explains the service?
- What products and ingredients are being used?
- What risks and contraindications exist?
- Is the service within a cosmetologist's professional scope?
- What result should be expected?
- What aftercare is appropriate?
- When should the client be referred to a healthcare professional?

A learner should understand **why a procedure works**, not simply memorise the steps.

---

## 2. Curriculum Framework

The learning material is organised into five major parts.

| Part | Area | Modules |
|---|---|---:|
| I | Scientific & Professional Foundations | 1–6 |
| II | Hair Science & Hairdressing | 7–13 |
| III | Skin & Aesthetic Sciences | 14–17 |
| IV | Nail & Body Sciences | 18–19 |
| V | Professional, Business & Research Studies | 20–22 |

The course combines three layers:

1. **Occupational competence** — services and skills expected in professional cosmetology.
2. **Scientific foundation** — anatomy, physiology, trichology, cutaneous biology, onychology, microbiology, chemistry, physics, toxicology, and related sciences.
3. **Professional judgement** — consultation, safety, contraindications, referral, ethics, business, research, and evidence-based practice.

---

## 3. Repository Structure

```text
docs/cosmetology/
│
├── curriculum_specification.md
├── structuring.md
│
├── student-notes/
│   ├── 01-foundations/
│   │   ├── 01-cosmetology-foundations.md
│   │   ├── 02-anatomy-physiology.md
│   │   ├── 03-microbiology-safety.md
│   │   ├── 04-cosmetic-chemistry.md
│   │   ├── 05-electricity-equipment.md
│   │   └── 06-client-consultation.md
│   │
│   ├── 02-hair-science/
│   │   ├── 07-trichology.md
│   │   ├── 08-hair-care-styling-science.md
│   │   ├── 09-braiding-dreadlocking-textured-hair.md
│   │   ├── 10-barbering-haircutting.md
│   │   ├── 11-hair-additions-extensions.md
│   │   ├── 12-chemical-reformation.md
│   │   └── 13-hair-colour-science.md
│   │
│   ├── 03-skin-aesthetics/
│   │   ├── 14-cutaneous-biology.md
│   │   ├── 15-facial-skin-care.md
│   │   ├── 16-hair-removal.md
│   │   └── 17-makeup-colour-science.md
│   │
│   ├── 04-nails-body/
│   │   ├── 18-onychology-nail-technology.md
│   │   └── 19-body-massage-kinesiology.md
│   │
│   └── 05-professional-studies/
│       ├── 20-salon-management.md
│       ├── 21-research-evidence.md
│       └── 22-industry-training.md
│
├── assessments/
│   ├── module-quizzes/
│   ├── assignments/
│   ├── case-studies/
│   └── mock-exams/
│
├── teacher-guide/
│   ├── lesson-plans/
│   ├── answer-keys/
│   ├── marking-schemes/
│   ├── teaching-methodology.md
│   └── assessment-guide.md
│
└── reference/
    ├── glossary.md
    ├── cosmetic-ingredients.md
    ├── hair-scalp-conditions.md
    ├── skin-conditions.md
    ├── nail-conditions.md
    ├── ph-reference.md
    ├── colour-theory.md
    ├── client-forms.md
    └── tvet-cross-reference.md
```

---

## 4. Folder Responsibilities

### `student-notes/`

This is the canonical home for the **student textbook/course notes**.

It contains the full learning material for Modules 1–22 and is organised into the five curriculum parts:

- `01-foundations/`;
- `02-hair-science/`;
- `03-skin-aesthetics/`;
- `04-nails-body/`;
- `05-professional-studies/`.

Student chapters should be self-contained and learner-facing. They may include explanations, diagrams, worked examples, science boxes, salon applications, red flags, learner case studies, summaries, revision questions, and practical connections.

They should not contain teacher-only answer keys, expected responses, marking criteria, lesson timing, or assessor instructions.

### 4.1 Audience and Content Separation

| Area | Audience | Content |
|---|---|---|
| `student-notes/` | Students | Main textbook/course notes |
| `assessments/` | Students + teachers | Learner-facing tests, assignments, case studies, and mock exams |
| `teacher-guide/` | Teachers/trainers | Lesson support, answers, marking schemes, rubrics, facilitation guidance |
| `reference/` | Students + teachers | Shared lookup and reference material |
| `curriculum_specification.md` | Authors/teachers/curriculum designers | What the course must cover |
| `structuring.md` | Authors/contributors | How the course material must be organised and written |

The same subject should not be duplicated unnecessarily across student and teacher materials. Student notes explain the subject; teacher resources explain **how to teach, assess, and mark it**.


### `student-notes/01-foundations/`

Scientific and professional knowledge required before specialised services are studied.

Includes:

- cosmetology foundations;
- anatomy and physiology;
- histology and cell biology;
- microbiology and infection control;
- occupational safety;
- cosmetic chemistry;
- physical science and equipment;
- consultation and referral.

### `student-notes/02-hair-science/`

Hair and scalp science and all major hair-service theory.

Includes:

- trichology;
- hair fibre science;
- shampooing and conditioning;
- styling;
- textured hair;
- braiding and dreadlocking;
- barbering;
- haircutting;
- additions and extensions;
- chemical reformation;
- hair colour science.

### `student-notes/03-skin-aesthetics/`

Skin science and aesthetic services.

Includes:

- cutaneous biology;
- facial skin care;
- cosmetic ingredients;
- hair removal;
- makeup;
- colour science;
- facial morphology.

### `student-notes/04-nails-body/`

Nail science, nail services, body anatomy, movement, and massage.

Includes:

- onychology;
- manicure and pedicure;
- nail enhancements;
- nail chemistry;
- myology;
- kinesiology;
- body massage.

### `student-notes/05-professional-studies/`

Business, research, and workplace preparation.

Includes:

- salon management;
- entrepreneurship;
- digital literacy;
- evidence-based cosmetology;
- research methods;
- portfolio development;
- industry training.

### `assessments/`

Assessment material should be separated from the main teaching notes where practical.

Use this area for:

- quizzes;
- assignments;
- case studies;
- practical observation tasks;
- mock exams.

### `teacher-guide/`

Teacher-only or educator-focused resources.

Student-facing assessments should not contain their model answers or marking logic. Keep those separately in teacher-only areas such as:

- `teacher-guide/answer-keys/`;
- `teacher-guide/marking-schemes/`;
- `teacher-guide/lesson-plans/`.

Use this area for:

- lesson plans;
- teaching methodology;
- answer guides;
- assessment criteria;
- marking rubrics;
- classroom activities.

### `reference/`

Reusable reference material that supports multiple modules.

Examples:

- glossary;
- ingredient reference;
- skin, hair, and nail condition references;
- pH charts;
- colour theory;
- consultation forms;
- TVET competency mapping.

---

## 5. File Naming Rules

Use:

- lowercase filenames;
- hyphen-separated words;
- two-digit module numbers;
- descriptive names;
- `.md` for learning content.

Example:

```text
07-trichology.md
12-chemical-reformation.md
17-makeup-colour-science.md
```

Avoid vague names such as:

```text
notes.md
lesson1.md
topic.md
chapter-final-final.md
```

---

## 6. Standard Chapter Template

Every major chapter should follow a consistent structure.

Not every heading must contain the same amount of content, but the sequence should remain recognisable across the course.

```markdown
# Module X — Chapter Title

## Why This Matters

## Learning Outcomes

## TVET-CDACC Alignment

## Scientific Disciplines

## Key Terminology

## 1. Scientific Foundation

## 2. Anatomy / Structure

## 3. Physiology / Function

## 4. Chemistry / Physics
<!-- Where applicable -->

## 5. Conditions / Abnormalities

## 6. Professional Application

## 7. Products and Ingredients

## 8. Tools and Equipment

## 9. Safety and Contraindications

## 10. Inclusive Cosmetology

## Client Case Study

## Practical Connection

## Chapter Summary

## Key Terms Review

## Knowledge Check

## Short-Answer Questions

## Applied / Case Questions

## Teacher Notes
<!-- Teacher Notes placeholder: in the published student-notes version, teacher-only guidance should live in teacher-guide/. This heading may link to the corresponding teacher resource during authoring rather than expose teacher-only answers or marking guidance. -->

## Further Reading
```

---

## 6.1 Student Chapter vs Teacher Guide

The standard chapter template above describes the **student learning chapter**.

The student chapter should contain the teaching content itself.

A corresponding teacher guide may contain:

- recommended teaching time;
- prior knowledge;
- suggested lesson sequence;
- demonstrations;
- discussion prompts;
- common misconceptions;
- model answers;
- marking guidance;
- extension activities;
- classroom-management or facilitation notes.

Example pairing:

```text
student-notes/02-hair-science/07-trichology.md
teacher-guide/lesson-plans/07-trichology.md
teacher-guide/answer-keys/07-trichology-quiz-answers.md
```

This allows the student material to remain useful as a standalone textbook while giving educators a richer companion resource.

---

## 7. Required Chapter Opening

Each chapter should begin by answering four questions.

### Why does this subject matter?

Explain its importance to a practising cosmetologist.

### What will the learner know or be able to do?

Use measurable learning outcomes.

Prefer verbs such as:

- define;
- describe;
- explain;
- distinguish;
- analyse;
- compare;
- identify;
- apply;
- evaluate.

### Which professional competencies does it support?

Where relevant, identify the related TVET-CDACC cosmetology competency areas.

### Which sciences underpin it?

For example:

| Professional area | Scientific foundation |
|---|---|
| Hair and scalp | Trichology |
| Skin | Cutaneous Biology |
| Nails | Onychology |
| Products | Cosmetic Chemistry |
| Infection prevention | Microbiology |
| Body structure | Anatomy |
| Body function | Physiology |
| Muscles | Myology |
| Movement | Kinesiology |
| Hair colour | Colorimetry / Colour Science |
| Product safety | Toxicology |

---

## 8. Content Depth Standard

This is intended to become a **complete learning resource**, not a collection of bullet-point summaries.

A heading such as:

> Hair follicle

is not sufficient on its own.

A completed topic should explain:

- what the structure is;
- where it is located;
- how it develops or functions;
- why it matters;
- its relationship to salon services;
- common misconceptions;
- relevant safety implications;
- important terminology.

Where useful, include:

- diagrams;
- tables;
- process flows;
- comparisons;
- worked examples;
- ingredient examples;
- formulas;
- client scenarios.

---

## 9. Science-First Writing Rule

Whenever a professional procedure involves a biological, chemical, or physical mechanism, explain the mechanism before or alongside the procedure.

Examples:

### Chemical reformation

Explain:

- keratin;
- cysteine;
- disulfide bonds;
- reduction;
- oxidation;
- pH;
- neutralisation;

before expecting the learner to understand relaxing or permanent waving.

### Hair colouring

Explain:

- melanin;
- eumelanin;
- pheomelanin;
- oxidation;
- developers;
- alkalising agents;
- colour theory;

before advanced colour correction.

### Facial skin care

Explain:

- epidermis;
- dermis;
- skin barrier;
- sebaceous glands;
- melanocytes;
- transepidermal water loss;

before treatment selection.

---

## 10. Recurring Teaching Boxes

Use recurring callouts to make chapters easier to teach and revise.

### SCIENCE BOX

Explains the biological, chemical, or physical mechanism behind a concept.

### WHY?

Answers a common learner question.

Examples:

- Why does bleach weaken hair?
- Why does humidity affect styling?
- Why can excessive braid tension damage hair?

### SALON APPLICATION

Connects theory to professional practice.

### RED FLAG

Highlights contraindications, hazards, or situations requiring referral.

### INGREDIENT LAB

Explains cosmetic ingredients and product labels.

### TEXTURED HAIR NOTE

Highlights considerations relevant to curly, coily, and highly textured hair.

### MELANIN-RICH SKIN NOTE

Highlights relevant considerations for darker skin tones without treating lighter skin as the default.

### CLIENT CASE

Presents a realistic client scenario for analysis.

### EXAM CHECK

Tests factual understanding.

### THINK LIKE A PROFESSIONAL

Requires judgement, reasoning, or decision-making.

### TEACHER NOTE

Provides teaching suggestions, misconceptions, or classroom guidance.

---

## 11. Inclusive Cosmetology Standard

The course should reflect the diversity of real clients.

Content should account for:

- straight, wavy, curly, and coily hair;
- fine through coarse hair fibres;
- different skin tones;
- melanin-rich skin;
- different ages;
- different cultural grooming practices;
- natural and chemically processed hair;
- accessibility and disability considerations;
- different client goals and budgets.

African hair, textured hair, and darker skin tones should be integrated throughout the course rather than isolated into a single optional chapter.

---

## 12. Safety and Scope of Practice

Safety must be integrated into every relevant chapter.

Each service-based chapter should explain:

- consultation;
- contraindications;
- infection prevention;
- product hazards;
- PPE where applicable;
- patch or strand testing where applicable;
- manufacturer instructions;
- aftercare;
- red flags;
- when to stop a service;
- when referral may be appropriate.

### Recognition vs diagnosis

Cosmetology learners may study the appearance and terminology associated with common hair, scalp, skin, and nail disorders.

The material must clearly distinguish:

**recognising a possible abnormality**

from

**making a medical diagnosis**.

Medical diagnosis and treatment belong to appropriately qualified healthcare professionals.

---

## 13. Evidence and Accuracy Standard

The course should avoid repeating beauty-industry claims as facts without support.

Where a statement is scientific or health-related:

- use reliable sources;
- distinguish established knowledge from emerging evidence;
- distinguish cosmetic claims from clinical evidence;
- avoid absolute claims when evidence is uncertain;
- identify important limitations.

Examples of claims that should be examined critically:

- “This oil makes hair grow faster.”
- “This shampoo repairs all damaged bonds.”
- “This facial permanently closes pores.”
- “This cream replaces collagen.”
- “Natural means safer.”

The preferred reasoning model is:

```text
claim
  ↓
evidence
  ↓
methodology
  ↓
results
  ↓
limitations
  ↓
conclusion
```

---

## 14. Assessment Design

Assessment should test more than memory.

Use a progression such as:

**Remember → Understand → Apply → Analyse → Evaluate**

### Remember

> Name the major layers of the hair shaft.

### Understand

> Explain the function of the cuticle.

### Apply

> Explain how high porosity could influence a colour service.

### Analyse

> A client has repeatedly bleached and thermally straightened their hair. The wet hair stretches excessively and breaks easily. Analyse the likely fibre condition and identify relevant precautions.

### Evaluate

> A manufacturer claims that one shampoo permanently repairs all damaged hair after one wash. Explain how the claim should be evaluated scientifically.

Each substantial chapter should include a mixture of:

- terminology questions;
- MCQs;
- short-answer questions;
- explain-why questions;
- applied questions;
- client cases.

---

## 15. Practical Connection

Although the written material may be theory-focused, chapters should connect knowledge to practical professional work.

Where appropriate, include:

- observation exercises;
- demonstration guidance;
- student practice;
- consultation exercises;
- product-comparison tasks;
- ingredient-label analysis;
- case histories;
- portfolio tasks;
- workplace observations.

The learning material should make clear when supervised hands-on training is necessary.

---

## 16. TVET-CDACC Alignment

The course is designed to cover the major occupational areas appearing across the Kenyan Cosmetology Levels 3–6 pathway.

The detailed cross-reference should be maintained separately in:

[`reference/tvet-cross-reference.md`](./reference/tvet-cross-reference.md)

The master curriculum specification in [curriculum specification](./curriculum_specification.md) currently maps major occupational competencies to the principal teaching modules.

TVET alignment should be treated as a **curriculum mapping reference**, not as a claim that this repository itself awards or replaces an accredited TVET qualification.

---

## 17. Global Benchmarking

When reviewing course completeness, compare subject coverage against established cosmetology and beauty-therapy education frameworks, including where relevant:

- CIDESCO;
- Milady;
- Pivot Point;
- City & Guilds;
- WorldSkills occupational standards;
- recognised anatomy, cosmetic science, infection-control, and professional-practice references.

The goal is not to copy any proprietary curriculum.

The goal is to ensure that major professional and scientific knowledge areas are not accidentally omitted.

---

## 18. Teacher Resources

Teacher material should help an educator deliver the content, not merely repeat the student notes.

Useful teacher resources include:

- lesson objectives;
- suggested lesson sequence;
- required materials;
- demonstration ideas;
- discussion prompts;
- misconceptions to address;
- safety reminders;
- model answers;
- assessment rubrics;
- case-study guidance;
- extension activities.

---

## 19. Student Resources

Student-facing material should support both learning and revision.

Useful resources include:

- complete notes;
- diagrams;
- definitions;
- worked examples;
- comparison tables;
- case studies;
- revision summaries;
- quizzes;
- mock examinations;
- portfolio tasks;
- glossaries;
- reference sheets.

---

## 20. Definition of a Complete Chapter

A chapter should not be considered complete simply because all headings exist.

A complete chapter should normally contain:

- clear learning outcomes;
- scientific terminology;
- explanatory notes;
- professional application;
- safety and contraindications;
- inclusive cosmetology considerations;
- relevant products/tools;
- one or more examples;
- at least one applied or client scenario;
- revision questions;
- a summary;
- references or further reading where appropriate.

For science-heavy chapters, include enough depth that the learner does not need to immediately search elsewhere to understand the fundamentals.

---

## 21. Writing Style

Use language that is:

- professional;
- clear;
- technically accurate;
- learner-friendly;
- explanatory rather than merely declarative.

Prefer:

> The cuticle is the outermost region of the hair shaft. It is formed by overlapping scale-like cells that protect the inner cortex and influence properties such as friction, shine, and response to chemical treatment.

Avoid:

> Cuticle — outer layer of hair.

Use technical terminology, but explain it when first introduced.

---

## 22. References and Attribution

Do not reproduce copyrighted textbooks or proprietary course material.

Use authoritative resources to verify facts and write original explanations.

Where external standards or curricula are referenced:

- identify the source;
- paraphrase rather than copy;
- link to the public source where appropriate;
- distinguish official requirements from this course's own expanded teaching approach.

---

## 23. Recommended Authoring Workflow

For each module:

1. Confirm the module scope in [curriculum specification](./curriculum_specification.md).
2. Identify the relevant TVET competency areas.
3. Identify the scientific disciplines involved.
4. Build the detailed chapter outline.
5. Write the scientific foundation first.
6. Connect the science to professional practice.
7. Add safety, contraindications, and scope boundaries.
8. Add inclusive cosmetology considerations.
9. Add examples and client cases.
10. Add assessment questions.
11. Review terminology and factual accuracy.
12. Add references and further reading.
13. Update the master course navigation when the chapter is ready.

---

## 24. Suggested Content Status

As the course grows, modules may use a simple status marker in the master curriculum specification:

- **Planned** — structure identified, content not written.
- **Draft** — substantial content exists but still requires review.
- **Review** — content complete enough for technical/teaching review.
- **Complete** — reviewed and ready for normal learner use.

This makes it easier to distinguish a chapter outline from publishable learning material.

---

## 25. Long-Term Publishing Goal

The repository should be structured so that the same source material can eventually support:

- online course pages;
- downloadable student notes;
- teacher guides;
- revision books;
- assessments;
- printable textbooks;
- mobile learning;
- LMS integration.

Markdown remains the canonical authoring format unless the project later adopts a dedicated content schema.

The separation between `student-notes/`, `teacher-guide/`, `assessments/`, and `reference/` should be preserved so the same source repository can support a student textbook/package and teacher companion without exposing teacher-only material in the learner edition.

---

## 26. Project Principle

The final resource should help a learner move from:

> “I know which product or procedure to use.”

to:

> “I understand the hair, skin, nail, body, product, science, risk, client need, and professional reasoning behind the decision.”

That is the standard this course should aim to maintain.
