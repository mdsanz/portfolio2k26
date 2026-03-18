'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface NodeGraphProps {
  accentColor: string;
  isMobile?: boolean;
}

export default function NodeGraph({ accentColor, isMobile = false }: NodeGraphProps) {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const count = isMobile ? 60 : 120;
  const connectionThreshold = isMobile ? 3.5 : 3.0;

  // Generate random particles once
  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3);
    const spreadX = isMobile ? 10 : 20;
    const spreadY = isMobile ? 16 : 16;
    const spreadZ = isMobile ? 5 : 8;

    for (let i = 0; i < count; i++) {
      temp[i * 3] = (Math.sin(i * 12.9898) * 0.5) * spreadX;
      temp[i * 3 + 1] = (Math.cos(i * 78.233) * 0.5) * spreadY;
      temp[i * 3 + 2] = (Math.sin(i * 45.123) * 0.5) * spreadZ;
    }
    return temp;
  }, [count, isMobile]);

  // Calculate connections
  const { lineGeometry, pointGeometry } = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const colors: number[] = [];
    const colorObj = new THREE.Color(accentColor);
    const particlePositions: THREE.Vector3[] = [];

    for (let i = 0; i < count; i++) {
      const p1 = new THREE.Vector3(particles[i * 3], particles[i * 3 + 1], particles[i * 3 + 2]);
      particlePositions.push(p1);
      
      for (let j = i + 1; j < count; j++) {
        const p2 = new THREE.Vector3(particles[j * 3], particles[j * 3 + 1], particles[j * 3 + 2]);
        const dist = p1.distanceTo(p2);
        
        if (dist < connectionThreshold) {
          points.push(p1, p2);
          const opacity = (1 - dist / connectionThreshold) * 0.5;
          colors.push(colorObj.r, colorObj.g, colorObj.b, opacity);
          colors.push(colorObj.r, colorObj.g, colorObj.b, opacity);
        }
      }
    }

    const lGeo = new THREE.BufferGeometry().setFromPoints(points);
    lGeo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 4));
    
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(particles, 3));

    return { lineGeometry: lGeo, pointGeometry: pGeo };
  }, [particles, accentColor, connectionThreshold, count]);

  // Cleanup geometries on unmount or change
  useEffect(() => {
    return () => {
      lineGeometry.dispose();
      pointGeometry.dispose();
    };
  }, [lineGeometry, pointGeometry]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.current.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
        mouse.current.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  useFrame((state) => {
    if (!groupRef.current || !innerRef.current) return;

    innerRef.current.rotation.y += 0.0005;
    innerRef.current.rotation.z += 0.0002;

    const targetRotationX = mouse.current.y * 0.15;
    const targetRotationY = mouse.current.x * 0.15;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.05);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.05);
  });

  return (
    <group ref={groupRef}>
      <group ref={innerRef}>
        {/* Particles as Points - Much more efficient than 140 meshes */}
        <points geometry={pointGeometry}>
          <pointsMaterial 
            color={accentColor} 
            size={0.12} 
            transparent 
            opacity={0.8} 
            sizeAttenuation={true}
          />
        </points>

        {/* Connections */}
        <lineSegments geometry={lineGeometry}>
          <lineBasicMaterial 
            vertexColors 
            transparent 
            blending={THREE.AdditiveBlending} 
            depthWrite={false}
          />
        </lineSegments>
      </group>
    </group>
  );
}
