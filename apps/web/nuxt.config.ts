import process from 'node:process'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  build: {
    transpile: ['trpc-nuxt'],
  },
  runtimeConfig: {
    public: {
      trpcUrl: process.env.TRPC_URL || 'http://localhost:3001/trpc',
    },
  },
})
