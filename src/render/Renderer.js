import { camera, im, players } from "../const"

class Renderer {
    constructor() {
        this.renders = new Map()

        this.nowUpdate = null
        this.lastUpdate = this.nowUpdate

        this.delta = 0

        this.init()
    }

    addRender(renderKey, renderFunc) {
        if (typeof renderKey !== 'string') return
        if (!(renderFunc instanceof Function)) return

        if (!this.renders.has(renderKey)) {
            this.renders.set(renderKey, new Map())
        }

        const rendersChunk = this.renders.get(renderKey)

        rendersChunk.set(rendersChunk.size + 1, renderFunc)
    }

    #updateAll() {
        camera.update()
        players.update()
    }

    updateFrame() {
        this.nowUpdate = Date.now()
        this.delta = this.nowUpdate - this.lastUpdate
        this.lastUpdate = this.nowUpdate

        requestAnimationFrame(this.updateFrame.bind(this))

        if (im.alive) {
            this.#updateAll()
        }

        this.renders.forEach((rendersChunk) => {
            if (!rendersChunk.size) return

            rendersChunk.forEach((render) => {
                render()
            })
        })
    }

    init() {
        this.updateFrame()
    }
}

export default Renderer