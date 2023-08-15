import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter } from './trpc.router'

export async function handleTrpcRequest(
  request: Request,
) {
  const url = new URL(request.url)

  if (url.pathname.startsWith('/trpc')) {
    return await fetchRequestHandler({
      endpoint: '/trpc',
      req: request,
      router: appRouter,
      createContext: () => ({}),
    })
  }
}
