import React, { useEffect, useRef } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { TweenMax, Linear } from 'gsap/gsap-core'
import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import dynamic from 'next/dynamic'

const Object = () => {
    const canvasRef = useRef(null)
    const rocketRef = useRef(null)
    const rocketRotation = useRef({ yRotation: Math.PI / 4 })
    const addedDatGui = useRef(false)

    const particles = []

    const slowMoFactor = 1

    // Adjust particle scale
    const createNewParticle = () => {
        if (particles.length === 0) {
            const scale = 0.5 + Math.random() * 0.5
            const nLines = 3 + Math.floor(Math.random() * 5)
            const nRows = 3 + Math.floor(Math.random() * 5)
            const geometry = new THREE.SphereGeometry(scale, nLines, nRows)

            const material = new THREE.MeshLambertMaterial({
                color: 0xffffff,
                flatShading: true,
                transparent: false,
                emissive: 0xffffff, // Add white glow
                emissiveIntensity: 0.5, // Control glow strength
            })

            const mesh = new THREE.Mesh(geometry, material)
            mesh.position.z = (Math.random() - 0.5) * 3
            return mesh
        } else {
            return particles.pop()
        }
    }

    const recycleParticle = (p) => {
        particles.push(p)
    }

    const flyParticle = (p, startX) => {
        // dont fly particle if the rocket hasn't been loaded yet
        if (!rocketRef.current?.rotation) {
            return
        }

        let targetPosX, targetPosY, targetSpeed

        // console.log(rocketRef.current.rotation)

        p.material.opacity = 1
        p.position.x =
            0.1 * Math.cos((Math.PI * 3) / 2 + rocketRef.current.rotation.y)
        p.position.y = Math.sin(
            (Math.PI * 3) / 2 + rocketRef.current.rotation.y
        )
        p.position.z = 0

        const s = Math.random() * 0.2
        p.scale.set(s, s, s)

        targetPosX =
            rocketRef.current.rotation.y < 0.15 &&
            rocketRef.current.rotation.y > -0.15
                ? 10 * (Math.random() - 0.5)
                : -40 *
                  Math.cos(
                      (Math.PI * 3) / 2 +
                          (Math.random() + 0.75) * rocketRef.current.rotation.y
                  )
        targetPosY = -p.position.y - 30

        // Calculate target position based on angle
        // targetPosX = Math.cos(p.position.x) * distance;
        // targetPosY = Math.sin(p.position.y) * distance;
        targetSpeed = 1 + Math.random() * 2

        TweenMax.to(p.position, targetSpeed * slowMoFactor, {
            x: targetPosX,
            y: targetPosY,
            ease: Linear.easeNone,
            onComplete: recycleParticle,
            onCompleteParams: [p],
        })
    }

    const initializeDatGui = async () => {
        // Add gui control for rocket rotation
        const dat = await import('dat.gui')

        const gui = new dat.GUI()

        if (!addedDatGui.current) {
            gui.add(
                rocketRotation.current,
                'yRotation',
                -Math.PI / 4,
                Math.PI / 4,
                0.01
            )
                .name('rocketRotation')
                .onChange((value) => {
                    rocketRef.current.rotation.y = value
                })
            addedDatGui.current = true
        }
    }

    useEffect(() => {
        if (!canvasRef.current) return

        // const gui = new dat.GUI()

        // Get the canvas element from the ref
        const canvas = canvasRef.current

        canvas.width = window.innerWidth * 0.7
        canvas.height = window.innerHeight * 0.7

        // Initialize the renderer
        const renderer = new THREE.WebGLRenderer({ canvas })
        renderer.setSize(canvas.width, canvas.height)

        // Initialize the camera
        const camera = new THREE.PerspectiveCamera(
            45,
            canvas.width / canvas.height,
            0.1,
            1000
        )
        camera.position.set(0, 0, 50)

        // Create the scene
        const scene = new THREE.Scene()
        scene.background = new THREE.Color('black')

        // Add lights
        const skyColor = 0xb1e1ff // light blue
        const groundColor = 0x666666 // black
        const intensity = 0.8
        const light = new THREE.HemisphereLight(
            skyColor,
            groundColor,
            intensity
        )
        scene.add(light)

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
        directionalLight.position.set(5, 5, 5)
        directionalLight.target.position.set(-5, 0, 0)
        scene.add(directionalLight)
        scene.add(directionalLight.target)

        // Load the OBJ model
        const objLoader = new OBJLoader()
        objLoader.load(
            '/models/compressed.obj',
            (root) => {
                console.log('Model Loaded:', root)
                //const ref = new THREE.Box3().setFromObject(root);
                //console.log("Bounding Box:", ref);

                // Compute bounding box and scale object
                const box = new THREE.Box3().setFromObject(root)
                const size = box.getSize(new THREE.Vector3()).length()
                const scaleFactor = 20 / size // Scale to approximately size 10

                root.scale.set(scaleFactor, scaleFactor, scaleFactor)
                root.rotation.x = -Math.PI / 2 // Rotate 90 degrees around the X-axis
                // root.rotation.y = Math.PI / 2

                root.position.set(0, 0, 0)
                rocketRef.current = root
                scene.add(root)

                rocketRef.current.rotation.y = rocketRotation.current.yRotation
                console.log(rocketRef.current.rotation)
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
                initializeDatGui()
            },
            (error) => {
                console.error('An error happened', error)
            }
        )

        // Handle window resize
        const handleResize = () => {
            canvas.width = window.innerWidth * 0.7
            canvas.height = window.innerHeight * 0.7

            camera.aspect = window.innerWidth / window.innerHeight
            renderer.setSize(canvas.width, canvas.height)
            camera.updateProjectionMatrix()
        }

        window.addEventListener('resize', handleResize)

        // Animation/render loop
        const animate = () => {
            requestAnimationFrame(animate)

            const particle = createNewParticle()
            scene.add(particle)
            flyParticle(particle, 1)
            const particle1 = createNewParticle()
            scene.add(particle1)
            flyParticle(particle1, 1)
            // const particle2 = createNewParticle()
            // scene.add(particle2)
            // flyParticle(particle2, 1)

            renderer.render(scene, camera)
        }

        animate()

        // Cleanup on component unmount
        return () => {
            window.removeEventListener('resize', handleResize)
            renderer.dispose()
            scene.clear()
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            style={{ width: '70vw', height: '70vh', zIndex: 1000 }}
        />
    )
}

export default Object
