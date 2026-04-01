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

## Tasks governance (mandatory)

- Read `tasks/todo.md` and `tasks/lessons.md` fully before technical work when `tasks/` exists.
- If `tasks/` is missing, create `tasks/todo.md` and `tasks/lessons.md` before technical work and preserve the canonical top blocks.
- `tasks/lessons.md` must preserve the exact canonical top block.
- New lessons must be appended as dated entries below the template.
- Historical lessons must never be replaced by placeholders.
- `tasks/todo.md` must track the current non-trivial work with objective, execution plan, expected evidence, and status/result.

## Context7 documentation policy (mandatory)

- Use Context7 before implementation, refactor, and review decisions.

## Mandatory final code review, cross-validation, and factual integrity

- Apply the canonical final gate from `CLAUDE.md` before marking work complete.
