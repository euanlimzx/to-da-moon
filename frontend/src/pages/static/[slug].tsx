import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { socket } from '../../socket'
import Dashboard from '@/components/dashboard'
import Button from '@/components/button'
import { Gauge } from '@/components/gauge'

export default function Page() {
    const [values, setValues] = useState<string[]>([])
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    // Fetching the data and setting the state
    useEffect(() => {
        // Set up the socket listener to receive the data stream
        socket.on('static/receive-data-stream', (message: string[]) => {
            setValues(message) // Update state with the latest values
            console.log(message)
        })
        
        // anything error / finish causing stream to end
        socket.on('static/receive-data-stream-end', (message: string) => {
            if (message != 'Finished streaming data') {
                setError(message) // Update state with the error message
                console.log(message)
            }
        })
        // Clean up the socket listener on component unmount
        return () => {
            socket.off('static/receive-data-stream') // Unsubscribe to avoid memory leaks
            socket.off('static/receive-data-stream-end') // Unsubscribe to avoid memory leaks
        }
    }, [])

    // do we also need to handle when same data is requested again or this doesn't matter? 
    // Emit an event to get the data stream based on the slug in the URL
    const buttonFn = () => {
        setError(null)
        console.log(router.query.slug)
        socket.emit('static/get-data-stream', router.query.slug)
    }

    return (
        <Dashboard>
            <>
                <Button buttonFn={buttonFn} />
                {values.map((value) => {
                    return (
                        <Gauge
                            key={value}
                            value={parseInt(value)}
                            size="large"
                            showValue={true}
                        />
                    )
                })}
                {error && (
                    <div className="text-red-500 flex justify-center align-center">
                        {error}
                    </div>
                )}
            </>
        </Dashboard>
    )
}
