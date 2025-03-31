import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const Smoke = ({ rocketRef }) => {
    const meshRef = useRef()
    const instancesRef = useRef([])
    const timeRef = useRef(0)

    // Constants
    const capacity = 7000 // Increased for denser smoke
    const spawnPoints = useMemo(
        () => [
            new THREE.Vector3(0, 0.75, -1),
            // new THREE.Vector3(0.1, 0.7, -1),
            // new THREE.Vector3(-0.1, 0.7, -1),
            // Multiple spawn points for more natural origin
        ],
        []
    )
    const spawnTime = 0.0008 // Spawn more particles per frame
    const lifeTime = 3.5 // Significantly longer lifetime
    const speed = 1.2 // Slower rising speed for smoke
    const scaleMultiplier = 4.5 // Larger particles
    const opacityMultiplier = 0.7 // More transparent for wispy effect
    const direction = useMemo(
        () => new THREE.Vector3(0, -1, 0).normalize(), // Smoke rises up
        []
    )
    const dirDisplacement = 0.3 // Wide spread
    // Create geometry and material
    const geometry = useMemo(() => new THREE.SphereGeometry(0.04, 8, 6), []) // Sphere for smoke puffs
    const material = useMemo(
        () =>
            new THREE.MeshStandardMaterial({
                color: 0xffffff, // White color
                emissive: 0xcccccc, // Light emissive for white glow
                transparent: true,
                opacity: 0.5, // Slightly more transparent for white smoke
                depthWrite: false,
            }),
        []
    )

    // Setup instanced mesh
    const instancedMesh = useMemo(() => {
        const mesh = new THREE.InstancedMesh(geometry, material, capacity)
        mesh.frustumCulled = false
        mesh.count = 0
        return mesh
    }, [geometry, material])

    // Initialize dummy for matrix calculations
    const dummy = useMemo(() => new THREE.Object3D(), [])

    // Create particle entity
    const createParticle = (position, dir, currentTime) => ({
        position: position.clone(),
        dir: dir.clone(),
        scale: new THREE.Vector3(1, 1, 1),
        opacity: 1 - currentTime * opacityMultiplier,
        currentTime,
        id: Math.random(), // For identification
        isActive: true,
    })

    // Update particle positions and properties
    const updateParticles = (delta) => {
        if (!meshRef.current) return

        let activeCount = 0

        instancesRef.current.forEach((particle, i) => {
            if (!particle.isActive) return

            particle.currentTime += delta

            // Remove if lifetime expired
            if (particle.currentTime >= lifeTime) {
                particle.isActive = false
                return
            }

            // Update position
            particle.position.addScaledVector(particle.dir, speed * delta)

            // Update scale
            particle.scale.addScalar(scaleMultiplier * delta)

            // Update opacity
            particle.opacity = Math.max(
                0,
                1 - particle.currentTime * opacityMultiplier
            )

            // Apply to instance
            dummy.position.copy(particle.position)
            dummy.scale.copy(particle.scale)
            dummy.updateMatrix()

            meshRef.current.setMatrixAt(activeCount, dummy.matrix)
            meshRef.current.setColorAt(
                activeCount,
                new THREE.Color(1, 1, 1).multiplyScalar(particle.opacity)
            )

            activeCount++
        })

        meshRef.current.count = activeCount
        meshRef.current.instanceMatrix.needsUpdate = true

        if (meshRef.current.instanceColor) {
            meshRef.current.instanceColor.needsUpdate = true
        }
    }

    // Add new particles
    const addParticles = (delta) => {
        if (!rocketRef.current || !meshRef.current) return

        timeRef.current += delta
        const halfDirDisplacement = dirDisplacement / 2

        while (timeRef.current >= spawnTime) {
            timeRef.current -= spawnTime

            if (instancesRef.current.length >= capacity) {
                // Replace inactive particles
                const inactiveIndices = instancesRef.current
                    .map((p, i) => ({ isActive: p.isActive, index: i }))
                    .filter((p) => !p.isActive)
                    .map((p) => p.index)

                if (inactiveIndices.length < 1) {
                    // Changed from 2 to 1
                    continue
                }

                // Create only one particle
                const index = inactiveIndices[0]
                if (index === undefined) continue

                const newDir = direction.clone()
                newDir.x +=
                    Math.random() * dirDisplacement - halfDirDisplacement
                newDir.y +=
                    Math.random() * dirDisplacement - halfDirDisplacement
                newDir.z +=
                    Math.random() * dirDisplacement - halfDirDisplacement

                const spawnPos = spawnPoints[0].clone() // Always use the single spawn point
                if (rocketRef.current) {
                    spawnPos.applyMatrix4(rocketRef.current.matrixWorld)
                }

                instancesRef.current[index] = createParticle(
                    spawnPos,
                    newDir,
                    timeRef.current
                )
            } else {
                // Add one new particle
                const newDir = direction.clone()
                newDir.x +=
                    Math.random() * dirDisplacement - halfDirDisplacement
                newDir.y +=
                    Math.random() * dirDisplacement - halfDirDisplacement
                newDir.z +=
                    Math.random() * dirDisplacement - halfDirDisplacement

                const spawnPos = spawnPoints[0].clone() // Always use the single spawn point
                if (rocketRef.current) {
                    spawnPos.applyMatrix4(rocketRef.current.matrixWorld)
                }

                const particle = createParticle(
                    spawnPos,
                    newDir,
                    timeRef.current
                )
                instancesRef.current.push(particle)
            }
        }
    }

    // Animation loop
    useFrame((_, delta) => {
        updateParticles(delta)
        addParticles(delta)

        // Sort instances for transparency
        if (meshRef.current && meshRef.current.count > 0) {
            // We would implement sorting here if needed
            // A simple back-to-front sort based on camera position could be used
        }
    })

    return <primitive ref={meshRef} object={instancedMesh} />
}

export default Smoke
