---
trigger: always_on
---

# Development Standards Rule - Helen Santos Portfolio

## Caveman Always-On (mandatory)

Terse like caveman. Technical substance exact. Only fluff die.
Drop: articles, filler (just/really/basically), pleasantries, hedging.
Fragments OK. Short synonyms. Code unchanged.
Pattern: [thing] [action] [reason]. [next step].
ACTIVE EVERY RESPONSE. No revert after many turns. No filler drift.
Code/commits/PRs: normal. Off: "stop caveman" / "normal mode".

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

## Plan persistence (mandatory)

- When a non-trivial plan is finalized (S1+ orchestration mode or 3+ steps), save it to `plans/plan-${camelCaseName}.prompt.md` in the owning repo.
- `plans/` captures rationale, context, constraints, and alternatives (the "why"). `tasks/todo.md` captures status tracking and checkboxes (the "what/when").
- Agents must read active plans from `plans/` before starting related work.
- After execution starts, plans are append-only. Mark status as `completed` when the corresponding `tasks/todo.md` objective is completed with evidence.

## Mandatory final code review, cross-validation, and factual integrity

- Apply the canonical final gate from `CLAUDE.md` before marking work complete.
