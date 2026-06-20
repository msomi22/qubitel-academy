# Testing and Validation Rules

## Commands

Use the repo scripts.

Common validation:

```bash
npm run test:unit
npm run build
```


Other available scripts:

npm run dev
npm run preview
npm run test
npm run test:integration
npm run test:ci
npm run generate:academy-manifests
When to run what

Run npm run test:unit when touching:

problem authoring helpers
academy config
manifests
services
utils
content discovery
scoring
route/config logic

Run npm run build when touching:

React components
pages
routes
CSS
imports/exports
manifests
production-visible content

Run npm run generate:academy-manifests when adding or changing manifest-declared academy content if generated imports are part of the workflow.

Reporting

Always report:

commands run
pass/fail result
skipped commands and reason
manual validation performed

Do not say "all tests pass" unless the commands were actually run successfully.
