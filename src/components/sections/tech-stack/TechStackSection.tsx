'use client';

import { useState, useEffect } from 'react';
import { useMediaQuery } from '@/src/hooks/useMediaQuery';
import { motion } from 'framer-motion';
import TechDiagram from './TechDiagram';
import MobileDiagram from './MobileDiagram';
import { TechAccordion } from './TechAccordion';

import { TechStackBackground } from '@/src/components/backgrounds';

export function TechStackSection() {
  const [mounted, setMounted] = useState(false);
  const isMobile = useMediaQuery('(max-width: 639px)');
  const isDesktop = useMediaQuery('(min-width: 1025px)');
  const isMobileLandscape = useMediaQuery(
    '(max-width: 900px) and (orientation: landscape) and (max-height: 500px)'
  );
  // Tablet = todo lo que no es móvil ni desktop
  const isTablet = !isMobile && !isDesktop && !isMobileLandscape;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section id="tech-stack" style={{ padding: '120px 0' }} className="bg-bg-base relative overflow-hidden">
        <TechStackBackground />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span className="font-ui text-xs uppercase tracking-[0.2em] text-accent-secondary mb-4 block">
              Tech Stack
            </span>
            <h2 style={{ 
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 5vw, 48px)',
              color: 'var(--color-text-primary)'
            }}>
              Arquitectura del sistema
            </h2>
          </div>
          <div style={{ width: '100%', height: '850px' }} />
        </div>
      </section>
    );
  }

  return (
    <section id="tech-stack" style={{ padding: '120px 0' }} className="bg-bg-base relative overflow-hidden">
      <TechStackBackground />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header centrado */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-ui text-xs uppercase tracking-[0.2em] text-accent-secondary mb-4 block"
          >
            Tech Stack
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ 
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 5vw, 48px)',
              color: 'var(--color-text-primary)'
            }}
          >
            Arquitectura del sistema
          </motion.h2>
        </div>

        {/* Desktop Layout */}
        {isDesktop && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '380px 1fr',
            gap: '48px',
            alignItems: 'start',
          }}>
            <div style={{
              position: 'sticky',
              top: '100px',
              paddingRight: '8px',
            }}>
              <TechAccordion />
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              style={{ width: '100%' }}
            >
              <TechDiagram isTablet={false} />
            </motion.div>
          </div>
        )}

        {/* Tablet Layout (Grid 40/60 con MobileDiagram) */}
        {isTablet && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '300px 1fr',
            gap: '32px',
            alignItems: 'start',
          }}>
            <TechAccordion />
            <MobileDiagram />
          </div>
        )}

        {/* Mobile Layout (incluye landscape pequeño) */}
        {(isMobile || isMobileLandscape) && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '48px',
          }}>
            <MobileDiagram />
            <TechAccordion />
          </div>
        )}
      </div>
    </section>
  );
}
