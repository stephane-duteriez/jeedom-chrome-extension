import { Command, ConnectionInfo } from "./typeStorage"

export interface LocalStorage {
  cmdBadge?: Command
  cmdForPopup?: Command[]
  connectionInfo?: ConnectionInfo
}

export type LocalStorageKeys = keyof LocalStorage

export function setStoredCommandBadge(cmdBadge: Command): Promise<void> {
  const vals: LocalStorage = {
    cmdBadge,
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => {
      resolve()
    })
  })
}

export function getStoredCommandBadge(): Promise<Command> {
  const keys: LocalStorageKeys[] = ["cmdBadge"]
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: LocalStorage) => {
      resolve(res.cmdBadge ?? null)
    })
  })
}

export function setStoredCommandForPopup(
  cmdForPopup: Command[]
): Promise<void> {
  const vals: LocalStorage = {
    cmdForPopup,
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => {
      resolve()
    })
  })
}

export function getStoredCommandForPopup(): Promise<Command[]> {
  const keys: LocalStorageKeys[] = ["cmdForPopup"]
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: LocalStorage) => {
      resolve(res.cmdForPopup ?? null)
    })
  })
}

export function getStoreConnectionInfo(): Promise<ConnectionInfo> {
  const keys: LocalStorageKeys[] = ["connectionInfo"]
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: LocalStorage) => {
      resolve(res.connectionInfo ?? { urlServerJeedom: "", apiKey: "" })
    })
  })
}

export function setStoreConnectionInfo(
  connectionInfo: ConnectionInfo
): Promise<void> {
  const vals: LocalStorage = {
    connectionInfo,
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => {
      resolve()
    })
  })
}
