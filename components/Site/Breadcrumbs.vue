<template>
  <UBreadcrumb :links="links" />
</template>

<script setup lang="ts">
const links = useBreadcrumbItems();
</script>
