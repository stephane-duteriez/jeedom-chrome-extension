import React from "react"
import { Card } from "@blueprintjs/core"
import { Equipment, JeedomObject } from "../../utils/api"
import "./DetailOptionObject.css"

interface DetailObjectProps {
  jObject: JeedomObject
  setSelectEquipment: (eq: Equipment) => void
}
const DetailOptionObject: (DetailObjectProps) => JSX.Element = ({
  jObject,
  setSelectEquipment,
}) => {
  return (
    <div className="equipment-list">
      {jObject.eqLogics.map((equipment) => (
        <Card
          key={equipment.id}
          className="equipment-card"
          onClick={() => setSelectEquipment(equipment)}
        >
          {equipment.name}
        </Card>
      ))}
    </div>
  )
}

export default DetailOptionObject
