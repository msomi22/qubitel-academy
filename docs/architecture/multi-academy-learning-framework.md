# Multi-Academy Learning Framework (MALF)

## Vision

Build a world-class, mobile-first learning platform framework that supports multiple academies from a single codebase.

Examples:

- CBC Academy (Grade 1–8)
- Tech Academy
- CX Academy
- Future academies

The platform must allow new academies, themes, content types, and navigation models to be added with minimal or no core changes.

---

# Core Principles

## 1. Mobile First

The primary experience is mobile.

Design assumptions:

- Phone before desktop
- One-hand navigation
- Large touch targets
- Fast loading
- Offline-friendly

---

## 2. Few Clicks Philosophy

Students, parents, and teachers should reach learning content in the smallest number of steps possible.

Target flow:

Grade → Subject → Learn / Practice / Exams

Avoid deep menu nesting.

---

## 3. Framework First

The platform is not a CBC application.

The platform is a reusable framework.

CBC becomes a module.

Tech becomes a module.

CX becomes a module.

Future academies become modules.

---

# User Types

## Student

Capabilities:

- Learn lessons
- Read notes
- Take quizzes
- Take exams
- Track progress
- Resume learning

## Parent

Capabilities:

- View child progress
- View weak areas
- View activity history
- View recommendations

## Teacher

Capabilities:

- Assign work
- Monitor progress
- Review performance
- Track weak areas

---

# CBC Learning Structure

Grade
→ Subject
→ Learn
→ Practice
→ Exams

Learn:

- Roadmap
- Lessons
- Student Notes
- Teacher Notes
- Lesson Plans

Practice:

- Topic Questions
- Mixed Practice
- Retry Mistakes
- Weak Areas

Exams:

- Topic Exams
- Subject Exams
- Revision Exams

---

# Grade UI Maturity Model

Grade 1–2

- Cartoon-like
- Friendly characters
- Read aloud
- Large buttons

Grade 3–4

- Less cartoon
- More educational

Grade 5–6

- Cleaner interface
- Reduced visual assistance

Grade 7–8

- Exam-focused
- Mature appearance

Same architecture.

Different themes.

---

# Multi Academy Model

Academy Examples:

- CBC Academy
- Tech Academy
- CX Academy

CBC:

Grades → Subjects → Topics

Tech:

Tracks → Topics → Problems

CX:

Skills → Scenarios → Simulations

Same engine.

Different configuration.

---

# Architecture

Core Platform
→ Academy
→ Module
→ Theme
→ Content

Core owns behavior.

Academy owns experience.

---

# Recommended Folder Structure

src/

- app/
- core/
- platform/
- academies/
- shared/

Academies:

- cbc/
- tech/
- cx/

Each academy contains:

- academy.config.ts
- theme.config.ts
- navigation.config.ts
- routes.config.ts
- modules/
- overrides/

---

# Override Strategy

Resolution Order:

1. Academy Override
2. Module Override
3. Core Component

This prevents duplication.

---

# Design Patterns

Registry Pattern

- Academy registration
- Theme registration

Strategy Pattern

- Speech providers
- Progress providers
- Payment providers

Adapter Pattern

- Content normalization

Factory Pattern

- Component resolution

Provider Pattern

- Academy context
- Theme context

Composition

- UI assembly

---

# Content Model

Lesson

- Objectives
- Content
- Examples
- Teacher Notes
- Student Notes
- Quiz

Quiz

- Questions
- Explanations
- Retry Support

Exam

- Sections
- Timing
- Scoring

---

# Progress Engine

Free Users

- Browser storage

Paid Users

- Cloud sync
- Cross-device progress

Progress Tracks:

- Lessons
- Quizzes
- Exams
- Streaks

---

# Speech Architecture

Do not build a speech engine.

Build a speech abstraction layer.

SpeechService

Providers:

- Browser Speech
- Cloud TTS
- Future providers

Phase 1

- Browser read aloud

Phase 2

- Premium generated audio

Phase 3

- Speech-to-text practice

---

# Accessibility

Must follow WCAG principles.

Requirements:

- Keyboard support
- Focus visibility
- High contrast
- Large touch targets
- Screen reader support

---

# Child Safety

Requirements:

- Minimal data collection
- Safe content
- Parent visibility
- Privacy controls

---

# Performance Standards

- Lazy loading
- Code splitting
- Mobile optimization
- Offline caching
- PWA readiness

---

# Engineering Standards

TypeScript

Strict mode enabled.

Required:

- ESLint
- Prettier
- Unit tests
- Integration tests
- E2E tests

---

# Navigation Standards

Student:

Home
Subjects
Practice
Progress

Parent:

Dashboard
Children
Reports

Teacher:

Classes
Assignments
Reports

---

# Future Expansion

Supported without core changes:

- CBC
- Tech
- CX
- Language Academy
- Interview Academy
- University Academy
- Professional Certification Academy

---

# Implementation Roadmap

Phase 1

Platform foundation.

Phase 2

CBC Academy.

Phase 3

Parent dashboard.

Phase 4

Teacher dashboard.

Phase 5

Premium features.

Phase 6

Additional academies.

---

# Final Goal

Create a world-class, mobile-first, multi-academy learning framework that:

- Scales from Grade 1 to professional learners
- Supports multiple academies
- Uses configuration over customization
- Allows academy-specific overrides
- Maximizes reuse
- Minimizes core changes
- Remains maintainable for many years
