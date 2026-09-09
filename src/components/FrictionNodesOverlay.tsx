import React, { useState, useEffect } from 'react';
import { FRICTION_NODES, FrictionNode } from '../data/friction-nodes';
import { sound } from '../lib/audio';

interface FrictionNodesOverlayProps {
  scrollProgress: number;
  onSelectNode: (node: FrictionNode) => void;
}

export const FrictionNodesOverlay: React.FC<FrictionNodesOverlayProps> = ({
  scrollProgress,
  onSelectNode,
}) => {
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Visível durante o Ato II e Ato III antes do Despacho de Veredito Final
  if (scrollProgress < 0.30 || scrollProgress > 0.86) return null;

  const mapScale = Math.min(dimensions.width, dimensions.height) * 0.0018;
  const centerX = dimensions.width * 0.55 + (mousePos.x - 0.5) * 32;
  const centerY = dimensions.height * 0.52 + (mousePos.y - 0.5) * 32;

  const handleNodeClick = (node: FrictionNode) => {
    sound.playMorseBurst();
    onSelectNode(node);
  };

  const handleNodeHover = (node: FrictionNode) => {
    setHoveredNodeId(node.id);
    sound.playTelegraphClick();
  };

  return (
    <>
      {/* Marcadores Vetoriais Táteis Ancorados na Cartografia */}
      <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
        {FRICTION_NODES.map((node) => {
          // Filtra Suez e Transvaal no Ato II conforme a progressão
          if (node.id === 'transvaal' && scrollProgress < 0.60) return null;

          const screenX = centerX + node.coords.x * mapScale;
          const screenY = centerY + node.coords.y * mapScale;
          const isHovered = hoveredNodeId === node.id;

          return (
            <div
              key={node.id}
              style={{
                left: `${screenX}px`,
                top: `${screenY}px`,
                transform: 'translate(-50%, -50%)',
              }}
              className="absolute pointer-events-auto cursor-pointer group"
              onClick={() => handleNodeClick(node)}
              onMouseEnter={() => handleNodeHover(node)}
              onMouseLeave={() => setHoveredNodeId(null)}
            >
              {/* Anel de Radar Pulsante */}
              <span className="absolute -inset-2.5 rounded-full border border-red-500/40 animate-ping" />
              <span className="absolute -inset-1 rounded-full border border-amber-500/60" />

              {/* Núcleo do Vetor Tátil */}
              <div
                className={`w-3.5 h-3.5 rounded-full transition-transform duration-300 flex items-center justify-center ${
                  isHovered
                    ? 'scale-150 bg-amber-400 shadow-[0_0_12px_#d4af37]'
                    : 'bg-red-700 shadow-[0_0_8px_#b91c1c]'
                }`}
              >
                <span className="w-1 h-1 rounded-full bg-white" />
              </div>

              {/* Rótulo Flutuante Telegráfico */}
              <div
                className={`absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap px-2.5 py-1 rounded bg-stone-900/95 border border-stone-700/80 shadow-xl transition-all duration-200 pointer-events-none ${
                  isHovered ? 'opacity-100 translate-x-0 scale-100' : 'opacity-70 -translate-x-1 scale-95'
                }`}
              >
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                  <span>[•]</span>
                  <span>{node.name}</span>
                </div>
                <div className="text-[9px] font-mono text-stone-400 tracking-wide">
                  Clique para Ficha Confidencial
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dock Rápido de Nós de Fricção Flutuante no Canto Inferior Direito */}
      <div className="fixed bottom-6 right-6 z-30 pointer-events-auto bg-stone-950/85 backdrop-blur-md border border-stone-800/80 rounded-xl p-3 shadow-2xl max-w-xs animate-fadeIn hidden md:block">
        <div className="flex items-center justify-between gap-2 border-b border-stone-800 pb-2 mb-2">
          <span className="text-[10px] font-mono text-amber-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            Nós de Fricção Vivos
          </span>
          <span className="text-[9px] font-mono text-stone-500">Cartografia Tátil</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {FRICTION_NODES.map((node) => (
            <button
              key={node.id}
              onClick={() => handleNodeClick(node)}
              className="px-2 py-1.5 rounded text-left border border-stone-800 hover:border-amber-600/70 bg-stone-900/60 hover:bg-stone-800/80 transition-all text-[10px] font-mono text-stone-300 hover:text-amber-200 truncate"
              title={`Inspecionar ${node.name}`}
            >
              • {node.name.split('&')[0].trim()}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};
