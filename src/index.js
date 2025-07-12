import { msgpack, io, WSSendProto } from "./const"
import Mio from "./Mio"
import utils from "./utils"
import { noMooMooIo, undefinedMsgpack } from "./utils/errors"

WebSocket.prototype.send = new Proxy(WSSendProto, {
    apply(target, _this, args) {
        if (!io.isCreated) {
            if (!/moomoo\.io/.test(_this.url)) noMooMooIo()

            io.setSocket(_this)
        }

        io._updatePPS()

        if (io.ppsLimit.state) {
            if (io.debug.pps.length >= io.ppsLimit.limit) return
        }

        return target.apply(_this, args)
    } 
})

if (utils.isObject(msgpack)) {
    if (!/moomoo\.io/.test(location?.href)) noMooMooIo()

    if (!window) {
        (globalThis || self).Mio = new Mio()
    } else {
        window.Mio = new Mio()
    }
} else {
    undefinedMsgpack()
}

