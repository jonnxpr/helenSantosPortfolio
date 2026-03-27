# Copilot Base Instructions - Helen Santos Portfolio

## Purpose

Universal behavior and quality standards for the `HelenSantosPortfolio` workspace.

## Mandatory hierarchy

1. `.copilot/base-instructions.md`
2. `CLAUDE.md`
3. `.github/copilot-instructions.md`
4. `.github/instructions/*.instructions.md`
5. `.github/skills/development-standards/SKILL.md`
6. `.opencode/skills/development-standards/SKILL.md`
7. `.agent/skills/development-standards/SKILL.md`
8. `.agent/rules/development-standards.md`

## Cross-tool contract

- Keep the same semantics across GitHub Copilot VS Code, GitHub Copilot CLI, OpenCode, and Antigravity.
- Use active files as the source of truth.
- Prefer short canonical instructions over repeated text.

## Expected behavior

- Preserve the established premium sensory visual identity.
- Prefer the smallest safe change.
- Keep semantic HTML, accessibility, and responsive behavior.
- Keep vanilla JS modular and keep `data/*.json` schema stable.

## Operational compatibility

- Mandatory instruction files must be read completely.
- If `tasks/` exists, read `tasks/todo.md` and `tasks/lessons.md`; if `tasks/` is missing, create both first.
- This is a non-Java workspace.

## Task-type skill routing

- Build validation, smoke testing, regression, or automated test work uses `.github/skills/testing-standards/SKILL.md`, `.opencode/skills/testing-standards/SKILL.md`, or `.agent/skills/testing-standards/SKILL.md`.

## Context7 documentation policy (mandatory)

- Use Context7 before implementation, refactor, and review work.

## MCP credential discovery and connection consent (mandatory)

- Before connecting to any MCP server, request user confirmation and list the credential source(s) to be used (redacted; never print secret values).
- Discovery must include `.copilot/mcp-config.json`, VS Code `profiles/*/mcp.json`, `~/.gemini/antigravity/mcp_config.json`, and referenced environment variables such as `CONTEXT7_API_KEY`.

## Mandatory multi-agent orchestration skill

- For non-trivial tasks, apply `orchestrate-multi-agents` and keep the `Template DAG 100% compliance`.
- For non-trivial tasks, instantiate the `Template DAG 100% compliance` from `orchestrate-multi-agents`; owners/tasks may be reduced only when not applicable, but mandatory gates cannot be removed.

## Mandatory final code review, cross-validation, and factual integrity

- Use the canonical final gate from `CLAUDE.md`; no technical task is done without final review plus validation evidence.

## Governance automation (mandatory)

- Secret scan: `./tools/governance/scan-secrets.ps1`
- Instruction sync: `python ./tools/governance/sync-instructions.py`
- Compliance audit: `python ./tools/governance/audit-compliance.py`
