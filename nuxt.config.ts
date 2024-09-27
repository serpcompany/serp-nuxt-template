// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/eslint', '@nuxtjs/seo'],
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
