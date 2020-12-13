import { ExternalClient, InstanceOptions, IOContext } from '@vtex/api'
import { pipe } from 'ramda'

import { withProxyAuthorization } from './utils'

export class Connector extends ExternalClient {
  constructor(protected context: IOContext, options?: InstanceOptions) {
    super(
      '',
      context,
      options && pipe(withProxyAuthorization(context))(options)
    )
  }

  public hooks = (tenant: string, hook: unknown): Promise<unknown> =>
    this.http.post(
      `http://${tenant}.myvtex.com/_v/api/connectors/payu/hooks`,
      hook,
      {
        metric: 'hook-broker',
        timeout: 60 * 1000,
      }
    )
}
