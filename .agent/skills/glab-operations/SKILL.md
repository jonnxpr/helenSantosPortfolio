---
name: glab-operations
description: Shared agent skill for GitLab and glab workflows in the HelenSantosPortfolio workspace.
---

# Skill - glab-operations (HelenSantosPortfolio - Agent)

## When to use

- GitLab or `glab` requests.
- Pipeline, job, merge request, issue, release, milestone, environment, or project-status work.
- Tasks that start from this workspace and need the owning repository resolved first.

## Repository resolution rules

- This workspace root is the default repository for GitLab work.
- If a task targets a nested repository, resolve it before running `glab`.
- Prefer explicit `-R <group/subgroup/project>` after resolving the GitLab remote.

## Mandatory workflow

1. Resolve the target repository and GitLab host/project path from git remotes or explicit user input.
2. Check `glab` authentication for the target host when live GitLab data is required.
3. Prefer high-level `glab` commands first; use `glab api` only for missing fields or pagination.
4. Summarize results in plain language instead of dumping raw JSON unless the user asks for it.
5. Require clear user intent before destructive or hard-to-undo actions.

## Preferred commands

- `glab auth status --hostname <host>`
- `glab repo view -R <group/subgroup/project> -F json`
- `glab ci list -R <group/subgroup/project> -P 30 -F json`
- `glab ci status -R <group/subgroup/project> --branch <branch> -F json`
- `glab mr list -R <group/subgroup/project> -F json`
- `glab issue list -R <group/subgroup/project> -O json`
- `glab release list -R <group/subgroup/project> -F json`

## Output contract

- State which repository was inspected.
- State the branch, filter, or time window used.
- Highlight failed, running, and pending items first.
- Mention auth, host, or mapping gaps explicitly.

## Mandatory final code review, cross-validation, and factual integrity

- Apply the canonical final gate from `CLAUDE.md` before marking work complete.
