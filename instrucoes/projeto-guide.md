# Agência Luka — Website 2026

## Sobre o projeto
Site institucional da Agência Luka, versão 2026. Desenvolvido em HTML, CSS e JS puro, com base no layout do Figma.

## Skill obrigatória
**Sempre invocar a skill `frontend-design` antes de implementar qualquer página ou componente visual.**

## Figma
URL do design: https://www.figma.com/proto/F01NhAhpgJcU8tRbgUzWLe/Luka---Website-2026?node-id=4182-1217&viewport=-2363%2C145%2C0.25&t=J76luR2FjfdSCiGA-1&scaling=min-zoom&content-scaling=fixed&page-id=4%3A38

URL base do arquivo: https://www.figma.com/design/F01NhAhpgJcU8tRbgUzWLe/Luka---Website-2026

Para extrair dados do Figma via MCP:
- Tokens/variáveis: `Get design variables from this Figma file: https://www.figma.com/design/F01NhAhpgJcU8tRbgUzWLe/Luka---Website-2026`
- Componentes: `Get the [Nome] component from: https://www.figma.com/design/F01NhAhpgJcU8tRbgUzWLe/Luka---Website-2026`
- Status: `Check Figma status`

## Estrutura de arquivos
```
agencia-luka/
├── instrucoes/
│   └── projeto-guide.md   ← este arquivo
├── assets/
│   ├── icons/              ← ícones de UI e redes sociais
│   ├── illustrations/      ← ilustrações vetoriais
│   ├── images/              ← fotos e imagens raster
│   ├── logos/brand/        ← variantes do logo da Luka
│   ├── logos/clientes/     ← logos de clientes (marquee/social proof)
│   ├── loading/              ← assets da tela de loading
│   └── _unused/              ← assets sem referência ativa (não deletados por precaução)
├── screenshots/           ← prints das seções por página (referência visual)
├── css/
│   ├── tokens.css         ← variáveis CSS do design system
│   ├── base.css           ← reset e estilos base
│   └── components.css     ← componentes reutilizáveis
├── js/                    ← scripts vanilla, um arquivo por responsabilidade
├── scripts/build.mjs      ← busca cases no Sanity e gera páginas estáticas
├── case.template.html     ← template usado pelo build.mjs
├── docs/handoffs/         ← histórico de sessões de dev (não é doc viva)
├── CLAUDE.md
├── README.md              ← visão geral técnica, build e deploy
├── style-guide.html       ← documentação de componentes
└── index.html             ← página principal
```

## Fonte de verdade

| O quê | Onde buscar |
|---|---|
| Layout, espaçamentos, hierarquia | Figma → https://www.figma.com/design/F01NhAhpgJcU8tRbgUzWLe/Luka---Website-2026 |
| Cores (hex exatos) | instrucoes/projeto-guide.md (seção Tokens) |
| Tipografia (tamanhos, pesos, line-heights) | instrucoes/projeto-guide.md (seção Tokens) |
| Logos e imagens | pasta assets/ |
| Referência visual por seção | pasta screenshots/ |

## Design System

> Fonte de verdade viva: [`css/tokens.css`](../css/tokens.css). Esta seção espelha os valores atuais — se divergir, o CSS manda.

### Cores
| Token | Hex | Uso |
|---|---|---|
| --color-brand-blue | #1e3a8a | Cor primária da marca |
| --color-brand-green | #10b981 | Accent / cases mídias sociais |
| --color-brand-violet | #6d28d9 | Accent / cases branding |
| --color-brand-orange | #f97316 | Accent / CTA, destaques |
| --color-brand-gray | #d1d5db | Neutro auxiliar |
| --color-dark | #1a1a1a | Texto escuro / fundos dark |
| --color-white | #ffffff | Fundo padrão / texto sobre dark |

Além das cores de marca, há escalas completas (50–900) para blue, green, violet, orange e gray — ver `css/tokens.css`.

### Tipografia
**Família:** Poppins (Google Fonts, pesos 400/500/600/700)

Escala fluida (`clamp()`, interpola entre 390px mobile e 1440px desktop):

| Estilo | Tamanho (mobile → desktop) | Line-height |
|---|---|---|
| Display | 48px → 72px | 1.2 (tight) |
| H1 | 40px → 56px | 1.2 (tight) |
| H2 | 32px → 48px | 1.25 (snug) |
| H3 | 28px → 40px | 1.25 (snug) |
| H4 | 24px → 32px | 1.3 (normal) |
| H5 | 20px → 26px | 1.3 (normal) |
| H6 | 18px → 22px | 1.3 (normal) |
| Large | 18px → 20px | 1.35 (relaxed) |
| Medium (body) | 16px → 18px | 1.35 (relaxed) |
| Regular | 15px → 16px | 1.5 (loose) |
| Small | 13px → 14px | 1.5 (loose) |
| Tiny | 12px | 1.5 (loose) |

