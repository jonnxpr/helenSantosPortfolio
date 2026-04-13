---
name: Speckit Workflow Rules
description: Rules for safe-parity spec-driven workflow assets and tasks
applyTo: "specs/**,.specify/**,.opencode/commands/speckit*.md,.github/prompts/speckit*.prompt.md,.github/agents/speckit*.agent.md,.gemini/commands/speckit*.toml"
---

# Speckit workflow rules

- Load `.github/skills/speckit-workflow/SKILL.md` or `.opencode/skills/speckit-workflow/SKILL.md` for spec-driven tasks.
- Native discovery surfaces are tool-specific: OpenCode uses `.opencode/commands/`, GitHub Copilot uses `.github/prompts/` and `.github/agents/`, and Antigravity uses `.gemini/commands/`.
- Keep `.specify/`, `specs/`, and `.opencode/commands/` scoped to this repository.
- Never let Speckit automation rewrite home-dir configs or unrelated governance files.
- GitHub issue export for Speckit must use `gh`, not GitHub MCP issue writes.

## Mandatory final code review, cross-validation, and factual integrity

- Apply the canonical final gate from `CLAUDE.md` before marking work complete.
