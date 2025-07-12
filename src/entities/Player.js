import Entity from "./Entity"

class Player extends Entity {
    constructor({ id, sid, nickname, x, y, dir, health, maxHealth, scale }) {
        super({ id, sid, x, y, dir, health, maxHealth, scale })

        this.nickname = nickname

        this._spawn = function() {
            this.buildIndex = -1
            this.weaponIndex = 0
            this.weaponVariant = 1
            this.team = ""
            this.isLeader = false
            this.skinIndex = 0
            this.tailIndex = 0
            this.iconIndex = -1
            this.zIndex = -1

            this.alive = true
            this.visible = true
        }
        
        this.visible = false
        this.alive = false
    }

    kill() {
        this.alive = false
        this.visible = false
    }

    _replaceInstance(_player) {
        for (const key in _player) {
            console.log(key)

            this[key] = _player[key]
        }
    }
}

export default Player