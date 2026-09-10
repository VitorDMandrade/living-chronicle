import React, { useState } from 'react';
import { sound } from '../lib/audio';

interface DispatchOption {
  id: string;
  verdict: string;
  justification: string;
  isCorrect: boolean;
  bancaTrap: string;
}

const DISPATCH_OPTIONS: DispatchOption[] = [
  {
    id: 'opt-a',
    verdict: 'Ocupação Efetiva e a Farsa Humanitária',
    justification:
      'A Conferência de Berlim substituiu o direito de descoberta prévia pela obrigação de posse física e militar imediata. As ferrovias não integraram o território; operavam como drenos unilaterais de matérias-primas conectando as minas diretamente aos navios a vapor.',
    isCorrect: true,
    bancaTrap:
      'FUVEST/UNICAMP: A banca tenta induzir o aluno a crer que a colonização pretendia modernizar ou civilizar o interior com redes integradas de consumo. As linhas férreas eram pontas de lança de drenagem sem malha interiorana.',
  },
  {
    id: 'opt-b',
    verdict: 'Missão Civilizatória e Modernização Espontânea',
    justification:
      'A expansão europeia decorreu primordialmente de um ideal humanitário desinteressado, transferindo tecnologia médica, saneamento e estruturas políticas liberais aos povos tutelados.',
    isCorrect: false,
    bancaTrap:
      'ARMADILHA CLÁSSICA: Absorver a ideologia do "Fardo do Homem Branco" de Rudyard Kipling como fato histórico em vez de legitimador discursivo do genocídio econômico.',
  },
  {
    id: 'opt-c',
    verdict: 'Mero Prolongamento do Pacto Colonial Mercantilista',
    justification:
      'O neocolonialismo do século XIX consistiu na repetição estrita do colonialismo do século XVI, tendo como objetivo central a extração exclusiva de metais preciosos sob controle das monarquias ibéricas.',
    isCorrect: false,
    bancaTrap:
      'ENEM/FUVEST: Anacronismo crasso. O colonialismo do séc. XVI foi mercantilista/metalista (América); o do séc. XIX foi financeiro/industrial e monopolista (África/Ásia), gerido por trustes e cartéis da 2ª Revolução Industrial.',
  },
];

