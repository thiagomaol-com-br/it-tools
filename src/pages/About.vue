<script setup lang="ts">
import { useHead } from '@vueuse/head';
import homeContent from './home-content.md?raw';

const title = 'Thiago Maol. | Ferramentas';
const desc =
  'Central de ferramentas online de Thiago Maol. Utilitários essenciais e seguros para desenvolvedores e empresas.';

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
</script>

<template>
  <c-markdown :markdown="homeContent" mx-auto mt-50px />
</template>
