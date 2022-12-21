import "./popup.css"
import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css"
import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import { Command, jeedomUrl } from "../utils/api"
import { getStoredCommandForPopup } from "../utils/storage"
import DetailPopupCommand from "../components/DetailPopupCommand/DetailPopupCommand"
import { AnchorButton } from "@blueprintjs/core"

const App: React.FC<{}> = () => {
  const [commands, setCommands] = useState<Command[]>()
  const queryClient = new QueryClient()
  useEffect(() => {
    getStoredCommandForPopup().then((cmds) => {
      setCommands(cmds)
    })
  }, [])
  if (!commands) return null

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <AnchorButton
          href={jeedomUrl}
          target="_blank"
          text="Mon Jeedom"
          type="button"
        />
      </div>
      {commands.length === 0 && <div>Aucune commande sélectionnée</div>}
      <div className="popup-container">
        {commands.map((cmd) => (
          <DetailPopupCommand command={cmd} key={`popup-command-${cmd.id}`} />
        ))}
      </div>
    </QueryClientProvider>
  )
}

const root = document.createElement("div")
document.body.appendChild(root)
ReactDOM.render(<App />, root)
