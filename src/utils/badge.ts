import { fetchCommandeJSONRPC } from "./api"
import { Command } from "./typeStorage"

const setBadge = (cmd: Command): void => {
  fetchCommandeJSONRPC(cmd.id).then((data) => {
    chrome.action.setBadgeText({
      text: `${data.currentValue}`,
    })
  })
}

export { setBadge }
