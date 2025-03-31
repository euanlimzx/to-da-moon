import React, { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { animate } from 'framer-motion'
import * as THREE from 'three'

type ParticleProps = {
    initialPosition: THREE.Vector3
    rocketRotation: number
}

const Y_DROP = 300

const Particle: React.FC<ParticleProps> = ({
    initialPosition,
    rocketRotation,
}) => {
    const meshRef = useRef<null | THREE.Mesh>(null)
    const [active, setActive] = useState(true)

    // Create the particle geometry
    const scale = 0.5 + Math.random() * 0.5
    const nLines = 3 + Math.floor(Math.random() * 5)
    const nRows = 3 + Math.floor(Math.random() * 5)

    // Calculate target position based on rocket rotation
    const angle = Math.PI / 2 - rocketRotation
    const startX = 0.05 * Math.cos(angle)
    // -2 to offset it from the start a little
    const startY = -1 + Math.sin(angle)

    // const targetPosX =
    //     rocketRotation < 0.15 && rocketRotation > -0.15
    //         ? 100 * (Math.random() - 0.5)
    //         : -50 *
    //           Math.cos(
    //               (Math.PI * 3) / 2 + (Math.random() + 0.75) * rocketRotation
    //   )

    let targetPosX = startX

    // console.log('The angle is', angle)

    // tilted towards the right

    // This isnt perfect but I think it works enough for now
    if (rocketRotation > 0.4) {
        targetPosX += (-Y_DROP / Math.atan(angle)) * 0.7
    } else if (rocketRotation > 0.15) {
        targetPosX += (-Y_DROP / Math.atan(angle)) * 0.4
    } else if (rocketRotation < -0.4) {
        targetPosX += (Y_DROP / Math.atan(angle)) * 1.3
    } else if (rocketRotation < -0.15) {
        targetPosX += (Y_DROP / Math.atan(angle)) * 0.4
    } else {
        targetPosX += 100 * (Math.random() - 0.5)
    }

    console.log('out distance: ', targetPosX)

    const targetPosY = -startY - Y_DROP
    const targetSpeed = 8
    const particleScale = Math.random() * 0.5

    // Track position with refs
    const positionRef = useRef({
        x: startX,
        y: startY,
        z: initialPosition.z,
    })

    // Start animation
    useEffect(() => {
        // Create animation for x-coordinate
        const animationX = animate(startX, targetPosX, {
            duration: targetSpeed,
            ease: 'linear',
            onUpdate: (latest) => {
                positionRef.current.x = latest
            },
        })

        // Create animation for y-coordinate
        const animationY = animate(startY, targetPosY, {
            duration: targetSpeed,
            ease: 'linear',
            onUpdate: (latest) => {
                positionRef.current.y = latest
            },
            onComplete: () => setActive(false),
        })

        return () => {
            animationX.stop()
            animationY.stop()
        }
    }, [startX, startY, targetPosX, targetPosY, targetSpeed])

    // Remove particle when animation is complete
    useEffect(() => {
        if (!active && meshRef.current) {
            meshRef.current.visible = false
        }
    }, [active])

    // Update position on each frame
    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.position.x = positionRef.current.x
            meshRef.current.position.y = positionRef.current.y
            meshRef.current.position.z = positionRef.current.z
        }
    })

    return (
        <mesh
            ref={meshRef}
            scale={[particleScale, particleScale, particleScale]}
        >
            <sphereGeometry args={[scale, nLines, nRows]} />
            <meshLambertMaterial
                color="#ffffff"
                flatShading
                emissive="#ffffff"
                emissiveIntensity={0.5}
            />
        </mesh>
    )
}

export default Particle
