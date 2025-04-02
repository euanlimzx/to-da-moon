import Background from '@/components/background'
import Dashboard from '@/components/dashboard'
import { useEffect, useState } from 'react'
import { socket } from '../socket'
import Button from '@/components/button'
import { Gauge } from '@/components/gauge'

export default function Home() {
    const [rocketHeight, setRocketHeight] = useState(0)
    const [values, setValues] = useState([])

    useEffect(() => {
        socket.on('live/broadcast-data-stream', (message) => {
            const val = Object.values(message)
            setValues(val)
            console.log(message)
        })
        return () => {
            socket.on('live/broadcast-data-stream', (message) =>
                console.log(message)
            )
        }
    }, [])

    return (
        <>
            <Background height={rocketHeight} />
            <div className="flex h-screen w-screen items-center justify-center">
                <Dashboard>
                    <>
                        {/* no error handling here yet, but increasing the button past the array index will cause it to go out of bounds 
            
                        that should not be an issue with the final web app since we are changing the gradient based on altitue -- we will never go past the end of the array
                        */}
                        <button
                            onClick={() =>
                                setRocketHeight(
                                    (intialRocketHeight) =>
                                        intialRocketHeight + 1
                                )
                            }
                            className="bg-black"
                        >
                            Go higher
                        </button>
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
                    </>
                </Dashboard>
            </div>
        </>
    )
}
