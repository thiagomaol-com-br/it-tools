# Como Sincronizar a Marca (Design System do Hub)

Este documento explica como funciona e como utilizar o script de sincronização automatizada da marca (**Thiago Maol**) entre o repositório `hub` e o `it-tools`.

---

## 🎯 Objetivo

Eliminar o trabalho manual de copiar e colar arquivos. Sempre que você alterar cores, logos ou tipografia no repositório **`hub`**, basta executar este script para que o **`it-tools`** receba as atualizações instantaneamente.

Ao mesmo tempo, ao armazenar os arquivos sincronizados dentro de `src/brand/`, o projeto continua **100% autossuficiente** para compilar no Docker ou em servidores sem depender de caminhos externos.

---

## 🚀 Como Executar

No terminal, dentro da pasta do projeto `it-tools`, execute:

```bash
node pessoal/sync-brand.mjs
```

---

## 📦 O que o Script Sincroniza?

| Origem (`../hub/brand/`) | Destino (`src/brand/`) | Função no Projeto |
| :--- | :--- | :--- |
| `tokens.json` | `src/brand/tokens.json` | Fonte oficial das cores (Laranja `#F97415`, Dark `#0A0A0A`, Light `#FFFFFF`, etc.) |
| `logo/svg/*.svg` | `src/brand/logo/*.svg` | Logotipos completos e ícones vetorizados (Dark, Light, Mono) |
| `logo/svg/favicon.svg` | `public/favicon.svg` | Ícone oficial que aparece na aba do navegador |
| `fonts/*.woff2` e `fonts.css` | `src/brand/fonts/` | Webfonts oficiais (**Space Grotesk** para títulos e **Inter** para textos) |

---

## 🛡️ Por que esta abordagem protege você em atualizações (Git Upstream)?

1. **Zero Conflitos com o Desenvolvedor Original:**  
   O desenvolvedor original (`sharevb`) não possui as pastas `pessoal/` e nem `src/brand/`. Portanto, o Git **nunca acusará conflito de merge** nesses arquivos quando você puxar atualizações dele.

2. **Portabilidade Total no Docker:**  
   Quando o Docker for compilar a imagem de produção, todos os arquivos necessários para renderizar a sua marca já estarão presentes dentro de `src/brand/`, sem precisar buscar arquivos fora do contêiner.

---

## 🔄 Fluxo de Trabalho Recomendado

Sempre que fizer mudanças na identidade visual:
1. Altere o que precisar no repositório `hub` (ex: ajuste no tom de uma cor em `.brandfy/palette.json` ou `tokens.json`).
2. Venha para o terminal do `it-tools` e rode:
   ```bash
   node pessoal/sync-brand.mjs
   ```
3. Pronto! Os novos estilos estarão imediatamente disponíveis para a aplicação.
