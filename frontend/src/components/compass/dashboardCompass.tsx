import React, { useState, useEffect } from 'react'

const DashboardCompass = ({
  deviceLat,
  deviceLng,
  targetLat,
  targetLng,
  deviceOrientation,
}) => {
  const [isOnTarget, setIsOnTarget] = useState(false)
  const [bearingToTarget, setBearingToTarget] = useState(null)
  const [cssRotate, setCssRotate] = useState(0)

  const normalizeAngle = (angle) => ((angle % 360) + 360) % 360

  const getShortestRotation = (from, to) => {
    const delta = ((to - from + 540) % 360) - 180
    return from + delta
  }

  // Calculate bearing to target
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
    return normalizeAngle(psi)
  }

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
      setBearingToTarget(bearing)

      const normalizedDeviceOrientation = normalizeAngle(deviceOrientation)

      // Determine if device is pointing toward target (within ±15 degrees)
      const diff = Math.abs(bearing - normalizedDeviceOrientation)
      const shortestDiff = Math.min(diff, 360 - diff)
      setIsOnTarget(shortestDiff <= 15)

      // Compute shortest rotation from current cssRotate to target bearing
      setCssRotate((prev) =>
        getShortestRotation(prev, bearing - normalizedDeviceOrientation)
      )
    }
  }, [deviceLat, deviceLng, targetLat, targetLng, deviceOrientation])

  return (
    <div className="compass-container">
      <div className="compass-info">
        {bearingToTarget && deviceOrientation ? (
          <>
            <p>
              DEVICE ORIENTATION: {normalizeAngle(deviceOrientation).toFixed(1)}
              °
            </p>
            <p>TARGET BEARING: {bearingToTarget?.toFixed(1)}°</p>
          </>
        ) : (
          <span>NO ORIENTATION PROVIDED BY DEVICE</span>
        )}
      </div>
      {bearingToTarget && deviceOrientation && (
        <div
          style={{
            transform: `rotate(${cssRotate}deg)`,
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
      )}
    </div>
  )
}

export default DashboardCompass
