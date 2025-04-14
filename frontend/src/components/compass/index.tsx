// components/compass.jsx
import React from 'react'

// Helper to calculate bearing between two lat/lng points
function calculateBearing(lat1, lon1, lat2, lon2) {
  const toRad = (deg) => (deg * Math.PI) / 180
  const toDeg = (rad) => (rad * 180) / Math.PI

  const dLon = toRad(lon2 - lon1)
  const y = Math.sin(dLon) * Math.cos(toRad(lat2))
  const x =
    Math.cos(toRad(lat1)) * Math.sin(toRad(lat2)) -
    Math.sin(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.cos(dLon)
  const brng = Math.atan2(y, x)
  return (toDeg(brng) + 360) % 360
}

const ArrowToTarget = ({
  deviceLat,
  deviceLng,
  targetLat,
  targetLng,
  deviceOrientation,
}) => {
  if (
    deviceLat == null ||
    deviceLng == null ||
    targetLat == null ||
    targetLng == null ||
    deviceOrientation == null
  ) {
    return <div>Waiting for data...</div>
  }

  // Calculate the bearing from current location to target
  const bearingToTarget = calculateBearing(
    deviceLat,
    deviceLng,
    targetLat,
    targetLng
  )

  // Calculate the relative angle by subtracting device orientation from bearing
  // The modulo ensures the angle stays within 0-360 range
  const relativeAngle = (bearingToTarget - deviceOrientation + 360) % 360

  // Calculate distance between points (optional but useful)
  const distance = calculateDistance(deviceLat, deviceLng, targetLat, targetLng)

  return (
    <div className="compass-container">
      <div
        style={{
          transform: `rotate(${relativeAngle}deg)`,
          transition: 'transform 0.2s linear',
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '20px auto',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          width="40"
          height="40"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 18.75 7.5-7.5 7.5 7.5"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 12.75 7.5-7.5 7.5 7.5"
          />
        </svg>
      </div>
      <div className="compass-info">
        <p>Bearing to target: {bearingToTarget.toFixed(1)}°</p>
        <p>Device heading: {deviceOrientation.toFixed(1)}°</p>
        <p>Arrow angle: {relativeAngle.toFixed(1)}°</p>
        {distance && <p>Distance: {distance.toFixed(2)} km</p>}
      </div>
    </div>
  )
}

// Helper function to calculate distance between two points using the Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371 // Radius of the Earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

export default ArrowToTarget
