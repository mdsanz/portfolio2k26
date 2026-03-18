'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useReducedMotion } from '@/src/hooks/useReducedMotion';
import { useMediaQuery } from '@/src/hooks/useMediaQuery';
import { ThemeToggle } from '@/src/components/ui/ThemeToggle';

// Definición de secciones
const sections = [
  { id: 'hero',           label: 'Inicio',          icon: 'home'    },
  { id: 'about',          label: 'About',            icon: 'user'    },
  { id: 'stack',          label: 'Tech Stack',       icon: 'cpu'     },
  { id: 'projects',       label: 'Proyectos',        icon: 'folder'  },
  { id: 'experience',     label: 'Experiencia',      icon: 'briefcase' },
  { id: 'certifications', label: 'Certificaciones',  icon: 'award'   },
  { id: 'blog',           label: 'Blog',             icon: 'pen'     },
  { id: 'contact',        label: 'Contacto',         icon: 'mail'    },
];

// Variantes de animación slide horizontal
const variants = {
  enter: (direction: number) => ({
    transform: direction > 0
      ? 'translateX(60%)'
      : 'translateX(-60%)',
    opacity: 0,
  }),
  center: {
    transform: 'translateX(0%)',
    opacity: 1,
  },
  exit: (direction: number) => ({
    transform: direction > 0
      ? 'translateX(-60%)'
      : 'translateX(60%)',
    opacity: 0,
  }),
};

const reducedVariants = {
  enter:  { opacity: 0 },
  center: { opacity: 1 },
  exit:   { opacity: 0 },
};

const transition = {
  transform: {
    type: 'tween',
    duration: 0.7,
    ease: [0.16, 1, 0.3, 1], // ease-out-expo — arranca rápido, termina muy suave
  },
  opacity: {
    duration: 0.5,
    ease: 'easeOut',
  },
};

interface PresentationLayoutProps {
  children: React.ReactNode[];
}

type Section = { id: string; label: string; icon: string };

/**
 * Helper para serializar objetos de forma segura, evitando errores de estructura circular.
 */
const safeStringify = (obj: any) => {
  const cache = new Set();
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (cache.has(value)) return '[Circular]';
      cache.add(value);
    }
    return value;
  });
};

