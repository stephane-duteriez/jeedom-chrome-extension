import {
  Card,
  Panel,
  PanelProps,
  PanelStack2,
  Spinner,
  SpinnerSize,
} from "@blueprintjs/core"
import React, { useEffect, useState } from "react"
import ObjectOptionComponent from "../ObjectOptionComponent"
import { JeedomObject } from "../../utils/typeStorage"
import DetailOptionObject from "../DetailOptionObject"
import "./PanelOptionSelection.css"

interface ObjetListProps {
  jeedomData: JeedomObject[]
}

const PanelObjects: React.FC<PanelProps<ObjetListProps>> = ({
  jeedomData,
  openPanel,
}) => {
  const openNewPanel = (jObject: JeedomObject) => {
    openPanel({
      props: { jObject },
      renderPanel: DetailOptionObject,
      title: jObject.name,
    })
  }

  return (
    <div className="object-list">
      {jeedomData.map((jObject) => (
        <ObjectOptionComponent
          key={jObject.id}
          jObject={jObject}
          setOpenObject={openNewPanel}
          isOpen={false}
        />
      ))}
    </div>
  )
}

const initialPanel: Panel<ObjetListProps> = {
  props: {
    jeedomData: [],
  },
  renderPanel: PanelObjects,
  title: "Panel 1",
}

interface PanelOptionsSelectionProps {
  isLoading: boolean
  jeedomData: JeedomObject[]
}

export const PanelOptionsSelection = ({
  isLoading,
  jeedomData,
}: PanelOptionsSelectionProps): JSX.Element => {
  const [currentPanelStack, setCurrentPanelStack] = useState<Panel<any>[]>([])
  const addToPanelStack = (panel: Panel<ObjetListProps>) =>
    setCurrentPanelStack((stack) => [...stack, panel])

  const removeFromPanelStack = (panel: Panel<ObjetListProps>) =>
    setCurrentPanelStack((stack) => stack.slice(0, -1))

  useEffect(() => {
    setCurrentPanelStack([
      {
        props: {
          jeedomData: jeedomData,
        },
        renderPanel: PanelObjects,
        title: "Objects",
      },
    ])
  }, [jeedomData])

  return (
    <Card>
      {isLoading && (
        <div
          style={{
            display: "block",
            width: "100%",
            padding: 30,
          }}
        >
          <Spinner size={SpinnerSize.STANDARD} />
        </div>
      )}
      {!isLoading && (
        <PanelStack2
          className="object-panel-stack"
          onOpen={addToPanelStack}
          onClose={removeFromPanelStack}
          stack={currentPanelStack}
        />
      )}
    </Card>
  )
}
