<script setup lang="ts">
import { useHead } from '@vueuse/head';
import homeContentPt from './home-content.pt.md?raw';
import homeContentEs from './home-content.es.md?raw';
import homeContentEn from './home-content.en.md?raw';

const { locale } = useI18n();

const title = 'Thiago Maol. | Ferramentas';
const descPt =
  'Central de ferramentas online de Thiago Maol. Utilitários essenciais e seguros para desenvolvedores e empresas.';
const descEs =
  'Central de herramientas online de Thiago Maol. Utilidades esenciales y seguras para desarrolladores y empresas.';
const descEn =
  'Online tools hub by Thiago Maol. Essential and secure utilities for developers and businesses.';

const activeContent = computed(() => {
  if (locale.value === 'pt') {
    return homeContentPt;
  }
  if (locale.value === 'es') {
    return homeContentEs;
  }
  return homeContentEn;
});

const activeDesc = computed(() => {
  if (locale.value === 'pt') {
    return descPt;
  }
  if (locale.value === 'es') {
    return descEs;
  }
  return descEn;
});

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
      content: activeDesc,
    },
    {
      itemprop: 'description',
      content: activeDesc,
    } as never,
    {
      property: 'og:description',
      content: activeDesc,
    },
    {
      property: 'twitter:description',
      content: activeDesc,
    },
  ],
});
</script>

<template>
  <div class="about-page">
    <c-markdown :markdown="activeContent" />
  </div>
</template>

<style scoped lang="less">
.about-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 4rem 16px 3rem;

  @media (max-width: 700px) {
    padding: 2rem 16px 2rem;
  }

  :deep(.accent-text) {
    color: #f97415;
    font-weight: 800;
  }

  :deep(h1) {
    font-family: var(--font-heading), "Space Grotesk", sans-serif;
    font-size: clamp(2.5rem, 5.5vw, 4.25rem);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.02em;
    margin-bottom: 1.5rem;
  }

  :deep(h2) {
    font-family: var(--font-heading), "Space Grotesk", sans-serif;
    font-size: clamp(1.75rem, 3.5vw, 2.5rem);
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.01em;
    margin-top: 2.5rem;
    margin-bottom: 1rem;
  }

  :deep(p),
  :deep(li) {
    font-size: 1rem;
    line-height: 1.6;
  }

  :deep(.icon-list) {
    list-style: none;
    padding-left: 0;
    margin: 1.25rem 0;
    display: flex;
    flex-direction: column;
    gap: 0.95rem;
  }

  :deep(.icon-list-item) {
    display: flex;
    align-items: flex-start;
    gap: 0.85rem;
  }

  :deep(.icon-badge) {
    flex-shrink: 0;
    width: 24px;
    height: 24px;
    border-radius: 6px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-top: 0.15rem;
    box-sizing: border-box;
  }

  :deep(.icon-badge--danger) {
    background: rgba(239, 68, 68, 0.12);
    border: 1px solid rgba(239, 68, 68, 0.35);
    color: #ef4444;
  }

  :deep(.icon-badge--success) {
    background: rgba(16, 185, 129, 0.12);
    border: 1px solid rgba(16, 185, 129, 0.35);
    color: #10b981;
  }

  :deep(.icon-badge--step) {
    background: rgba(249, 116, 21, 0.12);
    border: 1px solid rgba(249, 116, 21, 0.4);
    color: #f97415;
    font-family: var(--font-mono), monospace;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.05em;
  }

  :deep(.icon-list-content) {
    flex: 1;
    line-height: 1.6;
  }

  :deep(kbd) {
    background: rgba(125, 125, 125, 0.12);
    border: 1px solid rgba(125, 125, 125, 0.25);
    border-radius: 4px;
    padding: 2px 7px;
    font-size: 0.85em;
    font-family: inherit;
    font-weight: 600;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08);
  }

  :deep(blockquote) {
    background: rgba(249, 116, 21, 0.06);
    border-left: 3px solid #f97415;
    padding: 12px 16px;
    border-radius: 0 6px 6px 0;
    margin: 1.5rem 0;
  }
}
</style>
