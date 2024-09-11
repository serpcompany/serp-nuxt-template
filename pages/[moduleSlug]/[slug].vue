<template>
    <UPage v-show="post" class="mx-auto max-w-[1408px] px-4">
        <template #left>
            <!-- <UContentToc v-if="post.body?.toc?.links?.length" :links="post.body.toc.links" /> -->
        </template>

        <h1>{{ post.title }}</h1>
        <UPageBody prose>
            <div v-html="post.content"></div>
        </UPageBody>

        <template #right>
            <UAside
                class="bg-background/75 sticky top-[--header-height] -mx-4 max-h-[calc(100vh-var(--header-height))] overflow-y-auto px-4 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-4 lg:px-4"
            >
                <div
                    class="space-y-3 border-b border-dashed border-gray-200 lg:border-0 dark:border-gray-800"
                >
                    <h2 class="mb-4 truncate text-sm/6 font-semibold"></h2>
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
    const response = await $fetch(
        `/api/post?module=${moduleSlug}&slug=${slug}`,
    );
    if (!response) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Page not found',
            fatal: true,
        });
    }
    post.value = response;
};

onMounted(() => {
    fetchPost();
});
</script>
