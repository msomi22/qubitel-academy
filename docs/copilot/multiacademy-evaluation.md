# Copilot Implementation Instruction — Multi-Academy Evaluation Foundation

## Required Branch

```bash
feature/multiacademy-evaluation
```

## Objective

Implement the first safe foundation for the Qubitel Multi-Academy Platform while preserving the existing Senior Dev Accelerator behavior.

This work is based on the architecture/design document for the Qubitel Multi-Academy Platform, which defines the canonical model:

```text
Academy
└── Category
    └── Topic
        ├── Lessons
        ├── Practice
        └── Assessments
```

The current production experience must remain unchanged:

```text
https://academy.qubitel.net
```

The target architecture allows multiple independent learning academies from a single codebase. Each academy has its own subdomain, taxonomy, and content while sharing the same platform shell and data model.

## Important Migration Rule

Do **not** perform a big-bang rewrite.

The current codebase still uses:

```text
src/data/problems/
src/data/topicManifest.js
src/services/questionBankService.js
```

as the active content source.

The proposed future structure:

```text
src/academies/
```

is the target model, not the first refactor.

This implementation should introduce academy awareness gradually and safely.

---

## 1. Scope of This PR

### Implement

- Academy registry.
- Subdomain-to-academy detection.
- Active academy helper.
- Academy-aware storage key helper.
- Tests for academy detection and registry behavior.
- Documentation updates.

### Do Not Implement Yet

Do not:

- add CBC content;
- add Customer Experience content;
- move existing tech content into `src/academies/`;
- rewrite the router;
- rewrite the UI shell;
- move existing problems;
- split `topicManifest.js`;
- change existing category ids;
- change existing topic ids;
- change existing question ids;
- break existing routes.

---

## 2. Current Routes Must Continue Working

Verify these continue working exactly as before:

```text
/
/categories
/dsa
/system-design
/category/:categoryId
/random
/recent
/progress
/settings
/problem/:questionId
```

The default academy must remain Technology Academy / Senior Dev Accelerator.

---

## 3. Add Academy Registry

Create:

```text
src/config/academyRegistry.js
```

Suggested implementation:

```js
export const DEFAULT_ACADEMY_ID = 'tech';

export const academyRegistry = {
  tech: {
    id: 'tech',
    displayName: 'Technology Academy',
    productName: 'Senior Dev Accelerator',
    default: true,
    subdomains: ['academy.qubitel.net'],
    storageKey: 'senior-dev-accelerator:v2',
    categoryIds: [
      'dsa',
      'system',
      'java',
      'kubernetes-ckad',
      'aptitude',
      'ml-ai',
      'engineering-leadership'
    ]
  },

  cbc: {
    id: 'cbc',
    displayName: 'CBC Academy',
    productName: 'CBC Exam Practice',
    subdomains: ['cbc.academy.qubitel.net'],
    storageKey: 'senior-dev-accelerator:v2:cbc',
    categoryIds: []
  },

  'customer-experience': {
    id: 'customer-experience',
    displayName: 'Customer Experience Academy',
    productName: 'Customer Experience Academy',
    subdomains: ['cx.academy.qubitel.net'],
    storageKey: 'senior-dev-accelerator:v2:customer-experience',
    categoryIds: []
  }
};

export function getAcademyById(academyId = DEFAULT_ACADEMY_ID) {
  return academyRegistry[academyId] || academyRegistry[DEFAULT_ACADEMY_ID];
}

export function getDefaultAcademy() {
  return academyRegistry[DEFAULT_ACADEMY_ID];
}

export function getAcademies() {
  return Object.values(academyRegistry);
}
```

The tech academy must preserve the existing storage key:

```text
senior-dev-accelerator:v2
```

This avoids losing existing learner progress.

---

## 4. Add Academy Detection

Create:

```text
src/config/detectAcademy.js
```

Suggested implementation:

```js
import {
  DEFAULT_ACADEMY_ID,
  academyRegistry,
  getAcademyById
} from './academyRegistry.js';

export function detectAcademyIdFromHostname(hostname = '') {
  const normalized = String(hostname || '').toLowerCase();

  if (normalized.startsWith('cbc.')) return 'cbc';
  if (normalized.startsWith('cx.')) return 'customer-experience';

  const matchedAcademy = Object.values(academyRegistry).find((academy) =>
    (academy.subdomains || []).some((subdomain) => subdomain.toLowerCase() === normalized)
  );

  return matchedAcademy?.id || DEFAULT_ACADEMY_ID;
}

export function getActiveAcademy(hostname = globalThis?.location?.hostname || '') {
  return getAcademyById(detectAcademyIdFromHostname(hostname));
}
```

Required behavior:

```text
academy.qubitel.net              → tech
localhost                        → tech
preview / unknown domains         → tech
cbc.academy.qubitel.net          → cbc
cx.academy.qubitel.net           → customer-experience
```

---

## 5. Add Tests

Create tests in the existing project test style.

Preferred file:

```text
src/config/detectAcademy.test.js
```

Test cases:

```js
import assert from 'node:assert/strict';
import test from 'node:test';

import { detectAcademyIdFromHostname } from './detectAcademy.js';
import { getAcademyById } from './academyRegistry.js';

test('defaults to tech for localhost and unknown hosts', () => {
  assert.equal(detectAcademyIdFromHostname('localhost'), 'tech');
  assert.equal(detectAcademyIdFromHostname('preview.pages.dev'), 'tech');
  assert.equal(detectAcademyIdFromHostname('unknown.example.com'), 'tech');
});

test('detects tech academy from production host', () => {
  assert.equal(detectAcademyIdFromHostname('academy.qubitel.net'), 'tech');
});

test('detects CBC academy from subdomain', () => {
  assert.equal(detectAcademyIdFromHostname('cbc.academy.qubitel.net'), 'cbc');
});

test('detects Customer Experience academy from cx subdomain', () => {
  assert.equal(detectAcademyIdFromHostname('cx.academy.qubitel.net'), 'customer-experience');
});

test('returns default academy for unknown id', () => {
  assert.equal(getAcademyById('missing').id, 'tech');
});
```

