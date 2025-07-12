import { io } from "../../../const"

function onIOInit(_socketId) {
    io.setSocketId(_socketId)
}

export default onIOInit