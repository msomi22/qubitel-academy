---
paths:
  - "src/assets/**"
  - "public/**"
  - "src/**/*.css"
  - "src/pages/**"
  - "src/components/**"
---

# Assets and Performance Rules

## Performance priorities

Keep the learning experience fast as content grows.

Prefer:

- lazy loading where existing patterns use it
- manifest-based loading
- lightweight metadata for home/progress surfaces
- progressive rendering
- reduced expensive effects on repeated cards

## Images

When working on images:

- do not crop, stretch, or resize unless explicitly requested
- preserve visual intent
- optimize file size where needed
- prefer existing asset folder conventions
- update imports/references safely
- verify build after image import changes

## CSS and visual effects

Avoid heavy repeated effects on cards.

Be careful with:

- large box shadows
- repeated animations
- expensive filters
- oversized background images
- layout shifts

## Production safety

Do not add huge assets without checking their impact.

Do not remove existing assets unless all references are updated and build passes.
