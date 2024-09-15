<template>
  <UHeader :links="links">
    <template #logo>
      <SiteLogo class="h-6 w-auto" />
      <span class="sr-only">SERP Best</span>
    </template>

    <template #right>
      <UColorModeButton />
    </template>

    <template #panel>
      <UNavigationTree :links="links" />
    </template>
  </UHeader>
</template>

<script setup lang="ts">
const links = [
  {
    label: 'Home',
    to: '/',
  },
  {
    label: 'Links',
    to: '/shop',
  },
  {
    label: 'More links',
    children: [
      {
        label: 'Nuxters',
        to: '',
      },
      {
        label: 'Video Courses',
        to: '',
      },
    ],
  },
];
</script>
