# Learning Node Framework v1.0

## Purpose

This document defines the core Learning Node architecture used by the Multi-Academy Learning Platform.

The goal is to create a stable, extensible, academy-agnostic foundation that can support:

* CBC Academy
* Tech Academy
* Customer Experience Academy
* Future academies
* Future learning models
* Future AI capabilities

without requiring changes to the core data structure.

---

## Design Principles

### Principle 1: Everything Is A LearningNode

The platform must never hardcode concepts such as:

* Grade
* Learning Area
* Subject
* Strand
* Topic
* Module
* Lesson
* Practice
* Assessment
* Exam

Instead, all content structures are represented using a single universal object:

**LearningNode**

Different academies define different hierarchies using LearningNodes.

---

### Principle 2: The Core Model Must Remain Stable

Future enhancements should be implemented through:

* Attributes
* Features
* Actions
* Appearances
* Registries

and not by changing the LearningNode schema itself.

---

### Principle 3: Declarative Architecture

LearningNodes describe:

* What something is
* What it contains
* What capabilities it offers
* What actions can be performed
* How it should appear

LearningNodes do not describe implementation details.

---

## Core LearningNode Model

```typescript
type LearningNode = {
  id: string;
  kind: string;
  label: string;
  summary?: string;
  parentId?: string;
  childIds?: string[];
  attributes?: NodeAttribute[];
  features?: NodeFeature[];
  actions?: NodeAction[];
  appearances?: NodeAppearance[];
  version?: number;
};
```

---

## Field Definitions

| Field        | Description                       |
|--------------|-----------------------------------|
| id           | Globally unique identifier        |
| kind         | Type of node                      |
| label        | Human readable name               |
| summary      | Optional description              |
| parentId     | Parent node                       |
| childIds     | Child node references             |
| attributes   | Additional metadata               |
| features     | Capabilities offered              |
| actions      | Available intents                 |
| appearances  | Presentation hints                |
| version      | Version of node schema            |

---

## Attributes

Attributes describe contextual information.

Attributes must never contain implementation details.

### Structure

```typescript
type NodeAttribute = {
  key: string;
  value: unknown;
};
```

### Example

```json
attributes: [
  {
    "key": "curriculum",
    "value": "CBC"
  },
  {
    "key": "gradeLevel",
    "value": 1
  },
  {
    "key": "estimatedMinutes",
    "value": 15
  }
]
```

---

## Features

Features describe capabilities available on a node.

### Structure

```typescript
type NodeFeature = {
  kind: string;
};
```

### Example

```json
features: [
  {
    "kind": "guidedContent"
  },
  {
    "kind": "practice"
  },
  {
    "kind": "assessment"
  }
]
```

### Future Examples

```json
features: [
  {
    "kind": "aiTutor"
  },
  {
    "kind": "videoLesson"
  },
  {
    "kind": "parentReview"
  },
  {
    "kind": "teacherAssignment"
  }
]
```

---

## Actions

Actions describe available intents.

Actions must be intent-based.

Actions must never be route-based.

### Structure

```typescript
type NodeAction = {
  intent: string;
};
```

### Example

```json
actions: [
  {
    "intent": "openChildren"
  },
  {
    "intent": "resume"
  },
  {
    "intent": "startPractice"
  },
  {
    "intent": "takeAssessment"
  }
]
```

### Good Examples

```
openChildren
resume
startPractice
takeAssessment
reviewResults
readAloud
```

### Bad Examples

```
goToEnglishPage
openGradeOnePage
openTopicScreen
```

---

## Appearances

Appearances describe how a node should appear.

Appearances are intentionally key-value based to avoid future schema changes.

### Structure

```typescript
type NodeAppearance = {
  key: string;
  value: unknown;
};
```

### Example

```json
appearances: [
  {
    "key": "layout",
    "value": "grid"
  },
  {
    "key": "density",
    "value": "comfortable"
  },
  {
    "key": "tone",
    "value": "playful"
  },
  {
    "key": "icon",
    "value": "book"
  }
]
```

### Future Examples

```json
appearances: [
  {
    "key": "animation",
    "value": "bounce"
  },
  {
    "key": "mascot",
    "value": "owl"
  },
  {
    "key": "soundEffect",
    "value": "success-chime"
  }
]
```

---

## Registries

LearningNodes declare.

Registries implement.

The LearningNode itself never contains implementation details.

### Registry Examples

* Feature Registry
* Action Registry
* Appearance Registry
* Attribute Registry

### Examples

```typescript
featureRegistry["practice"]
actionRegistry["startPractice"]
appearanceRegistry["playful"]
```

