# Multi-Academy Platform RFC
## Senior Dev Accelerator Evolution Strategy

Version: Draft RFC 1.0

---

# 1. Executive Summary

This document defines the long-term architecture for evolving Senior Dev Accelerator from a single-academy platform into a multi-academy learning ecosystem while maintaining a single codebase.

The current production experience:

https://academy.qubitel.net

must remain unchanged.

Future academies will be introduced through dedicated subdomains while sharing the same application, infrastructure, deployment process, content engine, progress engine, and assessment engine.

The platform should support:

- Technology Academy (current Senior Dev Accelerator)
- CBC Academy
- Customer Experience Academy
- Future academies

without requiring a separate codebase.

---

# 2. Goals

## Business Goals

- Expand beyond software engineering.
- Reuse the same platform for multiple audiences.
- Maintain one deployment pipeline.
- Minimize maintenance overhead.
- Allow future academies without architecture redesign.

## Technical Goals

- Single codebase.
- Shared components.
- Shared assessment engine.
- Shared progress engine.
- Shared content engine.
- Academy-aware routing.
- Academy-aware storage.
- Academy-aware content filtering.

---

# 3. Non Goals

The first implementation must NOT:

- Move all files into new folders.
- Rewrite routing.
- Rewrite the UI.
- Break existing URLs.
- Break existing progress.
- Change existing question IDs.
- Change existing topic IDs.
- Change existing category IDs.

---

# 4. Current State Analysis

Current conceptual model:

Category → Topic → Problem

Examples:

DSA
└── Sliding Window
    └── Questions

Java
└── Collections
    └── Questions

CKAD
└── Pods
    └── Questions

This model works well for technology training but becomes limiting for:

- CBC learners
- Customer support training
- Business training
- Future academies

because those audiences expect:

Learn → Practice → Assess

rather than:

Topic → Problems

---

# 5. Canonical Learning Model

The platform should evolve to:

Academy
└── Category
    └── Topic
        ├── Lessons
        ├── Practice
        └── Assessments

This model is academy-neutral.

It works for:

- Software Engineering
- CBC Education
- Customer Support
- Customer Success
- IT Support
- Business Training
- Future academies

---

# 6. Learning Lifecycle

Every topic follows the same lifecycle.

## Step 1: Lessons

Purpose:

Teach concepts.

Examples:

- Sliding Window Fundamentals
- Java HashMap Basics
- Grade 3 Nouns
- Complaint Handling Fundamentals

Possible lesson content:

- Explanations
- Visual diagrams
- Walkthroughs
- Examples
- Notes
- Mental models
- Common mistakes

---

## Step 2: Practice

Purpose:

Apply knowledge.

Examples:

- MCQs
- Coding challenges
- Scenario questions
- Hands-on labs
- Guided exercises

---

## Step 3: Assessments

Purpose:

Measure readiness.

Examples:

- Timed quizzes
- Mock exams
- Certification simulations
- End-of-topic tests

---

# 7. Academy Architecture

Academy is primarily an internal platform boundary.

Users generally do not select an academy manually.

Academy is determined by hostname.

Examples:

academy.qubitel.net → Technology Academy

cbc.academy.qubitel.net → CBC Academy

cx.academy.qubitel.net → Customer Experience Academy

---

# 8. Technology Academy

Subdomain:

academy.qubitel.net

Categories:

- DSA
- Java
- CKAD
- System Design
- Aptitude
- ML / AI
- Engineering Leadership

Example:

Technology Academy
└── DSA
    └── Sliding Window
        ├── Lessons
        ├── Practice
        └── Assessments

---

# 9. CBC Academy

Subdomain:

cbc.academy.qubitel.net

Categories:

- Grade 3
- Grade 4
- Grade 5
- Future grades

Example:

CBC Academy
└── Grade 3
    └── English
        ├── Lessons
        ├── Practice
        └── Assessments

Future Grade 3 subjects:

- English
- Kiswahili
- Mathematics
- Religious Education
- Environmental Activities

---

# 10. Customer Experience Academy

Subdomain:

cx.academy.qubitel.net

Categories:

