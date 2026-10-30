# Análise do Projeto: IT-Tools

O projeto no diretório atual é o **IT-Tools** (especificamente o fork estendido mantido por [`sharevb`](https://github.com/sharevb/it-tools)), uma aplicação web completa, moderna e orientada a privacidade que reúne **mais de 475 ferramentas úteis** para desenvolvedores, sysadmins e profissionais de TI.

A maioria das ferramentas é executada inteiramente **client-side** (no próprio navegador do usuário), garantindo velocidade e preservação de dados sensíveis (sem envio desnecessário a servidores terceiros).

---

## 1. 🛠️ Stack Tecnológica

| Camada | Tecnologia | Detalhes |
| :--- | :--- | :--- |
| **Framework Frontend** | Vue 3 (v3.5+) | Composition API, `<script setup>`, TypeScript estrito |
| **Bundler & Dev Server** | Vite (v8.x) | Bundling ultrarrápido com plugins WASM, PWA, Node Polyfills e visualizer |
| **UI & Componentes** | Naive UI + UnoCSS | Componentes do Naive UI + Atomic CSS via UnoCSS + biblioteca interna `src/ui/` |
| **Gerenciamento de Estado** | Pinia | Stores modulares reativas (e Vuex pontual em módulo legado do pomodoro) |
| **Roteamento & i18n** | Vue Router + vue-i18n | Suporte a 21 idiomas via arquivos YAML em `locales/` |
| **WASM / Heavy Processing** | WebAssembly & Web Workers | FFmpeg.wasm, Tesseract.js (OCR), Resvg, Hugging Face Transformers |
| **Qualidade & Linting** | oxlint & oxfmt | Ferramentas em Rust do projeto OxC (muito mais rápidas que ESLint/Prettier padrão) |
| **Testes** | Vitest + Playwright | Mais de 130 testes unitários (`*.test.ts`) e testes end-to-end (`*.spec.ts`) |
| **Gerenciador de Pacotes** | pnpm (v12.x) | Configuração rigorosa com isolamento de dependências e stubs |

---

## 2. 📁 Estrutura de Diretórios Principal

```text
it-tools/
├── src/
│   ├── tools/               # 475+ ferramentas modulares independentes
│   ├── ui/                  # Componentes reutilizáveis (c-input, c-card, c-monaco-editor, etc.)
│   ├── composable/          # Composables do Vue (validações, clipboard, downloads, etc.)
│   ├── layouts/             # Layouts de página (base, tool layout com sidebar, etc.)
│   ├── pages/               # Páginas raiz (Home, About, 404, etc.)
│   ├── plugins/             # Plugins do app (i18n, Naive UI, plausible, etc.)
│   ├── stores/              # Gerenciamento de estado (tema, configurações de estilo)
│   ├── utils/               # Utilitários globais (base-url, formatadores, etc.)
│   ├── main.ts              # Ponto de entrada do Vue
│   └── App.vue              # Componente raiz da aplicação
├── locales/                 # 21 arquivos de tradução YAML (pt, en, es, fr, zh, etc.)
├── scripts/                 # Automações Node para gerar ferramentas e traduções
├── patches/                 # Patches pontuais em pacotes npm (ex: node-forge, curlconverter)
├── stubs/                   # Stubs vazios para bibliotecas nativas pesadas no navegador
├── docker-entrypoint.d/     # Scripts de inicialização Nginx no contêiner
├── Dockerfile & compose     # Imagem Nginx unprivileged na porta 8080 com suporte a subpastas
└── vite.config.ts           # Configuração avançada de compilação
```

---

## 3. 🧩 Ecossistema de Ferramentas (`src/tools/`)

As **475+ ferramentas** são carregadas dinamicamente via glob import (`import.meta.glob('./*/index.ts')`) e divididas em cerca de 26 categorias:

* **Network (67):** Calculadoras de sub-rede IPv4/IPv6, CIDR, WHOIS, DNS queries, MAC address, etc.
* **Text & Data (60):** Manipulação de strings, diff de texto, geradores de slug, contadores de tokens/caracteres.
* **JSON, YAML, TOML, XML (50+):** Conversores cruzados, validadores, formatadores, query engines (JSONPath/jq).
* **Forensic & Crypto (66):** Hashes (MD5, SHA, etc.), geradores/validadores de JWT, RSA/ECDSA, ciphers, certificados X.509.
* **Web & Development (61):** Testadores de regex, geradores de htpasswd, decodificadores de URL, curl converter, etc.
* **Docker & DevOps (15+):** `docker-compose` para `docker run`, linters de Dockerfile, conversores para Kubernetes.
* **Multimídia & Imagens (25+):** OCR (Tesseract), conversores de imagem/formato, compressão, crop, SVG para PNG/CSS.
* **Outras categorias:** Barcodes/QRCodes, PDF, Matemáticas, Medições, Folha de pagamento/Finanças, etc.

---

## 4. ⚡ Otimizações Técnicas Notáveis

1. **Deploy Dinâmico com `BASE_URL` em Runtime:**
   * A aplicação foi construída para não ter caminhos absolutos travados no build. Através de scripts no contêiner Nginx (`docker-entrypoint.d/18-resolve-base-url.envsh`), é possível servir a aplicação em qualquer subpasta (ex: `-e BASE_URL=/it-tools/`) sem recompilar a imagem Docker.
2. **Economia de Recursos em Node Modules:**
   * No `pnpm-workspace.yaml`, pacotes pesados como `isolated-vm` e `onnxruntime-node` (usados apenas nativamente) foram substituídos por *stubs* vazios locais em `stubs/empty-stub`, economizando mais de **225 MB** de disco e tempo de instalação.
3. **Pré-compressão de Assets:**
   * O pipeline do Dockerfile comprime antecipadamente todos os arquivos `.js`, `.css` e `.wasm` com gzip máximo (`gzip -9 -n -k`), permitindo que o Nginx entregue arquivos já comprimidos sem sobrecarregar a CPU em tempo de execução.
4. **Filtros e Ferramentas Externas:**
   * Suporte nativo a exclusão/inclusão de ferramentas e categorias via regex através dos arquivos `tools-filter.json` e `external-tools.json`, permitindo instâncias personalizadas corporativas ou privadas.

---

## 5. 🚀 Principais Scripts e Comandos

* **Executar localmente:** `pnpm dev` (inicia o Vite local).
* **Compilar para produção:** `pnpm build` (gera a pasta `dist/`).
* **Visualizar build:** `pnpm preview` (roda o servidor na porta `5050`).
* **Testes unitários:** `pnpm test:unit` (executa Vitest).
* **Testes E2E:** `pnpm test:e2e` (executa Playwright).
* **Linter & Formatador:** `pnpm lint:fix` e `pnpm fmt` (usando o motor rápido `oxlint`/`oxfmt`).
* **Criar nova ferramenta:** `pnpm script:create:tool` (gera a estrutura de arquivos para uma nova ferramenta).

---

## 6. 📌 Status do Repositório Local

* **Branch atual:** `chore/all-my-stuffs` sincronizado com `origin/chore/all-my-stuffs`.
* **Árvore de trabalho:** Limpa, sem arquivos pendentes ou não rastreados.
* **Origem:** Fork ativo de [`sharevb/it-tools`](https://github.com/sharevb/it-tools.git).
