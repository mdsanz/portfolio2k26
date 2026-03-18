'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import NodeGraph from './NodeGraph';
import { useIsMobile } from '@/src/hooks/use-mobile';

interface NodeGraphCanvasProps {
  accentColor: string;
}

export default function NodeGraphCanvas({ accentColor }: NodeGraphCanvasProps) {
  const isMobile = useIsMobile();

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'low-power', // Use low-power to be safe
          stencil: false,
          depth: false
        }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <NodeGraph accentColor={accentColor} isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  );
}
