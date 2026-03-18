'use client'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Evitar hydration mismatch — solo renderizar en cliente
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), [])
  if (!mounted) return <div style={{ width: 36, height: 36 }} />

  const isDark = theme === 'dark'
  const toggle = () => setTheme(isDark ? 'light' : 'dark')

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      style={{
        width: '36px',
        height: '36px',
        borderRadius: '8px',
        border: '1px solid var(--color-border)',
        background: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        flexShrink: 0,
        transition: 'border-color 0.2s ease, background 0.2s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'var(--color-bg-elevated)'
        e.currentTarget.style.borderColor = 'var(--color-accent-primary)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'transparent'
        e.currentTarget.style.borderColor = 'var(--color-border)'
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDark ? 'moon' : 'sun'}
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0,   opacity: 1, scale: 1   }}
          exit={{    rotate:  90, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {isDark ? <MoonIcon /> : <SunIcon />}
        </motion.div>
      </AnimatePresence>
    </button>
  )
}

function SunIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none"
      style={{ overflow: 'visible' }}>

      {/* Rayos pulsantes */}
      <motion.g
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '12px 12px' }}
      >
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <motion.line
            key={angle}
            x1={12 + Math.cos((angle * Math.PI) / 180) * 8}
            y1={12 + Math.sin((angle * Math.PI) / 180) * 8}
            x2={12 + Math.cos((angle * Math.PI) / 180) * 10}
            y2={12 + Math.sin((angle * Math.PI) / 180) * 10}
            stroke="var(--color-text-secondary)"
            strokeWidth="1.5"
            strokeLinecap="round"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.25,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.g>

      {/* Círculo central con pulso */}
      <motion.circle
        cx="12" cy="12" r="4"
        stroke="var(--color-text-secondary)"
        strokeWidth="1.5"
        fill="none"
        animate={{ r: [3.5, 4.5, 3.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Halo de luz */}
      <motion.circle
        cx="12" cy="12" r="6"
        stroke="var(--color-text-secondary)"
        strokeWidth="0.5"
        fill="none"
        animate={{ opacity: [0, 0.3, 0], r: [5, 8, 5] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
      />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none">

      {/* Luna con brillo sutil */}
      <motion.path
        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
        stroke="var(--color-text-secondary)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Estrellas pequeñas alrededor */}
      {[
        { cx: 18, cy: 5,  r: 0.8, delay: 0   },
        { cx: 20, cy: 9,  r: 0.6, delay: 0.5 },
        { cx: 16, cy: 3,  r: 0.5, delay: 1   },
      ].map((star, i) => (
        <motion.circle
          key={i}
          cx={star.cx}
          cy={star.cy}
          r={star.r}
          fill="var(--color-text-secondary)"
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: star.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </svg>
  )
}
