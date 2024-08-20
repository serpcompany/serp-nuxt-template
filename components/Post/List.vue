<template>
    <div class="max-w-3xl mx-auto px-4 py-8 font-sans">
        <ul class="space-y-4">
            <li v-for="post in posts" :key="post.id" class="flex justify-between items-baseline py-4 border-b border-gray-200">
                <a :href="post.link" class="hover:underline text-lg mr-4 flex-grow">{{ post.title }}</a>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    posts: {
        type: Array as PropType<{ id: number; title: string; date: string; link: string; }[]>,
        required: true,
    },
});
</script>