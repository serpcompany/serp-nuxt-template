<template>
    <footer>
        <div class="mx-auto w-full max-w-7xl">
            <div class="grid grid-cols-1 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
                <div v-for="(column, index) in footerColumns" :key="index">
                    <h2 class="mb-6 text-sm font-semibold uppercase">{{ column.title }}</h2>
                    <ul>
                        <li v-for="(link, linkIndex) in column.links" :key="linkIndex" class="mb-4">
                            <NuxtLink :to="link.to" class="hover:underline">{{ link.label }}</NuxtLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div>
            <UDropdown :items="copyrightLinks" :popper="{ placement: 'top' }"
                       :ui="{ item: { disabled: 'cursor-text select-text' }, background: 'bg-white dark:bg-gray-800' }">
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
import { defineComponent, h } from 'vue';

const footerColumns = [
    {
        title: 'Links',
        links: [
            { label: 'About', to: '#' },
            { label: 'Careers', to: '#' },
            { label: 'Brand Center', to: '#' },
            { label: 'Blog', to: '#' },
        ]
    },
    {
        title: 'Links',
        links: [
            { label: 'Discord Server', to: '#' },
            { label: 'Twitter', to: '#' },
            { label: 'Facebook', to: '#' },
            { label: 'Contact Us', to: '#' },
        ]
    },
    {
        title: 'Links',
        links: [
            { label: 'Privacy Policy', to: '#' },
            { label: 'Licensing', to: '#' },
            { label: 'Terms & Conditions', to: '#' },
        ]
    },
    {
        title: 'Boring Stuff',
        links: [
            { label: 'Legal', to: '/legal' },
            { label: 'Terms', to: '/legal/terms' },
            { label: 'Privacy', to: '/legal/privacy' },
            { label: 'Affiliate Disclosure', to: '/legal/affiliate-disclosure' },
            { label: 'DMCA', to: '/legal/dmca' },
        ]
    }
];

const copyrightLinks = [
    [
        {
            label: 'SERP BRANDS',
            disabled: true
        }
    ],
    [
        {
            label: 'SERP',
            to: 'https://serp.co/'
        }
    ],
    [
        {
            label: 'SERP AI',
            to: 'https://serp.ai'
        }
    ],
    [
        {
            label: 'SERP FM',
            to: 'https://serp.fm/'
        }
    ],
    [
        {
            label: 'SERP App',
            to: 'https://serp.app/'
        }
    ],
    [
        {
            label: 'SERP Games',
            to: 'https://serp.games/'
        }
    ],
    [
        {
            label: 'SERP Wiki',
            to: 'https://serp.wiki/'
        }
    ],
    [
        {
            label: 'SERP Dev',
            to: 'https://serp.dev/'
        }
    ],
    [
        {
            label: 'SERP Style',
            to: 'https://serp.style/'
        }
    ],
    [
        {
            label: 'SERP Site',
            to: 'https://serp.site/'
        }
    ],
    [
        {
            label: 'SERP Media',
            to: 'https://serp.media/'
        }
    ],
    [
        {
            label: 'SERP University',
            to: 'https://serpuniversity.com/'
        }
    ],
    [
        {
            label: 'PARTNER BRANDS',
            disabled: true
        }
    ],
    [
        {
            label: 'DAFT FM',
            to: 'https://daft.fm/'
        }
    ],
    [
        {
            label: 'Boxing Undefeated',
            to: 'https://boxingundefeated.com/'
        }
    ],
    [
        {
            label: 'Devin Schumacher',
            to: 'https://devinschumacher.com/'
        }
    ],
    [
        {
            label: 'University of Guns',
            to: 'https://universityofguns.com/'
        }
    ],
    [
        {
            label: 'Merchant Alternatives',
            to: 'https://merchantalternatives.com/'
        }
    ]
]


</script>