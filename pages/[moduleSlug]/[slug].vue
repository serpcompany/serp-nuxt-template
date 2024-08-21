<template>
    <UPage v-show="post" class="max-w-[1408px] mx-auto px-4">
        <template #left>
            <!-- <UContentToc v-if="post.body?.toc?.links?.length" :links="post.body.toc.links" /> -->
        </template>

        <h1>{{ post.title }}</h1>
        <UPageBody prose>
            <div v-html="post.content">

            </div>
        </UPageBody>

        <template #right>
            <UAside
                    class="sticky top-[--header-height] bg-background/75 backdrop-blur -mx-4 sm:-mx-6 px-4 sm:px-6 lg:px-4 lg:-mx-4 overflow-y-auto max-h-[calc(100vh-var(--header-height))]">
                <div class="border-b border-dashed border-gray-200 dark:border-gray-800 lg:border-0 space-y-3">
                    <h2 class="font-semibold text-sm/6 truncate mb-4"></h2>
                </div>
            </UAside>
        </template>
    </UPage>
</template>

<script setup lang="ts">

const route = useRoute();
const { moduleSlug, slug } = route.params;

const post = ref({});
const fetchPost = async () => {
    const response = await $fetch(`/api/post?module=${moduleSlug}&slug=${slug}`);
    if (!response) {
        throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true });
    }
    post.value = response;
};

onMounted(() => {
    fetchPost();
});

</script>