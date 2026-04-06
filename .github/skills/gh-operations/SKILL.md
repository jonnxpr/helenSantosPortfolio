---
name: gh-operations
description: Local GitHub and gh workflow memory for the Helen Santos Portfolio workspace.
---

# Skill - gh-operations (Helen Santos Portfolio)

## When to use

- GitHub or `gh` requests.
- Workflow run, job, pull request, issue, release, milestone, environment, or project-status work.
- Tasks that start from a workspace path and need the owning repository resolved first.

## Repository resolution rules

- This workspace has a single repository.
- Resolve the owning repository before any `gh` command.
- Prefer explicit `-R <owner/repo>` after resolving the GitHub remote.

## Mandatory workflow

1. Resolve the target repository and GitHub owner/repo path from git remotes or explicit user input.
2. Check `gh` authentication for GitHub when live GitHub data is required.
3. Prefer high-level `gh` commands first; use `gh api` only for missing fields or pagination.
4. Summarize results in plain language instead of dumping raw JSON unless the user asks for it.
5. Require clear user intent before destructive or hard-to-undo actions.

## Preferred commands

- `gh auth status`
- `gh repo view -R <owner/repo> --json nameWithOwner,url,defaultBranchRef`
- `gh run list -R <owner/repo> --limit 30 --json status,conclusion,name,headBranch,createdAt,updatedAt,databaseId,url`
- `gh run view <run-id> -R <owner/repo>`
- `gh pr list -R <owner/repo> --state open --json number,title,author,headRefName,baseRefName,url,createdAt`
- `gh issue list -R <owner/repo> --state open --json number,title,author,labels,createdAt,url`
- `gh release list -R <owner/repo> --limit 20 --json tagName,name,createdAt,url`

## Output contract

- State which repository or repositories were inspected.
- State the branch, filter, or time window used.
- Highlight failed, running, and pending items first.
- Mention auth, host, or mapping gaps explicitly.

## Mandatory final code review, cross-validation, and factual integrity

- Apply the canonical final gate from `CLAUDE.md` before marking work complete.
