---
name: Preflight Gate
description: Mandatory preflight gate for all technical prompts
applyTo: "**"
---

# Hard preflight gate

- Read the mandatory files for the active context before technical output.
- Start the response with `Preflight OK: <file1>, <file2>, ...`.
- If preflight is incomplete, reply only `BLOCKED: preflight incompleto` and one objective next action.

## Integral instruction read (mandatory)

- Read all mandatory files from first line through last line.
- If the runtime returns only partial content, continue chunked reads until EOF.

## Speckit workflow (mandatory by context)

- For specification-driven workflow tasks (`/speckit.*`, specification authoring, clarification, constitution, planning, tasks, analysis, checklist, or implementation from `specs/` artifacts), apply `.github/skills/speckit-workflow/SKILL.md`, `.opencode/skills/speckit-workflow/SKILL.md`, or `.agent/skills/speckit-workflow/SKILL.md`.

## Mandatory final code review, cross-validation, and factual integrity

- Apply the canonical final gate from `CLAUDE.md` before marking work complete.
