import Background from '@/components/background'
import Dashboard from '@/components/dashboard'
import { useEffect, useState } from 'react'
import { socket } from '../socket'
import Object from '@/components/rocket-object'
import axios from 'axios'
import { backend } from '../socket'
import { OverviewConfig } from '@/types/HudTypes'
import { liveLaunchHudConfig } from '@/hudConfig'

export default function Home() {
    const [rocketHeight, setRocketHeight] = useState(0)
    const [values, setValues] = useState([])
    const [config, setConfig] = useState<null | OverviewConfig>(null)

    useEffect(() => {
        // axios
        //     .get(`${backend}/live/config`)
        //     .then((response) => {
        //         setConfig(response.data) // Assuming response.data is an object
        //     })
        //     .catch((error) => {
        //         console.error('Error fetching data:', error)
        //     })
        setConfig(true)
        socket.on('live/broadcast-data-stream', (message) => {
            const val = Object.values(message)
            setValues(val)
        })
        socket.on('live/config', (message) => {
            setConfig(message)
        })
        return () => {
            socket.off('live/broadcast-data-stream')
            socket.off('live/update-config')
        }
    }, [])

    return (
        <>
            <Background height={rocketHeight} />
            <div className="flex h-screen w-screen items-center justify-center">
                {config && <Dashboard OverviewConfig={config} HudConfigs={liveLaunchHudConfig}/>}

                <div className="absolute flex h-full w-full items-end">
                    {/* no error handling here yet, but increasing the button past the array index will cause it to go out of bounds 
            
                        that should not be an issue with the final web app since we are changing the gradient based on altitue -- we will never go past the end of the array
                        */}
                    <button
                        onClick={() =>
                            setRocketHeight(
                                (intialRocketHeight) => intialRocketHeight + 1
                            )
                        }
                        className="bg-black"
                    >
                        Go higher
                    </button>
                </div>
                <Object />
            </div>
        </>
    )
}
