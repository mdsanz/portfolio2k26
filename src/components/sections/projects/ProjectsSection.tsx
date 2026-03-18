'use client';

import React from 'react';
import { motion } from 'motion/react';
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
          style={{ marginBottom: '48px' }}
        >
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
        </motion.div>

        {/* Carrusel directo — sin tabs */}
        <ProjectCarousel projects={projects} />
      </div>
    </section>
  );
}
