import utils from "../../utils"
import UINode from "../UINode"

class GameName extends UINode {
    constructor() {
        super("#gameName")

        this.changeGameName = {
            gameNames: [],
            interval: null,
            index: 0
        }
    }

    setGameName(_gameName) {
        this.text = _gameName
    }

    setIntervalGameName(changeSpeed, ...gameNames) {
        if (typeof changeSpeed !== 'number' || !gameNames?.length) return false

        this.changeGameName.gameNames = utils.isArray(gameNames[0]) ? gameNames[0] : gameNames

        this.changeGameName.interval = setInterval(() => {
            this.#intervalChangeGameName()
        }, changeSpeed)

        return {
            delete: () => {
                clearInterval(this.changeGameName.interval)

                this.changeGameName = {
                    gameNames: [],
                    inverval: null,
                    index: 0
                }
            }
        }
    }

    #intervalChangeGameName() {
        if (this.changeGameName.index >= this.changeGameName.gameNames.length) {
            this.changeGameName.index = 0
        }

        const gameName = this.changeGameName.gameNames[this.changeGameName.index]

        this.setGameName(gameName)

        this.changeGameName.index += 1
    }
}

export default GameName