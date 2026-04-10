---
description: Audit governance across the repository until audits return zero findings.
---

# Governance Audit Loop

Revise tudo que foi feito, garanta que não haja falhas, problemas, brechas ou pontas soltas. Caso encontre problemas corrija. Faça este loop de verificar e corrigir de forma 100% autônoma. A condição de parada para o loop encerrar é não haver mais nenhum problema.

Only stop to request user input when there is destructive risk, real conflict, material ambiguity, unavoidable external block, or `--dry-run`.

## Mandatory workflow

1. Run Phase 0 deep qualitative inspection before any script.
2. Load `governance-audit-loop` and `orchestrate-multi-agents`.
3. Apply the next smallest safe fix batch inside this repository autonomously.
4. Keep every write inside this repository.
5. Re-run inspection and scripts.
6. Repeat until zero unresolved CRITICAL or WARNING findings remain.
