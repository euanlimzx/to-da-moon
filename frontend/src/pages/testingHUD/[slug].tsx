import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { socket } from '../../socket'
import Dashboard from '@/components/dashboard'
import Button from '@/components/button'
const LinearGraph = dynamic(
    () => import('@/components/dashboard/linearGraph'),
    { ssr: false }
)
import { Input } from 'antd';
import axios from 'axios'
import { backend } from '../../socket'
import { liveLaunchHudConfig } from '@/hudConfig'
import { OverviewConfig, HudConfig } from '@/types/HudTypes'
import { Gauge } from '@/components/gauge'
import RoomHeader from '@/components/roomHeader'
import CountDown from '@/components/background/countDown'

//need a way to parse all the values from the csv file and create a mapping
export default function Page() {
    const [values, setValues] = useState<string[]>([])
    const [error, setError] = useState<string | null>(null)
    const [data, setData] = useState<{ [key: string]: number }[]>([]) //this is a placeholder for testing, we eventually want to have multiple data streams
    const [Overviewconfig, setViewConfig] = useState<null | OverviewConfig>(null)
    const [HudConfigs, setHudConfigs] = useState<HudConfig[]>(liveLaunchHudConfig)
    const [roomCode, setRoomCode] = useState<string | null>(null);
    const [time, setTime] = useState<number>(-1);
    const router = useRouter()

    const isAdminMode = router.query.password === 'admin';
    
    useEffect(() => {

        axios
            .get(`${backend}/live/config`)
            .then((response) => {
                setViewConfig(response.data) // Assuming response.data is an object
            })
            .catch((error) => {
                console.error('Error fetching data:', error)
            })
        
        // Set up the socket listener to receive the data stream
        socket.on("connect", () => {
            console.log("connected", socket.id)
        })
        socket.on('static/receive-data-stream', (message: string[]) => {
            setValues(message) // Update state with the latest values
            console.log(message)

            // Update HUD configs with new values
            setHudConfigs(prevConfigs => {
                const updatedConfigs = prevConfigs.map(config => {
                    const columnIndex = config.dataCol;
                    if (message[columnIndex] !== undefined) {
                        const parsedValue = parseInt(message[columnIndex]);
                        const newValue = isNaN(parsedValue) ? 0 : parsedValue;
                        return { 
                            ...config, 
                            value: newValue
                        };
                    }
                    return config;
                });
                return updatedConfigs;
            });
            
            setData((prevData) => {
                const newData = [
                    ...prevData,
                    { 'Fuel-Tank': parseInt(message[1]) }, //todo @euan we should probably have a const files for column values
                ]
                if (newData.length > 30) {
                    newData.shift()
                }
                return newData
            })
        })
        
        if (isAdminMode) {
            const roomCode = generateRoomCode();
            setRoomCode(roomCode);
        }
        // anything error / finish causing stream to end
        socket.on('static/receive-data-stream-end', (message: string) => {
            if (message != 'Finished streaming data') {
                setError(message) // Update state with the error message
                console.log(message)
            }
        })

        socket.on('countDown', (count) => {
            console.log("Count",count)
            setTime(count)
        })
        // Clean up the socket listener on component unmount
        return () => {
            socket.off('static/receive-data-stream') // Unsubscribe to avoid memory leaks
            socket.off('static/receive-data-stream-end') // Unsubscribe to avoid memory leaks
        }
        
    }, [isAdminMode])

    useEffect(() =>{

    }, [roomCode])

    // do we also need to handle when same data is requested again or this doesn't matter?
    // Emit an event to get the data stream based on the slug in the URL
    const buttonFn = () => {
        setError(null)
        socket.emit('static/get-data-stream', router.query.slug)
    }

    const handleRoomJoin = (roomCodeInput: string) => {
        //TODO: add validation to check if room code is valid
        setRoomCode(roomCodeInput)
        if (roomCodeInput) {
            socket.emit('joinRoom', roomCodeInput);
        }
    }
    
    const commenceCountdown = () => {
        if (roomCode) {
            console.log(`Commencing countdown for room: ${roomCode}`);
            socket.emit('countDown', roomCode);
        } else {
            console.error('No room code available to commence countdown.');
        }
    };

    const generateRoomCode = () => {
        const roomCode = Math.random().toString(36).substring(2, 10);
        console.log("room",roomCode);
        return roomCode;
    }

    return (
        <>
            <CountDown time={time}/>
            <RoomHeader roomCode={roomCode} handleRoomJoin={handleRoomJoin} isAdminMode={isAdminMode}/>
            {isAdminMode && (
                <div className="flex justify-center mt-4">
                    <button
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                        onClick={commenceCountdown}
                    >
                        Commence Countdown!
                    </button>
                </div>
            )}
            <Button buttonFn={buttonFn} />
            <LinearGraph data={data} dataName={"Fuel-Tank"}/>
            {Overviewconfig && <Dashboard isPhonePortrait={false} OverviewConfig={Overviewconfig} HudConfigs={HudConfigs}/>}
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
