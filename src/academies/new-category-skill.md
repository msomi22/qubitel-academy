# Add a New Academy Category Skill

```metadata
name: add-academy-category
description: End-to-end automation guide for creating a new academy category, topic, lesson, manifests, registry entries, generated imports, and test updates in Qubitel Academy.
version: 2.0.0
license: MIT
author: Qubitel Academy Team
```

> **Purpose**
>
> This skill provides a deterministic workflow for adding a new academy category to the Qubitel Academy codebase. It defines the required files, validation rules, execution order, and failure handling to ensure the repository remains consistent.

---

# Goals

This skill should:

- Create a fully functional academy category.
- Create the initial topic.
- Create the first lesson.
- Update all required manifests.
- Update the academy registry.
- Regenerate generated files.
- Keep repository consistency.
- Ensure all tests pass.

---

# Scope

## The AI MUST

- Create all missing files.
- Update existing manifests without removing existing entries.
- Preserve existing formatting whenever possible.
- Preserve ordering of existing arrays.
- Use existing project conventions.
- Validate IDs before creating files.
- Regenerate generated files.
- Verify the repository is consistent before completion.

## The AI MUST NOT

- Rename existing IDs.
- Delete existing categories.
- Reorder categories unless explicitly requested.
- Modify unrelated academies.
- Invent new project conventions.
- Skip validation.
- Overwrite unrelated user changes.

---

# Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `CATEGORY_ID` | Category identifier (kebab-case) | `itil` |
| `SHORT_NAME` | Short display name | `ITIL` |
| `DISPLAY_NAME` | Full display name | `ITIL / ITSM` |
| `DOMAIN` | Category domain | `IT Service Management` |
| `CATEGORY_DESCRIPTION` | Category description | `ITIL 5 Foundation certification...` |
| `TOPIC_ID` | Topic identifier | `itil-foundation` |
| `TOPIC_DISPLAY_NAME` | Topic display name | `ITIL Foundation` |
| `TOPIC_DESCRIPTION` | Topic description | `Complete certification guide...` |
| `LESSON_ID` | Lesson identifier | `itil-5-foundation-certification-guide` |
| `LESSON_DISPLAY_NAME` | Lesson title | `ITIL 5 Foundation: The Complete Certification Guide` |
| `LESSON_FILE_NAME` | Lesson filename | `foundation-certification-guide.js` |
| `LESSON_PROMPT` | Learning prompt | `A comprehensive guide...` |
| `ACADEMY` | Academy ID | `tech` |
| `ACADEMY_DISPLAY_NAME` | Academy name | `Technology Academy` |

---

# Repository Structure

```
src/
└── academies/
    └── ${ACADEMY}/
        ├── academy.manifest.json
        ├── ${CATEGORY_ID}/
        │   ├── category.manifest.json
        │   └── topics/
        │       └── ${TOPIC_ID}/
        │           ├── topic.manifest.json
        │           └── lessons/
        │               └── ${LESSON_FILE_NAME}

src/config/
└── academyRegistry.ts
```

---

# Execution Workflow

## Phase 1 — Repository Inspection

Before making changes:

- Verify the academy exists.
- Verify the academy manifest exists.
- Verify the academy registry exists.
- Check for duplicate CATEGORY_ID.
- Check for duplicate TOPIC_ID.
- Check for duplicate LESSON_ID.
- Verify required folders exist.

If validation fails:

**STOP** and report the issue.

---

## Phase 2 — Create Category

Create

```
src/academies/${ACADEMY}/${CATEGORY_ID}/category.manifest.json
```

```json
{
  "id": "${CATEGORY_ID}",
  "shortName": "${SHORT_NAME}",
  "description": "${CATEGORY_DESCRIPTION}",
  "domain": "${DOMAIN}",
  "tags": [
    "${CATEGORY_ID}",
    "service-management",
    "certification"
  ],
  "route": "/category/${CATEGORY_ID}",
  "featured": true,
  "displayName": "${DISPLAY_NAME}",
  "academy": "${ACADEMY}",
  "topics": [
    "${TOPIC_ID}"
  ]
}
```

---

## Phase 3 — Create Topic

```
src/academies/${ACADEMY}/${CATEGORY_ID}/topics/${TOPIC_ID}/topic.manifest.json
```

```json
{
  "id": "${TOPIC_ID}",
  "category": "${CATEGORY_ID}",
  "displayName": "${TOPIC_DISPLAY_NAME}",
  "description": "${TOPIC_DESCRIPTION}",
  "academy": "${ACADEMY}",
  "lessons": [
    {
      "id": "${LESSON_ID}",
      "file": "lessons/${LESSON_FILE_NAME}"
    }
  ],
  "practice": [],
  "assessments": []
}
```

