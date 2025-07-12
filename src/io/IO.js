import { msgpack } from "../const"
import Messager from "./Messager"

class IO {
    constructor() {
        this.socket = null
        this.socketId = null

        this.messager = new Messager()

        this.debug = {
            pps: []
        }

        this.ppsLimit = {
            state: false,
            limit: 85
        }
    }

    get isCreated() {
        return this.socket instanceof WebSocket
    }

    get isReady() {
        if (!this.isCreated) return false

        return this.socket.readyState === WebSocket.OPEN
    }

    setPPSLimit(_state, _limit = 85) {
        if (typeof _state !== 'boolean' || typeof _limit !== 'number') return false

        this.ppsLimit.state = _state
        this.ppsLimit.limit = _limit
    }

    setSocket(_socket) {
        if (this.socket instanceof WebSocket) return
        if (!(_socket instanceof WebSocket)) return
        if (!/moomoo\.io/.test(_socket.url)) return

        this.socket = _socket

        this.#build()
    }

    setSocketId(_socketId) {
        if (typeof _socketId !== 'string') return

        this.socketId = _socketId.toString()
    }

    send(type, ...content) {
        if (!this.isReady) return

        const encoded = msgpack.encode([ type, content, "BY-MIO" ])

        this.socket.send(encoded)
    }

    on(eventKey, listener) {
        if (!this.isCreated) return

        if (eventKey.startsWith("on")) {
            this.socket[eventKey] = listener

            return
        }

        this.socket.addEventListener(eventKey, listener)
    }

    _updatePPS() {
        for (const tmpPacket of this.debug.pps) {
            if (Date.now() - tmpPacket < 1000) continue

            this.debug.pps.shift()
        }

        if (this.debug.pps.length >= 85) return

        this.debug.pps.push(Date.now())
    }

    #build() {
        this.on("message", this.messager._onMessage.bind(this.messager))
    }
}

export default IO