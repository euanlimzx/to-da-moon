import io from 'socket.io-client'
export const backend =
    process.env.NEXT_PUBLIC_WEBSOCKET_DOMAIN || 'http://localhost:3000'
export const socket = io(backend, { autoConnect: true })
