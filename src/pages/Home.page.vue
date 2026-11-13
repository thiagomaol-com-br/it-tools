<script setup lang="ts">
import IconDragDrop from '~icons/tabler/drag-drop';
import IconHeart from '~icons/tabler/heart';
import { useHead } from '@vueuse/head';
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue';
import { useMessage } from 'naive-ui';
import { storeToRefs } from 'pinia';
import * as _ from 'es-toolkit/compat';
import Draggable from 'vuedraggable';
import ColoredCard from '../components/ColoredCard.vue';
import ToolCard from '../components/ToolCard.vue';
import HomeCustom from './Home.custom.vue';
import { useToolStore } from '@/tools/tools.store';
import { config } from '@/config';

const { t } = useI18n();

const toolStore = useToolStore();
const { favoriteToolsName } = storeToRefs(toolStore);
const orderedTools = computed(() => {
  const collator = new Intl.Collator('pt-BR', { sensitivity: 'base', numeric: true });
  return [...toolStore.tools].sort((a, b) => {
    const catDiff = collator.compare(a.category, b.category);
    if (catDiff !== 0) {
      return catDiff;
    }
    return collator.compare(a.name, b.name);
  });
});

const message = useMessage();
const importFavoritesJson = ref('');
function importFavorites() {
  try {
    favoriteToolsName.value = JSON.parse(importFavoritesJson.value);
    message.success(t('about.favorites-imported-successfully'));
  } catch (e: any) {
    message.error(t('about.error-importing-favorites-e', [e]));
  }
}
const favoritesJson = computed(() => JSON.stringify(favoriteToolsName.value));

const isFavoritesOpen = ref(false);
const isAllToolsOpen = ref(false);

function toggleCard(card: 'favorites' | 'allTools', event?: MouseEvent) {
  if (event && (event.target as HTMLElement).closest('.n-card__content')) {
    return;
  }
  if (card === 'favorites') {
    isFavoritesOpen.value = !isFavoritesOpen.value;
  } else if (card === 'allTools') {
    isAllToolsOpen.value = !isAllToolsOpen.value;
  }
}
const desc = t(
  'home.page.text.collection-of-handy-online-tools-for-developers-with-great-ux-it-tools-is-a-free-and-open-source-collection-of-handy-online-tools-for-developers-and-people-working-in-it',
);
const title = 'Thiago Maol. | Ferramentas';

useHead({
  title,
  meta: [
    {
      itemprop: 'name',
      content: title,
    } as never,
    {
      property: 'og:title',
      content: title,
    },
    {
      property: 'twitter:title',
      content: title,
    },
    {
      name: 'description',
      content: desc,
    },
    {
      itemprop: 'description',
      content: desc,
    } as never,
    {
      property: 'og:description',
      content: desc,
    },
    {
      property: 'twitter:description',
      content: desc,
    },
  ],
});

const favoriteTools = computed(() => toolStore.favoriteTools);
const isOrderingFavorites = ref(false);

window.addEventListener('contextmenu', (e) => {
  if (isOrderingFavorites.value) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    return false;
  }
});

function startOrderingFavorites() {
  isOrderingFavorites.value = true;
}

// Update favorite tools order when drag is finished
function stopOrderingFavorites() {
  isOrderingFavorites.value = false;
  toolStore.updateFavoriteTools(favoriteTools.value); // Update the store with the new order
}

// Batch loading logic for tool cards
const TOOLS_PER_ROW = 4; // Based on xl:grid-cols-4
const ROWS_PER_BATCH = 6;
const TOOLS_PER_BATCH = TOOLS_PER_ROW * ROWS_PER_BATCH; // 32 tools per batch

const visibleToolsCount = ref(TOOLS_PER_BATCH); // Start with first batch
let loadingObserver: IntersectionObserver | null = null;

// Computed property for visible tools
const visibleTools = computed(() => {
  return toolStore.tools.slice(0, visibleToolsCount.value);
});

