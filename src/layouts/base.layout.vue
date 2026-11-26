<script lang="ts" setup>
import Home2 from '~icons/tabler/home-2';
import Menu2 from '~icons/tabler/menu-2';
import LayoutGrid from '~icons/tabler/layout-grid';
import { NIcon, useThemeVars } from 'naive-ui';
import { storeToRefs } from 'pinia';
import { RouterLink } from 'vue-router';
import BrandLogoGradientDark from '@/brand/logo/logo-gradient-dark.svg?component';
import BrandLogoGradientLight from '@/brand/logo/logo-gradient-light.svg?component';
import MenuLayout from '../components/MenuLayout.vue';
import NavbarButtons from '../components/NavbarButtons.vue';
import AppFooter from '@/components/AppFooter.vue';
import CollapsibleToolMenu from '@/components/CollapsibleToolMenu.vue';
import { config } from '@/config';
import { useStyleStore } from '@/stores/style.store';
import { useToolStore } from '@/tools/tools.store';
import type { ToolCategory } from '@/tools/tools.types';

const themeVars = useThemeVars();
const styleStore = useStyleStore();
const version = config.app.version;
const commitSha = config.app.lastCommitSha.slice(0, 7);

// Expose the navbar height so the mobile menu (MenuLayout.vue) can position
// itself right under the always-visible top bar.
const navbarRef = ref<HTMLElement | null>(null);
const { height: navbarHeight } = useElementSize(navbarRef, undefined, { box: 'border-box' });
watchEffect(() => {
  document.documentElement.style.setProperty('--app-topbar-height', `${Math.round(navbarHeight.value)}px`);
});

const { t, locale } = useI18n();

const toolStore = useToolStore();
const { favoriteTools, toolsByCategory } = storeToRefs(toolStore);

const tools = computed<ToolCategory[]>(() => [
  ...(favoriteTools.value.length > 0
    ? [{ name: t('tools.categories.favorite-tools'), components: favoriteTools.value }]
    : []),
  ...toolsByCategory.value,
]);

const solutionButtonLabel = computed(() => {
  if (locale.value === 'pt') {
    return 'Solicitar Solução ↗';
  }
  if (locale.value === 'es') {
    return 'Solicitar Solución ↗';
  }
  return 'Request a Solution ↗';
});

const solutionButtonMobileLabel = computed(() => {
  if (locale.value === 'pt' || locale.value === 'es') {
    return 'Solicitar';
  }
  return 'Request';
});
</script>

<template>
  <MenuLayout class="menu-layout" :class="{ isSmallScreen: styleStore.isSmallScreen }">
    <template #sider>
      <RouterLink to="/" class="hero-wrapper" :class="{ 'is-dark': styleStore.isDarkTheme }">
        <div class="text-wrapper">
          <div class="title">
            <BrandLogoGradientDark v-if="styleStore.isDarkTheme" class="brand-logo" />
            <BrandLogoGradientLight v-else class="brand-logo" />
          </div>
          <div class="divider" />
          <div class="subtitle">
            Ferramentas
          </div>
        </div>
      </RouterLink>

      <div class="sider-content">
        <CollapsibleToolMenu :tools-by-category="tools" />

        <div class="footer">
          <div class="footer-sider-line">
            <span>IT-Tools</span>
            <c-link target="_blank" rel="noopener" :href="`https://github.com/thiagomaol-com-br/it-tools`">
              v{{ version }}
            </c-link>
            <template v-if="commitSha && commitSha.length > 0">
              <c-link
                target="_blank"
                rel="noopener"
                type="primary"
                :href="`https://github.com/thiagomaol-com-br/it-tools/tree/${commitSha}`"
              >
                ({{ commitSha }})
              </c-link>
            </template>
            <span class="sep">•</span>
            <c-link target="_blank" rel="noopener" href="https://thiagomaol.com.br" class="author-sider">
              Thiago Maol<span class="author-dot">.</span>
            </c-link>
          </div>
        </div>
      </div>
    </template>

    <template #content>
      <div ref="navbarRef" class="navbar" :class="{ 'is-dark': styleStore.isDarkTheme }" flex items-center justify-center gap-1.5 sm:gap-2>
        <c-tooltip :tooltip="$t('home.home')" position="bottom">
          <c-button
            to="/"
            variant="text"
            font-semibold
            class="nav-button-action"
            :aria-label="$t('home.home')"
          >
            <NIcon size="19" :component="Home2" :class="{ 'mr-1': !styleStore.isSmallScreen }" />
            <span v-if="!styleStore.isSmallScreen">{{ $t('home.home') }}</span>
          </c-button>
        </c-tooltip>

        <c-tooltip tooltip="Menu" position="bottom">
          <c-button
            variant="text"
            font-semibold
            class="nav-button-action"
            aria-label="Menu"
            @click="styleStore.isMenuCollapsed = !styleStore.isMenuCollapsed"
          >
            <NIcon size="19" :component="Menu2" :class="{ 'mr-1': !styleStore.isSmallScreen }" />
            <span v-if="!styleStore.isSmallScreen">Menu</span>
          </c-button>
        </c-tooltip>

        <c-tooltip tooltip="Ferramentas" position="bottom">
          <c-button
            to="/ferramentas"
            variant="text"
            font-semibold
            class="nav-button-action"
            aria-label="Ferramentas"
          >
            <NIcon size="19" :component="LayoutGrid" :class="{ 'mr-1': !styleStore.isSmallScreen }" />
            <span v-if="!styleStore.isSmallScreen">Ferramentas</span>
          </c-button>
        </c-tooltip>

        <c-tooltip :tooltip="$t('home.uiLib')" position="bottom">
          <c-button
            v-if="config.app.env === 'development'"
            to="/c-lib"
            circle
            variant="text"
            :aria-label="$t('home.uiLib')"
          >
            <icon-mdi:brush-variant text-20px />
          </c-button>
        </c-tooltip>

        <Suspense>
          <command-palette :key="locale" />
        </Suspense>

        <div>
          <NavbarButtons />
        </div>

        <c-tooltip position="bottom" :tooltip="solutionButtonLabel">
          <c-button
            href="https://thiagomaol.com.br/solicitar-solucao/"
            rel="noopener noreferrer"
            target="_blank"
            class="solution-button"
            :class="{ 'is-dark': styleStore.isDarkTheme }"
            :bordered="false"
            :aria-label="solutionButtonLabel"
          >
            <span v-if="!styleStore.isSmallScreen">{{ solutionButtonLabel }}</span>
            <span v-else>{{ solutionButtonMobileLabel }}</span>
          </c-button>
        </c-tooltip>
      </div>
      <!-- Positioned wrapper so the route-change loading overlay (see router.ts)
           can cover just the page, leaving the nav bar and menu visible. -->
      <div class="page-content">
        <div class="aurora-glow" :class="{ 'is-dark': styleStore.isDarkTheme }" aria-hidden="true" />
        <div class="page-inner">
          <slot />
          <AppFooter />
        </div>
      </div>
    </template>
  </MenuLayout>
