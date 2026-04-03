---
name: Helen Santos Portfolio Instructions
description: Global instructions for sensory static-site workflows
applyTo: "**"
---

# GitHub Copilot Instructions - Helen Santos Portfolio

This repository must stay consistent across OpenCode, GitHub Copilot VS Code, GitHub Copilot CLI, and Antigravity.

## Mandatory loading order

1. `.copilot/base-instructions.md`
2. `CLAUDE.md`
3. `.github/copilot-instructions.md`
4. `.github/instructions/*.instructions.md`
5. `.github/skills/development-standards/SKILL.md`
6. `.opencode/skills/development-standards/SKILL.md`
7. `.agent/skills/development-standards/SKILL.md`
8. `.agent/rules/development-standards.md`

## Hard preflight gate (mandatory)

Before any technical response:

1. Read every mandatory file for the active context.
2. Start the response with:
   - `Preflight OK: <file1>, <file2>, ...`

If preflight is incomplete, reply only:

- `BLOCKED: preflight incompleto`

and include one single objective action to unblock.

## Integral instruction read (mandatory)

- Read all mandatory files from first line through last line.
- If the runtime returns partial content, continue chunked reads until EOF.

## Tasks governance (mandatory)

- If `tasks/` exists, read `tasks/todo.md` and `tasks/lessons.md` fully before technical work.
- If `tasks/` is missing, create `tasks/todo.md` and `tasks/lessons.md` before technical work and preserve the canonical top blocks.
- `tasks/lessons.md` must preserve the exact canonical top block.
- New lessons must be appended as dated entries below the template.
- Historical lessons must never be replaced by placeholders.
- `tasks/todo.md` must track the current non-trivial work with objective, execution plan, expected evidence, and status/result.

## Plan persistence (mandatory)

- When a non-trivial plan is finalized (S1+ orchestration mode or 3+ steps), save it to `plans/plan-${camelCaseName}.prompt.md` in the owning repo.
- `plans/` captures rationale, context, constraints, and alternatives (the "why"). `tasks/todo.md` captures status tracking and checkboxes (the "what/when").
- Agents must read active plans from `plans/` before starting related work.
- After execution starts, plans are append-only. Mark status as `completed` when the corresponding `tasks/todo.md` objective is completed with evidence.

## Project context

- Static site with `index.html` entrypoint.
- Source CSS/JS changes must keep minified artifacts aligned.
- Keep payload small, semantic HTML strong, and responsiveness intact.
- This is a non-Java workspace.

## Shared governance repository (mandatory context)

- Long-lived shared governance memory, reusable templates, and rollout notes now have a sibling repository: `C:\Users\jonathan.tavares\Documents\helen-santos-portfolio-governance`.
- This primary repository remains authoritative for product code, content, repo-local instructions, and product automation.

## Context7 documentation policy (mandatory)

- Use Context7 before implementation, refactor, and review work.

## Frontend design skill (mandatory by context)

- For design-centric work, also apply `.github/skills/frontend-design/SKILL.md` or `.opencode/skills/frontend-design/SKILL.md`.

## Testing skill (mandatory by context)

- For build validation, smoke testing, regression, or automated test work, also apply `.github/skills/testing-standards/SKILL.md`, `.opencode/skills/testing-standards/SKILL.md`, or `.agent/skills/testing-standards/SKILL.md`.

## MCP credential discovery and connection consent (mandatory)

- Before connecting to any MCP server, request user confirmation and list the credential source(s) to be used (redacted; never print secret values).
- Discovery must cover workspace/project files, OpenCode config, `.copilot/mcp-config.json`, VS Code `profiles/*/mcp.json`, `~/.gemini/antigravity/mcp_config.json`, and referenced environment variables such as `CONTEXT7_API_KEY`.
- If credentials are not found, report exactly: `credentials not found for requested MCP`.

## Mandatory multi-agent orchestration skill

- For non-trivial tasks, apply `orchestrate-multi-agents` before implementation and keep the `Template DAG 100% compliance`.
- For non-trivial tasks, instantiate the `Template DAG 100% compliance` from `orchestrate-multi-agents`; owners/tasks may be reduced only when not applicable, but mandatory gates cannot be removed.

## Mandatory final code review, cross-validation, and factual integrity

- Use the canonical final gate from `CLAUDE.md`; no technical work is done without review plus independent validation evidence.

## Governance automation (mandatory)

- Secret scan: `./tools/governance/scan-secrets.ps1`
- Instruction sync: `python ./tools/governance/sync-instructions.py`
- Compliance audit: `python ./tools/governance/audit-compliance.py`
