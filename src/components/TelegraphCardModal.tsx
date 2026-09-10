import React, { useState, useEffect } from 'react';
import { FrictionNode } from '../data/friction-nodes';
import { sound } from '../lib/audio';

interface TelegraphCardModalProps {
  node: FrictionNode | null;
  onClose: () => void;
}

export const TelegraphCardModal: React.FC<TelegraphCardModalProps> = ({ node, onClose }) => {
  const [activeNode, setActiveNode] = useState<FrictionNode | null>(null);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  useEffect(() => {
    if (node) {
      setActiveNode(node);
      setIsClosing(false);
      sound.playMorseBurst();
    } else if (activeNode && !isClosing) {
      // Inicia saída fluida se o prop node virar null externamente
      handleDismiss();
    }
  }, [node]);

  const handleDismiss = () => {
    if (isClosing) return;
    setIsClosing(true);
    sound.playTelegraphClick();
    setTimeout(() => {
      setActiveNode(null);
      setIsClosing(false);
      onClose();
    }, 280);
  };

  useEffect(() => {
    if (activeNode) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') handleDismiss();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [activeNode, isClosing]);

  if (!activeNode) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-all duration-300 ease-editorial ${
        isClosing ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Backdrop com desfoque e fade-in/fade-out cinematográfico */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-md transition-opacity duration-300 ease-editorial"
        onClick={handleDismiss}
      />

      {/* Ficha Telegráfica Confidencial com transição fluida de escala e translação */}
      <div
        className={`relative z-10 w-full max-w-xl rounded-xl border border-stone-700/80 bg-[#15161a] text-stone-200 shadow-2xl overflow-hidden font-serif transform transition-all duration-300 ease-editorial ${
          isClosing
            ? 'scale-95 opacity-0 translate-y-4'
            : 'scale-100 opacity-100 translate-y-0'
        }`}
      >
        {/* Cabeçalho de Fita Telegráfica Vitoriana */}
        <div className="bg-[#1f2127] border-b border-stone-700/60 p-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            <span className="font-mono text-[11px] tracking-[0.25em] text-amber-500 uppercase font-bold">
              DESPACHO TELEGRÁFICO CONFIDENCIAL // {activeNode.year}
            </span>
          </div>
          <button
            onClick={handleDismiss}
            className="w-7 h-7 rounded-full bg-stone-800 text-stone-400 hover:text-white hover:bg-stone-700 flex items-center justify-center text-sm font-mono transition-colors cursor-pointer"
            title="Fechar despacho (Esc)"
          >
            ✕
          </button>
        </div>

        {/* Corpo do Telegrama */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Identificação de Posição e Forças */}
          <div>
            <div className="flex items-center justify-between text-xs text-stone-400 font-mono mb-1">
              <span>REGIÃO: {activeNode.region}</span>
              <span className="text-amber-400/90 font-bold">{activeNode.year}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif text-stone-100 tracking-wide">
              {activeNode.name}
            </h3>
            <p className="text-xs font-mono text-stone-400 mt-1">
              Potências em Choque: <span className="text-stone-300">{activeNode.powers}</span>
            </p>
          </div>

          {/* Fita Telegráfica com Fonte Primária */}
          <div className="relative p-5 rounded-lg border border-amber-900/30 bg-[#f4ede2] text-[#1f2937] shadow-inner font-mono text-xs leading-relaxed">
            <div className="flex items-center justify-between mb-3 text-[10px] tracking-widest uppercase border-b border-stone-300 pb-2 text-stone-600 font-bold">
              <span>FONTE PRIMÁRIA // TRANSMISSÃO TELEGRÁFICA</span>
              <button
                onClick={() => sound.playMorseBurst()}
                className="hover:text-black flex items-center gap-1.5 text-amber-900 underline font-mono cursor-pointer"
                title="Reproduzir cadência Morse"
              >
                <span>[••• — — •••]</span>
                <span>Ouvir Morse</span>
              </button>
            </div>
            <blockquote className="italic font-serif text-sm text-stone-900 leading-relaxed mb-3">
              {activeNode.primarySource.quote}
            </blockquote>
            <div className="text-right text-[10px] text-stone-600 font-bold">
              — {activeNode.primarySource.author}, {activeNode.primarySource.date}
            </div>
          </div>

          {/* Choque Imperialista Real */}
          <div className="space-y-2">
            <h4 className="font-mono text-[11px] uppercase tracking-wider text-amber-500 font-bold flex items-center gap-2">
              <span>⚔</span> Choque Geopolítico e Causalidade
            </h4>
            <p className="text-xs sm:text-sm font-sans text-stone-300 leading-relaxed">
              {activeNode.geopoliticalClash}
            </p>
          </div>

          {/* Raio-X da Banca */}
          <div className="p-4 rounded-lg border border-amber-800/40 bg-stone-950/60 font-mono text-[11px] leading-relaxed text-amber-300/90">
            <div className="text-amber-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-2">
              <span>🏛</span> Raio-X das Bancas de Elite
            </div>
            <p className="font-sans text-xs text-stone-300">{activeNode.bancaInsight}</p>
          </div>
        </div>

        {/* Rodapé de Ação */}
        <div className="bg-[#121316] border-t border-stone-800 p-4 px-6 flex items-center justify-between">
          <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest">
            Arquivo Desclassificado // Ministério das Relações Exteriores
          </span>
          <button
            onClick={handleDismiss}
            className="px-4 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-mono transition-colors cursor-pointer"
          >
            Fechar Ficha
          </button>
        </div>
      </div>
    </div>
  );
};
