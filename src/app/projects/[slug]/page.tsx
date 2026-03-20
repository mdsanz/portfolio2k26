'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { motion } from 'motion/react';
import dynamic from 'next/dynamic';
import { projects } from '@/src/data/projects';
import { ProjectsBackground } from '@/src/components/backgrounds/ProjectsBackground';

// Dynamic import for Mermaid to ensure it only loads on client (avoids SSR hydration issues with DOM)
const MermaidDiagram = dynamic(() => import('@/src/components/ui/MermaidDiagram'), { 
  ssr: false, 
  loading: () => <div style={{ minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-text-muted)' }}>Cargando diagrama...</div>
});

const statusConfig: Record<string, { label: string; color: string }> = {
  'completed':   { label: 'Completado',   color: '#1D9E75' },
  'in-progress': { label: 'En progreso',  color: '#EF9F27' },
  'coming-soon': { label: 'Próximamente', color: '#7F77DD' },
};

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const project = projects.find(p => p.slug === slug);

  if (!project) notFound();

  const { label: statusLabel, color: statusColor } = statusConfig[project.status] ?? { label: project.status, color: '#A0A0A8' };

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' as const },
    }),
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--color-bg-base)' }}>
      <ProjectsBackground />

      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: '1100px', margin: '0 auto',
        padding: '100px 48px 80px',
      }}>

        {/* Back link */}
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
          <Link href="/projects" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            fontFamily: 'var(--font-mono)', fontSize: '13px',
            color: 'var(--color-text-muted)', textDecoration: 'none',
            marginBottom: '48px',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent-primary)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-muted)'}
          >
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Todos los proyectos
          </Link>
        </motion.div>

        {/* ═══════════════════  HERO HEADER  ═══════════════════ */}
        <motion.div
          initial="hidden" animate="visible"
          style={{
            display: 'grid',
            gridTemplateColumns: project.impact ? '1fr auto' : '1fr',
            gap: '40px',
            alignItems: 'start',
            marginBottom: '56px',
          }}
        >
          {/* Left — Title block */}
          <div>
            {/* Status + Role + Year */}
            <motion.div custom={0} variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <span style={{
                fontFamily: 'var(--font-ui)', fontSize: '11px', fontWeight: 600,
                color: statusColor, textTransform: 'uppercase', letterSpacing: '0.08em',
              }}>
                {project.role}
              </span>
              <span style={{
                fontFamily: 'var(--font-ui)', fontSize: '10px', fontWeight: 500,
                color: statusColor, background: `${statusColor}15`,
                border: `1px solid ${statusColor}40`, borderRadius: '999px',
                padding: '2px 10px', whiteSpace: 'nowrap',
              }}>
                {statusLabel}
              </span>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '12px',
                color: 'var(--color-text-muted)',
              }}>
                {project.year}
              </span>
            </motion.div>

            {/* Project name */}
            <motion.h1
              custom={1} variants={fadeUp}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(32px, 5vw, 52px)',
                fontWeight: 800, color: 'var(--color-text-primary)',
                margin: '0 0 16px', lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}
            >
              {project.name}
            </motion.h1>

            {/* Short description */}
            <motion.p
              custom={2} variants={fadeUp}
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '15px',
                lineHeight: 1.7, color: 'var(--color-text-secondary)',
                margin: 0, maxWidth: '700px',
              }}
            >
              {project.shortDescription}
            </motion.p>

            {/* Tags */}
            <motion.div custom={3} variants={fadeUp} style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '20px' }}>
              {project.tags.map(tag => (
                <span key={tag} style={{
                  fontFamily: 'var(--font-ui)', fontSize: '10px',
                  padding: '4px 12px', borderRadius: '999px',
                  background: 'var(--color-bg-elevated)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text-muted)',
                  textTransform: 'capitalize', fontWeight: 500,
                }}>
                  #{tag}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right — Impact metric (if present) */}
          {project.impact && (
            <motion.div
              custom={2} variants={fadeUp}
              style={{
                padding: '28px 32px',
                background: `linear-gradient(135deg, ${statusColor}12 0%, transparent 100%)`,
                border: `1px solid ${statusColor}30`,
                borderRadius: '16px',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: '4px',
                minWidth: '140px',
              }}
            >
              <motion.span
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5, type: 'spring' }}
                style={{
                  fontFamily: 'var(--font-display)', fontSize: '48px',
                  fontWeight: 800, color: statusColor,
                  lineHeight: 1, letterSpacing: '-0.02em',
                }}
              >
                {project.impact.value}
              </motion.span>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '12px',
                color: 'var(--color-text-secondary)',
                fontWeight: 500, textAlign: 'center',
              }}>
                {project.impact.metric}
              </span>
            </motion.div>
          )}
        </motion.div>

        {/* ═══════════════════  ACTION BUTTONS  ═══════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '56px' }}
        >
          {project.githubUrl && (
            <ActionLink href={project.githubUrl} icon="github">Ver en GitHub</ActionLink>
          )}
          {project.demoUrl && (
            <ActionLink href={project.demoUrl} icon="external">Ver demo</ActionLink>
          )}
        </motion.div>

        {/* ═══════════════════  FULL DESCRIPTION  ═══════════════════ */}
        {project.fullDescription && (
          <motion.section
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            style={{ marginBottom: '56px' }}
          >
            <SectionLabel icon="📋">Descripción</SectionLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {project.fullDescription.trim().split(/\n\s*\n/).map((paragraph, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  style={{
                    fontFamily: 'var(--font-mono)', fontSize: '14px',
                    lineHeight: 1.9, color: 'var(--color-text-secondary)',
                    margin: 0,
                  }}
                >
                  {paragraph.trim()}
                </motion.p>
              ))}
            </div>
          </motion.section>
        )}

        {/* ═══════════════════  IMAGE GALLERY  ═══════════════════ */}
        {project.images && project.images.length > 0 && (
          <motion.section
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            style={{ marginBottom: '56px' }}
          >
            <SectionLabel icon="🖼️">Capturas</SectionLabel>
            <ImageGallery images={project.images} statusColor={statusColor} />
          </motion.section>
        )}

        {/* ═══════════════════  HIGHLIGHTS  ═══════════════════ */}
        {project.highlights && project.highlights.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            style={{ marginBottom: '56px' }}
          >
            <SectionLabel icon="⚡">Puntos clave</SectionLabel>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '12px',
            }}>
              {project.highlights.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: '12px',
                    padding: '16px 20px', borderRadius: '12px',
                    background: 'var(--color-bg-surface)',
                    border: '1px solid var(--color-border)',
                    transition: 'border-color 0.2s ease',
                  }}
                  whileHover={{ borderColor: statusColor, scale: 1.01 }}
                >
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '14px',
                    color: statusColor, fontWeight: 700, flexShrink: 0,
                    marginTop: '1px',
                  }}>
                    ›
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '13px',
                    lineHeight: 1.6, color: 'var(--color-text-secondary)',
                  }}>
                    {h}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* ═══════════════════  STACK  ═══════════════════ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          style={{ marginBottom: '56px' }}
        >
          <SectionLabel icon="🛠️">Stack tecnológico</SectionLabel>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {project.stack.map((tech, i) => {
              const tc = getTechColor(tech);
              return (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  whileHover={{ scale: 1.05, borderColor: tc.text }}
                  style={{
                    fontFamily: 'var(--font-mono)', fontSize: '13px',
                    padding: '8px 18px', borderRadius: '8px',
                    background: tc.bg,
                    border: `1px solid ${tc.border}`,
                    color: tc.text,
                    fontWeight: 600,
                    cursor: 'default',
                    transition: 'border-color 0.2s ease',
                  }}
                >
                  {tech}
                </motion.span>
              );
            })}
          </div>
        </motion.section>

        {/* ═══════════════════  ARCHITECTURE DECISION & DIAGRAM  ═══════════════════ */}
        {project.status !== 'coming-soon' && (
          <motion.section
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            style={{ marginBottom: '56px' }}
          >
            <SectionLabel icon="🏗️">Decisión de arquitectura</SectionLabel>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Decision text */}
              <motion.div
                whileHover={{ scale: 1.005 }}
                style={{
                  background: 'var(--color-bg-surface)',
                  border: '1px solid var(--color-border)',
                  borderLeft: `4px solid ${statusColor}`,
                  borderRadius: '14px',
                  padding: '28px 32px',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" style={{ color: statusColor }}>
                    <path d="M12 2L2 7l10 5-10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
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
                <h3 style={{
                  fontFamily: 'var(--font-display)', fontSize: '18px',
                  fontWeight: 700, color: 'var(--color-text-primary)',
                  margin: '0 0 10px', lineHeight: 1.3,
                }}>
                  {project.architectureDecision.title}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-mono)', fontSize: '13px',
                  lineHeight: 1.8, color: 'var(--color-text-secondary)',
                  margin: 0,
                }}>
                  {project.architectureDecision.description}
                </p>
              </motion.div>

              {/* Architecture Diagram */}
              {project.architectureDiagram && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  style={{
                    background: 'var(--color-bg-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '14px',
                    padding: '24px',
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                    minHeight: '200px',
                  }}
                >
                  <MermaidDiagram chart={project.architectureDiagram.trim()} />
                </motion.div>
              )}
            </div>
          </motion.section>
        )}

      </div>
    </div>
  );
}

