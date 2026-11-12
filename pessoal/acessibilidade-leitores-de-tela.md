# Guia de Acessibilidade Web para Leitores de Tela

Anotações e conceitos técnicos fundamentais sobre como leitores de tela (NVDA, JAWS, VoiceOver, TalkBack) interpretam elementos interativos e como estruturar botões acessíveis segundo o padrão **W3C WAI-ARIA**.

---

## 1. O Campo Principal: `aria-label`

Para botões ou links que contêm apenas ícones (ou siglas curtas como `PT`), o atributo essencial é o **`aria-label`**:

```html
<button aria-label="Mudar para modo escuro">
  <svg ... />
</button>
```

Quando a tecnologia assistiva foca no elemento, ela lê prioritariamente o conteúdo de `aria-label`. Sem esse atributo, a pessoa cega ouve apenas *"botão"* ou o nome interno do arquivo do ícone.

---

## 2. O Texto Interno Visível

Quando o elemento interativo já possui texto visível (por exemplo, `[ 🏠 Início ]`), o leitor de tela lê por padrão o próprio texto contido no nó DOM (`"Início"`).

Nesses casos, o `aria-label` pode reforçar ou complementar, mas o texto interno já garante acessibilidade nativa sem exigir atributos extras.

---

## 3. E o Tooltip Visual?

O **tooltip** visual (balão flutuante que surge ao passar o cursor do mouse) é projetado para pessoas que enxergam e navegam com cursor:

* Leitores de tela **ignoram** divs visuais flutuantes de tooltip, a menos que estejam explicitamente associadas por `aria-describedby="id-do-tooltip"`.
* O antigo atributo nativo `title="..."` do HTML é desencorajado pelas diretrizes internacionais de acessibilidade (WCAG), pois não funciona em telas sensíveis ao toque (smartphones e tablets) e apresenta comportamento inconsistente em leitores de tela.

---

## 4. Hierarquia de Prioridade (Cálculo de Nome Acessível - W3C)

Ao anunciar um botão para a pessoa usuária, o navegador calcula o nome acessível seguindo a seguinte ordem de precedência:

1. **`aria-labelledby`:** Aponta para o ID de outro elemento textual na página (tem a maior precedência).
2. **`aria-label`:** Sobrescreve todo o texto interno do botão.
3. **Texto interno do elemento:** Lido caso não existam atributos ARIA específicos.
4. **`title` nativo:** Utilizado apenas como último recurso ou fallback fraco.

---

## 5. Boas Práticas Aplicadas no Projeto

* **Botões com texto visível:** Manter texto direto e autoexplicativo (ex.: *"Início"*, *"Menu"*, *"Ferramentas"*).
* **Botões de alternância (toggles):** Informar a ação futura ou o estado no `aria-label` (ex.: *"Mudar para modo escuro"* quando ativo o modo claro).
* **Botões apenas de ícone:** Sempre fornecer `aria-label` idêntico ou equivalente ao tooltip visual.
