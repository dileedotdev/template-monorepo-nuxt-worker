import process from 'node:process'
import type { AppRouter } from 'api/src/trpc.router'
import { createTRPCNuxtClient } from 'trpc-nuxt/client'
import { httpBatchLink } from '@trpc/client'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const trpc = createTRPCNuxtClient<AppRouter>({
    links: [
      httpBatchLink({
        url: config.public.trpcUrl,
        async fetch(...args: Parameters<typeof fetch>) {
          // @ts-expect-error API_SERVICE is injected by Cloudflare Workers
          return process.env.API_SERVICE?.fetch(...args) ?? fetch(...args)
        },
      }),
    ],
  })

  return {
    provide: {
      trpc,
    },
  }
})
