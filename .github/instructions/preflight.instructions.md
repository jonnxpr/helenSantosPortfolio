---
name: Preflight Gate
description: Mandatory preflight gate for all technical prompts
applyTo: "**"
---

# Hard preflight gate

- Read the mandatory files for the active context before technical output.
- Start the response with `Preflight OK: <file1>, <file2>, ...`.
- If preflight is incomplete, reply only `BLOCKED: preflight incompleto` and one objective next action.

## Mandatory final code review, cross-validation, and factual integrity

- Apply the canonical final gate from `CLAUDE.md` before marking work complete.
