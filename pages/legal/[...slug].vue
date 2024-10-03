<template>
  <div class="mx-auto max-w-3xl">
    <UPageBody prose>
      <ContentRenderer :value="post" :data="{ site }" />
    </UPageBody>
  </div>
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

useContentHead(post);
</script>
