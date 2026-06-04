# Current Structure and Multi-Academy Platform Plan

## Status

Documentation proposal for issue #261.

This document records the current Senior Dev Accelerator project structure and proposes a safe, phased path toward multi-academy support using the same codebase.

The current production experience at https://academy.qubitel.net must remain Senior Dev Accelerator.

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

Lessons teach concepts.
Practice applies knowledge.
Assessments measure readiness.

Preferred terminology:

- Lessons
- Practice
- Assessments

Avoid:

- Problems
- Exams

because they are niche-specific and do not scale across all academies.

---

# Platform Direction

Technology Academy
- DSA
- Java
- CKAD
- System Design
- Aptitude
- ML / AI

CBC Academy
- Grade 3
- Grade 4
- Future Grades

Customer Experience Academy
- Customer Support
- IT Support
- Helpdesk
- Service Desk
- Customer Success

---

# Academy Manifest

Academy
→ Category
→ Topic
→ Lessons / Practice / Assessments

Future manifests:

- academyManifest
- categoryManifest
- topicManifest

---

# Product and Routing Strategy

Keep:

https://academy.qubitel.net

as Senior Dev Accelerator.

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
