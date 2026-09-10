import React, { useEffect, useRef } from 'react';
import { sound } from '../lib/audio';
import { AVAILABLE_CHAPTERS } from '../data/chapters';

interface ChapterDrawerProps {
  currentChapterId: string;
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
  onSelectChapter: (id: string) => void;
}

export const ChapterDrawer: React.FC<ChapterDrawerProps> = ({
  currentChapterId,
  isOpen,
  onClose,
  onToggle,
  onSelectChapter,
}) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        sound.playTelegraphClick();
        onToggle();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onToggle]);

  const handleClose = () => {
    sound.playTelegraphClick();
    dialogRef.current?.close();
  };

  const handleNativeClose = () => {
    onClose();
  };

  // Fallback de "Light Dismiss" para fechar ao clicar fora do conteúdo (no backdrop)
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

  return (
    <dialog
      ref={dialogRef}
      onClose={handleNativeClose}
      onCancel={(e) => {
        e.preventDefault();
        handleClose();
      }}
      onClick={handleDialogClick}
      aria-labelledby="codex-drawer-title"
      aria-modal="true"
      closedby="any"
      className="modern-drawer"
    >
      <div className="h-full w-full max-w-md bg-[#0c0d10] border-l border-stone-800/80 p-8 flex flex-col justify-between shadow-2xl">
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-stone-900">
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase font-mono text-stone-500">
                Arquivo Histórico & Epistêmico
              </p>
              <h2 id="codex-drawer-title" className="text-xl font-serif text-stone-200 mt-1">
                Códice de Lições
              </h2>
            </div>
            <button
              onClick={handleClose}
              className="text-stone-500 hover:text-stone-200 text-sm font-mono p-2 transition-colors cursor-pointer"
              title="Fechar Códice (Esc)"
            >
              ✕
            </button>
          </div>

          <div className="mt-8 space-y-4">
            {AVAILABLE_CHAPTERS.map((chapter) => {
              const isSelected = chapter.id === currentChapterId;
              const isAvailable = chapter.status === 'active';

              return (
                <div
                  key={chapter.id}
                  onClick={() => {
                    if (!isAvailable) return;
                    sound.playWaxSealImpact();
                    onSelectChapter(chapter.id);
                    handleClose();
                  }}
                  className={`relative p-5 rounded-lg border transition-all duration-300 ease-editorial ${
                    isSelected
                      ? 'border-amber-700/60 bg-stone-900/60 scale-[1.02] shadow-lg'
                      : isAvailable
                      ? 'border-stone-800/60 bg-stone-950/40 hover:border-stone-700 hover:bg-stone-900/40 cursor-pointer hover:scale-[1.01]'
                      : 'border-stone-900/40 bg-stone-950/20 opacity-40 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono tracking-wider mb-2">
                    <span className="text-stone-500">{chapter.epoch}</span>
                    <span className="text-stone-400">{chapter.period}</span>
                  </div>
                  <h3 className="text-base font-serif text-stone-200 tracking-wide">
                    {chapter.title}
                  </h3>
                  <div className="mt-3 flex items-center justify-between">
                    <span
                      className="text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded border"
                      style={{
                        borderColor: isSelected ? chapter.themeColor : '#2b2d31',
                        color: isSelected ? '#f5f5f4' : '#78716c',
                      }}
                    >
                      {isSelected ? 'Em Execução' : isAvailable ? 'Disponível' : 'Lacrado'}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full animate-ping bg-amber-500" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pt-6 border-t border-stone-900 text-center">
          <p className="text-[11px] font-mono text-stone-600">
            Rolagem contínua sem recarga • Renderização 60 FPS
          </p>
        </div>
      </div>
    </dialog>
  );
};
