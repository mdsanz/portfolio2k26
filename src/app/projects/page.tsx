'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { projects } from '@/src/data/projects'
import { ProjectCard } from '@/src/components/sections/projects/ProjectCard'
import { ThemeToggle } from '@/src/components/ui/ThemeToggle'
import { useMediaQuery } from '@/src/hooks/useMediaQuery'

function BackLink({ isMobile }: { isMobile: boolean }) {
  const handleBack = () => {
    window.location.href = '/'
  }

  return (
    <button
      onClick={handleBack}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        fontFamily: 'var(--font-ui)',
        fontSize: '14px',
        color: 'var(--color-text-secondary)',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        transition: 'color 0.2s ease',
      }}
      onMouseEnter={e =>
        (e.currentTarget.style.color = 'var(--color-text-primary)')}
      onMouseLeave={e =>
        (e.currentTarget.style.color = 'var(--color-text-secondary)')}
    >
      <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
        <path d="M19 12H5M12 19l-7-7 7-7"
          stroke="currentColor" strokeWidth="1.5"
          strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      {!isMobile && 'Volver al portfolio'}
    </button>
  )
}

function ProjectsNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const isMobile = useMediaQuery('(max-width: 640px)')

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      height: '64px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: isMobile ? '0 24px' : '0 48px',
      zIndex: 100,
      background: scrolled
        ? 'rgba(13, 13, 15, 0.85)'
        : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled
        ? '1px solid var(--color-border)'
        : '1px solid transparent',
      transition: 'all 0.3s ease',
    }}>

      {/* Link de regreso */}
      <BackLink isMobile={isMobile} />

      {/* Logo / nombre centrado */}
      {!isMobile && (
        <span style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--font-display)',
          fontSize: '16px',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          letterSpacing: '-0.02em',
        }}>
          Proyectos
        </span>
      )}

      {/* ThemeToggle derecha */}
      <ThemeToggle />
    </nav>
  )
}

function ProjectsPageBackground() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      {/* Gradiente radial sutil */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '800px',
        height: '600px',
        background: `radial-gradient(
          ellipse at center,
          rgba(29, 158, 117, 0.06) 0%,
          transparent 70%
        )`,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        right: '-10%',
        width: '600px',
        height: '600px',
        background: `radial-gradient(
          ellipse at center,
          rgba(127, 119, 221, 0.05) 0%,
          transparent 70%
        )`,
        pointerEvents: 'none',
      }} />

      {/* Grid de puntos sutil */}
      <svg
        width="100%"
        height="100%"
        style={{ position: 'absolute', inset: 0, opacity: 0.15 }}
      >
        <defs>
          <pattern
            id="dots"
            x="0" y="0"
            width="32" height="32"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="1"
              fill="var(--color-border)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
    </div>
  )
}

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const isMobile = useMediaQuery('(max-width: 640px)')
  const isTablet = useMediaQuery('(min-width: 641px) and (max-width: 1024px)')

  const filters = [
    { id: 'all',       label: 'Todos' },
    { id: 'completed', label: 'Completados' },
    { id: 'in-progress', label: 'En progreso' },
    { id: 'coming-soon', label: 'Próximamente' },
  ]

  // Filtrar proyectos según filtro activo
  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.status === activeFilter)

  // Grid columns logic
  const gridColumns = isMobile 
    ? '1fr' 
    : isTablet 
      ? 'repeat(2, 1fr)' 
      : 'repeat(auto-fill, minmax(340px, 1fr))'

  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      background: 'var(--color-bg-base)',
    }}>
      {/* Fondo animado — reemplazado por versión CSS para performance */}
      <ProjectsPageBackground />

      {/* Navbar */}
      <ProjectsNavbar />

      {/* Contenido */}
      <main style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '1200px',
        margin: '0 auto',
        padding: isMobile ? '0 24px 80px' : '0 48px 80px',
      }}>
        {/* Header con stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{
            paddingTop: '120px',
            paddingBottom: '60px',
            borderBottom: '1px solid var(--color-border)',
            marginBottom: '60px',
          }}
        >
          {/* Eyebrow */}
          <span style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '11px',
            fontWeight: 500,
            color: 'var(--color-accent-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            display: 'block',
            marginBottom: '12px',
          }}>
            Todos los proyectos
          </span>

          {/* Título */}
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 6vw, 64px)',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            margin: '0 0 16px',
            lineHeight: 1.1,
          }}>
            Lo que he construido
          </h1>

          {/* Descripción */}
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '14px',
            lineHeight: 1.8,
            color: 'var(--color-text-secondary)',
            margin: '0 0 32px',
            maxWidth: '560px',
          }}>
            Proyectos personales donde experimento con nuevas tecnologías,
            patrones de arquitectura y herramientas que me interesan fuera
            del trabajo.
          </p>

          {/* Stats rápidos */}
          <div style={{
            display: 'flex',
            gap: isMobile ? '16px 24px' : '32px',
            flexWrap: 'wrap',
          }}>
            {[
              {
                value: projects.filter(p => p.status === 'completed').length,
                label: 'Completados',
                color: '#1D9E75',
              },
              {
                value: projects.filter(p => p.status === 'in-progress').length,
                label: 'En progreso',
                color: '#EF9F27',
              },
              {
                value: projects.filter(p => p.status === 'coming-soon').length,
                label: 'Próximamente',
                color: '#7F77DD',
              },
            ].map(stat => (
              <div key={stat.label} style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '8px',
              }}>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '32px',
                  fontWeight: 700,
                  color: stat.color,
                  lineHeight: 1,
                }}>
                  {stat.value}
                </span>
                <span style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '13px',
                  color: 'var(--color-text-muted)',
                }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Filtros */}
        <div style={{
          display: 'flex',
          gap: '8px',
          flexWrap: 'nowrap',
          overflowX: isMobile ? 'auto' : 'visible',
          marginBottom: '40px',
          paddingBottom: isMobile ? '8px' : '0',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}>
          {filters.map(filter => {
            const isActive = filter.id === activeFilter
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                style={{
                  padding: '6px 16px',
                  borderRadius: '999px',
                  border: `1px solid ${isActive
                    ? 'var(--color-accent-primary)'
                    : 'var(--color-border)'}`,
                  background: isActive
                    ? 'var(--color-accent-primary)15'
                    : 'transparent',
                  fontFamily: 'var(--font-ui)',
                  fontSize: '13px',
                  fontWeight: isActive ? 500 : 400,
                  color: isActive
                    ? 'var(--color-accent-primary)'
                    : 'var(--color-text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                {filter.label}
              </button>
            )
          })}
        </div>

        {/* Grid de proyectos */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              display: 'grid',
              gridTemplateColumns: gridColumns,
              gap: '24px',
            }}
          >
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <ProjectCard project={project} isActive={false} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state si no hay proyectos en el filtro */}
        {filteredProjects.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '80px 0',
            color: 'var(--color-text-muted)',
            fontFamily: 'var(--font-mono)',
            fontSize: '14px',
          }}>
            No hay proyectos en esta categoría aún.
          </div>
        )}
      </main>
    </div>
  )
}
