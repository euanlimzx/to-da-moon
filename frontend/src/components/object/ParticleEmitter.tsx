import { useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import Particle from '@/components/object/Particle'
import * as THREE from 'three'

type ParticleObject = {
    id: number
    position: THREE.Vector3
}

type ParticlesEmitterProps = {
    rocketRotation: number
}

const ParticlesEmitter: React.FC<ParticlesEmitterProps> = ({
    rocketRotation,
}) => {
    const [particles, setParticles] = useState<ParticleObject[]>([])
    const particleCount = useRef(0)
    const prevTime = useRef(0)

    // Create new particles on each frame
    useFrame((state) => {
        if (
            prevTime.current === 0 ||
            state.clock.elapsedTime - prevTime.current > 0.15
        ) {
            const newParticles = [...particles]

            // Add two new particles
            const newParticle = {
                id: particleCount.current,
                position: new THREE.Vector3(),
            }
            newParticle.position.z = (Math.random() - 0.5) * 3

            newParticles.push(newParticle)
            particleCount.current++

            setParticles(newParticles)
            prevTime.current = state.clock.elapsedTime
        }
    })

    return (
        <>
            {particles.map((particle) => (
                <Particle
                    key={particle.id}
                    initialPosition={particle.position}
                    rocketRotation={rocketRotation}
                />
            ))}
        </>
    )
}

export default ParticlesEmitter
