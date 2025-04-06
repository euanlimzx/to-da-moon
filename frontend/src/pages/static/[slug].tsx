import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { socket } from '../../socket'
import Dashboard from '@/components/dashboard'
import Button from '@/components/button'
import LinearProgress from '@/components/dashboard/linearProgress'
const LinearGraph = dynamic(
    () => import('@/components/dashboard/linearGraph'),
    { ssr: false }
)
import type { Config } from '@/components/dashboard/overview'
import { Gauge } from '@/components/gauge'

export default function Page() {
    const [values, setValues] = useState<string[]>([])
    const [error, setError] = useState<string | null>(null)
    const [data, setData] = useState<{ [key: string]: number }[]>([]) //this is a placeholder for testing, we eventually want to have multiple data streams
    const [config, setConfig] = useState<null | Config>(null)
    const router = useRouter()

    // Fetching the data and setting the state
    useEffect(() => {
        // Set up the socket listener to receive the data stream
        socket.on('static/receive-data-stream', (message: string[]) => {
            setValues(message) // Update state with the latest values
            setData((prevData) => {
                const newData = [
                    ...prevData,
                    { 'Fuel-Tank': parseInt(message[1]) }, //todo @euan we should probably have a const files for column values
                ]
                console.log(newData)
                if (newData.length > 30) {
                    newData.shift()
                }
                return newData
            })
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
        socket.emit('static/get-data-stream', router.query.slug)
    }

    return (
        <>
            <Button buttonFn={buttonFn} />
            <LinearGraph data={data} />
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
                <div className="align-center flex justify-center text-red-500">
                    {error}
                </div>
            )}
        </>
    )
}
