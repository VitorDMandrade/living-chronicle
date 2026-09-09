import React, { useRef, useEffect } from 'react';
import { ImperialismCanvasEngine } from '../lib/canvas-engine';
import { SceneParams } from '../types/chronicle';
import { VideoBackdrop } from './VideoBackdrop';

interface StageCanvasProps {
  sceneParams: SceneParams;
  videoSrc?: string;
}

export const StageCanvas: React.FC<StageCanvasProps> = ({
  sceneParams,
  videoSrc = '/assets/video/imperialism_bg.mp4'
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const engineRef = useRef(new ImperialismCanvasEngine());
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      mouseRef.current = { x: nx, y: ny };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const loop = () => {
      engineRef.current.render(
        ctx,
        canvas.width,
        canvas.height,
        sceneParams,
        mouseRef.current.x,
        mouseRef.current.y
      );
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
      {/* Camada 1: Vídeo de Fundo Cinemagraph */}
      <VideoBackdrop videoSrc={videoSrc} />

      {/* Camada 2: Canvas Interativo com Mapa, Compasso e Linhas de Fronteira */}
      <canvas ref={canvasRef} className="relative z-10 w-full h-full object-cover" />
    </div>
  );
};
