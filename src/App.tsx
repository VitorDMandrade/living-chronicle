import { useEffect, useState } from 'react';
import { StageCanvas } from './components/StageCanvas';
import { ActCard } from './components/ActCard';
import { ChronicleHeader } from './components/ChronicleHeader';
import { DiplomaticDispatch } from './components/DiplomaticDispatch';
import { ChapterDrawer } from './components/ChapterDrawer';
import { FrictionNodesOverlay } from './components/FrictionNodesOverlay';
import { TelegraphCardModal } from './components/TelegraphCardModal';
import { FRICTION_NODES, FrictionNode } from './data/friction-nodes';
import { IMPERIALISM_CHAPTER } from './data/imperialism-chapter';
import { useScrollProgress } from './hooks/useScrollProgress';
import { sound } from './lib/audio';

export function App() {
  const [currentChapterId, setCurrentChapterId] = useState('imperialism-xix');
  const [isCodexOpen, setIsCodexOpen] = useState(false);
  const [selectedFrictionNode, setSelectedFrictionNode] = useState<FrictionNode | null>(null);
  const chapter = IMPERIALISM_CHAPTER;
  const scrollProgress = useScrollProgress();
  const activeActIndex = Math.min(
    chapter.acts.length - 1,
    Math.floor(scrollProgress * chapter.acts.length)
  );
  const [audioStarted, setAudioStarted] = useState(false);

  const romanNumerals = ['ATO I', 'ATO II', 'ATO III'];

  const handleFirstInteraction = () => {
    if (!audioStarted) {
      sound.startSteamDrone();
      sound.mountBGM(`${import.meta.env.BASE_URL}assets/audio/imperialism_theme.mp3`);
      sound.playTelegraphClick();
      setAudioStarted(true);
    }
  };

  useEffect(() => {
    if (!audioStarted) return;
    sound.playTelegraphClick();
    if (activeActIndex === 1) {
      sound.playWaxSealImpact();
    }
  }, [activeActIndex, audioStarted]);

  // Filtra nós relevantes para cada Ato didático
  const getActNodes = (actIndex: number): FrictionNode[] => {
    if (actIndex === 1) {
      return FRICTION_NODES.filter((n) => ['suez', 'congo', 'fachoda'].includes(n.id));
    }
    if (actIndex === 2) {
      return FRICTION_NODES.filter((n) => ['congo', 'transvaal'].includes(n.id));
    }
    return [];
  };

  return (
    <div
      onClick={handleFirstInteraction}
      className="min-h-screen bg-[#090a0c] text-[#ede5d8] relative selection:bg-amber-950 selection:text-amber-200 cursor-default overflow-x-hidden"
    >
      {/* Palco Gráfico Unificado (Living Canvas Vídeo + Partilha de Berlim 2D no lado direito em Desktop) */}
      <StageCanvas
        scrollProgress={scrollProgress}
        videoSrc={`${import.meta.env.BASE_URL}assets/video/imperialism_bg.mp4`}
      />

      {/* Vetores Cartográficos Táteis (Nós de Fricção no Ato II e Ato III) */}
      <FrictionNodesOverlay
        scrollProgress={scrollProgress}
        onSelectNode={(node) => setSelectedFrictionNode(node)}
      />

      {/* Ficha Telegráfica Confidencial Flutuante */}
      <TelegraphCardModal
        node={selectedFrictionNode}
        onClose={() => setSelectedFrictionNode(null)}
      />

      {/* Topbar com Breadcrumb, Indicador Acústico e Códice */}
      <ChronicleHeader
        currentActTitle={chapter.acts[activeActIndex].title}
        actRoman={romanNumerals[activeActIndex] || 'ATO I'}
        scrollPercent={scrollProgress * 100}
        onOpenCodex={() => {
          sound.playTelegraphClick();
          setIsCodexOpen(true);
        }}
      />

      {/* Códice Seletor Oculto (Cmd+K / Gaveteiro Flutuante) */}
      <ChapterDrawer
        currentChapterId={currentChapterId}
        isOpen={isCodexOpen}
        onClose={() => setIsCodexOpen(false)}
        onToggle={() => setIsCodexOpen((prev) => !prev)}
        onSelectChapter={(id) => setCurrentChapterId(id)}
      />

      {/* Coluna Narrativa: Deslocada para a esquerda em desktop para nunca sobrepor o mapa tátil */}
      <main className="relative z-10 max-w-xl w-full mx-auto lg:mx-0 lg:ml-12 xl:ml-20 2xl:ml-28 px-4 sm:px-6 pt-36 pb-48 space-y-[70vh]">
        {chapter.acts.map((act, idx) => (
          <ActCard
            key={act.id}
            act={act}
            isActive={activeActIndex === idx}
            nodes={getActNodes(idx)}
            onSelectNode={(node) => setSelectedFrictionNode(node)}
          />
        ))}

        {/* Despacho Diplomático com Chancela Tátil de Cera Fundida */}
        <DiplomaticDispatch />
      </main>

      {scrollProgress < 0.85 && (
        <footer className="fixed bottom-4 left-0 right-0 text-center pointer-events-none z-30 transition-opacity duration-500">
          <span className="text-[10px] font-mono text-[#9c9486] uppercase tracking-widest">
            Role para desdobrar a partilha colonial e as tensões geopolíticas
          </span>
        </footer>
      )}
    </div>
  );
}

export default App;
