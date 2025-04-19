// pages/orientation.tsx
import { useEffect, useState } from 'react'
import DashboardCompass from './dashboardCompass'

// TypeScript declaration for DeviceOrientationEvent.requestPermission
declare global {
  interface DeviceOrientationEvent {
    requestPermission?: () => Promise<string>
  }
}

export interface target {
  latitude?: number
  longitude?: number
}

const DashboardCompassController = ({ target }: { target: target }) => {
  if (!target || !target.latitude || !target.longitude) {
    return <p>waiting for gps data...</p>
  }
  const [device, setDevice] = useState<{
    latitude: number
    longitude: number
  } | null>(null)

  const [orientation, setOrientation] = useState<{
    alpha: number | null
    beta: number | null
    gamma: number | null
  }>({ alpha: null, beta: null, gamma: null })

  const [permissionGranted, setPermissionGranted] = useState(false)
  const [locationError, setLocationError] = useState<string | null>(null)

  const enableSensors = async () => {
    // Handle orientation permission
    if (
      typeof DeviceOrientationEvent !== 'undefined' &&
      typeof (DeviceOrientationEvent as any).requestPermission === 'function'
    ) {
      try {
        const permission = await (
          DeviceOrientationEvent as any
        ).requestPermission()
        if (permission === 'granted') {
          window.addEventListener('deviceorientation', handleOrientation, true)
          setPermissionGranted(true)
        } else {
          setLocationError(`Orientation permission not granted`)
          console.error('Orientation permission not granted')
        }
      } catch (error) {
        console.error('Orientation permission error:', error)
        setLocationError(`Error getting location: ${error.message}`)
      }
    } else {
      // Non-iOS or older versions
      window.addEventListener('deviceorientation', handleOrientation, true)
      setPermissionGranted(true)
    }

    // Handle geolocation
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setDevice({ latitude, longitude })
          setLocationError(null)
        },
        (error) => {
          setLocationError(`Error getting location: ${error.message}`)
          console.error('Error getting location:', error)
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 10000,
        }
      )
    } else {
      setLocationError('Geolocation not supported in your browser')
    }
  }

  const handleOrientation = (event: DeviceOrientationEvent) => {
    setOrientation({
      alpha:
        event.webkitCompassHeading !== undefined
          ? event.webkitCompassHeading
          : event.alpha,
      beta: event.beta,
      gamma: event.gamma,
    })
  }
  // Set up continuous location watching
  useEffect(() => {
    let watchId: number | null = null

    if ('geolocation' in navigator && permissionGranted) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setDevice({ latitude, longitude })
          setLocationError(null)
        },
        (error) => {
          setLocationError(`Error watching location: ${error.message}`)
          console.error('Error watching location:', error)
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 10000,
        }
      )
    }

    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId)
      }
    }
  }, [permissionGranted])
  // Clean up orientation listener
  useEffect(() => {
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation)
    }
  }, [])

  return (
    <>
      {!permissionGranted && (
        <button
          onClick={enableSensors}
          className="w-full rounded-md bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 py-4 font-semibold text-white shadow-md transition duration-300 hover:from-blue-600 hover:to-purple-700"
        >
          TRACK ROCKET
        </button>
      )}
      {locationError && (
        <>
          <div className="font-medium text-red-600">
            {locationError} Please refresh your browser and try again.
          </div>
        </>
      )}

      {permissionGranted && !locationError && (
        <DashboardCompass
          deviceLat={device?.latitude}
          deviceLng={device?.longitude}
          targetLat={target.latitude}
          targetLng={target.longitude}
          deviceOrientation={orientation.alpha}
        />
      )}
    </>
  )
}

export default DashboardCompassController
