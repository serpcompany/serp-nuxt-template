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
        <div class="px-4 py-6 md:flex md:items-center md:justify-between">
            <span class="text-sm sm:text-center">© 2023 <a href="/">SERP</a>. All Rights Reserved.</span>
            <div class="flex mt-4 sm:justify-center md:mt-0 space-x-5 rtl:space-x-reverse">
                <a v-for="(social, socialIndex) in socialLinks" :key="socialIndex" :href="social.href" class="text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    <component :is="social.icon" class="w-4 h-4" />
                    <span class="sr-only">{{ social.label }}</span>
                </a>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { defineComponent, h } from 'vue';

const footerColumns = [
    {
        title: 'Company',
        links: [
            { label: 'About', to: '#' },
            { label: 'Careers', to: '#' },
            { label: 'Brand Center', to: '#' },
            { label: 'Blog', to: '#' },
        ]
    },
    {
        title: 'Help center',
        links: [
            { label: 'Discord Server', to: '#' },
            { label: 'Twitter', to: '#' },
            { label: 'Facebook', to: '#' },
            { label: 'Contact Us', to: '#' },
        ]
    },
    {
        title: 'Legal',
        links: [
            { label: 'Privacy Policy', to: '#' },
            { label: 'Licensing', to: '#' },
            { label: 'Terms & Conditions', to: '#' },
        ]
    },
    {
        title: 'Download',
        links: [
            { label: 'iOS', to: '#' },
            { label: 'Android', to: '#' },
            { label: 'Windows', to: '#' },
            { label: 'MacOS', to: '#' },
        ]
    }
];

const socialLinks = [
    {
        href: '#',
        label: 'Facebook page',
        icon: defineComponent({
            render: () => h('svg', {
                class: 'w-4 h-4',
                'aria-hidden': 'true',
                xmlns: 'http://www.w3.org/2000/svg',
                fill: 'currentColor',
                viewBox: '0 0 8 19'
            }, [
                h('path', {
                    'fill-rule': 'evenodd',
                    d: 'M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z',
                    'clip-rule': 'evenodd'
                })
            ])
        })
    },
];
</script>