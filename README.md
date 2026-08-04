# Site Agência Luka

Site institucional da Agência Luka. HTML5, CSS puro e JavaScript vanilla — sem frameworks, sem build step no navegador. O único "build" existente busca os cases no Sanity CMS e gera páginas estáticas.

## Rodando localmente

```bash
npx serve . -p 3000
```

Abra `http://localhost:3000`. Não abra os arquivos direto por `file://` — algumas coisas (fetch, paths relativos) só funcionam servidos por HTTP.

## Estrutura de pastas

```
├── index.html, style-guide.html, case-*.html, ...   ← páginas (HTML na raiz, de propósito — ver "Cases" abaixo)
├── css/
│   ├── tokens.css        ← variáveis do design system (cores, tipografia, espaçamento)
│   ├── base.css           ← reset e estilos globais
│   └── components.css     ← componentes reutilizáveis
├── js/                     ← JS vanilla, um arquivo por responsabilidade
├── assets/
│   ├── icons/              ← ícones de UI e redes sociais
│   ├── illustrations/      ← ilustrações vetoriais (serviços, 404, em construção)
│   ├── images/             ← fotos e imagens raster
│   ├── logos/
│   │   ├── brand/          ← variantes do logo da Luka (navbar, footer, marquee)
│   │   └── clientes/       ← logos de clientes usados no marquee/social proof
│   ├── loading/             ← logo e watermark da tela de loading
│   └── _unused/             ← assets sem referência em nenhuma página (mantidos por precaução, não deletados)
├── scripts/build.mjs        ← busca cases no Sanity e gera as páginas de case + grid da home
├── case.template.html       ← template usado pelo build.mjs para gerar cada case-*.html
├── docs/handoffs/            ← anotações de sessões de desenvolvimento anteriores (histórico, não é documentação viva)
├── instrucoes/projeto-guide.md ← design system e convenções do projeto
└── .github/workflows/deploy.yml ← pipeline de deploy
```

## Como o conteúdo dos Cases é publicado

Os cases (`case-*.html`) **não são editados manualmente**. O fluxo é:

1. Alguém edita/publica um case no [Sanity Studio](https://luka-producoes.sanity.studio/)
2. O webhook do Sanity dispara um `repository_dispatch` no GitHub
3. O GitHub Actions roda `npm run build` (`scripts/build.mjs`), que busca os dados no Sanity e **sobrescreve** `case-{slug}.html` (a partir de `case.template.html`) e o grid de cases em `index.html`
4. O resultado é enviado por SFTP para o servidor de produção (Napoleon)

Rodar `npm run build` localmente sobrescreve os `case-*.html` na raiz com o conteúdo atual do Sanity — normal, é assim que funciona. Não edite esses arquivos à mão, a próxima publicação no Sanity apaga a edição.

Specs de imagem esperadas pelo Sanity (documentadas também nos campos do Studio):
- **Thumbnail**: proporção 3:2 (ex: 1200×800px), WebP, até 500KB
- **Imagens de intro/desafio**: proporção ~2:1 (ex: 1600×800px), WebP, até 800KB

## Deploy

Automático via GitHub Actions (`.github/workflows/deploy.yml`), disparado por:
- Push na branch `main`
- Publicação de um case no Sanity (webhook → `repository_dispatch`)

O workflow builda, monta uma pasta `dist/` (exclui arquivos de dev como `scripts/`, `instrucoes/`, `screenshots/`, `docs/`, `.claude/`) e envia por SFTP (SSH, porta 1157) para a Napoleon (cPanel), pasta `public_html/`.

Deploy manual de emergência: um commit vazio em `main` (`git commit --allow-empty -m "chore: dispara rebuild"`) dispara o mesmo pipeline.

## Design system

Fonte de verdade dos tokens: [`css/tokens.css`](css/tokens.css). Documentação visual de todos os componentes: [`style-guide.html`](style-guide.html) (servido localmente). Convenções de projeto e briefing: [`instrucoes/projeto-guide.md`](instrucoes/projeto-guide.md).

## Regras de desenvolvimento

Ver [`CLAUDE.md`](CLAUDE.md) — HTML/CSS/JS sempre separados, cores só dos tokens, mobile-first, sem `transition: all`, todo elemento clicável precisa de hover/focus-visible/active.
