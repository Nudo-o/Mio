import { renderer } from "../const"
import utils from "../utils"
import { Vector } from "../utils/2d"
import Manager from "./Manager"

class Entities extends Manager {
    constructor() {
        super()
    }

    hideAllEntitites() {
        this.each((entity) => {
            entity.visible = false
        })
    }

    eachVisible(callback) {
        this.each((entity) => {
            if (!entity.visible || !entity.active) return

            callback(entity)
        })
    }

    interpolateEntities() {
        const lastTime = renderer.nowUpdate - (1000 / (window.config?.serverUpdateRate || 10))

        this.eachVisible((player) => {
            player.dt += renderer.delta

            const total = player.updateTime - player.oldUpdateTime
            const fraction = lastTime - player.oldUpdateTime
            const ratio = total / fraction
            const rate = 170
            const tmpRate = Math.min(1.7, player.updateRate / rate)
            const different = player.currentTickPosition.different(player.oldTickPosition)

            player.setTo(
                player.oldTickPosition.x + (different.x * tmpRate), 
                player.oldTickPosition.y + (different.y * tmpRate)
            )

            player.dir = utils.lerpAngle(player.currentTickDir, player.oldTickDir, Math.min(1.2, ratio))
        })
    }
}

export default Entities