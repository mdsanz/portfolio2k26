'use client';

import React from 'react';
import { motion } from 'motion/react';

interface CTAButtonProps {
  variant: 'primary' | 'secondary';
  href: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function CTAButton({ variant, href, children, onClick }: CTAButtonProps) {
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  const baseStyles = "inline-flex items-center justify-center rounded-lg px-8 py-3.5 font-ui text-sm font-medium tracking-wide transition-all duration-300 relative overflow-hidden w-full sm:w-48 min-w-[12rem]";
  
  if (variant === 'primary') {
    return (
      <motion.a
        href={href}
        onClick={onClick}
        whileHover={{ 
          translateY: -2,
          scale: 1.02,
        }}
        whileTap={{ scale: 0.98 }}
        className={`${baseStyles} bg-accent-primary text-bg-base hover:shadow-[0_8px_24px_rgba(127,119,221,0.35)] group`}
        style={{ 
          backgroundColor: 'var(--color-accent-primary)',
          color: 'var(--color-bg-base)'
        }}
      >
        {/* Shimmer effect */}
        <span className="absolute inset-0 pointer-events-none">
          <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full transition-transform duration-700 ease-out group-hover:translate-x-full" />
        </span>
        <span className="relative z-10">{children}</span>
      </motion.a>
    );
  }

  return (
    <motion.a
      href={href}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      whileHover={{ 
        translateY: -2,
        scale: 1.02,
      }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} bg-white/3 backdrop-blur-md border border-border text-text-primary hover:border-accent-primary hover:text-accent-primary hover:bg-accent-primary/10 group`}
      style={{ 
        borderColor: 'var(--color-border)',
        color: 'var(--color-text-primary)'
      }}
    >
      {/* Shimmer effect for secondary */}
      <span className="absolute inset-0 pointer-events-none">
        <span className="absolute inset-0 bg-linear-to-r from-transparent via-accent-primary/20 to-transparent -translate-x-full transition-transform duration-700 ease-out group-hover:translate-x-full" />
      </span>
      
      {/* Spotlight border effect */}
      <span 
        className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(127, 119, 221, 0.1), transparent 40%)`
        }}
      />
      <span className="relative z-10">{children}</span>
    </motion.a>
  );
}
