<template>
  <NuxtLayout name="breadcrumbs">
    <div class="container mx-auto">
      <h1 class="text-center text-2xl font-bold">{{ site.name }}</h1>
      <div v-for="module in modules" :key="module.id" class="mt-8">
        <h2 class="mb-8 text-xl font-bold">
          <NuxtLink :to="`/${module.slug}`">
            {{ module.name }}
          </NuxtLink>
        </h2>
        <PostList :slug-prefix="module.slug" :posts="module.posts" />
      </div>
      <div v-if="posts.length > 0" class="mt-8">
        <h2 class="mb-8 text-xl font-bold">Posts</h2>
        <PostList :posts="posts" />
      </div>
    </div>
  </NuxtLayout>
</template>
<script setup>
const [db, content] = await Promise.all([
  useFetch('/api/posts'),
  await useAsyncData('content', () =>
    queryContent('_pages')
      .where({ slug: { $exists: true }, created_at: { $exists: true } })
      .sort({ created_at: -1, $numeric: true })
      .find(),
  ),
]);

if (!db.data.value) {
  throw createError({
    statusCode: 500,
    statusMessage: 'Error loading page',
    fatal: true,
  });
}

const site = useSiteConfig();
const modules = db.data.value;
const posts = content.data.value?.map(getPostPreviewFromContent) || [];

definePageMeta({
  breadcrumb: {
    icon: 'heroicons-solid:home',
    label: 'Home',
    ariaLabel: 'Home',
  },
});
</script>
