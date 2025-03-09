import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { socket } from '../../socket'
import Dashboard from '@/components/dashboard'

export default function Page() {
    const [isConnected, setIsConnected] = useState(socket.connected)
    console.log(socket.connected)

    const router = useRouter()
    useEffect(() => {
        socket.on('static/receive-data-stream', (message: string[]) =>
            console.log(message)
        )
        return () => {
            socket.on('static/receive-data-stream', (message: string[]) =>
                console.log(message)
            )
        }
    }, [])
    const buttonFn = () => {
        console.log(router.query.slug)
        socket.emit('static/get-data-stream', router.query.slug)
    }
    return <Dashboard buttonFn={buttonFn} />
}

// ;[
//     '1713734909236',
//     '482.60169',
//     '586.3529',
//     '-4.77855',
//     '-61.87105',
//     '1.03304',
//     '339.3728',
//     '34.07698',
//     '98.41807',
//     '3557.51375',
//     '13.36228',
// ]
