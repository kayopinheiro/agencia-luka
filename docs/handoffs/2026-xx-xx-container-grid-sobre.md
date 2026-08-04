# 🧠 Contexto Compactado — Agência Luka 2026 (site institucional)
> Conversa sobre: ajuste do container/grid e seção Sobre do index.html

## 📌 Estado Atual
- `index.html`: Hero (full-bleed) + seção "Sobre nós" (grid 2 colunas: imagem 288px + texto, com marquee de logos de clientes) implementadas e commitadas.
- Container padrão do site (`.container`, `.site-header`, `.hero__content`, `.hero__footer`) padronizado: `max-width: 1440px` + `margin-inline: auto` + `padding-inline: 108px` (desktop) → conteúdo útil de **1224px** centralizado, alinhado entre Hero e demais seções em qualquer largura de tela (testado em 1100px, 1440px, 1920px).
- Logos do marquee corrigidos (3M, Alphabet, DuPont, GE HealthCare, John Deere) — width/height explícitos no SVG.
- Commit `ca5d60e` feito e enviado (`git push`) para `origin/main`.

## 🏗️ Stack / Tecnologias
- HTML5 semântico + CSS puro (custom properties) + JS vanilla.
- Estrutura: `css/tokens.css`, `css/base.css`, `css/components.css`.
- Fonte: Google Fonts (Poppins, via `css/base.css`).
- Servidor local: `npx serve . -p 3000` (porta 3000) ou live-server em 5500.
- Verificação visual via `mcp__Claude_Preview__*` (preview_resize, preview_eval, preview_screenshot).

## 📁 Arquivos & Artefatos Produzidos
- `css/tokens.css`: tokens de cores, tipografia, espaçamentos, grid. `--container-max: 1440px`, `--container-padding: var(--grid-margin-desktop)` (108px desktop / 32px tablet / 24px mobile, via media queries em `base.css`).
- `css/base.css`: `.container { width:100%; max-width: var(--container-max); margin-inline:auto; padding-inline: var(--container-padding); }` + media queries (`@media max-width:1024px` e `768px`) que sobrescrevem `--container-padding`.
- `css/components.css`:
  - `.site-header`, `.hero__content`, `.hero__footer`: agora usam `width:100%; max-width: var(--container-max); margin-inline:auto; padding: ... calc(var(--container-padding) - var(--space-8))`.
  - Bloco `/* SOBRE */`: `.sobre__row` (flex 2 colunas, gap 24px), `.sobre__col--media` (imagem max-width 288px, border + radius 12px), `.sobre__col--text` (título h2 + body), `.sobre__marquee` (margin-top 120px/96px/64px responsivo).
- `index.html`: nova `<section class="section section--light sobre" id="sobre">` com `.container > .sobre__row` + marquee de 5 logos (duplicados para loop infinito).
- `assets/logo-{ge-healthcare,3m,dupont,john-deere,alphabet}.svg`: corrigidos com width/height explícitos do viewBox (sem `preserveAspectRatio="none"`).

## ✅ Decisões Tomadas
- Container desktop = **1224px de conteúdo útil**, centralizado em `max-width:1440px + padding 108px` (não usar `1224px` como max-width direto — isso causava "edge-touching" entre 1024-1224px de viewport).
- Hero, header e footer compartilham a MESMA fórmula de container que as demais sections (`.container`), garantindo alinhamento consistente.
- Pequena discrepância de ~8px no alinhamento hero vs. seções em viewports muito largos (>1440px) é aceitável — decorre do padding interno de 8px do `.hero`.

## ⚠️ Problemas Encontrados & Soluções
- **Logos do marquee distorcidos**: `width="100%" height="100%"` + `preserveAspectRatio="none"` → corrigido com dimensões explícitas do viewBox.
- **Container 1224px fixo causava edge-touching em ~1024-1240px**: resolvido voltando para `max-width:1440px + padding:108px` (resultado = 1224px de conteúdo em 1440px de tela, mas sem tocar as bordas em telas menores).
- **Hero desalinhado da seção Sobre em telas largas (1920px)**: resolvido aplicando a mesma fórmula de container (`max-width:1440px + padding + margin-inline:auto`) no `.hero__content`, `.hero__footer` e `.site-header`.
- `preview_screenshot` as vezes retorna imagem stale em 1440px/1920px — usar `preview_eval` com `getBoundingClientRect()` para validar posições quando a screenshot não atualizar.

## 🎯 Próximos Passos
1. Seguir para a próxima seção do site (ex.: "Soluções") seguindo o fluxo do CLAUDE.md: invocar skill `frontend-design`, apresentar plano de seções, aprovar antes de codar.
2. Para cada nova seção: usar `.container` padrão (1224px) já validado, fazer ≥2 rodadas de comparação com screenshot de referência.
3. Continuar populando `instrucoes/projeto-guide.md` (Design System) conforme novas seções extraírem tokens do Figma.

## 🔧 Configurações & Variáveis Importantes
- Repo remoto: `https://github.com/kayopinheiro/agencia-luka.git`, branch `main`.
- Figma: `https://www.figma.com/design/F01NhAhpgJcU8tRbgUzWLe/Luka---Website-2026`
- Tokens chave: `--grid-margin-desktop: 108px`, `--grid-margin-tablet: 32px`, `--grid-margin-mobile: 24px`, `--container-max: 1440px`.

## 💬 Preferências do Usuário
- Quer respostas diretas, sem rodeios (já reclamou de explicações longas/desviadas).
- Exige fidelidade total ao Figma — não "melhorar" o design.
- Fluxo: plano → aprovação → código → screenshot → comparação ≥2 rodadas.
- HTML/CSS/JS sempre em arquivos separados; só tokens do design system, sem cores/valores inventados.

## 📎 Prompt de Retomada
Continue o desenvolvimento do site institucional da Agência Luka (HTML/CSS/JS puro, `/Users/kayopinheiro/Documents/00_Inbox/bkp-sites/site-agencia-luka`). A seção Hero e Sobre estão prontas e commitadas (`ca5d60e`), com container padrão de 1224px (via `max-width:1440px + padding 108px`) aplicado consistentemente em hero, header, footer e demais sections. Siga o fluxo do CLAUDE.md (skill `frontend-design`, plano antes de codar, screenshots de comparação) para implementar a próxima seção do Figma.