Registries resolve declarations into:

* React components
* Services
* Navigation
* Analytics
* Progress tracking
* Access rules

---

## CBC Academy Example

### Hierarchy

```
CBC Academy
 ├── Grade 1
 │    ├── English
 │    │    ├── Listening and Speaking
 │    │    │    ├── Lesson 1
 │    │    │    ├── Lesson 2
 │    │    │    ├── Practice
 │    │    │    ├── Assessment
 │    │    │    └── Exam
 │    │    ├── Reading
 │    │    ├── Writing
 │    │    ├── Spelling
 │    │    └── Comprehension
 │    ├── Kiswahili
 │    ├── Mathematics
 │    ├── Environmental Activities
 │    ├── Creative Activities
 │    └── Religious Education
 │
 ├── Grade 2
 ├── Grade 3
 ├── Grade 4
 ├── Grade 5
 ├── Grade 6
 ├── Grade 7
 ├── Grade 8
 └── Grade 9
```

---

### CBC Root Node

```json
{
  "id": "cbc-academy",
  "kind": "academy",
  "label": "CBC Academy",
  "childIds": [
    "grade-1",
    "grade-2",
    "grade-3",
    "grade-4",
    "grade-5",
    "grade-6",
    "grade-7",
    "grade-8",
    "grade-9"
  ]
}
```

---

### Grade 1 Node

```json
{
  "id": "grade-1",
  "kind": "grade",
  "label": "Grade 1",
  "parentId": "cbc-academy",
  "childIds": [
    "grade-1-english",
    "grade-1-kiswahili",
    "grade-1-mathematics",
    "grade-1-environmental",
    "grade-1-creative",
    "grade-1-religious"
  ],
  "attributes": [
    {
      "key": "curriculum",
      "value": "CBC"
    },
    {
      "key": "gradeLevel",
      "value": 1
    }
  ],
  "actions": [
    {
      "intent": "openChildren"
    }
  ],
  "appearances": [
    {
      "key": "layout",
      "value": "grid"
    },
    {
      "key": "tone",
      "value": "playful"
    }
  ]
}
```

---

### English Learning Area

```json
{
  "id": "grade-1-english",
  "kind": "learningArea",
  "label": "English",
  "parentId": "grade-1",
  "childIds": [
    "listening-speaking",
    "reading",
    "writing",
    "spelling",
    "comprehension"
  ]
}
```

---

### Listening and Speaking Node

```json
{
  "id": "listening-speaking",
  "kind": "strand",
  "label": "Listening and Speaking",
  "parentId": "grade-1-english",
  "features": [
    {
      "kind": "guidedContent"
    },
    {
      "kind": "practice"
    },
    {
      "kind": "assessment"
    }
  ],
  "actions": [
    {
      "intent": "startGuidedLearning"
    },
    {
      "intent": "startPractice"
    },
    {
      "intent": "takeAssessment"
    }
  ]
}
```

---

### Lesson Node

```json
{
  "id": "lesson-1",
  "kind": "lesson",
  "label": "Listening to Sounds",
  "parentId": "listening-speaking",
  "features": [
    {
      "kind": "guidedContent"
    },
    {
      "kind": "readAloud"
    }
  ]
}
```

---

### Practice Node

```json
{
  "id": "practice-1",
  "kind": "practice",
  "label": "Listening Practice",
  "parentId": "listening-speaking",
  "actions": [
    {
      "intent": "startPractice"
    }
  ]
}
```

---

### Assessment Node

```json
{
  "id": "assessment-1",
  "kind": "assessment",
  "label": "Listening Assessment",
  "parentId": "listening-speaking",
  "actions": [
    {
      "intent": "takeAssessment"
    }
  ]
}
```

---

### Exam Node

```json
{
  "id": "exam-1",
  "kind": "exam",
  "label": "English Exam 1",
  "parentId": "grade-1-english",
  "actions": [
    {
      "intent": "startExam"
    }
  ]
}
```

---

## Tech Academy Example

The same engine can support:

```
Tech Academy
 ├── System Design
 │    ├── Scalability
 │    ├── Databases
 │    ├── Messaging
 │    └── Load Balancing
 │
 ├── Java
 ├── Kubernetes
 └── Architecture
```

without changing the LearningNode structure.

Only the configured hierarchy changes.

---

## Final Principle

The LearningNode must remain small, stable, and academy-agnostic.

Future growth must occur through:

* Attributes
* Features
* Actions
* Appearances
* Registries

rather than modifying the LearningNode schema itself.
```
