import {
  fetchCommande,
  fetchJeedomData,
  subTypeCommands,
  typeCommands,
} from "../utils/api"
import { setBadge } from "../utils/badge"
import {
  getStoredCommandBadge,
  setStoredCommandBadge,
  setStoredCommandForPopup,
} from "../utils/storage"

chrome.runtime.onInstalled.addListener(() => {
  // set default value in local storage
  setStoredCommandBadge({
    id: "1631",
    name: "",
    state: 0,
    type: typeCommands.INFO,
    subType: subTypeCommands.NUMERIC,
    unite: "Wh",
  })

  setStoredCommandForPopup([])
  // setStoredOption({ tempScale: "metric", homeCity: "", hasAutoOverlay: false })

  chrome.alarms.create({
    periodInMinutes: 1,
  })
})

chrome.alarms.onAlarm.addListener(() => {
  getStoredCommandBadge().then((cmdBadge) => {
    if (!cmdBadge.id) {
      return
    }
    setBadge(cmdBadge)
  })
})
