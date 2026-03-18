'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'motion/react'
import { ProjectsBackground } from '@/src/components/backgrounds/ProjectsBackground'

export default function NotFound() {
  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--color-bg-base)',
      color: 'var(--color-text-primary)',
      textAlign: 'center',
      padding: '24px',
    }}>
      <ProjectsBackground />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(64px, 15vw, 120px)',
          fontWeight: 900,
          margin: 0,
          lineHeight: 1,
          opacity: 0.1,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          pointerEvents: 'none',
        }}>
          404
        </h1>

        <div style={{ position: 'relative', zIndex: 2 }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '24px',
            marginBottom: '16px',
          }}>
            Página no encontrada
          </h2>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '14px',
            color: 'var(--color-text-secondary)',
            maxWidth: '400px',
            margin: '0 auto 32px',
            lineHeight: 1.6,
          }}>
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>

          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              borderRadius: '8px',
              background: 'var(--color-accent-primary)',
              color: '#ffffff',
              textDecoration: 'none',
              fontFamily: 'var(--font-ui)',
              fontSize: '14px',
              fontWeight: 500,
              transition: 'transform 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M12 19l-7-7 7-7"
                stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Volver al inicio
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
