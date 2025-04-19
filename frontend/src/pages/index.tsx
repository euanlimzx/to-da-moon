import Background from '@/components/background'
import Dashboard from '@/components/dashboard'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { socket } from '../socket'
import Object from '@/components/rocket-object'
import axios from 'axios'
import { backend } from '../socket'
import { OverviewConfig } from '@/types/HudTypes'
import { liveLaunchHudConfig } from '@/hudConfig'
import RoomHeader from '@/components/roomHeader'
import CountDown from '@/components/background/countDown'

const PHONE_MAX_WIDTH = 435

export default function Home() {
  const [rocketHeight, setRocketHeight] = useState(0)
  const [values, setValues] = useState([])
  const [config, setConfig] = useState<null | OverviewConfig>(null)
  const [drawerOpen, setDrawerOpen] = useState(true)
  const [roomCode, setRoomCode] = useState<string | null>(null)
  const [isPhonePortrait, setIsPhonePortrait] = useState(false)
  const isAdminMode = useRouter().query.password === 'admin'
  const [time, setTime] = useState<number>(-1)

  const updateMedia = () => {
    setIsPhonePortrait(window.innerWidth < PHONE_MAX_WIDTH)
  }



  useEffect(() => {
    updateMedia()
    window.addEventListener('resize', updateMedia)
    return () => window.removeEventListener('resize', updateMedia)
  })

  useEffect(() => {
    // axios
    //     .get(`${backend}/live/config`)
    //     .then((response) => {
    //         setConfig(response.data) // Assuming response.data is an object
    //     })
    //     .catch((error) => {
    //         console.error('Error fetching data:', error)
    //     })
    if (isAdminMode) {
      const roomCode = generateRoomCode();
      setRoomCode(roomCode);
    }

    setConfig(true)

    socket.on("connect", () => {
      console.log("connected", socket.id)
    })

    socket.on('live/broadcast-data-stream', (message) => {
      const val = Object.values(message)
      setValues(val)
    })
    socket.on('live/config', (message) => {
      setConfig(message)
    })
    socket.on('countDown', (count) => {
      console.log("Count",count)
      setTime(count)
    })

    return () => {
      socket.off('live/broadcast-data-stream')
      socket.off('live/update-config')
    }
  }, [isAdminMode])

  const generateRoomCode = () => {
    const roomCode = Math.random().toString(36).substring(2, 10);
    console.log("room",roomCode);
    return roomCode;
  }

  const commenceCountdown = () => {
    if (roomCode) {
        console.log(`Commencing countdown for room: ${roomCode}`);
        socket.emit('countDown', roomCode);
    } else {
        console.error('No room code available to commence countdown.');
    }
  };

  const handleRoomJoin = (roomCodeInput: string) => {
    //TODO: add validation to check if room code is valid
    setRoomCode(roomCodeInput)
    if (roomCodeInput) {
        socket.emit('joinRoom', roomCodeInput);
    }
  }

  return (
    <div>
      <Background height={rocketHeight} />
      <CountDown time={time} />
      <RoomHeader roomCode={roomCode} handleRoomJoin={handleRoomJoin} isAdminMode={isAdminMode} />
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
      <div className="flex h-screen w-screen items-center justify-center">
        {config && (
          <Dashboard
            OverviewConfig={config}
            HudConfigs={liveLaunchHudConfig}
            isPhonePortrait={isPhonePortrait}
            drawerOpen={drawerOpen}
            setDrawerOpen={setDrawerOpen}
          />
        )}

        <div className="absolute flex h-full w-full items-end">
          {/* no error handling here yet, but increasing the button past the array index will cause it to go out of bounds 

        that should not be an issue with the final web app since we are changing the gradient based on altitue -- we will never go past the end of the array
        */}
          <button
            onClick={() =>
              setRocketHeight((intialRocketHeight) => intialRocketHeight + 1)
            }
            className="bg-black"
          >
            Go higher
          </button>
        </div>
        <Object isPhonePortrait={isPhonePortrait} drawerOpen={drawerOpen} />
      </div>
    </div>
  )
}
