const devModules =
    process.env.NODE_ENV === 'production' ? [] : ['@nuxt/eslint'];

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ['@nuxt/ui', ...devModules],
    compatibilityDate: '2024-08-20',
    runtimeConfig: {
        siteName: 'SERP Best',
    },
    extends: ['@nuxt/ui-pro'],
    experimental: {
        defaults: {
            nuxtLink: {
                trailingSlash: 'append',
            },
        },
    },
});
