import React, { useState } from "react"
import { QueryClient, QueryClientProvider, useQuery } from "react-query"
import ReactDOM from "react-dom"
import {
  Equipment,
  fetchJeedomData,
  JeedomObject,
  jeedomUrl,
} from "../utils/api"
import {
  AnchorButton,
  FormGroup,
  InputGroup,
  Spinner,
  SpinnerSize,
} from "@blueprintjs/core"
import "normalize.css"
import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"
import "./options.css"
import ObjectOptionComponent from "../components/ObjectOptionComponent"
import DetailObject from "../components/DetailOptionObject"
import DetailEquipment from "../components/DetailOptionEquipment"

const ListObjects: React.FC<{}> = () => {
  const [openObject, setOpenObject] = useState<JeedomObject | null>(null)
  const [selectEquipment, setSelectEquipment] = useState<Equipment | null>(null)
  const { data: jeedomData, isLoading } = useQuery<JeedomObject[]>(
    "FETCH_ALL",
    () => fetchJeedomData()
  )
  if (isLoading) {
    return (
      <div
        style={{
          display: "block",
          width: "100%",
          padding: 30,
        }}
      >
        <Spinner size={SpinnerSize.STANDARD} />
      </div>
    )
  }

  const handleChangeOpenObject = (jObject: JeedomObject) => {
    setOpenObject(jObject)
    setSelectEquipment(null)
  }

  return (
    <div className="option-container">
      <AnchorButton
        href={jeedomUrl}
        target="_blank"
        text="Mon Jeedom"
        type="button"
      />
      <h1 className="center">Jeedom extension</h1>
      <h2>Configuration</h2>
      <FormGroup
        helperText="url serveur jeedom"
        label="serveur jeedom"
        labelFor="url-input"
        labelInfo="(required)"
      >
        <InputGroup id="text-input" placeholder="https:// ...." />
      </FormGroup>
      <h2>Objects</h2>
      <div className="object-list">
        {jeedomData.map((jObject) => (
          <ObjectOptionComponent
            key={jObject.id}
            jObject={jObject}
            setOpenObject={handleChangeOpenObject}
            isOpen={false}
          />
        ))}
      </div>
      {openObject && openObject.eqLogics && (
        <DetailObject
          jObject={openObject}
          setSelectEquipment={setSelectEquipment}
        />
      )}
      {selectEquipment && <DetailEquipment equipment={selectEquipment} />}
    </div>
  )
}

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ListObjects />
    </QueryClientProvider>
  )
}

const root = document.createElement("div")
document.body.appendChild(root)
ReactDOM.render(<App />, root)
