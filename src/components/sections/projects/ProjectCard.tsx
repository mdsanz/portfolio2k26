'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Project } from '@/src/data/projects';
import { useMediaQuery } from '@/src/hooks/useMediaQuery';

interface ProjectCardProps {
  project: Project;
  isActive: boolean; // controla la animación
  layout?: 'carousel' | 'grid';
}

const statusConfig = {
  'completed':   { label: 'Completado',   color: '#1D9E75' },
  'in-progress': { label: 'En progreso',  color: '#EF9F27' },
  'coming-soon': { label: 'Próximamente', color: '#7F77DD' },
};

function StatusBadge({ status }: { status: Project['status'] }) {
  const { label, color } = statusConfig[status];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <motion.div
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: color,
          boxShadow: `0 0 8px ${color}`,
        }}
      />
      <span style={{
        fontFamily: 'var(--font-ui)',
        fontSize: '11px',
        fontWeight: 600,
        color,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
      }}>
        {label}
      </span>
    </div>
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

export function ProjectCard({ project, isActive, layout = 'carousel' }: ProjectCardProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const statusColor = statusConfig[project.status].color;

  return (
    <motion.div
      animate={isActive ? {
        boxShadow: [
          `0 0 0px ${statusColor}00`,
          `0 0 40px ${statusColor}15`,
          `0 0 0px ${statusColor}00`,
        ],
        scale: 1,
        opacity: 1,
      } : { 
        boxShadow: 'none',
        scale: 0.98,
        opacity: 0.6,
      }}
      transition={{
        boxShadow: {
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        },
        scale: { duration: 0.4 },
        opacity: { duration: 0.4 },
      }}
      style={{
        background: 'var(--color-bg-surface)',
        border: '1px solid var(--color-border)',
        borderTop: `3px solid ${statusColor}`,
        borderRadius: '20px',
        padding: isDesktop ? (layout === 'carousel' ? '40px' : '32px') : '20px',
        display: 'grid',
        gridTemplateColumns: (isDesktop && layout === 'carousel') ? '1fr 340px' : '1fr',
        gap: (isDesktop && layout === 'carousel') ? '48px' : '24px',
        alignItems: 'stretch',
        width: '100%',
        height: '100%',
        minHeight: isDesktop ? '420px' : 'auto',
        position: 'relative',
        overflow: 'hidden',
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* Subtle background glow based on status */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-10%',
        width: '40%',
        height: '40%',
        background: `radial-gradient(circle, ${statusColor}08 0%, transparent 70%)`,
        zIndex: 0,
        pointerEvents: 'none',
      }} />

      {/* Columna izquierda — contenido principal */}
      <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
          {/* Eyebrow: rol */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: statusColor,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            <span style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: statusColor,
              boxShadow: `0 0 8px ${statusColor}`,
            }} />
            {project.role}
          </div>

          {/* Nombre del proyecto */}
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(26px, 4vw, 36px)',
            fontWeight: 800,
            color: 'var(--color-text-primary)',
            margin: 0,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}>
            {project.name}
          </h3>
        </div>

        {/* Descripción */}
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: isDesktop ? '15px' : '14px',
          lineHeight: 1.7,
          color: 'var(--color-text-secondary)',
          margin: '0 0 32px',
          fontStyle: project.status === 'coming-soon' ? 'italic' : 'normal',
          opacity: project.status === 'coming-soon' ? 0.6 : 0.9,
          maxWidth: '600px',
        }}>
          {project.status === 'coming-soon'
            ? 'Próximamente — los detalles se publicarán al completar el proyecto.'
            : project.shortDescription}
        </p>

        {/* Stack pills */}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '8px', 
          marginBottom: '32px',
          marginTop: 'auto' // Empuja esto al fondo si hay espacio
        }}>
          {project.stack.map(tech => (
            <span key={tech} style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              padding: '5px 12px',
              borderRadius: '6px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-secondary)',
              fontWeight: 500,
            }}>
              {tech}
            </span>
          ))}
        </div>

        <div style={{ 
          display: 'flex', 
          flexDirection: isDesktop ? 'row' : 'column',
          alignItems: isDesktop ? 'center' : 'flex-start',
          gap: '24px' 
        }}>
          {/* Botón "Ver proyecto" */}
          {project.status !== 'coming-soon' && (
            <ViewProjectButton slug={project.slug} />
          )}

          {/* Links secundarios */}
          <div style={{ display: 'flex', gap: '20px' }}>
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  fontFamily: 'var(--font-mono)', fontSize: '13px',
                  color: 'var(--color-text-muted)', textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = 'var(--color-text-primary)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'var(--color-text-muted)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
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
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  fontFamily: 'var(--font-mono)', fontSize: '13px',
                  color: 'var(--color-text-muted)', textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = 'var(--color-text-primary)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'var(--color-text-muted)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"
                    stroke="currentColor" strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Demo
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Columna derecha — panel de metadata */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        borderLeft: (isDesktop && layout === 'carousel') ? '1px solid var(--color-border)' : 'none',
        borderTop: (isDesktop && layout === 'carousel') ? 'none' : '1px solid var(--color-border)',
        paddingLeft: (isDesktop && layout === 'carousel') ? '48px' : '0',
        paddingTop: (isDesktop && layout === 'carousel') ? '0' : '32px',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Status + año */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <StatusBadge status={project.status} />
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '13px',
            color: 'var(--color-text-muted)',
            fontWeight: 500,
          }}>
            {project.year}
          </span>
        </div>

        {/* Architecture Decision */}
        {project.status !== 'coming-soon' && (
          <div style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid var(--color-border)',
            borderLeft: `3px solid ${statusColor}`,
            borderRadius: '12px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            transition: 'transform 0.3s ease',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '4px',
            }}>
              <svg width={12} height={12} viewBox="0 0 24 24" fill="none" style={{ color: statusColor }}>
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" 
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span style={{
                fontFamily: 'var(--font-ui)', fontSize: '10px',
                fontWeight: 600, color: statusColor,
                textTransform: 'uppercase', letterSpacing: '0.1em',
              }}>
                Technical Insight
              </span>
            </div>
            <span style={{
              fontFamily: 'var(--font-display)', fontSize: '14px',
              fontWeight: 600, color: 'var(--color-text-primary)',
              lineHeight: 1.3,
            }}>
              {project.architectureDecision.title}
            </span>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '12px',
              color: 'var(--color-text-secondary)', lineHeight: 1.6,
              opacity: 0.8,
            }}>
              {project.architectureDecision.description}
            </span>
          </div>
        )}

        {/* Impact metric */}
        {project.impact && (
          <div style={{
            display: 'flex', 
            flexDirection: 'column',
            gap: '4px',
            padding: '16px 20px',
            background: `linear-gradient(135deg, ${statusColor}10 0%, transparent 100%)`,
            border: '1px solid var(--color-border)',
            borderRadius: '12px',
          }}>
            <span style={{
              fontFamily: 'var(--font-display)', fontSize: '36px',
              fontWeight: 800, color: statusColor,
              lineHeight: 1,
              letterSpacing: '-0.02em',
            }}>
              {project.impact.value}
            </span>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '12px',
              color: 'var(--color-text-secondary)', lineHeight: 1.4,
              fontWeight: 500,
            }}>
              {project.impact.metric}
            </span>
          </div>
        )}

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: 'auto' }}>
          {project.tags.map(tag => (
            <span key={tag} style={{
              fontFamily: 'var(--font-ui)', fontSize: '10px',
              padding: '3px 10px', borderRadius: '999px',
              background: 'var(--color-bg-elevated)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-muted)',
              textTransform: 'capitalize',
              fontWeight: 500,
            }}>
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
