import React, { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { useDrag } from '@use-gesture/react'
import * as THREE from 'three'
import { Text } from '@react-three/drei'

const countryNames = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Antigua and Barbuda',
  'Argentina',
  'Armenia',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bhutan',
  'Bolivia',
  'Bosnia and Herzegovina',
  'Botswana',
]

const randomSphereSurfacePosition = (radius: number) => {
  const u = Math.random()
  const v = Math.random()
  const theta = 2 * Math.PI * u
  const phi = Math.acos(2 * v - 1)
  const x = radius * Math.sin(phi) * Math.cos(theta)
  const y = radius * Math.sin(phi) * Math.sin(theta)
  const z = radius * Math.cos(phi)
  return [x, y, z]
}

const Sphere = () => {
  const meshRef = useRef<THREE.Mesh>(null)

  const bind = useDrag((state) => {
    if (meshRef.current) {
      const {
        movement: [x, y],
      } = state
      const rotationSpeed = 0.002
      meshRef.current.rotation.y += x * rotationSpeed
      meshRef.current.rotation.x -= y * rotationSpeed
    }
  })

  return (
    <mesh ref={meshRef} {...bind()}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial
        color="white"
        transparent={true}
        opacity={0}
        side={THREE.DoubleSide} // Ensure the material is visible from both sides
        depthWrite={false} // Prevent depth from affecting transparency
        depthTest={false} // Disable depth testing to avoid artifacts
      />
      {countryNames.map((name, index) => (
        <Text
          key={index}
          position={randomSphereSurfacePosition(2)}
          fontSize={0.2}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {name}
        </Text>
      ))}
    </mesh>
  )
}

const ThreeScene = () => {
  return (
    <div style={{ height: '100vh', backgroundColor: 'black' }}>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Sphere />
      </Canvas>
    </div>
  )
}

export default ThreeScene
