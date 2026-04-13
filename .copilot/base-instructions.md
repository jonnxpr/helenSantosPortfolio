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

## Integral instruction read (mandatory)

- Read all mandatory files from first line through last line.
- If the runtime returns only partial content, continue chunked reads until EOF.

## Preflight result (mandatory)

- Start every technical response with `Preflight OK: <file1>, <file2>, ...` listing every mandatory file read.
- If any mandatory file is missing or unreadable, reply only with `BLOCKED: preflight incompleto` and one objective next action.

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
- If `tasks/` exists, read `tasks/todo.md` and `tasks/lessons.md` fully before technical work.
- If `tasks/` is missing, create `tasks/todo.md` and `tasks/lessons.md` before technical work and preserve the canonical top blocks.
- `tasks/lessons.md` must preserve the exact canonical top block.
- New lessons must be appended as dated entries below the template.
- Historical lessons must never be replaced by placeholders.
- `tasks/todo.md` must track the current non-trivial work with objective, execution plan, expected evidence, and status/result.
- This is a non-Java workspace.

## Task-type skill routing

- Frontend design-centric work uses `.github/skills/frontend-design/SKILL.md` or `.opencode/skills/frontend-design/SKILL.md` when present.
- Build validation, smoke testing, regression, or automated test work uses `.github/skills/testing-standards/SKILL.md`, `.opencode/skills/testing-standards/SKILL.md`, or `.agent/skills/testing-standards/SKILL.md`.
- GitLab repository, pipeline, merge request, issue, release, or project-status work via `glab` uses `.github/skills/glab-operations/SKILL.md`, `.opencode/skills/glab-operations/SKILL.md`, or `.agent/skills/glab-operations/SKILL.md`.
- Specification-driven workflow tasks (`/speckit.*`, specification authoring, clarification, constitution, planning, tasks, analysis, or implementation from `specs/` artifacts) use `.github/skills/speckit-workflow/SKILL.md`, `.opencode/skills/speckit-workflow/SKILL.md`, or `.agent/skills/speckit-workflow/SKILL.md`.
- Local SonarQube work (scans, quality gates, hotspots, issue review, coverage, or `sonar-project.properties`) against `http://localhost:9001` uses `sonarqube-local`.

## Commit-message rule (mandatory)

- Apply `.github/copilot-commit-message-instructions.md` for all commits.
- Use Conventional Commits format with PT-BR content.

## Context7 documentation policy (mandatory)

- Use Context7 before implementation, refactor, and review work.

## MCP credential discovery and connection consent (mandatory)

- Before connecting to any MCP server, request user confirmation and list the credential source(s) to be used (redacted; never print secret values).
- Discovery must include `.copilot/mcp-config.json`, VS Code `profiles/*/mcp.json`, `~/.gemini/antigravity/mcp_config.json`, and referenced environment variables such as `CONTEXT7_API_KEY`.
- If credentials are not found, report exactly: `credentials not found for requested MCP`.

## Plan persistence (mandatory)

- When a non-trivial plan is finalized (S1+ orchestration mode or 3+ steps), save it to `plans/plan-${camelCaseName}.prompt.md` in the owning repo.
- `plans/` captures rationale, context, constraints, and alternatives (the "why"). `tasks/todo.md` captures status tracking and checkboxes (the "what/when").
- Agents must read active plans from `plans/` before starting related work.
- After execution starts, plans are append-only. Mark status as `completed` when the corresponding `tasks/todo.md` objective is completed with evidence.

## Mandatory multi-agent orchestration skill

- For non-trivial tasks, apply `orchestrate-multi-agents` and keep the `Template DAG 100% compliance`.
- For non-trivial tasks, instantiate the `Template DAG 100% compliance` from `orchestrate-multi-agents`; owners/tasks may be reduced only when not applicable, but mandatory gates cannot be removed.

## Mandatory final code review, cross-validation, and factual integrity

- Use the canonical final gate from `CLAUDE.md`; no technical task is done without final review plus validation evidence.

## Governance automation (mandatory)

- Secret scan: `./tools/governance/scan-secrets.sh`
- Instruction sync: `python3 ./tools/governance/sync-instructions.py`
- Compliance audit: `python3 ./tools/governance/audit-compliance.py`
