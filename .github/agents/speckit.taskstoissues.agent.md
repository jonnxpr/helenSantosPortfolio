---
description: Convert existing tasks into actionable, dependency-ordered GitHub issues for the feature using gh.
scripts:
  ps: .specify/scripts/powershell/check-prerequisites.ps1 -Json -RequireTasks -IncludeTasks
---

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Outline

## Safe Parity Guardrails

- Keep all writes inside the owning repository and its matching GitHub remote.
- Never use GitHub MCP issue writes for this command.
- If the repo is not hosted on GitHub, stop and tell the user that `/speckit.taskstoissues` is unavailable.

1. Run `.specify/scripts/powershell/check-prerequisites.ps1 -Json -RequireTasks -IncludeTasks` from repo root and parse FEATURE_DIR and AVAILABLE_DOCS list. All paths must be absolute. For single quotes in args like "I'm Groot", use escape syntax: e.g 'I'\''m Groot' (or double-quote if possible: "I'm Groot").
1. From the executed script, extract the path to **tasks**.
1. Get the Git remote by running:

```bash
git config --get remote.origin.url
```

> [!CAUTION]
> ONLY PROCEED TO NEXT STEPS IF THE REMOTE IS A GITHUB URL AND `gh auth status` succeeds for that host.

1. Derive the `owner/repo` pair from the GitHub remote URL.
1. For each task in the list, create a new issue with `gh issue create --repo <owner/repo> --title <title> --body <body>`.
1. Group or skip purely foundational meta-tasks when they do not make sense as standalone issues; explain any skipped tasks in the final summary.

> [!CAUTION]
> UNDER NO CIRCUMSTANCES EVER CREATE ISSUES IN REPOSITORIES THAT DO NOT MATCH THE REMOTE URL
