import {
  MeshProps,
  SphereGeometryProps,
  MeshStandardMaterialProps,
} from '@react-three/fiber'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      mesh: MeshProps
      sphereGeometry: SphereGeometryProps
      meshStandardMaterial: MeshStandardMaterialProps
      ambientLight: any
      pointLight: any
    }
  }
}
