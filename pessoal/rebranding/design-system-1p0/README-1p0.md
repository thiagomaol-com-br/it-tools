# UI Playbook — Ecossistema Thiago Maol
> **Status:** Especificação Canônica Consolidada (Pronto para Execução)  
> **Escopo:**
> - `site`: `/mnt/dados/home/thiago/PROJETOS/ghub_org_thiagomaol-com-br/hub/site`
> - `simulador`: `/mnt/dados/home/thiago/PROJETOS/ghub_org_thiagomaol-com-br/descobridor-oportunidades`
> - `ferramentas`: `/mnt/dados/home/thiago/PROJETOS/ghub_org_thiagomaol-com-br/it-tools`
> **Objetivo:** Estabelecer o contrato visual e estrutural único para todas as interfaces públicas, garantindo coerência rigorosa entre desktop e mobile.

---

## 1. Fundamentos & Tokens Universais

### 1.1. Tipografia
* **Títulos e Destaques (Display/Headings):** `Space Grotesk` (pesos 600, 700 e 800).
* **Corpo e Interface (Body/UI):** `Inter` (pesos 400, 500 e 600).
* **Código e Valores Técnicos / Eyebrows (Mono):** `JetBrains Mono` ou `Fira Code`.
* **Escala Tipográfica Padronizada:**
  * **H1 (Hero Principal — Padrão Fluido Aprovado):**
    ```css
    font-size: clamp(2.5rem, 5.5vw, 4.25rem);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.02em;
    ```
    *(Escala suavemente de 40px no mobile até 68px em telas ultrawide sem quebras bruscas).*
  * **H2 (Títulos de Seção):** `clamp(1.75rem, 3.5vw, 2.5rem)` com peso 700 e line-height 1.2.
  * **H3 / Títulos de Card:** `1.25rem` (20px) com peso 600.
  * **Corpo (Texto comum):** `1rem` (16px) com line-height `1.6`.
  * **Microcópias / Legendas:** `0.875rem` (14px).
  * **Eyebrow / Badges:** `0.75rem` (12px) em fonte mono, caixa alta e `letter-spacing: 0.05em`.

### 1.2. Paleta de Cores e Superfícies — [PADRÃO APROVADO]
* **Cor Primária (Sotaque/Ação):** Laranja quente (`#F97415` / `hsl(25, 95%, 53%)`).
* **Cor de Acento Secundário (Solarpunk Âmbar):**
  * `--color-amber`: `#F59E0B` (`hsl(38, 92%, 50%)`).
  * `--color-amber-glass`: `hsla(38, 92%, 50%, 0.14)`.
  * `--color-amber-border`: `hsla(38, 92%, 50%, 0.45)`.
  * `--color-amber-shadow`: `0 12px 40px 0 hsla(38, 92%, 50%, 0.25)`.
* **Proibição Expressa de Resíduo Roxo/Azul:**
  * Proibido terminantemente o uso de `rgba(31, 38, 135, ...)` herdado de templates genéricos de glassmorphism. Todas as sombras de repouso devem ser neutras e limpas (`rgba(0, 0, 0, ...)`), e os destaques interativos devem usar exclusivamente o **Âmbar Solarpunk**.

