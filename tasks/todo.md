# Task Plan

Registre aqui as tarefas nao triviais em execucao neste repositorio ou workspace.

- Objetivo:
- Plano de execucao:
- Evidencias esperadas:
- Status/Resultado:

- Objetivo: concluir o bootstrap safe-parity do Speckit v0.5.0 neste repositorio e alinhar `.opencode/commands/`, `.github/`, `.gemini/` e `.specify/`.
- Plano de execucao:
  1. Ler preflight/instrucoes obrigatorias, plano de rollout compartilhado, `README.md` e `package.json`.
  2. Copiar templates/scripts safe-parity de um repo estatico ja bootstrapado, mantendo `common.ps1` e `create-new-feature.ps1` na versao v0.5.0 e preservando o comportamento local de `update-agent-context.ps1` para `.specify/context/`.
  3. Atualizar somente o frontmatter de `.opencode/commands/speckit*.md` com paths repo-locais e criar espelhos em `.github/prompts/`, `.github/agents/` e `.gemini/commands/`.
  4. Inicializar a constituicao repo-local e validar presenca, marcadores e sincronia entre superficies.
- Evidencias esperadas: `.specify/` completo com 7 templates e 5 scripts PowerShell; 9 prompts stub; 9 agents; 9 comandos Gemini; marcadores `AllowExistingBranch`, `DryRun` e `hasMalformedTimestamp`; frontmatter PowerShell sincronizado nas superficies Speckit.
- Status/Resultado: concluido em 2026-04-05 com bootstrap repo-local, espelhos GitHub/Gemini criados e validacao de presenca/sincronia executada.

- [x] Load mandatory instructions and context for the Helen Santos workspace.
- [x] Audit the planned semantic refactor and map risky runtime/build references.
- [x] Apply the semantic/domain rename across HTML, CSS, JS modules, JSON data, and build metadata.
- [x] Rebuild minified assets and verify metadata sync.
- [x] Smoke-test desktop and mobile behavior locally with Playwright.
- [x] Review final diff for regressions and summarize next steps.
- [x] Load mandatory instructions, rollout plan, README, and package context for the Speckit bootstrap.
- [x] Bootstrap repo-local `.specify/` templates, scripts, context docs, and constitution.
- [x] Patch `.opencode/commands/speckit*.md` frontmatter with repo-local PowerShell script paths.
- [x] Create synchronized `.github/prompts/`, `.github/agents/`, and `.gemini/commands/` Speckit surfaces.
- [x] Validate required files, markers, and cross-surface synchronization without creating a commit.
