<!-- components/post/list.vue -->
<template>
  <ul class="space-y-4">
    <li
      v-for="post in posts"
      :key="post.id"
      class="flex items-baseline justify-between border-b border-gray-200 py-4"
    >
      <NuxtLink
        :to="getPostUrl(post.slug)"
        class="mr-4 flex-grow text-lg hover:underline"
      >
        {{ post.title }}
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
const props = defineProps<{
  posts: PostPreview[];
  slugPrefix?: string;
}>();

const getPostUrl = (slug: string) => {
  const prefixed = props.slugPrefix ? `${props.slugPrefix}/${slug}` : slug;
  return `/${prefixed}/`.replace(/\/+/g, '/');
};
</script>
