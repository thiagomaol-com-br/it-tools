# Análise de Cores e Superfícies: UI Playbook (Seção 1.2) vs. IT-Tools

Auditoria técnica e mapeamento de conformidade da seção **1.2. Paleta de Cores e Superfícies** com a arquitetura atual do **IT-Tools**.

---

## 1. O que já está 100% compatível

* **Cor Primária Institucional:** Laranja quente (`#F97415` / `hsl(25, 95%, 53%)`) já é o token global primário da aplicação (botões, links ativos e destaques).
* **Ausência de Resíduos Indesejados:** Verificação concluída no repositório com zero ocorrências de `rgba(31, 38, 135, ...)` herdados de bibliotecas genéricas. Todas as sombras são neutras (`rgba(0, 0, 0, ...)`).
* **Fundo Dark Base:** O canvas `#0A0A0A` já está definido nos tokens da marca em [tokens.json](src/brand/tokens.json).
* **Tipografia e Contraste:** Textos principais em `#F5F5F5` (Dark) e `#1A1A1A` (Light) atendem aos requisitos WCAG AA (> 4.5:1).

---

## 2. O que podemos aplicar de imediato (Zero Risco)

1. **Tokens Solarpunk Âmbar no CSS Global ([fonts.css](src/brand/fonts/fonts.css) / [unocss.config.ts](unocss.config.ts)):**
   - Registrar as variáveis CSS oficiais:
     - `--color-amber`: `#F59E0B`
     - `--color-amber-glass`: `hsla(38, 92%, 50%, 0.14)`
     - `--color-amber-border`: `hsla(38, 92%, 50%, 0.45)`
     - `--color-amber-shadow`: `0 12px 40px 0 hsla(38, 92%, 50%, 0.25)`
   - Mapear no UnoCSS para permitir uso utilitário quando necessário.
2. **Harmonização do Canvas no Boot ([index.html](index.html) e [themes.ts](src/themes.ts)):**
   - Atualizar a cor de fundo pré-renderização de `index.html` de `#1c1c1c` para `#0A0A0A` no Dark e de `#f1f5f9` para `#F8FAFC` no Light.
   - Isso elimina o piscar cinza durante o carregamento inicial da página.
3. **Superfícies Translúcidas de Cards ([c-card.theme.ts](src/ui/c-card/c-card.theme.ts) e [themes.ts](src/themes.ts)):**
   - No Dark: substituir o cinza opaco `#232323` dos cards por `rgba(255, 255, 255, 0.05)`, com borda `rgba(255, 255, 255, 0.08)` e sombra suave `0 8px 32px 0 rgba(0, 0, 0, 0.37)`.
   - No Light: adotar fundo limpo `#FFFFFF` / `rgba(255, 255, 255, 0.7)` com borda `rgba(0, 0, 0, 0.08)` e sombra `0 8px 32px 0 rgba(0, 0, 0, 0.08)`.
   - Os cards de ferramentas passam a respirar integrados ao fundo, em vez de blocos opacos pesados.
* **RESOLUÇÃO:**
  - OK.
---

## 3. Pontos de Atenção e Compatibilização para Análise

### Questão 1: Implementação da Camada "Aurora Glow" no Topo
* **O Playbook define:**
  Uma elipse radial suave no topo fixo com blur de 60px (`hsla(25, 95%, 53%, 0.12)` no Dark / `0.05` no Light), cobrindo 10% a 15% visual sem saturar a tela.
* **O Contexto do IT-Tools:**
  - O cabeçalho do logotipo da barra lateral já possui seu próprio gradiente aprovado ([hero-gradient.svg](src/assets/hero-gradient.svg) em tons de cobre escuro).
  - A barra superior (`.navbar`) é fixa/sticky para permitir a busca e navegação rápida durante a rolagem.
* **Proposta de Compatibilização:**
  - Inserir a camada Aurora Glow no fundo da área de conteúdo principal ([base.layout.vue](src/layouts/base.layout.vue)), configurada com `pointer-events: none; z-index: 0; position: fixed;`.
  - No mobile, manter opacidade reduzida e contida no topo para não sobrecarregar telas pequenas de calor térmico, respeitando estritamente a "Regra de Ouro" do Playbook.
* **RESOLUÇÃO:**
  - APROVADO

---

### Questão 2: Fundo do Menu Lateral (Sider)
* **O Playbook define:**
  Canvas predominante neutro (85% a 90%) com destaque apenas no topo.
* **O Contexto do IT-Tools:**
  - O menu lateral contém mais de 470 ferramentas agrupadas em sanfonas expansíveis.
  - Atualmente, o sider usa `#171717` (Dark) e `#F5F5F5` (Light), o que cria uma sutil separação de profundidade em relação ao canvas `#0A0A0A`.
* **Proposta de Compatibilização:**
  - Manter o sider em `#171717` (Dark) e `#F8FAFC` (Light) para garantir contraste e legibilidade com a lista densa de ferramentas, alinhando as bordas divisórias ao padrão `rgba(255, 255, 255, 0.08)`.
* **RESOLUÇÃO:**
  - APROVADO
