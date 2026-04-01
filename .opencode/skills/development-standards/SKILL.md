---
name: development-standards
description: Consolidated technical memory for implementation and refactoring in the Helen Santos Portfolio workspace.
---

# Skill - development-standards (Helen Santos Portfolio)

## Intent

Technical memory for implementation and refactor in this workspace.

## Stack and architecture

- Static single-page site (`index.html`).
- CSS source: `css/styles.css`; artifact: `css/styles.min.css`.
- JS source modules: `js/navigation.js`, `js/i18n.js`, `js/animations.js`, `js/site-shell.js`, `js/hero.js`, `js/experience-flow.js`, `js/pillars.js`, `js/rituals.js`, `js/main.js`; artifact: `js/main.min.js`.
- Data sources: `data/site-shell.json`, `data/hero.json`, `data/i18n.json`, `data/experience-flow.json`, `data/pillars.json`, `data/rituals.json`.

## Rules

- Preserve existing UI language and interaction patterns.
- Keep semantic HTML and accessibility good practices.
- Keep JS simple, modular, and framework-free unless explicitly required.
- Avoid unnecessary dependencies.
- For CSS/JS source updates, regenerate minified files.

## Verification

- Run `npm run build` for CSS/JS changes.
- Run `npm start` and smoke-test affected sections on desktop and mobile viewport.

## Task knowledge

- If `tasks/` exists, read `tasks/todo.md` and `tasks/lessons.md` before technical tasks.
- If `tasks/` is missing, create `tasks/todo.md` and `tasks/lessons.md` before technical tasks and preserve the canonical top blocks.
- `tasks/lessons.md` must preserve the exact canonical top block.
- New lessons must be appended as dated entries below the template.
- Historical lessons must never be replaced by placeholders.
- `tasks/todo.md` must track the current non-trivial work with objective, execution plan, expected evidence, and status/result.

## Context7 policy (mandatory)

- Consult Context7 MCP for latest framework/library/language guidance before implementation/refactor/review.
- Prefer modern and suitable features when compatibility is verified against project constraints.

## Mandatory final code review, cross-validation, and factual integrity

- At the end of every implementation/refactor/fix, perform a final code review before marking the task complete.
- Cross-validation is mandatory and does not replace code review: validate outputs against at least two independent sources of evidence (for example tests/build logs, contract/docs, runtime behavior, or diff-based verification).
- Final approval requires both gates: (1) technical code review quality and (2) evidence-based cross-validation consistency.
- Review and cross-validation must verify correctness, security, performance, readability, test impact, and compatibility with existing architecture/contracts.
- It is allowed (and encouraged) to use internet sources and up-to-date documentation (including Context7 and official docs) to close knowledge gaps.
- Never invent facts, APIs, versions, behaviors, references, or validation results; if uncertain, verify first or explicitly state uncertainty.

## MCP credential discovery and connection consent (mandatory)

- When a task requests a specific MCP server, or when policy requires one (for example Context7), automatically attempt credential discovery before connecting.
- Search credential/config locations in this order:
  1. Workspace/project files: `mcp.json`, `.mcp.json`, `mcp_servers.json`, `.vscode/mcp.json`, `opencode.json`.
  2. OpenCode config: path from `OPENCODE_CONFIG` (if set), then user/global OpenCode config directories for this OS (for example `~/.config/opencode/opencode.json`, `~/.config/opencode/mcp/*.json`).
  3. VS Code user/profile MCP config for this OS: `%APPDATA%/Code/User/mcp.json` (Windows), `~/Library/Application Support/Code/User/mcp.json` (macOS), `~/.config/Code/User/mcp.json` (Linux).
  4. Antigravity/Gemini local config only when files exist and are documented for the active environment/project (for example `~/.gemini/settings.json`).
  5. Environment variables referenced by MCP configuration (`env`, `${VAR}`, `$VAR`, `%VAR%`).
- If credentials are not found, report exactly: `credentials not found for requested MCP`.
- Before connecting to any MCP server, request user confirmation and list the credential source(s) to be used (redacted; never print secret values).
- Never invent credential locations, tokens, API keys, or authentication results.

## Mandatory multi-agent orchestration skill

- For non-trivial tasks (multi-discipline scope, parallelizable work, broad refactor/migration, high inconsistency risk, or audit-heavy requirements), always apply `orchestrate-multi-agents` before implementation.
- OpenCode source of truth: `.opencode/skills/orchestrate-multi-agents/SKILL.md`.
- Antigravity/Copilot-compatible mirror: `.agent/skills/orchestrate-multi-agents/SKILL.md`.
- Minimum flow is mandatory: Execution Plan -> explicit handoffs -> dependency-gated parallelism -> DoD validation -> final consolidation with Decision Log.
- If the task is trivial/single-step, explicitly state why multi-agent orchestration is not required.
- For non-trivial tasks, instantiate the `Template DAG 100% compliance` from `orchestrate-multi-agents`; owners/tasks may be reduced only when not applicable, but mandatory gates cannot be removed.
