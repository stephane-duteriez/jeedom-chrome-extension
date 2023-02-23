import "./DetailPopupCommand.css"
import React from "react"
import { Command, fetchCommandeJSONRPC } from "../../utils/api"
import { useQuery } from "react-query"

interface DetailCommandProps {
  command: Command
}

const DetailPopupCommand: (DetailCommandProps) => JSX.Element = ({
  command,
}) => {
  const { data: currentState } = useQuery(["command", { id: command.id }], () =>
    fetchCommandeJSONRPC(command.id)
  )

  if (!currentState) {
    return <>...charging</>
  }
  return (
    <div className="detail-command">
      <div>{command.name}</div>
      <div>
        {currentState.currentValue} {command.unite}
      </div>
    </div>
  )
}

export default DetailPopupCommand
