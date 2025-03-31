import { Leva } from 'leva'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import Scene from '@/components/object/Scene'

const Object = () => {
    return (
        <div style={{ width: '70vw', height: '70vh' }}>
            <Leva collapsed />
            <Canvas style={{ background: 'black' }}>
                <Suspense fallback={null}>
                    <Scene />
                </Suspense>
            </Canvas>
        </div>
    )
}

export default Object
