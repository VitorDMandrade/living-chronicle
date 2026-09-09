import { useState, useEffect } from 'react';

export function useActiveIndex(totalItems: number) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight - windowHeight;
      const progress = Math.max(0, Math.min(1, scrollY / (docHeight || 1)));
      const rawIndex = Math.floor(progress * totalItems);
      setActiveIndex(Math.min(totalItems - 1, rawIndex));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [totalItems]);

  return activeIndex;
}
