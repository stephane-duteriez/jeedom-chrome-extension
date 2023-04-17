import "./DetailOptionEquipment.css"
import { Card } from "@blueprintjs/core"
import React, { useEffect, useState } from "react"
import { Command, Equipment } from "../../utils/typeStorage"
import {
  getStoredCommandBadge,
  getStoredCommandForPopup,
  setStoredCommandForPopup,
} from "../../utils/storage"
import DetailOptionCommand from "../DetailOptionCommand"
import { DetailOptionHeader } from "../DetailOptionCommand/DetailOptionCommand"

interface EquipmentProps {
  equipment: Equipment
}

const DetailOptionEquipment: (EquipmentProps) => JSX.Element = ({
  equipment,
}) => {
  const [cmdBadge, setCmdBadge] = useState<Command>()
  const [cmdForPopup, setCmdForPopup] = useState<Command[]>([])
  useEffect(() => {
    getStoredCommandBadge().then((cmdBadge) => {
      setCmdBadge(cmdBadge)
    })
    getStoredCommandForPopup().then((cmdForPopup) => {
      setCmdForPopup(cmdForPopup || [])
    })
  }, [])

  const handleRemoveCommandForPopup: (command: Command) => void = (command) => {
    const newCommandsForPopup = cmdForPopup.filter(
      (cmd: Command) => cmd.id !== command.id
    )
    setCmdForPopup(newCommandsForPopup)
    setStoredCommandForPopup(newCommandsForPopup)
  }

  const handleAddCommandForPopup: (command: Command) => void = (command) => {
    const newCommandsForPopup = [...cmdForPopup, command]
    setCmdForPopup(newCommandsForPopup)
    setStoredCommandForPopup(newCommandsForPopup)
  }

  return (
    <Card className="card-equipment">
      <DetailOptionHeader />
      {equipment.cmds
        .filter((command) => command.logicalId !== "refresh")
        .map((command) => {
          return (
            <DetailOptionCommand
              key={`equipment-${command.id}`}
              command={command}
              selectedForBadge={cmdBadge?.id === command.id}
              selectedForPopup={
                cmdForPopup?.find((cmd) => cmd.id === command.id) ? true : false
              }
              setCmdBadge={setCmdBadge}
              addCmdForPopup={handleAddCommandForPopup}
              removeCmdPopup={handleRemoveCommandForPopup}
            />
          )
        })}
    </Card>
  )
}

export default DetailOptionEquipment
