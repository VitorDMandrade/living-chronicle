import React, { useRef, useEffect } from 'react';
import { ChronicleCanvasEngine } from '../lib/canvas-engine';
import { VideoBackdrop } from './VideoBackdrop';

interface StageCanvasProps {
  scrollProgress: number;
  videoSrc?: string;
}

export const StageCanvas: React.FC<StageCanvasProps> = ({
  scrollProgress,
  videoSrc = `${import.meta.env.BASE_URL}assets/video/imperialism_bg.mp4`,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const engineRef = useRef<ChronicleCanvasEngine | null>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const scrollRef = useRef(scrollProgress);

  useEffect(() => {
    scrollRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const engine = new ChronicleCanvasEngine(canvas);
    engineRef.current = engine;

    engine.startLoop(() => ({
      scrollProgress: scrollRef.current,
      mouseX: mouseRef.current.x,
      mouseY: mouseRef.current.y,
    }));

    const handleResize = () => {
      engine.handleResize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      engine.stopLoop();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Camada 1: Vídeo de Fundo Cinemagraph */}
      <VideoBackdrop videoSrc={videoSrc} />

      {/* Camada 2: Canvas Interativo com Mapa, Compasso e Linhas de Fronteira */}
      <canvas ref={canvasRef} className="relative z-10 w-full h-full object-cover" />
    </div>
  );
};
