'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Cloud, Server } from 'lucide-react';

const groups = [
  {
    id: 'frontend',
    label: 'Frontend',
    color: '#7F77DD',
    techs: [
      { label: 'Next.js',      icon: 'nextdotjs' },
      { label: 'TypeScript',   icon: 'typescript' },
      { label: 'Tailwind CSS', icon: 'tailwindcss' },
    ],
  },
  {
    id: 'gateway',
    label: 'API Gateway',
    color: '#339933',
    techs: [
      { label: 'API Gateway',  icon: 'nodedotjs' },
      { label: 'Azure Front Door', icon: 'microsoftazure' },
    ],
  },
  {
    id: 'services',
    label: 'Microservices',
    color: '#1D9E75',
    techs: [
      { label: 'Auth Service', icon: 'jsonwebtokens' },
      { label: 'Spring Boot',  icon: 'spring' },
      { label: 'Quarkus',      icon: 'quarkus' },
    ],
  },
  {
    id: 'events',
    label: 'Event Streaming',
    color: '#231F20',
    techs: [
      { label: 'Apache Kafka', icon: 'apachekafka' },
    ],
  },
  {
    id: 'data',
    label: 'Databases',
    color: '#4169E1',
    techs: [
      { label: 'PostgreSQL',   icon: 'postgresql' },
      { label: 'MySQL',        icon: 'mysql' },
      { label: 'MongoDB',      icon: 'mongodb' },
      { label: 'Redis Cache',  icon: 'redis' },
    ],
  },
  {
    id: 'observability',
    label: 'Observability',
    color: '#E6522C',
    techs: [
      { label: 'Prometheus',   icon: 'prometheus' },
      { label: 'Grafana',      icon: 'grafana' },
    ],
  },
  {
    id: 'infra',
    label: 'Infrastructure',
    color: '#2496ED',
    techs: [
      { label: 'Docker',       icon: 'docker' },
      { label: 'Kubernetes',   icon: 'kubernetes' },
      { label: 'Azure',        icon: 'microsoftazure' },
      { label: 'AWS',          icon: 'amazonwebservices' },
    ],
  },
];

function TechPill({ tech, color, compact }: {
  tech: { label: string, icon: string }
  color: string
  compact: boolean
}) {
  const [imgError, setImgError] = useState(false);
  const isCloud = tech.icon === 'microsoftazure' || tech.icon === 'amazonwebservices';

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: compact ? '0' : '5px',
      padding: compact ? '4px' : '4px 10px',
      borderRadius: '6px',
      background: `${color}15`,
      border: `1px solid ${color}30`,
    }}>
      {imgError ? (
        <span style={{
          fontSize: '10px',
          fontWeight: 700,
          color: color,
          fontFamily: 'var(--font-mono)',
          width: 14,
          textAlign: 'center',
        }}>
          {tech.label.charAt(0)}
        </span>
      ) : tech.icon === 'microsoftazure' ? (
        <Cloud size={14} color="#0078D4" style={{ flexShrink: 0 }} />
      ) : tech.icon === 'amazonwebservices' ? (
        <Server size={14} color="#FF9900" style={{ flexShrink: 0 }} />
      ) : (
        <Image
          src={`https://cdn.simpleicons.org/${tech.icon}`}
          width={14}
          height={14}
          alt={tech.label}
          style={{ 
            filter: isCloud ? 'none' : 'brightness(0) invert(0.6)', 
            flexShrink: 0 
          }}
          onError={() => setImgError(true)}
          referrerPolicy="no-referrer"
        />
      )}
      {!compact && (
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: 'var(--color-text-secondary)',
          whiteSpace: 'nowrap',
        }}>
          {tech.label}
        </span>
      )}
    </div>
  );
}

function ArrowConnector({
  direction,
  color,
}: {
  direction: 'down' | 'right'
  color: string
}) {
  const isDown = direction === 'down';

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width:  isDown ? '100%' : '32px',
      height: isDown ? '32px' : '100%',
      flexShrink: 0,
      position: 'relative',
    }}>
      {/* Línea */}
      <div style={{
        position: 'absolute',
        background: `${color}50`,
        width:  isDown ? '1px' : '100%',
        height: isDown ? '100%' : '1px',
      }} />

      {/* Punta de flecha SVG */}
      <svg
        width={isDown ? 10 : 8}
        height={isDown ? 8 : 10}
        viewBox="0 0 10 8"
        style={{
          position: 'absolute',
          bottom: isDown ? 0 : 'auto',
          right:  isDown ? 'auto' : 0,
          transform: isDown ? 'none' : 'rotate(-90deg)',
        }}
      >
        <path
          d="M5 8L0 0h10z"
          fill={`${color}80`}
        />
      </svg>

      {/* Partícula animada que fluye por la flecha */}
      <motion.div
        style={{
          position: 'absolute',
          width: 4,
          height: 4,
          borderRadius: '50%',
          background: color,
          opacity: 0.8,
        }}
        animate={isDown
          ? { y: ['-100%', '100%'] }
          : { x: ['-100%', '100%'] }
        }
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
}

interface GroupCardProps {
  group: typeof groups[0]
  compact?: boolean
}

function GroupCard({ group, compact = false }: GroupCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4 }}
      style={{
        background: `${group.color}10`,
        border: `1px solid ${group.color}40`,
        borderTop: `2px solid ${group.color}`,
        borderRadius: '12px',
        padding: compact ? '12px' : '16px',
        width: compact ? '130px' : '100%',
        minWidth: compact ? '130px' : 'unset',
      }}
    >
      {/* Label del grupo */}
      <div style={{
        fontFamily: 'var(--font-ui)',
        fontSize: '10px',
        fontWeight: 500,
        color: group.color,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        marginBottom: '10px',
      }}>
        {group.label}
      </div>

      {/* Grid de tecnologías */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '6px',
      }}>
        {group.techs.map(tech => (
          <TechPill
            key={tech.label}
            tech={tech}
            color={group.color}
            compact={compact}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function MobileDiagram() {
  const isLandscape = false;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 0,
      padding: '0 16px',
      width: '100%',
      maxWidth: '480px',
      margin: '0 auto',
    }}>
      {groups.map((group, index) => (
        <div key={group.id} style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}>
          <GroupCard group={group} />
          {index < groups.length - 1 && (
            <ArrowConnector direction="down" color={group.color} />
          )}
        </div>
      ))}
    </div>
  );
}
