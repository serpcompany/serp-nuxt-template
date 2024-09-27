// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  site: {
    // url: 'https://test.com',
    name: 'SERP Best',
    desription: 'Site description',
    defaultLocale: 'en',
    trailingSlash: true,
  },
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/eslint', '@nuxtjs/seo'],
  compatibilityDate: '2024-08-20',
  extends: ['@nuxt/ui-pro'],
  experimental: {
    defaults: {
      nuxtLink: {
        trailingSlash: 'append',
      },
    },
  },
});
