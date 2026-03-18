'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Cloud, Server } from 'lucide-react';

const techGroups = [
  {
    layer: 'Frontend',
    color: '#7F77DD',
    items: [
      {
        name: 'Next.js',
        icon: 'nextdotjs',
        description: 'Framework principal para el frontend. Lo uso en proyectos personales y freelance por su flexibilidad entre SSR, SSG y CSR, y por su integración nativa con el ecosistema React.',
      },
      {
        name: 'TypeScript',
        icon: 'typescript',
        description: 'Lenguaje base en todos mis proyectos frontend. El tipado estático reduce errores en runtime y hace el código más mantenible a largo plazo.',
      },
      {
        name: 'Tailwind CSS',
        icon: 'tailwindcss',
        description: 'Mi herramienta preferida para estilos. La utilidad de clases atómicas acelera el desarrollo sin sacrificar consistencia visual.',
      },
    ],
  },
  {
    layer: 'Backend',
    color: '#1D9E75',
    items: [
      {
        name: 'Java',
        icon: 'openjdk',
        description: 'Lenguaje principal en mi experiencia profesional. Su madurez, ecosistema y performance en la JVM lo hacen ideal para sistemas empresariales robustos.',
      },
      {
        name: 'Spring Boot',
        icon: 'spring',
        description: 'Framework backend que uso en el día a día profesional. Ideal para construir APIs REST robustas con un ecosistema maduro de seguridad, persistencia y testing.',
      },
      {
        name: 'Quarkus',
        icon: 'quarkus',
        description: 'Alternativa moderna a Spring optimizada para contenedores. Lo elijo cuando el tiempo de arranque y el consumo de memoria son críticos — ideal para entornos Kubernetes.',
      },
      {
        name: 'Node.js',
        icon: 'nodedotjs',
        description: 'Runtime para el API Gateway y servicios ligeros. Su modelo event-driven lo hace eficiente para manejar muchas conexiones concurrentes con baja latencia.',
      },
      {
        name: 'Apache Kafka',
        icon: 'apachekafka',
        description: 'Message broker para comunicación asíncrona entre servicios. Lo uso para desacoplar productores de consumidores y garantizar resiliencia en flujos de datos críticos.',
      },
    ],
  },
  {
    layer: 'Bases de datos',
    color: '#4169E1',
    items: [
      {
        name: 'PostgreSQL',
        icon: 'postgresql',
        description: 'Mi base de datos relacional por defecto. ACID compliance, soporte JSON, y extensibilidad la hacen perfecta para la mayoría de casos de uso en backend.',
      },
      {
        name: 'MySQL',
        icon: 'mysql',
        description: 'Usada en entornos donde ya existe infraestructura establecida. Confiable para cargas de trabajo transaccionales con esquemas bien definidos.',
      },
      {
        name: 'MongoDB',
        icon: 'mongodb',
        description: 'Base de datos documental para datos con estructura variable o jerárquica. La elijo cuando la flexibilidad del schema es más importante que la consistencia relacional.',
      },
      {
        name: 'Redis',
        icon: 'redis',
        description: 'Caché en memoria para reducir latencia en operaciones frecuentes. También lo uso como store de sesiones y para rate limiting en el API Gateway.',
      },
    ],
  },
  {
    layer: 'Observabilidad',
    color: '#E6522C',
    items: [
      {
        name: 'Prometheus',
        icon: 'prometheus',
        description: 'Sistema de métricas para monitorear el estado de los servicios. Recolecta datos de performance, errores y saturación para detectar problemas antes de que escalen.',
      },
      {
        name: 'Grafana',
        icon: 'grafana',
        description: 'Dashboard de visualización conectado a Prometheus. Permite crear alertas y paneles en tiempo real para tener visibilidad completa del sistema en producción.',
      },
    ],
  },
  {
    layer: 'Cloud & Infra',
    color: '#2496ED',
    items: [
      {
        name: 'Docker',
        icon: 'docker',
        description: 'Containerización de todos los servicios backend. Garantiza consistencia entre entornos de desarrollo, staging y producción eliminando el clásico "en mi máquina funciona".',
      },
      {
        name: 'Kubernetes',
        icon: 'kubernetes',
        description: 'Orquestador de contenedores para entornos de producción. Maneja el escalado automático, self-healing y despliegues sin downtime de los servicios containerizados.',
      },
      {
        name: 'Azure',
        icon: 'microsoftazure',
        description: 'Cloud principal en mi entorno profesional. Uso servicios como Container Apps, Function Apps, Static Web Apps, y Azure Front Door para despliegues modernos.',
      },
      {
        name: 'AWS',
        icon: 'amazonwebservices',
        description: 'Cloud secundaria que estoy profundizando para la certificación. Familiarizado con EC2, S3, Lambda, RDS y EKS para arquitecturas cloud-native.',
      },
    ],
  },
];

