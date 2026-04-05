# Plan: Speckit v0.5.0 Bootstrap

Status: completed
Created: 2026-04-05

## Objective

Bootstrap safe-parity Speckit v0.5.0 assets inside `HelenSantosPortfolio` and
align the OpenCode, GitHub Copilot, and Gemini command surfaces without writing
outside this repository.

## Constraints

- Keep all writes inside `C:\Users\jonathan.tavares\Documents\HelenSantosPortfolio`.
- Reuse safe-parity assets from an existing static-site repository in this
  workspace.
- Keep GitHub issue export on `gh`; do not add MCP issue-write tooling.
- Update only the frontmatter of `.opencode/commands/speckit*.md`.

## Execution DAG

### T1 - Read mandatory context

- Output: preflight, repo instructions, rollout plan, README, and package
  context loaded.

### T2 - Bootstrap `.specify/`

- Output: templates, PowerShell scripts, repo-local context docs, and
  constitution created.

### T3 - Patch OpenCode commands

- Output: `.opencode/commands/speckit*.md` frontmatter aligned to repo-local
  PowerShell scripts.

### T4 - Mirror tool surfaces

- Output: `.github/prompts/`, `.github/agents/`, and `.gemini/commands/`
  synchronized from the OpenCode command content.

### T5 - Validate markers and parity

- Output: file presence checks, marker checks, and synchronization evidence.

## Validation Targets

- `create-new-feature.ps1` contains `AllowExistingBranch` and `DryRun`.
- `common.ps1` contains `hasMalformedTimestamp`.
- `.specify/templates/` contains 7 expected files including
  `vscode-settings.json`.
- `.specify/scripts/powershell/` contains the 5 expected scripts.
- `.github/prompts/`, `.github/agents/`, and `.gemini/commands/` each contain 9
  expected files.
- `.opencode/commands`, `.github/agents`, and `.gemini/commands` stay
  synchronized.
