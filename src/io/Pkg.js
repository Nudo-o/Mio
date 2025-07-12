import config from "../config.json"
import utils from "../utils"

class Pkg {
    constructor() {
        const { packets } = config

        for (const packetDesignation in packets) {
            const packet = packets[packetDesignation]
            const words = packetDesignation.toLowerCase().split("_")
            const packetDesignations = [
                packetDesignation,
                packetDesignation.toLowerCase(),
            ]

            if (words.length > 1) {
                packetDesignations.push((words[0] + utils.capitalizeFirst(words[1])))
            }

            for (const _packetDesignation of packetDesignations) {
                if (this[_packetDesignation]) continue

                Object.defineProperty(this, _packetDesignation, {
                    get() {
                        return packet
                    }
                })
            }
        }
    }
}

export default Pkg