import { msgpack } from "../const"
import messageListeners from "./listeners"

class Messager {
    constructor() {
        this.events = new Map()

        this.debug = {
            lastMessageTimes: [],
            lastMessageTime: null,
            averageTime: 0
        }

        this.#initMessageListeners()
    }

    on(packetId, listener) {
        if (!this.events.has(packetId)) {
            this.events.set(packetId, new Map())
        }

        const events = this.events.get(packetId)
        const id = listener.toString()

        events.set(id, listener)

        return {
            id, listener,
            delete() {
                return events.delete(id)
            }
        }
    }

    _onMessage(event) {
        const binary = new Uint8Array(event.data)
        const decoded = msgpack.decode(binary)

        this.debug.lastMessageTime = Date.now()
        this.debug.lastMessageTimes.push(this.debug.lastMessageTime)
        this.debug.lastMessageTimes.length > 10 && this.debug.lastMessageTimes.splice(0, 10)
        this.debug.averageTime = this.debug.lastMessageTimes.reduce((acc, time) => acc + (Date.now() - time), 0) / this.debug.lastMessageTimes.length

        if (!decoded.length || !this.events.has(decoded[0])) return

        this.#callPacketListeners(decoded[0], decoded[1])
    }

    #callPacketListeners(packetId, content) {
        const events = this.events.get(packetId)

        if (!events.size) return

        events.forEach((listener) => {
            listener(...content)
        })
    }

    #initMessageListeners() {
        for (const packetName in messageListeners) {
            this.on(packetName, messageListeners[packetName])
        }
    }
}

export default Messager