function TechItem({ item, group, id, isOpen, toggle }: { 
  item: typeof techGroups[0]['items'][0], 
  group: typeof techGroups[0],
  id: string,
  isOpen: boolean,
  toggle: (id: string) => void
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <div key={item.name}>
      {/* Header clickeable */}
      <button
        onClick={() => toggle(id)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '10px',
          padding: '8px 10px',
          borderRadius: '8px',
          border: `1px solid ${isOpen
            ? group.color + '50'
            : 'transparent'}`,
          background: isOpen
            ? `${group.color}10`
            : 'transparent',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={e => {
          if (!isOpen) {
            e.currentTarget.style.background =
              `${group.color}08`
          }
        }}
        onMouseLeave={e => {
          if (!isOpen) {
            e.currentTarget.style.background = 'transparent'
          }
        }}
      >
        {/* Ícono + nombre */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          {imgError ? (
            <div style={{
              width: 16, height: 16,
              borderRadius: '4px',
              background: `${group.color}20`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '9px',
              fontWeight: 700,
              color: group.color,
              fontFamily: 'var(--font-mono)',
              flexShrink: 0,
            }}>
              {item.name.charAt(0)}
            </div>
          ) : item.icon === 'microsoftazure' ? (
            <Cloud size={16} color="#0078D4" style={{ flexShrink: 0 }} />
          ) : item.icon === 'amazonwebservices' ? (
            <Server size={16} color="#FF9900" style={{ flexShrink: 0 }} />
          ) : (
            <Image
              src={`https://cdn.simpleicons.org/${item.icon}`}
              width={16}
              height={16}
              alt={item.name}
              style={{
                filter: (item.icon === 'microsoftazure' || item.icon === 'amazonwebservices') 
                  ? 'none' 
                  : 'brightness(0) invert(0.6)',
                flexShrink: 0,
              }}
              onError={() => setImgError(true)}
              referrerPolicy="no-referrer"
            />
          )}
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            fontWeight: 500,
            color: isOpen
              ? 'var(--color-text-primary)'
              : 'var(--color-text-secondary)',
            transition: 'color 0.2s ease',
          }}>
            {item.name}
          </span>
        </div>

        {/* Chevron animado */}
        <motion.svg
          width={14}
          height={14}
          viewBox="0 0 14 14"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          style={{ flexShrink: 0 }}
        >
          <path
            d="M2 4.5L7 9.5L12 4.5"
            fill="none"
            stroke={isOpen
              ? group.color
              : 'var(--color-text-muted)'}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </button>

      {/* Contenido expandible */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.3, ease: 'easeOut' },
              opacity: { duration: 0.2 },
            }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              padding: '8px 10px 10px 34px',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              lineHeight: 1.7,
              color: 'var(--color-text-secondary)',
              borderLeft: `1px solid ${group.color}30`,
              marginLeft: '10px',
              marginBottom: '2px',
            }}>
              {item.description}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function TechAccordion() {
  // Controla qué item está abierto: 'layerIndex-itemIndex' o null
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId(prev => prev === id ? null : id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        width: '100%',
      }}
    >
      {techGroups.map((group, gi) => (
        <div key={group.layer}>

          {/* Label de capa */}
          <div style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '10px',
            fontWeight: 500,
            color: group.color,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            padding: '8px 0 4px',
            borderBottom: `1px solid ${group.color}20`,
            marginBottom: '4px',
          }}>
            {group.layer}
          </div>

          {/* Items del grupo */}
          {group.items.map((item, ii) => (
            <TechItem 
              key={item.name}
              item={item}
              group={group}
              id={`${gi}-${ii}`}
              isOpen={openId === `${gi}-${ii}`}
              toggle={toggle}
            />
          ))}
        </div>
      ))}
    </motion.div>
  );
}
