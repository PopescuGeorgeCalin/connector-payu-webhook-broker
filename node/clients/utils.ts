import {
  InstanceOptions,
  IOContext,
  // InflightKeyGenerator,
  // RequestConfig,
} from '@vtex/api'

export const withProxyAuthorization = (context: IOContext) => (
  options: InstanceOptions
): InstanceOptions => ({
  ...options,
  headers: {
    'Proxy-Authorization': context.authToken,
    ...(options?.headers ?? {}),
  },
})

/* 
export const inflightURL: InflightKeyGenerator = ({
  baseURL,
  url,
}: // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
RequestConfig) => baseURL! + url!

export const withCookieAsHeader = (context: IOContext) => (
  options: InstanceOptions
): InstanceOptions => ({
  ...options,
  headers: {
    VtexIdclientAutCookie: context.authToken,
    ...(options?.headers ?? {}),
  },
})
export const withCookie = (context: IOContext) => (
  options: InstanceOptions
): InstanceOptions => ({
  ...options,
  headers: {
    ...(options?.headers ?? {}),
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    Cookie: `VtexIdclientAutCookie=${context.adminUserAuthToken!};${(options.headers &&
      options.headers.Cookie) ||
      ''}`,
  },
})
export const withProxyTo = (baseUrl: string) => (
  options: InstanceOptions
): InstanceOptions => ({
  ...options,
  headers: {
    'X-VTEX-Proxy-To': `https://${baseUrl}`,
    ...(options?.headers ?? {}),
  },
})
export const withMiddlewares = (
  middlewares: InstanceOptions['middlewares']
) => (options: InstanceOptions): InstanceOptions => ({
  ...options,
  middlewares: [...(middlewares ?? []), ...(options?.middlewares ?? [])],
})
export const withHttps = (options: InstanceOptions): InstanceOptions => ({
  ...options,
  headers: {
    'X-Vtex-Use-Https': 'true',
    ...(options?.headers ?? {}),
  },
})
export const withAuthorization = (context: IOContext) => (
  options: InstanceOptions
): InstanceOptions => ({
  ...options,
  headers: {
    Authorization: context.authToken,
    ...(options?.headers ?? {}),
  },
})
 */
