import Entities from "./Entities"

class Players extends Entities {
    constructor() {
        super()
    }

    update() {
        this.interpolateEntities()
    }
}

export default Players