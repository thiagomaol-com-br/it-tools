# DevLog — IT-Tools

Registro de decisões arquiteturais estruturantes, mudanças conceituais e novos trade-offs do projeto.

---

## [2026-11-14] Design System: Barra Superior com Vidro Vivo Saturado, Sombra 3D e CTA Solarpunk

### 1. Contexto
A barra superior operava estaticamente sem profundidade no desktop, perdendo o efeito tridimensional de sobreposição sobre o conteúdo em rolagem. Além disso, a alternância de tema entre Sol e Lua não possuía transição de rotação fluida, e o CTA principal utilizava cor fixa sem a escala cromática do Design System 1.0.

### 2. Decisão
1. **Glassmorphism Saturado e Sombra 3D ([src/layouts/base.layout.vue](src/layouts/base.layout.vue)):** Implementação de barra suspensa fixa (`sticky top-0`, `z-index: 100`) com `backdrop-filter: blur(16px) saturate(160%)` e oclusão ambiental de alta densidade no Dark Mode (`0 10px 30px -5px rgba(0, 0, 0, 0.8)`) e suave no Light Mode (`0 4px 24px rgba(0, 0, 0, 0.08)`).
2. **Animação Fluida Sol/Lua ([src/components/NavbarButtons.vue](src/components/NavbarButtons.vue)):** Microinteração canônica em `300ms cubic-bezier(0.4, 0, 0.2, 1)` com rotação e escala na transição de tema.
3. **Cromática Solarpunk no CTA "Solicitar Solução" ([src/layouts/base.layout.vue](src/layouts/base.layout.vue)):** Adoção da Opção A com gradiente vibrante a 135° e texto `#0A0A0A` no Dark Mode, e gradiente profundo com texto branco `#FFFFFF` no Light Mode, preservando o formato compacto no mobile.

### 3. Justificativa (Por quê)
* O efeito saturated glassmorphism faz os elementos e cores passarem sob o cabeçalho com elegância, conferindo acabamento de aplicação moderna de alta fidelidade.
* O contraste de texto escuro `#0A0A0A` sobre laranja vibrante no tema escuro atende aos critérios mais estritos de legibilidade e impacto visual do Playbook.

### 4. Consequências / Trade-offs
* **Consequências Positivas:** Sensação física de profundidade (eixo Z); transições suaves entre temas; CTA institucional perfeitamente integrado ao ecossistema da marca.
* **Trade-offs:** A barra consome uma faixa de 100% da largura superior com sobreposição física, exigindo z-index superior a elementos flutuantes de conteúdo.

---

## [2026-11-12] Design System: Geometria de Cantos Suavizados (Opção B) e Elevações Solarpunk

### 1. Contexto
A barra superior e os componentes da interface utilizavam formatos de pílula semicircular (`9999px` / `round`), enquanto o padrão estabelecido na seção 1.4 do UI Playbook estabelece o formato retangular com quatro lados retos bem definidos e cantos suavizados (`12px` para botões de ação e `6px` para utilitários), proibindo cápsulas ovais. Além disso, cards de ferramentas e janelas modais careciam de elevação luminosa e raio de curvatura padronizado.

### 2. Decisão
1. **Adoção da Opção B nos Botões da Barra Superior ([src/layouts/base.layout.vue](src/layouts/base.layout.vue), [src/modules/command-palette/command-palette.vue](src/modules/command-palette/command-palette.vue) e [src/components/NavbarButtons.vue](src/components/NavbarButtons.vue)):**
   - Botões de ação (`Início`, `Menu`, `Ferramentas` e `Solicitar Solução`): configurados com `border-radius: var(--radius-md, 12px)`, tornando-se blocos táteis de 34x34px com cantos suaves no mobile.
   - Controles utilitários (`Busca`, `Idioma [PT]` e `Tema [Sol/Lua]`): padronizados com `border-radius: var(--radius-sm, 6px)`.
