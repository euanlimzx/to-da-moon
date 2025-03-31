import io from 'socket.io-client'
export const socket = io(
    process.env.NEXT_PUBLIC_WEBSOCKET_DOMAIN || 'http://localhost:3000',
    { autoConnect: true }
)
