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
  <c-markdown :markdown="activeContent" mx-auto mt-50px />
</template>
