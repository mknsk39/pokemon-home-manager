import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr: false,
  runtimeConfig: {
    public: {
      firebase: {
        apiKey: process.env.NUXT_PUBLIC_FIREBASE_API_KEY ?? '',
        authDomain: process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? '',
        projectId: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID ?? '',
        storageBucket: process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? '',
        messagingSenderId: process.env.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? '',
        appId: process.env.NUXT_PUBLIC_FIREBASE_APP_ID ?? '',
        measurementId: process.env.NUXT_PUBLIC_FIREBASE_MEASUREMENT_ID ?? '',
        emulator: {
          useEmulator: process.env.USE_FIREBASE_EMULATOR === 'true',
          host: process.env.FIREBASE_EMULATOR_HOST ?? '127.0.0.1',
          authPort: Number(process.env.FIREBASE_AUTH_EMULATOR_PORT ?? '9099'),
          firestorePort: Number(process.env.FIRESTORE_EMULATOR_PORT ?? '8080'),
        },
      },
    },
  },
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@nuxt/eslint',
    ...(process.env.NUXT_STORYBOOK === '1' ? ['@nuxtjs/storybook'] : []),
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
})
