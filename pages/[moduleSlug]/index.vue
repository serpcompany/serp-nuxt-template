<!-- pages/[module]/index.vue -->
<template>
  <div class="container mx-auto">
    <h1 class="mb-8 text-xl">
      <NuxtLink :to="`/${module.slug}`">
        {{ module.name }}
      </NuxtLink>
    </h1>
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
