import { useEffect, useState } from 'react';
import { StageCanvas } from './components/StageCanvas';
import { ActCard } from './components/ActCard';
import { ChronicleHeader } from './components/ChronicleHeader';
import { DiplomaticDispatch } from './components/DiplomaticDispatch';
import { ChapterDrawer } from './components/ChapterDrawer';
import { FrictionNodesOverlay } from './components/FrictionNodesOverlay';
import { TelegraphCardModal } from './components/TelegraphCardModal';
import { VestibularQuizModal } from './components/VestibularQuizModal';
import { FRICTION_NODES, FrictionNode } from './data/friction-nodes';
import { IMPERIALISM_CHAPTER } from './data/imperialism-chapter';
import { useScrollProgress } from './hooks/useScrollProgress';
import { sound } from './lib/audio';

export function App() {
  const [currentChapterId, setCurrentChapterId] = useState('imperialism-xix');
  const [isCodexOpen, setIsCodexOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [quizQuestionId, setQuizQuestionId] = useState<string | undefined>(undefined);
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

  const handleOpenQuiz = (questionId?: string) => {
    sound.playTelegraphClick();
    setQuizQuestionId(questionId);
    setIsQuizOpen(true);
  };

  return (
    <div
      onClick={handleFirstInteraction}
      className="min-h-screen bg-[#07080b] text-[#ede5d8] relative selection:bg-amber-950 selection:text-amber-200 cursor-default overflow-x-hidden"
    >
      {/* Palco Gráfico Unificado (Living Canvas Vídeo + Partilha de Berlim 2D no lado direito em Desktop) */}
      <StageCanvas
        scrollProgress={scrollProgress}
        videoSrc={`${import.meta.env.BASE_URL}assets/video/imperialism_bg.mp4`}
      />

      {/* Cortina Escura de Estudo no Lado Esquerdo: Garante fundo escuro sólido e elimina ofuscamento de vídeo/luzes na leitura */}
      <div className="fixed inset-y-0 left-0 w-full lg:w-[54%] xl:w-[50%] z-[1] pointer-events-none bg-gradient-to-r from-[#07080b] via-[#07080b]/98 to-transparent" />

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

      {/* Simulador de Questões de Vestibular (ENEM / FUVEST / UNICAMP / UNESP) */}
      <VestibularQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        initialQuestionId={quizQuestionId}
      />

      {/* Topbar com Breadcrumb, Indicador Acústico, Simulado e Códice */}
      <ChronicleHeader
        currentActTitle={chapter.acts[activeActIndex].title}
        actRoman={romanNumerals[activeActIndex] || 'ATO I'}
        scrollPercent={scrollProgress * 100}
        onOpenCodex={() => {
          sound.playTelegraphClick();
          setIsCodexOpen(true);
        }}
        onOpenQuiz={() => handleOpenQuiz()}
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
      <main className="relative z-10 max-w-xl w-full mx-auto lg:mx-0 lg:ml-12 xl:ml-20 2xl:ml-28 px-4 sm:px-6 pt-32 pb-48 space-y-[60vh]">
        {chapter.acts.map((act, idx) => (
          <ActCard
            key={act.id}
            act={act}
            isActive={activeActIndex === idx}
            nodes={getActNodes(idx)}
            onSelectNode={(node) => setSelectedFrictionNode(node)}
            onOpenQuiz={(qId) => handleOpenQuiz(qId)}
          />
        ))}

        {/* Despacho Diplomático com Chancela Tátil de Cera Fundida */}
        <DiplomaticDispatch />
      </main>

      {/* Rodapé Orientador com Pill Anti-Sobreposição */}
      <footer
        style={{
          opacity: scrollProgress < 0.76 ? 1 : Math.max(0, 1 - (scrollProgress - 0.76) / 0.08),
          transform: `translateY(${scrollProgress > 0.76 ? (scrollProgress - 0.76) * 30 : 0}px)`,
        }}
        className="fixed bottom-4 left-0 right-0 text-center pointer-events-none z-30 transition-all duration-700 ease-editorial"
      >
        <span className="text-[10px] font-mono text-[#a8a092] bg-[#07080c]/90 px-3.5 py-1 rounded-full border border-stone-800/90 shadow-md uppercase tracking-widest backdrop-blur-sm">
          Role para desdobrar a partilha colonial e as tensões geopolíticas
        </span>
      </footer>
    </div>
  );
}

export default App;
