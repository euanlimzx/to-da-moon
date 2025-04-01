import { useCallback, useRef, useEffect } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'

// Types for particle props and state
interface ParticleProps {
    index: number
}

// Updated Particle component for continuous animation
const Particle: React.FC<ParticleProps> = ({ index }) => {
    const meshRef = useRef<THREE.Mesh>(null)

    // Generate random geometry for each particle
    const scale = 20 + Math.random() * 20
    const nLines = 3 + Math.floor(Math.random() * 5)
    const nRows = 3 + Math.floor(Math.random() * 5)

    // Choose random particle type and parameters
    const particleType = useRef<'smoke' | 'flying'>(
        Math.random() > 0.4 ? 'smoke' : 'flying'
    )

    // Animation function for flying particles
    const animateParticle = useCallback(() => {
        if (!meshRef.current) return

        if (particleType.current === 'flying') {
            // Flying particle animation
            const posX = -1000 + Math.random() * 2000
            const posY = 100 + Math.random() * 2000
            const posZ = -1000 + Math.random() * 1500

            const targetPosY = -posY - 2500
            const scale = Math.random() * 0.2
            const speed = 1 + Math.random() * 2

            // Reset position and make visible
            meshRef.current.position.set(posX, posY, posZ)
            meshRef.current.scale.set(scale, scale, scale)

            if (!Array.isArray(meshRef.current.material)) {
                meshRef.current.material.opacity = 1
            }

            // Animate movement
            gsap.to(meshRef.current.position, {
                duration: speed,
                x: 0,
                y: targetPosY,
                ease: 'none',
                onComplete: () => {
                    if (
                        meshRef.current &&
                        !Array.isArray(meshRef.current.material)
                    ) {
                        meshRef.current.material.opacity = 0
                        // Short delay before next animation
                        setTimeout(() => animateParticle(), Math.random() * 100)
                    }
                },
            })
        } else {
            // Smoke particle animation
            const rocketY =
                meshRef.current.parent?.parent?.getObjectByName('rocket')
                    ?.position.y || 0
            const offsetY = rocketY - 80
            const scale = Math.random() * 0.2 + 0.35
            const targetPosY = offsetY - 500
            const speed = 0.8 + Math.random() * 0.6

            // Reset position and make visible
            meshRef.current.position.set(0, offsetY, 0)
            meshRef.current.scale.set(0.4 * scale, 0.4 * scale, 0.4 * scale)
            if (!Array.isArray(meshRef.current.material)) {
                meshRef.current.material.opacity = 1
            }

            // Animate movement and scale
            gsap.to(meshRef.current.position, {
                duration: 1.3 * speed * 0.65,
                y: targetPosY,
                ease: 'none',
                onComplete: () => {
                    if (
                        meshRef.current &&
                        !Array.isArray(meshRef.current.material)
                    ) {
                        meshRef.current.material.opacity = 0
                        // Short delay before next animation
                        setTimeout(() => animateParticle(), Math.random() * 100)
                    }
                },
            })

            gsap.to(meshRef.current.scale, {
                duration: speed * 0.65,
                x: scale * 1.8,
                y: scale * 1.8,
                z: scale * 1.8,
                ease: 'none',
            })
        }
    }, [])

    // Start animation with staggered delay to avoid all particles animating at once
    useEffect(() => {
        const initialDelay = index * 40
        setTimeout(() => {
            animateParticle()
        }, initialDelay)
    }, [index, animateParticle])

    return (
        <mesh
            ref={meshRef}
            position={[0, 0, 0]}
            scale={[0.1, 0.1, 0.1]}
            rotation={[
                Math.random() * Math.PI * 2,
                Math.random() * Math.PI * 2,
                Math.random() * Math.PI * 2,
            ]}
        >
            <sphereGeometry args={[scale, nLines, nRows]} />
            <meshLambertMaterial color={0xe3e3e3} transparent opacity={0} />
        </mesh>
    )
}

export default Particle
