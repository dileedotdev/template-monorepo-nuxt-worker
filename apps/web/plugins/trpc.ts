import { createTRPCNuxtClient } from 'trpc-nuxt/client'
import { httpBatchLink } from '@trpc/client'
import type { AppRouter } from '@resolvex/api/src/trpc.router'
import type { FetchEsque } from '@trpc/client/dist/internals/types'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const fetchFn: FetchEsque = (...args) => {
    // @ts-expect-error API_SERVICE is injected by Cloudflare Workers
    return process.env.API_SERVICE?.fetch(...args) ?? fetch(...args)
  }

  const trpc = createTRPCNuxtClient<AppRouter>({
    links: [
      httpBatchLink({
        url: config.public.trpcUrl,
        fetch: fetchFn,
      }),
    ],
  })

  return {
    provide: {
      trpc,
    },
  }
})
