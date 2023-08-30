import path from 'node:path'
import type { Config } from 'drizzle-kit'

export default {
  schema: './src/schema.ts',
  out: './migrations',
  driver: 'better-sqlite',
  dbCredentials: {
    url: path.resolve(__dirname, './.wrangler/state/v3/d1/0f11479b-c924-4a87-9e71-8a46d613840a/db.sqlite'),
  },
} satisfies Config