2. **Raio Padronizado de Cards e Modais ([src/ui/c-card/c-card.vue](src/ui/c-card/c-card.vue) e [src/themes.ts](src/themes.ts)):** Elevação do raio de borda para `16px` (`var(--radius-lg)`) em todos os cards e janelas modais.
3. **Hover Glow Solarpunk ([src/components/ToolCard.vue](src/components/ToolCard.vue)):** Adição de elevação de `-2px` e sombra luminosa âmbar `--color-amber-shadow` (`0 12px 40px 0 hsla(38, 92%, 50%, 0.25)`) no hover dos cards de ferramentas.
4. **Tokens Globais de Raio ([src/brand/fonts/fonts.css](src/brand/fonts/fonts.css)):** Registro formal de `--radius-sm` (6px), `--radius-md` (12px), `--radius-lg` (16px) e `--radius-xl` (24px).

### 3. Justificativa (Por quê)
* O formato retangular de 12px e 6px confere sobriedade, alinhamento geométrico e precisão técnica de software moderno, aderindo rigorosamente à diretriz canônica do Design System 1.0.
* O hover glow âmbar nos cards oferece feedback visual acolhedor e dinâmico coerente com a paleta Solarpunk.

### 4. Consequências / Trade-offs
* **Consequências Positivas:** Consistência estética plena com o site institucional; eliminação de formatos ovais discrepantes; transições táteis e suaves no catálogo.
* **Trade-offs:** A profundidade 3D da barra superior via sombra suspensa (Questão 3) foi postergada para deliberação em commit posterior.

---

## [2026-11-12] Design System: Superfícies Translúcidas, Canvas Neutro e Camada Aurora Glow

### 1. Contexto
A interface visual do IT-Tools ainda operava com resíduos de cinzas opacos herdados do projeto original (fundo pré-boot em `#1c1c1c`, cards sólidos em `#232323` e ausência do halo térmico difuso característico da identidade de Thiago Maol). Era necessário aplicar as diretrizes da seção 1.2 do UI Playbook para integrar a atmosfera visual ao ecossistema institucional.

### 2. Decisão
1. **Camada Aurora Glow no Topo ([src/layouts/base.layout.vue](src/layouts/base.layout.vue)):** Inclusão de elemento fixo difuso no topo da página (`pointer-events: none; z-index: 0; filter: blur(60px)`), com opacidade contida de 12% no tema escuro e 5% no tema claro, adaptada com blur de 40px no mobile para não sobrecarregar telas pequenas.
2. **Harmonização do Canvas de Boot ([index.html](index.html), [src/themes.ts](src/themes.ts) e [src/stores/style.store.ts](src/stores/style.store.ts)):** Atualização dos fundos pré-renderização e do `theme-color` para `#0A0A0A` no Dark e `#F8FAFC` no Light, eliminando o piscar cinza durante a carga inicial da SPA.
3. **Superfície Translúcida de Vidro nos Cards ([src/ui/c-card/c-card.theme.ts](src/ui/c-card/c-card.theme.ts), [src/ui/c-card/c-card.vue](src/ui/c-card/c-card.vue) e [src/themes.ts](src/themes.ts)):** Substituição dos fundos cinzas opacos por `rgba(255, 255, 255, 0.05)`, bordas em `rgba(255, 255, 255, 0.08)`, cantos arredondados de 8px e sombras limpas de repouso (`0 8px 32px 0 rgba(0, 0, 0, 0.37)`).
4. **Tokens Solarpunk Âmbar ([src/brand/fonts/fonts.css](src/brand/fonts/fonts.css) e [unocss.config.ts](unocss.config.ts)):** Mapeamento global de `--color-amber`, glass, border e shadow no CSS e no UnoCSS.

### 3. Justificativa (Por quê)
* O halo Aurora Glow no topo traz calor térmico sutil sem violar a regra de manter 85% a 90% do canvas neutro.
* Cards translúcidos com bordas finas integram o catálogo de ferramentas ao fundo da página, conferindo leveza e modernidade à navegação.
* Unificar os códigos hexadecimais de boot com os temas do Naive UI elimina piscamentos perceptíveis no recarregamento.

### 4. Consequências / Trade-offs
* **Consequências Positivas:** Atmosfera estética elegante e coesa com o site institucional; renderização fluida e translúcida dos cards sem afetar contraste WCAG AA.
* **Trade-offs:** Em dispositivos extremamente antigos com GPUs legadas, o filtro `blur(60px)` pode exigir ligeiramente mais composição gráfica, mitigado pelo posicionamento estático e redução para `blur(40px)` em telas móveis.

