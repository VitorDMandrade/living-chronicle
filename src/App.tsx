import { useEffect, useState } from 'react';
import { StageCanvas } from './components/StageCanvas';
import { ActCard } from './components/ActCard';
import { ChronicleHeader } from './components/ChronicleHeader';
import { IMPERIALISM_CHAPTER } from './data/imperialism-chapter';
import { useActiveIndex } from './hooks/useScrollProgress';
import { startSteamAmbience, playTelegraphBeep, playImperialGavel } from './lib/audio';

export function App() {
  const chapter = IMPERIALISM_CHAPTER;
  const activeActIndex = useActiveIndex(chapter.acts.length);
  const [audioStarted, setAudioStarted] = useState(false);

  const handleFirstInteraction = () => {
    if (!audioStarted) {
      startSteamAmbience(true);
      playTelegraphBeep(true);
      setAudioStarted(true);
    }
  };

  useEffect(() => {
    if (!audioStarted) return;
    playTelegraphBeep(true);
    if (activeActIndex === 1) {
      // Impacto solene de carimbo na Conferência de Berlim
      playImperialGavel(true);
    }
  }, [activeActIndex, audioStarted]);

  return (
    <div
      onClick={handleFirstInteraction}
      className="min-h-screen bg-[#06080b] text-[#ede8dc] relative selection:bg-amber-950 selection:text-amber-200 cursor-default"
    >
      <StageCanvas sceneParams={chapter.acts[activeActIndex].sceneParams} />

      <ChronicleHeader
        currentAct={activeActIndex}
        discipline={chapter.discipline}
        epoch={chapter.epoch}
        title={chapter.title}
        totalActs={chapter.acts.length}
      />

      <main className="relative z-10 max-w-xl mx-auto px-6 pt-36 pb-64 space-y-[70vh]">
        {chapter.acts.map((act, idx) => (
          <ActCard key={act.id} act={act} isActive={activeActIndex === idx} />
        ))}
      </main>

      <footer className="fixed bottom-4 left-0 right-0 text-center pointer-events-none z-30">
        <span className="text-[10px] font-mono text-[#78716c] uppercase tracking-widest">
          Role para desdobrar a partilha colonial e as tensões geopolíticas
        </span>
      </footer>
    </div>
  );
}

export default App;