export function PresentationLayout({ children }: PresentationLayoutProps) {
  const [[currentIndex, direction], setPage] = useState([0, 0]);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const prevTheme = useRef(resolvedTheme);
  
  const isNavigating = useRef(false);
  const currentIndexRef = useRef(currentIndex);
  const touchStartY = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    const timer = setTimeout(() => setShowScrollHint(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (prevTheme.current !== resolvedTheme) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsTransitioning(true);
      prevTheme.current = resolvedTheme;
      setTimeout(() => setIsTransitioning(false), 300);
    }
  }, [resolvedTheme]);

  const navigate = useCallback((newIndex: number) => {
    if (newIndex < 0 || newIndex >= sections.length) return;
    const dir = newIndex > currentIndexRef.current ? 1 : -1;
    setIsAnimating(true);
    setPage([newIndex, dir]);
    // Quitar el flag después de que termine la animación
    setTimeout(() => setIsAnimating(false), 500);
  }, []);

  // Cerrar menú al navegar a una sección
  const handleNavigate = (index: number) => {
    navigate(index);
    setMenuOpen(false);
  };

  const handleWheel = useCallback((e: WheelEvent) => {
    // Verificar si el scroll viene de un elemento con scroll interno
    const target = e.target as HTMLElement;
    const scrollableParent = target.closest('[data-scrollable]');
    if (scrollableParent) {
      const { scrollTop, scrollHeight, clientHeight } = scrollableParent as HTMLElement;
      const atTop    = scrollTop === 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 2;

      // Si hay scroll interno y no estamos en el límite, dejar pasar
      if (e.deltaY < 0 && !atTop)    return;
      if (e.deltaY > 0 && !atBottom) return;
    }

    if (isNavigating.current) return;
    isNavigating.current = true;
    setShowScrollHint(false);

    if (e.deltaY > 0) {
      navigate(currentIndexRef.current + 1);
    } else if (e.deltaY < 0) {
      navigate(currentIndexRef.current - 1);
    }

    // Bloquear navegación por 800ms para evitar scroll accidental
    setTimeout(() => {
      isNavigating.current = false;
    }, 800);
  }, [navigate]);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (touchStartY.current === null) return;
    if (isNavigating.current) return;

    const deltaY = touchStartY.current - e.changedTouches[0].clientY;
    const deltaX = Math.abs(touchStartX.current! - e.changedTouches[0].clientX);

    // Solo navegar si el swipe es principalmente vertical y tiene suficiente distancia (> 60px)
    if (Math.abs(deltaY) < 60 || deltaX > Math.abs(deltaY)) return;

    // Verificar scroll interno igual que en handleWheel
    const target = e.target as HTMLElement;
    const scrollableParent = target.closest('[data-scrollable]');
    if (scrollableParent) {
      const { scrollTop, scrollHeight, clientHeight } = scrollableParent as HTMLElement;
      const atTop    = scrollTop === 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 2;

      if (deltaY < 0 && !atTop)    return;
      if (deltaY > 0 && !atBottom) return;
    }

    isNavigating.current = true;
    setShowScrollHint(false);

    if (deltaY > 0) {
      navigate(currentIndexRef.current + 1);
    } else {
      navigate(currentIndexRef.current - 1);
    }

    setTimeout(() => {
      isNavigating.current = false;
    }, 800);

    touchStartY.current = null;
    touchStartX.current = null;
  }, [navigate]);

  useEffect(() => {
    const handler = () => navigate(currentIndexRef.current + 1);
    const navigateHandler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail && typeof detail.index === 'number') {
        navigate(detail.index);
      }
    };
    window.addEventListener('portfolio:next-section', handler);
    window.addEventListener('portfolio:navigate', navigateHandler);
    return () => {
      window.removeEventListener('portfolio:next-section', handler);
      window.removeEventListener('portfolio:navigate', navigateHandler);
    };
  }, [navigate]);

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend',   handleTouchEnd,   { passive: true });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend',   handleTouchEnd);
    };
  }, [handleWheel, handleTouchStart, handleTouchEnd]);

  // Limpiar URL al montar — siempre empezar en /
  useEffect(() => {
    if (window.location.href !== window.location.origin + '/') {
      window.history.replaceState(null, '', '/');
    }
  }, []);

  return (
    <div 
      className={isAnimating ? 'is-transitioning' : ''}
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        background: 'var(--color-bg-base)',
      }}
    >

      {/* Navbar */}
      <SectionNav
        sections={sections}
        currentIndex={currentIndex}
        onNavigate={handleNavigate}
        resolvedTheme={mounted ? resolvedTheme : 'dark'}
        isMobile={isMobile}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      {/* Dots de navegación (Desktop) */}
      {!isMobile && (
        <SectionDots
          total={sections.length}
          current={currentIndex}
          onNavigate={navigate}
        />
      )}

      {/* Hint inicial de scroll */}
      <AnimatePresence>
        {showScrollHint && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4, delay: 1.5 }}
            style={{
              position: 'fixed',
              bottom: '32px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              zIndex: 100,
              pointerEvents: 'none',
            }}
          >
            <svg width={20} height={28} viewBox="0 0 20 28" fill="none">
              <rect x="1" y="1" width="18" height="26" rx="9"
                stroke="var(--color-text-muted)" strokeWidth="1.5"/>
              <motion.rect
                x="9" y="6" width="2" height="5" rx="1"
                fill="var(--color-text-muted)"
                animate={{ y: [6, 10, 6] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </svg>
            <span style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '11px',
              color: 'var(--color-text-muted)',
              whiteSpace: 'nowrap',
            }}>
              Scroll para navegar
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay durante la transición */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: (mounted ? resolvedTheme : 'dark') === 'light' ? '#ffffff' : '#000000',
              backgroundColor: (mounted ? resolvedTheme : 'dark') === 'light' ? '#ffffff' : '#000000',
              pointerEvents: 'none',
              zIndex: 999,
            }}
          />
        )}
      </AnimatePresence>

      {/* Contenido de la sección activa */}
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={prefersReducedMotion ? reducedVariants : variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={transition}
          data-scrollable
          style={{
            position: 'absolute',
            inset: 0,
            overflowY: 'auto',
            overflowX: 'hidden',
            willChange: 'transform, opacity',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            pointerEvents: isAnimating ? 'none' : 'auto',
          }}
        >
          {/* Padding top para el navbar */}
          <div style={{ paddingTop: '64px', minHeight: '100%', position: 'relative' }}>
            {children[currentIndex]}
          </div>
        </motion.div>
      </AnimatePresence>

      {isMobile && (
        <MobileMenu
          isOpen={menuOpen}
          sections={sections}
          currentIndex={currentIndex}
          onNavigate={handleNavigate}
        />
      )}

    </div>
  );
}

