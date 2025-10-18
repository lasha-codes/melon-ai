'use client'

import { Suspense, memo, useMemo } from 'react'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import {
  Decal,
  Float,
  Html,
  OrbitControls,
  Preload,
  useTexture,
} from '@react-three/drei'
import CanvasLoader from './canvas.loader'
import logo from '../../../public/logo.webp'

const LogoBall = memo(() => {
  const [decal] = useTexture([logo.src])

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1, 1), [])
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#fff',
        polygonOffset: true,
        polygonOffsetFactor: -5,
        flatShading: true,
      }),
    []
  )

  return (
    <Float speed={1.25} rotationIntensity={0.7} floatIntensity={1.5}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[0, 0, 0.1]} />

      <mesh
        castShadow
        receiveShadow
        geometry={geometry}
        material={material}
        scale={2.1}
      >
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={0.9}
          map={decal}
        />
      </mesh>
    </Float>
  )
})

const LogoCanvas = () => {
  return (
    <Canvas
      frameloop='always'
      dpr={2}
      gl={{
        powerPreference: 'default',
        precision: 'highp',
      }}
      camera={{ position: [0, 0, 4] }}
      className='!max-w-[200px]'
    >
      <Suspense
        fallback={
          <Html center>
            <CanvasLoader />
          </Html>
        }
      >
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <LogoBall />
      </Suspense>
      <Preload all />
    </Canvas>
  )
}

export default LogoCanvas
