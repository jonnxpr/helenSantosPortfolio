---
description: Audit governance across all known workspaces until audits return zero findings.
---

## Governance Audit Loop

- Use this command from the repository root to audit the repo-local governance surfaces and contribute to the broader cross-workspace audit when needed.
- Reuse the existing local governance scripts as the audit authority whenever they exist.

## Analysis north star

Every invocation must answer, for all workspaces, projects, and tools:

> "Are there still any failures, gaps, loose ends, problems, or possible improvements in the architecture of instructions, skills, and governance for all workspaces, projects, and tools - OpenCode, GitHub Copilot VS Code, GitHub Copilot CLI, and Antigravity?"

Automated scripts alone cannot answer this question. A mandatory **Phase 0 deep qualitative inspection** must precede them.

## Full scope (all workspaces)

- `C:\Users\jonathan.tavares\workspace\ambiente-partner\projetos`
- `C:\Users\jonathan.tavares\workspace\ambiente-partner\partner-governance`
- `C:\Users\jonathan.tavares\Documents\meuagendamento`
- `C:\Users\jonathan.tavares\Documents\meuagendamento\backend`
- `C:\Users\jonathan.tavares\Documents\meuagendamento\frontend`
- `C:\Users\jonathan.tavares\Documents\meuagendamento\landingPage`
- `C:\Users\jonathan.tavares\Documents\caradhras-poc`
- `C:\Users\jonathan.tavares\Documents\Portfolio`
- `C:\Users\jonathan.tavares\Documents\HelenSantosPortfolio`
- Global non-versioned: `~/.config/opencode/`, `~/.copilot/`, `~/.agent/`

## Mandatory workflow

1. Answer the Analysis north star — invoke Phase 0 deep qualitative inspection before running any scripts. Read and inspect actual file content across all in-scope targets; do not just check presence.
2. Load `governance-audit-loop` and `orchestrate-multi-agents`.
3. Audit first; do not edit on the first pass.
4. Group the next smallest safe fix batch inside this repository and summarize it.
5. Ask for confirmation before each batch unless the user has already explicitly approved applying that batch in the current conversation.
6. Keep every write inside this repository.
7. Re-run the full Phase 0 qualitative inspection immediately after that batch: (a) re-read actual content of every file touched or affected by the batch; (b) re-answer all six Phase 0 questions for those surfaces (mandatory file presence and semantic correctness, skill routing completeness, preflight gate consistency, cross-tool parity gaps, mirror/hub consistency, and reader-visible issues the scripts cannot detect); (c) produce a fresh Phase 0 findings list **before** running any scripts. Then run the relevant Phase 1 scripts. The loop exits only when Phase 0 AND Phase 1 both return zero unresolved CRITICAL or WARNING findings.

## Default audit commands

- `python tools/governance/audit-compliance.py`
- `python tools/governance/verify-precedence.py`
- `python tools/governance/sync-instructions.py`

If the user includes `--dry-run`, stop after reporting findings and proposed batches.
