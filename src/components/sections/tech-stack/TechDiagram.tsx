'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Cloud, Server } from 'lucide-react';
import { useTheme } from 'next-themes';
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Handle,
  Position,
  useNodesState,
  useEdgesState,
  type NodeProps,
  type Node,
  type Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// --- Custom Node Components ---

const brandColors: Record<string, string> = {
  'nextdotjs':          '#ffffff',
  'typescript':         '#3178C6',
  'tailwindcss':        '#06B6D4',
  'nodedotjs':          '#339933',
  'microsoftazure':     '#0078D4',
  'spring':             '#6DB33F',
  'quarkus':            '#4695EB',
  'postgresql':         '#4169E1',
  'mysql':              '#4479A1',
  'mongodb':            '#47A248',
  'redis':              '#FF4438',
  'docker':             '#2496ED',
  'kubernetes':         '#326CE5',
  'amazonwebservices':  '#FF9900',
  'apachekafka':    '#FFFFFF',
  'prometheus':     '#E6522C',
  'grafana':        '#F46800',
  'jsonwebtokens':  '#7F77DD',
};

interface TechNodeData {
  label: string;
  icon: string;
  color: string;
  layer: string;
  [key: string]: unknown;
}

function TechIcon({ icon, label, color, size = 18 }: {
  icon: string;
  label: string;
  color: string;
  size?: number;
}) {
  const [imgError, setImgError] = useState(false);
  const initial = label.charAt(0).toUpperCase();

  if (imgError) {
    return (
      <div style={{
        width: size,
        height: size,
        borderRadius: '4px',
        background: `${color}20`,
        border: `1px solid ${color}60`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.55,
        fontWeight: 700,
        color: color,
        flexShrink: 0,
        fontFamily: 'var(--font-mono)',
      }}>
        {initial}
      </div>
    );
  }

  // Usar logos de lucide-react para Azure y AWS para evitar 404 del CDN y errores de importación
  if (icon === 'microsoftazure') {
    return <Cloud size={size} color="#0078D4" style={{ flexShrink: 0 }} />;
  }
  if (icon === 'amazonwebservices') {
    return <Server size={size} color="#FF9900" style={{ flexShrink: 0 }} />;
  }

  let src = `https://cdn.simpleicons.org/${icon}/${color.replace('#', '')}`;

  return (
    <Image
      src={src}
      width={size}
      height={size}
      alt={label}
      style={{ 
        flexShrink: 0, 
        display: 'block',
      }}
      onError={() => setImgError(true)}
      referrerPolicy="no-referrer"
    />
  );
}

function TechNode({ data }: NodeProps<Node<TechNodeData>>) {
  const [hovered, setHovered] = useState(false);
  const brandColor = brandColors[data.icon] ?? data.color;

  // Color de fondo: versión muy oscura del brand color
  const bgColor = `${brandColor}12`;       // 7% opacidad
  const bgHover = `${brandColor}22`;       // 13% opacidad
  const borderColor = `${brandColor}50`;   // 31% opacidad
  const borderHover = `${brandColor}CC`;   // 80% opacidad

  return (
    <>
      <Handle type="target" position={Position.Top}
        style={{ opacity: 0, pointerEvents: 'none', width: 6, height: 6 }} />

      <div
        className="tech-node-card"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered ? bgHover : bgColor,
          border: `1px solid ${hovered ? borderHover : borderColor}`,
          borderRadius: '12px',
          padding: '14px 16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          width: '110px',
          cursor: 'default',
          transition: 'all 0.3s ease',
          boxShadow: hovered
            ? `0 0 20px ${brandColor}30, 0 0 40px ${brandColor}10`
            : 'none',
          '--node-glow': `${brandColor}35`,
        } as React.CSSProperties}
      >
        {/* Ícono grande */}
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '10px',
          background: `${brandColor}18`,
          border: `1px solid ${brandColor}30`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          boxShadow: hovered ? `0 0 12px ${brandColor}40` : 'none',
        }}>
          <TechIcon
            icon={data.icon}
            label={data.label}
            color={brandColor}
            size={24}
          />
        </div>

        {/* Label */}
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          fontWeight: 500,
          color: hovered ? '#E8E6FF' : '#A0A0A8',
          whiteSpace: 'nowrap',
          textAlign: 'center',
          transition: 'color 0.3s ease',
          lineHeight: 1.2,
        }}>
          {data.label}
        </span>
      </div>

      <Handle type="source" position={Position.Bottom}
        style={{ opacity: 0, pointerEvents: 'none', width: 6, height: 6 }} />
    </>
  );
}

