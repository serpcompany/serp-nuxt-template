<template>
  <div class="page-container max-x-screen">
    <SiteHeader />
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
