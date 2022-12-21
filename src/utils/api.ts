// fetch data from jeedom

import { jeedomUrl, apiKey } from "../local"

export { jeedomUrl }
const baseUrl = `${jeedomUrl}/core/api/jeeApi.php?apikey=${apiKey}`

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

const fetchJeedomData = async (): Promise<JeedomObject[]> => {
  const res = await fetch(`${baseUrl}&type=fullData`)
  if (!res.ok) {
    throw new Error("Error while fetching jeedom data")
  }

  const data = await res.json()
  return data
}

const fetchCommande = async (idCommand: string): Promise<string> => {
  const res = await fetch(`${baseUrl}&type=cmd&id=${idCommand}`)
  if (!res.ok) {
    throw new Error("Error while fetching jeedom data")
  }
  const data = await res.json()
  return data
}

export { fetchJeedomData, fetchCommande }
