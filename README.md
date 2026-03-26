# Helen Santos Ritual Site

Single page sensory ritual site for Helen Santos, with a premium editorial direction, multilingual content, responsive behavior, and GitHub Pages CI/CD.

## Caracteristicas

- Single page application estatica com HTML, CSS e JavaScript vanilla
- Conteudo orientado a dados em `data/*.json`
- i18n em `pt-BR`, `en` e `es`
- Responsividade completa para mobile, tablet e desktop
- Fade in, scroll reveal e suporte a `prefers-reduced-motion`
- Metadados SEO sincronizados a partir de `data/site-shell.json`
- Deploy automatico no GitHub Pages com GitHub Actions
- Assets temporarios e contatos mockados para fase inicial

## Estrutura do projeto

```text
HelenSantosPortfolio/
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── LICENSE
├── AGENTS.md
├── CLAUDE.md
├── GEMINI.md
├── PRE-FLIGHT.md
├── PROJECT_STRUCTURE.txt
├── opencode.json
├── manifest.webmanifest
├── favicon.ico
├── favicon-32x32.png
├── apple-touch-icon.png
├── assets/
│   ├── icons/
│   ├── illustrations/
│   ├── og-helen.png
│   └── profile-helen.png
├── css/
│   ├── styles.css
│   └── styles.min.css
├── data/
│   ├── site-shell.json
│   ├── hero.json
│   ├── i18n.json
│   ├── experience-flow.json
│   ├── pillars.json
│   └── rituals.json
├── js/
│   ├── animations.js
│   ├── site-shell.js
│   ├── hero.js
│   ├── i18n.js
│   ├── main.js
│   ├── main.min.js
│   ├── navigation.js
│   ├── experience-flow.js
│   ├── pillars.js
│   └── rituals.js
├── scripts/
│   ├── discover-git-repo.ps1
│   ├── prepare-pages-artifact.mjs
│   └── verify-metadata-sync.mjs
├── tasks/
└── tools/
```

## Scripts disponiveis

```bash
npm start
npm run start:localhost
npm run start:127
npm run start:all
npm run verify:metadata
npm run build:css
npm run watch:css
npm run build:js
npm run build
npm run prepare:pages
npm run verify:metadata:artifact
```

## Desenvolvimento local

### 1. Instalar dependencias

```bash
npm install
```

### 2. Iniciar o servidor local

```bash
npm start
```

### 3. Minificar assets durante o desenvolvimento

```bash
npm run watch:css
```

## Build e publicacao

### Build completo

```bash
npm run build
```

### Preparar artefato do GitHub Pages

```bash
npm run prepare:pages
npm run verify:metadata:artifact
```

### Workflow de deploy

O pipeline executa a cadeia de validacao e publicacao do site:

1. `npm install --no-audit --no-fund`
2. `npm run verify:metadata`
3. `npm run build`
4. `npm run prepare:pages`
5. `npm run verify:metadata:artifact`
6. Upload e deploy com GitHub Pages

Arquivo principal do workflow: `.github/workflows/deploy.yml`.

## Fonte dos dados

- `data/site-shell.json`: branding, SEO, contatos e idiomas
- `data/hero.json`: atmosferas e acoes da hero
- `data/i18n.json`: textos localizados
- `data/experience-flow.json`: resumo da experiencia, jornada e acoes de agendamento
- `data/pillars.json`: pilares do encontro
- `data/rituals.json`: vivencias e rituais em destaque

## Mocks atuais

- Contatos sao temporarios e devem ser substituidos quando os dados reais estiverem disponiveis
- Imagens e icones atuais sao placeholders gerados por IA para acelerar o prototipo
- O schema e os metadados ja apontam para o slug final do GitHub Pages

## URLs do projeto

- Repositorio: `https://github.com/jonnxpr/helenSantosPortfolio.git`
- URL publica esperada: `https://jonnxpr.github.io/helenSantosPortfolio/`

## Stack tecnologica

- HTML5 semantico
- CSS3 com variaveis, gradientes, grid, flex e media queries
- JavaScript vanilla modular
- Bootstrap 5 via CDN
- Font Awesome via CDN
- JSON como fonte de conteudo dinamico
- `clean-css-cli` para minificacao de CSS
- `terser` para minificacao de JavaScript
- `chokidar-cli` para watch de CSS

## Acessibilidade e UX

- Estrutura semantica com `nav`, `main`, `section` e `footer`
- Navegacao por teclado
- Seletor de idioma com estado acessivel
- Motion reduzido quando `prefers-reduced-motion` estiver ativo
- CTAs de contato repetidos em pontos estrategicos

## Licenca

Projeto distribuido sob MIT.
