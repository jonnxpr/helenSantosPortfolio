# CLAUDE.md - Canonical Workflow (Helen Santos Portfolio)

Shared workflow for GitHub Copilot VS Code, GitHub Copilot CLI, OpenCode, and Antigravity.

Canonical precedence: `.copilot/base-instructions.md` -> `CLAUDE.md` -> `.github/copilot-instructions.md`.

> Gate: see PRE-FLIGHT.md — begin each response with `Preflight OK: ...` or `BLOCKED: preflight incompleto`

## Workflow orchestration

- Plan first for non-trivial work.
- Re-plan immediately when evidence changes.
- Prefer root-cause fixes and minimal impact.
- Verify before done, especially on desktop and mobile for UI work.

## Task management

- If `tasks/` exists, read `tasks/todo.md` and `tasks/lessons.md` before technical work.
- If `tasks/` is missing, create `tasks/todo.md` and `tasks/lessons.md` before technical work and preserve the canonical top blocks.
- Keep the plan updated during execution.
- `tasks/lessons.md` must preserve the exact canonical top block.
- New lessons must be appended as dated entries below the template.
- Historical lessons must never be replaced by placeholders.
- `tasks/todo.md` must track the current non-trivial work with objective, execution plan, expected evidence, and status/result.

## Plan persistence (mandatory)

- When a non-trivial plan is finalized (S1+ orchestration mode or 3+ steps), save it to `plans/plan-${camelCaseName}.prompt.md` in the owning repo.
- `plans/` captures rationale, context, constraints, and alternatives (the "why"). `tasks/todo.md` captures status tracking and checkboxes (the "what/when").
- Agents must read active plans from `plans/` before starting related work.
- After execution starts, plans are append-only. Mark status as `completed` when the corresponding `tasks/todo.md` objective is completed with evidence.

## Workspace technical context

- Static single-page site for Helen Santos with HTML, CSS, and vanilla JS modules.
- `data/*.json` files are the dynamic data sources.
- `npm run build` is the canonical verification for asset changes.

## Git repository context (mandatory)

- This workspace root is a git repository.
- If a task ever targets a nested repo instead, resolve it before git operations.

## Shared governance repository (mandatory context)

- Long-lived shared governance memory, reusable templates, and rollout notes now have a sibling repository: `C:\Users\jonathan.tavares\Documents\helen-santos-portfolio-governance`.
- This primary repository remains authoritative for product code, content, and repo-local AI assets.

## Context7 documentation policy (mandatory)

- Use Context7 before implementation, refactor, and review decisions.

## Speckit safe parity (mandatory)

- Keep Speckit writes inside this repository only.
- Use repo-local `.specify/`, `specs/`, and `.opencode/commands/` surfaces.
- Do not let Speckit automation rewrite home-dir configs or unrelated governance files.

## MCP credential discovery and connection consent (mandatory)

- Before connecting to any MCP server, request user confirmation and list the credential source(s) to be used (redacted; never print secret values).
- Discovery must include workspace/project files, OpenCode config, `.copilot/mcp-config.json`, VS Code `profiles/*/mcp.json`, `~/.gemini/antigravity/mcp_config.json`, and referenced environment variables such as `CONTEXT7_API_KEY`.
- If credentials are not found, report exactly: `credentials not found for requested MCP`.

## Mandatory multi-agent orchestration skill

- For non-trivial tasks, apply `orchestrate-multi-agents` before implementation and keep the `Template DAG 100% compliance`; owners/tasks may be reduced only when not applicable, but mandatory gates cannot be removed.

## Mandatory final code review, cross-validation, and factual integrity

- Every implementation, refactor, or fix ends with final code review plus evidence-based cross-validation.

## Governance automation (mandatory)

- Secret scan: `./tools/governance/scan-secrets.ps1`
- Instruction sync: `python ./tools/governance/sync-instructions.py`
- Compliance audit: `python ./tools/governance/audit-compliance.py`

## Orchestration Reference

- Operational matrix, modes, and parallelization rules:
  see ~/Documents/preflight-prompt/docs/orchestration-matrix.md
- Orchestration templates (S0-S4):
  see ~/Documents/preflight-prompt/docs/orchestration-templates.md
- validate-fast/full commands for this ecosystem:
  see ~/Documents/preflight-prompt/docs/validate-catalog.md
- Ownership registry for this ecosystem:
  see ~/Documents/helen-santos-portfolio-governance/docs/ownership-registry.md
