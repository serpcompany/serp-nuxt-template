<template>
  <div class="page-container max-x-screen">
    <SiteHeader />
    <div class="container mx-auto mb-4 mt-8">
      <SiteBreadcrumbs />
    </div>
    <slot />
    <SiteFooter class="mx-auto mt-auto pb-8 pt-16 xl:grid-cols-3" />
  </div>
</template>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
