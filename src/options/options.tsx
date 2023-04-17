import React, { useEffect, useState } from "react"
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useQueryClient,
} from "react-query"
import ReactDOM from "react-dom"
import { fetchJeedomDataJSONRPC } from "../utils/api"
import { AnchorButton, Card } from "@blueprintjs/core"
import "normalize.css"
import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"
import "./options.css"
import { getStoreConnectionInfo } from "../utils/storage"
import { JeedomObject } from "../utils/typeStorage"
import ConfigurationOptions from "../components/ConfigurationOptions"
import PanelOptionsSelection from "../components/PanelOptionsSelection"

const ListObjects: React.FC<{}> = () => {
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

  return (
    <div className="option-container">
      <Card>
        <div className="header-option">
          <h2 className="center">Option Jeedom extension</h2>

          <AnchorButton
            disabled={!urlServerJeedom}
            href={urlServerJeedom}
            target="_blank"
            text="Mon Jeedom"
            type="button"
            large={true}
          />
        </div>
      </Card>

      <ConfigurationOptions
        setUrlServerJeedom={setUrlServerJeedom}
        setApiKey={setApiKey}
        apiKey={apiKey}
        urlServerJeedom={urlServerJeedom}
      />

      <PanelOptionsSelection isLoading={isLoading} jeedomData={jeedomData} />
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
