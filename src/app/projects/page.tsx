'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ProjectType, professionalProjects, personalProjects, projects } from '@/src/data/projects';
import { ProjectsBackground } from '@/src/components/backgrounds/ProjectsBackground';
import { ProjectTabs, ProjectCard } from '@/src/components/sections/projects';

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState<ProjectType>('professional')
  const [activeTech, setActiveTech] = useState<string | null>(null)

  const allTechs = Array.from(new Set(projects.flatMap(p => p.stack))).sort()

  const filteredProjects = projects.filter(p => {
    const matchesTab = p.type === activeTab
    const matchesTech = activeTech ? p.stack.includes(activeTech) : true
    return matchesTab && matchesTech
  })

  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      background: 'var(--color-bg-base)',
    }}>
      <ProjectsBackground />

      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: '1200px', margin: '0 auto',
        padding: '120px 48px 80px',
      }}>

        {/* Header con back link */}
        <div style={{ marginBottom: '48px' }}>
          <Link href="/" style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            fontFamily: 'var(--font-mono)', fontSize: '13px',
            color: 'var(--color-text-muted)', textDecoration: 'none',
            marginBottom: '24px',
          }}>
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M12 19l-7-7 7-7"
                stroke="currentColor" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Volver al portfolio
          </Link>
          <span className="eyebrow" style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color: 'var(--color-accent-primary)',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            display: 'block',
            marginBottom: '8px',
          }}>
            Todos los proyectos
          </span>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            margin: '8px 0 0',
          }}>
            Lo que he construido
          </h1>
        </div>

        {/* Tabs & Filters */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '48px' }}>
          <ProjectTabs
            activeTab={activeTab}
            onTabChange={(tab) => {
              setActiveTab(tab)
              setActiveTech(null)
            }}
            professionalCount={professionalProjects.length}
            personalCount={personalProjects.length}
          />

          {/* Tech Filter */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <button
              onClick={() => setActiveTech(null)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                padding: '4px 12px',
                borderRadius: '999px',
                background: activeTech === null ? 'var(--color-accent-primary)20' : 'transparent',
                border: `1px solid ${activeTech === null ? 'var(--color-accent-primary)' : 'var(--color-border)'}`,
                color: activeTech === null ? 'var(--color-accent-primary)' : 'var(--color-text-muted)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              Todos
            </button>
            {allTechs.map(tech => {
              const techExistsInTab = projects.some(p => p.type === activeTab && p.stack.includes(tech))
              if (!techExistsInTab) return null

              return (
                <button
                  key={tech}
                  onClick={() => setActiveTech(tech === activeTech ? null : tech)}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    padding: '4px 12px',
                    borderRadius: '999px',
                    background: activeTech === tech ? 'var(--color-accent-primary)20' : 'transparent',
                    border: `1px solid ${activeTech === tech ? 'var(--color-accent-primary)' : 'var(--color-border)'}`,
                    color: activeTech === tech ? 'var(--color-accent-primary)' : 'var(--color-text-muted)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {tech}
                </button>
              )
            })}
          </div>
        </div>

        {/* Grid completo — todos los proyectos */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '24px',
          marginTop: '32px',
        }}>
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
