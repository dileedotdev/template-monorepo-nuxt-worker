import { enumType, object, string, url, withDefault } from 'valibot'
import type { Output } from 'valibot'

export const envSchema = object({
  WORKER_ENV: withDefault(enumType(['development', 'production']), 'production'),
  WEB_URL: string([url()]),
})

export type Env = Output<typeof envSchema>
