import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter } from './trpc.router'
import { createTRPCContext, queryDuplications } from './trpc'
import type { Context } from './worker.context'

export async function handleTrpcRequest({ context }: { context: Context }) {
  const url = new URL(context.request.url)

  if (url.pathname.startsWith('/trpc')) {
    const res = await fetchRequestHandler({
      endpoint: '/trpc',
      req: context.request,
      router: appRouter,
      createContext: createTRPCContext({ context }),
    })

    queryDuplications.clear()
    return res
  }
}
