# 🧠 Contexto Compactado — Agência Luka 2026 / Seção "Nossos Cases"
> Gerado em: 2026-06-13 | Conversa sobre: implementação e ajustes do carrossel mobile e scroll-pin desktop da seção `.cases`

## 📌 Estado Atual
Seção `.cases` (5 cards) implementada e funcional:
- **Desktop (>1024px)**: scroll-pin via `position: sticky` + JS, `.cases__list` translada verticalmente conforme scroll até mostrar o último card.
- **Mobile/Tablet (≤1024px)**: carrossel horizontal com scroll-snap, primeiro card alinhado ao texto, gap de 16px, peek do próximo card sem cortar texto, border/frame do card preservado.
- Última correção (peek rosa/magenta) **verificada via screenshot e confirmada resolvida**.
- Trabalho **não commitado** — aguardando confirmação do usuário para commit.

## 🏗️ Stack / Tecnologias / Ferramentas
- HTML5 + CSS puro (custom properties) + JS vanilla
- Preview: `mcp__Claude_Preview__*` (preview_start/stop/resize/eval/screenshot)
- Componente base: `.card-service` (definido em `css/components.css`)

## 📁 Arquivos & Artefatos Produzidos
- `index.html` — `.cases` section (linhas ~276-372): `.cases__card` envolvido por novo `.cases__pin`; `.cases__list` com 5 `.card-service`:
  1. fotografia — `servicos-fotografia.png`, overlay `#6d28d9` (violeta)
  2. branding — `servicos-branding.png`, overlay `#10b981` (verde), tag "branding"
  3. web — `servicos-web.png`, overlay `#f97316` (laranja, corrigido de `#1e3a8a`), tag "branding"
  4. social media (novo) — `https://placehold.co/592x392`, overlay `#4d1c9a`, tag "social media"
  5. ecommerce (novo) — `https://placehold.co/592x392`, overlay `#0b835c`, tag "ecommerce"
  - Adicionado `<script src="js/cases.js"></script>` ao final do `<body>`.

- `js/cases.js` (novo arquivo completo):
```js
(function () {
  const section = document.querySelector('.cases');
  const card = document.querySelector('.cases__card');
  const list = document.querySelector('.cases__list');
  if (!section || !card || !list) return;
  const desktopQuery = window.matchMedia('(min-width: 1025px)');
  let scrollDistance = 0;
  function setup() {
    if (!desktopQuery.matches) {
      section.style.height = '';
      list.style.transform = '';
      scrollDistance = 0;
      return;
    }
    const cardStyle = getComputedStyle(card);
    const paddingY = parseFloat(cardStyle.paddingTop) + parseFloat(cardStyle.paddingBottom);
    const windowHeight = card.clientHeight - paddingY;
    const listHeight = list.scrollHeight;
    scrollDistance = Math.max(0, listHeight - windowHeight);
    section.style.height = `${card.offsetHeight + scrollDistance}px`;
  }
  function onScroll() {
    if (!desktopQuery.matches || scrollDistance === 0) return;
    const rect = section.getBoundingClientRect();
    const progress = Math.min(Math.max(-rect.top, 0), scrollDistance) / scrollDistance;
    list.style.transform = `translateY(-${progress * scrollDistance}px)`;
  }
  window.addEventListener('resize', setup);
  window.addEventListener('scroll', onScroll, { passive: true });
  setup();
  onScroll();
})();
```

- `css/components.css` (~1985 linhas, bloco `.cases*` ~linha 1844):
  - `.cases { padding: var(--space-8); background-color: var(--color-white); }`
  - `.cases__pin { position: sticky; top: 0; height: 100vh; }` (novo)
  - `.cases__card { width: 100%; height: 100%; background-color: var(--color-brand-blue); border-radius: var(--radius-12); overflow: hidden; box-sizing: border-box; padding: var(--space-96) 100px; }` (removido `aspect-ratio: 1424/784`)
  - `.cases__list { display: flex; flex-direction: column; gap: var(--space-20); will-change: transform; }` (desktop; `transform` setado via JS)
  - `.cases__list .card-service { flex-shrink: 0; }`
  - **`@media (max-width: 1024px)`**:
```css
@media (max-width: 1024px) {
  .cases__pin { position: static; height: auto; }
  .cases__card { height: auto; overflow: visible; padding: var(--space-64) var(--space-48); }
  .cases__container { grid-template-columns: 1fr; gap: var(--space-64); }
  .cases__list {
    flex-direction: row;
    gap: var(--space-16);
    overflow-x: auto;
    transform: none !important;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
  }
  .cases__list .card-service { width: calc(100% - 40px); scroll-snap-align: start; }
  .cases__list .card-service__img { object-position: left center; }
  .cases__list .card-service:last-child { scroll-snap-align: none; }
}
```
  - **`@media (max-width: 768px)`**:
