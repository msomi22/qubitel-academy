# Multi-Academy Platform RFC

## Academy Hierarchy Explained

### Canonical Learning Model

```text
Academy
└── Category
    └── Topic
        ├── Lessons
        ├── Practice
        └── Assessments
```

## What Each Level Means

### Academy

An academy is the highest-level learning product.

Academies represent different learner audiences and are usually selected automatically by subdomain.

Examples:

```text
academy.qubitel.net     → Technology Academy
cbc.academy.qubitel.net → CBC Academy
cx.academy.qubitel.net  → Customer Experience Academy
```

Learners normally do not choose an academy manually.

---

### Category

A category is the first major grouping visible to learners.

Technology Academy:

```text
DSA
Java
CKAD
System Design
Aptitude
ML / AI
Engineering Leadership
```

CBC Academy:

```text
Grade 3
Grade 4
Grade 5
```

Customer Experience Academy:

```text
Customer Support
IT Support
Helpdesk
Service Desk
Customer Success
```

---

### Topic

A topic is a focused learning area within a category.

Examples:

```text
Technology Academy
└── DSA
    └── Sliding Window
```

```text
CBC Academy
└── Grade 3
    └── English
```

```text
Customer Experience Academy
└── Customer Support
    └── Complaint Handling
```

---

### Lessons

Lessons teach concepts.

Examples:

- Explanations
- Visual walkthroughs
- Diagrams
- Examples
- Notes
- Mental models
- Common mistakes

Example:

```text
Technology Academy
└── DSA
    └── Sliding Window
        └── Lesson: What is a Sliding Window?
```

---

### Practice

Practice allows learners to apply knowledge.

Examples:

- MCQs
- Coding Questions
- Scenario Questions
- Exercises
- Labs

Example:

```text
CBC Academy
└── Grade 3
    └── English
        └── Practice: Identify nouns in a sentence
```

---

### Assessments

Assessments measure readiness.

Examples:

- Timed quizzes
- Mock exams
- Certification simulations
- Topic tests
- End-of-topic tests

Example:

```text
Customer Experience Academy
└── Customer Support
    └── Complaint Handling
        └── Assessment: Complaint Handling Scenario Quiz
```

---

# Complete Examples

## Technology Academy

```text
academy.qubitel.net

Technology Academy
└── DSA
    └── Sliding Window
        ├── Lessons
        │   ├── What is a Sliding Window?
        │   └── Fixed vs Variable Window
        │
        ├── Practice
        │   ├── Maximum Sum Subarray of Size K
        │   └── Longest Substring Without Repeating Characters
        │
        └── Assessments
            └── Sliding Window Timed Quiz
```
## CBC Academy

```text
cbc.academy.qubitel.net

CBC Academy
└── Grade 3
    └── English
        ├── Lessons
        │   ├── What is a Noun?
        │   └── Common vs Proper Nouns
        │
        ├── Practice
        │   ├── Identify Nouns
        │   └── Choose the Correct Noun
        │
        └── Assessments
            └── Grade 3 English Nouns Assessment
```

## Customer Experience Academy

```text
cx.academy.qubitel.net

Customer Experience Academy
└── Customer Support
    └── Complaint Handling
        ├── Lessons
        │   ├── Acknowledge Complaints
        │   └── Calming an Upset Customer
        │
        ├── Practice
        │   ├── Choose the Best Response
        │   └── Rewrite a Poor Reply
        │
        └── Assessments
            └── Complaint Handling Scenario Assessment
```

# Naming Standards

## Display Names

Display names are user-facing and may contain spaces.

Examples:

```text
Customer Experience Academy
Grade 3
Customer Support
Complaint Handling
```

## Safe IDs

Use lowercase kebab-case for:

- Folder names
- Route segments
- IDs
- Manifest keys

Examples:

```text
customer-experience
grade-3
customer-support
complaint-handling
sliding-window
```

# Example Folder Structure

```text
src/
└── data/
    └── content/
        ├── tech/
        │   └── dsa/
        │       └── sliding-window/
        │           ├── lessons/
        │           ├── practice/
        │           └── assessments/
        │
        ├── cbc/
        │   └── grade-3/
        │       └── english/
        │           ├── lessons/
        │           ├── practice/
        │           └── assessments/
        │
        └── customer-experience/
            └── customer-support/
                └── complaint-handling/
                    ├── lessons/
                    ├── practice/
                    └── assessments/
```
