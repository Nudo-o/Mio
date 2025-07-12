import config from "../config.json"
import { GameName } from "./components"

const { nodes } = config

class UI {
    constructor() {
        this.#createBaseCss()

        const gameUI = document.querySelector(nodes.GAME_UI)

        if (!gameUI) {
            const waitGameUI = setInterval(() => {
                const gameUI = document.querySelector(nodes.GAME_UI)

                if (!gameUI) return

                this.#initNodes()
                clearInterval(waitGameUI)
            })
        } else {
            this.#initNodes()
        }
    }

    #createBaseCss() {
        const style = document.createElement("style")

        style.insertAdjacentHTML("beforeend", `
        .hidden {
            display: none !important;
        }
        `)

        document.head.appendChild(style)
    }

    #initNodes() {
        this[nodes.GAME_NAME] = new GameName()
    }
}

export default UI