If the project uses Vitest instead of `node:test`, adapt to the existing convention.

---

## 6. Add Academy-Aware Storage Helper

Do not rewrite `storageService.js` in this PR unless the change is tiny and safe.

Create:

```text
src/config/academyStorage.js
```

Suggested implementation:

```js
import { getActiveAcademy } from './detectAcademy.js';

export function getAcademyStorageKey(hostname) {
  return getActiveAcademy(hostname).storageKey;
}
```

Future PRs can update `siteConfig.storageKey` or `storageService` to use this helper.

For this PR, preserve existing storage behavior for tech.

---

## 7. Optional Academy Hook

Only add this if it stays small.

Possible file:

```text
src/hooks/useAcademy.js
```

Suggested implementation:

```js
import { useMemo } from 'react';
import { getActiveAcademy } from '../config/detectAcademy.js';

export function useAcademy() {
  return useMemo(() => getActiveAcademy(), []);
}
```

Do not wire this deeply through the app yet.

---

## 8. Do Not Fully Implement `src/academies/` Yet

The architecture document proposes the future structure:

```text
src/
└── academies/
    ├── tech/
    ├── cbc/
    └── customer-experience/
```

Do not create the full structure in this PR.

If useful, create only:

```text
src/academies/README.md
```

Content:

```md
# Academies

Target home for future academy-scoped content.

Do not move existing content here until the academy registry, content loader, and migration strategy are stable.
```

---

## 9. Update Documentation

Update or create:

```text
docs/architecture/current-structure-and-multi-academy-plan.md
```

Ensure it clearly states:

- Academy is an internal platform boundary.
- Academy is selected by subdomain.
- Learners do not normally choose academy manually.
- Category is the first major grouping visible to learners.
- Topic contains Lessons, Practice, and Assessments.
- Use lowercase kebab-case for folders, ids, routes, and manifest keys.
- The current active source remains existing manifests and `src/data/problems/` until migration.

---

## 10. Naming Rules

Use display names for UI:

```text
Technology Academy
CBC Academy
Customer Experience Academy
Grade 3
Customer Support
Complaint Handling
Sliding Window
```

Use safe ids for code:

```text
tech
cbc
customer-experience
grade-3
customer-support
complaint-handling
sliding-window
```

Never use spaces in:

- folder names;
- route segments;
- ids;
- manifest keys.

---

## 11. Future Target Structure

Document but do not fully implement yet:

```text
src/
└── academies/
    ├── tech/
    │   ├── academy.manifest.json
    │   └── dsa/
    │       ├── category.manifest.json
    │       └── sliding-window/
    │           ├── topic.manifest.json
    │           ├── lessons/
    │           ├── practice/
    │           └── assessments/
    │
    ├── cbc/
    │   ├── academy.manifest.json
    │   └── grade-3/
    │       ├── category.manifest.json
    │       └── english/
    │           ├── topic.manifest.json
    │           ├── lessons/
    │           ├── practice/
    │           └── assessments/
    │
    └── customer-experience/
        ├── academy.manifest.json
        └── customer-support/
            ├── category.manifest.json
            └── complaint-handling/
                ├── topic.manifest.json
                ├── lessons/
                ├── practice/
                └── assessments/
```

---

## 12. Manual Validation

After implementation, run:

```bash
npm run test:unit
npm run build
```

Manually verify:

```text
/ loads the existing Senior Dev Accelerator dashboard.
/categories loads existing tech categories.
/category/dsa works.
/problem/:questionId works.
/random works.
/recent works.
/progress works.
/settings works.
```

No CBC or Customer Experience category should appear yet.

---

## 13. Acceptance Criteria

- Branch is `feature/multiacademy-evaluation`.
- `academyRegistry.js` exists.
- `detectAcademy.js` exists.
- Default academy is tech.
- CBC hostname resolves to `cbc`.
- CX hostname resolves to `customer-experience`.
- Unknown hostnames resolve to tech.
- Existing routes still work.
- Existing storage behavior for tech is preserved.
- No content has been moved.
- No category ids changed.
- No topic ids changed.
- No question ids changed.
- Tests pass.
- Build passes.
- Documentation explains the hierarchy clearly.

---

## 14. Suggested Commit Message

```bash
git commit -m "feat: add multi-academy detection foundation"
```

---

## 15. Suggested PR Title

```text
#261 — Add multi-academy detection foundation
```

---

## 16. Suggested PR Summary

```md
## Summary

Adds the first safe foundation for the multi-academy platform architecture.

This PR introduces:

- academy registry
- hostname-based academy detection
- academy storage-key helper
- tests for academy detection
- documentation updates

No visible application behavior changes are intended.

## Validation

- npm run test:unit
- npm run build

## Notes

The existing Senior Dev Accelerator experience remains the default for `academy.qubitel.net`, localhost, and unknown hosts.

CBC and Customer Experience academies are registered but not yet exposed with content.
```

---

## 17. Important Reminder

This PR is the foundation only.

Do not implement the full multi-academy content loader, CBC exam mode, Customer Experience content, or PDF export in this PR.

Those should be separate child issues after the registry and detection layer is stable.
