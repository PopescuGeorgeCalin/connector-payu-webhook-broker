/* eslint-disable @typescript-eslint/camelcase */
import {
  ParamsContext,
  RecorderState,
  Service,
  // method
} from '@vtex/api'
import { json as requestParser } from 'co-body'

import { Clients, clients } from './clients'
import { Transaction, TransactionWebhookEvent } from './types/payu'
import { isClientError } from './utils'

const bypass = (context: DomainContext) => (context.status = 204)
const ok = (context: DomainContext) => (resp: unknown) => {
  context.status = 200
  context.body = resp
}

const copyError = (context: DomainContext) => (err: Error) => {
  if (isClientError(err)) {
    context.status = err.response.status
  }
  throw err
}

async function transactionsHookBroker(
  context: DomainContext<TransactionWebhookEvent>,
  next: () => Promise<unknown>
) {
  const body = (await requestParser(context.req)) as {
    payload: { object: Transaction }
  }

  const {
    payload: {
      object: { metadata },
    },
  } = body

  metadata?.vtex_tenant
    ? await context.clients.connector
        .hooks(metadata.vtex_tenant, body)
        .then(ok(context))
        .catch(copyError(context))
    : bypass(context)
  await next()
}

export default new Service<Clients, RecorderState, ParamsContext>({
  clients,
  routes: {
    transactionHooks: transactionsHookBroker,
    // transactionHooks: method({
    //   POST: [transactionsHookBroker],
    // }
  },
})
