<template>
  <NuxtLayout name="breadcrumbs">
    <div class="container mx-auto">
      <UPageBody prose class="mx-auto max-w-prose">
        <h1 v-if="post.title">{{ post.title }}</h1>
        <div v-if="lastUpdated">
          <span class="italic">Last updated:</span>&nbsp;
          <time :datetime="lastUpdated.toISOString()">{{
            lastUpdatedFormat.format(lastUpdated)
          }}</time>
        </div>
        <ContentRenderer :value="post" :data="{ site }" />
      </UPageBody>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const route = useRoute();
const slug = normalizeSlug(route.params.slug);

const { data } = await useAsyncData(slug, () =>
  queryContent('legal')
    .where({
      $or: [
        {
          _path: slug ? `/legal/${slug}` : '/legal',
          slug: undefined,
        },
        {
          slug: { $regex: new RegExp(`^/?${slug}/?$`, 'i') },
        },
      ],
    })
    .findOne(),
);

if (!data.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true,
  });
}

const post = data.value; // post is not a ref, immutable
const site = useSiteConfig();

// compute some template variables
site.hostname = new URL(site.url).hostname;
site.emailMasked = Object.entries(site.email).reduce(
  (masked, [label, email]) =>
    typeof email === 'string'
      ? { ...masked, [label]: maskEmail(email) }
      : masked,
  {},
);

const lastUpdated = post.last_updated ? new Date(post.last_updated) : undefined;

const lastUpdatedFormat: Intl.DateTimeFormat = new Intl.DateTimeFormat('en', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
});

useContentHead(post);
</script>
