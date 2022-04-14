import { getRelaySerializedState } from 'relay-nextjs'
import { Environment, Network, RecordSource, Store, SubscribeFunction } from 'relay-runtime'
import { fetcher, subber } from './api'

const createClientNetwork = () => Network.create(fetcher, subber as SubscribeFunction)

let clientEnv: Environment | undefined
export function getClientEnvironment() {
  if (typeof window === 'undefined') return null

  if (clientEnv == null) {
    clientEnv = new Environment({
      network: createClientNetwork(),
      store: new Store(new RecordSource(getRelaySerializedState()?.records)),
      isServer: false,
    })
  }

  return clientEnv
}
