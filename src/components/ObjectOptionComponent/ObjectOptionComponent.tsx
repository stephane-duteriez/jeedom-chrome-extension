import "./ObjectOptionComponent.css"
import { Card, Elevation } from "@blueprintjs/core"

import React from "react"
import { JeedomObject } from "../../utils/typeStorage"

export interface ObjectComponentProps {
  jObject: JeedomObject
  isOpen: boolean
  setOpenObject: (id: JeedomObject | null) => void
}

const ObjectOptionComponent: (ObjectComponentProps) => JSX.Element = ({
  jObject,
  setOpenObject,
}) => {
  if (jObject.eqLogics.length === 0) return null

  return (
    <>
      <Card
        key={jObject.id}
        elevation={Elevation.TWO}
        interactive={true}
        className="object-item"
        onClick={() => setOpenObject(jObject)}
      >
        <h2>{jObject.name}</h2>
      </Card>
    </>
  )
}

export default ObjectOptionComponent
