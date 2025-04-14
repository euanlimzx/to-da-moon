// pages/orientation.tsx

import { useEffect, useState } from 'react'

const OrientationPage = () => {
    const [location, setLocation] = useState<{
        latitude: number
        longitude: number
    } | null>(null)
    const [orientation, setOrientation] = useState<{
        alpha: number | null
        beta: number | null
        gamma: number | null
    }>({ alpha: null, beta: null, gamma: null })

    const [permissionGranted, setPermissionGranted] = useState(false)

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
            typeof DeviceOrientationEvent.requestPermission === 'function'
        ) {
            try {
                const permission =
                    await DeviceOrientationEvent.requestPermission()
                if (permission === 'granted') {
                    window.addEventListener(
                        'deviceorientation',
                        handleOrientation
                    )
                    setPermissionGranted(true)
                }
            } catch (error) {
                console.error('Permission error:', error)
            }
        } else {
            // Non-iOS devices
            window.addEventListener('deviceorientation', handleOrientation)
            setPermissionGranted(true)
        }
    }

    // Cleanup with useEffect

    useEffect(() => {
        let watchId = null
        // Geolocation
        if ('geolocation' in navigator) {
            watchId = navigator.geolocation.watchPosition(
                (position) => {
                    const { latitude, longitude } = position.coords
                    setLocation({ latitude, longitude })
                },
                (error) => {
                    console.error('Error watching location:', error)
                },
                {
                    enableHighAccuracy: true,
                    maximumAge: 0,
                    timeout: 10000,
                }
            )
        } else {
            console.warn('Geolocation not supported')
        }

        return () => {
            if (watchId) {
                navigator.geolocation.clearWatch(watchId)
            }
        }
    }, [])

    useEffect(() => {
        return () => {
            window.removeEventListener('deviceorientation', handleOrientation)
        }
    }, []) // Empty deps: runs on unmount

    return (
        <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
            <h1>Device Location & Orientation</h1>

            <section>
                <h2>Location</h2>
                {location ? (
                    <p>
                        Latitude: {location.latitude} <br />
                        Longitude: {location.longitude}
                    </p>
                ) : (
                    <p>Getting location...</p>
                )}
            </section>
            {!permissionGranted && (
                <button onClick={enableOrientation}>Enable Orientation</button>
            )}
            <section>
                <h2>Orientation</h2>
                <p>Alpha (Z - compass): {orientation.alpha ?? 'N/A'}</p>
                <p>Beta (X - front/back tilt): {orientation.beta ?? 'N/A'}</p>
                <p>Gamma (Y - left/right tilt): {orientation.gamma ?? 'N/A'}</p>
            </section>
        </div>
    )
}

export default OrientationPage
