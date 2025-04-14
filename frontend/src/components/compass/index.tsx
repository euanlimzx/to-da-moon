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

  const bearingToTarget = calculateBearing(
    deviceLat,
    deviceLng,
    targetLat,
    targetLng
  )
  const relativeAngle = (bearingToTarget - deviceOrientation + 360) % 360

  return (
    <>
      <div
        style={{
          transform: `rotate(${relativeAngle}deg)`,
          transition: 'transform 0.2s linear',
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2rem',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
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
    </>
  )
}

export default ArrowToTarget
