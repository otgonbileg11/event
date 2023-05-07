// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    apiSecret: process.env.FIREBASE_API_KEY,
    public: {
      apiBase: process.env.FIREBASE_API_KEY
    }
  },
  app: {
    head: {
      titleTemplate: 'Event Management Platform - イベントハッケン', // Modify the default title
      meta: [
        // Basic meta tags
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Event Management Platform - Create and Discover Events' },
  
        // Open Graph (OG) tags
        { hid: 'og:title', property: 'og:title', content: 'Event Management Platform - イベントハッケン' },
        { hid: 'og:description', property: 'og:description', content: 'Event Management Platform - Create and Discover Events' },
        { hid: 'og:image', property: 'og:image', content: 'https://my-nuxt-app.com/og-image.jpg' },
        { hid: 'og:image:alt', property: 'og:image:alt', content: 'My Nuxt App OG image' },
        { hid: 'og:url', property: 'og:url', content: 'https://my-nuxt-app.com/' },
        { hid: 'og:type', property: 'og:type', content: 'website' },
  
        // Twitter card tags
        { hid: 'twitter:title', name: 'twitter:title', content: 'Event Management Platform - イベントハッケン' },
        { hid: 'twitter:description', name: 'twitter:description', content: 'Event Management Platform - Create and Discover Events' },
        { hid: 'twitter:image', name: 'twitter:image', content: 'https://my-nuxt-app.com/twitter-image.jpg' },
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
      ]
    },
  },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxt/content',
  ], 
  content: {
    highlight: {
      theme: 'github-light'
    }
  },
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.js',
  },
  colorMode: {
    classSuffix: ""
  },
  build: {
    transpile: ['vuetify'],
  }
})
