---
paths:
  - "src/components/**"
  - "src/pages/**"
  - "src/styles/**"
  - "src/App.*"
  - "src/routes/**"
---

# Frontend UI/UX Rules

## General

This is a mobile-first learning platform.

When touching UI:

- preserve existing routes
- preserve existing progress behavior
- keep the core learning action easy to reach
- avoid hardcoded misleading counts
- avoid duplicated headings/copy
- prefer reusable components
- keep visual changes scoped

## Responsiveness

Validate mentally and manually for:

- mobile phone width
- tablet width
- desktop width

For Grade 1/CBC question cards, optimize for:

- question visible
- options visible
- navigation visible
- minimal scrolling
- large tappable controls

## Accessibility

Use accessible patterns:

- semantic buttons/links
- visible focus states where applicable
- readable contrast
- descriptive labels
- no click-only hidden behavior
- no relying on color alone for correctness

## Styling

Follow existing CSS organization.

Do not introduce Tailwind, CSS-in-JS, component libraries, or global resets unless explicitly requested.

Do not create one-off CSS classes when existing tokens/components can be reused.

## UI safety

Do not remove existing navigation elements unless the task explicitly says to remove them.

For CBC flows, be especially careful with:

- "All categories"
- "Back to Topic"
- top/bottom navigation arrows
- read-aloud controls
- progress indicators
- child-friendly copy