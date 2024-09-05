// Sphere.tsx
import React, { useRef, useState } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { useDrag } from '@use-gesture/react'
import * as THREE from 'three'
import { Text } from '@react-three/drei'

// Golden Spiral 또는 Fibonacci Sphere를 이용한 균등한 점 배치 함수
const fibonacciSphere = (
  count: number,
  radius: number = 1.5
): [number, number, number][] => {
  const points: [number, number, number][] = []
  const phi = Math.PI * (3 - Math.sqrt(5)) // 황금각
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2 // y값을 -1부터 1까지 균일하게 분포
    const r = radius * Math.sqrt(1 - y * y) // x^2 + z^2 = r^2 - y^2
    const theta = phi * i // 황금각
    const x = Math.cos(theta) * r
    const z = Math.sin(theta) * r
    points.push([x, y * radius, z]) // y에 반지름을 적용
  }
  return points
}

// 텍스트가 카메라를 바라보도록 설정하는 컴포넌트
const TextWithCameraOrientation = ({
  position,
  text,
  isHovered,
  onPointerOver,
  onPointerOut,
  onClick,
}: {
  position: [number, number, number]
  text: string
  isHovered: boolean
  onPointerOver: () => void
  onPointerOut: () => void
  onClick: () => void
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
      fontSize={isHovered ? 0.2 : 0.15} // 마우스 오버 시 글자 크기 변경
      color={isHovered ? 'white' : 'gray'} // 마우스 오버 시 색상 변경
      anchorX="center"
      anchorY="middle"
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      onClick={onClick} // 클릭 이벤트 핸들러 추가
    >
      {text}
    </Text>
  )
}

// 구체 컴포넌트
const Sphere = ({
  setSelectedText,
}: {
  setSelectedText: (text: string) => void
}) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // 드래그 이벤트 핸들러
  const bind = useDrag((state) => {
    if (meshRef.current) {
      const {
        movement: [dx, dy],
        memo = { startQuaternion: meshRef.current.quaternion.clone() }, // 초기 쿼터니온 상태 저장
      } = state

      const rotationSpeed = 0.00008 // 드래그 속도 조절

      // 드래그 방향에 따라 회전
      const delta = new THREE.Vector2(dx, -dy)

      // 회전 축을 계산
      const axis = new THREE.Vector3(-delta.y, delta.x, 0).normalize()

      // 회전 양을 계산
      const rotationAmount = delta.length() * rotationSpeed

      // 회전 적용
      const quaternion = new THREE.Quaternion().setFromAxisAngle(
        axis,
        rotationAmount
      )
      meshRef.current.quaternion.copy(memo.startQuaternion)
      meshRef.current.quaternion.multiplyQuaternions(
        quaternion,
        meshRef.current.quaternion
      )
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
    '스페인',
    '브라질',
    '멕시코',
    '인도',
    '러시아',
    '이탈리아',
    '네덜란드',
    '스웨덴',
    '벨기에',
    '스위스',
    '터키',
    '남아프리카공화국',
    '아르헨티나',
    '칠레',
    '콜롬비아',
    '페루',
    '말레이시아',
    '싱가포르',
    '태국',
    '베트남',
    '필리핀',
    '이스라엘',
    '사우디아라비아',
    '아랍에미리트',
    '이란',
    '레바논',
    '이집트',
    '모로코',
    '알제리',
  ]

  // 균일하게 분포된 점을 사용
  const positions = fibonacciSphere(countries.length)

  return (
    <mesh ref={meshRef} {...bind()}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial
        color="lightgray"
        transparent={true}
        opacity={0}
        side={THREE.DoubleSide}
        depthWrite={false}
        depthTest={false}
      />
      {countries.map((country, index) => (
        <TextWithCameraOrientation
          key={index}
          position={positions[index]}
          text={country}
          isHovered={hoveredIndex === index}
          onPointerOver={() => setHoveredIndex(index)}
          onPointerOut={() => setHoveredIndex(null)}
          onClick={() => setSelectedText(country)} // 클릭 시 텍스트 설정
        />
      ))}
    </mesh>
  )
}

export default Sphere