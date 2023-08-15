/**
 * This is the API-handler of your app that contains all your API routes.
 * On a bigger app, you will probably want to split this file up into multiple files.
 */
import { publicProcedure, router } from './trpc'

export const appRouter = router({
  hello: publicProcedure
    .query(() => {
      // This is what you're returning to your client
      return 'hixx'
    }),
})

// export only the type definition of the API
// None of the actual implementation is exposed to the client
export type AppRouter = typeof appRouter
