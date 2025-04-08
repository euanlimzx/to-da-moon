import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'

import Rocket from '@/components/rocket-object/Rocket'
import ParticleSystem from '@/components/rocket-object/ParticleSystem'

const THRUSTER_ORANGE = '#ff9a40'

const Lights = () => {
  return (
    <>
      <hemisphereLight args={[0xaaaaaa, 0x000000, 0.9]} />
      <ambientLight intensity={0.6} color={0xccb8b4} />
      <directionalLight
        position={[150, 150, 0]}
        intensity={0.8}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-800}
        shadow-camera-right={800}
        shadow-camera-top={800}
        shadow-camera-bottom={-800}
        shadow-camera-near={1}
        shadow-camera-far={1200}
      />
      <directionalLight
        position={[0, -5, 0]}
        intensity={0.75}
        color={THRUSTER_ORANGE}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-100}
        shadow-camera-right={100}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
        shadow-camera-near={1}
        shadow-camera-far={1000}
      />
    </>
  )
}

interface ObjectProps {
  isPhonePortrait: boolean
  drawerOpen: boolean
}

const Object: React.FC<ObjectProps> = ({ isPhonePortrait, drawerOpen }) => {
  return (
    <div id="world" style={{ width: '130vw', height: '100Vh' }}>
      <Canvas
        shadows
        camera={{ position: [0, 50, 400], fov: 60, near: 1, far: 950 }}
        onCreated={({ gl }: { gl: THREE.WebGLRenderer }) => {
          gl.shadowMap.enabled = true
          gl.setClearColor(0x000000, 0) // Set clear color with 0 opacity
        }}
        style={{ background: 'transparent' }}
      >
        <fog attach="fog" args={[0xf7d9aa, 300, 950]} />
        <Lights />
        <Rocket isPhonePortrait={isPhonePortrait} drawerOpen={drawerOpen} />
        <ParticleSystem />
      </Canvas>
    </div>
  )
}

export default Object
