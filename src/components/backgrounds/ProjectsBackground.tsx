'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useReducedMotion } from '@/src/hooks/useReducedMotion'
import { useTheme } from 'next-themes'
import * as THREE from 'three'

const chars = [
  '0','1','{','}','<','>','/','=',';',
  '(',')',  '[',']','fn','->','&&','||'
]

// Cache de atlas por color para evitar recrearlos
const atlasCache: Record<string, THREE.CanvasTexture> = {}

function getAtlasTexture(color: string): THREE.CanvasTexture {
  if (atlasCache[color]) return atlasCache[color]

  const charWidth = 64
  const canvas = document.createElement('canvas')
  canvas.width = charWidth * chars.length
  canvas.height = charWidth
  const ctx = canvas.getContext('2d')!
  
  ctx.fillStyle = color
  ctx.font = 'bold 40px "IBM Plex Mono", monospace'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  chars.forEach((char, i) => {
    ctx.fillText(char, charWidth * i + charWidth / 2, charWidth / 2)
  })

  const texture = new THREE.CanvasTexture(canvas)
  texture.magFilter = THREE.NearestFilter
  texture.minFilter = THREE.NearestFilter
  atlasCache[color] = texture
  return texture
}

const vertexShader = `
  varying vec2 vUv;
  attribute float aCharIndex;
  uniform float uCharCount;
  void main() {
    vUv = uv;
    vUv.x = (vUv.x + aCharIndex) / uCharCount;
    gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  varying vec2 vUv;
  uniform sampler2D uMap;
  uniform float uOpacity;
  void main() {
    vec4 tex = texture2D(uMap, vUv);
    if (tex.a < 0.1) discard;
    gl_FragColor = vec4(tex.rgb, tex.a * uOpacity);
  }
`

const MatrixRain = ({ color }: { color: string }) => {
  const count = 400 // 40 columnas * 10 caracteres
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const texture = useMemo(() => getAtlasTexture(color), [color])
  
  // Estado persistente de las partículas para evitar recrear objetos
  const [initialParticles] = useState(() => {
    return Array.from({ length: count }).map((_, i) => {
      const col = Math.floor(i / 10)
      return {
        x: (col - 20) * 0.75,
        y: Math.random() * 20 - 10,
        speed: 0.01 + Math.random() * 0.02,
        charIndex: Math.floor(Math.random() * chars.length)
      }
    })
  })
  const particles = useMemo(() => initialParticles, [initialParticles])

  // Atributo de instancia para el índice del carácter
  const charIndices = useMemo(() => new Float32Array(count), [])
  
  useEffect(() => {
    particles.forEach((p, i) => {
      charIndices[i] = p.charIndex
    })
  }, [particles, charIndices])

  useFrame(() => {
    if (!meshRef.current) return
    const dummy = new THREE.Object3D()
    let needsAttrUpdate = false
    
    particles.forEach((p, i) => {
      p.y -= p.speed
      if (p.y < -10) {
        p.y = 10 + Math.random() * 3
        p.charIndex = Math.floor(Math.random() * chars.length)
        charIndices[i] = p.charIndex
        needsAttrUpdate = true
      }
      dummy.position.set(p.x, p.y, 0)
      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.matrix)
    })
    
    meshRef.current.instanceMatrix.needsUpdate = true
    if (needsAttrUpdate) {
      meshRef.current.geometry.attributes.aCharIndex.needsUpdate = true
    }
  })

  const uniforms = useMemo(() => ({
    uMap: { value: texture },
    uOpacity: { value: 0.45 },
    uCharCount: { value: chars.length }
  }), [texture])

  return (
    <instancedMesh ref={meshRef} args={[null as any, null as any, count]}>
      <planeGeometry args={[0.45, 0.55]}>
        <instancedBufferAttribute 
          attach="attributes-aCharIndex" 
          args={[charIndices, 1]} 
        />
      </planeGeometry>
      <shaderMaterial 
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </instancedMesh>
  )
}

export function ProjectsBackground() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  if (!mounted || prefersReduced) return null

  const color = resolvedTheme === 'light' ? '#0F6E56' : '#1D9E75'

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.55,
      }}
    >
      <Canvas
        orthographic
        dpr={1}
        gl={{
          antialias: false,
          stencil: false,
          depth: false,
          alpha: true,
          powerPreference: 'high-performance',
          preserveDrawingBuffer: false,
          failIfMajorPerformanceCaveat: false,
        }}
        camera={{
          zoom: 60,
          near: 0.1, far: 20,
          position: [0, 0, 10],
        }}
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '100%', height: '100%',
        }}
        frameloop="always"
      >
        <MatrixRain color={color} />
      </Canvas>
    </div>
  )
}