```css
@media (max-width: 768px) {
  .cases { padding: 0; }
  .cases__card { border-radius: 0; padding: var(--space-64) var(--grid-margin-mobile); }
  .cases__header, .cases__desc, .cases__wordmark { max-width: none; }
  .cases__wordmark { display: none; }
}
```

## ✅ Decisões Tomadas
- Expandir de 3 para 5 cards (cards 4 e 5 são placeholders `placehold.co/592x392`).
- Paleta dos novos cards mantida em violeta/verde/laranja (`--color-violet-700`, `--color-green-700`).
- Overlay do card 3 alterado de azul (`#1e3a8a`, sem contraste com bg) para laranja (`#f97316`).
- Desktop: efeito scroll-pin via `position: sticky` + JS calculando altura/translateY dinamicamente (não hardcoded).
- Mobile: carrossel horizontal com `calc(100% - 40px)` por card (peek consistente independente do breakpoint), gap `16px` (`--space-16`).
- `scroll-snap-align: none` no último card para evitar overshoot além do card 4.
- Border/padding original do `.card-service` (border 1px + padding `--space-4`) **preservado** — NÃO removido (tentativa de remoção foi revertida).
- `object-position: left center` no `.card-service__img` dentro do carrossel mobile — corrige o peek mostrando o início real da imagem em vez de um recorte central arbitrário.

## ⚠️ Problemas Encontrados & Soluções
- **Peek cortando texto da tag ("BRAND")** → resolvido reduzindo largura do card para `calc(100% - 40px)` (peek ~24px, só imagem).
- **"Área azul vazia" entre cards** → causa real era gap (20px→16px) + border/padding do card somando; após reverter remoção indevida de border/padding, gap de 16px ficou correto e bateu com a referência do usuário.
- **Overscroll cortando card 4** → corrigido com `scroll-snap-align: none` no `:last-child`; verificado via `preview_eval` (`scrollLeft` final = 840, início do card4).
- **Peek mostrando faixa rosa/magenta no início do card2** → causa: `object-fit: cover` com `object-position` padrão (center) recortava uma faixa arbitrária/rosa da imagem. Corrigido com `object-position: left center`. **Verificado via screenshot — resolvido.**

## 🎯 Próximos Passos
1. **Perguntar/confirmar commit** — usuário foi questionado "Want me to commit this work now?" e ainda não respondeu.
2. Se aprovado: `git add index.html js/cases.js css/components.css` + commit com mensagem descrevendo expansão para 5 cards + scroll-pin desktop + carrossel mobile.
3. (Opcional/futuro) Substituir os 2 cards placeholder (`social media`, `ecommerce`) por imagens reais quando disponíveis em `assets/`.
4. Re-checar efeito desktop (>1024px) após todas as mudanças de CSS — já verificado antes, mas mudanças no `@media (max-width: 1024px)` não devem afetar desktop; vale uma checagem rápida final se houver dúvida.

## 🔧 Configurações & Variáveis Importantes
- Diretório do projeto: `/Users/kayopinheiro/Documents/00_Inbox/bkp-sites/site-agencia-luka`
- Branch: `main`
- Tokens relevantes: `--space-16: 16px`, `--space-20: 20px`, `--space-48: 48px`, `--color-brand-orange: #f97316`, `--color-violet-700: #4d1c9a`, `--color-green-700: #0b835c`, `--color-blue-400: #4b61a1`, `--grid-margin-mobile: 24px`
- Preview server ativo (pode estar stale): serverId `0dec2c47-8d81-4527-ae20-2fec951086e1`, resize 375x667

## 💬 Preferências do Usuário (relevantes para o trabalho)
- Usuário se frustra facilmente com mudanças que não correspondem exatamente ao que pediu — **sempre verificar via screenshot** antes de afirmar que algo está corrigido.
- **Não** usar margens negativas, "compensações visuais" ou redimensionar elementos para mascarar problemas — sempre buscar causa raiz.
- Preservar fielmente o design/border/frame de componentes existentes — não "melhorar" sem pedido.
- Seguir CLAUDE.md: apenas `transform`/`opacity` em animações, cores só dos tokens, HTML/CSS/JS separados, mobile-first, mínimo 2 rodadas de comparação por screenshot, preview sempre via localhost.

## 📎 Prompt de Retomada
Continuando o desenvolvimento do site da Agência Luka 2026 (`/Users/kayopinheiro/Documents/00_Inbox/bkp-sites/site-agencia-luka`, branch `main`). A seção `.cases` (5 cards, scroll-pin desktop + carrossel mobile) está implementada e funcionando, última correção (peek rosa no card2) verificada via screenshot. Próximo passo: confirmar com o usuário se devo commitar (`index.html`, `js/cases.js`, `css/components.css`) — nada commitado ainda nesta sessão. Veja seção "Próximos Passos" para detalhes.
