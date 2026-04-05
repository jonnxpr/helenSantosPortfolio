# OpenCode Instructions - Helen Santos Portfolio

OpenCode entry point aligned with GitHub Copilot VS Code, GitHub Copilot CLI, and Antigravity.

Canonical precedence: `.copilot/base-instructions.md` -> `CLAUDE.md` -> `.github/copilot-instructions.md`.

## Scope

- Applies to the whole repository tree.
- Use active files as the source of truth.
- Ignore generated artifacts unless the task targets them.
- This workspace is non-Java.
- Long-lived shared governance memory, reusable templates, and rollout notes now have a sibling repository: `C:\Users\jonathan.tavares\Documents\helen-santos-portfolio-governance`.

## Instruction loading strategy

- Keep `opencode.json` minimal: `PRE-FLIGHT.md`, `CLAUDE.md`, `AGENTS.md`.
- Load skills by task type instead of duplicating long instruction text.

## Integral instruction read (mandatory)

- Read all mandatory files from first line through last line.
- If the runtime returns only partial content, continue chunked reads until EOF.

## Hard preflight gate (mandatory)

1. Read all mandatory files for the active context.
2. Start the response with:
   - `Preflight OK: <file1>, <file2>, ...`

If anything mandatory is missing, reply only:

- `BLOCKED: preflight incompleto`

and provide one objective next step.

## Mandatory loading order

1. `.copilot/base-instructions.md`
2. `CLAUDE.md`
3. `.github/copilot-instructions.md`
4. `.github/instructions/*.instructions.md`
5. `.github/skills/development-standards/SKILL.md`
6. `.opencode/skills/development-standards/SKILL.md`
7. `.agent/skills/development-standards/SKILL.md`
8. `.agent/rules/development-standards.md`
9. `.github/skills/code-review/SKILL.md` or `.agent/skills/code-review/SKILL.md` when reviewing
10. `.github/skills/gh-operations/SKILL.md` or `.opencode/skills/gh-operations/SKILL.md` when handling GitHub/`gh` tasks
11. `.github/skills/testing-standards/SKILL.md` or `.opencode/skills/testing-standards/SKILL.md` when handling testing tasks

## Skill routing

- Implementation/refactor: `development-standards`.
- Review/PR: `development-standards` + `code-review`.
- Specification-driven workflow (`/speckit.*`, specification authoring, clarification, constitution, planning, tasks, analysis, or implementation from `specs/` artifacts): also load `.github/skills/speckit-workflow/SKILL.md` or `.opencode/skills/speckit-workflow/SKILL.md`.
- Frontend design-centric work: also load `.github/skills/frontend-design/SKILL.md` or `.opencode/skills/frontend-design/SKILL.md`.
- GitHub repository, workflow run, pull request, issue, release, or project-status work via `gh`: also load `.github/skills/gh-operations/SKILL.md` or `.opencode/skills/gh-operations/SKILL.md`.
- Build validation, smoke testing, regression, or automated test work: also load `.github/skills/testing-standards/SKILL.md` or `.opencode/skills/testing-standards/SKILL.md`.

## Speckit safe parity

- Repo-local Speckit assets live under `.specify/` and `specs/` inside this repository.
- OpenCode custom Speckit commands live under `.opencode/commands/`.
- Never let Speckit automation rewrite home-dir configs or unrelated governance files outside this repository.

## Task knowledge policy

- If `tasks/` exists, read `tasks/todo.md` and `tasks/lessons.md` before technical work.
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

## Commit-message rule (mandatory)

- Apply `.github/copilot-commit-message-instructions.md` for all commits.
- Use Conventional Commits format with PT-BR content.

## Context7 documentation policy (mandatory)

- Use Context7 before implementation, refactor, and review decisions.

## MCP credential discovery and connection consent (mandatory)

- Before connecting to any MCP server, request user confirmation and list the credential source(s) to be used (redacted; never print secret values).
- Discovery must include workspace/project files, OpenCode config, `.copilot/mcp-config.json`, VS Code `profiles/*/mcp.json`, `~/.gemini/antigravity/mcp_config.json`, and referenced environment variables such as `CONTEXT7_API_KEY`.
- If credentials are not found, report exactly: `credentials not found for requested MCP`.

## Mandatory multi-agent orchestration skill

- For non-trivial tasks, apply `orchestrate-multi-agents` before implementation and keep the `Template DAG 100% compliance`.
- For non-trivial tasks, instantiate the `Template DAG 100% compliance` from `orchestrate-multi-agents`; owners/tasks may be reduced only when not applicable, but mandatory gates cannot be removed.

## Mandatory final code review, cross-validation, and factual integrity

- No technical task is done without final review plus evidence-based cross-validation.

## Governance automation (mandatory)

- Secret scan: `./tools/governance/scan-secrets.ps1`
- Instruction sync: `python ./tools/governance/sync-instructions.py`
- Compliance audit: `python ./tools/governance/audit-compliance.py`
- Precedence audit: `python ./tools/governance/verify-precedence.py`
