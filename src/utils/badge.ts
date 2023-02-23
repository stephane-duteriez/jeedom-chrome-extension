import { Command, fetchCommandeJSONRPC } from "./api"

const setBadge = (cmd: Command): void => {
  fetchCommandeJSONRPC(cmd.id).then((data) => {
    chrome.action.setBadgeText({
      text: `${data.currentValue}`,
    })
  })
}

export { setBadge }
