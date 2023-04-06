// fetch data from jeedom

import JSONRPCClient from "./jsonRPCClient"
import { getStoreConnectionInfo } from "./storage"
import { JeedomObject } from "./typeStorage"

const fetchJeedomDataJSONRPC = async (): Promise<JeedomObject[]> => {
  const connectionInfo = await getStoreConnectionInfo()
  if (!connectionInfo) return

  const { apiKey, urlServerJeedom } = connectionInfo
  const client = new JSONRPCClient(
    `${urlServerJeedom}/core/api/jeeApi.php`,
    apiKey
  )
  return client.sendRequest("jeeObject::full")
}

const fetchCommandeJSONRPC = async (
  idCommand: string
): Promise<{
  currentValue: string
}> => {
  const connectionInfo = await getStoreConnectionInfo()
  if (!connectionInfo) return

  const { apiKey, urlServerJeedom } = connectionInfo
  const client = new JSONRPCClient(
    `${urlServerJeedom}/core/api/jeeApi.php`,
    apiKey
  )
  return client.sendRequest("cmd::byId", { id: idCommand })
}

export { fetchJeedomDataJSONRPC, fetchCommandeJSONRPC }
