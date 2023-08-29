import type { Env } from './worker.env'

export function createContext({ env, ec }: { env: Env; ec: ExecutionContext }) {
  return {
    env,
    ec,
  }
}

export type Context = ReturnType<typeof createContext>
