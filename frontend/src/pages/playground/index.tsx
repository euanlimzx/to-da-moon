// pages/orientation.tsx
import { useEffect, useState } from 'react'
import ArrowToTarget from '@/components/compass'

// TypeScript declaration for DeviceOrientationEvent.requestPermission
declare global {
  interface DeviceOrientationEvent {
    requestPermission?: () => Promise<string>
  }
}

const OrientationPage = () => {
  const [device, setDevice] = useState<{
    latitude: number
    longitude: number
  } | null>(null)

  const [orientation, setOrientation] = useState<{
    alpha: number | null
    beta: number | null
    gamma: number | null
  }>({ alpha: null, beta: null, gamma: null })

  const [target, setTarget] = useState<{
    latitude: number | null
    longitude: number | null
  }>({
    latitude: null,
    longitude: null,
  })

  const [permissionGranted, setPermissionGranted] = useState(false)
  const [locationError, setLocationError] = useState<string | null>(null)

  const handleOrientation = (event: DeviceOrientationEvent) => {
    setOrientation({
      alpha: event.alpha,
      beta: event.beta,
      gamma: event.gamma,
    })
  }

  // User-triggered function to request permission and add listener
  const enableOrientation = async () => {
    if (
      typeof DeviceOrientationEvent !== 'undefined' &&
      typeof (DeviceOrientationEvent as any).requestPermission === 'function'
    ) {
      try {
        // iOS 13+ requires permission
        const permission = await (
          DeviceOrientationEvent as any
        ).requestPermission()
        if (permission === 'granted') {
          window.addEventListener('deviceorientation', handleOrientation)
          setPermissionGranted(true)
        } else {
          console.error('Permission not granted')
        }
      } catch (error) {
        console.error('Permission error:', error)
      }
    } else {
      // Non-iOS devices or older iOS versions
      window.addEventListener('deviceorientation', handleOrientation)
      setPermissionGranted(true)
    }
  }

  // Request geolocation
  const enableLocation = () => {
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

  // Allow user to set a custom target
  const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setTarget((prev) => ({
      ...prev,
      [name]: parseFloat(value) || null,
    }))
  }

  return (
    <div
      style={{
        padding: '2rem',
        fontFamily: 'sans-serif',
        maxWidth: '600px',
        margin: '0 auto',
      }}
    >
      <h1>Device Location & Orientation</h1>

      <section style={{ marginBottom: '2rem' }}>
        <h2>Location</h2>
        {locationError && <p style={{ color: 'red' }}>{locationError}</p>}

        {!device && (
          <button
            onClick={enableLocation}
            style={{ padding: '0.5rem 1rem', marginBottom: '1rem' }}
          >
            Get My Location
          </button>
        )}

        {device ? (
          <p>
            Latitude: {device.latitude.toFixed(6)} <br />
            Longitude: {device.longitude.toFixed(6)}
          </p>
        ) : (
          <p>Location not available</p>
        )}
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>Orientation</h2>
        {!permissionGranted && (
          <button
            onClick={enableOrientation}
            style={{ padding: '0.5rem 1rem', marginBottom: '1rem' }}
          >
            Enable Orientation
          </button>
        )}

        {permissionGranted ? (
          <div>
            <p>
              Alpha (Z - compass):{' '}
              {orientation.alpha !== null
                ? orientation.alpha.toFixed(1) + '°'
                : 'N/A'}
            </p>
            <p>
              Beta (X - front/back tilt):{' '}
              {orientation.beta !== null
                ? orientation.beta.toFixed(1) + '°'
                : 'N/A'}
            </p>
            <p>
              Gamma (Y - left/right tilt):{' '}
              {orientation.gamma !== null
                ? orientation.gamma.toFixed(1) + '°'
                : 'N/A'}
            </p>
          </div>
        ) : (
          <p>Orientation data not available. Please enable orientation.</p>
        )}
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>Target Location</h2>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            marginBottom: '1rem',
          }}
        >
          <label>
            Target Latitude:
            <input
              type="number"
              name="latitude"
              value={target.latitude || ''}
              onChange={handleTargetChange}
              step="0.000001"
              style={{ marginLeft: '0.5rem' }}
            />
          </label>
          <label>
            Target Longitude:
            <input
              type="number"
              name="longitude"
              value={target.longitude || ''}
              onChange={handleTargetChange}
              step="0.000001"
              style={{ marginLeft: '0.5rem' }}
            />
          </label>
        </div>
      </section>

      <section
        style={{
          marginBottom: '2rem',
          border: '1px solid #ccc',
          padding: '1rem',
          borderRadius: '8px',
        }}
      >
        <h2>Direction Arrow</h2>
        <ArrowToTarget
          deviceLat={device?.latitude}
          deviceLng={device?.longitude}
          targetLat={target.latitude}
          targetLng={target.longitude}
          deviceOrientation={orientation.alpha}
        />
      </section>
    </div>
  )
}

export default OrientationPage
