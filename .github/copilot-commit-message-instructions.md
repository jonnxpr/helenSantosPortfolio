# Copilot Commit Message Instructions (Conventional Commits)

You are generating a Git commit message. Follow **Conventional Commits** strictly and apply the best practices below.

⚠️ IMPORTANT LANGUAGE RULE:
All commit messages MUST be written in **Brazilian Portuguese (pt-BR)**.
The instructions in this file are in English, but the generated commit message content must always be in Brazilian Portuguese.

---

## 1) Required format

Use exactly this structure:

<type>(<scope>): <subject>

[optional body]

[optional footer(s)]

### Examples (in Brazilian Portuguese)

- feat(auth): adicionar fluxo de refresh token com JWT
- fix(api): corrigir erro de null pointer ao processar payload
- refactor(ui): extrair variações de botão para componente compartilhado
- docs(readme): atualizar instruções de configuração local
- test(order): adicionar cobertura para regras de desconto
- chore(deps): atualizar spring-boot para 3.3.x

---

## 2) Types (allowed)

Choose **one** type from the list:

- feat: new feature
- fix: bug fix
- docs: documentation only
- style: formatting only (no code behavior change)
- refactor: code change that neither fixes a bug nor adds a feature
- perf: performance improvement
- test: adding or correcting tests
- build: build system / tooling changes
- ci: CI configuration changes
- chore: maintenance tasks that don’t modify production code behavior
- revert: revert a previous commit

⚠️ The type must remain in English exactly as defined above.
⚠️ Only the subject, body, and footer must be in Brazilian Portuguese.

---

## 3) Scope (required when possible)

- Always include a scope if you can identify one (module, package, layer, feature, component).
- Scope must be lowercase.
- Use kebab-case if multiple words.
- Keep it short and meaningful.

Examples of good scopes:
auth, user, billing, api, db, migrations, ui, sidebar, orders, docker, ci, deps, config

If truly impossible to define, omit `(scope)` and use:
<type>: <subject>

---

## 4) Subject line rules (must be in Brazilian Portuguese)

- Must be imperative, present tense  
  Example:  
  - adicionar  
  - corrigir  
  - remover  
  - atualizar  
  - refatorar  
  - implementar  

- Must be concise (aim ≤ 72 chars; never exceed 100)
- Do NOT end with a period
- Do NOT capitalize every word
- Do NOT include ticket numbers in the subject unless required
- Describe what changed, not feelings

✅ Good:
- fix(db): corrigir violação de constraint de email duplicado
- feat(scheduling): permitir cancelamento dentro da janela configurada

❌ Bad:
- Corrigido bug
- Atualizando coisas.
- Adicionada nova funcionalidade

---

## 5) Body (optional but recommended for non-trivial changes)

Add a body when the change is not obvious.

Rules:

- Separate body from subject with a blank line
- Wrap lines at ~72–100 characters
- Explain why the change was made
- Mention relevant context
- Use bullet points for multiple items

Example (in pt-BR):

- Ajustar regra de validação para evitar inconsistência de dados
- Melhorar tratamento de exceções no serviço
- Garantir compatibilidade com versão anterior da API

---

## 6) Footers (optional)

Use footers for:

- Breaking changes
- Issue references
- Co-authors (if needed)

### 6.1 Breaking changes (mandatory when applicable)

If the commit introduces a breaking change, you MUST mark it using one of:

1) Add `!` after type/scope:

   feat(api)!: remover endpoints v1 obsoletos

2) Add a footer:

   BREAKING CHANGE: descrição clara da quebra e como migrar

Prefer using both when the breaking change is significant.

⚠️ The footer label `BREAKING CHANGE:` must remain in English.
The description after it must be in Brazilian Portuguese.

---

### 6.2 Issue tracking references

If an issue exists, reference it in the footer:

- Closes #123
- Fixes #456
- Refs #789

Do not guess issue numbers.

---

## 7) Multiple changes in one commit

- If multiple types apply, pick the dominant one.
- Avoid mixing unrelated changes.
- If truly bundled (discouraged), clarify in the body.

---

## 8) Reverts

For revert commits:

- Type must be `revert`
- Subject must be in Brazilian Portuguese
- Include a body explaining what is being reverted and why

Example:

revert(api): reverter "feat(api): adicionar rate limiting"

Este commit reverte o commit <hash> porque causava falha na autenticação.

---

## 9) Output constraints (very important)

- Output ONLY the commit message text
- No markdown fences
- No quotes
- No explanations
- No git commands
- No timestamps
- No emojis
- No extra commentary

---

## 10) Quick decision guide

- Added a new capability? → feat
- Fixed a defect? → fix
- Only documentation? → docs
- Only formatting? → style
- Code restructuring without behavior change? → refactor
- Performance improvement? → perf
- Tests only? → test
- Build/tooling change? → build
- CI change? → ci
- Dependency bump or maintenance? → chore
- Undo a commit? → revert
