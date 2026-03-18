'use client';

import { useRef, useMemo, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { useReducedMotion } from '@/src/hooks/useReducedMotion';
import { useTheme } from 'next-themes';
import * as THREE from 'three';

const ParticleLayer = ({ count, size, color, speedRange }: { count: number, size: number, color: string, speedRange: [number, number] }) => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const [positions] = useState(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return pos;
  });

  const [speeds] = useState(() => {
    return Array.from({ length: count }).map(() => speedRange[0] + Math.random() * (speedRange[1] - speedRange[0]));
  });

  useFrame((state) => {
    if (pointsRef.current) {
      const posAttr = pointsRef.current.geometry.attributes.position;
      for (let i = 0; i < count; i++) {
        // @ts-ignore
        posAttr.array[i * 3 + 1] += speeds[i];
        // @ts-ignore
        posAttr.array[i * 3] += Math.sin(state.clock.elapsedTime + i) * 0.002;
        
        // @ts-ignore
        if (posAttr.array[i * 3 + 1] > 5) {
          // @ts-ignore
          posAttr.array[i * 3 + 1] = -5;
          // @ts-ignore
          posAttr.array[i * 3] = (Math.random() - 0.5) * 16;
        }
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color={color}
        size={size}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
};

export const CertificationsBackground = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const prefersReduced = useReducedMotion();

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  if (prefersReduced) return null;

  const color1 = mounted
    ? (resolvedTheme === 'light' ? '#534AB7' : '#7F77DD')
    : '#7F77DD';
  const color2 = mounted
    ? (resolvedTheme === 'light' ? '#534AB7' : '#7F77DD')
    : '#7F77DD';

  return (
    <div style={{
      position: 'absolute', inset: 0,
      overflow: 'hidden', pointerEvents: 'none',
      zIndex: 0, opacity: 0.5,
    }}>
      <Suspense fallback={null}>
        <Canvas 
          camera={{ position: [0, 0, 8], fov: 60 }}
          dpr={[1, 1.5]}
          gl={{ 
            antialias: false, 
            powerPreference: 'low-power',
            stencil: false,
            depth: false
          }}
        >
          <ParticleLayer count={100} size={0.06} color={color1} speedRange={[0.003, 0.008]} />
          <ParticleLayer count={50} size={0.12} color={color2} speedRange={[0.001, 0.004]} />
        </Canvas>
      </Suspense>
    </div>
  );
};
