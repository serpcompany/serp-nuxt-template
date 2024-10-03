<template>
  <div class="container mx-auto">
    <h1 class="text-center text-2xl font-bold">{{ site.name }}</h1>
    <div v-for="module in modules" :key="module.id" class="mt-8">
      <h2 class="mb-8 text-xl">
        <NuxtLink :to="`/${module.slug}`">
          {{ module.name }}
        </NuxtLink>
      </h2>
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

const site = useSiteConfig();
const modules = data.value;
</script>