* **Fundo Oficial das Páginas: Canvas Predominante + Aurora Glow Suave no Topo:**
  * O fundo das aplicações **não é uma cor chapada e nem uma sopa laranja saturada**. Ele é **predominantemente neutro (85% a 90% da percepção visual)**, com um único halo difuso suave no topo (padrão canônico do `simulador`).
  * **Modo Escuro (Dark):**
    * Fundo Base (Canvas): `#0A0A0A` predominante.
    * Superfície de Cards e Painéis: `rgba(255, 255, 255, 0.05)`.
    * Bordas e Divisores de Vidro: `rgba(255, 255, 255, 0.08)`.
    * Sombra de Repouso: `0 8px 32px 0 rgba(0, 0, 0, 0.37)`.
    * Texto Principal: `#F5F5F5` (`hsl(0, 0%, 96%)`).
    * Texto Secundário (Muted): `#A6A6A6` (`hsl(0, 0%, 65%)`).
    * **Aurora Glow Oficial (Dark):**
      ```css
      /* Camada única fixa no topo (pointer-events: none; z-index: 0;) */
      position: fixed;
      top: -20%;
      left: 50%;
      transform: translateX(-50%);
      width: 80rem;
      height: 40rem;
      background: radial-gradient(
        ellipse at center,
        hsla(25, 95%, 53%, 0.12) 0%,
        hsla(50, 95%, 50%, 0.06) 40%,
        transparent 70%
      );
      filter: blur(60px);
      ```
  * **Modo Claro (Light):**
    * Fundo Base (Canvas): `#F8FAFC` predominante.
    * Superfície de Cards e Painéis: `rgba(255, 255, 255, 0.4)`.
    * Bordas e Divisores: `rgba(0, 0, 0, 0.08)`.
    * Sombra de Repouso: `0 8px 32px 0 rgba(0, 0, 0, 0.08)`.
    * Texto Principal: `#1A1A1A` (`hsl(0, 0%, 10%)`).
    * Texto Secundário (Muted): `#595959` (`hsl(0, 0%, 35%)`).
    * **Aurora Glow Oficial (Light):**
      ```css
      background: radial-gradient(
        ellipse at center,
        hsla(25, 95%, 53%, 0.05) 0%,
        hsla(50, 95%, 50%, 0.02) 40%,
        transparent 70%
      );
      filter: blur(60px);
      ```
  * *Regra de Ouro:* Proibido empilhar múltiplas camadas animadas de 50% de opacidade no mobile que cubram a tela de laranja. O fundo deve respirar escuro (ou claro) com apenas um toque térmico difuso no topo.

### 1.3. Mídias & Ícones Canônicos

A pasta [`design-system/assets/`](assets/) é a **fonte única de verdade** para todas as mídias do ecossistema:

* **`assets/logos/`**: Logotipos oficiais completos (versões monocromáticas, com gradiente, claras e escuras).
* **`assets/brand-icons/`**: O símbolo/isotipo proprietário de Thiago Maol (`icon-accent.svg`, `icon-dark.svg`, `icon-light.svg`). Usado de forma isolada em avatares, favicon base ou no cabeçalho mobile.
* **`assets/favicons/`**: Pacote oficial de favicons para navegadores.
* **`assets/ui-icons/`**: Ícones utilitários e funcionais da interface (SVGs canônicos padronizados):
  * **Sistema:** Sol (`sun.svg`), Lua (`moon.svg`), Menu Hambúrguer (`menu.svg`), Fechar (`close.svg`), Busca (`search.svg`), Seta Externa (`external.svg`).
  * **Canais / Redes:** GitHub (`github.svg`), WhatsApp (`whatsapp.svg`), E-mail (`mail.svg`).
* **Padrão Técnico dos Ícones de UI:**
  * Traço (stroke-width): `1.75px` ou `2px` padronizado.
  * Tamanho base de exibição: `20px` (inline/botões) e `24px` (navbar).

### 1.4. Geometria, Cantos e Elevações — [PADRÃO APROVADO]
* **Raio de Borda (Border Radius):**
  * **Botões, Ações e Inputs:** `12px` (`0.75rem` / `var(--radius-md)`) — [PADRÃO APROVADO].
  * **Cards e Modais:** `16px` (`1rem` / `var(--radius-lg)`).
  * **Eyebrows, Badges, Tags, Filtros, Caixinhas de Métrica e Controles Utilitários da Barra (Tema/Busca):** `6px` (`0.375rem` / `var(--radius-sm)`) — [PADRÃO APROVADO: formato retangular com quatro lados retos bem definidos e cantos suavizados. Proibido formato de cápsula/pílula oval com extremidades semicirculares `9999px`].
* **Elevações e Sombras (Profundidade no Eixo Z) — [PADRÃO APROVADO]:**
  * **Navbar Suspenso (3ª Dimensão Singela):**
    * *Light Mode:* `0 4px 24px 0 rgba(0, 0, 0, 0.08), 0 1px 2px 0 rgba(0, 0, 0, 0.04)` — sombra translúcida que projeta leveza e descola o cabeçalho do conteúdo durante o scroll.
    * *Dark Mode:* `0 10px 30px -5px rgba(0, 0, 0, 0.8), 0 4px 12px -2px rgba(0, 0, 0, 0.5)` — oclusão ambiental de alta densidade que recorta o elemento sobre o canvas `#0A0A0A` e sobre os elementos que passam por baixo.
  * **Cards e Painéis de Conteúdo:** Sombra suave em repouso (`0 8px 32px 0 rgba(0, 0, 0, 0.08)` no light / `rgba(0, 0, 0, 0.37)` no dark) e elevação com glow Solarpunk no hover (`--color-amber-shadow`).
