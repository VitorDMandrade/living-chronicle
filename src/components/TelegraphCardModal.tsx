import React, { useState, useEffect, useRef } from 'react';
import { FrictionNode } from '../data/friction-nodes';
import { sound } from '../lib/audio';

interface TelegraphCardModalProps {
  node: FrictionNode | null;
  onClose: () => void;
}

export const TelegraphCardModal: React.FC<TelegraphCardModalProps> = ({ node, onClose }) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [cachedNode, setCachedNode] = useState<FrictionNode | null>(node);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (node) {
      setCachedNode(node);
      if (!dialog.open) {
        dialog.showModal();
        sound.playMorseBurst();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [node]);

  const handleClose = () => {
    sound.playTelegraphClick();
    dialogRef.current?.close();
  };

  const handleNativeClose = () => {
    onClose();
  };

  // Fallback de "Light Dismiss" para fechar ao clicar no backdrop (fora da área de conteúdo)
  const handleDialogClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (!dialog || event.target !== dialog) return;

    const rect = dialog.getBoundingClientRect();
    const isInside =
      rect.top <= event.clientY &&
      event.clientY <= rect.bottom &&
      rect.left <= event.clientX &&
      event.clientX <= rect.right;

    if (!isInside) {
      handleClose();
    }
  };

  if (!cachedNode) return null;

  return (
    <dialog
      ref={dialogRef}
      onClose={handleNativeClose}
      onCancel={(e) => {
        // Assegura disparo de som e fechamento fluido ao pressionar Esc
        e.preventDefault();
        handleClose();
      }}
      onClick={handleDialogClick}
      aria-labelledby="telegraph-dialog-title"
      aria-modal="true"
      closedby="any"
      className="modern-dialog"
    >
      {/* Ficha Telegráfica Confidencial */}
      <div className="w-full max-w-xl rounded-xl border border-stone-700/80 bg-[#15161a] text-stone-200 shadow-2xl overflow-hidden font-serif">
        {/* Cabeçalho de Fita Telegráfica Vitoriana */}
        <div className="bg-[#1f2127] border-b border-stone-700/60 p-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            <span
              id="telegraph-dialog-title"
              className="font-mono text-[11px] tracking-[0.25em] text-amber-500 uppercase font-bold"
            >
              DESPACHO TELEGRÁFICO CONFIDENCIAL // {cachedNode.year}
            </span>
          </div>
          <button
            onClick={handleClose}
            className="w-7 h-7 rounded-full bg-stone-800 text-stone-400 hover:text-white hover:bg-stone-700 flex items-center justify-center text-sm font-mono transition-colors cursor-pointer"
            title="Fechar despacho (Esc)"
          >
            ✕
          </button>
        </div>

        {/* Corpo do Telegrama */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Identificação de Posição e Forças */}
          <div>
            <div className="flex items-center justify-between text-xs text-stone-400 font-mono mb-1">
              <span>REGIÃO: {cachedNode.region}</span>
              <span className="text-amber-400/90 font-bold">{cachedNode.year}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif text-stone-100 tracking-wide">
              {cachedNode.name}
            </h3>
            <p className="text-xs font-mono text-stone-400 mt-1">
              Potências em Choque: <span className="text-stone-300">{cachedNode.powers}</span>
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
              {cachedNode.primarySource.quote}
            </blockquote>
            <div className="text-right text-[10px] text-stone-600 font-bold">
              — {cachedNode.primarySource.author}, {cachedNode.primarySource.date}
            </div>
          </div>

          {/* Choque Imperialista Real */}
          <div className="space-y-2">
            <h4 className="font-mono text-[11px] uppercase tracking-wider text-amber-500 font-bold flex items-center gap-2">
              <span>⚔</span> Choque Geopolítico e Causalidade
            </h4>
            <p className="text-xs sm:text-sm font-sans text-stone-300 leading-relaxed">
              {cachedNode.geopoliticalClash}
            </p>
          </div>

          {/* Raio-X da Banca */}
          <div className="p-4 rounded-lg border border-amber-800/40 bg-stone-950/60 font-mono text-[11px] leading-relaxed text-amber-300/90">
            <div className="text-amber-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-2">
              <span>🏛</span> Raio-X das Bancas de Elite
            </div>
            <p className="font-sans text-xs text-stone-300">{cachedNode.bancaInsight}</p>
          </div>
        </div>

        {/* Rodapé de Ação */}
        <div className="bg-[#121316] border-t border-stone-800 p-4 px-6 flex items-center justify-between">
          <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest">
            Arquivo Desclassificado // Ministério das Relações Exteriores
          </span>
          <button
            onClick={handleClose}
            className="px-4 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-mono transition-colors cursor-pointer"
          >
            Fechar Ficha
          </button>
        </div>
      </div>
    </dialog>
  );
};
