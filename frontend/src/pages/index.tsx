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
import { target } from '@/components/compass/dashboardCompassController'
import CountDown from '@/components/background/countDown'

const PHONE_MAX_WIDTH = 435

export default function Home() {
  const [rocketHeight, setRocketHeight] = useState(0)
  const [values, setValues] = useState(null)
  const [config, setConfig] = useState<null | OverviewConfig>(null)
  const [drawerOpen, setDrawerOpen] = useState(true)
  const [targetLatLng, setTargetLatLng] = useState<target | null>(null)
  const [isPhonePortrait, setIsPhonePortrait] = useState(false)
  const isAdminMode = useRouter().query.password === 'admin'
  const [time, setTime] = useState<number>(-1)

  const sharedRoomCode = 'sharedRoomCode'
  const updateMedia = () => {
    setIsPhonePortrait(window.innerWidth < PHONE_MAX_WIDTH)
  }

  useEffect(() => {
    updateMedia()
    window.addEventListener('resize', updateMedia)
    return () => window.removeEventListener('resize', updateMedia)
  })

  useEffect(() => {
    axios
      .get(`${backend}live/config`)
      .then((response) => {
        setConfig(response.data) // Assuming response.data is an object
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })

    setConfig(null)

    socket.on('connect', () => {
      console.log('connected', socket.id)
    })
    socket.on('live/config', (message) => {
      setConfig(message)
    })
    socket.on('live/broadcast-data-stream', (message) => {
      console.log(message)
      setValues(message)
    })
    socket.on('live/broadcast-data-stream-latlng', (message) => {
      console.log(message)
      setTargetLatLng(message)
    })
    socket.emit('joinRoom', sharedRoomCode)
    socket.on('countDown', (count) => {
      console.log('Count', count)
      setTime(count)
    })

    return () => {
      socket.removeAllListeners('connect')
      socket.removeAllListeners('countDown')
      socket.removeAllListeners('live/broadcast-data-stream')
      socket.removeAllListeners('live/broadcast-data-stream-latlng')
      socket.removeAllListeners('live/config')
    }
  }, [isAdminMode])

  const generateRoomCode = () => {
    const roomCode = Math.random().toString(36).substring(2, 10)
    console.log('room', roomCode)
    return roomCode
  }

  const commenceCountdown = () => {
    if (sharedRoomCode) {
      console.log(`Commencing countdown for room: ${sharedRoomCode}`)
      socket.emit('countDown', sharedRoomCode)
    } else {
      console.error('No room code available to commence countdown.')
    }
  }

  return (
    <div>
      <CountDown time={time} />
      {isAdminMode && (
        <div className="m-4 flex justify-center">
          <button
            className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-600"
            onClick={commenceCountdown}
          >
            Commence Countdown!
          </button>
        </div>
      )}
      <Background height={rocketHeight} />
      <div className="flex h-screen w-screen items-center justify-center">
        {config && (
          <Dashboard
            OverviewConfig={config}
            HudConfigs={values}
            isPhonePortrait={isPhonePortrait}
            drawerOpen={drawerOpen}
            targetLatLng={targetLatLng}
            setDrawerOpen={setDrawerOpen}
            target={targetLatLng}
          />
        )}
        {/* <Object isPhonePortrait={isPhonePortrait} drawerOpen={drawerOpen} /> */}
      </div>
    </div>
  )
}