/* ───────────────────────── HELPER COMPONENTS ───────────────────────── */

const brandColors: Record<string, { bg: string, text: string, border: string }> = {
  'Next.js': { bg: '#e5e5e510', text: '#e5e5e5', border: '#e5e5e540' },
  'TypeScript': { bg: '#3178C615', text: '#3178C6', border: '#3178C640' },
  'React Flow': { bg: '#FF007215', text: '#FF0072', border: '#FF007240' },
  'Tailwind CSS': { bg: '#38B2AC15', text: '#38B2AC', border: '#38B2AC40' },
  'PostgreSQL': { bg: '#33679115', text: '#336791', border: '#33679140' },
  'Java': { bg: '#ED8B0015', text: '#ED8B00', border: '#ED8B0040' },
  'Spring Boot': { bg: '#6DB33F15', text: '#6DB33F', border: '#6DB33F40' },
  'Docker': { bg: '#2496ED15', text: '#2496ED', border: '#2496ED40' },
  'Node.js': { bg: '#33993315', text: '#339933', border: '#33993340' },
  'MongoDB': { bg: '#47A24815', text: '#47A248', border: '#47A24840' },
  'Framer Motion': { bg: '#0055FF15', text: '#0055FF', border: '#0055FF40' },
  'Three.js': { bg: '#e5e5e510', text: '#e5e5e5', border: '#e5e5e540' },
};

