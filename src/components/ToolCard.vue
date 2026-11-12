<script setup lang="ts">
import World from '~icons/tabler/world';
import { useThemeVars } from 'naive-ui';
import FavoriteButton from './FavoriteButton.vue';
import type { Tool } from '@/tools/tools.types';

const props = defineProps<{ tool: Tool & { category: string } }>();
const { tool } = toRefs(props);
const theme = useThemeVars();
</script>

<template>
  <router-link :to="tool.path" class="it-tool-link decoration-none">
    <c-card class="tool-card-surface h-full !border-1.5px !border-op-60 !hover:border-primary">
      <div flex items-center justify-between>
        <n-icon class="text-neutral-400 dark:text-neutral-600" size="40" :component="tool.icon" />

        <div flex items-center gap-8px>
          <div
            v-if="tool.isNew"
            class="rounded-full px-8px py-3px text-xs text-white dark:text-neutral-800"
            :style="{
              'background-color': theme.primaryColor,
            }"
          >
            {{ $t('toolCard.new') }}
          </div>

          <FavoriteButton :tool="tool" />
        </div>
      </div>

      <div class="truncat my-5px text-20px font-semibold text-black dark:text-white">
        {{ tool.name }}
        <World v-if="tool.externAccessDescription" class="tool-privacy-icon" />
      </div>

      <div class="line-clamp-2 text-14px text-neutral-500 dark:text-neutral-400">
        {{ tool.description }}
      </div>
    </c-card>
  </router-link>
</template>

<style lang="less" scoped>
.tool-card-surface {
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;

  &:hover {
    box-shadow: var(--color-amber-shadow, 0 12px 40px 0 hsla(38, 92%, 50%, 0.25)) !important;
    transform: translateY(-2px);
  }
}

.tool-privacy-icon {
  display: inline-block;
  height: 0.9em;
}
</style>
