'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Project } from '@/src/data/projects';
import { useMediaQuery } from '@/src/hooks/useMediaQuery';

interface ProjectCardProps {
  project: Project;
  isActive: boolean; // controla la animación
}

const statusConfig = {
  'completed':   { label: 'Completado',   color: '#1D9E75' },
  'in-progress': { label: 'En progreso',  color: '#EF9F27' },
  'coming-soon': { label: 'Próximamente', color: '#7F77DD' },
};

function StatusBadge({ status }: { status: Project['status'] }) {
  const { label, color } = statusConfig[status];
  return (
    <span style={{
      fontFamily: 'var(--font-ui)',
      fontSize: '10px',
      fontWeight: 500,
      color,
      background: `${color}18`,
      border: `1px solid ${color}40`,
      borderRadius: '999px',
      padding: '3px 10px',
      whiteSpace: 'nowrap',
    }}>
      {label}
    </span>
  );
}

function ViewProjectButton({ slug }: { slug: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/projects/${slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        padding: '12px 24px',
        borderRadius: '8px',
        border: `1px solid ${hovered
          ? 'var(--color-accent-primary)'
          : 'var(--color-border)'}`,
        background: hovered
          ? 'var(--color-accent-primary)'
          : 'transparent',
        fontFamily: 'var(--font-ui)',
        fontSize: '14px',
        fontWeight: 500,
        color: hovered
          ? '#ffffff'
          : 'var(--color-text-primary)',
        textDecoration: 'none',
        transition: 'all 0.25s ease',
        width: 'fit-content',
      }}
    >
      Ver proyecto
      {/* Flecha que se mueve en hover */}
      <motion.svg
        width={14} height={14} viewBox="0 0 24 24" fill="none"
        animate={{ x: hovered ? 4 : 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <path d="M5 12h14M12 5l7 7-7 7"
          stroke="currentColor" strokeWidth="1.5"
          strokeLinecap="round" strokeLinejoin="round"/>
      </motion.svg>
    </Link>
  );
}

export function ProjectCard({ project, isActive }: ProjectCardProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const statusColor = statusConfig[project.status].color;

  return (
    <motion.div
      animate={isActive ? {
        boxShadow: [
          '0 0 0px rgba(127,119,221,0)',
          '0 0 30px rgba(127,119,221,0.12)',
          '0 0 0px rgba(127,119,221,0)',
        ],
      } : { boxShadow: 'none' }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={{
        background: 'var(--color-bg-surface)',
        border: '1px solid var(--color-border)',
        borderTop: `2px solid ${statusColor}`,
        borderRadius: '16px',
        padding: isDesktop ? '36px' : '24px',
        display: 'grid',
        gridTemplateColumns: isDesktop ? '1fr 320px' : '1fr', // desktop vs mobile
        gap: isDesktop ? '40px' : '24px',
        alignItems: 'start',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Columna izquierda — contenido principal */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px' }}>
          {/* Eyebrow: rol */}
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--color-text-muted)',
            display: 'flex', alignItems: 'center', gap: '6px',
          }}>
            <svg width={11} height={11} viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            {project.role}
          </span>

          {/* Nombre del proyecto */}
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(22px, 3vw, 30px)',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            margin: 0,
            lineHeight: 1.2,
          }}>
            {project.name}
          </h3>
        </div>

        {/* Descripción */}
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '14px',
          lineHeight: 1.8,
          color: 'var(--color-text-secondary)',
          margin: '0 0 24px',
          // Coming soon: italic + opacidad reducida
          fontStyle: project.status === 'coming-soon' ? 'italic' : 'normal',
          opacity: project.status === 'coming-soon' ? 0.5 : 1,
        }}>
          {project.status === 'coming-soon'
            ? 'Próximamente — los detalles se publicarán al completar el proyecto.'
            : project.shortDescription}
        </p>

        {/* Stack pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
          {project.stack.map(tech => (
            <span key={tech} style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              padding: '4px 10px',
              borderRadius: '4px',
              background: 'var(--color-bg-elevated)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-secondary)',
            }}>
              {tech}
            </span>
          ))}
        </div>

        {/* Botón "Ver proyecto" */}
        {project.status !== 'coming-soon' && (
          <ViewProjectButton slug={project.slug} />
        )}

        {/* Links secundarios */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                fontFamily: 'var(--font-mono)', fontSize: '12px',
                color: 'var(--color-text-muted)', textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--color-text-primary)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-muted)'}
            >
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                  stroke="currentColor" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              GitHub
            </a>
          )}

          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                fontFamily: 'var(--font-mono)', fontSize: '12px',
                color: 'var(--color-text-muted)', textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--color-text-primary)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-muted)'}
            >
              <svg width={12} height={12} viewBox="0 0 24 24" fill="none">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"
                  stroke="currentColor" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Demo
            </a>
          )}
        </div>
      </div>

      {/* Columna derecha — panel de metadata */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        borderLeft: isDesktop ? '1px solid var(--color-border)' : 'none',
        borderTop: isDesktop ? 'none' : '1px solid var(--color-border)',
        paddingLeft: isDesktop ? '40px' : '0',
        paddingTop: isDesktop ? '0' : '24px',
      }}>
        {/* Status + año */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <StatusBadge status={project.status} />
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '12px',
            color: 'var(--color-text-muted)',
          }}>
            {project.year}
          </span>
        </div>

        {/* Architecture Decision */}
        {project.status !== 'coming-soon' && (
          <div style={{
            background: 'color-mix(in srgb, var(--color-accent-primary), transparent 92%)',
            border: '1px solid color-mix(in srgb, var(--color-accent-primary), transparent 80%)',
            borderLeft: '2px solid var(--color-accent-primary)',
            borderRadius: '8px',
            padding: '14px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}>
            <span style={{
              fontFamily: 'var(--font-ui)', fontSize: '10px',
              fontWeight: 500, color: 'var(--color-accent-primary)',
              textTransform: 'uppercase', letterSpacing: '0.08em',
            }}>
              Decisión de arquitectura
            </span>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '12px',
              fontWeight: 500, color: 'var(--color-text-primary)',
              lineHeight: 1.4,
            }}>
              {project.architectureDecision.title}
            </span>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '11px',
              color: 'var(--color-text-secondary)', lineHeight: 1.6,
            }}>
              {project.architectureDecision.description}
            </span>
          </div>
        )}

        {/* Impact metric */}
        {project.impact && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '12px 16px',
            background: 'color-mix(in srgb, var(--color-accent-secondary), transparent 92%)',
            border: '1px solid color-mix(in srgb, var(--color-accent-secondary), transparent 80%)',
            borderRadius: '8px',
          }}>
            <span style={{
              fontFamily: 'var(--font-display)', fontSize: '32px',
              fontWeight: 700, color: 'var(--color-accent-secondary)',
              lineHeight: 1,
            }}>
              {project.impact.value}
            </span>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '12px',
              color: 'var(--color-text-secondary)', lineHeight: 1.4,
            }}>
              {project.impact.metric}
            </span>
          </div>
        )}

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {project.tags.map(tag => (
            <span key={tag} style={{
              fontFamily: 'var(--font-ui)', fontSize: '10px',
              padding: '2px 8px', borderRadius: '999px',
              background: 'var(--color-bg-elevated)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-muted)',
              textTransform: 'capitalize',
            }}>
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
