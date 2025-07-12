import utils from "../utils"
import config from "../config.json"
import { im, renderer } from "../const"

class Camera extends utils.Point {
    constructor() {
        super(0, 0, 0, 0)

        this.distance = 0
        this.angle = 0
        this.speed = 0

        this.xOffset = 0
        this.yOffset = 0
    }

    follow(target) {
        this.distance = this.distanceTo(target)
        this.angle = this.angleTo(target)
        this.speed = Math.min(this.distance * .01 * renderer.delta, this.distance)

        if (this.distance > .05) {
            this.x += this.speed * Math.cos(this.angle)
            this.y += this.speed * Math.sin(this.angle)

            return
        }

        this.setTo(target.x, target.y)
    }

    update() {
        if (im.alive) {
            this.follow(im)
        } else {
            this.setTo(
                (window.config?.mapScale / 2) || 0,
                (window.config?.mapScale / 2) || 0
            )
        }

        this.xOffset = this.x - config.maxScreenWidth / 2
        this.yOffset = this.y - config.maxScreenHeight / 2
    }
}

export default Camera