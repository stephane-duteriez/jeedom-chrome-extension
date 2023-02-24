// fetch data from jeedom

import { JSONRPCClient } from "json-rpc-2.0"
import { getStoreConnectionInfo } from "./storage"

export enum subTypeCommands {
  "NUMERIC" = "numeric",
  "STRING" = "string",
  "OTHER" = "other",
}

export enum typeCommands {
  "INFO" = "info",
  "ACTION" = "action",
}

export type SubTypeCommand = "numeric" | "string" | "other"
export type TypeCommand = "action" | "info"
export interface CommandBase {
  id: string
  name: string
  unite: string
  type: TypeCommand
  subType: SubTypeCommand
}

export interface CommandNumeric extends CommandBase {
  type: typeCommands.INFO
  subType: subTypeCommands.NUMERIC
  state: number
}

export interface CommandAction extends CommandBase {
  type: typeCommands.ACTION
  subType: subTypeCommands.OTHER
}

export interface CommandText extends CommandBase {
  type: typeCommands.INFO
  subType: subTypeCommands.STRING
  state: string
}

export type Command = CommandNumeric | CommandText
export interface Equipment {
  id: string
  name: string
  cmds: Command[]
}
export interface JeedomObject {
  id: string
  name: string
  eqLogics: Equipment[]
}

export interface ConnectionInfo {
  urlServerJeedom: string
  apiKey: string
}

const client = new JSONRPCClient(async (jsonRPCRequest = {}) => {
  const connectionInfo = await getStoreConnectionInfo()
  if (!connectionInfo) return

  const { apiKey, urlServerJeedom } = connectionInfo
  jsonRPCRequest = {
    ...jsonRPCRequest,
    params: {
      ...jsonRPCRequest.params,
      apikey: apiKey,
    },
  }
  return fetch(`${urlServerJeedom}/core/api/jeeApi.php`, {
    method: "POST",
    body: JSON.stringify(jsonRPCRequest),
  }).then((response) => {
    if (response.status === 200) {
      // Use client.receive when you received a JSON-RPC response.
      return response
        .json()
        .then((jsonRPCResponse) => client.receive(jsonRPCResponse))
    } else if (jsonRPCRequest.id !== undefined) {
      return Promise.reject(new Error(response.statusText))
    }
  })
})

const fetchJeedomDataJSONRPC = async (): Promise<JeedomObject[]> => {
  return client.request("jeeObject::full")
}

const fetchCommandeJSONRPC = async (
  idCommand: string
): Promise<{
  currentValue: string
}> => {
  return client.request("cmd::byId", { id: idCommand })
}

export { fetchJeedomDataJSONRPC, fetchCommandeJSONRPC }
