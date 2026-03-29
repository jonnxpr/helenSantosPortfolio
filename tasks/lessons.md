# Lessons

- Add preventive lessons only after explicit user correction.
- For GitHub Pages workflows, keep `actions/upload-pages-artifact` and `actions/deploy-pages` on current major versions to avoid indirect deprecations from `upload-artifact@v3`.
- Keep `README.md` synchronized with current runtime modules and dynamic data sources (`js/*` and `data/*`) whenever architecture changes.
- For smooth-scroll navigation highlights, keep clicked menu state locked until transition ends to avoid temporary wrong active-link feedback.

- Data: 2026-03-29
- Contexto: consolidacao da arquitetura de governanca compartilhada do workspace.
- Correcao recebida: manter memoria de governanca de longo prazo em `helen-santos-portfolio-governance/`, sem transformar o historico do site na casa de templates e notas de rollout cross-workspace.
- Regra preventiva: quando a governanca precisar evoluir independentemente do produto, preferir repositorio irmao dedicado e manter o repo principal como fonte de verdade do site, assets e automacoes repo-locais.
- Como validar na proxima vez: confirmar que templates e notas de rollout compartilhadas apontam para `helen-santos-portfolio-governance/`, enquanto codigo, conteudo e assets do site continuam em `HelenSantosPortfolio/`.
