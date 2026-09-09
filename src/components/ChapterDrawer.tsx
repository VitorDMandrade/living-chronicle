import React, { useEffect } from 'react';
import { sound } from '../lib/audio';

export interface ChapterMeta {
  id: string;
  epoch: string;
  title: string;
  period: string;
  themeColor: string;
  status: 'active' | 'archived';
}

export const AVAILABLE_CHAPTERS: ChapterMeta[] = [
  {
    id: 'imperialism-xix',
    epoch: 'Época I',
    title: 'Imperialismo e a Partilha da África',
    period: '1870 — 1914',
    themeColor: '#9e2a2b',
    status: 'active',
  },
  {
    id: 'thermodynamics-entropy',
    epoch: 'Época II',
    title: 'A Máquina Térmica e a Flecha do Tempo',
    period: '1824 — 1900',
    themeColor: '#c69b3f',
    status: 'archived',
  },
  {
    id: 'feudal-crisis',
    epoch: 'Época III',
    title: 'A Peste, a Fome e a Ruptura Servil',
    period: '1347 — 1453',
    themeColor: '#4d6a79',
    status: 'archived',
  },
];

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
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        sound.playTelegraphClick();
        onToggle();
      } else if (e.key === 'Escape' && isOpen) {
        sound.playTelegraphClick();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onToggle]);

  return (
    <>
      {/* Backdrop com Blur Suave */}
      {isOpen && (
        <div
          onClick={() => {
            sound.playTelegraphClick();
            onClose();
          }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        />
      )}

      {/* Painel do Códice */}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-md z-50 bg-[#0c0d10] border-l border-stone-800/80 p-8 flex flex-col justify-between transform transition-transform duration-500 ease-out shadow-2xl ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-stone-900">
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase font-mono text-stone-500">
                Arquivo Histórico & Epistêmico
              </p>
              <h2 className="text-xl font-serif text-stone-200 mt-1">Códice de Lições</h2>
            </div>
            <button
              onClick={() => {
                sound.playTelegraphClick();
                onClose();
              }}
              className="text-stone-500 hover:text-stone-200 text-sm font-mono p-2 transition-colors"
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
                    onClose();
                  }}
                  className={`relative p-5 rounded-lg border transition-all duration-300 ${
                    isSelected
                      ? 'border-amber-700/60 bg-stone-900/60'
                      : isAvailable
                      ? 'border-stone-800/60 bg-stone-950/40 hover:border-stone-700 hover:bg-stone-900/40 cursor-pointer'
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
      </aside>
    </>
  );
};
