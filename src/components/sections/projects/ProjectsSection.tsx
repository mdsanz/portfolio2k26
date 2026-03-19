'use client';

import React from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { projects } from '@/src/data/projects';
import { ProjectCarousel } from './ProjectCarousel';
import { ProjectsBackground } from '@/src/components/backgrounds/ProjectsBackground';

export function ProjectsSection() {
  return (
    <section style={{
      position: 'relative', minHeight: '100vh', padding: '80px 0',
    }}>
      <ProjectsBackground />
      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: '900px', margin: '0 auto', padding: '0 48px',
      }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ 
            marginBottom: '48px', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <div>
            <span style={{
              fontFamily: 'var(--font-ui)', fontSize: '11px',
              fontWeight: 500, color: 'var(--color-accent-secondary)',
              textTransform: 'uppercase', letterSpacing: '0.1em',
              display: 'block', marginBottom: '8px',
            }}>
              Proyectos
            </span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 700, color: 'var(--color-text-primary)', margin: 0,
            }}>
              Lo que he construido
            </h2>
          </div>

          <Link href="/projects" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            fontFamily: 'var(--font-ui)', fontSize: '14px', fontWeight: 500,
            color: 'var(--color-accent-primary)', textDecoration: 'none',
            padding: '10px 20px', borderRadius: '8px',
            border: '1px solid var(--color-border)',
            background: 'var(--color-bg-surface)',
            transition: 'all 0.2s ease',
            marginBottom: '4px',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'var(--color-accent-primary)';
            e.currentTarget.style.background = 'var(--color-accent-primary)15';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'var(--color-border)';
            e.currentTarget.style.background = 'var(--color-bg-surface)';
          }}
          >
            Ver todos
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </motion.div>

        {/* Carrusel directo — sin tabs */}
        <ProjectCarousel projects={projects} />
      </div>
    </section>
  );
}
