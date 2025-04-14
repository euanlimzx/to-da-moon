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

        // Device Orientation
        const handleOrientation = (event: DeviceOrientationEvent) => {
            setOrientation({
                alpha: event.alpha,
                beta: event.beta,
                gamma: event.gamma,
            })
        }

        if (typeof window !== 'undefined' && window.DeviceOrientationEvent) {
            if (
                typeof DeviceOrientationEvent.requestPermission === 'function'
            ) {
                // For iOS 13+ devices
                DeviceOrientationEvent.requestPermission()
                    .then((response) => {
                        if (response === 'granted') {
                            window.addEventListener(
                                'deviceorientation',
                                handleOrientation
                            )
                        }
                    })
                    .catch(console.error)
            } else {
                window.addEventListener('deviceorientation', handleOrientation)
            }
        } else {
            console.warn('DeviceOrientation not supported')
        }

        return () => {
            window.removeEventListener('deviceorientation', handleOrientation)
            return () => {
                if (watchId) {
                    navigator.geolocation.clearWatch(watchId)
                }

                window.removeEventListener(
                    'deviceorientation',
                    handleOrientation
                )
            }
        }
    }, [])

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
