<!--
Sync Impact Report
Version change: template -> 1.0.0
Modified principles: initial adoption
Added sections: Core Principles, Delivery Constraints, Workflow And Quality Gates, Governance
Removed sections: none
Templates requiring updates:
- .specify/templates/plan-template.md ✅ aligned via safe-parity bootstrap
- .specify/templates/spec-template.md ✅ aligned via safe-parity bootstrap
- .specify/templates/tasks-template.md ✅ aligned via safe-parity bootstrap
- .opencode/commands/speckit*.md ✅ aligned via safe-parity bootstrap
Follow-up TODOs: none
-->
# Helen Santos Ritual Site Constitution

## Core Principles

### I. GitHub Pages Continuity
Every feature MUST preserve the repository's static-site continuity for GitHub
Pages delivery. Changes to specs, prompts, scripts, or content workflows MUST
not assume a server runtime, database backend, or framework migration unless an
explicit specification authorizes that shift.

### II. Semantic And Accessible Ritual Web
All user-facing work MUST keep semantic HTML, accessible interactions,
responsive behavior, and multilingual readability. Visual atmosphere is
important, but it cannot come at the cost of keyboard access, content clarity,
or stable mobile behavior.

### III. Minimal Stack By Default
This repository MUST prefer the existing minimal stack: static HTML, CSS,
vanilla JavaScript, JSON content, and repo-local automation. New dependencies,
frameworks, or build layers require explicit justification in the active spec
or plan.

### IV. Data-Driven Content Ownership
Content-bearing behavior MUST remain data-driven where the repository already
uses `data/*.json` and related repo-local artifacts. Specs, plans, and tasks
must preserve clear ownership between static assets, structured content, and AI
workflow surfaces.

### V. Repo-Local Speckit Safe Parity
Speckit workflow assets MUST stay repo-local under `.specify/`, `specs/`, and
`.opencode/commands/`. Tool-surface mirrors for GitHub and Gemini MUST stay in
sync with the OpenCode source content, and GitHub issue export MUST use `gh`
rather than MCP issue-write tooling.

## Delivery Constraints

- Repo-local Speckit assets live only inside this repository.
- `.opencode/commands/` is the command-content source of truth for mirrored
  `.github/agents/` and `.gemini/commands/` surfaces.
- GitHub Pages/static-site continuity, semantic HTML, and accessibility are
  non-negotiable release qualities.
- The current stack stays minimal unless a specification explicitly broadens it.

## Workflow And Quality Gates

- Use Context7 or official documentation when external Speckit or tooling
  behavior must be verified.
- Keep all automation writes inside this repository.
- Validate marker-bearing scripts and mirrored tool surfaces whenever the
  bootstrap changes.
- Use `gh` for issue export flows when `/speckit.taskstoissues` is invoked.

## Governance

This constitution governs spec-driven workflow decisions for the Helen Santos
ritual site repository. Amendments require a documented rationale, synchronized
updates to dependent templates or mirrored command surfaces, and a semantic
version bump matching the change scope. Specs, plans, tasks, and implementation
reviews must verify compliance with these principles before work is considered
complete.

**Version**: 1.0.0 | **Ratified**: 2026-04-05 | **Last Amended**: 2026-04-05
