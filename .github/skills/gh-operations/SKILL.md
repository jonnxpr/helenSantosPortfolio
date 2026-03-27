---
name: gh-operations
description: Local GitHub Copilot CLI skill for GitHub and gh workflows in Helen Santos Portfolio.
---

# Skill - gh-operations (Helen Santos Portfolio - Copilot CLI)

## When to use

- GitHub or `gh` requests.
- Workflow run, job, pull request, issue, release work.

## Repository resolution

- Single repository workspace.
- Always resolve ownership before `gh` commands.

## Workflow

1. Resolve owner/repo from git remotes.
2. Check `gh auth status` when live data needed.
3. Prefer `gh` high-level commands; use `gh api` for missing fields.
4. Summarize; require intent for destructive actions.

## Core commands

- `gh auth status`
- `gh repo view -R <owner/repo>`
- `gh run list -R <owner/repo>`
- `gh run view <run-id>`
- `gh pr list -R <owner/repo>`
- `gh issue list -R <owner/repo>`
- `gh release list -R <owner/repo>`

## Mandatory final code review, cross-validation, and factual integrity

- Apply the canonical final gate from `CLAUDE.md` before marking work complete.