* **Transições e Efeitos:**
  * Backdrop-blur em elementos suspensos: `blur(12px)`.
  * Duração padrão de hover/transição: `150ms` ou `200ms ease`.
  * Transição de microinterações de rotação (ícones): `300ms cubic-bezier(0.4, 0, 0.2, 1)`.

### 1.5. Breakpoints e Responsividade
* **Breakpoints Oficiais:**
  * Mobile: `< 768px`
  * Tablet: `768px – 1023px`
  * Desktop: `>= 1024px`
* **Margens e Larguras Máximas:**
  * Margem lateral obrigatória no Mobile: `16px` (ou `20px`). Nenhum elemento encosta na borda da tela.
  * Largura máxima de conteúdo no Desktop: `max-w-5xl` ou `max-w-6xl` centralizado.

---

## 2. O "Chassi" Global (Navbar & Footer)

### 2.1. Barra Superior (Navbar) — [PADRÃO APROVADO]
* **Escala e Altura Compacta Padronizada — [PADRÃO APROVADO]:**
  * **Padding Vertical:** `0.625rem 0` (10px superior e inferior).
  * **Altura Total Resultante:** ~`60px` no desktop e ~`50px` no mobile. Elimina qualquer "gordura" vertical desnecessária e devolve área útil para o conteúdo.
* **Comportamento & Efeito "Vidro Vivo" (Saturated Glassmorphism):**
  * Posicionamento: `sticky top-0`, `z-index: 200`, largura `100%`.
  * **Fórmula visual oficial (Dark Mode):**
    ```css
    background: rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(16px) saturate(160%);
    -webkit-backdrop-filter: blur(16px) saturate(160%);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.8), 0 4px 12px -2px rgba(0, 0, 0, 0.5);
    ```
  * **Fórmula visual oficial (Light Mode):**
    ```css
    background: rgba(255, 255, 255, 0.65);
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.08), 0 1px 2px 0 rgba(0, 0, 0, 0.04);
    ```
  * **Efeito de Elevação e 3ª Dimensão — [PADRÃO APROVADO]:**
    * O navbar atua como um plano físico suspenso flutuando no eixo Z. Durante a rolagem, a sombra projeta uma oclusão suave sobre textos, cards e cores que passam por baixo.
    * *No Light Mode:* Sombra suave e difusa de tom neutro (`0 4px 24px rgba(0, 0, 0, 0.08)`), criando a terceira dimensão com leveza sobre o canvas `#F8FAFC`.
    * *No Dark Mode:* A sombra exige maior densidade e profundidade (`0 10px 30px -5px rgba(0, 0, 0, 0.8)`). Como o canvas base é `#0A0A0A`, uma sombra fraca (10%) fica imperceptível; a calibragem densa garante que o recorte tridimensional e a oclusão aconteçam com força tátil e elegância sobre o conteúdo inferior.
  * *Por que funciona:* O `saturate(160%)` faz os elementos coloridos (laranja, badges e botões) acenderem e brilharem com elegância conforme passam sob a barra translúcida. Fundos opacos (>40%) estão proibidos na barra.