---

## [2026-11-12] Design System: Alinhamento Tipográfico com UI Playbook e Escalas Fluidas

### 1. Contexto
Com o início da fase de rebranding baseada no UI Playbook (Design System 1.0), era necessário harmonizar a tipografia do IT-Tools com o padrão visual do site institucional (`hub/site`). O sistema anterior utilizava fontes e tamanhos dispersos (títulos em `Inter` com peso 400, cards sem hierarquia de H3 e ausência de escalas fluidas com `clamp`).

### 2. Decisão
1. **Escala Fluida na Página Inicial ([src/pages/About.vue](src/pages/About.vue)):** Aplicação de `Space Grotesk` com peso 800 e escala fluida `clamp(2.5rem, 5.5vw, 4.25rem)` no H1 principal, e peso 700 com `clamp(1.75rem, 3.5vw, 2.5rem)` nos títulos de seção H2.
2. **Compatibilização no Cabeçalho das Ferramentas ([src/layouts/tool.layout.vue](src/layouts/tool.layout.vue)):** Adoção de `Space Grotesk` com peso 700 em escala contida (`clamp(1.75rem, 3vw, 2.25rem)`), preservando a área de trabalho útil das ferramentas técnicas.
3. **Hierarquia de Cards e Seções ([src/components/ToolCard.vue](src/components/ToolCard.vue) e [src/pages/Home.page.vue](src/pages/Home.page.vue)):** Elevação dos títulos de cards para `1.25rem` (20px) com `font-weight: 600` e títulos de seções do catálogo com `Space Grotesk` (`font-heading`).
4. **Mapeamento de Famílias no UnoCSS ([unocss.config.ts](unocss.config.ts)):** Inclusão de utilitários `font-display`, `font-heading`, `font-body` e `font-mono` (mantendo fallback nativo leve de sistema aprovado).

### 3. Justificativa (Por quê)
* As escalas fluidas (`clamp`) proporcionam responsividade contínua entre mobile e telas ultrawide sem quebras bruscas de linha.
* Diferenciar a escala do H1 da Home (Hero de apresentação) da escala do H1 das ferramentas técnicas mantém a densidade de informação necessária para o uso produtivo dos utilitários.
* A consistência de fontes com `Space Grotesk` e `Inter` integra visualmente o aplicativo ao ecossistema do site institucional do autor.

### 4. Consequências / Trade-offs
* **Consequências Positivas:** Identidade tipográfica profissional e moderna idêntica ao site institucional; hierarquia clara entre títulos, cards e microcópias.
* **Trade-offs:** Títulos longos de ferramentas em telas pequenas podem ocupar duas linhas com a tipografia `Space Grotesk` destacada, comportamento previsto e absorvido pelo layout.

---

## [2026-11-11] Navegação e Roteamento Semântico: Padronização Textual do Topo e Rota /ferramentas

### 1. Contexto
A barra superior do cabeçalho misturava ícones circulares abstratos, links externos irrelevantes para o público final (como o repositório GitHub) e convenções herdadas do projeto upstream (como `/about` para acessar o catálogo de ferramentas). Era necessário unificar o padrão visual em botões textuais intuitivos, reorganizar a hierarquia de navegação à esquerda da busca e semantizar o roteamento do catálogo.

### 2. Decisão
1. **Padronização Textual em Pílula à Esquerda:** Reestruturação da barra em [src/layouts/base.layout.vue](src/layouts/base.layout.vue) com botões textuais combinados a ícones representativos em sequência: 1º `[ 🏠 Início ]` (`to="/"`), 2º `[ ☰ Menu ]` (controle da barra lateral) e 3º `[ ⊞ Ferramentas ]` (`to="/ferramentas"`, usando o ícone de grade de aplicativos `LayoutGrid`).
2. **Remoção de Elementos Desnecessários:** Eliminação do link para o repositório GitHub e do antigo botão circular de informação do componente [src/components/NavbarButtons.vue](src/components/NavbarButtons.vue).
3. **Roteamento Semântico (`/ferramentas`):** Definição da rota primária `/ferramentas` em [src/router.ts](src/router.ts) para o catálogo de ferramentas, mantendo o alias `/about` ativo para preservar compatibilidade com eventuais links preexistentes.

