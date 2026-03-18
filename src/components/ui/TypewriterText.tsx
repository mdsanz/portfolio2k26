'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useReducedMotion } from '@/src/hooks/useReducedMotion';

const phrases = [
  "Building resilient systems",
  "Designing for scale",
  "Exploring Applied AI",
  "Crafting clean architectures",
];

type Phase = 'TYPING' | 'PAUSE' | 'DELETING' | 'NEXT';

export default function TypewriterText() {
  const prefersReducedMotion = useReducedMotion();
  const [displayText, setDisplayText] = useState('');
  const [phase, setPhase] = useState<Phase>('TYPING');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let timeout: NodeJS.Timeout;
    const currentPhrase = phrases[phraseIndex];

    if (phase === 'TYPING') {
      if (displayText.length < currentPhrase.length) {
        const delay = 65 + (Math.random() * 40 - 20);
        timeout = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        }, delay);
      } else {
        timeout = setTimeout(() => setPhase('PAUSE'), 0);
      }
    } else if (phase === 'PAUSE') {
      timeout = setTimeout(() => {
        setPhase('DELETING');
      }, 1800);
    } else if (phase === 'DELETING') {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 35);
      } else {
        timeout = setTimeout(() => setPhase('NEXT'), 0);
      }
    } else if (phase === 'NEXT') {
      timeout = setTimeout(() => {
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
        setPhase('TYPING');
      }, 0);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [displayText, phase, phraseIndex, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <div className="h-6 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={phraseIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="font-mono text-text-secondary"
            onAnimationComplete={() => {
              setTimeout(() => {
                setPhraseIndex((prev) => (prev + 1) % phrases.length);
              }, 2500);
            }}
          >
            {phrases[phraseIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
    );
  }

  return (
    <span className="font-mono" style={{ color: 'var(--color-text-secondary)' }}>
      {displayText}
      <span 
        className={`inline-block ml-1 w-[0.6em] h-[1em] translate-y-[0.1em] bg-accent-secondary ${phase === 'PAUSE' ? 'animate-cursor-blink' : ''}`}
        style={{ backgroundColor: 'var(--color-accent-secondary)' }}
      >
        ▋
      </span>
    </span>
  );
}
