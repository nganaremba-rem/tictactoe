import { Socket, io } from 'socket.io-client'

let socket: Socket

function initializeSocket(): Socket {
  socket = io('http://192.168.0.101:3000')

  socket.on('connect', () => {
    console.log('Connected to server')
  })

  return socket
}

const getSocket = () => socket

export { initializeSocket, getSocket }
