<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import BrandLogoGradientDark from '@/brand/logo/logo-gradient-dark.svg?component';
import BrandLogoGradientLight from '@/brand/logo/logo-gradient-light.svg?component';
import { useStyleStore } from '@/stores/style.store';

const route = useRoute();
const styleStore = useStyleStore();
const { t, locale } = useI18n();

// Opção A aprovada: chamada de conversão na Home (/) e Catálogo (/ferramentas),
// e rodapé compacto nas ferramentas individuais para não atrapalhar o uso técnico.
const isToolPage = computed(() => Boolean(route.meta?.isTool));

const conversionText = computed(() => {
  if (locale.value === 'es') {
    return '¿Necesita una herramienta dedicada para su operación sin pagar suscripciones infladas por usuario? Implemento y gestiono soluciones a medida para su negocio.';
  }
  if (locale.value === 'en') {
    return 'Need a dedicated tool for your operations without paying inflated per-user subscriptions? I deploy and manage tailored solutions for your business.';
  }
  return 'Precisa de uma ferramenta dedicada para a sua operação sem pagar assinaturas inflacionadas por usuário? Eu implanto e gerencio soluções sob medida para o seu negócio.';
});

const ctaLabel = computed(() => {
  if (locale.value === 'es') {
    return 'Solicitar Solución ↗';
  }
  if (locale.value === 'en') {
    return 'Request a Solution ↗';
  }
  return 'Solicitar Solução ↗';
});

const officialPhrase = computed(() => {
  if (locale.value === 'es') {
    return 'Tecnología práctica al servicio de las personas. Menos tareas mecánicas y menos sobrecarga mental en la rutina de su empresa.';
  }
  if (locale.value === 'en') {
    return 'Practical technology serving people. Fewer mechanical tasks and less mental fatigue in your company\'s routine.';
  }
  return 'Tecnologia prática a serviço das pessoas. Menos tarefas mecânicas e menos sobrecarga mental na rotina da sua empresa.';
});
</script>

<template>
  <footer class="app-footer">
    <div class="footer-container">
      <!-- Bloco de Conversão (Apenas na Home e no Catálogo, conforme Opção A) -->
      <div v-if="!isToolPage" class="conversion-block">
        <p class="conversion-text">
          {{ conversionText }}
        </p>
        <div class="conversion-action">
          <c-button
            href="https://thiagomaol.com.br/solicitar-solucao/"
            target="_blank"
            rel="noopener noreferrer"
            class="solution-button"
            :aria-label="ctaLabel"
          >
            {{ ctaLabel }}
          </c-button>
        </div>
      </div>

      <!-- Assinatura Canônica da Marca -->
      <div class="brand-signature">
        <div class="brand-logo-wrapper">
          <BrandLogoGradientDark v-if="styleStore.isDarkTheme" class="brand-logo" />
          <BrandLogoGradientLight v-else class="brand-logo" />
        </div>
        <p class="signature-phrase">
          {{ officialPhrase }}
        </p>
      </div>

      <!-- Linha de Navegação, Créditos e Copyright -->
      <div class="footer-bottom">
        <div class="footer-links">
          <c-link target="_blank" rel="noopener" href="https://thiagomaol.com.br" class="site-link">
            thiagomaol.com.br
          </c-link>
          <span class="sep">•</span>
          <span class="credits">
            IT-Tools (Corentin Thomasset &amp; ShareVB)
          </span>
          <span class="sep">•</span>
          <c-link
            target="_blank"
            rel="noopener"
            href="https://github.com/thiagomaol-com-br/it-tools/blob/main/LICENSE"
          >
            GPL-3.0
          </c-link>
        </div>

        <div class="copyright">
          © {{ new Date().getFullYear() }}
          <span class="author-name">Thiago Maol<span class="author-dot">.</span></span>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="less">
.app-footer {
  margin-top: 4rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding: 3rem 1rem 2.5rem;
  transition: border-color 0.2s ease;
  position: relative;
  z-index: 1;

  .footer-container {
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .conversion-block {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: var(--radius-lg, 16px);
    padding: 1.75rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;

    @media (max-width: 700px) {
      flex-direction: column;
      text-align: center;
      padding: 1.5rem;
      gap: 1.25rem;
    }

    .conversion-text {
      margin: 0;
      font-size: 1rem;
      line-height: 1.6;
      color: #e5e5e5;
      flex: 1;
    }

    .conversion-action {
      flex-shrink: 0;
    }
  }

  .brand-signature {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;

    .brand-logo-wrapper {
      height: 32px;
      display: flex;
      align-items: center;

      @media (max-width: 700px) {
        height: 28px;
      }

      .brand-logo {
        height: 100%;
        width: auto;
      }
    }

    .signature-phrase {
      margin: 0;
      font-size: 0.9375rem;
      line-height: 1.5;
      color: #a6a6a6;
      max-width: 38rem;
    }
  }

  .footer-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
    padding-top: 1.25rem;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    font-size: 0.875rem;
    color: #838587;

    @media (max-width: 700px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.75rem;
    }

    .footer-links {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.5rem;

      .site-link {
        font-weight: 600;
        color: #f97415;
      }

      .sep {
        opacity: 0.4;
      }
    }

    .copyright {
      .author-name {
        font-family: var(--font-heading), "Space Grotesk", sans-serif;
        font-weight: 700;
        color: #e5e5e5;
        margin-left: 0.25rem;
      }

      .author-dot {
        color: #f97415;
        font-weight: 800;
      }
    }
  }
}

// Suporte ao Modo Claro
:global(html:not(.dark)) .app-footer {
  border-top-color: rgba(0, 0, 0, 0.08);

  .conversion-block {
    background: rgba(0, 0, 0, 0.02);
    border-color: rgba(0, 0, 0, 0.08);

    .conversion-text {
      color: #1a1a1a;
    }
  }

  .signature-phrase {
    color: #595959;
  }

  .footer-bottom {
    border-top-color: rgba(0, 0, 0, 0.05);
    color: #595959;

    .copyright .author-name {
      color: #1a1a1a;
    }
  }
}

// Estilos do botão Solarpunk
.solution-button {
  font-weight: 700;
  font-size: 13px;
  border-radius: var(--radius-md, 12px) !important;
  transition: all 0.2s ease !important;
  background: linear-gradient(135deg, hsl(25, 95%, 56%), hsl(25, 95%, 47%)) !important;
  color: #0a0a0a !important;
  border: 1px solid hsla(25, 95%, 65%, 0.4) !important;
  box-shadow: 0 2px 14px -2px hsla(25, 95%, 50%, 0.45);
  padding: 0 18px !important;
  height: 40px !important;

  &:hover {
    color: #0a0a0a !important;
    transform: translateY(-1px);
    box-shadow: 0 4px 20px -2px hsla(25, 95%, 50%, 0.65);
    filter: brightness(1.08);
  }

  &:active {
    transform: translateY(0) scale(0.98);
  }
}

:global(html:not(.dark)) .solution-button {
  background: linear-gradient(135deg, hsl(25, 95%, 46%), hsl(25, 95%, 39%)) !important;
  color: #ffffff !important;
  border: 1px solid hsla(25, 95%, 55%, 0.3) !important;
  box-shadow: 0 2px 10px -2px hsla(25, 95%, 45%, 0.35);

  &:hover {
    color: #ffffff !important;
    transform: translateY(-1px);
    box-shadow: 0 4px 16px -2px hsla(25, 95%, 45%, 0.5);
    filter: brightness(1.05);
  }
}
</style>
