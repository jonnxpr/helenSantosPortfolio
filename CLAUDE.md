# CLAUDE.md - Canonical Workflow (Helen Santos Portfolio)

Shared workflow for GitHub Copilot VS Code, GitHub Copilot CLI, OpenCode, and Antigravity.

Canonical precedence: `.copilot/base-instructions.md` -> `CLAUDE.md` -> `.github/copilot-instructions.md`.

## Workflow orchestration

- Plan first for non-trivial work.
- Re-plan when evidence changes.
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

## MCP credential discovery and connection consent (mandatory)

- Before connecting to any MCP server, request user confirmation and list the credential source(s) to be used (redacted; never print secret values).
- Discovery must include workspace/project files, OpenCode config, `.copilot/mcp-config.json`, VS Code `profiles/*/mcp.json`, `~/.gemini/antigravity/mcp_config.json`, and referenced environment variables.

## Mandatory multi-agent orchestration skill

- For non-trivial tasks, apply `orchestrate-multi-agents` before implementation and keep the `Template DAG 100% compliance`.
- For non-trivial tasks, instantiate the `Template DAG 100% compliance` from `orchestrate-multi-agents`; owners/tasks may be reduced only when not applicable, but mandatory gates cannot be removed.

## Mandatory final code review, cross-validation, and factual integrity

- Every implementation, refactor, or fix ends with final code review plus evidence-based cross-validation.

## Governance automation (mandatory)

- Secret scan: `./tools/governance/scan-secrets.ps1`
- Instruction sync: `python ./tools/governance/sync-instructions.py`
- Compliance audit: `python ./tools/governance/audit-compliance.py`

## Orchestration Reference

- Operational matrix, modes, and parallelization rules:
  see preflight-prompt/docs/orchestration-matrix.md
- Orchestration templates (S0-S4):
  see preflight-prompt/docs/orchestration-templates.md
- validate-fast/full commands for this ecosystem:
  see preflight-prompt/docs/validate-catalog.md
- Ownership registry for this ecosystem:
  see helen-santos-portfolio-governance/docs/ownership-registry.md
