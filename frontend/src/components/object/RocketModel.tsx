import { useEffect, useRef } from 'react'
import { useLoader } from '@react-three/fiber'
import { OBJLoader } from 'three/examples/jsm/Addons.js'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

type RocketModelProps = {
    rotation: number
    setRocketLoaded: React.Dispatch<React.SetStateAction<boolean>>
}

const RocketModel: React.FC<RocketModelProps> = ({
    rotation,
    setRocketLoaded,
}) => {
    const objRef = useRef(null)
    const obj = useLoader(OBJLoader, '/models/compressed.obj')

    useEffect(() => {
        if (obj) {
            // Compute bounding box and scale object
            const box = new THREE.Box3().setFromObject(obj)
            const size = box.getSize(new THREE.Vector3()).length()
            const scaleFactor = 20 / size

            obj.scale.set(scaleFactor, scaleFactor, scaleFactor)
            obj.rotation.x = -Math.PI / 2
            obj.position.set(0, 0, 0)

            setRocketLoaded(true)
        }
    }, [obj, setRocketLoaded])

    useFrame(() => {
        if (objRef.current) {
            objRef.current.rotation.y = rotation
        }
    })

    return <primitive ref={objRef} object={obj.clone()} />
}

export default RocketModel
