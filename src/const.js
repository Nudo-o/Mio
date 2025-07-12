import { Player } from "./entities"
import { IO, Pkg } from "./io"
import { Players } from "./managers"
import { Camera, Renderer } from "./render"
import { UI } from "./ui"

export const WSSendProto = window.WebSocket.prototype.send

export const msgpack = window.msgpack

export const im = new Player({})

export const players = new Players()
export const pkg = new Pkg()
export const io = new IO()
export const ui = new UI()
export const camera = new Camera()
export const renderer = new Renderer()

