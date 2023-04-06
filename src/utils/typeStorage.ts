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
