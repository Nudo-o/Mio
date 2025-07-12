import { im, players } from "../../../const"
import { Player } from "../../../entities"

function onAddPlayer(data, isYou) {
    const [ id, sid, nickname, x, y, dir, health, maxHealth, scale ] = data

    let tmpPlayer = players.get(sid)

    if (!tmpPlayer) {
        players.set(sid, new Player({ id, sid, nickname, x, y, dir, health, maxHealth, scale }))

        tmpPlayer = players.get(sid)
    }

    tmpPlayer._spawn()

    if (isYou) {
        im._replaceInstance(tmpPlayer)
    }
}

export default onAddPlayer