# Arquitetura de Deploy e Gestão da Marca (Brand)

Este documento reúne duas orientações técnicas independentes para o projeto:
1. **Parte 1 — Deploy e Execução em Produção:** como funciona a publicação do contêiner e a separação entre build e runtime.
2. **Parte 2 — Gestão e Integração da Marca (Brand):** a diretriz vigente de autossuficiência dos ativos e o histórico das opções de integração para referência futura.

---

## PARTE 1: Deploy e Execução em Produção (Docker & Nginx)

### 1.1. Como era o Deploy antes vs. Como é agora
* **Como você fazia antes:**  
  Você usava um arquivo `docker-compose.yml` que baixava a imagem pública do autor original (`sharevb/it-tools:latest`) e iniciava o contêiner.

* **Como é agora com a versão personalizada:**  
  Você continua usando exatamente o mesmo arquivo `docker-compose.yml` simples no seu servidor. A única mudança é que, em vez de apontar para a imagem pública do autor, o arquivo aponta para a **sua própria imagem**:
  ```yaml
  services:
    it-tools:
      image: ghcr.io/thiagomaol-com-br/it-tools:latest
      container_name: it-tools
      restart: unless-stopped
      ports:
        - "8080:8080"
  ```

### 1.2. Build Time vs. Runtime (O que o servidor precisa ter?)
O seu servidor de produção **não** precisa ter Node.js, Vite, pnpm, Git e nem o repositório `hub` instalados.

O IT-Tools é uma aplicação estática (SPA):
* **Momento de Construção (Build Time):** O Vite processa os componentes Vue, lê as fontes, SVGs e cores, e gera uma pasta chamada `dist/` com arquivos puros e otimizados (HTML, CSS, JS e WebAssembly). Isso roda exclusivamente na esteira de CI/CD (GitHub Actions).
* **Momento de Execução (Runtime):** O contêiner Docker empacota apenas essa pasta `dist/` pronta dentro de um servidor web ultraleve (Nginx).
* Quando o contêiner roda no seu servidor, tudo já foi compilado. O servidor apenas entrega os arquivos estáticos ao navegador do usuário.

---

## PARTE 2: Gestão e Integração da Marca (Brand)

### 2.1. Diretriz Vigente: Autossuficiência Consolidada (Não Mexer no Momento)

> [!IMPORTANT] Status Atual da Marca: Resolvido e Estável
> **Esta questão NÃO deve ser alterada no momento.** 
> Não execute `node pessoal/sync-brand.mjs` nem configure rotinas de sincronização com `../hub` na fase atual.

#### Por que não mexer agora?
1. **Ativos já internalizados e versionados:** Todos os componentes da marca (fontes `.woff2`, folhas de estilo, tokens e vetores) já foram copiados para `src/brand/` e estão rastreados pelo Git no próprio `it-tools`. O repositório já é 100% autossuficiente para compilar no Docker ou no GitHub Actions.
2. **Customizações exclusivas do IT-Tools (Risco de Regressão):** Durante a fase de rebranding da central de ferramentas (Design System 1.0):
   - O arquivo `src/brand/fonts/fonts.css` recebeu os tokens Solarpunk Âmbar (`--color-amber*`) e escalas de raio (`--radius-*`). O `hub` não possui essas propriedades em seu CSS original.
   - O diretório `src/brand/logo/` recebeu variações com IDs de gradiente isolados por tema (`logo-gradient-light.svg` e `logo-gradient-dark.svg`) para evitar colisão gráfica no DOM com o hero, além do favicon SVG adaptativo.
   - Executar uma sincronização rasa com o `hub` hoje sobrescreveria esses arquivos locais e **quebraria a identidade visual conquistada**.
3. **O script não está ativo no `package.json`:** O arquivo `pessoal/sync-brand.mjs` permanece guardado como referência histórica, mas propositalmente não possui atalho no projeto.

#### Quando revisitar este tema no futuro?
Se em algum momento futuro houver uma **reestruturação global da marca** em todo o ecossistema Thiago Maol:
1. As extensões de tokens Solarpunk e gradientes temáticos desenvolvidas aqui deverão ser consolidadas e promovidas para o repositório central `hub/brand`.
2. O script `pessoal/sync-brand.mjs` deverá ser adaptado para respeitar essas nuances.
3. Somente após essa compatibilização bilateral uma nova sincronização deverá ser executada.

---

### 2.2. Contexto de Origem: O Dilema do Atalho `../hub` (Local vs. Nuvem/Docker)
* **No computador local:** As pastas `it-tools` e `hub` ficam lado a lado no mesmo disco (`../hub`). O Vite conseguiria ler diretamente qualquer arquivo vizinho no modo dev.
* **No Docker / GitHub Actions:** Quando o Docker ou uma esteira de automação compila o projeto, ele só tem acesso ao repositório `it-tools`. Ele **não encontra a pasta `hub`**, motivo pelo qual a cópia interna e versionada em `src/brand/` foi necessária.

### 2.3. As 3 Opções Mapeadas de Integração (Referência para o Futuro)
Para fins de documentação técnica, ficam registradas as três abordagens arquiteturais avaliadas:

#### Opção A: O "Script de Sincronização"
* Mantém o script `pessoal/sync-brand.mjs`.
* Sob demanda explícita, ele copia tokens (`tokens.json`), fontes e logos do `hub` para a pasta interna `src/brand/`.
* **Vantagens:** O repositório permanece autossuficiente; funciona em qualquer esteira sem dependências externas de rede.

#### Opção B: Git Submodule (Como o `hub` faz com o `site`)
* Adiciona a pasta `brand` do repositório `hub` como um submódulo Git dentro do repositório `it-tools`.
* **Vantagens:** Sincronização direta via Git entre repositórios na nuvem.
* **Desvantagens:** Exige comandos adicionais (`git submodule update --init --recursive`) e pode gerar complexidade de commits desatualizados (*detached HEAD*).

#### Opção C: Compilação Local com Push da Imagem
* Compilar localmente onde a pasta `../hub` existe e fazer push manual da imagem gerada.
* **Desvantagens:** Processo manual dependente da máquina local. Além disso, no host local atual (2 CPUs), compilações completas de produção travam o kernel e são estritamente proibidas pelas diretrizes do projeto.
