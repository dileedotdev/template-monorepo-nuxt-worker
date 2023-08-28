/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { is } from 'valibot'
import { handleTrpcRequest } from './worker.trpc'
import { envSchema } from './worker.env'
import { createContext } from './worker.context'
import { handleCorsRequest, handleCorsResponse } from './worker.cors'

export default {
  async fetch(request: Request, env: unknown, ec: ExecutionContext) {
    if (!is(envSchema, env))
      return new Response('Invalid env', { status: 500 })

    const context = createContext({ env, request, ec })

    if (env.WORKER_ENV === 'development')
      await new Promise(resolve => setTimeout(resolve, 300))

    let response: Response | undefined

    response ??= await handleCorsRequest({ context })

    response ??= await handleTrpcRequest({ context })

    response ??= new Response('Not found', {
      status: 404,
    })

    response = await handleCorsResponse({ response, context })

    return response
  },
}
