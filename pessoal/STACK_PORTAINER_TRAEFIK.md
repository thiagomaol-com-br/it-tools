# Resolução de Deploy: Stack Portainer (Docker Swarm) + Traefik

Registro técnico e documentação da solução de deploy da central de ferramentas personalizada no Docker Swarm gerenciado via Portainer, utilizando Traefik v2/v3 como proxy reverso com SSL automático (Let's Encrypt).

---

## 1. Problema e Sintomas Relatados

### Cenário Inicial
Ao tentar subir a imagem customizada (`ghcr.io/thiagomaol-com-br/it-tools:latest`) no Portainer em substituição à versão legada do CorentinTh, o contêiner iniciou normalmente, porém o acesso à URL configurada (`https://ferramentas.thiagomaol.com.br`) apresentou:
- **Erro HTTP:** `404 page not found` (em texto puro).
- **Erro de Certificado:** Cadeado HTTPS vermelho e riscado no navegador (alerta de conexão não segura / certificado não confiável).
- Pacote no GitHub Packages já configurado como **Public**.
- Registro de DNS já criado no Cloudflare.

### Logs de Inicialização do Contêiner
O contêiner subiu sem falhas, confirmando que a imagem em si estava saudável:

```text
/docker-entrypoint.sh: /docker-entrypoint.d/ is not empty, will attempt to perform configuration
/docker-entrypoint.sh: Looking for shell scripts in /docker-entrypoint.d/
/docker-entrypoint.sh: Launching /docker-entrypoint.d/10-listen-on-ipv6-by-default.sh
10-listen-on-ipv6-by-default.sh: info: Getting the checksum of /etc/nginx/conf.d/default.conf
10-listen-on-ipv6-by-default.sh: info: /etc/nginx/conf.d/default.conf differs from the packaged version
/docker-entrypoint.sh: Sourcing /docker-entrypoint.d/15-local-resolvers.envsh
/docker-entrypoint.sh: Sourcing /docker-entrypoint.d/18-resolve-base-url.envsh
/docker-entrypoint.sh: Sourcing /docker-entrypoint.d/19-skip-envsubst-if-readonly.envsh
/docker-entrypoint.sh: Launching /docker-entrypoint.d/20-envsubst-on-templates.sh
20-envsubst-on-templates.sh: Running envsubst on /etc/nginx/templates/default.conf.template to /etc/nginx/conf.d/default.conf
/docker-entrypoint.sh: Launching /docker-entrypoint.d/25-remove-ipv6-listen-if-unavailable.sh
/docker-entrypoint.sh: Launching /docker-entrypoint.d/30-tune-worker-processes.sh
/docker-entrypoint.sh: Configuration complete; ready for start up
2026/11/20 22:30:43 [notice] 1#1: using the "epoll" event method
2026/11/20 22:30:43 [notice] 1#1: nginx/1.30.6
2026/11/20 22:30:43 [notice] 1#1: built by gcc 15.2.0 (Alpine 15.2.0) 
2026/11/20 22:30:43 [notice] 1#1: OS: Linux 6.17.0-1016-oracle
2026/11/20 22:30:43 [notice] 1#1: getrlimit(RLIMIT_NOFILE): 1024:524288
2026/11/20 22:30:43 [notice] 1#1: start worker processes
2026/11/20 22:30:43 [notice] 1#1: start worker process 97
```

---

## 2. Diagnóstico e Causa Raiz

A combinação de **`404 page not found`** com **certificado inválido/autoassinado** é o comportamento padrão do **Traefik** quando a requisição atinge o proxy reverso, mas nenhuma rota válida é casada.

### Causas Identificadas:
1. **Colisão Global de Nomes no Docker Swarm:**  
   No Docker Swarm, o Traefik lê os nomes de `routers` e `services` em um escopo global compartilhado entre todas as stacks. Se a stack anterior do CorentinTh ainda estiver ativa ou registrada com o nome `it_tools`, o Traefik detecta conflito de nomes e descarta o router novo, devolvendo seu certificado padrão de fallback (*TRAEFIK DEFAULT CERT*) e o erro 404.
2. **Omissão da Diretiva `tls=true`:**  
   Em diversas versões do Traefik v2 e v3, apontar apenas o `certresolver` sem declarar `tls=true` de forma explícita pode impedir o router de ativar a terminação TLS no entrypoint `websecure`.
3. **Porta Interna do Contêiner (80 vs. 8080):**  
   A versão legada do CorentinTh rodava na porta `80`. A versão customizada (baseada em `nginx-unprivileged`) opera na porta `8080`. O Traefik precisa explicitamente direcionar para `server.port=8080`.

---

## 3. Solução Aplicada

1. **Renomeação Exclusiva dos Recursos:**  
   Substituição do identificador `it_tools` por `tm_ferramentas` em todo o serviço e nas labels do Traefik, eliminando qualquer colisão com stacks pré-existentes.
2. **Ativação Explícita de TLS:**  
   Inclusão da label `traefik.http.routers.tm_ferramentas.tls=true` em conjunto com o `certresolver`.
3. **Validação da Porta 8080:**  
   Manutenção de `loadbalancer.server.port=8080`.

---

## 4. Stack Final Validada e Funcional (Portainer / Docker Swarm)

Abaixo está o YAML completo e testado em produção (Oracle Cloud ARM `aarch64`):

```yaml
version: "3.7"

services:
  tm_ferramentas:
    image: ghcr.io/thiagomaol-com-br/it-tools:latest
    
    hostname: "{{.Service.Name}}.{{.Task.Slot}}"

    networks:
      - network_swarm_public

    deploy:
      mode: replicated
      replicas: 1
      placement:
        constraints:
          - node.role == manager
          # Trava de segurança para execução no processador ARM
          - node.platform.arch == aarch64

      resources:
        limits:
          cpus: '0.7'
          memory: 1000M

      labels:
        - traefik.enable=true
        - traefik.docker.network=network_swarm_public
        - traefik.http.routers.tm_ferramentas.rule=Host(`ferramentas.thiagomaol.com.br`)
        - traefik.http.routers.tm_ferramentas.entrypoints=websecure
        - traefik.http.routers.tm_ferramentas.tls=true
        - traefik.http.routers.tm_ferramentas.tls.certresolver=letsencryptresolver
        - traefik.http.routers.tm_ferramentas.priority=1
        - traefik.http.routers.tm_ferramentas.service=tm_ferramentas
        - traefik.http.services.tm_ferramentas.loadbalancer.server.port=8080
        - traefik.http.services.tm_ferramentas.loadbalancer.passHostHeader=true

networks:
  network_swarm_public:
    external: true
    name: network_swarm_public
```

### Resultado:
Aplicação online, acessível sob HTTPS seguro com certificado Let's Encrypt válido e roteamento pleno em `https://ferramentas.thiagomaol.com.br`.
