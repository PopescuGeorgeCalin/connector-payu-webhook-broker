import { RequestConfig, ResolverError } from '@vtex/api'

interface ClientResponse {
  status: number
  data: ResolverError
  config: RequestConfig
}

export type ClientError = {
  response: ClientResponse
} & Error

export const isClientError = (err: Error): err is ClientError =>
  typeof (err as ClientError).response !== 'undefined'
