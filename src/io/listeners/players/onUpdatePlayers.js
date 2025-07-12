import { players } from "../../../const"
import utils from "../../../utils"

const CHUNK_SIZE = 13

function onUpdatePlayers(data) {
    players.each((player) => {
        player.visible = false
    })

    const dataChunks = utils.toChunks(data, 13)

    for (const dataChunk of dataChunks) {
        const [ 
            sid, x, y, dir, 
            buildIndex, weaponIndex, weaponVariant, team, 
            isLeader, skinIndex, tailIndex, iconIndex,
            zIndex
        ] = dataChunk

        const player = players.get(sid)

        if (!player) continue

        player.updateRate = 0
        
        player.oldTickPosition.setTo(this.tickPosition)
        player.tickPosition.setTo(x, y)

        player.oldTickDir = player.currentTickDir
        player.currentTickDir = dir

        player.buildIndex = buildIndex
        player.weaponIndex = weaponIndex
        player.weaponVariant = weaponVariant
        player.team = team
        player.isLeader = isLeader
        player.skinIndex = skinIndex
        player.tailIndex = tailIndex
        player.iconIndex = iconIndex
        player.zIndex = zIndex
    }
}

export default onUpdatePlayers