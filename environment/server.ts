import { Environment, Network, RecordSource, Store } from 'relay-runtime'
import { fetcher } from './api'

const createServerNetwork = () => Network.create(fetcher)

export function createServerEnvironment() {
  return new Environment({
    network: createServerNetwork(),
    store: new Store(new RecordSource()),
    isServer: true,
  })
}
