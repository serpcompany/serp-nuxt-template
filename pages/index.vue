<template>
    <div class="mx-auto max-w-3xl" v-for="module in modules" :key="module.id">
        <NuxtLink :to="`/${module.slug}`">
            <h2 class="text-xl">{{ module.name }}</h2>
        </NuxtLink>
        <PostList :slugPrefix="module.slug" :posts="module.posts" />
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const modules = ref([]);

const fetchModules = async () => {
    const response = await $fetch('/api/posts');
    modules.value = response;
};

onMounted(() => {
    fetchModules();
});
</script>
