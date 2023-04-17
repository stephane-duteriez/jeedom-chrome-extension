import React, { useEffect, useState } from "react"
import {
  Button,
  Card,
  ControlGroup,
  FormGroup,
  InputGroup,
} from "@blueprintjs/core"
import { setStoreConnectionInfo } from "../../utils/storage"
import "./ConfigurationOptions.css"

interface ConfigurationOptionsProps {
  setUrlServerJeedom: React.Dispatch<React.SetStateAction<string>>
  setApiKey: React.Dispatch<React.SetStateAction<string>>
  apiKey: string
  urlServerJeedom: string
}
export const ConfigurationOptions = ({
  setApiKey,
  setUrlServerJeedom,
  apiKey,
  urlServerJeedom,
}: ConfigurationOptionsProps): JSX.Element => {
  const handleChangeUrl = (event) => {
    setUrlServerJeedom(event.target.value)
    setStoreConnectionInfo({ apiKey, urlServerJeedom: event.target.value })
  }

  const handleChangeApiKey = (event) => {
    setApiKey(event.target.value)
    setStoreConnectionInfo({ apiKey: event.target.value, urlServerJeedom })
  }

  return (
    <Card>
      <h4>Configuration</h4>
      <div className="option-input-container">
        <ControlGroup>
          <FormGroup
            helperText="url de votre serveur jeedom"
            label="serveur jeedom"
            labelFor="url-input"
            labelInfo="(obligatoire)"
            inline={true}
          >
            <InputGroup
              id="url-input"
              placeholder="https:// ...."
              value={urlServerJeedom}
              onChange={handleChangeUrl}
            />
          </FormGroup>
          <Button
            className="option-button-ping"
            disabled={!urlServerJeedom}
            hidden={true}
          >
            Ping
          </Button>
        </ControlGroup>
        <FormGroup
          helperText="Apikey du serveur jeedom"
          label="ApiKey"
          labelFor="api-key"
          labelInfo="(obligatoire)"
          inline={true}
        >
          <InputGroup
            id="api-key"
            placeholder="api-key-jeedom"
            value={apiKey}
            onChange={handleChangeApiKey}
          />
        </FormGroup>
      </div>
    </Card>
  )
}