### 3. Justificativa (Por quê)
* Botões textuais com ícones e rótulos explícitos ("Início", "Menu", "Ferramentas") eliminam a ambiguidade de ícones órfãos e guiam o usuário de forma clara.
* A rota `/ferramentas` é autoexplicativa e profissional, condizente com o produto integrado à marca Thiago Maol.
* A remoção do botão GitHub no topo limpa a interface e direciona a atenção do usuário para as ferramentas de negócio.

### 4. Consequências / Trade-offs
* **Consequências Positivas:** Navegação consistente, limpa e acessível no topo da página; URL semântica e profissional para o catálogo de ferramentas.
* **Trade-offs:** A barra superior à esquerda ocupa ligeiramente mais largura horizontal por comportar textos ("Início", "Menu", "Ferramentas") em vez de ícones puramente circulares.

---

## [2026-11-11] Internacionalização: Localização Padrão em Português, Carga Síncrona e Collação Alfabética

### 1. Contexto
A aplicação operava com o idioma inglês (`en`) como padrão no boot e carregava os demais idiomas de forma assíncrona. Essa defasagem causava corrida de renderização: os componentes montavam antes do carregamento das traduções em português, travando nomes desatualizados em memória. Além disso, o arquivo de tradução continha erros léxicos em categorias (como `markdown` traduzido como "Redução de preço", `web` e `network` traduzidos ambos como "Rede", e `finance` traduzido como o verbo "Financiar"), e a ordenação por `_.orderBy` (ASCII) posicionava incorretamente itens acentuados (ex.: "Códigos de barras" após "Cripto" e "Física" após "Forense").

### 2. Decisão
1. **Empacotamento Síncrono de Português:** Modificação em [src/plugins/i18n.plugin.ts](src/plugins/i18n.plugin.ts) para importar `ptBaseMessages` e arquivos de ferramentas de `pt.yml` de forma estática e síncrona junto com o inglês, definindo `DEFAULT_LOCALE = 'pt'`.
2. **Configuração Global de Idioma:** Definição de `"default_locale": "pt"` em [public/tools-settings.json](public/tools-settings.json) e atualização de [index.html](index.html) para `<html lang="pt-BR">`.
3. **Correção Léxica das Categorias:** Ajuste em [locales/pt.yml](locales/pt.yml) para manter `web` como "Web" (separada de "Rede"), `markdown` como "Markdown" e `finance` como "Finanças".
4. **Ordenação com `Intl.Collator`:** Substituição de `_.orderBy` por `Intl.Collator(locale, { sensitivity: 'base', numeric: true })` em [src/tools/tools.store.ts](src/tools/tools.store.ts) e [src/pages/Home.page.vue](src/pages/Home.page.vue), assegurando ordenação alfabética natural para categorias e ferramentas acentuadas.

### 3. Justificativa (Por quê)
* O empacotamento síncrono garante que o dicionário de português esteja disponível no primeiro ciclo de montagem dos componentes, eliminando condições de corrida no Pinia.
* A separação entre "Web" e "Rede" impede a fusão acidental de ferramentas de escopos distintos sob a mesma categoria.
* A collação com `Intl.Collator` respeita as regras ortográficas da língua portuguesa, garantindo que letras com diacríticos sejam ordenadas corretamente no alfabeto.

### 4. Consequências / Trade-offs
* **Consequências Positivas:** Aplicação iniciando diretamente em português; menu lateral sem categorias fundidas e estritamente ordenado de A a Z; eliminação de termos incorretos no catálogo.
* **Trade-offs:** O bundle inicial do app passa a incluir as mensagens de português junto às de inglês, com acréscimo desprezível de tamanho.

---

## [2026-11-11] UX e Roteamento: Inversão Home/Sobre, Seções Retráteis e Título Universal

### 1. Contexto
A ferramenta será integrada ao site institucional do autor e demandava uma apresentação inicial contextualizada para os visitantes, em vez de expor diretamente o catálogo massivo de cards. Além disso, caixas secundárias (como importação/exportação de favoritos e a tabela completa com centenas de linhas) ocupavam espaço excessivo e sobrecarregavam a renderização inicial. A aba do navegador também necessitava manter uniformidade absoluta sob o título institucional.