- Customer Support
- IT Support
- Helpdesk
- Service Desk
- Customer Success

Example:

Customer Experience Academy
└── Customer Support
    └── Complaint Handling
        ├── Lessons
        ├── Practice
        └── Assessments

---

# 11. Naming Standards

Display names may contain spaces.

Examples:

- Customer Experience Academy
- Grade 3
- Customer Support

Code identifiers must use kebab-case.

Examples:

- customer-experience
- grade-3
- customer-support
- complaint-handling

Never use spaces in:

- folder names
- route segments
- ids
- manifest keys

---

# 12. Folder Standards

Current content:

```text
src/data/problems/
```

Future structure:

```text
src/
└── data/
    └── problems/
        ├── tech/
        │   └── dsa/
        │       └── sliding-window/
        │
        ├── cbc/
        │   └── grade-3/
        │       └── english/
        │
        └── customer-experience/
            └── customer-support/
                └── complaint-handling/
```

---

# 13. Manifest Standards

Future manifests:

```text
src/data/manifests/
├── academyManifest.js
├── categoryManifest.js
└── topicManifest.js
```

Conceptually:

Academy
→ Category
→ Topic
→ Lessons
→ Practice
→ Assessments

---

# 14. Routing Strategy

Keep:

https://academy.qubitel.net

unchanged.

Do NOT use:

/cbc
/customer-support

as primary academy selectors.

Prefer:

cbc.academy.qubitel.net

cx.academy.qubitel.net

Benefits:

- Cleaner separation.
- Better branding.
- Simpler content filtering.
- Easier future expansion.

---

# 15. Academy Registry

Future:

```text
src/config/academyRegistry.js
```

Example:

tech

cbc

customer-experience

---

# 16. Academy Detection

Future:

```text
src/config/detectAcademy.js
```

Behavior:

cbc.* → cbc

cx.* → customer-experience

everything else → tech

---

# 17. Shared Assessment Engine

The same assessment engine should support:

Technology:

- Aptitude tests
- CKAD readiness
- Java assessments

CBC:

- Topic tests
- End-term exams

Customer Experience:

- Scenario assessments
- Readiness tests

Features:

- Timers
- Auto submit
- Auto fail on timeout
- Result summaries
- PDF export

---

# 18. Storage Strategy

Current progress must remain intact.

Future storage keys:

senior-dev-accelerator:v2:tech

senior-dev-accelerator:v2:cbc

senior-dev-accelerator:v2:customer-experience

Progress must never mix across academies.

---

# 19. What Stays The Same

The first implementation should preserve:

- problemDiscovery.js
- problemAuthoring.js
- contentProfile.js
- existing routes
- existing categories
- existing topics
- existing question ids

---

# 20. Recommended Phases

Phase 1
Documentation

Phase 2
Academy Registry

Phase 3
Academy Detection

Phase 4
Academy-Aware Site Config

Phase 5
Academy-Aware Storage

Phase 6
Academy-Aware Content Filtering

Phase 7
CBC Academy Foundation

Phase 8
Customer Experience Academy Foundation

Phase 9
Shared Assessment Engine

Phase 10
PDF Export

---

# 21. Risks

- Breaking existing URLs
- Mixing progress across academies
- Content leakage between academies
- Large refactors
- CSS complexity

Mitigation:

Introduce academy support incrementally.

---

# 22. GitHub Epic Structure

Epic:

Multi-Academy Platform Foundation

Child Issues:

- Academy Registry
- Academy Detection
- Academy-Aware Storage
- Academy-Aware Content Filtering
- CBC Foundation
- Customer Experience Foundation
- Shared Assessment Engine
- PDF Export Engine

---

# 23. Acceptance Criteria

- Academy layer exists.
- Existing routes still work.
- Existing progress still works.
- CBC content is isolated.
- Customer Experience content is isolated.
- Academy detection works.
- No user-visible regression.

---

# 24. Final Recommendation

Start small.

The first runtime refactor should only introduce:

- academyRegistry.js
- detectAcademy.js

No visible behavior should change.

Once stable, proceed with academy-aware filtering and academy-specific content.
