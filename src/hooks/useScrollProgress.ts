'use client';

import { useState, useEffect } from 'react';

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let requestRef: number;

    const updateScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setProgress(window.scrollY / scrollHeight);
      }
      requestRef = requestAnimationFrame(updateScroll);
    };

    requestRef = requestAnimationFrame(updateScroll);

    return () => cancelAnimationFrame(requestRef);
  }, []);

  return progress;
}