* **Estrutura e Elementos (Esquerda para a Direita):**
  1. **Logotipo Oficial da Marca — [PADRÃO APROVADO]:**
     * Proporção vetorial estrita `4.2:1` (derivada do viewBox `236×56`).
     * **Desktop:** `168px × 40px` (altura base de `40px`), garantindo autoridade e nitidez imediata no topo.
     * **Mobile (≤ 768px):** Altura base de `28px` (largura proporcional ~`118px`).
  2. **Links de Navegação Principal:**
     * **Espaçamento e Tipografia:** Padding compacto de `0.35rem 0.65rem` com `font-size: var(--text-sm)` e `line-height: 1.4`.
     * **Cantos:** `border-radius: var(--radius-sm)` (6px).
     * **Indicador Ativo:** Traço inferior de `18px × 2px` centralizado com `--color-accent`.
  3. **Controles Utilitários (Extrema Direita):**
     * **Alternador de Tema (ThemeToggle) e Busca — [PADRÃO APROVADO]:**
       * Tamanho do botão: `36px × 36px` (área de toque refinada e não intrusiva).
       * Cantos: `border-radius: var(--radius-sm)` (6px).
       * Ícones SVG oficiais: [`ui-icons/sun.svg`](assets/ui-icons/sun.svg) e [`ui-icons/moon.svg`](assets/ui-icons/moon.svg) com tamanho calibrado em **`18px × 18px`**.
       * **Animação de Transição Fluida Sol/Lua (Desktop & Mobile):**
         ```css
         .icon {
           position: absolute;
           width: 18px;
           height: 18px;
           transition: opacity 300ms cubic-bezier(0.4, 0, 0.2, 1),
                       transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
         }
         /* Estado inativo: encolhido e rotacionado */
         .icon-sun, .icon-moon {
           opacity: 0;
           transform: scale(0.7) rotate(-90deg);
         }
         /* Modo Claro: Sol acende girando para posição 0 */
         [data-theme='light'] .icon-sun {
           opacity: 1;
           transform: scale(1) rotate(0deg);
         }
         [data-theme='light'] .icon-moon {
           opacity: 0;
           transform: scale(0.7) rotate(90deg);
         }
         /* Modo Escuro: Lua acende girando para posição 0 */
         [data-theme='dark'] .icon-moon {
           opacity: 1;
           transform: scale(1) rotate(0deg);
         }
         [data-theme='dark'] .icon-sun {
           opacity: 0;
           transform: scale(0.7) rotate(-90deg);
         }
         ```
   4. **Botão de Destaque da Barra (CTA Comercial / "Solicitar Solução") — [PADRÃO APROVADO]:**
      * **Configuração via Contrato de Dados (`site.config.ts`):** O item na lista de navegação aceita a flag opcional `cta: true` (ex: `{ name: 'Solicitar solução', href: '/solicitar-solucao/', cta: true }`), desacoplando a lógica de navegação da interface e permitindo que o item se destaque automaticamente como ação principal.
      * **Estilização no Desktop:**
        * **Formato e Raio:** Formato de botão sólido com cantos de **`12px`** (`var(--radius-md)`), respeitando a regra canônica de ações principais (ao contrário dos links comuns e controles utilitários que usam 6px).
        * **Espaçamento e Tipografia:** Padding compacto de `0.35rem 0.85rem` com `font-size: var(--text-sm)`, `font-weight: 600`, `line-height: 1.4` e respiro à esquerda `margin-left: var(--space-xs)`.
        * **Tratamento do Indicador Ativo:** A barra inferior padrão (`::after`) é explicitamente desativada (`display: none`), pois o botão já possui preenchimento sólido de destaque.
      * **Cromática Solarpunk (Light & Dark):**
        * *Modo Claro (Light Mode):*
          * Fundo: Gradiente sutil Solarpunk Laranja `linear-gradient(135deg, hsl(25, 95%, 46%), hsl(25, 95%, 39%))`.
          * Texto: `#ffffff` para contraste e nitidez.
          * Borda: `1px solid hsla(25, 95%, 55%, 0.3)`.
          * Sombra: `0 2px 10px -2px hsla(25, 95%, 45%, 0.35)`.
          * Microinteração (Hover): `transform: translateY(-1px)`, sombra reforçada `0 4px 16px -2px hsla(25, 95%, 45%, 0.5)` e `filter: brightness(1.05)`.
        * *Modo Escuro (Dark Mode):*
          * Fundo: Gradiente Solarpunk Laranja vibrante `linear-gradient(135deg, hsl(25, 95%, 56%), hsl(25, 95%, 47%))`.
          * Texto: `#0a0a0a` (preto profundo para máxima legibilidade sobre o tom alaranjado).
          * Borda: `1px solid hsla(25, 95%, 65%, 0.4)`.
          * Sombra: `0 2px 14px -2px hsla(25, 95%, 50%, 0.45)`.
          * Microinteração (Hover): `transform: translateY(-1px)`, sombra reforçada `0 4px 20px -2px hsla(25, 95%, 50%, 0.65)` e `filter: brightness(1.08)`.
      * **Comportamento no Menu Mobile (Gaveta / Dropdown):**
        * **Posicionamento:** Ancorado no rodapé da gaveta de navegação (`margin-top: var(--space-sm)` e `margin-left: 0`).
        * **Ergonomia e Área de Toque:** Ocupa largura total (`width: 100%`) com altura mínima confortável de **`48px`** (`min-height: 48px`), tipografia em destaque (`font-size: var(--text-base)` e `font-weight: 700`) e conteúdo perfeitamente centralizado (`justify-content: center`).