export const DiplomaticDispatch: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isSealed, setIsSealed] = useState<boolean>(false);
  const [isPressing, setIsPressing] = useState<boolean>(false);

  const handleSelect = (id: string) => {
    if (isSealed) return;
    sound.playTelegraphClick();
    setSelectedId(id);
  };

  const handleSeal = () => {
    if (!selectedId || isSealed) return;
    setIsPressing(true);

    setTimeout(() => {
      sound.playWaxSealImpact();
      setIsPressing(false);
      setIsSealed(true);
    }, 180);
  };

  const selectedOption = DISPATCH_OPTIONS.find((opt) => opt.id === selectedId);

  return (
    <section className="relative my-32 max-w-2xl mx-auto px-6 font-serif">
      {/* Moldura de Pergaminho Chancelado */}
      <div className="relative rounded-xl border border-stone-800/80 bg-[#121316]/90 p-8 md:p-10 shadow-2xl backdrop-blur-md overflow-hidden">
        {/* Backdrop Cinemagraph de Cera Derretida (Google Veo / Arquivos do Nexus) */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-20 mix-blend-screen"
          src={`${import.meta.env.BASE_URL}assets/video/wax_seal.mp4`}
        />

        {/* Marca d'água Imperial */}
        <div className="absolute top-0 right-0 p-8 pointer-events-none opacity-5">
          <svg width="180" height="180" viewBox="0 0 100 100" fill="currentColor">
            <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" fill="none" />
            <polygon points="50,15 62,38 88,40 68,58 74,84 50,70 26,84 32,58 12,40 38,38" />
          </svg>
        </div>

        {/* Cabeçalho do Despacho */}
        <div className="relative z-10 border-b border-stone-800 pb-6 mb-8">
          <div className="flex items-center justify-between text-[11px] font-mono tracking-[0.25em] text-amber-600/90 uppercase">
            <span>Protocolo Secreto Nº 1885/BL</span>
            <span>Chancelaria Imperial</span>
          </div>
          <h2 className="text-2xl md:text-3xl text-stone-100 font-serif mt-2 tracking-wide">
            Despacho Diplomático de Veredito
          </h2>
          <p className="text-sm text-stone-400 font-sans mt-2 leading-relaxed">
            Selecione a síntese analítica que resiste ao crivo das bancas acadêmicas e sele o documento com o carimbo oficial para encerrar o ciclo deste capítulo.
          </p>
        </div>

        {/* Opções de Veredito */}
        <div className="relative z-10 space-y-4 mb-8">
          {DISPATCH_OPTIONS.map((opt) => {
            const isChosen = selectedId === opt.id;
            return (
              <div
                key={opt.id}
                onClick={() => handleSelect(opt.id)}
                className={`p-5 rounded-lg border transition-all duration-500 ease-editorial cursor-pointer ${
                  isChosen
                    ? 'border-amber-700/80 bg-stone-900/80 shadow-[0_0_20px_rgba(198,155,63,0.2)] scale-[1.01]'
                    : 'border-stone-800/60 bg-stone-950/40 hover:border-stone-700 hover:bg-stone-900/30'
                } ${isSealed && !isChosen ? 'opacity-35 pointer-events-none' : ''}`}
              >
                <div className="flex items-start gap-4">
                  <span
                    className={`mt-1 flex-shrink-0 w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                      isChosen
                        ? 'border-amber-500 bg-amber-600/30 text-amber-300'
                        : 'border-stone-700'
                    }`}
                  >
                    {isChosen && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
                  </span>
                  <div>
                    <h3 className="text-base text-stone-200 font-serif tracking-wide">
                      {opt.verdict}
                    </h3>
                    <p className="text-xs font-sans text-stone-400 mt-1 leading-relaxed">
                      {opt.justification}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Área da Chancela Tátil de Cera */}
        <div className="relative z-10 pt-6 border-t border-stone-800/80 flex flex-col items-center justify-center gap-4">
          {!isSealed ? (
            <button
              onClick={handleSeal}
              disabled={!selectedId}
              className={`group relative px-8 py-3.5 rounded-full font-mono text-xs uppercase tracking-[0.2em] transition-all duration-500 ease-editorial flex items-center gap-3 ${
                selectedId
                  ? 'border border-amber-700/80 bg-gradient-to-r from-red-950 to-stone-900 text-stone-100 hover:scale-105 shadow-[0_0_25px_rgba(158,42,43,0.5)] cursor-pointer'
                  : 'border border-stone-800 bg-stone-950/50 text-stone-600 cursor-not-allowed'
              } ${isPressing ? 'scale-95 brightness-125' : ''}`}
            >
              {/* Emblema de Cera Vermelha */}
              <span className="w-3.5 h-3.5 rounded-full bg-red-700/90 shadow-[0_0_8px_#b91c1c] group-hover:scale-110 transition-transform" />
              <span>Selar Documento com Cera Imperial</span>
            </button>
          ) : (
            /* Lacre Rompido e Consolidado */
            <div className="w-full animate-fadeIn">
              <div className="flex items-center justify-center gap-3 py-3 px-6 rounded-lg bg-red-950/30 border border-red-800/50 text-red-300 font-mono text-xs tracking-widest uppercase mb-6 shadow-inner">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
                Documento Chancelado e Arquivado
              </div>

              {/* Laudo Epistêmico de Banca */}
              {selectedOption && (
                <div
                  className={`p-6 rounded-lg border font-sans text-xs leading-relaxed ${
                    selectedOption.isCorrect
                      ? 'border-emerald-900/60 bg-emerald-950/20 text-emerald-300'
                      : 'border-red-900/60 bg-red-950/20 text-red-300'
                  }`}
                >
                  <div className="font-mono uppercase tracking-wider font-semibold mb-2 flex items-center gap-2">
                    <span>{selectedOption.isCorrect ? '✓ Tese Histórica Exata' : '✗ Erro Crítico de Leitura'}</span>
                  </div>
                  <p className="text-stone-300 mb-3">{selectedOption.justification}</p>
                  <div className="pt-3 border-t border-stone-800/80 text-amber-300/90 font-mono text-[11px]">
                    <span className="font-bold text-amber-400">Raio-X da Banca: </span>
                    {selectedOption.bancaTrap}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
