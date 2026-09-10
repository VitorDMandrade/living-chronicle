import React, { useState, useEffect, useRef } from 'react';
import { VESTIBULAR_QUESTIONS } from '../data/vestibular-questions';
import { sound } from '../lib/audio';

interface VestibularQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuestionId?: string;
}

export const VestibularQuizModal: React.FC<VestibularQuizModalProps> = ({
  isOpen,
  onClose,
  initialQuestionId,
}) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [showDistractors, setShowDistractors] = useState<Record<string, boolean>>({});

  const questions = VESTIBULAR_QUESTIONS;

  useEffect(() => {
    if (initialQuestionId) {
      const idx = questions.findIndex((q) => q.id === initialQuestionId);
      if (idx !== -1) {
        setSelectedQuestionIndex(idx);
      }
    }
  }, [initialQuestionId, questions]);

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

  const currentQ = questions[selectedQuestionIndex];
  const currentSelectedLetter = userAnswers[currentQ.id];
  const hasAnsweredCurrent = Boolean(currentSelectedLetter);
  const isCurrentCorrect =
    currentSelectedLetter &&
    currentQ.options.find((opt) => opt.letter === currentSelectedLetter)?.isCorrect;

  const totalAnswered = Object.keys(userAnswers).length;
  const totalCorrect = Object.entries(userAnswers).filter(([qId, ansLetter]) => {
    const q = questions.find((item) => item.id === qId);
    return q?.options.find((opt) => opt.letter === ansLetter)?.isCorrect;
  }).length;

  const handleSelectOption = (letter: string) => {
    if (hasAnsweredCurrent) return; // Não altera após responder para simular prova
    const isCorrect = currentQ.options.find((opt) => opt.letter === letter)?.isCorrect;

    setUserAnswers((prev) => ({ ...prev, [currentQ.id]: letter }));

    if (isCorrect) {
      sound.playWaxSealImpact();
    } else {
      sound.playTelegraphClick();
    }
  };

  const handleResetQuiz = () => {
    sound.playTelegraphClick();
    setUserAnswers({});
    setShowDistractors({});
    setSelectedQuestionIndex(0);
  };

  return (
    <dialog
      ref={dialogRef}
      closedby="any"
      onClose={onClose}
      className="modern-dialog fixed inset-0 m-auto z-50 p-0 border-0 bg-transparent max-w-3xl w-[94vw] max-h-[92vh] flex items-center justify-center outline-none"
    >
      <div className="w-full bg-[#0c0e15] border border-[#2b3548] rounded-2xl shadow-[0_30px_90px_rgba(0,0,0,0.95)] ring-1 ring-amber-500/20 text-[#ede5d8] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Topbar do Simulado */}
        <div className="px-6 py-4 border-b border-[#1f2736] bg-[#07080d] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            <div>
              <span className="text-[10px] font-mono tracking-widest text-amber-500 uppercase font-bold block">
                Treino Oficial de Vestibulares
              </span>
              <h3 className="text-base sm:text-lg font-serif font-bold text-stone-100">
                Simulador de Questões Comentadas
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Score pill */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-[#141924] border border-[#242e40] text-xs font-mono">
              <span className="text-stone-400">Desempenho:</span>
              <span className="text-amber-400 font-bold">
                {totalCorrect}/{questions.length}
              </span>
            </div>

            {/* Fechar modal */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800/80 transition-colors"
              title="Fechar (Esc)"
              aria-label="Fechar Simulado"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Seletor de Questões em Abas */}
        <div className="px-6 py-2.5 bg-[#090b10] border-b border-[#1a2130] flex items-center gap-2 overflow-x-auto flex-shrink-0">
          {questions.map((q, idx) => {
            const answeredLetter = userAnswers[q.id];
            const isCorrect = answeredLetter && q.options.find((o) => o.letter === answeredLetter)?.isCorrect;
            const isSelected = selectedQuestionIndex === idx;

            return (
              <button
                key={q.id}
                onClick={() => {
                  sound.playTelegraphClick();
                  setSelectedQuestionIndex(idx);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-sm'
                    : 'bg-[#121622] text-stone-400 border border-stone-800/60 hover:text-stone-200'
                }`}
              >
                <span className="font-bold">{q.banca}</span>
                <span className="text-[10px] text-stone-500">Q{idx + 1}</span>
                {answeredLetter && (
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isCorrect ? 'bg-emerald-500' : 'bg-red-500'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Corpo da Questão (Scrollável) */}
        <div className="p-6 overflow-y-auto space-y-5 flex-grow">
          {/* Cabeçalho da Questão Ativa */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#1b2332]">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-red-950/60 text-red-300 border border-red-800/60 font-mono text-[11px] font-bold">
                {currentQ.banca}
              </span>
              <span className="text-xs font-mono text-stone-400">
                {currentQ.year}
              </span>
              <span className="text-stone-600">•</span>
              <span className="text-xs font-mono text-amber-500/90 font-medium">
                {currentQ.topicBadge}
              </span>
            </div>
            <span className="text-xs font-mono text-stone-500">
              Questão {selectedQuestionIndex + 1} de {questions.length}
            </span>
          </div>

          {/* Texto-base com Citação Histórica */}
          {currentQ.promptQuote && (
            <blockquote className="p-4 rounded-xl bg-[#080a0f] border-l-2 border-amber-600/80 font-serif italic text-sm text-[#d4cdbf] leading-relaxed">
              <p className="mb-2">“{currentQ.promptQuote.replace(/^[“"]|[”"]$/g, '')}”</p>
              {currentQ.quoteAuthor && (
                <footer className="text-right text-xs font-mono not-italic text-stone-500">
                  — {currentQ.quoteAuthor}
                </footer>
              )}
            </blockquote>
          )}

          {/* Enunciado */}
          <p className="text-sm sm:text-base font-serif text-stone-200 leading-relaxed font-medium">
            {currentQ.questionText}
          </p>

          {/* Alternativas */}
          <div className="space-y-2.5 pt-2">
            {currentQ.options.map((opt) => {
              const isSelected = currentSelectedLetter === opt.letter;
              let borderClass = 'border-[#202737] bg-[#0a0d14] hover:border-stone-700 hover:bg-[#0e121c] text-stone-300';

              if (hasAnsweredCurrent) {
                if (opt.isCorrect) {
                  borderClass = 'border-emerald-500/80 bg-emerald-950/30 text-emerald-100 ring-1 ring-emerald-500/40';
                } else if (isSelected && !opt.isCorrect) {
                  borderClass = 'border-red-500/80 bg-red-950/40 text-red-200 ring-1 ring-red-500/40';
                } else {
                  borderClass = 'border-[#1b212f]/60 bg-[#080a10]/50 text-stone-500 opacity-60';
                }
              }

              return (
                <button
                  key={opt.letter}
                  disabled={hasAnsweredCurrent}
                  onClick={() => handleSelectOption(opt.letter)}
                  className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-start gap-3.5 group cursor-pointer ${borderClass}`}
                >
                  <span
                    className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono text-xs font-bold flex-shrink-0 transition-colors ${
                      isSelected
                        ? opt.isCorrect
                          ? 'bg-emerald-500 text-black'
                          : 'bg-red-500 text-white'
                        : opt.isCorrect && hasAnsweredCurrent
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#151a26] text-stone-400 group-hover:text-amber-300 group-hover:bg-[#1f2637]'
                    }`}
                  >
                    {opt.letter}
                  </span>
                  <span className="text-xs sm:text-sm font-sans leading-relaxed flex-grow">
                    {opt.text}
                  </span>
                  {hasAnsweredCurrent && opt.isCorrect && (
                    <span className="text-emerald-400 font-mono text-xs font-bold flex-shrink-0">
                      ✓ Gabarito
                    </span>
                  )}
                  {hasAnsweredCurrent && isSelected && !opt.isCorrect && (
                    <span className="text-red-400 font-mono text-xs font-bold flex-shrink-0">
                      ✗ Erro
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback Didático Imediato após Responder */}
          {hasAnsweredCurrent && (
            <div className="mt-4 p-4 rounded-xl bg-[#090c13] border border-[#232b3b] space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span
                  className={`font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                    isCurrentCorrect ? 'text-emerald-400' : 'text-red-400'
                  }`}
                >
                  {isCurrentCorrect ? '✓ Resposta Correta!' : '✗ Você marcou uma alternativa incorreta'}
                </span>
                <button
                  onClick={() => {
                    sound.playTelegraphClick();
                    setShowDistractors((prev) => ({
                      ...prev,
                      [currentQ.id]: !prev[currentQ.id],
                    }));
                  }}
                  className="text-xs font-mono text-amber-400 hover:text-amber-300 underline underline-offset-4 cursor-pointer"
                >
                  {showDistractors[currentQ.id]
                    ? 'Ocultar Análise dos Distratores'
                    : 'Ver Análise Detalhada dos Distratores'}
                </button>
              </div>

              {/* Justificativa do Gabarito */}
              <div className="p-3 rounded-lg bg-emerald-950/20 border-l-2 border-emerald-500/80 text-xs font-sans text-stone-300 leading-relaxed">
                <strong className="text-emerald-400 font-mono uppercase block mb-1">
                  Por que a alternativa {currentQ.options.find((o) => o.isCorrect)?.letter} é o Gabarito:
                </strong>
                {currentQ.options.find((o) => o.isCorrect)?.explanation}
              </div>

              {/* Dica de Pegadinha de Prova */}
              <div className="p-3 rounded-lg bg-amber-950/20 border-l-2 border-amber-500/80 text-xs font-sans text-amber-200/90 leading-relaxed">
                <strong className="text-amber-400 font-mono uppercase block mb-1">
                  Alerta de Pegadinha no Vestibular:
                </strong>
                {currentQ.examTrapAlert}
              </div>

              {/* Análise Completa dos Distratores (Desdobrável) */}
              {showDistractors[currentQ.id] && (
                <div className="space-y-2 pt-2 border-t border-[#1b2332]">
                  <span className="text-[11px] font-mono uppercase text-stone-400 font-bold block">
                    Por que os outros itens estão errados:
                  </span>
                  {currentQ.options
                    .filter((opt) => !opt.isCorrect)
                    .map((dist) => (
                      <div
                        key={dist.letter}
                        className="text-xs font-mono text-stone-400 bg-[#06080c] p-2.5 rounded-lg border border-stone-800/80"
                      >
                        <span className="text-red-400 font-bold mr-2">
                          Item ({dist.letter}):
                        </span>
                        <span>{dist.explanation}</span>
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Rodapé de Navegação */}
        <div className="px-6 py-3.5 bg-[#07080d] border-t border-[#1f2736] flex items-center justify-between flex-shrink-0">
          <button
            onClick={() => {
              if (selectedQuestionIndex > 0) {
                sound.playTelegraphClick();
                setSelectedQuestionIndex((prev) => prev - 1);
              }
            }}
            disabled={selectedQuestionIndex === 0}
            className="px-3.5 py-1.5 rounded-lg bg-[#141824] hover:bg-[#1c2233] disabled:opacity-40 disabled:pointer-events-none text-xs font-mono text-stone-300 border border-[#232b3b] transition-all cursor-pointer"
          >
            ← Anterior
          </button>

          <div className="flex items-center gap-2">
            {totalAnswered === questions.length && (
              <button
                onClick={handleResetQuiz}
                className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-xs font-mono text-stone-400 hover:text-stone-200 border border-stone-800 transition-all cursor-pointer"
              >
                Refazer Simulado
              </button>
            )}

            {selectedQuestionIndex < questions.length - 1 ? (
              <button
                onClick={() => {
                  sound.playTelegraphClick();
                  setSelectedQuestionIndex((prev) => prev + 1);
                }}
                className="px-4 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-xs font-mono text-black font-bold transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>Próxima</span>
                <span>→</span>
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-4 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs font-mono text-stone-200 font-medium transition-all cursor-pointer"
              >
                Concluir Treino
              </button>
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
};
