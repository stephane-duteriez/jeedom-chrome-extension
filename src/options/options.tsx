import React, { useEffect, useState } from "react"
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useQueryClient,
} from "react-query"
import ReactDOM from "react-dom"
import { fetchJeedomDataJSONRPC } from "../utils/api"
import {
  AnchorButton,
  Button,
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
import {
  getStoreConnectionInfo,
  setStoreConnectionInfo,
} from "../utils/storage"
import { Equipment, JeedomObject } from "../utils/typeStorage"

const ListObjects: React.FC<{}> = () => {
  const [openObject, setOpenObject] = useState<JeedomObject | null>(null)
  const [selectEquipment, setSelectEquipment] = useState<Equipment | null>(null)
  const [urlServerJeedom, setUrlServerJeedom] = useState<string>("")
  const [apiKey, setApiKey] = useState<string>("")
  const queryClient = useQueryClient()
  const { data: jeedomData, isLoading } = useQuery<JeedomObject[]>(
    "FETCH_ALL",
    () => fetchJeedomDataJSONRPC(),
    { enabled: !!urlServerJeedom && !!apiKey, initialData: [] }
  )

  useEffect(() => {
    getStoreConnectionInfo().then((connectionInfo) => {
      if (!connectionInfo) return
      const { apiKey, urlServerJeedom } = connectionInfo
      setApiKey(apiKey)
      setUrlServerJeedom(urlServerJeedom)
      queryClient.invalidateQueries("FETCH_ALL")
    })
  }, [])

  const handleChangeOpenObject = (jObject: JeedomObject) => {
    setOpenObject(jObject)
    setSelectEquipment(null)
  }

  const handleChangeUrl = (event) => {
    setUrlServerJeedom(event.target.value)
    setStoreConnectionInfo({ apiKey, urlServerJeedom: event.target.value })
  }

  const handleChangeApiKey = (event) => {
    setApiKey(event.target.value)
    setStoreConnectionInfo({ apiKey: event.target.value, urlServerJeedom })
  }

  return (
    <div className="option-container">
      <AnchorButton
        href={urlServerJeedom}
        target="_blank"
        text="Mon Jeedom"
        type="button"
      />
      <h1 className="center">Jeedom extension</h1>
      <h2>Configuration</h2>
      <FormGroup
        helperText="url de votre serveur jeedom"
        label="serveur jeedom"
        labelFor="url-input"
        labelInfo="(required)"
      >
        <InputGroup
          id="url-input"
          placeholder="https:// ...."
          value={urlServerJeedom}
          onChange={handleChangeUrl}
        />
        <Button>Ping</Button>
      </FormGroup>
      <FormGroup
        helperText="Apikey du serveur jeedom"
        label="Apikey"
        labelFor="api-key"
        labelInfo="(required)"
      >
        <InputGroup
          id="api-key"
          placeholder="api-key-jeedom"
          value={apiKey}
          onChange={handleChangeApiKey}
        />
      </FormGroup>
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
        <>
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
        </>
      )}
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