### 2. Decisão
1. **Inversão de Rotas Estruturais:** Mapeamento da rota raiz (`/`) para o componente de apresentação institucional ([src/pages/About.vue](src/pages/About.vue)) e da rota `/about` (acessível pelo botão "Sobre") para o catálogo completo de cards de ferramentas ([src/pages/Home.page.vue](src/pages/Home.page.vue)) no [src/router.ts](src/router.ts).
2. **Caixas de Gestão Retráteis no Catálogo:** Remoção das caixas de favoritos e listagem da página inicial, migrando-as para o topo da tela de ferramentas. Unificação da importação e exportação em um único card retrátil responsivo ("Importar e Exportar Favoritos") e conversão da listagem integral em seção retrátil sob demanda ("Todas as ferramentas em tabela" com `v-if` condicional para montagem de nós apenas ao expandir).
3. **Título Universal e Estático:** Padronização estrita do título `"Thiago Maol. | Ferramentas"` para todas as páginas, layouts e transições de rota via `router.afterEach`.

### 3. Justificativa (Por quê)
* Exibir primeiro o texto de contextualização alinha o ponto de entrada da ferramenta com o site principal do autor.
* Agrupar e colapsar os favoritos e a listagem integral acelera o carregamento da página, poupa CPU e entrega uma hierarquia visual limpa.
* A renderização condicional (`v-if`) da tabela impede a montagem simultânea de centenas de nós e links no DOM inicial.
* A fixação universal do título na aba evita discrepâncias e variações indesejadas de marca durante a navegação.

### 4. Consequências / Trade-offs
* **Consequências Positivas:** Experiência inicial limpa e amigável; navegação otimizada no catálogo de ferramentas; ganhos de performance no host com montagem sob demanda da tabela.
* **Trade-offs:** A URL raiz (`/`) não exibe diretamente a vitrine de cards, exigindo que o visitante utilize o menu lateral, a busca ou o botão "Sobre" para ver a grade geral.

---

## [2026-11-11] Mapeamento Arquitetural: Integração Graphify e Governança de Recursos

### 1. Contexto
Com centenas de ferramentas e dependências, a análise de arquitetura e busca de relações de dependência por buscas genéricas consumia ciclos de CPU no host restrito a 2 vCPUs. Era necessária uma base estática de conhecimento para inspecionar a arquitetura com custo mínimo, sem sobrecarregar a máquina nem inflar o controle de versão.

### 2. Decisão
1. **Mapeamento Estático via Graphify:** Integração de grafo de arquitetura com relatório de auditoria estrutural em [graphify-out/GRAPH_REPORT.md](graphify-out/GRAPH_REPORT.md).
2. **Contenção de Recursos no `.graphifyignore`:** Exclusão de `src/tools/*/`, `locales/`, `dist/` e pastas auxiliares, mantendo o escopo estritamente no núcleo da arquitetura.
3. **Diretrizes Operacionais no [AGENTS.md](AGENTS.md):** Proibição de reconstrução completa autônoma, recomendação de `graphify query` para consultas e restrição a sincronizações incrementais pontuais (`graphify update .`).
4. **Governança de Versionamento no `.gitignore`:** Ignorar todos os dados dinâmicos e caches de `graphify-out/`, mantendo rastreado apenas o relatório Markdown de auditoria.

### 3. Justificativa (Por quê)
* Consultas direcionadas ao grafo evitam varreduras recursivas repetitivas no sistema de arquivos.
* O isolamento do núcleo da aplicação poupa CPU e memória, prevenindo congelamentos do host.
* Rastrear apenas o relatório Markdown documenta as relações do sistema sem commitar dumps volumosos de grafos JSON.

### 4. Consequências / Trade-offs
* **Consequências Positivas:** Mapeamento arquitetural de alta fidelidade sem custo operacional contínuo; proteção do hardware de 2 vCPUs.
* **Trade-offs:** As ferramentas isoladas em `src/tools/*/` não fazem parte do grafo central.

---

