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

const themeTriggerIcon = computed(() => (isDarkTheme.value ? IconMoon : IconSun));

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
      <c-button round variant="text" font-semibold :aria-label="$t('home.nav.language')">
        <span class="locale-code">{{ currentLocaleDisplay }}</span>
      </c-button>
    </n-dropdown>
  </c-tooltip>

  <c-tooltip :tooltip="themeTooltip" position="bottom">
    <c-button
      circle
      variant="text"
      :aria-label="themeTooltip"
      @click="styleStore.toggleDark()"
    >
      <n-icon size="20" :component="themeTriggerIcon" />
    </c-button>
  </c-tooltip>
</template>

<style lang="less" scoped>
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
