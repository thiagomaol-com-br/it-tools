# Análise de Tipografia: UI Playbook (Seção 1.1) vs. IT-Tools

Documento de auditoria e levantamento de pontos de atenção para alinhamento da tipografia do **IT-Tools** com o **Design System 1.0 (UI Playbook)** do site oficial.

---

## 1. O que já está 100% compatível

* **Famílias Principais:** Os arquivos locais `.woff2` de `Inter` e `Space Grotesk` já estão importados em [src/brand/fonts/fonts.css](src/brand/fonts/fonts.css).
* **Variáveis CSS:** `--font-heading` (Space Grotesk) e `--font-body` (Inter) já estão registradas no `:root`.
* **Corpo de Texto:** O padrão de `1rem` (16px) com `line-height: 1.6` e fonte `Inter` já é a base padrão da aplicação.

---

## 2. O que podemos aplicar de imediato (Zero Risco)

1. **Tipografia da Página Inicial ([About.vue](src/pages/About.vue)):**
   - Aplicar `Space Grotesk`, peso 800 e escala fluida `clamp(2.5rem, 5.5vw, 4.25rem)` no `# Central de Ferramentas` (título principal).
   - Aplicar `Space Grotesk`, peso 700 e escala fluida `clamp(1.75rem, 3.5vw, 2.5rem)` em todos os subtítulos `##` (*O Problema*, *O Que Eu Faço*, *Quer Levar Essa Tranquilidade*, *Créditos*).
   - Ajustar os badges `.icon-badge--step` para a escala exata de eyebrow (`0.75rem` / 12px, mono, `letter-spacing: 0.05em`).
2. **Títulos dos Cards de Ferramentas ([ToolCard.vue](src/components/ToolCard.vue)):**
   - Ajustar o título de cada card para `1.25rem` (20px) e `font-weight: 600`, conferindo a presença visual descrita no Playbook sem alterar a grade.
3. **Mapeamento no UnoCSS ([unocss.config.ts](unocss.config.ts)):**
   - Registrar as famílias `font-display: 'Space Grotesk'` e `font-body: 'Inter'` para permitir o uso direto de classes utilitárias.

---

## 3. Divergências Relevantes e Questões para Análise

### Questão 1: H1 Hero Principal vs. Título das Páginas de Ferramentas
* **O Playbook define:**
  `H1 (Hero Principal): clamp(2.5rem, 5.5vw, 4.25rem)` com peso 800 e line-height 1.1.
* **O Contexto do IT-Tools:**
  - Na página inicial (Home/Apresentação), esse tamanho fica impecável e reproduz a estética do site oficial.
  - Nas **páginas internas das ferramentas** (ex.: `/token-generator`, `/json-formatter`), a área útil deve ser priorizada. Um H1 de até 68px de altura empurraria os campos da ferramenta para baixo da dobra da tela no desktop.
* **Proposta de Compatibilização:**
  - Usar o H1 com escala fluida máxima (`clamp(...)` peso 800) exclusivamente na **Página Inicial**.
  - No cabeçalho das ferramentas individuais ([tool.layout.vue](src/layouts/tool.layout.vue)), aplicar a tipografia `Space Grotesk` com peso 700, mas com escala mais comedida (ex.: `clamp(1.75rem, 3vw, 2.25rem)`), preservando a densidade necessária para o trabalho técnico.

---

### Questão 2: Fonte Mono (`JetBrains Mono` ou `Fira Code`)
* **O Playbook define:**
  `Código e Valores Técnicos / Eyebrows (Mono): JetBrains Mono ou Fira Code`.
* **O Contexto do IT-Tools:**
  - Atualmente, [fonts.css](src/brand/fonts/fonts.css) usa `--font-mono: ui-monospace, monospace;` (fontes padrão do sistema operacional do visitante: Consolas, SF Mono, Menlo).
  - O projeto contém editores CodeMirror e áreas de código (JSON, SQL, Regex, hashes).
* **Opções para Análise:**
  - **Opção A (Mais leve):** Manter o fallback nativo de sistema (`ui-monospace, monospace`), sem adicionar novos downloads de fontes no carregamento do site.
  - **Opção B (Fidelidade máxima):** Baixar e empacotar localmente o arquivo `.woff2` do `JetBrains Mono` em `src/brand/fonts/` para padronizar todos os campos técnicos.

---

### Questão 3: Peso 800 da fonte `Space Grotesk`
* **O Playbook define:**
  `Space Grotesk` com pesos 600, 700 e 800.
* **O Contexto do IT-Tools:**
  - O arquivo [space-grotesk-latin.woff2](src/brand/fonts/space-grotesk-latin.woff2) importado pelo projeto está registrado com range `font-weight: 300 700;`.
  - Ao declarar `font-weight: 800`, o navegador utiliza o peso máximo disponível (700 Bold) ou aplica sintetização.
* **Impacto:**
  - O peso 700 já entrega o impacto visual necessário para os títulos em Space Grotesk. Se você fizer questão do 800 ultra-pesado nativo, precisaremos substituir o asset `.woff2` por uma versão que contenha o peso 800 embutido.
