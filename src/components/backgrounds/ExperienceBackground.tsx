'use client';

import { useReducedMotion } from '@/src/hooks/useReducedMotion';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export const ExperienceBackground = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const prefersReduced = useReducedMotion();

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  if (prefersReduced) return null;

  const color = mounted
    ? (resolvedTheme === 'light' ? '#534AB7' : '#7F77DD')
    : '#7F77DD';

  const lines = [
    { x: '10%', delay: 0 },
    { x: '30%', delay: 0.8 },
    { x: '50%', delay: 1.6 },
    { x: '70%', delay: 2.4 },
    { x: '90%', delay: 3.2 },
  ];

  return (
    <div style={{
      position: 'absolute', inset: 0,
      overflow: 'hidden', pointerEvents: 'none',
      zIndex: 0, opacity: 0.5,
    }}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0 }}>
        {lines.map((line, i) => (
          <g key={i}>
            <path
              id={`line-${i}`}
              d={`M ${parseFloat(line.x)} 0 V 100`}
              stroke={color}
              strokeWidth="0.1"
              opacity="0.3"
            />
            <circle r="0.5" fill={color} opacity="0.8">
              <animateMotion
                dur="4s"
                repeatCount="indefinite"
                begin={`${line.delay}s`}
              >
                <mpath href={`#line-${i}`} />
              </animateMotion>
            </circle>
            <circle r="0.5" fill="none" stroke={color}>
              <animateMotion
                dur="4s"
                repeatCount="indefinite"
                begin={`${line.delay}s`}
              >
                <mpath href={`#line-${i}`} />
              </animateMotion>
              <animate attributeName="r" from="0.5" to="2" dur="1s"
                repeatCount="indefinite" begin={`${line.delay}s`} />
              <animate attributeName="opacity" from="0.6" to="0"
                dur="1s" repeatCount="indefinite" begin={`${line.delay}s`} />
            </circle>
          </g>
        ))}
      </svg>
    </div>
  );
};
