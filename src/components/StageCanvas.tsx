import React, { useRef, useEffect } from 'react';
import { ImperialismCanvasEngine } from '../lib/canvas-engine';
import { SceneParams } from '../types/chronicle';

interface StageCanvasProps {
  sceneParams: SceneParams;
}

export const StageCanvas: React.FC<StageCanvasProps> = ({ sceneParams }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const engineRef = useRef(new ImperialismCanvasEngine());

  useEffect(() => {
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const loop = () => {
      engineRef.current.render(ctx, canvas.width, canvas.height, sceneParams);
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [sceneParams]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <canvas ref={canvasRef} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#06080b] via-transparent to-[#06080b]/80" />
    </div>
  );
};
