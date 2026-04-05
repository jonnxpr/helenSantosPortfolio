# PRE-FLIGHT - Helen Santos Portfolio

Hard gate before any technical answer across OpenCode, GitHub Copilot VS Code, GitHub Copilot CLI, and Antigravity.

## Mandatory checklist

1. Read `.copilot/base-instructions.md`.
2. Read `CLAUDE.md`.
3. Read `.github/copilot-instructions.md`.
4. Read applicable `.github/instructions/*.instructions.md`.
5. Read `.agent/skills/development-standards/SKILL.md`.
6. Read `.agent/rules/development-standards.md`.
7. For review/PR, also read `.agent/skills/code-review/SKILL.md`.
8. For commit creation or commit message generation, read `.github/copilot-commit-message-instructions.md`.
9. If `tasks/` exists, read `tasks/todo.md` and `tasks/lessons.md` fully; if `tasks/` is missing, create both with the canonical templates before technical work.
10. This workspace is non-Java; do not run Java/Maven/Gradle builds here.
11. Before implementation/refactor/review, consult Context7.
12. For frontend design-centric tasks, also load `.github/skills/frontend-design/SKILL.md` or `.opencode/skills/frontend-design/SKILL.md`.
13. For GitHub repository, workflow run, pull request, issue, release, or project-status tasks via `gh`, also load `.github/skills/gh-operations/SKILL.md` or `.opencode/skills/gh-operations/SKILL.md`.
14. For GitLab repository, pipeline, merge request, issue, release, or project-status tasks via `glab`, also load `.github/skills/glab-operations/SKILL.md` or `.opencode/skills/glab-operations/SKILL.md`.
15. For specification-driven workflow tasks (`/speckit.*`, specification authoring, clarification, constitution, planning, tasks, analysis, checklist, or implementation from `specs/` artifacts), also load `.github/skills/speckit-workflow/SKILL.md` or `.opencode/skills/speckit-workflow/SKILL.md`.
16. Git Repository Discovery (MANDATORY):
    - If workspace root is not a git repo, run `scripts/discover-git-repo.ps1`.
    - Use the discovered repo for git operations.

## Integral read requirement (mandatory)

- Read all mandatory instruction files fully.
- If output is partial, continue chunked reads until EOF.
- Preflight is incomplete while any mandatory file is partially read.

## Proof line format (mandatory)

Start the response with exactly:

- `Preflight OK: <file1>, <file2>, ...`

## Failure behavior (mandatory)

If checklist is incomplete, reply only:

- `BLOCKED: preflight incompleto`

Then include one single objective next action to unblock.

## Tasks governance (mandatory)

- If `tasks/` exists, read `tasks/todo.md` and `tasks/lessons.md` fully before technical work.
- If `tasks/` is missing, create `tasks/todo.md` and `tasks/lessons.md` before technical work and preserve the canonical top blocks.
- `tasks/lessons.md` must preserve the exact canonical top block.
- New lessons must be appended as dated entries below the template.
- Historical lessons must never be replaced by placeholders.
- `tasks/todo.md` must track the current non-trivial work with objective, execution plan, expected evidence, and status/result.

## Context7 documentation policy (mandatory)

- Use Context7 for implementation, refactor, and review decisions.

## Shared governance repository (mandatory context)

- Long-lived shared governance memory, reusable templates, and rollout notes now have a sibling repository: `C:\Users\jonathan.tavares\Documents\helen-santos-portfolio-governance`.
- This primary repository remains authoritative for product code, content, repo-local instructions, and product automation.

## MCP credential discovery and connection consent (mandatory)

- Before connecting to any MCP server, request user confirmation and list the credential source(s) to be used (redacted; never print secret values).
- Discovery order must cover workspace/project files, OpenCode config, `.copilot/mcp-config.json`, VS Code `profiles/*/mcp.json`, `~/.gemini/antigravity/mcp_config.json`, and referenced environment variables such as `CONTEXT7_API_KEY`.
- If credentials are not found, report exactly: `credentials not found for requested MCP`.

## Mandatory multi-agent orchestration skill

- For non-trivial tasks, apply `orchestrate-multi-agents` before implementation and keep the `Template DAG 100% compliance`.
- For non-trivial tasks, instantiate the `Template DAG 100% compliance` from `orchestrate-multi-agents`; owners/tasks may be reduced only when not applicable, but mandatory gates cannot be removed.

## Mandatory final code review, cross-validation, and factual integrity

- Technical work is complete only after final code review plus evidence-based cross-validation.

## Governance automation (mandatory)

- Secret scan: `./tools/governance/scan-secrets.ps1`
- Instruction sync: `python ./tools/governance/sync-instructions.py`
- Compliance audit: `python ./tools/governance/audit-compliance.py`
