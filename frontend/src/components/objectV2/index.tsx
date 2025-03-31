// import { Leva } from 'leva'
import { useState, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import RocketModel from '@/components/objectV2/RocketModel'
import { PerspectiveCamera } from '@react-three/drei'
import { Leva, useControls } from 'leva'
import Smoke from '@/components/objectV2/smoke'
import * as THREE from 'three'

const Object = () => {
    const [rocketLoaded, setRocketLoaded] = useState(false)
    const rocketRef = useRef<null | THREE.Object3D>(null)

    // Create Leva controls for rotation on x, y, and z
    const { rotationX, rotationY, rotationZ } = useControls({
        rotationX: {
            value: (Math.PI * 3) / 2,
            min: 0,
            max: Math.PI * 2,
            step: 0.01,
        },
        rotationY: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
        rotationZ: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
    })

    return (
        <div style={{ width: '70vw', height: '70vh' }}>
            <Leva collapsed />
            <Canvas style={{ background: 'black' }}>
                <Suspense fallback={null}>
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
                        <PerspectiveCamera
                            makeDefault
                            position={[0, 0, 30]}
                            fov={45}
                        />

                        {/* Rocket model */}
                        <Suspense fallback={null}>
                            <RocketModel
                                rocketRef={rocketRef}
                                setRocketLoaded={setRocketLoaded}
                                rotationX={rotationX}
                                rotationY={rotationY}
                                rotationZ={rotationZ}
                            />
                            <Smoke rocketRef={rocketRef} />
                        </Suspense>
                    </>
                </Suspense>
            </Canvas>
        </div>
    )
}

export default Object
