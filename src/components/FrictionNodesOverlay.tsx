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
  const [showMapMarkers, setShowMapMarkers] = useState(true);
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false);

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

  const isDesktop = dimensions.width >= 1024;
  const mapScale = Math.min(dimensions.width, dimensions.height) * (isDesktop ? 0.0019 : 0.0015);
  // Alinhado rigorosamente à mesa cartográfica desenhada no canvas (à direita no desktop)
  const centerX = (isDesktop ? dimensions.width * 0.70 : dimensions.width * 0.50) + (mousePos.x - 0.5) * 32;
  const centerY = (isDesktop ? dimensions.height * 0.50 : dimensions.height * 0.45) + (mousePos.y - 0.5) * 32;

  const handleNodeClick = (node: FrictionNode) => {
    sound.playMorseBurst();
    onSelectNode(node);
    if (isMobileSheetOpen) setIsMobileSheetOpen(false);
  };

  const handleNodeHover = (node: FrictionNode) => {
    setHoveredNodeId(node.id);
    sound.playTelegraphClick();
  };

  const handleToggleMarkers = () => {
    sound.playTelegraphClick();
    setShowMapMarkers((prev) => !prev);
  };

  return (
    <>
      {/* Marcadores Vetoriais Táteis Ancorados na Cartografia (Apenas em Desktop e se ativado) */}
      {showMapMarkers && (
        <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden hidden lg:block">
          {FRICTION_NODES.map((node) => {
            // Filtra Suez e Transvaal conforme a evolução temporal da narrativa
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
                <span className={`absolute -inset-2.5 rounded-full border border-red-500/40 ${isHovered ? 'scale-125 border-amber-400/80' : 'animate-ping'}`} />
                <span className="absolute -inset-1 rounded-full border border-amber-500/60" />

                {/* Núcleo do Vetor Tátil */}
                <div
                  className={`w-3.5 h-3.5 rounded-full transition-transform duration-300 flex items-center justify-center ${
                    isHovered
                      ? 'scale-150 bg-amber-400 shadow-[0_0_14px_#d4af37]'
                      : 'bg-red-700 shadow-[0_0_8px_#b91c1c]'
                  }`}
                >
                  <span className="w-1 h-1 rounded-full bg-white" />
                </div>

                {/* Rótulo Flutuante Telegráfico — Elegante e sem poluição */}
                <div
                  className={`absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap px-2.5 py-1 rounded bg-[#0b0d12]/95 border shadow-xl transition-all duration-200 pointer-events-none ${
                    isHovered
                      ? 'opacity-100 translate-x-0 scale-100 border-amber-600/90 shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                      : 'opacity-70 -translate-x-1 scale-95 border-stone-800'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-mono text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                    <span>[•]</span>
                    <span>{isHovered ? node.name : node.name.split('&')[0].trim()}</span>
                    <span className="text-stone-500 font-normal">({node.year})</span>
                  </div>
                  {isHovered && (
                    <div className="text-[9px] font-mono text-stone-300 tracking-wide mt-0.5">
                      Clique para Ficha Confidencial
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Painel Tático no Canto Inferior Direito (Desktop) */}
      <div className="fixed bottom-6 right-6 z-30 pointer-events-auto bg-[#0d0f14]/90 backdrop-blur-md border border-stone-800/90 rounded-xl p-3 shadow-2xl max-w-xs animate-fadeIn hidden lg:block">
        <div className="flex items-center justify-between gap-2 border-b border-stone-800 pb-2 mb-2">
          <span className="text-[10px] font-mono text-amber-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            Nós de Fricção Vivos
          </span>
          <button
            onClick={handleToggleMarkers}
            className="text-[9px] font-mono px-2 py-0.5 rounded border border-stone-800 bg-stone-900/80 text-stone-400 hover:text-amber-300 hover:border-stone-700 transition-colors cursor-pointer"
            title="Exibir ou ocultar marcadores na cartografia"
          >
            {showMapMarkers ? '👁️ Marcadores' : '✕ Marcadores'}
          </button>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {FRICTION_NODES.map((node) => (
            <button
              key={node.id}
              onClick={() => handleNodeClick(node)}
              onMouseEnter={() => setHoveredNodeId(node.id)}
              onMouseLeave={() => setHoveredNodeId(null)}
              className={`px-2 py-1.5 rounded text-left border transition-all text-[10px] font-mono truncate cursor-pointer ${
                hoveredNodeId === node.id
                  ? 'border-amber-600 bg-stone-800/90 text-amber-200'
                  : 'border-stone-800 hover:border-amber-600/70 bg-stone-900/60 hover:bg-stone-800/80 text-stone-300'
              }`}
              title={`Inspecionar ${node.name}`}
            >
              • {node.name.split('&')[0].trim()}
            </button>
          ))}
        </div>
      </div>

      {/* Botão Flutuante Tátil para Dispositivos Menores / Mobile */}
      <div className="fixed bottom-5 right-5 z-30 lg:hidden pointer-events-auto">
        <button
          onClick={() => setIsMobileSheetOpen(true)}
          className="px-3.5 py-2 rounded-full bg-[#0d0f14]/95 border border-amber-600/70 shadow-2xl backdrop-blur-md text-amber-300 font-mono text-xs flex items-center gap-2 cursor-pointer active:scale-95 transition-transform"
        >
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
          <span>Focos de Fricção (4)</span>
        </button>
      </div>

      {/* Gaveta Inferior Deslizante em Telas Mobile / Tablet */}
      {isMobileSheetOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="absolute inset-0" onClick={() => setIsMobileSheetOpen(false)} />
          <div className="relative z-10 bg-[#12141a] border-t border-stone-800 rounded-t-2xl p-5 shadow-2xl space-y-3">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-wider text-amber-400 font-bold">
                  Dossiês de Fricção Geopolítica
                </span>
              </div>
              <button
                onClick={() => setIsMobileSheetOpen(false)}
                className="w-6 h-6 rounded-full bg-stone-800 text-stone-400 hover:text-white flex items-center justify-center text-xs font-mono"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-stone-400 font-sans">
              Selecione um ponto de tensão colonial para inspecionar fontes primárias e o impacto nas bancas de vestibular.
            </p>
            <div className="space-y-2 pt-1 max-h-[50vh] overflow-y-auto">
              {FRICTION_NODES.map((node) => (
                <div
                  key={node.id}
                  onClick={() => handleNodeClick(node)}
                  className="p-3 rounded-lg border border-stone-800 bg-stone-900/60 hover:border-amber-600 active:bg-stone-800 flex items-center justify-between cursor-pointer"
                >
                  <div>
                    <div className="text-xs font-mono text-amber-400 font-semibold">{node.name}</div>
                    <div className="text-[10px] font-mono text-stone-400 mt-0.5">{node.region}</div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-1 rounded bg-stone-800 text-stone-300">
                    {node.year}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
