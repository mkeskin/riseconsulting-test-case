import wretch from 'wretch'
import { throttlingCache } from 'wretch/middlewares'
import qs from 'wretch/addons/queryString'

const w = wretch()
  .middlewares([
    throttlingCache({
      /* Options - defaults below */
      throttle: 1000,
      skip: (url, opts) => opts.skipCache || opts.method !== 'GET',
      key: (url, opts) => opts.method + '@' + url,
      clear: (url, opts) => false,
      invalidate: (url, opts) => null,
      condition: (response) => response.ok,
      flagResponseOnCacheHit: '__cached',
    }),
  ])
  .addon(qs)

export const apiService = w
  .url(process.env.NEXT_PUBLIC_API_URL)
  .resolve((r) => r.json())
