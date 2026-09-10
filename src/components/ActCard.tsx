import React from 'react';
import { ChronicleAct } from '../types/chronicle';
import { FrictionNode } from '../data/friction-nodes';

interface ActCardProps {
  act: ChronicleAct;
  isActive: boolean;
  nodes?: FrictionNode[];
  onSelectNode?: (node: FrictionNode) => void;
}

export const ActCard: React.FC<ActCardProps> = ({ act, isActive, nodes, onSelectNode }) => {
  return (
    <article
      className={`w-full p-6 sm:p-8 rounded-2xl border backdrop-blur-md transform transition-all duration-1000 ease-editorial ${
        isActive
          ? 'bg-[#0f141f]/95 border-[#2b3548] shadow-[0_25px_60px_rgba(0,0,0,0.85)] opacity-100 translate-y-0 scale-100 ring-1 ring-amber-500/15'
          : 'bg-[#0f141f]/35 border-stone-800/40 shadow-none opacity-40 translate-y-4 scale-[0.985] hover:opacity-70'
      }`}
    >
      <span className="text-[11px] font-mono text-amber-500 tracking-widest uppercase block mb-3 font-bold transition-colors duration-300">
        {act.actBadge}
      </span>
      <h2 className="text-xl sm:text-2xl font-bold text-white font-serif mb-4 leading-snug tracking-wide transition-colors duration-300">
        {act.title}
      </h2>
      <p className="text-sm sm:text-base text-[#ded9cc] font-serif leading-relaxed mb-6 transition-colors duration-300">
        {act.historicalContext}
      </p>

      <div className="space-y-2.5 bg-[#06080b]/75 p-4 rounded-xl border border-[#1b2230] mb-5 font-mono text-xs text-[#a39c8e] transition-all duration-500">
        <span className="text-white block font-bold tracking-wider">ENCADEAMENTO CAUSAL ESTRUTURAL:</span>
        {act.causalChain.map((step, sIdx) => (
          <div key={sIdx} className="flex items-start gap-2">
            <span className="text-amber-500 font-bold transition-transform duration-300">➔</span>
            <span>{step}</span>
          </div>
        ))}
      </div>

      <div className="p-3.5 rounded-xl bg-red-950/25 border-l-2 border-red-500/80 text-xs font-sans text-red-200/90 leading-relaxed transition-all duration-500">
        <strong className="text-[10px] font-mono text-red-400 uppercase block mb-1">
          Pegadinha Recorrente em Prova:
        </strong>
        {act.examTrap}
      </div>

      {/* Dossiês de Fricção Contextualizados no próprio Ato */}
      {nodes && nodes.length > 0 && onSelectNode && (
        <div className="mt-5 pt-4 border-t border-[#1b2230] transition-all duration-500">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              Focos de Fricção do Período ({nodes.length}):
            </span>
            <span className="text-[9px] font-mono text-stone-500">Inspecionar Ficha Confidencial</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {nodes.map((node) => (
              <button
                key={node.id}
                onClick={() => onSelectNode(node)}
                className="px-2.5 py-1.5 rounded-lg bg-stone-900/80 hover:bg-stone-800 border border-stone-800 hover:border-amber-600/70 transition-all duration-300 ease-editorial text-xs font-mono text-stone-300 hover:text-amber-300 flex items-center gap-1.5 group cursor-pointer hover:scale-105 active:scale-95"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 group-hover:bg-amber-400 transition-colors duration-300" />
                <span>{node.name.split('&')[0].trim()}</span>
                <span className="text-[10px] text-stone-500 font-normal">({node.year})</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </article>
  );
};
