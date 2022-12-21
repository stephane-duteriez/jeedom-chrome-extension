import { Command, fetchCommande } from "./api"

const setBadge = (cmd: Command): void => {
  fetchCommande(cmd.id).then((data) => {
    chrome.action.setBadgeText({
      text: `${data}`,
    })
  })
}

export { setBadge }
