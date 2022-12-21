import { Command } from "./api"

export interface LocalStorage {
  cmdBadge?: Command
  cmdForPopup?: Command[]
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
