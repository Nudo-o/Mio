import * as MathUtils from "./math"
import * as ObjectUtils from "./object"
import * as ArrayUtils from "./array"
import * as StringUtils from "./string"
import * as GraphicsUtils from "./2d"

const utils = Object.assign({
    wait(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms))
    }
}, 
    MathUtils, ObjectUtils,
    ArrayUtils, StringUtils,
    GraphicsUtils
)

export default utils