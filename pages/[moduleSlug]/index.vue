<!-- pages/[module]/index.vue -->
<template>
  <div class="mx-auto max-w-3xl">
    <NuxtLink :to="`/${module.slug}`">
      <h2 class="text-xl">{{ module.name }}</h2>
    </NuxtLink>
    <PostList :slug-prefix="module.slug" :posts="module.posts" />
  </div>
</template>

<script setup>
const route = useRoute();
const { moduleSlug } = route.params;

const { data } = await useFetch('/api/posts', {
  query: { module: moduleSlug },
});

const module = data.value[0];

if (!module) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true,
  });
}

useHead({
  title: module.name,
});
</script>
