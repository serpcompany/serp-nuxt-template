<template>
  <NuxtLayout name="breadcrumbs">
    <template #breadcrumbs>
      <SiteBreadcrumbs :links="breadcrumbs" />
    </template>
    <UPage v-show="post" class="container mx-auto">
      <template #left>
        <!-- <UContentToc v-if="post.body?.toc?.links?.length" :links="post.body.toc.links" /> -->
      </template>

      <UPageBody prose>
        <h1 v-if="post.title">{{ post.title }}</h1>
        <ContentRenderer :value="post" />
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
  </NuxtLayout>
</template>

<script setup lang="ts">
const route = useRoute();
const slug = normalizeSlug(route.params.slug);

const { data } = await useAsyncData(slug, () =>
  queryContent('_pages')
    .where({
      slug: { $regex: new RegExp(`^/?${slug}/?$`, 'i') },
      created_at: { $exists: true },
    })
    .findOne(),
);

const post = data.value; // post is not a ref, immutable

if (!post) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true,
  });
}
const breadcrumbs = post.breadcrumbs
  ? useBreadcrumbItems({ overrides: post.breadcrumbs })
  : undefined;

useContentHead(post);
</script>
