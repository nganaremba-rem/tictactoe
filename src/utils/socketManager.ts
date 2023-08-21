import { Socket, io } from 'socket.io-client'

let socket: Socket

function initializeSocket(): Socket {
  socket = io('https://tictactoe-server-react-native.onrender.com')

  socket.on('connect', () => {
    console.log('Connected to server')
  })

  return socket
}

const getSocket = () => socket

export { initializeSocket, getSocket }
