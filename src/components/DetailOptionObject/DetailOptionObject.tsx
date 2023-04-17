import React from "react"
import { Card, PanelProps } from "@blueprintjs/core"
import { Equipment, JeedomObject } from "../../utils/typeStorage"
import "./DetailOptionObject.css"
import DetailOptionEquipment from "../DetailOptionEquipment"

interface DetailObjectProps {
  jObject: JeedomObject
}
const DetailOptionObject = ({
  jObject,
  openPanel,
}: PanelProps<DetailObjectProps>): JSX.Element => {
  return (
    <div className="equipment-list">
      {jObject.eqLogics.map((equipment) => (
        <Card
          key={equipment.id}
          className="equipment-card"
          onClick={() =>
            openPanel({
              props: { equipment },
              renderPanel: DetailOptionEquipment,
              title: equipment.name,
            })
          }
        >
          {equipment.name}
        </Card>
      ))}
    </div>
  )
}

export default DetailOptionObject