function SectionNav({
  sections,
  currentIndex,
  onNavigate,
  resolvedTheme,
  isMobile,
  menuOpen,
  setMenuOpen,
}: {
  sections: Section[];
  currentIndex: number;
  onNavigate: (i: number) => void;
  resolvedTheme?: string;
  isMobile: boolean;
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      right: 0,
      left: 0,
      height: '64px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 32px',
      zIndex: 100,
      background: resolvedTheme === 'light'
        ? 'rgba(245, 245, 247, 0.8)'
        : 'rgba(13, 13, 15, 0.8)',
      backgroundColor: resolvedTheme === 'light'
        ? 'rgba(245, 245, 247, 0.8)'
        : 'rgba(13, 13, 15, 0.8)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--color-border)',
    }}>

      {/* Logo / nombre — izquierda */}
      <span style={{
        fontFamily: 'var(--font-display)',
        fontSize: '16px',
        fontWeight: 700,
        color: 'var(--color-text-primary)',
        letterSpacing: '-0.02em',
      }}>
        JD
      </span>

      {/* Desktop: ThemeToggle + separador + nav items */}
      {!isMobile && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <ThemeToggle />

          {/* Separador vertical */}
          <div style={{
            width: '1px',
            height: '20px',
            background: 'var(--color-border)',
            flexShrink: 0,
          }} />

          {/* Items de navegación */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}>
            {sections.map((section, index) => (
              <NavItem
                key={section.id}
                section={section}
                isActive={index === currentIndex}
                onClick={() => onNavigate(index)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Móvil/tablet: ThemeToggle + HamburgerButton */}
      {isMobile && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <ThemeToggle />
          <HamburgerButton
            isOpen={menuOpen}
            onClick={() => setMenuOpen(prev => !prev)}
          />
        </div>
      )}

    </nav>
  );
}

function NavItem({
  section,
  isActive,
  onClick,
}: {
  section: Section;
  isActive: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 10px',
        borderRadius: '6px',
        border: 'none',
        background: isActive
          ? 'var(--color-accent-primary)15'
          : 'transparent',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        position: 'relative',
      }}
    >
      {/* Ícono SVG */}
      <NavIcon
        name={section.icon}
        color={isActive
          ? 'var(--color-accent-primary)'
          : 'var(--color-text-muted)'}
        size={18}
      />

      {/* Label — solo visible en hover o activo */}
      <AnimatePresence>
        {(hovered || isActive) && (
          <motion.span
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 'auto', opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '14px',
              fontWeight: isActive ? 500 : 400,
              color: isActive
                ? 'var(--color-accent-primary)'
                : 'var(--color-text-secondary)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}
          >
            {section.label}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Dot indicador activo */}
      {isActive && (
        <motion.div
          layoutId="nav-indicator"
          style={{
            position: 'absolute',
            bottom: '2px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: 'var(--color-accent-primary)',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
    </button>
  );
}

function HamburgerButton({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
      style={{
        width: '40px',
        height: '40px',
        borderRadius: '8px',
        border: '1px solid var(--color-border)',
        background: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '5px',
        cursor: 'pointer',
        padding: 0,
        flexShrink: 0,
      }}
    >
      {/* Línea superior */}
      <motion.span
        animate={isOpen
          ? { rotate: 45, y: 7, width: '18px' }
          : { rotate: 0,  y: 0, width: '18px' }
        }
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{
          display: 'block',
          height: '1.5px',
          width: '18px',
          background: 'var(--color-text-secondary)',
          borderRadius: '2px',
          transformOrigin: 'center',
        }}
      />
      {/* Línea del medio — desaparece al abrir */}
      <motion.span
        animate={isOpen
          ? { opacity: 0, width: '10px' }
          : { opacity: 1, width: '14px' }
        }
        transition={{ duration: 0.2 }}
        style={{
          display: 'block',
          height: '1.5px',
          background: 'var(--color-text-secondary)',
          borderRadius: '2px',
        }}
      />
      {/* Línea inferior */}
      <motion.span
        animate={isOpen
          ? { rotate: -45, y: -7, width: '18px' }
          : { rotate: 0,   y: 0,  width: '18px' }
        }
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{
          display: 'block',
          height: '1.5px',
          width: '18px',
          background: 'var(--color-text-secondary)',
          borderRadius: '2px',
          transformOrigin: 'center',
        }}
      />
    </button>
  );
}

function MobileMenu({
  isOpen,
  sections,
  currentIndex,
  onNavigate,
}: {
  isOpen: boolean;
  sections: Section[];
  currentIndex: number;
  onNavigate: (i: number) => void;
}) {
  return (
    <>
      {/* Overlay oscuro detrás del sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => onNavigate(currentIndex)} // cerrar al click fuera
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(4px)',
              zIndex: 150,
            }}
          />
        )}
      </AnimatePresence>

      {/* Panel lateral */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 35,
            }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: 'min(320px, 85vw)',
              background: 'var(--color-bg-surface)',
              borderLeft: '1px solid var(--color-border)',
              zIndex: 200,
              display: 'flex',
              flexDirection: 'column',
              padding: '80px 32px 48px',
              gap: '8px',
              overflowY: 'auto',
            }}
          >
            {/* Items del menú con stagger */}
            {sections.map((section, index) => (
              <motion.button
                key={section.id}
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  delay: index * 0.05,
                  duration: 0.3,
                  ease: 'easeOut',
                }}
                onClick={() => onNavigate(index)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '14px 16px',
                  borderRadius: '10px',
                  border: 'none',
                  background: index === currentIndex
                    ? 'var(--color-accent-primary)15'
                    : 'transparent',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 0.2s ease',
                  width: '100%',
                }}
                onMouseEnter={e => {
                  if (index !== currentIndex) {
                    e.currentTarget.style.background =
                      'var(--color-bg-elevated)'
                  }
                }}
                onMouseLeave={e => {
                  if (index !== currentIndex) {
                    e.currentTarget.style.background = 'transparent'
                  }
                }}
              >
                {/* Número de sección */}
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: index === currentIndex
                    ? 'var(--color-accent-primary)'
                    : 'var(--color-text-muted)',
                  minWidth: '24px',
                }}>
                  {String(index + 1).padStart(2, '0')}
                </span>

                {/* Ícono */}
                <NavIcon
                  name={section.icon}
                  color={index === currentIndex
                    ? 'var(--color-accent-primary)'
                    : 'var(--color-text-secondary)'}
                  size={18}
                />

                {/* Nombre de la sección */}
                <span style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '15px',
                  fontWeight: index === currentIndex ? 500 : 400,
                  color: index === currentIndex
                    ? 'var(--color-text-primary)'
                    : 'var(--color-text-secondary)',
                }}>
                  {section.label}
                </span>

                {/* Indicador activo */}
                {index === currentIndex && (
                  <motion.div
                    layoutId="mobile-nav-indicator"
                    style={{
                      marginLeft: 'auto',
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'var(--color-accent-primary)',
                      flexShrink: 0,
                    }}
                  />
                )}
              </motion.button>
            ))}

            {/* Footer del sidebar */}
            <div style={{
              marginTop: 'auto',
              paddingTop: '24px',
              borderTop: '1px solid var(--color-border)',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--color-text-muted)',
              textAlign: 'center',
            }}>
              {String(currentIndex + 1).padStart(2, '0')} / {String(sections.length).padStart(2, '0')}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavIcon({
  name,
  color,
  size,
}: {
  name: string;
  color: string;
  size: number;
}) {
  const icons: Record<string, React.ReactNode> = {
    home: (
      <path d="M3 12L12 3L21 12V20H15V14H9V20H3V12Z"
        stroke={color} fill="none" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round"/>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" stroke={color} fill="none" strokeWidth="1.5"/>
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
          stroke={color} fill="none" strokeWidth="1.5" strokeLinecap="round"/>
      </>
    ),
    cpu: (
      <>
        <rect x="7" y="7" width="10" height="10" rx="1"
          stroke={color} fill="none" strokeWidth="1.5"/>
        <path d="M9 4V2M12 4V2M15 4V2M9 22v-2M12 22v-2M15 22v-2M4 9H2M4 12H2M4 15H2M22 9h-2M22 12h-2M22 15h-2"
          stroke={color} fill="none" strokeWidth="1.5" strokeLinecap="round"/>
      </>
    ),
    folder: (
      <path d="M3 7C3 5.9 3.9 5 5 5H10L12 7H19C20.1 7 21 7.9 21 9V17C21 18.1 20.1 19 19 19H5C3.9 19 3 18.1 3 17V7Z"
        stroke={color} fill="none" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round"/>
    ),
    briefcase: (
      <>
        <rect x="2" y="8" width="20" height="13" rx="2"
          stroke={color} fill="none" strokeWidth="1.5"/>
        <path d="M8 8V6C8 4.9 8.9 4 10 4H14C15.1 4 16 4.9 16 6V8"
          stroke={color} fill="none" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M2 13H22" stroke={color} fill="none"
          strokeWidth="1.5" strokeLinecap="round"/>
      </>
    ),
    award: (
      <>
        <circle cx="12" cy="9" r="6"
          stroke={color} fill="none" strokeWidth="1.5"/>
        <path d="M8.5 15.5L7 22L12 19L17 22L15.5 15.5"
          stroke={color} fill="none" strokeWidth="1.5"
          strokeLinecap="round" strokeLinejoin="round"/>
      </>
    ),
    pen: (
      <path d="M12 20H21M16.5 3.5C17.3 2.7 18.7 2.7 19.5 3.5C20.3 4.3 20.3 5.7 19.5 6.5L7 19L3 20L4 16L16.5 3.5Z"
        stroke={color} fill="none" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round"/>
    ),
    mail: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="2"
          stroke={color} fill="none" strokeWidth="1.5"/>
        <path d="M2 8L12 13L22 8"
          stroke={color} fill="none" strokeWidth="1.5" strokeLinecap="round"/>
      </>
    ),
  };

  return (
    <svg width={size} height={size} viewBox="0 0 24 24"
      style={{ flexShrink: 0 }}>
      {icons[name]}
    </svg>
  );
}

function SectionDots({
  total,
  current,
  onNavigate,
}: {
  total: number;
  current: number;
  onNavigate: (i: number) => void;
}) {
  return (
    <div style={{
      position: 'fixed',
      right: '20px',
      top: '50%',
      transform: 'translateY(-50%)',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      zIndex: 100,
    }}>
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onNavigate(i)}
          title={`Ir a sección ${i + 1}`}
          style={{
            width: i === current ? '8px' : '6px',
            height: i === current ? '8px' : '6px',
            borderRadius: '50%',
            border: 'none',
            background: i === current
              ? 'var(--color-accent-primary)'
              : 'var(--color-border)',
            cursor: 'pointer',
            padding: 0,
            transition: 'all 0.3s ease',
            flexShrink: 0,
          }}
        />
      ))}
    </div>
  );
}
