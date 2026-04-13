---
name: code-review
description: Review checklist and quality gates for PR and code-review tasks in the Helen Santos Portfolio workspace.
---

# Skill - code-review (Helen Santos Portfolio)

## Intent

Review checklist for PR and code-review tasks.

## Review checklist

- Verify loading order and preflight evidence are respected.
- Check for regressions in responsiveness and accessibility.
- Confirm JSON schema and links integrity in `data/rituals.json` changes.
- Confirm minified artifacts are updated when source CSS/JS changed.
- Confirm no unnecessary dependency or framework was introduced.
- Confirm deploy workflow compatibility with repository changes.

## Mandatory final code review, cross-validation, and factual integrity

- At the end of every implementation/refactor/fix, perform a final code review before marking the task complete.
- Cross-validation is mandatory and does not replace code review: validate outputs against at least two independent sources of evidence (for example tests/build logs, contract/docs, runtime behavior, or diff-based verification).
- Final approval requires both gates: (1) technical code review quality and (2) evidence-based cross-validation consistency.
- Review and cross-validation must verify correctness, security, performance, readability, test impact, and compatibility with existing architecture/contracts.
- It is allowed (and encouraged) to use internet sources and up-to-date documentation (including Context7 and official docs) to close knowledge gaps.
- Never invent facts, APIs, versions, behaviors, references, or validation results; if uncertain, verify first or explicitly state uncertainty.
