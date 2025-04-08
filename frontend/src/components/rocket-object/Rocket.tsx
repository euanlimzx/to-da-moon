import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const RED_1 = '#f25346'
const RED_2 = '#d8443a'
const RED_3 = '#bf3935'
const GREY = '#d9d9d9'
const DARK_GREY = '#4d4d4d'
// const WINDOW_DARK_BLUE = '#1a2f4b'
// const WINDOW_BLUE = '#2a8ac9'
const THRUSTER_ORANGE = '#ff9a40'

const Rocket = ({ isPhonePortrait, drawerOpen }) => {
  const rocketRef = useRef<THREE.Group>(null)

  // Animation loop
  useFrame(() => {
    if (!rocketRef.current) return

    // adds the initial shakiness to the rocket flying upwards
    if (
      (isPhonePortrait && drawerOpen && rocketRef.current.position.y < 145) ||
      rocketRef.current.position.y < 50
    ) {
      rocketRef.current.position.y += 1
      rocketRef.current.position.x = Math.random() * Math.PI * 0.5
      rocketRef.current.rotation.x = Math.random() * Math.sin(1) * 0.04
      rocketRef.current.rotation.z = Math.random() * Math.sin(1) * 0.04
      rocketRef.current.position.z = Math.random() * Math.PI * 0.5
    } else if (
      isPhonePortrait &&
      !drawerOpen &&
      rocketRef.current.position.y > 55
    ) {
      rocketRef.current.position.y -= 1
    }

    // subsequent rotation of the rocket as it is in stable flight mode
    else {
      rocketRef.current.rotation.y += Math.sin(1) * 0.02
    }

    if (
      (isPhonePortrait && rocketRef.current.position.y > 145) ||
      rocketRef.current.position.y > 350
    ) {
      rocketRef.current.position.y = -300
    }
  })

  // Create fin shape
  const finShape = new THREE.Shape()
  finShape.moveTo(0, 0)
  finShape.lineTo(0, 50)
  finShape.lineTo(35, 10)
  finShape.lineTo(35, -10)
  finShape.lineTo(0, 0)

  const finExtrudeSettings: THREE.ExtrudeGeometryOptions = {
    steps: 2,
    depth: 8,
    bevelEnabled: true,
    bevelThickness: 1,
    bevelSize: 1,
    bevelSegments: 2,
  }

  // Create window shape
  const windowShape = new THREE.Shape()
  windowShape.moveTo(-18, 45)
  windowShape.lineTo(18, 45)
  windowShape.lineTo(18, -45)
  windowShape.lineTo(-18, -45)
  windowShape.lineTo(-18, 45)

  const MatRoof1 = () => <meshPhongMaterial color={RED_1} flatShading />
  const MatRoof2 = () => <meshPhongMaterial color={RED_2} flatShading />
  const MatRoof3 = () => <meshPhongMaterial color={RED_3} flatShading />
  const MatBody = () => <meshPhongMaterial color={GREY} flatShading />
  const MatWindowFrame = () => (
    <meshPhongMaterial color={DARK_GREY} side={THREE.DoubleSide} flatShading />
  )
  // const MatWindow = () => <meshPhongMaterial color={Colors.windowDarkBlue} />
  // const MatWindowReflection = () => (
  //     <meshPhongMaterial color={Colors.windowBlue} />
  // )
  const MatThruster = () => (
    <meshPhongMaterial color={THRUSTER_ORANGE} flatShading />
  )

  return (
    <group
      ref={rocketRef}
      position={[0, -40, 0]}
      rotation={[0, 1.5, 0]}
      scale={[0.2, 0.2, 0.2]}
      name="rocket"
    >
      {/* Roof */}
      <group>
        <mesh position={[0, 70, 0]} castShadow receiveShadow>
          <coneGeometry args={[50, 70, 8]} />
          <MatRoof1 />
        </mesh>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[50, 75, 80, 8]} />
          <MatRoof2 />
        </mesh>
        <mesh position={[0, -70, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[75, 85, 80, 8]} />
          <MatRoof3 />
        </mesh>
      </group>

      {/* Body */}
      <group>
        <mesh position={[0, -210, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[85, 85, 200, 8]} />
          <MatBody />
        </mesh>
        <group rotation={[0, 0.05, 0]}>
          <mesh
            position={[0, -310, -85]}
            rotation={[0, 1.6 - 0.08, 0]}
            scale={[1.8, 1.8, 1.8]}
            castShadow
            receiveShadow
          >
            <extrudeGeometry args={[finShape, finExtrudeSettings]} />
            <MatRoof3 />
          </mesh>
          <mesh
            position={[0, -310, 85]}
            rotation={[0, -1.6, 0]}
            scale={[1.8, 1.8, 1.8]}
            castShadow
            receiveShadow
          >
            <extrudeGeometry args={[finShape, finExtrudeSettings]} />
            <MatRoof3 />
          </mesh>
        </group>
      </group>

      {/* Window commented out because our rocket does not have a window */}
      {/* <group>
                <mesh
                    position={[-77, -200, 0]}
                    rotation={[0, 0, 1.59]}
                    castShadow
                    receiveShadow
                >
                    <cylinderGeometry args={[55, 55, 40, 8]} />
                    <MatWindowFrame />
                </mesh>
                <mesh
                    position={[-67, -200, 0]}
                    rotation={[0, 0, 1.59]}
                    castShadow
                    receiveShadow
                >
                    <cylinderGeometry args={[50, 50, 40, 8]} />
                    <MatWindow />
                </mesh>
                <mesh
                    position={[-90, -200, 0]}
                    rotation={[0.82, -1.5, 0]}
                    receiveShadow
                >
                    <shapeGeometry args={[windowShape]} />
                    <MatWindowReflection />
                </mesh>
            </group> */}

      {/* Base */}
      <group>
        <mesh position={[0, -305, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[55, 55, 40, 8]} />
          <MatWindowFrame />
        </mesh>
        <mesh position={[0, -330, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[55, 35, 10, 8]} />
          <MatThruster />
        </mesh>
        <mesh
          position={[0, -340, 0]}
          scale={[0.7, 0.55, 0.7]}
          castShadow
          receiveShadow
        >
          <cylinderGeometry args={[55, 55, 40, 8]} />
          <MatWindowFrame />
        </mesh>
      </group>
    </group>
  )
}

export default Rocket
