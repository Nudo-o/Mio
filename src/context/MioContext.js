import { Text, Tracer } from "./models"

class MioContext {
    constructor(context) {
        this.context = context
    }

    createTracer(style) {
        const tracer = new Tracer(this.context, style)

        return tracer
    }

    createText(style) {
        const text = new Text(this.context, style)

        return text
    }
}

export default MioContext