<template>
  <UPage v-show="post" class="mx-auto max-w-[1408px] px-4">
    <template #left>
      <!-- <UContentToc v-if="post.body?.toc?.links?.length" :links="post.body.toc.links" /> -->
    </template>

    <UPageBody prose class="mx-auto max-w-prose">
      <h1>{{ post.title }}</h1>
      <!-- eslint-disable-next-line vue/no-v-html -- no other option at the moment: post content is trusted and cannot be user-authored -->
      <div v-html="post.content" />
    </UPageBody>

    <template #right>
      <UAside
        class="bg-background/75 sticky top-[--header-height] -mx-4 max-h-[calc(100vh-var(--header-height))] overflow-y-auto px-4 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-4 lg:px-4"
      >
        <div
          class="space-y-3 border-b border-dashed border-gray-200 lg:border-0 dark:border-gray-800"
        >
          <h2 class="mb-4 truncate text-sm/6 font-semibold" />
        </div>
      </UAside>
    </template>
  </UPage>
</template>

<script setup lang="ts">
const route = useRoute();
const { moduleSlug, slug } = route.params;

const { data } = await useFetch('/api/post', {
  query: {
    module: moduleSlug,
    slug,
  },
});

if (!data.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true,
  });
}

const post = data.value; // post is not a ref, immutable

useHead({
  title: post.title,
});
</script>
