import React from 'react';
import { ChronicleAct } from '../types/chronicle';

interface ActCardProps {
  act: ChronicleAct;
  isActive: boolean;
}

export const ActCard: React.FC<ActCardProps> = ({ act, isActive }) => {
  return (
    <article
      className={`max-w-xl mx-auto p-8 rounded-2xl border transition-all duration-700 backdrop-blur-md ${
        isActive
          ? 'bg-[#0f141f]/90 border-[#2b3548] shadow-[0_20px_50px_rgba(0,0,0,0.8)] opacity-100 translate-y-0'
          : 'bg-[#0f141f]/25 border-transparent opacity-20 translate-y-6'
      }`}
    >
      <span className="text-[11px] font-mono text-amber-500 tracking-widest uppercase block mb-3 font-bold">
        {act.actBadge}
      </span>
      <h2 className="text-xl font-bold text-white font-serif mb-4 leading-snug">
        {act.title}
      </h2>
      <p className="text-base text-[#ded9cc] font-serif leading-relaxed mb-6">
        {act.historicalContext}
      </p>

      <div className="space-y-2.5 bg-[#06080b]/75 p-4 rounded-xl border border-[#1b2230] mb-5 font-mono text-xs text-[#a39c8e]">
        <span className="text-white block font-bold tracking-wider">ENCADEAMENTO CAUSAL ESTRUTURAL:</span>
        {act.causalChain.map((step, sIdx) => (
          <div key={sIdx} className="flex items-start gap-2">
            <span className="text-amber-500 font-bold">➔</span>
            <span>{step}</span>
          </div>
        ))}
      </div>

      <div className="p-3.5 rounded-xl bg-red-950/25 border-l-2 border-red-500/80 text-xs font-sans text-red-200/90 leading-relaxed">
        <strong className="text-[10px] font-mono text-red-400 uppercase block mb-1">
          Pegadinha Recorrente em Prova:
        </strong>
        {act.examTrap}
      </div>
    </article>
  );
};
