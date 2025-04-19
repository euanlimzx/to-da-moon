import Background from '@/components/background'
import Dashboard from '@/components/dashboard'
import { useEffect, useState } from 'react'
import { socket } from '../socket'
import Object from '@/components/rocket-object'
import axios from 'axios'
import { backend } from '../socket'
import { OverviewConfig } from '@/types/HudTypes'
import { liveLaunchHudConfig } from '@/hudConfig'
import { target } from '@/components/compass/dashboardCompassController'

const PHONE_MAX_WIDTH = 435

export default function Home() {
  const [rocketHeight, setRocketHeight] = useState(0)
  const [values, setValues] = useState([])
  const [config, setConfig] = useState<null | OverviewConfig>(null)
  const [drawerOpen, setDrawerOpen] = useState(true)
  const [targetLatLng, setTargetLatLng] = useState<target | null>(null)

  const [isPhonePortrait, setIsPhonePortrait] = useState(false)

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
        setConfig(null)
      })
    socket.on('live/config', (message) => {
      setConfig(message)
    })
    socket.on('live/broadcast-data-stream', (message) => {
      setValues(message)
    })
    socket.on('live/broadcast-data-stream-latlng', (message) => {
      console.log(message)
      setTargetLatLng(message)
    })

    return () => {
      socket.off('live/broadcast-data-stream')
      socket.off('live/update-config')
    }
  }, [])

  return (
    <div>
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
        <Object isPhonePortrait={isPhonePortrait} drawerOpen={drawerOpen} />
      </div>
    </div>
  )
}
