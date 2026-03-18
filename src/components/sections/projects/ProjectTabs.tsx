'use client';

import React from 'react';
import { motion } from 'motion/react';

interface Tab {
  id: string;
  label: string;
  count: number;
}

interface ProjectTabsProps {
  activeTab: string;
  onTabChange: (id: string) => void;
  tabs: Tab[];
}

export function ProjectTabs({ activeTab, onTabChange, tabs }: ProjectTabsProps) {
  return (
    <div style={{
      display: 'flex',
      gap: '4px',
      background: 'var(--color-bg-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: '10px',
      padding: '4px',
      width: 'fit-content',
      marginBottom: '40px',
    }}>
      {tabs.map(tab => {
        const isActive = tab.id === activeTab;
        return (
          <motion.button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            layout
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 20px',
              borderRadius: '7px',
              border: 'none',
              background: isActive
                ? 'var(--color-accent-primary)'
                : 'transparent',
              cursor: 'pointer',
              fontFamily: 'var(--font-ui)',
              fontSize: '14px',
              fontWeight: isActive ? 500 : 400,
              color: isActive
                ? '#ffffff'
                : 'var(--color-text-secondary)',
              transition: 'all 0.2s ease',
            }}
          >
            {tab.label}
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              background: isActive
                ? 'rgba(255,255,255,0.2)'
                : 'var(--color-bg-elevated)',
              borderRadius: '999px',
              padding: '1px 7px',
              color: isActive ? '#ffffff' : 'var(--color-text-muted)',
            }}>
              {tab.count}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
