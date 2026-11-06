# DevLog — IT-Tools

Registro de decisões arquiteturais estruturantes, mudanças conceituais e novos trade-offs do projeto.

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
