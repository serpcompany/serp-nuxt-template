<template>
  <div class="mx-auto max-w-3xl">
    <div v-for="module in modules" :key="module.id">
      <NuxtLink :to="`/${module.slug}`">
        <h2 class="text-xl">{{ module.name }}</h2>
      </NuxtLink>
      <PostList :slug-prefix="module.slug" :posts="module.posts" />
    </div>
  </div>
</template>
<script setup>
const { data } = await useFetch('/api/posts');

if (!data.value) {
  throw createError({
    statusCode: 500,
    statusMessage: 'Error loading page',
    fatal: true,
  });
}

const modules = data.value;
</script>
