import { createClient } from 'graphql-ws'
import { withHydrateDatetime } from 'relay-nextjs/date'
import {
  CacheConfig,
  GraphQLResponse,
  Observable,
  RequestParameters,
  Variables,
} from 'relay-runtime'

const BASE_URL = ''
export function rest(path: string, opts?: RequestInit) {
  if (opts?.method?.toUpperCase() === 'POST') {
    opts.body = encodeURI(String(opts.body))
  }
  return fetch(`${BASE_URL}/api/${path}`, {
    headers: {
      'content-type': 'application/json',
    },
    ...opts,
  })
}

export interface Response {
  success: boolean
  error?: string
  payload: any
}

export function fetcher(
  operation: RequestParameters,
  variables?: Variables,
  _cacheConfig?: CacheConfig
) {
  return fetch(BASE_URL + '/api/graphql', {
    method: 'POST',
    headers: {
      // Add authentication and other headers here
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      operationName: operation?.name,
      query: operation.text, // GraphQL text from input
      variables,
    }),
  }).then(response => {
    const data = JSON.parse(JSON.stringify(response.json()), withHydrateDatetime) as GraphQLResponse
    return data
  })
}

const subscriptionsClient =
  typeof window === 'undefined'
    ? null
    : createClient({
        url:
          process.env.NODE_ENV === 'development'
            ? 'ws://localhost:1000/api/stream'
            : 'wss://example.com/',
      })

export function subber(operation: RequestParameters, variables: Variables) {
  if (!subscriptionsClient) return null
  return Observable.create(sink => {
    if (!operation.text) {
      return sink.error(new Error('Operation text cannot be empty'))
    }
    return subscriptionsClient.subscribe(
      {
        operationName: operation.name,
        query: operation.text,
        variables,
      },
      {
        ...sink,
        error: (err: Error) => {
          if (Array.isArray(err))
            // GraphQLError[]
            return sink.error(new Error(err.map(({ message }) => message).join(', ')))

          if (err instanceof CloseEvent)
            return sink.error(
              new Error(
                `Socket closed with event ${err.code} ${err.reason || ''} (clean: ${err.wasClean})` // reason will be available on clean closes only
              )
            )

          return sink.error(err)
        },
      }
    )
  })
}
