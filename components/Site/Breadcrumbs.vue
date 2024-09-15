<template>
  <div class="mx-auto max-w-3xl">
    <UBreadcrumb :links="links" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

const links = computed(() => {
  const path = route.path;
  const params = path.startsWith('/') ? path.substring(1).split('/') : [];
  const breadcrumbs = [];

  if (route.path !== '/') {
    breadcrumbs.push({
      label: 'Home',
      to: '/',
    });

    let path = '';
    for (let i = 0; i < params.length; i++) {
      const param = params[i];
      if (!param) {
        continue;
      }
      path += `/${param}`;

      if (i === params.length - 1) {
        breadcrumbs.push({
          label: param,
        });
      } else {
        breadcrumbs.push({
          label: param,
          to: path,
        });
      }
    }
  }

  return breadcrumbs;
});
</script>
