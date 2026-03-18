'use client';

import { useReducedMotion } from '@/src/hooks/useReducedMotion';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export const ContactBackground = () => {
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
    <div style={{
      position: 'absolute', inset: 0,
      overflow: 'hidden', pointerEvents: 'none',
      zIndex: 0, opacity: 0.2,
    }}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        {[0, 0.8, 1.6, 2.4, 3.2].map((delay, i) => (
          <circle key={`p-${i}`} cx="50" cy="50" r="0" fill="none" stroke={primaryColor} strokeWidth="0.5">
            <animate attributeName="r" from="5" to="50" dur="4s" begin={`${delay}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" from="0.4" to="0" dur="4s" begin={`${delay}s`} repeatCount="indefinite" />
          </circle>
        ))}
        {[2, 2.8, 3.6, 4.4, 5.2].map((delay, i) => (
          <circle key={`s-${i}`} cx="50" cy="50" r="0" fill="none" stroke={secondaryColor} strokeWidth="0.5">
            <animate attributeName="r" from="5" to="50" dur="4s" begin={`${delay}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" from="0.4" to="0" dur="4s" begin={`${delay}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </svg>
    </div>
  );
};
