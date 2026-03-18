'use client';

import { useEffect, useState } from 'react';
import { motion, Variants } from 'motion/react';
import { useTheme } from 'next-themes';
import { useReducedMotion } from '@/src/hooks/useReducedMotion';
import { useMediaQuery } from '@/src/hooks/useMediaQuery';
import NodeGraphCanvas from '@/src/components/three/NodeGraphCanvas';
import TypewriterText from '@/src/components/ui/TypewriterText';
import CTAButton from '@/src/components/ui/CTAButton';

export default function HeroSection() {
  const { resolvedTheme } = useTheme();
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const handleClick = () => {
    // Disparar evento custom que PresentationLayout escucha
    window.dispatchEvent(new CustomEvent('portfolio:next-section'));
  };

  const accentColor = mounted
    ? (resolvedTheme === 'light' ? '#534AB7' : '#7F77DD')
    : '#7F77DD';

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  // Disable animations if reduced motion is preferred
  const animationProps = prefersReducedMotion 
    ? { initial: 'visible', animate: 'visible' } 
    : { initial: 'hidden', animate: 'visible' };

  return (
    <section 
      id="hero" 
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-bg-base"
    >
      {/* Background Canvas */}
      <NodeGraphCanvas accentColor={accentColor} />

      {/* Content */}
      <motion.div 
        className="relative z-10 text-center px-6 max-w-5xl"
        variants={containerVariants}
        {...animationProps}
      >
        <motion.span 
          className="block mb-4 text-accent-secondary font-ui uppercase tracking-[0.3em] text-xs md:text-sm font-medium"
          variants={itemVariants}
        >
          Backend Engineer & Systems Designer
        </motion.span>

        <motion.h1 
          className="font-display font-bold text-text-primary leading-[1.1] mb-6"
          style={{ fontSize: 'clamp(3.5rem, 10vw, 6rem)' }}
          variants={itemVariants}
        >
          John Doe
        </motion.h1>

        <motion.div 
          className="font-mono text-text-secondary text-base md:text-xl mb-10 h-8 flex items-center justify-center"
          variants={itemVariants}
        >
          <TypewriterText />
        </motion.div>

        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
          variants={itemVariants}
        >
          <CTAButton 
            variant="primary" 
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              window.dispatchEvent(new CustomEvent('portfolio:navigate', { detail: { index: 3 } }));
            }}
          >
            Ver proyectos
          </CTAButton>
          <CTAButton 
            variant="secondary" 
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              window.dispatchEvent(new CustomEvent('portfolio:navigate', { detail: { index: 7 } }));
            }}
          >
            Contacto
          </CTAButton>
        </motion.div>
      </motion.div>

      {/* Indicador de scroll — nuevo */}
      <ScrollIndicator onClick={handleClick} />
    </section>
  );
}

function ScrollIndicator({ onClick }: { onClick: () => void }) {
  const isMobile = useMediaQuery('(max-width: 640px)');
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 0.8 }}
      onClick={onClick}
      whileHover={{ x: -4 }}
      style={{
        position: 'absolute',
        bottom: isMobile ? '24px' : '40px',
        right: isMobile ? '24px' : '40px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        cursor: 'pointer',
        zIndex: 10,
      }}
    >
      {/* Texto "scroll" rotado verticalmente */}
      <motion.span
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        onMouseEnter={e => {
          e.currentTarget.style.color = 'var(--color-accent-primary)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.color = 'var(--color-text-muted)'
        }}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          fontWeight: 500,
          color: 'var(--color-text-muted)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
          transform: 'rotate(180deg)',
          userSelect: 'none',
        }}
      >
        scroll
      </motion.span>

      {/* Línea vertical con partícula animada */}
      <div style={{
        position: 'relative',
        width: '1px',
        height: isMobile ? '50px' : '80px',
        background: 'var(--color-border)',
        overflow: 'hidden',
      }}>
        {/* Partícula que cae por la línea en loop */}
        <motion.div
          animate={{ y: ['-100%', '200%'] }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            ease: 'easeIn',
            repeatDelay: 0.3,
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '1px',
            height: '30%',
            background: `linear-gradient(
              to bottom,
              transparent,
              var(--color-accent-primary),
              transparent
            )`,
          }}
        />
      </div>
    </motion.div>
  );
}