const nodeTypes = {
  techNode: TechNode,
};

interface TechDiagramProps {
  isTablet?: boolean;
}

// --- Initial Data ---

const initialNodes: Node[] = [

  // ── FRONTEND ──────────────────────────── y: 30
  {
    id: 'typescript', type: 'techNode',
    position: { x: 350, y: 30 },
    data: { label: 'TypeScript', icon: 'typescript',
      color: '#3178C6', layer: 'client' },
  },
  {
    id: 'tailwind', type: 'techNode',
    position: { x: 550, y: 30 },
    data: { label: 'Tailwind CSS', icon: 'tailwindcss',
      color: '#06B6D4', layer: 'client' },
  },
  {
    id: 'nextjs', type: 'techNode',
    position: { x: 450, y: 140 },
    data: { label: 'Next.js', icon: 'nextdotjs',
      color: '#ffffff', layer: 'client' },
  },

  // ── API GATEWAY ───────────────────────── y: 260
  {
    id: 'api-gateway', type: 'techNode',
    position: { x: 450, y: 260 },
    data: { label: 'API Gateway', icon: 'nodedotjs',
      color: '#339933', layer: 'gateway' },
  },

  // ── FILA 4: MICROSERVICES (y: 390)
  {
    id: 'auth', type: 'techNode',
    position: { x: 250, y: 390 },
    data: { label: 'Auth Service', icon: 'jsonwebtokens',
      color: '#7F77DD', layer: 'services' },
  },
  {
    id: 'spring', type: 'techNode',
    position: { x: 450, y: 390 },
    data: { label: 'Spring Boot', icon: 'spring',
      color: '#6DB33F', layer: 'services' },
  },
  {
    id: 'quarkus', type: 'techNode',
    position: { x: 650, y: 390 },
    data: { label: 'Quarkus', icon: 'quarkus',
      color: '#4695EB', layer: 'services' },
  },

  // ── FILA 5: DATA & EVENTS & OBS (y: 520)
  {
    id: 'kafka', type: 'techNode',
    position: { x: 450, y: 520 },
    data: { label: 'Apache Kafka', icon: 'apachekafka',
      color: '#FFFFFF', layer: 'events' },
  },
  {
    id: 'postgres', type: 'techNode',
    position: { x: 150, y: 520 },
    data: { label: 'PostgreSQL', icon: 'postgresql',
      color: '#4169E1', layer: 'data' },
  },
  {
    id: 'mysql', type: 'techNode',
    position: { x: 300, y: 520 },
    data: { label: 'MySQL', icon: 'mysql',
      color: '#4479A1', layer: 'data' },
  },
  {
    id: 'mongodb', type: 'techNode',
    position: { x: 600, y: 520 },
    data: { label: 'MongoDB', icon: 'mongodb',
      color: '#47A248', layer: 'data' },
  },
  {
    id: 'redis', type: 'techNode',
    position: { x: 750, y: 520 },
    data: { label: 'Redis Cache', icon: 'redis',
      color: '#FF4438', layer: 'data' },
  },
  {
    id: 'prometheus', type: 'techNode',
    position: { x: 1000, y: 520 },
    data: { label: 'Prometheus', icon: 'prometheus',
      color: '#E6522C', layer: 'observability' },
  },

  // ── INFRASTRUCTURE / OBSERVABILITY ────── y: 640
  {
    id: 'grafana', type: 'techNode',
    position: { x: 1000, y: 640 },
    data: { label: 'Grafana', icon: 'grafana',
      color: '#F46800', layer: 'observability' },
  },
  {
    id: 'docker', type: 'techNode',
    position: { x: 450, y: 640 },
    data: { label: 'Docker', icon: 'docker',
      color: '#2496ED', layer: 'infra' },
  },

  // ── INFRASTRUCTURE ────────────────────── y: 760
  {
    id: 'kubernetes', type: 'techNode',
    position: { x: 450, y: 760 },
    data: { label: 'Kubernetes', icon: 'kubernetes',
      color: '#326CE5', layer: 'infra' },
  },

  // ── CLOUD ─────────────────────────────── y: 880
  {
    id: 'azure', type: 'techNode',
    position: { x: 350, y: 880 },
    data: { label: 'Azure', icon: 'microsoftazure',
      color: '#0078D4', layer: 'infra' },
  },
  {
    id: 'aws', type: 'techNode',
    position: { x: 550, y: 880 },
    data: { label: 'AWS', icon: 'amazonwebservices',
      color: '#FF9900', layer: 'infra' },
  },
];

