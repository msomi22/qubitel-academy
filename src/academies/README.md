# Academies

This directory is the active source of truth for academy catalogs and authored content.

## Runtime Rules

- `academy.manifest.json` exposes the academy's active categories.
- `category.manifest.json` exposes the category's active topics.
- `topic.manifest.json` exposes active `lessons`, `practice`, and `assessments`.
- Content files that are not declared by a topic manifest are not discovered.
- Run `npm run generate:academy-manifests` after adding or removing a manifest.
- Keep new authored content out of `_legacy`; that folder exists only for compatibility banks.

CBC and Customer Experience remain registered skeletons with empty academy category arrays, so they are not learner-facing yet.
