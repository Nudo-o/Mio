import Mio from "../../Mio"

function noMooMooIo() {
    throw new Error(`
    ${Mio.NAME} created to create scripts in the game moomoo.io.
    ${Mio.NAME} will not work in ${location.host}.
    `)
}

export default noMooMooIo