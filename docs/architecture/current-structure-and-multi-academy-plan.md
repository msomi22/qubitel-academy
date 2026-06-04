# Current Structure and Multi-Academy Platform Plan

## Status

Documentation proposal for issue #261.

This document records the current Senior Dev Accelerator project structure and proposes a safe, phased path toward multi-academy support using the same codebase.

The current production experience at:

https://academy.qubitel.net

must remain Senior Dev Accelerator.

Future academies should be delivered through dedicated subdomains while sharing the same platform foundation.

---

# Executive Summary

Current model:

Category → Topic → Problem

Future model:

Academy
└─ Category
   └─ Topic
      ├─ Lessons
      ├─ Practice
      └─ Assessments

The first implementation should be additive, not disruptive.

---

# Canonical Learning Model

The platform should evolve from a problem-centric system into a learning-centric system.

Academy
└─ Category
   └─ Topic
      ├─ Lessons
      ├─ Practice
      └─ Assessments

## Lessons

Lessons teach concepts.

Examples:

- Sliding Window Fundamentals
- Java HashMap Basics
- CKAD ConfigMaps
- Grade 3 Nouns
- Customer Complaint Handling

## Practice

Practice applies knowledge.

Examples:

- MCQs
- Coding Questions
- Scenario Questions
- Exercises
- Labs

## Assessments

Assessments measure readiness.

Examples:

- Topic Assessments
- Timed Quizzes
- Mock Exams
- Certification Simulations

## Preferred Terminology

Use:

- Lessons
- Practice
- Assessments

Avoid:

- Problems
- Exams

because they are niche-specific and do not scale well across all academies.

---

# Academy Hierarchy Examples

Academy is an internal platform boundary and is normally selected automatically by subdomain.

Learners typically do not choose an academy manually.

## Technology Academy

academy.qubitel.net

Technology Academy
└─ DSA
   └─ Sliding Window
      ├─ Lessons
      ├─ Practice
      └─ Assessments

## CBC Academy

cbc.academy.qubitel.net

CBC Academy
└─ Grade 3
   └─ English
      ├─ Lessons
      ├─ Practice
      └─ Assessments

## Customer Experience Academy

cx.academy.qubitel.net

Customer Experience Academy
└─ Customer Support
   └─ Complaint Handling
      ├─ Lessons
      ├─ Practice
      └─ Assessments

---

# Platform Direction

Qubitel Academy Platform

- Technology Academy
- CBC Academy
- Customer Experience Academy

---

# Naming Conventions

## Display Names

Display names may contain spaces.

Examples:

- Technology Academy
- CBC Academy
- Customer Experience Academy
- Grade 3
- Customer Support
- Complaint Handling
- Sliding Window

## IDs, Routes, Folder Names and Manifest Keys

Use lowercase kebab-case.

Good:

- tech
- cbc
- customer-experience
- grade-3
- customer-support
- complaint-handling
- sliding-window

Bad:

- Technology Academy
- Grade 3
- Customer Support
- Complaint Handling

## Example Folder Structure

src/data/problems/tech/dsa/sliding-window/
src/data/problems/cbc/grade-3/english/
src/data/problems/customer-experience/customer-support/complaint-handling/

---

# Academy Manifest

academyManifest
categoryManifest
topicManifest

Conceptually:

Academy → Category → Topic → Lessons / Practice / Assessments

---

# Product and Routing Strategy

Keep:

https://academy.qubitel.net

Future academies:

https://cbc.academy.qubitel.net
https://cx.academy.qubitel.net

---

# What Stays The Same

- problemDiscovery.js
- problemAuthoring.js
- contentProfile.js
- existing category ids
- existing topic ids
- existing question ids
- existing production routes

---

# Recommended Phases

1. Documentation
2. Academy Registry
3. Academy Detection
4. Academy-Aware Site Config
5. Academy-Aware Storage
6. Academy-Aware Content Filtering
7. CBC Academy Foundation
8. Customer Experience Academy Foundation
9. Shared Assessment Engine
10. PDF Export

---

# Final Recommendation

Start small.

The first runtime refactor should only introduce:

- academyRegistry.js
- detectAcademy.js

with zero visible behavior change.
