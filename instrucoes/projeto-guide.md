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
│   └── projeto-guide.md  ← este arquivo
├── assets/               ← exportar do Figma (imagens, logos, ícones)
├── screenshots/          ← prints das seções por página (referência visual)
├── css/
│   ├── tokens.css        ← variáveis CSS do design system
│   ├── base.css          ← reset e estilos base
│   └── components.css    ← componentes reutilizáveis
├── js/
│   └── main.js           ← scripts principais
├── CLAUDE.md
├── style-guide.html      ← documentação de componentes (criar primeiro)
└── index.html            ← página principal
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

> Preencha esta seção após extrair do Figma ou conforme o briefing do cliente.

### Cores
| Token | Hex | Uso |
|---|---|---|
| --color-primary | #000000 | [preencher após análise do Figma] |
| --color-secondary | #000000 | [preencher após análise do Figma] |
| --color-background | #FFFFFF | [fundo padrão] |
| --color-text | #000000 | [texto principal] |

### Tipografia
| Estilo | Tamanho | Peso | Line-height |
|---|---|---|---|
| Display | [px] | [peso] | [%] |
| H1 | [px] | [peso] | [%] |
| H2 | [px] | [peso] | [%] |
| Body | [px] | [peso] | [%] |

**Família:** [Nome da fonte — preencher após análise do Figma]

### Grid (Figma)
- **Desktop:** [N] colunas · [X]px/col · gutter [Y]px · container [Z]px
- **Mobile:** [N] colunas · margin [X]px · gutter [Y]px

### Espaçamentos
- Padding horizontal das seções: [X]px
- Padding vertical das seções: [Y]px
- Gap entre colunas: [Z]px
- Gap entre cards: [W]px

## Convenções de classes
- **Seção:** `.section` + `.section--dark` / `.section--light`
- **Botão:** `.btn` + `.btn--primary` / `.btn--secondary` + `.btn--sm` / `.btn--lg`
- **Card:** `.card` + `.card--[variante]`
- **Grid:** `.grid` + `.grid-[cols]`
- **Scroll reveal:** `data-reveal` + `data-reveal="left|right|scale"`

## Páginas
| Página | Status | Seções |
|---|---|---|
| style-guide.html | ⬜ Pendente | Documentação de componentes |
| index.html | ⬜ Pendente | [mapear seções após análise do Figma] |

## Assets disponíveis
> Preencher após exportar do Figma.

### Logos
- `assets/logo-[variante].svg` — [uso]

### Ícones
- `assets/icon_*.svg`

### Imagens
- `assets/[nome].png` — [descrição]

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