* **Menu Mobile Ancorado (Dropdown & Scroll Resiliente) — [PADRÃO APROVADO]:**
  * **Ancoragem Direta:** `position: absolute; top: 100%;` ancorado logo abaixo do cabeçalho sticky, garantindo abertura estável em qualquer posição de rolagem da página (elimina bugs de posicionamento ao clicar no meio do documento).
  * **Dimensão Dinâmica:** `max-height: calc(100dvh - 100%)` com `overflow-y: auto`, prevenindo quebras em telas curtas ou modo paisagem.
  * **Animação:** `transform: translateY(-8px)` transicionando suavemente para `translateY(0)` com fade de opacidade.
  * **Auto-fechamento no Scroll:** O menu escuta eventos de rolagem com listener passivo e se recolhe automaticamente ao detectar rolagem, dispensando hacks invasivos de trava de tela (`lockScroll`).

### 2.2. Rodapé (Footer) — Arquitetura de Papéis — [PADRÃO APROVADO]

* **Frase Oficial de Assinatura do Ecossistema — [PADRÃO APROVADO]:**
  > **"Tecnologia prática a serviço das pessoas. Menos tarefas mecânicas e menos sobrecarga mental na rotina da sua empresa."**
  *(Sóbria, honesta e sem jargões ou promessas infladas. Substitui manifestos longos e citações teóricas).*

O ecossistema adota a mesma estética e tipografia no rodapé, mas **cada aplicação cumpre um papel estratégico diferente na conversão**:

#### 1. Portal Institucional (`site`) — O Rodapé Completo
* **Função:** Ponto de autoridade, aprofundamento e governança.
* **Padronização Canônica da Marca no Rodapé — [PADRÃO APROVADO]:**
  * **Uso Mandatório do Ativo Vetorial:** A Coluna 1 da marca deve renderizar obrigatoriamente o logotipo oficial vetorizado (`<BrandLogo />` ou arquivo SVG canônico de [`assets/logos/`](assets/logos/)), preservando a tipografia `Space Grotesk` e o ponto de acento Laranja Quente (`#F97415`).
  * **Escala do Logotipo no Rodapé:** Altura calibrada em **`32px`** no desktop e **`28px`** no mobile (proporção vetorial `4.2:1`).
  * **Proibição Expressa de Texto Puro Desprovido do Ponto:** Proibido terminantemente renderizar `<h3>Thiago Maol</h3>` em texto plano, sem o ponto `.`, ou com fontes genéricas desvinculadas da identidade da marca.
* **Estrutura (4 Colunas no Desktop / Empilhado no Mobile):**
  * *Coluna 1 (Marca):* Logotipo oficial vetorizado (`<BrandLogo />`, altura 32px) + Frase oficial de assinatura logo abaixo.
  * *Coluna 2 (Navegação):* Links diretos para seções internas (Portfólio, Casos, Sobre, Contato).
  * *Coluna 3 (Ecossistema):* Links cruzados para o *Simulador de Economia de Horas* e *Central de Ferramentas*.
  * *Coluna 4 (Redes e Contato):* Ícones canônicos SVG (`github.svg`, `whatsapp.svg`, `email.svg`, `instagram.svg`, `youtube.svg`).
* **Linha Inferior:** Copyright sóbrio em 1ª pessoa (`© 2026 Thiago Maol`) + links para Termos de Uso e Privacidade.

