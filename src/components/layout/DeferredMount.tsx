'use client';

import React, { useState, useEffect } from 'react';

interface DeferredMountProps {
  children: React.ReactNode;
  delay?: number;
}

export function DeferredMount({ children, delay = 350 }: DeferredMountProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!ready) return null;
  return <>{children}</>;
}