function getTechColor(tech: string) {
  return brandColors[tech] || { bg: 'var(--color-bg-elevated)', border: 'var(--color-border)', text: 'var(--color-text-secondary)' };
}

function SectionLabel({ children, icon }: { children: React.ReactNode; icon: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 20px' }}>
      <span style={{ fontSize: '14px' }}>{icon}</span>
      <h2 style={{
        fontFamily: 'var(--font-ui)', fontSize: '12px', fontWeight: 600,
        color: 'var(--color-text-muted)', textTransform: 'uppercase',
        letterSpacing: '0.12em', margin: 0,
      }}>
        {children}
      </h2>
      <div style={{
        flex: 1, height: '1px',
        background: 'linear-gradient(to right, var(--color-border), transparent)',
        marginLeft: '8px',
      }} />
    </div>
  );
}

function ActionLink({ href, icon, children }: { href: string; icon: 'github' | 'external'; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '10px',
        padding: '12px 24px', borderRadius: '10px',
        border: `1px solid ${hovered ? 'var(--color-accent-primary)' : 'var(--color-border)'}`,
        background: hovered ? 'var(--color-accent-primary)' : 'var(--color-bg-surface)',
        fontFamily: 'var(--font-ui)', fontSize: '14px', fontWeight: 500,
        color: hovered ? '#ffffff' : 'var(--color-text-primary)',
        textDecoration: 'none',
        transition: 'all 0.25s ease',
      }}
    >
      {icon === 'github' ? (
        <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ) : (
        <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
      {children}
    </a>
  );
}

function ImageGallery({ images, statusColor }: { images: { src: string; alt: string; caption?: string }[]; statusColor: string }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Main image */}
      <motion.div
        key={selectedIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16 / 9',
          borderRadius: '14px',
          overflow: 'hidden',
          border: '1px solid var(--color-border)',
          background: 'var(--color-bg-surface)',
        }}
      >
        <Image
          src={images[selectedIndex].src}
          alt={images[selectedIndex].alt}
          fill
          style={{ objectFit: 'cover' }}
          referrerPolicy="no-referrer"
        />
        {/* Caption overlay */}
        {images[selectedIndex].caption && (
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            padding: '24px 20px 16px',
            background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
          }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '12px',
              color: '#ffffffcc',
            }}>
              {images[selectedIndex].caption}
            </span>
          </div>
        )}
      </motion.div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div style={{ display: 'flex', gap: '10px', overflow: 'auto' }}>
          {images.map((img, i) => (
            <motion.button
              key={i}
              onClick={() => setSelectedIndex(i)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                position: 'relative',
                width: '100px', height: '60px',
                borderRadius: '8px', overflow: 'hidden',
                border: i === selectedIndex
                  ? `2px solid ${statusColor}`
                  : '2px solid var(--color-border)',
                cursor: 'pointer',
                flexShrink: 0,
                padding: 0,
                background: 'var(--color-bg-surface)',
                opacity: i === selectedIndex ? 1 : 0.6,
                transition: 'all 0.2s ease',
              }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                style={{ objectFit: 'cover' }}
                referrerPolicy="no-referrer"
              />
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}
