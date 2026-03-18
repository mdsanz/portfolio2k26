'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '@/src/data/projects';
import { ProjectCard } from './ProjectCard';
import { useMediaQuery } from '@/src/hooks/useMediaQuery';

const CAROUSEL_LIMIT = 3; // máximo de proyectos en el carrusel

interface ProjectCarouselProps {
  projects: Project[];
}

function CarouselButton({
  direction,
  onClick,
  disabled,
}: {
  direction: 'prev' | 'next';
  onClick: () => void;
  disabled: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isPrev = direction === 'prev';

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      onHoverStart={() => !disabled && setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{
        opacity: disabled ? 0.3 : 1,
      }}
      style={{
        width: isMobile ? '36px' : '44px',
        height: isMobile ? '36px' : '44px',
        borderRadius: '50%',
        border: `1px solid ${hovered && !disabled
          ? 'var(--color-accent-primary)'
          : 'var(--color-border)'}`,
        background: hovered && !disabled
          ? 'var(--color-accent-primary)15'
          : 'var(--color-bg-surface)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s ease',
        flexShrink: 0,
      }}
    >
      <motion.svg
        width={16} height={16} viewBox="0 0 24 24" fill="none"
        animate={{ x: hovered && !disabled
          ? (isPrev ? -2 : 2)
          : 0
        }}
        transition={{ duration: 0.2 }}
      >
        <path
          d={isPrev ? 'M15 18L9 12L15 6' : 'M9 18L15 12L9 6'}
          stroke={hovered && !disabled
            ? 'var(--color-accent-primary)'
            : 'var(--color-text-secondary)'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
    </motion.button>
  );
}

export function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = siguiente, -1 = anterior
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Solo mostrar los primeros CAROUSEL_LIMIT proyectos
  const carouselProjects = projects.slice(0, CAROUSEL_LIMIT);
  const isFirst = currentIndex === 0;
  const isLast  = currentIndex === carouselProjects.length - 1;

  const goNext = () => {
    if (isLast) return;
    setDirection(1);
    setCurrentIndex(prev => prev + 1);
  };

  const goPrev = () => {
    if (isFirst) return;
    setDirection(-1);
    setCurrentIndex(prev => prev - 1);
  };

  const goTo = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 0,
      scale: 0.95,
    }),
  };

  const transition = {
    x: {
      type: 'tween',
      duration: 0.45,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
    opacity: { duration: 0.3 },
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

      {/* Wrapper externo — recorta lo que sobresale */}
      <div style={{
        width: '100%',
        overflow: 'hidden',
        marginBottom: '32px',
      }}>

        {/* Stage */}
        <div style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          minHeight: '440px',
          padding: '20px 0',
        }}>

          {/* Card ACTIVA — centro */}
          <div style={{
            position: 'relative',
            width: '100%',
            zIndex: 10,
          }}>
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={transition}
              >
                <ProjectCard
                  project={carouselProjects[currentIndex]}
                  isActive
                />
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* Controles: prev + dots + next */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
      }}>

        {/* Botón anterior */}
        <CarouselButton
          direction="prev"
          onClick={goPrev}
          disabled={isFirst}
        />

        {/* Dots indicadores */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {carouselProjects.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: i === currentIndex ? (isMobile ? '16px' : '24px') : (isMobile ? '6px' : '8px'),
                height: isMobile ? '6px' : '8px',
                borderRadius: '999px',
                border: 'none',
                background: i === currentIndex
                  ? 'var(--color-accent-primary)'
                  : 'var(--color-border)',
                cursor: 'pointer',
                padding: 0,
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>

        {/* Botón siguiente o Ver todos */}
        {isLast ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              href="/projects"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: isMobile ? '36px' : '44px',
                height: isMobile ? '36px' : '44px',
                borderRadius: '50%',
                border: '1px solid var(--color-accent-primary)',
                background: 'var(--color-accent-primary)',
                color: '#ffffff',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                flexShrink: 0,
              }}
              title="Ver todos los proyectos"
            >
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </Link>
          </motion.div>
        ) : (
          <CarouselButton
            direction="next"
            onClick={goNext}
            disabled={false}
          />
        )}
      </div>

    </div>
  );
}
