import Mio from "../../Mio"

function undefinedMsgpack() {
    throw new Error(`
    For full-fledged work ${Mio.NAME} v${Mio.VERSION} is needed msgpack.js.
    Use this: https://greasyfork.org/scripts/423602-msgpack/code/msgpack.js
    `)
}

export default undefinedMsgpack