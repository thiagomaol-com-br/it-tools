<script setup lang="ts">
import type { Component } from 'vue';
import { NIcon, useThemeVars } from 'naive-ui';
import IconCheck from '~icons/tabler/check';
import IconMoon from '@/brand/icons/moon.svg?component';
import IconSun from '@/brand/icons/sun.svg?component';
import { appLocales } from '@/plugins/i18n.plugin';
import { useStyleStore } from '@/stores/style.store';

const styleStore = useStyleStore();
const { isDarkTheme, themeMode } = toRefs(styleStore);
const themeVars = useThemeVars();

const { locale, t } = useI18n();

const localesLong: Record<string, string> = {
  en: 'English',
  de: 'Deutsch',
  da: 'Dansk',
  es: 'Español',
  fr: 'Français',
  ga: 'Gaeilge',
  it: 'Italiano',
  nl: 'Nederlands',
  no: 'Norwegian',
  pl: 'Polski',
  pt: 'Português',
  ru: 'Русский',
  tr: 'Türkçe',
  el: 'ελληνικά',
  uk: 'Українська',
  ko: '한국인',
  zh: '中文',
  'zh-TW': '繁體中文',
  vi: 'Tiếng Việt',
  ar: 'عربي',
  hi: 'हिन्दी',
};

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

function optionLabel(text: string, isActive: boolean) {
  return () => h('span', { style: isActive ? { color: themeVars.value.primaryColor } : {} }, text);
}

const languageOptions = computed(() =>
  appLocales.map((availableLocale) => ({
    key: availableLocale,
    label: optionLabel(localesLong[availableLocale] ?? availableLocale, availableLocale === locale.value),
    icon: availableLocale === locale.value ? renderIcon(IconCheck) : undefined,
  })),
);

function onLanguageSelect(key: string) {
  locale.value = key;
}

const themeTooltip = computed(() => {
  if (locale.value === 'pt') {
    return isDarkTheme.value ? 'Mudar para modo claro' : 'Mudar para modo escuro';
  }
  if (locale.value === 'es') {
    return isDarkTheme.value ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro';
  }
  return isDarkTheme.value ? 'Switch to light mode' : 'Switch to dark mode';
});

const currentLocaleDisplay = computed(() => {
  const code = String(locale.value || 'pt');
  if (code.toLowerCase() === 'zh-tw') {
    return 'TW';
  }
  return code.toUpperCase();
});
</script>

<template>
  <c-tooltip :tooltip="$t('home.nav.language')" position="bottom">
    <n-dropdown :options="languageOptions" trigger="click" @select="onLanguageSelect">
      <c-button variant="text" font-semibold class="lang-button" :aria-label="$t('home.nav.language')">
        <span class="locale-code">{{ currentLocaleDisplay }}</span>
      </c-button>
    </n-dropdown>
  </c-tooltip>

  <c-tooltip :tooltip="themeTooltip" position="bottom">
    <c-button
      variant="text"
      class="theme-button"
      :aria-label="themeTooltip"
      @click="styleStore.toggleDark()"
    >
      <div class="theme-icon-container">
        <IconSun class="theme-svg-icon icon-sun" :class="{ active: !styleStore.isDarkTheme }" />
        <IconMoon class="theme-svg-icon icon-moon" :class="{ active: styleStore.isDarkTheme }" />
      </div>
    </c-button>
  </c-tooltip>
</template>

<style lang="less" scoped>
.lang-button {
  border-radius: var(--radius-sm, 6px) !important;
  padding: 0 10px !important;
  height: 34px !important;
}

.theme-button {
  width: 34px !important;
  height: 34px !important;
  padding: 0 !important;
  border-radius: var(--radius-sm, 6px) !important;
  position: relative;
}

.theme-icon-container {
  position: relative;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.theme-svg-icon {
  position: absolute;
  width: 18px;
  height: 18px;
  color: currentColor;
  transition: opacity 300ms cubic-bezier(0.4, 0, 0.2, 1),
              transform 300ms cubic-bezier(0.4, 0, 0.2, 1);

  &.icon-sun {
    opacity: 0;
    transform: scale(0.65) rotate(-90deg);

    &.active {
      opacity: 1;
      transform: scale(1) rotate(0deg);
    }
  }

  &.icon-moon {
    opacity: 0;
    transform: scale(0.65) rotate(90deg);

    &.active {
      opacity: 1;
      transform: scale(1) rotate(0deg);
    }
  }
}

.locale-code {
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.n-button {
  &:not(:last-child) {
    margin-right: 5px;
  }
}
</style>
