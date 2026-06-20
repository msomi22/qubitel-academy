---
paths:
  - "src/academies/**/lessons/**"
  - "src/academies/**/practice/**"
  - "src/academies/**/assessments/**"
  - "src/academies/**/exams/**"
  - "src/academies/**/topic.manifest.*"
  - "src/academies/**/category.manifest.*"
  - "src/academies/**/academy.manifest.*"
  - "docs/problem-authoring.md"
---

# Content Authoring Rules

## Location

New real learning content should live under:

```text
src/academies/{academy}/{category}/{topicId}/{lessons|practice|assessments}/{problem-id}.js
```

Do not add new real content to legacy bank folders unless the task explicitly requires legacy compatibility.

Registration

When adding content:

Add the file under the correct academy/topic folder.
Register it in the relevant topic manifest.
Update the parent manifest only when required.
Run manifest generation if required.
Validate the content appears in the expected academy/profile.
Authoring helpers

Use helpers from:

src/problems/problemAuthoring.js

Use:

defineMcqProblem for multiple-choice questions
defineLearningProblem for explanation/learning content
defineSimpleSystemDesignProblem for compact system-design prompts
defineComplexSystemDesignProblem for full system-design case studies
Metadata

Production-visible content must be reviewed and explicitly visible in production:

metadata: {
  reviewStatus: 'approved',
  visibility: ['dev', 'prod']
}

Draft/dev-only content should use:

metadata: {
  reviewStatus: 'draft',
  visibility: ['dev']
}

Do not mark content as approved unless the prompt, answer, explanation, metadata, and rendering have been reviewed.

Rich body blocks

Use only supported structured body block types.

Do not invent arbitrary renderer shapes, CSS classes, or presentation variants.

If a new visual/rendering type is needed, add central renderer support first.

Quality

Learner-facing content must be:

clear
age/topic appropriate
explanation-first
free from misleading answers
consistent with the exact prompt/audio/image
registered in the correct manifest