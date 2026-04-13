---
name: orchestrate-multi-agents
description: Consolidated orchestration memory for complex multi-agent execution with planning, dependency control, quality gates, and auditable delivery.
---


# Skill: Orchestrate Multi-Agents (Orquestracao de Multi Agentes)

## Objective
Orchestrate multiple specialist agents to deliver complex work with: clear decomposition, dependency-aware parallelism, strict quality gates, security-by-default, and auditable final consolidation.

## Activation criteria (use when 2+ signals are true)
- Multi-discipline scope (backend + frontend + infra + docs + data).
- Parallelizable task graph.
- High inconsistency risk (broad change, migration, refactor).
- Auditability/traceability requirement.
- Non-trivial constraints (security, performance, compatibility, standards).

## Inputs required before orchestration
- Project context: stack, architecture boundaries, repository conventions.
- Final objective: what must exist at completion.
- Constraints: versions, libraries, compatibility, scope/time limits.
- Acceptance criteria: build/lint/tests/behavior examples.
- Optional evidence: affected files, logs, errors, issue/PR links.

## Mandatory outputs
- Execution Plan (tasks, owners, dependencies, outputs, acceptance criteria).
- Definition of Done (DoD) and quality gate results.
- Decision Log (initial + deltas).
- Per-agent evidence: what/why/how validated.
- Final consolidation: changes, test commands, risks, next steps.

## Agent roles (instantiate only what is needed)
1. Orchestrator (lead): decomposition, delegation, integration, DoD ownership.
2. Architect/Tech Lead: design, contracts, domain boundaries, trade-offs.
3. Implementer: code changes aligned with repository standards.
4. QA/Tester: validation strategy, reproducibility, regression checks.
5. Security/Compliance: secrets/auth/permissions/sensitive logs/OWASP checks.
6. Docs/Release: docs, changelog, rollout and rollback guidance.

## Orchestration rules (mandatory)

### A) Structured handoff contract
Every handoff must include:
1. Minimum context (what/why).
2. Exact scope + explicit out-of-scope.
3. Inputs (files/classes/endpoints/commands).
4. Acceptance criteria.
5. Output format (patch, checklist, test output, risks).

### B) Dependency-first parallelism
- Represent work as a DAG (T1..Tn with dependencies).
- Run independent tasks in parallel.
- Start dependent tasks only after validated green signal.
- Preserve idempotency (safe to retry without duplicate side effects).

### C) Repository conventions win
- Respect repository standards for architecture, lint, formatting, test style, and commit policy.
- If a convention is unclear, use the most conservative assumption and record it in Decision Log.

### D) Quality, safety, and risk gates
Nothing is done without:
- Build/lint when applicable.
- Tests (at least smoke tests) or explicit evidence-backed justification.
- Security baseline review for auth/secrets/I-O/logging changes.
- Documentation minimum: how to run/test/rollback.

### E) Human-in-the-loop checkpoints
Require explicit human approval before:
- Production-impacting or irreversible actions.
- Security-sensitive changes.
- Changes with critical/unknown blast radius.
Use staged flow: propose -> review -> approve -> execute.

### F) Termination and loop safety
- Define completion and stop conditions before execution.
- Include max iteration / max message guardrails for review loops.
- Escalate when confidence is low or conflicting outputs persist.

### G) Observability and traceability
- Keep Decision Log updated with major assumptions, trade-offs, and reversals.
- Keep command/test evidence concise and reproducible.
- Keep file-level traceability for each agent output.

### H) Tool and permission hygiene
- Principle of least privilege: each agent uses only required tools/data.
- Never expose secrets in outputs.
- Mask sensitive values in logs and summaries.

### I) Validation hierarchy
1. Static checks (lint/types/contracts).
2. Unit/component validation.
3. Integration/smoke validation.
4. Security checks relevant to touched surface.
5. Final consistency review across all touched modules.

### J) Integration policy
- Resolve conceptual conflicts first (contracts, naming, invariants).
- Avoid parallel edits to same file without explicit sequencing.
- Ensure cross-module compatibility before finalization.

## Orchestrator algorithm
1. Restate objective in one paragraph.
2. List constraints and risks.
3. Build DAG plan (owner, dependency, expected output, acceptance criteria per task).
4. Dispatch explicit handoffs.
5. Validate each return; if failed, return delta feedback with exact correction.
6. Integrate approved outputs.
7. Run DoD checklist.
8. Deliver final consolidation package.

## Definition of Done checklist
- [ ] Build/compile passes (or N/A with justification)
- [ ] Lint/format checks pass (or N/A)
- [ ] Tests pass (or justified limitation + risk)
- [ ] Security baseline reviewed for touched surfaces
- [ ] Documentation/run-test instructions updated
- [ ] No undocumented breaking change
- [ ] Decision Log updated
- [ ] Final result includes risks and next steps

## Templates

### Execution Plan
- Objective:
- Constraints:
- Risks:
- Tasks:
  - T1 [Owner]:
    - Depends on:
    - Output:
    - Acceptance criteria:
  - T2 [Owner]:
- Definition of Done:
- Decision Log:
  - D1:

### Handoff
- Task:
- Context:
- Scope (do):
- Out of scope (do not):
- Inputs/References:
- Acceptance criteria:
- Response format:

### Agent return
- What was done:
- Files changed/snippets:
- How to validate:
- Evidence:
- Risks/limitations:

## Anti-patterns (forbidden)
- One-agent execution for broad/high-risk scope without orchestration.
- Task without owner/dependency/acceptance criteria.
- Parallel edits in same file without coordination.
- Completion without objective evidence.
- Decisions not recorded (causes rework).
- Premature irreversible action without approval checkpoint.

## External knowledge policy
- For framework/library decisions, verify current official docs (Context7 and official sources) before final implementation decisions.
- Prefer compatibility-safe modernization over speculative upgrades.

## Mandatory final code review, cross-validation, and factual integrity

- At the end of every implementation/refactor/fix, perform a final code review before marking the task complete.
- Cross-validation is mandatory and does not replace code review: validate outputs against at least two independent sources of evidence (for example tests/build logs, contract/docs, runtime behavior, or diff-based verification).
- Final approval requires both gates: (1) technical code review quality and (2) evidence-based cross-validation consistency.
- Review and cross-validation must verify correctness, security, performance, readability, test impact, and compatibility with existing architecture/contracts.
- It is allowed (and encouraged) to use internet sources and up-to-date documentation (including Context7 and official docs) to close knowledge gaps.
- Never invent facts, APIs, versions, behaviors, references, or validation results; if uncertain, verify first or explicitly state uncertainty.

## Template DAG 100% compliance (orchestrate-multi-agents)

Use this block in non-trivial tasks to fully satisfy orchestration rules.

### Practical recommendation (mandatory)

- This DAG template is mandatory for non-trivial tasks.
- Owners/tasks can be reduced only when not applicable to the active scope, but mandatory gates cannot be removed.
- Mandatory gates that must always remain: structured handoff, dependency-gated parallelism, human-in-the-loop checkpoints, DoD checklist, validation hierarchy (cross-validation), final code review and final consolidation package.

### 1) Objective

- Final objective (measurable):
- Mandatory deliverables:

### 2) Constraints and Risks

- Technical constraints (stack/version/architecture/contracts):
- Scope and timeline constraints:
- Main risks (with impact):

### 3) Inputs before orchestration

- Project context (architecture and conventions):
- Acceptance criteria:
- Initial evidence (logs/errors/affected files):

### 4) Execution Plan (DAG)

- T1 [Owner: Orchestrator]
  - Depends on: none
  - Output: scope/contracts/risk map
  - Acceptance criteria: scope closed + risks prioritized
- T2 [Owner: Architect/Tech Lead]
  - Depends on: T1
  - Output: design/contract decisions and trade-offs
  - Acceptance criteria: contracts defined without undocumented breaking changes
- T3 [Owner: Implementer Backend]
  - Depends on: T2
  - Output: backend patch
  - Acceptance criteria: backend compile/test green and contract preserved
- T4 [Owner: Implementer Frontend]
  - Depends on: T2
  - Output: frontend patch
  - Acceptance criteria: frontend build/test green and contract consumption synchronized
- T5 [Owner: Security/Compliance]
  - Depends on: T3, T4
  - Output: security checklist (auth/secrets/logs/I-O)
  - Acceptance criteria: no new unmitigated critical/high risk
- T6 [Owner: QA/Tester]
  - Depends on: T3, T4, T5
  - Output: reproducible validation evidence
  - Acceptance criteria: static validation + unit + smoke/integration
- T7 [Owner: Docs/Release]
  - Depends on: T6
  - Output: updated docs for run/test/rollback + residual risks
  - Acceptance criteria: reproducible instructions and clear rollback plan

### 5) Dependency-gated parallelism

- Parallel allowed: T3 and T4 (only after T2 approved).
- Mandatory block: T5 starts only after T3+T4 completed.
- Mandatory block: T6 starts only after T5 completed.
- Mandatory block: T7 starts only after T6 completed.
- Integration rule: avoid parallel edits in the same file without explicit sequencing.

### 6) Structured handoff contract (for each task)

- Minimum context (what/why).
- Exact scope + out-of-scope.
- Inputs/references (files/endpoints/commands).
- Acceptance criteria.
- Output format (patch/checklist/evidence/risks).

### 7) Human-in-the-loop checkpoints

- Require human approval before:
  - irreversible action or production-impacting action;
  - security-sensitive change;
  - change with critical/uncertain blast radius.
- Mandatory flow: propose -> review -> approve -> execute.

### 8) Termination and loop safety

- Stop condition: complete DoD + recorded evidence.
- Max iterations per task: 3 correction cycles.
- Escalation trigger: persistent evidence conflict or low confidence.

### 9) DoD checklist (quality gates)

- [ ] Build/compile passed (or N/A with justification)
- [ ] Lint/format passed (or N/A)
- [ ] Tests passed (or justified limitation with risk)
- [ ] Security baseline reviewed for touched surfaces
- [ ] Run/test/rollback documentation updated
- [ ] No undocumented breaking changes
- [ ] Decision Log updated
- [ ] Final result includes risks and next steps

### 10) Validation hierarchy (cross-validation)

- V1: static checks (lint/types/contracts)
- V2: unit/component tests
- V3: smoke/integration
- V4: security checks for changed surface
- V5: final consistency review across modules

### 11) Decision Log (initial + deltas)

- D1: [decision] - [reason] - [impact]
- D2: [trade-off] - [reason] - [accepted risk]
- D3: [reversal] - [reason] - [effect]

### 12) Final consolidation package

- What changed (by module)
- Validation commands executed
- Objective evidence
- Residual risks
- Next steps
