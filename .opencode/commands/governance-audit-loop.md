---
description: Audit and harden the Helen Santos Portfolio governance surfaces until the local governance audits return zero findings.
---

## Helen Santos Portfolio Governance Audit Loop

- Use this command from the repository root to audit the repo-local governance surfaces.
- Reuse the existing local governance scripts as the audit authority whenever they exist.

## Mandatory workflow

1. Load `governance-audit-loop` and `orchestrate-multi-agents`.
2. Audit first; do not edit on the first pass.
3. Group the next smallest safe fix batch inside this repository and summarize it.
4. Ask for confirmation before each batch unless the user has already explicitly approved applying that batch in the current conversation.
5. Keep every write inside this repository.
6. Repeat until the relevant audits are green or a real blocker remains.

## Default audit commands

- `python tools/governance/audit-compliance.py`
- `python tools/governance/verify-precedence.py`
- `python tools/governance/sync-instructions.py`

If the user includes `--dry-run`, stop after reporting findings and proposed batches.
