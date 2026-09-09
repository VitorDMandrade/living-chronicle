import React from 'react';

interface ChronicleHeaderProps {
  discipline: string;
  epoch: string;
  title: string;
  currentAct: number;
  totalActs: number;
}

export const ChronicleHeader: React.FC<ChronicleHeaderProps> = ({
  discipline,
  epoch,
  title,
  currentAct,
  totalActs
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 px-8 py-5 flex items-center justify-between pointer-events-none backdrop-blur-sm bg-[#06080b]/50 border-b border-white/5">
      <div>
        <span className="text-[10px] font-mono text-[#78716c] uppercase tracking-widest block">
          {discipline} • {epoch}
        </span>
        <h1 className="text-sm font-sans font-bold text-white/90">
          {title}
        </h1>
      </div>
      <div className="font-mono text-xs text-[#78716c] flex items-center gap-2">
        <span>ATO {currentAct + 1} / {totalActs}</span>
        <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
      </div>
    </header>
  );
};
