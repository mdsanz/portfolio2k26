'use client';

import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { useTheme } from 'next-themes';
import { motion } from 'motion/react';

mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  themeVariables: {
    fontFamily: 'var(--font-mono, monospace)',
    primaryColor: 'rgba(127, 119, 221, 0.1)',
    primaryTextColor: '#E2E8F0',
    primaryBorderColor: '#7F77DD',
    lineColor: '#1D9E75',
    secondaryColor: 'rgba(29, 158, 117, 0.1)',
    tertiaryColor: '#1a1a2e',
    background: 'transparent',
  },
  securityLevel: 'loose',
});

interface MermaidProps {
  chart: string;
}

export default function MermaidDiagram({ chart }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!chart || !containerRef.current) return;
    
    const renderDiagram = async () => {
      try {
        // Reset the inner HTML so mermaid can parse it fresh
        if (containerRef.current) {
          containerRef.current.removeAttribute('data-processed');
          containerRef.current.innerHTML = chart;
          await mermaid.run({ nodes: [containerRef.current] });
        }
      } catch (error) {
        console.error('Failed to render mermaid diagram:', error);
      }
    };
    
    // Small delay ensures DOM is fully painted
    const timer = setTimeout(renderDiagram, 100);
    return () => clearTimeout(timer);
  }, [chart, resolvedTheme]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        padding: '24px 0',
        overflowX: 'auto'
      }}
    >
      <div 
        ref={containerRef} 
        className="mermaid"
        style={{ opacity: 1 }} // Prevent flicker
      >
        {/* Fallback while loading */}
        {chart}
      </div>
    </motion.div>
  );
}