</template>

<style lang="less" scoped>
// ::v-deep(.n-layout-scroll-container) {
//     @percent: 4%;
//     @position: 25px;
//     @size: 50px;
//     @color: #eeeeee25;
//     background-image: radial-gradient(@color @percent, transparent @percent),
//         radial-gradient(@color @percent, transparent @percent);
//     background-position: 0 0, @position @position;
//     background-size: @size @size;
// }

.nav-button-action {
  border-radius: var(--radius-md, 12px) !important;
  transition: all 0.15s ease !important;

  @media (max-width: 700px) {
    width: 34px !important;
    height: 34px !important;
    padding: 0 !important;
  }
}

.solution-button {
  font-weight: 700;
  font-size: 13px;
  border-radius: var(--radius-md, 12px) !important;
  transition: all 0.2s ease !important;

  // Default: Light Mode Solarpunk CTA (Padrão Canônico)
  background: linear-gradient(135deg, hsl(25, 95%, 46%), hsl(25, 95%, 39%)) !important;
  color: #ffffff !important;
  border: 1px solid hsla(25, 95%, 55%, 0.3) !important;
  box-shadow: 0 2px 10px -2px hsla(25, 95%, 45%, 0.35);

  @media (max-width: 700px) {
    padding-left: 10px !important;
    padding-right: 10px !important;
    font-size: 12px;
  }

  &:hover {
    color: #ffffff !important;
    transform: translateY(-1px);
    box-shadow: 0 4px 16px -2px hsla(25, 95%, 45%, 0.5);
    filter: brightness(1.05);
  }

  &:active {
    transform: translateY(0) scale(0.98);
    box-shadow: 0 1px 4px hsla(25, 95%, 45%, 0.3);
  }

  // Dark Mode Solarpunk CTA (Padrão Canônico)
  &.is-dark {
    background: linear-gradient(135deg, hsl(25, 95%, 56%), hsl(25, 95%, 47%)) !important;
    color: #0a0a0a !important;
    border: 1px solid hsla(25, 95%, 65%, 0.4) !important;
    box-shadow: 0 2px 14px -2px hsla(25, 95%, 50%, 0.45);

    &:hover {
      color: #0a0a0a !important;
      transform: translateY(-1px);
      box-shadow: 0 4px 20px -2px hsla(25, 95%, 50%, 0.65);
      filter: brightness(1.08);
    }

    &:active {
      transform: translateY(0) scale(0.98);
      box-shadow: 0 1px 6px hsla(25, 95%, 50%, 0.4);
    }
  }
}

