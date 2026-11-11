<script setup lang="ts">
import { useHead } from '@vueuse/head';

const { t } = useI18n();

const desc = t(
  'about.text.collection-of-handy-online-tools-for-developers-with-great-ux-it-tools-is-a-free-and-open-source-collection-of-handy-online-tools-for-developers-and-people-working-in-it',
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
</script>

<template>
  <c-markdown :markdown="$t('about.content-fork')" mx-auto mt-50px />
</template>
