import React, { useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

function CameraSetup() {
    const { camera } = useThree()

    useEffect(() => {
        // Position camera at a fixed distance
        camera.position.set(20, 20, 0)
        // Rotate camera 45 degrees around Y axis
        camera.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI / 4)
        // Make camera look at center
        camera.lookAt(0, 0, 0)
    }, [camera])

    return null
}

// Main App component
function RocketObject({ orientation }) {
    return (
        <div className="h-72 w-72">
            {/* 
            
            x - red 
            y - green
            z- blue

            */}

            <Canvas
                onCreated={({ gl }: { gl: THREE.WebGLRenderer }) => {
                    gl.shadowMap.enabled = true
                    gl.setClearColor(0x000000, 0) // Set clear color with 0 opacity
                }}
            >
                <CameraSetup />
                <Scene orientation={orientation} />
            </Canvas>
        </div>
    )
}

// Helper function to apply aerospace rotations
function applyAerospaceRotation(object, pitchDeg, yawDeg, rollDeg) {
    // Convert to radians
    const pitch = THREE.MathUtils.degToRad(pitchDeg)
    const yaw = THREE.MathUtils.degToRad(yawDeg)
    const roll = THREE.MathUtils.degToRad(rollDeg)

    // Reset rotation
    object.rotation.set(0, 0, 0)

    // Apply in yaw-pitch-roll sequence (standard aerospace sequence)
    object.rotateY(yaw) // Yaw around y-axis
    object.rotateX(pitch) // Pitch around x-axis
    object.rotateZ(roll) // Roll around z-axis
}

// Scene component containing all 3D elements
function Scene({ orientation }) {
    return (
        <>
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 10]} intensity={1} />
            <directionalLight position={[-10, -5, -10]} intensity={0.5} />
            <pointLight position={[5, 5, 5]} intensity={1} distance={100} />

            <axesHelper args={[15]} />
            <Rocket orientation={orientation} />
        </>
    )
}

// Rocket component
function Rocket({ orientation }) {
    const rocketRef = useRef()

    // Animation loop
    useFrame((state, delta) => {
        if (!rocketRef.current) return

        applyAerospaceRotation(
            rocketRef.current,
            orientation[0],
            orientation[1],
            orientation[2]
        )
    })

    return (
        <group ref={rocketRef}>
            {/* Rocket Body */}
            <mesh position={[0, 4, 0]}>
                <cylinderGeometry args={[1, 1, 8, 32]} />
                <meshPhongMaterial
                    color="white"
                    specular={0x111111}
                    shininess={30}
                />
            </mesh>

            {/* Rocket Nose */}
            <mesh position={[0, 9.5, 0]}>
                <coneGeometry args={[1, 3, 32]} />
                <meshPhongMaterial
                    color="white"
                    specular={0x111111}
                    shininess={30}
                />
            </mesh>

            {/* Rocket Fins */}
            {[0, 1, 2, 3].map((i) => (
                <Fin key={i} index={i} />
            ))}

            {/* Camera FOV Group - positioning only */}
            <group position={[0, 4, 0]} rotation={[0, Math.PI / 4, 0]} />
        </group>
    )
}

// Custom Fin component
function Fin({ index }) {
    const finHeight = 4 // how far up the rocket the fin goes
    const finWidth = 2 // how far the fin sticks out
    const finThickness = 0.2

    // Create fin shape
    const shape = new THREE.Shape()
    shape.moveTo(0, 0) // base corner (near rocket)
    shape.lineTo(0, finHeight) // up the rocket body
    shape.lineTo(finWidth, 0) // out away from rocket
    shape.lineTo(0, 0) // close shape

    // Calculate position based on index
    const angle = (index * Math.PI) / 2
    const posX = Math.sin(angle)
    const posZ = Math.cos(angle)

    return (
        <mesh
            position={[posX, 0.5, posZ]}
            rotation={[0, ((index + 3) * Math.PI) / 2, 0]}
        >
            <extrudeGeometry
                args={[shape, { depth: finThickness, bevelEnabled: false }]}
            />
            <meshPhongMaterial
                color="white"
                specular={0x111111}
                shininess={30}
            />
        </mesh>
    )
}

export default RocketObject
