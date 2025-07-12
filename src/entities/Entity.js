import { camera } from "../const"
import utils from "../utils"
import { Point } from "../utils/2d"

class Entity extends utils.Point {
    constructor({ id, sid, x, y, dir, health, maxHealth, scale }) {
        super(x, y)

        this.id = id
        this.sid = sid
        this.dir = dir
        this.health = health
        this.maxHealth = maxHealth
        this.scale = scale
        
        this.currentTickDir = this.dir
        this.oldTickDir = this.dir
        
        this._updateRate = 0
        this._updateTime = 0
        this._oldUpdateTime = 0

        this.tickPosition = new Point(this.x, this.y)
        this.oldTickPosition = new Point(this.x, this.y)
        
        this.movement = {
            angle: 0,
            speed: 0
        }
    }

    get render() {
        return {
            x: this.x - camera.xOffset,
            y: this.y - camera.yOffset
        }
    }
}

export default Entity