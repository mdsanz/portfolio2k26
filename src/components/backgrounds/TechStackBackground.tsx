'use client';

import { useReducedMotion } from '@/src/hooks/useReducedMotion';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export const TechStackBackground = () => {
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

  const traces = [
    { d: "M 0 120 H 200 V 80 H 400 V 160 H 600", color: primaryColor, dur: "3s", delay: "0s" },
    { d: "M 100 0 V 100 H 300 V 200 H 500", color: secondaryColor, dur: "4s", delay: "1s" },
    { d: "M 800 150 H 600 V 250 H 400 V 100 H 200", color: primaryColor, dur: "3.5s", delay: "0.5s" },
    { d: "M 0 400 H 150 V 350 H 300 V 450 H 500", color: secondaryColor, dur: "2.8s", delay: "1.5s" },
    { d: "M 1000 100 V 300 H 800 V 500 H 600", color: primaryColor, dur: "4.2s", delay: "2s" },
    { d: "M 200 600 H 400 V 500 H 600 V 700 H 800", color: secondaryColor, dur: "3.2s", delay: "0.2s" },
    { d: "M 500 0 V 150 H 700 V 50 H 900", color: primaryColor, dur: "3.8s", delay: "1.2s" },
    { d: "M 0 800 H 200 V 750 H 400 V 850 H 600", color: secondaryColor, dur: "3.5s", delay: "0.8s" },
  ];

  return (
    <div style={{
      position: 'absolute', inset: 0,
      overflow: 'hidden', pointerEvents: 'none',
      zIndex: 0, opacity: 0.4,
    }}>
      <svg width="100%" height="100%" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="0" cy="0" r="1.5" fill="currentColor" opacity="0.3" />
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" className="text-text-muted" />
        
        {traces.map((trace, i) => (
          <path
            key={i}
            d={trace.d}
            fill="none"
            stroke={trace.color}
            strokeWidth="1"
            opacity="0.5"
            strokeDasharray="8 4"
          >
            <animateTransform
              attributeName="stroke-dashoffset"
              from="0" to="-48"
              dur={trace.dur}
              begin={trace.delay}
              repeatCount="indefinite"
            />
          </path>
        ))}
      </svg>
    </div>
  );
};
