import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter } from './trpc.router'
import { queryDuplications } from './trpc'

export async function handleTrpcRequest(
  request: Request,
) {
  const url = new URL(request.url)

  if (url.pathname.startsWith('/trpc')) {
    const res = await fetchRequestHandler({
      endpoint: '/trpc',
      req: request,
      router: appRouter,
      createContext: () => ({}),
    })

    queryDuplications.clear()
    return res
  }
}
