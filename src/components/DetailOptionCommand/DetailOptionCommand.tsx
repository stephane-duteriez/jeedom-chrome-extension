import "./DetailOptionCommand.css"
import { Switch } from "@blueprintjs/core"
import React, { BaseSyntheticEvent } from "react"
import { Command, typeCommands } from "../../utils/api"
import {
  setStoredCommandBadge,
  setStoredCommandForPopup,
} from "../../utils/storage"
import { setBadge } from "../../utils/badge"

interface DetailCommandProps {
  command: Command
  selectedForBadge: boolean
  selectedForPopup: boolean
  setCmdBadge: React.Dispatch<React.SetStateAction<Command>>
  addCmdForPopup: (command: Command) => void
  removeCmdPopup: (command: Command) => void
}
const DetailOptionCommand: (DetailCommandProps) => JSX.Element = ({
  command,
  selectedForBadge,
  selectedForPopup,
  setCmdBadge,
  removeCmdPopup,
  addCmdForPopup,
}) => {
  const handleChangeForBadge = (e: BaseSyntheticEvent) => {
    if (e.target.checked) {
      setCmdBadge(command)
      setStoredCommandBadge(command)
      setBadge(command)
    } else {
      setCmdBadge(null)
    }
  }
  const handleChangeForPopup = (e: BaseSyntheticEvent) => {
    if (e.target.checked) {
      addCmdForPopup(command)
    } else {
      removeCmdPopup(command)
    }
  }
  return (
    <div className="detail-command">
      <div>{command.name}</div>
      {command.type === typeCommands.INFO && (
        <>
          <div>
            {command.state} {command.unite}
          </div>
          <Switch checked={selectedForBadge} onChange={handleChangeForBadge} />
          <Switch checked={selectedForPopup} onChange={handleChangeForPopup} />
        </>
      )}
      {command.type === typeCommands.ACTION && (
        <>
          <div>{"something"}</div>
          <Switch checked={selectedForPopup} onChange={handleChangeForPopup} />
        </>
      )}
    </div>
  )
}

export default DetailOptionCommand
