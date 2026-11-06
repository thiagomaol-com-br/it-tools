# Arquitetura de Deploy e Integração da Marca (Brand)

Este documento esclarece como funciona o processo de **deploy** da sua versão customizada do **IT-Tools**, a diferença entre o ambiente de desenvolvimento e o servidor de produção, e como integrar o Design System do repositório `hub` de forma sustentável para contêineres e automações.

---

## 1. 🚢 Como era o Deploy antes vs. Como será agora?

* **Como você fazia antes:**  
  Você usava um arquivo `docker-compose.yml` que baixava a imagem pública do autor original (`sharevb/it-tools:latest`) e iniciava o contêiner.

* **Como será agora com a sua versão personalizada:**  
  Você **continuará usando exatamente o mesmo arquivo `docker-compose.yml` simples no seu servidor!**  
  A única mudança é que, em vez de apontar para a imagem do autor, o seu arquivo apontará para a **sua própria imagem**:
  ```yaml
  services:
    it-tools:
      image: ghcr.io/thiagomaol-com-br/it-tools:latest
      container_name: it-tools
      restart: unless-stopped
      ports:
        - "8080:8080"
  ```

---

## 2. ⚙️ Build Time vs. Runtime (O que o servidor precisa ter?)

O seu servidor de produção **NÃO** precisa ter Node.js, Vite, pnpm, Git e nem o repositório `hub` instalados.

O **IT-Tools é uma aplicação estática (SPA)**:
* **Momento de Construção (Build Time):** O Vite processa os componentes Vue, lê as fontes, SVGs e cores, e gera uma pasta chamada `dist/` com arquivos puros e otimizados (HTML, CSS, JS e WebAssembly).
* **Momento de Execução (Runtime):** O contêiner Docker empacota apenas essa pasta `dist/` pronta dentro de um servidor web ultraleve (o Nginx).
* Quando o contêiner roda no seu servidor, **tudo já foi compilado**. O servidor apenas entrega os arquivos finais ao navegador do usuário.

---

## 3. 🧩 O Dilema do Atalho `../hub` (Local vs. Nuvem/Docker)

* **No seu computador:** As pastas `it-tools` e `hub` estão lado a lado no mesmo disco (`../hub`). O Vite consegue ler diretamente qualquer arquivo vizinho.
* **No Docker / GitHub Actions:** Quando o Docker ou uma esteira de automação na nuvem for compilar o projeto para gerar a imagem, ele só terá acesso ao repositório `it-tools`. Ele **não encontrará a pasta `hub` do seu computador local**, a menos que haja uma estratégia clara de integração.

---

## 4. 🛠️ As 3 Opções de Integração da Marca

Para que o projeto utilize as cores, logos e fontes do `hub` sem quebrar o build do Docker, temos três abordagens de engenharia:

### Opção A: O "Script de Sincronização" (Recomendada para Dev Júnior)
* Criamos um comando simples no projeto (ex: `pnpm sync-brand`).
* Sempre que você alterar cores ou logos no `hub`, você roda esse comando. Ele copia automaticamente os tokens (`tokens.json`), fontes e logos mais recentes para uma pasta interna do `it-tools`.
* **Vantagens:** 
  * O repositório `it-tools` fica 100% autossuficiente.
  * O Dockerfile padrão e o GitHub Actions conseguem compilar o projeto em qualquer lugar do mundo sem depender de caminhos externos.
  * Você não precisa ficar copiando e colando arquivos na mão toda vez que atualizar a marca.

### Opção B: Git Submodule (Como o `hub` já faz com o `site`)
* Adiciona a pasta `brand` do repositório `hub` como um submódulo Git dentro do repositório `it-tools`.
* **Vantagens:** Sincronização direta via Git entre repositórios na nuvem.
* **Desvantagens:** Exige comandos adicionais do Git (`git submodule update --init --recursive`) e pode causar dores de cabeça com commits desatualizados (*detached HEAD*) para quem está começando.

### Opção C: Compilação Local com Push da Imagem
* Você compila o projeto na sua máquina local (onde a pasta `../hub` existe) rodando `pnpm build`.
* Em seguida, você gera a imagem Docker na sua máquina e envia diretamente para o Docker Hub ou GitHub Container Registry com `docker push`.
* **Desvantagens:** O processo depende sempre da sua máquina física para gerar novas versões, sem automação na nuvem.

---

## 📌 Conclusão e Próximo Passo

A **Opção A (Script de Sincronização)** oferece o melhor equilíbrio entre:
1. **Zero trabalho manual repetitivo:** Um único comando puxa tudo atualizado do `hub`.
2. **Independência do projeto:** Permite que o deploy em Docker funcione exatamente como você já está acostumado.
