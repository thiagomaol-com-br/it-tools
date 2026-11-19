# Central de Ferramentas — Thiago Maol

Suíte web com mais de 470 ferramentas utilitárias para apoio operacional, produtividade diária e rotinas digitais, executada diretamente no navegador com foco rigoroso em privacidade de dados (client-side first).

Esta versão é um fork customizado do [IT-Tools](https://github.com/sharevb/it-tools), adaptado para o ecossistema institucional de [Thiago Maol](https://thiagomaol.com.br) e padronizado segundo o **Design System 1.0 (Solarpunk)**.

---

## 1. Como Usar em Produção (Docker & Docker Compose)

A aplicação é distribuída como imagem multi-arquitetura (`linux/amd64` e `linux/arm64`) através do GitHub Container Registry (GHCR).

### Uso com Docker Compose (Recomendado)

Crie ou atualize o arquivo `docker-compose.yml` no seu servidor:

```yaml
services:
  it-tools:
    image: ghcr.io/thiagomaol-com-br/it-tools:latest
    container_name: it-tools
    pull_policy: always
    restart: unless-stopped
    ports:
      - "8080:8080"
```

Inicie o contêiner:

```bash
docker compose pull && docker compose up -d
```

Acesse em seu navegador: `http://seu-servidor:8080`.

### Execução Direta via Docker CLI

```bash
docker run -d \
  --name it-tools \
  --pull always \
  --restart unless-stopped \
  -p 8080:8080 \
  ghcr.io/thiagomaol-com-br/it-tools:latest
```

### Configurações de Ambiente (Opcionais)

- **`PORT`:** Porta interna em que o Nginx escuta (padrão: `8080`).
- **`BASE_URL`:** Permite servir a aplicação a partir de um subdiretório sem recompilar a imagem (ex.: `-e BASE_URL=/ferramentas/`).

---

## 2. Diferenciais e Customizações Desta Versão

### Localização Padrão em Português (pt-BR)
- O idioma português (`pt-BR`) é carregado de forma síncrona no boot junto com o inglês, eliminando atrasos de renderização de interface.
- Categorias de ferramentas com nomes normalizados e ordenação alfabética natural via `Intl.Collator`, garantindo que palavras com acentuação (ex.: "Códigos" e "Física") fiquem na ordem correta de A a Z.

### Roteamento Semântico e Arquitetura de Conteúdo
- **`/` (Início):** Página de contextualização institucional ([About.vue](src/pages/About.vue)), esclarecendo a proposta de privacidade, independência de assinaturas recorrentes e apoio operacional.
- **`/ferramentas`:** Catálogo geral com vitrine de cards, gestão retrátil de favoritos e listagem integral sob demanda com renderização condicional (`v-if`) para economia de memória.
- **`/{ferramenta}`:** Páginas de utilitários isoladas com área de trabalho limpa, sem poluição de elementos institucionais desnecessários.

### Design System 1.0 (Identidade Solarpunk)
- **Cores & Superfícies:** Canvas neutro de alto contraste, acentos em laranja institucional (`#F97415`), halos difusos *Aurora Glow* e superfícies translúcidas em vidro (*saturated glassmorphism*).
- **Tipografia:** `Space Grotesk` em títulos e cabeçalhos com escalas fluidas (`clamp`), combinada com `Inter` para leitura, formulários e microcópias.
- **Geometria de Precisão:** Cantos suavizados em retângulos definidos (`12px` em botões de ação e `6px` em utilitários), substituindo cápsulas ovais.
- **Componentes Canônicos:** Barra superior suspensa fixa com transição fluida Sol/Lua e rodapé global ([AppFooter.vue](src/components/AppFooter.vue)) com assinatura canônica vetorizada.

### Autossuficiência e CI/CD Remoto
- Todos os ativos de identidade (fontes `.woff2`, tokens e vetores) estão internalizados em `src/brand/`, tornando o repositório autônomo.
- Esteira automatizada no GitHub Actions compilando e publicando a imagem no GHCR a cada push na branch `custom-prod`.

---

## 3. Desenvolvimento Local

### Pré-requisitos
- Node.js 24.x
- PNPM (`corepack enable` ou `npm install -g pnpm`)

### Instalação e Execução

```bash
# 1. Instalar dependências sem executar scripts de terceiros
pnpm install --ignore-scripts

# 2. Iniciar servidor de desenvolvimento com hot-reload
pnpm dev
```

O servidor local iniciará em `http://localhost:5173`.

### Governança de Hardware e Verificação Estática
Em virtude das diretrizes de preservação do host local de desenvolvimento (máquina com 2 CPUs), comandos de compilação pesados (`pnpm build`, `vite build`, `pnpm typecheck`, `vue-tsc`) e testes ponta a ponta são proibidos localmente e delegados exclusivamente ao GitHub Actions.

Validações locais devem ser executadas pontualmente via linter leve:

```bash
pnpm oxlint <arquivo-modificado>
```

---

## 4. Criação de Novas Ferramentas

Para gerar o esqueleto de uma nova ferramenta no padrão do projeto:

```bash
pnpm run script:create:tool nome-da-ferramenta
```

O gerador criará a pasta em `src/tools/nome-da-ferramenta` com os arquivos base. Em seguida, preencha as propriedades (nome, categoria, descrição e ícone) em `src/tools/nome-da-ferramenta/index.ts`.

---

## 5. Créditos e Software Livre

A transparência técnica é a base deste projeto. Esta versão é construída sobre o trabalho de destaque da comunidade de código aberto:

* **Criador original do IT-Tools:** [Corentin Thomasset](https://corentin.tech) ([CorentinTh/it-tools](https://github.com/CorentinTh/it-tools)).
* **Extensões, novos recursos e fork upstream:** [ShareVB](https://github.com/sharevb/it-tools).
* **Customizações de marca, Design System e governança:** [Thiago Maol](https://thiagomaol.com.br).

### Licença

Este projeto é distribuído sob a licença [GNU General Public License v3.0 (GPL-3.0)](LICENSE).
