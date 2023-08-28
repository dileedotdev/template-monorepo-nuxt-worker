import type { Env } from './worker.env'

export function createContext({ env, request, ec }: { env: Env; request: Request; ec: ExecutionContext }) {
  return {
    env,
    request,
    ec,
  }
}

export type Context = ReturnType<typeof createContext>
