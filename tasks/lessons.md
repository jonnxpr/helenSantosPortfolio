# Lessons Learned

Registre aqui licoes apos correcoes explicitas do usuario para evitar repeticao de erros.

- Data:
- Contexto:
- Correcao recebida:
- Regra preventiva:
- Como validar na proxima vez:

## 2026-03-27 - Regras preventivas consolidadas do repositorio

- Data: 2026-03-27
- Contexto: consolidacao de regras operacionais genericas que estavam soltas logo abaixo do bloco canonico de `tasks/lessons.md`.
- Correcao recebida: registrar essas orientacoes como uma unica entrada datada no formato canonico, sem perder o conteudo original.
- Regra preventiva: adicionar licoes preventivas apenas apos correcao explicita do usuario; em GitHub Pages manter `actions/upload-pages-artifact` e `actions/deploy-pages` em majors atuais para evitar deprecacoes indiretas de `upload-artifact@v3`; manter `README.md` sincronizado com modulos runtime e fontes dinamicas (`js/*` e `data/*`) quando a arquitetura mudar; em highlights de smooth-scroll, manter o estado do menu clicado travado ate o fim da transicao para evitar feedback temporariamente incorreto.
- Como validar na proxima vez: revisar se novas licoes entram sempre no formato canonico, conferir workflow do GitHub Pages sem warnings de acao depreciada, validar `README.md` contra a arquitetura atual e verificar highlights sem flicker durante smooth-scroll.

- Data: 2026-03-29
- Contexto: consolidacao da arquitetura de governanca compartilhada do workspace.
- Correcao recebida: manter memoria de governanca de longo prazo em `helen-santos-portfolio-governance/`, sem transformar o historico do site na casa de templates e notas de rollout cross-workspace.
- Regra preventiva: quando a governanca precisar evoluir independentemente do produto, preferir repositorio irmao dedicado e manter o repo principal como fonte de verdade do site, assets e automacoes repo-locais.
- Como validar na proxima vez: confirmar que templates e notas de rollout compartilhadas apontam para `helen-santos-portfolio-governance/`, enquanto codigo, conteudo e assets do site continuam em `HelenSantosPortfolio/`.
