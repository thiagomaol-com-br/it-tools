# Análise de Breakpoints e Responsividade: UI Playbook (Seção 1.5) vs. IT-Tools

Auditoria técnica da seção **1.5. Breakpoints e Responsividade** (linhas 116 a 123 do UI Playbook) e avaliação de impacto na aplicação **IT-Tools**.

---

## 1. O que podemos aplicar de imediato (Zero Risco & Grande Ganho Visual)

1. **Largura Máxima de Leitura na Página Inicial ([About.vue](src/pages/About.vue)):**
   - **O Playbook define:** *Largura máxima de conteúdo no Desktop: `max-w-5xl` ou `max-w-6xl` centralizado*.
   - **No IT-Tools hoje:** O texto do [About.vue](src/pages/About.vue) se expande por toda a largura disponível da área de conteúdo. Em monitores ultrawide ou telas largas de desktop, as linhas de texto ficam excessivamente compridas (> 120 caracteres por linha), dificultando a leitura.
   - **Ajuste proposto:** Delimitar o container de leitura da Home com `max-w-4xl` (`max-width: 900px; margin: 0 auto; padding: 0 16px;`), centralizando a apresentação institucional exatamente como no site oficial.
2. **Margem Lateral Mínima no Mobile (16px / 20px):**
   - **O Playbook define:** *Margem lateral obrigatória no Mobile: 16px (ou 20px). Nenhum elemento encosta na borda da tela*.
   - **Ajuste proposto:** Garantir padding lateral mínimo de `16px` no container mobile, impedindo que textos ou bordas de cards colem na borda do smartphone.
3. **Páginas das Ferramentas ([tool.layout.vue](src/layouts/tool.layout.vue)):**
   - Já opera com `max-width: 1200px; margin: 0 auto;`, o que coincide com a faixa canônica do `max-w-6xl` (1152px–1200px) do Playbook.

---

## 2. Ponto de Atenção e Divergência: Breakpoint de Mobile (700px vs. 768px)

### O Contexto:
* **O Playbook define:**
  - Mobile: `< 768px`
  - Tablet: `768px – 1023px`
  - Desktop: `>= 1024px`
* **O IT-Tools atualmente:**
  - Foi desenvolvido e calibrado com o breakpoint de **`700px`** em [style.store.ts](src/stores/style.store.ts) (`isSmallScreen = useMediaQuery('(max-width: 700px)')`), [MenuLayout.vue](src/components/MenuLayout.vue) e [base.layout.vue](src/layouts/base.layout.vue).
  - Abaixo de 700px: o menu lateral vira uma gaveta (*drawer*) que sobrepõe a tela, e a barra superior adota os botões compactos.
  - Acima de 700px: o menu lateral fica aberto de forma fixa à esquerda (com largura de ~240px) e o catálogo fica visível.

### Avaliação de Risco:
* A diferença entre `700px` e `768px` afeta apenas uma janela muito estreita de 68 pixels (telas entre 701px e 767px).
* Celulares comuns (iPhone, Galaxy, Pixel) têm largura de viewport entre `360px` e `430px`, operando 100% no modo mobile em ambos os casos.
* Tablets comuns (iPad portrait) têm largura de `768px`, operando com a barra fixa no desktop.
* Se mantivermos `700px`: nenhuma linha de código ou cálculo de gaveta existente é perturbada (100% seguro).
* Se migrarmos para `768px`: alinha formalmente ao número do Playbook (`md: 768px`), com impacto prático quase imperceptível para os usuários finais.

### Opções para Sua Decisão:

* **Opção A (Mais segura e recomendada):** Manter o breakpoint interno do IT-Tools em `700px` (que já foi rigorosamente testado e calibrado com a animação da gaveta e cálculo do scroll), aplicando do Playbook apenas a largura máxima centralizada (`max-w-5xl`) e as margens laterais de 16px no mobile.
* **Opção B:** Atualizar a variável de `isSmallScreen` de `700px` para `768px` em todos os componentes de layout.

* **RESOLUÇÃO:**
  - OPÇÃO A; vamos priorizar o mais seguro e recomendado.