#### 2. Simulador de Horas (`simulador`) — O Rodapé Blindado (Ultra-Minimalista)
* **Função:** Funil de alta conversão (*Single-Task Wizard*). **Zero pontos de fuga desnecessários.**
* **Estrutura:** Linha discreta e limpa no rodapé:
  * **Assinatura Institucional Inline Padronizada:** Em formato textual em linha única, é obrigatório grafar a marca em `Space Grotesk` com o ponto final isolado e estilizado em Laranja Quente (`#F97415`):  
    `Thiago Maol<span class="text-accent">.</span> • Eficiência Consciente — Menos tarefas mecânicas e menos sobrecarga mental.`
  * Link discreto para o Portal (`thiagomaol.com.br`)
  * Links legais essenciais (Termos e Privacidade).
  * *Proibição expressa:* Menus cheios de links, botões secundários ou citações acadêmicas que dispersem o visitante antes ou depois da simulação.

#### 3. Central de Ferramentas (`ferramentas`) — O Rodapé de Conversão & Gestão Técnica
* **Função:** Demonstração prática de maturidade de software e isca de atração para consultoria/gestão técnica.
* **Estrutura:**
  * **Assinatura e Chamada de Conversão Sob Medida (Foco na Dor Real):**
    * Logotipo oficial vetorizado (`<BrandLogo />` / SVG canônico) ou assinatura canônica com ponto laranja (`Thiago Maol<span class="text-accent">.</span>`).
    * Chamada direta:
      > *"Precisa de uma ferramenta dedicada para a sua operação sem pagar assinaturas inflacionadas por usuário? Eu implanto e gerencio soluções sob medida para o seu negócio."*
  * Botão de Ação Direta para Contato (`[ Conversar no WhatsApp ]` ou link de e-mail).
  * Link de retorno ao Portal Institucional (`thiagomaol.com.br`).
  * Créditos éticos de código aberto (Corentin Thomasset / ShareVB) e licença GPL-3.0.

---

## 3. Anatomia de Páginas & Seções

### 3.1. Seção Principal (Hero Section) — [PADRÃO APROVADO]
* **Alinhamento Editorial Universal (Opção A):**
  * **Alinhamento estrito à Esquerda:** Eyebrow, manchete H1, subtítulo, botões e badges partem rigorosamente da margem esquerda.
  * Todas as seções internas de todas as páginas mantêm essa mesma continuidade de leitura à esquerda (elimina a estética de landing page centralizada genérica).
* **Estrutura & Hierarquia Visual:**
  1. **Eyebrow Minimalista e Despoluído — [PADRÃO APROVADO]:**
     * **Formato Geométrico:** Caixinha retangular com cantos suavizados (`border-radius: var(--radius-sm)` — `6px` / `0.375rem`), com quatro lados retos bem definidos. *Proibido o formato de pílula/cápsula oval com pontas redondas (9999px).*
     * **Eliminação de Luzes:** Proibido o uso de ponto pulsante ou luzinhas (`.badge-dot`).
     * **Tipografia:** `font-family: var(--font-mono); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 700;`.
     * **Cores & Contraste (Modo Claro):**
       ```css
       background: hsla(25, 95%, 53%, 0.08); /* Fundo com leve aquecimento âmbar */
       border: 1px solid hsla(25, 95%, 53%, 0.3); /* Borda laranja nítida, 100% visível no mobile */
       color: hsl(25, 100%, 35%); /* Laranja escurecido para contraste WCAG AA */
       ```
     * **Cores & Contraste (Modo Escuro):**
       ```css
       background: hsla(25, 95%, 53%, 0.1);
       border: 1px solid hsla(25, 95%, 53%, 0.25);
       color: var(--color-accent);
       ```
     * *(Essa mesma padronização retangular de 6px se aplica aos seletores de filtro, caixinhas de métricas de impacto e tags de tecnologia).*
  2. **H1 (Manchete Principal Fluida):**
     * `font-size: clamp(2.5rem, 5.5vw, 4.25rem);`
     * `font-weight: 800;`
     * `line-height: 1.1;`
     * `letter-spacing: -0.02em;`
     * Uso de `<span class="accent-text">` apenas na palavra-chave de ação (ex: economizar).
  3. **Subtítulo:**
     * `font-family: var(--font-sans); font-size: clamp(1.125rem, 2vw, 1.25rem); line-height: 1.6;`
     * Cor: `var(--color-text-muted)`.
     * Largura máxima controlada para conforto de leitura: `max-w-2xl` (672px).
  4. **Grupo de Ações (CTAs):**
     * Alinhado à esquerda com gap de `16px`.
     * Botão Primário (`btn--solid`) + Botão Secundário (`btn--glass` ou `btn--outline`).
