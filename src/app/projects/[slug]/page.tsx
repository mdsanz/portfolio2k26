'use client';

import React from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { projects } from '@/src/data/projects';
import { ProjectsBackground } from '@/src/components/backgrounds/ProjectsBackground';

export default function ProjectDetailPage() {
  const params = useParams()
  const slug = params?.slug as string
  const project = projects.find(p => p.slug === slug)
  
  if (!project) notFound()

  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      background: 'var(--color-bg-base)',
    }}>
      <ProjectsBackground />

      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: '800px', margin: '0 auto',
        padding: '120px 48px 80px',
      }}>

        {/* Back link */}
        <Link href="/projects" style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          fontFamily: 'var(--font-mono)', fontSize: '13px',
          color: 'var(--color-text-muted)', textDecoration: 'none',
          marginBottom: '40px',
        }}>
          ← Todos los proyectos
        </Link>

        {/* Header del proyecto */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center',
            gap: '12px', marginBottom: '12px' }}>
            <span style={{
              fontFamily: 'var(--font-ui)', fontSize: '11px',
              fontWeight: 500,
              color: project.type === 'professional'
                ? 'var(--color-accent-primary)'
                : 'var(--color-accent-secondary)',
              textTransform: 'uppercase', letterSpacing: '0.08em',
            }}>
              {project.type === 'professional'
                ? project.client
                : 'Proyecto personal'}
            </span>
            <StatusBadge status={project.status} />
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 5vw, 42px)',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            margin: '0 0 8px',
          }}>
            {project.name}
          </h1>

          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color: 'var(--color-text-muted)',
          }}>
            {project.role} · {project.year}
          </p>
        </div>

        {/* Descripción completa */}
        <section style={{ marginBottom: '32px' }}>
          <SectionLabel>Descripción</SectionLabel>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '14px',
            lineHeight: 1.8,
            color: 'var(--color-text-secondary)',
          }}>
            {project.description}
          </p>
        </section>

        {/* Stack */}
        <section style={{ marginBottom: '32px' }}>
          <SectionLabel>Stack tecnológico</SectionLabel>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {project.stack.map(tech => (
              <span key={tech} style={{
                fontFamily: 'var(--font-mono)', fontSize: '13px',
                padding: '6px 14px', borderRadius: '6px',
                background: 'var(--color-bg-elevated)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text-secondary)',
              }}>
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Architecture Decision */}
        <section style={{ marginBottom: '32px' }}>
          <SectionLabel>Decisión de arquitectura</SectionLabel>
          <div style={{
            background: 'var(--color-accent-primary)08',
            border: '1px solid var(--color-accent-primary)25',
            borderLeft: '3px solid var(--color-accent-primary)',
            borderRadius: '10px',
            padding: '20px 24px',
            marginBottom: '24px',
          }}>
            <h3 style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '15px',
              fontWeight: 500,
              color: 'var(--color-text-primary)',
              margin: '0 0 10px',
            }}>
              {project.architectureDecision.title}
            </h3>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              lineHeight: 1.8,
              color: 'var(--color-text-secondary)',
              margin: 0,
            }}>
              {project.architectureDecision.description}
            </p>
          </div>

          {/* Diagrama */}
          {project.architectureDiagram && (
            <div style={{
              background: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '12px',
              padding: '32px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
            }}>
              <div 
                dangerouslySetInnerHTML={{ __html: project.architectureDiagram }} 
                style={{ width: '100%', maxWidth: '600px', height: 'auto' }}
              />
            </div>
          )}
        </section>

        {/* Impact */}
        {project.impact && (
          <section style={{ marginBottom: '32px' }}>
            <SectionLabel>Impacto</SectionLabel>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '20px 24px',
              background: 'var(--color-accent-secondary)08',
              border: '1px solid var(--color-accent-secondary)25',
              borderRadius: '10px',
            }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '40px',
                fontWeight: 700,
                color: 'var(--color-accent-secondary)',
              }}>
                {project.impact.value}
              </span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '14px',
                color: 'var(--color-text-secondary)',
              }}>
                {project.impact.metric}
              </span>
            </div>
          </section>
        )}

        {/* Links */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {project.githubUrl && (
            <a 
              href={project.githubUrl} 
              target="_blank"
              rel="noopener noreferrer" 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '8px',
                border: '1px solid var(--color-border)',
                background: 'var(--color-bg-surface)',
                fontFamily: 'var(--font-ui)',
                fontSize: '14px',
                color: 'var(--color-text-primary)',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
            >
              Ver en GitHub
            </a>
          )}
          {project.demoUrl && (
            <a 
              href={project.demoUrl} 
              target="_blank"
              rel="noopener noreferrer" 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '8px',
                border: '1px solid var(--color-border)',
                background: 'var(--color-bg-surface)',
                fontFamily: 'var(--font-ui)',
                fontSize: '14px',
                color: 'var(--color-text-primary)',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
            >
              Ver demo
            </a>
          )}
        </div>

      </div>
    </div>
  )
}

// Helper
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontFamily: 'var(--font-ui)',
      fontSize: '11px',
      fontWeight: 500,
      color: 'var(--color-text-muted)',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      margin: '0 0 12px',
    }}>
      {children}
    </h2>
  )
}

// Badge de status
function StatusBadge({ status }: { status: any }) {
  const config = {
    completed:   { label: 'Completado', color: '#1D9E75' },
    'in-progress': { label: 'En progreso', color: '#EF9F27' },
    placeholder: { label: 'Próximamente', color: '#A0A0A8' },
  }[status as 'completed' | 'in-progress' | 'placeholder'] || { label: status, color: '#A0A0A8' }

  return (
    <span style={{
      fontFamily: 'var(--font-ui)',
      fontSize: '10px',
      fontWeight: 500,
      color: config.color,
      background: `${config.color}15`,
      border: `1px solid ${config.color}40`,
      borderRadius: '999px',
      padding: '2px 8px',
      whiteSpace: 'nowrap',
    }}>
      {config.label}
    </span>
  )
}
