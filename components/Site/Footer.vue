<template>
  <footer>
    <div class="mx-auto w-full max-w-7xl">
      <div class="grid grid-cols-1 gap-8 px-4 py-6 md:grid-cols-4 lg:py-8">
        <div v-for="(column, index) in footerColumns" :key="index">
          <h2 class="mb-6 text-sm font-semibold uppercase">
            {{ column.title }}
          </h2>
          <ul>
            <li
              v-for="(link, linkIndex) in column.links"
              :key="linkIndex"
              class="mb-4"
            >
              <NuxtLink :to="link.to" class="hover:underline">{{
                link.label
              }}</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div>
      <UDropdown
        :items="copyrightLinks"
        :popper="{ placement: 'top' }"
        :ui="{
          item: { disabled: 'cursor-text select-text' },
          background: 'bg-white dark:bg-gray-800',
        }"
      >
        © SERP

        <template #item="{ item }">
          <span v-if="!item.to" class="text-primary">{{ item.label }}</span>
          <NuxtLink v-else :to="item.to" aria-label="Footer link" external>
            {{ item.label }}
          </NuxtLink>
        </template>
      </UDropdown>
    </div>
  </footer>
</template>

<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content';

interface Link {
  label: string;
  to: string;
}

function toLink({ title, _path }: ParsedContent): Link | null {
  if (!title || !_path) return null;
  return {
    label: title,
    to: _path,
  };
}

const { data: legalPages } = await useAsyncData('legal', () =>
  queryContent('legal').find(),
);

const legalLinks = legalPages.value?.map(toLink).filter(isNonNullable) || [];

const footerColumns = [
  {
    title: 'Core',
    links: [
      { label: 'About', to: '#' },
      { label: 'Contact', to: '#' },
      { label: 'Sitemap', to: '#' },
      { label: 'Archive', to: '#' },
    ],
  },
  {
    title: 'Modules',
    links: [
      { label: 'About', to: '#' },
      { label: 'Contact', to: '#' },
      { label: 'Shop', to: '#' },
      { label: 'Movies', to: '#' },
      { label: 'Books', to: '#' },
      { label: 'Courses', to: '#' },
    ],
  },
  {
    title: 'Categories',
    links: [
      { label: 'Category A', to: '#' },
      { label: 'Category B', to: '#' },
      { label: 'Category C', to: '#' },
      { label: 'Category D', to: '#' },
      { label: 'Category E', to: '#' },
      { label: 'Category F', to: '#' },
      { label: 'Category G', to: '#' },
    ],
  },
  {
    title: 'Boring Stuff',
    links: legalLinks,
  },
];

const copyrightLinks = [
  [
    {
      label: 'SERP BRANDS',
      disabled: true,
    },
  ],
  [
    {
      label: 'SERP',
      to: 'https://serp.co',
    },
  ],
  [
    {
      label: 'SERP AI',
      to: 'https://serp.ai',
    },
  ],
  [
    {
      label: 'SERP App',
      to: 'https://serp.app',
    },
  ],
  [
    {
      label: 'SERP Games',
      to: 'https://serp.games',
    },
  ],
  [
    {
      label: 'SERP Wiki',
      to: 'https://serp.wiki',
    },
  ],
  [
    {
      label: 'SERP Style',
      to: 'https://serp.style',
    },
  ],
  [
    {
      label: 'SERP Media',
      to: 'https://serp.media',
    },
  ],
  [
    {
      label: 'SERP University',
      to: 'https://serpuniversity.com',
    },
  ],
  [
    {
      label: 'SERP Best',
      to: 'https://best.serp.co',
    },
  ],
  [
    {
      label: 'PARTNER BRANDS',
      disabled: true,
    },
  ],
  [
    {
      label: 'DAFT FM',
      to: 'https://daft.fm',
    },
  ],
  [
    {
      label: 'Boxing Undefeated',
      to: 'https://boxingundefeated.com',
    },
  ],
  [
    {
      label: 'Devin Schumacher',
      to: 'https://devinschumacher.com',
    },
  ],
  [
    {
      label: 'University of Guns',
      to: 'https://universityofguns.com',
    },
  ],
  [
    {
      label: 'Merchant Alternatives',
      to: 'https://merchantalternatives.com',
    },
  ],
];
</script>
