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
      className={`w-full p-6 sm:p-8 rounded-2xl border transition-all duration-700 backdrop-blur-md ${
        isActive
          ? 'bg-[#0f141f]/90 border-[#2b3548] shadow-[0_20px_50px_rgba(0,0,0,0.8)] opacity-100 translate-y-0'
          : 'bg-[#0f141f]/25 border-transparent opacity-20 translate-y-6'
      }`}
    >
      <span className="text-[11px] font-mono text-amber-500 tracking-widest uppercase block mb-3 font-bold">
        {act.actBadge}
      </span>
      <h2 className="text-xl sm:text-2xl font-bold text-white font-serif mb-4 leading-snug">
        {act.title}
      </h2>
      <p className="text-sm sm:text-base text-[#ded9cc] font-serif leading-relaxed mb-6">
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

      {/* Dossiês de Fricção Contextualizados no próprio Ato */}
      {nodes && nodes.length > 0 && onSelectNode && (
        <div className="mt-5 pt-4 border-t border-[#1b2230]">
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
                className="px-2.5 py-1.5 rounded-lg bg-stone-900/80 hover:bg-stone-800 border border-stone-800 hover:border-amber-600/70 transition-all text-xs font-mono text-stone-300 hover:text-amber-300 flex items-center gap-1.5 group cursor-pointer"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 group-hover:bg-amber-400 transition-colors" />
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
