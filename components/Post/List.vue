<!-- components/post/list.vue -->
<template>
  <ul class="divide-y divide-gray-200 border-y border-gray-200">
    <li v-for="post in posts" :key="post.id" class="py-4">
      <NuxtLink :to="getPostUrl(post.slug)" class="text-lg hover:underline">
        {{ post.title }}
      </NuxtLink>
      <p v-if="post.description" class="mt-2">
        {{ post.description }}
      </p>
    </li>
  </ul>
</template>

<script setup lang="ts">
const props = defineProps<{
  posts: PagePreview[];
  slugPrefix?: string;
}>();

const getPostUrl = (slug: string) => {
  const prefixed = props.slugPrefix ? `${props.slugPrefix}/${slug}` : slug;
  return `/${prefixed}/`.replace(/\/+/g, '/');
};
</script>