* **Espaçamento Vertical da Hero:**
  * Desktop: `padding-top: var(--space-3xl, 4rem); padding-bottom: var(--space-2xl, 3rem);`
  * Mobile: `padding-top: var(--space-xl, 2rem); padding-bottom: var(--space-lg, 1.5rem);`

### 3.2. Cards e Contêineres de Conteúdo — [PADRÃO APROVADO]
* **Card de Vidro (`GlassCard.astro`):**
  * Raio de curvatura padrão: `16px` (`1rem` / `var(--radius-lg)`).
  * Espaçamento interno padrão (Padding): `24px` (`var(--space-xl)`), reduzindo para `16px` (`var(--space-lg)`) em telas compactas.
  * Superfície de Repouso: Fundo translúcido `var(--glass-bg)`, borda `1px solid var(--glass-border)`, sombra neutra limpa (sem tons azulados ou roxos).
  * **Microinteração de Hover (Brilho Âmbar Solarpunk):**
    ```css
    @media (hover: hover) {
      .glass-card--interactive:hover {
        transform: translateY(-2px);
        border-color: var(--color-amber-border);
        box-shadow: var(--color-amber-shadow);
      }
    }
    ```
    *(Ao passar o cursor, a borda e o brilho da sombra acendem exclusivamente no tom Âmbar Solarpunk, conferindo uma resposta tátil luminosa e sofisticada).*
* **Contêiner Responsivo (`Container.astro`):**
  * Largura máxima padrão: `72rem` (1152px / `var(--container-6xl)`).
  * Margens laterais (Padding inline): `24px` no desktop e `16px` no mobile (`max-width: 640px`). Nenhum elemento encosta na borda da tela.

### 3.3. Botões e Ações (CTAs) — [PADRÃO APROVADO]
* **Geometria & Toque:**
  * Altura mínima: `44px` (área touch ideal para dispositivos móveis).
  * Raio de curvatura: `12px` (`0.75rem` / `var(--radius-md)`) — [PADRÃO APROVADO].
  * Espaçamento interno (Padding): `8px 20px` (`--btn-py: 0.5rem; --btn-px: 1.25rem;`).
  * Tipografia: `Inter`, peso 600, tamanho base 16px (`1rem`), `line-height: 1`.
* **Microinterações:**
  * **Hover:** `transform: translateY(-1px);` com elevação sutil de sombra.
  * **Active (Toque/Clique):** `transform: translateY(0) scale(0.98);` (feedback tátil imediato).
  * **Foco acessível:** `outline: 2px solid var(--color-accent); outline-offset: 2px;`.
* **Variantes Oficiais:**
  * **`btn--solid` (Conversão Primária):**
    * Fundo: Laranja de alto contraste (`var(--color-accent-dark)`).
    * Texto: Alto contraste (`var(--color-text-inverse)`).
    * Sombra: `box-shadow: 0 4px 16px -4px var(--color-accent);`.
    * Hover: `box-shadow: 0 8px 24px -6px var(--color-accent);`.
  * **`btn--glass` (Secundário Tecnológico):**
    * Fundo: `var(--glass-bg)`, `backdrop-filter: blur(8px) saturate(180%)`.
    * Borda: `1px solid var(--glass-border)`.
    * Hover: `background: var(--color-accent-glass); border-color: var(--color-accent);`.
  * **`btn--outline` (Ação Secundária Discreta):**
    * Fundo: transparente, borda `1px solid var(--color-accent)`.
    * Texto: `var(--color-accent-text)`.
  * **`btn--ghost` (Navegação Neutra):**
    * Fundo: transparente.
    * Hover: `background: var(--color-surface);`.