## [2026-11-10] Identidade Visual e Metadados: Gradientes de Marca, Favicon Vetorial Adaptativo e Título Institucional

### 1. Contexto
O logotipo da marca no cabeçalho necessitava de alinhamento com a especificação visual do site institucional (`hub/site`), com gradientes a 135° específicos para cada modo: `#F97415` a `#FAC49E` no tema claro e `#F9771A` a `#FBA66A` no tema escuro. Adicionalmente, a aba do navegador ainda exibia o favicon e os títulos originais do projeto upstream ("IT Tools - Handy online tools for developers"), divergindo da identidade institucional.

### 2. Decisão
1. **Gradientes de Logotipo Específicos por Tema:** Criação de [logo-gradient-light.svg](src/brand/logo/logo-gradient-light.svg) e [logo-gradient-dark.svg](src/brand/logo/logo-gradient-dark.svg) com IDs de gradiente isolados (`brand-wordmark-gradient-light` e `brand-wordmark-gradient-dark`), e alternância dinâmica via `styleStore.isDarkTheme` em [src/layouts/base.layout.vue](src/layouts/base.layout.vue).
2. **Favicon Vetorial Adaptativo:** Configuração de `<link rel="icon" type="image/svg+xml" href="favicon.svg" />` em [index.html](index.html), utilizando a capacidade do SVG de alternar traços via `@media (prefers-color-scheme: light)` e sincronização dos fallbacks estáticos oficiais ([favicon.ico](public/favicon.ico), [favicon-32x32.png](public/favicon-32x32.png), [favicon-16x16.png](public/favicon-16x16.png) e [apple-touch-icon.png](public/apple-touch-icon.png)).
3. **Padronização do Título do Documento:** Definição de `"Thiago Maol. | Ferramentas"` em [index.html](index.html) e [src/pages/Home.page.vue](src/pages/Home.page.vue), com padronização dos sufixos de ferramentas internas em [src/layouts/tool.layout.vue](src/layouts/tool.layout.vue), [src/pages/About.vue](src/pages/About.vue) e [src/pages/404.page.vue](src/pages/404.page.vue).

### 3. Justificativa (Por quê)
* Gradientes e IDs vetoriais separados eliminam riscos de colisão no DOM e asseguram fidelidade cromática em ambos os temas.
* O suporte nativo a SVG para favicon com CSS embutido permite que navegadores modernos adaptem a cor do ícone à barra do sistema operacional sem recarregamentos dinâmicos por JavaScript.
* A atualização de metadados e títulos unifica a identidade do produto sob a marca Thiago Maol.

### 4. Consequências / Trade-offs
* **Consequências Positivas:** Identidade visual e metadados totalmente integrados à marca; favicons nítidos em qualquer escala e tema; títulos consistentes em toda a navegação.
* **Trade-offs:** Clientes ou navegadores legados sem suporte a SVG em favicons utilizam os fallbacks PNG/ICO sincronizados.

---

## [2026-11-07] Usabilidade e Acessibilidade: Descoberta de Catálogo e Suavização da Busca

### 1. Contexto
A aplicação será utilizada por pessoas não técnicas, para as quais o padrão de menu sanduíche isolado (ícone abstrato de 3 linhas) representa uma barreira de usabilidade e descoberta de conteúdo ("o que não é visto não existe"). Além disso, o estado de recolhimento da barra lateral persistia em `localStorage`, fazendo com que acessos futuros mantivessem o menu fechado permanentemente caso tivesse sido fechado em alguma ocasião. Na busca rápida (Ctrl+K), o estado de seleção/hover cobria as ferramentas com 100% de laranja saturado (`#F97415`), gerando ofuscamento visual no tema escuro.

