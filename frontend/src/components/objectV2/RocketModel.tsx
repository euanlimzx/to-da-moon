import { useEffect, useRef } from 'react'
import { useLoader } from '@react-three/fiber'
import { OBJLoader } from 'three/examples/jsm/Addons.js'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

type RocketModelProps = {
    rotation: number
    setRocketLoaded: React.Dispatch<React.SetStateAction<boolean>>
    rotationX: number
    rotationY: number
    rotationZ: number
}

const RocketModel: React.FC<RocketModelProps> = ({
    rocketRef,
    setRocketLoaded,
    rotationX,
    rotationY,
    rotationZ,
}) => {
    // const objRef = useRef<null | THREE.Object3D>(null)
    const newObjPositionRef = useRef(new THREE.Vector3(0, 0, 0))
    const obj = useLoader(OBJLoader, '/models/compressed.obj')

    useEffect(() => {
        if (obj) {
            // Compute bounding box and scale object
            const box = new THREE.Box3().setFromObject(obj)
            const size = box.getSize(new THREE.Vector3()).length()
            const scaleFactor = 20 / size

            obj.scale.set(scaleFactor, scaleFactor, scaleFactor)
            obj.rotation.x = (3 * Math.PI) / 2

            obj.position.set(0, 0, 0)

            setRocketLoaded(true)
        }
    }, [obj, setRocketLoaded])

    // Update the mesh's rotation on every frame
    useFrame(() => {
        if (rocketRef.current) {
            rocketRef.current.rotation.x = rotationX
            rocketRef.current.rotation.y = rotationY
            rocketRef.current.rotation.z = rotationZ
        }
    })

    // set event listeners for movement
    useEffect(() => {
        // this is to track the location of the mouse
        const pointer = new THREE.Vector2()

        // const minPosition = new THREE.Vector3(-1, 0, -5)
        // const maxPosition = new THREE.Vector3(1, 0, -5)

        const handlePointerMove = (e: PointerEvent) => {
            // Convert mouse coordinates to normalized device coordinates (-1 to +1)
            pointer.x = (e.clientX / window.innerWidth) * 2 - 1
            pointer.y = -(e.clientY / window.innerHeight) * 2 + 1

            // Update all three position components
            newObjPositionRef.current.x = pointer.x
            newObjPositionRef.current.y = pointer.y
            newObjPositionRef.current.z = -5 + pointer.y // Add depth based on y position
        }

        window.addEventListener('pointermove', handlePointerMove)

        return () => {
            window.removeEventListener('pointermove', handlePointerMove)
        }
    }, [])

    useFrame((state, delta) => {
        if (!rocketRef.current || !newObjPositionRef.current) return

        // Update position smoothly with damping
        const dampingFactor = 3
        rocketRef.current.position.x +=
            (newObjPositionRef.current.x - rocketRef.current.position.x) *
            delta *
            dampingFactor
        rocketRef.current.position.y +=
            (newObjPositionRef.current.y - rocketRef.current.position.y) *
            delta *
            dampingFactor
        rocketRef.current.position.z +=
            (newObjPositionRef.current.z - rocketRef.current.position.z) *
            delta *
            dampingFactor

        // Calculate rotation based on movement direction
        const moveX = newObjPositionRef.current.x - rocketRef.current.position.x
        const moveY = newObjPositionRef.current.y - rocketRef.current.position.y
        const moveZ = newObjPositionRef.current.z - rocketRef.current.position.z

        // Update all rotation axes with smooth transitions
        rocketRef.current.rotation.x +=
            (moveZ * Math.PI * 0.5 - rocketRef.current.rotation.x) * delta * 2
        rocketRef.current.rotation.y +=
            (moveY * Math.PI * 0.5 - rocketRef.current.rotation.y) * delta * 2
        rocketRef.current.rotation.z +=
            (-moveX * Math.PI * 0.25 - rocketRef.current.rotation.z) * delta * 2
    })

    return (
        <>
            <primitive ref={rocketRef} object={obj.clone()} />
        </>
    )
}

export default RocketModel
