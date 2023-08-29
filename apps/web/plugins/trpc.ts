import { createTRPCNuxtClient } from 'trpc-nuxt/client'
import { httpBatchLink } from '@trpc/client'
import type { AppRouter } from '@resolvex/api/src/trpc.router'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const trpc = createTRPCNuxtClient<AppRouter>({
    links: [
      httpBatchLink({
        url: config.public.trpcUrl,
        fetch(...args) {
          // @ts-expect-error API_SERVICE is injected by Cloudflare Worker
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
