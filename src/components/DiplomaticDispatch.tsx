import React, { useState } from 'react';
import { playChancellerySeal } from '../lib/audio';

export const DiplomaticDispatch: React.FC = () => {
  const [sealed, setSealed] = useState<number | null>(null);

  const options = [
    {
      id: 0,
      statement: 'O Neocolonialismo foi impulsionado pelo capital mercantil e buscou prioritariamente ouro e prata na América.',
      isCorrect: false,
      verdict: 'INCORRETO // Isso caracteriza o Colonialismo Mercantilista do Século XVI, não o Século XIX.'
    },
    {
      id: 1,
      statement: 'A partilha decorreu da saturação de capitais e mercados na 2ª Revolução Industrial, legitimada pela farsa da missão civilizadora.',
      isCorrect: true,
      verdict: 'HOMOLOGADO // Leitura impecável da causalidade material e ideológica cobrada nas bancas de elite.'
    }
  ];

  const handleSeal = (idx: number) => {
    if (sealed !== null) return;
    playChancellerySeal(true);
    setSealed(idx);
  };

  return (
    <section className="max-w-xl mx-auto mt-28 p-8 rounded-2xl border border-[#2b3548] bg-[#0c1017]/90 backdrop-blur-xl shadow-2xl relative">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[11px] font-mono text-amber-500 uppercase tracking-widest font-bold">
          AUDITORIA HISTÓRICA // ATO FINAL
        </span>
        <span className="text-[10px] font-mono text-[#78716c] uppercase">
          DESPACHO CONFIDENCIAL
        </span>
      </div>

      <h3 className="text-lg font-serif font-bold text-white mb-2 leading-snug">
        Veredito da Chancelaria: Qual premissa resiste ao crivo da banca?
      </h3>
      <p className="text-xs font-serif text-[#a39c8e] mb-6 leading-relaxed">
        Selecione a síntese inviolável para homologar e selar a crônica deste capítulo.
      </p>

      <div className="space-y-3">
        {options.map((opt, idx) => {
          const isChosen = sealed === idx;
          let btnStyle = 'bg-[#06080b]/80 border-[#1b2230] text-[#ded9cc] hover:border-amber-500/50';

          if (sealed !== null) {
            if (opt.isCorrect) btnStyle = 'bg-emerald-950/30 border-emerald-500/60 text-emerald-200';
            else if (isChosen) btnStyle = 'bg-red-950/30 border-red-500/60 text-red-200';
            else btnStyle = 'opacity-30 border-transparent';
          }

          return (
            <button
              key={opt.id}
              onClick={() => handleSeal(idx)}
              disabled={sealed !== null}
              className={`w-full p-4 rounded-xl border text-left font-serif text-xs transition-all duration-300 leading-relaxed flex items-start gap-3 ${btnStyle}`}
            >
              <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-black/40 border border-white/10">
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="flex-1">{opt.statement}</span>
            </button>
          );
        })}
      </div>

      {sealed !== null && (
        <div className="mt-5 p-4 rounded-xl bg-[#06080b]/90 border border-white/10 font-mono text-xs text-[#ded9cc] animate-fadeIn flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-red-950 border border-red-500 flex items-center justify-center font-bold text-red-400 flex-shrink-0 shadow-[0_0_12px_rgba(220,38,38,0.4)]">
            SELO
          </div>
          <div>
            <strong className="block text-[11px] text-amber-400">VEREDITO:</strong>
            {options[sealed].verdict}
          </div>
        </div>
      )}
    </section>
  );
};