Pesos: regular 400 · medium 500 · semibold 600 · bold 700.

### Grid (Figma)
- **Desktop (1440px):** 12 colunas · 80px/col · gutter 24px · margin 108px (conteúdo útil: 1224px)
- **Tablet (768px):** 8 colunas · gutter 24px · margin 32px
- **Mobile (393px):** 4 colunas · gutter 16px · margin 24px

### Espaçamentos
Escala de tokens (`--space-*`): 0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 120px. Não usar valores fora dessa escala.

### Border radius
`--radius-*`: 0, 2, 4, 6, 8, 12, 16, 20, 24, 32px, e `--radius-full` (9999px, pills/círculos).

### Sombras
Em camadas, com tint azul (`rgba(30,58,138,…)`) e opacidade baixa — nunca sombra flat. Escala: `--shadow-sm/md/lg/xl` em `css/tokens.css`.

## Convenções de classes
- **Seção:** `.section` + `.section--dark` / `.section--light`
- **Botão:** `.btn` + `.btn--primary` / `.btn--secondary` + `.btn--sm` / `.btn--lg`
- **Card:** `.card` + `.card--[variante]`
- **Grid:** `.grid` + `.grid-[cols]`
- **Scroll reveal:** `data-reveal` + `data-reveal="left|right|scale"`

## Páginas
| Página | Status | Observação |
|---|---|---|
| style-guide.html | ✅ Pronto | Documentação viva de todos os componentes |
| index.html | ✅ Pronto | Hero, Sobre, Serviços, Cases, Depoimentos, FAQ, CTA, Footer |
| case-*.html (5) | ✅ Gerado | **Não editar à mão** — gerado por `scripts/build.mjs` a partir do Sanity |
| 404.html | ✅ Pronto | |
| em-construcao.html | ✅ Pronto | |
| politica-de-privacidade.html | ✅ Pronto | |
| termos-de-uso.html | ✅ Pronto | |

## Assets disponíveis

### Logos
- `assets/logos/brand/navbar.svg`, `servicos.svg`, `footer.svg`, `marquee.svg` — variantes do logo da Luka
- `assets/logos/clientes/*.svg` — logos de clientes usados em social proof/marquee

### Ícones
- `assets/icons/facebook.svg`, `instagram.svg`, `linkedin.svg`, `pinterest.svg` — redes sociais
- `assets/icons/arrow-down.svg`, `chevron-forward.svg`, `plus.svg`, `favicon.svg` — UI

### Ilustrações
- `assets/illustrations/branding.svg`, `web.svg`, `fotografia.svg`, `midias.svg`, `trafego.svg` — serviços
- `assets/illustrations/cases-wordmark.svg`, `erro-404.svg`, `pagina-em-construcao.svg`

### Imagens
- `assets/images/hero-home.png`, `sobre.png`, `contato.png`, `faq.png` — seções da home
- `assets/images/servicos-branding.png`, `servicos-fotografia.png`, `servicos-web.png` — cards de serviço
- `assets/images/og-image.png`, `avatar.png`

### Loading
- `assets/loading/logo.svg`, `watermark.svg` — tela de loading (todas as páginas)

### _unused
Assets sem nenhuma referência em HTML/CSS/JS no momento (logos de clientes antigos, imagens de case pré-migração pro Sanity). Mantidos por precaução — se confirmado que não voltam a ser usados, podem ser removidos.

## Regras absolutas
- Não inventar cores — usar apenas os tokens definidos acima
- Não usar outra fonte além da definida
- Não melhorar o design — reproduzir o Figma com fidelidade
- Todo elemento clicável deve ter estado hover, focus-visible e active
- Não adicionar seções que não existam no design
- HTML, CSS e JS sempre em arquivos separados

## Fluxo de desenvolvimento por página
1. Invocar a skill `frontend-design`
2. Enviar os screenshots da página como referência visual
3. **Apresentar plano de ação da página** — listar todas as seções, ordem de execução e componentes. Aguardar aprovação antes de escrever código.
4. Após aprovação: criar a página (começar pelo Style Guide)
5. Após cada seção: verificar no preview e comparar com o screenshot
6. Corrigir diferenças antes de avançar para a próxima seção
7. Repetir para cada página seguinte
