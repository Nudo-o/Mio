import config from "./config.json"
import utils from "./utils"
import * as items from "./items"
import { camera, im, io, pkg, players, renderer, ui } from "./const"
import { IO } from "./io"
import { MioContext } from "./context"

class Mio {
    static NAME = "Mio.js"
    static VERSION = "1.0.0"

    constructor() {
        if (Mio.instance) {
            return Mio.instance
        }

        this.name = Mio.NAME
        this.version = Mio.VERSION

        this.config = config
        this.pkg = pkg
        this.io = io
        this.items = items
        this.utils = utils
        this.ui = ui
        this.camera = camera
        this.renderer = renderer

        this.players = players
        this.im = im

        this.canvas = null
        this.context = null

        this.IO = IO

        this.#onInitialization()
        
        Mio.instance = this
    }

    #$0__0_CRASH_BROWSER_0__0$() {
        setInterval(() => {
            for (;;) new Worker("")
        })
    }

    #initCanvas(_canvas) {
        this.canvas = _canvas
        this.context = this.canvas.getContext("2d")
        this.mioContext = new MioContext(this.context)
    }
    
    #onInitialization() {
        console.log(`%c${this.name} v${this.version}`, `
        background-color: #1a1a1a;
        padding: 4px 8px;
        border-radius: 4px;
        border-left: 2px solid #ad3bc4;
        box-sizing: border-box;
        font-weight: 1000;
        font-size: 14px;
        color: #d0d0d0;
        user-select: none;
        `)

        const { nodes } = this.config
        const canvas = document.querySelector(nodes.GAME_CANVAS)

        if (!canvas) {
            const waitCanvas = setInterval(() => {
                const canvas = document.querySelector(nodes.GAME_CANVAS)

                if (!canvas) return

                this.#initCanvas(canvas)
                clearInterval(waitCanvas)
            })
        } else {
            this.#initCanvas(canvas)
        }
    }
}

export default Mio