
# Learning Node Implementation Guide v1.0

## Purpose

This document defines how the Learning Node Framework is implemented in practice.

While the Learning Node Framework defines the architecture and concepts, this document defines:

- Repository structure
- Academy organization
- Node ownership
- Registry organization
- Parent-child wiring
- Validation rules
- Content onboarding standards
- Real-world academy examples

The objective is to support unlimited academies, unlimited content, and long-term maintainability without creating large monolithic configuration files.

---

## Core Principle

**Everything is a LearningNode.**

The platform must not introduce academy-specific models such as:

- TechCategory
- TechTopic
- CBCGrade
- CBCSubject
- CBCTopic
- CXCourse

Instead, everything is represented using:

- **LearningNode**

and differentiated using:

- `kind`
- `attributes`
- `features`
- `actions`
- `appearances`

---

## Multi-Academy Platform Structure

The platform supports multiple academies.

Example:

```

Learning Platform
│
├── Tech Academy
├── CBC Academy
└── CX Academy

```

Every academy is simply another LearningNode.

---

## Example Academy Hierarchies

### Tech Academy

```

Tech Academy
│
├── DSA
│   ├── Sliding Window
│   ├── Two Pointers
│   └── Binary Search
│
├── System Design
│   ├── URL Shortener
│   └── Payment Service
│
├── Backend Engineering
├── Frontend Engineering
└── Databases

```

**Recommended hierarchy:**

Academy → Category → Topic → Lesson → Question → Assessment

---

### CBC Academy

```

CBC Academy
│
├── Grade 1
│   ├── English
│   ├── Kiswahili
│   └── Mathematics
│
├── Grade 2
│   ├── English
│   ├── Kiswahili
│   └── Mathematics
│
└── Grade 3

```

**Recommended hierarchy:**

Academy → Grade → Learning Area → Strand → Lesson → Practice → Assessment → Exam

---

### CX Academy

```

CX Academy

```

Initially:

- No children
- No content
- Coming Soon

The academy still exists within the platform.

---

## Repository Structure

The platform should **never** store all nodes inside one file.

**Bad:**
- `allNodes.js`
- `cbcNodes.js`
- `everything.json`

These become difficult to maintain.

---

## Recommended Structure

```

src/learning/
├── root/
│   ├── platform.node.js
│   └── platform.registry.js
│
├── academies/
│   ├── academy.registry.js
│
│   ├── tech/
│   │   ├── tech.academy.node.js
│   │   ├── tech.registry.js
│   │   └── categories/
│   │
│   ├── cbc/
│   │   ├── cbc.academy.node.js
│   │   ├── cbc.registry.js
│   │   └── grades/
│   │
│   └── cx/
│       ├── cx.academy.node.js
│       └── cx.registry.js
│
└── validation/
└── learningNodeValidator.js

```

---

## Registry Layering

Registries must be **hierarchical**.

A registry may only import the level immediately below it.

Example:

```

platform.registry
↓
academy.registry
↓
cbc.registry
↓
grade-1.registry
↓
english.registry
↓
reading.registry

```

This prevents registry explosion.

---

## Parent‑Child Ownership

Every node owns its direct children.

Example:

- Platform → owns Academies
- Academy → owns Categories or Grades
- Grade → owns Learning Areas
- Learning Area → owns Strands
- Strand → owns Lessons
- Lesson → owns Practices
- Practice → owns Assessments
- Assessment → owns Exams

---

## Example Parent Wiring

**Platform:**
```json
{
  "id": "learning-platform",
  "childIds": [
    "tech-academy",
    "cbc-academy",
    "cx-academy"
  ]
}
```

CBC Academy:

```json
{
  "id": "cbc-academy",
  "parentId": "learning-platform",
  "childIds": [
    "cbc-grade-1",
    "cbc-grade-2",
    "cbc-grade-3"
  ]
}
```

Grade 1:

```json
{
  "id": "cbc-grade-1",
  "parentId": "cbc-academy",
  "childIds": [
    "cbc-grade-1-english",
    "cbc-grade-1-kiswahili",
    "cbc-grade-1-mathematics"
  ]
}
```

---

## Validation Rules

The platform must validate the node graph during startup.

Required validations:

1. No duplicate ids
2. Every parentId exists
3. Every childId exists
4. Parent references child
5. Child references parent
6. No circular references
7. No orphan nodes
8. No missing academy roots
9. No missing platform root

Startup should fail when validation fails.

---

Academy Independence

Academies must remain independent.

Example:
Tech Academy does not know about CBC Academy.

Example:
CBC Academy does not know about CX Academy.

The only shared connection is: Learning Platform Root.

---

Adding a New Academy

Creating a new academy should require:

1. Create academy folder
2. Create academy root node
3. Create academy registry
4. Register academy in academy registry
5. Register academy id in platform root

No other platform changes should be required.

Example:

```
academies/
  finance/
    finance.academy.node.js
    finance.registry.js
```

---

## Long‑Term Goal

The Learning Node architecture should support:

- Unlimited Academies
- Unlimited Grades
- Unlimited Topics
- Unlimited Lessons
- Unlimited Questions
- Unlimited Assessments
- Unlimited Exams

without requiring architecture changes.

The platform should grow through content additions, not structural rewrites.
