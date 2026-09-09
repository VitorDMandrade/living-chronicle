import { useState, useEffect } from 'react';

export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight - windowHeight;
      const p = Math.max(0, Math.min(1, scrollY / (docHeight || 1)));
      setProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
}

export function useActiveIndex(totalItems: number): number {
  const progress = useScrollProgress();
  const rawIndex = Math.floor(progress * totalItems);
  return Math.min(totalItems - 1, rawIndex);
}
