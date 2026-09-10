import React from 'react';
import { ChronicleAct } from '../types/chronicle';
import { FrictionNode } from '../data/friction-nodes';

interface ActCardProps {
  act: ChronicleAct;
  isActive: boolean;
  nodes?: FrictionNode[];
  onSelectNode?: (node: FrictionNode) => void;
  onOpenQuiz?: (questionId?: string) => void;
}

export const ActCard: React.FC<ActCardProps> = ({
  act,
  isActive,
  nodes,
  onSelectNode,
  onOpenQuiz,
}) => {
  // Mapeia questão inicial correspondente ao Ato para treino direto
  const actToQuestionMap: Record<string, string> = {
    'act-1': 'quest-unesp-1',
    'act-2': 'quest-enem-1',
    'act-3': 'quest-unicamp-1',
  };

  return (
    <article
      className={`w-full p-6 sm:p-8 rounded-2xl border transform transition-all duration-700 ease-editorial ${
        isActive
          ? 'bg-[#0a0d14] border-[#2b3548] shadow-[0_30px_70px_rgba(0,0,0,0.98)] opacity-100 translate-y-0 scale-100 ring-1 ring-amber-500/25'
          : 'bg-[#0a0d14]/95 border-stone-800/80 shadow-[0_15px_40px_rgba(0,0,0,0.85)] opacity-90 translate-y-2 scale-[0.99] hover:opacity-100'
      }`}
    >
      {/* Badges de Incidência nos Vestibulares */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <span className="text-[11px] font-mono text-amber-500 tracking-widest uppercase font-bold">
          {act.actBadge}
        </span>
        <div className="flex flex-wrap gap-1.5">
          {act.vestibularTags?.map((tag, tIdx) => (
            <span
              key={tIdx}
              className="px-2 py-0.5 rounded-full bg-[#121824] border border-[#232f46] text-[10px] font-mono text-amber-300 font-semibold"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Título do Ato */}
      <h2 className="text-xl sm:text-2xl font-bold text-stone-100 font-serif mb-4 leading-snug tracking-wide">
        {act.title}
      </h2>

      {/* Conteúdo Teórico de Estudo com Alto Contraste */}
      <p className="text-sm sm:text-base text-[#ded6c7] font-serif leading-relaxed mb-5">
        {act.historicalContext}
      </p>

      {/* Conceitos Essenciais para Memorizar (Termos de Prova) */}
      {act.keyConcepts && act.keyConcepts.length > 0 && (
        <div className="mb-5 p-3.5 rounded-xl bg-[#06080d] border border-[#1b2332]">
          <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block mb-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Conceitos Obrigatórios na Prova (Termos-Chave):
          </span>
          <div className="flex flex-wrap gap-1.5">
            {act.keyConcepts.map((concept, cIdx) => (
              <span
                key={cIdx}
                className="px-2.5 py-1 rounded-md bg-[#0f141f] border border-[#242f44] text-[11px] font-mono text-stone-300"
              >
                {concept}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Encadeamento Causal Estrutural */}
      <div className="space-y-2 bg-[#05070a] p-4 rounded-xl border border-[#161c28] mb-5 font-mono text-xs text-[#b0a898]">
        <span className="text-stone-100 block font-bold tracking-wider text-[11px]">
          ENCADEAMENTO CAUSAL ESTRUTURAL:
        </span>
        {act.causalChain.map((step, sIdx) => (
          <div key={sIdx} className="flex items-start gap-2.5">
            <span className="text-amber-500 font-bold flex-shrink-0">➔</span>
            <span className="leading-relaxed">{step}</span>
          </div>
        ))}
      </div>

      {/* Quadro Comparativo de Vestibular (se presente no Ato) */}
      {act.comparativeTable && (
        <div className="mb-5 overflow-hidden rounded-xl border border-[#20293a] bg-[#07090f]">
          <div className="bg-[#0e131d] px-4 py-2 border-b border-[#20293a] flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold">
              {act.comparativeTable.title}
            </span>
            <span className="text-[10px] font-mono text-stone-500">ENEM / FUVEST</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-[#1b2332] bg-[#0a0e16] text-stone-400">
                  <th className="p-3 w-1/4">Critério</th>
                  <th className="p-3 w-3/8 text-amber-300/90">{act.comparativeTable.colA}</th>
                  <th className="p-3 w-3/8 text-cyan-300/90">{act.comparativeTable.colB}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#151b27] text-stone-300">
                {act.comparativeTable.rows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-[#0f1420]/50 transition-colors">
                    <td className="p-3 font-semibold text-stone-400">{row.label}</td>
                    <td className="p-3 text-stone-300">{row.valA}</td>
                    <td className="p-3 text-stone-200 font-medium">{row.valB}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Como o Vestibular Cobra (Comando & Raciocínio Esperado) */}
      {act.examAnalysis && (
        <div className="p-3.5 rounded-xl bg-[#09111c] border-l-2 border-cyan-500/80 text-xs font-sans text-cyan-100/90 leading-relaxed mb-4">
          <strong className="text-[10px] font-mono text-cyan-400 uppercase block mb-1">
            Como Cai na Prova (Comando Esperado):
          </strong>
          {act.examAnalysis}
        </div>
      )}

      {/* Pegadinha Recorrente em Prova */}
      <div className="p-3.5 rounded-xl bg-[#160808] border-l-2 border-red-500 text-xs font-sans text-red-200/90 leading-relaxed mb-5">
        <strong className="text-[10px] font-mono text-red-400 uppercase block mb-1">
          Pegadinha Recorrente em Prova:
        </strong>
        {act.examTrap}
      </div>

      {/* Ações Didáticas: Testar no Simulado & Inspecionar Nós de Fricção */}
      <div className="pt-4 border-t border-[#1b2230] space-y-4">
        {onOpenQuiz && (
          <button
            onClick={() => onOpenQuiz(actToQuestionMap[act.id])}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-600/90 to-amber-700/90 hover:from-amber-500 hover:to-amber-600 text-black font-mono font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
          >
            <span>🎯</span>
            <span>Testar Questão deste Ato no Simulado</span>
            <span className="text-[10px] bg-black/20 px-1.5 py-0.5 rounded font-mono">Gabarito Comentado</span>
          </button>
        )}

        {/* Focos de Fricção Geopolítica Contextualizados */}
        {nodes && nodes.length > 0 && onSelectNode && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400 font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                Focos Cartográficos de Conflito ({nodes.length}):
              </span>
              <span className="text-[9px] font-mono text-stone-500">Inspecionar Ficha</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {nodes.map((node) => (
                <button
                  key={node.id}
                  onClick={() => onSelectNode(node)}
                  className="px-2.5 py-1.5 rounded-lg bg-[#0d1017] hover:bg-[#151a24] border border-[#1e2635] hover:border-amber-600/70 transition-all duration-300 text-xs font-mono text-stone-300 hover:text-amber-300 flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                  <span>{node.name.split('&')[0].trim()}</span>
                  <span className="text-[10px] text-stone-500">({node.year})</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
