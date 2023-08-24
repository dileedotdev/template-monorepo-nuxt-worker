import { initTRPC } from '@trpc/server'
import { once } from 'lodash-es'

const t = initTRPC.create()

export const middleware = t.middleware
export const router = t.router

export const queryDuplications = new Map<string, any>()

export const publicProcedure = t.procedure.use(middleware((opts) => {
  if (opts.type !== 'query')
    return opts.next({ ctx: opts.ctx })

  const key = `${opts.path}::${JSON.stringify(opts.rawInput)}`

  if (!queryDuplications.has(key)) {
    queryDuplications.set(key, once(() => opts.next({
      ctx: opts.ctx,
    })))
  }

  return queryDuplications.get(key)()
}))
