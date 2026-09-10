import React, { useState, useEffect } from 'react';
import { sound } from '../lib/audio';

interface ChronicleHeaderProps {
  currentActTitle: string;
  actRoman: string;
  scrollPercent: number;
  onOpenCodex: () => void;
  onOpenQuiz?: () => void;
}

export const ChronicleHeader: React.FC<ChronicleHeaderProps> = ({
  currentActTitle,
  actRoman,
  scrollPercent,
  onOpenCodex,
  onOpenQuiz,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    // Registra listener no primeiro gesto do usuário para desbloqueio resiliente de áudio
    const handleFirstUserGesture = () => {
      sound.startSteamDrone();
      sound.mountBGM();
      window.removeEventListener('pointerdown', handleFirstUserGesture);
      window.removeEventListener('keydown', handleFirstUserGesture);
    };

    window.addEventListener('pointerdown', handleFirstUserGesture, { once: true });
    window.addEventListener('keydown', handleFirstUserGesture, { once: true });
  }, []);

  const handleToggleSound = () => {
    sound.playTelegraphClick();
    const active = sound.toggleBGM();
    setIsPlayingAudio(active);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-16 px-6 md:px-10 flex items-center justify-between pointer-events-none backdrop-blur-[2px] bg-gradient-to-b from-[#090a0c]/85 to-transparent border-b border-stone-800/30">
      {/* Breadcrumb Histórico com transição fluida */}
      <div className="pointer-events-auto flex items-center gap-3">
        <span
          key={actRoman}
          className="font-mono text-[10px] tracking-[0.25em] text-amber-600/90 uppercase font-semibold animate-fadeIn"
        >
          {actRoman}
        </span>
        <span className="w-1 h-1 rounded-full bg-stone-700" />
        <span
          key={currentActTitle}
          className="font-serif text-xs md:text-sm text-stone-300 tracking-wide animate-fadeIn"
        >
          {currentActTitle}
        </span>
      </div>

      {/* Controles Táteis do Usuário */}
      <div className="pointer-events-auto flex items-center gap-4">
        {/* Barra de Progresso Fina de Pergaminho */}
        <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-stone-500">
          <span className="w-7 text-right">{Math.round(scrollPercent)}%</span>
          <div className="w-20 h-[2px] bg-stone-900 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-700/80 transition-all duration-300 ease-out"
              style={{ width: `${scrollPercent}%` }}
            />
          </div>
        </div>

        {/* Indicador de Som / Gramofone */}
        <button
          onClick={handleToggleSound}
          title={isPlayingAudio ? 'Silenciar Trilha Sonora' : 'Ativar Trilha Sonora de Chancelaria'}
          className={`px-3 py-1 rounded-full border transition-all duration-300 flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest ${
            isPlayingAudio
              ? 'border-amber-700/70 bg-amber-950/30 text-amber-300 shadow-[0_0_12px_rgba(198,155,63,0.2)]'
              : 'border-stone-800/80 bg-stone-950/60 text-stone-500 hover:border-stone-700 hover:text-stone-300'
          }`}
        >
          <span className="flex items-end gap-[2px] h-3">
            <span
              className={`w-[2px] bg-current rounded-full transition-all ${
                isPlayingAudio ? 'animate-[pulse_0.8s_ease-in-out_infinite] h-3' : 'h-1'
              }`}
            />
            <span
              className={`w-[2px] bg-current rounded-full transition-all ${
                isPlayingAudio ? 'animate-[pulse_1.1s_ease-in-out_infinite] h-2' : 'h-1.5'
              }`}
            />
            <span
              className={`w-[2px] bg-current rounded-full transition-all ${
                isPlayingAudio ? 'animate-[pulse_0.6s_ease-in-out_infinite] h-2.5' : 'h-1'
              }`}
            />
          </span>
          <span className="hidden sm:inline">{isPlayingAudio ? 'Sinfonia Ativa' : 'Trilha Oculta'}</span>
        </button>

        {/* Botão Direto para o Simulado de Vestibular */}
        {onOpenQuiz && (
          <button
            onClick={() => {
              sound.playTelegraphClick();
              onOpenQuiz();
            }}
            title="Abrir Simulado com Questões Oficiais do ENEM, FUVEST, UNICAMP e UNESP"
            className="group flex items-center gap-2 px-3 py-1 rounded-full border border-amber-600/70 bg-amber-950/40 text-amber-300 hover:bg-amber-900/60 hover:border-amber-400 transition-all duration-200 cursor-pointer shadow-[0_0_12px_rgba(217,119,6,0.2)]"
          >
            <span className="text-xs">🎯</span>
            <span className="font-mono text-[10px] tracking-widest uppercase font-bold">Simulado</span>
            <span className="hidden lg:inline text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-200 font-mono">
              ENEM/FUVEST
            </span>
          </button>
        )}

        {/* Seletor Códice */}
        <button
          onClick={onOpenCodex}
          className="group flex items-center gap-2 px-3 py-1 rounded-full border border-stone-800/80 bg-stone-950/70 text-stone-400 hover:text-stone-100 hover:border-stone-600 transition-all duration-200"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-600 group-hover:scale-125 transition-transform" />
          <span className="font-mono text-[10px] tracking-widest uppercase">Códice</span>
          <kbd className="hidden sm:inline-block text-[9px] px-1 rounded bg-stone-900 text-stone-500 border border-stone-800 font-mono">
            ⌘K
          </kbd>
        </button>
      </div>
    </header>
  );
};
