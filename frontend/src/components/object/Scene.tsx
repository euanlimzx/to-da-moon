import { useState } from 'react'
import { useControls } from 'leva'
import ParticleEmitter from '@/components/object/ParticleEmitter'
import { PerspectiveCamera } from '@react-three/drei'
import RocketModel from '@/components/object/RocketModel'
import { Suspense } from 'react'

const Scene = () => {
    const [rocketLoaded, setRocketLoaded] = useState(false)

    // Leva controls for rocket rotation
    const { rocketRotation } = useControls({
        rocketRotation: {
            value: Math.PI / 4,
            min: -Math.PI / 4,
            max: Math.PI / 4,
            step: 0.01,
        },
    })

    return (
        <>
            {/* Hemisphere light */}
            <hemisphereLight
                args={[0xb1e1ff, 0x666666, 0.8]}
                position={[0, 20, 0]}
            />

            {/* Directional light */}
            <directionalLight
                intensity={1}
                position={[5, 5, 5]}
                target-position={[-5, 0, 0]}
            />

            {/* Camera */}
            <PerspectiveCamera makeDefault position={[0, 0, 50]} fov={45} />

            {/* Rocket model */}
            <Suspense fallback={null}>
                <RocketModel
                    rotation={rocketRotation}
                    setRocketLoaded={setRocketLoaded}
                />
            </Suspense>

            {/* Particles */}
            {rocketLoaded && (
                <ParticleEmitter rocketRotation={rocketRotation} />
            )}
        </>
    )
}

export default Scene
