
import React from 'react';
import { SystemStatus } from '../types';

interface HeaderProps {
  status: SystemStatus;
  lastUpdate: string;
}

export const Header: React.FC<HeaderProps> = ({ status, lastUpdate }) => {
  return (
    <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 glass z-10">
      <div className="flex items-center gap-6">
        <div className="relative">
          <div className="w-3 h-3 rounded-full bg-red-600 animate-pulse-intense glow-red-strong"></div>
          <div className="absolute top-0 left-0 w-3 h-3 rounded-full border border-red-500 animate-ping"></div>
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl font-black tracking-tighter mono uppercase text-white leading-none">
            SUPER <span className="text-red-600">3MAX</span> PRO
          </h1>
          <span className="text-[9px] mono text-red-500/70 font-bold tracking-[0.3em] mt-1">FIGURES MODE'S PLUS</span>
        </div>
      </div>
      
      <div className="flex items-center gap-12 text-xs mono">
        <div className="flex flex-col items-end">
          <span className="text-gray-600 text-[10px]">LOGIC_CORE_INTEGRITY</span>
          <span className="text-green-500 font-bold tracking-widest">100% STABLE</span>
        </div>
        <div className="flex flex-col items-end border-l border-white/10 pl-8">
          <span className="text-gray-600 text-[10px]">DOMINATION_UPTIME</span>
          <span className="text-white">24/7/365</span>
        </div>
        <div className="flex flex-col items-end border-l border-white/10 pl-8">
          <span className="text-gray-600 text-[10px]">SYNC_PHASE</span>
          <span className="text-red-600">{lastUpdate}</span>
        </div>
      </div>
    </header>
  );
};
