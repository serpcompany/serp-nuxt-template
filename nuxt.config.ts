// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  site: {
    url: 'https://best.serp.co',
    name: 'SERP Best',
    desription: 'Site description',
    defaultLocale: 'en',
    trailingSlash: true,
    email: {
      contact: 'support@serp.ai',
      dmca: 'dmca@serp.ai',
      ipcomplaints: 'ipcomplaints@serp.ai',
    },
  },
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxt/eslint', '@nuxt/content', '@nuxtjs/seo'],
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
