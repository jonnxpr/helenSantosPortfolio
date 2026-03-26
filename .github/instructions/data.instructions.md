---
name: Data Rules
description: Rules for projects JSON data changes
applyTo: "data/**"
---

# Data rules

- Keep `data/projects.json` valid JSON with stable schema.
- Keep numeric `id` values unique.
- Keep required fields present and URLs valid.
- After data changes, confirm the homepage renders cards correctly.

## Mandatory final code review, cross-validation, and factual integrity

- Apply the canonical final gate from `CLAUDE.md` before marking work complete.
