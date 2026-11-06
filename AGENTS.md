# Instruções do projeto

## Diretrizes Operacionais e Governança

### 1. Controle de Versão (Git)
- **Proibido comitar ou fazer push automaticamente**: Nunca executar `git commit` ou `git push` sem autorização prévia e explícita do usuário.
- **Ciclo obrigatório**: Testar alterações -> Registrar decisão no DevLog (se aplicável) -> Apresentar proposta formal (título Conventional Commit, descrição em tópicos e indicação expressa se haverá push ou apenas commit local) -> Aguardar confirmação explícita -> Executar.

### 2. Governança de DevLog (DEVLOG.md)
- Decisões arquiteturais estruturantes, mudanças conceituais de engenharia/produto ou novos trade-offs exigem registro datado no `DEVLOG.md` antes de propor o commit.
- A entrada deve conter estritamente as quatro seções: `1. Contexto`, `2. Decisão`, `3. Justificativa (Por quê)` e `4. Consequências / Trade-offs`.

### 3. Estilo de Comunicação (Anti-AI Writing)
- Respostas técnicas, diretas e concisas em português (pt-BR).
- Proibido elogiar ou bajular perguntas/observações do usuário ("excelente pergunta", "divisor de águas").
- Eliminar aberturas e encerramentos performáticos de chatbot, estruturas de contraste artificial ("não X, mas Y"), conclusões dramáticas isoladas de uma linha e travessões duplos reflexivos.
- Links Markdown devem usar apenas texto simples nos colchetes (ex.: `[arquivo.ext](link)`), nunca aninhar acentos graves dentro dos colchetes.

---

## Restrição Crítica de Hardware e Execução (Host com 2 CPUs)

- **Capacidade do Host:** A máquina de desenvolvimento possui apenas **2 CPUs**. Sobrecargas de processos paralelos travam o host da pessoa usuária.
- **Proibição Absoluta de Processos Paralelos / Segundo Plano:** É TERMINANTEMENTE PROIBIDO executar comandos em paralelo, processos concorrentes ou em segundo plano (*background tasks*). Toda e qualquer operação DEVE ser estritamente sequencial, síncrona e unitária (um único comando por vez, esperando término total).
- **Proibição da Ferramenta de Agendamento (`schedule`):** Fica expressamente vedado o uso da ferramenta `schedule` ou timers automáticos.
- **Comandos Proibidos no Host Local:** Fica terminantemente vedada a execução local de `pnpm build`, `vite build`, `pnpm typecheck`, `vue-tsc` e `pnpm test:e2e`. Esses processos esgotam a memória e congelam o sistema operacional.
- **Validação Local Permitida:** Apenas verificações estáticas leves e pontuais de arquivos modificados via linter: `pnpm oxlint <arquivo>`.
- **Destino dos Builds de Produção:** Compilações completas e geração de imagens Docker pertencem exclusivamente a esteiras remotas (GitHub Actions) ou máquinas externas dedicadas.
- **Respeito ao Ritmo da Conversa:** Jamais atropelar a pessoa usuária com saídas técnicas sucessivas ou execuções não solicitadas. Concluir uma ação por vez e aguardar a validação humana.

---

## Diretório Pessoal do Autor

O diretório `pessoal/` contém anotações, manifestos e referências de estudo do autor.
- Nenhum agente ou skill deve ler, indexar, resumir ou utilizar o conteúdo de `pessoal/` para branding, copy, código ou tom de voz, a menos que o usuário peça explicitamente na conversa para que o diretório seja acessado.