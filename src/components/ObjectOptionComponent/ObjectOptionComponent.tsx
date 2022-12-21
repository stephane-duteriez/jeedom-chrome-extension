import "./ObjectOptionComponent.css"
import { Card, Classes, Elevation, Overlay } from "@blueprintjs/core"

import classNames from "classnames"
import React, { useState } from "react"
import { JeedomObject } from "../../utils/api"

export interface ObjectComponentProps {
  jObject: JeedomObject
  isOpen: boolean
  setOpenObject: (id: JeedomObject | null) => void
}
const OVERLAY_EXAMPLE_CLASS = "overlay-transition"
// const OVERLAY_TALL_CLASS = "docs-overlay-example-tall"

const ObjectOptionComponent: (ObjectComponentProps) => JSX.Element = ({
  jObject,
  isOpen,
  setOpenObject,
}) => {
  if (jObject.eqLogics.length === 0) return null
  const classes = classNames(
    Classes.CARD,
    Classes.ELEVATION_4,
    OVERLAY_EXAMPLE_CLASS
    // { [OVERLAY_TALL_CLASS]: this.state.useTallContent }
  )
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