.footer {
  text-align: center;
  color: #838587;
  margin-top: 20px;
  padding: 20px 0;
  font-size: 11px;

  .footer-sider-line {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 4px;
  }

  .author-sider {
    font-family: var(--font-heading), "Space Grotesk", sans-serif;
    font-weight: 700;
    color: inherit;
    text-decoration: none;
  }

  .author-dot {
    color: #f97415;
    font-weight: 800;
  }

  .sep {
    opacity: 0.4;
  }
}

.sider-content {
  padding-top: 20px;
  padding-bottom: 50px;

  @media (max-width: 700px) {
    // The hero block above provides the symmetric 24px gap
    padding-top: 0;
  }
}

.page-content {
  position: relative;
  min-height: calc(100vh - 120px);
}

.page-inner {
  position: relative;
  z-index: 1;
}

.aurora-glow {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 65rem;
  height: 24rem;
  pointer-events: none;
  z-index: 0;
  filter: blur(50px);
  overflow: hidden;

  // Modo Claro e Modo Escuro: 12% no centro esmaecendo para 6% e transparente a 70%
  background: radial-gradient(
    ellipse at 50% 0%,
    hsla(25, 95%, 53%, 0.12) 0%,
    hsla(50, 95%, 50%, 0.06) 40%,
    transparent 70%
  );

  &.is-dark {
    background: radial-gradient(
      ellipse at 50% 0%,
      hsla(25, 95%, 53%, 0.12) 0%,
      hsla(50, 95%, 50%, 0.06) 40%,
      transparent 70%
    );
  }

  @media (max-width: 700px) {
    height: 18rem;
    max-width: 32rem;
    filter: blur(35px);

    background: radial-gradient(
      ellipse at 50% 0%,
      hsla(25, 95%, 53%, 0.12) 0%,
      hsla(50, 95%, 50%, 0.06) 40%,
      transparent 70%
    );

    &.is-dark {
      background: radial-gradient(
        ellipse at 50% 0%,
        hsla(25, 95%, 53%, 0.12) 0%,
        hsla(50, 95%, 50%, 0.06) 40%,
        transparent 70%
      );
    }
  }
}

// Sticky Navbar com a Fórmula Canônica do Vidro Vivo (Design System 1.0)
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  transition: background-color 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;

  // Default: Modo Claro (Light Mode) - Fundo translúcido saturado com desfoque e sombra suave
  background: rgba(255, 255, 255, 0.65);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  backdrop-filter: blur(16px) saturate(180%);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.08), 0 1px 2px 0 rgba(0, 0, 0, 0.04);

  margin: -26px -26px 20px;
  padding: 10px 26px;

  @media (max-width: 700px) {
    margin: -13px -13px 13px;
    padding: 10px 8px;
  }

  // Override: Modo Escuro (Dark Mode) - Vidro Vivo escuro com desfoque e sombra 3D de alta oclusão
  &.is-dark {
    background: rgba(0, 0, 0, 0.25);
    -webkit-backdrop-filter: blur(16px) saturate(160%);
    backdrop-filter: blur(16px) saturate(160%);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.8), 0 4px 12px -2px rgba(0, 0, 0, 0.5);
  }
}

.hero-wrapper {
  position: sticky;
  display: flex;
  top: 0;
  left: 0;
  z-index: 10;
  height: 112px;
  width: 100%;
  overflow: hidden;
  text-decoration: none;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 16px 12px;
  transition: background 0.2s ease, border-color 0.2s ease;

  // Modo Claro: Fundo claro luminoso com suave aquecimento âmbar
  background: linear-gradient(180deg, rgba(249, 116, 21, 0.05) 0%, rgba(255, 255, 255, 0.95) 100%), #FFFFFF;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);

  // Modo Escuro: Fundo escuro integrado ao sider com leve toque térmico
  &.is-dark {
    background: linear-gradient(180deg, rgba(249, 116, 21, 0.07) 0%, rgba(23, 23, 23, 0.95) 100%), #171717;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .text-wrapper {
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;

      :deep(svg),
      .brand-logo {
        width: 155px;
        height: auto;
        max-width: 85%;
        display: block;
        margin: 0 auto;
      }
    }

    .divider {
      width: 32px;
      height: 2px;
      border-radius: 4px;
      background-color: #f97415;
      opacity: 0.5;
      margin: 8px auto 6px;
    }

    .subtitle {
      font-family: var(--font-heading), "Space Grotesk", sans-serif;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: #595959;
      transition: color 0.2s ease;
    }
  }

  &.is-dark .text-wrapper .subtitle {
    color: #a6a6a6;
  }

  // Mobile: mesma identidade visual suave e padronizada
  @media (max-width: 700px) {
    position: static;
    height: 105px;
    padding: 18px 0;
  }
}
</style>
