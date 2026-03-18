'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useInView, useSpring, useTransform, Variants } from 'framer-motion';
import { useReducedMotion } from '@/src/hooks/useReducedMotion';

import { PrincipleIcon } from '@/src/components/ui/PrincipleIcon';

interface Principle {
  icon: 'customer' | 'ownership' | 'invent' | 'bar' | 'think' | 'learn';
  title: string;
  back: string;
}

const principles: Principle[] = [
  {
    icon: 'customer',
    title: 'Obsesión por el cliente',
    back: 'Empezar siempre desde las necesidades del usuario final y trabajar hacia atrás. La confianza se gana despacio y se pierde rápido.'
  },
  {
    icon: 'ownership',
    title: 'Sentido de pertenencia',
    back: 'Actuar como dueño, no como empleado. Los problemas fuera de tu área también son tus problemas si los ves.'
  },
  {
    icon: 'invent',
    title: 'Inventar y simplificar',
    back: 'Buscar siempre la solución más simple que resuelva el problema real. La complejidad necesaria es deuda técnica disfrazada.'
  },
  {
    icon: 'bar',
    title: 'Insistir en lo excelente',
    back: 'Los estándares altos se contagian. Un equipo que no tolera la mediocridad construye sistemas que duran.'
  },
  {
    icon: 'think',
    title: 'Pensar en grande',
    back: 'Los sistemas bien diseñados hoy son los que permiten escalar mañana. Diseñar con visión de largo plazo no es opcional.'
  },
  {
    icon: 'learn',
    title: 'Aprender con curiosidad',
    back: 'El stack cambia, los fundamentos no. Aprender continuamente es la única ventaja competitiva sostenible en este campo.'
  },
];

import { AboutBackground } from '@/src/components/backgrounds';

export function AboutSection() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      x: prefersReducedMotion ? 0 : -40 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
  };

  const manifestoVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: prefersReducedMotion ? 0 : 30 
    },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.2 + (i * 0.08),
        duration: 0.5, 
        ease: "easeOut" 
      }
    }),
  };

  const photoVariants: Variants = {
    hidden: { 
      opacity: 0, 
      x: prefersReducedMotion ? 0 : 40 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    },
  };

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="relative min-h-screen py-24 px-6 md:px-12 flex items-center overflow-hidden bg-bg-base"
    >
      <AboutBackground />
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-16 lg:gap-24 items-center">
          
          {/* Columna Izquierda - Texto */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="order-2 lg:order-1"
          >
            <motion.span 
              variants={itemVariants}
              className="font-ui text-xs uppercase tracking-[0.2em] text-accent-secondary mb-4 block"
            >
              About me
            </motion.span>
            
            <motion.h2 
              variants={itemVariants}
              className="font-display text-[clamp(36px,5vw,52px)] leading-[1.1] text-text-primary mb-8"
            >
              Ingeniero backend con curiosidad por los sistemas que escalan
            </motion.h2>

            <div className="space-y-6 mb-10">
              <motion.p 
                variants={itemVariants}
                className="font-mono text-[15px] leading-[1.8] text-text-secondary"
              >
                Llevo 3.5 años construyendo servicios backend con Java, Spring Boot y Quarkus — pensando siempre en sistemas que no solo funcionen hoy, sino que escalen mañana. Fuera del trabajo, experimento con Next.js y exploro cómo la IA puede cambiar la forma en que construimos software.
              </motion.p>
            </div>

            {/* Grid de Flip Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 mb-12">
              {principles.map((p, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={manifestoVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  className="flip-card group"
                  style={{ perspective: '1000px', height: '140px' }}
                >
                  <div 
                    className="flip-card-inner relative w-full h-full transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:[transform:rotateY(180deg)]"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Frente */}
                    <div 
                      className="flip-card-front absolute inset-0 p-5 rounded-[10px] border border-border bg-bg-surface flex flex-col justify-between"
                      style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                    >
                      <PrincipleIcon name={p.icon} className="text-accent-primary" />
                      <span className="font-mono text-[13px] font-medium text-text-primary">
                        {p.title}
                      </span>
                    </div>
                    
                    {/* Reverso */}
                    <div 
                      className="flip-card-back absolute inset-0 p-5 rounded-[10px] border border-accent-primary bg-bg-elevated flex items-center justify-center text-center [transform:rotateY(180deg)]"
                      style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                    >
                      <p className="font-mono text-[12px] leading-[1.7] text-text-secondary">
                        {p.back}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Columna Derecha - Foto */}
          <motion.div
            variants={photoVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="order-1 lg:order-2"
          >
            <div className="relative group max-w-[400px] mx-auto">
              {/* Wrapper de la imagen */}
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden z-10">
                <Image
                  src="https://picsum.photos/seed/dev-profile/800/1000"
                  alt="Software Engineer Profile"
                  fill
                  className="object-cover object-top grayscale-[20%] group-hover:grayscale-0 transition-all duration-500 ease-out"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Borde decorativo offset */}
              <div className="absolute -inset-2.5 border border-accent-primary/30 rounded-2xl -z-0 pointer-events-none group-hover:-inset-1.5 group-hover:border-accent-primary/60 transition-all duration-500 ease-out" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