// Function to load next batch
function loadNextBatch() {
  if (visibleToolsCount.value < toolStore.tools.length) {
    visibleToolsCount.value = Math.min(visibleToolsCount.value + TOOLS_PER_BATCH, toolStore.tools.length);
  }
}

// Start intersection observer on component mount
onMounted(() => {
  nextTick(() => {
    // Load first batch immediately
    loadNextBatch();

    // Setup intersection observer for lazy loading
    const loadingIndicator = document.querySelector('[data-loading-indicator]');
    if (loadingIndicator) {
      loadingObserver = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting && visibleToolsCount.value < toolStore.tools.length) {
            loadNextBatch();
          }
        },
        { rootMargin: '200px' },
      );
      loadingObserver.observe(loadingIndicator);
    }
  });
});

// Clean up on component unmount
onUnmounted(() => {
  if (loadingObserver) {
    loadingObserver.disconnect();
    loadingObserver = null;
  }
});
</script>

<template>
  <div class="home-content pt-50px">
    <div class="grid-wrapper">
      <div class="collapsible-boxes mb-25px flex flex-col gap-12px">
        <n-card
          class="collapsible-card"
          :content-style="isFavoritesOpen ? undefined : { display: 'none' }"
          @click="(e: MouseEvent) => toggleCard('favorites', e)"
        >
          <template #header>
            <span class="collapsible-title">Importar e Exportar Favoritos</span>
          </template>
          <template #header-extra>
            <c-button
              size="small"
              round
              variant="text"
              :aria-expanded="isFavoritesOpen"
            >
              <span mr-1 text-13px op-80>{{ isFavoritesOpen ? 'Recolher' : 'Expandir' }}</span>
              <icon-mdi-chevron-up v-if="isFavoritesOpen" text-18px />
              <icon-mdi-chevron-down v-else text-18px />
            </c-button>
          </template>

          <div class="grid grid-cols-1 gap-20px md:grid-cols-2">
            <div>
              <div mb-2 font-medium text-14px>
                Exportar Favoritos
              </div>
              <div mb-2 text-13px op-70>
                Copie o JSON abaixo com as suas ferramentas favoritas:
              </div>
              <textarea-copyable v-model:value="favoritesJson" />
            </div>

            <div>
              <div mb-2 font-medium text-14px>
                Importar Favoritos
              </div>
              <div mb-2 text-13px op-70>
                Cole aqui o array JSON de favoritos para importar:
              </div>
              <c-input-text
                v-model:value="importFavoritesJson"
                placeholder="[&quot;token-generator&quot;, ...]"
                multiline
                monospace
                mb-2
              />
              <c-button @click="importFavorites">
                Importar
              </c-button>
            </div>
          </div>
        </n-card>

        <n-card
          class="collapsible-card"
          :content-style="isAllToolsOpen ? undefined : { display: 'none' }"
          @click="(e: MouseEvent) => toggleCard('allTools', e)"
        >
          <template #header>
            <span class="collapsible-title">Todas as {{ toolStore.tools.length }} ferramentas em tabela</span>
          </template>
          <template #header-extra>
            <c-button
              size="small"
              round
              variant="text"
              :aria-expanded="isAllToolsOpen"
            >
              <span mr-1 text-13px op-80>{{ isAllToolsOpen ? 'Recolher' : 'Expandir' }}</span>
              <icon-mdi-chevron-up v-if="isAllToolsOpen" text-18px />
              <icon-mdi-chevron-down v-else text-18px />
            </c-button>
          </template>

          <n-table v-if="isAllToolsOpen">
            <thead>
              <tr>
                <th>
                  Categoria
                </th>
                <th>
                  Nome
                </th>
                <th>
                  Descrição
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(tool, ix) in orderedTools" :key="ix">
                <td>
                  {{ tool.category }}
                </td>
                <td>
                  <router-link :to="tool.path" class="decoration-none" target="_blank">
                    {{ tool.name }}
                  </router-link>
                </td>
                <td>
                  {{ tool.description }}
                </td>
              </tr>
            </tbody>
          </n-table>
        </n-card>
      </div>

      <div class="grid grid-cols-1 gap-12px lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4">
        <ColoredCard v-if="config.showBanner" :title="$t('home.follow.title')" :icon="IconHeart">
          {{ $t('home.follow.p1') }}
          <a
            href="https://github.com/sharevb/it-tools"
            rel="noopener"
            target="_blank"
            :aria-label="$t('home.follow.githubRepository')"
            >GitHub</a
          >
          {{ $t('home.follow.thankYou') }}
          <n-icon :component="IconHeart" />
        </ColoredCard>
      </div>

      <transition name="height">
        <div v-if="toolStore.favoriteTools.length > 0">
          <h3 class="mb-8px mt-30px text-20px font-semibold font-heading text-neutral-600 dark:text-neutral-300">
            {{ $t('home.categories.favoriteTools') }}
            <c-tooltip :tooltip="$t('home.categories.favoritesDndToolTip')">
              <n-icon :component="IconDragDrop" size="18" />
            </c-tooltip>
          </h3>
          <Draggable
            :list="favoriteTools"
            class="grid grid-cols-1 gap-12px lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4"
            ghost-class="ghost-favorites-draggable"
            item-key="name"
            :delay="100"
            @start="startOrderingFavorites"
            @end="stopOrderingFavorites"
          >
            <template #item="{ element: tool }">
              <ToolCard :tool="tool" />
            </template>
          </Draggable>
        </div>
      </transition>

      <div v-if="toolStore.newTools.length > 0">
        <h3 class="mb-8px mt-30px text-20px font-semibold font-heading text-neutral-600 dark:text-neutral-300">
          {{ t('home.categories.newestTools') }}
        </h3>
        <div class="grid grid-cols-1 gap-12px lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4">
          <ToolCard v-for="tool in toolStore.newTools" :key="tool.name" :tool="tool" />
        </div>
      </div>

      <Suspense>
        <HomeCustom />
      </Suspense>

      <h3 class="mb-8px mt-30px text-20px font-semibold font-heading text-neutral-600 dark:text-neutral-300">
        {{ $t('home.categories.allTools') }}
      </h3>
      <div class="grid grid-cols-1 gap-12px lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4">
        <ToolCard v-for="tool in visibleTools" :key="tool.name" :tool="tool" />
      </div>

      <!-- Loading indicator when more tools are coming -->
      <div v-if="visibleToolsCount < toolStore.tools.length" data-loading-indicator mt-6 text-center>
        <div text-14px op-70>
          {{ t('home.loading-more-tools') }} <span>({{ visibleTools.length }}/{{ toolStore.tools.length }})</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.collapsible-card {
  transition: box-shadow 0.2s ease, border-color 0.2s ease;

  :deep(.n-card-header) {
    cursor: pointer;
    user-select: none;
    padding-top: 14px;
    padding-bottom: 14px;
    transition: background-color 0.15s ease;

    &:hover {
      background-color: rgba(255, 255, 255, 0.03);
    }
  }

  .collapsible-title {
    font-weight: 600;
  }
}

// The 50px top spacing is a desktop nicety; on mobile it pushes the content
// too far below the top bar.
.home-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px 16px 80px;

  @media (max-width: 700px) {
    padding: 0 4px 60px;
  }
}

.height-enter-active,
.height-leave-active {
  transition: all 0.5s ease-in-out;
  overflow: hidden;
  max-height: 500px;
}

.height-enter-from,
.height-leave-to {
  max-height: 42px;
  overflow: hidden;
  opacity: 0;
  margin-bottom: 0;
}

.ghost-favorites-draggable {
  opacity: 0.4;
  background-color: #ccc;
  border: 2px dashed #666;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  transform: scale(1.1);
  animation: ghost-favorites-draggable-animation 0.2s ease-out;
}

@keyframes ghost-favorites-draggable-animation {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: 0.4;
    transform: scale(1);
  }
}
</style>
