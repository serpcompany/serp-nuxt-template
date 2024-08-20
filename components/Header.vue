<script setup lang="ts">

const router = useRouter();

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

            }
        ]
    }
];

</script>

<template>
    <UHeader :links="links">
        <template #logo>
            <Logo class="w-auto h-6" />
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