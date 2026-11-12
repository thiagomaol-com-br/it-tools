import { type MaybeRef, get } from '@vueuse/core';
import { defineStore } from 'pinia';
import type { Ref } from 'vue';
import * as _ from 'es-toolkit/compat';
import type { Tool, ToolCategory, ToolWithCategory } from './tools.types';
import { tools as allTools } from './index';
import { useITStorage } from '@/composable/queryParams';

import { getCurrentLocale, translate as t } from '@/plugins/i18n.plugin';

export const useToolStore = defineStore('tools', () => {
  const favoriteToolsName = useITStorage('favoriteToolsName', []) as Ref<string[]>;

  const tools = computed<ToolWithCategory[]>(() => {
    getCurrentLocale();
    return allTools.map((tool) => {
      const toolI18nKey = tool.path.replace(/\//g, '');
      const category = tool.category || 'Development';

      return {
        ...tool,
        path: tool.path,
        name: t(`tools.${toolI18nKey}.title`, tool.name),
        description: t(`tools.${toolI18nKey}.description`, tool.description),
        category: t(`tools.categories.${category.toLowerCase()}`, category),
      };
    });
  });

  const toolsByCategory = computed<ToolCategory[]>(() => {
    const collator = new Intl.Collator(getCurrentLocale() || 'pt-BR', { sensitivity: 'base', numeric: true });

    const grouped = new Map<string, ToolWithCategory[]>();
    for (const tool of tools.value) {
      const list = grouped.get(tool.category) || [];
      list.push(tool);
      grouped.set(tool.category, list);
    }

    const sortedCategories = Array.from(grouped.keys()).sort((a, b) => collator.compare(a, b));

    return sortedCategories.map((name) => ({
      name,
      components: (grouped.get(name) || []).sort((a, b) => collator.compare(a.name, b.name)),
    }));
  });

  const favoriteTools = computed(() => {
    return favoriteToolsName.value
      .map((favoriteName) => tools.value.find(({ name, path }) => name === favoriteName || path === favoriteName))
      .filter(Boolean) as ToolWithCategory[]; // cast because .filter(Boolean) does not remove undefined from type
  });

  return {
    tools,
    favoriteTools,
    toolsByCategory,
    favoriteToolsName,
    newTools: computed(() => tools.value.filter(({ isNew }) => isNew)),

    addToolToFavorites({ tool }: { tool: MaybeRef<Tool> }) {
      const toolPath = get(tool).path;
      if (toolPath) {
        favoriteToolsName.value.push(toolPath);
      }
    },

    removeToolFromFavorites({ tool }: { tool: MaybeRef<Tool> }) {
      favoriteToolsName.value = favoriteToolsName.value.filter(
        (name) => get(tool).name !== name && get(tool).path !== name,
      );
      favoriteToolsName.value = favoriteToolsName.value.filter(
        (name) => get(tool).name !== name && get(tool).path !== name,
      );
    },

    isToolFavorite({ tool }: { tool: MaybeRef<Tool> }) {
      return favoriteToolsName.value.includes(get(tool).name) || favoriteToolsName.value.includes(get(tool).path);
    },

    updateFavoriteTools(newOrder: ToolWithCategory[]) {
      favoriteToolsName.value = newOrder.map((tool) => tool.path);
    },
  };
});