### 2. Decisão
1. **Abertura Padrão da Barra Lateral:** Substituir o uso de `useITStorage` em `isMenuCollapsed` por `ref(isSmallScreen.value)` no [src/stores/style.store.ts](file:///mnt/dados/home/thiago/PROJETOS/ghub_org_thiagomaol-com-br/it-tools/src/stores/style.store.ts). No desktop (`> 700px`), a barra sempre inicia aberta em qualquer visita limpa ou recarregamento, mantendo o recolhimento inicial apenas em celulares (`<= 700px`).
2. **Substituição do Ícone Abstrato por Rótulo Textual:** Em [src/layouts/base.layout.vue](file:///mnt/dados/home/thiago/PROJETOS/ghub_org_thiagomaol-com-br/it-tools/src/layouts/base.layout.vue), trocar o ícone de três linhas por um botão arredondado com o texto explícito "Menu" (`round variant="text" font-semibold`).
3. **Atenuação do Destaque da Busca:** Em [src/modules/command-palette/components/command-palette-option.vue](file:///mnt/dados/home/thiago/PROJETOS/ghub_org_thiagomaol-com-br/it-tools/src/modules/command-palette/components/command-palette-option.vue), remover a classe `bg-primary` saturada e aplicar um fundo translúcido suave de cobre (`rgba(249, 116, 21, 0.2)` com borda sutil `rgba(249, 116, 21, 0.35)`).

### 3. Justificativa (Por quê)
* Eliminar a persistência de fechamento e exibir o catálogo aberto por padrão garante descoberta imediata das ferramentas para visitantes leigos.
* Botões com rótulo textual ("Menu") têm taxa de compreensão e acionamento muito superior a ícones abstratos órfãos em testes com públicos não técnicos.
* Em fundos escuros, realces com opacidade reduzida e bordas suaves oferecem legibilidade e foco sem causar fadiga ocular.

### 4. Consequências / Trade-offs
* **Consequências Positivas:** Aumento na facilidade de uso para perfis não técnicos; navegação acessível e agradável visualmente no tema escuro.
* **Trade-offs:** Em telas de desktop, a preferência de um usuário que deseje manter a barra permanentemente fechada entre sessões não é salva no `localStorage`, reabrindo a cada nova visita à URL.

---

## [2026-11-07] Customização do Cabeçalho: Degradê da Marca, Resolução de SVGs e Inotify Watchers

### 1. Contexto
Durante o desenvolvimento no host local, a inicialização do Vite (`pnpm dev --host`) esbarrou em erro `ENOSPC: System limit for number of file watchers reached`, decorrente do consumo quase integral da cota de inotify por processos de segundo plano (como observadores de pastas volumosas no VSCodium Server). Na customização visual do cabeçalho da barra lateral, o logotipo vetorial da marca ("Thiago Maol.") sofria cortes laterais e verticais sem redimensionar proporcionalmente, e posteriormente ficou invisível ao receber gradientes de cor. O objetivo era alinhar o visual com o padrão estético do site institucional (`hub/site`), que utiliza um degradê sutil a 135° de laranja quente (`hsl(25, 95%, 55%)` / `#F97A1F`) para pêssego suave (`hsl(25, 95%, 70%)` / `#FBA66A`) sobre fundo escuro profundo.

### 2. Decisão
1. **Otimização de File Watchers:** Configurar exclusões estritas em `server.watch.ignored` no [vite.config.ts](file:///mnt/dados/home/thiago/PROJETOS/ghub_org_thiagomaol-com-br/it-tools/vite.config.ts) (`node_modules`, `.git`, `.pnpm-store`, `dist`, `pessoal`) e nos observadores do editor, reduzindo os handles de inotify em mais de 98%.
2. **Preservação de Escala Vetorial (`removeViewBox: false`):** Desativar no `svgLoader` a remoção padrão do atributo `viewBox` feita pelo SVGO. Sem `viewBox`, o navegador desativa a escala vetorial proporcional em SVGs inline com atributos `width`/`height` estáticos, recortando o desenho ao aplicar dimensões CSS menores.
3. **Prevenção de Colisão de IDs (`cleanupIds: false`):** Desativar a minificação agressiva de IDs do SVGO. O padrão do SVGO renomeava `<linearGradient id="...">` de todos os arquivos para `id="a"`, gerando colisão entre o fundo do hero (`hero-gradient.svg`) e o logotipo (`logo-gradient.svg`) na mesma página e tornando o preenchimento invisível.
4. **Alinhamento do Degradê da Marca:** Criar o asset `src/brand/logo/logo-gradient.svg` com gradiente nativo a 135° nas cores hexadecimais correspondentes (`#F97A1F` para `#FBA66A`), substituir o fundo laranja vivo do cabeçalho por um degradê escuro de cobre e carvão (`#140E0A` -> `#241308` -> `#3D1C08`) em [src/assets/hero-gradient.svg](file:///mnt/dados/home/thiago/PROJETOS/ghub_org_thiagomaol-com-br/it-tools/src/assets/hero-gradient.svg), e atualizar o subtítulo para "Ferramentas" em branco fosco (`#E5E5E5`).

### 3. Justificativa (Por quê)
* Manter o `viewBox` e os IDs originais é mandatório para aplicações que realizam inlining de múltiplos componentes SVG na mesma página; sem essas diretivas, o SVGO corrompe o comportamento de renderização do navegador.
* Cores em notação hexadecimal pura dentro do SVG (`#F97A1F` e `#FBA66A`) garantem suporte universal do motor gráfico, eliminando potenciais falhas de interpretação de funções CSS funcionais (`hsl()`) em tags `<stop>`.
* O fundo de cobre escuro proporciona contraste superior a 4.5:1 (WCAG AA) para o logo em degradê laranja/pêssego, integrando suavemente com a paleta dark da barra lateral sem necessidade de bordas divisórias.

### 4. Consequências / Trade-offs
* **Consequências Positivas:** Fidelidade visual idêntica ao site institucional; renderização vetorial nítida sem cortes em qualquer resolução; fim de conflitos de IDs e eliminação de estouro de inotify no ambiente local.
* **Trade-offs:** As configurações personalizadas do `svgLoader` no [vite.config.ts](file:///mnt/dados/home/thiago/PROJETOS/ghub_org_thiagomaol-com-br/it-tools/vite.config.ts) devem ser preservadas em futuros rebases ou sincronizações com o repositório upstream.

---

## [2026-11-06] Governança de Hardware, Deploy e Sincronização da Marca

### 1. Contexto
O projeto é um fork de uma aplicação densa (mais de 475 ferramentas e dependências de compilação em WebAssembly/Rust). Durante o desenvolvimento no host local (equipado com 2 CPUs), um build de produção (`pnpm build`) provocou exaustão completa de CPU e memória, resultando em travamento do kernel e indisponibilidade do serviço SSH. Paralelamente, era necessário integrar o Design System do repositório `hub` sem criar acoplamento que inviabilizasse builds em contêineres e esteiras remotas.

### 2. Decisão
1. **Governança de Hardware:** Proibir expressamente no [AGENTS.md](file:///mnt/dados/home/thiago/PROJETOS/ghub_org_thiagomaol-com-br/it-tools/AGENTS.md) a execução local de comandos de alto consumo (`pnpm build`, `vite build`, `pnpm typecheck`, `vue-tsc` e `pnpm test:e2e`). Validar localmente apenas via linters estáticos pontuais (`pnpm oxlint <arquivo>`) e delegar builds de produção para esteiras de CI/CD (GitHub Actions).
2. **Integração de Marca:** Adotar script de sincronização automatizada (`pessoal/sync-brand.mjs`) que replica tokens, fontes e vetores para `src/brand/`, em vez de dependências dinâmicas via Git Submodules ou links simbólicos externos.
3. **Contorno de SVGO:** Desativar a otimização `convertPathData` no `vite-svg-loader` dentro do `vite.config.ts` para contornar falhas do parser em curvas de Bézier do logotipo vetorizado.

### 3. Justificativa (Por quê)
* A máquina local não suporta o paralelismo do Rollup/Rolldown para 475 rotas simultâneas. Isolar o build em esteiras remotas garante a estabilidade do ambiente de desenvolvimento.
* O script de sincronização torna o repositório autossuficiente para compilação em qualquer ambiente isolado (Docker, CI/CD) e elimina o risco de conflitos de merge com o upstream nas pastas locais.

### 4. Consequências / Trade-offs
* **Consequências Positivas:** Host protegido contra congelamentos; projeto portátil para contêineres; zero conflitos com o repositório original em arquivos de marca.
* **Trade-offs:** Alterações visuais no `hub` exigem a execução explícita de `node pessoal/sync-brand.mjs` para refletir no `it-tools`; a validação final da compilação depende do pipeline de CI/CD.
