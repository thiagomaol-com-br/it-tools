<script lang="ts" setup>
import Coffee from '~icons/tabler/coffee';
import Home2 from '~icons/tabler/home-2';
import Menu2 from '~icons/tabler/menu-2';
import LayoutGrid from '~icons/tabler/layout-grid';
import { NIcon, useThemeVars } from 'naive-ui';
import { storeToRefs } from 'pinia';
import { RouterLink } from 'vue-router';
import HeroGradient from '../assets/hero-gradient.svg?component';
import BrandLogoGradientDark from '@/brand/logo/logo-gradient-dark.svg?component';
import BrandLogoGradientLight from '@/brand/logo/logo-gradient-light.svg?component';
import MenuLayout from '../components/MenuLayout.vue';
import NavbarButtons from '../components/NavbarButtons.vue';
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
</script>

<template>
  <MenuLayout class="menu-layout" :class="{ isSmallScreen: styleStore.isSmallScreen }">
    <template #sider>
      <RouterLink to="/" class="hero-wrapper">
        <HeroGradient class="gradient" />
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
        <div v-if="styleStore.isSmallScreen" mb-24px flex justify-center>
          <NavbarButtons />
        </div>

        <CollapsibleToolMenu :tools-by-category="tools" />

        <div class="footer">
          <div>
            IT-Tools

            <c-link target="_blank" rel="noopener" :href="`https://github.com/thiagomaol-com-br/it-tools`">
              v{{ version }}
            </c-link>

            <template v-if="commitSha && commitSha.length > 0">
              -
              <c-link
                target="_blank"
                rel="noopener"
                type="primary"
                :href="`https://github.com/thiagomaol-com-br/it-tools/tree/${commitSha}`"
              >
                {{ commitSha }}
              </c-link>
            </template>
          </div>
          <div>
            © {{ new Date().getFullYear() }}
            <c-link target="_blank" rel="noopener" href="https://thiagomaol.com.br">
              Thiago Maol
            </c-link>
          </div>
        </div>
      </div>
    </template>

    <template #content>
      <div ref="navbarRef" class="navbar" flex items-center justify-center gap-2>
        <c-tooltip :tooltip="$t('home.home')" position="bottom">
          <c-button to="/" round variant="text" font-semibold :aria-label="$t('home.home')">
            <NIcon size="19" :component="Home2" mr-1 />
            {{ $t('home.home') }}
          </c-button>
        </c-tooltip>

        <c-tooltip :tooltip="$t('home.toggleMenu')" position="bottom">
          <c-button
            round
            variant="text"
            font-semibold
            :aria-label="$t('home.toggleMenu')"
            @click="styleStore.isMenuCollapsed = !styleStore.isMenuCollapsed"
          >
            <NIcon size="19" :component="Menu2" mr-1 />
            {{ $t('home.toggleMenu') }}
          </c-button>
        </c-tooltip>

        <c-tooltip tooltip="Ferramentas" position="bottom">
          <c-button to="/ferramentas" round variant="text" font-semibold aria-label="Ferramentas">
            <NIcon size="19" :component="LayoutGrid" mr-1 />
            Ferramentas
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
          <NavbarButtons v-if="!styleStore.isSmallScreen" />
        </div>

        <c-tooltip position="bottom" :tooltip="$t('home.support')">
          <c-button
            round
            href="https://www.buymeacoffee.com/sharevb"
            rel="noopener"
            target="_blank"
            class="support-button"
            :bordered="false"
          >
            <span v-if="!styleStore.isSmallScreen" mr-2>{{ $t('home.buyMeACoffee') }}</span>
            <NIcon :component="Coffee" />
          </c-button>
        </c-tooltip>
      </div>
      <!-- Positioned wrapper so the route-change loading overlay (see router.ts)
           can cover just the page, leaving the nav bar and menu visible. -->
      <div class="page-content">
        <slot />
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

.support-button {
  background: rgb(37, 99, 108);
  background: linear-gradient(48deg, rgba(37, 99, 108, 1) 0%, rgba(59, 149, 111, 1) 60%, rgba(20, 160, 88, 1) 100%);
  color: #fff !important;
  transition: padding ease 0.2s !important;

  &:hover {
    color: #fff;
    padding-left: 30px;
    padding-right: 30px;
  }
}

.footer {
  text-align: center;
  color: #838587;
  margin-top: 20px;
  padding: 20px 0;
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
}

// Mobile: the top bar stays visible while scrolling, and the full-width menu
// (see MenuLayout.vue) opens right under it.
.navbar {
  @media (max-width: 700px) {
    position: sticky;
    top: 0;
    z-index: 20;
    // Bleed over the scroll container's 13px padding so content scrolls
    // under an opaque, full-width bar.
    margin: -13px -13px 13px;
    padding: 13px;
    background-color: v-bind('themeVars.bodyColor');
  }
}

.hero-wrapper {
  position: sticky;
  display: flex;
  top: 0;
  left: 0;
  z-index: 10;
  height: 125px;
  overflow: hidden;
  width: inherit;

  .gradient {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: block;
  }

  .text-wrapper {
    position: absolute;
    left: 0;
    width: 100%;
    text-align: center;
    top: 16px;
    color: #fff;

    .title {
      font-size: 25px;
      font-weight: 600;
      display: flex;
      justify-content: center;
      align-items: center;

      :deep(svg),
      .brand-logo {
        width: 170px;
        height: auto;
        max-width: 80%;
        display: block;
        margin: 0 auto;
      }
    }

    .divider {
      width: 44px;
      height: 2px;
      border-radius: 4px;
      background-color: rgba(249, 116, 21, 0.4);
      margin: 8px auto 6px;
    }

    .subtitle {
      font-size: 15px;
      font-weight: 500;
      color: #E5E5E5;
      letter-spacing: 0.5px;
    }
  }

  // Mobile: seamless full-width menu — no green hero gradient, text follows
  // the theme, and the header scrolls with the menu. Placed after the base
  // rules above so these override them (same specificity, later source order).
  @media (max-width: 700px) {
    position: static;
    height: auto;
    // Symmetric spacing above and below the title block (sider-content's
    // top padding is removed on mobile to keep the bottom gap equal)
    padding: 24px 0;
    // The hero is a router link; keep the plain-text look without the gradient
    text-decoration: none;

    .gradient {
      display: none;
    }

    .text-wrapper {
      position: static;
      padding-top: 0;
      color: v-bind('themeVars.textColor1');

      .subtitle {
        color: v-bind('themeVars.textColor1');
      }
    }
  }
}
</style>
