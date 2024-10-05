<template>
  <NuxtLayout name="breadcrumbs">
    <!-- <template #breadcrumbs> -->
    <!--   <SiteBreadcrumbs :links="breadcrumbs" /> -->
    <!-- </template> -->
    <UPage v-show="post" class="mx-auto max-w-[1408px] px-4">
      <UPageBody prose class="mx-auto max-w-prose">
        <h1>{{ post.title }}</h1>
        <!-- eslint-disable-next-line vue/no-v-html -- no other option at the moment: post content is trusted and cannot be user-authored -->
        <div v-html="post.content" />
      </UPageBody>
    </UPage>
  </NuxtLayout>
</template>

<script setup lang="ts">
const route = useRoute();

const { data } = await useFetch('/api/page', {
  query: {
    slug: normalizeSlug(route.params.slug),
  },
});

const post = data.value; // post is not a ref, immutable

if (!post) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true,
  });
}

const seo = {
  title: post.seoTitle || post.title,
  description: post.seoDescription || post.description,
  image: post.seoImage || post.image,
};

useHead({
  title: post.seoTitle || post.title,
  meta: [
    {
      property: 'og:title',
      content: seo.title,
    },
    {
      name: 'description',
      content: seo.description,
    },
    {
      property: 'og:description',
      content: seo.description,
    },
  ],
});

const site = useSiteConfig();

if (seo.image) {
  defineOgImage({
    url: seo.image,
  });
} else {
  defineOgImageComponent('Nuxt', {
    headline: site.name,
    title: seo.title,
    description: seo.description,
  });
}

// const breadcrumbs = post.breadcrumbs
//   ? useBreadcrumbItems({ overrides: post.breadcrumbs })
//   : undefined;
</script>
