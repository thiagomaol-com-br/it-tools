# Rotina Prática: Como Receber Atualizações do Autor Original (Upstream)

Este guia prático foi feito para você consultar sempre que quiser atualizar o seu **IT-Tools** com as novidades, correções e novas ferramentas criadas pelo autor original (`sharevb`), sem perder suas próprias customizações.

---

## 🧭 O Ritual das 4 Etapas

Pense nesse processo como 4 passos muito simples e seguros:

```text
1. O Olheiro (fetch) ──▶ 2. O Inspetor (log) ──▶ 3. O Entregador (merge) ──▶ 4. O Guardião (push)
  (Busca novidades)        (Espia o que mudou)       (Junta no seu código)      (Salva na sua nuvem)
```

---

### Etapa 1: O Olheiro (`git fetch upstream`)
**O que faz:** Vai até o repositório do autor original e baixa todo o histórico recente para o seu computador, mas **sem mexer em nenhum arquivo de código que você está trabalhando**. É 100% seguro.

```bash
git fetch upstream
```

> [!NOTE]
> **"Executei o `git fetch` e o terminal não mostrou nada. Deu erro?"**  
> Não! No Git e no Linux vigora a regra *"Silêncio é ouro"* (*Silence is golden*). Se o comando rodou sem exibir mensagens ou erros, significa que **deu tudo certo** e seu computador já estava em dia com o autor.
> 
> Se quiser que o Git sempre fale algo para você ter certeza, use a flag de detalhes (`-v` de *verbose*):
> ```bash
> git fetch upstream -v
> ```
> Ele responderá explicitamente com mensagens como `[up to date]` (já atualizado).

> [!TIP]
> Se quiser atualizar as informações do seu repositório E do repositório do autor ao mesmo tempo, use:
> ```bash
> git fetch --all -v
> ```

---

### Etapa 2: O Inspetor (`git log`)
**O que faz:** Permite que você "espie" a lista de novidades que o autor lançou antes de decidir juntar com o seu projeto.

```bash
git log custom-prod..upstream/chore/all-my-stuffs --oneline
```
*O que esse comando significa:*  
> *"Git, liste em uma linha (`--oneline`) tudo o que a branch do autor (`upstream/chore/all-my-stuffs`) tem e que a minha branch (`custom-prod`) ainda não tem."*

---

### Etapa 3: O Entregador (`git merge`)
**O que faz:** Traz as novidades do autor e junta com a sua branch de trabalho (`custom-prod`). Seus arquivos personalizados (como a pasta `pessoal/`, sua paleta e seus links) continuam preservados.

```bash
# 1. Garanta que você está na sua branch de trabalho:
git checkout custom-prod

# 2. Mescle as novidades do autor:
git merge upstream/chore/all-my-stuffs -m "merge: atualiza com as novidades do upstream"
```

---

### Etapa 4: O Guardião (`git push`)
**O que faz:** Agora que o seu computador já recebeu as ferramentas novas e integrou com as suas coisas, você envia tudo atualizado para a sua conta no GitHub (`origin`).

```bash
git push
```

---

## 💡 Dicas de Ouro para Devs Júnior

1. **Nunca faça commits direto na branch do autor (`chore/all-my-stuffs`):**
   * Mantenha essa branch como um espelho limpo.
   * Faça todas as suas alterações sempre dentro da sua branch (`custom-prod`).
2. **E se der "Conflito de Merge" (`CONFLICT`)?**
   * Não entre em pânico! O Git avisa exatamente em qual arquivo há dúvidas:
   * Abra o arquivo no seu editor (VSCodium). Ele vai mostrar em verde e azul:
     * O que veio do autor.
     * O que você escreveu.
   * Basta escolher manter as duas coisas ou escolher a sua alteração, salvar o arquivo e rodar `git commit`.
3. **Use e abuse da pasta `pessoal/` e configurações externas:**
   * Arquivos dentro de `pessoal/` e arquivos como `tools-filter.json` não existem no repositório do autor, logo eles **nunca vão sofrer conflitos de merge**.