// Estilos por tipo de conexión
const defaultEdge  = { stroke: '#3a3a44', strokeWidth: 1 }
const accentEdge   = { stroke: '#7F77DD', strokeWidth: 1.5 }
const tealEdge     = { stroke: '#1D9E75', strokeWidth: 1 }
const orangeEdge   = { stroke: '#E6522C', strokeWidth: 1 }
const infraEdge    = { stroke: '#2496ED', strokeWidth: 1 }

const initialEdges: Edge[] = [
  // Frontend
  { id: 'ts-nx', source: 'typescript', target: 'nextjs', type: 'default', style: defaultEdge },
  { id: 'tw-nx', source: 'tailwind', target: 'nextjs', type: 'default', style: defaultEdge },
  { id: 'nx-gw', source: 'nextjs', target: 'api-gateway', type: 'straight', style: accentEdge, animated: true },

  // Gateway
  { id: 'gw-auth', source: 'api-gateway', target: 'auth', type: 'default', style: accentEdge, animated: true },
  { id: 'gw-sb', source: 'api-gateway', target: 'spring', type: 'straight', style: accentEdge, animated: true },
  { id: 'gw-qk', source: 'api-gateway', target: 'quarkus', type: 'default', style: accentEdge, animated: true },

  // Service Events
  { id: 'auth-kf', source: 'auth', target: 'kafka', type: 'default', style: tealEdge, animated: true },
  { id: 'sb-kf', source: 'spring', target: 'kafka', type: 'straight', style: tealEdge, animated: true },
  { id: 'qk-kf', source: 'quarkus', target: 'kafka', type: 'default', style: tealEdge, animated: true },

  // Databases
  { id: 'auth-pg', source: 'auth', target: 'postgres', type: 'default', style: defaultEdge },
  { id: 'sb-pg', source: 'spring', target: 'postgres', type: 'default', style: defaultEdge },
  { id: 'sb-my', source: 'spring', target: 'mysql', type: 'default', style: defaultEdge },
  { id: 'qk-mg', source: 'quarkus', target: 'mongodb', type: 'default', style: defaultEdge },
  { id: 'qk-rd', source: 'quarkus', target: 'redis', type: 'default', style: defaultEdge },

  // Observability
  { id: 'auth-pr', source: 'auth', target: 'prometheus', type: 'default', style: orangeEdge },
  { id: 'sb-pr', source: 'spring', target: 'prometheus', type: 'default', style: orangeEdge },
  { id: 'qk-pr', source: 'quarkus', target: 'prometheus', type: 'default', style: orangeEdge },
  { id: 'pr-gf', source: 'prometheus', target: 'grafana', type: 'straight', style: orangeEdge, animated: true },

  // Containers & Infra
  { id: 'auth-dk', source: 'auth', target: 'docker', type: 'default', style: infraEdge },
  { id: 'sb-dk', source: 'spring', target: 'docker', type: 'straight', style: infraEdge },
  { id: 'qk-dk', source: 'quarkus', target: 'docker', type: 'default', style: infraEdge },
  { id: 'dk-kb', source: 'docker', target: 'kubernetes', type: 'straight', style: infraEdge, animated: true },
  { id: 'kb-az', source: 'kubernetes', target: 'azure', type: 'default', style: infraEdge },
  { id: 'kb-aw', source: 'kubernetes', target: 'aws', type: 'default', style: infraEdge },
];

