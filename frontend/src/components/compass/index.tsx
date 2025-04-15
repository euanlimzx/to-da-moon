import React, { useState, useEffect } from 'react'

const ArrowToTarget = ({
  deviceLat,
  deviceLng,
  targetLat,
  targetLng,
  deviceOrientation,
}) => {
  const [isOnTarget, setIsOnTarget] = useState(false)
  const [bearingToTarget, setBearingToTarget] = useState(null)
  const [cssRotate, setCssRotate] = useState(null)

  // Calculate bearing when coordinates change
  useEffect(() => {
    if (
      deviceLat != null &&
      deviceLng != null &&
      targetLat != null &&
      targetLng != null &&
      deviceOrientation != null
    ) {
      const bearing = calcDegreeToPoint(
        deviceLat,
        deviceLng,
        targetLat,
        targetLng
      )
      if (bearing < 0) {
        setBearingToTarget(bearing + 360)
      } else {
        setBearingToTarget(bearing)
      }
      // Determine if device is pointing toward target (within ±15 degrees)
      // ±15 degree
      if (
        (bearing < Math.abs(deviceOrientation) &&
          bearing + 15 > Math.abs(deviceOrientation)) ||
        bearing > Math.abs(deviceOrientation + 15) ||
        bearing < Math.abs(deviceOrientation)
      ) {
        setIsOnTarget(false)
      } else if (bearing) {
        setIsOnTarget(true)
      }

      let rotation = (bearingToTarget - deviceOrientation + 360) % 360

      if (rotation > 180) {
        rotation -= 360
      }
      setCssRotate(rotation)
    }
  }, [deviceLat, deviceLng, targetLat, targetLng, deviceOrientation])

  const calcDegreeToPoint = (
    deviceLatitude,
    deviceLongitude,
    targetLatitude,
    targetLongitude
  ) => {
    const phiK = (targetLatitude * Math.PI) / 180.0
    const lambdaK = (targetLongitude * Math.PI) / 180.0
    const phi = (deviceLatitude * Math.PI) / 180.0
    const lambda = (deviceLongitude * Math.PI) / 180.0
    const psi =
      (180.0 / Math.PI) *
      Math.atan2(
        Math.sin(lambdaK - lambda),
        Math.cos(phi) * Math.tan(phiK) -
          Math.sin(phi) * Math.cos(lambdaK - lambda)
      )
    return Math.round(psi)
  }

  if (
    deviceLat == null ||
    deviceLng == null ||
    targetLat == null ||
    targetLng == null ||
    deviceOrientation == null
  ) {
    return <div>Waiting for data...</div>
  }

  return (
    <div className="compass-container">
      <div
        style={{
          transform: `rotate(${-cssRotate}deg)`,
          transition: 'transform 0.2s linear',
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '20px auto',
          borderRadius: '50%',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke={isOnTarget ? 'green' : 'currentColor'}
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
        <p>Bearing to target: {bearingToTarget?.toFixed(1)}°</p>
        <p>Device heading: {deviceOrientation.toFixed(1)}°</p>
      </div>
    </div>
  )
}

export default ArrowToTarget
