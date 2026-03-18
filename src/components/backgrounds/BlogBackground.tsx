'use client';

import { useState, useEffect } from 'react';
import { useReducedMotion } from '@/src/hooks/useReducedMotion';
import { useTheme } from 'next-themes';

const words = [
  'const', 'async', 'await', 'interface', 'type', 'extends',
  'function', 'return', 'export', 'import', 'class', 'static',
  '@Bean', '@Service', 'kubectl', 'docker run', 'git push',
  'SELECT *', 'JOIN', 'kubectl apply', 'npm run', 'mvn install',
];

export const BlogBackground = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const [floatingWords] = useState(() => Array.from({ length: 18 }).map((_, i) => ({
    text: words[i % words.length],
    x: `${Math.random() * 90}%`,
    y: `${Math.random() * 90}%`,
    duration: 12 + Math.random() * 16,
    delay: Math.random() * 10,
    fontSize: 11 + Math.random() * 7,
    opacity: 0.15 + Math.random() * 0.2,
  })));

  const prefersReduced = useReducedMotion();
  if (prefersReduced) return null;

  const color = mounted
    ? (resolvedTheme === 'light' ? '#534AB7' : '#7F77DD')
    : '#7F77DD';

  return (
    <div style={{
      position: 'absolute', inset: 0,
      overflow: 'hidden', pointerEvents: 'none',
      zIndex: 0,
    }}>
      <style>{`
        @keyframes float-word {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-15px); }
        }
      `}</style>
      {floatingWords.map((word, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            left: word.x,
            top: word.y,
            fontFamily: 'var(--font-mono)',
            fontSize: `${word.fontSize}px`,
            color: color,
            opacity: word.opacity,
            animation: `float-word ${word.duration}s ease-in-out infinite ${word.delay}s`,
            whiteSpace: 'nowrap',
          }}
        >
          {word.text}
        </span>
      ))}
    </div>
  );
};
