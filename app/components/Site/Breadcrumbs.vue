<template>
  <UBreadcrumb :links="links" />
</template>

<script setup lang="ts">
type BreadcrumbItemProps = ReturnType<typeof useBreadcrumbItems>['value'];

const props = defineProps<{
  links?: BreadcrumbItemProps;
}>();

const links = props.links || useBreadcrumbItems();
</script>
