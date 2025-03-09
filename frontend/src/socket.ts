import { io } from 'socket.io-client'

const URL = 'http://localhost:3000' //todo @euan add in server environment
console.log('Socket server is, ', URL)
export const socket = io(URL, {
    autoConnect: true,
})
