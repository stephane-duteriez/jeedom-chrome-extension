import "./DetailPopupCommand.css"
import React from "react"
import { Command, fetchCommande } from "../../utils/api"
import { useQuery } from "react-query"

interface DetailCommandProps {
  command: Command
}

const DetailPopupCommand: (DetailCommandProps) => JSX.Element = ({
  command,
}) => {
  const { data: currentState } = useQuery(["command", { id: command.id }], () =>
    fetchCommande(command.id)
  )

  if (!currentState) {
    return <>...charging</>
  }
  return (
    <div className="detail-command">
      <div>{command.name}</div>
      <div>
        {currentState} {command.unite}
      </div>
    </div>
  )
}

export default DetailPopupCommand
