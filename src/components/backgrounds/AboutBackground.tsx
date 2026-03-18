'use client';

import { useReducedMotion } from '@/src/hooks/useReducedMotion';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const shapes = [
  { type: 'triangle', size: 80,  x: '10%', y: '20%', duration: 18, delay: 0,   anim: 'float-1' },
  { type: 'hexagon',  size: 60,  x: '80%', y: '15%', duration: 22, delay: 3,   anim: 'float-2' },
  { type: 'triangle', size: 50,  x: '70%', y: '70%', duration: 16, delay: 6,   anim: 'float-3' },
  { type: 'hexagon',  size: 90,  x: '15%', y: '75%', duration: 24, delay: 2,   anim: 'float-1' },
  { type: 'triangle', size: 40,  x: '50%', y: '40%', duration: 20, delay: 8,   anim: 'float-2' },
  { type: 'hexagon',  size: 70,  x: '90%', y: '50%', duration: 26, delay: 4,   anim: 'float-3' },
  { type: 'triangle', size: 65,  x: '30%', y: '10%', duration: 19, delay: 1,   anim: 'float-2' },
  { type: 'hexagon',  size: 55,  x: '60%', y: '85%', duration: 23, delay: 5,   anim: 'float-1' },
  { type: 'triangle', size: 45,  x: '85%', y: '80%', duration: 17, delay: 7,   anim: 'float-3' },
  { type: 'hexagon',  size: 75,  x: '5%',  y: '45%', duration: 25, delay: 3,   anim: 'float-2' },
  { type: 'triangle', size: 50,  x: '40%', y: '90%', duration: 21, delay: 9,   anim: 'float-1' },
  { type: 'hexagon',  size: 65,  x: '25%', y: '60%', duration: 28, delay: 2,   anim: 'float-3' },
];

export const AboutBackground = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const prefersReduced = useReducedMotion();

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  if (prefersReduced) return null;

  const primaryColor = mounted
    ? (resolvedTheme === 'light' ? '#534AB7' : '#7F77DD')
    : '#7F77DD';
  const secondaryColor = mounted
    ? (resolvedTheme === 'light' ? '#0F6E56' : '#1D9E75')
    : '#1D9E75';

  return (
    <>
      <style>{`
        @keyframes float-1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25%      { transform: translate(10px, -15px) rotate(5deg); }
          50%      { transform: translate(-5px, -25px) rotate(-3deg); }
          75%      { transform: translate(-12px, -10px) rotate(4deg); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33%      { transform: translate(-15px, 10px) rotate(-8deg); }
          66%      { transform: translate(12px, 20px) rotate(6deg); }
        }
        @keyframes float-3 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50%      { transform: translate(15px, -20px) rotate(12deg); }
        }
      `}</style>
      <div style={{
        position: 'absolute', inset: 0,
        overflow: 'hidden', pointerEvents: 'none',
        zIndex: 0, opacity: 0.5,
      }}>
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0 }}>
          {shapes.map((shape, i) => (
            <g key={i} transform={`translate(${parseFloat(shape.x)}, ${parseFloat(shape.y)})`}>
              <g style={{
                animation: `${shape.anim} ${shape.duration}s ease-in-out infinite ${shape.delay}s`,
                opacity: 0.3
              }}>
                {shape.type === 'triangle' ? (
                  <path
                    d={`M ${shape.size/20} 0 L ${shape.size/10} ${shape.size/10} L 0 ${shape.size/10} Z`}
                    fill="none"
                    stroke={i % 2 === 0 ? primaryColor : secondaryColor}
                    strokeWidth="0.2"
                  />
                ) : (
                  <path
                    d={`M ${shape.size/20} 0 L ${shape.size/10} ${shape.size/40} L ${shape.size/10} ${3*shape.size/40} L ${shape.size/20} ${shape.size/10} L 0 ${3*shape.size/40} L 0 ${shape.size/40} Z`}
                    fill="none"
                    stroke={i % 2 === 0 ? secondaryColor : primaryColor}
                    strokeWidth="0.2"
                  />
                )}
              </g>
            </g>
          ))}
        </svg>
      </div>
    </>
  );
};
