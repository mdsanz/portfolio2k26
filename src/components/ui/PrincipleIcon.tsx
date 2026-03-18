'use client';

interface PrincipleIconProps {
  name: 'customer' | 'ownership' | 'invent' | 'bar' | 'think' | 'learn';
  size?: number;
  className?: string;
}

export function PrincipleIcon({ name, size = 22, className = "" }: PrincipleIconProps) {
  const strokeWidth = 1.5;
  
  switch (name) {
    case 'customer':
      return (
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth={strokeWidth} 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className={className}
        >
          <circle cx="12" cy="8" r="4"/>
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
        </svg>
      );
    case 'ownership':
      return (
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth={strokeWidth} 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className={className}
        >
          <path d="M12 2l3 6.5H21l-5.5 4 2 6.5L12 15l-5.5 4 2-6.5L3 8.5h6z"/>
        </svg>
      );
    case 'invent':
      return (
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth={strokeWidth} 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className={className}
        >
          <path d="M9 18h6M10 22h4M12 2a7 7 0 0 1 4 12.7V17H8v-2.3A7 7 0 0 1 12 2z"/>
        </svg>
      );
    case 'bar':
      return (
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth={strokeWidth} 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className={className}
        >
          <rect x="2" y="14" width="4" height="8" rx="1"/>
          <rect x="9" y="9" width="4" height="13" rx="1"/>
          <rect x="16" y="4" width="4" height="18" rx="1"/>
        </svg>
      );
    case 'think':
      return (
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth={strokeWidth} 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className={className}
        >
          <path d="M3 12h18M12 3l9 9-9 9"/>
        </svg>
      );
    case 'learn':
      return (
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth={strokeWidth} 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className={className}
        >
          <path d="M2 19V6l10-3 10 3v13"/>
          <path d="M12 3v16"/>
          <path d="M2 9h10M12 9h10"/>
        </svg>
      );
    default:
      return null;
  }
}