---

## Phase 4 — Create Lesson

```
src/academies/${ACADEMY}/${CATEGORY_ID}/topics/${TOPIC_ID}/lessons/${LESSON_FILE_NAME}
```

```javascript
import { defineLearningProblem } from '../../../../../problems/problemAuthoring.js';

const problem = defineLearningProblem({
  id: '${LESSON_ID}',
  category: '${CATEGORY_ID}',
  topicId: '${TOPIC_ID}',
  title: '${LESSON_DISPLAY_NAME}',
  difficulty: 'Medium',
  prompt: '${LESSON_PROMPT}',

  tags: [
    '${CATEGORY_ID}',
    'certification',
    'exam-guide'
  ],

  rendering: {
    variant: 'deep-dive',
    density: 'detailed',
    accent: 'blue'
  },

  body: [
    // Use supported components:
    // section
    // callout
    // checklist
    // table
    // code
    // image
    // quiz
  ],

  explanation:
    'A comprehensive guide to ${LESSON_DISPLAY_NAME}.',

  metadata: {
    reviewStatus: 'approved',
    visibility: ['dev', 'prod']
  }
});

export default problem;
```

---

## Phase 5 — Update Academy Manifest

Update

```
src/academies/${ACADEMY}/academy.manifest.json
```

Append the new category to the existing `categories` array.

Do **NOT** remove existing categories.

Do **NOT** reorder categories.

---

## Phase 6 — Update Academy Registry

Update

```
src/config/academyRegistry.ts
```

Append the category to:

```
categoryIds
```

Maintain the same ordering as
`academy.manifest.json`.

---

## Phase 7 — Regenerate Generated Files

Run

```bash
node scripts/generate-academy-manifest-imports.mjs
```

If necessary:

```bash
node --experimental-strip-types scripts/generate-academy-manifest-imports.mjs
```

---

## Phase 8 — Update Tests

Update

```
src/academies/catalog.test.js
```

Increase:

- category count
- topic count

Example

```javascript
assert.equal(techCatalog.categories.length, 9);
assert.equal(techCatalog.topics.length, 29);
```

---

## Phase 9 — Validation

Run

```bash
npm run test:unit
```

All tests must pass.

---

# Validation Rules

The AI must verify:

- CATEGORY_ID is unique.
- TOPIC_ID is unique.
- LESSON_ID is unique.
- CATEGORY_ID matches every manifest.
- TOPIC_ID matches:
  - topic.manifest.json
  - lesson.topicId
- LESSON_FILE_NAME matches the topic manifest.
- Lesson exports a default problem.
- Registry contains the category.
- Academy manifest contains the category.
- Registry ordering matches academy manifest.
- Generated imports are current.
- No unrelated files were modified.

---

# Common Failures

| Problem | Solution |
|----------|----------|
| Missing category manifest | Create manifest then regenerate imports |
| Missing topic manifest | Create topic manifest |
| Missing lesson | Verify file path and filename |
| Duplicate IDs | Stop and choose a different identifier |
| Registry mismatch | Synchronize academyRegistry.ts |
| Manifest mismatch | Synchronize academy.manifest.json |
| Generated imports stale | Run generator |
| Catalog tests fail | Update expected counts |
| Lesson file not found | Verify path matches topic manifest |

---

# Best Practices

- Use kebab-case for IDs.
- Keep IDs identical across all files.
- Preserve formatting.
- Preserve ordering.
- Make the smallest possible change.
- Never overwrite unrelated edits.
- Validate before generating files.
- Regenerate imports immediately after manifest changes.
- Run unit tests before completion.
- Produce a summary of changes.

---

# Failure Handling

If any required prerequisite is missing:

1. Stop.
2. Explain the problem.
3. Explain why work cannot continue.
4. Do not invent replacement files.
5. Wait for user input if the issue requires a decision.

---

# Completion Report

After successful execution, provide:

## Files Created

- category.manifest.json
- topic.manifest.json
- lesson file

## Files Modified

- academy.manifest.json
- academyRegistry.ts
- catalog.test.js

## Generated Files

- manifestImports.generated.js

## Validation

- ✅ Duplicate IDs checked
- ✅ Repository consistency verified
- ✅ Generated imports refreshed
- ✅ Unit tests passed

---

# Definition of Done

The category is fully integrated into the academy:

- Discoverable from the academy catalog.
- Registered in all manifests.
- Registered in the academy registry.
- Generated imports are current.
- The lesson loads successfully.
- All tests pass.
- No unrelated files were modified.