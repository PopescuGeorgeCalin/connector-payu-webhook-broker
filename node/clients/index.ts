/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { stringify } from 'querystring'

import {
  ClientsConfig,
  IOClients,
  LRUCache,
  MiddlewareContext,
} from '@vtex/api'
import { isEmpty } from 'ramda'

import { Connector } from './connector'

// The @vtex/api HttpClient respects Cache-Control headers and uses the provided cache.
const defaultCache = new LRUCache<string, any>({ max: 200 })
metrics.trackCache('default', defaultCache)

export class Clients extends IOClients {
  public get connector() {
    return this.getOrSet('connector', Connector)
  }
}

const debugging = async (ctx: MiddlewareContext, next: () => Promise<any>) => {
  const start = process.hrtime()
  await next()
  const cached =
    ctx.memoizedHit ||
    ctx.inflightHit ||
    (ctx.cacheHit &&
      (ctx.cacheHit.memory || ctx.cacheHit.router || ctx.cacheHit.revalidated))

  if (ctx.config.production || (cached && ctx.cacheHit)) {
    return
  }

  const elapsed = process.hrtime(start)[1] / 1000000 // divide by a million to get nano to milli
  const success =
    ctx.response && ctx.response.status && ctx.response.status < 400
  const queryParams =
    (!isEmpty(ctx.config.params) && `?${stringify(ctx.config.params)}`) || ''
  // eslint-disable-next-line no-console
  console.log(
    success ? '\x1b[32m%s\x1b[0m' : '\x1b[31m%s\x1b[0m',
    new Date().toISOString(),
    `\t${ctx.config.baseURL}${ctx.config.url}${queryParams}`,
    `\t${ctx.response ? ctx.response.status : 500}`,
    `${Math.floor(elapsed)}ms`
  )
}

// This is the configuration for clients available in `ctx.clients`.
export const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: {
      headers: {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        'x-vtex-caller': process.env.VTEX_APP_ID!,
      },
      memoryCache: defaultCache,
      metrics,
      middlewares: [debugging],
    },
  },
}
