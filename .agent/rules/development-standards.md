---
trigger: always_on
---

# Development Standards Rule - Helen Santos Portfolio

## Canonical sources

- `.agent/skills/development-standards/SKILL.md` = detailed technical memory.
- `.github/instructions/*.instructions.md` = path-specific constraints.
- Source files and manifests = exact runtime truth.

## Always-on rules

- Preserve semantic structure, responsiveness, accessibility, and the premium sensory visual identity.
- Keep JS modular and avoid unnecessary dependencies.
- Keep minified artifacts aligned with source changes.
- Prefer the smallest safe change.

## Validation minima

- `npm run build` when source CSS/JS changes.
- Manual smoke test of the affected sections.

## Context7 documentation policy (mandatory)

- Use Context7 before implementation, refactor, and review decisions.

## Mandatory final code review, cross-validation, and factual integrity

- Apply the canonical final gate from `CLAUDE.md` before marking work complete.