export default function TechDiagram({ isTablet = false }: TechDiagramProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const getEdgeColors = useMemo(() => {
    const theme = mounted ? resolvedTheme : 'dark';
    return {
      default: theme === 'light' ? '#C8C8D0' : '#3a3a44',
      accent:  theme === 'light' ? '#534AB7' : '#7F77DD',
      teal:    theme === 'light' ? '#0F6E56' : '#1D9E75',
      orange:  theme === 'light' ? '#C44A1A' : '#E6522C',
      infra:   theme === 'light' ? '#1A7AC4' : '#2496ED',
    };
  }, [resolvedTheme, mounted]);

  const edgesWithTheme = useMemo(() => {
    const colors = getEdgeColors;
    return initialEdges.map(edge => {
      let stroke = colors.default;
      if (edge.style?.stroke === '#7F77DD') stroke = colors.accent;
      if (edge.style?.stroke === '#1D9E75') stroke = colors.teal;
      if (edge.style?.stroke === '#E6522C') stroke = colors.orange;
      if (edge.style?.stroke === '#2496ED') stroke = colors.infra;

      return {
        ...edge,
        style: {
          ...edge.style,
          stroke,
        }
      };
    });
  }, [getEdgeColors]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(edgesWithTheme);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    setEdges(edgesWithTheme);
  }, [edgesWithTheme, setEdges]);

  useEffect(() => {
    if (!isTablet) return;
    const timer = setTimeout(() => setShowHint(false), 3000);
    return () => clearTimeout(timer);
  }, [isTablet]);

  const flowProps = {
    nodesDraggable: false,
    nodesConnectable: false,
    elementsSelectable: false,
    fitView: true,
    fitViewOptions: {
      padding: isTablet ? 0.05 : 0.04,
      minZoom: isTablet ? 0.3 : 0.5,
      maxZoom: 1.5,
    },
    minZoom: isTablet ? 0.25 : 0.4,
    maxZoom: 1.5,

    // Desktop: sin interacción
    // Tablet: pan y zoom habilitados
    panOnDrag: isTablet ? true : false,
    panOnScroll: false,
    zoomOnScroll: false,
    zoomOnPinch: isTablet ? true : false,
    zoomOnDoubleClick: false,
    preventScrolling: isTablet ? true : false,
  };

  const canvasHeight = isTablet ? '600px' : '850px';

  return (
    <div style={{
      width: '100%',
      height: canvasHeight,
      borderRadius: '16px',
      border: '1px solid var(--color-border)',
      overflow: 'hidden',
      background: 'transparent',
      backgroundColor: 'transparent',
      position: 'relative',
      // En tablet: permitir gestos touch
      touchAction: isTablet ? 'none' : 'auto',
    }}>
      <ReactFlow 
        {...flowProps} 
        nodes={nodes} 
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        style={{
          background: 'transparent',
          backgroundColor: 'transparent',
        }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={28}
          size={1}
          color="var(--color-border)"
          style={{ opacity: 0.2 }}
        />
        
        {/* Hint de navegación en tablet */}
        {isTablet && showHint && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: showHint ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'absolute',
              bottom: 16,
              left: '50%',
              transform: 'translateX(-50%)',
              background: (mounted ? resolvedTheme : 'dark') === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(26, 26, 30, 0.9)',
              backgroundColor: (mounted ? resolvedTheme : 'dark') === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(26, 26, 30, 0.9)',
              backdropFilter: 'blur(8px)',
              border: '1px solid var(--color-border)',
              borderRadius: '999px',
              padding: '6px 16px',
              fontFamily: 'var(--font-ui)',
              fontSize: '11px',
              color: 'var(--color-text-secondary)',
              pointerEvents: 'none',
              zIndex: 10,
              whiteSpace: 'nowrap',
            }}
          >
            Pellizca para zoom · Arrastra para mover
          </motion.div>
        )}
      </ReactFlow>
    </div>
  );
}
