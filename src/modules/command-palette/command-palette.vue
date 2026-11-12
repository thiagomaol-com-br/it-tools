<script setup lang="ts">
import { storeToRefs } from 'pinia';
import * as _ from 'es-toolkit/compat';
import { useCommandPaletteStore } from './command-palette.store';
import type { PaletteOption } from './command-palette.types';
import { loadLocaleMessages } from '@/plugins/i18n.plugin';
import { useStyleStore } from '@/stores/style.store';

const styleStore = useStyleStore();

const isModalOpen = ref(false);
const inputRef = ref();
const router = useRouter();
const isMac = computed(() => window.navigator.userAgent.toLowerCase().includes('mac'));

const { locale } = useI18n();
await loadLocaleMessages(locale.value);

const commandPaletteStore = useCommandPaletteStore(locale.value);
const { searchPrompt, filteredSearchResult } = storeToRefs(commandPaletteStore);

const keys = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.ctrlKey && e.key === 'k' && e.type === 'keydown') {
      e.preventDefault();
    }

    if (e.metaKey && e.key === 'k' && e.type === 'keydown') {
      e.preventDefault();
    }
  },
});

whenever(isModalOpen, () => inputRef.value?.focus());

whenever(keys.ctrl_k, open);
whenever(keys.meta_k, open);
whenever(keys.escape, close);

function open() {
  return (isModalOpen.value = true);
}

function close() {
  isModalOpen.value = false;
  searchPrompt.value = '';
}

const selectedOptionIndex = ref(0);

function handleKeydown(event: KeyboardEvent) {
  const { key } = event;
  const isEnterPressed = key === 'Enter';
  const isArrowUpOrDown = ['ArrowUp', 'ArrowDown'].includes(key);
  const isArrowDown = key === 'ArrowDown';

  if (isArrowUpOrDown) {
    const increment = isArrowDown ? 1 : -1;
    const maxIndex = Math.max(Object.values(filteredSearchResult.value).flat().length - 1, 0);

    selectedOptionIndex.value = Math.min(Math.max(selectedOptionIndex.value + increment, 0), maxIndex);

    return;
  }

  if (isEnterPressed) {
    const option = Object.values(filteredSearchResult.value).flat()[selectedOptionIndex.value];

    if (option) {
      activateOption(option);
    }
  }
}

function getOptionIndex(option: PaletteOption) {
  return Object.values(filteredSearchResult.value)
    .flat()
    .findIndex((o) => o === option);
}

function activateOption(option: PaletteOption) {
  const { closeOnSelect } = option;

  if (option.action) {
    option.action();

    if (closeOnSelect) {
      close();
    }

    return;
  }

  const closeAfterNavigation = closeOnSelect || _.isUndefined(closeOnSelect);

  if (option.to) {
    router.push(option.to);

    if (closeAfterNavigation) {
      close();
    }
    return;
  }

  if (option.href) {
    window.open(option.href, '_blank');

    if (closeAfterNavigation) {
      close();
    }
  }
}

const searchPlaceholder = computed(() => {
  if (locale.value === 'pt') {
    return 'Buscar ferramenta... (ex: texto, senha, json)';
  }
  if (locale.value === 'es') {
    return 'Buscar herramienta... (ej: texto, contraseña, json)';
  }
  return 'Search tool... (e.g. text, password, json)';
});

const searchButtonAriaLabel = computed(() => {
  const shortcut = isMac.value ? 'Cmd + K' : 'Ctrl + K';
  if (locale.value === 'pt') {
    return `Buscar ferramenta... (ex: texto, senha, json) - Atalho: ${shortcut}`;
  }
  if (locale.value === 'es') {
    return `Buscar herramienta... (ej: texto, contraseña, json) - Atajo: ${shortcut}`;
  }
  return `Search tool... (e.g. text, password, json) - Shortcut: ${shortcut}`;
});
</script>

<template>
  <div :class="{ 'flex-1': !styleStore.isSmallScreen }">
    <c-button
      v-if="!styleStore.isSmallScreen"
      w-full
      important:justify-start
      class="search-bar-trigger"
      :aria-label="searchButtonAriaLabel"
      @click="isModalOpen = true"
    >
      <span flex items-center gap-2 op-50 text-13px font-normal truncate>
        <icon-mdi-search text-18px shrink-0 />
        <span truncate>{{ searchPlaceholder }}</span>
      </span>
    </c-button>

    <c-tooltip v-else :tooltip="searchPlaceholder" position="bottom">
      <c-button
        variant="text"
        class="search-bar-mobile-trigger"
        :aria-label="searchButtonAriaLabel"
        @click="isModalOpen = true"
      >
        <icon-mdi-search text-19px />
      </c-button>
    </c-tooltip>

    <c-modal
      v-model:open="isModalOpen"
      class="palette-modal"
      overflow-y-auto
      shadow-xl
      important:max-w-650px
      pretty-scrollbar
      important:pa-12px
      @keydown="handleKeydown"
    >
      <c-input-text
        ref="inputRef"
        v-model:value="searchPrompt"
        raw-text
        :placeholder="searchPlaceholder"
        :aria-label="searchPlaceholder"
        autofocus
        clearable
      />

      <div v-for="(options, category) in filteredSearchResult" :key="category">
        <div ml-3 mt-3 text-sm font-bold text-primary op-60>
          {{ category }}
        </div>
        <command-palette-option
          v-for="option in options"
          :key="option.name"
          :option="option"
          :selected="selectedOptionIndex === getOptionIndex(option)"
          @activated="activateOption"
        />
      </div>
    </c-modal>
  </div>
</template>

<style scoped lang="less">
.search-bar-trigger {
  border-radius: var(--radius-sm, 6px) !important;
}

.search-bar-mobile-trigger {
  width: 34px !important;
  height: 34px !important;
  padding: 0 !important;
  border-radius: var(--radius-sm, 6px) !important;
}

.c-input-text {
  font-size: 18px;

  ::v-deep(.input-wrapper) {
    padding: 4px;
    padding-left: 18px;
    border-radius: var(--radius-md, 12px) !important;
  }
}

::v-deep(.palette-modal) {
  max-height: 80vh;
  border-radius: var(--radius-lg, 16px) !important;
}

.c-modal--overlay {
  align-items: flex-start !important;
  padding-top: 80px;
}
</style>
