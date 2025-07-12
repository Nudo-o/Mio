import { randInt } from "../math"

function getRandArrayItem(array) {
    if (!(array instanceof Array)) return array

    return array[randInt(array.length - 1)]
}

export default getRandArrayItem