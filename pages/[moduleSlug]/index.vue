<!-- pages/[module]/index.vue -->
<template>
    <div class="max-w-3xl mx-auto">
        <NuxtLink :to="`/${module.slug}`">
            <h2 class="text-xl ">{{ module.name }}</h2>
        </NuxtLink>
        <PostList :slugPrefix="module.slug" :posts="module.posts" />
    </div>
</template>
<script setup>
const module = ref({});
const route = useRoute();
const { moduleSlug } = route.params;

const fetchModule = async () => {
    const response = await $fetch(`/api/posts?module=${moduleSlug}`);
    console.log(response);
    if (!response || response.length === 0) {
        throw createError({ statusCode: 404,statusMessage: 'Page not found',fatal: true });
    };
    module.value = response[0];
};

onMounted(() => {
    fetchModule();
});
</script>
