import config from "../../config.json"
import onAddPlayer from "./players/onAddPlayer"
import onUpdatePlayers from "./players/onUpdatePlayers"
import onIOInit from "./setup/onIOInit"

const { packets } = config
const messageListeners = {}

// SETUP:
messageListeners[packets.IO_INIT] = onIOInit

// PLAYERS:
messageListeners[packets.ADD_PLAYER] = onAddPlayer
messageListeners[packets.UPDATE_PLAYERS] = onUpdatePlayers

export default messageListeners