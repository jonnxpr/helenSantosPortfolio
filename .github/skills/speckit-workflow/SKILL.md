---
name: speckit-workflow
description: Local Copilot CLI skill for safe-parity Speckit workflow in the HelenSantosPortfolio repository.
---

# Skill - speckit-workflow (HelenSantosPortfolio - Copilot CLI)

## When to use

- `/speckit.*` workflows
- specification authoring, clarification, constitution, planning, tasks, analysis, checklist, or implementation from `specs/`

## Repository model

- `.specify/` stores templates, scripts, and constitution.
- `specs/<feature-branch>/` stores feature artifacts.
- OpenCode command entrypoints live in `.opencode/commands/`.
- GitHub Copilot discovery surfaces live in `.github/prompts/` and `.github/agents/`.
- Antigravity discovery surfaces live in `.gemini/commands/`.

## Safe parity rules

- Keep all writes inside this repository.
- Never let Speckit automation rewrite home-dir configs or unrelated governance files.
- Use `gh` for GitHub issue creation when `taskstoissues` is available.

## Fluxo recomendado obrigatorio

- Sempre que o usuario pedir Speckit para nova feature ou qualquer atividade orientada por especificacao, siga este fluxo.
- Nunca pule para um comando tardio se os artefatos previos exigidos nao existirem ou estiverem desatualizados.

### Fase 0 - Ownership e superficie ativa

1. Resolver o repositorio dono antes de qualquer acao.
2. Se estiver em hub/roteador, encaminhar para o repo filho antes de qualquer write.
3. Usar as superficies nativas da ferramenta ativa: `.opencode/commands/`, `.github/prompts/`, `.github/agents/` e `.gemini/commands/`.

### Fase 1 - Preflight e contexto

1. Ler preflight, instrucoes e skills obrigatorias do repo dono.
2. Confirmar safe parity, `.specify/`, `specs/` e feature branch alvo.
3. Se for continuidade, localizar e revisar os artefatos existentes antes de criar novos.

### Fase 2 - Constituicao

1. Rodar `/speckit.constitution` quando a constituicao nao existir, estiver desatualizada, ou quando a solicitacao alterar regras de governanca/operacao.

### Fase 3 - Especificacao

1. Para nova feature ou mudanca de escopo, rodar `/speckit.specify` com o melhor enunciado funcional disponivel.
2. Garantir `spec.md` e checklist de requisitos da feature.

### Fase 4 - Clarificacao

1. Rodar `/speckit.clarify` ate remover ambiguidades criticas.
2. Nao avancar com pendencias criticas de escopo, seguranca, permissao, UX ou compliance.

### Fase 5 - Planejamento

1. Rodar `/speckit.plan` apenas com spec valida.
2. Garantir `research.md`, `data-model.md`, `contracts/`, `quickstart.md` e contexto repo-local quando aplicavel.

### Fase 6 - Decomposicao

1. Rodar `/speckit.tasks`.
2. Se o repo expuser `/speckit.taskstoissues` e o usuario quiser sincronizar issues, executar depois de tasks usando `gh`.

### Fase 7 - Gate de qualidade antes da implementacao

1. Rodar `/speckit.analyze`.
2. Rodar `/speckit.checklist`.
3. Corrigir bloqueios antes de `/speckit.implement`.

### Fase 8 - Implementacao

1. Rodar `/speckit.implement` apenas depois que spec, plan, tasks e gates estiverem coerentes.
2. Manter todos os writes dentro do repo dono.

### Fase 9 - Fechamento obrigatorio

1. Executar validacoes do repo (build, testes, smoke, etc.).
2. Executar o toolkit completo de governanca quando existir no workspace/repo dono:
   - `./tools/governance/scan-secrets.ps1`
   - `python ./tools/governance/sync-instructions.py`
   - `python ./tools/governance/audit-compliance.py`
3. Finalizar com code review e cross-validation baseados em evidencias.

## Regra para pedidos parciais

- Se o usuario pedir apenas `/speckit.plan`, `/speckit.tasks`, `/speckit.analyze`, `/speckit.checklist` ou `/speckit.implement`, primeiro valide se os artefatos upstream obrigatorios existem e ainda estao coerentes.
- Se faltar prerequisito, execute ou atualize a etapa anterior necessaria antes de continuar.
- Para nova feature, o caminho completo recomendado e `/speckit.constitution` -> `/speckit.specify` -> `/speckit.clarify` -> `/speckit.plan` -> `/speckit.tasks` -> `/speckit.analyze` -> `/speckit.checklist` -> `/speckit.implement`.


## Mandatory final code review, cross-validation, and factual integrity

- Apply the canonical final gate from `CLAUDE.md` before marking work complete.
