<template>
  <NuxtLayout name="breadcrumbs">
    <div class="container mx-auto">
      <h1 class="mb-8 text-center text-2xl font-bold">{{ site.name }}</h1>
      <PostList :posts="posts" />
    </div>
  </NuxtLayout>
</template>

<script setup>
const { data } = await useFetch('/api/pages');

if (!data.value) {
  throw createError({
    statusCode: 500,
    statusMessage: 'Error loading page',
    fatal: true,
  });
}

const site = useSiteConfig();
const posts = data.value;

definePageMeta({
  breadcrumb: {
    icon: 'heroicons-solid:home',
    label: 'Home',
    ariaLabel: 'Home',
  },
});
</script>
