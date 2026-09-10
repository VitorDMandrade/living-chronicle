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

  // Transição contínua e suave de opacidade (evita aparecimento/desaparecimento abrupto)
  let overlayOpacity = 0;
  if (scrollProgress >= 0.22 && scrollProgress <= 0.88) {
    if (scrollProgress < 0.32) {
      // Fade-in progressivo de 0 a 1 entre 22% e 32% do scroll
      overlayOpacity = (scrollProgress - 0.22) / 0.10;
    } else if (scrollProgress > 0.82) {
      // Fade-out progressivo de 1 a 0 entre 82% e 88% do scroll
      overlayOpacity = 1 - (scrollProgress - 0.82) / 0.06;
    } else {
      overlayOpacity = 1;
    }
  }
  overlayOpacity = Math.max(0, Math.min(1, overlayOpacity));

  const isVisible = overlayOpacity > 0.01;

  const isDesktop = dimensions.width >= 1024;
  const mapScale = Math.min(dimensions.width, dimensions.height) * (isDesktop ? 0.0019 : 0.0015);
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
      {/* Marcadores Vetoriais Táteis Ancorados na Cartografia (Desktop com fade e escala contínuos) */}
      <div
        style={{
          opacity: showMapMarkers ? overlayOpacity : 0,
          pointerEvents: isVisible && showMapMarkers ? 'auto' : 'none',
        }}
        className="fixed inset-0 z-20 overflow-hidden hidden lg:block transition-opacity duration-700 ease-editorial"
      >
        {FRICTION_NODES.map((node) => {
          // Transição suave para o Transvaal conforme a evolução temporal da narrativa
          let nodeAlpha = 1;
          if (node.id === 'transvaal') {
            if (scrollProgress < 0.52) nodeAlpha = 0;
            else if (scrollProgress < 0.62) nodeAlpha = (scrollProgress - 0.52) / 0.10;
            else nodeAlpha = 1;
          }

          const screenX = centerX + node.coords.x * mapScale;
          const screenY = centerY + node.coords.y * mapScale;
          const isHovered = hoveredNodeId === node.id;
          const currentScale = isHovered ? 1.4 : 0.8 + 0.2 * nodeAlpha;

          return (
            <div
              key={node.id}
              style={{
                left: `${screenX}px`,
                top: `${screenY}px`,
                transform: `translate(-50%, -50%) scale(${currentScale})`,
                opacity: nodeAlpha,
                pointerEvents: nodeAlpha > 0.1 ? 'auto' : 'none',
              }}
              className="absolute cursor-pointer group transition-all duration-500 ease-editorial"
              onClick={() => handleNodeClick(node)}
              onMouseEnter={() => handleNodeHover(node)}
              onMouseLeave={() => setHoveredNodeId(null)}
            >
              {/* Anel de Radar Pulsante */}
              <span
                className={`absolute -inset-2.5 rounded-full border border-red-500/40 transition-all duration-500 ${
                  isHovered ? 'scale-125 border-amber-400/80' : 'animate-ping'
                }`}
              />
              <span className="absolute -inset-1 rounded-full border border-amber-500/60" />

              {/* Núcleo do Vetor Tátil */}
              <div
                className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ease-editorial flex items-center justify-center ${
                  isHovered
                    ? 'bg-amber-400 shadow-[0_0_16px_#d4af37]'
                    : 'bg-red-700 shadow-[0_0_8px_#b91c1c]'
                }`}
              >
                <span className="w-1 h-1 rounded-full bg-white" />
              </div>

              {/* Rótulo Flutuante Telegráfico com expansão suave */}
              <div
                className={`absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap px-2.5 py-1 rounded bg-[#0b0d12]/95 border shadow-2xl transition-all duration-300 ease-editorial pointer-events-none ${
                  isHovered
                    ? 'opacity-100 translate-x-0 scale-100 border-amber-600/90 shadow-[0_0_18px_rgba(212,175,55,0.3)]'
                    : 'opacity-70 -translate-x-1 scale-95 border-stone-800'
                }`}
              >
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                  <span>[•]</span>
                  <span>{isHovered ? node.name : node.name.split('&')[0].trim()}</span>
                  <span className="text-stone-500 font-normal">({node.year})</span>
                </div>
                {isHovered && (
                  <div className="text-[9px] font-mono text-stone-300 tracking-wide mt-0.5 animate-fadeIn">
                    Clique para Ficha Confidencial
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Painel Tático no Canto Inferior Direito (Desktop) com transição fluida de entrada e saída */}
      <div
        style={{
          opacity: overlayOpacity,
          transform: `translateY(${(1 - overlayOpacity) * 24}px)`,
          pointerEvents: isVisible ? 'auto' : 'none',
        }}
        className="fixed bottom-6 right-6 z-30 bg-[#0d0f14]/90 backdrop-blur-md border border-stone-800/90 rounded-xl p-3 shadow-2xl max-w-xs hidden lg:block transition-all duration-700 ease-editorial"
      >
        <div className="flex items-center justify-between gap-2 border-b border-stone-800 pb-2 mb-2">
          <span className="text-[10px] font-mono text-amber-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            Nós de Fricção Vivos
          </span>
          <button
            onClick={handleToggleMarkers}
            className="text-[9px] font-mono px-2 py-0.5 rounded border border-stone-800 bg-stone-900/80 text-stone-400 hover:text-amber-300 hover:border-stone-700 transition-colors duration-200 cursor-pointer"
            title="Exibir ou ocultar marcadores na cartografia"
          >
            {showMapMarkers ? '👁️ Marcadores' : '✕ Marcadores'}
          </button>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {FRICTION_NODES.map((node) => {
            const isTransvaalEarly = node.id === 'transvaal' && scrollProgress < 0.55;
            return (
              <button
                key={node.id}
                onClick={() => handleNodeClick(node)}
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
                className={`px-2 py-1.5 rounded text-left border transition-all duration-300 ease-editorial text-[10px] font-mono truncate cursor-pointer ${
                  hoveredNodeId === node.id
                    ? 'border-amber-600 bg-stone-800/90 text-amber-200 scale-102 shadow-sm'
                    : isTransvaalEarly
                    ? 'border-stone-900 bg-stone-950/40 text-stone-500 hover:text-stone-300'
                    : 'border-stone-800 hover:border-amber-600/70 bg-stone-900/60 hover:bg-stone-800/80 text-stone-300'
                }`}
                title={`Inspecionar ${node.name}`}
              >
                • {node.name.split('&')[0].trim()}
              </button>
            );
          })}
        </div>
      </div>

      {/* Botão Flutuante Tátil para Dispositivos Menores / Mobile com deslizamento suave */}
      <div
        style={{
          opacity: overlayOpacity,
          transform: `translateY(${(1 - overlayOpacity) * 20}px)`,
          pointerEvents: isVisible ? 'auto' : 'none',
        }}
        className="fixed bottom-5 right-5 z-30 lg:hidden transition-all duration-700 ease-editorial"
      >
        <button
          onClick={() => setIsMobileSheetOpen(true)}
          className="px-3.5 py-2 rounded-full bg-[#0d0f14]/95 border border-amber-600/70 shadow-2xl backdrop-blur-md text-amber-300 font-mono text-xs flex items-center gap-2 cursor-pointer active:scale-95 transition-transform duration-200"
        >
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
          <span>Focos de Fricção (4)</span>
        </button>
      </div>

      {/* Gaveta Inferior Deslizante em Telas Mobile / Tablet com Backdrop Animado */}
      <div
        className={`fixed inset-0 z-50 lg:hidden flex flex-col justify-end transition-all duration-500 ease-editorial ${
          isMobileSheetOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ease-editorial"
          onClick={() => setIsMobileSheetOpen(false)}
        />
        <div
          className={`relative z-10 bg-[#12141a] border-t border-stone-800 rounded-t-2xl p-5 shadow-2xl space-y-3 transform transition-transform duration-500 ease-editorial ${
            isMobileSheetOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-wider text-amber-400 font-bold">
                Dossiês de Fricção Geopolítica
              </span>
            </div>
            <button
              onClick={() => setIsMobileSheetOpen(false)}
              className="w-6 h-6 rounded-full bg-stone-800 text-stone-400 hover:text-white flex items-center justify-center text-xs font-mono transition-colors"
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
                className="p-3 rounded-lg border border-stone-800 bg-stone-900/60 hover:border-amber-600 active:bg-stone-800 flex items-center justify-between cursor-pointer transition-colors duration-200"
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
    </>
  );
};
