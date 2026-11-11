# Relatório de Execução do Graphify — it-tools

Relatório dos resultados gerados pelo **Graphify** sobre o núcleo da arquitetura do repositório `it-tools`, com o texto de apoio em português do Brasil e todos os termos técnicos mantidos em sua forma original em inglês.

---

## 1. Artefatos Gerados

A execução do pipeline foi concluída com sucesso. Os artefatos residem no diretório `graphify-out/`:

* [graph.html](file:///mnt/dados/home/thiago/PROJETOS/ghub_org_thiagomaol-com-br/it-tools/graphify-out/graph.html) — interactive graph, open in browser (visualizador interativo para abrir diretamente no navegador sem necessidade de servidor).
* [GRAPH_REPORT.md](file:///mnt/dados/home/thiago/PROJETOS/ghub_org_thiagomaol-com-br/it-tools/graphify-out/GRAPH_REPORT.md) — audit report (relatório completo de auditoria arquitetural e métricas).
* [graph.json](file:///mnt/dados/home/thiago/PROJETOS/ghub_org_thiagomaol-com-br/it-tools/graphify-out/graph.json) — raw graph data (dados brutos do grafo com nós e arestas em formato JSON).

> **Aviso de versionamento (Git):** O diretório `graphify-out/` já está devidamente configurado no `.gitignore` para ignorar dados brutos e manter apenas o `GRAPH_REPORT.md` como exceção rastreável.

---

## 2. Graph Health (Diagnóstico de Integridade)

Durante o parsing estático (AST) do código-fonte, foram reportadas as seguintes condições de integridade:
* **26 dangling-endpoint edges:** Conexões apontando para dependências externas que não fazem parte do repositório local (ex.: referências ao pacote `highlight.js`).
* **3 self-loop edges:** Nós com arestas apontando para si mesmos.
* **328 collapsed edges:** Múltiplas arestas entre os mesmos endpoints consolidadas em uma única representação para evitar poluição visual.

---

## 3. God Nodes (most connected - your core abstractions)

Estes são os nós com o maior número de conexões (`edges`) no grafo, representando os principais centros de acoplamento da aplicação:

1. `vue` — 26 edges
2. `vitest` — 25 edges
3. `es-toolkit` — 23 edges
4. `with` — 21 edges
5. `scripts` — 21 edges
6. `with` — 20 edges
7. `@vueuse/core` — 16 edges
8. `naive-ui` — 15 edges
9. `env` — 14 edges
10. `allowBuilds` — 14 edges

---

## 4. Surprising Connections (you probably didn't know these)

Conexões não óbvias entre arquivos e módulos em diferentes níveis da árvore de diretórios:

* `resolveLanguage()` `--calls-->` `yaml` `[INFERRED]`  
  `src/components/CodeBlockCopyable.vue` → `package.json`
* `update()` `--calls-->` `convert` `[INFERRED]`  
  `src/components/UnitsConverter.vue` → `package.json`
* `html` `--calls-->` `marked` `[INFERRED]`  
  `src/ui/c-markdown/c-markdown.vue` → `package.json`
* `resolveLanguage()` `--calls-->` `html` `[INFERRED]`  
  `src/components/CodeBlockCopyable.vue` → `src/ui/c-markdown/c-markdown.vue`
* `useToolStore` `--calls-->` `useITStorage()` `[EXTRACTED]`  
  `src/tools/tools.store.ts` → `src/composable/queryParams.ts`

---

## 5. Import Cycles

O analisador detectou um ciclo de importação de 2 arquivos entre páginas e rotas de demonstração:

* **2-file cycle:**  
  `src/ui/demo/demo-home.page.vue` → `src/ui/demo/demo.routes.ts` → `src/ui/demo/demo-home.page.vue`

---

## 6. Suggested Questions

Perguntas formuladas com base nas métricas de rede para apoiar a análise arquitetural:

* **Why does `vue` connect `Tool Registry & Store` to `Vue Composables`, `UI Design System Components`, `Pinia Global Stores`, `Build & Bundler Config`, `Application Plugins`, `Telemetry & Tracker Module`, `shims.d.ts Module`?**  
  *High betweenness centrality (0.091) - this node is a cross-community bridge.*
* **Why does `es-toolkit` connect `UI Design System Components` to `Application Plugins`, `Command Palette Module`, `Telemetry & Tracker Module`, `Tool Registry & Store`, `Application Layouts`, `FormatTransformer.vue Module`, `Vue Composables`?**  
  *High betweenness centrality (0.058) - this node is a cross-community bridge.*
* **Should `Shared Utility Functions` be split into smaller, more focused modules?**  
  *Cohesion score 0.065 - nodes in this community are weakly interconnected.*
* **Should `GitHub CI/CD Actions` be split into smaller, more focused modules?**  
  *Cohesion score 0.046 - nodes in this community are weakly interconnected.*

---

## 7. Pergunta em Destaque (Path Tracing)

> **The most interesting question this graph can answer:**  
> **Why does `vue` connect `Tool Registry & Store` to `Vue Composables`, `UI Design System Components`, `Pinia Global Stores`, `Application Plugins`?**  
> 
> Executar o *path tracing* dessa pergunta permite inspecionar detalhadamente a rota de acoplamento entre o registro central das ferramentas e o ecossistema de reatividade e componentes visuais do Vue.
