import React, { useRef } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { useDrag } from '@use-gesture/react'
import * as THREE from 'three'
import { Text } from '@react-three/drei'

// Golden Spiral 또는 Fibonacci Sphere를 이용한 균등한 점 배치 함수
const fibonacciSphere = (count: number): [number, number, number][] => {
  const points: [number, number, number][] = []
  const phi = Math.PI * (3 - Math.sqrt(5)) // 황금각
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2 // y값을 -1부터 1까지 균일하게 분포
    const radius = Math.sqrt(1 - y * y) // x^2 + z^2 = 1 - y^2
    const theta = phi * i // 황금각
    const x = Math.cos(theta) * radius
    const z = Math.sin(theta) * radius
    points.push([x, y, z])
  }
  return points
}

// 텍스트가 카메라를 바라보도록 설정하는 컴포넌트
const TextWithCameraOrientation = ({
  position,
  text,
}: {
  position: [number, number, number]
  text: string
}) => {
  const textRef = useRef<THREE.Mesh>(null)
  const { camera } = useThree()

  // 매 프레임마다 텍스트가 카메라를 바라보도록 설정
  useFrame(() => {
    if (textRef.current) {
      textRef.current.lookAt(camera.position)
    }
  })

  return (
    <Text
      ref={textRef}
      position={position}
      fontSize={0.15}
      color="white"
      anchorX="center"
      anchorY="middle"
    >
      {text}
    </Text>
  )
}

// 구체 컴포넌트
const Sphere = () => {
  const meshRef = useRef<THREE.Mesh>(null)
  const { camera } = useThree()

  // 드래그 이벤트 핸들러
  const bind = useDrag((state) => {
    if (meshRef.current) {
      const {
        movement: [dx, dy],
        memo = { startRotation: meshRef.current.rotation.clone() }, // 초기 회전 상태 저장
      } = state

      const rotationSpeed = 0.001 // 드래그 속도 조절

      // 드래그 방향에 따라 회전
      meshRef.current.rotation.y = memo.startRotation.y - dx * rotationSpeed
      meshRef.current.rotation.x = memo.startRotation.x + dy * rotationSpeed
    }
  })

  const countries = [
    '대한민국',
    '일본',
    '중국',
    '미국',
    '캐나다',
    '호주',
    '영국',
    '프랑스',
    '독일',
    '이탈리아',
    '스페인',
    '브라질',
    '멕시코',
    '인도',
    '러시아',
  ]

  // 랜덤 점 대신 균일하게 분포된 점을 사용
  const positions = fibonacciSphere(countries.length)

  return (
    <mesh ref={meshRef} {...bind()}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial
        color="white"
        transparent={true}
        opacity={0.005}
        side={THREE.DoubleSide}
        depthWrite={false}
        depthTest={false}
      />
      {countries.map((country, index) => (
        <TextWithCameraOrientation
          key={index}
          position={positions[index]}
          text={country}
        />
      ))}
    </mesh>
  )
}

// 메인 씬 컴포넌트
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