### 3.4. Formulários, Inputs e Modais
* Altura padronizada de inputs: `44px` (igual aos botões para alinhamento em grid).
* Raio de curvatura: `12px` (`0.75rem`).
* Estados visuais: Padrão, Foco (anel laranja suave), Erro e Desabilitado.

---

## 4. Matriz de Coleta (O que aproveitar de cada base atual)

> *Nesta seção vamos documentar o que cada projeto já tem de melhor para integrar ao padrão global.*

| Projeto | O que já está excelente e deve virar padrão | O que precisa ser corrigido/alinhado |
| :--- | :--- | :--- |
| **Site Institucional** (`site`) | **Botões e Ações:** Raio de 12px, altura de 44px, variantes Solid, Glass, Outline e microinteração `scale(0.98)`.<br>**Ícones de UI e Redes Sociais:** SVGs canônicos padronizados.<br>**ThemeToggle:** Estrutura e animação Sol/Lua.<br>**Hero e Cabeçalhos:** Alinhamento universal à esquerda (Opção A), escala fluida `clamp(2.5rem, 5.5vw, 4.25rem)` no H1, eyebrow minimalista retangular (6px) sem luzes.<br>**Cards e Containers:** GlassCard (raio 16px) e Container.astro (max 72rem).<br>**Hover & Sombras:** Eliminação de resíduos roxos e acendimento em Âmbar Solarpunk. | Calibrar transição do ThemeToggle para 300ms no desktop para garantir rotação fluida visível;<br>Substituir o fundo da navbar (70% opaco) pelo Vidro Vivo aprovado;<br>Substituir as 3 camadas pesadas de Aurora no mobile pelo halo suave único de 12% (padrão do simulador);<br>Atualizar `siteConfig.description` com a frase de assinatura oficial aprovada. |
| **Simulador de Horas** (`simulador`) | **Efeito de Vidro Vivo da Navbar:** Aprovado como padrão (`blur(16px) saturate(160%)` com `rgba(0,0,0,0.25)`).<br>**Fundo Canvas & Aurora:** Padrão canônico aprovado (predominantemente neutro com elipse difusa suave de 12% no topo). | Realinhar a Hero e títulos de centro para a **Esquerda**;<br>Substituir o indicador com bolinha/luz pelo eyebrow retangular (6px) oficial;<br>Adotar o raio de 12px e altura de 44px nos botões e inputs;<br>Eliminar o resíduo roxo (`rgba(31, 38, 135)`) em `glass.css` e adotar o brilho Âmbar Solarpunk no hover dos cards;<br>Substituir o parágrafo acadêmico de CHT/Solarpunk pela frase de assinatura oficial resumida no rodapé ultra-minimalista. |
| **Central de Ferramentas** (`ferramentas`) | **Prova de Conceito Viva:** Instância funcional servindo como demonstração real de software dedicado e mantido. | **Consumidor do Design System:**<br>Adotar a navbar oficial de vidro com os mesmos tokens;<br>Padronizar botões com raio de 12px e utilizar os ícones de UI canônicos;<br>Garantir ausência de sombras roxas/azuis herdadas de templates genéricos;<br>Implementar o rodapé de conversão para consultoria e gestão técnica sob medida. |

---

## 5. Checklist de Aceite para os Agentes

Antes de qualquer página ou componente ser considerado "pronto para produção", o agente responsável deve validar:

- [ ] **Tipografia:** Apenas `Space Grotesk` (títulos) e `Inter` (corpo) estão sendo carregadas localmente e utilizadas.
- [ ] **Ícones:** 100% dos ícones vêm da biblioteca oficial selecionada, sem SVGs soltos ou bibliotecas misturadas.
- [ ] **Navbar:** Altura de `64px` (desktop) e `56px` (mobile), sticky com blur e logo oficial correto.
- [ ] **Mobile:** Testado em largura de `375px` e `414px`: nenhum elemento causa rolagem horizontal indesejada; margens laterais respeitadas.
- [ ] **Cores & Contraste:** Tokens oficiais respeitados nos modos Light e Dark; botão primário estritamente no Laranja oficial.
- [ ] **Links do Ecossistema:** Rodapé e navegação contêm os links cruzados atualizados.
