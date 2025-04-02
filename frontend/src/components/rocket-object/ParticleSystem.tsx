import Particle from '@/components/rocket-object/Particle'

const ParticleSystem = () => {
    // Increase the number of particles for a denser effect
    const numberOfParticles = 150

    const particles = Array.from({ length: numberOfParticles }, (_, i) => (
        <Particle key={i} index={i} />
    ))

    return <group name="particleSystem">{particles}</group>
}

export default ParticleSystem
